<template>
  <div class="h-50px" style="height: 50px"></div>

  <div class="router-container">
    <div>
      <div class="register inputColor">
        <div class="signinImg">
          <div class="signinImg-box">
            <div>
              <h6 class="signinImg-title">
                欢迎来到
                <span class="name font-bold">{{ VITE_APP_TITLE }}</span>
              </h6>
              <h6 class="signinImg-title">开启新的交易之旅</h6>
            </div>
            <img src="@/assets/image/image138.png" alt="" />
          </div>
        </div>
        <div class="register_box">
          <div class="register_box_form">
            <h2>注册</h2>
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
      </div>
    </div>
  </div>
</template>
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
<style lang="scss" scoped>
@import './index.css';
.code_box {
  display: flex;
  align-items: end;
  justify-content: space-between;
}
:deep(.el-form-item) {
  flex: 1;
  margin-bottom: 0.133rem;
}
:deep(.el-form-item__label) {
  width: 100% !important;
  text-align: left;
  padding-bottom: 0;
  line-height: 0.48rem;
  margin-bottom: 0;
  font-size: 0.16rem;
  color: #000;
}

:deep(.el-input__wrapper, .el-input__inner, .el-input__inner:focus, .is-focus) {
  height: 0.533rem;
  background-color: transparent;
  border-radius: 0.107rem;
  color: #000;
  box-shadow: 0 0 0 1px #000;
}
</style>
