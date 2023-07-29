<template>
    <div class="edit-popup">
        <popup
            ref="popupRef"
            :title="popupTitle"
            :async="true"
            width="550px"
            @confirm="handleSubmit"
            @close="handleClose"
        >
            <el-form ref="formRef" :model="formData" label-width="80px">
                <el-form-item label="敏感词语">
                    <div>
                        <el-input
                            class="w-[340px]"
                            type="textarea"
                            :autosize="{ minRows: 6, maxRows: 4 }"
                            v-model="formData.word"
                            placeholder="如：领袖；政治体系；政治事件"
                        >
                        </el-input>
                        <div class="form-tips">输入敏感词，添加多个以中文分号隔开</div>
                    </div>
                </el-form-item>
                <el-form-item label="敏感状态">
                    <el-radio-group v-model="formData.status">
                        <el-radio :label="1">启用</el-radio>
                        <el-radio :label="0">停用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </popup>
    </div>
</template>
<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import Popup from '@/components/popup/index.vue'
import { addSensitive, editSensitive } from '@/api/setting/sensitive'
const formData = ref<any>({
    id: '',
    word: '',
    status: 1
})
const emit = defineEmits(['success', 'close'])
const formRef = shallowRef<FormInstance>()
const popupRef = shallowRef<InstanceType<typeof Popup>>()
const mode = ref('add')
const popupTitle = computed(() => {
    return mode.value == 'edit' ? '编辑敏感词' : '新增敏感词'
})
const open = (type = 'add') => {
    mode.value = type
    popupRef.value?.open()
}
const handleSubmit = async () => {
    mode.value == 'add' ? await addSensitive(formData.value) : await editSensitive(formData.value)
    popupRef.value?.close()
    emit('close')
}
const handleClose = () => {
    emit('close')
}
const setFormData = (data: Record<any, any>) => {
    for (const key in formData.value) {
        if (data[key] != null && data[key] != undefined) {
            //@ts-ignore
            formData.value[key] = data[key]
        }
    }
}
defineExpose({
    open,
    setFormData
    // getDetail
})
</script>
