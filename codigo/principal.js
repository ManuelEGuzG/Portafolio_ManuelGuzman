/**
 * principal.js
 * -----------------------------------------------------------------------
 * Punto de entrada de la aplicación Vue.
 *
 * Aquí ocurren 4 cosas:
 *  1. Se crea la instancia de la app a partir del componente raíz (Aplicacion.vue)
 *  2. Se registra el sistema de rutas (navegación entre páginas)
 *  3. Se registra la directiva global 'v-revelar' (animaciones al hacer scroll)
 *  4. Se "monta" la app dentro de <div id="app"> en index.html
 * -----------------------------------------------------------------------
 */
import { createApp } from 'vue'
import './recursos/estilos.css'
import Aplicacion from './Aplicacion.vue'
import router from './rutas/router.js'
import { revelarAlEntrar } from './directivas/revelarAlEntrar.js'

const app = createApp(Aplicacion)

app.use(router)

// Registra la directiva v-revelar para poder usarla en CUALQUIER componente
// sin necesidad de importarla cada vez. Ejemplo de uso en una plantilla:
//   <div v-revelar>Este bloque aparece con animación al hacer scroll</div>
app.directive('revelar', revelarAlEntrar)

app.mount('#app')
