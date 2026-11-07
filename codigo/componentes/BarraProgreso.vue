<!--
  BarraProgreso.vue
  -----------------------------------------------------------------------
  Línea fina de color en la parte superior de la pantalla que se llena
  brevemente cada vez que se navega a otra página (ej. al entrar al
  detalle de un proyecto). Es puramente decorativa: da la sensación de
  "carga" típica de sitios profesionales, aunque la navegación sea
  instantánea (SPA).

  El estado 'enProgreso' lo controla codigo/rutas/router.js mediante
  el composable usarProgresoRuta.js.
  -----------------------------------------------------------------------
-->
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usarProgresoRuta } from '@/composables/usarProgresoRuta.js'

const { enProgreso } = usarProgresoRuta()
const route = useRoute()
const esPerfilGeneral = computed(() => route.path === '/perfil-general')
</script>

<template>
  <div class="fixed top-0 inset-x-0 z-[60] h-[2px] pointer-events-none">
    <div
      class="h-full transition-all ease-out"
      :class="[esPerfilGeneral ? 'bg-violet-300' : 'bg-signal', enProgreso ? 'w-full opacity-100 duration-500' : 'w-0 opacity-0 duration-200']"
    />
  </div>
</template>
