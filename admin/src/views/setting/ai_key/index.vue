<template>
    <div>
        <el-card class="!border-none" shadow="never">
            <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
                <el-form-item label="接口类型">
                    <el-select class="w-[280px]" v-model="queryParams.ai_key">
                        <el-option
                            v-for="(item, key) in modelList"
                            :key="key"
                            :label="item"
                            :value="key"
                        />
                    </el-select>
                </el-form-item>
<!--                <el-form-item label="关键词">-->
<!--                    <el-input-->
<!--                        class="w-[280px]"-->
<!--                        v-model="queryParams.keyword"-->
<!--                        placeholder="请输入关键词"-->
<!--                        clearable-->
<!--                        @keyup.enter="resetPage"-->
<!--                    />-->
<!--                </el-form-item>-->
<!--                <el-form-item label="生成时间">-->
<!--                    <daterange-picker-->
<!--                        v-model:startTime="queryParams.start_time"-->
<!--                        v-model:endTime="queryParams.end_time"-->
<!--                    />-->
<!--                </el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="resetPage">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                    <!-- <export-data
                class="ml-2.5"
                :fetch-fun="getUserList"
                :params="queryParams"
                :page-size="pager.size"
            /> -->
                </el-form-item>
            </el-form>
        </el-card>
        <el-card shadow="never" class="!border-none mt-4">
            <el-tabs v-model="activeTab" @tabChange="changeTabs">
                <el-tab-pane
                    v-for="(item, index) in tabLists"
                    :label="`${item.name}`"
                    :name="item.type"
                    :key="index"
                >
                </el-tab-pane>
            </el-tabs>

            <div class="mb-[10px]">
                <el-button
                    v-perms="['setting.KeyPool/edit']"
                    type="primary"
                    @click="handleEdit('add')"
                >
                    + 新增密钥
                </el-button>
            </div>

            <el-table size="large" v-loading="pager.loading" :data="pager.lists">
                <el-table-column label="接口类型" prop="ai_key_desc" min-width="100" />
                <!-- <el-table-column label="登录账号" prop="account" min-width="120" /> -->
                <el-table-column label="密钥  " prop="key" min-width="200" />
                <el-table-column label="状态" min-width="100" v-perms="['setting.KeyPool/status']">
                    <template #default="{ row }">
                        <el-switch
                            v-model="row.status"
                            :active-value="1"
                            :inactive-value="0"
                            @change="changeStatus(row.id)"
                        />
                    </template>
                </el-table-column>
<!--                <el-table-column label="余额" min-width="100" v-if="queryParams.type == 1">-->
<!--                    <template #default="{ row }">-->
<!--                        <el-button-->
<!--                            v-if="row.query_balance"-->
<!--                            type="primary"-->
<!--                            :link="true"-->
<!--                            @click="handleQueryBalance(row.id)"-->
<!--                        >-->
<!--                            查询余额-->
<!--                        </el-button>-->
<!--                        <span v-else>-</span>-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column label="创建时间" prop="create_time" min-width="180" />
                <el-table-column label="更新时间" prop="update_time" min-width="180" />
                <el-table-column label="操作" fixed="right" min-width="180">
                    <template #default="{ row }">
                        <el-button
                            v-perms="['setting.KeyPool/edit']"
                            type="primary"
                            link
                            @click="handleEdit('edit', row)"
                        >
                            编辑
                        </el-button>
                        <el-button
                            v-perms="['setting.KeyPool/del']"
                            type="danger"
                            :link="true"
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

        <balancePop ref="balanceRef"></balancePop>
        <edit-popup v-if="showEdit" ref="editRef" @success="getLists" />
    </div>
</template>
<script setup lang="ts">
import { ClientMap } from '@/enums/appEnums'
import { usePaging } from '@/hooks/usePaging'
import { getKeyPoolLists, getKeyPoolAiModel, statusKeyPool, delKeyPool } from '@/api/setting/ai_key'
import feedback from '@/utils/feedback'
import EditPopup from './edit.vue'
import BalancePop from './balance.vue'

//是/否显示编辑弹框
const showEdit = ref(true)
//编辑弹框ref
const editRef = shallowRef<InstanceType<typeof EditPopup>>()
//余额弹框ref
const balanceRef = shallowRef<InstanceType<typeof BalancePop>>()
const modelList = ref<any[]>([])
const queryParams = reactive({
    type: 1,
    ai_key: '',
    keyword: '',
    start_time: '',
    end_time: ''
})

const activeTab = ref(1)
const tabLists = [
    {
        name: 'AI对话',
        type: 1
    },
    {
        name: 'AI绘画',
        type: 2
    }
]

const { pager, getLists, resetPage, resetParams } = usePaging({
    fetchFun: getKeyPoolLists,
    params: queryParams
})

const changeTabs = (type: number) => {
    queryParams.type = type
    getLists()
    getAiModel()
}

const getAiModel = async () => {
    try {
        const data = await getKeyPoolAiModel({
            type: queryParams.type
        })
        modelList.value = data
    } catch (error) {
        console.log('获取ai模型失败=>', error)
    }
}

//修改状态
const changeStatus = (id: any) => {
    statusKeyPool({ id })
    feedback.msgSuccess('操作成功')
}

// 处理查询余额
const handleQueryBalance = (id: number) => {
    balanceRef.value.open(id)
}

// 编辑
const handleEdit = (mode: string, value: any) => {
    // queryParams.type | 当前类型 1对话 2绘画，mode: add|edit
    editRef.value?.open(queryParams.type, mode, value)
}

//  删除
const handleDelete = async (id: number) => {
    await feedback.confirm('确定要删除？')
    await delKeyPool({ id })
    feedback.msgSuccess('操作成功')
    getLists()
}

getLists()
getAiModel()
</script>
