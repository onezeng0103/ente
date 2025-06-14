<script setup>
import navigation from '@/component/h5/navigation/index.vue'
import recharge from './component/recharge.vue'
import withdraw from './component/withdraw.vue'
import finance from './component/finance.vue'
import loan from './component/loan.vue'
import contract from './component/contract.vue'
import trade from './component/trade.vue'
import options from './component/options.vue'
import second from './component/second.vue'
import proxy from './component/proxy.vue'

const isProxy = import.meta.env.VITE_IS_PROXY
const activeIndex = ref(0)

const list = ref([
  {
    name: '充值',
    type: 'recharge',
    component: recharge
  },
  {
    name: '提币',
    type: 'withdraw',
    component: withdraw
  },
  {
    name: '理财',
    type: 'finance',
    component: finance
  },
  {
    name: '借贷',
    type: 'loan',
    component: loan
  },
  {
    name: '合约',
    type: 'contract',
    component: contract
  },
  {
    name: '现货',
    type: 'trade',
    component: trade
  },
  {
    name: '期权',
    type: 'option',
    component: options
  },
  {
    name: '秒合约',
    type: 'second',
    component: second
  }
])
const handleChange = (index) => {
  activeIndex.value = index
}
onMounted(() => {
  if (Boolean(Number(isProxy))) {
    list.value.push({
      name: '跟投',
      type: 'proxy',
      component: proxy
    })
  }
})
</script>

<template>
  <div class="bill">
    <navigation title="资金流水"></navigation>

    <div class="cashflow-tab">
      <div
        class="cashflow-tab-item"
        v-for="(item, index) in list"
        :key="index"
        @click="handleChange(index)"
      >
        <div class="cashflow-tab-item-name" :class="{ active: activeIndex === index }">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="cashflow-main">
      <component :is="list[activeIndex].component" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.bill {
  background-color: #ffffff;
  height: 100vh;

  .cashflow {
    padding: 45px 0 100px;

    &-tab {
      padding: 0 15px;
      background: var(-secondary-background);
      border-radius: 6px;
      padding: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      overflow-x: auto;
      white-space: nowrap;
      scrollbar-width: none;

      &-item {
        width: auto;
        margin-right: 20px;

        &-name {
          font-size: 14px;
          color: #5f6870;

          &.active {
            color: #000000;
            font-weight: bold;
          }
        }
      }
    }

    &-main {
      margin-top: 20px;
      padding: 0 15px;
    }
  }
}
</style>
