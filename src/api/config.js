import request from '@/utils/request'

export function server () {
  return request({
    url: '/config/server',
    method: 'get',
  })
}

export function app () {
  return request({
    url: '/config/app',
    method: 'get',
  })
}

export function admin () {
  return request({
    url: '/config/admin',
    method: 'get',
  })
}

// 新增：更新 admin 配置
export function updateAdmin (data) {
  return request({
    url: '/config/admin',
    method: 'put',
    data,
  })
}
