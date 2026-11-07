<!--
  FiltroProyectos.vue
  -----------------------------------------------------------------------
  Panel de filtros para la galería de proyectos. Es un componente "tonto"
  (no tiene lógica propia de filtrado): solo muestra botones y avisa al
  componente padre (GaleriaProyectos.vue) qué se seleccionó, mediante
  eventos ($emit). Toda la lógica de filtrado real vive en el padre,
  usando 'computed' — así este componente se puede reutilizar en
  cualquier otro lugar sin cambios.
  -----------------------------------------------------------------------
-->
<script setup>
import { ChevronDown, X } from '@lucide/vue'
import { t, tecnologiaLocalizada } from '@/composables/usarIdioma.js'

// Props recibidas del componente padre:
defineProps({
  gruposTecnologia: { type: Array, required: true },
  tipos: { type: Array, required: true }, // [{ value, label }] categorías de proyecto
  tecnologiaActiva: { type: String, default: null }, // tecnología actualmente seleccionada (o null)
  tipoActivo: { type: String, default: null } // tipo actualmente seleccionado (o null)
})

// Eventos que este componente puede emitir hacia el padre.
const emit = defineEmits(['update:tecnologiaActiva', 'update:tipoActivo', 'reiniciar'])
</script>

<template>
  <div class="panel p-5 sm:p-6 lg:sticky lg:top-24">
    <p class="blueprint-tag">{{ t('filters.title') }}</p>
    <div class="section-divider mb-4" />

    <!-- Filtro por categoría (académico / cliente real / personal) -->
    <p class="font-mono text-xs text-muted mb-3">{{ t('filters.category') }}</p>
    <div class="flex flex-wrap gap-2 mb-5">
      <button
        v-for="tipo in tipos"
        :key="tipo.value"
        type="button"
        class="tag cursor-pointer"
        :class="{ 'tag-active': tipoActivo === tipo.value }"
        :aria-pressed="tipoActivo === tipo.value"
        @mousedown.prevent
        @click="emit('update:tipoActivo', tipoActivo === tipo.value ? null : tipo.value)"
      >
        {{ tipo.label }}
      </button>
    </div>

    <!-- Filtro por tecnología -->
    <p class="font-mono text-xs text-muted mb-2">{{ t('filters.technology') }}</p>
    <div class="divide-y divide-line">
      <details v-for="grupo in gruposTecnologia" :key="grupo.indiceEtiqueta" class="group">
        <summary class="flex cursor-pointer list-none items-center justify-between gap-3 py-3 font-mono text-xs text-paper [&::-webkit-details-marker]:hidden">
          <span>{{ t(`about.skills.${grupo.indiceEtiqueta}`) }}</span>
          <span class="flex items-center gap-2 text-muted">
            <span>{{ grupo.tecnologias.length }}</span>
            <span
              v-if="tecnologiaActiva && grupo.tecnologias.includes(tecnologiaActiva)"
              class="max-w-24 truncate text-signal"
            >
              {{ tecnologiaLocalizada(tecnologiaActiva) }}
            </span>
            <ChevronDown :size="14" class="transition-transform group-open:rotate-180" aria-hidden="true" />
          </span>
        </summary>
        <div class="flex flex-wrap gap-2 pb-3">
          <button
            v-for="tecnologia in grupo.tecnologias"
            :key="tecnologia"
            type="button"
            class="tag cursor-pointer"
            :class="{ 'tag-active': tecnologiaActiva === tecnologia }"
            :aria-pressed="tecnologiaActiva === tecnologia"
            @mousedown.prevent
            @click="emit('update:tecnologiaActiva', tecnologiaActiva === tecnologia ? null : tecnologia)"
          >
            {{ tecnologiaLocalizada(tecnologia) }}
          </button>
        </div>
      </details>
    </div>

    <!-- Botón para limpiar todos los filtros, solo aparece si hay alguno activo -->
    <button
      v-if="tecnologiaActiva || tipoActivo"
      type="button"
      class="font-mono text-xs text-signalWarm hover:underline mt-6"
      @mousedown.prevent
      @click="emit('reiniciar')"
    >
      <X :size="13" aria-hidden="true" /> {{ t('filters.clear') }}
    </button>
  </div>
</template>
