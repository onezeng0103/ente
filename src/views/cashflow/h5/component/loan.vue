<template>
  <template v-if="rowList.length > 0">
    <div class="cell" v-for="(item, index) in rowList" :key="index">
      <div class="row">
        <div class="row-item">{{ '借贷' }}</div>
        <div class="row-item">{{ priceFormat(item.amount) }}</div>
      </div>
      <div class="row">
        <div class="row-item">{{ _timeFormat(item?.params?.createTime) }}</div>
        <div class="row-item">
          <template v-if="item?.status == 0">{{ '审核中' }}</template>
          <template v-if="item?.status == 1">{{ '成功' }}</template>
          <template v-if="item?.status == 2">{{ '失败' }}</template>
        </div>
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
import { getLoanOrderList } from '@/api/loan'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const rowList = ref([])
const getLoanListFun = () => {
  let str = 'pageNum=1&pageSize=100000'
  getLoanOrderList(str).then((res) => {
    rowList.value = res.rows
  })
}
onMounted(() => {
  getLoanListFun()
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
