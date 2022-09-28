import request from '@/utils/request'

// 根据用户id获取用户基本信息
export const getUserInfoAPI = (id) => {
  return request({
    url: `/user-service/user/${id}`
  })
}
