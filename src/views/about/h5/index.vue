<script setup>
import navigation from '@/component/h5/navigation/index.vue'

import { getAboutApi } from '@/api/common'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const list = ref([])
const getAbout = async () => {
  const res = await getAboutApi()
  list.value = res.data
}
onMounted(() => {
  getAbout()
})
</script>

<template>
  <navigation title="关于我们"></navigation>

  <div>
    <div class="m-container">
      <div>
        <template v-for="item in list" :key="item.id">
          <p style="line-height: 2.5">
            <span style="font-size: 19px">
              <strong>{{ item.title }}</strong>
            </span>
          </p>
          <div v-html="item.content" ></div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './index.css';
:deep(.ql-align-center){
  margin: 10px 0 !important;
}
</style>
