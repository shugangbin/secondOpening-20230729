<template>
    <u-tabbar
        v-if="showTabbar"
        v-model="current"
        v-bind="tabbarStyle"
        :list="tabbarList"
        @change="handleChange"
        :hide-tab-bar="false"
    ></u-tabbar>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app'
import { navigateTo } from '@/utils/util'
import { computed, ref } from 'vue'
const current = ref()
const appStore = useAppStore()
const tabbarList = computed(() => {
    return (
        appStore.getTabbarConfig?.list
            ?.filter((item: any) => item.is_show == '1')
            ?.map((item: any) => {
                return {
                    iconPath: appStore.getImageUrl(item.unselected),
                    selectedIconPath: appStore.getImageUrl(item.selected),
                    text: item.name,
                    link: item.link,
                    pagePath: item.link.path
                }
            }) || []
    )
})
const showTabbar = computed(() => {
    const currentPages = getCurrentPages()
    const currentPage = currentPages[currentPages.length - 1]
    const current = tabbarList.value.findIndex((item: any) => {
        return item.pagePath === '/' + currentPage.route
    })
    return current >= 0
})

const tabbarStyle = computed(() => ({
    activeColor: appStore.getTabbarConfig?.style?.selected_color,
    inactiveColor: appStore.getTabbarConfig?.style?.default_color
}))
const handleChange = (index: number) => {
    const selectTab = tabbarList.value[index]
    navigateTo(selectTab.link, false, 'reLaunch')
}
</script>
