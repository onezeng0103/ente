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
    <el-form-item prop="loginPassword">
      <template #label>
        <div class="flex justify-between">
          <span>登入密码</span>
          <span class="cursor-pointer relative z-10" @click="forget">忘记密码?</span>
        </div>
      </template>
      <el-input
        type="password"
        show-password
        v-model.trim="ruleForm.loginPassword"
        placeholder="请输入密码"
      />
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
      登入表示同意
      <span>服务条款</span>
      ,
      <span>隐私策略</span>
      ,
      <span>反洗钱协议</span>
    </div>
    <div class="el-form-item el-form-item--feedback el-form-item--medium" @click="handleSubmit">
      <div class="el-form-item__content" style="margin-left: 100px">
        <button type="button" class="el-button ai-version-but el-button--primary el-button--medium">
          <span>登入</span>
        </button>
      </div>
    </div>
    <h6 class="register">
      没有账号?
      <span @click="register">注册</span>
    </h6>
  </el-form>
  <div class="cut-c">
    <div class="el-divider el-divider--horizontal">
      <div class="el-divider__text is-center">或</div>
    </div>
    <button class="wallet-login mt-2 van-button van-button--default van-button--normal">
      <div class="van-button__content">
        <span class="van-button__text">
          <span>钱包登入</span>
        </span>
      </div>
    </button>
  </div>
  <p class="text-sever"></p>
</template>
<script setup>
import { throttle } from 'lodash'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { signIn } from '@/api/user'
import { useMainStore } from '@/store/index'
import { useUserStore } from '@/store/user/index'
const router = useRouter()
const userStore = useUserStore()
const mainStore = useMainStore()
const ruleFormRef = useTemplateRef('ruleFormRef')
const ruleForm = ref({
  loginName: '',
  loginPassword: '',
  code: ''
})
const showVerifyCode = computed(() => {
  return mainStore.getLoginMethodList.accountCode
})
const rules = ref({
  loginName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  loginPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: showVerifyCode.value, message: '请输入验证码', trigger: 'blur' }]
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
      signIn({
        loginName: ruleForm.value.loginName,
        code: ruleForm.value.code,
        loginPassword: ruleForm.value.loginPassword,
        signType: 3
      }).then((res) => {
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
      })
    }
  })
}, 3000)
const register = () => {
  router.push('/register')
}
const forget = () => {
  router.push('/forget')
}
</script>
<style lang="scss" scoped>
@import './index.css';
</style>
