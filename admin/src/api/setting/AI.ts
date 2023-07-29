import request from '@/utils/request'

export function getAiSetting(params?: any) {
    return request.get({ url: '/setting.aiSetting/lists', params })
}
// 获取参数
export function getConfig(params?: any) {
    return request.get({ url: '/setting.aiSetting/getconfig', params })
}

// 获取参数
export function setConfig(params: any) {
    return request.post({ url: '/setting.aiSetting/setconfig', params })
}

//查询余额
export function checkBalance(data?: any) {
    return request.post({ url: '/setting.aiSetting/queryBalance', data })
}

//获取绘画配置参数
export function getDrawConfig(params?: any) {
    return request.get({ url: '/setting.aiSetting/getDrawConfig', params })
}

//设置会话配置参数
export function setDrawConfig(data?: any) {
    return request.post({ url: '/setting.aiSetting/setDrawConfig', data })
}

//设置会话配置参数
export function getAiChatConfig(data?: any) {
    return request.get({ url: '/AiConfig/getAiChatConfig', data })
}
