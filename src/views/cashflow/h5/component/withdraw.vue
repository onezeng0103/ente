<template>
  <template v-if="rowList.length > 0">
    <div class="cell" v-for="(item, index) in rowList" :key="index">
      <div class="row">
        <div class="row-item">
          <template v-if="item.orderType == null || item.orderType == 1">
            <template v-if="item.status == 1">
              {{ '提币成功' }}
            </template>
            <template v-if="item.status == 2">
              {{ '提币失败' }}
            </template>
            <template v-if="item.status == 3 || item.status == 0">
              {{ '提币处理中' }}
            </template>
          </template>
          <template v-if="item.orderType == 2">{{ '划回华盛达账户' }}</template>
        </div>
        <div class="row-item">
          <template v-if="item.status == 1 || item.status == 3 || item.status == 0">-</template>
          <template v-else>+</template>

          {{ priceFormat(item.amount) }}
        </div>
      </div>
      <div class="row" v-if="item?.remark && item.remark != '' && item.remark != null">
        <div class="row-item">{{ '备注' }}</div>
        <div class="row-item">{{ item.remark }}</div>
      </div>
      <div class="row">
        <div class="row-item">{{ _timeFormat(item?.params?.createTime) }}</div>
        <div class="row-item">
          <template v-if="item?.status == 0 || item.status == 3">{{ '审核中' }}</template>
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
import { getWithdrawList, getBonsList } from '@/api/account'
const { t } = useI18n()
const rowList = ref([])
const getWithdrawListFun = async () => {
  let str = 'pageNum=1&pageSize=100000'
  let res1 = await getWithdrawList(str)
  let arr1 = []
  if (res1.code == 200) {
    arr1 = res1.rows.map((item) => ({
      ...item
    }))
  } else {
    arr1 = []
  }
  let res2 = await getBonsList(str)
  let arr2 = res2.rows
    .map((item) => ({
      ...item,
      orderType: 2
    }))
    .filter((item) => {
      return item.giveType == 2 && item.async == 1
    })
  rowList.value = [...arr1, ...arr2].sort((a, b) => {
    return new Date(b.params.createTime) - new Date(a.params.createTime)
  })
}
onMounted(() => {
  getWithdrawListFun()
})
</script>
<style lang="scss" scoped>
.recharge {
  &-cell {
    margin-bottom: 15px;
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
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
