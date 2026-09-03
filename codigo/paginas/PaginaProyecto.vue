<!-- PaginaProyecto.vue -->
<script setup>
import { ref, computed } from 'vue'
import { ArrowLeft, ArrowRight, ExternalLink, FileText, X } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { proyectos } from '@/datos/proyectos.js'
import BarraSimple from '@/componentes/BarraSimple.vue'
import IntercambioTarjetas from '@/componentes/IntercambioTarjetas.vue'

const props = defineProps({
  id: { type: String, required: true }
})

const etiquetasDeTipo = {
  academico: 'Académico',
  cliente: 'Cliente real',
  personal: 'Personal'
}

const indiceActual = computed(() => proyectos.findIndex((p) => p.id === props.id))

const proyecto = computed(() =>
  indiceActual.value !== -1 ? proyectos[indiceActual.value] : undefined
)

const proyectoAnterior = computed(() => (indiceActual.value > 0 ? proyectos[indiceActual.value - 1] : null))
const proyectoSiguiente = computed(() =>
  indiceActual.value !== -1 && indiceActual.value < proyectos.length - 1
    ? proyectos[indiceActual.value + 1]
    : null
)

// Visor de pantalla completa
const imagenModal = ref(null)

const abrirModal = (url) => {
  imagenModal.value = url
}

const cerrarModal = () => {
  imagenModal.value = null
}
</script>

<template>
  <div class="min-h-screen blueprint-bg">
    <BarraSimple />

    <template v-if="proyecto">
      <header class="relative overflow-hidden pt-32 pb-14 px-4 sm:px-6">
        <div class="relative max-w-4xl mx-auto" v-revelar>
          <p class="blueprint-tag">{{ etiquetasDeTipo[proyecto.tipo] }}</p>
          <h1 class="font-display font-semibold text-3xl sm:text-5xl mt-4 leading-tight text-paper break-words">
            {{ proyecto.titulo }}
          </h1>
          <div class="flex flex-wrap gap-2 mt-6">
            <span v-for="tecnologia in proyecto.tecnologias" :key="tecnologia" class="tag">
              {{ tecnologia }}
            </span>
          </div>
        </div>
      </header>

      <main class="max-w-4xl mx-auto px-4 sm:px-6 pb-20 grid sm:grid-cols-[1fr_260px] gap-10">
        <div v-revelar="{ delay: 80 }">
          <p class="blueprint-tag mb-3">Descripción</p>
          <p class="text-muted leading-relaxed text-base sm:text-lg">
            {{ proyecto.descripcion }}
          </p>

          <!-- Componente CardSwap (IntercambioTarjetas) -->
          <div v-if="proyecto.imagenes?.length" class="mt-12 overflow-hidden py-6">
            <p class="blueprint-tag mb-6">Galería de capturas ({{ proyecto.imagenes.length }})</p>
            
            <div class="h-[380px] sm:h-[440px] flex items-center justify-center">
              <IntercambioTarjetas
                :width="360"
                :height="240"
                :card-distance="45"
                :vertical-distance="45"
                :delay="4000"
                easing="elastic"
                :pause-on-hover="true"
                @click-card="(idx) => abrirModal(proyecto.imagenes[idx])"
              >
                <div 
                  v-for="(img, idx) in proyecto.imagenes" 
                  :key="idx"
                  class="w-full h-full relative group"
                >
                  <img 
                    :src="img" 
                    :alt="`Captura ${idx + 1}`" 
                    class="w-full h-full object-contain bg-black/95"
                  />
                  <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-3 flex justify-between items-center text-xs font-mono text-paper">
                    <span>Captura {{ idx + 1 }}</span>
                    <span class="text-signal text-[10px]">Ampliar</span>
                  </div>
                </div>
              </IntercambioTarjetas>
            </div>
          </div>

          <div class="flex items-center gap-3 mt-8 font-mono text-xs text-muted">
            <span class="text-signal">+{{ proyecto.estadisticas.agregadas }}</span>
            <span class="text-signalWarm">−{{ proyecto.estadisticas.eliminadas }}</span>
          </div>
        </div>

        <aside v-revelar="{ delay: 160 }" class="space-y-6">
          <div class="panel p-5">
            <p class="blueprint-tag mb-4">Demostración</p>
            <div class="flex flex-col gap-3">
              <a
                v-if="proyecto.urlDemo"
                :href="proyecto.urlDemo"
                target="_blank"
                rel="noopener"
                class="btn-primary justify-center w-full break-words text-center"
              >
                Ver demo <ExternalLink :size="15" aria-hidden="true" />
              </a>
              <p v-else class="font-mono text-xs text-muted">
                Demo no disponible públicamente.
              </p>
            </div>
          </div>

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

      <nav
        v-if="proyectoAnterior || proyectoSiguiente"
        class="border-t border-line max-w-4xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 items-start gap-4 font-mono text-xs"
      >
        <RouterLink
          v-if="proyectoAnterior"
          :to="`/proyecto/${proyectoAnterior.id}`"
          class="text-muted hover:text-signal transition-colors duration-300 min-w-0"
        >
          <span class="inline-flex items-start gap-1.5 max-w-full break-words">
            <ArrowLeft class="shrink-0 mt-0.5" :size="14" aria-hidden="true" /> {{ proyectoAnterior.titulo }}
          </span>
        </RouterLink>
        <span v-else />

        <RouterLink
          v-if="proyectoSiguiente"
          :to="`/proyecto/${proyectoSiguiente.id}`"
          class="text-muted hover:text-signal transition-colors duration-300 min-w-0 text-right"
        >
          <span class="inline-flex items-start justify-end gap-1.5 max-w-full break-words">
            {{ proyectoSiguiente.titulo }} <ArrowRight class="shrink-0 mt-0.5" :size="14" aria-hidden="true" />
          </span>
        </RouterLink>
      </nav>

      <!-- Modal de imagen -->
      <Teleport to="body">
        <div
          v-if="imagenModal"
          class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          @click="cerrarModal"
        >
          <div class="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center" @click.stop>
            <button
              class="absolute -top-10 right-0 text-paper hover:text-signal p-2 transition-colors"
              @click="cerrarModal"
              aria-label="Cerrar vista previa"
            >
              <X :size="24" />
            </button>
            <img
              :src="imagenModal"
              alt="Vista ampliada"
              class="max-w-full max-h-[85vh] object-contain rounded border border-line"
            />
          </div>
        </div>
      </Teleport>
    </template>

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