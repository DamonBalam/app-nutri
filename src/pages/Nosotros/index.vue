<template>
  <q-page class="q-pa-md">
    <AppleTitle title="¿Quiénes somos?" />
    <p class="q-mt-md q-pb-md q-px-md" style="text-align: justify">
      Somos a una organización dedicada a optimizar el bienestar de los
      individuos a través de terapias nutricionales especializadas. Nuestra
      misión radica en proporcionar asesoramiento completo y entregar las
      herramientas necesarias para potenciar su salud nutricional y/o
      rendimiento deportivo.
    </p>
    <AppleTitle title="¿De qué manera lo logramos?" />
    <p class="q-mt-md q-px-md" style="text-align: justify">
      Nuestro enfoque se fundamenta en la experiencia y la investigación
      científica en el campo de la nutrición en general y la nutrición deportiva
      en particular. Así, cada consulta se transforma en una sesión instructiva
      de gran valor, sin recurrir a dietas extremas o restrictivas.
    </p>
    <p class="q-mt-md q-px-md">
      Todos nuestros planes nutricionales son diseñados teniendo en cuenta las
      características fisiológicas individuales. Reconocemos que cada ser humano
      es único y que su nutrición debe ajustarse a variables como la edad,
      género, altura, metabolismo, estilo de vida, nivel de actividad física,
      rutinas de ejercicio, horarios de comida, entre otros factores.
    </p>
    <div class="flex justify-center">
      <h5 class="q-mt-md q-mb-md q-px-md">Dra. Natalia Segura Álvarez</h5>
      <q-btn href="https://www.nutricionistacostarica.com" target="_blank" color="primary" >Más información</q-btn>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppleTitle from 'components/AppleTitle.vue'
import { useAuthStore } from 'stores/auth'

const store = useAuthStore()
</script>
