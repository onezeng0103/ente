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
    <el-form-item prop="loginName">
      <el-input
        @input="toLowerCaseAll"
        v-model.trim="ruleForm.loginName"
        placeholder="请输入账号"
      />
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
    <div class="code_box" v-if="showVerifyCode">
      <el-form-item prop="code" label="验证码">
        <el-input v-model.trim="ruleForm.code" placeholder="请输入验证码" />
      </el-form-item>
      <img
        @click="refreshCode"
        :src="codeUrl"
        style="
          width: 100px;
          height: 0.533rem;
          margin-left: 30px;
          margin-bottom: 0.133rem;
          cursor: pointer;
        "
      />
    </div>
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
const router = useRouter()
const userStore = useUserStore()
const mainStore = useMainStore()
const ruleFormRef = useTemplateRef('ruleFormRef')
const ruleForm = ref({
  loginName: '',
  loginPassword: '',
  pwd: '',
  activeCode: '',
  code: ''
})
const showVerifyCode = computed(() => {
  return mainStore.getLoginMethodList.accountCode
})
const requireInviteCode = computed(() => {
  return mainStore.getLoginMethodList.inviteCodeRequired ? true : false
})
const validateLoginName = (rule, value, callback) => {
  if (!/^[a-zA-Z0-9]{6,15}$/.test(value)) {
    callback(new Error('请输入6-16位包含数字字母的账号'))
  } else {
    callback()
  }
}
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
const rules = ref({
  loginName: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { validator: validateLoginName, trigger: 'blur' }
  ],
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
const timestamp = ref(+new Date())
const codeUrl = computed(() => {
  return `${mainStore.verificationCodeUrl}?codeType=LOGIN&timestamp=${timestamp.value}`
})
const toLowerCaseAll = () => {
  ruleForm.value.loginName = ruleForm.value.loginName.toLowerCase()
}
// 刷新验证码
const refreshCode = () => {
  timestamp.value = +new Date()
}
const handleSubmit = throttle(async () => {
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      signUp({
        loginName: ruleForm.value.loginName,
        loginPassword: ruleForm.value.loginPassword,
        activeCode: ruleForm.value.activeCode,
        code: ruleForm.value.code,
        signType: 3
      })
        .then((res) => {
          if (res.code == '200') {
            ElNotification({
              title: '注册成功',
              type: 'success',
              duration: 3000
            })
            if (autoLogin.value) {
              setTimeout(() => {
                if (res.code == '200' && res.data.satoken) {
                  ElNotification({
                    title: '登录成功',
                    type: 'success',
                    duration: 3000
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
                    type: 'error',
                    duration: 3000
                  })
                }
              }, 1000)
            } else {
              router.push('/login')
            }
          } else {
            ElNotification({
              title: res.msg,
              type: 'error',
              duration: 3000
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })
}, 3000)
</script>
<style lang="scss" scoped>
@import './index.css';
</style>
