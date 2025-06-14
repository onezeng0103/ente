<template>
  <div
    v-if="showBottom"
    class="el-select-dropdown el-popper countries-select"
    style="
      min-width: 121.492px;
      transform-origin: center top;
      z-index: 2038;
      position: absolute;
      top: 36px;
      left: 0px;
    "
    x-placement="bottom-start"
  >
    <div class="el-scrollbar" style="">
      <div
        class="el-select-dropdown__wrap el-scrollbar__wrap"
        style="margin-bottom: -5px; margin-right: -5px"
      >
        <ul class="el-scrollbar__view el-select-dropdown__list">
          <li
            class="el-select-dropdown__item"
            v-for="(item, index) in areaList"
            :key="index"
            @click="handleClick(item)"
          >
            <span>
              {{ current == 'zh' ? item.chineseName : item.englishName }} +
              {{ item.phoneCode }}
            </span>
          </li>
        </ul>
      </div>
      <div class="el-scrollbar__bar is-horizontal">
        <div class="el-scrollbar__thumb" style="transform: translateX(0%)"></div>
      </div>
    </div>

    <div x-arrow="" class="popper__arrow" style="left: 35px"></div>
  </div>
</template>
<script setup>
import { getAreaCode } from '@/api/user'
import { storageDict } from '@/config/dict'
const current = ref(localStorage.getItem(storageDict.LANGUAGE))
const props = defineProps({
  showBottom: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['close'])
// 区号列表
const areaList = ref([])
// 获取区号
const codeList = () => {
  let arr = []
  getAreaCode().then((res) => {
    if (res.code == '200') {
      res.data.forEach((item) => {
        item.data.forEach((item) => {
          arr.push({
            ...item
          })
        })
      })
      areaList.value = arr
    }
  })
}
const handleClick = (item) => {
  emits('close', item)
}
onMounted(() => {
  codeList()
})
</script>
