<!--
  TarjetaProyecto.vue
  -----------------------------------------------------------------------
  Tarjeta individual que representa UN proyecto dentro de la galería.
  Es un <RouterLink> completo: al hacer clic en cualquier parte de la
  tarjeta, navega a la página de detalle del proyecto (/proyecto/:id),
  donde se muestran la demo, el repositorio y los documentos.

  Incluye:
    - Una cabecera decorativa con el "monograma" del proyecto (sus
      iniciales) y un ícono según su categoría.
    - El efecto "spotlight": un resplandor que sigue al cursor mientras
      pasa sobre la tarjeta (ver .spot-card en recursos/estilos.css).
    - Una flecha que se desliza al pasar el mouse, como indicador de
      que la tarjeta lleva a otra página.
  -----------------------------------------------------------------------
-->
<script setup>
import { computed } from 'vue'
import { ArrowUpRight, BriefcaseBusiness, GraduationCap, Wrench } from '@lucide/vue'

const props = defineProps({
  proyecto: { type: Object, required: true }
})

// Traduce el valor interno del campo 'tipo' a un texto legible.
const etiquetasDeTipo = {
  academico: 'Académico',
  cliente: 'Cliente real',
  personal: 'Personal'
}

// Ícono decorativo según la categoría del proyecto.
const iconosDeTipo = {
  academico: GraduationCap,
  cliente: BriefcaseBusiness,
  personal: Wrench
}

/**
 * Genera un "monograma" de 1-2 letras a partir del título del proyecto,
 * para usarlo como elemento decorativo en la cabecera de la tarjeta
 * (ej: "NexusStore..." -> "NS").
 */
const iniciales = computed(() => {
  return props.proyecto.titulo
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((palabra) => palabra[0])
    .join('')
    .toUpperCase()
})

/**
 * Actualiza las variables CSS --x y --y con la posición del cursor
 * relativa a la tarjeta, usadas por el efecto spotlight en el CSS.
 */
function alMoverMouse(evento) {
  const tarjeta = evento.currentTarget
  const rect = tarjeta.getBoundingClientRect()
  tarjeta.style.setProperty('--x', `${evento.clientX - rect.left}px`)
  tarjeta.style.setProperty('--y', `${evento.clientY - rect.top}px`)
}
</script>

<template>
  <RouterLink
    :to="`/proyecto/${proyecto.id}`"
    class="spot-card panel overflow-hidden flex flex-col h-full group transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
    @mousemove="alMoverMouse"
  >
    <!-- Portada visual del proyecto, con monograma como fallback -->
    <div class="relative h-40 flex items-center justify-center overflow-hidden blueprint-bg border-b border-line shrink-0">
      <img
        v-if="proyecto.imagen"
        :src="proyecto.imagen"
        :alt="`Vista previa de ${proyecto.titulo}`"
        class="absolute inset-0 w-full h-full object-cover opacity-75 transition-transform duration-500 group-hover:scale-105"
      />
      <div v-if="proyecto.imagen" class="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
      <span v-else class="font-display text-4xl font-semibold text-signal/25 tracking-wider select-none">
        {{ iniciales }}
      </span>
      <component :is="iconosDeTipo[proyecto.tipo]" class="absolute top-3 right-3 z-[1] text-signal" :size="20" :stroke-width="1.6" aria-hidden="true" />
    </div>

    <div class="relative z-[2] flex flex-col h-full p-6">
      <div class="flex items-start justify-between gap-3">
        <h3 class="font-display font-semibold text-paper text-lg leading-snug">
          {{ proyecto.titulo }}
        </h3>
        <span class="tag shrink-0">{{ etiquetasDeTipo[proyecto.tipo] }}</span>
      </div>

      <p class="text-muted text-sm mt-3 flex-1 leading-relaxed line-clamp-3">
        {{ proyecto.descripcion }}
      </p>

      <!-- Todas las tecnologías del proyecto, sin recortar -->
      <div class="flex flex-wrap gap-2 mt-4">
        <span v-for="tecnologia in proyecto.tecnologias" :key="tecnologia" class="tag">
          {{ tecnologia }}
        </span>
      </div>

      <!-- Indicador de navegación a la página de detalle -->
      <div class="mt-5 flex items-center gap-1.5 font-mono text-xs text-signal">
        Ver caso completo
        <ArrowUpRight :size="15" class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </div>
    </div>
  </RouterLink>
</template>
