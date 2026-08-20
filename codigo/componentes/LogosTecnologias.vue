<script setup>
const logos = [
  { nombre: 'PHP', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { nombre: 'JavaScript', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { nombre: 'Python', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { nombre: 'Java', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { nombre: 'C#', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { nombre: 'HTML5', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { nombre: 'CSS3', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { nombre: 'MySQL', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { nombre: 'PostgreSQL', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { nombre: 'SQL Server', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg' },
  { nombre: 'MongoDB', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { nombre: 'Vue.js', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { nombre: 'Laravel', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
  { nombre: 'ASP.NET', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
  { nombre: 'Git', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { nombre: 'Docker', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { nombre: 'Linux', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { nombre: 'Windows', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg' },
  { nombre: 'Power BI', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powerbi/powerbi-original.svg' },
  { nombre: 'Postman', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
  { nombre: 'Tailwind CSS', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { nombre: 'Android Studio', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg' },
  { nombre: 'Web API', imagen: 'https://cdn.simpleicons.org/swagger/ffffff' },
  { nombre: 'APIs REST', imagen: 'https://cdn.simpleicons.org/openapiinitiative/ffffff' },
  { nombre: 'VoIP', imagen: 'https://cdn.simpleicons.org/asterisk/ffffff' },
  { nombre: 'Webmin', imagen: 'https://cdn.simpleicons.org/webmin/ffffff' },
  { nombre: 'Máquinas virtuales', imagen: 'https://cdn.simpleicons.org/vmware/ffffff' },
  { nombre: 'Microsoft Office', imagen: 'https://cdn.simpleicons.org/microsoftoffice/ffffff' }
]

const filas = [logos, [...logos].reverse()]
</script>

<template>
  <section class="logos-tecnologias py-6 sm:py-8" aria-label="Tecnologías utilizadas">
    <div class="logos-tecnologias__viewport">
      <div v-for="(fila, indiceFila) in filas" :key="indiceFila" class="logos-tecnologias__track" :class="{ 'logos-tecnologias__track--reverse': indiceFila === 1 }">
        <div v-for="(logo, indice) in [...fila, ...fila]" :key="`${indiceFila}-${logo.nombre}-${indice}`" class="logos-tecnologias__item">
          <img :src="logo.imagen" :alt="logo.nombre" loading="lazy" />
          <span>{{ logo.nombre }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
