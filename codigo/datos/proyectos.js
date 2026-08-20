/**
 * proyectos.js
 * -----------------------------------------------------------------------
 * Esta es la ÚNICA fuente de datos de los proyectos del portafolio.
 * No hay backend ni base de datos: toda la información sale de este
 * archivo. Para agregar, editar o quitar un proyecto, solo modifica
 * el array 'proyectos' de aquí abajo — el resto del sitio se actualiza
 * automáticamente (tarjetas, filtros, página de detalle y navegación
 * entre proyectos).
 *
 * Cada proyecto ahora tiene su propia página de detalle en la ruta
 * /proyecto/:id (ver codigo/paginas/PaginaProyecto.vue), donde se
 * muestran urlDemo, hasta 5 repositorios y los 'documentos' de referencia.
 *
 * Estructura de cada proyecto:
 * @typedef {Object} Proyecto
 * @property {string} id              - Identificador único y URL-friendly (ej: 'p1').
 *                                       Se usa en la ruta: /proyecto/p1
 * @property {string} titulo          - Nombre del proyecto
 * @property {string} imagen          - Ruta opcional de la imagen de portada
 * @property {string} descripcion     - Descripción (se muestra en la tarjeta y en el detalle)
 * @property {string[]} tecnologias   - Lista de tecnologías usadas (genera los filtros automáticamente)
 * @property {'academico'|'cliente'|'personal'} tipo - Categoría del proyecto
 * @property {{ titulo: string, url: string }[]} repositorios
 *           Hasta 5 repositorios relacionados con el proyecto.
 * @property {string} urlDemo         - Link a una demo en vivo (deja '' si no aplica)
 * @property {{ titulo: string, url: string }[]} documentos
 *           Documentos de referencia (informes, manuales, diagramas...).
 *           Solo se muestran en la página de detalle si el array tiene elementos;
 *           si está vacío, esa sección simplemente no aparece. Ejemplo para
 *           agregar uno:
 *             documentos: [
 *               { titulo: 'Informe técnico (PDF)', url: 'https://tu-enlace.com/informe.pdf' }
 *             ]
 * @property {{ agregadas: number, eliminadas: number }} estadisticas
 *           Números decorativos estilo "git diff" (+líneas agregadas / -líneas eliminadas)
 *           que solo se muestran como un detalle visual del tamaño del proyecto.
 * -----------------------------------------------------------------------
 */
export const proyectos = [
  {
    id: 'p1',
    titulo: 'Sistema Web para Gestión de Órdenes',
    descripcion:
      'Aplicación web bajo arquitectura Modelo-Vista-Controlador (MVC), con módulos para gestión de órdenes y registros, aplicando conceptos de análisis y diseño de sistemas. Integración con SQL Server para almacenamiento y consulta de información, y participación en el diseño de la lógica de negocio y estructura funcional del sistema.',
    tecnologias: ['ASP.NET MVC', 'C#', 'SQL Server'],
    tipo: 'academico',
    repositorios: [],
    urlDemo: '',
    documentos: [],
    estadisticas: { agregadas: 980, eliminadas: 120 }
  },
  {
    id: 'p2',
    titulo: 'Aplicación E-commerce para Tienda de Ropa',
    descripcion:
      'Aplicación orientada a la gestión de ventas y operaciones comerciales, con desarrollo de componentes frontend y backend. Modelado y gestión de información mediante PostgreSQL, integración de servicios vía Web API, y configuración de base de datos en entorno virtualizado con esquema de conexión remota entre distintas terminales.',
    tecnologias: ['ASP.NET Core', 'PostgreSQL', 'Web API'],
    tipo: 'academico',
    repositorios: [],
    urlDemo: '',
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
    repositorios: [],
    urlDemo: '',
    documentos: [],
    estadisticas: { agregadas: 540, eliminadas: 60 }
  },
  {
    id: 'p4',
    titulo: 'NexusStore — Sistema de Gestión para Pequeños Comercios',
    imagen: '/Imagenes/NexusStore.png',
    descripcion:
      'Aplicación web para gestión de inventario y ventas de pequeños comercios, con módulos de inventario, ventas, dashboard y reportes. Backend en Laravel bajo arquitectura de controladores, servicios y modelos, integrado con el frontend mediante API. Implementación de autenticación, control de acceso y aislamiento de información entre comercios, usando Git y Docker durante el desarrollo.',
    tecnologias: ['Laravel', 'Vue.js', 'MySQL', 'Git', 'Docker'],
    tipo: 'personal',
    repositorios: [],
    urlDemo: '',
    documentos: [],
    estadisticas: { agregadas: 1780, eliminadas: 310 }
  },
  {
    id: 'p5',
    titulo: 'BovWeight CR — Sistema de Estimación de Peso de Bovinos',
    imagen: '/Imagenes/Bovweight.png',
    descripcion:
      'Sistema para estimar el peso de bovinos a partir de imágenes, con backend en Laravel integrado al frontend en Vue.js mediante API. Incorpora un módulo en Python para el procesamiento/estimación con IA y una app en Android Studio para captura en campo. Uso de Docker y Git durante el desarrollo y mantenimiento del proyecto.',
    tecnologias: ['Laravel', 'Vue.js', 'MySQL', 'Docker', 'Python', 'Android Studio'],
    tipo: 'academico',
    repositorios: [],
    urlDemo: '',
    documentos: [],
    estadisticas: { agregadas: 1620, eliminadas: 280 }
  },
  {
    id: 'p6',
    titulo: 'Guía Turística Multimedia de Costa Rica',
    imagen: '/Imagenes/Guia.png',
    descripcion:
      'Aplicación web interactiva que permite explorar destinos turísticos de Costa Rica a través de imágenes, audio, video y datos estructurados. Desarrollada íntegramente con tecnologías nativas del navegador: HTML5, CSS3, JavaScript ES6+ y la API de Web Components.',
    tecnologias: ['HTML5', 'CSS3', 'JavaScript'],
    tipo: 'academico',
    repositorios: [
      { titulo: 'Repositorio principal', url: 'https://github.com/ManuelEGuzG/Gu-a-Tur-stica-Multimedia-de-Costa-Rica' }
    ],
    urlDemo: 'https://manueleguzg.github.io/Gu-a-Tur-stica-Multimedia-de-Costa-Rica/',
    documentos: [],
    estadisticas: { agregadas: 1620, eliminadas: 280 }
  },
  {
    id: 'p7',
    titulo: 'Cancionero Digital — Iglesia del Norte',
    imagen: '/Imagenes/NorteSong.png',
    descripcion:
      'Aplicación web multimedia desarrollada con **Vue 3** para la gestión y presentación del repertorio musical de la Iglesia del Norte.',
    tecnologias: ['Vue.js'],
    tipo: 'academico',
    repositorios: [{ titulo: 'Repositorio principal', url: 'https://github.com/ManuelEGuzG/Norte-Song' }],
    urlDemo: 'https://manueleguzg.github.io/Norte-Song/',
    documentos: [],
    estadisticas: { agregadas: 1620, eliminadas: 280 }
  }
]

/**
 * Categorías disponibles para el filtro de tipo de proyecto.
 * 'value' debe coincidir exactamente con el campo 'tipo' de cada proyecto.
 * 'label' es el texto que se muestra al usuario.
 */
export const tiposDeProyecto = [
  { value: 'academico', label: 'Académico' },
  { value: 'cliente', label: 'Cliente real' },
  { value: 'personal', label: 'Personal' }
]
