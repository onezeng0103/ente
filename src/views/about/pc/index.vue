<template>
  <div class="h-50px" style="height: 50px"></div>
  <div class="router-container">
    <div class="p-container">
      <template v-if="list?.length > 0">
        <div v-for="item in list" :key="item.id">
          <div>{{ item.title }}</div>
          <div v-html="item.content"></div>
        </div>
      </template>
      <NoData v-else />
    </div>
  </div>
</template>
<script setup>
import { getAboutApi } from '@/api/common'
const list = ref([])
const getAbout = async () => {
  const res = await getAboutApi()
  list.value = res.data
}
onMounted(() => {
  getAbout()
})
</script>
<style lang="scss" scoped>
@import './index.css';
:deep(p) {
  letter-spacing: 0 !important;
  margin: 1em 0 !important;
}
</style>
