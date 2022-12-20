import request from '@/utils/request'
// 获取用户基本资料
export function getUserinfo () {
  return request({
    url: '/my/userinfo'
  })
}

// 更新用户资本资料
export function updataUserinfo (data) {
  return request({
    method: 'PUT',
    url: '/my/userinfo',
    data
  })
}

// 修改用户密码
export function updataUserPsd (data) {
  return request({
    method: 'PATCH',
    url: '/my/updatepwd',
    data
  })
}

// 更新用户图像
export function updataUserAvatar (data) {
  return request({
    method: 'PATCH',
    url: '/my/update/avatar',
    data
  })
}
