<template>
    <ElScrollbar class="sidebar">
        <div class="h-full flex flex-col">
            <TitleLogo />
            <Nav class="mb-auto" />
            <Menu />
            <Balance />
            <Version class="mb-[10px]" />
        </div>
    </ElScrollbar>
</template>

<script lang="ts" setup>
import TitleLogo from './title-logo.vue'
import Nav from './nav.vue'
import Menu from './menu.vue'
import Balance from './balance.vue'
import Version from './version.vue'
</script>
<style lang="scss" scoped>
.sidebar {
    background-color: var(--aside-bg-color);
    width: var(--sidebar-width);
    height: 100%;
    :deep(.el-scrollbar__view) {
        height: 100%;
    }
}
</style>
