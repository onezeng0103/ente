<template>
  <p class="h-title">安全中心</p>
  <div class="userinfo-header">
    <div class="r-module">
      <div class="b-module-menu">
        <div class="f-lb-module-menu">
          <div class="securityCenter">
            <ul class="securityCenter-list">
              <li>
                <div class="list-left">
                  <span>
                    <svg aria-hidden="true" class="icon">
                      <use xlink:href="#icon-sec-denglimima"></use>
                    </svg>
                    更改密码
                  </span>
                  <span>用于管理您的帐户登录密码</span>
                </div>
                <button @click="router.push('/changePassword')">更改</button>
              </li>
              <li>
                <div class="list-left">
                  <span>
                    <svg aria-hidden="true" class="icon">
                      <use xlink:href="#icon-sec-mima"></use>
                    </svg>
                    交易密码
                  </span>
                  <span>保护您的交易和帐户安全</span>
                </div>
                <button @click="router.push('/fund-password')">
                  {{ !notPwd ? '设置' : '更改' }}
                </button>
              </li>
              <li>
                <div class="list-left">
                  <span>
                    <svg aria-hidden="true" class="icon">
                      <use xlink:href="#icon-sec-email"></use>
                    </svg>
                    电子邮箱
                  </span>
                  <span>保护您的交易和帐户安全</span>
                </div>
                <span>{{ email }}</span>
                <button @click="router.push('/emailAuthentication')">
                  {{ email ? '更改' : '设置' }}
                </button>
              </li>
              <li>
                <div class="list-left">
                  <span>
                    <svg aria-hidden="true" class="icon">
                      <use xlink:href="#icon-sec-phone"></use>
                    </svg>
                    电话号码
                  </span>
                  <span>保护您的交易和帐户安全</span>
                </div>
                <span>{{ phone }}</span>
                <button @click="router.push('/phoneAuth')">{{ phone ? '更改' : '设置' }}</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user/index'
const router = useRouter()
const userStore = useUserStore()
userStore.getUserInfo()
const { userInfo } = storeToRefs(userStore)
const email = ref(userInfo.value.user?.email)
const notPwd = ref(userInfo.value.detail?.userTardPwd)
const phone = ref(userInfo.value.user?.phone)
</script>
<style lang="scss" scoped>
@import './index.css';
</style>
