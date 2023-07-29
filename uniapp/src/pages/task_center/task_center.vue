<template>
    <page-meta :page-style="$theme.pageStyle">
        <!-- #ifndef H5 -->
        <navigation-bar
            :front-color="$theme.navColor"
            :background-color="$theme.navBgColor"
        />
        <!-- #endif -->
    </page-meta>
    <page-status :status="status">
        <view class="task-center">
            <view
                class="bg-primary text-btn-text px-[30rpx] pt-[30rpx] pb-[80rpx] mb-[-50rpx]"
            >
                剩余条数
                <text class="text-[48rpx] font-medium">{{
                    userInfo.balance || 0
                }}</text>
                条
            </view>
            <view class="px-[30rpx] pb-[20rpx]">
                <view class="daily-tasks" v-if="taskData.length">
                    <view class="tasks-title">
                        <view class="font-medium text-xl">每日任务</view>
                        <view class="ml-[14rpx] text-muted text-sm">
                            免费获得条数
                        </view>
                    </view>
                    <view class="tasks-content">
                        <view
                            class="tasks-item p-[20rpx] flex"
                            v-for="(item, index) in taskData"
                            :key="index"
                        >
                            <u-icon
                                class="flex-none"
                                :name="item.image"
                                :size="120"
                            />
                            <view class="flex-1 min-w-0 ml-[20rpx]">
                                <view class="text-xl font-medium">{{
                                    item.title
                                }}</view>
                                <view class="mt-[10rpx] text-sm text-muted">
                                    {{
                                        item.type == 1 ? '分享' : '邀请'
                                    }}1次，获得<text class="text-error">{{
                                        item.rewards
                                    }}</text
                                    >条，每日限<text class="text-error">
                                        {{ item.max }}</text
                                    >次
                                </view>
                                <view class="text-primary mt-[14rpx]">
                                    进度：{{ item.num }}/{{ item.max }}
                                </view>
                            </view>
                            <view class="flex-none">
                                <u-button
                                    type="primary"
                                    shape="circle"
                                    size="medium"
                                    :customStyle="{
                                        padding: '0 24rpx',
                                        height: '56rpx'
                                    }"
                                    open-type="share"
                                    @click="toShare"
                                >
                                    去分享
                                </u-button>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <template #error>
            <u-empty text="加载出错～"></u-empty>
        </template>
    </page-status>
    <tabbar />
</template>

<script setup lang="ts">
import { getTask } from '@/api/task'
import { PageStatusEnum } from '@/enums/appEnums'
import { useCopy } from '@/hooks/useCopy'
import { generateSharePath } from '@/mixins/share'
import { useUserStore } from '@/stores/user'
import { handleClientEvent } from '@/utils/client'
import { onPullDownRefresh, onShow } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
const status = ref(PageStatusEnum.LOADING)
const { copy } = useCopy()

const toShare = () => {
    handleClientEvent({
        OA_WEIXIN: () => {
            uni.showModal({
                title: '温馨提示',
                content: '点击右上角“...”，分享给好友',
                showCancel: false
            })
        },
        H5: async () => {
            const path = await generateSharePath(true)
            copy(path)
            uni.showModal({
                title: '温馨提示',
                content: '已经复制到剪贴板，请转发给好友',
                showCancel: false
            })
        }
    })
}

const taskData = ref<any[]>([])
const getTaskData = async () => {
    taskData.value = await getTask()
}

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const getData = async () => {
    try {
        await Promise.all([getTaskData()])
        status.value = PageStatusEnum.NORMAL
    } catch (error) {
        status.value = PageStatusEnum.ERROR
    }
}

onShow(() => {
    getData()
    userStore.getUser()
})

onPullDownRefresh(async () => {
    try {
        await getData()
        await userStore.getUser()
    } catch (error) {}
    uni.stopPullDownRefresh()
})
</script>

<style lang="scss">
.task-center {
    .daily-tasks {
        background: linear-gradient(
                180deg,
                var(--color-primary-light-7) 0%,
                $-color-white 100%
            ),
            #fff;
        background-size: 100% 175rpx;
        background-repeat: no-repeat;
        border-radius: 14rpx;
    }
    .tasks-title {
        padding: 0 20rpx;
        height: 88rpx;
        display: flex;
        align-items: center;
    }
    .tasks-content {
        padding-bottom: 20rpx;
        .tasks-item {
            &:not(:last-of-type) {
                border-bottom: 1px solid $u-border-color;
                margin-bottom: 10rpx;
            }
        }
    }
}
</style>
