<template>
    <div class="create-record-item">
        <div class="flex items-center">
            <div class="mr-auto line-clamp-1 text-lg font-medium">
                {{ title }}
            </div>
        </div>
        <div
            class="mt-[10px]"
            :class="{
                'line-clamp-[8]': overflow
            }"
        >
            <ChatContent
                :content="content"
                :use-markdown="!!appStore.config?.chat?.is_markdown"
            />
        </div>
        <div class="flex items-center flex-none mt-[10px]">
            <div class="text-xs text-tx-secondary mr-auto">
                {{ time }}
            </div>
            <ElButton
                v-if="showCopy"
                round
                size="small"
                color="#F2F2F2"
                @click.stop="emit('copy', content)"
            >
                复制
            </ElButton>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()
const props = withDefaults(
    defineProps<{
        title?: string
        time?: string
        content?: string
        showCopy?: boolean
        overflow?: boolean
    }>(),
    {
        title: '',
        time: '',
        content: '',
        overflow: false,
        showCopy: true
    }
)

const emit = defineEmits<{
    (event: 'copy', text: string): void
}>()
</script>
<style lang="scss" scoped>
.create-record-item {
    border-radius: 10px;
    padding: 16px;
    @apply bg-white;
}
</style>
