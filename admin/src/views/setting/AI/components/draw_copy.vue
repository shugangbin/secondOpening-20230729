<template>
    <div>
        <el-form label-width="120px" ref="formRef" :rules="rules" :model="selectData">
            <el-form-item label="绘画功能">
                <div>
                    <el-switch
                        v-model="formData.is_open"
                        :active-value="1"
                        :inactive-value="0"
                    ></el-switch>
                    <div class="form-tips !text-[14px]">
                        默认关闭；绘画功能关闭后，有关绘画的入口将不显示
                    </div>
                </div>
            </el-form-item>

            <el-form-item label="AI接口" class="is-required">
                <div>
                    <el-radio-group v-model="interfaceKey" @change="interChange">
                        <el-radio
                            v-for="(item, index) in formData.config_lists"
                            :key="index"
                            :label="item.type"
                            :disabled="!item.is_open"
                            >{{ item.name }}</el-radio
                        >
                    </el-radio-group>
                    <div class="flex items-center">
                        <span class="form-tips !text-[14px]"
                            >如果您已开通知数云接口，可直接填写；如果未开通</span
                        >
                        <a
                            href="https://auth.zhishuyun.com/auth/login?inviter_id=c7ff8573-940e-4dd0-828c-91adeda5f5dd&redirect=https://data.zhishuyun.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <el-button type="primary" link class="ml-2"> 前往开通 </el-button>
                        </a>
                        <el-popover placement="top-start" width="auto" trigger="hover">
                            <template #reference>
                                <el-button type="primary" link class="ml-2 mt-[4px]">扫码开通</el-button>
                            </template>
                            <el-image :src="zhishiyun_code" class="w-[150px] h-[150px]"></el-image>
                        </el-popover>
                    </div>
                </div>
            </el-form-item>
            <!-- <el-form-item label="apiKey" prop="api_key">
                <div>
                    <div>
                        <div
                            class="flex mb-1"
                            v-for="(item, index) in formData.api_key"
                            :key="index"
                        >
                            <el-input
                                placeholder="请输入API接口密钥"
                                class="w-[400px]"
                                v-model="formData.api_key[index]"
                            ></el-input>
                            <el-button
                                v-perms="['setting.aiSetting/queryBalance']"
                                class="ml-2"
                                type="primary"
                                @click="checkBalance(formData.api_key[index])"
                                >查询余额</el-button
                            >
                            <el-button
                                type="primary"
                                class="ml-2"
                                v-if="index == 0"
                                @click="addApiKey"
                                plain
                                >添加key</el-button
                            >
                            <el-button
                                type="danger"
                                class="ml-2"
                                v-else
                                @click="delApiKey(index)"
                                plain
                                >删除key</el-button
                            >
                        </div>
                    </div>
                    <div class="form-tips">需自备GPT账号，请根据您当地的法规酌情使用</div>
                </div>
            </el-form-item> -->
            <el-form-item label="密钥" prop="token">
                <el-input
                    v-model="selectData.token"
                    class="w-[400px]"
                    placeholder="请输入"
                ></el-input>
            </el-form-item>
            <el-form-item label="绘画翻译" required>
                <div>
                    <el-switch
                        v-model="selectData.auto_translate"
                        :active-value="1"
                        :inactive-value="0"
                    ></el-switch>
                    <div class="form-tips !text-[14px]">
                        开启自动翻译MJ关键词为英文，让绘图更精准。
                    </div>
                </div>
            </el-form-item>
            <template v-if="selectData.auto_translate">
                <el-form-item label="翻译形式" prop="token">
                    <el-radio-group v-model="selectData.translate_type">
                        <el-radio :label="1">系统自动翻译</el-radio>
                        <el-radio :label="2">用户手动翻译</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="模型" prop="name">
                    <div>
                        <el-select class="w-[400px]" v-model="formData.translate_config.model">
                            <el-option
                                v-for="item in formData.translate_model_lists"
                                :value="item"
                                :label="item"
                                :key="item"
                            ></el-option>
                        </el-select>
                        <div class="form-tips">
                            选择翻译接口后，需前往【AI对话配置】设置相应的对话模型参数
                        </div>
                    </div>
                </el-form-item>

                <el-form-item label="翻译指令" prop="translate_config.model">
                    <div class="w-[420px]">
                        <el-input
                            v-model="formData.translate_config.prompt"
                            :autosize="{ minRows: 7, maxRows: 7 }"
                            type="textarea"
                            show-word-limit
                            placeholder="请输入翻译指令"
                        />
                        <div class="form-tips flex !text-[14px]">
                            {prompt}是内置变量，表示用户输入的描述词
                        </div>
                        <div class="form-tips w-[400px] !text-[14px]">
                            <p>示例：我会用任何语言和你交流，你只需将我的话翻译为英语，不要解释我的话或者回复其他信息，请立刻将我的话翻译返回，我的话是:{prompt}</p>
                        </div>
                    </div>
                </el-form-item>
            </template>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import zhishiyun_code from '@/assets/images/zhishuyun_code.png'
import { getDrawConfig, setDrawConfig } from '@/api/setting/AI'
const props = defineProps({
    popRef: {
        type: Object,
        default: {} as any
    }
})

//表单ref
const formRef = shallowRef()

//AI接口列表

//表单数据
const formData = ref({
    is_open: '', //是/否开启
    config_lists: [] as any[],
    translate_config: {
        model: '',
        prompt: ''
    },
    translate_model_lists: []
})

const selectData: any = ref({})

const interChange = (value: any) => {
    selectData.value = formData.value.config_lists[value]
    selectData.value.status = 1
}
const interfaceKey = ref('')
//表单校验规则
const rules = {
    token: [
        {
            required: true,
            message: '请输入token',
            trigger: ['blur']
        }
    ]
}

//获取数据
const getData = async () => {
    formData.value = await getDrawConfig()
    selectData.value = Object.values(formData.value?.config_lists).find((item) => item.status) || {}
    interfaceKey.value = selectData.value.type
}

// //添加密钥
// const addApiKey = () => {
//     formData.value.api_key.push('')
// }
// //删除密钥
// const delApiKey = (index: any) => {
//     formData.value.api_key.splice(index, 1)
// }

// //查询余额
// const checkBalance = (key: any) => {
//     console.log(props.popRef!.open(key))
// }

const submit = async () => {
    await formRef.value.validate()
    await setDrawConfig({
        draw_config: { ...selectData.value, is_open: formData.value.is_open },
        translate_config: formData.value.translate_config
    })
    getData()
}

onMounted(() => {
    getData()
})

defineExpose({ submit })
</script>

<style scoped lang="scss"></style>
