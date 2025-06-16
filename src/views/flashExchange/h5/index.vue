<script setup>
import navigation from '@/component/h5/navigation/index.vue'
import { useI18n } from 'vue-i18n'
import { debounce } from 'lodash'
import { storeToRefs } from 'pinia'
import { showToast } from 'vant'
import { rate, toExchange, getTexChangeListApi } from '@/api/account'
import { useAccountStore } from '@/store/account/index'
import { useUserStore } from '@/store/user/index'
import { priceFormat } from '@/utils/decimal.js'
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
<template>
  <div class="conversion-index">
    <navigation title="闪兑"></navigation>

    <div class="conversion" style="background-color: #f4f6f8; min-height: 0">
      <div class="el-card is-always-shadow">
        <div class="el-card__body">
          <div class="conversion-icon">
            <form class="el-form demo-ruleForm">
              <div class="el-form-item is-required el-form-item--medium">
                <div class="el-form-item__content" style="display: block">
                  <p class="conversion-title">
                    <span>從</span>
                  </p>
                  <div class="box-border">
                    <div class="l-name">
                      <button
                        @click="showAction('from')"
                        type="button"
                        class="el-button el-button--default el-button--medium"
                      >
                        <span>
                          {{ list1Current?.coin?.toUpperCase() }}
                          <i class="el-icon-arrow-right el-icon--right"></i>
                        </span>
                      </button>
                    </div>
                    <div class="r-number">
                      <el-input v-model="fromNum" type="number" placeholder="请输入金额" />
                    </div>
<!--                    <div class="all"><span style="margin-right: 4px">全部</span></div>-->
                  </div>
                </div>
              </div>
              <div class="el-form-item is-required el-form-item--medium">
                <div class="el-form-item__content" style="display: block">
                  <p class="conversion-title">
                    <span>至</span>
                    <i class="iconfont icon-a-duihuan21" @click="jiaohuan"></i>
                  </p>
                  <div class="box-border">
                    <div class="l-name">
                      <button
                        @click="showAction('to')"
                        type="button"
                        class="el-button el-button--default el-button--medium"
                      >
                        <span>
                          {{ list2Current?.coin?.toUpperCase() }}
                          <i class="el-icon-arrow-right el-icon--right"></i>
                        </span>
                      </button>
                    </div>
                    <div class="r-number">
                      <el-input v-model="toNum" type="number" readonly placeholder="请输入金额" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="form">
            <button
              @click="submit"
              type="button"
              class="el-button submit gold-color-btn ai-version-but el-button--primary el-button--medium"
            >
              <span>兌換</span>
            </button>
            <p class="first-p">
              <span>手续费:0.05%</span>
              <span>
                兑换价格 1 {{ list1Current?.coin?.toUpperCase() }} = {{ curRate }}{{ list2Current?.coin?.toUpperCase() }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      @click="showBottom = false"
      v-if="showBottom"
      class="van-overlay"
      style="z-index: 2007"
    ></div>
    <div
      class="van-popup van-popup--round van-popup--bottom"
      style="
        height: 45%;
        z-index: 2002;
        transition: all 0.3s ease;
        align-items: normal;
        padding: 0 10px;
      "
      :style="{ bottom: showBottom ? '0' : '-100%' }"
    >
      <div>
        <h5
          style="
            line-height: 0.8rem;
            font-size: 0.373rem;
            font-weight: 400;
            padding: 10px;
            color: var(--mobilefont);
            border-bottom: 0.013rem solid #eee;
          "
        >
          请选择
        </h5>
        <div>
          <i
            role="button"
            tabindex="0"
            class="van-icon van-icon-cross van-popup__close-icon van-popup__close-icon--top-right"
          ></i>
        </div>
      </div>

      <div class="ul-table">
        <div class="li-item" v-for="(item, index) in action" @click="handleClose(item)">
          <div style="display: flex; align-items: center; font-size: 0.467rem; font-weight: 700">
            <img :src="item.icon" alt="" style="width: 25px; height: 25px" />
            <span class="Currency-name">{{ item.coin?.toUpperCase() }}</span>
          </div>
          <div
            v-if="info.coin == item.coin"
            class="van-radio__icon van-radio__icon--square van-radio__icon--checked"
          >
            <i
              class="van-icon van-icon-success"
              style="border-color: rgb(0, 0, 0); background-color: rgb(0, 0, 0)"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './index.css';

.ul-table {
  padding: 15px;

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

    .Currency-name {
      align-self: center;
      padding: 0 0.133rem;
    }
  }
}

:deep(.el-input__inner) {
  //height: 100%;
  border: none;
  border-radius: calc(infinity * 0.013rem);
  text-align: right;
  font-size: 14px;
  font-weight: 700;
  border: 0;
  padding: 0;
  box-shadow: none;
}

:deep(.el-input__wrapper) {
  border: 0;
  box-shadow: none;
  background-color: transparent;
  //border-radius: 0.107rem;
}
</style>
