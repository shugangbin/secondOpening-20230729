<template>
    <footer
        class="layout-footer flex justify-center text-center bg-page text-xs leading-10"
    >
        <div class="text-tx-secondary">
            <!-- <NuxtLink> 关于我们 </NuxtLink>
            ｜ -->
            <NuxtLink
                :to="`/pc/policy/${PolicyAgreementEnum.SERVICE}`"
                target="_blank"
                class="hover:underline"
            >
                用户协议
            </NuxtLink>
            ｜
            <NuxtLink
                :to="`/pc/policy/${PolicyAgreementEnum.PRIVACY}`"
                target="_blank"
                class="hover:underline"
            >
                隐私政策
            </NuxtLink>
            ｜
            <NuxtLink
                :to="`/pc/policy/${PolicyAgreementEnum.PAY}`"
                target="_blank"
                class="hover:underline"
            >
                用户支付协议
            </NuxtLink>
        </div>
        <div class="ml-2 text-tx-secondary">
            <a
                class="mx-1 hover:underline"
                :href="item.value"
                target="_blank"
                v-for="item in appStore.getCopyrightConfig"
                :key="item.key"
            >
                {{ item.key }}
            </a>
        </div>
    </footer>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/stores/app'
import { PolicyAgreementEnum } from '@/enums/appEnums'
const appStore = useAppStore()
</script>

<style lang="scss" scoped></style>
