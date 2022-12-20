import request from '@/utils/request'
export function getMenusData () {
  return request({
    url: '/my/menus'
  })
}
