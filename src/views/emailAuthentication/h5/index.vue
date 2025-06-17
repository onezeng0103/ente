<script setup>
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { showToast } from 'vant'
import { emailBind, emailCode } from '@/api/user'
import { useUserStore } from '@/store/user/index'
import navigation from '@/component/h5/navigation/index.vue'

const { t } = useI18n()
const userStore = useUserStore()
userStore.getUserInfo()
// 用户信息
const { userInfo } = storeToRefs(userStore)
const email = ref(userInfo.value.user?.email)
const bind = ref(email.value)
//表单信息
const formData = ref({
  email: '',
  code: ''
})
/**
 * 倒计时
 */

// 倒计时
const time = ref(0)
const flag = ref(false)
const send = () => {
  // 邮箱发送验证码
  if (formData.value.email == '') {
    showToast('请输入邮箱')
    return
  }
  emailCode('BIND', formData.value.email).then((res) => {
    if (res.code == '200') {
      flag.value = true
      time.value = 60 * 1000
    } else {
      showToast(res.msg)
    }
  })
}
// 倒计时结束
const finish = () => {
  flag.value = false
}
const submit = () => {
  if (formData.value.email == '') {
    showToast('请输入邮箱')
    return
  }
  if (formData.value.code == '') {
    showToast('请输入验证码')
    return
  }
  emailBind(formData.value.email, formData.value.code).then((res) => {
    if (res.code == '200') {
      showToast('绑定成功')
      email.value = formData.value.email
      bind.value = true
    } else {
      showToast(res.msg)
    }
  })
}
</script>

<template>
  <navigation title="电子邮件绑定"></navigation>

  <div class="email" style="display: block; height: calc(100vh - 50px)">
    <template v-if="bind">
      <div class="step">
        <div class="email-box">
          <img src="@/assets/image/sec-email.svg" alt="" />
          <p>電子郵件驗證為您的提款和帳戶增加了另一層安全保障</p>
        </div>
        <ul class="email-list">
          <li>
            <span>電子郵箱</span>
            <button class="to-bind">已綁定</button>
          </li>
          <li>
            <span>更改電子郵件</span>
            <span><i class="el-icon-arrow-right" @click="bind = false"></i></span>
          </li>
        </ul>
      </div>
    </template>
    <template v-else>
      <div style="padding: 20px 10px">
        <div
          style="
            width: 100% !important;
            text-align: left;
            font-size: 14px;
            color: #000;
            padding-bottom: 10px;
          "
        >
          邮箱
        </div>
        <div
          style="width: 100%; display: flex; justify-content: space-between; align-items: center"
        >
          <div class="el-input el-input--large" style="flex: 1 1 0">
            <div class="el-input__wrapper">
              <input
                class="el-input__inner"
                type="text"
                v-model="formData.email"
                placeholder="请输入邮箱"
              />
            </div>
          </div>
        </div>
        <div
          style="
            width: 100% !important;
            text-align: left;
            font-size: 14px;
            color: #000;
            padding-bottom: 10px;
            padding-top: 20px;
          "
        >
          验证码
        </div>
        <div
          style="width: 100%; display: flex; justify-content: space-between; align-items: center"
        >
          <div class="el-input el-input--large" style="flex: 1 1 0">
            <div class="el-input__wrapper">
              <input
                class="el-input__inner"
                v-model="formData.code"
                type="text"
                placeholder="请输入验证码"
              />
            </div>
          </div>
          <template v-if="flag">
            <div
              class="el-button"
              style="
              width: 90px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-left: 10px;
              background-color: rgb(0, 0, 0);
              color: rgb(255, 255, 255);
              border: none;
              font-size: 12px;
            "
            >
              <span><van-count-down :time="time" format="ss" @finish="finish" style="color: #ffffff" /></span>
            </div>
          </template>
          <template v-else>
            <div
              @click="send"
              class="el-button"
              style="
              width: auto;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-left: 10px;
              background-color: rgb(0, 0, 0);
              color: rgb(255, 255, 255);
              border: none;
              font-size: 12px;
            "
            >
              <span>发送验证码</span>
            </div>
          </template>
        </div>
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
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
@import './index.css';
</style>
