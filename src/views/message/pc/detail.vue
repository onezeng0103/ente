<template>
  <div class="h-50px" style="height: 50px"></div>
  <div class="router-container">
    <div class="p-container" style="display: block">
      <p style="text-align: center; font-size: 29px">{{ data?.title }}</p>
      <div v-html="data?.content"></div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { haveRead } from '@/api/info'
const route = useRoute()
const data = ref()
watch(
  () => route.query.data,
  (newVal) => {
    data.value = JSON.parse(decodeURI(newVal))
    if (data.value?.type == 1 && data.value?.status == 0) {
      handleRead(data.value?.id)
    }
  },
  { immediate: true }
)
const handleRead = async (id) => {
  let params = `ids=${id}`
  await haveRead(params)
}
</script>
<style lang="scss" scoped>
@import './detail.css';
:deep(p) {
  letter-spacing: 0 !important;
  margin: 1em 0 !important;
}
</style>
