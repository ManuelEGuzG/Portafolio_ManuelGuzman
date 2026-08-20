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
import { X } from '@lucide/vue'

// Props recibidas del componente padre:
defineProps({
  tecnologias: { type: Array, required: true }, // lista de tecnologías únicas (para los botones)
  tipos: { type: Array, required: true }, // [{ value, label }] categorías de proyecto
  tecnologiaActiva: { type: String, default: null }, // tecnología actualmente seleccionada (o null)
  tipoActivo: { type: String, default: null } // tipo actualmente seleccionado (o null)
})

// Eventos que este componente puede emitir hacia el padre.
const emit = defineEmits(['update:tecnologiaActiva', 'update:tipoActivo', 'reiniciar'])
</script>

<template>
  <div class="panel p-5 sm:p-6 lg:sticky lg:top-24">
    <p class="blueprint-tag">Filtrar</p>
    <div class="section-divider" />

    <!-- Filtro por categoría (académico / cliente real / personal) -->
    <p class="font-mono text-xs text-muted mb-3 mt-4">Categoría</p>
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="tipo in tipos"
        :key="tipo.value"
        type="button"
        class="tag"
        :class="{ 'tag-active': tipoActivo === tipo.value }"
        @mousedown.prevent
        @click="emit('update:tipoActivo', tipoActivo === tipo.value ? null : tipo.value)"
      >
        {{ tipo.label }}
      </button>
    </div>

    <!-- Filtro por tecnología -->
    <p class="font-mono text-xs text-muted mb-3">Tecnología</p>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="tecnologia in tecnologias"
        :key="tecnologia"
        type="button"
        class="tag"
        :class="{ 'tag-active': tecnologiaActiva === tecnologia }"
        @mousedown.prevent
        @click="emit('update:tecnologiaActiva', tecnologiaActiva === tecnologia ? null : tecnologia)"
      >
        {{ tecnologia }}
      </button>
    </div>

    <!-- Botón para limpiar todos los filtros, solo aparece si hay alguno activo -->
    <button
      v-if="tecnologiaActiva || tipoActivo"
      type="button"
      class="font-mono text-xs text-signalWarm hover:underline mt-6"
      @mousedown.prevent
      @click="emit('reiniciar')"
    >
      <X :size="13" aria-hidden="true" /> limpiar filtros
    </button>
  </div>
</template>
