<template>
    <div class="flex-1 pt-[30px] px-[30px] min-h-0">
        <WeixinLogin v-if="isWeixinLogin" />
        <MobileLogin v-if="isMobileLogin" />
    </div>
    <div
        class="flex items-center justify-center pb-[20px]"
        v-if="showOtherWayBtn"
    >
        <div
            class="cursor-pointer border border-[#666] rounded-[4px] w-[150px] flex justify-center items-center h-[40px]"
            v-if="isWeixinLogin"
            @click="changeLoginWay(LoginWayEnum.MOBILE)"
        >
            <Icon name="el-icon-Iphone" :size="18" />
            <span class="ml-[10px]">手机号登录</span>
        </div>
        <div
            class="cursor-pointer border border-[#666] rounded-[4px] w-[150px] flex justify-center items-center h-[40px]"
            v-if="isMobileLogin"
            @click="changeLoginWay(LoginWayEnum.WEIXIN)"
        >
            <img
                class="w-[20px] h-[20px]"
                src="@/assets/images/icon/icon_wx.png"
            />
            <span class="ml-[10px]">微信登录</span>
        </div>
    </div>
    <div class="bg-[#f4f4f4] px-[20px] py-[15px] text-sm flex">
        <div class="flex-1 text-tx-secondary" v-if="isOpenAgreement">
            您登录即同意
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
        <ElButton
            v-if="hasMobileLogin"
            type="primary"
            link
            @click="userStore.setLoginPopupType(LoginPopupTypeEnum.REGISTER)"
        >
            注册新账号
        </ElButton>
    </div>
</template>
<script setup lang="ts">
import { ElButton } from 'element-plus'
import WeixinLogin from './weixin-login.vue'
import MobileLogin from './mobile-login.vue'
import { useAppStore } from '~/stores/app'
import { LoginPopupTypeEnum, PolicyAgreementEnum } from '~/enums/appEnums'
import { useUserStore } from '~/stores/user'

const appStore = useAppStore()
const userStore = useUserStore()
const isOpenAgreement = computed(
    () => appStore.getLoginConfig.login_agreement == 1
)
enum LoginWayEnum {
    WEIXIN = 1,
    MOBILE = 2
}
const loginWay = ref(LoginWayEnum.WEIXIN)
const isWeixinLogin = computed(() => loginWay.value == LoginWayEnum.WEIXIN)
const isMobileLogin = computed(() => loginWay.value == LoginWayEnum.MOBILE)
const showOtherWayBtn = computed(
    () => appStore.getLoginConfig.login_way?.length > 1
)
const changeLoginWay = (way: LoginWayEnum) => {
    loginWay.value = way
}
const hasMobileLogin = computed(() =>
    appStore.getLoginConfig.login_way?.find(
        (item) => Number(item) == LoginWayEnum.MOBILE
    )
)
watch(
    () => appStore.getLoginConfig,
    (value) => {
        if (value.login_way) {
            loginWay.value = value.login_way[0]
        }
    },
    {
        immediate: true
    }
)
</script>

<style lang="scss">
.login-popup {
    .el-dialog__header {
        padding: 0;
    }
    .el-dialog__body {
        padding: 0 !important;
    }
}
</style>
