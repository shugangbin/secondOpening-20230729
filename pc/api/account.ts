import { getClient } from '~~/utils/env'

// 登录
export function login(params: any) {
    return $request.post({
        url: '/login/account',
        params: { ...params, terminal: getClient() }
    })
}
// 登录
export function logout() {
    return $request.post({ url: '/login/logout' })
}

//注册
export function register(params: any) {
    return $request.post({
        url: '/login/register',
        params: { ...params, channel: getClient() }
    })
}

//向微信请求code的链接
export function getWxCode(params?: any) {
    return $request.get({
        url: '/login/qrcode',
        params
    })
}

export function checkTicket(params?: any) {
    return $request.post({
        url: '/login/ticket',
        params
    })
}

export function wxLogin(params: any) {
    return $request.post({ url: '/login/scanLogin', params })
}
