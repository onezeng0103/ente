<template>
  <H5Container v-if="isH5" />
  <PcContainer v-else />
</template>
<script setup>
import H5Container from './h5/index.vue'
import PcContainer from './pc/index.vue'
const isH5 = inject('isH5')
</script>
