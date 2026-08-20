<!--
  BarraSimple.vue
  -----------------------------------------------------------------------
  Barra superior minimalista usada en páginas que NO son el inicio
  (detalle de proyecto, 404). A diferencia de BarraNavegacion.vue, no
  tiene menú de secciones ni scroll-spy — solo el logo y un botón para
  volver al portafolio, con el mismo estilo visual (píldora flotante).
  -----------------------------------------------------------------------
-->
<script setup>
import { ArrowLeft } from '@lucide/vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="fixed top-0 inset-x-0 z-50">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 mt-4 flex items-center justify-between">
      <RouterLink
        to="/"
        class="font-mono text-xs tracking-widest text-signal rounded-full border border-line bg-ink/70 backdrop-blur-xl px-4 py-2.5"
      >
        MEGG<span class="text-muted">.dev</span>
      </RouterLink>

      <RouterLink
        to="/"
        class="btn-back"
        aria-label="Volver al portafolio"
      >
        <span class="btn-back__icon">
          <ArrowLeft :size="14" :stroke-width="1.8" aria-hidden="true" />
        </span>
        <span>Volver al portafolio</span>
      </RouterLink>
    </div>
  </header>
</template>
