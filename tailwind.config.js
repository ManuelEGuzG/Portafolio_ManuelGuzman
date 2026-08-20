/** @type {import('tailwindcss').Config} */
// -----------------------------------------------------------------------------
// Configuración de Tailwind CSS
// -----------------------------------------------------------------------------
// Aquí se define el "sistema de diseño" del sitio: colores, tipografías y
// utilidades personalizadas. Si quieres cambiar la paleta de colores o las
// fuentes de TODO el sitio, este es el único lugar que necesitas tocar.
// -----------------------------------------------------------------------------
export default {
  // 'content' le dice a Tailwind en qué archivos buscar clases usadas,
  // para incluir solo el CSS necesario en el build final.
  content: ['./index.html', './codigo/**/*.{vue,js,ts,jsx,tsx}'],

  theme: {
    extend: {
      // Familias tipográficas. Se usan así en las clases: font-display, font-sans, font-mono
      fontFamily: {
        display: ['"Sora"', 'ui-sans-serif', 'system-ui', 'sans-serif'], // Títulos grandes
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'], // Texto normal / párrafos
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'] // Etiquetas, tags, datos técnicos
      },

      // Paleta de colores personalizada (tema "plano técnico / sistemas").
      // Uso: bg-ink, text-signal, border-line, etc.
      colors: {
        ink: '#0A0F14', // Fondo principal
        surface: '#111A20', // Fondo de tarjetas y paneles
        surface2: '#0D151A', // Fondo secundario
        line: '#26343A', // Bordes y líneas divisorias
        paper: '#F2F5F0', // Texto principal
        muted: '#91A19F', // Texto secundario / descripciones
        signal: '#8BE28B', // Acento principal
        signalWarm: '#F2B880' // Acento secundario
      },

      // Fondo tipo "cuadrícula de plano técnico", usado en Hero y Contacto.
      backgroundImage: {
        blueprint:
          'linear-gradient(to right, #ffffff0a 1px, transparent 1px), linear-gradient(to bottom, #ffffff0a 1px, transparent 1px)'
      },
      backgroundSize: {
        blueprint: '40px 40px'
      },

      // Sombra de resplandor (glow) usada en botones y elementos destacados.
      boxShadow: {
        glow: '0 0 0 1px rgba(76,201,240,0.25), 0 0 40px -8px rgba(76,201,240,0.35)'
      }
    }
  },
  plugins: []
}
