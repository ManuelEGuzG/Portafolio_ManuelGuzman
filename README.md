# Portafolio — Manuel Guzmán

SPA de portafolio 100% frontend (Vue 3 + Vite + Tailwind CSS + Vue Router).
Sin backend: todos los proyectos viven en `codigo/datos/proyectos.js`.

Cada proyecto tiene su propia página de detalle (demo, repositorio, hasta
3 documentos de referencia), con transiciones animadas entre páginas.

Todo el código, carpetas y comentarios están en español para que sea fácil
de editar y entender.

## Rutas del sitio

| Ruta                | Página                          | Qué muestra                                             |
| -------------------- | -------------------------------- | --------------------------------------------------------- |
| `/`                   | `paginas/PaginaInicio.vue`       | Portafolio completo: hero, proyectos, perfil, contacto     |
| `/proyecto/:id`       | `paginas/PaginaProyecto.vue`     | Detalle del proyecto: descripción, demo, repo, documentos  |
| cualquier otra ruta   | `paginas/PaginaNoEncontrada.vue` | Página 404                                                 |

Al hacer clic en una tarjeta de la galería, se navega a `/proyecto/:id`
con una transición animada (fundido + desplazamiento), y una fina barra
de progreso aparece arriba durante la navegación. El botón
"← Volver al portafolio" regresa al inicio.

## Estructura del proyecto

```
portfolio-vue/
├── index.html                  ← Punto de entrada HTML (fuentes, metadatos)
├── vite.config.js              ← Configuración de Vite (rutas, alias '@')
├── tailwind.config.js          ← Colores, tipografías y tokens de diseño
├── postcss.config.js
├── vercel.json                 ← Configuración de despliegue en Vercel
│                                  (incluye el rewrite necesario para que
│                                  las rutas de Vue Router funcionen en producción)
│
├── publico/                    ← Archivos estáticos (equivalente a "public")
│   ├── favicon.svg
│   ├── cv.pdf                  ← REEMPLAZA este archivo por tu CV real
│   └── documentos/              ← AQUÍ SUBES los PDFs de tus proyectos (ver abajo)
│
└── codigo/                     ← Código fuente (equivalente a "src")
    ├── principal.js            ← Punto de entrada de la app Vue (registra el router)
    ├── Aplicacion.vue          ← Shell de rutas + barra de progreso + transición de página
    │
    ├── rutas/
    │   └── router.js           ← Definición de las rutas ('/', '/proyecto/:id', 404)
    │
    ├── paginas/
    │   ├── PaginaInicio.vue         ← Página '/' — arma el portafolio completo
    │   ├── PaginaProyecto.vue       ← Página '/proyecto/:id' — detalle del proyecto
    │   └── PaginaNoEncontrada.vue   ← Página 404
    │
    ├── datos/
    │   ├── perfil.js            ← AQUÍ EDITAS TUS DATOS PERSONALES
    │   └── proyectos.js         ← AQUÍ EDITAS TUS PROYECTOS (demo, repo, documentos)
    │
    ├── componentes/
    │   ├── BarraNavegacion.vue     ← Menú fijo superior con scroll-spy (solo en Inicio)
    │   ├── BarraSimple.vue         ← Barra minimalista "← Volver" (detalle y 404)
    │   ├── BarraProgreso.vue       ← Línea de progreso al navegar entre páginas
    │   ├── SeccionInicio.vue       ← Hero: nombre, bio, badge de estado
    │   ├── PilaSistemas.vue        ← Figura 3D del Hero (capas de arquitectura)
    │   ├── GaleriaProyectos.vue    ← Orquesta filtros + tarjetas (lógica reactiva)
    │   ├── FiltroProyectos.vue     ← Botones de filtro por tecnología/categoría
    │   ├── TarjetaProyecto.vue     ← Tarjeta clicable que enlaza a /proyecto/:id
    │   ├── SeccionSobreMi.vue      ← Habilidades + formación académica
    │   ├── SeccionContacto.vue     ← Correo, teléfono, redes, footer
    │   └── BotonMagnetico.vue      ← Botón reutilizable con efecto hover
    │
    ├── composables/
    │   ├── usarScrollSpy.js      ← Detecta la sección visible (para el nav)
    │   └── usarProgresoRuta.js   ← Estado de la barra de progreso de navegación
    │
    ├── directivas/
    │   └── revelarAlEntrar.js  ← Directiva v-revelar: animación al hacer scroll
    │
    └── recursos/
        └── estilos.css         ← CSS global (Tailwind + animaciones + tema + transiciones)
```

> **Nota sobre "composables":** dejé esa carpeta con su nombre en inglés
> porque es un término propio del ecosistema Vue (así se le llama en la
> documentación oficial incluso en español). Todo lo demás — carpetas,
> variables, props, comentarios — está en español.

## ¿Dónde edito qué?

| Quiero cambiar...                          | Edita este archivo                                          |
| -------------------------------------------- | -------------------------------------------------------------- |
| Mi nombre, rol, bio, correo, redes           | `codigo/datos/perfil.js`                                       |
| El badge de estado del Hero ("Buscando...")  | `codigo/datos/perfil.js` → `estado`                             |
| Las capas de la figura 3D del Hero           | `codigo/datos/perfil.js` → `capasTecnicas`                     |
| Mis proyectos (título, tecnologías, etc.)    | `codigo/datos/proyectos.js`                                    |
| El demo o repo de un proyecto                | `codigo/datos/proyectos.js` → `urlDemo` / `urlRepositorio`     |
| Documentos de referencia de un proyecto (máx. 3) | `codigo/datos/proyectos.js` → array `documentos`            |
| Mi CV descargable                            | `publico/cv.pdf` (reemplaza el archivo)                        |
| Colores, tipografías                         | `tailwind.config.js`                                           |
| Mis habilidades / formación académica        | `codigo/componentes/SeccionSobreMi.vue`                        |
| Las secciones del menú de navegación         | `codigo/componentes/BarraNavegacion.vue` → variable `secciones`|
| La velocidad/estilo de la transición de página | `codigo/recursos/estilos.css` → clases `.pagina-*`            |

---

## Cómo subir el demo, el repositorio y el PDF de documentación de un proyecto

Toda esta información se edita en **un solo archivo**: `codigo/datos/proyectos.js`.
Busca el proyecto que quieres completar (por su `id`, ej. `'p4'`) y edita
estos 3 campos:

### 1. Repositorio de GitHub

Copia y pega la URL de tu repo tal cual aparece en el navegador:

```js
urlRepositorio: 'https://github.com/tu-usuario/nexusstore',
```

Si el repo es privado o aún no lo subes, deja `''` — el botón "Repositorio"
simplemente no aparecerá en la página del proyecto (no rompe nada).

### 2. Demo en vivo

Si desplegaste el proyecto en algún lado (Vercel, Netlify, Railway, un
hosting compartido, etc.), pega esa URL:

```js
urlDemo: 'https://nexusstore-demo.vercel.app',
```

Igual que con el repo: si lo dejas `''`, el botón "Ver demo" no se muestra.

### 3. PDF de documentación (subirlo tú mismo, sin depender de otro sitio)

Aquí hay dos formas de hacerlo. La más simple y recomendada es meter el
PDF directamente dentro del proyecto:

**Paso a paso:**

1. Copia tu archivo PDF (informe, manual, diagrama, etc.) dentro de la
   carpeta `publico/documentos/`. Por ejemplo:
   ```
   publico/documentos/nexusstore-informe.pdf
   ```
   (Si la carpeta `documentos/` no existe, créala — cualquier cosa que
   pongas dentro de `publico/` se sirve tal cual en el sitio final.)

2. En `codigo/datos/proyectos.js`, dentro del proyecto correspondiente,
   agrega la entrada al array `documentos` apuntando a esa ruta con **/**
   al inicio (no lleva `publico`, esa parte es automática):
   ```js
   documentos: [
     { titulo: 'Informe técnico (PDF)', url: '/documentos/nexusstore-informe.pdf' }
   ]
   ```

3. Guarda, corre `npm run dev` y entra a `/proyecto/p4` (o el id que
   corresponda) — vas a ver el documento listado con un ícono 📄, listo
   para abrirse en una pestaña nueva.

4. Puedes repetir esto hasta con **3 documentos** por proyecto:
   ```js
   documentos: [
     { titulo: 'Informe técnico (PDF)', url: '/documentos/nexusstore-informe.pdf' },
     { titulo: 'Manual de usuario (PDF)', url: '/documentos/nexusstore-manual.pdf' },
     { titulo: 'Diagrama de base de datos', url: '/documentos/nexusstore-er.pdf' }
   ]
   ```
   Si el array queda vacío `[]`, esa sección simplemente no aparece —
   no hace falta borrar nada más.

**Alternativa:** si prefieres no subir el PDF dentro del repositorio (por
ejemplo, porque pesa mucho), puedes subirlo a Google Drive, Dropbox o
GitHub (como "Release" o archivo suelto en el repo) y pegar directamente
ese link externo en `url`, exactamente igual que con `urlDemo`:
```js
documentos: [
  { titulo: 'Informe técnico (PDF)', url: 'https://drive.google.com/tu-enlace-compartido' }
]
```

> ⚠️ Importante con Google Drive: usa el link de "Compartir → Cualquier
> persona con el enlace", si no, el PDF no se podrá abrir para quien
> visite tu portafolio.

---

## Desarrollo local

```bash
npm install
npm run dev
```

Abre la URL que te muestre la terminal (normalmente `http://localhost:5173`).

## Build de producción

```bash
npm run build
npm run preview   # para probar el build localmente
```

## Despliegue en Vercel

1. Sube el proyecto a GitHub (ver abajo). Si agregaste PDFs en
   `publico/documentos/`, asegúrate de que **no** estén listados en
   `.gitignore` — deben subirse junto con el resto del código para que
   Vercel los incluya en el despliegue.
2. Entra a https://vercel.com → **Add New Project** → importa el repo.
3. Vercel detecta Vite automáticamente. Confirma:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy. `vercel.json` ya incluye el rewrite necesario para que las
   rutas de Vue Router (`/proyecto/p1`, etc.) funcionen incluso al
   recargar la página directamente o compartir el link.

## Subir a GitHub

```bash
git init
git add .
git commit -m "feat: portafolio inicial"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```
