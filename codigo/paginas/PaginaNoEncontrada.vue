<!--
  PaginaNoEncontrada.vue
  -----------------------------------------------------------------------
  Se muestra cuando la URL no coincide con ninguna ruta conocida
  (ver el comodín '/:pathMatch(.*)*' en rutas/router.js).
  -----------------------------------------------------------------------
-->
<script setup>
import { ArrowLeft } from '@lucide/vue'
import { RouterLink } from 'vue-router'
import BarraSimple from '@/componentes/BarraSimple.vue'
import { t } from '@/composables/usarIdioma.js'
</script>

<template>
  <div class="min-h-screen blueprint-bg flex flex-col">
    <BarraSimple />
    <div class="flex-1 flex flex-col items-center justify-center text-center px-4" v-revelar>
      <p class="blueprint-tag">404</p>
      <h1 class="font-display text-2xl sm:text-3xl mt-3">{{ t('notFound.title') }}</h1>
      <p class="text-muted mt-2">{{ t('notFound.description') }}</p>
      <RouterLink to="/" class="btn-back mt-6" :aria-label="t('back')">
        <span class="btn-back__icon"><ArrowLeft :size="14" :stroke-width="1.8" aria-hidden="true" /></span>
        {{ t('back') }}
      </RouterLink>
    </div>
  </div>
</template>
