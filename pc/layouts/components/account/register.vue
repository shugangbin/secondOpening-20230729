<template>
    <div class="flex-1 flex flex-col">
        <div class="flex flex-1 flex-col pt-[30px] px-[30px] min-h-0">
            <span class="text-2xl font-medium text-tx-primary">注册账号</span>
            <ElForm
                class="mt-[30px]"
                ref="formRef"
                size="large"
                :model="formData"
                :rules="formRules"
            >
                <ElFormItem prop="account">
                    <ElInput
                        v-model="formData.account"
                        placeholder="请输入手机号"
                    >
                        <template #prepend>
                            <ElSelect model-value="+86" style="width: 80px">
                                <ElOption label="+86" value="+86" />
                            </ElSelect>
                        </template>
                    </ElInput>
                </ElFormItem>
                <ElFormItem prop="code" v-if="isOpenSendSms">
                    <ElInput v-model="formData.code" placeholder="请输入验证码">
                        <template #suffix>
                            <div
                                class="flex justify-center leading-5 w-[90px] pl-2.5 border-l border-br"
                            >
                                <VerificationCode
                                    ref="verificationCodeRef"
                                    @click-get="sendSms"
                                />
                            </div>
                        </template>
                    </ElInput>
                </ElFormItem>
                <ElFormItem prop="password">
                    <ElInput
                        v-model="formData.password"
                        type="password"
                        show-password
                        placeholder="请输入6-20位数字+字母或符号组合"
                    />
                </ElFormItem>
                <ElFormItem prop="password_confirm">
                    <ElInput
                        v-model="formData.password_confirm"
                        type="password"
                        show-password
                        placeholder="请再次输入密码"
                    />
                </ElFormItem>
                <ElFormItem class="mt-[30px]">
                    <ElButton
                        class="w-full"
                        type="primary"
                        :loading="isLock"
                        @click="handleConfirmLock"
                    >
                        注册
                    </ElButton>
                </ElFormItem>
            </ElForm>
        </div>
        <div class="bg-[#f4f4f4] px-[20px] text-sm py-[15px] flex">
            <div class="flex-1 text-tx-secondary" v-if="isOpenAgreement">
                您注册即同意
                <NuxtLink
                    :to="`/policy/${PolicyAgreementEnum.SERVICE}`"
                    v-slot="{ href }"
                    custom
                >
                    <a class="text-tx-primary" :href="href" target="_blank">
                        用户协议
                    </a>
                </NuxtLink>
                和
                <NuxtLink
                    class="text-tx-primary"
                    :to="`/policy/${PolicyAgreementEnum.PRIVACY}`"
                    v-slot="{ href }"
                    custom
                >
                    <a class="text-tx-primary" :href="href" target="_blank">
                        隐私政策
                    </a>
                </NuxtLink>
            </div>
            <div class="flex justify-center">
                已有账号？<ElButton
                    type="primary"
                    link
                    @click="setLoginPopupType(LoginPopupTypeEnum.LOGIN)"
                >
                    立即登录
                </ElButton>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElSelect,
    ElOption,
    FormInstance,
    FormRules
} from 'element-plus'
import { smsSend } from '~/api/app'
import {
    LoginPopupTypeEnum,
    PolicyAgreementEnum,
    SMSEnum
} from '~/enums/appEnums'
import { useAppStore } from '~/stores/app'
import { useUserStore } from '~/stores/user'
import { register } from '~~/api/account'
const { setLoginPopupType } = useUserStore()
const formRef = shallowRef<FormInstance>()
const formRules: FormRules = {
    account: [
        {
            required: true,
            message: '请输入手机号'
        }
    ],
    code: [
        {
            required: true,
            message: '请输入验证码'
        }
    ],
    password: [
        {
            required: true,
            message: '请输入6-20位数字+字母或符号组合'
        },
        {
            min: 6,
            max: 20,
            message: '密码长度应为6-20'
        }
    ],
    password_confirm: [
        {
            validator(rule: any, value: any, callback: any) {
                if (value === '') {
                    callback(new Error('请再次输入密码'))
                } else if (value !== formData.password) {
                    callback(new Error('两次输入的密码不一致'))
                } else {
                    callback()
                }
            }
        }
    ]
}
const formData = reactive({
    account: '',
    code: '',
    password: '',
    password_confirm: ''
})

const verificationCodeRef = shallowRef()
const sendSms = async () => {
    await formRef.value?.validateField(['account'])
    await smsSend({
        scene: SMSEnum.REGISTER,
        mobile: formData.account
    })

    verificationCodeRef.value?.start()
}
const appStore = useAppStore()
const isOpenSendSms = computed(() => appStore.getLoginConfig?.sms_verify == 1)
const isOpenAgreement = computed(
    () => appStore.getLoginConfig.login_agreement == 1
)
const handleConfirm = async () => {
    await formRef.value?.validate()
    await register(formData)
    setLoginPopupType(LoginPopupTypeEnum.LOGIN)
}
const { lockFn: handleConfirmLock, isLock } = useLockFn(handleConfirm)
</script>

<style lang="scss" scoped></style>
