// 封装所有登录相关的接口
import request from '@/utils/request'

// 获取验证码的接口
export const getValiCodeAPI = (randomNumber) => {
  return request({
    url: '/user-service/user/imageCode/' + randomNumber,
    responseType: 'blob'
  })
}

// 登录的接口
export const loginAPI = (data) => {
  return request({
    url: '/user-service/user/login',
    method: 'POST',
    data
  })
}
