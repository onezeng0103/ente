<script setup>
import { useRoute, useRouter } from 'vue-router'
import { backPwdToEmail } from '@/api/user'
import { ElNotification } from 'element-plus'
import navigation from '@/component/h5/navigation/index.vue'

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

<template>
  <navigation title="重置密码"></navigation>

  <div class="email" style="display: block; height: calc(100vh - 50px)">
    <div style="padding: 20px 10px">
      <div style="display: flex; justify-content: center; margin-bottom: 20px">
        <img src="@/assets/image/changePasswordH5.png" alt="" />
      </div>
      <div>
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          :hide-required-asterisk="true"
          label-width="auto"
          size="large"
          label-position="top"
        >
          <el-form-item label="登录密码" prop="password">
            <template #label>
              <div style="width: 100% !important; text-align: left; font-size: 14px; color: #000">
                登录密码
              </div>
            </template>
            <el-input
              style="width: 100%"
              v-model="form.password"
              placeholder="请输入登录密码"
              type="password"
              show-password
            />
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <template #label>
              <div style="width: 100% !important; text-align: left; font-size: 14px; color: #000">
                确认密码
              </div>
            </template>
            <el-input
              style="width: 100%"
              v-model="form.password2"
              placeholder="请输入确认密码"
              type="password"
              show-password
            />
          </el-form-item>

          <el-form-item>
            <div
              @click="submit"
              style="
                color: #fff;
                width: 100%;
                height: 1.093rem;
                border-radius: 0.667rem;
                font-size: 0.48rem;
                font-weight: 400;
                background: #000;
                border: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 30px;
              "
            >
              确定
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './index.css';

:deep(.el-form-item) {
  display: flex;
  flex-direction: column;
  margin-bottom: 22px !important;
}

:deep(.el-form-item__label) {
  color: #fff;
  line-height: 0.48rem;
  white-space: nowrap;
  vertical-align: middle;
  float: left;
  font-size: 0.187rem;
  padding: 0 0.16rem 0 0;
  box-sizing: border-box;
}

:deep(.el-input__inner) {
}

:deep(.el-input__wrapper) {
  //height: 0.64rem;
  //background: #292929;
  border-radius: 0.107rem;
  box-shadow: 0 0 0 1px #dbdbdb;
}

:deep(.el-select__wrapper, .is-focus) {
  //height: 0.64rem;
  background-color: transparent;
  border-radius: 0.107rem;
  box-shadow: 0 0 0 1px #dbdbdb;
}

:deep(.el-select__wrapper) {
  //height: 0.64rem;
  background-color: transparent;
  border-radius: 0.107rem;
  color: #fff;
  box-shadow: 0 0 0 1px #dbdbdb;
}

:deep(.el-select__wrapper.is-hovering:not(.is-focused)) {
  box-shadow: 0 0 0 1px #dbdbdb;
}
</style>
