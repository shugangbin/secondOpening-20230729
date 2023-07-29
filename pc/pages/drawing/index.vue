<template>
    <NuxtLayout name="default" v-if="!appStore.getDrawConfig.is_open">
        <div
            class="w-full h-full bg-white rounded-[6px] flex items-center justify-center"
        >
            <div class="text-xl">绘画功能未开启!</div>
        </div>
    </NuxtLayout>
    <NuxtLayout name="default" v-else>
        <!--    Left 属性创作栏    -->
        <template #panel>
            <div
                class="drawing-left bg-white w-[350px] h-full px-[15px] py-[20px]"
            >
                <div class="selector">
                    <div
                        class="selector__item"
                        :class="{ selector__item_active: selectorIndex == 0 }"
                        @click="selectorIndex = 0"
                    >
                        AI绘画
                    </div>
                    <div
                        class="selector__item"
                        :class="{ selector__item_active: selectorIndex == 1 }"
                        @click="selectorIndex = 1"
                    >
                        绘画记录
                    </div>
                </div>
                <div class="pt-[20px] h-full" style="height: calc(100% - 40px)">
                    <DrawingControl
                        v-show="selectorIndex == 0"
                        v-model="formData"
                        :isReceiving="isReceiving"
                        @drawing="drawingHandler"
                    >
                        <template #model>
                            <DrawingModel v-model="drawModel" />
                        </template>
                    </DrawingControl>
                    <DrawingRecord
                        v-show="selectorIndex == 1"
                        v-model:current="recordState.current"
                        :content-list="recordState.lists"
                        :isReceiving="isReceiving"
                        @change="choiceRecord"
                        @delete="deleteDrawing"
                    ></DrawingRecord>
                </div>
            </div>
        </template>

        <!--    Content 主体生成内容    -->
        <div class="drawing-main h-full flex">
            <!--  空状态  -->
            <div
                v-if="!isReceiving && !drawingResult.image_url"
                class="flex items-center justify-center w-full h-full"
            >
                <el-result>
                    <template #icon>
                        <el-image :src="DrawingEmpty" />
                    </template>
                    <template #title>
                        <div class="text-xl">
                            {{
                                !!drawingResult.fail_reason
                                    ? `发生错误`
                                    : '生成的图片将会显示在这里   '
                            }}
                        </div>
                    </template>
                    <template #sub-title>
                        <div class="text-info">
                            {{
                                !!drawingResult.fail_reason
                                    ? `错误信息：${drawingResult.fail_reason}`
                                    : '在左侧输入描述，创建你的作品吧!'
                            }}
                        </div>
                    </template>
                </el-result>
            </div>
            <!--  绘制进度  -->
            <DrawingLoading
                v-if="isReceiving"
                :picture="drawingResult.image_url"
            >
            </DrawingLoading>
            <!--  绘制图片  -->
            <DrawingPicture
                v-if="!isReceiving && drawingResult.image_url"
                :loading="pictureLoading"
                :picture="drawingResult.image_url"
            >
            </DrawingPicture>
        </div>

        <!--    Right 生成记录栏    -->
        <template #mainRight>
            <!--     drawingResult.status: 0 未启动 1 执行中 2 失败 3 成功      -->
            <div
                v-if="!isReceiving && drawingResult.prompt"
                class="drawing-right bg-white h-full w-[330px] rounded-[10px]"
            >
                <!--  绘制属性  -->
                <DrawingProperty
                    :formData="drawingResult"
                    @drawing="drawingHandler"
                    @delete="deleteDrawing"
                    @split="splitHandler"
                >
                </DrawingProperty>
            </div>
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useAppStore } from '~/stores/app'
import { useUserStore } from '~/stores/user'
import DrawingEmpty from '~/assets/images/drawing/drawing_empty.png'
import {
    drawing,
    drawingRecord,
    drawingDelete,
    drawingDetail
} from '~/api/drawing'
import type { DrawingFormType } from '~/api/drawing'
import usePolling from '~/composables/usePolling'
import { ElMessageBox } from 'element-plus'
import { useSplit } from '~/pages/drawing/hooks/useSplit'

import DrawingControl from '~/pages/drawing/component/drawing-control/index.vue'
import DrawingModel from '~/pages/drawing/component/drawing-control/model-picker.vue'
import DrawingRecord from '~/pages/drawing/component/drawing-record.vue'
import DrawingPicture from '~/pages/drawing/component/drawing-picture.vue'
import DrawingProperty from '~/pages/drawing/component/drawing-property.vue'
import DrawingLoading from '~/pages/drawing/component/drawing-loading.vue'

definePageMeta({
    layout: false,
    hiddenLayoutFooter: true
})

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
// 选择器索引ID
const selectorIndex = ref<number>(0)
// 是否正在接收
const isReceiving = ref<boolean>(false)
// 绘画模型
const drawModel = ref<string>('')
// 图片加载中
const pictureLoading = ref<boolean>(false)
// 记录状态
const recordState = reactive<any>({
    current: 0,
    lists: []
})
// 记录ID（用于请求轮询的ID
const recordId = ref<number>(0)
// 绘制结果
const drawingResult = reactive<any>({
    actions: [],
    prompt: '',
    status: '',
    fail_reason: '',
    prompt_en: '',
    task_id: '',
    image_id: '',
    image_url: ''
})
// 绘制参数（初始化餐素
const initialData: DrawingFormType = {
    prompt: '',
    action: 'generate',
    image_base: '',
    image_id: '',
    scale: '1:1'
}
// 转为reactive
const formData = reactive<DrawingFormType>(initialData)

// 使用
const useDrawingDetails = (recordId: Ref<any>) => {
    const check = async () => {
        try {
            const data = await drawingDetail({
                records_id: recordId.value
            })

            Reflect.ownKeys(data).map((item: any) => {
                drawingResult[item] = data[item]
            })
            recordState.lists[0] = drawingResult

            if (data.status == 3 || data.status == 2) {
                end()
                endCallback()
            }

            return data
        } catch (error: any) {
            end()
            console.log('获取详情失败=>', error)
        }
    }
    const endCallback = async () => {
        await getDrawingRecord()
        isReceiving.value = false
        recordState.current = 0
        await userStore.getUser()
    }
    const { start, end, result } = usePolling(check, {
        totalTime: 480 * 1000,
        time: 5000,
        count: 96,
        callback: endCallback
    })

    return {
        start,
        end,
        result
    }
}

const { start, end } = useDrawingDetails(recordId)

onUnmounted(() => {
    end()
})

/**
 *  选择绘图记录
 *  **/
const choiceRecord = (row: any) => {
    Reflect.ownKeys(row).map((item: any) => {
        drawingResult[item] = row[item]
    })
}

/**
 *  绘制记录
 *  **/
const getDrawingRecord = async () => {
    try {
        const lists = await drawingRecord({})
        if (lists.length != 0) {
            Reflect.ownKeys(lists[0]).map((item: any) => {
                drawingResult[item] = lists[0][item]
            })
        }
        recordState.lists = lists
        // 如果第一个是正在生成中状态的话我就会重新进入轮询请求结果
        if (drawingResult['status'] == 1) {
            isReceiving.value = true
            recordId.value = drawingResult.id
            selectorIndex.value = 0
            start()
        }
        console.log(drawingResult)
    } catch (error) {
        console.log('获取绘画记录失败=>', error)
    }
}

/**
 *  删除记录
 *  ids: { number[] } : 删除的id数组
 **/
const deleteDrawing = async (ids: number[]) => {
    if (!ids.length) {
        feedback.msgError('请选择需要删除的图片')
        return
    }
    try {
        await drawingDelete({ ids })
        feedback.msgSuccess('删除成功')
        await getDrawingRecord()
    } catch (error) {
        console.log('删除失败绘画记录', error)
    }
}

/**
 *  一键切图
 *  url: { string } : 图片地址
 **/
const splitHandler = async (url: string) => {
    if (pictureLoading.value || Array.isArray(drawingResult.image_url)) {
        return
    }
    pictureLoading.value = true
    try {
        const { getImages } = useSplit(url, {
            columns: 2,
            rows: 2
        })
        const data: any[] = await getImages()
        drawingResult.image_url = data
        pictureLoading.value = false
    } catch (error) {
        pictureLoading.value = false
        console.log('一键切图失败=>', error)
    }
}

/**
 *  绘制请求
 *  options: { drawing } : 绘制参数
 *  options: { isClear } : 是否清空绘制参数
 **/
const drawingHandler = async (options: {
    drawing: DrawingFormType
    isClear: boolean
}) => {
    if (isReceiving.value) return
    if (!userStore.isLogin) return userStore.toggleShowLogin(true)
    if (!options.drawing.prompt) return feedback.msgError('请输入绘画描述！')

    isReceiving.value = true
    selectorIndex.value = 1
    // 添加插入一个空的绘画结果
    recordState.current = 0
    drawingResult.image_url = ''
    recordState.lists.unshift({ ...drawingResult, image_url: '' })

    try {
        const { records_id } = await drawing({
            ...options.drawing,
            model: drawModel.value
        })
        // 重置参数
        if (options.isClear) {
            Object.assign(formData, initialData)
        }
        recordId.value = records_id
        start()
    } catch (error) {
        recordState.lists.splice(0, 1)
        recordState.current = -1
        if (error === '余额不足') {
            await ElMessageBox.confirm(
                '绘画余额不足，请前往充值',
                '绘画余额不足',
                {
                    confirmButtonText: '前往充值',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            )
            router.push('/recharge')
            return
        }
        console.log('绘制失败=>', error)
        drawingResult.fail_reason = error
        await getDrawingRecord()
        isReceiving.value = false
    }
}

onMounted(() => {
    getDrawingRecord()
})
</script>

<style lang="scss" scoped>
.selector {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid var(--el-border-color-extra-light);

    &__item {
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        color: #999999;
        margin: 0 auto;
        padding: 0 30px;
        height: 40px;
        text-align: center;
        line-height: 40px;
    }
    &__item_active {
        color: #101010;
        border-bottom: 4px solid var(--el-color-primary);
    }
}
</style>
