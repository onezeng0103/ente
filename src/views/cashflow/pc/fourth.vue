<template>
  <div class="FundingAccount" style="animation: 0.3s ease 0s 1 normal none running fadeIn">
    <div class="Haccount">
      <div class="t-Haccount">
        帐户余额 &nbsp;
        <i class="iconfont icon-a-yincang11" @click="showNum = !showNum" v-if="showNum"></i>
        <i class="iconfont icon-a-yanjing_yincang1" @click="showNum = !showNum" v-else></i>
      </div>
      <div class="c-Haccount">
        <div class="c-Haccount-l">
          <h6>
            <span v-if="showNum">{{ _numberWithCommas(platformSum) }}</span>
            <span v-if="showNum" class="currency-name">USDT</span>
            <span v-else>********</span>
          </h6>
        </div>
        <div class="c-Haccount-r">
          <span @click="router.push('/recharge')">
            <i class="iconfont icon-a-chongzhi1"></i>
            充币
          </span>
          <span @click="router.push('/withdraw')">
            <i class="iconfont icon-tixian"></i>
            提现
          </span>
          <span @click="router.push('/flashExchange')">
            <i class="iconfont icon-shandui"></i>
            闪兑
          </span>
          <span @click="router.push('/exchange')">
            <i class="iconfont icon-huazhuan"></i>
            划转
          </span>
        </div>
      </div>
    </div>
    <div class="currency-table">
      <p class="title">持有</p>
      <div class="table-content light" style="position: relative">
        <el-table :data="getPlatform" :border="false">
          <el-table-column label="币种" align="center">
            <template #default="scope">
              <div class="flex items-center">
                <img :src="scope.row.loge" alt="" style="width: 20px; height: 20px" />
                <span style="margin-left: 10px">{{ scope.row.title }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="可用" align="center">
            <template #default="scope">
              <div>{{ amountFormat(scope.row.keyong) }}</div>
            </template>
          </el-table-column>
          <el-table-column label="占用" align="center">
            <template #default="scope">
              <div>{{ amountFormat(scope.row.zhanyong, 4) }}</div>
            </template>
          </el-table-column>
          <el-table-column label="折合(USDT)" align="center">
            <template #default="scope">
              <div>{{ amountFormat(scope.row.zhehe) }}</div>
            </template>
          </el-table-column>
          <template #empty>
            <NoData />
          </template>
        </el-table>
      </div>
    </div>
    <div class="More-records flex justify-center mt-1"></div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user/index'
import { priceFormat } from '@/utils/decimal.js'
import { _add } from '@/utils/decimal'
import { DIFF_FREEZE_ASSETS } from '@/config/index'
import { _hide, _numberWithCommas } from '@/utils/public.js'
import { storageDict } from '@/config/dict'
const router = useRouter()
const userStore = useUserStore()
const { asset } = storeToRefs(userStore)
const getDetail = (item) => {
  let obj = {}
  obj['keyong'] = priceFormat(item.availableAmount)
  // rxce冻结金额=占用+冻结
  if (DIFF_FREEZE_ASSETS.includes(import.meta.env.VITE_APP_ENV)) {
    let temp = 0
    if (freezeList.value) {
      freezeList.value.forEach((itm, inx) => {
        if (itm.coin == item.symbol && item.type == 1) {
          temp = itm.price
        }
      })
    }
    obj['zhanyong'] = priceFormat(_add(item.occupiedAmount, temp))
  } else {
    obj['zhanyong'] = priceFormat(item.occupiedAmount)
  }
  obj['zhehe'] = priceFormat(item.exchageAmount)
  if (item.symbol == 'usdt') {
    obj['icon'] = 'usdt'
    obj['loge'] = item.loge
    obj['title'] = 'USDT'
  } else {
    obj['loge'] = item.loge
    obj['title'] = item.symbol?.replace('usdt', '').trim().toLocaleUpperCase()
    obj['icon'] = item.symbol?.replace('usdt', '').trim()
  }
  return obj
}
//获取平台资产信息
const getPlatform = computed(() => {
  let list = []
  asset.value.forEach((item) => {
    if (item.type == 2) {
      list.push(getDetail(item))
    }
  })
  return list
})
const showNum = ref(localStorage.getItem(storageDict.EYES) == 'true' || true)
//计算平台余额
const platformSum = computed(() => {
  let sum = 0
  for (let i = 0; i < getPlatform.value.length; i++) {
    sum += Number(getPlatform.value[i].zhehe)
  }
  return priceFormat(sum)
})
const amountFormat = (amount, decimal = 0) => {
  let tempVal = priceFormat(amount, decimal)
  if (showNum.value) {
    tempVal = _numberWithCommas(tempVal)
  } else {
    tempVal = _hide(tempVal)
  }
  return tempVal
}
</script>
<style lang="scss" scoped>
@import './index.css';
.FundingAccount .currency-table {
  margin-top: 0.267rem;
  padding: 0.133rem 0.267rem;
  border-radius: 0.267rem;
  border: 0.013rem solid #ebebeb;
}

.FundingAccount .currency-table .positive {
  color: #31bd65 !important;
}

.FundingAccount .currency-table .negative {
  color: #f2495e !important;
}

.FundingAccount .currency-table .title {
  font-size: 0.32rem;
  font-weight: 400;
  color: #000;
}

.FundingAccount .currency-table .el-table td.el-table__cell,
.FundingAccount .currency-table .el-table th.el-table__cell.is-leaf {
  border: none;
}

.FundingAccount .currency-table .el-table--border:after,
.FundingAccount .currency-table .el-table--group:after,
.FundingAccount .currency-table .el-table:before {
  background-color: transparent;
}

.FundingAccount .currency-table .el-table__body-wrapper,
.FundingAccount .currency-table .table-content.light .el-table {
  border: 0;
}

.FundingAccount .currency-table .el-table,
.FundingAccount .currency-table .el-table__expanded-cell {
  color: #222;
}

.FundingAccount .currency-table .el-table__empty-block {
  background-color: #fcfcfd;
  border-right: 0;
  border-left: 0;
  border-bottom: 0;
}

.FundingAccount .currency-table .el-table th.el-table__cell .cell,
.FundingAccount .currency-table .el-table tr .cell {
  color: #8c8c8c;
  overflow: visible;
}

.FundingAccount .currency-table .el-table tbody tr:hover > td,
.FundingAccount .currency-table .el-table tbody tr > td {
  background-color: var(--table);
}

.FundingAccount .currency-table .el-table tbody tr > td .cell {
  color: #000;
  font-weight: 700;
  overflow: visible;
}

.FundingAccount .currency-table .el-table tbody tr > td .symbol {
  display: inline-block;
  vertical-align: middle;
}

.FundingAccount .currency-table .el-table tbody tr > td .operate:hover {
  cursor: pointer;
}

.FundingAccount .currency-table .el-table tbody tr > td .top-up {
  color: #0ecb81;
}

.FundingAccount .currency-table .el-table tbody tr > td .Trading-Pairs {
  color: #919191;
}

.FundingAccount .currency-table .el-table tbody tr > td .redemption {
  border-radius: calc(infinity * 0.013rem);
  background-color: #01bd8d;
  color: #fff;
  padding: 0.067rem 0.133rem;
  margin: 0 0.067rem 0 0;
}

.FundingAccount .currency-table .el-table tbody tr > td .Details {
  border-radius: calc(infinity * 0.013rem);
  background-color: transparent;
  border: 0.013rem solid #ccc;
  padding: 0.067rem 0.133rem;
}

.FundingAccount .currency-table .el-table tbody tr > td .current {
  background-color: #bcff2f;
  border-radius: 0.067rem;
  padding: 0.067rem;
  margin: 0 0.067rem;
}

.FundingAccount .currency-table .el-table tbody tr > td .regular {
  background-color: #f19eff;
  border-radius: 0.067rem;
  padding: 0.067rem;
  margin: 0 0.067rem;
}

.FundingAccount .currency-table .el-table tbody tr > td .income {
  color: #008e5b;
}

.FundingAccount .currency-table .el-table tbody tr > td .Buy {
  border-radius: calc(infinity * 0.013rem);
  padding: 0.067rem 0.133rem;
  font-weight: 400;
  border: 0.013rem solid #000;
}

.FundingAccount .currency-table .el-table tbody tr > td .Buy:hover {
  cursor: pointer;
}

.FundingAccount .currency-table .el-table__empty-block {
  background-color: var(--table);
}

.FundingAccount .currency-table {
  margin-top: 0.267rem;
  padding: 0.133rem 0.267rem;
  border-radius: 0.267rem;
  border: 0.013rem solid #ebebeb;
}

.FundingAccount .currency-table .positive {
  color: #31bd65 !important;
}

.FundingAccount .currency-table .negative {
  color: #f2495e !important;
}

.FundingAccount .currency-table .title {
  font-size: 0.32rem;
  font-weight: 400;
  color: #000;
}

.FundingAccount .currency-table .el-table td.el-table__cell,
.FundingAccount .currency-table .el-table th.el-table__cell.is-leaf {
  border: none;
}

.FundingAccount .currency-table .el-table--border:after,
.FundingAccount .currency-table .el-table--group:after,
.FundingAccount .currency-table .el-table:before {
  background-color: transparent;
}

.FundingAccount .currency-table .el-table__body-wrapper,
.FundingAccount .currency-table .table-content.light .el-table {
  border: 0;
}

.FundingAccount .currency-table .el-table,
.FundingAccount .currency-table .el-table__expanded-cell {
  color: #222;
}

.FundingAccount .currency-table .el-table__empty-block {
  background-color: #fcfcfd;
  border-right: 0;
  border-left: 0;
  border-bottom: 0;
}

.FundingAccount .currency-table .el-table th.el-table__cell .cell,
.FundingAccount .currency-table .el-table tr .cell {
  color: #8c8c8c;
  overflow: visible;
}

.FundingAccount .currency-table .el-table tbody tr:hover > td,
.FundingAccount .currency-table .el-table tbody tr > td {
  background-color: var(--table);
}

.FundingAccount .currency-table .el-table tbody tr > td .cell {
  color: #000;
  font-weight: 700;
  overflow: visible;
}

.FundingAccount .currency-table .el-table tbody tr > td .symbol {
  display: inline-block;
  vertical-align: middle;
}

.FundingAccount .currency-table .el-table tbody tr > td .operate:hover {
  cursor: pointer;
}

.FundingAccount .currency-table .el-table tbody tr > td .top-up {
  color: #0ecb81;
}

.FundingAccount .currency-table .el-table tbody tr > td .Trading-Pairs {
  color: #919191;
}

.FundingAccount .currency-table .el-table tbody tr > td .redemption {
  border-radius: calc(infinity * 0.013rem);
  background-color: #01bd8d;
  color: #fff;
  padding: 0.067rem 0.133rem;
  margin: 0 0.067rem 0 0;
}

.FundingAccount .currency-table .el-table tbody tr > td .Details {
  border-radius: calc(infinity * 0.013rem);
  background-color: transparent;
  border: 0.013rem solid #ccc;
  padding: 0.067rem 0.133rem;
}

.FundingAccount .currency-table .el-table tbody tr > td .current {
  background-color: #bcff2f;
  border-radius: 0.067rem;
  padding: 0.067rem;
  margin: 0 0.067rem;
}

.FundingAccount .currency-table .el-table tbody tr > td .regular {
  background-color: #f19eff;
  border-radius: 0.067rem;
  padding: 0.067rem;
  margin: 0 0.067rem;
}

.FundingAccount .currency-table .el-table tbody tr > td .income {
  color: #008e5b;
}

.FundingAccount .currency-table .el-table tbody tr > td .Buy {
  border-radius: calc(infinity * 0.013rem);
  padding: 0.067rem 0.133rem;
  font-weight: 400;
  border: 0.013rem solid #000;
}

.FundingAccount .currency-table .el-table tbody tr > td .Buy:hover {
  cursor: pointer;
}

.FundingAccount .currency-table .el-table__empty-block {
  background-color: var(--table);
}
</style>
