<script setup>
import navigation from '@/component/h5/navigation/index.vue'
import { _div, _mul, priceFormat } from '@/utils/decimal.js'
import { getLoanProductList, getLoan, getLoanOrderList } from '@/api/loan.js'
import { dict } from '@/api/common/index'
import { _timeFormat } from '@/utils/public'
import { dispatchCustomEvent } from '@/utils'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
const router = useRouter()
const form = ref({
  id: '',
  amount: ''
})
// 当前选择还款周期
const currentProduct = ref({})
// 当前商品
const productDetail = ref({})
const repaymentCycle = ref([])
//利息
const interest = computed(() => {
  let tempValue = 0
  if (form.value.amount && productDetail?.value.odds && productDetail?.value.cycleType) {
    tempValue = priceFormat(
      _div(
        _mul(_mul(form.value.amount, productDetail.value.odds), productDetail.value.cycleType),
        100
      ),
      2,
      'up'
    )
  }
  return tempValue
})
const dictList = ref()
const getDict = async () => {
  const res = await dict('t_repay_type')
  if (res.code == '200') {
    dictList.value = res.data
  }
}
const getProductList = async () => {
  const res = await getLoanProductList()
  if (res.code == '200') {
    repaymentCycle.value = res.rows.map((elem, index) => {
      return {
        ...elem,
        id: index,
        name: elem.cycleType, //周期
        value: elem.id,
        amountMin: elem.amountMin,
        amountMax: elem.amountMax,
        repayTypeLabel: dictList.value?.filter((item) => {
          return parseInt(item.dictValue) == elem.repayType
        })[0].dictLabel
      }
    })
    form.value.id = repaymentCycle.value[0].id
    selectorAction(repaymentCycle.value[0].id)
  }
}
const selectorAction = (item) => {
  productDetail.value = repaymentCycle.value.find((elem) => elem.id == item)
  currentProduct.value = item
}
const submit = () => {
  if (
    form.value.amount == '' ||
    form.value.amount > productDetail.value.amountMax ||
    form.value.amount < productDetail.value.amountMin
  ) {
    ElNotification({
      title: '借款金额不正确',
      type: 'error'
    })
    return
  }
  getLoan({
    proId: form.value.id,
    cycleType: productDetail.value.cycleType,
    amount: form.value.amount
  }).then((res) => {
    if (res.code == '200') {
      ElNotification({
        title: '申请成功',
        type: 'success'
      })
      setTimeout(() => {
        router.push('/')
      }, 500)
    } else {
      ElNotification({
        title: res.msg,
        type: 'error'
      })
    }
  })
}
const loanOrderList = ref([])
const getLoanOrderListFun = async () => {
  const res = await getLoanOrderList('?pageNum=1&pageSize=100000')
  if (res.code == '200') {
    loanOrderList.value = res.rows
  }
}
const statusName = (status) => {
  let temp = ''
  if (status == 0) {
    temp = '待审核'
  }
  if (status == 1) {
    temp = '审核通过'
  }
  if (status == 2) {
    temp = '审核失败'
  }
  if (status == 3) {
    temp = '已结清'
  }
  if (status == 4) {
    temp = '已逾期'
  }
  return temp
}
const getRepaymentAmount = computed(() => {
  return loanOrderList.value.reduce((acc, item) => {
    if (item.status != 3 && item.status != 0) {
      return acc + item.amount
    }
    return acc
  }, 0)
})
const repayTypeName = (repayType) => {
  return (
    dictList.value?.filter((item) => {
      return parseInt(item.dictValue) == repayType
    })[0]?.dictLabel || ''
  )
}
onMounted(async () => {
  await getDict()
  await getProductList()
  await getLoanOrderListFun()
})
</script>

<template>
  <navigation title="充币"></navigation>
  <div class="loAn" style="background-color: #151517">
    <div class="loAn-borrowable" style="border: none !important">
      <div class="loAn-borrowable-left" style="flex-wrap: wrap">
        <h6>信用借貸</h6>
        <h6>信用借貸靈活用，提高資金利用率</h6>
      </div>
      <img src="@/assets/image/loan.png" alt="" class="Credit-img" />
    </div>
    <ul class="loAn-introduce" style="border: none !important">
      <li>
        <i class="van-icon van-icon-success"></i>
        靈活借還
      </li>
      <li>
        <i class="van-icon van-icon-success"></i>
        快速成單
      </li>
      <li>
        <i class="van-icon van-icon-success"></i>
        安全保障
      </li>
    </ul>
    <div class="loAn-box">
      <div class="pledge" style="position: relative">
        <div class="loAn-amount">
          <div class="amount-borrowed">
            <h6>
              <span class="iconfont icon-send"></span>
              <p>可借金額</p>
            </h6>
            <span>{{ productDetail.amountMax }}</span>
          </div>
          <div class="to-returned">
            <h6>
              <span class="iconfont icon-send"></span>
              <p>待還金額</p>
            </h6>
            <span>{{ getRepaymentAmount }}</span>
          </div>
        </div>
        <div class="loan-jump">
          <div>
            <span class="iconfont icon-a-Action-Deposit-Dark1"></span>
            在借訂單
            <i class="van-icon van-icon-arrow"></i>
          </div>
          <div>
            <span class="iconfont icon-a-jiedai1"></span>
            借幣歷史
            <i class="van-icon van-icon-arrow"></i>
          </div>
        </div>
        <div class="pledge-content">

          <div class="amount">
            <h6>借贷产品</h6>
            <div class="el-input el-input--medium el-input--suffix">
              <el-select
                placeholder="请选择"
                size="large"
                v-model="form.id"
                @change="selectorAction"
              >
                <el-option
                  v-for="item in repaymentCycle"
                  :key="item.id"
                  :label="`${item.amountMin}-${item.amountMax} USDT`"
                  :value="item.id"
                />
              </el-select>
            </div>
          </div>
          <div class="amount" style="margin-top: 10px">
            <h6>借款金额</h6>
            <div class="el-input el-input--medium el-input--suffix">
              <input
                v-model="form.amount"
                type="number"
                autocomplete="off"
                placeholder="借款金额"
                class="el-input__inner"
              />

              <span class="el-input__suffix">
                <span class="el-input__suffix-inner">
                  <div>
                    <span class="symbol mr-0.5">
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
                    USDT
                  </div>
                </span>
              </span>
            </div>
          </div>
          <div class="time">
            <h6>借款期限</h6>
            <ul class="time-list">
              <li class="time-select">{{productDetail.name}} 天</li>
            </ul>
          </div>
          <ul class="rate">
            <li>
              <h6>日利率</h6>
              <h6>{{ productDetail.odds }}%</h6>
            </li>
            <li>
              <h6>利息</h6>
              <h6>{{ interest }}USDT</h6>
            </li>
            <li>
              <h6>还款方式</h6>
              <h6>{{ productDetail.repayTypeLabel }}</h6>
            </li>
            <li class="total-amountDue">
              <h6>放款机构</h6>
              <h6>{{ productDetail.repayOrg }}</h6>
            </li>
          </ul>
        </div>

        <button @click="submit" class="borrowing gold-color-btn">立即借币</button>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
@import './index.css';
:deep(.el-select__wrapper){
  background-color: transparent;
  border-radius: .293rem;
  border: .013rem solid #464e56;
  box-shadow: none;
  padding: .2rem;
}
:deep(.el-select__placeholder){
  color: #969696;
  font-size: .373rem;
  font-weight: 700;
}
</style>
