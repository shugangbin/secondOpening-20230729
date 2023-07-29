<template>
    <page-meta :page-style="$theme.pageStyle">
        <!-- #ifndef H5 -->
        <navigation-bar
            :front-color="$theme.navColor"
            :background-color="$theme.navBgColor"
        />
        <!-- #endif -->
    </page-meta>
    <view class="h-full flex flex-col">
        <follow-official
            :show="!!appStore.config.is_follow_official"
            :title="appStore.getLoginConfig.involved_text"
        />
        <session v-model="showPopup" />

        <view class="px-[30rpx] py-[26rpx] text-sm flex items-center bg-white">
            <view class="flex-1">
                <view
                    v-if="appStore.getIsShowVip"
                    class="flex items-center"
                    @click="toOpenVip"
                >
                    <u-icon :size="34" :name="icon_member" />
                    <text class="ml-[10rpx]">
                        {{
                            userInfo.is_member
                                ? `已开通会员，对话不消耗条数`
                                : '开通会员'
                        }}
                    </text>
                </view>
            </view>

            <view class="text-muted" @click="cleanChatLock"> 清空对话 </view>
        </view>
        <view class="flex-1 min-h-0 bg-white">
            <chat-scroll-view
                v-model="chatList"
                ref="chatRef"
                :type="1"
                :categoryId="sessionActive"
                :bottom="100"
                :safeAreaInsetBottom="false"
                @end="getChatRecordData"
                @reader="getReaderEvent"
            >
                <view class="bg-white scroll-view-content">
                    <template v-if="!chatList.length">
                        <div
                            class="my-[60rpx] text-center text-[50rpx] font-medium"
                        >
                            {{ appStore.getWebsiteConfig.shop_name }}
                        </div>
                        <problem-example
                            v-if="problem.length"
                            :data="problem"
                            @click-item="(value:any) => chatRef.sendLock(value)"
                            @show-more="showExamplePopup = true"
                        />
                    </template>

                    <view
                        v-if="appStore.getChatConfig.is_tip"
                        class="bg-page flex flex-col items-center p-[30rpx] mt-[20rpx] m-[40rpx]"
                    >
                        <view class="flex items-center">
                            <u-icon name="warning" :size="40" />
                            <view class="text-lg ml-[10rpx]">局限性</view>
                        </view>
                        <view class="text-content text-sm mt-[20rpx]">
                            禁止利用AI进行非法活动
                        </view>
                    </view>
                    <view class="chat-record mt-[20rpx]">
                        <chat-record-item
                            v-for="(item, index) in chatList"
                            :key="index"
                            :record-id="item.id"
                            :type="item.type == 1 ? 'right' : 'left'"
                            :content="item.content"
                            :loading="item.loading"
                            :is-collect="item.is_collect"
                            :avatar="appStore.getChatConfig.chat_logo"
                            @update="getChatRecordData"
                            @close="chatClose(index)"
                            @click-poster="handleDrawPoster"
                        ></chat-record-item>
                    </view>
                </view>
            </chat-scroll-view>
            <!--  生产对话海报  -->
            <dialog-poster ref="posterRef"></dialog-poster>
            <!--  会话弹窗  -->
            <session-popup v-model="showPopup" />
            <!--  会话弹窗  -->
            <problem-example-popup
                v-model="showExamplePopup"
                :data="problem"
                @click-item="(value:any) => chatRef.sendLock(value)"
            />
            <!--  公告弹窗  -->
            <notice-popup></notice-popup>
        </view>
        <tabbar />
    </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import SessionPopup from './components/session-popup.vue'
import FollowOfficial from './components/follow-official.vue'
import NoticePopup from '@/components/notice-popup/notice-popup.vue'
import { getSamplesLists, getChatRecord, cleanChatRecord } from '@/api/chat'
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app'

import ProblemExample from './components/problem-example.vue'
import Session from './components/session.vue'
import { useLockFn } from '@/hooks/useLockFn'
import { shallowRef } from 'vue'
import icon_member from '@/static/images/icon/icon_member.png'
import { storeToRefs } from 'pinia'
import { useRouter } from 'uniapp-router-next'
import { useSessionList } from './components/useSessionList'
import ProblemExamplePopup from './components/problem-example-popup.vue'

const { getSessionLists, sessionActive } = useSessionList()
const showPopup = ref(false)
const showExamplePopup = ref(false)
const router = useRouter()
const problem = ref([])
const chatList = ref<any[]>([])
const chatRef = shallowRef()
// 海报实力
const posterRef = shallowRef()

const getProblemExample = async () => {
    problem.value = await getSamplesLists()
}
const getChatRecordData = async () => {
    const data = await getChatRecord({
        type: 1,
        category_id: sessionActive.value,
        page_type: 0
    })
    chatList.value = data.lists
}

let streamReader: any = null
const getReaderEvent = (event: any) => {
    streamReader = event
}

const chatClose = (index?: number) => {
    //#ifdef H5
    streamReader?.cancel()
    //#endif
    //#ifdef MP-WEIXIN
    streamReader?.abort()
    //#endif
    if (index) {
        chatList.value[index].loading = false
    }
}

const handleDrawPoster = async (recordId: number) => {
    const result = chatList.value.filter((item: any) => {
        return item.id == recordId
    })
    if (result.length != 2) {
        uni.$u.toast('上下文数据不对～')
        return
    }
    posterRef.value.initPosterData({
        title: result[0].content,
        content: result[1].content
    })
}

const userStore = useUserStore()
const appStore = useAppStore()

const { userInfo } = storeToRefs(userStore)

const { lockFn: cleanChatLock } = useLockFn(async () => {
    if (!userStore.isLogin)
        return router.navigateTo({ path: '/pages/login/login' })
    const modal = await uni.showModal({
        title: '温馨提示',
        content: '确定清空对话？'
    })
    if (modal.cancel) return
    await cleanChatRecord({ type: 1, category_id: sessionActive.value })
    getChatRecordData()
})

const toOpenVip = () => {
    if (!userStore.isLogin)
        return router.navigateTo({ path: '/pages/login/login' })
    router.navigateTo({
        path: '/packages/pages/open_vip/open_vip'
    })
}

watch(
    sessionActive,
    async (value) => {
        chatClose()
        if (value) {
            await getChatRecordData()
            setTimeout(() => {
                if (!chatList.value.length) {
                    chatRef.value?.scrollTo(0)
                } else {
                    chatRef.value?.scrollToBottom()
                }
            }, 200)
        }
        getProblemExample()
    },
    {
        immediate: true
    }
)

onShow(async () => {
    await getSessionLists()
})
onUnload(() => {
    chatClose()
})
</script>
<style>
page {
    height: 100%;
}
</style>
