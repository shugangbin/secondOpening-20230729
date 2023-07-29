<template>
    <div>
        <NuxtLayout name="default">
            <div
                v-if="packageState?.status == 0"
                class="w-full h-full bg-white rounded-[6px] flex items-center justify-center"
            >
                <div class="text-xl">开通会员功能未开启!</div>
            </div>
            <ElScrollbar
                v-else-if="packageState?.status == 1"
                class="bg-white rounded-[6px]"
            >
                <div class="p-[16px]">
                    <div class="text-[18px]">
                        <span class="font-medium">开通会员</span>
                        <span class="text-[14px] text-[#888] ml-6">
                            会员服务为虚拟产品，支付成功后不支持退款
                        </span>
                    </div>
                    <div
                        class="bg-[#FCF5E8] flex items-center pl-[10px] mt-[25px] mb-[25px]"
                    >
                        <img
                            src="@/assets/images/notice.png"
                            alt="公告"
                            class="w-[20px] h-[20px] mr-[10px]"
                        />
                        <el-carousel
                            height="40px"
                            direction="vertical"
                            :autoplay="true"
                            class="w-full"
                        >
                            <el-carousel-item
                                v-for="item in buyPackageLists"
                                :key="item"
                            >
                                <div class="w-full flex items-center">
                                    <ElAvatar :src="item.avatar" :size="28" />
                                    <span class="ml-[10px] leading-[40px]">
                                        {{ item.nickname }}
                                        开通了
                                        {{ item.member_package }}
                                    </span>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <ElScrollbar>
                        <div class="py-[10px] flex">
                            <div
                                v-for="(item, index) in packageState?.lists"
                                :key="index"
                                class="cursor-pointer box-boder flex-none rounded-[14px] mr-[20px]"
                                :class="{
                                    member__active: packageId == item.id
                                }"
                                @click="onChangePackage(item, index)"
                            >
                                <div
                                    class="bg-[red] inline-block text-white px-[5px] py-[2px] text-[12px] rounded-tl-lg rounded-br-lg"
                                >
                                    <span v-if="!item.is_perpetual">
                                        有效期{{ item.duration }}个月
                                    </span>
                                    <span v-else>永久</span>
                                </div>
                                <div
                                    class="flex flex-col items-center rounded-lg mb-[30px] mt-[20px] mx-[20px]"
                                >
                                    <div class="text-black flex items-center">
                                        <Price
                                            :content="item.sell_price"
                                            color="#101010"
                                            mainSize="30px"
                                            minorSize="30px"
                                            fontWeight="600"
                                        >
                                            <template #prefix>
                                                <span class="text-[18px]"
                                                    >¥</span
                                                >
                                            </template>
                                        </Price>
                                        <span class="mx-[2px] text-[18px]">
                                            /
                                        </span>
                                        <div
                                            class="text-[18px] truncate max-w-[92px]"
                                        >
                                            {{ item.name }}
                                        </div>
                                    </div>
                                    <div
                                        v-if="item.lineation_price != '0.00'"
                                        class="text-sm text-[#999]"
                                    >
                                        原价￥{{ item.lineation_price }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ElScrollbar>
                    <div class="my-[10px] flex items-center member_benefit">
                        <div class="text-black">会员权益:</div>
                        <template
                            v-for="benefit in packageValue.member_benefits"
                            :key="benefit.id"
                        >
                            <div
                                class="ml-[15px] flex justify-between items-center"
                                v-show="benefit.is_checked"
                            >
                                <span
                                    v-if="benefit.is_checked"
                                    class="text-[#23B571] mt-[5px]"
                                >
                                    <Icon name="el-icon-Select"></Icon>
                                </span>
                                <span v-else class="text-error mt-[5px]">
                                    <Icon name="el-icon-CloseBold"></Icon>
                                </span>
                                <span> {{ benefit.name }} </span>
                            </div>
                        </template>
                    </div>

                    <div class="flex mt-[20px]" v-if="payWayList.length">
                        <div class="text-lg text-black">支付方式:</div>
                        <div class="ml-[20px] flex">
                            <div class="">
                                <div
                                    v-for="(item, index) in payWayList"
                                    :key="index"
                                    class="cursor-pointer flex items-center w-[150px] mb-[15px] px-[10px] py-[15px] rounded-lg pay_way_unactive mr-2"
                                    :class="{
                                        pay_way_actived:
                                            selectedPayWay == item.pay_way
                                    }"
                                    @click="selectPayWay(item.pay_way)"
                                >
                                    <img
                                        :src="item.icon"
                                        class="h-[24px] w-[24px]"
                                    />
                                    <div class="ml-[5px]">{{ item.name }}</div>
                                    <div
                                        v-if="item.pay_way == selectedPayWay"
                                        class="flex items-center ml-auto"
                                    >
                                        <Icon
                                            name="el-icon-SuccessFilled"
                                            color="#23b571"
                                            :size="18"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div v-if="!isRetry" class="flex ml-[40px]">
                                <div
                                    v-loading="loading"
                                    class="pay_way_actived rounded-[8px] p-[10px] w-[140px] h-[140px]"
                                >
                                    <QrcodeVue
                                        v-if="orderData?.config"
                                        :value="orderData?.config"
                                        :size="120"
                                    />
                                </div>
                                <div
                                    class="flex flex-col justify-center ml-[20px]"
                                >
                                    <div class="text-[#666]">
                                        {{
                                            selectedPayWay == 2
                                                ? '微信扫码支付'
                                                : '支付宝扫码支付'
                                        }}
                                    </div>
                                    <div class="mt-[10px]">
                                        <span>实付金额</span>
                                        <Price
                                            :content="packageValue.sell_price"
                                            color="#FF2C3C"
                                            mainSize="24px"
                                            minorSize="14px"
                                            fontWeight="600"
                                        ></Price>
                                    </div>
                                </div>
                            </div>
                            <div
                                v-else
                                class="ml-[40px] p-[10px] pay_way_actived w-[140px] h-[140px] rounded-[8px] retry"
                                @click="onRetryPay"
                            >
                                <el-icon size="20" color="inherit">
                                    <Refresh />
                                </el-icon>
                                <div class="mt-[6px]">点击重试</div>
                            </div>
                        </div>
                    </div>
                </div>
            </ElScrollbar>
        </NuxtLayout>
    </div>
</template>
<script setup lang="ts">
import { getmemberlists } from '@/api/my'
import { getMemberBuyLog } from '@/api/my'
import QrcodeVue from 'qrcode.vue'
import { memberBuy, getPayWayList, prepay, OrderStatus } from '@/api/pay'
import { ElImage } from 'element-plus'
import feedback from '~/utils/feedback'
import usePolling from '~/composables/usePolling'
import { Refresh } from '@element-plus/icons-vue'

// 套餐索引
const packageIndex = ref<number>(0)
// 当前套餐ID
const packageId = ref<number>(0)
// 套餐状态列表
const packageState = reactive<any>({
    statsu: -1,
    lists: []
})
// 已购买套餐的人列表
const buyPackageLists = ref<any[]>([])

//支付方式列表
const payWayList = ref<any[]>([])
//选中的支付方式
const selectedPayWay = ref<number>(0)
//支付参数
const payParam: any = ref({
    from: 'member',
    pay_way: ''
})
// 订单数据
const orderData = ref()
// 是否重试
const isRetry = ref<boolean>(false)
// 是否加载中
const loading = ref<boolean>(false)

const packageValue = computed(() => {
    return packageState.lists.find((item: any) => item.id == packageId.value)
})

// 获取会员套餐列表
const getMemberPackageList = async () => {
    try {
        const { status, lists } = await getmemberlists()
        packageState.status = status
        packageState.lists = lists
        const defaultvalue = lists.find((item: any) => item.is_default == 1)
        const defaultvalueIndex = lists.findIndex(
            (item: any) => item.is_default == 1
        )
        if (defaultvalue == null) {
            onChangePackage(lists[0], 0)
            packageState.lists[0].is_default = 1
        } else {
            onChangePackage(defaultvalue, defaultvalueIndex)
        }
    } catch (error) {
        console.log('获取会员套餐列表错误=>', error)
    }
}

// 获取购买套餐的人列表
const getBuyMemberPackageList = async () => {
    try {
        const data = await getMemberBuyLog()
        buyPackageLists.value = data
    } catch (error) {
        console.log('获取会员套餐人数列表错误=>', error)
    }
}

// 选择会员
const onChangePackage = async (value: any, index: number) => {
    if (!loading.value) {
        isRetry.value = false
        packageId.value = value.id
        packageIndex.value = index
        await nextTick()
        handleBuyPackage()
    }
}

// 购买
const handleBuyPackage = async () => {
    loading.value = true
    end()
    const orderData = await memberBuy({
        member_package_id: packageId.value
    })
    payParam.value = orderData
    getPayWayListFunc(orderData.order_id)
}

//获取支付方式
const getPayWayListFunc = async (order_id: number) => {
    const { lists } = await getPayWayList({
        order_id: order_id,
        from: 'member'
    })
    payWayList.value = lists
    const defaultValue = payWayList.value.find(
        (item: any) => item.is_default == 1
    )
    if (defaultValue == null) {
        selectedPayWay.value = payWayList.value[0].pay_way
    } else {
        selectedPayWay.value = defaultValue.pay_way
    }
    prePay()
}

// 选择支付方式
const selectPayWay = (way: number) => {
    if (!loading.value) {
        end()
        loading.value = true
        selectedPayWay.value = way
        payParam.value.pay_way = way
        prePay()
    }
}

const runtimeConfig = useRuntimeConfig()

//订单支付
const prePay = async () => {
    try {
        const data = await prepay({
            order_id: payParam.value.order_id,
            pay_way: selectedPayWay.value,
            ...payParam.value,
            redirect: `${runtimeConfig.public.baseUrl}openvip`
        })
        orderData.value = data
        start()
        loading.value = false
    } catch (error) {
        loading.value = false
        console.log('预支付错误=>', error)
        feedback.msgError('支付错误，请检查配置或原因')
    }
}

const check = async () => {
    const { pay_status } = await OrderStatus({
        order_id: payParam.value.order_id,
        from: 'member'
    })
    if (pay_status == 1) {
        feedback.alertSuccess('支付成功')
        end()
        handleBuyPackage()
    }
}

const endCallback = async () => {
    await feedback.alertWarning('支付超时！')
    isRetry.value = true
}

//轮询参数
const { start, end, result } = usePolling(check, {
    totalTime: 300 * 1000,
    callback: endCallback
})

// 点击重试
const onRetryPay = () => {
    isRetry.value = false
    handleBuyPackage()
}

onMounted(() => {
    getMemberPackageList()
    getBuyMemberPackageList()
})
onUnmounted(() => {
    end()
})

definePageMeta({
    auth: true,
    layout: false
})
</script>
<style lang="scss" scoped>
.box-boder {
    border: 1px solid rgba(229, 229, 234, 1);
}
.box-buy {
    background: linear-gradient(86.5deg, #fceee0 0%, #ffc9a0 100%);
    color: rgba(107, 61, 30, 1);
}

.member_benefit {
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(229, 229, 234, 1);
}

.member__active {
    border: 1px solid var(--el-color-primary);
    background-color: rgb(237, 248, 243);
}

.pay_way_actived {
    border: 1px solid var(--el-color-primary) !important;
}
.pay_way_unactive {
    border: 1px solid #e5e5e5;
}

.retry {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
