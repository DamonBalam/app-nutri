<template>
  <div
    class="q-mt-xs q-px-md"
    style="width: 100%; height: 40px; position: relative"
  >
    <q-img src="../assets/apple.png" class="apple" />
    <q-card
      bordered
      flat
      class="bg-negative text-white q-pa-sm q-ml-lg"
      style="width: 95%"
    >
      <span class="title q-ml-md"> {{ title }}</span>
    </q-card>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style lang="scss" scoped>
.apple {
  width: 50px;
  position: absolute;
  z-index: 1;
  top: -15px;
  left: 10px;
}
.title {
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;
}
</style>
