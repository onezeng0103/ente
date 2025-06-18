<template>
  <div class="h-50px" style="height: 50px"></div>
  <div class="router-container">
    <div class="outer-layer-container">
      <div class="Wallet">
        <div style="margin-top: 12px">
          <div class="know_content">
            <el-tabs v-model="activeName" class="demo-tabs">
              <el-tab-pane label="总览" name="overview">
                <div class="know_right">
                  <component :is="cmp" />
                </div>
              </el-tab-pane>
              <el-tab-pane label="资金账户" name="second">资金账户</el-tab-pane>
              <el-tab-pane label="交易账户" name="third">交易账户</el-tab-pane>
              <el-tab-pane label="理财账户" name="fourth">理财账户</el-tab-pane>
              <el-tab-pane label="资金记录" name="fourth">资金记录</el-tab-pane>
              <el-tab-pane label="账单" name="fourth">账单</el-tab-pane>
              <el-tab-pane label="借贷历史" name="fourth">借贷历史</el-tab-pane>
              <el-tab-pane label="兑换历史" name="fourth">兑换历史</el-tab-pane>
              <el-tab-pane label="返佣记录" name="fourth">返佣记录</el-tab-pane>
              <el-tab-pane label="订单列表" name="fourth">订单列表</el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Overview from './overview.vue'
const activeName = ref('overview')
const cmp = computed(() => {
  if (activeName.value === 'overview') {
    return Overview
  }
  return null
})
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
