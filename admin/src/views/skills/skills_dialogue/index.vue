<template>
    <div>
        <el-card class="!border-none" shadow="never">
            <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
                <el-form-item label="用户信息">
                    <el-input
                        class="w-[280px]"
                        v-model="queryParams.title"
                        placeholder="请输入用户ID/用户昵称"
                        clearable
                        @keyup.enter="resetPage"
                    />
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input
                        class="w-[280px]"
                        v-model="queryParams.title"
                        placeholder="请输入关键词"
                        clearable
                        @keyup.enter="resetPage"
                    />
                </el-form-item>
                <el-form-item label="提问时间">
                    <daterange-picker
                        v-model:startTime="queryParams.time_start"
                        v-model:endTime="queryParams.time_end"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetPage">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="!border-none mt-4" shadow="never">
            <el-table size="large" v-loading="pager.loading" :data="pager.lists">
                <el-table-column label="ID" prop="id" min-width="80" />
                <el-table-column label="用户信息" min-width="180">
                    <template #default="{ row }">
                        <div class="flex items-center">
                            <image-contain
                                class="flex-none"
                                v-if="row.image"
                                :src="row.image"
                                :width="48"
                                :height="48"
                                :preview-src-list="[row.image]"
                                preview-teleported
                                fit="contain"
                            />
                            <span class="ml-4">达哥平台系统开发</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="提问时间"
                    prop="title"
                    min-width="160"
                    show-tooltip-when-overflow
                />
                <el-table-column label="用户提问" prop="cate_name" min-width="250" />
                <el-table-column label="消耗tokens" prop="author" min-width="120" />
                <el-table-column label="操作" width="180" fixed="right">
                    <template #default="{ row }">
                        <el-button
                            v-perms="['article.article/delete']"
                            type="primary"
                            link
                            @click="handleDelete(row.id)"
                        >
                            查看回复
                        </el-button>
                        <el-button
                            v-perms="['article.article/delete']"
                            type="danger"
                            link
                            @click="handleDelete(row.id)"
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
    </div>
</template>
<script lang="ts" setup name="dialogueRecord">
import { articleLists, articleDelete, articleStatus, articleCateAll } from '@/api/article'
import { useDictOptions } from '@/hooks/useDictOptions'
import { usePaging } from '@/hooks/usePaging'
import { getRoutePath } from '@/router'
import feedback from '@/utils/feedback'
const queryParams = reactive({
    title: '',
    cid: '',
    is_show: '',
    time_start: '',
    time_end: ''
})

const { pager, getLists, resetPage, resetParams } = usePaging({
    fetchFun: articleLists,
    params: queryParams
})

const { optionsData } = useDictOptions<{
    article_cate: any[]
}>({
    article_cate: {
        api: articleCateAll
    }
})

const changeStatus = async (is_show: any, id: number) => {
    try {
        await articleStatus({ id, is_show })
        getLists()
    } catch (error) {
        getLists()
    }
}

const handleDelete = async (id: number) => {
    await feedback.confirm('确定要删除？')
    await articleDelete({ id })
    getLists()
}

getLists()
</script>
