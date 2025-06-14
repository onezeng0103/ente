import { post, get } from '@/utils/request'
export const getAgentInfo = () => post('/api/agentActivityInfo/getAgentInfo')
export const getAgentList = (params) => post('/api/agentActivityInfo/getAgentList', params)
