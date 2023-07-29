<template>
    <div>
        <NuxtLayout name="default">
            <div
                v-if="data?.status != 1"
                class="w-full h-full bg-white rounded-[6px] flex items-center justify-center"
            >
                <div class="text-xl">开通会员功能未开启!</div>
            </div>
            <ElScrollbar v-else class="bg-white rounded-[6px]">
                <div class="p-[16px]">
                    <div class="text-[18px]">
                        <span class="font-medium">开通会员</span>
                        <span class="text-[14px] text-[#888] ml-6"
                        >会员服务为虚拟产品，支付成功后不支持退款</span
                        >
                    </div>
                    <div
                        class="bg-[#FCF5E8] flex items-center pl-[10px] mt-[25px] mb-[25px]"
                    >
                        <img
                            src="@/assets/images/notice.png"
                            alt=""
                            class="w-[20px] h-[20px] mr-[10px]"
                        />
                        <el-carousel
                            height="40px"
                            direction="vertical"
                            :autoplay="true"
                            class="w-full"
                        >
                            <el-carousel-item
                                v-for="item in BuyLog"
                                :key="item"
                            >
                                <div class="w-full flex items-center">
                                    <ElAvatar
                                        :src="item.avatar"
                                        :size="28"
                                    ></ElAvatar>
                                    <span class="ml-[10px] leading-[40px]"
                                    >{{ item.nickname }}开通了{{
                                            item.member_package
                                        }}</span
                                    >
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <ElScrollbar>
                        <div class="mt-[10px] flex">
                            <div
                                class="box-boder w-[200px] flex-none rounded-lg mr-[30px]"
                                v-for="(item, index) in data?.lists"
                                :key="item"
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
                                    class="flex flex-col items-center rounded-lg my-[10px] mx-[20px]"
                                >
                                    <div class="text-[18px]">
                                        {{ item.name }}
                                    </div>
                                    <div class="text-[red]">
                                        ￥<span class="text-[30px] font-bold">{{
                                            item.sell_price
                                        }}</span>
                                    </div>
                                    <div class="form-tips">
                                        原价￥{{ item.lineation_price }}
                                    </div>
                                    <div
                                        class="bg-[#999999] w-full text-center py-[5px] mt-[10px] box-buy cursor-pointer"
                                        @click="handlePay(item)"
                                    >
                                        立即购买
                                    </div>
                                </div>
                                <div class="my-[10px] mx-[20px]">
                                    <div class="form-tips mb-[15px]">
                                        会员权益
                                    </div>
                                    <div
                                        class="mb-[15px] flex justify-between"
                                        v-for="benefit in item.member_benefits"
                                        :key="benefit.id"
                                    >
                                        <span> {{ benefit.name }} </span>
                                        <span
                                            v-if="benefit.is_checked"
                                            class="text-[#23B571]"
                                        >
                                            <Icon name="el-icon-Select"></Icon>
                                        </span>
                                        <span v-else class="text-error">
                                            <Icon
                                                name="el-icon-CloseBold"
                                            ></Icon>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ElScrollbar>
                    <Payment ref="PaymentRef" type="member" redirect="/openvip">
                        <template v-slot:top="{ name }">
                            <ElFormItem label="套餐名称">
                                <div>{{ name }}</div>
                            </ElFormItem>
                        </template>
                    </Payment>
                </div>
            </ElScrollbar>
        </NuxtLayout>
    </div>
</template>
<script setup lang="ts">
import { getmemberlists } from '@/api/my'
import { getMemberBuyLog } from '@/api/my'
import { memberBuy } from '@/api/pay'

//支付弹框ref
const PaymentRef = ref(null)

const { data } = await useAsyncData(() => getmemberlists({}))
const rightsLists = [
    '与AI畅聊',
    'AI智能写作',
    '众多AI创作',
    '超低延迟',
    '独享接口',
    '专属客服'
]
const notices = ref([])
const { data: BuyLog } = await useAsyncData(() => getMemberBuyLog({}))

const handlePay = async (value) => {
    const orderData = await memberBuy({
        member_package_id: value.id
    })
    PaymentRef.value.open({ ...orderData, ...value })
}
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
</style>
