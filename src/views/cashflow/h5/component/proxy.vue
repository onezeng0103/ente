<template>
  <template v-if="rowList.length > 0">
    <div class="cell" v-for="(item, index) in rowList" :key="index">
      <div class="row">
        <div class="row-item">
          <template v-if="item.type == '61'">{{ '跟投投资' }}</template>
          <template v-if="item.type == '62'">{{ '跟投投资取消' }}</template>
          <template v-if="item.type == '63'">{{ '跟投投资结算' }}</template>
          <template v-if="item.type == '64'">{{ '跟投投资返还' }}</template>
          <template v-if="item.type == '65'">{{ '跟投亏损弥补' }}</template>
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
import { getBrokerList } from '@/api/trade'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const rowList = ref([])
const getBrokerListFn = async () => {
  let res = await getBrokerList()
  rowList.value = res.rows
}
onMounted(() => {
  getBrokerListFn()
})
</script>
<style lang="scss" scoped>
.cell {
  margin-bottom: 20px;
  .row {
    display: flex;
    justify-content: space-between;
    &-item:first-child {
      color: var(--third-color);
    }
  }
}
</style>
