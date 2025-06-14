import { post } from '@/utils/request'
export const loginRegisterList = () => post('/api/common/getLoginRegisterList')
export const signUp = (parmas) => post('/api/user/register', parmas)
export const signIn = (parmas) => post('/api/user/login', parmas)
export const updateLoginPwd = (oldPwd, newPwd, userId) =>
  post(`/api/user/updateUserLoginPwd?oldPwd=${oldPwd}&newPwd=${newPwd}&userId=${userId}`)
export const addLoginPwd = (pwd) => post(`/api/user/pwdSett?pwd=${pwd}`)
export const backPwdToEmail = (email, newPwd, emailCode) =>
  post(`/api/user/backPwd?email=${email}&newPwd=${newPwd}&emailCode=${emailCode}`)
export const updatePwdByEmail = (email, newPwd, emailCode) =>
  post(`/api/user/updatePwdByEmail?email=${email}&newPwd=${newPwd}&emailCode=${emailCode}`)
export const emailCode = (codeType, email) =>
  post(`/api/user/sendEmailCode?codeType=${codeType}&email=${email}`)
export const emailBind = (email, emailCode) =>
  post(`/api/user/bindEmail?email=${email}&emailCode=${emailCode}`)
export const getAreaCode = () => post('/api/user/getCountryCode')
export const mobileCode = (codeType, mobile) =>
  post(`/api/user/sendMobileCode?codeType=${codeType}&phone=${mobile}`)
export const mobileBind = (phone, code) => post(`/api/user/bindPhone?phone=${phone}&code=${code}`)
export const signOut = (parmas) => post('/api/user/loginOut', parmas)
export const getUserInfo = () => post('/api/user/getInfo')
export const setFundPwd = (pwd) => post(`/api/user/tardPwdSet?pwd=${pwd}`)
export const updateFundPwd = (oldPwd, newPwd, signType) =>
  post(`/api/user/updatePwd?oldPwd=${oldPwd}&newPwd=${newPwd}&signType=${signType}`)
export const uploadKYC = (params) => post(`/api/user/uploadKYC?${params}`)
export const getFreezeList = () => post(`api/withdraw/freezeList`)
export const getProfit = () => post(`api/user/getProfit`)
export const getPayAddress = (data) => post(`api/recharge/payAddress`, data)
