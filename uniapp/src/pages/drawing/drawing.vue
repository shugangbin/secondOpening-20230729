<template>
    <page-meta :page-style="$theme.pageStyle">
        <!-- #ifndef H5 -->
        <navigation-bar
            :front-color="$theme.navColor"
            :background-color="$theme.navBgColor"
        />
        <!-- #endif -->
    </page-meta>
    <view
        v-if="!appStore.getDrawConfig.is_open"
        class="w-full h-full bg-white rounded-[6px] flex items-center justify-center"
    >
        <u-empty text="绘画功能未开启" mode="favor"></u-empty>
    </view>
    <view v-else class="drawing-container">
        <u-tabs
            :list="tabsState.lists"
            :is-scroll="true"
            :current="tabsState.current"
            :active-color="$theme.primaryColor"
            bg-color="transparent"
            :barStyle="{
                background: $theme.primaryColor
            }"
            @change="handleChange"
        ></u-tabs>
        <view class="drawing-content">
            <view class="h-full" v-show="tabsState.current == 0">
                <DrawingControl
                    class="h-full"
                    v-model="formData"
                    @drawing="drawingHandler"
                >
                    <template #model>
                        <ModelPicker v-model="drawModel" />
                    </template>
                </DrawingControl>
            </view>
            <view class="h-full" v-show="tabsState.current == 1">
                <DrawingRecord
                    class="h-full"
                    :formData="drawingResult"
                    v-model:current="recordState.current"
                    :isReceiving="isReceiving"
                    :contentList="recordState.lists"
                    @change="choiceRecord"
                    @drawing="drawingHandler"
                    @delete="deleteHandler"
                    @split="splitHandler"
                >
                </DrawingRecord>
            </view>
        </view>
    </view>
    <tabbar />
</template>

<script lang="ts" setup>
import { reactive, ref, onUnmounted } from 'vue'
import type { DrawingFormType } from '@/api/drawing'
import {
    drawing,
    drawingRecord,
    drawingDelete,
    drawingDetail
} from '@/api/drawing'
import DrawingControl from '@/pages/drawing/component/drawing-control/index.vue'
import ModelPicker from '@/pages/drawing/component/drawing-control/model-picker.vue'
import DrawingRecord from '@/pages/drawing/component/drawing-record.vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'uniapp-router-next'
import { useLockFn } from '@/hooks/useLockFn'
import { useSplit } from '@/pages/drawing/hooks/useSplit'
import usePolling from '@/hooks/usePolling'
import { onHide, onLoad } from '@dcloudio/uni-app'
import { useAppStore } from '@/stores/app'

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const tabsState = reactive({
    current: 0,
    lists: [
        {
            name: 'AI绘画',
            value: 0
        },
        {
            name: '生成记录',
            value: 0
        }
    ]
})

// 是否正在接收
const isReceiving = ref<boolean>(false)
// 是否切片
const isSplit = ref<boolean>(false)
// 绘画模型
const drawModel = ref<string>('')
// 记录ID（用于请求轮询的ID
const recordId = ref<number>(0)
// 记录状态
const recordState = reactive<any>({
    current: 0,
    lists: []
})
// 绘制结果
const drawingResult = reactive<any>({
    actions: [],
    prompt: '',
    prompt_en: '',
    fail_reason: '',
    status: '',
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

const handleChange = (index: number) => {
    tabsState.current = index
}

// 使用
const useDrawingDetails = (recordId: any) => {
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

onHide(() => {
    end()
})

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
            tabsState.current = 1
            start()
        }
        console.log(drawingResult)
    } catch (error) {
        console.log('获取绘画记录失败=>', error)
    }
}

/**
 *  删除绘图
 *  **/
const deleteHandler = async (id: number) => {
    try {
        await drawingDelete({
            ids: [id]
        })
        await getDrawingRecord()
    } catch (error) {
        console.log('删除绘画记录失败=>', error)
    }
}

/**
 *  一键切图
 *  url: { string } : 图片地址
 **/
const splitHandler = async (url: string) => {
    if (isSplit.value || Array.isArray(drawingResult.image_url)) {
        return
    }
    uni.showLoading({
        title: '切图中'
    })
    isSplit.value = true
    try {
        const { getImages } = useSplit(url, {
            columns: 2,
            rows: 2
        })
        const data: any[] = await getImages()
        drawingResult.image_url = data
        isSplit.value = false
        uni.hideLoading()
    } catch (error) {
        uni.hideLoading()
        isSplit.value = false
        uni.$u.toast('下载图片超时，请重试')
        console.log('一键切图失败=>', error)
    }
}

/**
 *  绘制请求
 *  options: { drawing } : 绘制参数
 *  options: { isClear } : 是否清空绘制参数
 **/
const { lockFn: drawingHandler, isLock } = useLockFn(
    async (options: { drawing: DrawingFormType; isClear: boolean }) => {
        console.log(options.drawing)
        if (isReceiving.value) {
            tabsState.current = 1
            return
        }
        if (!userStore.isLogin) {
            return router.navigateTo('/pages/login/login')
        }
        if (!options.drawing.prompt) return uni.$u.toast('请输入绘画描述！')
        isReceiving.value = true
        tabsState.current = 1
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
                toRecharge()
                return
            }
            console.log('绘制失败=>', error)
            drawingResult.fail_reason = error
            await getDrawingRecord()
            isReceiving.value = false
        }
    }
)

// 去充值
const toRecharge = async () => {
    const res = await uni.showModal({
        title: '绘画余额不足',
        content: '绘画余额不足，请前往充值',
        confirmText: '前往充值'
    })
    if (res.confirm) {
        if (userStore.isLogin) {
            router.navigateTo('/packages/pages/recharge/recharge')
        } else {
            router.navigateTo('/pages/login/login')
        }
    }
}

// 绘制错误的处理
const drawErrorHandler = (error: any) => {
    isReceiving.value = false
    recordState.current = -1
    drawingResult.fail_reason = error
    recordState.lists.splice(0, 1)
    console.log('绘制失败=>', error)
}

onLoad(() => {
    getDrawingRecord()
})
</script>

<style lang="scss">
page {
    // height: 100%;
    height: calc(100% - 100rpx - env(safe-area-inset-bottom));
}

.drawing-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    @apply bg-white;
    .drawing-content {
        flex: 1;
        min-height: 0;
        border-top: 1px solid;
        @apply border-light;
    }
}
</style>
