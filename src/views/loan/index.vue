<template>
  <PcContainer v-if="!isH5" />
</template>
<script setup>
import PcContainer from './pc/index.vue'
const isH5 = inject('isH5')
</script>
