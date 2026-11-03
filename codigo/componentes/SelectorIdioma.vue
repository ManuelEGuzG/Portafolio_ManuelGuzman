<script setup>
import { cambiarIdioma, idioma } from '@/composables/usarIdioma.js'

const idiomas = [
  { codigo: 'es', nombre: 'Español' },
  { codigo: 'en', nombre: 'English' },
  { codigo: 'fr', nombre: 'Français' }
]
</script>

<template>
  <div
    role="group"
    class="inline-flex items-center gap-0.5 rounded-full border border-line bg-ink/70 p-1"
    :aria-label="idioma === 'es' ? 'Seleccionar idioma' : idioma === 'en' ? 'Choose language' : 'Choisir la langue'"
  >
    <button
      v-for="opcion in idiomas"
      :key="opcion.codigo"
      type="button"
      class="rounded-full px-2 py-1.5 font-mono text-[10px] tracking-wide transition-colors duration-200"
      :class="idioma === opcion.codigo ? 'bg-signal text-ink' : 'text-muted hover:text-paper'"
      :aria-label="opcion.nombre"
      :aria-pressed="idioma === opcion.codigo"
      @click="cambiarIdioma(opcion.codigo)"
    >
      {{ opcion.codigo.toUpperCase() }}
    </button>
  </div>
</template>
