<template>
    <div
        class="preview-picture"
        v-loading="loading"
    >
        <!--    单张图片    -->
        <image-contain
            v-if="!Array.isArray(picture)"
            :src="picture"
            :preview-src-list="[picture]"
            :preview-teleported="true"
            :hide-on-click-modal="true"
        >
        </image-contain>
        <!--    多张图片    -->
        <template v-else>
            <image-contain
                v-for="(item, index) in picture"
                :key="index"
                :src="item"
                class="image__item"
                :initial-index="index"
                :preview-src-list="picture"
                :preview-teleported="true"
                :hide-on-click-modal="true"
            >
            </image-contain>
        </template>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        loading: boolean
        picture?: string | any // 图片
    }>(),
    {
        loading: false,
        picture: ''
    }
)
</script>

<style lang="scss" scoped>
.preview-picture {
    //flex: 1 1 0;
    max-width: 620px;
    min-width: 150px;
    overflow: hidden;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    .image__item {
        flex-basis: calc(50% - 10px);
        margin: 5px;
    }
}
</style>
