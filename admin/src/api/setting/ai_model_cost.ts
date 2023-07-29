import request from '@/utils/request'

//设置绘画计费模型
export function setDrawBillingConfig(data?: any) {
    return request.post({ url: '/setting.aiSetting/setDrawBillingConfig', data })
}

//获取绘画配置参数
export function getDrawBillingConfig(params?: any) {
    return request.get({ url: '/setting.aiSetting/getDrawBillingConfig', params })
}

// 设置会话配置参数
export function getChatBillingConfig(params?: any) {
    return request.get({ url: '/setting.aiSetting/getChatBillingConfig', params })
}

// 设置会话配置参数
export function setChatBillingConfig(data?: any) {
    return request.post({ url: '/setting.aiSetting/setChatBillingConfig', data })
}
