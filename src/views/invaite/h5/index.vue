<script setup>
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/store/user/index'
import { getAgentInfo } from '@/api/invaite/index.js'
import Copy from 'vue-clipboard3'
import QRCode from 'qrcode'
import html2canvas from 'html2canvas'
import { ElNotification } from 'element-plus'

const { t } = useI18n()
const useStore = useUserStore()
const { toClipboard } = Copy()
const { userInfo } = storeToRefs(useStore)
const shareLink = `${location.origin}/#/i&`
const agentInfo = ref({})

const toCopy = async (text) => {
  try {
    await toClipboard(`${text}`)
    ElNotification({
      title: '复制成功',
      type: 'success'
    })
  } catch (e) {
    ElNotification({
      title: '复制失败',
      type: 'success'
    })
  }
}
onMounted(() => {
  getAgentInfo().then((res) => {
    agentInfo.value = res.data
  })
})
const dialogVisible = ref(false)
const qrCodeImg = ref('')
const createQRImage = async (address) => {
  if (!address) return ''
  const url = await QRCode.toDataURL(address, {
    version: '', // 二维码版本。如果未指定，将计算更合适的值。
    errorCorrectionLevel: 'H', // 纠错级别。low, medium, quartile, high , L, M, Q, H
    maskPattern: 2, // 二维码内边距，0、1、2、3、4、5、6、7
    margin: 2, // 边距
    scale: 3, // 每一个黑点的宽度
    height: 200, //二维码高度
    width: 200, //二维码宽度
    scal: 200,
    radius: 10,
    color: {
      dark: '#000', // 二维码背景颜色
      light: '#fff' // 二维码前景颜色
    }
  })
  return url
}
const handleDialogVisible = async () => {
  qrCodeImg.value = await createQRImage(shareLink + userInfo.value.user.activeCode)
  dialogVisible.value = true
}
const exportToPNG = async () => {
  try {
    // 获取要导出的DOM元素
    const element = document.querySelector('.canvas_bg')
    // 使用html2canvas生成canvas
    const canvas = await html2canvas(element, {
      backgroundColor: null, // 透明背景
      scale: 2, // 提高导出图片质量
      logging: false, // 关闭日志
      useCORS: true // 允许跨域图片
    })

    // 转换为图片并下载
    const imgData = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = imgData
    link.download = 'rockiePoster.png' // 下载文件名
    link.click()
  } catch (error) {
    console.error('导出失败:', error)
  }
}
</script>

<template>
  <div class="mobile_invite_box px-2">
    <div class="h-50px" style="height: 50px"></div>
    <div class="inviteContent">
      <div class="neck">
        <h6>
          <p><span style="font-size: 22px">加入我們不斷發展的社群：向朋友推薦鋅！</span></p>
        </h6>
        <div class="neck-hub">
          <img src="@/assets/image/fenxiang.png" alt="" />
        </div>
      </div>
      <div class="invitation_bg">
        <div class="invitation_copy_box">
          <ul class="p-2">
            <li>
              <div>
                <p>推薦碼</p>
                <span>{{ userInfo?.user?.activeCode }}</span>
              </div>
              <span
                class="el-icon-copy-document"
                @click="toCopy(userInfo?.user?.activeCode)"
              ></span>
            </li>
            <li>
              <div>
                <p>邀請鏈接</p>
                <span style="text-align: right">
                  {{ shareLink }}{{ userInfo?.user?.activeCode }}
                </span>
              </div>
              <span
                class="el-icon-copy-document"
                @click="toCopy(shareLink + userInfo?.user?.activeCode)"
              ></span>
            </li>
          </ul>
          <button @click="handleDialogVisible">邀請好友</button>
        </div>
        <div class="invite-myrewards"><h6>邀請過程</h6></div>
        <div class="invitation_process">
          <div class="process_content">
            <ul>
              <li>
                <span class="sequence">1</span>
                <div>
                  <h6>好友邀請</h6>
                  <p>與朋友分享推薦連結邀請朋友</p>
                </div>
              </li>
              <li>
                <span class="sequence">2</span>
                <div>
                  <h6>帳戶註冊及首次存款</h6>
                  <p>下級好友可以使用邀請碼註冊並充值.</p>
                </div>
              </li>
              <li>
                <span class="sequence">3</span>
                <div>
                  <h6>賺取獎勵</h6>
                  <p>每個人都將獲得豐厚的獎勵.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" fullscreen :show-close="false">
      <div
        class="van-popup van-popup--bottom"
        style="height: 100%; z-index: 2004; background: #7b7b7c !important"
      >
        <div class="exit">
          <i class="van-icon van-icon-close" @click="dialogVisible = false"></i>
        </div>
        <div class="canvas_bg">
          <div id="canvas" class="canvas">
            <div class="canvas_top">
              <h6>
                <p><span style="font-size: 22px">加入我們不斷發展的社群：向朋友推薦鋅！</span></p>
              </h6>
            </div>
            <div class="canvas_bottom">
              <ul>
                <li>
                  <img
                    src="https://entsphere.com/exchange/rockieFile/getFileExt/9004441.js"
                    alt=""
                  />
                  <p>
                    <span>ENTE</span>
                    <span>entsphere.com</span>
                  </p>
                </li>
                <li class="qr_code">
                  <div
                    id="invite-Share-QRcode"
                    title="https://entsphere.com/main.html#/Register?invitationCode=CYX8O2"
                  >
                    <canvas width="100" height="100" style="display: none"></canvas>
                    <img alt="Scan me!" style="display: block" :src="qrCodeImg" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="copy_box">
          <ul>
            <li>
              <p>推薦碼</p>
              <p>
                <span>{{ userInfo?.user?.activeCode }}</span>
                <span
                  class="el-icon-document-copy"
                  @click="toCopy(userInfo?.user?.activeCode)"
                ></span>
              </p>
            </li>
            <li>
              <p>邀請鏈接</p>
              <p>
                <span>{{ shareLink }}{{ userInfo?.user?.activeCode }}</span>
                <span
                  class="el-icon-document-copy"
                  @click="toCopy(shareLink + userInfo?.user?.activeCode)"
                ></span>
              </p>
            </li>
          </ul>
          <button>
            <i class="iconfont icon-a-chongzhi1" @click="exportToPNG"></i>
          </button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
@import './index.css';

:deep(.el-dialog) {
  background: #7b7b7c !important;
}
</style>
