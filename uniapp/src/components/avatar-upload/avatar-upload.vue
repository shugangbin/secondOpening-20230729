<template>
    <button
        class="avatar-upload p-0 m-0 rounded inline-flex flex-col items-center"
        hover-class="none"
        open-type="chooseAvatar"
        @click="chooseAvatar"
        @chooseavatar="chooseAvatar"
    >
        <image
            :style="styles"
            class="w-full h-full"
            mode="heightFix"
            :src="modelValue"
            v-if="modelValue"
        />
        <slot v-else>
            <view
                :style="styles"
                class="border border-dotted border-light flex w-full h-full flex-col items-center justify-center text-muted text-xs box-border rounded"
            >
                <u-icon name="plus" :size="36" />
                添加图片
            </view>
        </slot>
        <slot name="footer"></slot>
    </button>
</template>
<script lang="ts" setup>
import { addUnit } from '@/utils/util'
import { isBoolean } from 'lodash'
import { computed, CSSProperties, onUnmounted } from 'vue'
import { useRouter } from 'uniapp-router-next'
const router = useRouter()
const props = defineProps({
    modelValue: {
        type: String
    },
    size: {
        type: [String, Number],
        default: 140
    },
    round: {
        type: [Boolean, String, Number],
        default: false
    },
    border: {
        type: Boolean,
        default: true
    }
})
const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void
    (event: 'upload', value: string): void
}>()

const styles = computed<CSSProperties>(() => {
    const size = addUnit(props.size)
    return {
        width: size,
        height: size,
        borderRadius: isBoolean(props.round)
            ? props.round
                ? '50%'
                : ''
            : addUnit(props.round)
    }
})

const chooseAvatar = (e: any) => {
    // #ifndef MP-WEIXIN
    router.navigateTo({
        path: '/uni_modules/vk-uview-ui/components/u-avatar-cropper/u-avatar-cropper?destWidth=300&rectWidth=200&fileType=jpg'
    })
    // #endif
    // #ifdef MP-WEIXIN
    const path = e.detail?.avatarUrl
    if (path) {
        uploadImageIng(path)
    }
    // #endif
}

const uploadImageIng = async (file: string) => {
    emit('update:modelValue', file)
    emit('upload', file)
}
// 监听从裁剪页发布的事件，获得裁剪结果
uni.$on('uAvatarCropper', (path) => {
    // console.log(path)
    uploadImageIng(path)
})
onUnmounted(() => {
    uni.$off('uAvatarCropper')
})
</script>

<style lang="scss" scoped>
.avatar-upload {
    background: #fff;
    overflow: hidden;
    &::after {
        border: none;
    }
}
</style>
