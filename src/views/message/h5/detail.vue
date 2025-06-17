<template>
  <navigation title="通知详情"></navigation>
  <div class="router-container">
    <div class="p-container" style="display: block">
      <p style="text-align: center; font-size: 29px">{{ data?.title }}123</p>
      <div v-html="data?.content"></div>
    </div>
  </div>
</template>
<script setup>
import navigation from '@/component/h5/navigation/index.vue'
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
.router-container{
  min-height: 100vh;
  width: 100%;
  background-color: #ffffff!important;
  padding: 10px;
}
</style>
