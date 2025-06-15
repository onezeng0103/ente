<template>
  <div class="layout">
    <PcTop v-if="!isH5 && isPcTopShow" />
    <H5Top v-if="isH5 && !isH5TopShow" :drawer="drawer" @setDrawer="setDrawer" />
    <router-view></router-view>
    <PcFooter v-if="!isH5 && !isPcFooterShow" />
    <H5Footer v-if="isH5 && !isH5FooterShow" />
    <Drawer v-if="isH5" :drawer="drawer"></Drawer>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { useMainStore } from '@/store/index'
import PcTop from '@/component/pc/topBar.vue'
import H5Top from '@/component/h5/topBar.vue'
import PcFooter from '@/component/pc/footerBar.vue'
import H5Footer from '@/component/h5/footerBar.vue'
import Drawer from '@/component/h5/drawer.vue'

const drawer = ref(false)
const setDrawer = (value) => {
  drawer.value = value
}

const mainStore = useMainStore()
const route = useRoute()
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE
document.title = VITE_APP_TITLE
const isH5 = ref(window.innerWidth < 750)
const checkDevice = () => {
  isH5.value = window.innerWidth < 750
}
const isPcTopShow = computed(() => {
  return true
})
const isPcFooterShow = computed(() => {
  const list = ['/login', '/register']
  return list.includes(route.path)
})
const isH5TopShow = computed(() => {
  const list = ['/recharge', '/cashflow', '/exchange','/flashExchange']
  return list.includes(route.path)
})
const isH5FooterShow = computed(() => {
  const list = ['/login', '/register', '/recharge', '/cashflow', '/exchange','/flashExchange']
  return list.includes(route.path)
})

onMounted(() => {
  window.addEventListener('resize', checkDevice)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkDevice)
})

// 提供给所有子组件
provide('isH5', isH5)
/**
 * 客服点击监听
 */
const event_serviceChange = () => {
  if (mainStore.getCustomerServiceList.length) {
    if (mainStore.getCustomerServiceList.length == 1) {
      let href = mainStore.getCustomerServiceList[0]?.url
      if (mainStore.getCustomerServiceList[0]?.getUrl) {
        href = mainStore.getCustomerServiceList[0].getUrl()
        window.open(href)
      }
    } else {
      showServicePopup.value = true
    }
  }
}
onMounted(() => {
  document.addEventListener('event_serviceChange', event_serviceChange)
  document.documentElement.setAttribute('data-theme', import.meta.env.VITE_APP_THEME)
})
</script>
