/**
 * 期权api
 */
import { post, get } from '@/utils/request'
// 期权下单
export const submitOption = (data) => post('/api/optionContract/createOrder', data)
//期权取消订单 /api/optionContract/cancelOrder
export const cancelOtion = (data) => post('/api/optionContract/cancelOrder', data)
//查询当前期数 /api/optionContract/currentIssue
export const getOptionCurrentIssue = (symbol, optionId, period) =>
  post(`/api/optionContract/currentIssue?symbol=${symbol}&optionId=${optionId}&period=${period}`)
//查询周期列表 /api/optionContract/periodList
export const getOptionIssueList = (data) => post(`/api/optionContract/periodList?symbol=${data}`)
//查询用户订单 /api/optionContract/orderList
export const getOrderList = (data) => post('/api/optionContract/orderList', data)
export const getMineOrder = (data) => get('/api/follow/mineOrder', data)
