import { get } from '@/utils/request'

export const getNewList = (params) => get('/api/article/list?cateId=' + params)
export const getNewDetail = (params) => get(`/api/article/detail/` + params)
