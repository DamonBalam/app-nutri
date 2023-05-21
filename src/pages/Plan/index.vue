<template>
  <q-page class="q-px-md q-pt-md">
    <AppleTitle title="Tu Plan de alimentación saludable " />
    <div class="q-my-sm q-px-md">
      <div class="row justify-center">
        <span class="text-bold q-mr-sm">última actualización:</span
        ><span class="text-light">{{ fecha }}</span>
      </div>
    </div>
    <div class="q-px-md">
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        flat
        hide-pagination
        hide-header
        table-header-class="bg-black text-white"
        no-data-label="No se han encontrado registros"
        :rows-per-page-options="[6]"
      >
        <template v-slot:body-cell-time="props">
          <q-td :props="props" class="bg-primary">
            <div class="row justify-center">
              <span class="text-bold q-mr-sm text-white">{{
                props.row.time
              }}</span>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-diet="props">
          <q-td :props="props">
            <ul>
              <template v-for="(item, name) in props.row.diet[0]">
                <li style="list-style: none" v-if="item !== 0">
                  {{ item }} {{ name }}
                </li>
              </template>
            </ul>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import AppleTitle from 'components/AppleTitle.vue'
import { onMounted, ref } from 'vue'
import { eqNuDataService } from '../../services/EqNuDataService'
import { useAuthStore } from '../../stores/auth'
import { citaControlDataServices } from '../../services/CitaControlDataService'
const store = useAuthStore()
const { getUser } = store

const fecha = ref('')
const columns = [
  {
    name: 'time',
    label: 'Time',
    align: 'center',
    field: 'time'
  },
  {
    name: 'diet',
    align: 'left',
    label: 'Dieta',
    field: 'diet'
  }
]

const rows = ref([
  {
    time: 'Desayuno',
    diet: []
  },
  {
    time: 'Media Mañana',
    diet: []
  },
  {
    time: 'Almuerzo',
    diet: []
  },
  {
    time: 'Media Tarde',
    diet: []
  },
  {
    time: 'Cena',
    diet: []
  },
  {
    time: 'Merienda Noche',
    diet: []
  }
])

onMounted(async () => {
  const data = await eqNuDataService.getLast(getUser.id)
  const data2 = await citaControlDataServices.getAll(getUser.id)
  fecha.value = data2.data[0].fecha_cita

  const desayuno = JSON.parse(data.data.desayuno)
  rows.value[0].diet.push(desayuno)

  const media_manana = JSON.parse(data.data.media_mañana)
  rows.value[1].diet.push(media_manana)

  const almuerzo = JSON.parse(data.data.almuerzo)
  rows.value[2].diet.push(almuerzo)

  const media_tarde = JSON.parse(data.data.media_tarde)
  rows.value[3].diet.push(media_tarde)

  const cena = JSON.parse(data.data.cena)
  rows.value[4].diet.push(cena)

  const merienda_noche = JSON.parse(data.data.merienda_noche)
  rows.value[5].diet.push(merienda_noche)
})
</script>

<style scoped lang="scss"></style>
