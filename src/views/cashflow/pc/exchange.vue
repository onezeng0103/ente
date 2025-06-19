<template>
  <div class="Account-change" style="animation: 0.3s ease 0s 1 normal none running fadeIn">
    <div class="table-content light" style="position: relative">
      <el-table :data="texChangeList" :border="false">
        <el-table-column label="币种" align="center">
          <template #default="scope">
            <div style="display: flex; align-items: center; flex-direction: column">
              {{ scope.row.fromCoin?.toUpperCase() }}
              <i class="iconfont icon-a-duihuan21 bt-conversion"></i>
              {{ scope.row.toCoin?.toUpperCase() }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="数量" align="center">
          <template #default="scope">
            <div>+1</div>
          </template>
        </el-table-column>
        <el-table-column label="金额" align="center">
          <template #default="scope">
            <div>{{ _numberWithCommas(scope.row.amount) }}</div>
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
import { getTexChangeListApi } from '@/api/account'
import { _numberWithCommas } from '@/utils/public'
const texChangeList = ref([])
const getTexChangeList = async () => {
  const res = await getTexChangeListApi()
  texChangeList.value = res.rows
}
onMounted(async () => {
  await getTexChangeList()
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
