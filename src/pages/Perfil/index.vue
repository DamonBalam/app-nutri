<template>
  <q-page class="row items-center justify-evenly">
    <h4>PAGE PERFIL</h4>
    <q-btn
      style="position: absolute; top: 90%"
      flat
      icon="o_power_settings_new"
      label="Cerrar Sesión"
      class="text-bold"
      @click="handleLogout"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useAuthStore } from 'stores/auth'

const store = useAuthStore()
const { logout } = store
function handleLogout () {
  logout()
}
</script>
