<template>
  <mobile />
  <!-- <desktop /> -->
</template>

<script lang="ts" setup>
import desktop from './views/desktop.vue'
import mobile from './views/mobile.vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
</script>

<style lang="scss" scoped></style>
