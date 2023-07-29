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
            <el-form
                class="ls-form"
                ref="formRef"
                :rules="rules"
                :model="formData"
                label-width="90px"
            >
                <el-form-item label="分类名称" prop="name">
                    <el-input
                        class="ls-input"
                        v-model="formData.name"
                        placeholder="请输入分类名称"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="父级分类" prop="name">
                    <el-radio-group v-model="formData.name">
                        <el-radio label="1">无父级分类</el-radio>
                        <el-radio label="2">有父级分类</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-select placeholder="请选择"> </el-select>
                </el-form-item>
                <el-form-item label="分类图片">
                    <material-picker v-model="formData.avatar" :limit="1" />
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="formData.sort" :min="0" :max="9999" />
                </el-form-item>
                <el-form-item label="状态" prop="sort">
                    <el-switch v-model="formData.disable" :active-value="0" :inactive-value="1" />
                </el-form-item>
            </el-form>
        </popup>
    </div>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { roleAdd, roleEdit } from '@/api/perms/role'
import Popup from '@/components/popup/index.vue'
const emit = defineEmits(['success', 'close'])
const formRef = shallowRef<FormInstance>()
const popupRef = shallowRef<InstanceType<typeof Popup>>()
const mode = ref('add')
const popupTitle = computed(() => {
    return mode.value == 'edit' ? '编辑类别' : '新增类别'
})
const formData = reactive({
    id: '',
    name: '',
    desc: '',
    sort: 0,
    menu_id: []
})

const rules = {
    name: [
        {
            required: true,
            message: '请输入名称',
            trigger: ['blur']
        }
    ]
}

const handleSubmit = async () => {
    await formRef.value?.validate()
    mode.value == 'edit' ? await roleEdit(formData) : await roleAdd(formData)
    popupRef.value?.close()
    emit('success')
}

const handleClose = () => {
    emit('close')
}

const open = (type = 'add') => {
    mode.value = type
    popupRef.value?.open()
}

const setFormData = async (data: Record<any, any>) => {
    for (const key in formData) {
        if (data[key] != null && data[key] != undefined) {
            //@ts-ignore
            formData[key] = data[key]
        }
    }
}

defineExpose({
    open,
    setFormData
})
</script>
