<template>
    <!-- #ifdef H5 -->
    <template v-if="isMarkdown">
        <markdown :content="content"></markdown>
    </template>
    <template v-else>
        <text
            user-select
            class="whitespace-pre-line leading-[40rpx] select-text"
        >
            {{ content }}
        </text>
    </template>
    <!-- #endif -->
    <!-- #ifndef H5 -->

    <view
        user-select
        class="class whitespace-pre-line leading-[40rpx] select-text"
    >
        {{ content }}
    </view>

    <!-- #endif -->
</template>
<script lang="ts">
export default {
    options: {
        virtualHost: true
    },

    externalClasses: ['class']
}
</script>
<script setup lang="ts">
const props = defineProps<{
    content: string
    isMarkdown: boolean
}>()
</script>
