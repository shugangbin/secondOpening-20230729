<template>
    <NuxtLink :to="to">
        <div
            class="menu-item"
            :class="{
                'menu-item--active': isActive
            }"
        >
            <Icon v-if="icon" :name="icon" :size="18" />
            <img
                v-else
                class="w-[18px] h-[18px] object-cover"
                :src="isActive ? selected : unselected"
            />
            <span class="ml-[6px] line-clamp-1">{{ name }}</span>
        </div>
    </NuxtLink>
</template>
<script setup lang="ts">
import { RouteLocationPathRaw } from 'vue-router'
const props = defineProps<{
    to?: RouteLocationPathRaw
    icon?: string
    selected?: string
    unselected?: string
    name: string
}>()
const route = useRoute()
const isActive = computed(() => {
    const routePath =
        route.path === '/' ? route.path : route.path.replace(/\/$/, '')
    return (
        props.to &&
        (props.to.path === route.meta.activePath || props.to.path === routePath)
    )
})
</script>
<style lang="scss" scoped>
.menu-item {
    display: flex;
    align-items: center;
    background-color: var(--el-bg-color-page);
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    border-radius: 8px;
    cursor: pointer;
    margin: 10px 0;
    &--active {
        @apply text-primary;
        background-color: #edfdff;
    }
}
</style>
