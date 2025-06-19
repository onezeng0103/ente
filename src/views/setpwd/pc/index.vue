<template>
  <div class="h-50px" style="height: 50px"></div>
  <div class="router-container">
    <div class="outer-layer-container">
      <div class="tradingPassword-box">
        <h6 class="el-icon-back" @click="router.back()"></h6>
        <div class="box-left both-sides">
          <img src="@/assets/image/image154(1).png" alt="" />
        </div>
        <div class="pwd-content">
          <div class="reset_box">
            <h2>重置密码</h2>
            <el-form ref="formRef" :model="form" :rules="rules">
              <el-form-item prop="password">
                <el-input
                  v-model="form.password"
                  placeholder="请输入登录密码"
                  type="password"
                  show-password
                />
              </el-form-item>
              <el-form-item prop="password2">
                <el-input
                  v-model="form.password2"
                  placeholder="确认密码"
                  type="password"
                  show-password
                />
              </el-form-item>
              <el-form-item>
                <button
                  @click="submit"
                  type="button"
                  class="el-button ai-version-but el-button--primary el-button--medium"
                >
                  <span>确认</span>
                </button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="box-right both-sides">
          <img src="@/assets/image/Rectangle504677(1).png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { backPwdToEmail } from '@/api/user'
import { ElNotification } from 'element-plus'
const route = useRoute()
const router = useRouter()
const formRef = useTemplateRef('formRef')
const form = ref({
  password: '',
  password2: ''
})
const validatePassword = (rule, value, callback) => {
  if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/.test(value)) {
    callback(new Error('请输入6-16位包含数字字母特殊符号的密码'))
  } else {
    callback()
  }
}
const validatePassword2 = (rule, value, callback) => {
  if (value !== form.value.password) {
    callback(new Error('两次密码不一致'))
  } else {
    callback()
  }
}
const rules = ref({
  password: [
    { required: true, message: '请输入登录密码', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' }
  ],
  password2: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' },
    { validator: validatePassword2, trigger: 'blur' }
  ]
})

const submit = async () => {
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      backPwdToEmail(route.query.email, form.value.password, route.query.code).then((res) => {
        if (res.code == '200') {
          ElNotification({
            title: res.msg,
            type: 'success'
          })
          setTimeout(() => {
            router.replace('/login')
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
}
</script>
<style lang="scss" scoped>
@import './index.css';
:deep(.el-form-item) {
  margin-bottom: 30px !important;
}
:deep(.el-input__inner) {
  color: #fff;
}
:deep(.el-input__wrapper) {
  height: 0.64rem;
  background: #292929;
  border-radius: 0.107rem;
  box-shadow: 0 0 0 1px #dbdbdb;
  color: #fff;
}
:deep(.el-select__wrapper) {
  height: 0.64rem;
  background: #292929;
  border-radius: 0.107rem;
  box-shadow: 0 0 0 1px #dbdbdb;
}
</style>
