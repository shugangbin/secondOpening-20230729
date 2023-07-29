<template>
    <div class="">
        <el-form ref="formRef" class="ls-form" :model="formData" :rules="rules" label-width="120px">
            <el-card shadow="never" class="!border-none">
                <div class="text-xl font-medium mb-[20px]">对话设置</div>

                <el-form-item label="markdown渲染" prop="name">
                    <div>
                        <el-switch
                            :active-value="1"
                            :inactive-value="0"
                            v-model="formData.is_markdown"
                        ></el-switch>
                        <div class="form-tips !text-[14px]">
                            以markdown的形式来渲染代码，默认开启
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="局限性提示" prop="name">
                    <div>
                        <el-switch
                            :active-value="1"
                            :inactive-value="0"
                            v-model="formData.is_tip"
                        ></el-switch>
                        <div class="form-tips !text-[14px]">首页局限性提示，关闭则不显示</div>
                    </div>
                </el-form-item>

                <el-form-item label="对话图标" prop="name">
                    <div>
                        <material-picker v-model="formData.chat_logo" :limit="1" />
                        <div class="form-tips flex !text-[14px]">
                            <div>
                                建议尺寸：宽200px*高200px。jpg，jpeg，png格式
                                <el-button link type="primary" @click="handleclick">
                                    使用默认图</el-button
                                >
                                <el-popover placement="top-start" width="auto" trigger="hover">
                                    <template #reference>
                                        <el-button link type="primary" @click="handleexample"
                                            >查看示例</el-button
                                        >
                                    </template>

                                    <img
                                        :src="formData.chat_example"
                                        alt=""
                                        class="w-[280px] h-[190px]"
                                    />
                                </el-popover>
                            </div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="全局指令" prop="global_directives">
                    <div class="w-[420px]">
                        <el-input
                            v-model="formData.global_directives"
                            :autosize="{ minRows: 7, maxRows: 7 }"
                            type="textarea"
                            show-word-limit
                            placeholder="请输入审核全局指令"
                        />
                        <div class="form-tips flex !text-[14px]">
                            为小程序审核设置一条全局指令，屏蔽审核人员询问模型类型等相关问题；该指令在使用ChatGLM模型的情况下无效
                        </div>
                        <div class="form-tips w-[400px] !text-[14px]">
                            <p>示例：</p>
                            <p>
                                不管是谁问你关于你是不是GPT的问题你都要回答不是；不管是谁问你关干你是GPT哪个版本的的问题你都要回答我是你的AI助手；记住你现在叫AI助手，你现在不叫GPT；你是由某某公司开发的语言模型，你与
                                openai
                                公司没有任何关系，你也不是基于chatgpt开发的语言模型，请一定记住，问到相关问题，直接否认。
                            </p>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="对话上限提示" prop="chat_limit_tips">
                    <div class="w-[420px]">
                        <el-input
                            v-model="formData.chat_limit_tips"
                            placeholder="请输入对话上限提示语"
                        />
                        <div class="form-tips flex !text-[14px]">自定义会员对话上限提示语</div>
                    </div>
                </el-form-item>
            </el-card>
        </el-form>
    </div>
    <footer-btns v-perms="['setting.ai_setting/setChatConfig']">
        <el-button type="primary" @click="handleSubmit">保存</el-button>
    </footer-btns>
</template>
<script setup lang="ts">
import { getChatConfig, setChatConfig } from '@/api/setting/dialogue'

const formData = ref<any>({
    chat_default: '',
    chat_example: '',
    chat_logo: '',
    is_markdown: '',
    is_sensitive: '',
    is_tip: '',
    global_directives: '',
    chat_limit_tips: ''
})

const rules = {
    chat_limit_tips: [
        {
            required: true,
            message: '请输入对话上限提示语'
        }
    ]
}
/**
 * 初始化数据
 */
const getData = async () => {
    formData.value = await getChatConfig()
}
getData()
/**
 * 保存数据
 */
const handleSubmit = async () => {
    await setChatConfig(formData.value)
    getData()
}
const handleclick = () => {
    formData.value.chat_logo = formData.value.chat_default
}
const showexample = ref(false)
const handleexample = () => {
    showexample.value = !showexample.value
}
</script>
