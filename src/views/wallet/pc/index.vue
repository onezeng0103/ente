<template>
  <div class="h-50px" style="height: 50px"></div>
  <div class="router-container">
    <div class="outer-layer-container">
      <div class="userinfo">
        <div class="t-Navigation-Bar">
          <div class="Navigation-Bar-r">
            <span
              :class="currentTab == 'overview' ? 'active-title' : ''"
              @click="currentTab = 'overview'"
            >
              总览
            </span>
            <span :class="currentTab == 'kyc' ? 'active-title' : ''" @click="currentTab = 'kyc'">
              KYC认证
            </span>
            <span
              :class="currentTab == 'security' ? 'active-title' : ''"
              @click="currentTab = 'security'"
            >
              安全中心
            </span>
          </div>
        </div>
        <Overview v-if="currentTab == 'overview'" />
        <Kyc v-if="currentTab == 'kyc'" />
        <Security v-if="currentTab == 'security'" />
      </div>
    </div>
  </div>
</template>
<script setup>
import Overview from './overview.vue'
import Kyc from './kyc.vue'
import Security from './security.vue'

const currentTab = ref('overview')
</script>
<style lang="scss" scoped>
@import './index.css';
</style>
