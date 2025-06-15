<template>
  <div class="h-0">
    <footer class="footer style-2">
      <div class="container">
        <div class="footer__main">
          <div class="footer__main-t">
            <span class="logo">
              <div class="el-image">
                <img
                  src="https://entsphere.com/exchange/rockieFile/getFileExt/9004441.js"
                  class="el-image__inner"
                />
              </div>
              <span class="logo-text">{{ VITE_APP_TITLE }}</span>
            </span>
            <p>@2023WG-Jiaoyisuo.Com 我们是一家综合交易服务公司</p>
          </div>
          <div class="row" style="display: flex; justify-content: space-between">
            <div class="col-xl-7 col-md-13">
              <div class="widget">
                <div class="widget-link">
                  <h6 class="title">关于我们</h6>
                  <ul>
                    <li @click="router.push('/about')"><a>公司介绍</a></li>
                  </ul>
                </div>
                <div class="widget-link">
                  <h6 class="title">产品</h6>
                  <ul>
                    <li><a>借贷</a></li>
                  </ul>
                </div>
                <div class="widget-link">
                  <h6 class="title">资产管理</h6>
                  <ul>
                    <li @click="router.push('/recharge')"><a>充值</a></li>
                    <li @click="router.push('/withdraw')"><a>提现</a></li>
                    <li><a>订单列表</a></li>
                  </ul>
                </div>
                <div class="widget-link s2">
                  <h6 class="title">服务</h6>
                  <ul>
                    <li><a>法律责任</a></li>
                    <li><a>反洗钱协议</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-xl-2 col-md-3">
              <div class="info">
                <h6>{{ VITE_APP_TITLE }},随时随地交易</h6>
                <div class="info-p"></div>
                <div class="download-App">
                  <div class="download-App-l" ref="downloadAppL">
                    <span>
                      <div>
                        <i class="iconfont icon-pingguo"></i>
                        下载 IOS
                      </div>
                    </span>
                    <div
                      ref="downloadIos"
                      style="display: none"
                      id="web-qrcode-container"
                      class="fade-in-up"
                      title="https://entsphere.com/down/0121/ente-v2025012101.mobileconfig"
                    >
                      <img
                        ref="downloadIosImg"
                        alt="Scan me!"
                        style="display: none; width: 106px; height: 106px"
                        :src="qrCodes.apple"
                      />
                    </div>
                    <p ref="downloadIosText" style="display: none">扫描二维码下载 IOS</p>
                  </div>
                  <div class="download-App-r" ref="downloadAppR">
                    <span>
                      <div>
                        <i class="iconfont icon-anzuo"></i>
                        下载 Android
                      </div>
                    </span>
                    <div
                      ref="downloadAndroid"
                      style="display: none"
                      id="web-qrcode-containers"
                      class="fade-in-up"
                      title="https://entsphere.com/down/0121/ente-v2025012101.apk"
                    >
                      <canvas width="100" height="100" style="display: none"></canvas>
                      <img
                        ref="downloadAndroidImg"
                        alt="Scan me!"
                        style="display: none; width: 106px; height: 106px"
                        :src="qrCodes.android"
                      />
                    </div>
                    <p ref="downloadAndroidText" style="display: none">扫描二维码下载 Android</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script setup>
import { useMainStore } from '@/store/index.js'
import { useRouter } from 'vue-router'
import QRCode from 'qrcode'
const mainStore = useMainStore()
const router = useRouter()
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE
const downloadAppL = useTemplateRef('downloadAppL')
const downloadIos = useTemplateRef('downloadIos')
const downloadIosImg = useTemplateRef('downloadIosImg')
const downloadIosText = useTemplateRef('downloadIosText')
const downloadAppR = useTemplateRef('downloadAppR')
const downloadAndroid = useTemplateRef('downloadAndroid')
const downloadAndroidImg = useTemplateRef('downloadAndroidImg')
const downloadAndroidText = useTemplateRef('downloadAndroidText')
const createQRImage = async (address) => {
  if (!address) return ''
  try {
    const url = await QRCode.toDataURL(address, {
      errorCorrectionLevel: 'H',
      margin: 2,
      scale: 3,
      width: 106,
      color: {
        dark: '#000',
        light: '#fff'
      }
    })
    return url
  } catch (error) {
    console.error('生成二维码失败:', error)
    return ''
  }
}
const downLoadList = computed(() => {
  const data =
    mainStore.getDownLoadList
      ?.map((item) => ({
        icon: `${item.name}.png`,
        path: item.url,
        isOpen: item.isOpen
      }))
      ?.filter((item) => item.isOpen === 'true') || []

  return {
    android: data.find((item) => item.icon === 'android.png')?.path || '',
    apple: data.find((item) => item.icon === 'apple.png')?.path || ''
  }
})
const qrCodes = ref({
  android: '',
  apple: ''
})

onMounted(async () => {
  qrCodes.value.android = await createQRImage(downLoadList.value.android)
  qrCodes.value.apple = await createQRImage(downLoadList.value.apple)
  downloadAppL.value.addEventListener('mouseenter', () => {
    downloadIos.value.style.display = 'flex'
    downloadIosImg.value.style.display = 'block'
    downloadIosText.value.style.display = 'block'
  })
  downloadAppL.value.addEventListener('mouseleave', () => {
    downloadIos.value.style.display = 'none'
    downloadIosImg.value.style.display = 'none'
    downloadIosText.value.style.display = 'none'
  })
  downloadAppR.value.addEventListener('mouseenter', () => {
    downloadAndroid.value.style.display = 'flex'
    downloadAndroidImg.value.style.display = 'block'
    downloadAndroidText.value.style.display = 'block'
  })
  downloadAppR.value.addEventListener('mouseleave', () => {
    downloadAndroid.value.style.display = 'none'
    downloadAndroidImg.value.style.display = 'none'
    downloadAndroidText.value.style.display = 'none'
  })
})
</script>
