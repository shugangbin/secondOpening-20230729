import request from '@/utils/request'

//绘画记录列表
export function drawRecordsLists(params?: any) {
  return request.get({ url: '/draw.draw_records/lists', params })
}

//删除绘画记录
export function drawRecordsDel(params?: any) {
  return request.post({ url: '/draw.draw_records/delete', params })
}
