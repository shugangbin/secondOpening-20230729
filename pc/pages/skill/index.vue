<template>
    <div>
        <NuxtLayout name="default">
            <template #panel>
                <!-- <TheSession /> -->
                <ElScrollbar class="w-[240px] bg-white">
                    <div class="p-[16px]">
                        <input
                            class="bg-[#f8f8f8] w-full leading-[32px] rounded-[3px] outline-none px-[10px]"
                            v-model="keyword"
                            placeholder="请输入关键词搜索"
                        />
                        <DropDown
                            v-for="(item, index) in sidebarList"
                            :title="item.name"
                            :length="item.skill.length"
                            :key="index"
                        >
                            <template #menu>
                                <div
                                    class="bg-[#F8F8F8] flex items-center p-[10px] mt-2 cursor-pointer"
                                    :class="{
                                        actived: selectval == item1.id,
                                        unactived: selectval != item1.id
                                    }"
                                    v-for="(item1, index1) in item.skill"
                                    :key="index1"
                                    @click="handleselected(item1)"
                                >
                                    <ElImage
                                        :src="item1.image"
                                        class="w-[34px] h-[34px] rounded-[8px]"
                                    ></ElImage>
                                    <div class="ml-2 flex-1">
                                        <div class="font-bold">
                                            {{ item1.name }}
                                        </div>
                                        <ClientOnly>
                                            <OverflowTooltip
                                                teleported
                                                class="text-tx-secondary"
                                                :content="item1.describe"
                                                :line="2"
                                            >
                                            </OverflowTooltip>
                                        </ClientOnly>
                                    </div>
                                </div>
                            </template>
                        </DropDown>
                    </div>
                </ElScrollbar>
            </template>
            <div class="h-full">
                <Chatting
                    class="h-full"
                    ref="chattingRef"
                    :title="chatTitle"
                    :selectval="selectval"
                    :avatar="currentIcon"
                    :chat-type="3"
                    :send-disabled="isReceiving"
                    :content-list="chatContentList"
                    @close="chatClose"
                    @update="getChatList"
                    @content-post="contentPost"
                    @clean-chat-log="cleanChatLog"
                ></Chatting>
            </div>
        </NuxtLayout>
    </div>
</template>
<script setup lang="ts">
import { ElImage, ElInput, ElMessageBox } from 'element-plus'
import { getSkillList } from '@/api/skill'
import { getchatLog, getChat, cleanChat, chatSendText } from '@/api/chat'
import { useUserStore } from '~~/stores/user'
import feedback from '~~/utils/feedback'
import { useAppStore } from '~/stores/app'
import { watchDebounced } from '@vueuse/core'
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
//当前选中的侧边栏
const selectval = ref(0)
//聊天框标题
const chatTitle = ref('')
const currentIcon = ref('')
//侧边栏列表
const sidebarList = ref([])

//选择侧边栏列表
const handleselected = ({ id, title, image }: any) => {
    chatContentList.value = []
    selectval.value = id
    chatTitle.value = title
    currentIcon.value = image
    nextTick(async () => {
        await getChatList()
        chattingRef.value.scrollToBottom()
    })
}

//对话记录列表
const chatContentList: any = ref([])
//对话框ref
const chattingRef = ref(null)
const keyword = ref()
//侧边栏列表数据
const getSidebarList = async () => {
    sidebarList.value = await getSkillList({
        keyword: keyword.value
    })
}

// //获取聊天记录
// const getChatList = async () => {
//     const data = await getchatLog({ type: 3, other_id: selectval.value })
//     if (data != null) chatContentList.value = data
// }
//获取聊天记录
const getChatList = async () => {
    let data = await getchatLog({
        type: 3,
        other_id: selectval.value,
        page_type: 0
    })
    data = data?.lists.map((item: any) => {
        if (item.type == 1) {
            return { ...item, from_avatar: userStore.userInfo.avatar }
        } else {
            return { ...item, from_avatar: currentIcon.value }
        }
    })
    chatContentList.value = data
}
//发送问题

const isReceiving = ref(false)
const contentPost = async (userInput: any, model?: string) => {
    try {
        isReceiving.value = true
        chatContentList.value.push({
            type: 1,
            content: userInput,
            from_avatar: userStore.userInfo.avatar
        })
        chatContentList.value.push({
            type: 2,
            loading: true,
            content: [],
            from_avatar: currentIcon.value,
            id: ''
        })
        await chatSendText(
            {
                model: model,
                question: userInput,
                type: 3,
                other_id: selectval.value
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
                                        event,
                                        data,
                                        code,
                                        index
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
                                        ].content[index] += data
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
    await feedback.confirm('确定清空对话？')
    await cleanChat({ type: 3, other_id: selectval.value })
    chatContentList.value = []
}

//选择侧边栏列表第一个选项
const selectFirst = () => {
    handleselected(sidebarList.value[0].skill[0])
}

onMounted(async () => {
    await getSidebarList()
    selectFirst()
})

watchDebounced(
    keyword,
    (value) => {
        getSidebarList()
    },
    {
        debounce: 500
    }
)

definePageMeta({
    layout: false
})
</script>
<style lang="scss" scoped>
.actived {
    border-left: 3px solid var(--el-color-primary);
}
.unactived {
    border-left: 3px solid #f8f8f8;
}
</style>
