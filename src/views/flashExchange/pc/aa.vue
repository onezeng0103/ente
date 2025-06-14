<template>
  <div class="flashExchange">
    <TopBar title="闪兑" />
    <div class="flashExchange-tip">
      <div class="flashExchange-tip-icon">
        <CmImg name="bell" style="width: 20px; height: 20px" />
      </div>
      {{ t('flashExchangeTip') }}
    </div>
    <div class="flashExchange-content">
      <div class="flashExchange-content-item">
        <div class="flashExchange-content-item-left">
          <div class="flashExchange-content-item-left-text">{{ t('consume') }}</div>
          <div class="flashExchange-content-item-left-info" @click="showAction('from')">
            <div class="flashExchange-content-item-left-info-logo">
              <img :src="list1Current?.icon" alt="" />
            </div>
            <div class="flashExchange-content-item-left-info-icon">
              {{ list1Current?.coin?.toUpperCase() }}
              <svg
                t="1748507517138"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3291"
                width="15"
                height="15"
                style="margin-left: 5px"
              >
                <path
                  d="M862.752 326.016H161.248l349.696 371.936L862.72 326.016z"
                  fill="var(--third-background)"
                  p-id="3292"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="flashExchange-content-item-right">
          <input v-model="fromNum" type="number" :placeholder="t('transferQuantity')" />
        </div>
      </div>
      <div class="flashExchange-content-exchange">
        <CmImg name="exchange2" style="width: 40px; height: 40px" @click="jiaohuan" />
      </div>
      <div class="flashExchange-content-item">
        <div class="flashExchange-content-item-left">
          <div class="flashExchange-content-item-left-text">{{ t('get') }}</div>
          <div class="flashExchange-content-item-left-info" @click="showAction('to')">
            <div class="flashExchange-content-item-left-info-logo">
              <img :src="list2Current?.icon" alt="" />
            </div>
            <div class="flashExchange-content-item-left-info-icon">
              {{ list2Current?.coin?.toUpperCase() }}
              <svg
                t="1748507517138"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3291"
                width="15"
                height="15"
                style="margin-left: 5px"
              >
                <path
                  d="M862.752 326.016H161.248l349.696 371.936L862.72 326.016z"
                  fill="var(--third-background)"
                  p-id="3292"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="flashExchange-content-item-right">
          <input type="text" v-model="toNum" readonly :placeholder="t('transferQuantity')" />
        </div>
      </div>
      <div class="flashExchange-content-line"></div>
      <div class="flashExchange-content-into">
        <div class="flashExchange-content-into-item">
          {{ t('fee') }}
          <span>0.05%</span>
        </div>
        <div class="flashExchange-content-into-item">
          {{ t('exchangePrice') }}
          <span>
            1 {{ list1Current?.coin?.toUpperCase() }} = {{ curRate }}
            {{ list2Current?.coin?.toUpperCase() }}
          </span>
        </div>
      </div>
      <div class="flashExchange-content-btn" @click="submit">{{ t('startExchange') }}</div>
      <div class="flashExchange-content-list">
        <div class="flashExchange-content-list-title">{{ t('recentExchangeRecord') }}</div>
        <div
          class="flashExchange-content-list-item"
          v-for="(item, index) in texChangeList"
          :key="index"
        >
          <div>
            {{ item?.fromCoin?.toUpperCase() }}
            <svg
              t="1747913222179"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="7992"
              width="10"
              height="10"
              style="margin: 0 5px"
            >
              <path
                d="M1024 512a42.666667 42.666667 0 0 0-42.666667-42.666667H42.666667a42.666667 42.666667 0 1 0 0 85.333334h938.666666a42.666667 42.666667 0 0 0 42.666667-42.666667z"
                p-id="7993"
                fill="#999999"
              ></path>
              <path
                d="M1011.498667 542.165333a42.666667 42.666667 0 0 0 0-60.330666l-256-256a42.666667 42.666667 0 1 0-60.330667 60.330666L921.002667 512l-225.834667 225.834667a42.666667 42.666667 0 0 0 60.330667 60.330666l256-256z"
                p-id="7994"
                fill="#999999"
              ></path>
            </svg>
            {{ item.toCoin?.toUpperCase() }}
          </div>
          <div class="flashExchange-content-list-item-right">
            <div>+1</div>
            <div>{{ _numberWithCommas(item?.amount) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CurrencyList :showBottom="showBottom" @close="handleClose" :list="action" :info="info" />
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import { debounce } from 'lodash'
import { storeToRefs } from 'pinia'
import { showToast } from 'vant'
import { rate, toExchange, getTexChangeListApi } from '@/api/account'
import { useAccountStore } from '@/store/account/index'
import { useUserStore } from '@/store/user/index'
import { priceFormat } from '@/utils/decimal.js'
import CurrencyList from './component/currencyList.vue'
import { _numberWithCommas } from '@/utils/public'
const { t } = useI18n()
const accountStore = useAccountStore()
const userStore = useUserStore()
userStore.getUserInfo()
// 用户余额信息
const { asset } = storeToRefs(userStore)
const { swapCoinList } = storeToRefs(accountStore)
const showBottom = ref(false) //sheet面板隐显
const action = ref({}) //面板数据(flag:from上，to下)
const flag = ref('from') //面板展示数据from/to
const jiaohuanFlag = ref(true) //交换按钮（true初始状态）
const list1 = ref([]) //币种列表
const list2 = ref([])
const list1Current = ref({}) //显示的币种列表
const list2Current = ref({})
const list1Coin = ref(0) //显示的币种
const list2Coin = ref(0)
// 当前币种的余额（一定取最新的）
const availableAmount = computed(() => {
  let data = ''
  asset.value.forEach((item, index) => {
    if (item.symbol == list1Current.value.coin && item.type == 1) {
      data = item.availableAmount
    }
  })
  return data
})
const texChangeList = ref([])
const getTexChangeList = async () => {
  const res = await getTexChangeListApi()
  texChangeList.value = res.rows
}
const init = async () => {
  await accountStore.getSwapCoinList()
  let template1 = []
  asset.value.forEach((item, index) => {
    let obj = {}
    if (item.type == '1') {
      obj['id'] == index + 1
      obj['amount'] = item.availableAmount
      if (item.symbol == 'usdt') {
        obj['coin'] = 'usdt'
        obj['icon'] = item.loge
        // console.log('USDT图标',item.loge)
        template1.unshift(obj)
      }
      if (item.symbol != 'usdt') {
        obj['coin'] = item.symbol?.replace('usdt', '').trim()
        obj['icon'] = item.loge
        // console.log('非USDT图标',item.loge)
        template1.push(obj)
      }
    }
  })
  // **************************
  // 兑换成什么列表添加金额
  swapCoinList.value.forEach((item) => {
    template1.forEach((items) => {
      if (items.coin == item.coin) {
        item['amount'] = items.amount
      }
    })
  })
  list1.value = template1

  // console.log('列表2',swapCoinList.value)

  if (['cdex'].includes(__config._APP_ENV)) {
    list1Current.value = template1.find((item, idx) => {
      return item.coin === 'btc'
    })
  } else {
    list1Current.value = template1[0]
  }
  list1Coin.value = list1Current.value?.coin
  list2.value = swapCoinList.value?.filter((item) => {
    return item.coin != list1Current.value?.coin
  })
  list2Current.value = swapCoinList.value?.filter((item) => {
    return item.coin != list1Current.value?.coin
  })[0]
  list2Coin.value = list2Current.value?.coin
}
const curRate = ref(0)
// 获取汇率
const getRate = (from, to) => {
  from = filterCoin(from)
  to = filterCoin(to)
  rate(from, to).then((res) => {
    if (res.code == '200') {
      let resFrom = res.data[`${from}`]
      let resTo = res.data[`${to}`]
      if (resFrom == null) {
        resFrom = 1
      }
      if (resTo == null) {
        resTo = 1
      }
      curRate.value = priceFormat(resFrom / resTo, 8)
    }
  })
}
//面板中对上面货币更改
watch([list1Coin], ([newValue], [oldValue]) => {
  if (jiaohuanFlag.value) {
    //上面默认显示的货币
    list1.value.forEach((item) => {
      if (item.coin == newValue) {
        list1Current.value = item
      }
    })
    //下面货币列表
    list2.value = swapCoinList.value.filter((item) => {
      return item.coin != list1Current.value.coin
    })
    // 下面货币列表排他
    if (newValue == list2Coin.value) {
      list2Current.value = swapCoinList.value.filter((item) => {
        return item.coin != list1Current.value.coin
      })[0]
      list2Coin.value = list2Current.value.coin
    }
  } else {
    list1.value.forEach((item) => {
      if (item.coin == newValue) {
        list1Current.value = item
      }
    })
  }
})
watch([list2Coin], ([newValue], [oldValue]) => {
  if (jiaohuanFlag.value) {
    // 下面默认显示的货币
    list2.value.forEach((item) => {
      if (item.coin == newValue) {
        list2Current.value = item
      }
    })
  } else {
    list2.value.forEach((item) => {
      if (item.coin == newValue) {
        list2Current.value = item
      }
    })
    list1.value = swapCoinList.value.filter((item) => {
      return item.coin != list2Current.value.coin
    })
    if (newValue == list2Coin.value) {
      list1Current.value = swapCoinList.value.filter((item) => {
        return item.coin != list2Current.value.coin
      })[0]
      list1Coin.value = list2Current.value.coin
    }
  }
})
// 监听默认显示货币，修改汇率
watch(
  [list1Current, list2Current],
  (newValue) => {
    getRate(newValue[0]?.coin, newValue[1]?.coin)
  },
  {
    deep: true
  }
)
// 点击交换按钮（交换上下货币列表，当前显示）
const jiaohuan = () => {
  jiaohuanFlag.value = !jiaohuanFlag.value
  let tempList = list1.value
  list1.value = list2.value
  list2.value = tempList
  let tempCurrent = list1Current.value
  list1Current.value = list2Current.value
  list2Current.value = tempCurrent
}

const filterCoin = (item) => {
  return item
}

/**
 * 兑换金额
 */
const fromNum = ref('')
const toNum = ref()
watch([fromNum, curRate], () => {
  toNum.value = priceFormat(fromNum.value * curRate.value, 8)
})
onMounted(() => {
  init()
  getTexChangeList()
})
const info = ref()
// 触发sheet面板事件(item=from/to,面板数据不同)
const showAction = (item) => {
  if (item == 'from') {
    action.value = list1.value
    info.value = list1Current.value
  } else if (item == 'to') {
    action.value = list2.value
    info.value = list2Current.value
  }
  flag.value = item
  showBottom.value = true
}
// sheet面板内容选择（根据flag标识，修改当前货币）
const handleClose = (value) => {
  showBottom.value = false
  if (flag.value == 'from') {
    list1Coin.value = value.coin
  } else if (flag.value == 'to') {
    list2Coin.value = value.coin
  }
}
const submitForm = debounce(() => {
  if (fromNum.value <= 0) {
    showToast(t('exchangeAmountCannotBeLessThan0'))
    return
  }
  // 兑换金额不能超过可用金
  if (fromNum.value > availableAmount.value) {
    showToast(t('exchangeAmountCannotBeGreaterThanAvailableAmount'))
    return
  }
  let params = {
    fromSymbol: filterCoin(list1Current.value?.coin),
    toSymbol: filterCoin(list2Current.value?.coin),
    total: fromNum.value
  }
  toExchange(params).then((res) => {
    if (res.code == '200') {
      showToast(t('exchangeSuccess'))
      setTimeout(() => {
        userStore.getUserInfo()
        getTexChangeList()

        // init()
      }, 1000)
    } else {
      showToast(res.msg)
    }
  })
}, 500)
const submit = () => {
  submitForm()
}
</script>
<style lang="scss" scoped>
.flashExchange {
  padding: 44px 15px 0px;
  &-tip {
    font-size: 14px;
    color: var(--primary-color);
    margin-top: 10px;
    display: flex;
    align-items: center;
    &-icon {
      margin-right: 5px;
    }
  }
  &-content {
    margin-top: 27px;
    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-left {
        display: flex;
        align-items: center;
        justify-content: center;
        &-text {
          font-size: 12px;
          color: var(--third-color);
          writing-mode: vertical-rl;
        }
        &-info {
          margin-left: 15px;
          &-logo {
            margin-left: 20px;
            width: 29px;
            height: 29px;
            border-radius: 50%;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          &-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 5px;
            color: var(--primary-color);
            font-size: 16px;
          }
        }
      }
      &-right {
        input {
          width: 100px;
        }
      }
    }
    &-line {
      border: 1px solid var(--sixth-border);
      margin: 10px 0;
    }
    &-exchange {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0;
    }
    &-into {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      color: var(--third-color);
      &-item {
        padding: 3px 4px;
        background: var(--secondary-background);
        font-size: 12px;
        border-radius: 7px;
        span {
          color: var(--secondary-color);
        }
      }
    }
    &-btn {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--third-background);
      border-radius: 24px 24px 24px 24px;
      height: 43px;
      width: 100%;
      color: var(--fourth-color);
      font-size: 18px;
      font-weight: 600;
    }
    &-list {
      margin-top: 30px;
      &-title {
        font-size: 14px;
        color: var(--primary-color);
      }
      &-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
        &-right {
          display: flex;
          align-items: end;
          justify-content: center;
          flex-direction: column;
          & > div:first-child {
            color: var(--secondary-color);
          }
          & > div:last-child {
            color: var(--third-color);
          }
        }
      }
    }
  }
}
</style>
