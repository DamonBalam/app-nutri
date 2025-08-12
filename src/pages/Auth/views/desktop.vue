<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from 'stores/auth'
import { authDataServices } from '../../../services/AuthDataService'

const store = useAuthStore()
const { login } = store

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
          login(data)
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
          messageRecovery.value =
            data.data.msg || 'Se ha enviado un correo electrónico'
        } else {
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

<template>
  <div class="row justify-center justify-md-end">
    <q-card
      class="col-12 col-md-4 q-mr-md-lg q-mt-md-lg"
      style="height: 95vh; padding: 20px; border-radius: 40px"
    >
      <div class="row justify-end q-mx-md q-mt-lg">
        <q-img src="../../../assets/Logo.png" width="200px" />
      </div>

      <div
        v-if="!showRecovery"
        class="row justify-center q-my-xs-none q-my-xl-xl"
      >
        <h3 class="text-primary text-bold">¡Bienvenida!</h3>
      </div>

      <q-form
        v-if="!showRecovery"
        ref="myForm"
        class="q-gutter-md q-mx-auto"
        style="max-width: 480px"
        @submit="handleSubmit"
      >
        <div class="q-mb-none">
          <label for="email" class="text-bold">Correo electrónico</label>
        </div>
        <q-input
          id="email"
          type="email"
          dense
          rounded
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
        <div class="q-mt-lg">
          <label for="password" class="text-bold">Contraseña</label>
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

        <div class="row justify-center items-center q-mt-lg">
          <q-btn flat class="text-primary" @click.native="handleClick"
            >¿Has olvidado tu contraseña?</q-btn
          >
        </div>

        <div class="row justify-center q-mt-xl">
          <q-btn
            label="Iniciar Sesión"
            rounded
            type="submit"
            color="primary"
            :disabled="disabled"
          />
        </div>
      </q-form>
      <div v-if="showRecovery" class="row justify-center q-my-xl text-h4">
        <p class="text-primary text-bold text-center">
          Recuperación de contraseña
        </p>
      </div>
      <q-form
        v-if="showRecovery"
        ref="myFormRecovery"
        class="q-gutter-md q-mx-auto"
        style="width: 420px"
        @submit="handleRecoverySubmit"
      >
        <div class="q-mb-none text-center">
          <label for="email" class="text-bold"
            >Se enviara una nueva contraseña al correo electrónico
            registrado</label
          >
        </div>
        <q-input
          id="email"
          type="email"
          dense
          rounded
          outlined
          v-model="usuarioRecovery"
          placeholder="ejemplo@email.com"
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

        <div class="column items-center q-mt-xl">
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
    </q-card>
  </div>
</template>

<style lang="scss" scoped>
.card {
  background-color: #fff;
  border-radius: 40px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 32vw;
  height: 95vh;
}
</style>
