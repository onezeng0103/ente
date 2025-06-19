<template>
  <div class="Overview" style="animation: 0.3s ease 0s 1 normal none running fadeIn">
    <div class="h-Overview">
      <div class="Haccount">
        <div class="t-Haccount">
          帐户余额 &nbsp;

          <i class="iconfont icon-a-yincang11" @click="isEye = !isEye" v-if="isEye"></i>
          <i class="iconfont icon-a-yanjing_yincang1" @click="isEye = !isEye" v-else></i>
        </div>
        <div class="c-Haccount">
          <div class="c-Haccount-l">
            <h6>
              <span v-if="isEye">{{ _numberWithCommas(allSum) }}</span>
              <span v-if="isEye" class="currency-name">USDT</span>
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
    </div>
    <div class="c-Overview">
      <div class="c-Overview-l">
        <p class="title">资产分布</p>
        <div>
          <div class="table-content light" style="position: relative">
            <div
              class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition el-table--medium"
              style="width: 100%"
            >
              <div class="el-table__header-wrapper">
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  class="el-table__header"
                  style="width: 687px"
                >
                  <thead class="has-gutter">
                    <tr class="">
                      <th
                        colspan="1"
                        rowspan="1"
                        class="el-table_7_column_33 is-left is-leaf el-table__cell"
                        style="
                          background-color: transparent;
                          color: rgb(0, 0, 0);
                          font-size: 16px;
                          font-weight: 400;
                        "
                      >
                        <div class="cell">
                          <span class="el-tooltip" aria-describedby="el-tooltip-9322" tabindex="0">
                            钱包
                          </span>
                        </div>
                      </th>
                      <th
                        colspan="1"
                        rowspan="1"
                        class="el-table_7_column_34 is-center is-leaf el-table__cell"
                        style="
                          background-color: transparent;
                          color: rgb(0, 0, 0);
                          font-size: 16px;
                          font-weight: 400;
                        "
                      >
                        <div class="cell">
                          <span class="el-tooltip" aria-describedby="el-tooltip-6070" tabindex="0">
                            账户余额
                          </span>
                        </div>
                      </th>
                      <th
                        colspan="1"
                        rowspan="1"
                        class="el-table_7_column_35 is-right is-leaf el-table__cell"
                        style="
                          background-color: transparent;
                          color: rgb(0, 0, 0);
                          font-size: 16px;
                          font-weight: 400;
                        "
                      >
                        <div class="cell">
                          <span class="el-tooltip" aria-describedby="el-tooltip-4998" tabindex="0">
                            操作
                          </span>
                        </div>
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
                  style="width: 687px"
                >
                  <tbody>
                    <tr class="el-table__row">
                      <td
                        rowspan="1"
                        colspan="1"
                        class="el-table_7_column_33 is-left el-table__cell"
                      >
                        <div class="cell el-tooltip" style="width: 227px">理财资产</div>
                      </td>
                      <td
                        rowspan="1"
                        colspan="1"
                        class="el-table_7_column_34 is-center el-table__cell"
                      >
                        <div class="cell el-tooltip" style="width: 227px">
                          <span v-if="isEye">{{ _numberWithCommas(financSum) }}</span>
                          <span v-else>********</span>
                        </div>
                      </td>
                      <td
                        rowspan="1"
                        colspan="1"
                        class="el-table_7_column_35 is-right el-table__cell"
                      >
                        <div class="cell el-tooltip" style="width: 227px">
                          <span class="fbutton">
                            <span class="top-up" @click="router.push('/recharge')">充币</span>
                            /
                            <span @click="router.push('/exchange')">划转</span>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr class="el-table__row">
                      <td
                        rowspan="1"
                        colspan="1"
                        class="el-table_7_column_33 is-left el-table__cell"
                      >
                        <div class="cell el-tooltip" style="width: 227px">合约资产</div>
                      </td>
                      <td
                        rowspan="1"
                        colspan="1"
                        class="el-table_7_column_34 is-center el-table__cell"
                      >
                        <div class="cell el-tooltip" style="width: 227px">
                          <span v-if="isEye">{{ _numberWithCommas(contractSum) }}</span>
                          <span v-else>********</span>
                        </div>
                      </td>
                      <td
                        rowspan="1"
                        colspan="1"
                        class="el-table_7_column_35 is-right el-table__cell"
                      >
                        <div class="cell el-tooltip" style="width: 227px">
                          <span class="fbutton">
                            <span class="top-up" @click="router.push('/recharge')">充币</span>
                            /
                            <span @click="router.push('/exchange')">划转</span>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr class="el-table__row">
                      <td
                        rowspan="1"
                        colspan="1"
                        class="el-table_7_column_33 is-left el-table__cell"
                      >
                        <div class="cell el-tooltip" style="width: 227px">可用余额</div>
                      </td>
                      <td
                        rowspan="1"
                        colspan="1"
                        class="el-table_7_column_34 is-center el-table__cell"
                      >
                        <div class="cell el-tooltip" style="width: 227px">
                          <span v-if="isEye">{{ _numberWithCommas(platformSum) }}</span>
                          <span v-else>********</span>
                        </div>
                      </td>
                      <td
                        rowspan="1"
                        colspan="1"
                        class="el-table_7_column_35 is-right el-table__cell"
                      >
                        <div class="cell el-tooltip" style="width: 227px">
                          <span class="fbutton">
                            <span class="top-up" @click="router.push('/recharge')">充币</span>
                            /
                            <span @click="router.push('/exchange')">划转</span>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr class="el-table__row">
                      <td
                        rowspan="1"
                        colspan="1"
                        class="el-table_7_column_33 is-left el-table__cell"
                      >
                        <div class="cell el-tooltip" style="width: 227px">锁定金额</div>
                      </td>
                      <td
                        rowspan="1"
                        colspan="1"
                        class="el-table_7_column_34 is-center el-table__cell"
                      >
                        <div class="cell el-tooltip" style="width: 227px">
                          <span v-if="isEye">
                            {{ _numberWithCommas(zhanyong) }}
                          </span>
                          <span v-else>********</span>
                        </div>
                      </td>
                      <td
                        rowspan="1"
                        colspan="1"
                        class="el-table_7_column_35 is-right el-table__cell"
                      >
                        <div class="cell el-tooltip" style="width: 227px">
                          <span class="fbutton">
                            <span class="top-up" @click="router.push('/recharge')">充币</span>
                            /
                            <span @click="router.push('/exchange')">划转</span>
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="c-Overview-r">
        <p class="title">分布</p>
        <div ref="containerRef" class="e-charts"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from '@/store/user/index'
import { _numberWithCommas } from '@/utils/public'
import { _add } from '@/utils/decimal'
import { priceFormat } from '@/utils/decimal.js'
import { getFinanceAmountApi } from '@/api/common/index.js'
import { useRouter } from 'vue-router'
import Highcharts from 'highcharts/highstock'
const router = useRouter()
const userStore = useUserStore()
const isEye = ref(true)
// 用户余额信息
const { asset } = storeToRefs(userStore)
const getDetail = (item) => {
  let obj = {}
  obj['keyong'] = priceFormat(item.availableAmount)
  obj['zhanyong'] = priceFormat(item.occupiedAmount)

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
    if (item.type == 1) {
      list.push(getDetail(item))
    }
  })

  return list
})
//计算平台余额
const platformSum = computed(() => {
  let sum = 0
  for (let i = 0; i < getPlatform.value.length; i++) {
    sum += Number(getPlatform.value[i].zhehe)
  }
  return priceFormat(sum)
})
//获取理财资产信息
const getFinanc = computed(() => {
  let list = []
  asset.value.forEach((item) => {
    if (item.type == 2) {
      list.push(getDetail(item))
    }
  })
  return list
})
//计算理财余额
const financSum = computed(() => {
  let sum = 0
  for (let i = 0; i < getFinanc.value.length; i++) {
    sum += Number(getFinanc.value[i].zhehe)
  }
  return priceFormat(sum)
})
//获取合约资产信息
const getContarct = computed(() => {
  let list = []
  asset.value.forEach((item) => {
    if (item.type == 3) {
      list.push(getDetail(item))
    }
  })
  return list
})
//计算合约余额
const contractSum = computed(() => {
  let sum = 0
  for (let i = 0; i < getContarct.value.length; i++) {
    sum += Number(getContarct.value[i].zhehe)
  }
  return priceFormat(sum)
})
const zhanyong = ref()
// 计算所有余额
const allSum = computed(() => {
  return priceFormat(
    Number(platformSum.value) + Number(financSum.value) + Number(contractSum.value)
  )
})
const containerRef = useTemplateRef('containerRef')
let chartInstance = null
const init = () => {
  chartInstance = Highcharts.chart(containerRef.value, {
    chart: {
      type: 'pie', // 使用饼图实现轮廓效果
      backgroundColor: 'transparent', // 背景设置透明
      marginTop: -50,
      marginLeft: 120,
      marginRight: 120,
      marginBottom: 150
    },
    title: {
      text: null // 不需要标题
    },
    plotOptions: {
      pie: {
        allowPointSelect: false,
        cursor: 'pointer',
        dataLabels: { enabled: false },
        showInLegend: true,
        innerSize: '80%'
      }
    },
    tooltip: {
      enabled: false
    },
    legend: {
      layout: 'vertical', // 垂直排列
      align: 'center', // 水平居中
      verticalAlign: 'bottom', // 位于底部
      y: -50,
      itemMarginBottom: 10, // 每项之间的垂直间距
      symbolRadius: 6,
      symbolHeight: 12,
      itemStyle: {
        fontWeight: 'bold',
        fontSize: '14px'
      },
      useHTML: true,
      labelFormatter: function () {
        return `<span style="margin-right: 100px;">${this.name}</span><b>${this.percentage.toFixed(2)}%</b>`
      }
    },
    colors: ['#45dcd0', '#2a6af1', '#002fd1', '#f2495e'],
    series: [
      {
        colorByPoint: true,
        data: [
          { name: '理财资产', y: Number(financSum.value) },
          { name: '合约资产', y: Number(contractSum.value) },
          { name: '可用余额', y: Number(platformSum.value) },
          { name: '锁定金额', y: Number(zhanyong.value) }
        ]
      }
    ],
    credits: {
      enabled: false // 隐藏 Highcharts 水印
    }
  })
}
onMounted(() => {
  getFinanceAmountApi().then((res) => {
    zhanyong.value = priceFormat(res.data.financial + res.data.pledge)
    init()
  })
  window.addEventListener('resize', () => {
    init()
  })
})
</script>
<style lang="scss" scoped>
@import './index.css';
.Overview .c-Overview {
  margin-top: 0.267rem;
  display: flex;
  justify-content: space-between;
}

.Overview .c-Overview .c-Overview-l {
  border: 0.013rem solid #ebebeb;
  border-radius: 0.267rem;
  width: 55%;
  padding: 0.133rem 0.2rem;
}

.Overview .c-Overview .c-Overview-l .title {
  font-size: 0.32rem;
  font-weight: 400;
  color: #000;
  padding: 0.133rem 0;
}

.Overview .c-Overview .c-Overview-l .el-table__row {
  height: 1.067rem;
}

.Overview .c-Overview .c-Overview-l .el-table td.el-table__cell,
.Overview .c-Overview .c-Overview-l .el-table th.el-table__cell.is-leaf {
  border: none;
}

.Overview .c-Overview .c-Overview-l .el-table--border:after,
.Overview .c-Overview .c-Overview-l .el-table--group:after,
.Overview .c-Overview .c-Overview-l .el-table:before {
  background-color: transparent;
}

.Overview .c-Overview .c-Overview-l .el-table__body-wrapper,
.Overview .c-Overview .c-Overview-l .table-content.light .el-table {
  border: 0;
}

.Overview .c-Overview .c-Overview-l .el-table,
.Overview .c-Overview .c-Overview-l .el-table__expanded-cell {
  color: #222;
}

.Overview .c-Overview .c-Overview-l .el-table__empty-block {
  background-color: #fcfcfd;
  border-right: 0;
  border-left: 0;
  border-bottom: 0;
}

.Overview .c-Overview .c-Overview-l .el-table th.el-table__cell .cell,
.Overview .c-Overview .c-Overview-l .el-table tr .cell {
  color: #8c8c8c;
  overflow: visible;
}

.Overview .c-Overview .c-Overview-l .el-table tbody tr:hover > td,
.Overview .c-Overview .c-Overview-l .el-table tbody tr > td {
  background-color: var(--table);
}

.Overview .c-Overview .c-Overview-l .el-table tbody tr > td .cell {
  color: #000;
  font-weight: 700;
  overflow: visible;
}

.Overview .c-Overview .c-Overview-l .el-table tbody tr > td .fbutton .top-up {
  color: #0ecb81;
}

.Overview .c-Overview .c-Overview-l .el-table tbody tr > td .fbutton span:hover {
  cursor: pointer;
}

.Overview .c-Overview .c-Overview-l .el-table tbody tr > td .redemption {
  border-radius: calc(infinity * 0.013rem);
  background-color: #01bd8d;
  color: #fff;
  padding: 0.067rem 0.133rem;
  margin: 0 0.067rem 0 0;
}

.Overview .c-Overview .c-Overview-l .el-table tbody tr > td .Details {
  border-radius: calc(infinity * 0.013rem);
  background-color: transparent;
  border: 0.013rem solid #ccc;
  padding: 0.067rem 0.133rem;
}

.Overview .c-Overview .c-Overview-l .el-table tbody tr > td .current {
  background-color: #bcff2f;
  border-radius: 0.067rem;
  padding: 0.067rem;
  margin: 0 0.067rem;
}

.Overview .c-Overview .c-Overview-l .el-table tbody tr > td .regular {
  background-color: #f19eff;
  border-radius: 0.067rem;
  padding: 0.067rem;
  margin: 0 0.067rem;
}

.Overview .c-Overview .c-Overview-l .el-table tbody tr > td .income {
  color: #008e5b;
}

.Overview .c-Overview .c-Overview-l .el-table tbody tr > td .Buy {
  border-radius: calc(infinity * 0.013rem);
  padding: 0.067rem 0.133rem;
  font-weight: 400;
  border: 0.013rem solid #000;
}

.Overview .c-Overview .c-Overview-l .el-table tbody tr > td .Buy:hover {
  cursor: pointer;
}

.Overview .c-Overview .c-Overview-l .el-table__empty-block {
  background-color: var(--table);
}

.Overview .c-Overview .c-Overview-r {
  border: 0.013rem solid #ebebeb;
  border-radius: 0.267rem;
  padding: 0.133rem 0.2rem;
  width: 39%;
}

.Overview .c-Overview .c-Overview-r .title {
  font-size: 0.32rem;
  font-weight: 400;
  color: #000;
  padding: 0.133rem 0;
}

.Overview .c-Overview .c-Overview-r .e-charts {
  height: 100%;
}
</style>
