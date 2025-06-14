<script setup>
import { throttle } from 'lodash'
import { useRouter } from 'vue-router'
import { debounce } from 'lodash'
import { signIn, emailCode } from '@/api/user'
import { useMainStore } from '@/store/index'
import { useUserStore } from '@/store/user/index'
import { ElNotification } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const mainStore = useMainStore()
const ruleFormRef = useTemplateRef('ruleFormRef')
const ruleForm = ref({
  email: '',
  loginPassword: '',
  code: ''
})
const showVerifyCode = computed(() => {
  return mainStore.getLoginMethodList.emailCode
})
const rules = ref({
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  loginPassword: [{ required: !showVerifyCode.value, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: showVerifyCode.value, message: '请输入验证码', trigger: 'blur' }]
})
// 倒计时
const time = ref(0)
const flag = ref(false)
const finish = () => {
  flag.value = false
}
const getCode = debounce(() => {
  if (!ruleForm.value.email) {
    ElNotification({
      title: '请输入邮箱',
      type: 'error',
      duration: 3000
    })
    return
  }
  emailCode('LOGIN', ruleForm.value.email).then((res) => {
    if (res.code == '200') {
      ElNotification({
        title: res.msg,
        type: 'success',
        duration: 3000
      })
      flag.value = true
      time.value = 60 * 1000
    } else {
      ElNotification({
        title: res.msg,
        type: 'error',
        duration: 3000
      })
    }
  })
}, 100)
const handleSubmit = throttle(async () => {
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      signIn({
        email: ruleForm.value.email,
        loginPassword: ruleForm.value.loginPassword,
        signType: 1,
        code: ruleForm.value.code
      })
        .then((res) => {
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
        })
        .catch((err) => {
          console.log(err)
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

<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    :hide-required-asterisk="true"
    label-width="auto"
    size="large"
    label-position="top"
    class="demo-ruleForm"
  >
    <el-form-item prop="email">
      <el-input v-model.trim="ruleForm.email" placeholder="请输入邮箱" />
    </el-form-item>
    <div class="code_box" v-if="!showVerifyCode">
      <el-form-item prop="loginPassword">
        <template #label>
          <div class="flex justify-between">
            <span>登入密码</span>
            <!--                <span class="cursor-pointer relative z-10" @click="forget">忘记密码?</span>-->
          </div>
        </template>
        <el-input
          type="password"
          show-password
          v-model.trim="ruleForm.loginPassword"
          placeholder="请输入密码"
        />
      </el-form-item>
    </div>
    <el-form-item prop="code" label="验证码" v-else>
      <div style="width: 100%; display: flex; justify-content: space-between; align-items: center">
        <el-input style="flex: 1" v-model.trim="ruleForm.code" placeholder="请输入验证码" />
        <bottom
          class="el-button ai-version-but el-button--primary el-button--medium"
          style="
            width: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
            background-color: #000;
            color: #fff;
            border: none;
            font-size: 12px;
          "
        >
          <span @click="getCode" v-if="!flag">发送验证码</span>
          <span v-else>
            <van-count-down :time="time" format="ss" @finish="finish"></van-count-down>
          </span>
        </bottom>
      </div>
    </el-form-item>
  </el-form>

  <form class="el-form demo-ruleForm">
    <div class="action_bar">
      <span class="reg"></span>
      <a @click="forget" class="">忘記密碼?</a>
    </div>
    <div class="agree">
      登錄即表示同意
      <span>服務條款</span>
      ,
      <span>隱私政策</span>
      ,
      <span>反洗錢協議</span>
    </div>
    <div class="el-form-item el-form-item--feedback el-form-item--medium">
      <div class="el-form-item__content" style="margin-left: 100px">
        <button
          type="button"
          @click="handleSubmit"
          class="el-button gold-color-btn ai-version-but el-button--primary el-button--medium"
        >
          <span>登錄</span>
        </button>
      </div>
    </div>
  </form>

  <h6 class="register">
    沒有帳戶?&nbsp;
    <span @click="register">註冊</span>
  </h6>
  <div class="cut-c">
    <div class="el-divider el-divider--horizontal">
      <div class="el-divider__text is-center">或</div>
    </div>
    <button class="wallet-login mt-2 van-button van-button--default van-button--normal">
      <div class="van-button__content">
        <span class="van-button__text"><span>錢包登錄</span></span>
      </div>
    </button>
  </div>
</template>

<style scoped lang="scss">
@import './index.css';

:deep(.el-form-item) {
  //flex: 1;
}

:deep(.el-form-item__label) {
  //width: 100% !important;
  //text-align: left;
  //padding-bottom: 0;
  //line-height: 0.48rem;
  //margin-bottom: 0;
  //color: #000;
  width: 100% !important;
  text-align: left;
  font-size: 0.32rem;
  color: #000;
  padding-bottom: 0.133rem;
}

:deep(.el-input__wrapper, .el-input__inner, .el-input__inner:focus, .is-focus) {
  //height: 0.533rem;
  background-color: transparent;
  border-radius: 0.107rem;
  color: #000;
  box-shadow: 0 0 0 1px #000;
}
</style>
