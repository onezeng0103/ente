<script setup>
import navigation from '@/component/h5/navigation/index.vue'
import { useRouter } from 'vue-router'
import { getInfo } from '@/api/info'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const list = ref([])
const { t } = useI18n()
onMounted(() => {
  getInfo().then((res) => {
    list.value = res.rows.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
  })
})
const handleDetail = (item) => {
  router.push({
    path: '/message/detail',
    query: { data: encodeURI(JSON.stringify(item)) }
  })
}
</script>

<template>
  <navigation title="通知"></navigation>
  <div class="notify" style="min-height: calc(100vh - 50px)">
    <div role="feed" class="van-list" style="padding: 10px">
      <template v-if="list.length > 0">
        <div class="message-list">
          <div
            class="message-list-item"
            v-for="item in list"
            :key="item.id"
            @click="handleDetail(item)"
          >
            <div class="message-list-item-red" v-if="item.status == 0 && item.type == 1">未读</div>
            <div class="message-list-item-title">{{ item.title }}</div>
            <div class="message-list-item-time">{{ item.createTime }}</div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="van-list__finished-text">沒有更多</div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './index.css';

.message {
  padding: 44px 15px 0;

  &-list {
    margin-top: 10px;

    &-item {
      position: relative;
      margin-top: 10px;
      padding: 10px;
      background: #e5e7eb;
      border-radius: 10px;

      &-red {
        position: absolute;
        top: 10px;
        right: 10px;
        color: rgba(255, 100, 100, 1);
        font-size: 12px;
      }

      &-title {
        font-size: 16px;
        font-weight: 600;
      }

      &-time {
        margin-top: 10px;
        font-size: 12px;
        color: var(--third-color);
      }
    }
  }
}
</style>
