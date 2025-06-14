<template>
  <template v-if="rowList.length > 0">
    <div class="cell" v-for="(item, index) in rowList" :key="index">
      <div class="row">
        <div class="row-item">
          <template v-if="item.orderType == null || item.orderType == 1">
            {{ '充币成功' }}
          </template>
          <template v-if="item.orderType == 2">{{ '从华盛达账户划入' }}</template>
        </div>
        <div class="row-item">+{{ priceFormat(item.amount) }}</div>
      </div>
      <div class="row" v-if="item?.remark && item.remark != ''">
        <div class="row-item">{{ '备注' }}</div>
        <div class="row-item">{{ item.remark }}</div>
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
import { useI18n } from 'vue-i18n'
import { priceFormat } from '@/utils/decimal'
import { _timeFormat } from '@/utils/public'
import { getRechargeList, getBonsList } from '@/api/account'
const { t } = useI18n()
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
