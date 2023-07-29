<template>
    <div class="pb-[16px]">
        <div class="text-2xl font-medium text-tx-primary">
            {{ isPasswordLogin ? '手机密码登录' : '手机验证码登录' }}
        </div>
        <div class="mt-[35px]">
            <ElForm
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
                <ElFormItem prop="password" v-if="isPasswordLogin">
                    <ElInput
                        v-model="formData.password"
                        type="password"
                        show-password
                        placeholder="请输入密码"
                    />
                </ElFormItem>

                <ElFormItem prop="code" v-if="isCodeLogin">
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

                <div class="flex">
                    <div class="flex-1">
                        <ElButton
                            v-if="isPasswordLogin"
                            type="primary"
                            link
                            @click="changeLoginScene(MobileSceneEnum.CODE)"
                        >
                            手机验证码登录
                        </ElButton>
                        <ElButton
                            v-if="isCodeLogin"
                            type="primary"
                            link
                            @click="changeLoginScene(MobileSceneEnum.PASSWORD)"
                        >
                            手机密码登录
                        </ElButton>
                    </div>

                    <ElButton
                        v-if="isPasswordLogin"
                        link
                        @click="
                            userStore.setLoginPopupType(
                                LoginPopupTypeEnum.FORGOT_PWD
                            )
                        "
                    >
                        忘记密码？
                    </ElButton>
                </div>
                <ElFormItem class="mt-[30px]">
                    <ElButton
                        class="w-full"
                        type="primary"
                        :loading="isLock"
                        @click="loginLock"
                    >
                        登录
                    </ElButton>
                </ElFormItem>
            </ElForm>
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
import { login } from '~/api/account'
import { smsSend } from '~/api/app'
import { LoginPopupTypeEnum, SMSEnum } from '~/enums/appEnums'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const formRef = shallowRef<FormInstance>()
enum MobileSceneEnum {
    CODE = 1,
    PASSWORD = 2
}

const formRules: FormRules = {
    account: [
        {
            required: true,
            message: '请输入手机号'
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码'
        }
    ],
    code: [
        {
            required: true,
            message: '请输入验证码'
        }
    ]
}
const formData = reactive({
    code: '',
    account: '',
    password: '',
    scene: MobileSceneEnum.CODE
})

const isCodeLogin = computed(() => formData.scene === MobileSceneEnum.CODE)
const isPasswordLogin = computed(
    () => formData.scene === MobileSceneEnum.PASSWORD
)

const changeLoginScene = (scene: MobileSceneEnum) => {
    formData.scene = scene
}

const verificationCodeRef = shallowRef()
const sendSms = async () => {
    await formRef.value?.validateField(['account'])
    await smsSend({
        scene: SMSEnum.LOGIN,
        mobile: formData.account
    })

    verificationCodeRef.value?.start()
}

const { lockFn: loginLock, isLock } = useLockFn(async () => {
    await formRef.value?.validate()
    const data = await login(formData)
    userStore.login(data.token)
    location.reload()
    await userStore.getUser()
    userStore.toggleShowLogin(false)
})
</script>

<style lang="scss" scoped></style>
