<template>
  <q-page class="q-pa-md">
    <AppleTitle title="Tu información personal" />
    <div class="q-my-sm q-px-md">
      <div class="row justify-center">
        <span class="text-bold q-mr-sm"> Ultima actualización:</span
        ><span class="text-light">15/01/2023</span>
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col-6">
        <q-card flat bordered class="q-mx-xs q-mb-xs text-center q-pa-md">
          <span class="text-h6">{{ data.peso }} kg</span>
          <q-separator color="black" />
          <span class="text-subtitle1">Peso</span>
        </q-card>
      </div>
      <div class="col-6">
        <q-card flat bordered class="q-mx-xs q-mb-xs text-center q-pa-md">
          <span class="text-h6">{{ data.masa_muscular }} kg</span>
          <q-separator color="black" />
          <span class="text-subtitle1">Masa muscular</span>
        </q-card>
      </div>
      <div class="col-6">
        <q-card flat bordered class="q-mx-xs q-mb-xs text-center q-pa-md">
          <span class="text-h6">{{ data.grasa }}kg</span>
          <q-separator color="black" />
          <span class="text-subtitle1">Grasa</span>
        </q-card>
      </div>
      <div class="col-6">
        <q-card flat bordered class="q-mx-xs q-mb-xs text-center q-pa-md">
          <span class="text-h6">{{ data.grasa_porcentual }}%</span>
          <q-separator color="black" />
          <span class="text-subtitle1">% Grasa</span>
        </q-card>
      </div>

      <div class="col-6">
        <q-card flat bordered class="q-mx-xs q-mb-xs text-center q-pa-md">
          <span class="text-h6">{{ data.cc }}</span>
          <q-separator color="black" />
          <span class="text-subtitle1">CC</span>
        </q-card>
      </div>

      <div class="col-6">
        <q-card flat bordered class="q-mx-xs q-mb-xs text-center q-pa-md">
          <span class="text-h6">{{ data.grasa_visceral }}</span>
          <q-separator color="black" />
          <span class="text-subtitle1">Grasa visceral</span>
        </q-card>
      </div>
    </div>
    <AppleTitle title="Tu Historial de citas" />
    <div class="q-mt-md q-pa-md">
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        flat
        bordered
        dense
        hide-pagination
        table-header-class="bg-black text-white"
        no-data-label="No se han encontrado registros"
      />
    </div>
    <!-- <q-btn
      style="position: absolute; top: 95%; right: 30%"
      flat
      size="md"
      icon="o_power_settings_new"
      label="Cerrar Sesión"
      class="text-bold"
      @click="handleLogout"
    /> -->
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppleTitle from 'components/AppleTitle.vue'
import { useAuthStore } from 'stores/auth'

const store = useAuthStore()
const { logout } = store

function handleLogout () {
  logout()
}
const data = ref({
  peso: 55,
  masa_muscular: 25,
  grasa_visceral: 2,
  grasa: 6,
  grasa_porcentual: 12,
  cc: 85
})


const columns = [
  {
    name: 'date',
    label: 'Fecha',
    align: 'left',
    field: 'date'
  },
  {
    name: 'peso',
    align: 'center',
    label: 'Peso',
    field: 'peso'
  },
  { name: 'grasa', label: 'Grasa', field: 'grasa', align: 'center' },
  {
    name: 'grasa_porcentual',
    label: '% Grasa',
    field: 'grasa_porcentual',
    align: 'center'
  },
  {
    name: 'masa_muscular',
    label: 'Masa M.',
    field: 'masa_muscular',
    align: 'center'
  }
]

const rows = [
  {
    date: '01/01/23',
    peso: 55,
    grasa: 6,
    grasa_porcentual: 12,
    masa_muscular: 25
  },
  {
    date: '01/02/23',
    peso: 55,
    grasa: 6,
    grasa_porcentual: 12,
    masa_muscular: 25
  },
  {
    date: '01/03/23',
    peso: 55,
    grasa: 6,
    grasa_porcentual: 12,
    masa_muscular: 25
  },
  {
    date: '01/04/23',
    peso: 55,
    grasa: 6,
    grasa_porcentual: 12,
    masa_muscular: 25
  }
]
</script>
