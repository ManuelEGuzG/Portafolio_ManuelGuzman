<script setup>
import { computed } from 'vue'
import BarraSimple from '@/componentes/BarraSimple.vue'
import { t } from '@/composables/usarIdioma.js'

const conocimientos = computed(() => {
  const cantidadDetalles = [5, 3, 4, 3]
  return cantidadDetalles.map((cantidad, indice) => ({
    titulo: t(`generalProfile.knowledge.${indice}.title`),
    descripcion: t(`generalProfile.knowledge.${indice}.description`),
    detalles: Array.from({ length: cantidad }, (_, detalle) =>
      t(`generalProfile.knowledge.${indice}.details.${detalle}`)
    )
  }))
})
</script>

<template>
  <div class="perfil-general min-h-screen">
    <BarraSimple />

    <main class="max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-20">
      <header v-revelar class="max-w-3xl">
        <p class="blueprint-tag">{{ t('generalProfile.label') }}</p>
        <h1 class="font-display font-semibold text-3xl sm:text-5xl mt-4 leading-tight text-paper">
          {{ t('generalProfile.title') }}
        </h1>
        <p class="text-muted mt-5 text-base sm:text-lg leading-relaxed">
          {{ t('generalProfile.intro') }}
        </p>
      </header>

      <section v-revelar class="mt-12">
        <p class="blueprint-tag">{{ t('generalProfile.knowledgeTitle') }}</p>
        <div class="grid sm:grid-cols-2 gap-4 mt-5">
          <article
            v-for="(item, indice) in conocimientos"
            :key="item.titulo"
            v-revelar="{ delay: indice * 80 }"
            class="panel p-5 sm:p-6"
          >
            <h2 class="font-mono text-sm text-signal">{{ item.titulo }}</h2>
            <p class="text-muted text-sm leading-relaxed mt-3">{{ item.descripcion }}</p>
            <div class="flex flex-wrap gap-2 mt-4">
              <span v-for="detalle in item.detalles" :key="detalle" class="tag text-xs">
                {{ detalle }}
              </span>
            </div>
          </article>
        </div>
      </section>

      <section v-revelar class="panel p-5 sm:p-6 mt-8">
        <p class="blueprint-tag">{{ t('generalProfile.licensesTitle') }}</p>
        <div class="flex flex-wrap gap-2 mt-4">
          <span class="tag">{{ t('generalProfile.carLicense') }}</span>
          <span class="tag">{{ t('generalProfile.motorcycleLicense') }}</span>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.perfil-general {
  --perfil-fondo: #090d18;
  --perfil-panel: #111827;
  --perfil-borde: #29334b;
  --perfil-texto: #f3f4f8;
  --perfil-secundario: #a1abc0;
  --perfil-acento: #b6a0ff;
  min-height: 100vh;
  color: var(--perfil-texto);
  background:
    radial-gradient(ellipse at 85% 12%, rgba(126, 99, 214, 0.14), transparent 34rem),
    radial-gradient(ellipse at 10% 70%, rgba(57, 141, 176, 0.08), transparent 38rem);
}

.perfil-general :deep(.panel) {
  background: var(--perfil-panel);
  border-color: var(--perfil-borde);
  box-shadow: 0 16px 38px -30px rgba(48, 37, 39, 0.35);
}

.perfil-general :deep(.tag) {
  color: var(--perfil-secundario);
  background: #0c1322;
  border-color: var(--perfil-borde);
}

.perfil-general :deep(.blueprint-tag),
.perfil-general :deep(.text-signal) {
  color: var(--perfil-acento);
}

.perfil-general :deep(.bg-signal) {
  background-color: var(--perfil-acento);
}

.perfil-general :deep(.border-signal) {
  border-color: var(--perfil-acento);
}

.perfil-general :deep(.text-paper) {
  color: var(--perfil-texto);
}

.perfil-general :deep(.text-muted) {
  color: var(--perfil-secundario);
}

.perfil-general :deep(.border-line) {
  border-color: var(--perfil-borde);
}

.perfil-general :deep(.bg-ink\/70),
.perfil-general :deep([role='group']) {
  background-color: rgba(9, 13, 24, 0.82);
}

.perfil-general :deep(header a.font-mono) {
  color: var(--perfil-acento);
  border-color: var(--perfil-borde);
  background-color: rgba(9, 13, 24, 0.82);
}

.perfil-general :deep(.btn-back),
.perfil-general :deep(.btn-back:hover) {
  color: var(--perfil-acento);
}

.perfil-general :deep([role='group'] button[aria-pressed='true']) {
  color: #090d18;
  background-color: var(--perfil-acento);
}

.perfil-general :deep(.tag:hover) {
  border-color: var(--perfil-acento);
}
</style>
