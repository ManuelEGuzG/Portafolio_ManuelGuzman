<!--
  BotonMagnetico.vue
  -----------------------------------------------------------------------
  Envuelve un <a> normal y le agrega un efecto "magnético": al mover el
  mouse sobre el botón, este se desplaza levemente hacia el cursor,
  dando una sensación más interactiva y premium.

  Cómo usarlo (funciona igual que un <a> normal, acepta los mismos
  atributos: href, target, rel, download, class, etc.):

    <BotonMagnetico href="mailto:correo@ejemplo.com" class="btn-primary">
      Escríbeme
    </BotonMagnetico>
  -----------------------------------------------------------------------
-->
<script setup>
import { ref } from 'vue'

// Referencia al elemento <a> real en el DOM, para leer su posición y tamaño.
const elemento = ref(null)

/**
 * Se ejecuta en cada movimiento del mouse sobre el botón.
 * Calcula qué tan lejos está el cursor del centro del botón y mueve
 * el botón un 25% de esa distancia (efecto "imán" suave, no total).
 */
function alMoverMouse(evento) {
  const rect = elemento.value.getBoundingClientRect()
  const distanciaX = evento.clientX - rect.left - rect.width / 2
  const distanciaY = evento.clientY - rect.top - rect.height / 2
  elemento.value.style.transform = `translate(${distanciaX * 0.25}px, ${distanciaY * 0.25}px)`
}

/** Cuando el mouse sale del botón, este vuelve suavemente a su posición original. */
function alSalirMouse() {
  if (elemento.value) elemento.value.style.transform = 'translate(0, 0)'
}
</script>

<template>
  <a
    ref="elemento"
    v-bind="$attrs"
    class="transition-transform duration-200 ease-out"
    @mousemove="alMoverMouse"
    @mouseleave="alSalirMouse"
  >
    <slot />
  </a>
</template>
