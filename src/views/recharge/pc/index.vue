<template>
  <div class="h-50px" style="height: 50px"></div>
  <div class="router-container" v-checkLoading="checkLoading">
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
                                <div class="Currency-item" @click="handleCenterDialogVisible(1)">
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
                                <div class="Currency-item" @click="handleCenterDialogVisible(2)">
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
                                      v-model="extraInfo.coinAddress"
                                      readonly
                                      style="
                                        min-height: 34px;
                                        text-align: left;
                                        width: 100%;
                                        margin-top: 0.25rem;
                                      "
                                      :rows="3"
                                      type="textarea"
                                    />
                                    <div class="copy-btn" @click="handleCopy">
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
          <el-table
            :data="rowList"
            :border="false"
            :header-cell-style="{
              backgroundColor: '#212121',
              color: '#979797',
              fontSize: '0.187rem',
              fontWeight: '400',
              border: 'none'
            }"
          >
            <el-table-column label="交易类型">
              <template #default="scope">
                <span v-if="scope.row.orderType == null || scope.row.orderType == 1">充值成功</span>
                <span v-if="scope.row.orderType == 2">从华盛达账户划入</span>
              </template>
            </el-table-column>
            <el-table-column label="交易币种">
              <template #default="scope">
                <span>{{ scope?.row?.symbol?.toUpperCase() || scope?.row?.type }}</span>
              </template>
            </el-table-column>
            <el-table-column label="交易金额">
              <template #default="scope">
                <span>+{{ priceFormat(scope.row.amount) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="交易手续费">
              <template #default="scope">
                <span>{{ priceFormat(scope.row.thirdFee) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="交易日期">
              <template #default="scope">
                <span>{{ _timeFormat(scope.row.createTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template #default="scope">
                <span v-if="scope.row.status == 0">审核中</span>
                <span v-if="scope.row.status == 1">成功</span>
                <span v-if="scope.row.status == 2">失败</span>
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
  <el-dialog
    v-model="centerDialogVisible"
    :title="centerDialogVisibleTitle"
    style="padding: 0; margin-top: 15vh; width: 40%"
  >
    <div class="select-time-panel" style="background-color: transparent">
      <div class="title">
        请注意，系统只会显示此平台上支持的的网络，若您通过其他网络充值，您的资产可能会丢失。
      </div>
      <ul class="Currency" v-if="centerDialogVisibleValue === 1">
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
      <ul class="Currency" v-else>
        <li v-for="(item, index) in tabList" :key="index" @click="handleNetworkClose(item)">
          <span class="CoinIcon-s">
            <span class="symbol"></span>
            &nbsp; {{ item.coinName }}
          </span>
          <i v-if="extraInfo?.coinName === item.coinName" class="el-icon-check"></i>
        </li>
      </ul>
    </div>
  </el-dialog>
</template>
<script setup>
import { useMainStore } from '@/store/index'
import { filterCoin2 } from '@/utils/public'
import { getPayAddress } from '@/api/user'
import { ElNotification } from 'element-plus'
import { getRechargeList, getBonsList } from '@/api/account'
import { priceFormat } from '@/utils/decimal'
import { _timeFormat } from '@/utils/public'
import QRCode from 'qrcode'
import Copy from 'vue-clipboard3'
const { toClipboard } = Copy()
const mainStore = useMainStore()
const centerDialogVisible = ref(false)
const centerDialogVisibleValue = ref(1)
const centerDialogVisibleTitle = ref('')
const coinList = ref()
const info = ref({})
const extraInfo = ref({
  coinName: '',
  coinAddress: ''
})
const tabList = ref([])
const handleCenterDialogVisible = (value) => {
  centerDialogVisibleValue.value = value
  if (value === 1) {
    centerDialogVisibleTitle.value = '请选择币种'
  } else {
    centerDialogVisibleTitle.value = '请选择充值网络'
  }
  centerDialogVisible.value = true
}
const handleCopy = async () => {
  try {
    await toClipboard(`${extraInfo.value.coinAddress}`)
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
const handleClose = (value) => {
  info.value = value
  if (value.isThird) {
    createQRImage(extraInfo.value.coinAddress)
  } else {
    if (value.extra.length > 0) {
      tabList.value = value.extra
      extraInfo.value = { ...value.extra[0], rechargeMin: value.rechargeMin }
    } else {
      tabList.value = [
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
const handleNetworkClose = (value) => {
  if (value) {
    if (value.isThird) {
      let obj = {
        address: tabList.value[0].coinAddress,
        amount: 0,
        code: tabList.value[0].code,
        coin: tabList.value[0].coin,
        currency: tabList.value[0].currency,
        useAddress: tabList.value[0].useAddress,
        symbol: tabList.value[0].symbol
      }
      getPayAddress(obj).then((res) => {
        extraInfo.value.coinAddress = res.msg
        extraInfo.value.coinName = value.coinName
        createQRImage(extraInfo.value.coinAddress)
      })
      extraInfo.value = {}
    } else {
      extraInfo.value = value
    }
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
const rowList = ref([])
const getRechargeListFun = async () => {
  let str = 'pageNum=1&pageSize=100000'
  let res1 = await getRechargeList(str)
  let arr1 = []
  if (res1.code == 200) {
    arr1 = res1.rows.map((item) => ({
      ...item
    }))
  } else {
    rowList.value = []
  }
  let res2 = await getBonsList(str)
  let arr2 = res2.rows
    .map((item) => ({
      ...item,
      orderType: 2
    }))
    .filter((item) => {
      return item.giveType == 0 && item.async == 1
    })
  rowList.value = [...arr1, ...arr2]
    .sort((a, b) => {
      return new Date(b.params.createTime) - new Date(a.params.createTime)
    })
    .slice(0, 10)
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
  getRechargeListFun()
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
.table-empty {
  margin: 2.667rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.el-table {
  background-color: transparent;
}
.el-table:before {
  display: none;
}
:deep(.el-table tr) {
  background-color: transparent !important;
  border: none;
}
:deep(.el-table td.el-table__cell) {
  border: none;
}
:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  background-color: transparent !important;
}
:deep(.el-table__row:hover) {
  background-color: #212121 !important;
  color: #fff !important;
}
:deep(.el-table--fit .el-table__inner-wrapper:before) {
  display: none;
}
</style>
