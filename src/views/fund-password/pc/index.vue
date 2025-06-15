<template>
  <div class="h-50px" style="height: 50px"></div>
  <div class="router-container">
    <div class="outer-layer-container">
      <div class="tradingPassword-box">
        <h6 class="el-icon-back" @click="router.back()"></h6>
        <div class="box-left both-sides">
          <img src="@/assets/image/image154(1).png" alt="" />
        </div>
        <div class="pwd-content" v-if="!notPwd">
          <div class="reset_box">
            <h2>交易密码</h2>
            <p style="margin-bottom: 7px">
              <span>用戶名 {{ userInfo?.user?.loginName }}</span>
            </p>
            <el-form ref="formRef" :model="form" :rules="rules">
              <el-form-item prop="password">
                <el-input
                  v-model="form.password"
                  show-password
                  type="password"
                  placeholder="请输入一个六位数的整数"
                />
              </el-form-item>
              <el-form-item prop="confirmPassword">
                <el-input
                  v-model="form.confirmPassword"
                  show-password
                  type="password"
                  placeholder="请确认密码"
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
        <div class="pwd-content" v-else>
          <div class="reset_box">
            <h2>修改交易密码</h2>
            <p style="margin-bottom: 7px">
              <span>用戶名 {{ userInfo?.user?.loginName }}</span>
            </p>
            <el-form ref="formRef1" :model="form1" :rules="rules1">
              <el-form-item prop="oldPwd">
                <el-input
                  v-model="form1.oldPwd"
                  show-password
                  type="password"
                  placeholder="旧密码"
                />
              </el-form-item>
              <el-form-item prop="newPwd">
                <el-input
                  v-model="form1.newPwd"
                  show-password
                  type="password"
                  placeholder="新密码"
                />
              </el-form-item>
              <el-form-item prop="NPwd">
                <el-input
                  v-model="form1.NPwd"
                  show-password
                  type="password"
                  placeholder="确认密码"
                />
              </el-form-item>
              <el-form-item>
                <button
                  @click="changePwd1"
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
import { setFundPwd, updateFundPwd } from '@/api/user'
import { useUserStore } from '@/store/user/index'
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const notPwd = ref(userInfo.value.detail?.userTardPwd)
const router = useRouter()
const formRef = useTemplateRef('formRef')
const form = ref({
  password: '',
  confirmPassword: ''
})
const validatePassword = (_rule, value, callback) => {
  if (value !== form.value.password) {
    callback(new Error('请保持密码一致'))
  } else {
    callback()
  }
}
const validateOldPwd = (_rule, value, callback) => {
  if (!/^\d{6}$/.test(value)) {
    callback(new Error('请输入一个六位数的整数'))
  } else {
    callback()
  }
}
const rules = ref({
  password: [
    { required: true, message: '请输入一个六位数的整数', trigger: 'blur' },
    { validator: validateOldPwd, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请保持密码一致', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' },
    { validator: validateOldPwd, trigger: 'blur' }
  ]
})
const submit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    setFundPwd(form.value.password).then((res) => {
      if (res.code == '200') {
        ElNotification({
          title: '设置成功',
          type: 'success'
        })
        router.back()
      } else {
        ElNotification({
          title: res.msg,
          type: 'error'
        })
      }
    })
  })
}
const form1 = ref({
  oldPwd: '',
  newPwd: '',
  NPwd: ''
})
const validatePassword1 = (_rule, value, callback) => {
  if (value !== form1.value.newPwd) {
    callback(new Error('请保持密码一致'))
  } else {
    callback()
  }
}

const rules1 = ref({
  oldPwd: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    { validator: validateOldPwd, trigger: 'blur' }
  ],
  newPwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { validator: validateOldPwd, trigger: 'blur' }
  ],
  NPwd: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateOldPwd, trigger: 'blur' },
    { validator: validatePassword1, trigger: 'blur' }
  ]
})
const formRef1 = useTemplateRef('formRef1')
const changePwd1 = () => {
  formRef1.value.validate((valid) => {
    if (!valid) return
    updateFundPwd(form1.value.oldPwd, form1.value.newPwd, 1).then((res) => {
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
    })
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
