import request from '@/utils/request'
export function loginApi (data) {
  return request({
    method: 'POST',
    url: '/api/login',
    data
  })
}
