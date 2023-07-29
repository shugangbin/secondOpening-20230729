<template>
    <div class="nav">
        <div class="px-[16px]">
            <template v-for="(item, index) in nav" :key="index">
                <NuxtLink
                    v-if="!item?.hidden"
                    :to="{
                        path: item.link?.path,
                        query: item.link?.query
                    }"
                    class="nav-item"
                    :class="{
                        active: currentIndex === index
                    }"
                    @click="currentIndex = index"
                >
                    <img
                        class="w-[18px] h-[18px] object-cover"
                        :src="
                            currentIndex === index
                                ? item.selected
                                : item.unselected
                        "
                    />
                    <div class="ml-[10px] font-bold">{{ item.name }}</div>
                </NuxtLink>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAppStore } from '~/stores/app'
const route = useRoute()
const currentIndex = ref(-1)
const appStore = useAppStore()
const nav = computed(() => {
    return (
        appStore.getTabbarConfig.nav
            ?.filter((item: any) => item.is_show == '1')
            .map((item: any) => {
                return {
                    ...item,
                    selected: appStore.getImageUrl(item.selected),
                    unselected: appStore.getImageUrl(item.unselected)
                }
            }) || []
    )
})
const routeIndex = nav.value.findIndex((nav) => {
    const routePath =
        route.path === '/' ? route.path : route.path.replace(/\/$/, '')
    return (
        nav.link?.path === route.meta.activePath || nav.link?.path === routePath
    )
})
if (routeIndex !== -1) {
    currentIndex.value = routeIndex
}
</script>

<style lang="scss" scoped>
.nav {
    .nav-item {
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 44px;
        margin: 10px 0;

        &.active {
            @apply text-white;
            background: linear-gradient(90.00deg, var(--gradient-1) 0%, var(--gradient-2) 100%);
        }
    }
}
</style>
