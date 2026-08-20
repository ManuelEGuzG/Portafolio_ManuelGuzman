<!--
  PilaSistemas.vue
  -----------------------------------------------------------------------
  Elemento visual del Hero (reemplaza al panel "perfil.json" anterior).

  Representa tu stack como capas físicas de un sistema, apiladas en
  perspectiva 3D — de arriba hacia abajo: Frontend, Backend, Base de
  Datos, Infraestructura. Es una metáfora directa de "arquitectura de
  sistemas", coherente con tu perfil.

  Al mover el mouse sobre el bloque, todo el grupo de capas rota
  ligeramente siguiendo al cursor (efecto "parallax 3D"), y cada capa
  flota de forma independiente y continua. En dispositivos táctiles
  (sin mouse) simplemente se queda en su ángulo base, sin animación
  de seguimiento — sigue siendo completamente visible y legible.

  Estructura de datos esperada en la prop 'capas' (definida en
  datos/perfil.js -> perfil.capasTecnicas):
    [{ titulo: 'Frontend', tecnologias: ['Vue.js', ...] }, ...]
  El primer elemento del array queda al FONDO de la pila y el último
  queda AL FRENTE (más cerca del usuario).
  -----------------------------------------------------------------------
-->
<script setup>
import { ref, computed } from 'vue'
import { Cloud, Code2, Database, MonitorCog } from '@lucide/vue'

const props = defineProps({
  capas: { type: Array, required: true }
})

const contenedor = ref(null)

const iconosPorCapa = {
  Frontend: MonitorCog,
  Backend: Code2,
  'Base de Datos': Database,
  Infraestructura: Cloud
}

// Rotación adicional (en grados) que se suma al ángulo base mientras
// el cursor se mueve sobre el bloque. Empieza en 0 = sin desviación.
const rotX = ref(0)
const rotY = ref(0)

/** Ángulo base de la pila: le da la perspectiva 3D "de sistemas" incluso sin interacción. */
const ANGULO_BASE_X = 12
const ANGULO_BASE_Y = -18

const estiloGrupo = computed(() => ({
  transform: `rotateX(${ANGULO_BASE_X + rotX.value}deg) rotateY(${ANGULO_BASE_Y + rotY.value}deg)`
}))

/**
 * Calcula la posición del cursor relativa al centro del bloque (de -0.5
 * a 0.5 en cada eje) y la convierte en unos pocos grados de rotación,
 * para un efecto de parallax sutil, no exagerado.
 */
function alMoverMouse(evento) {
  const rect = contenedor.value.getBoundingClientRect()
  const proporcionX = (evento.clientX - rect.left) / rect.width - 0.5
  const proporcionY = (evento.clientY - rect.top) / rect.height - 0.5
  rotY.value = proporcionX * 20
  rotX.value = -proporcionY * 14
}

/** Al salir el cursor, la pila vuelve suavemente a su ángulo base (ver transition en CSS). */
function alSalirMouse() {
  rotX.value = 0
  rotY.value = 0
}

/**
 * Posición de cada capa dentro de la pila: las capas posteriores
 * (índice bajo) quedan más abajo y más lejos (translateZ menor); las
 * capas frontales (índice alto) quedan más arriba y más cerca.
 */
function estiloPosicion(indice) {
  const desdeElFrente = props.capas.length - 1 - indice
  return {
    top: `${desdeElFrente * 54}px`,
    zIndex: indice,
    transform: `translateZ(${indice * 46}px)`
  }
}
</script>

<template>
  <div
    ref="contenedor"
    class="pila-3d"
    @mousemove="alMoverMouse"
    @mouseleave="alSalirMouse"
  >
    <div class="pila-3d__grupo" :style="estiloGrupo">
      <div
        v-for="(capa, indice) in capas"
        :key="capa.titulo"
        class="pila-3d__capa"
        :style="estiloPosicion(indice)"
      >
        <div
          class="pila-3d__contenido panel"
          :class="{ 'pila-3d__contenido--frente': indice === capas.length - 1 }"
          :style="{ animationDelay: `${indice * 0.7}s` }"
        >
          <div class="flex items-center gap-2 mb-2">
            <component
              :is="iconosPorCapa[capa.titulo] || Code2"
              class="text-signal"
              :size="17"
              :stroke-width="1.8"
              aria-hidden="true"
            />
            <p class="font-mono text-xs text-signal tracking-wide">{{ capa.titulo }}</p>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="tecnologia in capa.tecnologias" :key="tecnologia" class="tag !text-[10px] !py-0.5">
              {{ tecnologia }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <p class="font-mono text-[11px] text-muted text-center mt-4">
      De la interfaz a la infraestructura
    </p>
  </div>
</template>
