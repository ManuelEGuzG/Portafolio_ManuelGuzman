<!--
  BarraNavegacion.vue
  -----------------------------------------------------------------------
  Barra de navegación flotante y fija en la parte superior. Resalta
  automáticamente la sección que el usuario está viendo (scroll-spy) y
  permite hacer scroll suave a cada sección al hacer clic.

  Para agregar/quitar una sección del menú, edita el array 'secciones'
  de aquí abajo (el id debe coincidir con el id="..." de la sección
  real en Aplicacion.vue).
  -----------------------------------------------------------------------
-->
<script setup>
import { ref } from 'vue'
import { Menu, X } from '@lucide/vue'
import { usarScrollSpy } from '@/composables/usarScrollSpy.js'

// Lista de secciones del menú: id = coincide con el id="" de cada <section>,
// etiqueta = texto visible en el nav.
const secciones = [
  { id: 'inicio', etiqueta: 'Inicio' },
  { id: 'proyectos', etiqueta: 'Proyectos' },
  { id: 'sobre-mi', etiqueta: 'Perfil' },
  { id: 'contacto', etiqueta: 'Contacto' }
]

// idActivo se actualiza solo mientras el usuario hace scroll (ver composable).
const { idActivo } = usarScrollSpy(secciones.map((s) => s.id))

// Controla si el menú móvil (hamburguesa) está abierto o cerrado.
const menuAbierto = ref(false)

/** Hace scroll suave hasta la sección indicada y cierra el menú móvil. */
function irASeccion(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  menuAbierto.value = false
}
</script>

<template>
  <header class="fixed top-0 inset-x-0 z-50">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 mt-4">
      <nav
        class="flex items-center justify-between rounded-full border border-line bg-ink/70 backdrop-blur-xl px-5 py-3 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]"
      >
        <!-- Logo / iniciales, hace scroll al inicio -->
        <button type="button" class="font-display text-sm font-semibold tracking-tight text-signal" @click="irASeccion('inicio')">
          MEGG<span class="text-muted">/dev</span>
        </button>

        <!-- Menú de escritorio -->
        <ul class="hidden sm:flex items-center gap-1">
          <li v-for="seccion in secciones" :key="seccion.id">
            <button
              type="button"
              class="relative px-4 py-2 font-mono text-xs tracking-wide rounded-full transition-colors duration-300"
              :class="idActivo === seccion.id ? 'text-ink' : 'text-muted hover:text-paper'"
              @click="irASeccion(seccion.id)"
            >
              <!-- Fondo "píldora" que resalta la sección activa -->
              <span
                v-if="idActivo === seccion.id"
                class="absolute inset-0 rounded-full bg-signal -z-10 transition-all duration-300"
              />
              {{ seccion.etiqueta }}
            </button>
          </li>
        </ul>

        <!-- Botón de menú hamburguesa (solo en móvil) -->
        <button type="button" class="sm:hidden text-muted hover:text-signal transition-colors" :aria-label="menuAbierto ? 'Cerrar menú' : 'Abrir menú'" @click="menuAbierto = !menuAbierto">
          <X v-if="menuAbierto" :size="19" :stroke-width="1.8" aria-hidden="true" />
          <Menu v-else :size="19" :stroke-width="1.8" aria-hidden="true" />
        </button>
      </nav>

      <!-- Menú desplegable móvil -->
      <div v-if="menuAbierto" class="sm:hidden mt-2 panel p-2 flex flex-col gap-1 fade-in">
        <button
          v-for="seccion in secciones"
          :key="seccion.id"
          type="button"
          class="text-left px-4 py-2.5 font-mono text-xs rounded-lg"
          :class="idActivo === seccion.id ? 'text-signal bg-signal/10' : 'text-muted'"
          @click="irASeccion(seccion.id)"
        >
          {{ seccion.etiqueta }}
        </button>
      </div>
    </div>
  </header>
</template>
