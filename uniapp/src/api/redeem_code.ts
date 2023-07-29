import request from '@/utils/request'export type RedeemCodeResponse = {    content: string         // 卡密内容    failure_time: string    // 失效时间    id: string | number     // 卡密ID    sn: string | number     // 卡密编号    type: string            // 卡密类型    type_desc: string       // 卡密类型说明}/** * @description 卡密查询 * @return { RedeemCodeResponse } * @param data */export function checkRedeemCode(data: {    sn: number | string}): Promise<RedeemCodeResponse> {    return request.get({ url: '/cardCode/checkCard', data: data })}/** * @description 卡密兑换 * @param data */export function useRedeemCode(data: { sn: number | string }) {    return request.post({ url: '/cardCode/useCard', data: data })}