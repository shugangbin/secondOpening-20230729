<template>
    <page-meta :page-style="$theme.pageStyle">
        <!-- #ifndef H5 -->
        <navigation-bar
            :front-color="$theme.navColor"
            :background-color="$theme.navBgColor"
        />
        <!-- #endif -->
    </page-meta>
    <view class="safe-area-inset-bottom" v-if="modelData.name">
        <view class="pt-[20rpx] pb-[160rpx]">
            <view class="px-[20rpx]">
                <view
                    class="px-[30rpx] py-[24rpx] flex rounded-[14rpx] bg-white items-center"
                >
                    <u-image
                        :src="modelData.image"
                        width="84"
                        height="84"
                    ></u-image>
                    <view class="flex-1 min-w-0 ml-[20rpx]">
                        <view class="text-xl font-medium">
                            {{ modelData.name }}
                        </view>
                        <view
                            v-if="modelData.tips"
                            class="text-content line-clamp-2 text-xs mt-[10rpx]"
                        >
                            {{ modelData.tips }}
                        </view>
                    </view>
                </view>
                <view
                    class="px-[30rpx] py-[24rpx] rounded-[14rpx] bg-white mt-[20rpx]"
                >
                    <form-designer
                        ref="formDesignerRef"
                        :formLists="formLists"
                        v-model="formData"
                    />
                    <view
                        class="bg-[#FFFAF0] text-xs rounded-full inline-block px-[30rpx] py-[14rpx] text-[#FD984E] mt-[10rpx]"
                        @click="insertExample"
                    >
                        不知道写啥？点击插入示例 👈🏻
                    </view>
                </view>
            </view>
            <view>
                <view class="flex items-center px-[20rpx] py-[30rpx]">
                    <view class="text-lg font-medium mr-auto">
                        本次创作结果
                    </view>
                    <view class="text-content" @click="toHistory">
                        创作历史
                    </view>
                </view>
                <view>
                    <view class="current-history" ref="currentHistoryRef">
                        <view class="px-[20rpx]">
                            <view
                                class="mt-[20rpx]"
                                v-for="item in currentCreationHistory"
                                :key="item.id"
                            >
                                <creation-history-item
                                    :title="item.title"
                                    :time="item.create_time"
                                    :content="item.reply"
                                    :showDelete="false"
                                    @copy="copy"
                                />
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view
                v-if="!currentCreationHistory.length"
                class="flex flex-col justify-center items-center pb-[200rpx]"
            >
                <image
                    class="w-[300rpx] h-[300rpx]"
                    src="@/packages/static/empty/create_record.png"
                    alt=""
                />
                <view class="my-[32rpx] font-medium">
                    AI创作结果会在显示这里，现在你只需要
                </view>
                <view>
                    <view class="text-content text-sm">
                        1.填写越详细，结果越准确哦
                    </view>
                    <view class="text-content text-sm">
                        2.点击立即生成按钮，一般在10秒内搞定
                    </view>
                </view>
            </view>
        </view>

        <view id="bottom-line" class="h-[1px]"></view>
        <view
            class="safe-area-inset-bottom fixed bottom-0 left-0 w-full bg-white z-10"
        >
            <view class="p-[20rpx]">
                <!-- 模型选择 -->
                <view class="flex items-center justify-between text-xs pb-[20rpx]" v-if="chatModel.modelList.length">
                    <view
                        class="inline-flex justify-center items-center rounded-[30px] h-[60rpx] px-[24rpx]"
                        style="box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1)"
                        @click="chatModel.show = true"
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

                <view class="flex">
                    <view class="w-[40%]">
                        <u-button
                            :hairLine="false"
                            :custom-style="{
                                width: '100%',
                                border: 'none',
                                background: '#f5f5f5'
                            }"
                            @click="setFormDataDefault"
                        >
                            <u-icon name="trash" />
                            重置内容
                        </u-button>
                    </view>

                    <view class="flex-1 ml-[20rpx]">
                        <u-button
                            type="primary"
                            :loading="isReceiving"
                            :custom-style="{ width: '100%' }"
                            @click="handleCreate"
                        >
                            立即生成
                        </u-button>
                    </view>
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

<script setup lang="ts">
import {getCreationDetail, creationChat, chatSendText, getChatModelApi} from '@/api/chat'
import { onLoad } from '@dcloudio/uni-app'
import { getCurrentInstance, onUnmounted, reactive, ref, watch } from 'vue'
import { shallowRef } from 'vue'
import { useElementSize, watchThrottled } from '@vueuse/core'
import { timeFormat } from '@/utils/date'

import { useCopy } from '@/hooks/useCopy'

import { useRouter } from 'uniapp-router-next'
import { cloneDeep } from 'lodash-es'
import { useAppStore } from '@/stores/app'
import { getRect } from '@/utils/util'

const defaultForm = [
    {
        name: 'WidgetTextarea',
        title: '多行文本',
        id: 'question',
        props: {
            title: '内容描述',
            placeholder: '',
            rows: 8,
            maxlength: 400,
            autosize: false,
            isRequired: false
        }
    }
]
const appStore = useAppStore()
const { copy } = useCopy()
const pageOptions = reactive({
    id: 0,
    type: 1,
    token: ''
})
const formDesignerRef = shallowRef()
const currentHistoryRef = shallowRef()
const currentCreationHistory = ref<any[]>([])

const formData = ref<any>({})

const modelData = ref<any>({})
const formLists = ref<any[]>([])

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

const getData = async () => {
    const data = await getCreationDetail({
        id: pageOptions.id
    })
    modelData.value = data
    if (!modelData.value.form) {
        modelData.value.form = defaultForm
    }
    formLists.value = cloneDeep(modelData.value.form)
    setFormDataDefault()
}

const isReceiving = ref(false)
const generateTitle = () => {
    if (formData.value.question) {
        return formData.value.question
    }
    const firstForm = modelData.value?.form[0] || {}
    return `${firstForm.props.title}：${formData.value[firstForm.id] || ''}`
}
const handleCreate = async () => {
    try {
        await formDesignerRef.value?.validate()
    } catch (error) {
        uni.$u.toast('必填项不能为空')
        return
    }
    try {
        isReceiving.value = true

        await chatSendText(
            {
                model: chatModel?.current?.key || '',
                other_id: pageOptions.id,
                form: formData.value.question ? undefined : formData.value,
                question: formData.value.question,
                type: 2
            },
            {
                onstart(event) {
                    if (currentCreationHistory.value.length) {
                        currentCreationHistory.value = []
                    }
                },
                onmessage(value) {
                    value
                        .trim()
                        .split('data:')
                        .forEach((text) => {
                            if (text !== '') {
                                try {
                                    const dataJson = JSON.parse(text)
                                    const {
                                        id: chatId,
                                        event,
                                        data,
                                        index
                                    } = dataJson

                                    let chatIndex =
                                        currentCreationHistory.value.findIndex(
                                            (item) => item.id === chatId
                                        )
                                    if (chatIndex === -1) {
                                        currentCreationHistory.value.push({
                                            create_time: timeFormat(
                                                new Date(),
                                                'yyyy-mm-dd hh:MM:ss'
                                            ),
                                            title: formData.value.question
                                                ? formData.value.question
                                                : generateTitle(),
                                            reply: [],
                                            id: chatId
                                        })
                                        chatIndex =
                                            currentCreationHistory.value
                                                .length - 1
                                    }

                                    if (data) {
                                        if (
                                            !currentCreationHistory.value[
                                                chatIndex
                                            ].reply[index]
                                        ) {
                                            currentCreationHistory.value[
                                                chatIndex
                                            ].reply[index] = ''
                                        }
                                        currentCreationHistory.value[
                                            chatIndex
                                        ].reply[index] += data
                                    }

                                    if (event === 'finish') {
                                        return
                                    }
                                } catch (error) {}
                            }
                        })
                },
                onclose() {
                    setTimeout(() => {
                        isReceiving.value = false
                    }, 1000)
                }
            }
        )
    } catch (error) {
        isReceiving.value = false
        if (error === '会员余额不足' && appStore.getIsShowVip) {
            const res = await uni.showModal({
                title: '会员余额不足',
                content:
                    '开通会员，享受更多权益，VIP期间不消耗次数，次数永不过期',
                confirmText: '前往开通'
            })
            if (res.confirm) {
                toOpenVip()
            }
        }
    }
}
const toOpenVip = () => {
    router.navigateTo({
        path: '/packages/pages/open_vip/open_vip'
    })
}

const insertExample = () => {
    modelData.value?.form.forEach((item: any) => {
        if (item.props.placeholder && !item.props.defaultValue) {
            formData.value[item.id] = item.props.placeholder
        }
    })
}
const setFormDataDefault = () => {
    modelData.value?.form.forEach((item: any) => {
        if (item.props.defaultValue) {
            formData.value[item.id] = cloneDeep(item.props.defaultValue)
        } else {
            formData.value[item.id] = undefined
        }
    })
}
const router = useRouter()
const toHistory = () => {
    return router.navigateTo({
        path: '/packages/pages/create_history/create_history',
        query: {
            id: pageOptions.id
        }
    })
}
const scrollToBottom = () => {
    uni.pageScrollTo({
        selector: '#bottom-line',
        duration: 0
    })
}
//#ifndef H5
let observerTimer: any = null
let scrollHeight = 0
const createObserver = () => {
    if (observerTimer) {
        clearInterval(observerTimer)
    }
    observerTimer = setInterval(async () => {
        const res: any = await getRect(
            '.current-history',
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
//#ifdef H5
const { height } = useElementSize(currentHistoryRef)
watchThrottled(
    height,
    () => {
        if (isReceiving.value) {
            scrollToBottom()
        }
    },
    { throttle: 200 }
)
//#endif

onLoad(async (options) => {
    pageOptions.id = Number(options?.id)
    pageOptions.type = Number(options?.type)
    await getData()
})
</script>

<style lang="scss"></style>
