import { createRouter, createWebHistory } from 'vue-router'
import PaginaInicio from '@/paginas/PaginaInicio.vue'
import PaginaProyecto from '@/paginas/PaginaProyecto.vue'
import PaginaNoEncontrada from '@/paginas/PaginaNoEncontrada.vue'
import { iniciarProgreso, detenerProgreso } from '@/composables/usarProgresoRuta.js'

/**
 * router.js
 * -----------------------------------------------------------------------
 * Define las páginas ("rutas") de la aplicación:
 *
 *   '/'               -> PaginaInicio.vue      (todo el portafolio: hero,
 *                                                proyectos, perfil, contacto)
 *   '/proyecto/:id'    -> PaginaProyecto.vue    (detalle de un proyecto:
 *                                                demo, repo, documentos)
 *   cualquier otra ruta -> PaginaNoEncontrada.vue (404)
 *
 * 'createWebHistory()' usa URLs limpias (sin '#'), por eso vercel.json
 * incluye un "rewrite" que redirige cualquier ruta a index.html — así
 * el navegador siempre encuentra la app aunque el usuario recargue
 * directamente en /proyecto/p1, por ejemplo.
 * -----------------------------------------------------------------------
 */
const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'inicio',
      component: PaginaInicio
    },
    {
      // ':id' es un parámetro dinámico. 'props: true' hace que Vue Router
      // pase automáticamente ese valor como prop 'id' al componente,
      // en vez de tener que leerlo manualmente con useRoute().
      path: '/proyecto/:id',
      name: 'proyecto',
      component: PaginaProyecto,
      props: true
    },
    {
      // Comodín: cualquier ruta que no coincida con las anteriores.
      path: '/:pathMatch(.*)*',
      name: 'no-encontrado',
      component: PaginaNoEncontrada
    }
  ],

  /**
   * Controla el scroll al cambiar de ruta.
   * - Si el link incluye un '#ancla' (ej: '/#proyectos'), hace scroll
   *   suave hasta ese elemento.
   * - Si no, sube al inicio de la nueva página.
   */
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  }
})

export default router

/**
 * Enciende la barra de progreso (BarraProgreso.vue) apenas empieza una
 * navegación, y la apaga un instante después de que termina. El pequeño
 * 'setTimeout' evita que la barra "parpadee" en navegaciones instantáneas.
 */
router.beforeEach((to, from) => {
  if (to.fullPath !== from.fullPath) iniciarProgreso()
})
router.afterEach(() => {
  setTimeout(detenerProgreso, 350)
})
