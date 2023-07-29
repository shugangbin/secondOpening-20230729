import type { RequestEventStreamOptions } from 'ofetch'

export function getCreationLists(params?: any) {
    return $request.get({ url: '/creation/lists', params })
}

export function getCreationDetail(params: any) {
    return $request.get({ url: '/creation/detail', params })
}

export function creationChat(params: any, config: RequestEventStreamOptions) {
    return $request.eventStream(
        { url: '/chat/creationChat', params, method: 'POST' },
        config
    )
}
