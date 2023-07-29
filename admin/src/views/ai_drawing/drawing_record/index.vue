<template>
    <div>
        <el-card class="!border-none" shadow="never">
            <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
                <el-form-item label="用户信息">
                    <el-input
                        class="w-[280px]"
                        v-model="queryParams.user_info"
                        placeholder="请输入用户ID/用户昵称"
                        clearable
                        @keyup.enter="resetPage"
                    />
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input
                        class="w-[280px]"
                        v-model="queryParams.prompt"
                        placeholder="请输入关键词"
                        clearable
                        @keyup.enter="resetPage"
                    />
                </el-form-item>
                <el-form-item label="生成时间">
                    <daterange-picker
                        v-model:startTime="queryParams.start_time"
                        v-model:endTime="queryParams.end_time"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetPage">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="!border-none mt-4" shadow="never">
            <div class="mb-4">
                <el-button
                    type="default"
                    :plain="true"
                    :disabled="!multipleSelection.length"
                    @click="handleDelete(multipleSelection.map((item) => item.id))"
                >
                    批量删除
                </el-button>
            </div>
            <el-table
                size="large"
                v-loading="pager.loading"
                :data="pager.lists"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" />
                <el-table-column label="ID" prop="id" min-width="80" />
                <el-table-column label="用户信息" min-width="140">
                    <template #default="{ row }">
                        <div class="flex items-center">
                            <image-contain
                                class="flex-none"
                                v-if="row.avatar"
                                :src="row.avatar"
                                :width="48"
                                :height="48"
                                :preview-src-list="[row.avatar]"
                                preview-teleported
                                fit="contain"
                            />
                            <span class="ml-4">{{ row.nickname }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="生成时间"
                    prop="create_time"
                    min-width="180"
                    show-tooltip-when-overflow
                />
                <el-table-column label="用户输入" prop="prompt" min-width="280" />
                <el-table-column label="用户输入翻译" prop="prompt_en" min-width="280" />
                <el-table-column label="上传图片" min-width="160">
                    <template #default="{ row }">
                        <div class="flex items-center">
                            <image-contain
                                class="flex-none"
                                v-if="row.image_base"
                                :src="row.image_base"
                                :width="64"
                                :height="64"
                                :preview-src-list="[row.image_base]"
                                preview-teleported
                                fit="contain"
                            />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="消耗tokens" prop="use_tokens" min-width="120" />
                <el-table-column label="操作" min-width="180" fixed="right">
                    <template #default="{ row }">
                        <el-button
                            v-perms="['chat_records/see']"
                            type="primary"
                            link
                            @click="openPop(row.image)"
                        >
                            生成详情
                        </el-button>
                        <el-button
                            type="danger"
                            v-perms="['chat_records/del']"
                            link
                            @click="handleDelete([row.id])"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="flex justify-end mt-4">
                <pagination v-model="pager" @change="getLists" />
            </div>
        </el-card>
        <DrawingDetail ref="drawingRef"></DrawingDetail>
    </div>
</template>
<script lang="ts" setup name="dialogueRecord">
import { drawRecordsLists, drawRecordsDel } from '@/api/ai_draw/draw_records'
import { usePaging } from '@/hooks/usePaging'
import DrawingDetail from './detail.vue'
import feedback from '@/utils/feedback'

const queryParams = reactive({
    type: '1',
    user_info: '', //用户信息
    prompt: '', //关键词
    start_time: '',
    end_time: ''
})

//弹框ref
const drawingRef = shallowRef()
const multipleSelection = ref<any[]>([])

//打开弹框
const openPop = (reply: any) => {
    drawingRef.value.open(reply)
}

const { pager, getLists, resetPage, resetParams } = usePaging({
    fetchFun: drawRecordsLists,
    params: queryParams
})

const handleSelectionChange = (val: any[]) => {
    multipleSelection.value = val
}

const handleDelete = async (ids: number[]) => {
    await feedback.confirm('确定要删除？')
    await drawRecordsDel({ ids })
    await feedback.msgSuccess('删除成功')
    getLists()
}

getLists()
</script>
