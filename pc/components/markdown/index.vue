<template>
    <div
        class="markdown-it-container markdown-body"
        @click="handleClick($event)"
        v-html="result"
    ></div>
</template>

<script setup lang="ts">
import { createMarkdown } from './createMarkdown'
import { useClipboard } from '@vueuse/core'
import 'github-markdown-css'

const props = withDefaults(
    defineProps<{
        content: string
    }>(),
    {
        content: ''
    }
)
const result = ref('')

const md = createMarkdown()
watch(
    () => props.content,
    (value) => {
        result.value = md.render(value)
    },
    {
        immediate: true
    }
)
const { copy } = useClipboard()

const handleClick = async (e) => {
    const target: HTMLElement = e.target
    if (target.className === 'code-copy-btn') {
        const text = e.target.nextElementSibling.textContent
        try {
            await copy(text)
            feedback.msgSuccess('复制成功')
        } catch (error) {
            feedback.msgSuccess('复制失败')
        }
    }
}
</script>

<style lang="scss">
@use 'code.scss';
.markdown-body {
    background-color: transparent;
    color: inherit;
    font-size: 15px;
}
</style>
