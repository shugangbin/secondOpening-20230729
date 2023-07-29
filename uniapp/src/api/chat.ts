import request, { RequestEventStreamConfig } from '@/utils/request'

export function getSkillLists(data: any) {
    return request.get({ url: '/skill/lists', data })
}

export function getCreationLists(data: any) {
    return request.get({ url: '/creation/lists', data })
}

export function getSamplesLists() {
    return request.get({ url: '/question/samplesLists' })
}

export function questionChat(data: any) {
    return request.post({ url: '/chat_records/chat', data }, { isAuth: true })
}

// 对话记录
export function getChatRecord(data: any) {
    return request.get({
        url: '/chat_records/chatLog',
        data
    })
}

//清空会话
export function cleanChatRecord(data: any) {
    return request.post(
        {
            url: '/chat_records/cleanChat',
            data
        },
        { isAuth: true }
    )
}

export function collectChatRecord(data: any) {
    return request.post(
        { url: '/chat_records/collect', data },
        { isAuth: true }
    )
}

export function cancelCollectChatRecord(data: any) {
    return request.post(
        { url: '/chat_records/cancelCollect', data },
        { isAuth: true }
    )
}

export function getCollectChatRecordLists(data: any) {
    return request.get({ url: '/chat_records/collectLists', data })
}

export function getCreationDetail(data: any) {
    return request.get({ url: '/creation/detail', data })
}

export function getSkillDetail(data: any) {
    return request.get({ url: '/skill/detail', data })
}

export function chatSendText(data: any, config: RequestEventStreamConfig) {
    return request.eventStream(
        { url: '/chat/chat', data, method: 'POST' },
        config
    )
}

export function getChatCategoryLists(data: any) {
    return request.get({ url: '/chatCategory/lists', data })
}

export function chatCategoryAdd(data: any) {
    return request.post({ url: '/chatCategory/add', data }, { isAuth: true })
}

export function chatCategoryEdit(data: any) {
    return request.post({ url: '/chatCategory/edit', data }, { isAuth: true })
}

export function chatCategoryDelete(data: any) {
    return request.post({ url: '/chatCategory/del', data }, { isAuth: true })
}

export function chatCategoryClear() {
    return request.post({ url: '/chatCategory/clear' }, { isAuth: true })
}

export function creationChat(data: any, config: RequestEventStreamConfig) {
    return request.eventStream(
        { url: '/chat/creationChat', data, method: 'POST' },
        config
    )
}

//获取聊天模型接口
export function getChatModelApi() {
    return request.get({ url: '/chat/getModel' })
}