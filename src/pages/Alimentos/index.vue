<template>
  <q-page class="q-pa-md">
    <div style="width: 100%" class="q-px-xs">
      <q-img src="../../assets/apple.png" class="apple" />
      <q-input
        rounded
        class="q-ml-xl"
        v-model="search"
        outlined
        dense
        label="Buscar alimento"
        bg-color="white"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <div class="q-my-md q-px-xs" v-if="search.length > 2">
      <q-list bordered separator>
        <q-item
          class="bg-white text-black"
          v-for="item in itemsFiltered"
          :key="item.id"
        >
          <q-item-section>
            <q-item-label>{{ item.nombre }}</q-item-label>
            <q-item-label caption
              >{{ item.cantidad_producto }} =
              {{ item.intercambio_nutricional }}</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="q-my-md q-px-xs" v-else>
      <q-list bordered separator v-for="(cat, i) in categories" :key="cat.id">
        <q-item
          clickable
          v-ripple
          :style="'background-color: ' + colors[i]"
          class="text-white"
          @click="selectedCategory(cat)"
        >
          <q-item-section>
            <span class="text-bold">{{ cat.nombre }}</span>
          </q-item-section>
          <q-item-section avatar>
            <q-icon
              :name="category.id === cat.id ? 'expand_less' : 'expand_more'"
              color="white"
            />
          </q-item-section>
        </q-item>
        <template v-if="category?.id === cat.id">
          <q-list v-for="sub in subcategories" :key="sub.id" bordered separator>
            <q-item
              clickable
              v-ripple
              :style="'background-color: ' + colors[i]"
              class="text-white"
              @click="selectedSubcategory(sub)"
            >
              <q-item-section class="q-ml-md">
                <q-item-label>{{ sub.nombre }}</q-item-label>
                <!-- <div class="row justify-start items-center">
                  <span>{{ sub.nombre }}</span>
                </div> -->
              </q-item-section>
              <q-item-section avatar>
                <q-icon
                  :name="
                    subcategory.id === sub.id ? 'expand_less' : 'expand_more'
                  "
                  color="white"
                />
              </q-item-section>
            </q-item>
            <q-list bordered separator v-if="subcategory?.id === sub.id">
              <q-item
                class="bg-white text-black"
                v-for="item in itemsFilteredBySubcategory"
                :key="item.id"
              >
                <q-item-section>
                  <q-item-label>{{ item.nombre }}</q-item-label>
                  <q-item-label caption
                    >{{ item.cantidad_producto }} =
                    {{ item.intercambio_nutricional }}</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </q-list>
        </template>
      </q-list>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { ICategory } from '../../interfaces/Category'
import { IProducto } from '../../interfaces/Producto'
import { ISubcategory } from '../../interfaces/Subcategory'
import { categoryDataServices } from '../../services/CategoryDataService'
import { productoDataServices } from '../../services/ProductoDataService'

const search = ref('')
const category = ref({
  id: null,
  nombre: '',
  icon: ''
})
const subcategory = ref({
  id: null,
  nombre: '',
  categoria_id: null
})

const colors = [
  '#339933',
  '#4195F1',
  '#E60026',
  '#27C1C1',
  '#FF005A',
  '#900020',
  '#EE890B',
  '#339933',
  '#4195F1',
  '#E60026',
  '#27C1C1',
  '#FF005A',
  '#900020',
  '#EE890B',
  '#339933',
  '#4195F1',
  '#E60026',
]
const items = ref<IProducto[]>([])
const categories = ref<ICategory[]>([])
const subcategories = ref<ISubcategory[]>([])

onMounted(async () => {
  await getCategories()
  await getProductos()
})

function selectedCategory(item: any) {
  if (category.value === item) {
    category.value = {
      id: null,
      nombre: '',
      icon: ''
    }
    subcategory.value = {
      id: null,
      nombre: '',
      categoria_id: null
    }
  } else {
    category.value = item
    getSubcategories(item.id)
  }
}

function selectedSubcategory(item: any) {
  if (subcategory.value === item) {
    subcategory.value = {
      id: null,
      nombre: '',
      categoria_id: null
    }
  } else {
    subcategory.value = item
  }
}

const getProductos = async () => {
  try {
    const data = await productoDataServices.getProductos()

    if (data.code === 200) {
      items.value = data.data
    }
  } catch (error) {
    console.log(error)
  }
}

const getCategories = async () => {
  // loading.value = true
  try {
    const data = await categoryDataServices.getCategories()
    if (data.code === 200) {
      categories.value = data.data
    }
  } catch (error) {
    console.log(error)
  }
  // loading.value = false
}

const getSubcategories = async (id: number) => {
  // loading.value = true
  subcategories.value = []
  try {
    const res = await categoryDataServices.getSubCategoriesByCategoryId(id)

    if (res.code === 200) {
      subcategories.value = res.data.subcategorias || []
    }
  } catch (error) {
    console.log(error)
  }
  // loading.value = false
}

const itemsFiltered = computed(() => {
  if (search.value === '') {
    return items.value
  }

  return items.value.filter(item => {
    return item.nombre.toLowerCase().includes(search.value.toLowerCase())
  })
})

const itemsFilteredBySubcategory = computed(() => {
  if (subcategory.value === null) {
    return []
  }

  return itemsFiltered.value.filter(item => {
    return item.subcategoria_id === subcategory?.value?.id
  })
})
</script>

<style scoped lang="scss">
.apple {
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 35px;
}
</style>
