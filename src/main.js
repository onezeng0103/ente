import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { setupI18n } from './locales/index.js'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import { ConfigProvider } from 'vant'
import { Icon } from 'vant'
import 'vant/lib/index.css'
import './assets/css/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import enCn from 'element-plus/es/locale/lang/en'
import { useTradeStore } from '@/store/trade/index'
import { _initCoinWebSocket } from '@/plugin/socket/index.js'
import { Dialog } from 'vant'
import { useMainStore } from '@/store/index.js'
import 'animate.css'

/**
 * 初始化socket
 */
_initCoinWebSocket()
window.__theme = import.meta.env.VITE_APP_THEME
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(Vant)
app.use(ConfigProvider)
app.use(Icon)
app.use(Dialog)
document.addEventListener(
  'touchstart',
  function (event) {
    // 当触摸点超过1个时，你阻止了默认行为。
    // 只有在用户试图进行缩放（通常需要两个触摸点）或其他需要多点触控的操作时，才会阻止默认行为。单点触控的操作，如点击、滑动等，不会被影响。
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  },
  { passive: false }
)
// 获取币种列表
const tradeStore = useTradeStore()
const mainStore = useMainStore()
// 获取平台地址 获取平台配置 币种列表 语言列表
Promise.all([
  mainStore.getPlatFormConfig(),
  mainStore.getSettingConfig(),
  tradeStore.getCoinList()
]).then(async () => {
  const currentLanguage = mainStore.languageList.filter((item) => item.isDefault === 'Y')
  // 判断语言列表中是否存在缓存语言 若不存在 使用默认语言
  let defaultLanguage = mainStore.language || ''
  if (!defaultLanguage && currentLanguage.length) {
    defaultLanguage = currentLanguage[0].dictValue || 'en'
  }
  const i18n = await setupI18n(defaultLanguage)
  let locale = i18n.global.locale.value
  app.use(ElementPlus, {
    locale: locale === 'zh' ? zhCn : enCn
  })
  app.use(i18n)
  app.mount('#app')
})
