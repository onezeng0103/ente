<script setup>
import navigation from '@/component/h5/navigation/index.vue'
import router from '@/router/index.js'
import { useI18n } from 'vue-i18n'
import { showToast } from 'vant'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/store/index.js'
import { useUserStore } from '@/store/user'
import { filterCoin2 } from '@/utils/public'
import { withdrawSubmit, getWithdrawAddressList } from '@/api/account'
import { debounce } from 'lodash'
import { emailCode, mobileCode } from '@/api/user'
import { ElNotification } from 'element-plus'

const go = () => {
  router.push('/cashflow')
}
const { t } = useI18n()
const mainStore = useMainStore()
const showCode = computed(() => {
  return mainStore?.settingConfig?.WITHDRAWAL_SETTING?.checkCode || false
})
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const showBottom = ref(false)
const type = ref(1)
const info = ref({
  title: ''
})
const allAmount = ref()
const { asset } = storeToRefs(userStore)
const amount = computed(() => {
  let data = 0
  //查询余额
  for (let i = 0; i < asset.value.length; i++) {
    // 币种提现
    if (asset.value[i].type == 1 && filterCoin2(asset.value[i].symbol) == info.value?.icon) {
      data = asset.value[i].availableAmount
    }
  }
  return data
})
const address = ref()
const password = ref()
const allNum = () => {
  allAmount.value = Number(String(amount.value).split('.')[0])
}
// 阻止非数字键（只允许 0-9）
const onKeyPress = (e) => {
  const char = String.fromCharCode(e.which)
  if (!/^\d$/.test(char)) {
    e.preventDefault()
  }
}
const handleSelectCoin = () => {
  type.value = 2
  showBottom.value = true
}
// 倒计时
const code = ref('')
const handleClose = (value) => {
  if (value) {
    info.value = value
  }
  type.value = 1
  showBottom.value = false
}
const submit = () => {
  console.log(allAmount.value)
  if (
    allAmount.value == '' ||
    allAmount.value == null ||
    allAmount.value > amount.value ||
    allAmount.value <= 0
  ) {
    ElNotification({
      title: '请输入正确的提现数量',
      type: 'error'
    })
    return
  }
  let num = Number(allAmount.value)
  if (!num) {
    ElNotification({
      title: '请输填写提现数量',
      type: 'error'
    })
    return
  }
  if (num <= 0) {
    ElNotification({
      title: '提现数量不能小于0',
      type: 'error'
    })
    return
  }
  if (!address.value) {
    ElNotification({
      title: '请选择提现地址',
      type: 'error'
    })
    return
  }
  if (!password.value) {
    ElNotification({
      title: '请输入提现密码',
      type: 'error'
    })
    return
  }
  if (showCode.value) {
    if (!code.value) {
      ElNotification({
        title: '请输入验证码',
        type: 'error'
      })
      return
    }
  }
  let params = {
    amount: allAmount.value,
    coinType: info.value?.title,
    pwd: password.value,
    adress: address.value,
    coin: info.value?.icon,
    code: code.value
  }
  let str = `amount=${params.amount}&coinType=${params.coinType}&pwd=${encodeURIComponent(params.pwd)}&adress=${params.adress}&coin=${params.coin}&code=${params.code}`
  console.log(str)
  withdrawSubmit(str).then((res) => {
    if (res.code == '200') {
      ElNotification({
        title: '提币成功',
        type: 'success'
      })
      router.push('/')
    } else {
      ElNotification({
        title: res.msg,
        type: 'error'
      })
    }
  })
}
const addressList = ref([])
const showAddressBottom = ref(false)
const saveCacheAddressFn = () => {
  getWithdrawAddressList().then((res) => {
    if (res.data.length > 0) {
    } else {
      router.push('/withdrawDeposit')
    }
    addressList.value = res.data.map((item) => ({
      ...item,
      title: item.symbol.toUpperCase()
    }))
  })
}
const close = (item) => {
  address.value = item.address
  console.log(address.value, item)
  showAddressBottom.value = false
}
onMounted(() => {
  list.value = coinList.value
  if (userInfo.value.detail?.userTardPwd == null) {
    showToast(t('pleaseSetFundPassword'))
    setTimeout(() => {
      router.push('/fund-password')
    }, 800)
    return
  }
  saveCacheAddressFn()
})

//
const list = ref([])

const coinList = computed(() => {
  let list = []
  mainStore.getWithdrawList.forEach((item, index) => {
    if (item.status == '1') {
      let obj = {}
      obj['type'] = 1 //提现
      obj['ratio'] = item.ratio || '' //手续费
      obj['fee'] = item.fee //固定手续费
      // type:0数据货币，1银行卡
      obj['icon'] = item.rechargeType
      obj['title'] = item.rechargeName
      list.push(obj)
    }
  })
  return list
})
</script>

<template>
  <navigation title="提现">
    <template #right>
      <i class="el-icon-s-order order" @click="go"></i>
    </template>
  </navigation>
  <div class="withdraw-deposit">
    <div class="form">
      <div class="item_label">币种</div>
      <div
        class="form-item-div"
        style="background-color: #f4f6f8; margin-bottom: 20px"
        @click="handleSelectCoin"
      >
        <div class="l-item-div">
          <input
            class="ipt"
            type="text"
            v-model.trim="info.title"
            readonly
            placeholder="请选择提现币种"
          />
        </div>
        <i class="el-icon-caret-right"></i>
      </div>
      <div class="item_label">提现地址</div>
      <div
        class="form-item-div"
        style="background-color: #f4f6f8; margin-bottom: 20px"
        @click="showAddressBottom = true"
      >
        <div class="l-item-div">
          <input
            class="ipt"
            type="text"
            v-model.trim="address"
            readonly
            placeholder="请选择提现地址"
          />
        </div>
        <i class="el-icon-caret-right"></i>
      </div>
      <div class="item_label">提现数量</div>
      <div class="form-item-div" style="background-color: #f4f6f8; margin-bottom: 10px">
        <div class="l-item-div">
          <input
            class="ipt"
            type="number"
            inputmode="numeric"
            v-model.trim="allAmount"
            placeholder="请输入整数"
            @keypress="onKeyPress"
          />
        </div>
        <div class="all-money" style="font-size: 16px" @click="allNum">全部</div>
      </div>
      <div style="display: flex; justify-content: space-between">
        <div class="available">余额：{{ amount }} {{ info?.icon?.toUpperCase() }}</div>
        <div class="available" style="color: #999999">
          实际到账：{{
            Number(
              Number(allAmount || 0).toFixed(2) - Number((allAmount / info?.ratio || 0).toFixed(2))
            ).toFixed(2)
          }}
        </div>
      </div>
      <div class="item_label">提现密码</div>
      <div class="form-item-div" style="background-color: #f4f6f8; margin-bottom: 20px">
        <div class="l-item-div">
          <input class="ipt" type="password" v-model.trim="password" placeholder="请输入密码" />
        </div>
      </div>
      <div class="hint">
        <p>温馨提示:</p>
        <p>
          为确保资产安全，当您的账户安全策略发生变更或进行密码修改时，将暂时不能提现。账号重新登录后，需等待1小时后方可提领。
        </p>
        <p>请务必确认操作设备的安全，防止信息被窜改或泄露。</p>
      </div>
      <button
        @click="submit"
        type="button"
        class="el-button withdrawSubmit gold-color-btn ai-version-but el-button--default el-button--mini is-round"
      >
        <span>提现</span>
      </button>
    </div>
  </div>
  <van-popup v-model:show="showAddressBottom" position="bottom">
    <div class="drawings-bottom" style="width: 100%; padding: 0 17px 25px">
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
          请选择提现地址
        </h5>
        <div @click="showAddressBottom = false">
          <i
            role="button"
            tabindex="0"
            class="van-icon van-icon-cross van-popup__close-icon van-popup__close-icon--top-right"
          ></i>
        </div>
      </div>

      <div
        class="li-item"
        @click="close(item, index)"
        v-for="(item, index) in addressList"
        :key="index"
      >
        <div class="l-li-item items-center">
          <span class="Currency-name">{{ item?.address }}</span>
        </div>
        <div
          v-if="address == item?.address"
          class="van-radio__icon van-radio__icon--square van-radio__icon--checked"
        >
          <i
            class="van-icon van-icon-success"
            style="border-color: rgb(0, 0, 0); background-color: rgb(0, 0, 0)"
          ></i>
        </div>
      </div>
    </div>
  </van-popup>
  <van-popup v-model:show="showBottom" position="bottom">
    <div class="drawings-bottom" style="width: 100%; padding: 0 17px 25px">
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
          请选择提现币种
        </h5>
        <div @click="showBottom = false">
          <i
            role="button"
            tabindex="0"
            class="van-icon van-icon-cross van-popup__close-icon van-popup__close-icon--top-right"
          ></i>
        </div>
      </div>

      <div
        class="li-item"
        @click="handleClose(item, index)"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="l-li-item items-center">
          <span class="Currency-name">{{ item?.title?.toUpperCase() }}</span>
        </div>
        <div
          v-if="item.title === info.title"
          class="van-radio__icon van-radio__icon--square van-radio__icon--checked"
        >
          <i
            class="van-icon van-icon-success"
            style="border-color: rgb(0, 0, 0); background-color: rgb(0, 0, 0)"
          ></i>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<style scoped lang="scss">
@import './index.css';

.ipt {
  background-color: transparent;
  font-size: 14px;
  width: 100%;
  font-weight: 700;
}

.li-item {
  margin: 0.267rem 0;
  background: #fafafa;
  border-radius: 0.4rem;
  border: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0.267rem;
  align-items: center;

  .Currency-name {
    font-size: 14px;
  }
}

.withdraw-deposit {
  min-height: calc(100vh - 50px);
  background-color: #f5f6f8;

  .form {
    padding: 0.333rem 0.333rem;
    background-color: #ffffff;

    .available {
      padding: 0 0.133rem;
      font-size: 0.373rem;
      color: var(--inputcolor);
      word-wrap: break-word;
      letter-spacing: -0.2px;
      margin-bottom: 20px;
    }

    .item_label {
      text-align: left;
      font-size: 16px;
      font-weight: 500;
      color: var(--inputcolor);
      margin-bottom: 10px;
    }
  }
}
</style>
