<template>
  <p class="h-title">KYC認證</p>
  <div class="userinfo-header">
    <div class="r-module">
      <div class="b-module-menu">
        <div class="f-lb-module-menu">
          <div class="kyc">
            <div>
              <div class="kyc-header"></div>
              <div class="kyc-infons">
                <div class="l-kyc-infon">
                  <div class="r-infon-img">
                    <img src="@/assets/image/kyc.png" />
                  </div>
                  <div class="kyc-infon">
                    <p>
                      根据当地法律法规，您需要完成身份认证以使用我们的服务。 这有助于保护
                      <b>您的帐户 安全性</b>
                      ，并允许您使用所有本平台服务和功能。
                    </p>
                    <ul>
                      <li><h6>您需要提供：</h6></li>
                      <li>*证件以及人脸辨识认证</li>
                      <li>*个人资讯</li>
                    </ul>
                  </div>
                </div>
                <div class="Certification">
                  <button
                    @click="handleStart"
                    type="button"
                    class="el-button el-button--default el-button--medium"
                  >
                    <span v-if="advancedAuth == '0' || advancedAuth == null">立即开始</span>
                    <span v-if="advancedAuth == '1'">认证成功</span>
                    <span v-if="advancedAuth == '2'">审核失败重新提交</span>
                    <span v-if="advancedAuth == '3'">审核中</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
const router = useRouter()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const advancedAuth = ref(userInfo.value.detail?.auditStatusAdvanced)
const handleStart = () => {
  if (advancedAuth.value == '0' || advancedAuth.value == null || advancedAuth.value == '2') {
    router.push('/userauth')
  }
}
</script>
<style lang="scss" scoped>
@import './index.css';
</style>
