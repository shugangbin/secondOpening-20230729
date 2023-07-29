<template>
    <view class="chat-scroll-view h-full">
        <scroll-view
            class="scroll-view-container h-full"
            scroll-y="true"
            :scroll-into-view="scrollToView"
            :scroll-top="scrollTop"
            @scroll="scroll"
        >
            <view class="scroll-view-content pb-[260rpx]" ref="contentRef">
                <slot></slot>

                <view class="flex justify-center mt-[24rpx]">
                    <u-button
                        v-if="chatList.length"
                        :disabled="isReceiving"
                        type="info"
                        shape="circle"
                        size="medium"
                        :custom-style="{
                            border: 'none'
                        }"
                        @click="sendLock('继续')"
                    >
                        <u-icon size="28" name="play-circle"></u-icon>
                        <text class="ml-[8rpx]">继续回答</text>
                    </u-button>
                </view>
            </view>

            <view id="observer-line" class="h-[1px]"> </view>
        </scroll-view>
        <view
            class="send-area"
            :style="{
                bottom: addUnit(bottom)
            }"
        >
            <view
                class="send-area__content bg-page"
                :class="[safeAreaInsetBottom ? 'safe-area-inset-bottom' : '']"
            >
                <u-input
                    type="textarea"
                    v-model="userInput"
                    :placeholder="placeholder"
                    maxlength="-1"
                    :cursor-spacing="120"
                    :auto-height="false"
                    confirm-type="send"
                    :fixed="true"
                    :custom-style="{
                        height: '180rpx',
                        fontSize: '28rpx',
                        lineHeight: '40rpx',
                        boxSizing: 'border-box',
                        paddingBottom: '80rpx'
                    }"
                    @click="handleClick"
                    @focus="scrollToBottom"
                    @blur="scrollToBottom"
                />
                <view class="send-btn flex justify-between">
                    <!-- 模型选择 -->
                    <view class="flex items-center text-xs flex-1">
                        <block v-if="chatModel.modelList.length">
                            <view class="flex items-center" @click="chatModel.show = true">
                                <view
                                    class="inline-flex justify-center items-center rounded-[30px] h-[60rpx] px-[24rpx]"
                                    style="box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1)"
                                >
                                    <text class="text-[#415058] mr-[6px]">
                                        {{ chatModel.current.alias }}
                                    </text>
                                    <u-icon name="arrow-down" size="24rpx"></u-icon>
                                </view>
                                <view
                                    class="ml-[10px] text-[#999999]"
                                    v-if="!chatModel?.current?.member_free"
                                >
                                    <text>消耗 </text>
                                    <text class="text-primary">
                                        {{ chatModel?.current?.balance || 0 }}
                                    </text>
                                    <text> 条对话次数</text>
                                </view>
                                <view class="ml-[10px] text-[#999999]" v-else>
                                    已开通会员，不消耗条数
                                </view>
                            </view>
                        </block>
                    </view>
                    <!-- 发送按钮 -->
                    <u-button
                        type="primary"
                        :custom-style="{
                            width: '100rpx',
                            height: '52rpx',
                            margin: '0'
                        }"
                        size="mini"
                        :disabled="isReceiving"
                        @click.stop="sendLock()"
                    >
                        发送
                    </u-button>
                </view>
            </view>
        </view>

        <u-picker
            v-model="chatModel.show"
            :safe-area-inset-bottom="true"
            :confirm-color="$theme.primaryColor"
            mode="selector"
            :range="chatModel.modelList"
            range-key="alias"
            @confirm="handleChoiceModel"
        ></u-picker>
    </view>
</template>
<script lang="ts">
export default {
    options: {
        virtualHost: true
    }
}
</script>
<script lang="ts" setup>
import { chatSendText, getChatModelApi } from '@/api/chat'
import { useLockFn } from '@/hooks/useLockFn'
import { useUserStore } from '@/stores/user'
import { addUnit, getRect } from '@/utils/util'

import { useRouter } from 'uniapp-router-next'
import { computed, getCurrentInstance, onUnmounted, watch, reactive } from 'vue'
//#ifdef H5
import { useElementSize, watchThrottled } from '@vueuse/core'
//#endif
import { nextTick, ref, shallowRef } from 'vue'
import { useSessionList } from '@/pages/index/components/useSessionList'
import { useAppStore } from '@/stores/app'
import { RequestErrMsgEnum } from '@/enums/requestEnums'

const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()
const contentRef = shallowRef()
const props = withDefaults(
    defineProps<{
        modelValue: any[]
        type: number
        otherId?: number
        categoryId?: number
        bottom?: string | number
        tips?: string
        placeholder?: string
        safeAreaInsetBottom: boolean
    }>(),
    {
        bottom: 0,
        tips: '',
        placeholder: '请输入内容',
        safeAreaInsetBottom: true
    }
)

const emit = defineEmits<{
    (event: 'update:modelValue', value: any[]): void
    (event: 'reader', value: any): void
    (event: 'end'): void
}>()
const { sessionActive, sessionAdd, currentSession, sessionEdit } =
    useSessionList()
const chatList = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const userInput = ref('')
const newUserInput = ref('')
const scrollToView = ref('')

// 聊天模型数据
const chatModel = reactive({
    show: false,
    current: {
        balance: 1,
        key: '',
        member_free: false,
        model: '',
        default: false
    } as any,
    modelList: [] as any[]
})

// 获取聊天模型数据
const getChatModelFunc = async () => {
    try {
        const data = await getChatModelApi()
        chatModel.modelList = data
        chatModel.current = data.find((item: any) => item.default) || data[0]
    } catch (error) {
        console.log('获取聊天模型数据错误=>', error)
    }
}
getChatModelFunc()

// 选择聊天模型
const handleChoiceModel = (event: any) => {
    chatModel.current = chatModel.modelList[event[0]]
}

const handleClick = () => {
    if (!userStore.isLogin) {
        return toLogin()
    }
}
let oldScrollTop = 0
const scroll = (e: any) => {
    oldScrollTop = e.detail.scrollTop
}
const scrollToBottom = async () => {
    scrollToView.value = 'observer-line'
    await nextTick()
    scrollToView.value = ''
}
const scrollTop = ref()
const scrollTo = async (top: number) => {
    scrollTop.value = oldScrollTop
    await nextTick()
    scrollTop.value = top
}

const isReceiving = ref(false)
const { lockFn: sendLock, isLock } = useLockFn(async (text: string) => {
    if (!userStore.isLogin) {
        return toLogin()
    }
    if (isReceiving.value) return
    const inputValue = text || userInput.value
    if (!inputValue) return uni.$u.toast(props.placeholder)
    if (props.type == 1) {
        if (sessionActive.value === 0) {
            await sessionAdd()
        }
        if (currentSession.value === '新的会话') {
            await sessionEdit(sessionActive.value, inputValue)
        }
    }
    chatList.value.push({
        type: 1,
        content: inputValue
    })
    chatList.value.push({
        type: 2,
        loading: true,
        content: [],
        id: ''
    })
    scrollToBottom()
    newUserInput.value = userInput.value
    userInput.value = ''
    try {
        isReceiving.value = true
        await chatSendText(
            {
                model: chatModel?.current?.key || '',
                question: inputValue,
                type: props.type,
                other_id: props.otherId,
                category_id: props.categoryId
            },
            {
                onstart(reader) {
                    emit('reader', reader)
                },
                onmessage(value) {
                    value
                        .trim()
                        .split('data:')
                        .forEach(async (text) => {
                            if (text !== '') {
                                try {
                                    const dataJson = JSON.parse(text)

                                    const {
                                        id: chatId,
                                        event,
                                        data,
                                        code,
                                        index
                                    } = dataJson

                                    if (
                                        event === 'error' &&
                                        code === 101 &&
                                        appStore.getIsShowVip
                                    ) {
                                        userInput.value = newUserInput.value
                                        const res = await uni.showModal({
                                            title: '会员余额不足',
                                            content:
                                                '开通会员，享受更多权益，VIP期间对话不消耗次数',
                                            confirmText: '前往开通'
                                        })
                                        if (res.confirm) {
                                            router.navigateTo({
                                                path: '/packages/pages/open_vip/open_vip'
                                            })
                                        }
                                    } else if (event === 'error') {
                                        uni.$u.toast(data)
                                    }

                                    let chatIndex = chatList.value.findIndex(
                                        (item) => item.id === chatId
                                    )
                                    if (chatIndex === -1) {
                                        chatIndex = chatList.value.length - 1
                                        chatList.value[chatIndex].id = chatId
                                    }

                                    if (data) {
                                        if (
                                            !chatList.value[chatIndex].content[
                                                index
                                            ]
                                        ) {
                                            chatList.value[chatIndex].content[
                                                index
                                            ] = ''
                                        }
                                        chatList.value[chatIndex].content[
                                            index
                                        ] += data
                                    }

                                    if (event === 'finish') {
                                        chatList.value[chatIndex].loading =
                                            false
                                        return
                                    }
                                } catch (error) {}
                            }
                        })
                },
                onclose() {
                    isReceiving.value = false
                    setTimeout(() => {
                        emit('end')
                    }, 400)
                }
            }
        )
    } catch (error: any) {
        console.log('发送消息失败=>', error)
        if (error.errMsg !== RequestErrMsgEnum.ABORT) {
            chatList.value.splice(chatList.value.length - 2, 2)
        }
        userInput.value = newUserInput.value
        isReceiving.value = false
    }
})

const toLogin = () => {
    router.navigateTo({ path: '/pages/login/login' })
}

const setUserInput = (value = '') => {
    userInput.value = value
}
//#ifdef H5
const { height } = useElementSize(contentRef)
watchThrottled(
    height,
    () => {
        isReceiving.value && scrollToBottom()
    },
    { throttle: 500 }
)
//#endif

//#ifndef H5
let observerTimer: any = null
let scrollHeight = 0
const createObserver = () => {
    if (observerTimer) {
        clearInterval(observerTimer)
    }
    observerTimer = setInterval(async () => {
        const res: any = await getRect(
            '.scroll-view-content',
            false,
            getCurrentInstance()?.proxy
        )
        if (res.height > scrollHeight) {
            scrollToBottom()
        }
        scrollHeight = res.height
    }, 500)
}

const removeObserver = () => {
    if (observerTimer) {
        setTimeout(() => {
            clearInterval(observerTimer)
        }, 2000)
    }
}

watch(isReceiving, () => {
    if (isReceiving.value) {
        createObserver()
    } else {
        removeObserver()
    }
})
onUnmounted(() => {
    removeObserver()
})
//#endif

defineExpose({
    scrollToBottom,
    setUserInput,
    sendLock,
    scrollTo,
    //#ifndef H5
    createObserver,
    removeObserver
    //#endif
})
</script>

<style lang="scss" scoped>
.chat-scroll-view {
    .send-area {
        z-index: 99;
        padding: 0 30rpx env(safe-area-inset-bottom);
        width: 100%;
        position: fixed;
        background-color: #fff;
        &__content {
            border-radius: 16rpx;
            padding: 10rpx 20rpx;
            position: relative;
            margin: 20rpx 0;
            .send-btn {
                position: absolute;
                left: 0rpx;
                bottom: 20rpx;
                z-index: 99;
                padding: 0 20rpx;
                width: 100%;
            }
        }
    }
}
</style>
