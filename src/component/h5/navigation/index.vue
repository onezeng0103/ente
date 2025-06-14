<script setup>
import router from '@/router/index.js'

const props = defineProps({
  title: String
})
</script>

<template>
  <div class="bar">
    <div class="van-nav-bar__placeholder" style="height: 50px">
      <div class="van-nav-bar van-nav-bar--fixed van-hairline--bottom" style="z-index: 100">
        <div class="van-nav-bar__content">
          <div class="van-nav-bar__left" @click="router.go(-1)"><i class="el-icon-arrow-left"></i></div>
          <div class="van-nav-bar__title van-ellipsis">{{ props.title }}</div>
          <div class="van-nav-bar__right">
            <slot name="right">
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './index.css';
</style>
