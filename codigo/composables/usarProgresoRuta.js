import { ref } from 'vue'

/**
 * usarProgresoRuta.js
 * -----------------------------------------------------------------------
 * Estado compartido (fuera de la función, así que es EL MISMO objeto
 * en cualquier lugar donde se use este composable) que controla la
 * barra de progreso fina que aparece arriba de la página mientras se
 * navega entre rutas (ver BarraProgreso.vue y rutas/router.js).
 * -----------------------------------------------------------------------
 */
const enProgreso = ref(false)

/** Usado por componentes de UI (BarraProgreso.vue) para leer el estado. */
export function usarProgresoRuta() {
  return { enProgreso }
}

/** Usados por el router (rutas/router.js) para encender/apagar la barra. */
export function iniciarProgreso() {
  enProgreso.value = true
}
export function detenerProgreso() {
  enProgreso.value = false
}
