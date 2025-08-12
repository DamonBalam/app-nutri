<template>
  <q-page class="q-pa-md">
    <AppleTitle title="Contador diario de porciones" />
    <div class="q-my-sm q-px-md"></div>
    <div class="row q-mb-md q-mt-md">
      <div class="col-6 q-mb-sm">
        <q-card flat bordered class="q-mx-xs q-mb-xs text-center q-pa-md">
          <span class="text-h4">{{ counters.carbohidratos }} </span>
          <q-separator color="black" />
          <p class="text-subtitle1 q-my-sm">Carbohidratos</p>
          <div class="row justify-center">
            <q-btn
              round
              push
              color="negative"
              class="q-mr-sm"
              icon="o_remove"
              :disable="counters.carbohidratos === 0"
              @click="counters.carbohidratos--"
            />
            <q-btn
              round
              push
              color="primary"
              class="q-ml-sm"
              icon="o_add"
              @click="counters.carbohidratos++"
            />
          </div>
        </q-card>
      </div>
      <div class="col-6 q-mb-sm">
        <q-card flat bordered class="q-mx-xs q-mb-xs text-center q-pa-md">
          <span class="text-h4">{{ counters.vegetales }} </span>
          <q-separator color="black" />
          <p class="text-subtitle1 q-my-sm">Vegetales</p>
          <div class="row justify-center">
            <q-btn
              round
              push
              color="negative"
              class="q-mr-sm"
              icon="o_remove"
              :disable="counters.vegetales === 0"
              @click="counters.vegetales--"
            />
            <q-btn
              round
              push
              color="primary"
              class="q-ml-sm"
              icon="o_add"
              @click="counters.vegetales++"
            />
          </div>
        </q-card>
      </div>

      <div class="col-6 q-mb-sm">
        <q-card flat bordered class="q-mx-xs q-mb-xs text-center q-pa-md">
          <span class="text-h4">{{ counters.frutas }} </span>
          <q-separator color="black" />
          <p class="text-subtitle1 q-my-sm">Frutas</p>
          <div class="row justify-center">
            <q-btn
              round
              push
              color="negative"
              class="q-mr-sm"
              icon="o_remove"
              :disable="counters.frutas === 0"
              @click="counters.frutas--"
            />
            <q-btn
              round
              push
              color="primary"
              class="q-ml-sm"
              icon="o_add"
              @click="counters.frutas++"
            />
          </div>
        </q-card>
      </div>

      <div class="col-6 q-mb-sm">
        <q-card flat bordered class="q-mx-xs q-mb-xs text-center q-pa-md">
          <span class="text-h4">{{ counters.lacteos }} </span>
          <q-separator color="black" />
          <p class="text-subtitle1 q-my-sm">Lacteos</p>
          <div class="row justify-center">
            <q-btn
              round
              push
              color="negative"
              class="q-mr-sm"
              icon="o_remove"
              :disable="counters.lacteos === 0"
              @click="counters.lacteos--"
            />
            <q-btn
              round
              push
              color="primary"
              class="q-ml-sm"
              icon="o_add"
              @click="counters.lacteos++"
            />
          </div>
        </q-card>
      </div>

      <div class="col-6 q-mb-sm">
        <q-card flat bordered class="q-mx-xs q-mb-xs text-center q-pa-md">
          <span class="text-h4">{{ counters.proteinas }} </span>
          <q-separator color="black" />
          <p class="text-subtitle1 q-my-sm">Proteinas</p>
          <div class="row justify-center">
            <q-btn
              round
              push
              color="negative"
              class="q-mr-sm"
              icon="o_remove"
              :disable="counters.proteinas === 0"
              @click="counters.proteinas--"
            />
            <q-btn
              round
              push
              color="primary"
              class="q-ml-sm"
              icon="o_add"
              @click="counters.proteinas++"
            />
          </div>
        </q-card>
      </div>

      <div class="col-6 q-mb-sm">
        <q-card flat bordered class="q-mx-xs q-mb-xs text-center q-pa-md">
          <span class="text-h4">{{ counters.grasas }} </span>
          <q-separator color="black" />
          <p class="text-subtitle1 q-my-sm">Grasas</p>
          <div class="row justify-center">
            <q-btn
              round
              push
              color="negative"
              class="q-mr-sm"
              icon="o_remove"
              :disable="counters.grasas === 0"
              @click="counters.grasas--"
            />
            <q-btn
              round
              push
              color="primary"
              class="q-ml-sm"
              icon="o_add"
              @click="counters.grasas++"
            />
          </div>
        </q-card>
      </div>
    </div>

    <div class="row justify-center">
      <q-btn
        label="Reiniciar"
        rounded
        push
        color="primary"
        style="width: 150px"
        class="q-mb-md"
        @click="reset"
        :disable="
          counters.carbohidratos === 0 &&
          counters.vegetales === 0 &&
          counters.frutas === 0 &&
          counters.proteinas === 0 &&
          counters.lacteos === 0 &&
          counters.grasas === 0"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, watch, reactive } from 'vue'
import AppleTitle from 'components/AppleTitle.vue'
import { LocalStorage } from 'quasar'

const counters = reactive({
  carbohidratos: 0,
  vegetales: 0,
  frutas: 0,
  proteinas: 0,
  lacteos: 0,
  grasas: 0
})

const countersDefault = reactive({
  carbohidratos: 0,
  vegetales: 0,
  frutas: 0,
  proteinas: 0,
  lacteos: 0,
  grasas: 0
})

watch(counters, value => {
  LocalStorage.set('counters', JSON.stringify(counters))
})

onMounted(() => {
  const countersLS = JSON.parse(
    LocalStorage.getItem('counters') || JSON.stringify(countersDefault)
  )

  counters.carbohidratos = countersLS.carbohidratos
  counters.vegetales = countersLS.vegetales
  counters.frutas = countersLS.frutas
  counters.proteinas = countersLS.proteinas
  counters.lacteos = countersLS.lacteos
  counters.grasas = countersLS.grasas
})

const reset = () => {
  counters.carbohidratos = 0
  counters.vegetales = 0
  counters.frutas = 0
  counters.proteinas = 0
  counters.lacteos = 0
  counters.grasas = 0

  LocalStorage.set('counters', JSON.stringify(counters))
}
</script>
