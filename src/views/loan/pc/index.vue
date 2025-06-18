<template>
  <div class="h-50px" style="height: 50px"></div>
  <div class="router-container">
    <div class="outer-layer-container">
      <div class="loAn">
        <div class="loAn-borrowable">
          <div>
            <div class="loAn-borrowable-left">
              <h6>信用借贷</h6>
              <h6>信用借贷灵活用，提高资金利用率</h6>
              <ul class="loAn-introduce">
                <li>
                  <i class="van-icon van-icon-success"></i>
                  灵活借还
                </li>
                <li>
                  <i class="van-icon van-icon-success"></i>
                  快速成单
                </li>
                <li>
                  <i class="van-icon van-icon-success"></i>
                  安全保障
                </li>
              </ul>
            </div>
            <img src="@/assets/image/loan.png" alt="" />
          </div>
        </div>
        <div class="borrow_order_again-title">
          <span></span>
          <span>
            <i class="iconfont icon-a-jiedai1"></i>
            历史订单
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
        <div class="loAn-header">
          <div class="r-from">
            <div class="r-from-end">
              <div class="form-loan">
                <p class="form-labe">借贷产品</p>
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
                <p class="form-labe loanTerm">借款期限(天)</p>
                <el-input placeholder="请选择" readonly size="large" v-model="productDetail.name" />
                <p class="form-labe loanTerm">借款金额(USDT)</p>
                <el-input placeholder="请输入借款金额" size="large" v-model="form.amount" />
                <button
                  @click="submit"
                  style="margin-top: 20px"
                  type="button"
                  class="el-button borrowing el-button--default el-button--medium"
                >
                  <span>立即借币</span>
                </button>
              </div>
            </div>
          </div>
          <div class="l-info">
            <div class="loAn-amount">
              <div class="amount-borrowed">
                <h6>
                  <span class="iconfont icon-send"></span>
                  <p>可借金額</p>
                </h6>
                <span>{{ productDetail.amountMax }} USDT</span>
              </div>
              <div class="to-returned">
                <h6>
                  <span class="iconfont icon-send"></span>
                  <p>待还金额</p>
                </h6>
                <span>{{ getRepaymentAmount }} USDT</span>
              </div>
            </div>
            <div class="d-info">
              <ul>
                <li>
                  <span>日利息</span>
                  <span>{{ productDetail.odds }}%</span>
                </li>
                <li>
                  <span>利息</span>
                  <span>{{ interest }} USDT</span>
                </li>
                <li>
                  <span>还款方式</span>
                  <span>{{ productDetail.repayTypeLabel }}</span>
                </li>
                <li>
                  <span>放款机构</span>
                  <span>{{ productDetail.repayOrg }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="borrow_order_again box-bg">
          <div class="proportion-box">
            <div class="borrow_order_again-title">
              <span>在借订单</span>
              <span></span>
            </div>
            <div class="borrow_order_again-box" v-if="loanOrderList.length > 0">
              <div class="borrow_order_again_content">
                <div class="content_list">
                  <div
                    class="content_list_item"
                    v-for="item in loanOrderList"
                    :key="item.id"
                    v-show="item.status != 3"
                  >
                    <div class="cell">
                      <h6>借款金额</h6>
                      <h6>{{ item.amount }}</h6>
                    </div>
                    <div class="cell">
                      <h6>状态</h6>
                      <h6>{{ statusName(item.status) }}</h6>
                    </div>
                    <div class="cell">
                      <h6>还款周期</h6>
                      <h6>{{ item.cycleType }}</h6>
                    </div>
                    <div class="cell">
                      <h6>日利率</h6>
                      <h6>{{ item.rate }}%</h6>
                    </div>
                    <div class="cell">
                      <h6>利息</h6>
                      <h6>
                        {{ _mul(_mul(_mul(item.amount, item.rate), item.cycleType), 0.01) }}
                      </h6>
                    </div>
                    <div class="cell">
                      <h6>还款方式</h6>
                      <h6>{{ repayTypeName(item.tloadProduct?.repayType) }}</h6>
                    </div>
                    <div class="cell" v-if="!(item.status === 0 || item.status === 2)">
                      <h6>还款时间</h6>
                      <h6>
                        {{ _timeFormat(item.params?.finalRepayTime, 'HH:mm MM/DD', true) }}
                      </h6>
                    </div>
                    <div class="cell">
                      <h6>放款机构</h6>
                      <h6>{{ item.tloadProduct?.repayOrg }}</h6>
                    </div>
                    <div class="cell">
                      <h6></h6>
                      <h6>
                        <button
                          @click="dispatchCustomEvent('event_serviceChange')"
                          v-if="item.status == 1 || item.status == 4"
                          type="button"
                          class="el-button borrowing el-button--default el-button--medium"
                        >
                          <span>联系客服</span>
                        </button>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <NoData v-else />
          </div>
        </div>
        <div class="loan-bottom box-bg">
          <h6>借贷流程</h6>
          <ul class="loan-box proportion-box">
            <li>
              <img src="@/assets/image/Register.svg" alt="" />
              <h6>注册帐号</h6>
            </li>
            <li class="ellipses"></li>
            <li>
              <img src="@/assets/image/ide.svg" alt="" />
              <h6>验证身份</h6>
            </li>
            <li class="ellipses"></li>
            <li>
              <img src="@/assets/image/loan.svg" alt="" />
              <h6>开始借贷</h6>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
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
<style lang="scss" scoped>
@import './index.css';
:deep(.el-select__wrapper) {
  border-radius: 0.133rem;
  height: 0.747rem;
  box-shadow: 0.013rem solid #dcdfe6 !important;
}
:deep(.el-select__wrapper.is-focused) {
  box-shadow: 0 0 0 1px #dcdfe6 inset !important;
}
:deep(.el-input__wrapper) {
  text-align: center;
  color: #000;
  border-radius: 0.133rem;
  background-color: #f7f7f7;
  box-shadow: none;
  font-size: 0.227rem;
  font-weight: 400;
  height: 0.747rem;
}
</style>
