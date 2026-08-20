import { ref, onMounted, onUnmounted } from 'vue'

/**
 * usarScrollSpy.js
 * -----------------------------------------------------------------------
 * Composable de Vue (función reutilizable con estado reactivo).
 *
 * ¿Qué hace?
 *   Observa una lista de secciones (por su atributo id="...") y devuelve
 *   cuál de ellas está actualmente más visible en pantalla. Se usa en el
 *   menú de navegación (BarraNavegacion.vue) para resaltar automáticamente
 *   el enlace de la sección que el usuario está viendo mientras hace scroll.
 *
 * Cómo usarlo dentro de un componente:
 *   import { usarScrollSpy } from '@/composables/usarScrollSpy.js'
 *
 *   const { idActivo } = usarScrollSpy(['inicio', 'proyectos', 'sobre-mi'])
 *   // idActivo.value será 'inicio', 'proyectos' o 'sobre-mi' según el scroll
 *
 * @param {string[]} idsSecciones - Array con los ids de las secciones a observar,
 *                                  ej: ['inicio', 'proyectos', 'sobre-mi', 'contacto']
 * @returns {{ idActivo: import('vue').Ref<string> }}
 */
export function usarScrollSpy(idsSecciones) {
  // idActivo empieza siendo la primera sección de la lista.
  const idActivo = ref(idsSecciones[0])
  let observador

  onMounted(() => {
    // Busca en el DOM los elementos reales que tienen esos ids.
    const secciones = idsSecciones
      .map((id) => document.getElementById(id))
      .filter(Boolean) // por si algún id no existe todavía en el DOM

    observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            idActivo.value = entrada.target.id
          }
        })
      },
      {
        // Truco: en vez de detectar cuando la sección entra por completo,
        // consideramos "activa" la sección cuando pasa por una franja
        // horizontal cerca del centro/parte superior de la pantalla.
        // Esto hace que el nav cambie de forma más natural mientras
        // el usuario hace scroll, en vez de esperar a ver toda la sección.
        rootMargin: '-40% 0px -50% 0px',
        threshold: 0
      }
    )

    secciones.forEach((seccion) => observador.observe(seccion))
  })

  // Limpieza: si el componente que usa este composable se destruye,
  // desconectamos el observer para no dejar procesos corriendo de más.
  onUnmounted(() => observador?.disconnect())

  return { idActivo }
}
