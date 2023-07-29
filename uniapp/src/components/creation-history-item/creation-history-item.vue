<template>
    <view class="create-record-item">
        <view class="flex items-center">
            <view
                class="text-lg line-clamp-1 font-medium"
                @click="emit('click-title', title)"
            >
                {{ title }}
            </view>
        </view>
        <view class="flex items-center text-xs">
            <view class="text-muted mt-[10rpx] mr-auto">{{ time }}</view>
        </view>

        <view
            class="mt-[10px] bg-page p-[20rpx] rounded-[14rpx]"
            v-for="(item, index) in content"
            :key="index"
        >
            <view>
                <u-read-more v-if="overflow" :toggle="true">
                    <view class="indent-0 text-main">
                        <text-item
                            :is-markdown="!!appStore.getChatConfig.is_markdown"
                            :content="item"
                        />
                    </view>
                </u-read-more>
                <view v-else>
                    <text-item
                        :is-markdown="!!appStore.getChatConfig.is_markdown"
                        :content="item"
                    />
                </view>
            </view>
            <view class="flex justify-end">
                <view
                    v-if="showCopy"
                    class="mt-[20rpx] flex bg-white px-[26rpx] py-[10rpx] rounded-full text-content"
                    @click.stop="emit('copy', item)"
                >
                    <u-icon name="file-text" />
                    <span class="text-xs ml-[10rpx]"> 复制</span>
                </view>
            </view>
        </view>
    </view>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/stores/app'
import TextItem from '@/components/chat-record-item/text-item.vue'
const appStore = useAppStore()
const props = withDefaults(
    defineProps<{
        title?: string
        time?: string
        content?: string[]
        overflow?: boolean
        showCopy?: boolean
    }>(),
    {
        title: '',
        time: '',
        content: () => [],
        overflow: false,
        showCopy: true
    }
)
const emit = defineEmits<{
    (event: 'click-title', text: string): void
    (event: 'copy', text: string): void
    (event: 'delete'): void
}>()
</script>
<style lang="scss">
.create-record-item {
    border-radius: 20rpx;
    padding: 30rpx;
    @apply bg-white;
}
.line-clamp-5 {
    text-overflow: ellipsis;
    @apply line-clamp-[5];
}
</style>
