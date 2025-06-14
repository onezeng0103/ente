import { post, get } from '@/utils/request'

export const getCancelOrderApi = () => get('/api/broker/cancelOrder')

export const getCreateOrderApi = (data) => post('/api/broker/createOrder', data)

export const getOrderListApi = (startDate, endDate) =>
  get(`/api/broker/orderList?startDate=${startDate}&endDate=${endDate}`)
export const getProjectListApi = () => get('/api/broker/projectList')

export const getUserInfoApi = () => get('/api/broker/userInfo')

export const getProductListApi = () => get('/api/broker/productList')

export const getEarnListApi = () => get('/api/broker/earnList')

export const getDayEarnListApi = (startDate, endDate) =>
  get(`/api/broker/dayEarn?startDate=${startDate}&endDate=${endDate}`)

export const getBrokerCoinApi = () => post('/api/common/getBrokerCoin')
export const getCheckPass = (data) => post('/api/broker/checkCode', data)
