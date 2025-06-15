<template>
  <div class="menu-title">
    <div class="menu-title-r">
      <div class="user-ifon">
        <div class="l-user-ifon">
          <div class="l-personal-details">
            <img :src="path" />
          </div>
        </div>
        <div class="r-user-ifon">
          <ul>
            <li>
              <span>昵称</span>
              <span>{{ userInfo?.user?.loginName }}</span>
            </li>
          </ul>
          <div class="user-ifon-box">
            <div class="user-ifon-item">
              <span>电子邮箱</span>
              <span>zjs17807066@gmail.com</span>
            </div>
            <div class="user-ifon-item">
              <span>用戶ID</span>
              <span>{{ userInfo?.user?.userId }}</span>
            </div>
            <div class="user-ifon-item">
              <span>身份认证</span>
              <span class="Unbound">去绑定</span>
            </div>
            <div class="user-ifon-item">
              <span>手机号</span>
              <span>601117894491</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="userinfo-header">
    <div class="r-module">
      <div class="b-module-menu">
        <div class="lb-module-menu">
          <div class="overview">
            <div class="container">
              <div class="text-section">
                <h1>为确保您的帐户安全,请完成身份认证</h1>
                <p>认证身份,提高帐户安全系数</p>
                <h2>身份认证</h2>
                <p>需要完成认证后才能购买或储值数位货币</p>
                <div>
                  <button
                    type="button"
                    class="el-button el-button--default el-button--medium kyc-button"
                  >
                    <span>未认证</span>
                  </button>
                </div>
              </div>
              <div class="image-section">
                <img src="@/assets/image/kyc.png" alt="" />
              </div>
            </div>
            <div class="market">
              <p class="title-market">市集行情</p>
              <div class="rankingList">
                <div class="rankingList-data" style="position: relative">
                  <div class="table-box">
                    <el-table :data="listResult" :border="false">
                      <el-table-column label="币种">
                        <template #default="scope">
                          <div class="cell">
                            <div class="table-coinName">
                              <span class="symbol mr-1">
                                <img
                                  :src="scope.row.logo"
                                  alt=""
                                  style="border-radius: 50%; width: 32px; height: 32px"
                                />
                              </span>
                              <div>
                                <span>
                                  {{ scope.row.baseCoinUpperCase }}/{{ scope.row.showSymbol }}
                                </span>
                                <span class="remark">{{ scope.row.showSymbol }}</span>
                              </div>
                            </div>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="图表"></el-table-column>
                      <el-table-column label="价格/涨跌">
                        <template #default="scope">
                          <div class="cell">
                            <div class="price">
                              <div>
                                ${{
                                  priceFormat(tradeStore.allCoinPriceInfo[scope.row.coin]?.close)
                                }}
                              </div>
                              <span
                                class="change"
                                :class="
                                  tradeStore.allCoinPriceInfo[scope.row.coin]?.openPrice <
                                  tradeStore.allCoinPriceInfo[scope.row.coin]?.close
                                    ? 'up'
                                    : 'down'
                                "
                              >
                                {{
                                  tradeStore.allCoinPriceInfo[scope.row.coin]?.openPrice <
                                  tradeStore.allCoinPriceInfo[scope.row.coin]?.close
                                    ? '+'
                                    : '-'
                                }}{{
                                  tradeStore.allCoinPriceInfo[scope.row.coin]?.priceChangePercent
                                }}%
                              </span>
                            </div>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作">
                        <template #default="scope">
                          <div class="cell">
                            <button
                              type="button"
                              class="el-button trade ai-version-but el-button--default el-button--medium"
                            >
                              <span>交易</span>
                            </button>
                          </div>
                        </template>
                      </el-table-column>
                      <template #empty>
                        <NoData />
                      </template>
                    </el-table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rb-module-menu">
          <div class="topUpList">
            <div class="rb-module-menu-title">
              <el-carousel height="1.6rem" :autoplay="true" indicator-position="" arrow="never">
                <el-carousel-item>
                  <div class="l-title">
                    <p>邀请好友</p>
                    <h6>
                      <p>
                        <span style="color: rgb(32, 33, 36); font-size: 16px">
                          邀请好友获得最高1888USDT奖励
                        </span>
                      </p>
                    </h6>
                    <p style="cursor: pointer" @click="router.push('/invaite')">
                      邀请好友
                      <i class="el-icon-right"></i>
                    </p>
                  </div>
                  <div class="r-img">
                    <img src="@/assets/image/yaoqing.png" />
                  </div>
                </el-carousel-item>
                <el-carousel-item>
                  <div class="l-title">
                    <p>充币</p>
                    <h6>获取跟安全的收益</h6>
                    <p style="cursor: pointer" @click="router.push('/recharge')">
                      充币
                      <i class="el-icon-right"></i>
                    </p>
                  </div>
                  <div class="r-img">
                    <img src="@/assets/image/yaoqing.png" />
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="announcement">
              <ul>
                <li class="li-title">
                  <span class="l-announcement">公告</span>
                  <span class="r-all" @click="router.push('/message')">
                    查看全部
                    <i class="el-icon-right"></i>
                  </span>
                </li>
                <NoData />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useTradeStore } from '@/store/trade/index'
import { useMainStore } from '@/store/index.js'
import { priceFormat } from '@/utils/decimal.js'
import { useUserStore } from '@/store/user/index'
const tradeStore = useTradeStore()
const mainStore = useMainStore()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const router = useRouter()
const listResult = ref([])
const path = computed(() => {
  let tempPath = mainStore.getLogoList?.logo || mainStore.getLogoList?.logoD
  return tempPath
})
const toRafSort = () => {
  listResult.value = tradeStore.secondContractCoinList
    .filter((it) => {
      return it.coinType == 2
    })
    .slice(0, 8)
}
onMounted(async () => {
  toRafSort()
})
</script>
<style lang="scss" scoped>
@import './index.css';
:deep(.el-carousel__indicators) {
  display: flex;
  left: unset;
  transform: unset;
  left: 3%;
  bottom: 2%;
  .el-carousel__button {
    display: none;
  }
  .el-carousel__indicator--horizontal {
    margin-left: 5px;
    padding: 0;
    width: 0.133rem;
    height: 0.133rem;
    border: none;
    border-radius: 50%;
    background-color: #919191;
    &.is-active {
      background-color: #bcff2f;
    }
  }
}
</style>
