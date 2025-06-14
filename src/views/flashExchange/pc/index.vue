<template>
  <div class="h-50px" style="height: 50px"></div>
  <div class="router-container">
    <div class="outer-layer-container">
      <div class="conversion" style="padding: 0 0 2rem 0">
        <div class="h-conversion">
          <div>
            <span>闪兑</span>
            <span>历史订单</span>
          </div>
        </div>
        <div class="box-conversion">
          <div class="t-conversion">
            <div class="l-conversion-title">
              <h5>只需几个步骤即可轻松 闪兑</h5>
              <p>支援比特币、以太币、泰达币、Solana 等热门数位货币</p>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANYAAADWCAYAAACt43wuAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAO5SURBVHgB7dcxbhtHGEDhYSRaChAgadxZVZDCbgIfwo17+z6+gg/lOxhSISCwigAuIkOCSEpkyAS+gR6ggb8P4Gw7mN3H/XcxJvLp06efr6+vfxsT2O/z7/fv3z8MfkjHAyZxcXFx9uzZs1/HE7fZbNbCYhpHe+v1+mRM4KcBPDphQUBYEBAWBIQFAWFBQFgQEBYEhAUBYUFAWBAQFgSEBQFhQUBYEBAWBIQFAWFBQFgQEBYEhAUBYUFAWBAQFgSEBQFhQUBYEBAWBIQFAWFBQFgQEBYEhAUBYUFAWBAQFgSEBQFhQUBYEDg+LO/evTsaE/j8+fPuxYsXt2MCz58/X8xwrq9evdp9+PBhO3hU/4W1P9zlmMB6vX548+bNP2MCHz9+PHn79u1iPHGXl5eHqNZjAnd3d9/GBO7v7x+OB0zi5cuXX/eXr2MCvrEgICwICAsCwoKAsCAgLAgICwLCgoCwICAsCAgLAsKCgLAgICwICAsCwoKAsCAgLAgICwLCgoCwICAsCAgLAsKCgLAgICwICAsCwoKAsCAgLAgICwLCgoCwICAsCAgLAsKCgLAgICwICAsCwoLA4rDsdrvFmMBi8f92xwTOz89/X61WJ+OJ22w2t69fv/5rzGE7Jrn/x4dl/8BOsdmZbLfbX5bL5ZMPa/+nerj3s0wu2zEJoyAEhAUBYUFAWBAQFgSEBQFhQUBYEBAWBIQFAWFBQFgQEBYEhAUBYUFAWBAQFgSEBQFhQUBYEBAWBIQFAWFBQFgQEBYEhAUBYUFAWBAQFgSEBQFhQUBYEBAWBIQFAWFBQFgQEBYEhAUBYUFAWBA4HhPZ7XZHV1dXf4wJ3NzcnK5Wq+vxxG02m9v9ZTfmsRgTmGKT352fn5+cnp7+Oebw5ezs7MvgMR2NSaYsoyAEhAUBYUFAWBAQFgSEBQFhQUBYEBAWBIQFAWFBQFgQEBYEhAUBYUFAWBAQFgSEBQFhQUBYEBAWBIQFAWFBQFgQEBYEhAUBYUFAWBAQFgSEBQFhQUBYEBAWBIQFAWFBQFgQEBYEhAUBYUFAWBA4HpN5eHj4NiawXC5Xgx/WYlA5TAMznO9u/9uOOUzzvE73xprILGHNEtXBbkzCNxYEhAUBYUFAWBAQFgSEBQFhQUBYEBAWBIQFAWFBQFgQEBYEhAUBYUFAWBAQFgSEBQFhQUBYEBAWBIQFAWFBQFgQEBYEhAUBYUFAWBAQFgSEBQFhQUBYEBAWBIQFAWFBQFgQEBYEhAUBYUFAWBAQFgBz+BdKjnKkSpdOcgAAAABJRU5ErkJggg=="
                alt=""
              />
            </div>
            <div class="r-conversion">
              <div class="conversion-box">
                <el-form
                  :model="form"
                  :hide-required-asterisk="true"
                  size="large"
                  label-width="auto"
                >
                  <el-form-item prop="fromNum">
                    <div class="input-box" style="width: 100%">
                      <div class="l-input">
                        <p>从</p>
                        <el-input v-model="form.fromNum" placeholder="请输入金额" />
                      </div>
                      <div class="r-select">
                        <el-select
                          placeholder="请选择"
                          popper-class="conversion-box"
                          v-model="form.list1Current"
                          @change="handleClose"
                          @visible-change="showAction('from')"
                        >
                          <template #prefix>
                            <img
                              :src="list1Current?.icon"
                              alt=""
                              style="width: 0.24rem; height: 0.24rem"
                            />
                          </template>
                          <el-option
                            v-for="item in action"
                            :key="item.id"
                            :label="item.coin?.toUpperCase()"
                            :value="item.coin"
                          >
                            <template #default>
                              <div class="conversion-box-item">
                                <img :src="item.icon" alt="" />
                                <span>{{ item.coin?.toUpperCase() }}</span>
                              </div>
                            </template>
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <i @click="jiaohuan" class="iconfont icon-a-duihuan21 bt-conversion"></i>
                  </el-form-item>
                  <el-form-item prop="toNum">
                    <div class="input-box" style="width: 100%">
                      <div class="l-input">
                        <p>至</p>
                        <el-input v-model="form.toNum" placeholder="请输入金额" />
                      </div>
                      <div class="r-select">
                        <el-select
                          v-model="form.list2Current"
                          placeholder="请选择"
                          @visible-change="showAction('to')"
                          @change="handleClose"
                        >
                          <template #prefix>
                            <img
                              :src="list2Current?.icon"
                              alt=""
                              style="width: 0.24rem; height: 0.24rem"
                            />
                          </template>
                          <el-option
                            v-for="item in action"
                            :key="item.id"
                            :label="item.coin?.toUpperCase()"
                            :value="item.coin"
                          >
                            <template #default>
                              <div class="conversion-box-item">
                                <img :src="item.icon" alt="" />
                                <span>{{ item.coin?.toUpperCase() }}</span>
                              </div>
                            </template>
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </el-form-item>
                  <div class="money">
                    <div>手续费:0.05%</div>
                    <div>
                      兑换价格 1 {{ list1Current?.coin?.toUpperCase() }} = {{ curRate
                      }}{{ list2Current?.coin?.toUpperCase() }}
                    </div>
                  </div>
                  <el-form-item>
                    <button
                      @click="submitForm"
                      type="button"
                      class="el-button bt-exchange ai-version-but el-button--default el-button--medium"
                    >
                      <span>兑换</span>
                    </button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="c-step">
            <h6>闪兑流程</h6>
            <div class="t-img">
              <div>
                <img
                  src="data:image/png;base64,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"
                  alt=""
                />
              </div>
              <div class="dashed-line"></div>
              <div>
                <img
                  src="data:image/png;base64,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"
                  alt=""
                />
              </div>
              <div class="dashed-line"></div>
              <div>
                <img
                  src="data:image/png;base64,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"
                  alt=""
                />
              </div>
            </div>
            <div class="d-title">
              <div class="d-title-c">
                <div>注册帐号</div>
                <div>验证身份</div>
                <div>开始兑换</div>
              </div>
            </div>
          </div>
          <div class="b-title">
            <div class="l-title">
              <h6>
                <span class="symbol">
                  <span>
                    <svg
                      fill="none"
                      height="32"
                      viewBox="0 0 32 32"
                      width="32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m32 16c0 8.8366-7.1634 16-16 16-8.83656 0-16-7.1634-16-16 0-8.83656 7.16344-16 16-16 8.8366 0 16 7.16344 16 16z"
                        fill="#009393"
                      ></path>
                      <path
                        clip-rule="evenodd"
                        d="m9.79135 8h12.67175c.3024 0 .5817.16175.7325.42416l3.6918 6.42464c.1914.3332.1346.7537-.1385 1.0239l-10.1618 10.0537c-.3292.3257-.8587.3257-1.1879 0l-10.14808-10.0402c-.27943-.2764-.33175-.7092-.12627-1.0445l3.94625-6.43815c.15369-.25074.42641-.40355.72025-.40355zm11.03565 2.8684v1.8026h-3.6097v1.2499c2.5352.1335 4.4373.6821 4.4514 1.3396l-.0001 1.3707c-.0141.6575-1.9161 1.2061-4.4513 1.3396v3.0673h-2.3969v-3.0673c-2.5352-.1335-4.4373-.6821-4.4514-1.3396l.0001-1.3707c.0141-.6575 1.9161-1.2061 4.4513-1.3396v-1.2499h-3.6097v-1.8026zm-4.8081 6.1608c2.7054 0 4.9668-.4639 5.5202-1.0833-.4693-.5253-2.1668-.9388-4.3218-1.0523v1.3086c-.3862.0203-.7872.0311-1.1984.0311-.4113 0-.8122-.0108-1.1985-.0311v-1.3086c-2.155.1135-3.8525.527-4.3218 1.0523.5534.6194 2.8147 1.0833 5.5203 1.0833z"
                        fill="#fff"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </span>
                什么是 USDT?
              </h6>
              <p>
                USDT 最初被称为 Realcoin，Tether(简称 USDT)，于 2014 年由 Brock Pierce、Reeve
                Collins 和 Craig Sellars 联合推出。 USDT
                是一种基于以太坊的稳定币，被普遍认为是与美元挂钩的数位货币。
              </p>
              <p>
                USDT使用户能够在波动的数位货币交易市场中以法币式的稳定性进行交易。
                用户可以使用USDT购买并出售或交易数位货币，而无需担心典型数位资产的价格波动。
              </p>
              <p>
                此外，USDT是一个多链资产。
                它可以在主要的区块链上使用，例如:EthereumSolana、Tron、Algorand、Avalanche、Bitcoin
                Cash 的 Simple Ledger Protocol(SLP)、EOS、Liquid Network、Omni等。
              </p>
              <p>
                USDT的价格稳定机制使其成为数位货币交易市场中流行的首选稳定币，让交易者有一种更便捷的方式进行数位资产交易，并无需担心因价格而导致价值波动。
                目前，所有主要数位货币都与USDT 进行了交易。 因此，拥有
                USDT，您就拥有了较高流动性交易。
              </p>
            </div>
            <div class="r-img">
              <img src="@/assets/image/duihuan.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { debounce } from 'lodash'
import { storeToRefs } from 'pinia'
import { rate, toExchange, getTexChangeListApi } from '@/api/account'
import { useAccountStore } from '@/store/account/index'
import { useUserStore } from '@/store/user/index'
import { priceFormat } from '@/utils/decimal.js'
import { _numberWithCommas } from '@/utils/public'
import { ElNotification } from 'element-plus'
const router = useRouter()
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
const form = ref({
  fromNum: '',
  list1Current: '',
  toNum: '',
  list2Current: ''
})
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
        template1.unshift(obj)
      }
      if (item.symbol != 'usdt') {
        obj['coin'] = item.symbol?.replace('usdt', '').trim()
        obj['icon'] = item.loge
        template1.push(obj)
      }
    }
  })
  swapCoinList.value.forEach((item) => {
    template1.forEach((items) => {
      if (items.coin == item.coin) {
        item['amount'] = items.amount
      }
    })
  })
  list1.value = template1
  if (['cdex'].includes(__config._APP_ENV)) {
    list1Current.value = template1.find((item, idx) => {
      return item.coin === 'btc'
    })
    form.value.list1Current = template1
      .find((item, idx) => {
        return item.coin === 'btc'
      })
      .coin.toUpperCase()
  } else {
    list1Current.value = template1[0]
    form.value.list1Current = template1[0].coin.toUpperCase()
  }
  list1Coin.value = list1Current.value?.coin
  list2.value = swapCoinList.value?.filter((item) => {
    return item.coin != list1Current.value?.coin
  })
  list2Current.value = swapCoinList.value?.filter((item) => {
    return item.coin != list1Current.value?.coin
  })[0]
  form.value.list2Current = swapCoinList.value
    ?.filter((item) => {
      return item.coin != list1Current.value?.coin
    })[0]
    .coin.toUpperCase()

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
watch([fromNum, curRate], () => {
  form.value.toNum = priceFormat(fromNum.value * curRate.value, 8)
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
  let obj = action.value.find((item) => {
    return item.coin == value
  })
  showBottom.value = false
  if (flag.value == 'from') {
    list1Coin.value = obj.coin
  } else if (flag.value == 'to') {
    list2Coin.value = obj.coin
  }
}
const submitForm = debounce(() => {
  if (form.value.fromNum <= 0) {
    ElNotification({
      title: '兑换金额不能小于0',
      type: 'error'
    })
    return
  }
  if (form.value.fromNum > availableAmount.value) {
    ElNotification({
      title: '兑换金额不能超过可用金额兑换金额不能超过可用金额',
      type: 'error'
    })
    return
  }
  let params = {
    fromSymbol: filterCoin(list1Current.value?.coin),
    toSymbol: filterCoin(list2Current.value?.coin),
    total: form.value.fromNum
  }
  toExchange(params).then((res) => {
    if (res.code == '200') {
      ElNotification({
        title: '兑换成功',
        type: 'success'
      })
      setTimeout(() => {
        userStore.getUserInfo()
        router.push('/')
      }, 1000)
    } else {
      ElNotification({
        title: res.msg,
        type: 'error'
      })
    }
  })
}, 500)
</script>
<style lang="scss" scoped>
@import './index.css';
.conversion-box-item {
  height: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  img {
    width: 0.32rem;
  }
}
:deep(.el-input__inner) {
  border: 0;
  padding: 0;
  font-size: 0.24rem;
  font-weight: 700;
  box-shadow: none;
}
:deep(.el-input__wrapper) {
  border: 0;
  padding: 0;
  font-size: 0.24rem;
  font-weight: 700;
  box-shadow: none;
}
:deep(.el-select__wrapper) {
  border: 0;
  height: 0.6rem;
  box-shadow: none;
  border-radius: 0.107rem;
  background: #f7f7f7;
}
</style>
