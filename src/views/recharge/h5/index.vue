<script setup>
import navigation from '@/component/h5/navigation/index.vue'
import { useMainStore } from '@/store/index'
import { filterCoin2 } from '@/utils/public'
import { getPayAddress } from '@/api/user'
import { ElNotification } from 'element-plus'
import { getRechargeList, getBonsList } from '@/api/account'
import { priceFormat } from '@/utils/decimal'
import { _timeFormat } from '@/utils/public'
import QRCode from 'qrcode'
import Copy from 'vue-clipboard3'
import router from '@/router/index.js'

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
const go = () => {
  router.push('/cashflow')
}
</script>

<template>
  <div class="oneCodes" style="position: relative; overflow: hidden">
    <navigation title="充币">
      <template #right>
        <i class="el-icon-s-order order" @click="go"></i>
      </template>
    </navigation>
    <div class="fin-topUp">
      <div class="onecode">
        <div class="QR-code">
          <div class="QR-code-boder">
            <div
              id="mobile-user-container"
              class="mobile-qrcode-container"
              style=""
              title="1E76MY2n1KUByqZjgSUfZBAD22hzarsu8f"
            >
              <canvas width="208" height="208" style="display: none"></canvas>
              <img alt="" style="display: block; width: 200px; height: 200px" :src="qrCodeImg" />
            </div>
          </div>
          <p>複製您的唯一地址或使用QR碼存款</p>
        </div>
        <div class="form">
          <ul>
            <li class="form-title">1.幣種</li>
            <li>
              <p style="display: flex" @click="handleCenterDialogVisible(1)">
                <span class="replaceSymbol" style="flex: 1">
                  <span class="ruleForm-coin">{{ info.title }}</span>
                </span>
                <i class="el-icon-caret-bottom"></i>
              </p>
            </li>
            <li class="form-title">2.網絡</li>
            <li>
              <p @click="handleCenterDialogVisible(2)">
                <span class="span-title">{{ extraInfo?.coinName }}</span>
                <i class="el-icon-caret-bottom" style="display: none"></i>
              </p>
            </li>
            <li class="form-title">3.地址</li>
            <li>
              <p>
                <span class="span-title">{{ extraInfo?.coinAddress }}</span>
                <i
                  @click="handleCopy"
                  slot="suffix"
                  class="el-input__icon el-icon-document-copy"
                ></i>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      @click="centerDialogVisible = false"
      v-if="centerDialogVisible"
      style="
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      "
    ></div>

    <div class="popList" :class="{ popListShow: centerDialogVisible }">
      <div>
        <h5
          style="
            line-height: 0.8rem;
            font-size: 0.373rem;
            font-weight: 400;
            padding: 10px 0.133rem;
            color: var(--mobilefont);
            border-bottom: 0.013rem solid #eee;
          "
        >
          {{ centerDialogVisibleTitle }}
        </h5>
        <div @click="centerDialogVisible = false">
          <i
            role="button"
            tabindex="0"
            class="van-icon van-icon-cross van-popup__close-icon van-popup__close-icon--top-right"
          ></i>
        </div>
      </div>
      <div
        class="title"
        style="
          width: 90%;
          margin: 0.333rem auto;
          border-radius: 0.16rem;
          padding: 0.4rem 0.267rem;
          background-color: #f4f6f8;
          color: grey;
          font-size: 0.32rem;
          font-weight: 400;
          letter-spacing: 0;
          line-height: 0.401rem;
        "
      >
        請注意，系統只會顯示此平台上支持的的網絡，若您通過其他網絡充值，您的資產可能會丟失。
      </div>

      <ul v-if="centerDialogVisibleValue === 1">
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
  </div>
</template>

<style scoped lang="scss">
@import './index.css';

.popListShow {
  bottom: 0 !important;
}

.popList {
  background: #ffffff;
  width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -100%;
  z-index: 9;
  transition: all 0.3s ease;
  padding-bottom: 30px;

  ul {
    li {
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      padding: 0.133rem 0.667rem;
      font-size: 0.347rem;
      font-weight: 400;
      line-height: 0.667rem;
      display: flex;
      align-items: center;

      .CoinIcon-s {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
