<script setup>
import { useRouter } from 'vue-router'
import navigation from '@/component/h5/navigation/index.vue'
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

<template>
  <navigation title="修改密码"></navigation>
  <div class="outer-layer-container">
    <div class="mobile_resetPwd_box" style="height: calc(100vh - 50px)">
      <img src="@/assets/image/changePasswordH5.png" alt="" />
      <div class="resetPwd_content">
        <p class="show-username" style="color: #000; font-size: 12px; margin-bottom: 3px">
          <span>用戶名 {{ userInfo?.user?.loginName }}</span>
        </p>
        <el-form ref="formRef" :model="form" :rules="rules">
          <el-form-item prop="oldPwd">
            <el-input v-model="form.oldPwd" show-password type="password" placeholder="旧密码" />
          </el-form-item>
          <el-form-item prop="newPwd">
            <el-input v-model="form.newPwd" show-password type="password" placeholder="新密码" />
          </el-form-item>
          <el-form-item prop="NPwd">
            <el-input v-model="form.NPwd" show-password type="password" placeholder="确认密码" />
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
  </div>
</template>

<style scoped lang="scss">
@import './index.css';

:deep(.el-input__wrapper) {
  font-size: 0.373rem;
  height: 0.96rem;
  width: 100%;
  background-color: transparent;
  border-radius: 0.667rem;
  border: 0.013rem solid #e0e0e0;
  color: #000;
  box-shadow: none;
}

//:deep(.el-input__wrapper :hover) {
//  border-color: transparent;
//}
</style>
