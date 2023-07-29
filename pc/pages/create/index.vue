<template>
    <NuxtLayout name="default">
        <ElScrollbar class="h-full bg-white rounded-[4px] p-[16px] creation-container">
            <div class="creation-lists">
                <div
                    v-for="(item, index) in creationLists"
                    :key="item.id"
                    class="creation-item"
                    :class="{
                        'creation-item--active': index === currentIndex
                    }"
                    @click="currentIndex = index"
                >
                    {{ item.name }}
                </div>
            </div>
            <div>
                <div class="model-lists flex flex-wrap mt-[10px]">
                    <div
                        v-for="item in currentCreation?.model"
                        :key="item.id"
                        class="model-item p-[5px] sm:p-[10px] 2xl:w-1/6 xl:w-1/4 lg:w-1/3 w-1/3"
                    >
                        <NuxtLink
                            :to="`/create/produce?id=${item.id}`"
                            class="h-full"
                        >
                            <el-card
                                class="!border-none h-full rounded-[12px]"
                                shadow="none"
                                style="box-shadow: 0 3px 10px #ebeefd"
                                body-style="padding: 20px;"
                            >
                                <div class="flex items-center">
                                    <img
                                        class="w-[34px] h-[34px] mr-[10px]"
                                        :src="item.image"
                                        alt=""
                                    />
                                    <div
                                        class="text-lg font-medium line-clamp-1"
                                    >
                                        {{ item.name }}
                                    </div>
                                </div>
                                <div
                                    v-if="item.tips"
                                    class="text-xs text-tx-secondary mt-[10px] line-clamp-2"
                                >
                                    {{ item.tips }}
                                </div>
                            </el-card>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </ElScrollbar>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { getCreationLists } from '@/api/create'
const currentIndex = ref(0)

const { data: creationLists } = await useAsyncData(() => getCreationLists(), {
    transform(input) {
        const categoryAll = {
            id: 0,
            name: '全部',
            model: input.reduce((prev: any, current: any) => {
                return prev.concat(current.model)
            }, [])
        }
        input.unshift(categoryAll)
        return input
    },
    default() {
        return []
    }
})
const currentCreation = computed(() => {
    return creationLists.value[currentIndex.value] || {}
})
definePageMeta({
    layout: false
})
</script>

<style lang="scss" scoped>
.creation-container {
    background: url(../../assets/images/createBg.png) no-repeat;
    background-size: cover;
}
.creation-lists {
    .creation-item {
        display: inline-block !important;
        line-height: 40px;
        border-radius: 8px;
        box-shadow: 0 2px 6px #ebeefd;
        text-align: center;
        height: 40px;
        padding: 0px 24px;
        font-size: 14px;
        margin: 10px 0;
        margin-right: 10px;
        cursor: pointer;
        @apply line-clamp-1 text-tx-primary;
        &--active {
            @apply text-white;
            box-shadow: 0 3px 6px #ebeefd;
            background: linear-gradient(87.73deg, var(--gradient-1) 0%, var(--gradient-2) 100%);
        }
    }
}
</style>
