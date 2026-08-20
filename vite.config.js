import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// ---------------------------------------------------------------------------
// Configuración de Vite
// ---------------------------------------------------------------------------
// Este proyecto usa una estructura de carpetas en español:
//   codigo/    -> equivalente a "src" (código fuente de la app)
//   publico/   -> equivalente a "public" (archivos estáticos servidos tal cual)
// ---------------------------------------------------------------------------
export default defineConfig({
  plugins: [vue()],

  // Carpeta de archivos estáticos (favicon, cv.pdf, imágenes, etc.)
  // Todo lo que pongas aquí se sirve directamente desde la raíz del sitio,
  // ej: publico/cv.pdf -> https://tu-dominio.com/cv.pdf
  publicDir: 'publico',

  // '/' es correcto para Vercel (dominio raíz o subdominio).
  // Si algún día despliegas en un subpath (ej. GitHub Pages en /repo/),
  // cambia esto a '/repo/'.
  base: '/',

  resolve: {
    alias: {
      // Alias '@' apunta a la carpeta 'codigo'.
      // Así, en cualquier componente puedes escribir:
      //   import { proyectos } from '@/datos/proyectos.js'
      // en vez de rutas relativas largas como '../../datos/proyectos.js'
      '@': fileURLToPath(new URL('./codigo', import.meta.url))
    }
  },

  build: {
    outDir: 'dist', // Vercel espera esta carpeta de salida por defecto
    sourcemap: false
  }
})
