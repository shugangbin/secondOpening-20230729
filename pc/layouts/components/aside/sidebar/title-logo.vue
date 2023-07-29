<template>
    <NuxtLink v-if="appStore.getWebsiteConfig.pc_logo" class="flex" to="/">
        <div class="flex flex-col items-center justify-center w-full py-[20px]">
            <div class="w-[48px] h-[48px]">
                <img :src="appStore.getWebsiteConfig.pc_logo" />
            </div>
            <div class="text-black mt-[10px] font-bold text-[18px]">
                {{ appStore.getWebsiteConfig.pc_title }}
            </div>
        </div>
    </NuxtLink>
</template>
<script lang="ts" setup>
import { useAppStore } from '~~/stores/app'
const appStore = useAppStore()
</script>

<style lang="scss" scoped></style>
