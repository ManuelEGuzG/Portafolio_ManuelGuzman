<!--
  SeccionContacto.vue
  -----------------------------------------------------------------------
  Última sección del sitio: llamado a la acción para contactarte, con
  correo, teléfono (opcional), ubicación (opcional), GitHub y LinkedIn.
  Incluye el pie de página (footer) con el aviso de copyright.
  -----------------------------------------------------------------------
-->
<script setup>
import { Code2, Link2, Mail, MapPin, Phone } from '@lucide/vue'
import BotonMagnetico from './BotonMagnetico.vue'

defineProps({
  correo: { type: String, required: true },
  telefono: { type: String, default: '' }, // opcional: si viene vacío, el botón no se muestra
  ubicacion: { type: String, default: '' }, // opcional: si viene vacío, no se muestra
  urlGithub: { type: String, required: true },
  urlLinkedin: { type: String, required: true }
})
</script>

<template>
  <section id="contacto" class="relative overflow-hidden blueprint-bg scroll-mt-16">
    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center" v-revelar>
      <p class="blueprint-tag justify-center inline-flex">Sec. 04</p>
      <h2 class="font-display font-semibold text-3xl sm:text-5xl mt-4 leading-tight">
        Construyamos<br class="hidden sm:block" /> algo juntos.
      </h2>
      <p class="text-muted mt-5 max-w-xl mx-auto">
        Estoy buscando mi primera oportunidad como desarrollador. Si mi perfil encaja con tu equipo,
        escríbeme — respondo rápido.
      </p>

      <p v-if="ubicacion" class="inline-flex items-center gap-2 font-mono text-xs text-muted mt-6">
        <MapPin :size="14" :stroke-width="1.8" aria-hidden="true" />
        {{ ubicacion }}
      </p>

      <div class="flex flex-wrap justify-center gap-4 mt-8">
        <BotonMagnetico :href="`mailto:${correo}`" class="btn-primary"><Mail :size="16" aria-hidden="true" /> {{ correo }}</BotonMagnetico>
        <BotonMagnetico v-if="telefono" :href="`tel:${telefono.replace(/[^+\\d]/g, '')}`" class="btn-ghost">
          <Phone :size="16" aria-hidden="true" /> {{ telefono }}
        </BotonMagnetico>
        <BotonMagnetico :href="urlGithub" target="_blank" rel="noopener" class="btn-ghost">
          <Code2 :size="16" aria-hidden="true" />
          GitHub
        </BotonMagnetico>
        <BotonMagnetico :href="urlLinkedin" target="_blank" rel="noopener" class="btn-ghost">
          <Link2 :size="16" aria-hidden="true" />
          LinkedIn
        </BotonMagnetico>
      </div>
    </div>

    <footer class="relative border-t border-line px-4 sm:px-6 py-6">
      <p class="text-center font-mono text-[11px] text-muted">
        © {{ new Date().getFullYear() }} Manuel Guzmán — hecho con Vue 3 + Vite + Tailwind
      </p>
    </footer>
  </section>
</template>
