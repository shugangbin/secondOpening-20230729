import request, { RequestEventStreamConfig } from '@/utils/request'

//发送短信
export function smsSend(data: any) {
    return request.post({ url: '/sms/sendCode', data: data })
}

export function getConfig(data: any) {
    return request.get({ url: '/index/config', data })
}

export function getPolicy(data: any) {
    return request.get({ url: '/index/policy', data: data })
}

export function getMnpQrCode(data: any) {
    return request.post({ url: '/share/getMnpQrCode', data: data })
}

export function uploadImage(file: any, token?: string) {
    return request.uploadFile({
        url: '/upload/image',
        filePath: file,
        name: 'file',
        header: {
            token
        },
        fileType: 'image'
    })
}

export function wxJsConfig(data: any) {
    return request.get({ url: '/wechat/jsConfig', data })
}
