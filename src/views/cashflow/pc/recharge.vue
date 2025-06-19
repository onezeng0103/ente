<template>
  <div class="Account-change" style="animation: 0.3s ease 0s 1 normal none running fadeIn">
    <div class="table-content light" style="position: relative">
      <el-table :data="rowList" :border="false">
        <el-table-column label="资金流水" align="center">
          <template #default="scope">
            <div v-if="scope.row.orderType == null || scope.row.orderType == 1">充币成功</div>
            <div v-if="scope.row.orderType == 2">从华盛达账户划入</div>
          </template>
        </el-table-column>
        <el-table-column label="金额" align="center">
          <template #default="scope">
            <div>+{{ priceFormat(scope.row.amount) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="时间" align="center">
          <template #default="scope">
            <div>{{ _timeFormat(scope.row.params?.createTime) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template #default="scope">
            <div>
              <template v-if="scope.row.status == 0">审核中</template>
              <template v-if="scope.row.status == 1">成功</template>
              <template v-if="scope.row.status == 2">失败</template>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template #default="scope">
            <div>{{ scope.row.remark }}</div>
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
import { priceFormat } from '@/utils/decimal'
import { _timeFormat } from '@/utils/public'
import { getRechargeList, getBonsList } from '@/api/account'
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
  rowList.value = [...arr1, ...arr2].sort((a, b) => {
    return new Date(b.params.createTime) - new Date(a.params.createTime)
  })
}
onMounted(() => {
  getRechargeListFun()
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
