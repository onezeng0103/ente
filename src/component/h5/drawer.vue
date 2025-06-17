<script setup>
import router from '@/router/index.js'
import { useUserStore } from '@/store/user/index.js'

const props = defineProps({
  drawer: Boolean
})
const emit = defineEmits(['shut'])

const go = (value) => {
  router.push(value)
  emit('shut')
}
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const isSign = computed(() => userStore.isSign)
</script>

<template>
  <div class="drawer" :class="{ show: props.drawer }">
    <div>
      <div class="user-box" v-if="isSign">
        <div class="user-content">
          <span class="l-portrait el-avatar el-avatar--circle">
            <img src="@/assets/image/fileId=61.png" style="object-fit: cover" />
          </span>
          <div class="c-portrait">
            <h6>
              <span class="user-name">{{ userInfo?.user?.loginName }}</span>

              &nbsp;
              <span class="Unauthenticated">未認證</span>
            </h6>
            <p>
              <span>UID:</span>
              {{ userInfo?.user?.userId }}
              <i class="el-icon-copy-document"></i>
            </p>
          </div>
          <div class="r-update">
            <i class="el-icon-edit"></i>
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.533rem" v-else>
        <div class="but">登陆</div>
        <div class="but" style="background-color: #000000; color: #ffffff">注册</div>
      </div>

      <div class="box-title">常用功能</div>
      <div class="box-table">
        <div class="table-content">
          <i class="iconfont icon-a-international1"></i>
          <span>語言</span>
        </div>
        <div class="table-content">
          <i class="iconfont icon-yaoqing"></i>
          <span>邀請</span>
        </div>
        <div class="table-content">
          <i class="iconfont icon-a-zichanguanli4"></i>
          <span>資金記錄</span>
        </div>
        <div class="table-content">
          <i class="iconfont icon-shandui"></i>
          <span>閃兌</span>
        </div>
      </div>

      <div class="box-title">市場</div>
      <div class="box-table">
        <div class="table-content">
          <i class="iconfont icon-jiamihuobi"></i>
          <span>加密貨幣</span>
        </div>
        <div class="table-content">
          <i class="iconfont icon-waihui"></i>
          <span>FX</span>
        </div>
      </div>

      <div class="box-title">金融</div>
      <div class="box-table">
        <div class="table-content">
          <i class="iconfont icon-a-jiedai1"></i>
          <span>借貸</span>
        </div>
      </div>
      <div class="box-title">其他</div>
      <div class="box-table">
        <div class="table-content">
          <i class="iconfont icon-gonggao"></i>
          <span>公告</span>
        </div>
        <div class="table-content">
          <i class="iconfont icon-a-xinwen1"></i>
          <span>新聞</span>
        </div>
        <div class="table-content">
          <i class="iconfont icon-guangbo"></i>
          <span>直播</span>
        </div>
        <div class="table-content" @click="go('/securityCenter')">
          <i class="iconfont icon-anquanzhongxin"></i>
          <span>安全中心</span>
        </div>
        <div class="table-content">
          <i class="iconfont icon-User"></i>
          <span>KYC</span>
        </div>
      </div>
      <div class="box-title">下载</div>
      <div class="box-table">
        <div class="table-content">
          <i class="iconfont icon-a-anzhuo2"></i>
          <span>Android</span>
        </div>
        <div class="table-content">
          <i class="iconfont icon-a-pingguo62"></i>
          <span>IOS</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.drawer {
  background: #fff;
  width: 100%;
  //height: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  right: -100%;
  //bottom: 0;
  z-index: 9;
  padding: 70px 10px 0 10px;
  transition: all 0.3s ease;

  .user-box {
    .user-content {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      border: 0.013rem solid #e6e6e6;
      border-radius: 0.213rem;
      padding: 0.4rem;

      .l-portrait {
        margin-right: 0.267rem;
        width: 1.333rem;
        height: 1.333rem;
      }

      .c-portrait {
        -webkit-box-flex: 4;
        -ms-flex: 4;
        flex: 4;
        max-width: 70%;

        h6 {
          width: 100%;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          font-size: 0.373rem;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Helvetica Neue,
            Helvetica,
            Segoe UI,
            Arial,
            Roboto,
            PingFang SC,
            miui,
            Hiragino Sans GB;
          margin: 0.133rem 0;
          color: #000 !important;
          -ms-flex-item-align: center;
          align-self: center;

          .user-name {
            display: inline-block;
            max-width: 40%;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 0.133rem;
          }

          .Unauthenticated {
            padding: 0.067rem 0.2rem;
            background-color: #818497;
            color: #fff;
            border-radius: calc(infinity * 0.013rem);
          }
        }

        p {
          width: 100%;
          font-size: 0.32rem;
          margin: 0.133rem 0;
          -ms-flex-item-align: center;
          align-self: center;
          color: #000;
        }
      }

      .r-update {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-align: right;
      }
    }
  }

  .box-table {
    display: grid;
    grid-gap: 0.133rem;
    grid-template-columns: repeat(4, 24%);
    grid-auto-rows: 2rem;

    .table-content {
      padding: 0.2rem 0;
      border-radius: 0.4rem;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
      justify-content: space-evenly;
      -webkit-box-align: center;
      align-items: center;
      font-size: 0.427rem;

      i {
        font-size: 0.64rem;
        color: #000;
        align-self: center;
      }
    }
  }

  .box-title {
    color: #000;
    margin-left: 0.16rem;
    font-size: 0.4rem;
    padding: 0.267rem 0;
    font-weight: 700;
    margin-top: 10px;
  }

  .but {
    width: 185px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 500;
    border-radius: calc(infinity * 0.013rem);
    border: 0.013rem solid #8c8c8c;
  }
}

.show {
  right: 0;
}
</style>
