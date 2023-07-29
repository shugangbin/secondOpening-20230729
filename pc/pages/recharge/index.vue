<template>
    <div>
        <NuxtLayout name="default">
            <ElScrollbar>
                <ElCard class="!border-none" shadow="never">
                    <div>
                        <div v-if="taskData.length">
                            <span class="font-bold">每日任务</span>
                            <div class="grid grid-cols-2 gap-4 mt-[23px]">
                                <div
                                    class="bg-[#F8F8F8] p-[20px] flex justify-between"
                                    v-for="(item, index) in taskData"
                                    :key="index"
                                >
                                    <div>
                                        <div class="font-medium">
                                            {{
                                                item.type == 2
                                                    ? '邀请新用户'
                                                    : '分享给好友'
                                            }}
                                        </div>
                                        <div class="text-[14px] mt-[8px]">
                                            <span
                                                >{{
                                                    item.type == 2
                                                        ? '邀请'
                                                        : '分享'
                                                }}一次，获得</span
                                            >
                                            <span class="text-primary">{{
                                                item?.rewards
                                            }}</span>
                                            <span>条，每日限</span>
                                            <span class="text-primary">{{
                                                item?.max
                                            }}</span>
                                            <span>次</span>
                                        </div>
                                        <div
                                            class="text-primary text-[14px] mt-[8px]"
                                        >
                                            进度：{{ item?.num }}/{{
                                                item?.max
                                            }}
                                        </div>
                                    </div>
                                    <el-button
                                        type="primary"
                                        class="self-center"
                                        @click="getShareLink"
                                        >点击复制</el-button
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </ElCard>
                <ElCard
                    class="!border-none mt-[16px]"
                    shadow="never"
                    v-if="appSotre.getIsShowRecharge"
                >
                    <div>
                        <div>
                            <span class="font-bold">充值套餐</span>
                            <span class="ml-[10px] form-tips"
                                >VIP期间对话不消耗次数，次数永不过期</span
                            >
                            <div class="flex flex-wrap mt-[20px] mx-[-8px]">
                                <div
                                    class="recharge-package-item flex flex-col relative"
                                    :class="{ actived: selectval == index }"
                                    v-for="(item, index) in data.lists"
                                    :key="item.id"
                                    @click="handleselected(index, item)"
                                >
                                    <div class="pt-[60%] relative w-full h-0">
                                        <div
                                            class="absolute left-0 right-0 bottom-0 top-0"
                                        >
                                            <ElImage
                                                :src="item.image"
                                                class="h-full w-full"
                                                fit="cover"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        class="absolute top-[-1px] left-[-1px] bg-[#FF3232] text-white text-sm rounded-[4px] px-[10px] py-[4px]"
                                        v-if="item.is_recommend"
                                    >
                                        强烈推荐
                                    </div>
                                    <div
                                        class="p-[15px] flex-1 min-h-0 flex flex-col"
                                    >
                                        <div>
                                            <Price
                                                :content="item.sell_price"
                                                color="#FF3232"
                                                :font-weight="500"
                                                main-size="20px"
                                                minor-size="14px"
                                            />
                                        </div>
                                        <div
                                            class="text-xl font-medium mt-[6px] line-clamp-1"
                                        >
                                            {{ item.name }}
                                        </div>
                                        <div
                                            class="text-sm text-tx-secondary mt-[10px] line-clamp-3"
                                        >
                                            {{ item.describe }}
                                        </div>
                                        <div class="mt-auto">
                                            <div
                                                class="flex flex-wrap justify-between mt-[10px] text-sm"
                                            >
                                                <div
                                                    class="mr-[10px] flex-none"
                                                >
                                                    对话次数: {{ item.number }}
                                                </div>
                                                <div
                                                    class="text-primary"
                                                    v-if="
                                                        item.is_give &&
                                                        item.give_number
                                                    "
                                                >
                                                    +{{ item.give_number }}
                                                </div>
                                            </div>
                                            <div
                                                class="flex flex-wrap justify-between mt-[6px] text-sm"
                                            >
                                                <div
                                                    class="mr-[10px] flex-none"
                                                >
                                                    绘画次数:
                                                    {{ item.draw_number }}
                                                </div>
                                                <div
                                                    class="text-primary"
                                                    v-if="
                                                        item.is_give &&
                                                        item.give_draw_number
                                                    "
                                                >
                                                    +{{ item.give_draw_number }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class=""> 
                                        <span class="font-bold text-[24px]">
                                            {{ item.number }}
                                        </span>
                                        条
                                    </div>
                                    <div class="mt-[10px]">
                                        特价
                                        <span class="text-[red]">
                                            {{ item.sell_price }}
                                        </span>
                                        元
                                    </div>
                                    <div class="line-through form-tips">
                                        原价{{ item.lineation_price }}元
                                    </div> -->
                                </div>
                            </div>
                            <div class="mt-[10px] text-white">
                                <ElButton type="primary" @click="handlePay">
                                    <template #default>
                                        <span class="text-white">立即充值</span>
                                    </template>
                                </ElButton>
                            </div>
                        </div>
                    </div>
                </ElCard>
            </ElScrollbar>

            <Payment ref="PaymentRef" type="recharge" redirect="/recharge">
                <template
                    v-slot:top="{
                        name,
                        number,
                        give_number,
                        is_give,
                        give_draw_number,
                        draw_number
                    }"
                >
                    <ElFormItem label="套餐名称">
                        <div>{{ name }}</div>
                    </ElFormItem>
                    <ElFormItem label="套餐内容">
                        <div>
                            <div>
                                对话次数: {{ number }}
                                <span v-if="is_give && give_number">
                                    (赠送{{ give_number }}次)
                                </span>
                            </div>
                            <div>
                                绘画次数: {{ draw_number }}
                                <span v-if="is_give && give_draw_number">
                                    (赠送{{ give_draw_number }}次)
                                </span>
                            </div>
                        </div>
                    </ElFormItem>
                </template>
            </Payment>
        </NuxtLayout>
    </div>
</template>
<script setup lang="ts">
import { ElScrollbar, ElButton } from 'element-plus'
import { getrechargePackage, getTaskMsg, toShare } from '@/api/recharge'
import { apiRechage } from '@/api/pay'
import { copy } from '@/utils/util'
import { useAppStore } from '~/stores/app'
const route = useRoute()
console.log(route)
const appSotre = useAppStore()

//支付弹框ref
const PaymentRef = ref(null)

//已选项
const selectval = ref(0)
const selectItem: any = ref({})

//任务数据
const taskData = ref([])

//选择充值次数
const handleselected = (index: number, item: any) => {
    selectval.value = index
    selectItem.value = item
}
const { data } = await useAsyncData(() => getrechargePackage({}))
//选择第一条
const selectFirst = () => {
    let index = data.value.lists?.findIndex((item) => item.is_recommend)
    if (index === -1) index = 0
    handleselected(index, data.value.lists[index])
}
//充值
const handlePay = async () => {
    const orderData = await apiRechage({
        recharge_package_id: selectItem.value.id
    })
    PaymentRef.value.open({ ...orderData, ...selectItem.value })
}

//获取任务数据
const getTaskData = async () => {
    taskData.value = await getTaskMsg()
}

//获取分享链接
const getShareLink = async () => {
    const { share_id } = await toShare({ channel: 4 })
    copy(`${window.origin}/pc/?cid=${share_id}`)
    getTaskData()
    // copy(`http://localhost:3000/pc/?cid=${share_id}`)
}

onMounted(() => {
    selectFirst()
    getTaskData()
})
definePageMeta({
    auth: true,
    layout: false
})
</script>
<style lang="scss" scoped>
.recharge-package-item {
    width: 220px;
    border: 1px solid;
    border-radius: 6px;
    overflow: hidden;
    margin: 0 8px 16px;
    cursor: pointer;
    @apply border-br-light;
    &.actived {
        outline: 1px solid;
        @apply border-primary outline-primary;
    }
}
</style>
