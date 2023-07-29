<template>
    <view class="chat-record-item">
        <view :class="`chat-record-item__${type}`">
            <view>
                <u-icon
                    class="rounded-full overflow-hidden"
                    v-if="type == 'left'"
                    :name="avatar"
                    :size="80"
                />
            </view>
            <image
                class="flex rounded-[50%] overflow-hidden w-[80rpx] h-[80rpx]"
                v-if="type == 'right'"
                :src="userStore.userInfo.avatar"
            />
            <view
                class="min-w-0 flex flex-col"
                :class="{ 'justify-end': type == 'right' }"
            >
                <view :class="`chat-record-item__${type}-content`">
                    <view>
                        <template v-if="isArray(content)">
                            <view
                                v-for="(item, index) in content"
                                :key="index"
                                class="mb-[20rpx]"
                                :class="{
                                    'pt-[20rpx] border-t border-solid border-light border-0':
                                        index > 0
                                }"
                            >
                                <text-item
                                    :is-markdown="isMarkdown"
                                    :content="item"
                                />
                            </view>
                        </template>
                        <template v-else>
                            <text-item
                                :is-markdown="isMarkdown"
                                :content="content"
                            />
                        </template>

                        <view
                            class="flex items-center text-muted text-sm mt-[16rpx]"
                            v-if="loading"
                        >
                            <u-loading mode="flower"></u-loading>
                            <view class="ml-[10rpx]">加载中，请稍等</view>
                            <view
                                class="ml-[30rpx] text-primary"
                                @click="emit('close')"
                            >
                                停止回答
                            </view>
                        </view>
                        <view
                            v-if="
                                showCopyBtn &&
                                showCollectBtn &&
                                !loading &&
                                userStore.isLogin &&
                                type === 'left'
                            "
                            class="flex justify-between"
                        >
                            <view class="mt-[16rpx] flex">
                                <view
                                    v-if="showCopyBtn"
                                    class="text-[#4073fa] text-sm"
                                    @click="copy(content)"
                                >
                                    复制
                                </view>
                                <view
                                    v-if="showCollectBtn"
                                    class="text-sm ml-[30rpx]"
                                    :class="{
                                        'text-primary': isCollect,
                                        'text-muted': !isCollect
                                    }"
                                    @click="handleCollect(recordId)"
                                >
                                    收藏
                                </view>
                            </view>
                            <!--  生成海报  -->
                            <view
                                v-if="userStore.isLogin"
                                class="flex items-center mt-[16rpx] ml-[20rpx]"
                                @click="emit('click-poster', recordId)"
                            >
                                <u-icon name="photo" color="#999"></u-icon>
                                <text class="text-muted text-sm ml-[10rpx]"
                                    >生成海报</text
                                >
                            </view>
                        </view>
                    </view>
                </view>
                <view
                    v-if="type == 'right'"
                    class="flex items-center justify-end pr-[20rpx] pt-[10rpx]"
                    @click="copy(content)"
                >
                    <image
                        class="w-[26rpx] h-[26rpx]"
                        src="@/static/images/icon/icon_copy.png"
                    ></image>
                    <text class="text-xs text-muted ml-[8rpx]">复制</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { cancelCollectChatRecord, collectChatRecord } from '@/api/chat'
import { useCopy } from '@/hooks/useCopy'
import { useLockFn } from '@/hooks/useLockFn'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import TextItem from './text-item.vue'
import { isArray } from 'lodash-es'
import { computed } from 'vue'
// import
const props = withDefaults(
    defineProps<{
        recordId?: number | string
        type: 'left' | 'right'
        content: string
        showCopyBtn?: boolean
        showCollectBtn?: boolean
        loading?: boolean
        isCollect?: number
        avatar: string
    }>(),
    {
        showCollectBtn: true,
        showCopyBtn: true,
        content: '',
        loading: false
    }
)

const emit = defineEmits<{
    (event: 'update'): void
    (event: 'close'): void
    (event: 'click-poster', value?: number | string): void
}>()
const userStore = useUserStore()
const appStore = useAppStore()
const { copy } = useCopy()

const { lockFn: handleCollect } = useLockFn(async (id: number | string) => {
    if (props.isCollect) {
        await cancelCollectChatRecord({
            collect_id: props.isCollect
        })
    } else {
        await collectChatRecord({
            records_id: id
        })
    }
    emit('update')
})

const isMarkdown = computed(() => {
    return appStore.getChatConfig.is_markdown && props.type == 'left'
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
.chat-record-item {
    padding: 0 20rpx;
    margin-top: 20rpx;
    &__left,
    &__right {
        display: flex;
        align-items: flex-start;
        min-height: 80rpx;
        &-content {
            display: inline-block;
            padding: 20rpx;
            max-width: 100%;
            border-radius: 10rpx;
            position: relative;
            min-width: 70rpx;
            min-height: 80rpx;
            &::before {
                content: '';
                display: block;
                width: 0;
                height: 0;
                position: absolute;
                top: 24rpx;
                border: 16rpx solid transparent;
            }
        }
        .text-typing {
            display: inline-block;
            vertical-align: -8rpx;
            height: 34rpx;
            width: 6rpx;
            background-color: $u-type-primary;
            animation: typingFade 0.4s infinite alternate;
        }
    }
    &__right {
        flex-direction: row-reverse;
    }
    &__left-content {
        margin-left: 25rpx;
        background-color: $u-bg-color;
        &::before {
            left: -30rpx;
            border-right-color: $u-bg-color;
        }
    }
    &__right-content {
        color: #fff;
        background-color: #4073fa;
        margin-right: 20rpx;
        &::before {
            right: -30rpx;
            border-left-color: #4073fa;
        }
    }
}
</style>
