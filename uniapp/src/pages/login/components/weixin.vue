<template>
    <view class="my-[30rpx]">
        <u-button
            type="primary"
            shape="circle"
            hover-class="none"
            :loading="loading"
            @click="handleLogin"
        >
            <u-icon name="weixin-fill" size="40" />
            <text class="ml-[10rpx]"> 微信登录</text>
        </u-button>
    </view>
    <view class="py-[30rpx] flex justify-center">
        <agreement ref="agreementRef" />
    </view>
</template>
<script setup lang="ts">
import { shallowRef } from 'vue'
defineProps<{
    loading: boolean
}>()
const emit = defineEmits<{
    (event: 'login'): void
}>()
const agreementRef = shallowRef()
const handleLogin = () => {
    if (agreementRef.value?.checkAgreement()) {
        emit('login')
    }
}
</script>
