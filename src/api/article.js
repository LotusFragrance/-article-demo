import request from '@/utils/request'
// 获取-文章分类
export function getArtType () {
  return request({
    url: '/my/cate/list'
  })
}

// 增加-文章分类
export function addType (data) {
  return request({
    method: 'POST',
    url: '/my/cate/add',
    data
  })
}

// 删除文章分类
export function deleteType (params) {
  return request({
    method: 'DELETE',
    url: '/my/cate/del',
    params
  })
}

// 更新文章分类
export function updateType (data) {
  return request({
    method: 'PUT',
    url: '/my/cate/info',
    data
  })
}

// 获取-文章列表
export function getArtList (params) {
  return request({
    url: '/my/article/list',
    params
  })
}

// 删除文章
export function deleteArts (params) {
  return request({
    method: 'DELETE',
    url: '/my/article/info',
    params
  })
}

// 发表文章
export function publishArts (data) {
  return request({
    method: 'POST',
    url: '/my/article/add',
    data
  })
}

// 获取文章详情
export function getArtData (params) {
  return request({
    url: '/my/article/info',
    params
  })
}

// 更新文章
export function updataArts (data) {
  return request({
    method: 'PUT',
    url: '/my/article/info',
    data
  })
}
