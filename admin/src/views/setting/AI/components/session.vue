<template>
    <div class="pt-[10px]">
        <el-form label-width="120px" ref="formRef" :rules="rules" :model="formData">
            <el-form-item label="AI接口" class="is-required">
                <div>
                    <el-radio-group v-model="interfaceKey" @change="interChange">
                        <el-radio
                            v-for="(item, index) in interfaceList"
                            :key="index"
                            :label="item.key"
                            :disabled="!item.is_open"
                            >{{ item.name }}</el-radio
                        >
                    </el-radio-group>
                    <div v-if="formData.key == 'chatGLM-6B' || formData.key == 'chatGLM-130B'">
                        <span class="form-tips !text-[14px]"
                            >开通网址：https://open.bigmodel.cn/</span
                        >
                        <a
                            href="https://open.bigmodel.cn/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <el-button type="primary" link class="ml-2">前往开通</el-button>
                        </a>
                    </div>
                    <div v-if="formData.key == 'api2d3.5' || formData.key == 'api2d4.0'">
                        <span class="form-tips !text-[14px]"
                            >如果您已开通，可直接填写；如果未开通，点击</span
                        >
                        <a
                            href="https://api2d.com/r/207827"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <el-button type="primary" link class="ml-2">前往开通</el-button>
                        </a>
                    </div>
                </div>
            </el-form-item>
<!--            <el-form-item label="apiKey" prop="api_key">-->
<!--                <div>-->
<!--                    <div>-->
<!--                        <div-->
<!--                            class="flex mb-1"-->
<!--                            v-for="(item, index) in formData.api_key"-->
<!--                            :key="index"-->
<!--                        >-->
<!--                            <el-input-->
<!--                                placeholder="请输入API接口密钥"-->
<!--                                class="w-[400px]"-->
<!--                                v-model="formData.api_key[index]"-->
<!--                            ></el-input>-->
<!--                            <el-button-->
<!--                                v-perms="['setting.aiSetting/queryBalance']"-->
<!--                                v-if="formData.key == 'gpt3.5' || formData.key == 'gpt4.0'"-->
<!--                                class="ml-2"-->
<!--                                type="primary"-->
<!--                                @click="checkBalance(formData.api_key[index])"-->
<!--                                >查询余额</el-button-->
<!--                            >-->
<!--                            <el-button-->
<!--                                type="primary"-->
<!--                                class="ml-2"-->
<!--                                v-if="index == 0"-->
<!--                                @click="addApiKey"-->
<!--                                plain-->
<!--                                >添加key</el-button-->
<!--                            >-->
<!--                            <el-button-->
<!--                                type="danger"-->
<!--                                class="ml-2"-->
<!--                                v-else-->
<!--                                @click="delApiKey(index)"-->
<!--                                plain-->
<!--                                >删除key</el-button-->
<!--                            >-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="form-tips !text-[14px]">请根据您当地的法规酌情使用</div>-->
<!--                </div>-->
<!--            </el-form-item>-->
            <el-form-item label="模型" prop="name">
                <div>
                    <el-select class="w-[400px]" v-model="formData.model">
                        <el-option
                            v-for="item in formData.model_list"
                            :value="item"
                            :label="item"
                            :key="item"
                        ></el-option>
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item label="参数设置" class="is-required">
                <div class="flex flex-wrap max-w-[500px]">
                    <div class="w-[190px] mr-[20px] mb-[20px]" v-if="formData.context_num !== ''">
                        <div class="flex items-center text-tx-regular text-xs">
                            <span class="mr-[4px] mt-[2px]">上下文总数</span>
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                content="生成文本的最大长度，取值范围为1~5之间的整数"
                                placement="top"
                            >
                                <el-icon size="16px"><QuestionFilled /></el-icon>
                            </el-tooltip>
                        </div>

                        <el-slider v-model="formData.context_num" :min="1" :max="5" />
                    </div>
                    <div class="w-[190px] mr-[20px] mb-[20px]" v-if="formData.n !== ''">
                        <div class="flex items-center text-tx-regular text-xs">
                            <span class="mr-[4px] mt-[2px]">最大回复</span>
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                content="为每个输入消息生成多少个聊天完成选项，取值范围为1~5之间的整数。"
                                placement="top"
                            >
                                <el-icon size="16px"><QuestionFilled /></el-icon>
                            </el-tooltip>
                        </div>

                        <el-slider v-model="formData.n" :min="1" :max="5" />
                    </div>
                    <div class="w-[190px] mr-[20px] mb-[20px]" v-if="formData.temperature !== ''">
                        <div class="flex items-center text-tx-regular text-xs">
                            <span class="mr-[4px] mt-[2px]">词汇属性</span>
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                content="用于控制生成文本的随机性，取值范围为0~1之间的浮点数，建议取值0.7左右。"
                                placement="top"
                            >
                                <el-icon size="16px"><QuestionFilled /></el-icon>
                            </el-tooltip>
                        </div>

                        <el-slider v-model="formData.temperature" :min="0" :max="1" :step="0.1" />
                    </div>

                    <div class="w-[190px] mr-[20px] mb-[20px]" v-if="formData.top_p !== ''">
                        <div class="flex items-center text-tx-regular text-xs">
                            <span class="mr-[4px] mt-[2px]">随机属性</span>
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                content="用于控制生成文本的多样性，取值范围为0~1之间的浮点数，建议取值0.9左右。"
                                placement="top"
                            >
                                <el-icon size="16px"><QuestionFilled /></el-icon>
                            </el-tooltip>
                        </div>
                        <el-slider v-model="formData.top_p" :min="0" :max="1" :step="0.1" />
                    </div>
                    <div
                        class="w-[190px] mr-[20px] mb-[20px]"
                        v-if="formData.presence_penalty !== ''"
                    >
                        <div class="flex items-center text-tx-regular text-xs">
                            <span class="mr-[4px] mt-[2px]">话题属性</span>
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                content="用于控制生成文本中是否出现给定的关键词，取值范围为0~1之间的浮点数，建议取值0.5左右。"
                                placement="top"
                            >
                                <el-icon size="16px"><QuestionFilled /></el-icon>
                            </el-tooltip>
                        </div>

                        <el-slider
                            v-model="formData.presence_penalty"
                            :step="0.1"
                            :min="0"
                            :max="1"
                        />
                    </div>
                    <div
                        class="w-[190px] mr-[20px] mb-[20px]"
                        v-if="formData.frequency_penalty !== ''"
                    >
                        <div class="flex items-center text-tx-regular text-xs">
                            <span class="mr-[4px] mt-[2px]">重复属性</span>
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                content="用于控制生成文本中重复的程度，取值范围为0~1之间的浮点数，建议取值0.5左右"
                                placement="top"
                            >
                                <el-icon size="16px"><QuestionFilled /></el-icon>
                            </el-tooltip>
                        </div>
                        <el-slider
                            v-model="formData.frequency_penalty"
                            :step="0.1"
                            :min="0"
                            :max="1"
                        />
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="自定义API域名" prop="agency_api" v-if="formData.key !== 'chatGLM'">
                <div>
                    <div class="flex">
                        <el-input
                            placeholder="请输入自定义API域名"
                            class="w-[400px]"
                            v-model="formData.agency_api"
                        ></el-input>
                    </div>

                    <div class="form-tips !text-[14px]">
                        反向代理API域名，不填写默认为：{{
                            formData.key == 'api2d3.5' || formData.key == 'api2d4.0'
                                ? 'https://openai.api2d.net'
                                : `https://api.openai.com`
                        }}
                    </div>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { getConfig, setConfig, getAiSetting } from '@/api/setting/AI'

const props = defineProps({
    popRef: {
        type: Object,
        default: {} as any
    }
})

//表单ref
const formRef = shallowRef()

const interfaceKey = ref('')

const allData = ref()

//表单数据
const formData: any = ref({
    // key: '',
    // api_key: [''],
    // api_type: 'open_ai',
    // is_sensitive: 0,
    // // max_tokens: 150,
    // model: 'text-davinci-003',
    // new_user_give: '',
    // agency_api: '',
    // global_directives: '',
    // model_list: [],
    // n: 0,
    // temperature: '',
    // context_num: '',
    // top_p: '',
    // presence_penalty: '',
    // frequency_penalty: '',
    // status: ''
})
//AI接口列表
const interfaceList = ref<any[]>([])

//表单校验规则
const rules = {
    api_key: [
        {
            required: true,
            message: '请输入秘钥',
            trigger: ['blur']
        }
    ],
    api_type: [
        {
            required: true,
            message: '请选择',
            trigger: ['blur']
        }
    ]
}

//接口切换
const interChange = (value: any) => {
    formData.value = allData.value[value]
    formData.value.status = 1
    if (formData.value.api_key.length == 0) {
        formData.value.api_key = ['']
    }
}

//添加密钥
const addApiKey = () => {
    formData.value.api_key.push('')
}
//删除密钥
const delApiKey = (index: any) => {
    formData.value.api_key.splice(index, 1)
}

//查询余额
const checkBalance = (key: any) => {
    console.log(props.popRef!.open(key))
}

/**
 * 获取初始化数据
 */
const getData = async () => {
    const { ai_config_lists } = await getAiSetting()
    interfaceList.value = ai_config_lists
    allData.value = ai_config_lists
    Object.keys(ai_config_lists).map((item) => {
        if (ai_config_lists[item].status == 1) {
            interfaceKey.value = item
            formData.value = ai_config_lists[item]
            if (formData.value.api_key.length == 0) {
                formData.value.api_key = ['']
            }
        }
    })
}

const submit = async () => {
    await formRef.value.validate()
    setConfig(formData.value)
    console.log('保存对话')
}

getData()

defineExpose({ submit })
</script>

<style scoped lang="scss"></style>
