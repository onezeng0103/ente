<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    :hide-required-asterisk="true"
    label-width="auto"
    size="large"
    label-position="top"
  >
    <el-form-item prop="phoneNum">
      <div style="display: flex; align-items: center; width: 100%">
        <el-select
          filterable
          v-model="ruleForm.phoneCode"
          placeholder="请选择国家/地区"
          style="width: 120px"
        >
          <el-option
            v-for="item in areaList"
            :key="item.phoneCode"
            :value="item.phoneCode"
            :label="`+${item.phoneCode} ${current == 'zh' ? item.chineseName : item.englishName}`"
          />
        </el-select>
        <el-input
          v-model.trim="ruleForm.phoneNum"
          placeholder="请输入手机号"
          style="flex: 1; margin-left: 10px"
        />
      </div>
    </el-form-item>
    <el-form-item prop="loginPassword" label="登入密码 (请输入6-16位包含数字字母特殊符号的密码)">
      <el-input
        type="password"
        show-password
        v-model.trim="ruleForm.loginPassword"
        placeholder="请输入密码"
      />
    </el-form-item>
    <el-form-item prop="pwd" label="确认密码">
      <el-input
        type="password"
        show-password
        v-model.trim="ruleForm.pwd"
        placeholder="请再次输入密码"
      />
    </el-form-item>
    <el-form-item prop="activeCode">
      <template #label>邀请码({{ requireInviteCode ? '必填' : '选填' }})</template>
      <el-input v-model.trim="ruleForm.activeCode" placeholder="请输入邀请码" />
    </el-form-item>
    <el-form-item prop="code" label="验证码" v-if="showVerifyCode">
      <div style="width: 100%; display: flex; justify-content: space-between">
        <el-input style="flex: 1" v-model.trim="ruleForm.code" placeholder="请输入验证码" />
        <bottom
          class="el-button ai-version-but el-button--primary el-button--medium"
          style="
            width: auto;
            height: 0.533rem;
            padding: 0 0.267rem;
            border-radius: 0.107rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 30px;
            background-color: #000;
            color: #fff;
            border: none;
            font-size: 0.187rem;
          "
        >
          <span @click="getCode" v-if="!flag">发送验证码</span>
          <span v-else>
            <van-count-down :time="time" format="ss" @finish="finish"></van-count-down>
          </span>
        </bottom>
      </div>
    </el-form-item>
    <div class="agree">
      注册即表示同意
      <span>服务条款</span>
      ,
      <span>隐私策略</span>
      ,
      <span>反洗钱协议</span>
    </div>
    <div class="el-form-item el-form-item--feedback el-form-item--medium" @click="handleSubmit">
      <div class="el-form-item__content" style="margin-left: 100px">
        <button type="button" class="el-button ai-version-but el-button--primary el-button--medium">
          <span>注册</span>
        </button>
      </div>
    </div>
  </el-form>
  <p class="log">
    <span>已有账号？</span>
    <a @click="router.push('/login')">登入</a>
  </p>
  <p class="text-sever"></p>
</template>
<script setup>
import { throttle } from 'lodash'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { signUp } from '@/api/user'
import { useMainStore } from '@/store/index'
import { useUserStore } from '@/store/user/index'
import { getAreaCode } from '@/api/user'
import { storageDict } from '@/config/dict'
const current = ref(localStorage.getItem(storageDict.LANGUAGE))
const router = useRouter()
const userStore = useUserStore()
const mainStore = useMainStore()
const ruleFormRef = useTemplateRef('ruleFormRef')
const ruleForm = ref({
  phoneCode: '86',
  phoneNum: '',
  loginPassword: '',
  pwd: '',
  activeCode: '',
  code: ''
})
const showVerifyCode = computed(() => {
  return mainStore.getLoginMethodList.phoneCode
})
const requireInviteCode = computed(() => {
  return mainStore.getLoginMethodList.inviteCodeRequired ? true : false
})
const validatePassword = (rule, value, callback) => {
  if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/.test(value)) {
    callback(new Error('请输入6-16位包含数字字母特殊符号的密码'))
  } else {
    callback()
  }
}
const validatePwd = (rule, value, callback) => {
  if (value !== ruleForm.value.loginPassword) {
    callback(new Error('两次密码不一致'))
  } else {
    callback()
  }
}
// 区号列表
const areaList = ref([])
// 获取区号
const codeList = () => {
  let arr = []
  getAreaCode().then((res) => {
    if (res.code == '200') {
      res.data.forEach((item) => {
        item.data.forEach((item) => {
          arr.push({
            ...item
          })
        })
      })
      areaList.value = arr
    }
  })
}
const rules = ref({
  phoneNum: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  loginPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' }
  ],
  pwd: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    { validator: validatePwd, trigger: 'blur' }
  ],
  activeCode: [{ required: requireInviteCode.value, message: '请输入邀请码', trigger: 'blur' }],
  code: [{ required: showVerifyCode.value, message: '请输入验证码', trigger: 'blur' }]
})
const autoLogin = computed(() => {
  return mainStore.getLoginMethodList.autoLogin
})
const handleSubmit = throttle(async () => {
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      signUp({
        phoneNum: ruleForm.value.phoneNum,
        phoneNum: ruleForm.value.phoneCode + ruleForm.value.phoneNum,
        loginPassword: ruleForm.value.loginPassword,
        activeCode: ruleForm.value.activeCode,
        code: ruleForm.value.code,
        signType: 2
      }).then((res) => {
        if (res.code == '200') {
          ElNotification({
            title: '注册成功',
            type: 'success'
          })
          if (autoLogin.value) {
            setTimeout(() => {
              if (res.code == '200' && res.data.satoken) {
                ElNotification({
                  title: '登录成功',
                  type: 'success'
                })
                let token = res.data.satoken
                userStore.setIsSign(true)
                userStore.setToken(token)
                setTimeout(() => {
                  router.replace('/')
                  userStore.getUserInfo()
                }, 500)
              } else {
                ElNotification({
                  title: res.msg,
                  type: 'error'
                })
              }
            }, 1000)
          } else {
            router.push('/login')
          }
        } else {
          ElNotification({
            title: res.msg,
            type: 'error'
          })
        }
      })
    }
  })
}, 3000)
onMounted(() => {
  codeList()
})
</script>
<style lang="scss" scoped>
@import './index.css';
:deep(.el-select__wrapper, .is-focus) {
  height: 0.533rem;
  background-color: transparent;
  border-radius: 0.107rem;
  color: #000;
  box-shadow: 0 0 0 1px #000;
}
:deep(.el-select__wrapper) {
  height: 0.533rem;
  background-color: transparent;
  border-radius: 0.107rem;
  color: #000;
  box-shadow: 0 0 0 1px #000;
}
:deep(.el-select__wrapper.is-hovering:not(.is-focused)) {
  box-shadow: 0 0 0 1px #000;
}
</style>
