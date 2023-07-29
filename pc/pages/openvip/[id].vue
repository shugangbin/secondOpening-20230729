<template>
    <div class="bg-white w-full rounded-lg p-[20px]">
        <el-page-header content="确认购买" @back="$router.back()" />
        <div class="mt-4">
            <ElForm label-width="120px">
                <ElFormItem label="购买套餐"> {{ pagerData.name }}</ElFormItem>
                <ElFormItem label="支付金额">
                    ￥{{ pagerData.sell_price }}</ElFormItem
                >
                <ElFormItem label="优惠券"> ￥0.00</ElFormItem>
                <ElFormItem label="实付金额">
                    <span class="text-[red]"
                        >￥{{ pagerData.sell_price }}</span
                    ></ElFormItem
                >
                <ElFormItem label="支付方式">
                    <div
                        class="flex items-center px-[30px] py-[10px] rounded-lg unactive"
                        :class="{ actived: selectedType == 0 }"
                        @click="handleSelect(0)"
                    >
                        <img
                            src="@/assets/images/wxpay.png"
                            class="w-[24px] h-[24px]"
                        />
                        <div class="ml-[10px]">微信支付</div>
                    </div>
                    <div
                        class="flex items-center px-[30px] py-[10px] ml-[10px] rounded-lg unactive"
                        :class="{ actived: selectedType == 1 }"
                        @click="handleSelect(1)"
                    >
                        <img
                            src="@/assets/images/alipay.png"
                            class="w-[24px] h-[24px]"
                        />
                        <div class="ml-[10px]">支付宝支付</div>
                    </div>
                </ElFormItem>
                <ElFormItem label="">
                    <ElButton color="#23b571" @click="handlePay">
                        <template #default>
                            <span class="text-white">确认支付</span>
                        </template>
                    </ElButton>
                </ElFormItem>
            </ElForm>
        </div>
        <el-dialog width="400px" v-model="dialogTableVisible">
            <div class="flex flex-col items-center">
                <div class="font-bold text-[18px]">微信扫一扫支付</div>
                <img
                    src="@/assets/images/alipay.png"
                    class="w-[180px] h-[180px] my-[20px]"
                />
                <div class="font-bold">支付成功后会自动关闭窗口</div>
                <div class="form-tips">如遇到支付问题，请联系客服解决</div>
            </div>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { getmemberlists } from '@/api/my'
import {
    ElPageHeader,
    ElForm,
    ElFormItem,
    ElButton,
    ElDialog
} from 'element-plus'
const route = useRoute()
const selectedType = ref(0)
const handleSelect = (type: number) => {
    selectedType.value = type
}
const dialogTableVisible = ref(false)
const handlePay = () => {
    dialogTableVisible.value = true
}
const pagerData = ref<any>({})
const { data } = await useAsyncData(() => getmemberlists({}))
pagerData.value = data.value.find((i) => {
    return i.id == route.params.id
})
</script>
<style lang="scss" scoped>
.actived {
    border: 1px solid var(--el-color-primary) !important;
}
.unactive {
    border: 1px solid #e5e5ea;
}
</style>
