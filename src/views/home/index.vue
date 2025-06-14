<template>
  <PcContainer v-if="!isH5" />
  <H5Container v-else />
</template>
<script setup>
import PcContainer from './pc/index.vue'
import H5Container from './h5/index.vue'
const isH5 = inject('isH5')
</script>
