<template>
    <page-meta :page-style="$theme.pageStyle"> </page-meta>
    <scroll-view class="h-full" scroll-y="true">
        <view class="container">
            <view class="header flex flex-col">
                <!-- #ifndef H5 -->
                <u-sticky
                    h5-nav-height="0"
                    bg-color="transparent"
                    @fixed="isFixed = true"
                    @unfixed="isFixed = false"
                >
                    <u-navbar
                        :is-fixed="false"
                        title="开通会员"
                        :back-icon-color="getNavColor"
                        :title-color="getNavColor"
                        :background="{ backgroundColor: getNavBg }"
                        :border-bottom="false"
                        :title-bold="true"
                        :customBack="goBack"
                    >
                    </u-navbar>
                </u-sticky>
                <!-- #endif -->

                <view
                    v-if="
                        vipTop && vipTop.content.enabled && memberBuyLog.length
                    "
                    class="px-[30rpx] text-white"
                    style="background-color: rgba(255, 239, 230, 0.1)"
                >
                    <swiper
                        class="h-[70rpx]"
                        circular
                        :autoplay="true"
                        :interval="3000"
                        :vertical="true"
                    >
                        <swiper-item
                            v-for="(item, index) in memberBuyLog"
                            :key="index"
                        >
                            <view class="flex items-center h-full">
                                <view class="flex-none">
                                    <u-image
                                        width="48"
                                        height="48"
                                        :src="item.avatar"
                                        alt=""
                                        border-radius="50%"
                                    />
                                </view>

                                <view class="ml-[20rpx] line-clamp-1 text-sm">
                                    {{ item.nickname }} 开通了
                                    {{ item.member_package }}
                                </view>
                            </view>
                        </swiper-item>
                    </swiper>
                </view>
                <view
                    class="container-top px-[30rpx] py-[50rpx] flex items-center flex-1"
                >
                    <view class="flex-1">
                        <view class="text-[50rpx] header-title font-medium">
                            开通会员
                        </view>
                        <view class="mt-[20rpx] text-[30rpx] header-desc">
                            畅享更多次数对话，享更多乐趣
                        </view>
                    </view>
                    <view class="flex-none">
                        <image
                            class="w-[120rpx] h-[120rpx]"
                            src="@/static/images/user/user_vip.png"
                            alt=""
                        />
                    </view>
                </view>
            </view>
            <view v-if="packageStatus === 0" class="py-[300rpx]">
                <u-empty text="功能未开启"></u-empty>
            </view>
            <template v-else>
                <scroll-view class="h-[300rpx]" scroll-x="true" enable-flex>
                    <view class="p-[15rpx] inline-flex">
                        <view
                            class="w-[210rpx] bg-[white] m-[15rpx] rounded-lg package-item"
                            :class="{ active: currentPackage.id == item.id }"
                            v-for="item in packageList"
                            :key="item.id"
                            @click="selectPackage(item)"
                        >
                            <view
                                class="container-charge text-[24rpx] text-white bg-[#FF4747] py-[4rpx] px-[8rpx]"
                            >
                                <text v-if="item.is_perpetual"> 永久 </text>
                                <text v-else>
                                    有效期{{ item.duration }}月
                                </text>
                            </view>
                            <view
                                class="flex flex-col justify-around items-center py-[20rpx] text-center px-[20rpx]"
                            >
                                <view class="text-[28rpx]">{{
                                    item.name
                                }}</view>
                                <view>
                                    <price
                                        :content="item.sell_price"
                                        mainSize="60rpx"
                                        minorSize="26rpx"
                                        fontWeight="500"
                                        color="#101010"
                                    ></price>
                                </view>
                                <view v-if="item.lineation_price > 0">
                                    <price
                                        :content="item.lineation_price"
                                        mainSize="24rpx"
                                        minorSize="24rpx"
                                        color="#999"
                                        lineThrough
                                    ></price>
                                </view>
                            </view>
                        </view>
                    </view>
                </scroll-view>

                <view
                    class="mx-[20rpx] p-[30rpx] bg-white rounded-lg flex justify-between"
                >
                    <view>优惠金额</view>
                    <price
                        prefix="-¥"
                        :content="priceState.discount"
                        mainSize="28rpx"
                        minorSize="28rpx"
                        color="#FF2C3C"
                    ></price>
                </view>
                <view
                    class="mx-[20rpx] p-[30rpx] bg-white rounded-lg mt-[20rpx]"
                >
                    <view class="text-[30rpx] font-medium">支付方式</view>
                    <view class="payway-lists pt-[10rpx]">
                        <u-radio-group
                            v-model="payWay"
                            class="w-full"
                            active-color="#FF4747"
                        >
                            <view
                                class="py-[20rpx] flex items-center w-full payway-item"
                                v-for="(item, index) in payWayData"
                                :key="index"
                                @click="payWay = item.pay_way"
                            >
                                <u-icon
                                    class="flex-none"
                                    :size="48"
                                    :name="item.icon"
                                ></u-icon>
                                <view class="mx-[16rpx] flex-1">
                                    <view class="payway-item--name flex-1">
                                        {{ item.name }}
                                    </view>
                                    <view class="text-muted text-xs">{{
                                        item.extra
                                    }}</view>
                                </view>

                                <u-radio
                                    class="mr-[-20rpx]"
                                    :name="item.pay_way"
                                >
                                </u-radio>
                            </view>
                        </u-radio-group>
                    </view>
                </view>
                <view
                    v-if="
                        vipAdvantage &&
                        vipAdvantage.content.enabled == 1 &&
                        currentBenefits.length
                    "
                    class="mx-[20rpx] bg-white rounded-lg mt-[20rpx]"
                >
                    <view class="text-[30rpx] font-medium p-[30rpx]">
                        {{ vipAdvantage.content.name }}
                    </view>
                    <view class="flex flex-wrap mt-[10rpx]">
                        <view
                            class="w-1/3 flex flex-col items-center mb-[40rpx]"
                            v-for="(item, index) in currentBenefits"
                            :key="index"
                        >
                            <u-image
                                width="96"
                                height="96"
                                :src="getImageUrl(item.image)"
                                alt=""
                            />
                            <view class="pt-[10rpx]">{{ item.name }}</view>
                        </view>
                    </view>
                </view>
                <view
                    v-if="vipNotice && vipNotice.content.enabled == 1"
                    class="mx-[20rpx] p-[30rpx] bg-white rounded-lg mt-[20rpx]"
                >
                    <text class="text-[30rpx] font-medium">{{
                        vipNotice.content.name
                    }}</text>
                    <view class="py-[20rpx]">
                        请您仔细阅读以下说明内容，用户购买会员权益即视为您已阅读并同意说明内容
                    </view>
                    <view
                        style="
                            font-size: 26rpx;
                            white-space: pre-line;
                            color: #888;
                        "
                    >
                        {{ vipNotice.content.data }}
                    </view>
                </view>
                <view
                    v-if="vipEvaluate && vipEvaluate.content.enabled == 1"
                    class="mx-[20rpx] p-[30rpx] bg-white rounded-lg mt-[20rpx]"
                >
                    <text class="text-[30rpx] font-medium">用户评价</text>
                    <template v-for="item in commentLists" :key="item.id">
                        <view class="flex mt-[40rpx]">
                            <view class="flex flex-1">
                                <u-image
                                    width="64"
                                    height="64"
                                    :src="item.image"
                                    alt=""
                                    border-radius="50%"
                                />
                                <view class="ml-[20rpx]">
                                    <view class="font-medium line-clamp-1">{{
                                        item.name
                                    }}</view>
                                    <view class="text-[24rpx] text-[#999999]">
                                        {{ item.member_package }}
                                    </view>
                                </view>
                            </view>
                            <view class="flex-none">
                                <u-rate
                                    v-model="item.comment_level"
                                    disabled
                                    size="28"
                                    active-color="#FABB19"
                                ></u-rate>
                            </view>
                        </view>
                        <view class="mt-[20rpx]">
                            {{ item.comment_content }}
                        </view>
                    </template>
                </view>
                <view class="container-bottom bg-white">
                    <view class="mx-[30rpx] mt-[30rpx]">
                        <u-button
                            type="error"
                            hover-class="none"
                            shape="circle"
                            :custom-style="{
                                height: '82rpx',
                                fontSize: '32rpx',
                                background: '#FFC94D',
                                color: '#000'
                            }"
                            class="pay-btn"
                            :loading="isLock"
                            :disabled="!paySetup.is_open"
                            @click="buyNowLock"
                        >
                            {{ paySetup.tips }}
                            <price
                                v-if="priceState.pay !== '' && paySetup.is_open"
                                :content="priceState.pay"
                                mainSize="32rpx"
                                minorSize="32rpx"
                                color="#000"
                            ></price>
                        </u-button>
                    </view>
                    <view
                        class="flex text-[24rpx] text-[#999999] justify-center p-[20rpx]"
                    >
                        阅读并同意
                        <router-navigate
                            to="/pages/agreement/agreement?type=service"
                        >
                            《用户服务协议》
                        </router-navigate>
                        和
                        <router-navigate
                            to="/pages/agreement/agreement?type=pay"
                        >
                            《支付协议》
                        </router-navigate>
                    </view>
                </view>
            </template>
        </view>
    </scroll-view>

    <page-status :status="status"> </page-status>

    <u-popup
        v-model="showGiveUpPopup"
        mode="center"
        closeable
        :mask-close-able="false"
        border-radius="20"
    >
        <view class="give-up-popup px-[20rpx] py-[40rpx]">
            <view class="text-center text-[#55300F] mb-[40rpx]">
                <view class="text-[34rpx] font-medium">
                    确定要放弃购买会员吗？
                </view>
                <view
                    v-if="
                        vipAdvantage &&
                        vipAdvantage.content.enabled == 1 &&
                        currentBenefits.length
                    "
                    class="text-sm mt-[20rpx]"
                >
                    - 你可能会错过以下权益 -
                </view>
            </view>
            <view
                v-if="
                    vipAdvantage &&
                    vipAdvantage.content.enabled == 1 &&
                    currentBenefits.length
                "
                class="py-[20rpx] rounded-lg"
            >
                <view class="flex flex-wrap">
                    <view
                        class="w-1/3 flex flex-col items-center pb-[30rpx]"
                        v-for="(item, index) in currentBenefits"
                        :key="index"
                    >
                        <u-image
                            width="80"
                            height="80"
                            :src="getImageUrl(item.image)"
                            alt=""
                        />
                        <view class="pt-[10rpx]">{{ item.name }}</view>
                    </view>
                </view>
            </view>
            <view class="flex pt-[20rpx]">
                <view class="flex-1">
                    <u-button
                        type="primary"
                        shape="circle"
                        hover-class="none"
                        :custom-style="{
                            width: '100%',
                            background: '#fff',
                            color: '#000'
                        }"
                        @click="openCoupon"
                    >
                        残忍放弃
                    </u-button>
                </view>
                <view class="flex-1 ml-[20rpx]">
                    <u-button
                        type="primary"
                        shape="circle"
                        hover-class="none"
                        :custom-style="{
                            width: '100%',
                            background:
                                'linear-gradient(180.00deg, #ffc94d 0%, #ffb814 100%)',
                            color: '#000'
                        }"
                        @click="showGiveUpPopup = false"
                    >
                        继续支付
                    </u-button>
                </view>
            </view>
        </view>
    </u-popup>
    <u-popup
        v-model="showCouponPopup"
        mode="center"
        closeable
        :mask-close-able="false"
        border-radius="20"
        close-icon="close-circle"
        close-icon-size="50"
        close-icon-color="#fff"
        :customStyle="{ background: 'transparent' }"
    >
        <view class="coupon-popup flex flex-col items-center">
            <view class="text-center text-[#7B3E0E]">
                <view class="text-[40rpx]"
                    >您有<price
                        prefix=""
                        :content="currentPackage.retrieve_amount"
                        mainSize="44rpx"
                        minorSize="44rpx"
                        color="#FF4B4B"
                    ></price
                    >元优惠券未使用</view
                >
                <view class="text-[34rpx] mt-[20rpx]">确定要放弃吗？</view>
            </view>
            <view
                class="coupon-money flex flex-col items-center justify-center"
            >
                <view>
                    <price
                        :content="currentPackage.retrieve_amount"
                        mainSize="80rpx"
                        minorSize="40rpx"
                        color="#8D5836"
                    ></price>
                </view>
                <view class="text-[32rpx] text-[#8D5836]">无门槛</view>
            </view>
            <u-button
                type="primary"
                shape="circle"
                hover-class="none"
                :custom-style="{
                    width: '400rpx',
                    background:
                        'linear-gradient(180.00deg, #ffe8cf 0%, #e1ab7a 100%)',
                    color: '#6A3D15',
                    height: '100rpx',
                    fontWeight: 600,
                    fontSize: '40rpx',
                    boxShadow: '0 3px 10px #0000001a'
                }"
                @click="useCoupon"
            >
                立即使用
            </u-button>
        </view>
    </u-popup>
    <payment-check
        v-model:show="payState.showCheck"
        :from="payState.from"
        :order-id="payState.orderId"
        @success="paySuccess"
    />
    <u-popup
        v-model="payState.showPaySuccess"
        :safe-area-inset-bottom="true"
        :mask-close-able="false"
        border-radius="14"
        :z-index="899"
        round
        mode="center"
        width="600"
    >
        <view class="pt-[20rpx]">
            <view class="px-[30rpx] py-[40rpx]">
                <view class="text-success text-center">
                    <u-icon name="checkmark-circle-fill" size="100" />
                </view>
                <view class="text-xl font-medium mt-[20rpx] text-center">
                    支付成功
                </view>
                <view class="flex mt-[60rpx]">
                    <view class="flex-1 ml-[20rpx]">
                        <router-navigate
                            class="h-[72rpx] leading-[72rpx] rounded-full bg-primary text-center text-btn-text"
                            to="/pages/index/index"
                            nav-type="reLaunch"
                        >
                            <text>返回首页</text>
                        </router-navigate>
                    </view>
                </view>
            </view>
        </view>
    </u-popup>
    <router-navigate to="/pages/index/index" navType="navigate">
        <div
            class="fixed bottom-[400rpx] rounded-[50%] right-[20rpx] flex flex-col items-center justify-center bg-white w-[90rpx] h-[90rpx] z-999"
            style="box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px"
        >
            <u-icon :name="icon_home" :size="38"></u-icon>
            <div class="text-[22rpx]">首页</div>
        </div>
    </router-navigate>
    <!-- #ifdef MP-WEIXIN                                                                                                 -->
    <page-container
        v-if="showPageContainer"
        :show="true"
        :overlay="false"
        @beforeleave="beforeLeavePage"
    />
    <!-- #endif -->
</template>
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { computed, onUnmounted, ref } from 'vue'
import icon_home from '@/static/images/icon/icon_home.png'
import {
    getCommentLists,
    getMemberBuyLog,
    getMemberLists,
    memberBuy
} from '@/api/member'
import { getDecorate } from '@/api/shop'
import { useAppStore } from '@/stores/app'
import { ClientEnum, PageStatusEnum, PayStatusEnum } from '@/enums/appEnums'
import { reactive } from 'vue'
import { useLockFn } from '@/hooks/useLockFn'
import { series } from '@/utils/util'
import { PayWayEnum, pay } from '@/utils/pay'
import { getPayWay, prepay, getIosPayConfig } from '@/api/pay'
import { onMounted } from 'vue'
import * as math from 'mathjs'
import PaymentCheck from '@/components/payment/check.vue'
import { client } from '@/utils/client'
import { useRouter } from 'uniapp-router-next'
// #ifdef H5
import wechatOa, { UrlScene } from '@/utils/wechat'
// #endif

import { useUserStore } from '@/stores/user'

const router = useRouter()
const isFixed = ref(false)
const status = ref(PageStatusEnum.LOADING)
const getNavBg = computed(() => {
    return isFixed.value ? '#FFFFFF' : 'transparent'
})
const payState = reactive({
    orderId: 0,
    from: 'recharge',
    redirect: '/packages/pages/open_vip/open_vip',
    showCheck: false,
    showPaySuccess: false
})
const system = uni.getSystemInfoSync()
const paySetup = ref({
    is_open: 1,
    tips: '立即支付'
})

// 获取支付配置
const getPaySetup = async () => {
    try {
        paySetup.value = await getIosPayConfig()
        console.log(paySetup.value)
    } catch (error) {
        console.log('获取支付设置错误=>', error)
    }
}

const showGiveUpPopup = ref(false)
const showCouponPopup = ref(false)
const showPageContainer = ref(true)
const currentPackage = ref<any>({})
const currentBenefits = computed(() => {
    console.log(currentPackage.value.member_benefits)
    return (
        currentPackage.value.member_benefits?.filter(
            (benefit: any) => !!benefit.is_checked
        ) || []
    )
})

const goBack = () => {
    if (showPageContainer.value) {
        beforeLeavePage()
    } else {
        router.navigateBack()
    }
}

const selectPackage = (item: any) => {
    const { retrievePackage } = priceState
    currentPackage.value = item
    if (retrievePackage.id == item.id) {
        const { retrieve_amount, sell_price } = retrievePackage
        priceState.discount = retrieve_amount
        priceState.pay = math.max(
            math.max(
                math.add(
                    math.bignumber(sell_price),
                    math.bignumber(-retrieve_amount)
                ),
                0
            ),
            0
        )
        return
    }
    priceState.discount = 0
    priceState.pay = item.sell_price
}
const getNavColor = computed(() => {
    return isFixed.value ? '#000000' : '#ffffff'
})

const priceState = reactive({
    discount: 0,
    pay: undefined,
    retrievePackage: {} as any
})

const packageList = ref<any[]>([])
const packageStatus = ref(1)
const getMemberListsData = async () => {
    const data = await getMemberLists()
    packageList.value = data.lists
    const defaultPackage =
        packageList.value.find((item) => item.is_default) ||
        (packageList.value.length && packageList.value[0])
    packageStatus.value = data.status
    if (packageStatus.value === 0) {
        showPageContainer.value = false
    }
    selectPackage(defaultPackage || {})
}

const pagesInfo = ref<any[]>([])
const getDecorateData = async () => {
    const data = await getDecorate({ id: 2 })
    pagesInfo.value = JSON.parse(data.data)
}
const commentLists = ref<any[]>([])
const getCommentListsData = async () => {
    const data = await getCommentLists({
        page_no: 1,
        page_size: vipEvaluate.value?.content?.data
    })
    commentLists.value = data.lists
}

const memberBuyLog = ref<any[]>([])
const getMemberBuyLogData = async () => {
    const data = await getMemberBuyLog()
    memberBuyLog.value = data
}
const payWayData = ref<any[]>([])
const payWay = ref(2)
const getPayWayData = async () => {
    const data = await getPayWay({
        from: 'member'
    })
    payWayData.value = data.lists
    const checkPay =
        payWayData.value.find((item: any) => item.is_default) ||
        payWayData.value[0]
    payWay.value = checkPay?.pay_way
}

const { getImageUrl } = useAppStore()
const vipTop = computed(() => getCurrentCom('vip-top'))
const vipAdvantage = computed(() => getCurrentCom('vip-advantage'))
const vipNotice = computed(() => getCurrentCom('vip-notice'))
const vipEvaluate = computed(() => getCurrentCom('vip-evaluate'))
const getCurrentCom = (name: string) => {
    return pagesInfo.value.find((item) => item.name === name)
}

const placeOrder = async () => {
    if (!currentPackage.value.id) {
        return Promise.reject('请选择会员套餐')
    }
    const data = await memberBuy({
        member_package_id: currentPackage.value.id,
        discount_amount: priceState.discount
    })
    payState.orderId = data.order_id
    payState.from = data.from
    return data
}
const userStore = useUserStore()
const checkIsBindWx = async () => {
    if (
        userStore.userInfo.is_auth == 0 &&
        [ClientEnum.OA_WEIXIN, ClientEnum.MP_WEIXIN].includes(client) &&
        payWay.value == PayWayEnum.WECHAT
    ) {
        switch (client) {
            case ClientEnum.OA_WEIXIN: {
                wechatOa.getUrl(UrlScene.BASE, 'snsapi_base', {
                    id: payState.orderId,
                    from: payState.from
                })
                return Promise.reject()
            }
            case ClientEnum.MP_WEIXIN: {
                const data = await uni.login()
                return data.code
            }
        }
    }
}
const payment = async (code: string | undefined) => {
    // 调用预支付
    try {
        const data = await prepay({
            order_id: payState.orderId,
            from: payState.from,
            pay_way: payWay.value,
            redirect: payState.redirect,
            code
        })
        const res = await pay.payment(data.pay_way, data.config)
        return res
    } catch (error) {
        return Promise.reject(error)
    }
}
const paySuccess = () => {
    isPay = true
    showPageContainer.value = false
    payState.showPaySuccess = true
}
let isPay = false
const { isLock, lockFn: buyNowLock } = useLockFn(async () => {
    try {
        await placeOrder()
        const code = await checkIsBindWx()
        const res: PayStatusEnum = await payment(code)
        if (res == PayStatusEnum.SUCCESS) {
            paySuccess()
        }
    } catch (error) {
        error && uni.$u.toast(error)
        console.log(error)
    }
})

const beforeLeavePage = () => {
    showPageContainer.value = false
    if (isPay) {
        router.navigateBack()
        return
    }
    showGiveUpPopup.value = true
}

const openCoupon = () => {
    const { retrieve_amount, is_retrieve } = currentPackage.value
    if (retrieve_amount && is_retrieve) {
        showCouponPopup.value = true
        showGiveUpPopup.value = false
    } else {
        router.navigateBack()
    }
}

const useCoupon = () => {
    const { retrieve_amount, sell_price } = currentPackage.value
    priceState.discount = retrieve_amount
    priceState.pay = math.max(
        math.add(math.bignumber(sell_price), math.bignumber(-retrieve_amount)),
        0
    )
    priceState.retrievePackage = currentPackage.value
    showCouponPopup.value = false
}

onLoad(async (options: any) => {
    // h5支付用于弹起手动确认支付弹窗
    if (options.id && options.from) {
        payState.orderId = options.id
        payState.from = options.from
    }

    if (options?.checkPay) {
        payState.showCheck = true
    }

    try {
        await Promise.all([
            getDecorateData(),
            getMemberListsData(),
            getPayWayData()
        ])
        if (vipEvaluate.value?.content?.enabled == 1) {
            await getCommentListsData()
        }
        if (vipTop.value?.content?.enabled == 1) {
            await getMemberBuyLogData()
        }
        status.value = PageStatusEnum.NORMAL
    } catch (error) {
        status.value = PageStatusEnum.ERROR
    }
})

onMounted(async () => {
    // #ifdef H5
    const options = wechatOa.getAuthData()
    if (options.code && options.scene === UrlScene.BASE) {
        payWay.value = PayWayEnum.WECHAT
        try {
            const res: PayStatusEnum = await payment(options.code)
            if (res == PayStatusEnum.SUCCESS) {
                paySuccess()
            }
        } catch (error) {
            uni.$u.toast(error)
        } finally {
            wechatOa.setAuthData({})
        }
    }
    window.history.pushState(null, '', document.URL)
    window.addEventListener('popstate', goBack, false)
    // #endif
    // #ifdef MP
    if (system.system.indexOf('iOS') !== -1) {
        await getPaySetup()
    }
    // #endif
})

onUnmounted(() => {
    // #ifdef H5
    window.removeEventListener('popstate', goBack, false)
    // #endif
})
</script>
<style lang="scss">
page {
    height: 100%;
}
.container {
    padding-bottom: calc(220rpx + env(safe-area-inset-bottom));

    .header {
        background: url('../../static/images/vip_bg.png') no-repeat;
        background-size: cover;
        background-position: center center;
        .header-title {
            background-image: linear-gradient(
                0.26deg,
                #e1ab7a 0%,
                #e1ab7a 21.17%,
                #ffe8cf 92.32%,
                #ffefe6 100%
            );
            -webkit-background-clip: text;
            color: transparent;
        }
        .header-desc {
            background-image: linear-gradient(
                0.26deg,
                #e1ab7a 0%,
                #e1ab7a 21.17%,
                #ffe8cf 92.32%,
                #ffefe6 100%
            );
            -webkit-background-clip: text;
            color: transparent;
        }
    }

    &-charge {
        display: inline-block;
        border-radius: 16rpx 0 16rpx 0;
    }
    &-bottom {
        position: fixed;
        bottom: 0;
        left: 0rpx;
        right: 0rpx;
        padding-bottom: env(safe-area-inset-bottom);

        .pay-btn button[disabled] {
            color: #999999 !important;
            background-color: #f2f2f2 !important;
        }
    }
    .package-item {
        border: 1px solid transparent;
        &.active {
            background: #fffaf0;
            border-color: #ffc94d;
        }
    }
}
.give-up-popup {
    border-radius: 20rpx;
    background: linear-gradient(180deg, #fff 0%, #fff2e3 100%);
    width: 640rpx;
}
.coupon-popup {
    background: url('../../static/images/coupon_bg.png') no-repeat;
    width: 670rpx;
    height: 800rpx;
    background-position: center 100rpx;
    padding: 140rpx 100rpx 0;
    background-size: 580rpx 660rpx;
    .coupon-money {
        background: url('../../static/images/money_bg.png') no-repeat;
        width: 340rpx;
        height: 180rpx;
        background-size: 100%;
        margin: 60rpx 0 120rpx;
    }
}
</style>
