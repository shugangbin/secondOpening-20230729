<template>
    <ElDialog
        v-if="popShow"
        v-model="popShow"
        width="540px"
        title="立即购买"
        center
        @close="closePop"
    >
        <div class="px-[30px] py-[15px]">
            <ElForm label-width="80px">
                <!-- <ElFormItem label="充值条数" v-if="type == 'recharge'">
                    <div>{{ order.number }}条</div>
                </ElFormItem> -->
                <slot name="top" v-bind="order" />
                <ElFormItem label="支付金额">
                    <div>¥{{ order.sell_price }}</div>
                </ElFormItem>
                <ElFormItem label="实付金额">
                    <div class="text-[#FF4141]">¥{{ order.sell_price }}</div>
                </ElFormItem>
                <div class="payBox px-[12px] py-[10px]">
                    <!-- <ElFormItem label="支付方式"> </ElFormItem> -->
                    <div>支付方式</div>
                    <div class="flex mt-[10px] items-center">
                        <div>
                            <div
                                v-for="(item, index) in payWayList.lists"
                                :key="index"
                                class="flex items-center px-[30px] py-[10px] rounded-lg unactive mr-2 mb-[10px] cursor-pointer"
                                :class="{
                                    actived: selectedType == item.pay_way
                                }"
                                @click="handleSelect(item.pay_way)"
                            >
                                <ElImage
                                    :src="item.icon"
                                    class="h-[24px] w-[24px]"
                                ></ElImage>
                                <div class="ml-[10px]">{{ item.name }}</div>
                            </div>
                        </div>
                        <div
                            class="ml-[80px] code wxcode p-[10px] rounded-lg"
                            :class="{
                                alipay: selectedType == 3,
                                wxpay: selectedType == 2
                            }"
                            v-loading="loading"
                        >
                            <WxPayCode
                                ref="wxPayCodePopRef"
                                @popClose="closePop"
                            ></WxPayCode>
                        </div>
                    </div>
                </div>
            </ElForm>
            <!-- <div class="flex justify-center">
                <ElButton type="primary" @click="orderPay">确认支付</ElButton>
            </div> -->
        </div>
    </ElDialog>
</template>

<script setup lang="ts">
import { ElDialog, ElForm, ElFormItem, ElButton, ElImage } from 'element-plus'
import { getPayWayList, prepay, OrderStatus } from '@/api/pay'
import usePolling from '~~/composables/usePolling'
import feedback from '~~/utils/feedback'
import { useUserStore } from '~~/stores/user'

const popShow = ref(false)
const props = defineProps(['modelValue', 'type', 'redirect'])
const userStore = useUserStore()
const { getUser } = userStore

const loading = ref(false)
//支付方式列表
const payWayList: any = ref([])

//订单信息
const order: any = ref({})

//支付参数
const payParam: any = ref({
    from: props.type,
    pay_way: ''
})

//微信二维码弹框
const wxPayCodePopRef = ref(null)

//选中的支付方式
const selectedType = ref(0)
//选择支付方式
const handleSelect = (type: number) => {
    if (!loading.value) {
        end()
        selectedType.value = type
        payParam.value.pay_way = type
        orderPay()
    }
}

const runtimeConfig = useRuntimeConfig()
//订单支付
const orderPay = async () => {
    loading.value = true
    const data = await prepay({
        order_id: order.value.order_id,
        ...payParam.value,
        redirect: `${runtimeConfig.public.baseUrl}${props.redirect}`
    })
    openWxPayCodePop(data)
    loading.value = false
    start()
}

//微信二维码支付弹框
const openWxPayCodePop = (value) => {
    wxPayCodePopRef.value.open(value)
}

//获取支付方式
const getPaywayList = async () => {
    payWayList.value = await getPayWayList({
        order_id: order.value.order_id,
        from: props.type
    })
    payWayList.value.lists.map((item) => {
        if (item.is_default == 1) {
            handleSelect(item.pay_way)
        }
    })
}

const check = async () => {
    const { pay_status } = await OrderStatus({
        order_id: order.value.order_id,
        from: props.type
    })
    if (pay_status == 1) {
        feedback.alertSuccess('支付成功')
        getUser()
        popShow.value = false
        end()
    }
}

const endCallback = () => {
    popShow.value = false
    feedback.alertWarning('支付超时！')
}

//轮询参数
const { start, end, result } = usePolling(check, {
    totalTime: 300 * 1000,
    callback: endCallback
})
//关闭弹框回调
const closePop = () => {
    end()
}

//打开弹框
const open = (orderMsg: any) => {
    popShow.value = true
    console.log(orderMsg)
    order.value = orderMsg
    getPaywayList()
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
.actived {
    border: 1px solid var(--el-color-primary) !important;
}
.unactive {
    border: 1px solid #e5e5ea;
}
.payBox {
    border-top: 1px solid #e2e2e2;
    .wxpay {
        border: 1px solid #4ab415;
    }
    .alipay {
        border: 1px solid #02aaee;
    }
}
</style>
