<template>
    <page-meta :page-style="$theme.pageStyle">
        <!-- #ifndef H5 -->
        <navigation-bar
            :front-color="$theme.navColor"
            :background-color="$theme.navBgColor"
        />
        <!-- #endif -->
    </page-meta>
    <view class="ai-creation">
        <view class="py-[14rpx] px-[30rpx]">
            <u-search
                v-model="keyword"
                placeholder="请输入关键词搜索"
                height="72"
                bg-color="#fff"
                :show-action="false"
                @search="getData()"
            />
        </view>
        <view class="px-[30rpx]">
            <template v-for="category in data" :key="category.id">
                <view class="py-[25rpx]">
                    <text class="font-medium text-lg">{{ category.name }}</text>
                </view>
                <view class="flex flex-wrap mx-[-10rpx] rounded-[14rpx]">
                    <view
                        class="w-1/2 px-[10rpx] mb-[20rpx]"
                        v-for="item in category.model"
                        :key="item.id"
                    >
                        <view class="rounded-[16rpx] py-[24rpx] h-full w-full">
                            <router-navigate
                                :to="`/packages/pages/create/create?id=${item.id}`"
                            >
                                <view class="flex w-full">
                                    <u-image
                                        :src="item.image"
                                        width="76"
                                        height="76"
                                        class="flex-none"
                                    />
                                    <view
                                        class="ml-[14rpx] flex flex-col justify-around min-w-0"
                                    >
                                        <view
                                            class="font-medium text-[30rpx]"
                                            >{{ item.name }}</view
                                        >
                                        <view
                                            class="text-[24rpx] text-[#666666] truncate"
                                            >{{ item.tips }}</view
                                        >
                                    </view>
                                </view>
                            </router-navigate>
                        </view>
                    </view>
                </view>
            </template>
        </view>
    </view>
    <tabbar />
</template>

<script setup lang="ts">
import { getCreationLists } from '@/api/chat'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
const keyword = ref('')
const data = ref<any[]>([])
const getData = async () => {
    data.value = await getCreationLists({
        keyword: keyword.value
    })
}
onLoad(() => {
    getData()
})
</script>

<style lang="scss">
.ai-creation {
    background: url(../../static/images/createBg.png) no-repeat;
    background-size: cover;
}
</style>
