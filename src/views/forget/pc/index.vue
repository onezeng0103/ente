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
            <h2>忘记密码</h2>
            <p style="margin-bottom: 7px">
              <span>邮箱</span>
            </p>
            <el-form ref="formRef" :model="form" :rules="rules">
              <el-form-item prop="email">
                <div style="display: flex; justify-content: space-between; width: 100%">
                  <el-input style="width: 100%" v-model="form.email" placeholder="请输入邮箱" />
                  <button
                    v-if="flag"
                    style="margin-left: 20px; width: 40%"
                    type="button"
                    class="el-button"
                  >
                    <van-count-down :time="time" format="ss" @finish="flag = false" />
                  </button>
                  <button
                    v-else
                    @click="send"
                    style="margin-left: 20px; width: 40%"
                    type="button"
                    class="el-button"
                  >
                    <span>发送</span>
                  </button>
                </div>
              </el-form-item>
              <el-form-item prop="code">
                <el-input v-model="form.code" placeholder="请输入验证码" />
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
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { emailCode } from '@/api/user'
const router = useRouter()
const formRef = useTemplateRef('formRef')
const form = ref({
  email: '',
  code: ''
})
const flag = ref(false)
const time = ref(0)
const rules = ref({
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})
const send = () => {
  if (!form.value.email) {
    ElNotification({
      title: '请输入邮箱',
      type: 'error'
    })
    return
  }
  emailCode('FIND_PASSWORD', form.value.email).then((res) => {
    if (res.code === 500) {
      ElNotification({
        title: res.msg,
        type: 'error'
      })
    } else {
      ElNotification({
        title: res.msg,
        type: 'success'
      })
      time.value = 300 * 1000
      flag.value = true
    }
  })
}
const submit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    router.push('/setpwd?email=' + email.value + '&code=' + code.value)
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
</style>
