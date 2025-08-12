<template>
  <q-page class="q-pa-md">
    <AppleTitle title="Actualizar contraseña" />
    <q-card flat class="q-pa-lg">
      <q-card-section>
        <div class="column items-center justify-center">
          <q-avatar size="100px" class="q-mt-md q-mb-md">
            <img src="../../assets/apple_1.png" />
          </q-avatar>
          <span class="text-weight-bold q-mt-xs" style="font-size: 18px">
            Nombre(s):
            <span class="text-weight-regular">{{ user.nombre }}</span>
          </span>
          <span class="text-weight-bold q-mt-xs" style="font-size: 18px">
            Apellido(s):
            <span class="text-weight-regular"
              >{{ user.apellido_paterno }} {{ user.apellido_materno }}</span
            >
          </span>
          <span class="text-weight-bold q-mt-xs" style="font-size: 18px">
            E-mail: <span class="text-weight-regular">{{ user.email }}</span>
          </span>
          <span
            class="text-weight-bold q-mt-xs q-mb-lg"
            style="font-size: 18px"
          >
            Teléfono:
            <span class="text-weight-regular">{{ user.telefono }}</span>
          </span>
        </div>
      </q-card-section>
      <q-form ref="myForm">
        <q-card-section class="row q-col-gutter-sm">
          <div class="col-12 q-mb-sm">
            <q-input
              outlined
              placeholder="Elige tu nueva contraseña"
              dense
              v-model="password"
              hint="Mínimo 6 caracteres"
              autofocus
              lazy-rules
              :rules="[val => !!val || 'La contraseña es requerida']"
            />
          </div>
          <div class="col-12">
            <q-input
              outlined
              placeholder="Confirma tu contraseña"
              dense
              v-model="passwordConfirm"
              autofocus
              lazy-rules
              :rules="[val => !!val || 'La contraseña es requerida']"
            />
          </div>
          <div class="col-12" v-if="msg.length > 0">
            <q-banner
              inline-actions
              class="text-white bg-green text-bold text-center"
            >
              {{ msg }}
            </q-banner>
          </div>
        </q-card-section>
      </q-form>

      <q-card-actions class="text-primary justify-center">
        <div class="col-12 flex justify-center q-mb-sm" style="width: 100%">
          <q-btn
            :disable="getDisabled"
            color="primary"
            label="Actualizar"
            @click="submit"
            style="width: 100%"
          />
        </div>
        <div class="flex justify-center" style="width: 100%">
          <q-btn
            outline
            label="Cancelar"
            @click="closeModal"
            to="/perfil"
            style="width: 100%"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AppleTitle from 'components/AppleTitle.vue'
import { useAuthStore } from 'stores/auth'
import { useQuasar } from 'quasar'
import { authDataServices } from '../../services/AuthDataService'
import { route } from 'quasar/wrappers'
const $q = useQuasar()
const store = useAuthStore()

const user = store.user
const myForm = ref<HTMLFormElement | null>(null)
const msg = ref('')
const password = ref('')
const passwordConfirm = ref('')
const closeModal = () => {
  password.value = ''
  passwordConfirm.value = ''
  myForm.value?.resetValidation()
}

const getDisabled = computed(() => {
  if (password.value === '') return true
  if (password.value.length <= 5) return true
  if (passwordConfirm.value === '') return true
  if (passwordConfirm.value.length <= 5) return true
  if (password.value !== passwordConfirm.value) return true

  return false
})

const submit = async () => {
  msg.value = ''
  if (myForm.value?.validate()) {
    try {
      const data = await authDataServices.updatePassword(
        user.email,
        password.value
      )

      msg.value = 'Se ha actualizado la contraseña correctamente'
    } catch (error) {
      msg.value = 'Ha ocurrido un error'
      console.log(error)
    } finally {
      myForm.value?.resetValidation()
      closeModal()
    }
  }
}
</script>
