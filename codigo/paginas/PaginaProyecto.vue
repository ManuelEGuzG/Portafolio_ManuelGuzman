<!--
  PaginaProyecto.vue
  -----------------------------------------------------------------------
  Página de detalle de UN proyecto (ruta '/proyecto/:id').

  Vue Router le pasa el 'id' de la URL como prop automáticamente
  (gracias a 'props: true' en rutas/router.js). Con ese id buscamos
  el proyecto correspondiente en datos/proyectos.js.

  Muestra:
    - Encabezado con título, categoría y tecnologías
    - Descripción completa
    - Enlace a demo (si existe)
    - Hasta 5 repositorios con títulos personalizados
    - Documentos de referencia (si existen)
    - Navegación al proyecto anterior/siguiente

  Si el id no corresponde a ningún proyecto, se muestra un estado
  "no encontrado" con un botón para volver al portafolio.
  -----------------------------------------------------------------------
-->
<script setup>
import { computed } from 'vue'
import { ArrowLeft, ArrowRight, ExternalLink, FileText } from '@lucide/vue'
import { RouterLink } from 'vue-router'
import { proyectos } from '@/datos/proyectos.js'
import BarraSimple from '@/componentes/BarraSimple.vue'

const props = defineProps({
  id: { type: String, required: true }
})

// Traduce el valor interno del campo 'tipo' a un texto legible.
const etiquetasDeTipo = {
  academico: 'Académico',
  cliente: 'Cliente real',
  personal: 'Personal'
}

// Posición del proyecto actual dentro del array (-1 si no existe).
const indiceActual = computed(() => proyectos.findIndex((p) => p.id === props.id))

// El proyecto encontrado, o 'undefined' si el id no coincide con ninguno.
const proyecto = computed(() =>
  indiceActual.value !== -1 ? proyectos[indiceActual.value] : undefined
)

// Proyecto anterior/siguiente en la lista, para la navegación del pie
// de página. Son 'null' cuando no hay uno (estás en el primero o el último).
const proyectoAnterior = computed(() => (indiceActual.value > 0 ? proyectos[indiceActual.value - 1] : null))
const proyectoSiguiente = computed(() =>
  indiceActual.value !== -1 && indiceActual.value < proyectos.length - 1
    ? proyectos[indiceActual.value + 1]
    : null
)
</script>

<template>
  <div class="min-h-screen blueprint-bg">
    <BarraSimple />

    <!-- ================= Proyecto encontrado ================= -->
    <template v-if="proyecto">
      <!-- Encabezado -->
      <header class="relative overflow-hidden pt-32 pb-14 px-4 sm:px-6">
        <div class="relative max-w-4xl mx-auto" v-revelar>
          <p class="blueprint-tag">{{ etiquetasDeTipo[proyecto.tipo] }}</p>
          <h1 class="font-display font-semibold text-3xl sm:text-5xl mt-4 leading-tight text-paper">
            {{ proyecto.titulo }}
          </h1>
          <div class="flex flex-wrap gap-2 mt-6">
            <span v-for="tecnologia in proyecto.tecnologias" :key="tecnologia" class="tag">
              {{ tecnologia }}
            </span>
          </div>
        </div>
      </header>

      <!-- Contenido: descripción + barra lateral de enlaces/documentos -->
      <main class="max-w-4xl mx-auto px-4 sm:px-6 pb-20 grid sm:grid-cols-[1fr_260px] gap-10">
        <div v-revelar="{ delay: 80 }">
          <p class="blueprint-tag mb-3">Descripción</p>
          <p class="text-muted leading-relaxed text-base sm:text-lg">
            {{ proyecto.descripcion }}
          </p>

          <!-- Estadísticas decorativas estilo "git diff" -->
          <div class="flex items-center gap-3 mt-8 font-mono text-xs text-muted">
            <span class="text-signal">+{{ proyecto.estadisticas.agregadas }}</span>
            <span class="text-signalWarm">−{{ proyecto.estadisticas.eliminadas }}</span>
          </div>
        </div>

        <aside v-revelar="{ delay: 160 }" class="space-y-6">
          <!-- Enlaces a demo y repositorios -->
          <div class="panel p-5">
            <p class="blueprint-tag mb-4">Enlaces</p>
            <div class="flex flex-col gap-3">
              <a
                v-if="proyecto.urlDemo"
                :href="proyecto.urlDemo"
                target="_blank"
                rel="noopener"
                class="btn-primary justify-center"
              >
                Ver demo <ExternalLink :size="15" aria-hidden="true" />
              </a>
              <a
                v-for="(repositorio, indice) in (proyecto.repositorios || []).slice(0, 5)"
                :key="repositorio.url"
                :href="repositorio.url"
                target="_blank"
                rel="noopener"
                class="btn-ghost justify-center"
              >
                {{ repositorio.titulo || `Repositorio ${indice + 1}` }}
                <ExternalLink :size="15" aria-hidden="true" />
              </a>
              <p v-if="!proyecto.urlDemo && !(proyecto.repositorios || []).length" class="font-mono text-xs text-muted">
                Aún no disponibles públicamente.
              </p>
            </div>
          </div>

          <!-- Documentos de referencia, solo si existen -->
          <div v-if="proyecto.documentos?.length" class="panel p-5">
            <p class="blueprint-tag mb-4">Documentos</p>
            <ul class="space-y-2.5">
              <li v-for="documento in proyecto.documentos" :key="documento.url">
                <a
                  :href="documento.url"
                  target="_blank"
                  rel="noopener"
                  class="flex items-center gap-2 font-mono text-xs text-paper hover:text-signal transition-colors duration-300"
                >
                  <FileText :size="14" aria-hidden="true" /> {{ documento.titulo }}
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </main>

      <!-- Navegación al proyecto anterior/siguiente -->
      <nav
        v-if="proyectoAnterior || proyectoSiguiente"
        class="border-t border-line max-w-4xl mx-auto px-4 sm:px-6 py-8 flex items-center justify-between gap-4 font-mono text-xs"
      >
        <RouterLink
          v-if="proyectoAnterior"
          :to="`/proyecto/${proyectoAnterior.id}`"
          class="text-muted hover:text-signal transition-colors duration-300 truncate"
        >
          <span class="inline-flex items-center gap-1.5"><ArrowLeft :size="14" aria-hidden="true" /> {{ proyectoAnterior.titulo }}</span>
        </RouterLink>
        <span v-else />

        <RouterLink
          v-if="proyectoSiguiente"
          :to="`/proyecto/${proyectoSiguiente.id}`"
          class="text-muted hover:text-signal transition-colors duration-300 truncate text-right"
        >
          <span class="inline-flex items-center gap-1.5">{{ proyectoSiguiente.titulo }} <ArrowRight :size="14" aria-hidden="true" /></span>
        </RouterLink>
      </nav>
    </template>

    <!-- ================= Proyecto no encontrado ================= -->
    <template v-else>
      <div class="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p class="blueprint-tag">404</p>
        <h1 class="font-display text-2xl sm:text-3xl mt-3">Proyecto no encontrado</h1>
        <p class="text-muted mt-2">El proyecto que buscas no existe o fue movido.</p>
        <RouterLink to="/" class="btn-back mt-6" aria-label="Volver al portafolio">
          <span class="btn-back__icon"><ArrowLeft :size="14" :stroke-width="1.8" aria-hidden="true" /></span>
          Volver al portafolio
        </RouterLink>
      </div>
    </template>
  </div>
</template>
