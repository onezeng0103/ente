<template>
  <PcContainer v-if="!isH5" />
  <H5Container v-else />
</template>
<script setup>
import PcContainer from './pc/detail.vue'
import H5Container from './h5/detail.vue'

const isH5 = inject('isH5')
</script>
