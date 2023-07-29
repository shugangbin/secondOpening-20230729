<template>
    <div
        class="chatting flex flex-col flex-1 bg-white py-[20px] w-full min-w-0 rounded-[20px]"
    >
        <!--对话框-->
        <div class="flex-1 flex flex-col min-h-0">
            <div v-if="title" class="text-center">{{ title }}</div>
            <el-scrollbar ref="scrollbarRef" height="100%" @scroll="scroll">
                <slot></slot>
                <div ref="innerRef">
                    <div
                        class="px-[40px] pb-[40px]"
                        v-if="!contentList.length && modelInfo.tips"
                    >
                        <div class="message-contain message--his">
                            <ChatMsgItem
                                v-if="chatType != 0"
                                :type="2"
                                :is-collet="0"
                                :avatar="avatar"
                                :show-collect-btn="false"
                                :show-copy-btn="false"
                            >
                                <template #rob>
                                    <chat-content :content="modelInfo.tips" />
                                </template>
                            </ChatMsgItem>
                        </div>
                    </div>
                    <div
                        v-for="(item, index) in contentList"
                        :key="index"
                        class="px-[40px] pb-[40px]"
                    >
                        <!-- <div
                            class="text-center text-info"
                            v-if="timeFormat(item, index)"
                        ></div> -->
                        <!-- rob message -->
                        <div
                            class="message-contain message--his"
                            v-if="item.type === 2"
                        >
                            <ChatMsgItem
                                :avatar="item.from_avatar"
                                :type="2"
                                :loading="item.loading"
                                :stopping="!!item.content"
                                :is-collet="item.is_collect"
                                @collect="collect(item.id, item.is_collect)"
                                @copy-content="copyContent(item.content)"
                                @close="emit('close', index)"
                            >
                                <template #rob>
                                    <template
                                        v-if="
                                            item.loading && !item.content.length
                                        "
                                    >
                                        <div class="text-primary">
                                            等待回复中...
                                        </div>
                                    </template>
                                    <div
                                        v-for="(text, index) in item.content"
                                        :key="index"
                                        class="mb-[15px]"
                                        :class="{
                                            ' pt-[15px] border-t border-solid border-br-light':
                                                index > 0
                                        }"
                                    >
                                        <chat-content
                                            :loading="item.loading"
                                            :content="text"
                                            :use-markdown="
                                                !!appStore.config?.chat
                                                    ?.is_markdown
                                            "
                                        />
                                    </div>
                                </template>
                            </ChatMsgItem>
                        </div>
                        <!--my msg-->
                        <div
                            class="message-contain message--my"
                            v-if="item.type === 1"
                        >
                            <ChatMsgItem
                                :avatar="item.from_avatar"
                                :type="1"
                                @copy-my-content="copyContent(item.content)"
                            >
                                <template #my>
                                    <chat-content :content="item.content" />
                                </template>
                            </ChatMsgItem>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center pb-[10px]">
                    <ElButton
                        v-if="contentList.length"
                        :disabled="sendDisabled"
                        color="#f6f6f6"
                        :round="true"
                        style="--el-button-disabled-text-color: #999"
                        @click="emit('contentPost', '继续')"
                    >
                        <Icon name="el-icon-VideoPlay" :size="18" />
                        <span class="ml-[5px]">继续</span>
                    </ElButton>
                </div>
            </el-scrollbar>
        </div>
        <div class="lg:px-[50px] mx-[10px]">
            <!--模型选择-->
            <ModelPicker v-model="chatModel"></ModelPicker>
            <!--输入框-->
            <div class="flex items-end">
                <div
                    class="flex h-full items-end flex-1 rounded-sm overflow-hidden"
                >
                    <ElInput
                        v-model="inputContent"
                        :input-style="{
                            backgroundColor: 'var(--el-bg-color-page)'
                        }"
                        class="min-h-full py-[4px]"
                        placeholder="请输入内容（Shift + Enter）= 换行"
                        type="textarea"
                        :autosize="{
                            maxRows: 4
                        }"
                        resize="none"
                        @compositionstart="isInputChinese = true"
                        @compositionend="isInputChinese = false"
                        @keydown="handleInputEnter"
                        @click="handleClick"
                    />
                </div>
                <ElButton
                    class="ml-2"
                    type="primary"
                    @click="contentPost"
                    size="large"
                    :disabled="sendDisabled"
                >
                    <template #default>
                        <span class="text-white">发送</span>
                    </template>
                </ElButton>
                <ElButton type="primary" link class="ml-4" @click="cleanChatLog">
                    <template #default>
                        <span class="text-primary">清空对话</span>
                    </template>
                </ElButton>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ElInput, ElButton, ElScrollbar } from 'element-plus'
import { collectRecords, getCreationDetail, getSkillDetail } from '@/api/chat'
import { useUserStore } from '~~/stores/user'
import feedback from '~~/utils/feedback'
import { useElementSize } from '@vueuse/core'
import { cancelCollect } from '~~/api/my'
import { useClipboard } from '@vueuse/core'
import { useAppStore } from '~/stores/app'

import ModelPicker from './model-picker.vue'

const appStore = useAppStore()
const userStore = useUserStore()
const { isLogin, toggleShowLogin } = userStore

const emit = defineEmits([
    'loading',
    'contentPost',
    'cleanChatLog',
    'update',
    'close'
])
const props = defineProps({
    contentList: {
        type: Array as any,
        default: () => []
    },
    selectval: {
        type: String,
        default: ''
    },
    chatType: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        default: ''
    },
    sendDisabled: {
        type: Boolean
    },
    avatar: {
        type: String
    }
})

//输入框输入内容
const inputContent = ref('')

//对话框ref
const innerRef = ref<HTMLDivElement>(null)

//滚动条ref
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>(null)

// 聊天模型
const chatModel = ref<string>('')

//对话框滚动
const scroll = (value) => {
    refresh(value)
}

const modelInfo = ref<any>({})
const getChatModel = async () => {
    switch (props.chatType) {
        case 2:
            modelInfo.value = await getCreationDetail({
                id: props.selectval
            })
            break
        case 3:
            modelInfo.value = await getSkillDetail({
                id: props.selectval
            })
    }
}

watch(
    () => props.selectval,
    (val) => {
        console.log(val)
        if (props.chatType != 0) {
            getChatModel()
        }
    },
    {
        immediate: false
    }
)

const handleClick = () => {
    if (!isLogin) {
        toggleShowLogin()
    }
}

//点击回车键
const isInputChinese = ref(false)
const handleInputEnter = (e: any) => {
    if (e.shiftKey && e.keyCode === 13) {
        return
    }
    if (isInputChinese.value) return
    if (e.keyCode === 13) {
        contentPost()
        return e.preventDefault()
    }
}

//发送
const contentPost = () => {
    if (inputContent.value.replace(/(^\s*)|(\s*$)/g, '') == '') {
        feedback.msgError('输入为空！')
        return
    }

    if (props.sendDisabled) return
    if (!isLogin) {
        toggleShowLogin()
    }
    emit('contentPost', inputContent.value, chatModel.value)
    nextTick(() => {
        scrollToBottom()
    })
    // inputContent.value = ''
}

//清空输入框
const cleanInput = () => {
    inputContent.value = ''
}

//清空会话
const cleanChatLog = () => {
    emit('cleanChatLog')
}

//收藏会话
const collect = async (id, is_collect) => {
    if (is_collect) {
        await cancelCollect({
            collect_id: is_collect
        })
    } else {
        await collectRecords({ records_id: id })
    }
    emit('update')
}

//复制文本
const { copy } = useClipboard()
const copyContent = async (content) => {
    try {
        await copy(content)
        feedback.msgSuccess('复制成功')
    } catch (error) {
        feedback.msgSuccess('复制失败')
    }
}

//计算滚动到底部高度
const toScrollHeight = () => {
    return (
        scrollbarRef.value.wrapRef.scrollHeight -
        scrollbarRef.value.wrapRef.clientHeight
    )
}

//滚动至顶部加载
const refresh = ({ scrollTop }) => {
    if (scrollTop == 0) {
        console.log('刷新！')
    }
}

//滚动到底部
const scrollToBottom = () => {
    const scrollH = toScrollHeight()
    scrollbarRef.value!.setScrollTop(scrollH)
}

const { height } = useElementSize(innerRef)
watch(height, (value) => {
    if (props.sendDisabled) {
        scrollToBottom()
    }
})

defineExpose({ scrollToBottom, cleanInput })
</script>
<style lang="scss" scoped>
.chatting {
    background: url(../../assets/images/dialogBg.png) no-repeat;
    background-size: cover;
}
.message-contain {
    padding: 10px 0;
}

.message--my {
    display: flex;
    justify-content: flex-end;
}

.message--his {
    display: flex;
    justify-content: flex-start;
}
:deep(.el-textarea__inner) {
    box-shadow: none;
    background-color: var(--el-bg-color-page);
}
</style>
