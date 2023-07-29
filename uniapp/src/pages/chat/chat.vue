<template>
    <page-meta :page-style="$theme.pageStyle">
        <!-- #ifndef H5 -->
        <navigation-bar
            :front-color="$theme.navColor"
            :background-color="$theme.navBgColor"
        />
        <!-- #endif -->
    </page-meta>
    <view class="safe-area-inset-bottom h-screen bg-white">
        <chat-scroll-view
            v-model="chatList"
            ref="chatRef"
            :tips="modelInfo.tips"
            :type="pageOptions.type"
            :otherId="pageOptions.id"
            @end="getChatRecordData"
            @reader="getReaderEvent"
        >
            <view class="bg-white scroll-view-content">
                <u-sticky h5-nav-height="0">
                    <view
                        class="px-[30rpx] py-[26rpx] text-sm flex justify-between bg-white"
                    >
                        <view class="flex-1" v-if="appStore.getIsShowVip">
                            <view @click="toOpenVip" class="flex items-center">
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
                        <text class="text-muted ml-auto" @click="cleanChatLock">
                            清空对话
                        </text>
                    </view>
                </u-sticky>
                <view class="chat-record pt-[20rpx]">
                    <chat-record-item
                        v-if="!chatList.length && modelInfo.tips"
                        type="left"
                        :avatar="modelInfo.image"
                        :content="`${modelInfo.tips}`"
                        :show-collect-btn="false"
                    ></chat-record-item>
                    <chat-record-item
                        v-for="(item, index) in chatList"
                        :key="index"
                        :record-id="item.id"
                        :type="item.type == 1 ? 'right' : 'left'"
                        :content="item.content"
                        :loading="item.loading"
                        :avatar="modelInfo.image"
                        :is-collect="item.is_collect"
                        @update="getChatRecordData"
                        @close="chatClose(index)"
                        @click-poster="handleDrawPoster"
                    ></chat-record-item>
                </view>
            </view>
        </chat-scroll-view>
        <!--  生产对话海报  -->
        <dialog-poster ref="posterRef"></dialog-poster>
    </view>
</template>

<script setup lang="ts">
import {
    cleanChatRecord,
    getChatRecord,
    getCreationDetail,
    getSkillDetail
} from '@/api/chat'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { shallowRef, reactive, ref } from 'vue'
import icon_member from '@/static/images/icon/icon_member.png'
import { useLockFn } from '@/hooks/useLockFn'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import { useRouter } from 'uniapp-router-next'

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const pageOptions = reactive({
    id: 0,
    type: 1,
    token: ''
})
const chatList = ref<any[]>([])
const chatRef = shallowRef()

const getChatRecordData = async () => {
    const data = await getChatRecord({
        other_id: pageOptions.id,
        type: pageOptions.type,
        page_type: 0
    })
    chatList.value = data.lists
    setTimeout(() => {
        chatRef.value?.scrollToBottom()
    }, 200)
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

const modelInfo = ref<any>({})
const getChatModel = async () => {
    switch (pageOptions.type) {
        case 2:
            modelInfo.value = await getCreationDetail({
                id: pageOptions.id
            })
            break
        case 3:
            modelInfo.value = await getSkillDetail({
                id: pageOptions.id
            })
    }
    uni.setNavigationBarTitle({
        title: modelInfo.value.name
    })
}

const getData = async () => {
    getChatModel()
    getChatRecordData()
}

const { lockFn: cleanChatLock } = useLockFn(async () => {
    if (!userStore.isLogin) return toLogin()
    const modal = await uni.showModal({
        title: '温馨提示',
        content: '确定清空对话？'
    })
    if (modal.cancel) return
    await cleanChatRecord({ type: pageOptions.type, other_id: pageOptions.id })
    getChatRecordData()
})

// 海报实力
const posterRef = shallowRef()
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

const toLogin = () => {
    return router.navigateTo({ path: '/pages/login/login' })
}

const toOpenVip = () => {
    router.navigateTo({
        path: '/packages/pages/open_vip/open_vip'
    })
}

onLoad((options) => {
    pageOptions.id = Number(options?.id)
    pageOptions.type = Number(options?.type)
    getData()
})
onUnload(() => {
    chatClose()
})
</script>

<style lang="scss">
page {
    background-color: $-color-white;
    height: 100%;
}

.index {
    height: 100%;
}
</style>
