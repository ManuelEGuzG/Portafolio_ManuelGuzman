<!--
  SeccionSobreMi.vue
  -----------------------------------------------------------------------
  Sección de perfil: resumen, habilidades técnicas agrupadas por
  categoría, y línea de tiempo de formación académica.

  Para editar tus habilidades o estudios, modifica los objetos
  'habilidades' y 'formacionAcademica' de aquí abajo.
  -----------------------------------------------------------------------
-->
<script setup>
// Habilidades agrupadas por categoría. La clave del objeto (ej. "Lenguajes")
// es el título de cada tarjeta, y el array son los tags que se muestran dentro.
const habilidades = {
  Lenguajes: ['PHP', 'JavaScript', 'Python', 'Java', 'C#', 'HTML5', 'CSS3'],
  'Bases de datos': ['MySQL', 'PostgreSQL', 'SQL Server', 'MongoDB'],
  'Frameworks / APIs': ['Vue.js', 'Laravel', 'ASP.NET', 'APIs REST'],
  Herramientas: ['Git', 'Docker', 'Postman', 'Linux', 'Windows', 'Power BI', 'Microsoft Office']
}

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
</script>

<template>
  <section id="sobre-mi" class="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 scroll-mt-16">
    <div v-revelar>
      <p class="blueprint-tag">Sec. 03</p>
      <h2 class="font-display font-semibold text-3xl sm:text-4xl mt-3">Perfil y stack técnico</h2>
      <p class="text-muted mt-4 max-w-2xl leading-relaxed">
        Estudiante de cuarto año de Informática Empresarial en la Universidad de Costa Rica, con
        experiencia práctica en proyectos académicos y personales aplicando distintos lenguajes de
        programación, tecnologías web, gestores de bases de datos, sistemas operativos, herramientas de
        desarrollo y entornos virtualizados.
      </p>
    </div>

    <!-- Tarjetas de habilidades por categoría -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-9">
      <div
        v-for="(tags, categoria) in habilidades"
        :key="categoria"
        v-revelar="{ delay: Object.keys(habilidades).indexOf(categoria) * 100 }"
        class="panel p-5"
      >
        <p class="font-mono text-sm text-signal mb-4">{{ categoria }}</p>
        <div class="flex flex-wrap gap-1.5">
          <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>

    <!-- Línea de tiempo de formación académica -->
    <div v-revelar class="mt-14">
      <p class="blueprint-tag">Formación académica</p>
      <div class="section-divider mb-8" />

      <div class="relative">
        <div class="absolute left-[7px] top-2 bottom-2 w-px bg-line" aria-hidden="true" />
        <ol class="space-y-8">
          <li
            v-for="(estudio, indice) in formacionAcademica"
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
