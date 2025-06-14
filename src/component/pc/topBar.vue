<template>
  <div class="header-container is-fixed is-small w-full flex justify-center max-h">
    <header id="header_main" class="header max-h">
      <div class="container-fluid max-h w-100">
        <div class="header__body d-flex justify-content-between max-h">
          <div class="header__left">
            <div class="logo">
              <img
                style="border-radius: 0px; width: 32px; height: 32px"
                src="https://entsphere.com/exchange/rockieFile/getFile?fileId=9004441"
              />
              <span class="logo-text">{{ VITE_APP_TITLE }}</span>
            </div>
          </div>
          <div class="left__main">
            <nav id="main-nav" class="main-nav">
              <ul class="left-navigation">
                <li @click="router.push('/')">
                  <span>首页</span>
                </li>
                <li>
                  <span>市场</span>
                </li>
                <li>
                  <span>现货</span>
                  <i class="el-icon-arrow-down"></i>
                  <div class="submenu">
                    <div>
                      <h6 class="flex items-center">
                        <span class="iconfont icon-jiamihuobi"></span>
                        <span>加密货币</span>
                      </h6>
                      <p>開啟了區塊鏈革命,具備稀缺性和價值儲存功能.</p>
                    </div>
                  </div>
                </li>
                <li>
                  <span>合约交易</span>
                  <i class="el-icon-arrow-down"></i>
                  <div class="submenu">
                    <div>
                      <h6 class="flex items-center">
                        <span class="iconfont icon-jiamihuobi"></span>
                        <span>加密货币</span>
                      </h6>
                      <p>開啟了區塊鏈革命,具備稀缺性和價值儲存功能.</p>
                    </div>
                    <div>
                      <h6 class="flex items-center">
                        <span class="iconfont icon-waihui"></span>
                        <span>FX</span>
                      </h6>
                      <p>開啟了區塊鏈革命,具備稀缺性和價值儲存功能.</p>
                    </div>
                  </div>
                </li>
                <li>
                  <span>金融</span>
                  <i class="el-icon-arrow-down"></i>
                  <div class="submenu">
                    <div>
                      <h6 class="flex items-center">
                        <span class="iconfont iconfont icon-a-jiedai1"></span>
                        <span>借贷</span>
                      </h6>
                      <p>靈活借款,助您應對緊急資金需求.</p>
                    </div>
                  </div>
                </li>
                <li>
                  <span>ICO</span>
                </li>
              </ul>
            </nav>
          </div>
          <div class="header__right">
            <div class="right-c">
              <div class="right-login" v-if="!isSign">
                <div class="not_login">
                  <div class="mr-1" @click="router.push('/login')">登入</div>
                  <div @click="router.push('/register')">注册</div>
                </div>
              </div>
              <div class="right-login" v-else>
                <div class="funds">
                  <div class="funds-font flex items-center">
                    <span>资产管理</span>
                    <i class="el-icon-caret-bottom"></i>
                  </div>
                  <ul class="login_down_box">
                    <li @click="router.push('/recharge')">
                      <i class="iconfont icon-a-chongzhi1"></i>
                      充币
                    </li>
                    <li @click="router.push('/withdraw')">
                      <i class="iconfont icon-tixian"></i>
                      提现
                    </li>
                    <li>
                      <i class="iconfont icon-shandui"></i>
                      闪兑
                    </li>
                    <li>
                      <i class="iconfont icon-huazhuan"></i>
                      划转
                    </li>
                    <li>
                      <span class="iconfont icon-zonglan"></span>
                      <i class="iconfonticon-zonglan"></i>
                      总览
                    </li>
                    <li>
                      <span class="iconfont icon-zijinjilu"></span>
                      <i class="iconfonticon-zijinjilu"></i>
                      资金记录
                    </li>
                    <li>
                      <span class="iconfont icon-zhangdan"></span>
                      <i class="iconfonticon-zhangdan"></i>
                      账单
                    </li>

                    <li>
                      <span class="iconfont icon-jiedailishi"></span>
                      <i class="iconfonticon-jiedailishi"></i>
                      借贷历史
                    </li>
                    <li>
                      <span class="iconfont icon-duihuanlishi"></span>
                      <i class="iconfonticon-duihuanlishi"></i>
                      兑换历史
                    </li>

                    <li>
                      <span class="iconfont icon-a-jiedailishi1"></span>
                      <i class="iconfonticon-a-jiedailishi1"></i>
                      返佣记录
                    </li>

                    <li>
                      <span class="iconfont icon-dingdanliebiao"></span>
                      <i class="iconfonticon-dingdanliebiao"></i>
                      订单列表
                    </li>
                  </ul>
                </div>
                <div class="Logged">
                  <span class="el-avatar el-avatar--circle">
                    <img :src="path" style="object-fit: cover" />
                  </span>
                  <ul class="login_down_box">
                    <li class="personal">
                      <span class="el-avatar el-avatar--circle">
                        <img :src="path" style="object-fit: cover" />
                      </span>
                      <div>
                        <span>{{ userInfo?.user?.loginName }}</span>
                        <span>用戶ID: {{ userInfo?.user?.userId }}</span>
                      </div>
                    </li>
                    <li>
                      <i class="iconfont icon-gerenzhongxin"></i>
                      用戶中心
                    </li>

                    <li>
                      <i class="iconfont icon-yaoqing"></i>
                      邀請
                    </li>

                    <li>
                      <i class="iconfont icon-monijiaoyi"></i>
                      模擬交易
                    </li>
                    <li @click="handleSignOut">
                      <i class="iconfont icon-tuichudenglu"></i>
                      登出
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="right-icons">
              <div class="mode-switcher">
                <div class="message" v-if="isSign" ref="trigger" @click="isNew = true">
                  <div class="el-badge item">
                    <span>
                      <span class="el-popover__reference-wrapper">
                        <i
                          class="iconfont icon-a-tongzhi1 item-icon el-popover__reference"
                          aria-describedby="el-popover-9544"
                          tabindex="0"
                        ></i>
                      </span>
                    </span>
                    <sup class="el-badge__content is-fixed" v-if="isRed">0</sup>
                  </div>
                </div>
                <div class="lang_list_box" @click="isLanguage = !isLanguage">
                  <i class="iconfont icon-a-international1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="outer-layer-container">
      <div
        class="el-dialog__wrapper"
        style="z-index: 2004"
        v-if="isLanguage"
        @click="isLanguage = !isLanguage"
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="dialog"
          class="el-dialog el-dialog--center"
          style="margin-top: 15vh"
        >
          <div class="el-dialog__header">
            <span class="el-dialog__title"></span>
          </div>
          <div class="el-dialog__body">
            <ul>
              <li
                v-for="(item, index) in languageList"
                :key="index"
                @click="setLanguage(item)"
                :class="current === item.dictValue ? 'active' : ''"
              >
                <div class="el-image" style="border-radius: 50%">
                  <img :src="item.imgUrl" class="el-image__inner" />
                </div>
                {{ item.remark }}
                <span class="el-icon-check" v-if="current === item.dictValue"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="isNew"
    role="tooltip"
    ref="tooltip"
    aria-hidden="false"
    class="el-popover el-popper popover-notify"
    tabindex="0"
    style="
      width: 400px;
      transform-origin: center top;
      z-index: 2009;
      position: fixed;
      top: 40px;
      left: 1318px;
    "
    x-placement="bottom"
  >
    <div class="notify">
      <div class="notify-header">
        <div class="notify-header-left">
          <span>0</span>
          <h6>通知</h6>
        </div>
        <div class="notify-header-right">
          <h6>
            查看全部
            <i class="el-icon-right"></i>
          </h6>
        </div>
      </div>
      <div class="noData">
        <img
          src="data:image/png;base64,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"
        />
        <h6>暂无资料</h6>
      </div>
    </div>
    <div x-arrow="" class="popper__arrow" style="left: 287.682px"></div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useMainStore } from '@/store/index.js'
import { storageDict } from '@/config/dict'
import { useUserStore } from '@/store/user/index'
import { signOut } from '@/api/user'
import { ElNotification } from 'element-plus'
import { getInfo } from '@/api/info'
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE
const router = useRouter()
const userStore = useUserStore()
const mainStore = useMainStore()
const { userInfo } = storeToRefs(userStore)

const isSign = computed(() => userStore.isSign)
const path = computed(() => {
  let tempPath = mainStore.getLogoList?.logo || mainStore.getLogoList?.logoD
  return tempPath
})

const handleSignOut = () => {
  signOut().then((res) => {
    if (res.code === 200) {
      ElNotification({
        title: '退出成功',
        type: 'success',
        duration: 3000
      })
      userStore.signOut()
      isSign.value = false
      setTimeout(() => {
        location.reload()
      }, 10)
    } else {
      ElNotification({
        title: res.msg,
        type: 'error',
        duration: 3000
      })
    }
  })
}

const isRed = ref(false)
const newList = ref([])
const isNew = ref(false)
const tooltip = useTemplateRef('tooltip')
const trigger = useTemplateRef('trigger')
const handleClickOutside = (e) => {
  const tooltipEl = tooltip.value
  const triggerEl = trigger.value
  if (tooltipEl && triggerEl) {
    if (!tooltipEl.contains(e.target) && !triggerEl.contains(e.target)) {
      isNew.value = false
    }
  }
}
const isLanguage = ref(false)
const current = ref(localStorage.getItem(storageDict.LANGUAGE))
/**
 * 设置语言
 */
const setLanguage = (item) => {
  mainStore.setLanguage(item.dictValue)
  current.value = item.dictValue
  setTimeout(() => {
    router.push('/')
  }, 0)
}
const languageList = mainStore.languageList
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
onMounted(() => {
  if (isSign.value) {
    getInfo().then((res) => {
      if (res.code == '200' && res.rows.length > 0) {
        isRed.value = res.rows?.some((item) => item.type == 1 && item.status == 0)
        newList.value = res.rows
      } else {
        isRed.value = false
      }
    })
    document.addEventListener('click', handleClickOutside)
  } else {
    isRed.value = false
  }
})
</script>
<style lang="scss" scoped>
.submenu div h6 {
  .iconfont {
    font-size: 0.32rem;
    font-weight: 400;
    color: var(--font);
    margin-right: 0.067rem;
    width: auto;
  }
}

.header {
  .header__left {
    .logo {
      img {
        border-style: none;
        max-width: 100%;
        height: auto;
      }
    }
    .logo-text {
      margin-left: 0.133rem;
      color: var(--logoText);
      font-size: 0.267rem;
      white-space: nowrap;
    }
  }
}
</style>
