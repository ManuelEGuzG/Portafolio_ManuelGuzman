<!--
  Aplicacion.vue  (componente raíz / shell de rutas)
  -----------------------------------------------------------------------
  Desde que el sitio usa Vue Router, este componente ya NO contiene el
  contenido del portafolio directamente (eso vive ahora en
  'paginas/PaginaInicio.vue' y 'paginas/PaginaProyecto.vue').

  El trabajo de este componente es:
    1. Mostrar la barra de progreso de navegación (<BarraProgreso>)
    2. Renderizar la página que corresponda según la URL (<RouterView>)
    3. Envolver ese cambio de página en una transición animada, para
       que pasar de "Inicio" a "Proyecto" (y viceversa) se sienta
       suave en vez de un salto brusco.

  Las clases 'pagina-enter-*' / 'pagina-leave-*' están definidas en
  recursos/estilos.css.
  -----------------------------------------------------------------------
-->
<script setup>
import { RouterView } from 'vue-router'
import BarraProgreso from '@/componentes/BarraProgreso.vue'
import ClickSpark from '@/componentes/ClickSpark.vue'
import Particles from '@/componentes/Particles.vue'
</script>

<template>
  <Particles
    class="particles-background"
    :particle-count="260"
    :particle-spread="11"
    :speed="0.08"
    :particle-colors="['#8be28b', '#d9f99d', '#6dbb8a']"
    move-particles-on-hover
    :particle-hover-factor="0.7"
    :particle-base-size="80"
    :size-randomness="0.8"
    :camera-distance="20"
    :pixel-ratio="1"
  />

  <BarraProgreso />

  <!-- Textura de grano muy sutil sobre todo el sitio: le da un acabado
       "impreso" en vez de plano, un detalle típico de sitios premium.
       pointer-events-none para que nunca interfiera con los clics. -->
  <div class="textura-ruido" aria-hidden="true" />

  <ClickSpark :spark-color="'#8be28b'" :spark-size="9" :spark-radius="18" :spark-count="8" :duration="420" class="app-content">
    <RouterView v-slot="{ Component, route }">
      <Transition name="pagina" mode="out-in">
        <!-- 'key' fuerza a Vue a tratar cada proyecto como una vista nueva,
             así la transición se dispara también al pasar de un proyecto
             a otro (ej: /proyecto/p1 -> /proyecto/p2) -->
        <component :is="Component" :key="route.fullPath" />
      </Transition>
    </RouterView>
  </ClickSpark>
</template>
