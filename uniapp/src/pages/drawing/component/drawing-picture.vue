<template>
    <div class="preview-picture">
        <!--    单张图片    -->
        <u-image
            v-if="!Array.isArray(picture)"
            :src="picture"
            width="500"
            height="100%"
            mode="widthFix"
            @click="onPreview"
        >
            <template #loading>
                <view
                    class="flex flex-col justify-center items-center w-full h-[500rpx] bg-[#F7F9FD]"
                >
                    <u-loading
                        mode="circle"
                        :color="$theme.primaryColor"
                        size="40"
                    ></u-loading>
                    <view class="text-primary text-sm mt-[20rpx]">
                        加载中
                    </view>
                </view>
            </template>
        </u-image>
        <!--    多张图片    -->
        <template v-else>
            <u-image
                class="image__item"
                width="240"
                mode="widthFix"
                v-for="(item, index) in picture"
                :key="index"
                :src="item"
                @click="onPreview(picture, index)"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (event: 'preview'): void
}>()

const props = withDefaults(
    defineProps<{
        picture: string | string[] // 图片
    }>(),
    {
        picture: ''
    }
)

const onPreview = (picture: string[], index: number) => {
    if (picture) {
        uni.previewImage({
            current: index,
            urls: picture
        })
    } else {
        emit('preview')
    }
}
</script>

<style lang="scss" scoped>
.preview-picture {
    overflow: hidden;
    margin: 0 auto;
    min-height: 500rpx;
    padding: 0 60rpx;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    .image__item {
        width: 240rpx;
        margin: 5px;
    }
    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    .rotate-loading {
        animation: rotate 2s linear infinite;
    }
}
</style>
