<script setup>
import navigation from '@/component/h5/navigation/index.vue'
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

<template>
  <navigation title="交易密码"></navigation>

  <div class="mobile_resetPwd_box" style="flex: 1">
    <img src="@/assets/image/changePasswordH5.png" alt="" />
    <div class="resetPwd_content">
      <form class="el-form demo-ruleForm">
        <p class="show-username">
          <span>用戶名 {{ userInfo?.user?.loginName }}</span>
        </p>

        <template v-if="!notPwd">
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
        </template>

        <template v-else>
          <el-form ref="formRef1" :model="form1" :rules="rules1">
            <el-form-item prop="oldPwd">
              <el-input v-model="form1.oldPwd" show-password type="password" placeholder="旧密码" />
            </el-form-item>
            <el-form-item prop="newPwd">
              <el-input v-model="form1.newPwd" show-password type="password" placeholder="新密码" />
            </el-form-item>
            <el-form-item prop="NPwd">
              <el-input v-model="form1.NPwd" show-password type="password" placeholder="确认密码" />
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
        </template>
      </form>
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
</style>
