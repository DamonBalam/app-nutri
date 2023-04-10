<template>
  <div>
    <q-form class="q-gutter-md q-mx-xl" @submit="handleSubmit">
      <div class="q-mb-none row justify-center">
        <label for="email"  style="font-size: 18px;">Correo electrónico</label>
      </div>
      <q-input
        id="email"
        rounded
        dense
        outlined
        v-model="usuario"
        label="Ingresa tu correo electrónico"
      >
        <template v-slot:prepend>
          <q-icon name="o_email" />
        </template>
      </q-input>
      <div class="q-mt-md row justify-center">
        <label for="password" style="font-size: 18px;">Contraseña</label>
      </div>
      <q-input
        id="password"
        dense
        rounded
        outlined
        v-model="password"
        label="Ingresa tu contraseña"
      >
        <template v-slot:prepend>
          <q-icon name="o_lock" />
        </template>
      </q-input>

      <div class="row justify-center">
        <q-toggle v-model="accept" label="Recordar contraseña" />
      </div>

      <div class="row justify-center">
        <router-link to="/pacientes" class="text-primary"
          >¿Has olvidado tu contraseña?</router-link
        >
      </div>

      <div class="row justify-center">
        <q-btn label="Iniciar Sesión" rounded type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const usuario = ref('')
const password = ref('')
const accept = ref(false)
const router = useRouter()
function handleSubmit () {
  if (usuario.value === 'admin' && password.value === 'admin') {
    localStorage.setItem('access_token', '123456789')
    router.push('/perfil')
  } else {
    alert('Usuario o contraseña incorrectos')
  }
}
</script>

<style lang="scss" scoped></style>
