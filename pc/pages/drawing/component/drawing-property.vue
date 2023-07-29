<template>
    <el-scrollbar class="w-full">
        <div class="preview-operation">
            <!--    原始关键词    -->
            <div class="mt-[0px]">
                <div class="flex items-center">
                    <span class="text-lg font-bold">原始关键词</span>
                    <img
                        class="w-[16px] h-[16px] ml-[10px] cursor-pointer"
                        :src="IconCopy"
                        alt="复制"
                        @click="onCopy(formData.prompt)"
                    />
                </div>
                <div
                    class="mt-[10px] rounded-[4px] min-h-[60px] max-h-[120px] overflow-auto"
                    style="border: 1px solid #dcdfe6"
                >
                    <div class="px-[10px] py-[8px]">
                        {{ formData.prompt }}
                    </div>
                </div>
            </div>
            <!--    英文关键词    -->
            <div class="mt-[12px]" v-if="formData.prompt_en">
                <div class="flex items-center">
                    <span class="text-lg font-bold">英文关键词</span>
                    <img
                        class="w-[16px] h-[16px] ml-[10px] cursor-pointer"
                        :src="IconCopy"
                        alt="复制"
                        @click="onCopy(formData.prompt_en)"
                    />
                </div>
                <div
                    class="mt-[10px] rounded-[4px] min-h-[60px] max-h-[120px] overflow-auto"
                    style="border: 1px solid #dcdfe6"
                >
                    <div class="px-[10px] py-[8px]">
                        {{ formData.prompt_en }}
                    </div>
                </div>
            </div>

            <!--    放大图片    -->
            <div
                class="mt-[20px]"
                v-if="
                    formData?.status != 2 &&
                    !formData?.actions?.includes('low_variation1') &&
                    formData.able_edit
                "
            >
                <div class="flex items-center">
                    <span class="text-lg font-bold">放大图片</span>
                </div>
                <span class="mt-[10px] text-xs text-[#999999]">
                    对左侧的其中一张图片进行放大
                </span>
                <div class="mt-[10px]">
                    <el-button
                        class="mb-[10px] mr-[10px] !ml-0"
                        @click="onEnlargement(formData, 1)"
                    >
                        左上
                    </el-button>
                    <el-button
                        class="mb-[10px] mr-[10px] !ml-0"
                        @click="onEnlargement(formData, 2)"
                    >
                        右上
                    </el-button>
                    <el-button
                        class="mb-[10px] mr-[10px] !ml-0"
                        @click="onEnlargement(formData, 3)"
                    >
                        左下
                    </el-button>
                    <el-button
                        class="mb-[10px] mr-[10px] !ml-0"
                        @click="onEnlargement(formData, 4)"
                    >
                        右下
                    </el-button>
                </div>
            </div>

            <!--    变体    -->
            <div
                class="mt-[20px]"
                v-if="
                    formData?.status != 2 &&
                    !formData?.actions?.includes('low_variation1') &&
                    formData.able_edit
                "
            >
                <div class="flex items-center">
                    <span class="text-lg font-bold">变体</span>
                </div>
                <span class="mt-[10px] text-xs text-[#999999]">
                    对左侧的其中一张图片进行多样化修改
                </span>
                <div class="mt-[10px]">
                    <el-button
                        class="mb-[10px] mr-[10px] !ml-0"
                        @click="onConversion(formData, 1)"
                    >
                        左上
                    </el-button>
                    <el-button
                        class="mb-[10px] mr-[10px] !ml-0"
                        @click="onConversion(formData, 2)"
                    >
                        右上
                    </el-button>
                    <el-button
                        class="mb-[10px] mr-[10px] !ml-0"
                        @click="onConversion(formData, 3)"
                    >
                        左下
                    </el-button>
                    <el-button
                        class="mb-[10px] mr-[10px] !ml-0"
                        @click="onConversion(formData, 4)"
                    >
                        右下
                    </el-button>
                </div>
            </div>

            <!--    更多操作    -->
            <div class="mt-[20px]">
                <div class="flex items-center">
                    <span class="text-lg font-bold">更多操作</span>
                </div>
                <div class="mt-[10px]">
                    <template v-for="(item, index) in moreArr" :key="index">
                        <div
                            v-if="
                                !formData?.actions?.includes(
                                    'low_variation1'
                                ) || !item.hidden
                            "
                            class="more_btn"
                            style="border: 1px solid #dcdfe6; user-select: none"
                            @click="item['func'](formData)"
                        >
                            <img
                                class="w-[16px] h-[16px]"
                                :src="item.icon"
                                :alt="item.name"
                            />
                            <span
                                class="ml-[10px] text-base"
                                :class="item.className"
                            >
                                {{ item.name }}
                            </span>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </el-scrollbar>
</template>

<script setup lang="ts">
import IconCopy from '~/assets/images/drawing/icon_copy.png'
import IconDownload from '~/assets/images/drawing/icon_download.png'
import IconCollect from '~/assets/images/drawing/icon_collect.png'
import IconCutout from '~/assets/images/drawing/icon_cutout.png'
import IconReload from '~/assets/images/drawing/icon_reload.png'
import IconDelete from '~/assets/images/drawing/icon_delete.png'
import { useClipboard, useVModels } from '@vueuse/core'
import feedback from '~/utils/feedback'
import { useAppStore } from '~/stores/app'
import { downloadImgFile } from '~/utils/download'

const appStore = useAppStore()
const emit = defineEmits<{
    (event: 'drawing', value: any): void
    (event: 'delete', value: number[]): void
    (event: 'split', value: string): void
    (event: 'update:modelValue', value: any): void
}>()

const props = withDefaults(
    defineProps<{
        formData?: any // 数据
    }>(),
    {
        formData: {
            prompt: '',
            prompt_en: '',
            action: '',
            image_base: '',
            image_id: '',
            scale: ''
        }
    }
)

// 复制文字
const onCopy = async (content: string) => {
    try {
        const { copy } = useClipboard()
        await copy(content)
        feedback.msgSuccess('复制成功')
    } catch (error) {
        feedback.msgSuccess('复制失败')
    }
}

// 放大图片
const onEnlargement = (drawing: any, index: number) => {
    const params = drawing
    params.action = 'upsample' + index
    emit('drawing', { drawing: params })
}

// 变体图片
const onConversion = (drawing: any, index: number) => {
    const params = drawing
    params.action = 'variation' + index
    emit('drawing', { drawing: params })
}

// 文件下载
const onFileDownload = async (drawing: any) => {
    if (Array.isArray(drawing.image_url)) {
        feedback.msgError('切片后请右击保存图片～')
        return
    }
    downloadImgFile(drawing.image_url)
}

// 一键切图
const onSplitPic = async (drawing: any) => {
    emit('split', drawing.image_url)
}

// 重新生成
const onReDrawing = async (drawing: any) => {
    const params: any = {}
    params.action = 'generate'
    params.prompt = drawing.prompt
    params.image_id = ''
    params.scale = drawing.scale
    params.image_base = drawing.image_base
    emit('drawing', { drawing: params })
}

const onDelete = (drawing: any) => {
    emit('delete', [drawing.id])
}

const moreArr = [
    {
        icon: IconDownload,
        name: '下载',
        hidden: false,
        func: onFileDownload
    },
    // {
    //     icon: IconCollect,
    //     name: '收藏',
    //     func: ''
    // },
    {
        icon: IconCutout,
        name: '一键切图',
        hidden: true,
        func: onSplitPic
    },
    {
        icon: IconReload,
        name: '重新生成',
        hidden: true,
        className: 'text-primary',
        func: onReDrawing
    },
    {
        icon: IconDelete,
        name: '删除',
        hidden: false,
        className: 'text-primary',
        func: onDelete
    }
]
</script>

<style lang="scss" scoped>
.preview-operation {
    padding: 20px 15px;
    border-radius: 10px;
}
.more_btn:last-child {
    margin-right: 0;
}
.more_btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 12px;
    margin-bottom: 12px;
    padding: 8px 10px;
    border-radius: 4px;
}
</style>
