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
        class="register bg-white min-h-full flex flex-col items-center px-[40rpx] pt-[40rpx] box-border"
    >
        <view class="w-full">
            <u-form borderBottom :label-width="150">
                <u-form-item label="手机号" borderBottom>
                    <u-input
                        class="flex-1"
                        v-model="formData.account"
                        :border="false"
                        placeholder="请输入手机号码"
                    />
                </u-form-item>
                <u-form-item label="验证码" v-if="isOpenSendSms">
                    <u-input
                        class="flex-1"
                        v-model="formData.code"
                        placeholder="请输入验证码"
                        :border="false"
                    />
                    <view
                        class="border-l border-solid border-0 border-light pl-3 leading-4 ml-3 w-[180rpx]"
                        @click="sendSms"
                    >
                        <u-verification-code
                            ref="uCodeRef"
                            :seconds="60"
                            @change="codeChange"
                            change-text="x秒"
                        />
                        <text
                            :class="
                                isValidMobile ? 'text-primary' : 'text-muted'
                            "
                        >
                            {{ codeTips }}
                        </text>
                    </view>
                </u-form-item>
                <u-form-item label="设置密码" borderBottom>
                    <u-input
                        class="flex-1"
                        type="password"
                        v-model="formData.password"
                        placeholder="请输入字母+数字组合的密码"
                        :border="false"
                    />
                </u-form-item>
                <u-form-item label="确认密码" borderBottom>
                    <u-input
                        class="flex-1"
                        type="password"
                        v-model="formData.password_confirm"
                        placeholder="再次输入密码"
                        :border="false"
                    />
                </u-form-item>
            </u-form>
            <view class="mt-[40rpx]">
                <agreement ref="agreementRef" />
            </view>
            <view class="mt-[60rpx]">
                <u-button
                    type="primary"
                    shape="circle"
                    @click="accountRegister"
                >
                    注册
                </u-button>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { register } from '@/api/account'
import { useAppStore } from '@/stores/app'
import { computed, reactive, ref, shallowRef } from 'vue'
import { useRouter } from 'uniapp-router-next'
import { smsSend } from '@/api/app'
import { SMSEnum } from '@/enums/appEnums'
const appStore = useAppStore()
const router = useRouter()
const agreementRef = shallowRef()
const formData = reactive({
    account: '',
    code: '',
    password: '',
    password_confirm: ''
})
const uCodeRef = shallowRef()
const codeTips = ref('')
const codeChange = (text: string) => {
    codeTips.value = text
}
const isValidMobile = computed(() => uni.$u.test.mobile(formData.account))
const isOpenSendSms = computed(() => appStore.getLoginConfig?.sms_verify == 1)
const sendSms = async () => {
    if (!formData.account || !isValidMobile.value) return
    if (uCodeRef.value?.canGetCode) {
        await smsSend({
            scene: SMSEnum.REGISTER,
            mobile: formData.account
        })
        uni.$u.toast('发送成功')
        uCodeRef.value?.start()
    }
}

const accountRegister = async () => {
    if (!agreementRef.value?.checkAgreement()) {
        return
    }
    if (!formData.account) return uni.$u.toast('请输入手机号码')
    if (!formData.code && isOpenSendSms.value) return uni.$u.toast('请输入密码')
    if (!formData.password) return uni.$u.toast('请输入密码')
    if (!formData.password_confirm) return uni.$u.toast('请再次输入密码')
    if (formData.password != formData.password_confirm)
        return uni.$u.toast('两次输入的密码不一致')
    await register(formData)
    setTimeout(() => {
        router.navigateBack()
    }, 1500)
}
</script>

<style lang="scss">
page {
    height: 100%;
}
</style>
