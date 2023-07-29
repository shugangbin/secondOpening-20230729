<template>
    <view
        class="markdown-it-container markdown-body"
        @click="handleClick($event)"
        v-html="result"
    ></view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { createMarkdown } from './createMarkdown'
import { useCopy } from '@/hooks/useCopy'
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
const { copy } = useCopy()

const handleClick = async (e: any) => {
    const target: HTMLElement = e.target
    if (target.className === 'code-copy-btn') {
        const text = e.target.nextElementSibling.textContent
        copy(text)
    }
}
</script>

<style lang="scss">
// @use 'code.scss';
$line-height: 1.375;

.markdown-it-container {
    user-select: text;
    white-space: normal;
    word-wrap: normal;
    :deep() {
        --code-bg-color: #282c34;
        --code-hl-bg-color: rgba(0, 0, 0, 0.66);
        --code-ln-color: #9e9e9e;
        --code-ln-wrapper-width: 3.5rem;
        ul,
        ol {
            padding-left: 2em;
        }
        ul li {
            list-style: circle;
        }
        ol li {
            list-style: decimal;
        }
        code {
            color: #476582;
            padding: 0.25rem;
            margin: 0;
            font-size: 0.85em;
            border-radius: 3px;
        }
        code[class*='language-'],
        pre[class*='language-'] {
            color: #ccc;
            background: none;
            font-size: 1em;
            text-align: left;
            white-space: pre;
            word-spacing: normal;
            word-break: normal;
            word-wrap: normal;
            line-height: 1.5;

            -moz-tab-size: 4;
            -o-tab-size: 4;
            tab-size: 4;

            -webkit-hyphens: none;
            -moz-hyphens: none;
            -ms-hyphens: none;
            hyphens: none;
        }

        /* Code blocks */
        pre[class*='language-'] {
            padding: 1em;
            margin: 0.5em 0;
            overflow: auto;
        }

        :not(pre) > code[class*='language-'],
        pre[class*='language-'] {
            background: #2d2d2d;
        }

        /* Inline code */
        :not(pre) > code[class*='language-'] {
            padding: 0.1em;
            border-radius: 0.3em;
            white-space: normal;
        }

        pre,
        pre[class*='language-'] {
            line-height: $line-height;
            padding: 2.5rem 1.5rem 1.3rem;
            margin: 0.85rem 0;
            border-radius: 6px;
            overflow: auto;

            code {
                color: #fff;
                padding: 0;
                background-color: transparent !important;
                border-radius: 0;
                overflow-wrap: unset;
                -webkit-font-smoothing: auto;
                -moz-osx-font-smoothing: auto;
            }
        }

        div[class*='language-'] {
            position: relative;
            background-color: var(--code-bg-color);
            border-radius: 6px;
            .code-copy-btn {
                position: absolute;
                z-index: 3;
                top: 0.8em;
                right: 1rem;
                font-size: 0.75rem;
                color: var(--code-ln-color);
                cursor: pointer;
            }
            &::before {
                content: attr(data-ext);
                position: absolute;
                z-index: 3;
                top: 0.8em;
                left: 1rem;
                font-size: 0.75rem;
                color: var(--code-ln-color);
            }

            pre,
            pre[class*='language-'] {
                // force override the background color to be compatible with shiki
                background: transparent !important;
                position: relative;
                z-index: 1;
            }

            &:not(.line-numbers-mode) {
                .line-numbers {
                    display: none;
                }
            }

            &.line-numbers-mode {
                pre {
                    margin-left: var(--code-ln-wrapper-width);
                    padding-left: 1rem;
                    vertical-align: middle;
                }

                .line-numbers {
                    position: absolute;
                    top: 0;
                    width: var(--code-ln-wrapper-width);
                    text-align: center;
                    color: var(--code-ln-color);
                    padding-top: 1.25rem;
                    line-height: $line-height;
                    counter-reset: line-number;

                    .line-number {
                        position: relative;
                        z-index: 3;
                        user-select: none;
                        height: #{$line-height}em;

                        &::before {
                            counter-increment: line-number;
                            content: counter(line-number);
                            font-size: 0.85em;
                        }
                    }
                }

                &::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: var(--code-ln-wrapper-width);
                    height: 100%;
                    border-radius: 6px 0 0 6px;
                    border-right: 1px solid var(--code-hl-bg-color);
                }
            }
        }
    }
}
.markdown-body {
    background-color: transparent;
    color: inherit;
    font-size: 28rpx;
}
</style>
