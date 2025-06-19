<template>
  <template v-if="rowList.length > 0">
    <div class="cell" v-for="(item, index) in rowList" :key="index">
      <div class="row">
        <div class="row-item">
          <template v-if="item.type == '28'">{{ '合约平仓' }}</template>
          <template v-if="item.type == '29'">{{ '合约交易调整保证金' }}</template>
          <template v-if="item.type == '30'">{{ '合约交易强平' }}</template>
          <template v-if="item.type == '27'">{{ '保证金额冻结' }}</template>
          <template v-if="item.type == '53'">{{ '追加合约本金' }}</template>
        </div>
        <div class="row-item">
          {{ priceFormat(item.amount) }}
        </div>
      </div>
      <div class="row">
        <div class="row-item">{{ _timeFormat(item?.createTime) }}</div>
        <div class="row-item">{{ '账后余额' }}{{ priceFormat(item?.afterAmount) }}</div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="van-list__finished-text">暂无数据</div>
  </template>
</template>
<script setup>
import { priceFormat } from '@/utils/decimal'
import { _timeFormat } from '@/utils/public'
import { useI18n } from 'vue-i18n'
import { getContractList } from '@/api/trade'
const { t } = useI18n()
const rowList = ref([])
const getSecondList = async () => {
  let res = await getContractList()
  rowList.value = res.rows
}
onMounted(() => {
  getSecondList()
})
</script>
<style lang="scss" scoped>
.cell {
  margin-bottom: 20px;
  .row {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    &-item:first-child {
      color: #999999;
    }
  }
}
</style>
