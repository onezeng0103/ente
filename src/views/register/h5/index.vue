<script setup>
import { useMainStore } from '@/store/index.js'
import AccountRegister from './AccountRegister.vue'
import EmailRegister from './EmailRegister.vue'
import MobileRegister from './MobileRegister.vue'
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE
const mainStore = useMainStore()
const currentIndex = ref(0)
const tabList = computed(() => {
  let list = []
  if (mainStore.getLoginMethodList.ordinaryIsOpen) {
    let obj = {}
    obj['id'] = 1
    obj['title'] = '账号'
    obj['type'] = '1'
    obj['componentName'] = AccountRegister
    list.push(obj)
  }
  if (mainStore.getLoginMethodList.emailIsOpen) {
    let obj = {}
    obj['id'] = 2
    obj['title'] = '邮箱'
    obj['type'] = '2'
    obj['componentName'] = EmailRegister
    list.push(obj)
  }
  if (mainStore.getLoginMethodList.phoneIsOpen) {
    let obj = {}
    obj['id'] = 3
    obj['title'] = '手机号'
    obj['type'] = '3'
    obj['componentName'] = MobileRegister
    list.push(obj)
  }
  return list
})
</script>

<template>
  <div data-v-6f333f16="" class="mobile_register_box" style="height: 100vh">
    <div class="register_content">
      <h2 style="margin-top: 4vh">註冊</h2>
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
