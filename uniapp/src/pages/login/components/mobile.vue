<template>
    <view>
        <view class="mb-[60rpx]">
            <u-form>
                <u-form-item>
                    <u-icon
                        class="mr-2"
                        :size="36"
                        name="/static/images/icon/icon_mobile.png"
                    />
                    <u-input
                        class="flex-1"
                        v-model="formData.account"
                        :border="false"
                        placeholder="请输入手机号码"
                    />
                </u-form-item>
                <u-form-item v-if="isCodeLogin">
                    <u-icon
                        class="mr-2"
                        :size="36"
                        name="/static/images/icon/icon_code.png"
                    />
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
                <u-form-item v-if="isPasswordLogin">
                    <u-icon
                        class="mr-2"
                        :size="36"
                        name="/static/images/icon/icon_password.png"
                    />
                    <u-input
                        class="flex-1"
                        v-model="formData.password"
                        type="password"
                        placeholder="请输入密码"
                        :border="false"
                    />
                    <router-navigate to="/pages/forget_pwd/forget_pwd">
                        <view
                            class="border-l border-solid border-0 border-light pl-3 text-muted leading-4 ml-3"
                        >
                            忘记密码？
                        </view>
                    </router-navigate>
                </u-form-item>
            </u-form>
        </view>

        <view class="mb-[40rpx]">
            <agreement ref="agreementRef" />
        </view>
        <u-button
            type="primary"
            shape="circle"
            hover-class="none"
            @click="handleLogin"
        >
            登 录
        </u-button>

        <view class="text-content flex justify-between mt-[40rpx]">
            <view class="flex-1">
                <view
                    v-if="isCodeLogin"
                    @click="changeLoginScene(MobileSceneEnum.PASSWORD)"
                >
                    手机密码登录
                </view>
                <view
                    v-if="isPasswordLogin"
                    @click="changeLoginScene(MobileSceneEnum.CODE)"
                >
                    手机验证码登录
                </view>
            </view>

            <router-navigate to="/pages/register/register">
                注册账号
            </router-navigate>
        </view>
    </view>
</template>
<script setup lang="ts">
import { smsSend } from '@/api/app'
import { SMSEnum } from '@/enums/appEnums'
import { computed, reactive, ref, shallowRef } from 'vue'
const emit = defineEmits<{
    (event: 'login', value: any): void
}>()
const agreementRef = shallowRef()
enum MobileSceneEnum {
    CODE = 1,
    PASSWORD = 2
}

const formData = reactive({
    scene: MobileSceneEnum.CODE,
    account: '',
    code: '',
    password: ''
})

const isCodeLogin = computed(() => formData.scene === MobileSceneEnum.CODE)
const isPasswordLogin = computed(
    () => formData.scene === MobileSceneEnum.PASSWORD
)
const isValidMobile = computed(() => uni.$u.test.mobile(formData.account))
const changeLoginScene = (scene: MobileSceneEnum) => {
    formData.scene = scene
}

const uCodeRef = shallowRef()
const codeTips = ref('')
const codeChange = (text: string) => {
    codeTips.value = text
}

const sendSms = async () => {
    if (!formData.account || !isValidMobile.value) return
    if (uCodeRef.value?.canGetCode) {
        await smsSend({
            scene: SMSEnum.LOGIN,
            mobile: formData.account
        })
        uni.$u.toast('发送成功')
        uCodeRef.value?.start()
    }
}

const handleLogin = () => {
    if (!agreementRef.value?.checkAgreement()) {
        return
    }
    if (!formData.account) return uni.$u.toast('请输入手机号码')
    if (formData.scene == MobileSceneEnum.PASSWORD) {
        if (!formData.password) return uni.$u.toast('请输入密码')
    }
    if (formData.scene == MobileSceneEnum.CODE) {
        if (!formData.code) return uni.$u.toast('请输入验证码')
    }
    emit('login', formData)
}
</script>
