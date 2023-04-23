<template>
  <div>
    <q-form class="q-gutter-md q-mx-xl" ref="myForm" @submit="handleSubmit">
      <div class="q-mb-none row justify-center">
        <label for="email" style="font-size: 18px">Correo electrónico</label>
      </div>
      <q-input
        id="email"
        type="email"
        rounded
        dense
        outlined
        v-model="usuario"
        label="Ingresa tu correo electrónico"
        :rules="[
          val =>
            (val && val.length > 0) || 'Ingrese un correo electrónico válido'
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="o_email" />
        </template>
      </q-input>
      <div class="q-mt-md row justify-center">
        <label for="password" style="font-size: 18px">Contraseña</label>
      </div>
      <q-input
        id="password"
        :type="isPwd ? 'password' : 'text'"
        rounded
        dense
        outlined
        v-model="password"
        label="Ingresa tu contraseña"
        :rules="[
          val => (val && val.length > 0) || 'Ingrese una contraseña válida'
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="o_lock" />
        </template>
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div v-if="messageError">
        <q-banner
          inline-actions
          class="text-white bg-red text-bold text-center"
        >
          {{ messageError }}
        </q-banner>
      </div>

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
import { ref, computed } from 'vue'
import { useAuthStore } from 'stores/auth'
import { authDataServices } from '../../services/AuthDataService'

const store = useAuthStore()

const { login } = store

const myForm = ref(null)
const isPwd = ref(true)
const usuario = ref('')
const password = ref('')
const message = ref<string>('')
const accept = ref(false)
const disabled = ref(false)

const messageError = computed(() => {
  return message.value || null
})

async function handleSubmit () {
  disabled.value = true
  message.value = ''
  //@ts-ignore
  myForm.value.validate().then(async success => {
    if (success) {
      try {
        const { code, data, msg } = await authDataServices.login(
          usuario.value,
          password.value
        )

        if (code === 200) {
          login(data)
        } else {
          message.value = msg || 'Error al iniciar sesión'
        }
      } catch (error) {
        console.log(error)
        // message.value = error.response.data.message
      }
    }
  })
  disabled.value = false
}
</script>

<style lang="scss" scoped></style>
