/**
 * perfil.js
 * -----------------------------------------------------------------------
 * Tus datos personales, centralizados en un solo lugar. Al estar
 * separados en su propio archivo (en vez de vivir dentro de un
 * componente), cualquier página del sitio puede importarlos si lo
 * necesita, sin duplicar información.
 *
 * urlGithub / urlLinkedin: reemplázalos por tus perfiles reales.
 * urlCv: apunta a un archivo dentro de 'publico/'. Coloca tu CV real
 *        en publico/cv.pdf (reemplazando el archivo de ejemplo).
 * -----------------------------------------------------------------------
 */
export const perfil = {
  nombre: 'Manuel Esteban Guzmán Gómez',
  rol: 'Informática Empresarial · Tecnología y Sistemas',
  biografia:
    'Estudiante de cuarto año de Informática Empresarial en la Universidad de Costa Rica, con formación multidisciplinaria en tecnología, desarrollo de software, bases de datos, sistemas e infraestructura. Experiencia práctica en proyectos académicos y personales con distintos lenguajes de programación, tecnologías web, gestores de bases de datos, sistemas operativos, herramientas de desarrollo y entornos virtualizados.',
  correo: 'manu05gg09@gmail.com',
  telefono: '(506) 8515-8699',
  ubicacion: 'Liberia, Guanacaste, Costa Rica',
  urlGithub: 'https://github.com/ManuelEGuzG',
  urlLinkedin: 'https://www.linkedin.com/in/manuel-guzmán-b10015327/',
  urlCv: '/cv.pdf',

  // Usado por la barra de estado del Hero (badge junto al rol).
  estado: 'Buscando primera oportunidad laboral',

  // Usado por la pila de capas 3D del Hero (ver PilaSistemas.vue).
  // Cada capa representa un dominio técnico: título y las 3 tecnologías
  // principales de esa capa. El ORDEN importa: la
  // primera queda al fondo de la pila y la última queda al frente.
  capasTecnicas: [
    { titulo: 'Infraestructura', tecnologias: ['Docker', 'Linux', 'Git'] },
    { titulo: 'Base de Datos', tecnologias: ['MySQL', 'PostgreSQL', 'SQL Server'] },
    { titulo: 'Backend', tecnologias: ['Laravel', 'ASP.NET', 'C#'] },
    { titulo: 'Frontend', tecnologias: ['Vue.js', 'JavaScript', 'Tailwind'] }
  ]
}
