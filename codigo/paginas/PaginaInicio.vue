<!--
  PaginaInicio.vue
  -----------------------------------------------------------------------
  Página principal del sitio (ruta '/'). Arma el portafolio completo
  importando y ordenando cada sección: nav, hero, galería de proyectos,
  perfil y contacto.

  Tus datos personales (nombre, biografía, contacto, redes) se editan
  en UN SOLO LUGAR: codigo/datos/perfil.js.
  -----------------------------------------------------------------------
-->
<script setup>
import { perfil } from '@/datos/perfil.js'
import BarraNavegacion from '@/componentes/BarraNavegacion.vue'
import SeccionInicio from '@/componentes/SeccionInicio.vue'
import GaleriaProyectos from '@/componentes/GaleriaProyectos.vue'
import SeccionSobreMi from '@/componentes/SeccionSobreMi.vue'
import SeccionContacto from '@/componentes/SeccionContacto.vue'
import LogosTecnologias from '@/componentes/LogosTecnologias.vue'
</script>

<template>
  <div class="min-h-screen">
    <BarraNavegacion />

    <main>
      <SeccionInicio
        :nombre="perfil.nombre"
        :rol="perfil.rol"
        :biografia="perfil.biografia"
        :url-github="perfil.urlGithub"
        :url-linkedin="perfil.urlLinkedin"
        :url-cv="perfil.urlCv"
        :estado="perfil.estado"
        :capas="perfil.capasTecnicas"
      />

      <GaleriaProyectos />

      <SeccionSobreMi />

      <SeccionContacto
        :correo="perfil.correo"
        :telefono="perfil.telefono"
        :ubicacion="perfil.ubicacion"
        :url-github="perfil.urlGithub"
        :url-linkedin="perfil.urlLinkedin"
      />

      <LogosTecnologias />
    </main>
  </div>
</template>
