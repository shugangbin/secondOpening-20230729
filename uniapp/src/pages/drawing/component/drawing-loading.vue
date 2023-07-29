<template>
    <!--    绘画中    -->
    <view
        class="flex flex-col justify-center items-center w-[500rpx] h-[500rpx] px-[50rpx] bg-page"
    >
        <u-loading
            mode="circle"
            :color="$theme.primaryColor"
            size="40"
        ></u-loading>
        <view class="text-primary text-sm mt-[20rpx]">
            正在绘画中
        </view>
<!--        <view class="mt-[50rpx] w-[400rpx]">-->
<!--            <u-line-progress-->
<!--                :active-color="$theme.primaryColor"-->
<!--                :percent="progress"-->
<!--                :height="16"-->
<!--                :show-percent="false"-->
<!--            ></u-line-progress>-->
<!--        </view>-->
    </view>
</template>

<script lang="ts" setup>
// const props = withDefaults(
//     defineProps<{
//         progress?: number | any // 进度
//     }>(),
//     {
//         progress: 0
//     }
// )
</script>

<style scoped>
</style>
