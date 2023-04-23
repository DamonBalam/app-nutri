<template>
  <q-page class="q-px-md q-pt-md">
    <AppleTitle title="Tu Plan de alimentación saludable " />
    <div class="q-my-sm q-px-md">
      <div class="row justify-center">
        <span class="text-bold q-mr-sm">Periodo:</span
        ><span class="text-light">15/01/2023 - 30/01/23</span>
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
              <li v-for="item in props.row.diet" style="list-style: none">
                {{ item.quantity }} {{ item.name }}
              </li>
            </ul>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import AppleTitle from 'components/AppleTitle.vue'

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

const rows = [
  {
    time: 'Desayuno',
    diet: [
      {
        name: 'Proteína',
        quantity: '2'
      },
      {
        name: 'Vegetales',
        quantity: '1'
      },
      {
        name: 'Carbohidratos',
        quantity: '2'
      }
    ]
  },
  {
    time: 'Media Mañana',
    diet: [
      {
        name: 'Proteína',
        quantity: '2'
      },
      {
        name: 'Vegetales',
        quantity: '1'
      },
      {
        name: 'Carbohidratos',
        quantity: '2'
      }
    ]
  },
  {
    time: 'Almuerzo',
    diet: [
      {
        name: 'Proteína',
        quantity: '2'
      },
      {
        name: 'Vegetales',
        quantity: '1'
      },
      {
        name: 'Carbohidratos',
        quantity: '2'
      }
    ]
  },
  {
    time: 'Media Tarde',
    diet: [
      {
        name: 'Proteína',
        quantity: '2'
      },
      {
        name: 'Vegetales',
        quantity: '1'
      },
      {
        name: 'Carbohidratos',
        quantity: '2'
      }
    ]
  },
  {
    time: 'Cena',
    diet: [
      {
        name: 'Proteína',
        quantity: '2'
      },
      {
        name: 'Vegetales',
        quantity: '1'
      },
      {
        name: 'Carbohidratos',
        quantity: '2'
      }
    ]
  },
  {
    time: 'Merienda Noche',
    diet: [
      {
        name: 'Proteína',
        quantity: '2'
      },
      {
        name: 'Vegetales',
        quantity: '1'
      },
      {
        name: 'Carbohidratos',
        quantity: '2'
      }
    ]
  }
]
</script>

<style scoped lang="scss"></style>
