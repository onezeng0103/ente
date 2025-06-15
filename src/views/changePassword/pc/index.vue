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
            <h2>重设密码</h2>
            <p style="margin-bottom: 7px">
              <span>用戶名 {{ userInfo?.user?.loginName }}</span>
            </p>
            <el-form ref="formRef" :model="form" :rules="rules">
              <el-form-item prop="oldPwd">
                <el-input
                  v-model="form.oldPwd"
                  show-password
                  type="password"
                  placeholder="旧密码"
                />
              </el-form-item>
              <el-form-item prop="newPwd">
                <el-input
                  v-model="form.newPwd"
                  show-password
                  type="password"
                  placeholder="新密码"
                />
              </el-form-item>
              <el-form-item prop="NPwd">
                <el-input
                  v-model="form.NPwd"
                  show-password
                  type="password"
                  placeholder="确认密码"
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
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { updateLoginPwd } from '@/api/user'
import { useUserStore } from '@/store/user/index'
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const router = useRouter()
const formRef = useTemplateRef('formRef')
const form = ref({
  oldPwd: '',
  newPwd: '',
  NPwd: ''
})
const validatePassword = (rule, value, callback) => {
  if (value !== form.value.newPwd) {
    callback(new Error('请保持密码一致'))
  } else {
    callback()
  }
}
const validateOldPwd = (rule, value, callback) => {
  if (!/^\d{6}$/.test(value)) {
    callback(new Error('请输入一个六位数的整数'))
  } else {
    callback()
  }
}
const rules = ref({
  oldPwd: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    { validator: validateOldPwd, trigger: 'blur' }
  ],
  newPwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { validator: validateOldPwd, trigger: 'blur' }
  ],
  NPwd: [
    { required: true, message: '请保持密码一致', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' },
    { validator: validateOldPwd, trigger: 'blur' }
  ]
})
const submit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    updateLoginPwd(form.value.oldPwd, form.value.newPwd, userStore?.userInfo?.user?.userId).then(
      (res) => {
        if (res.code == '200') {
          ElNotification({
            title: '修改成功',
            type: 'success'
          })
          router.back()
        } else {
          ElNotification({
            title: res.msg,
            type: 'error'
          })
        }
      }
    )
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
