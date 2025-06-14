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
    <el-form-item prop="phone">
      <div style="display: flex; align-items: center; width: 100%">
        <el-select
          filterable
          v-model="ruleForm.phoneCode"
          placeholder="请选择国家/地区"
          style="width: 120px"
        >
          <el-option
            v-for="item in areaList"
            :key="item.phoneCode"
            :value="item.phoneCode"
            :label="`+${item.phoneCode} ${current == 'zh' ? item.chineseName : item.englishName}`"
          />
        </el-select>
        <el-input
          v-model.trim="ruleForm.phone"
          placeholder="请输入手机号"
          style="flex: 1; margin-left: 10px"
        />
      </div>
    </el-form-item>
    <el-form-item prop="password" v-if="!showVerifyCode">
      <template #label>
        <div class="flex justify-between">
          <span>登入密码</span>
          <span class="cursor-pointer relative z-10" @click="forget">忘记密码?</span>
        </div>
      </template>
      <el-input
        type="password"
        show-password
        v-model.trim="ruleForm.password"
        placeholder="请输入密码"
      />
    </el-form-item>
    <el-form-item prop="code" label="验证码" v-else>
      <div style="width: 100%; display: flex; justify-content: space-between;align-items: center">
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
import { debounce } from 'lodash'
import { signIn, mobileCode } from '@/api/user'
import { useMainStore } from '@/store/index'
import { useUserStore } from '@/store/user/index'
import { ElNotification } from 'element-plus'
import { getAreaCode } from '@/api/user'
import { storageDict } from '@/config/dict'
const current = ref(localStorage.getItem(storageDict.LANGUAGE))
const router = useRouter()
const userStore = useUserStore()
const mainStore = useMainStore()
const ruleFormRef = useTemplateRef('ruleFormRef')
const ruleForm = ref({
  phoneCode: '86',
  phone: '',
  loginPassword: '',
  code: ''
})
const showVerifyCode = computed(() => {
  return mainStore?.getLoginMethodList?.phoneCode || false
})
// 区号列表
const areaList = ref([])
// 获取区号
const codeList = () => {
  let arr = []
  getAreaCode().then((res) => {
    if (res.code == '200') {
      res.data.forEach((item) => {
        item.data.forEach((item) => {
          arr.push({
            ...item
          })
        })
      })
      areaList.value = arr
      console.log(areaList.value)
    }
  })
}
const rules = ref({
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  loginPassword: [{ required: !showVerifyCode.value, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: showVerifyCode.value, message: '请输入验证码', trigger: 'blur' }]
})
// 倒计时
const time = ref(0)
const flag = ref(false)
const getCode = debounce(() => {
  if (!ruleForm.value.phone) {
    ElNotification({
      title: '请输入手机号',
      type: 'error',
      duration: 3000
    })
    return
  }
  mobileCode('LOGIN', ruleForm.value.phoneCode + ruleForm.value.phone).then((res) => {
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
// 倒计时结束
const finish = () => {
  flag.value = false
}
const handleSubmit = throttle(async () => {
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      let from = {
        phone: ruleForm.value.phoneCode + ruleForm.value.phone,
        code: ruleForm.value.code,
        signType: 2,
        loginPassword: ruleForm.value.password
      }
      signIn(from)
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
onMounted(() => {
  codeList()
})
</script>
<style lang="scss" scoped>
@import './index.css';
:deep(.el-select__wrapper, .is-focus) {
  height: 0.533rem;
  background-color: transparent;
  border-radius: 0.107rem;
  color: #000;
  box-shadow: 0 0 0 1px #000;
}
:deep(.el-select__wrapper) {
  height: 0.533rem;
  background-color: transparent;
  border-radius: 0.107rem;
  color: #000;
  box-shadow: 0 0 0 1px #000;
}
:deep(.el-select__wrapper.is-hovering:not(.is-focused)) {
  box-shadow: 0 0 0 1px #000;
}
</style>
