/**
 * proyectos.js
 * -----------------------------------------------------------------------
 * Fuente de datos de los proyectos del portafolio.
 *
 * Estructura de cada proyecto:
 * @typedef {Object} Proyecto
 * @property {string} id              - Identificador único y URL-friendly (ej: 'p1').
 * @property {string} titulo          - Nombre del proyecto
 * @property {string} descripcion     - Descripción del proyecto
 * @property {string[]} tecnologias   - Lista de tecnologías usadas
 * @property {'academico'|'cliente'|'personal'} tipo - Categoría del proyecto
 * @property {string} urlDemo         - Link a una demo en vivo (deja '' si no aplica)
 * @property {string[]} imagenes      - Array con rutas a imágenes del proyecto (hasta 30)
 * @property {{ titulo: string, url: string }[]} documentos - Documentos de referencia
 * @property {{ agregadas: number, eliminadas: number }} estadisticas - Números decorativos
 * -----------------------------------------------------------------------
 */
export const proyectos = [
  {
  id: 'p1',
  imagen: '/Imagenes/p1/1.png',
  titulo: 'Sportra — Plataforma de Reserva de Canchas',
  descripcion:
    'Plataforma web para descubrir complejos deportivos y solicitar reservas de canchas. Permite buscar por ubicación, consultar disponibilidad y administrar horarios, reservas y bloqueos desde un panel para propietarios. Incluye herramientas administrativas para gestionar complejos, usuarios, verificaciones y reportes, además de actualización en tiempo real de la disponibilidad.',
  tecnologias: ['Vue 3', 'TypeScript', 'Ionic', 'Laravel', 'PHP', 'SQLite/MySQL', 'Laravel Reverb'],
  tipo: 'personal',
  urlDemo: '',
  imagenes: [
    '/Imagenes/p1/1.png',
    '/Imagenes/p1/2.png',
    '/Imagenes/p1/3.png',
    '/Imagenes/p1/4.png',
    '/Imagenes/p1/5.png',
    '/Imagenes/p1/6.png'


  ],
  documentos: [],
  estadisticas: { agregadas: 0, eliminadas: 0 }
},
  {
    id: 'p2',
    imagen: '/Imagenes/p2/1.png',
    titulo: 'Aplicación E-commerce para Tienda de Ropa',
    descripcion:
      'Aplicación orientada a la gestión de ventas y operaciones comerciales, con desarrollo de componentes frontend y backend. Modelado y gestión de información mediante PostgreSQL, integración de servicios vía Web API, y configuración de base de datos en entorno virtualizado con esquema de conexión remota entre distintas terminales.',
    tecnologias: ['ASP.NET Core', 'PostgreSQL', 'Web API','C#' ],
    tipo: 'academico',
    urlDemo: '',
    imagenes: [
      '/Imagenes/p2/1.png',
      '/Imagenes/p2/2.png'

    ],
    documentos: [],
    estadisticas: { agregadas: 1150, eliminadas: 200 }
  },
  {
    id: 'p3',
    titulo: 'Implementación de Sistema de Telefonía IP (VoIP)',
    descripcion:
      'Configuración de un entorno de telefonía IP en máquinas virtuales. Implementación de servidor de llamadas y gestión de parámetros mediante Webmin, integración de clientes para simulación de llamadas entre entornos virtualizados, y aplicación práctica de conceptos de infraestructura, servicios y comunicación en red.',
    tecnologias: ['VoIP', 'Webmin', 'Máquinas Virtuales'],
    tipo: 'academico',
    urlDemo: '',
    imagenes: [],
    documentos: [],
    estadisticas: { agregadas: 540, eliminadas: 60 }
  },
  {
    id: 'p4',
    imagen: '/Imagenes/NexusStore.png',
    titulo: 'NexusStore — Sistema de Gestión para Pequeños Comercios',
    descripcion:
      'Aplicación web para gestión de inventario y ventas de pequeños comercios, con módulos de inventario, ventas, dashboard y reportes. Backend en Laravel bajo arquitectura de controladores, servicios y modelos, integrado con el frontend mediante API. Implementación de autenticación, control de acceso y aislamiento de información entre comercios, usando Git y Docker durante el desarrollo.',
    tecnologias: ['Laravel', 'Vue.js', 'MySQL', 'Git', 'Docker'],
    tipo: 'personal',
    urlDemo: '',
    imagenes: [
      '/Imagenes/NexusStore.png',
      '/Imagenes/p4/1.png',
      '/Imagenes/p4/2.png',
      '/Imagenes/p4/3.png',
      '/Imagenes/p4/4.png',
      '/Imagenes/p4/5.png'
    ],
    documentos: [],
    estadisticas: { agregadas: 1780, eliminadas: 310 }
  },
  {
    id: 'p5',
    imagen: '/Imagenes/Bovweight.png',
    titulo: 'BovWeight CR — Sistema de Estimación de Peso de Bovinos',
    descripcion:
      'Sistema para estimar el peso de bovinos a partir de imágenes, con backend en Laravel integrado al frontend en Vue.js mediante API. Incorpora un módulo en Python para el procesamiento/estimación con IA y una app en Android Studio para captura en campo. Uso de Docker y Git durante el desarrollo y mantenimiento del proyecto.',
    tecnologias: ['Laravel', 'Vue.js', 'MySQL', 'Docker', 'Python', 'Android Studio'],
    tipo: 'academico',
    urlDemo: '',
    imagenes: [
      '/Imagenes/Bovweight.png'
    ],
    documentos: [],
    estadisticas: { agregadas: 1620, eliminadas: 280 }
  },
  {
    id: 'p6',
    imagen: '/Imagenes/Guia.png',
    titulo: 'Guía Turística Multimedia de Costa Rica',
    descripcion:
      'Aplicación web interactiva que permite explorar destinos turísticos de Costa Rica a través de imágenes, audio, video y datos estructurados. Desarrollada íntegramente con tecnologías nativas del navegador: HTML5, CSS3, JavaScript ES6+ y la API de Web Components.',
    tecnologias: ['HTML5', 'CSS3', 'JavaScript'],
    tipo: 'academico',
    urlDemo: 'https://manueleguzg.github.io/Gu-a-Tur-stica-Multimedia-de-Costa-Rica/',
    imagenes: [
      '/Imagenes/Guia.png',
      '/Imagenes/p6/1.png',
      '/Imagenes/p6/2.png',
      '/Imagenes/p6/3.png',
      '/Imagenes/p6/4.png',
      '/Imagenes/p6/5.png',
      '/Imagenes/p6/6.png'

    ],
    documentos: [],
    estadisticas: { agregadas: 1620, eliminadas: 280 }
  },
  {
    id: 'p7',
    imagen: '/Imagenes/NorteSong.png',
    titulo: 'Cancionero Digital — Iglesia del Norte',
    descripcion:
      'Aplicación web multimedia desarrollada con Vue 3 para la gestión y presentación del repertorio musical de la Iglesia del Norte.',
    tecnologias: ['Vue.js'],
    tipo: 'academico',
    urlDemo: 'https://manueleguzg.github.io/Norte-Song/',
    imagenes: [
      '/Imagenes/NorteSong.png',
      '/Imagenes/p7/1.png',
      '/Imagenes/p7/2.png',
      '/Imagenes/p7/3.png',
      '/Imagenes/p7/4.png',
      '/Imagenes/p7/5.png'
    ],
    documentos: [],
    estadisticas: { agregadas: 1620, eliminadas: 280 }
  }
]

export const tiposDeProyecto = [
  { value: 'academico', label: 'Académico' },
  { value: 'cliente', label: 'Cliente real' },
  { value: 'personal', label: 'Personal' }
]