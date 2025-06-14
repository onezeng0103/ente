<template>
  <div class="h-50px" style="height: 50px"></div>
  <div class="router-container">
    <div class="recharge">
      <div class="recharge">
        <div class="recharge-header">
          <section class="recharge-section">
            <div class="recharge-box">
              <div class="recharge-form">
                <h6 class="recharge-title" style="margin-bottom: 0.167rem">数字货币充值</h6>
                <div>
                  <div>
                    <div>
                      <el-form size="large" label-position="top">
                        <el-row>
                          <el-col :span="24">
                            <el-form-item label="币种">
                              <template #default>
                                <div class="Currency-item" @click="handleCenterDialogVisible">
                                  <div class="prefix-item">选择币种</div>
                                  <div class="suffix-item">
                                    {{ info.title }}
                                    <i class="el-icon-arrow-down"></i>
                                  </div>
                                </div>
                              </template>
                            </el-form-item>
                          </el-col>
                          <el-col :span="24">
                            <el-form-item label="选择转账网络">
                              <template #default>
                                <div class="Currency-item">
                                  <div class="prefix-item">选择网络</div>
                                  <div class="suffix-item">
                                    {{ extraInfo?.coinName }}
                                    <i class="el-icon-arrow-down"></i>
                                  </div>
                                </div>
                              </template>
                            </el-form-item>
                          </el-col>
                          <el-col :span="24">
                            <el-form-item>
                              <template #default>
                                <div class="wallet-address" style="width: 100%">
                                  <div style="flex: 1 1 0%; margin-right: 0.3rem">
                                    <div class="wallet-address-title">地址</div>
                                    <el-input
                                      style="
                                        min-height: 34px;
                                        text-align: left;
                                        width: 100%;
                                        margin-top: 0.25rem;
                                      "
                                      :rows="3"
                                      type="textarea"
                                    />
                                    <div class="copy-btn">
                                      <i
                                        slot="suffix"
                                        class="el-input__icon el-icon-document-copy addres-sz"
                                      ></i>
                                    </div>
                                  </div>
                                  <div class="qrcode-area" v-if="!checkLoading">
                                    <div
                                      id="web-qrcode-container-un"
                                      style=""
                                      title="1E76MY2n1KUByqZjgSUfZBAD22hzarsu8f"
                                    >
                                      <img :src="qrCodeImg" />
                                    </div>
                                  </div>
                                </div>
                              </template>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-form>
                    </div>
                  </div>
                </div>
              </div>
              <div class="common-problem">
                <div class="common-problem__title">常见问题</div>
                <div class="common-problem__subtitle">
                  <div class="faq-c">
                    <el-collapse accordion>
                      <el-collapse-item title="充币未到帐怎么办？" name="1">
                        <div>
                          如果您的充值资讯确认无误，但资产仍未到账，该笔充值的记录可以在区块上查询到，但是因为区块在等待确认中，当区块完全确认后，区块同步到平台钱包也会有一定的延时，请耐心等待。
                        </div>
                      </el-collapse-item>
                      <el-collapse-item title="为什么我的充币正在审查中？" name="2">
                        <div>
                          平台将不定期标记交易以供审查。审查过程取决于多种因素，基于保护我们的用户免受行业不良行为者的侵害。平台理解这些过程可能会令人沮丧，但保护我们用户的资产是必要的。
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </div>
                <div class="recharge-methods">
                  <div class="sub-methods">
                    <div class="methods-title">加密货币储值</div>
                    <div class="methods-describe">
                      如何存入硬币? 使用货币(如 BTC、USDT 等)从我的钱包充值加密货币帐户
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="Withdrawals-record">
          <p class="Withdrawals-record-title">
            <span>近期儲值記錄</span>
            <span>查看歷史記錄</span>
          </p>
          <div class="table-data">
            <div class="table-content light" style="position: relative">
              <div
                class="el-table el-table--fit el-table--enable-row-hover el-table--medium"
                style="width: 100%"
              >
                <div class="hidden-columns">
                  <div>充值</div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div class="el-table__header-wrapper">
                  <table
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    class="el-table__header"
                    style="width: 1508px"
                  >
                    <colgroup>
                      <col name="el-table_2_column_7" width="253" />
                      <col name="el-table_2_column_8" width="251" />
                      <col name="el-table_2_column_9" width="251" />
                      <col name="el-table_2_column_10" width="251" />
                      <col name="el-table_2_column_11" width="251" />
                      <col name="el-table_2_column_12" width="251" />
                      <col name="gutter" width="0" />
                    </colgroup>
                    <thead class="has-gutter">
                      <tr class="">
                        <th
                          colspan="1"
                          rowspan="1"
                          class="el-table_2_column_7 is-leaf el-table__cell"
                          style="
                            background-color: transparent;
                            color: rgb(0, 0, 0);
                            font-size: 16px;
                            font-weight: 400;
                          "
                        >
                          <div class="cell">交易類型</div>
                        </th>
                        <th
                          colspan="1"
                          rowspan="1"
                          class="el-table_2_column_8 is-leaf el-table__cell"
                          style="
                            background-color: transparent;
                            color: rgb(0, 0, 0);
                            font-size: 16px;
                            font-weight: 400;
                          "
                        >
                          <div class="cell">交易幣種</div>
                        </th>
                        <th
                          colspan="1"
                          rowspan="1"
                          class="el-table_2_column_9 is-leaf el-table__cell"
                          style="
                            background-color: transparent;
                            color: rgb(0, 0, 0);
                            font-size: 16px;
                            font-weight: 400;
                          "
                        >
                          <div class="cell">交易金額</div>
                        </th>
                        <th
                          colspan="1"
                          rowspan="1"
                          class="el-table_2_column_10 is-leaf el-table__cell"
                          style="
                            background-color: transparent;
                            color: rgb(0, 0, 0);
                            font-size: 16px;
                            font-weight: 400;
                          "
                        >
                          <div class="cell">交易手續費</div>
                        </th>
                        <th
                          colspan="1"
                          rowspan="1"
                          class="el-table_2_column_11 is-leaf el-table__cell"
                          style="
                            background-color: transparent;
                            color: rgb(0, 0, 0);
                            font-size: 16px;
                            font-weight: 400;
                          "
                        >
                          <div class="cell">交易日期</div>
                        </th>
                        <th
                          colspan="1"
                          rowspan="1"
                          class="el-table_2_column_12 is-leaf el-table__cell"
                          style="
                            background-color: transparent;
                            color: rgb(0, 0, 0);
                            font-size: 16px;
                            font-weight: 400;
                          "
                        >
                          <div class="cell">狀態</div>
                        </th>
                        <th class="el-table__cell gutter" style="width: 0px; display: none"></th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div class="el-table__body-wrapper is-scrolling-none">
                  <table
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    class="el-table__body"
                    style="width: 1508px"
                  >
                    <colgroup>
                      <col name="el-table_2_column_7" width="253" />
                      <col name="el-table_2_column_8" width="251" />
                      <col name="el-table_2_column_9" width="251" />
                      <col name="el-table_2_column_10" width="251" />
                      <col name="el-table_2_column_11" width="251" />
                      <col name="el-table_2_column_12" width="251" />
                    </colgroup>
                    <tbody></tbody>
                  </table>
                  <div class="el-table__empty-block" style="height: 100%; width: 1508px">
                    <span class="el-table__empty-text">
                      <div class="table-empty">
                        <img
                          src="data:image/png;base64,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"
                          alt=""
                        />
                        <p>暫無資料</p>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="centerDialogVisible"
    title="请选择币种"
    style="padding: 0; margin-top: 15vh; width: 40%"
  >
    <div class="select-time-panel" style="background-color: transparent">
      <div class="title">
        请注意，系统只会显示此平台上支持的的网络，若您通过其他网络充值，您的资产可能会丢失。
      </div>
      <ul class="Currency">
        <li v-for="(item, index) in coinList" :key="index" @click="handleClose(item)">
          <span class="CoinIcon-s">
            <span class="symbol">
              <img
                :src="getImageUrl(item?.icon)"
                style="width: 32px; height: 32px; border-radius: 50%"
              />
            </span>
            &nbsp;{{ item.title?.toUpperCase() }}
          </span>
          <i v-if="info.icon === item.icon" class="el-icon-check"></i>
        </li>
      </ul>
    </div>
  </el-dialog>
  <el-dialog
    v-model="centerDialogVisible1"
    title="请选择币种"
    style="padding: 0; margin-top: 15vh; width: 40%"
  >
    {{ tabList }}
  </el-dialog>
  <div class="global-loading" v-if="checkLoading">
    <img src="@/assets/image/viewLoading.gif" class="img" />
  </div>
</template>
<script setup>
import { useMainStore } from '@/store/index'
import { filterCoin2 } from '@/utils/public'
import { getPayAddress } from '@/api/user'
import QRCode from 'qrcode'
const mainStore = useMainStore()
const centerDialogVisible = ref(false)
const centerDialogVisible1 = ref(false)
const coinList = ref()
const info = ref({})
const extraInfo = ref({
  coinName: '',
  coinAddress: ''
})
const extra = ref()
const handleCenterDialogVisible = () => {
  centerDialogVisible.value = true
}
const handleClose = (value) => {
  info.value = value
  if (value.isThird) {
    createQRImage(extraInfo.value.coinAddress)
  } else {
    if (value.extra.length > 0) {
      extra.value = value.extra
      extraInfo.value = { ...value.extra[0], rechargeMin: value.rechargeMin }
    } else {
      extra.value = [
        {
          coinName: value.title,
          coinAddress: value.address
        }
      ]
      extraInfo.value = {
        coinName: value.title,
        coinAddress: value.address,
        rechargeMin: value.rechargeMin
      }
    }
    createQRImage(extraInfo.value.coinAddress)
  }
  centerDialogVisible.value = false
}
const qrCodeImg = ref()
const checkLoading = ref(false)
const createQRImage = (address) => {
  if (address) {
    checkLoading.value = true
    QRCode.toDataURL(address, {
      version: '', // 二维码版本。如果未指定，将计算更合适的值。
      errorCorrectionLevel: 'H', // 纠错级别。low, medium, quartile, high , L, M, Q, H
      maskPattern: 2, // 二维码内边距，0、1、2、3、4、5、6、7
      margin: 2, // 边距
      scale: 3, // 每一个黑点的宽度
      height: 200, //二维码高度
      width: 200, //二维码宽度
      scal: 200,
      //圆角
      radius: 10,
      color: {
        dark: '#000', // 二维码背景颜色
        light: '#fff' // 二维码前景颜色
      }
    }).then((url) => {
      setTimeout(() => {
        qrCodeImg.value = url
        checkLoading.value = false
      }, 2000)
    })
  }
}
const tabList = ref([])
watch(
  () => info.value,
  async () => {
    if (info.value?.title == undefined) return []
    let CoinList = []
    let rechargeObj = []
    let ExtraList = []
    //获取指定充值
    rechargeObj = mainStore.getRechargeList.find((elem) => elem.coinName == info.value.title)
    //处理三方
    if (rechargeObj.useThird == true) {
      let ThirdList = []
      ThirdList = rechargeObj.thirdList.map((item) => {
        if (item.status == 1) {
          item.isThird = true
          CoinList.push({
            title: rechargeObj.coinName,
            coinName: item.name,
            coinAddress: null,
            isThird: true,
            code: item.code,
            coin: item.coin,
            icon: item.coin,
            currency: item.currency,
            useAddress: item.useAddress,
            symbol: rechargeObj.coinName
          })
          tabList.value = item
          return
        }
      })
      let obj = {
        address: CoinList[0].coinAddress,
        amount: 0,
        code: CoinList[0].code,
        coin: CoinList[0].coin,
        currency: CoinList[0].currency,
        useAddress: CoinList[0].useAddress,
        symbol: CoinList[0].symbol
      }
      let res = await getPayAddress(obj)
      extraInfo.value.coinAddress = res.msg
      createQRImage(res.msg)
      extraInfo.value.coinName = CoinList[0].coinName
      coinList.value = CoinList
      tabList.value = CoinList
    } else {
      //默认充值地址
      CoinList.push({
        title: rechargeObj.coinName,
        coinName: rechargeObj.coinName,
        coinAddress: rechargeObj.coinAddress,
        isThird: false
      })
      extraInfo.value = {
        coinName: rechargeObj.coinName,
        coinAddress: rechargeObj.coinAddress
      }
      //额外充值地址
      ExtraList = rechargeObj.extra.map((item) => {
        item.isThird = false
        CoinList.push({
          title: item.coinName,
          coinName: item.coinName,
          coinAddress: item.coinAddress,
          isThird: false
        })
        tabList.value = item
        return
      })
      tabList.value = CoinList
    }
  }
)

const getImageUrl = (name) => {
  return new URL(`../../../assets/image/${name}.png`, import.meta.url).href
}
onMounted(() => {
  let arr = mainStore.getRechargeList.map((item, index) => {
    return {
      icon: filterCoin2(item.coin),
      type: 0, //充值
      title: item.coinName,
      address: item.coinAddress,
      extra: item.extra,
      rechargeMin: item.rechargeMin
    }
  })
  info.value = arr[0]
  coinList.value = arr
  handleClose(info.value)
})
</script>
<style lang="scss" scoped>
@import './index.css';
:deep(.el-form-item__label) {
  vertical-align: middle;
  font-size: 0.32rem;
  font-weight: 400;
  padding-bottom: 0.267rem;
  line-height: 0.48rem;
  margin: 0;
  color: var(--font);
  float: none;
  box-sizing: border-box;
  display: inline-block;
  text-align: left;
}
:deep(.el-textarea__inner) {
  background: transparent;
  box-shadow: 0 0 0 1px #2b2b35;
}
:deep(.el-collapse-item__header) {
  transition: all 0.3s ease-in-out;
  border-radius: 0.2rem;
  padding: 0.067rem;
  border: none;
  background-color: var(--card);
  color: var(--onsurface);
  font-size: 0.24rem;
  height: 0.8rem;
  &:hover {
    background-color: var(--hoverBg);
  }
  &.is-active {
    border-radius: 0.2rem 0.2rem 0 0;
    background-color: var(--hoverBg);
  }
}
:deep(.el-collapse-item__wrap) {
  background-color: var(--hoverBg);
  border-radius: 0 0 0.2rem 0.2rem;
  padding: 0 0.4rem;
  border: none !important;
}
:deep(.el-collapse-item__content) {
  color: var(--remarkColor);
  font-size: 0.24rem;
  padding-bottom: 0.333rem;
  line-height: 1.7692307692;
}
.el--dialog__header {
  padding: 0.267rem !important;
  padding-bottom: 0.133rem !important;
  .el-dialog__title {
    line-height: 0.32rem !important;
    font-size: 0.24rem !important;
    color: #303133 !important;
  }
}
:deep(.el-dialog__body) {
  padding: 0.4rem 0.267rem;
  word-break: break-all;
}
.select-time-panel .title {
  width: 90%;
  margin: 0.333rem auto;
  border-radius: 0.16rem;
  padding: 0.4rem 0.267rem;
  background-color: #f4f6f8;
  color: gray;
  font-size: 0.227rem !important;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 0.401rem;
}
.select-time-panel .Currency li {
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0.133rem 0;
  font-size: 0.24rem;
  font-weight: 400;
  line-height: 0.4rem;
  display: flex;
  border: none;
  cursor: pointer;
}
.global-loading {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999999;
  position: fixed !important;
  width: 100vw;
  height: 100vh;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
