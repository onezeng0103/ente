<template>
  <H5Container v-if="isH5" />
</template>
<script setup>
import H5Container from './h5/index.vue'

const isH5 = inject('isH5')
</script>
