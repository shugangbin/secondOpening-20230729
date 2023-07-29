<template>
    <view class="h-full flex flex-col">
        <view class="flex-1 min-h-0">
            <scroll-view class="h-full" :scroll-y="true">
                <view class="h-full p-[30rpx] relative">
                    <!--    描述推荐    -->
                    <view class="flex justify-between">
                        <view class="text-base">
                            <text class="font-medium"> 文本描述 </text>
                            <text class="text-error">*</text>
                        </view>
                    </view>
                    <!--    关键词输入    -->
                    <view class="mt-[24rpx]">
                        <l-textarea
                            v-model="formData.prompt"
                            maxlength="1024"
                            :rows="5"
                            :show-word-limit="false"
                            :custom-class="{
                                paddingBottom: '60rpx'
                            }"
                            placeholder="输入英文描述词，生成效果会更好；描述词越详细，生成的图片效果更加真实哦～~"
                        >
                            <template #length-suffix>
                                <view class="length-suffix justify-end text-sm">
                                    <view
                                        class="text-primary"
                                        @click="keywordSuggestionRef?.open()"
                                    >
                                        描述词推荐
                                    </view>
                                    <view
                                        v-if="
                                            appStore?.getDrawConfig
                                                ?.translate_type == 2
                                        "
                                        class="ml-[40rpx] text-muted hover:text-primary"
                                        :loading="isTranslate"
                                        @click.stop="translatePrompt"
                                    >
                                        <u-loading
                                            v-if="isTranslate"
                                            mode="flower"
                                            :color="$theme.primaryColor"
                                            size="28"
                                        ></u-loading>
                                        <image
                                            v-else
                                            class="w-[26rpx] h-[26rpx]"
                                            src="@/static/images/drawing/translate.png"
                                        ></image>
                                        <text class="ml-[10rpx]"
                                            >翻译成英文</text
                                        >
                                    </view>
                                    <view
                                        class="cursor-pointer text-muted hover:text-primary ml-[40rpx]"
                                        @click.stop="formData.prompt = ''"
                                    >
                                        <u-icon name="trash"></u-icon>
                                        <text>清空</text>
                                    </view>
                                </view>
                            </template>
                        </l-textarea>
                    </view>
                    <!--    关键词示例    -->
                    <view class="flex justify-between mt-[20rpx] text-base">
                        <view
                            class="flex items-center cursor-pointer text-muted"
                            @click="getDrawingExample"
                        >
                            <view
                                class="flex items-center text-[#8e8e8e] hover:text-primary"
                            >
                                <u-icon name="reload"></u-icon>
                                <text class="text-muted ml-[10rpx]"
                                    >随便试试</text
                                >
                            </view>
                            <view
                                class="ml-[10rpx] text-black truncate w-[500rpx]"
                            >
                                <text
                                    class="ml-[20rpx]"
                                    v-for="(item, index) in exampleLists"
                                    :key="index"
                                    @click.stop="appendKeywords(item.prompt_en)"
                                >
                                    {{ item.prompt }}
                                </text>
                            </view>
                        </view>
                        <view class="cursor-pointer flex items-center">
                            <!--                    <el-icon size="18"><RefreshRight /></el-icon>-->
                        </view>
                    </view>
                    <!--    上传参考图    -->
                    <view class="mt-[40rpx]">
                        <view class="text-base font-medium">上传参考图</view>
                        <view
                            class="uploader mt-[20rpx] flex justify-center items-center"
                            @click="onUploader"
                        >
                            <!--    没有图片的时候    -->
                            <view
                                v-if="!formData.image_base"
                                class="flex flex-col justify-center items-center"
                            >
                                <image
                                    class="w-[72rpx] h-[72rpx] mb-[12rpx]"
                                    src="@/static/images/icon/icon_upload.png"
                                ></image>
                                <view class="text-muted">点击上传参考图</view>
                            </view>
                            <!--    有图片的时候    -->
                            <view
                                v-else
                                class="w-full h-full relative text-center has_image"
                                @click.stop
                            >
                                <u-icon
                                    class="has_img_delete"
                                    name="close-circle-fill"
                                    color="#ffffff"
                                    size="40"
                                    @click.stop="formData.image_base = ''"
                                ></u-icon>
                                <image
                                    class="w-full h-full"
                                    :src="formData.image_base"
                                    mode="aspectFit"
                                ></image>
                                <view class="has_img_btn" @click="onUploader"
                                    >换图</view
                                >
                            </view>
                        </view>
                    </view>
                    <!--    图片尺寸    -->
                    <view class="mt-[40rpx] pb-[20px]">
                        <view class="text-base font-medium">图片尺寸</view>
                        <view class="flex justify-between flex-wrap">
                            <view
                                v-for="(item, index) in pictureSize.lists"
                                :key="index"
                                class="picture-size mt-[20rpx] rounded-[8rpx] text-center"
                                :class="{
                                    'picture-size-active':
                                        pictureSize.current == index
                                }"
                                @click="pictureSize.current = index"
                            >
                                <view class="flex justify-center mt-[30rpx]">
                                    <image
                                        class="w-[36rpx] h-[36rpx]"
                                        :src="item.icon"
                                    />
                                </view>
                                <view
                                    v-if="index != 5"
                                    class="text-xl mt-[8rpx]"
                                >
                                    {{ item.widthRatio }}:{{ item.heightRatio }}
                                </view>
                                <view
                                    v-else
                                    class="flex justify-center text-xl mt-[10rpx]"
                                >
                                    <input
                                        v-model="item.widthRatio"
                                        class="input-ratio w-7 text-center"
                                        type="number"
                                        min="0"
                                        max="50"
                                    />
                                    <text class="mx-[6rpx]"> : </text>
                                    <input
                                        v-model="item.heightRatio"
                                        class="input-ratio w-7 text-center"
                                        type="number"
                                        min="0"
                                        max="50"
                                    />
                                </view>
                                <view class="text-base mt-[4px]">
                                    {{ item.name }}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>

        <view class="bg-white z-10 w-full p-[20rpx]">
            <!--    选择模型    -->
            <slot name="model"></slot>

            <!--    生成    -->
            <button
                :style="{
                    height: '82rpx',
                    lineHeight: '82rpx',
                    fontSize: '30rpx',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '60px',
                    background:
                        'linear-gradient(90deg, var(--color-minor),var(--color-primary))'
                }"
                @click="onDrawing"
                :disabled="isReceiving"
            >
                立即生成
            </button>
        </view>
        <KeywordSuggestion
            ref="keywordSuggestionRef"
            v-model="formData.prompt"
        />
    </view>
</template>

<script setup lang="ts">
import { reactive, computed, shallowRef, watch, ref } from 'vue'
import { useRouter } from 'uniapp-router-next'
import { uploadImage } from '@/api/app'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import { useLockFn } from '@/hooks/useLockFn'
import { drawingExample, keywordPromptTranslate } from '@/api/drawing'

import KeywordSuggestion from '../keyword-suggestion.vue'

import Icon1 from '@/static/images/drawing/1.png'
import Icon2 from '@/static/images/drawing/2.png'
import Icon3 from '@/static/images/drawing/3.png'
import Icon4 from '@/static/images/drawing/4.png'
import Icon5 from '@/static/images/drawing/5.png'
import Icon6 from '@/static/images/drawing/6.png'

const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()
const keywordSuggestionRef =
    shallowRef<InstanceType<typeof KeywordSuggestion>>()
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

const formData = computed({
    get: () => {
        return props.modelValue
    },
    set: (val) => {
        emit('update:modelValue', val)
    }
})

// 示例关键词列表
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
            uni.$u.toast('请输入描述词')
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

const getDrawingExample = async () => {
    try {
        exampleLists.value = await drawingExample()
    } catch (error) {
        console.log('请求绘画示例失败=>', error)
    }
}

getDrawingExample()

const onUploader = () => {
    // if (!userStore.isLogin) {
    //     return toLogin()
    // }
    uni.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
            uploadImg(res.tempFilePaths[0])
        }
    })
}

const uploadImg = async (file: string) => {
    uni.showLoading({
        title: '上传中'
    })
    try {
        const res: any = await uploadImage(file)
        formData.value.image_base = res.uri
        uni.hideLoading()
    } catch (error) {
        uni.hideLoading()
        uni.$u.toast(error)
        console.log('上传图片失败', error)
    }
}

const onDrawing = () => {
    formData.value.action = 'generate'
    console.log(formData.value)
    emit('drawing', { drawing: formData.value, isClear: true })
}
</script>

<style lang="scss" scoped>
.length-suffix {
    position: absolute;
    bottom: 0px;
    left: 10px;
    z-index: 10;
    font-size: 14px;
    display: flex;
    align-items: center;
    width: 90%;
    height: 60rpx;
}
.uploader {
    height: 200rpx;
    border-radius: 8rpx;
    border: 1px dashed #dcdfe6;
    .has_img_delete {
        position: absolute;
        right: 10rpx;
        top: 10rpx;
    }
    .has_img_btn {
        position: absolute;
        right: 10rpx;
        bottom: 10rpx;
        font-size: 24rpx;
        display: inline-block;
        padding: 12rpx 30rpx;
        border-radius: 8rpx;
        background: transparent;
        border: 1px solid #888;
    }
}
// 图片尺寸
.picture-size {
    transition: all 0.5s;
    user-select: none;
    width: 216rpx;
    height: 196rpx;
    border: 1px solid transparent;
    @apply bg-page;
    .input-ratio {
        background: transparent;
        border: 0;
        outline: none;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        border-bottom: 1px solid #333;
    }
    .input-ratio::-webkit-inner-spin-button,
    .input-ratio::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
        display: none;
    }
}
.picture-size-active {
    border: 1px solid;
    @apply border-primary bg-primary-light-9;
}
</style>
