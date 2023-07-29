<template>
    <div>
        <NuxtLayout name="default">
            <template #panel>
                <TheSession />
            </template>
            <div class="h-full flex">
                <Chatting
                    ref="chattingRef"
                    :content-list="chatContentList"
                    :send-disabled="isReceiving"
                    :avatar="appStore.config.chat.chat_logo"
                    @close="chatClose"
                    @update="getChatList"
                    @content-post="contentPost"
                    @clean-chat-log="cleanChatLog"
                >
                    <div v-if="!chatContentList.length" class="px-[50px]">
                        <div
                            class="my-[60px] text-center text-[30px] font-medium"
                        >
                            {{ appStore.getWebsiteConfig.shop_name }}
                        </div>
                        <div class="flex">
                            <div
                                v-for="item in exampleList.slice(0, 3)"
                                :key="item.id"
                                class="flex-1 mx-[10px]"
                            >
                                <div
                                    class="flex flex-col justify-center items-center mb-[20px]"
                                >
                                    <img
                                        v-if="item.image"
                                        class="w-[58px] h-[58px]"
                                        :src="item.image"
                                        alt=""
                                    />
                                    <div
                                        class="text-[16px] font-medium mt-[16px]"
                                    >
                                        {{ item.name }}
                                    </div>
                                </div>
                                <div>
                                    <div
                                        v-for="sample in item.sample"
                                        :key="sample.id"
                                        class="sample-item mb-[20px] p-[10px] flex justify-center cursor-pointer line-clamp-1"
                                        @click="contentPost(sample.content)"
                                    >
                                        {{ sample.content }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Chatting>
            </div>
        </NuxtLayout>
    </div>
</template>
<script setup lang="ts">
import { getchatLog, samplesLists, cleanChat, chatSendText } from '@/api/chat'
import { useUserStore } from '~~/stores/user'
import feedback from '~~/utils/feedback'
import { ElMessageBox } from 'element-plus'
import { useAppStore } from '~/stores/app'

const userStore = useUserStore()
const appStore = useAppStore()
const router = useRouter()
const route = useRoute()
//对话记录列表

//对话框ref
const chattingRef = ref(null)
const {
    sessionActive,
    sessionAdd,
    currentSession,
    sessionEdit,
    getSessionLists
} = await useSessionList()

await useAsyncData(() => getSessionLists(), {
    default() {
        return []
    },
    immediate: true
})
//问题示例列表
const { data: exampleList } = await useAsyncData(() =>
    samplesLists({ type: 1 })
)

//获取聊天记录
const { data: chatContentList, refresh: getChatList } = await useAsyncData(
    () =>
        getchatLog({ type: 1, category_id: sessionActive.value, page_type: 0 }),
    {
        transform(data) {
            return data.lists.map((item: any) => {
                if (item.type == 1) {
                    return { ...item, from_avatar: userStore.userInfo.avatar }
                } else {
                    return {
                        ...item,
                        from_avatar: appStore.config.chat.chat_logo
                    }
                }
            })
        },
        default() {
            return []
        }
    }
)

const isReceiving = ref(false)
//发送问题
const contentPost = async (userInput: any, model?: string) => {
    if (!userStore.isLogin) return userStore.toggleShowLogin(true)
    if (isReceiving.value) return
    if (sessionActive.value === 0) {
        await sessionAdd()
    }
    if (currentSession.value === '新的会话') {
        await sessionEdit(sessionActive.value, userInput)
    }
    chatContentList.value.push({
        type: 1,
        content: userInput,
        from_avatar: userStore.userInfo.avatar
    })
    chatContentList.value.push({
        type: 2,
        loading: true,
        content: [],
        from_avatar: appStore.config.chat.chat_logo,
        id: ''
    })
    isReceiving.value = true
    try {
        await chatSendText(
            {
                model: model,
                question: userInput,
                type: 1,
                category_id: sessionActive.value
            },
            {
                onstart(reader) {
                    streamReader = reader
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
                                        code,
                                        event,
                                        data,
                                        index,
                                        incremental
                                    } = dataJson

                                    if (
                                        event == 'error' &&
                                        code === 101 &&
                                        appStore.getIsShowVip
                                    ) {
                                        await ElMessageBox.confirm(
                                            '开通会员，享受更多权益，VIP期间会员免费通道对话不消耗条数',
                                            '对话余额不足',
                                            {
                                                confirmButtonText: '前往开通',
                                                cancelButtonText: '取消',
                                                type: 'warning'
                                            }
                                        )
                                        router.push('/openvip')
                                    } else if (event == 'error') {
                                        feedback.msgError(data)
                                    }

                                    console.log(dataJson)
                                    let chatIndex =
                                        chatContentList.value.findIndex(
                                            (item) => item.id === chatId
                                        )
                                    if (chatIndex === -1) {
                                        chatIndex =
                                            chatContentList.value.length - 1

                                        chatContentList.value[chatIndex].id =
                                            chatId
                                    }

                                    if (data) {
                                        if (
                                            !chatContentList.value[chatIndex]
                                                .content[index]
                                        ) {
                                            chatContentList.value[
                                                chatIndex
                                            ].content[index] = ''
                                        }
                                        chatContentList.value[
                                            chatIndex
                                        ].content[index] = incremental
                                            ? chatContentList.value[chatIndex]
                                                  .content[index] + data
                                            : data
                                    }

                                    if (event === 'finish') {
                                        chatContentList.value[
                                            chatIndex
                                        ].loading = false
                                        return
                                    }
                                } catch (error) {}
                            }
                        })
                },
                onclose() {
                    isReceiving.value = false
                    setTimeout(getChatList, 400)
                }
            }
        )
        chattingRef.value.cleanInput()
    } catch (error) {
        isReceiving.value = false
        chatContentList.value.splice(chatContentList.value.length - 2, 2)
    }

    nextTick(() => {
        chattingRef.value.scrollToBottom()
    })
}

let streamReader: ReadableStreamDefaultReader<Uint8Array> | null = null
const chatClose = (index?: number) => {
    streamReader?.cancel()
    if (index) {
        chatContentList.value[index].loading = false
    }
    isReceiving.value = false
}

//清空会话
const cleanChatLog = async () => {
    console.log()
    await feedback.confirm('确定清空对话？')
    await cleanChat({ type: 1, category_id: sessionActive.value })
    chatContentList.value = []
}

onMounted(async () => {
    if (route.query.cid || route.query.user_sn) {
        const cid: any = useCookie('cid')
        const user_sn: any = useCookie('user_sn')
        cid.value = route.query.cid
        user_sn.value = route.query.user_sn
        await nextTick()
        userStore.checkShare()
    }
    await nextTick()
    chattingRef.value.scrollToBottom()
})
watch(sessionActive, async () => {
    chatClose()
    await getChatList()
    await nextTick()
    chattingRef.value.scrollToBottom()
})

definePageMeta({
    layout: false
})
</script>
<style lang="scss" scoped>
.container-tip {
    border: 1px solid #fb9a3b;
}
.item {
    :hover {
        color: #fb9a3b;
    }
}
.sample-item {
    border-radius: 12px;
    background: #fff;
    border: 1px solid #eef2f2;
    box-shadow: 0 2px 8px #f5f6f8;
}
</style>
