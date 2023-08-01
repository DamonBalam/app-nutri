<template>
  <div>
    <q-form
      v-if="!showRecovery"
      class="q-gutter-md q-mx-xl"
      ref="myForm"
      @submit="handleSubmit"
    >
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
      <div class="q-mt-sm row justify-center">
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
        <q-btn flat class="text-primary" @click.native="handleClick"
          >¿Has olvidado tu contraseña?</q-btn
        >
      </div>

      <div class="row justify-center">
        <q-btn label="Iniciar Sesión" rounded type="submit" color="primary" />
      </div>
    </q-form>
    <q-form
      v-if="showRecovery"
      class="q-gutter-md q-mx-xl"
      ref="myFormRecovery"
      @submit="handleRecoverySubmit"
    >
      <div class="q-mb-none row justify-center">
        <label for="email" style="font-size: 18px"
          >Se enviara una nueva contraseña al correo electrónico
          registrado</label
        >
      </div>
      <q-input
        id="email"
        type="email"
        rounded
        dense
        outlined
        v-model="usuarioRecovery"
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

      <div v-if="messageRecoveryComputed">
        <q-banner
          inline-actions
          class="text-white bg-primary text-bold text-center"
        >
          {{ messageRecoveryComputed }}
        </q-banner>
      </div>

      <div v-if="messageError">
        <q-banner
          inline-actions
          class="text-white bg-red text-bold text-center"
        >
          {{ messageError }}
        </q-banner>
      </div>

      <div class="row justify-center">
        <q-btn
          label="Enviar"
          rounded
          type="submit"
          color="primary"
          style="width: 200px"
          class="q-mb-md"
        />
        <q-btn
          label="Regresar"
          outline
          rounded
          @click="handleClick"
          color="primary"
          style="width: 200px"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from 'stores/auth'
import { authDataServices } from '../../../services/AuthDataService'
import { useQuasar } from 'quasar'
const $q = useQuasar()

const store = useAuthStore()

const { login, loginWithCookies } = store

const myForm = ref(null)
const myFormRecovery = ref(null)
const isPwd = ref(true)
const usuario = ref('')
const usuarioRecovery = ref('')
const password = ref('')
const message = ref<string>('')
const messageRecovery = ref<string>('')
const accept = ref(false)
const disabled = ref(false)

const showRecovery = ref(false)

const messageError = computed(() => {
  return message.value || null
})

const messageRecoveryComputed = computed(() => {
  return messageRecovery.value || null
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
          loginWithCookies(data)
          // if (accept.value) {
          //   loginWithCookies(data)
          // } else {
          //   login(data)
          // }
        } else {
          message.value = msg || 'Error al iniciar sesión'

          setTimeout(() => {
            message.value = ''
          }, 3000)
        }
      } catch (error) {
        console.log(error)
        // message.value = error.response.data.message
      }
    }
  })
  disabled.value = false
}

async function handleRecoverySubmit () {
  disabled.value = true
  message.value = ''
  messageRecovery.value = ''
  //@ts-ignore
  myFormRecovery.value.validate().then(async success => {
    if (success) {
      try {
        const data = await authDataServices.recover(usuarioRecovery.value)

        if (data.data.code === 200) {
          console.log('success')

          messageRecovery.value =
            data.data.msg || 'Se ha enviado un correo electrónico'
        } else {
          console.log('error')

          message.value =
            data.data.msg || 'Error al validar el correo electrónico'

          setTimeout(() => {
            message.value = ''
          }, 3000)
        }
      } catch (error) {
        console.log(error)
        // message.value = error.response.data.message
      }
    }
  })
  disabled.value = false
}

function handleClick () {
  showRecovery.value = !showRecovery.value
}
</script>

<style lang="scss" scoped></style>
