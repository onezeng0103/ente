<template>
  <div class="Account-change" style="animation: 0.3s ease 0s 1 normal none running fadeIn">
    <div class="table-content light" style="position: relative">
      <el-table :data="loanOrderList" :border="false">
        <el-table-column label="借款金额" align="center">
          <template #default="scope">
            <div>{{ scope.row.amount }}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template #default="scope">
            <div>{{ statusName(scope.row.status) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="还款周期" align="center">
          <template #default="scope">
            <div>{{ scope.row.cycleType }}</div>
          </template>
        </el-table-column>
        <el-table-column label="日利率" align="center">
          <template #default="scope">
            <div>{{ scope.row.rate }}%</div>
          </template>
        </el-table-column>
        <el-table-column label="利息" align="center">
          <template #default="scope">
            <div>
              {{ _mul(_mul(_mul(scope.row.amount, scope.row.rate), scope.row.cycleType), 0.01) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="还款方式" align="center">
          <template #default="scope">
            <div>{{ repayTypeName(scope.row.tloadProduct?.repayType) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="还款时间" align="center">
          <template #default="scope">
            <div v-if="!(scope.row.status === 0 || scope.row.status === 2)">
              {{ _timeFormat(scope.row.params?.finalRepayTime, 'HH:mm MM/DD', true) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="放款机构" align="center">
          <template #default="scope">
            <div>{{ scope.row.tloadProduct?.repayOrg }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <div>
              <button
                @click="dispatchCustomEvent('event_serviceChange')"
                v-if="scope.row.status == 1 || scope.row.status == 4"
                type="button"
                class="el-button el-button--primary el-button--small"
              >
                联系客服
              </button>
            </div>
          </template>
        </el-table-column>
        <template #empty>
          <NoData />
        </template>
      </el-table>
    </div>
  </div>
</template>
<script setup>
import { getLoanOrderList } from '@/api/loan.js'
import { dict } from '@/api/common/index'
import { _timeFormat } from '@/utils/public'
import { _div, _mul } from '@/utils/decimal.js'
import { dispatchCustomEvent } from '@/utils'
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
const dictList = ref()
const getDict = async () => {
  const res = await dict('t_repay_type')
  if (res.code == '200') {
    dictList.value = res.data
  }
}
const repayTypeName = (repayType) => {
  return (
    dictList.value?.filter((item) => {
      return parseInt(item.dictValue) == repayType
    })[0]?.dictLabel || ''
  )
}
onMounted(async () => {
  await getDict()
  await getLoanOrderListFun()
})
</script>
<style lang="scss" scoped>
.el-button {
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  border-radius: 0.533rem;
  border: none;
  font-size: 0.14rem;
  font-weight: 400;
}
</style>
