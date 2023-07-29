<template>
    <div class="chat-message flex">
        <!-- My message -->
        <div v-if="type == 1" class="ml-auto">
            <div class="message-contain message-contain--my">
                <slot name="my"></slot>
            </div>
            <div
                class="flex items-center justify-end text-[#999999] pr-4 pt-2 cursor-pointer"
                @click="copyMyContent"
            >
                <el-icon><CopyDocument /></el-icon>
                <span class="text-xs ml-[4px]">复制</span>
            </div>
        </div>

        <!-- Avatar -->
        <el-avatar class="message-avatar" :size="40" :src="avatar"></el-avatar>

        <!-- His message -->
        <div
            class="message-contain message-contain--his flex flex-col"
            v-if="type == 2"
        >
            <div>
                <slot name="rob"></slot>
            </div>
            <div
                class="flex items-center text-tx-secondary text-sm mt-[8px]"
                v-if="loading"
            >
                <div
                    class="flex items-center"
                    style="animation: loading-rotate 2s linear infinite"
                >
                    <Icon name="el-icon-Loading" class="circular" />
                </div>
                <div class="ml-[5px]">加载中，请稍等</div>
                <ElButton
                    type="primary"
                    link
                    :disabled="!stopping"
                    @click="emit('close')"
                >
                    <div class="text-[#FFA621]">停止回答</div>
                </ElButton>
            </div>
            <div v-if="!loading">
                <ElButton
                    v-if="showCopyBtn"
                    class="mt-2"
                    type="primary"
                    link
                    @click="copyContent"
                >
                    复制
                </ElButton>
                <ElButton
                    v-if="showCollectBtn"
                    class="mt-2"
                    :type="isCollet ? 'primary' : 'info'"
                    link
                    @click="collect"
                >
                    <template #default> 收藏 </template>
                </ElButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElAvatar, ElButton } from 'element-plus'
import { CopyDocument } from '@element-plus/icons-vue'
const emit = defineEmits(['collect', 'close', 'copyContent', 'copyMyContent'])
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    stopping: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: ''
    },
    type: {
        type: Number,
        default: null
    },
    showCopyBtn: {
        type: Boolean,
        default: true
    },
    showCollectBtn: {
        type: Boolean,
        default: true
    },
    isCollet: {
        type: Number
    }
})
//收藏
const collect = () => {
    emit('collect')
}
//复制我的
const copyMyContent = () => {
    emit('copyMyContent')
}
//复制
const copyContent = () => {
    emit('copyContent')
}
</script>

<style lang="scss" scoped>
.chat-message {
    // display: flex;
    flex: 1;
    min-width: 0;
    .message-avatar {
        min-width: 40px;
    }

    .message-contain {
        padding: 10px 12px;
        border-radius: 8px;
        max-width: 750px;
    }

    .message-contain--my {
        margin-right: 10px;
        background-color: var(--el-color-primary);
        color: #ffffff;
        margin-left: auto;
    }

    .message-contain--his {
        margin-left: 10px;
        background-color: var(--el-bg-color-page);
        flex: 1;
        min-width: 0;
    }
}
</style>
