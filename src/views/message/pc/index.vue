<template>
  <div class="h-50px" style="height: 50px"></div>
  <div class="router-container">
    <div class="outer-layer-container">
      <div class="notify">
        <div class="notify-introduce">
          <img src="@/assets/image/image154(1).png" alt="" />
          <div class="introduce-box">
            <h6>通知</h6>
            <p>
              及时掌握{{ VITE_APP_TITLE }}最新动患，包括最新活动、加密货币上新、新产品功能及更多。
            </p>
          </div>
          <img src="@/assets/image/image154(1).png" alt="" />
        </div>
        <div class="notify-box">
          <div class="notify-header">
            <h6>通知</h6>
            <div class="notify-header-box">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <span class="point el-icon-more"></span>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="handleAllRead">全部已读</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
          <div class="notify-bottom" style="position: relative">
            <ul class="notify-type">
              <li class="is-selected">
                <i class="iconfont icon-a-quanbu21"></i>
                所有通知
              </li>
            </ul>
            <div class="notify-list-box">
              <ul class="notify-list">
                <template v-if="newList.length > 0">
                  <li v-for="item in newList" :key="item.id" @click="handleDetail(item)">
                    <span v-if="item.status == 0 && item.type == 1"></span>
                    <div>
                      <h6>{{ item.title }}</h6>
                      <span>{{ item.createTime }}</span>
                    </div>
                  </li>
                </template>
                <div class="noData" v-else>
                  <img
                    src="data:image/png;base64,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"
                  />
                  <h6>暂无数据</h6>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { getInfo } from '@/api/info'
import { haveRead } from '@/api/info'
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE
const newList = ref([])
const router = useRouter()
const handleDetail = (item) => {
  router.push({
    path: '/message/detail',
    query: { data: encodeURI(JSON.stringify(item)) }
  })
}
const handleAllRead = () => {
  newList.value.forEach((item) => {
    if (item.status == 0 && item.type == 1) {
      let params = `ids=${item.id}`
      haveRead(params)
    }
  })
}
onMounted(() => {
  getInfo().then((res) => {
    if (res.code == '200' && res.rows.length > 0) {
      newList.value = res.rows.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
    }
  })
})
</script>
<style scoped lang="scss">
@import './index.css';
:deep(.el-checkbox__label) {
  color: #000;
  font-size: 0.213rem;
  font-weight: 400;
  padding-right: 0.267rem;
  padding-left: 0.067rem;
}
:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: #000;
}
</style>
