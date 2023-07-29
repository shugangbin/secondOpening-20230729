<template>
    <div class="chat-content">
        <!-- Text Message -->
        <template v-if="MsgMap['TEXT'] === type">
            <div class="chat-text">
                <ClientOnly>
                    <Markdown v-if="useMarkdown" :content="content"></Markdown>
                    <div v-else class="whitespace-pre-line">
                        {{ content }}
                    </div>
                </ClientOnly>
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { E_Msg } from '@/enums/appEnums'

const props = defineProps({
    useMarkdown: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    },
    type: {
        type: Number,
        default: 1
    },
    content: {
        type: [String],
        default: ''
    }
})

const MsgMap = computed(() => {
    return Object.freeze({ ...E_Msg })
})
</script>

<style lang="scss" scoped>
@keyframes typingFade {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 100%;
    }
    100% {
        opacity: 100%;
    }
}
.chat-content {
    .goods-message {
        width: 300px;
        .goods-image {
            min-width: 80px;
            min-height: 80px;
        }

        .goods-price {
            color: #ff2c3c;
        }
    }
    .chat-text {
        .typing {
            display: inline-block;
            vertical-align: -4px;
            height: 18px;
            width: 3px;
            background-color: var(--el-color-primary);
            animation: typingFade 0.6s infinite alternate;
        }
    }
}
</style>
