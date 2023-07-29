<template>
    <popup width="700px" title="查看回复" ref="popRef">
        <div class="whitespace-pre-line">{{ replyContent }}</div>
        <image-contain
            class="flex-none"
            :src="drawingImage"
            :preview-src-list="[drawingImage]"
            preview-teleported
            fit="contain"
        />
    </popup>
</template>

<script setup lang="ts">
import popup from '@/components/popup/index.vue'

const popRef = shallowRef()
const drawingImage = ref('')

const open = (image: string) => {
    popRef.value?.open()
    drawingImage.value = image
}

defineExpose({ open })
</script>

<style scoped lang="scss"></style>
