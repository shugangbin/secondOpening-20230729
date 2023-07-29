<template>
    <div>
        <el-card class="!border-none" shadow="never">
            <el-alert
                class="text-xxl"
                type="warning"
                :closable="false"
                show-icon
                title="温馨提示：gpt3.5最大支持3500tokens；gpt4.0最大支持8192tokens"
            >
            </el-alert>
        </el-card>
        <el-card shadow="never" class="!border-none mt-4">
            <el-tabs v-model="activeTab">
                <el-tab-pane
                    v-for="(item, index) in tabLists"
                    :label="`${item.name}`"
                    :name="item.label"
                    :key="index"
                >
                </el-tab-pane>
            </el-tabs>
            <div v-if="activeTab == 'session'">
                <sessionView ref="sessionRef" :pop-ref="popRef"></sessionView>
            </div>
            <div v-if="activeTab == 'draw'">
                <drawView ref="drawRef" :pop-ref="popRef"></drawView>
            </div>
        </el-card>
        <footer-btns>
            <el-button type="primary" @click="submit">保存</el-button>
        </footer-btns>
        <balancePop ref="popRef"></balancePop>
    </div>
</template>
<script setup lang="ts">
import sessionView from './components/session.vue'
import drawView from './components/draw.vue'
import balancePop from './components/balancePop.vue'

//弹框ref
const popRef = shallowRef()
//对话ref
const sessionRef = shallowRef()
//绘画ref
const drawRef = shallowRef()

const activeTab = ref('session')
const tabLists = [
    {
        name: 'AI对话配置',
        label: 'session'
    },
    {
        name: 'AI绘画配置',
        label: 'draw'
    }
]

//提交
const submit = () => {
    switch (activeTab.value) {
        case 'session':
            sessionRef.value.submit()
            break
        case 'draw':
            drawRef.value.submit()
            break
        default:
            break
    }
}
</script>
