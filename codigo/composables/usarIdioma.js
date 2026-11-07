import { computed, ref } from 'vue'

const traducciones = {
  es: {
    section: 'Sec.',
    nav: { home: 'Inicio', projects: 'Proyectos', profile: 'Perfil', contact: 'Contacto', open: 'Abrir menú', close: 'Cerrar menú' },
    back: 'Volver al portafolio',
    hero: {
      label: 'Plano / Perfil Técnico',
      downloadCv: 'Descargar CV',
      viewProjects: 'VER PROYECTOS',
      layers: ['Infraestructura', 'Base de Datos', 'Backend', 'Frontend'],
      direction: 'De la interfaz a la infraestructura'
    },
    projects: {
      section: 'Proyectos destacados',
      intro: 'Aplicaciones desarrolladas durante la carrera, cubriendo desarrollo web, bases de datos, infraestructura e integración de IA.',
      found: '{count} proyecto(s) encontrado(s)',
      none: 'No hay proyectos que coincidan con ese filtro.',
      case: 'Ver caso completo',
      preview: 'Vista previa de {title}',
      academic: 'Académico',
      client: 'Cliente real',
      personal: 'Personal'
    },
    filters: { title: 'Filtrar', category: 'Categoría', technology: 'Tecnología', clear: 'Limpiar filtros' },
    about: {
      title: 'Perfil y stack técnico',
      description: 'Estudiante de cuarto año de Informática Empresarial en la Universidad de Costa Rica, con experiencia práctica en proyectos académicos y personales aplicando distintos lenguajes de programación, tecnologías web, gestores de bases de datos, sistemas operativos, herramientas de desarrollo y entornos virtualizados.',
      skills: ['Lenguajes', 'Bases de datos', 'Frameworks / APIs', 'Herramientas'],
      practicesTitle: 'Metodologías y prácticas de desarrollo',
      practices: [
        {
          title: 'Scrum y trabajo ágil',
          description: 'Organización del trabajo en iteraciones, priorización de tareas y seguimiento del avance.'
        },
        {
          title: 'Planificación',
          description: 'Desglose de requerimientos y organización de tareas para avanzar por etapas.'
        },
        {
          title: 'Fundamentos DevOps',
          description: 'Uso de Docker y familiaridad con prácticas que conectan desarrollo y operaciones.'
        },
        {
          title: 'Calidad y validación',
          description: 'Pruebas y revisión del comportamiento para detectar errores y mejorar la confiabilidad.'
        }
      ],
      education: 'Formación académica',
      studies: [
        'Bachillerato en Informática Empresarial',
        'Bachiller en Educación Media — Sección Francés Avanzado',
        'Técnico en Guía Naturalista',
        'Curso de Alfabetización de Seguridad Digital',
        'Curso de Servicio al Cliente'
      ]
    },
    contact: {
      title: 'Construyamos<br> algo juntos.',
      description: 'Estoy buscando mi primera oportunidad como desarrollador. Si mi perfil encaja con tu equipo, escríbeme — respondo rápido.'
    },
    detail: {
      description: 'Descripción',
      demo: 'Demostración',
      viewDemo: 'Ver demo',
      noDemo: 'Demo no disponible públicamente.',
      documents: 'Documentos',
      gallery: 'Galería de capturas ({count})',
      screenshot: 'Captura {number}',
      enlarge: 'Ampliar',
      closePreview: 'Cerrar vista previa',
      enlarged: 'Vista ampliada',
      previousImage: 'Foto anterior',
      nextImage: 'Siguiente foto',
      notFound: 'Proyecto no encontrado',
      missingProject: 'El proyecto que buscas no existe o fue movido.'
    },
    notFound: {
      title: 'Página no encontrada',
      description: 'La ruta a la que intentas acceder no existe.'
    },
    footer: 'hecho con Vue 3 + Vite + Tailwind',
    logos: 'Tecnologías utilizadas',
    technologies: { virtualMachines: 'Máquinas virtuales' }
  },
  en: {
    section: 'Sec.',
    nav: { home: 'Home', projects: 'Projects', profile: 'Profile', contact: 'Contact', open: 'Open menu', close: 'Close menu' },
    back: 'Back to portfolio',
    hero: {
      label: 'Blueprint / Technical Profile',
      downloadCv: 'Download résumé',
      viewProjects: 'VIEW PROJECTS',
      layers: ['Infrastructure', 'Database', 'Backend', 'Frontend'],
      direction: 'From interface to infrastructure'
    },
    projects: {
      section: 'Featured projects',
      intro: 'Applications developed throughout my degree, covering web development, databases, infrastructure, and AI integration.',
      found: '{count} project(s) found',
      none: 'No projects match this filter.',
      case: 'View full case study',
      preview: 'Preview of {title}',
      academic: 'Academic',
      client: 'Real client',
      personal: 'Personal',
      p1: {
        title: 'SPORTRA — Sports Court Booking Platform',
        description: 'SPORTRA is a digital platform connecting athletes with sports complexes to simplify court discovery and booking. It brings venue search, availability checks, and booking requests together, while giving complexes tools to manage their facilities and schedules. Its web and mobile experience streamlines coordination between people looking for a place to play and the venues that provide it.'
      },
      p2: {
        title: 'E-commerce Application for a Clothing Store',
        description: 'An application for managing sales and business operations, with frontend and backend components. Data is modeled and managed with PostgreSQL, services are integrated through a Web API, and the database is configured in a virtualized environment with remote connections between workstations.'
      },
      p3: {
        title: 'IP Telephony System Implementation (VoIP)',
        description: 'Configuration of an IP telephony environment in virtual machines. The project includes deploying a call server, managing settings with Webmin, integrating clients to simulate calls between virtualized environments, and applying infrastructure, services, and network communication concepts.'
      },
      p4: {
        title: 'NexusStore — Management System for Small Businesses',
        description: 'A web application for inventory and sales management in small businesses, with inventory, sales, dashboard, and reporting modules. Its Laravel backend follows a controller, service, and model architecture and integrates with the frontend through an API. It includes authentication, access control, and data isolation between businesses; Git and Docker were used during development.'
      },
      p5: {
        title: 'BovWeight CR — Cattle Weight Estimation System',
        description: 'A system that estimates cattle weight from images, with a Laravel backend connected to a Vue.js frontend through an API. It includes a Python module for AI-based processing and estimation, and an Android Studio app for field image capture. Docker and Git were used during development and maintenance.'
      },
      p6: {
        title: 'Costa Rica Multimedia Travel Guide',
        description: 'An interactive web application for exploring Costa Rican destinations through images, audio, video, and structured data. Built entirely with native browser technologies: HTML5, CSS3, JavaScript ES6+, and the Web Components API.'
      },
      p7: {
        title: 'Digital Songbook — Iglesia del Norte',
        description: 'A multimedia web application built with Vue.js to manage and present the musical repertoire of Iglesia del Norte.'
      }
    },
    filters: { title: 'Filter', category: 'Category', technology: 'Technology', clear: 'Clear filters' },
    about: {
      title: 'Profile & tech stack',
      description: 'Fourth-year Business Informatics student at the University of Costa Rica, with hands-on experience in academic and personal projects using programming languages, web technologies, database systems, operating systems, development tools, and virtualized environments.',
      skills: ['Languages', 'Databases', 'Frameworks / APIs', 'Tools'],
      practicesTitle: 'Development methods and practices',
      practices: [
        {
          title: 'Scrum and Agile',
          description: 'Organizing work into iterations, prioritizing tasks, and tracking progress.'
        },
        {
          title: 'Planning',
          description: 'Breaking down requirements and organizing tasks into manageable stages.'
        },
        {
          title: 'DevOps fundamentals',
          description: 'Using Docker and understanding practices that connect development and operations.'
        },
        {
          title: 'Quality and validation',
          description: 'Testing and reviewing behavior to find issues and improve reliability.'
        }
      ],
      education: 'Education',
      studies: [
        'Bachelor’s degree in Business Informatics',
        'Secondary Education Diploma — Advanced French Track',
        'Naturalist Guide Technician',
        'Digital Security Literacy Course',
        'Customer Service Course'
      ]
    },
    contact: {
      title: 'Let’s build<br> something together.',
      description: 'I’m looking for my first opportunity as a developer. If my profile could be a good fit for your team, send me a message — I reply quickly.'
    },
    detail: {
      description: 'Description',
      demo: 'Demo',
      viewDemo: 'View demo',
      noDemo: 'No public demo available.',
      documents: 'Documents',
      gallery: 'Screenshot gallery ({count})',
      screenshot: 'Screenshot {number}',
      enlarge: 'Enlarge',
      closePreview: 'Close image preview',
      enlarged: 'Enlarged image',
      previousImage: 'Previous image',
      nextImage: 'Next image',
      notFound: 'Project not found',
      missingProject: 'The project you are looking for does not exist or has been moved.'
    },
    notFound: {
      title: 'Page not found',
      description: 'The page you are trying to access does not exist.'
    },
    footer: 'built with Vue 3 + Vite + Tailwind',
    logos: 'Technologies used',
    technologies: { virtualMachines: 'Virtual machines' }
  },
  fr: {
    section: 'Section',
    nav: { home: 'Accueil', projects: 'Projets', profile: 'Profil', contact: 'Contact', open: 'Ouvrir le menu', close: 'Fermer le menu' },
    back: 'Retour au portfolio',
    hero: {
      label: 'Plan / Profil technique',
      downloadCv: 'Télécharger le CV',
      viewProjects: 'VOIR LES PROJETS',
      layers: ['Infrastructure', 'Base de données', 'Backend', 'Frontend'],
      direction: 'De l’interface à l’infrastructure'
    },
    projects: {
      section: 'Projets à la une',
      intro: 'Applications développées au cours de mes études, dans les domaines du développement web, des bases de données, de l’infrastructure et de l’intégration de l’IA.',
      found: '{count} projet(s) trouvé(s)',
      none: 'Aucun projet ne correspond à ce filtre.',
      case: 'Voir le projet complet',
      preview: 'Aperçu de {title}',
      academic: 'Académique',
      client: 'Client réel',
      personal: 'Personnel',
      p1: {
        title: 'SPORTRA — Plateforme de réservation de terrains',
        description: 'SPORTRA est une plateforme numérique qui met en relation les sportifs et les complexes sportifs afin de faciliter la découverte et la réservation de terrains. Elle réunit la recherche d’installations, la consultation des disponibilités et la gestion des demandes, tout en offrant aux complexes des outils pour gérer leurs espaces et leurs horaires. Son expérience web et mobile simplifie la coordination entre les personnes à la recherche d’un lieu pour pratiquer un sport et les établissements qui le proposent.'
      },
      p2: {
        title: 'Application e-commerce pour un magasin de vêtements',
        description: 'Application destinée à la gestion des ventes et des opérations commerciales, avec des composants frontend et backend. Les données sont modélisées et gérées avec PostgreSQL, les services sont intégrés via une Web API et la base de données est configurée dans un environnement virtualisé avec des connexions à distance entre plusieurs postes.'
      },
      p3: {
        title: 'Mise en œuvre d’un système de téléphonie IP (VoIP)',
        description: 'Configuration d’un environnement de téléphonie IP dans des machines virtuelles. Le projet comprend le déploiement d’un serveur d’appels, la gestion des paramètres avec Webmin, l’intégration de clients pour simuler des appels entre environnements virtualisés et la mise en pratique de notions d’infrastructure, de services et de communication réseau.'
      },
      p4: {
        title: 'NexusStore — Gestion pour petites entreprises',
        description: 'Application web de gestion des stocks et des ventes pour les petits commerces, avec des modules d’inventaire, de ventes, de tableau de bord et de rapports. Le backend Laravel suit une architecture de contrôleurs, services et modèles et communique avec le frontend via une API. Le projet comprend l’authentification, le contrôle d’accès et l’isolation des données entre commerces. Git et Docker ont été utilisés pendant le développement.'
      },
      p5: {
        title: 'BovWeight CR — Estimation du poids des bovins',
        description: 'Système d’estimation du poids des bovins à partir d’images, avec un backend Laravel intégré au frontend Vue.js via une API. Il comprend un module Python de traitement et d’estimation par IA ainsi qu’une application Android Studio pour la capture d’images sur le terrain. Docker et Git ont été utilisés pour le développement et la maintenance.'
      },
      p6: {
        title: 'Guide touristique multimédia du Costa Rica',
        description: 'Application web interactive permettant d’explorer des destinations touristiques du Costa Rica à travers des images, de l’audio, de la vidéo et des données structurées. Elle est entièrement développée avec des technologies natives du navigateur : HTML5, CSS3, JavaScript ES6+ et l’API Web Components.'
      },
      p7: {
        title: 'Recueil de chants numérique — Iglesia del Norte',
        description: 'Application web multimédia développée avec Vue.js pour gérer et présenter le répertoire musical de l’Iglesia del Norte.'
      }
    },
    filters: { title: 'Filtrer', category: 'Catégorie', technology: 'Technologie', clear: 'Effacer les filtres' },
    about: {
      title: 'Profil et technologies',
      description: 'Étudiant en quatrième année d’informatique de gestion à l’Université du Costa Rica, avec une expérience pratique acquise dans des projets académiques et personnels utilisant différents langages de programmation, technologies web, systèmes de bases de données, systèmes d’exploitation, outils de développement et environnements virtualisés.',
      skills: ['Langages', 'Bases de données', 'Frameworks / API', 'Outils'],
      practicesTitle: 'Méthodes et pratiques de développement',
      practices: [
        {
          title: 'Scrum et méthodes agiles',
          description: 'Organisation du travail en itérations, priorisation des tâches et suivi de l’avancement.'
        },
        {
          title: 'Planification',
          description: 'Décomposition des besoins et organisation des tâches en étapes réalisables.'
        },
        {
          title: 'Fondamentaux DevOps',
          description: 'Utilisation de Docker et connaissance des pratiques reliant développement et opérations.'
        },
        {
          title: 'Qualité et validation',
          description: 'Tests et vérification du comportement pour repérer les erreurs et renforcer la fiabilité.'
        }
      ],
      education: 'Formation',
      studies: [
        'Baccalauréat en informatique de gestion',
        'Diplôme d’enseignement secondaire — section français avancé',
        'Technicien en guide naturaliste',
        'Cours de sensibilisation à la sécurité numérique',
        'Cours de service à la clientèle'
      ]
    },
    contact: {
      title: 'Construisons<br> quelque chose ensemble.',
      description: 'Je recherche ma première opportunité en tant que développeur. Si mon profil correspond à votre équipe, écrivez-moi — je réponds rapidement.'
    },
    detail: {
      description: 'Description',
      demo: 'Démonstration',
      viewDemo: 'Voir la démo',
      noDemo: 'Aucune démo publique disponible.',
      documents: 'Documents',
      gallery: 'Galerie de captures ({count})',
      screenshot: 'Capture {number}',
      enlarge: 'Agrandir',
      closePreview: 'Fermer l’aperçu',
      enlarged: 'Image agrandie',
      previousImage: 'Image précédente',
      nextImage: 'Image suivante',
      notFound: 'Projet introuvable',
      missingProject: 'Le projet recherché n’existe pas ou a été déplacé.'
    },
    notFound: {
      title: 'Page introuvable',
      description: 'La page à laquelle vous essayez d’accéder n’existe pas.'
    },
    footer: 'réalisé avec Vue 3 + Vite + Tailwind',
    logos: 'Technologies utilisées',
    technologies: { virtualMachines: 'Machines virtuelles' }
  }
}

const idiomaGuardado = typeof localStorage !== 'undefined' ? localStorage.getItem('portfolio-language') : null
export const idioma = ref(['es', 'en', 'fr'].includes(idiomaGuardado) ? idiomaGuardado : 'es')

function actualizarIdiomaDocumento(nuevoIdioma) {
  if (typeof document === 'undefined') return
  document.documentElement.lang = nuevoIdioma
  document.title = {
    es: 'Manuel Guzmán — Informática Empresarial & Sistemas',
    en: 'Manuel Guzmán — Business Informatics & Systems',
    fr: 'Manuel Guzmán — Informatique de gestion & systèmes'
  }[nuevoIdioma]
  const descripcion = document.querySelector('meta[name="description"]')
  if (descripcion) {
    descripcion.content = {
      es: 'Manuel Guzmán — Informática Empresarial, desarrollo de software y sistemas. Portafolio de proyectos académicos.',
      en: 'Manuel Guzmán — Business Informatics, software development, and systems. Portfolio of academic projects.',
      fr: 'Manuel Guzmán — Informatique de gestion, développement logiciel et systèmes. Portfolio de projets académiques.'
    }[nuevoIdioma]
  }
}

actualizarIdiomaDocumento(idioma.value)

export function cambiarIdioma(nuevoIdioma) {
  if (!traducciones[nuevoIdioma]) return
  idioma.value = nuevoIdioma
  localStorage.setItem('portfolio-language', nuevoIdioma)
  actualizarIdiomaDocumento(nuevoIdioma)
}

export function t(clave, variables = {}) {
  let valor = clave.split('.').reduce((objeto, parte) => objeto?.[parte], traducciones[idioma.value])
  if (typeof valor !== 'string') return clave
  for (const [nombre, reemplazo] of Object.entries(variables)) {
    valor = valor.replaceAll(`{${nombre}}`, reemplazo)
  }
  return valor
}

export function proyectoLocalizado(proyecto) {
  const traduccion = traducciones[idioma.value].projects[proyecto.id]
  return traduccion
    ? { ...proyecto, titulo: traduccion.title, descripcion: traduccion.description }
    : proyecto
}

export function tecnologiaLocalizada(tecnologia) {
  if (tecnologia.toLowerCase() === 'máquinas virtuales') return t('technologies.virtualMachines')
  return tecnologia
}

export function perfilLocalizado(perfil) {
  const idiomaActual = traducciones[idioma.value]
  return {
    ...perfil,
    rol: {
      es: 'Informática Empresarial · Tecnología y Sistemas',
      en: 'Business Informatics · Technology and Systems',
      fr: 'Informatique de gestion · Technologie et systèmes'
    }[idioma.value],
    biografia: {
      es: 'Estudiante de cuarto año de Informática Empresarial en la Universidad de Costa Rica, con formación multidisciplinaria en tecnología, desarrollo de software, bases de datos, sistemas e infraestructura. Experiencia práctica en proyectos académicos y personales con distintos lenguajes de programación, tecnologías web, gestores de bases de datos, sistemas operativos, herramientas de desarrollo y entornos virtualizados.',
      en: 'Fourth-year Business Informatics student at the University of Costa Rica, with multidisciplinary training in technology, software development, databases, systems, and infrastructure. Hands-on experience in academic and personal projects using various programming languages, web technologies, database management systems, operating systems, development tools, and virtualized environments.',
      fr: 'Étudiant en quatrième année d’informatique de gestion à l’Université du Costa Rica, avec une formation pluridisciplinaire en technologie, développement logiciel, bases de données, systèmes et infrastructure. Expérience pratique dans des projets académiques et personnels utilisant divers langages de programmation, technologies web, systèmes de gestion de bases de données, systèmes d’exploitation, outils de développement et environnements virtualisés.'
    }[idioma.value],
    estado: {
      es: 'Buscando primera oportunidad laboral',
      en: 'Seeking my first professional opportunity',
      fr: 'À la recherche d’une première expérience professionnelle'
    }[idioma.value],
    capasTecnicas: perfil.capasTecnicas.map((capa, indice) => ({
      ...capa,
      titulo: idiomaActual.hero.layers[indice]
    }))
  }
}

export function tiposDeProyectoLocalizados(tipos) {
  return computed(() => tipos.map((tipo) => ({
    ...tipo,
    label: t(`projects.${{ academico: 'academic', cliente: 'client', personal: 'personal' }[tipo.value]}`)
  })))
}
