<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  sparkColor: { type: String, default: '#8be28b' },
  sparkSize: { type: Number, default: 10 },
  sparkRadius: { type: Number, default: 15 },
  sparkCount: { type: Number, default: 8 },
  duration: { type: Number, default: 400 },
  easing: { type: String, default: 'ease-out' },
  extraScale: { type: Number, default: 1 }
})

const contenedor = ref(null)
const canvas = ref(null)
const chispas = []
let contexto
let observador
let idAnimacion
let temporizador

function aplicarEasing(valor) {
  if (props.easing === 'linear') return valor
  if (props.easing === 'ease-in') return valor * valor
  if (props.easing === 'ease-in-out') return valor < 0.5 ? 2 * valor * valor : -1 + (4 - 2 * valor) * valor
  return valor * (2 - valor)
}

function redimensionar() {
  if (!canvas.value || !contenedor.value || !contexto) return
  const { width, height } = contenedor.value.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.value.width = Math.max(1, Math.round(width * dpr))
  canvas.value.height = Math.max(1, Math.round(height * dpr))
  canvas.value.style.width = `${width}px`
  canvas.value.style.height = `${height}px`
  contexto.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function dibujar(marcaDeTiempo) {
  if (!contexto || !canvas.value || !contenedor.value) return
  const { width, height } = contenedor.value.getBoundingClientRect()
  contexto.clearRect(0, 0, width, height)
  contexto.strokeStyle = props.sparkColor
  contexto.lineWidth = 2
  contexto.lineCap = 'round'

  for (let indice = chispas.length - 1; indice >= 0; indice -= 1) {
    const chispa = chispas[indice]
    const progresoSinProcesar = (marcaDeTiempo - chispa.inicio) / props.duration
    if (progresoSinProcesar >= 1) {
      chispas.splice(indice, 1)
      continue
    }
    const progreso = aplicarEasing(Math.max(0, progresoSinProcesar))
    const distancia = progreso * props.sparkRadius * props.extraScale
    const longitud = props.sparkSize * (1 - progreso)
    const coseno = Math.cos(chispa.angulo)
    const seno = Math.sin(chispa.angulo)
    contexto.beginPath()
    contexto.moveTo(chispa.x + distancia * coseno, chispa.y + distancia * seno)
    contexto.lineTo(chispa.x + (distancia + longitud) * coseno, chispa.y + (distancia + longitud) * seno)
    contexto.stroke()
  }
  idAnimacion = requestAnimationFrame(dibujar)
}

function alHacerClick(evento) {
  if (!canvas.value) return
  const rectangulo = canvas.value.getBoundingClientRect()
  const cantidad = Math.max(1, Math.floor(props.sparkCount))
  const inicio = performance.now()
  for (let indice = 0; indice < cantidad; indice += 1) {
    chispas.push({
      x: evento.clientX - rectangulo.left,
      y: evento.clientY - rectangulo.top,
      angulo: (Math.PI * 2 * indice) / cantidad,
      inicio
    })
  }
}

onMounted(() => {
  contexto = canvas.value?.getContext('2d')
  if (!contexto || !contenedor.value) return
  observador = new ResizeObserver(() => {
    clearTimeout(temporizador)
    temporizador = setTimeout(redimensionar, 100)
  })
  observador.observe(contenedor.value)
  redimensionar()
  idAnimacion = requestAnimationFrame(dibujar)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(idAnimacion)
  clearTimeout(temporizador)
  observador?.disconnect()
})
</script>

<template>
  <div ref="contenedor" class="click-spark" @click="alHacerClick">
    <canvas ref="canvas" class="click-spark__canvas" aria-hidden="true" />
    <slot />
  </div>
</template>
