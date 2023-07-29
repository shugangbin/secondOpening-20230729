<template>
    <div class="left-side flex flex-col justify-between">
        <ElScrollbar class="flex-1 min-h-0">
            <div class="left-side__main pb-[20px]">
                <h3 class="text-xl font-bold">
                    <span>文本描述</span>
                    <span class="text-error">*</span>
                </h3>

                <!--    输入框    -->
                <div class="mt-[10px] flex">
                    <l-textarea
                        v-model="formData.prompt"
                        maxlength="1024"
                        :rows="7"
                        :clearable="true"
                        :show-word-limit="false"
                        :customStyle="{
                            paddingBottom: '24px'
                        }"
                        placeholder="输入英文描述词，生成效果会更好；描述词越详细，生成的图片效果更加真实哦～"
                    >
                        <template #length-suffix>
                            <div class="length-suffix justify-end">
                                <KeywordSuggestion v-model="formData.prompt">
                                    <template #trigger>
                                        <el-button
                                            type="primary"
                                            :link="true"
                                            class="ml-[10px] mb-[1px]"
                                        >
                                            关键词推荐
                                        </el-button>
                                    </template>
                                </KeywordSuggestion>

                                <!--                                <div-->
                                <!--                                    class="cursor-pointer hover:text-primary"-->

                                <!--                                >-->
                                <!--                                    <el-icon size="14" color="inherit"-->
                                <!--                                        ><Delete-->
                                <!--                                    /></el-icon>-->
                                <!--                                    <span>清空</span>-->
                                <!--                                </div>-->
                                <el-button
                                    v-if="
                                        appStore?.getDrawConfig
                                            ?.translate_type == 2
                                    "
                                    type="default"
                                    :link="true"
                                    class="ml-[10px]"
                                    :icon="Switch"
                                    :loading="isTranslate"
                                    @click="translatePrompt"
                                >
                                    翻译成英文
                                </el-button>
                                <el-button
                                    type="default"
                                    :link="true"
                                    class="ml-[10px]"
                                    :icon="Delete"
                                    @click="formData.prompt = ''"
                                >
                                    清空
                                </el-button>
                            </div>
                        </template>
                    </l-textarea>
                </div>

                <!--    关键词示例    -->
                <div
                    class="flex items-center cursor-pointer mt-[8px] text-base"
                >
                    <div
                        class="flex items-center text-[#8e8e8e] hover:text-primary select-none"
                        @click="getDrawingExample"
                    >
                        <el-icon size="16" color="inherit"><Refresh /></el-icon>
                        <span class="ml-[4px]">随便试试:</span>
                    </div>
                    <div class="flex truncate w-[230px]">
                        <el-tooltip
                            class="ml-[10px]"
                            effect="light"
                            v-for="(item, index) in exampleLists"
                            :key="index"
                            :content="item.prompt"
                            placement="bottom"
                        >
                            <span
                                class="ml-[10px]"
                                @click="appendKeywords(item.prompt_en)"
                            >
                                {{ item.prompt }}
                            </span>
                        </el-tooltip>
                    </div>
                </div>

                <!--    上传参考图    -->
                <div class="mt-[30px]">
                    <h1 class="text-xl font-bold">上传参考图</h1>
                    <!--    上传图片    -->
                    <upload
                        class="w-full mt-[10px]"
                        :show-progress="true"
                        @success="(val) => (formData.image_base = val.data.uri)"
                    >
                        <div
                            class="w-full h-[120px] rounded-[4px] flex flex-col items-center justify-center upload-view-box"
                            style="border: 1px dashed #dcdfe6"
                        >
                            <template v-if="!formData.image_base">
                                <el-icon :size="40"><upload-filled /></el-icon>
                                <div class="mt-[10px]">上传图片</div>
                            </template>
                            <template v-else>
                                <el-image
                                    class="w-full h-[120px]"
                                    :src="formData.image_base"
                                    fit="contain"
                                />
                                <div class="upload-view-item">
                                    <el-icon
                                        size="24"
                                        class="upload-clear"
                                        color="#ffffff"
                                        @click.stop="formData.image_base = ''"
                                    >
                                        <CircleCloseFilled />
                                    </el-icon>
                                    <el-button type="primary"
                                        >重新上传</el-button
                                    >
                                </div>
                            </template>
                        </div>
                    </upload>
                </div>

                <!--    图片尺寸    -->
                <div class="mt-[20px]">
                    <h1 class="text-xl font-bold">图片尺寸</h1>
                    <div class="flex justify-between flex-wrap">
                        <div
                            v-for="(item, index) in pictureSize.lists"
                            :key="index"
                            class="picture-size w-[100px] h-[88px] mt-[10px] rounded-[4px] cursor-pointer text-center"
                            :class="{
                                'picture-size-active':
                                    pictureSize.current == index
                            }"
                            @click="pictureSize.current = index"
                        >
                            <div class="flex justify-center mt-[10px]">
                                <img
                                    class="w-[18px] h-[18px]"
                                    :src="item.icon"
                                    alt="图片尺寸"
                                />
                            </div>
                            <div
                                v-if="index != 5"
                                class="text-xl text-[#101010] mt-[4px]"
                            >
                                {{ item.widthRatio }}:{{ item.heightRatio }}
                            </div>
                            <div v-else class="text-xl text-[#101010] mt-[4px]">
                                <input
                                    v-model="item.widthRatio"
                                    class="input-ratio w-7 text-center"
                                    type="number"
                                    min="0"
                                    max="50"
                                />
                                <span> : </span>
                                <input
                                    v-model="item.heightRatio"
                                    class="input-ratio w-7 text-center"
                                    type="number"
                                    min="0"
                                    max="50"
                                />
                            </div>
                            <div class="text-base text-[#999] mt-[4px]">
                                {{ item.name }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ElScrollbar>

        <div class="left-side__footer text-center">
            <slot name="model"></slot>
            <el-button
                size="large"
                type="default"
                class="w-full submit-btn"
                :disabled="isReceiving"
                @click="onDrawing()"
            >
                立即生成
            </el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useVModels } from '@vueuse/core'
import {
    Refresh,
    Switch,
    UploadFilled,
    CircleCloseFilled,
    Delete
} from '@element-plus/icons-vue'
import { useUserStore } from '~~/stores/user'
import { useAppStore } from '~/stores/app'
import {
    drawingExample,
    keywordPromptTranslate,
    drawingModel
} from '~/api/drawing'
import { useLockFn } from '~/composables/useLockFn'

import Upload from '~/components/upload/index.vue'
import LTextarea from '~/components/l-textarea/index.vue'
import KeywordSuggestion from '~/pages/drawing/component/keyword-suggestion.vue'
import Icon1 from 'assets/images/drawing/1.png'
import Icon2 from 'assets/images/drawing/2.png'
import Icon3 from 'assets/images/drawing/3.png'
import Icon4 from 'assets/images/drawing/4.png'
import Icon5 from 'assets/images/drawing/5.png'
import Icon6 from 'assets/images/drawing/6.png'

const userStore = useUserStore()
const appStore = useAppStore()
const emit = defineEmits<{
    (event: 'drawing', value: any): void
    (event: 'update:modelValue', value: any): void
}>()

const props = withDefaults(
    defineProps<{
        modelValue?: any // 轮播图数据
        isReceiving: boolean // 是否正在接收
    }>(),
    {
        modelValue: {
            prompt: '',
            action: '',
            image_base: '',
            image_id: '',
            scale: ''
        },
        isReceiving: false
    }
)
const { modelValue: formData } = useVModels(props, emit)
// 示例列表
const exampleLists = ref<any[]>([])

const pictureSize = reactive({
    current: 0,
    lists: [
        {
            icon: Icon1,
            name: '头像图',
            widthRatio: 1,
            heightRatio: 1
        },
        {
            icon: Icon2,
            name: '手机壁纸',
            widthRatio: 1,
            heightRatio: 2
        },
        {
            icon: Icon3,
            name: '文案图',
            widthRatio: 3,
            heightRatio: 4
        },
        {
            icon: Icon4,
            name: '社交媒体',
            widthRatio: 4,
            heightRatio: 3
        },
        {
            icon: Icon5,
            name: '宣传海报',
            widthRatio: 9,
            heightRatio: 16
        },
        {
            icon: Icon6,
            name: '自定义',
            widthRatio: '',
            heightRatio: ''
        }
    ]
})

const getRatio = computed(() => {
    const currentSize = pictureSize.lists[pictureSize.current]
    if (currentSize) {
        const { widthRatio, heightRatio } = currentSize
        if (widthRatio && heightRatio) {
            return `${widthRatio}:${heightRatio}`
        }
    }
    return ''
})

watch(
    () => pictureSize,
    (value) => {
        if (value.current >= 0) {
            formData.value.scale = getRatio.value
        }
    },
    { immediate: true, deep: true }
)

const { isLock: isTranslate, lockFn: translatePrompt } = useLockFn(async () => {
    try {
        if (formData.value.prompt.trim() == '') {
            feedback.msgError('请输入描述词')
            return
        }
        const { translate } = await keywordPromptTranslate({
            prompt: formData.value.prompt
        })
        formData.value.prompt = translate
    } catch (error) {
        console.log('翻译失败=>', error)
    }
})

const appendKeywords = (content: string) => {
    formData.value.prompt = content
}

const onDrawing = () => {
    formData.value.action = 'generate'
    emit('drawing', { drawing: formData.value, isClear: true })
}

const getDrawingExample = async () => {
    try {
        exampleLists.value = await drawingExample()
    } catch (error) {
        console.log('请求绘画示例失败=>', error)
    }
}
getDrawingExample()
</script>

<style lang="scss" scoped>
.left-side {
    height: 100%;

    &__main {
        .length-suffix {
            position: absolute;
            bottom: 0px;
            left: 10px;
            font-size: 14px;
            display: flex;
            align-items: center;
            width: 90%;
            height: 30px;
            background: #ffffff;
        }

        // 文字竖向排列
        //.button-rl {
        //    // 对浏览器属性进行兼容
        //    writing-mode: vertical-rl;
        //    -webkit-writing-mode: vertical-rl;
        //    text-orientation: upright;
        //    -webkit-text-orientation: upright;
        //    width: 30px;
        //    height: 120px;
        //    text-align: center;
        //    line-height: 20px;
        //    white-space: initial;
        //    letter-spacing: 4px;
        //}

        // 上传参考图
        .upload-view-box {
            position: relative;
            .upload-view-item {
                display: none;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 4px;
                background-color: rgba(0, 0, 0, 0.3);
            }
            .upload-clear {
                position: absolute;
                right: 20px;
                top: 14px;
                cursor: pointer;
            }
        }
        .upload-view-box:hover .upload-view-item {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        // 图片尺寸
        .picture-size {
            transition: all 0.5s;
            border: 1px solid #dcdfe6;
            user-select: none;
            .input-ratio {
                background: transparent;
                border: 0;
                outline: none;
                appearance: none;
                -moz-appearance: none;
                -webkit-appearance: none;
                border-bottom: 1px solid #101010;
            }
            .input-ratio::-webkit-inner-spin-button,
            .input-ratio::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
                display: none;
            }
        }
        .picture-size:hover {
            border: 1px solid var(--el-color-primary);
            background-color: #edfdff;
        }
        .picture-size-active {
            border: 1px solid var(--el-color-primary);
            background-color: #edfdff;
        }
    }

    &__footer {
        .submit-btn {
            color: #ffffff !important;
            font-size: 16px;
            height: 52px !important;
            border-radius: 60px !important;
            background: linear-gradient(
                90deg,
                var(--gradient-1) 0%,
                var(--gradient-2) 100%
            );
        }
    }
}
</style>
