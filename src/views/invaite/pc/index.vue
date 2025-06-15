<template>
  <div class="h-50px" style="height: 50px"></div>
  <div class="router-container">
    <div class="outer-layer-container">
      <div class="invite">
        <div class="invite-header-box">
          <div class="invite-header">
            <div class="neck">
              <div class="enterInvitationGet">
                <img src="@/assets/image/fenxiang.png" alt="" />
                <p><span style="font-size: 22px">加入我们不断发展的社群：向朋友推荐锌！</span></p>
              </div>
              <button
                @click="handleDialogVisible"
                type="button"
                class="el-button el-button--default el-button--medium"
              >
                <span>分享</span>
              </button>
            </div>
            <div class="invitation_copy_box">
              <ul>
                <li>
                  <div>
                    <p>推荐码</p>
                    <span>{{ userInfo?.user?.activeCode }}</span>
                  </div>
                  <span
                    class="el-icon-copy-document"
                    @click="toCopy(userInfo?.user?.activeCode)"
                  ></span>
                </li>
                <li>
                  <div>
                    <p>邀请链接</p>
                    <span class="currentDomainName">
                      {{ shareLink }}{{ userInfo?.user?.activeCode }}
                    </span>
                  </div>
                  <span
                    class="el-icon-copy-document"
                    @click="toCopy(shareLink + userInfo?.user?.activeCode)"
                  ></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <h6 class="invite-Step-title">提示</h6>
        <ul class="invite-Step">
          <li>
            <div>
              <img src="@/assets/image/image134.png" alt="" />
              <h6>步骤1</h6>
              <p>与朋友分享推荐连结邀请朋友</p>
            </div>
          </li>
          <li>
            <div>
              <img src="@/assets/image/image135 (1).png" alt="" />
              <h6>步骤2</h6>
              <p>下级好友可以使用邀请码注册并充值.</p>
            </div>
          </li>
          <li>
            <div>
              <img src="@/assets/image/image136.png" alt="" />
              <h6>步骤3</h6>
              <p>每个人都将获得丰厚的奖励.</p>
            </div>
          </li>
        </ul>
        <div class="commission">
          <h6>您已累计</h6>
          <ul class="commission-list">
            <li>
              <h6>团队人数</h6>
              <h6>
                {{ agentInfo.childCount || 0 }}
              </h6>
            </li>
            <li>
              <h6>直属成员</h6>
              <h6>
                {{ agentInfo.childCount || 0 }}
              </h6>
            </li>
            <li>
              <h6>今日注册</h6>
              <h6>
                {{ agentInfo.todayCount || 0 }}
              </h6>
            </li>
            <li>
              <h6>昨日注册</h6>
              <h6>
                {{ agentInfo.yesterdayCount || 0 }}
              </h6>
            </li>
          </ul>
        </div>
        <div class="invite-rule">
          <div class="invite-rule-box">
            <div>
              <div>
                <h6>
                  <span class="el-icon-document-remove"></span>
                  规则
                </h6>
              </div>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" fullscreen :show-close="false" append-to=".invite">
    <div class="exit">
      <i class="van-icon van-icon-close" style="cursor: pointer" @click="dialogVisible = false"></i>
    </div>
    <div class="canvas_bg">
      <div id="canvas" class="canvas">
        <div class="canvas_top">
          <h6 class="canvas-hub">
            <p><span style="font-size: 22px">加入我們不斷發展的社群：向朋友推薦鋅！</span></p>
          </h6>
        </div>
        <div class="canvas_bottom">
          <ul>
            <li>
              <img src="https://entsphere.com/exchange/rockieFile/getFileExt/9004441.js" alt="" />
              <p>
                <span>ENTE</span>
                <span>entsphere.com</span>
              </p>
            </li>
            <li>
              <div
                id="invite-Share-QRcode"
                title="https://entsphere.com/main.html#/Register?invitationCode=EAT37O"
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
              style="cursor: pointer"
              class="el-icon-document-copy"
              @click="toCopy(userInfo?.user?.activeCode)"
            ></span>
          </p>
        </li>
        <li>
          <p>邀請鏈接</p>
          <p>
            <span
              style="
                width: 3rem;
                display: inline-block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              {{ shareLink }}{{ userInfo?.user?.activeCode }}.
            </span>
            <span
              style="cursor: pointer"
              class="el-icon-document-copy"
              @click="toCopy(shareLink + userInfo?.user?.activeCode)"
            ></span>
          </p>
        </li>
      </ul>
      <button @click="exportToPNG"><i class="el-icon-download"></i></button>
    </div>
  </el-dialog>
</template>
<script setup>
import html2canvas from 'html2canvas'
import { useUserStore } from '@/store/user/index'
import { getAgentInfo } from '@/api/invaite/index.js'
import { ElNotification } from 'element-plus'
import QRCode from 'qrcode'
import Copy from 'vue-clipboard3'
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
      type: 'error'
    })
  }
}
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
    const element = document.querySelector('.canvas')
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
onMounted(() => {
  getAgentInfo().then((res) => {
    agentInfo.value = res.data
  })
})
</script>
<style lang="scss" scoped>
@import './index.css';
:deep(.el-dialog) {
  background: #7b7b7c !important;
}
</style>
