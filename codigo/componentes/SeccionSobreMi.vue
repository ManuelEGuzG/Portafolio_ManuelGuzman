<!--
  SeccionSobreMi.vue
  -----------------------------------------------------------------------
  Sección de perfil: resumen, habilidades técnicas agrupadas por
  categoría, y línea de tiempo de formación académica.

  Las tecnologías se mantienen en datos/tecnologias.js; la formación
  académica se define en este componente.
  -----------------------------------------------------------------------
-->
<script setup>
import { computed } from 'vue'
import { gruposTecnicos } from '@/datos/tecnologias.js'
import { t, tecnologiaLocalizada } from '@/composables/usarIdioma.js'

// Formación académica, en el orden en que se muestra (más reciente primero).
// 'actual: true' marca el punto de la línea de tiempo en color de acento
// (para indicar el estudio que cursas actualmente).
const formacionAcademica = [
  {
    titulo: 'Bachillerato en Informática Empresarial',
    lugar: 'Universidad de Costa Rica',
    periodo: '2023 — 2027',
    actual: true
  },
  {
    titulo: 'Bachiller en Educación Media — Sección Francés Avanzado',
    lugar: 'Instituto de Guanacaste',
    periodo: '2020 — 2022'
  },
  {
    titulo: 'Técnico en Guía Naturalista',
    lugar: 'Instituto de Guanacaste',
    periodo: '2021 — 2022'
  },
  {
    titulo: 'Curso de Alfabetización de Seguridad Digital',
    lugar: 'Instituto Nacional de Aprendizaje',
    periodo: '2025'
  },
  {
    titulo: 'Curso de Servicio al Cliente',
    lugar: 'Instituto Técnico Nacional',
    periodo: '2026'
  }
]

const habilidadesTraducidas = computed(() => gruposTecnicos.map((grupo) => ({
  categoria: t(`about.skills.${grupo.indiceEtiqueta}`),
  tecnologias: grupo.tecnologias
})))

const practicasTraducidas = computed(() => [0, 1, 2, 3].map((indice) => ({
  titulo: t(`about.practices.${indice}.title`),
  descripcion: t(`about.practices.${indice}.description`)
})))

const formacionTraducida = computed(() => formacionAcademica.map((estudio, indice) => ({
  ...estudio,
  titulo: t(`about.studies.${indice}`)
})))
</script>

<template>
  <section id="sobre-mi" class="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 scroll-mt-16">
    <div v-revelar>
      <p class="blueprint-tag">{{ t('section') }} 03</p>
      <h2 class="font-display font-semibold text-3xl sm:text-4xl mt-3">{{ t('about.title') }}</h2>
      <p class="text-muted mt-4 max-w-2xl leading-relaxed">
        {{ t('about.description') }}
      </p>
    </div>

    <!-- Tarjetas de habilidades por categoría -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-9">
      <div
        v-for="(grupo, indice) in habilidadesTraducidas"
        :key="grupo.categoria"
        v-revelar="{ delay: indice * 100 }"
        class="panel p-5"
      >
        <p class="font-mono text-sm text-signal mb-4">{{ grupo.categoria }}</p>
        <div class="flex flex-wrap gap-1.5">
          <span v-for="tecnologia in grupo.tecnologias" :key="tecnologia" class="tag">
            {{ tecnologiaLocalizada(tecnologia) }}
          </span>
        </div>
      </div>
    </div>

    <div v-revelar class="mt-12">
      <p class="blueprint-tag">{{ t('about.practicesTitle') }}</p>
      <div class="grid sm:grid-cols-2 gap-4 mt-5">
        <article
          v-for="(practica, indice) in practicasTraducidas"
          :key="practica.titulo"
          v-revelar="{ delay: indice * 80 }"
          class="panel p-5"
        >
          <h3 class="font-mono text-sm text-signal">{{ practica.titulo }}</h3>
          <p class="text-muted text-sm leading-relaxed mt-2">{{ practica.descripcion }}</p>
        </article>
      </div>
    </div>

    <!-- Línea de tiempo de formación académica -->
    <div v-revelar class="mt-14">
      <p class="blueprint-tag">{{ t('about.education') }}</p>
      <div class="section-divider mb-8" />

      <div class="relative">
        <div class="absolute left-[7px] top-2 bottom-2 w-px bg-line" aria-hidden="true" />
        <ol class="space-y-8">
          <li
            v-for="(estudio, indice) in formacionTraducida"
            :key="estudio.titulo"
            v-revelar="{ delay: indice * 90 }"
            class="relative pl-8"
          >
            <!-- Punto de la línea de tiempo (resaltado si es el estudio actual) -->
            <span
              class="absolute left-0 top-0.5 w-4 h-4 rounded-full border-[3px] z-[1]"
              :class="estudio.actual ? 'bg-signal border-signal' : 'bg-ink border-line'"
            />
            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-8">
              <p class="font-semibold text-paper leading-snug">{{ estudio.titulo }}</p>
              <span class="font-mono text-xs text-signal shrink-0">{{ estudio.periodo }}</span>
            </div>
            <p class="text-muted text-sm mt-1">{{ estudio.lugar }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
