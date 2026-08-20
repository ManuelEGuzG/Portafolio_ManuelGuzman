<!--
  SeccionInicio.vue  (Hero)
  -----------------------------------------------------------------------
  Primera sección visible del sitio. Muestra el nombre, rol, un badge de
  estado, biografía corta, botones de acción (CV, GitHub, LinkedIn) y la
  pila de capas 3D (ver PilaSistemas.vue) representando el stack técnico.

  A propósito NO se usa una altura forzada (min-h-[100svh]) ni
  'overflow-hidden' en toda la sección: el alto lo determina el propio
  contenido (con padding generoso), así se garantiza que nada se vea
  recortado en ninguna pantalla, sin importar qué tan largo sea el texto.
  -----------------------------------------------------------------------
-->
<script setup>
import { ArrowDown, Code2, Download, Link2 } from '@lucide/vue'
import PilaSistemas from './PilaSistemas.vue'
import BotonMagnetico from './BotonMagnetico.vue'

defineProps({
  nombre: { type: String, required: true },
  rol: { type: String, required: true },
  biografia: { type: String, required: true },
  urlGithub: { type: String, required: true },
  urlLinkedin: { type: String, required: true },
  urlCv: { type: String, required: true },
  estado: { type: String, required: true },
  capas: { type: Array, required: true }
})

function irAProyectos() {
  document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="inicio" class="relative blueprint-bg scroll-mt-16">
    <div
      class="relative z-[1] max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center"
    >
      <!-- Columna de texto -->
      <div>
        <p class="blueprint-tag fade-in">Plano / Perfil Técnico</p>
        <h1 class="font-display font-semibold text-4xl sm:text-6xl leading-[1.05] mt-4 text-paper">
          {{ nombre }}
        </h1>

        <div class="flex flex-wrap items-center gap-3 mt-4">
          <p class="font-mono text-signal text-sm sm:text-base tracking-wide">
            {{ rol }}
          </p>
          <span class="inline-flex items-center gap-1.5 tag">
            <span class="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
            {{ estado }}
          </span>
        </div>

        <p class="text-muted mt-6 max-w-xl leading-relaxed">
          {{ biografia }}
        </p>

        <div class="mt-9 flex flex-wrap gap-4">
          <BotonMagnetico :href="urlCv" download class="btn-primary"><Download :size="16" aria-hidden="true" /> Descargar CV </BotonMagnetico>
          <BotonMagnetico :href="urlGithub" target="_blank" rel="noopener" class="btn-ghost">
            <Code2 :size="16" aria-hidden="true" />
            GitHub
          </BotonMagnetico>
          <BotonMagnetico :href="urlLinkedin" target="_blank" rel="noopener" class="btn-ghost">
            <Link2 :size="16" aria-hidden="true" />
            LinkedIn
          </BotonMagnetico>
        </div>

        <button
          type="button"
          class="mt-9 flex items-center gap-2 text-muted font-mono text-[10px] tracking-widest hover:text-signal transition-colors duration-300"
          @click="irAProyectos"
        >
          VER PROYECTOS
          <span class="w-8 h-px bg-current" />
          <ArrowDown :size="13" aria-hidden="true" />
        </button>
      </div>

      <!-- Pila de capas 3D — visible en TODAS las pantallas -->
      <div v-revelar="{ delay: 150 }">
        <PilaSistemas :capas="capas" />
      </div>
    </div>
  </section>
</template>
