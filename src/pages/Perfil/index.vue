<template>
  <q-page class="q-pa-md">
    <AppleTitle title="Tu información personal" />
    <div class="q-my-sm q-px-md">
      <div class="row justify-center">
        <span class="text-bold q-mr-sm"> Ultima actualización:</span
        ><span class="text-light">{{ cita.fecha_cita || '' }}</span>
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col-6">
        <q-card flat bordered class="q-mx-xs q-mb-xs text-center q-pa-md">
          <span class="text-h6">{{ cita.peso }} kg</span>
          <q-separator color="black" />
          <span class="text-subtitle1">Peso</span>
        </q-card>
      </div>
      <div class="col-6">
        <q-card flat bordered class="q-mx-xs q-mb-xs text-center q-pa-md">
          <span class="text-h6">{{ cita.musculo }} kg</span>
          <q-separator color="black" />
          <span class="text-subtitle1">Masa muscular</span>
        </q-card>
      </div>
      <div class="col-6">
        <q-card flat bordered class="q-mx-xs q-mb-xs text-center q-pa-md">
          <span class="text-h6">{{ cita.grasas }}kg</span>
          <q-separator color="black" />
          <span class="text-subtitle1">Grasa</span>
        </q-card>
      </div>
      <div class="col-6">
        <q-card flat bordered class="q-mx-xs q-mb-xs text-center q-pa-md">
          <span class="text-h6">{{ cita.porcentaje_grasa }}%</span>
          <q-separator color="black" />
          <span class="text-subtitle1">% Grasa</span>
        </q-card>
      </div>

      <div class="col-6">
        <q-card flat bordered class="q-mx-xs q-mb-xs text-center q-pa-md">
          <span class="text-h6">{{ cita.cc }}</span>
          <q-separator color="black" />
          <span class="text-subtitle1">CC</span>
        </q-card>
      </div>

      <div class="col-6">
        <q-card flat bordered class="q-mx-xs q-mb-xs text-center q-pa-md">
          <span class="text-h6">{{ cita.grasa_viceral }}</span>
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
        :rows-per-page-options="[5]"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppleTitle from 'components/AppleTitle.vue'
import { useAuthStore } from 'stores/auth'
import { citaControlDataServices } from '../../services/CitaControlDataService'
import { eqNuDataService } from '../../services/EqNuDataService'

const store = useAuthStore()
const { getUser } = store

const cita = ref({
  fecha_cita: '',
  peso: '',
  grasas: '',
  porcentaje_grasa: '',
  musculo: '',
  cc: '',
  grasa_viceral: ''
})

const columns = [
  {
    name: 'fecha_cita',
    label: 'Fecha',
    align: 'left',
    field: 'fecha_cita'
  },
  {
    name: 'peso',
    align: 'center',
    label: 'Peso',
    field: 'peso'
  },
  { name: 'grasas', label: 'Grasa', field: 'grasas', align: 'center' },
  {
    name: 'porcentaje_grasa',
    label: '% Grasa',
    field: 'porcentaje_grasa',
    align: 'center'
  },
  {
    name: 'musculo',
    label: 'Masa M.',
    field: 'musculo',
    align: 'center'
  }
]

const rows = ref([])

onMounted(async () => {
  const data = await citaControlDataServices.getAll(getUser.id)

  if (data.code === 200) {
    rows.value = data.data
    cita.value = data.data[0]
  }
})
</script>
