<template>
  <q-layout view="lHh Lpr lFf" v-if="$q.platform.is.mobile">
    <q-img
      src="../assets/fondo.jpg"
      style="max-width: 100vw; height: 25vh"
      fit="fill"
    />
    <div class="row justify-center q-my-lg">
      <q-img src="../assets/logo2.png" width="200px" fit="cover" />
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <q-layout v-else view="lHh Lpr lFf" class="fondo">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts" setup>
import { useQuasar } from 'quasar'

const $q = useQuasar()
</script>
<style scoped lang="scss">
.fondo {
  position: absolute;
  background-image: url('../assets/fondo.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
}
</style>
