<script setup>
import { useMainStore } from '@/store/index.js'
import AccountLogin from './AccountLogin.vue'
import EmailLogin from './EmailLogin.vue'
import MobileLogin from './MobileLogin.vue'
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE
const mainStore = useMainStore()
const currentIndex = ref(0)
const tabList = computed(() => {
  let list = []
  console.log(mainStore.getLoginMethodList)
  if (mainStore.getLoginMethodList.ordinaryIsOpen) {
    let obj = {}
    obj['id'] = 1
    obj['title'] = '账号'
    obj['type'] = '1'
    obj['componentName'] = AccountLogin
    list.push(obj)
  }
  if (mainStore.getLoginMethodList.emailIsOpen) {
    let obj = {}
    obj['id'] = 2
    obj['title'] = '邮箱'
    obj['type'] = '2'
    obj['componentName'] = EmailLogin
    list.push(obj)
  }
  if (mainStore.getLoginMethodList.phoneIsOpen) {
    let obj = {}
    obj['id'] = 3
    obj['title'] = '手机号'
    obj['type'] = '3'
    obj['componentName'] = MobileLogin
    list.push(obj)
  }
  return list
})
</script>

<template>
  <div class="mobile_login_box">
    <div class="login_content" style="margin-top: 4vh">
      <h2>登入</h2>
<!--      <ul class="groupTestOption">-->
<!--        <li class="selected">電子郵箱</li>-->
<!--      </ul>-->
      <ul class="groupTestOption">
        <li
          :class="{ selected: currentIndex === index }"
          v-for="(item, index) in tabList"
          :key="item.id"
          @click="currentIndex = index"
        >
          {{ item.title }}
        </li>
      </ul>
      <component :is="tabList[currentIndex].componentName" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './index.css';

:deep(.el-form-item) {
  //flex: 1;
}

:deep(.el-form-item__label) {
  width: 100% !important;
  text-align: left;
  font-size: 0.32rem;
  color: #000;
  padding-bottom: 0.133rem;
}

:deep(.el-input__wrapper, .el-input__inner, .el-input__inner:focus, .is-focus) {
  background-color: transparent;
  border-radius: 0.107rem;
  color: #000;
  box-shadow: 0 0 0 1px #000;
}
</style>
