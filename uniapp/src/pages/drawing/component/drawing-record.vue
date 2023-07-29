<template>
    <scroll-view
        class="h-full"
        :scroll-y="true"
        :scroll-into-view="scrollToView"
    >
        <!--    空状态    -->
        <drawing-status v-if="!contentList.length" content="暂无生成记录">
        </drawing-status>

        <template v-else>
            <!--    绘画记录    -->
            <scroll-view class="whitespace-nowrap" id="recordList" :scroll-x="true">
                <view class="py-[30rpx] inline-block">
                    <view
                        v-for="(item, index) in contentList"
                        :key="index"
                        class="record-item"
                        :class="{
                            'record-item_active': index == current
                        }"
                        @click="choiceRecord(item, index)"
                    >
                        <u-image :src="item.image_url" width="160" height="160">
                            <template #error>
                                <view
                                    v-if="item.status != 2"
                                    class="flex flex-col justify-center items-center bg-page w-full h-full"
                                >
                                    <u-loading
                                        mode="circle"
                                        :color="$theme.primaryColor"
                                        size="40"
                                    ></u-loading>
                                    <view class="text-primary text-sm mt-[10rpx]">
                                        生成中...
                                    </view>
                                </view>
                                <view v-else class="text-xs">
                                    <u-icon name="error-circle" size="44"></u-icon>
                                </view>
                            </template>
                        </u-image>
                    </view>
                </view>
            </scroll-view>

            <!--    绘画结果    -->
            <view
                class="flex justify-center items-center w-full mt-[20rpx]"
            >
                <!--    绘画图片    -->
                <drawing-picture
                    v-if="formData.image_url && !isReceiving"
                    :picture="formData.image_url"
                    @preview="onPreview(contentList)"
                >
                </drawing-picture>
                <!--    绘画中    -->
                <drawing-loading v-if="isReceiving" />
                <!--    绘画错误    -->
                <drawing-status
                    v-if="!isReceiving && !formData.image_url"
                    :content="formData.fail_reason"
                >
                </drawing-status>
            </view>

            <!--    绘画结果属性    -->
            <view v-if="!isReceiving && current != -1" class="pb-[60px]">
                <view class="drawing-property">
                    <!--    原始关键词    -->
                    <view>
                        <view class="my-[8rpx]" @click="onCopy(formData.prompt)">
                            <text class="text-base">原始关键词</text>
                            <image
                                class="w-[30rpx] h-[30rpx] ml-[16rpx]"
                                src="@/static/images/drawing/icon_copy.png"
                            ></image>
                        </view>
                        <view
                            class="px-[20rpx] py-[12rpx] bg-page rounded-[6rpx] text-base max-h-[240rpx] overflow-y-auto"
                        >
                            {{ formData.prompt }}
                        </view>
                    </view>
                    <!--    英文关键词    -->
                    <view v-if="formData.prompt_en">
                        <view class="my-[8rpx]" @click="onCopy(formData.prompt_en)">
                            <text class="text-base">英文关键词</text>
                            <image
                                class="w-[30rpx] h-[30rpx] ml-[16rpx]"
                                src="@/static/images/drawing/icon_copy.png"
                            ></image>
                        </view>
                        <view
                            class="px-[20rpx] py-[12rpx] bg-page rounded-[6rpx] text-base max-h-[240rpx] overflow-y-auto"
                        >
                            {{ formData.prompt_en }}
                        </view>
                    </view>

                    <!--    放大图片    -->
                    <view
                        class="mt-[30rpx]"
                        v-if="
                            formData?.status != 2 &&
                            !formData.actions.includes('low_variation1') &&
                            formData.able_edit
                        "
                    >
                        <view class="mt-[8rpx]">
                            <text class="text-base">放大图片</text>
                            <text class="text-xs text-muted ml-[16rpx]">
                                对上面的其中一张图片进行放大
                            </text>
                        </view>
                        <view class="flex justify-between mt-[20rpx]">
                            <view
                                class="property__btn"
                                @click="onEnlargement(formData, 1)"
                            >
                                左上
                            </view>
                            <view
                                class="property__btn"
                                @click="onEnlargement(formData, 2)"
                            >
                                右上
                            </view>
                            <view
                                class="property__btn"
                                @click="onEnlargement(formData, 3)"
                            >
                                左下
                            </view>
                            <view
                                class="property__btn"
                                @click="onEnlargement(formData, 4)"
                            >
                                右下
                            </view>
                        </view>
                    </view>

                    <!--    变体图片    -->
                    <view
                        class="mt-[30rpx]"
                        v-if="
                            formData?.status != 2 &&
                            !formData.actions.includes('low_variation1') &&
                            formData.able_edit
                        "
                    >
                        <view class="mt-[8rpx]">
                            <text class="text-base">变体图片</text>
                            <text class="text-xs text-muted ml-[16rpx]">
                                对上面的其中一张图片进行多样化修改
                            </text>
                        </view>
                        <view class="flex justify-between mt-[20rpx]">
                            <view
                                class="property__btn"
                                @click="onConversion(formData, 1)"
                            >
                                左上
                            </view>
                            <view
                                class="property__btn"
                                @click="onConversion(formData, 2)"
                            >
                                右上
                            </view>
                            <view
                                class="property__btn"
                                @click="onConversion(formData, 3)"
                            >
                                左下
                            </view>
                            <view
                                class="property__btn"
                                @click="onConversion(formData, 4)"
                            >
                                右下
                            </view>
                        </view>
                    </view>

                    <!--    更多操作    -->
                    <view class="mt-[30rpx]">
                        <view class="mt-[8rpx]">
                            <text class="text-base">更多操作</text>
                        </view>
                        <view class="flex flex-wrap mt-[20rpx]">
                            <block v-for="(item, index) in moreArr" :key="index">
                                <view
                                    class="property__btn !px-[40rpx] mb-[20rpx] mr-[20rpx]"
                                    @click="item['func'](formData)"
                                >
                                    <u-icon :name="item.icon" />
                                    <text
                                        class="ml-[10rpx]"
                                        :class="item.className"
                                    >
                                        {{ item.name }}
                                    </text>
                                </view>
                            </block>
                        </view>
                    </view>
                </view>
            </view>
        </template>
    </scroll-view>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'
import { saveImageToPhotosAlbum } from '@/utils/file'
import { useCopy } from '@/hooks/useCopy'

import DrawingLoading from '@/pages/drawing/component/drawing-loading.vue'
import DrawingStatus from '@/pages/drawing/component/drawing-status.vue'
import DrawingPicture from '@/pages/drawing/component/drawing-picture.vue'

const emit = defineEmits<{
    (event: 'change', value: any): void
    (event: 'drawing', value: any): void
    (event: 'delete', value: any): void
    (event: 'split', value: string): void
    (event: 'update:current', value: number): void
    (event: 'update:modelValue', value: any): void
}>()

const props = withDefaults(
    defineProps<{
        current: number // 当前记录选择
        contentList: any // 记录
        isReceiving: boolean // 是否正在生成中
        formData?: any // 绘制结果
    }>(),
    {
        current: 0,
        contentList: [],
        isReceiving: false,
        formData: {
            actions: [],
            prompt: '',
            prompt_en: '',
            progress: 0,
            task_id: '',
            image_id: '',
            image_url: ''
        }
    }
)

const scrollToView = ref<string>('')

// 选择记录
const choiceRecord = (row: any, index: number) => {
    if (props.isReceiving) return
    emit('change', row)
    emit('update:current', index)
}

// 预览图片
const onPreview = (list: any[]) => {
    const url = list.map((item: any) => item.image_url)
    uni.previewImage({
        current: props.current,
        urls: url
    })
}

// 复制文字
const onCopy = async (content: string) => {
    try {
        const { copy } = useCopy()
        await copy(content)
        uni.$u.toast('复制成功')
    } catch (error) {
        uni.$u.toast('复制失败')
        console.log('复制失败', error)
    }
}

// 放大图片
const onEnlargement = (drawing: any, index: number) => {
    const params = drawing
    params.action = 'upsample' + index
    emit('drawing', { drawing: params })
}

// 变体图片
const onConversion = (drawing: any, index: number) => {
    const params = drawing
    params.action = 'variation' + index
    emit('drawing', { drawing: params })
}

// 文件下载
const onFileDownload = (drawing: any) => {
    if (Array.isArray(drawing.image_url)) {
        uni.$u.toast('请点击自己想要保存的图片后长按保存～')
        return
    }
    saveImageToPhotosAlbum(drawing.image_url)
}

// 一键切图
const onSplitPic = async (drawing: any) => {
    scrollToView.value = 'recordList'
    // #ifdef MP
    emit('split', drawing.image)
    // #endif
    // #ifdef H5
    emit('split', drawing.image_url)
    // #endif
    await nextTick()
    scrollToView.value = ''
}

// 重新生成
const onReDrawing = async (drawing: any) => {
    const params: any = {}
    params.action = 'generate'
    params.prompt = drawing.prompt
    params.image_id = ''
    params.scale = drawing.scale
    params.image_base = drawing.image_base
    console.log('重新生成')
    emit('drawing', { drawing: params })
}

const onDelete = async (drawing: any) => {
    const res = await uni.showModal({
        title: '温馨提示',
        content: '是否删除当前绘画?',
        confirmColor: '#FFC94D'
    })
    if (res.confirm) {
        emit('delete', drawing.id)
    }
}

const moreArr: any = [
    {
        icon: 'download',
        name: '下载',
        func: onFileDownload
    },
    // {
    //     icon: IconCollect,
    //     name: '收藏',
    //     func: ''
    // },
    {
        icon: 'edit-pen',
        name: '一键切图',
        func: onSplitPic
    },
    {
        icon: 'reload',
        name: '重新生成',
        func: onReDrawing
    },
    {
        icon: 'trash',
        name: '删除',
        func: onDelete
    }
]
</script>

<style lang="scss" scoped>
.record-item:first-child {
    margin-left: 30rpx;
}
.record-item {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 176rpx;
    height: 176rpx;
    margin-right: 20rpx;
    border-radius: 6rpx;
    border: 1px solid #e5e5e5;
    @apply bg-page;
}
.record-item_active {
    border: 1px solid;
    @apply border-primary;
}

.drawing-property {
    margin: 30rpx;
    padding: 30rpx;
    border-radius: 16rpx;
    border: 1px solid;
    @apply border-primary;
    .property__btn {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 0 44rpx;
        //flex: 1;
        height: 72rpx;
        font-size: 28rpx;
        border-radius: 6px;
        @apply bg-page;
    }
}
</style>
