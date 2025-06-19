<template>
  <div class="h-50px" style="height: 50px"></div>
  <div class="router-container">
    <div class="outer-layer-container">
      <div class="Wallet">
        <div style="margin-top: 12px">
          <div class="know_content">
            <el-tabs v-model="activeName" class="demo-tabs">
              <el-tab-pane label="总览" name="0">
                <div class="know_right">
                  <Overview />
                </div>
              </el-tab-pane>
              <el-tab-pane label="理财账户" name="1">
                <div class="know_right">
                  <Fourth />
                </div>
              </el-tab-pane>
              <el-tab-pane label="合约账户" name="2">
                <div class="know_right">
                  <Contract />
                </div>
              </el-tab-pane>
              <el-tab-pane label="借贷历史" name="3">
                <div class="know_right">
                  <Loan />
                </div>
              </el-tab-pane>
              <el-tab-pane label="充值历史" name="4">
                <div class="know_right">
                  <Recharge />
                </div>
              </el-tab-pane>
              <el-tab-pane label="提现历史" name="5">
                <div class="know_right">
                  <Withdraw />
                </div>
              </el-tab-pane>
              <el-tab-pane label="兑换历史" name="6">
                <div class="know_right">
                  <Exchange />
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import Overview from './overview.vue'
import Fourth from './fourth.vue'
import Contract from './contract.vue'
import Loan from './loan.vue'
import Recharge from './recharge.vue'
import Withdraw from './withdraw.vue'
import Exchange from './exchange.vue'
const activeName = ref('0')
const route = useRoute()
watch(
  () => route.query.id,
  (newVal) => {
    if (newVal) {
      activeName.value = newVal
    } else {
      activeName.value = '0'
    }
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss" scoped>
@import './index.css';
:deep(.el-tabs__nav-scroll) {
  margin-left: 12%;
  overflow: hidden;
  white-space: nowrap;
}
:deep(.el-tabs__item.is-active) {
  border-bottom: none;
  color: #000;
}
:deep(.el-tabs__item) {
  text-align: left;
  color: #8c8c8c;
  line-height: 0.613rem;
  height: 0.613rem;
  font-size: 0.24rem;
  font-weight: 400;
}
:deep(.el-tabs__active-bar) {
  background-color: #000;
}
:deep(.el-tabs__active-bar) {
  background-color: #000;
}
:deep(.el-tabs__item:hover) {
  text-align: left;
  color: #8c8c8c;
  line-height: 0.613rem;
  height: 0.613rem;
}
.know_right {
  margin: 0 12%;
  min-height: 8rem;
}
</style>
