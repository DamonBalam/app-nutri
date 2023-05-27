<template>
  <mobile v-if="$q.platform.is.mobile" />
  <desktop v-else />
</template>

<script lang="ts" setup>
import desktop from './views/desktop.vue'
import mobile from './views/mobile.vue'
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

onMounted(() => {
  console.log($q)
})
</script>

<style lang="scss" scoped></style>
