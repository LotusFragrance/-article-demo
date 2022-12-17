import request from '@/utils/request'
export function inRegister (data) {
  return request({
    method: 'POST',
    url: '/api/reg',
    data
  })
}
