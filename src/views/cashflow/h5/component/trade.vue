<template>
  <template v-if="rowList.length > 0">
    <div class="cell" v-for="(item, index) in rowList" :key="index">
      <div class="row">
        <div class="row-item">
          <template v-if="item.type == '21'">{{ '币币交易' }}+</template>
          <template v-if="item.type == '22'">{{ '币币交易' }}-</template>
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
import { getCurrencyList } from '@/api/trade'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const rowList = ref([])
const getCurrencyListFn = async () => {
  let res = await getCurrencyList()
  rowList.value = res.rows
}
onMounted(() => {
  getCurrencyListFn()
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
