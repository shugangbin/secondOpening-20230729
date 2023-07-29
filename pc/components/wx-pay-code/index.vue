<template>
    <div>
        <!-- <ElDialog
        v-model="popShow"
        width="400px"
        center
        :close-on-click-modal="false"
        @close="closePop"
    >
        <div class="flex flex-col items-center">
            <div class="text-[18px] mb-[20px]">微信扫一扫支付</div> -->
        <QrcodeVue :value="qrCode" :size="130" />
        <!-- <div class="mt-[10px]">支付成功后自动关闭窗口</div>
            <div class="mt-[10px]">如遇到支付问题，请联系客服解决</div>
        </div>
    </ElDialog> -->
    </div>
</template>

<script setup lang="ts">
import { ElDialog } from 'element-plus'
import QrcodeVue from 'qrcode.vue'
const emit = defineEmits(['popClose'])

const props = defineProps({
    qrCode: {
        default: '',
        type: String
    }
})

const qrCode = ref('')

//打开弹框
const open = (wxData: any) => {
    qrCode.value = wxData.config
}
defineExpose({ open })
</script>

<style lang="scss" scoped></style>
