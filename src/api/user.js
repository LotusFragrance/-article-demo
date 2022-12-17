import request from '@/utils/request'
// 获取用户基本资料
export function getUserinfo () {
  return request({
    url: '/my/userinfo'
  })
}
