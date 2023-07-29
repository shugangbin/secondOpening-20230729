<template>
    <div>
        <NuxtLayout name="default">
            <ElScrollbar class="bg-white rounded-lg">
                <div class="w-full p-[20px]">
                    <div class="text-[18px] font-medium">我的收藏</div>
                    <div class="mt-2" v-if="data.lists.length">
                        <div
                            class="bg-[#F8F8F8] p-[20px] flex justify-between items-center mb-[10px]"
                            v-for="item in data.lists"
                            :key="item"
                        >
                            <div>
                                <div class="flex items-center">
                                    <div
                                        class="bg-primary text-white px-[3px] rounded-[3px]"
                                    >
                                        问
                                    </div>
                                    <div class="ml-[10px]">
                                        {{ item.chat_records.ask }}
                                    </div>
                                </div>
                                <div class="flex items-start mt-[12px]">
                                    <div
                                        class="bg-[#FBBC2D] text-white px-[3px] rounded-[3px]"
                                    >
                                        答
                                    </div>
                                    <div class="ml-[10px]">
                                        <div
                                            v-for="(content, i) in item
                                                .chat_records.reply"
                                            :key="i"
                                            class="mb-[15px]"
                                            :class="{
                                                ' pt-[15px] border-t border-solid border-br-light':
                                                    i > 0
                                            }"
                                        >
                                            {{ content }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="w-[40px] px-[8px] cursor-pointer"
                                @click.stop="handelCollect(item.id)"
                            >
                                <div class="mx-auto">
                                    <Icon
                                        name="el-icon-StarFilled"
                                        size="24px"
                                        color="#FBAE00"
                                    ></Icon>
                                </div>

                                <div class="form-tips cancelCollection">
                                    取消收藏
                                </div>
                            </div>
                        </div>

                        <div class="py-4 flex justify-end">
                            <el-pagination
                                v-model:current-page="params.page_no"
                                :total="data.count"
                                :page-size="params.page_size"
                                hide-on-single-page
                                layout="total, prev, pager, next, jumper"
                                @current-change="refresh()"
                            />
                        </div>
                    </div>
                    <div class="flex flex-1 justify-center items-center" v-else>
                        <el-empty description="暂无收藏" :image-size="250" />
                    </div>
                </div>
            </ElScrollbar>
        </NuxtLayout>
    </div>
</template>
<script setup lang="ts">
import { getcollectLists, cancelCollect } from '@/api/my'
import { ElPagination, ElEmpty } from 'element-plus'

const params = reactive({
    page_no: 1,
    page_size: 15
})

const { data, refresh } = await useAsyncData(() => getcollectLists(params))
const handelCollect = async (id: any) => {
    await cancelCollect({ collect_id: id })
    refresh()
}
definePageMeta({
    auth: true,
    layout: false
})
</script>

<style lang="scss" scoped>
.cancelCollection {
    line-height: normal !important;
}
</style>
