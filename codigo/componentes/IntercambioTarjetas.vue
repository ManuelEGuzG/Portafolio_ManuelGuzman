<!-- IntercambioTarjetas.vue -->
<script setup>
import { ref, onMounted, onUnmounted, useSlots, Comment, computed } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  width: { type: [Number, String], default: 360 },
  height: { type: [Number, String], default: 220 },
  cardDistance: { type: Number, default: 28 },
  verticalDistance: { type: Number, default: 18 },
  maxVisible: { type: Number, default: 4 },
  delay: { type: Number, default: 1600 },
  pauseOnHover: { type: Boolean, default: true },
  skewAmount: { type: Number, default: 2 }
})

const emit = defineEmits(['click-card'])

const wrapperRef = ref(null)
const containerRef = ref(null)
const cardRefs = ref([])
const order = ref([])
const isMobile = ref(false)
const containerWidth = ref(360)

let intervalId = null
let tl = null
let resizeObserver = null

const slots = useSlots()

// Distancias reducidas dinámicamente según el espacio disponible
const responsiveCardDistance = computed(() => isMobile.value ? props.cardDistance * 0.45 : props.cardDistance)
const responsiveVerticalDistance = computed(() => isMobile.value ? props.verticalDistance * 0.6 : props.verticalDistance)

// Calculamos un tamaño seguro que impida el desborde en pantallas estrechas
const responsiveCardWidth = computed(() => {
  const maxSafeWidth = containerWidth.value - (responsiveCardDistance.value * (props.maxVisible - 1) + 20)
  const baseWidth = typeof props.width === 'number' ? props.width : 360
  return Math.max(220, Math.min(baseWidth, maxSafeWidth))
})

const responsiveCardHeight = computed(() => responsiveCardWidth.value * (220 / 360))

const getValidChildren = () => {
  if (!slots.default) return []
  const children = slots.default()
  return children.flatMap((node) => {
    if (node.type === Symbol.for('v-fgt') || Array.isArray(node.children)) {
      return Array.isArray(node.children) ? node.children : []
    }
    return node
  }).filter((node) => node.type !== Comment)
}

const calcularSlot = (posicionVisible, total) => {
  const esVisible = posicionVisible < props.maxVisible
  return {
    x: esVisible ? posicionVisible * responsiveCardDistance.value : (props.maxVisible - 1) * responsiveCardDistance.value,
    y: esVisible ? -posicionVisible * responsiveVerticalDistance.value : -(props.maxVisible - 1) * responsiveVerticalDistance.value,
    z: esVisible ? -posicionVisible * 30 : -props.maxVisible * 30,
    opacity: esVisible ? 1 : 0,
    scale: esVisible ? 1 - posicionVisible * 0.02 : 0.9,
    zIndex: total - posicionVisible
  }
}

const aplicarPosicionesIniciales = () => {
  const total = cardRefs.value.length
  if (total === 0) return

  if (order.value.length === 0) {
    order.value = Array.from({ length: total }, (_, i) => i)
  }

  order.value.forEach((cardIdx, pos) => {
    const el = cardRefs.value[cardIdx]
    if (!el) return
    const slot = calcularSlot(pos, total)
    gsap.set(el, {
      x: slot.x,
      y: slot.y,
      z: slot.z,
      opacity: slot.opacity,
      scale: slot.scale,
      xPercent: -50,
      yPercent: -50,
      skewY: props.skewAmount,
      zIndex: slot.zIndex,
      force3D: true
    })
  })
}

const siguienteCaptura = () => {
  if (tl && tl.isActive()) return
  const total = order.value.length
  if (total < 2) return

  const [front, ...rest] = order.value
  const nuevoOrden = [...rest, front]
  const elFront = cardRefs.value[front]
  if (!elFront) return

  tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })

  tl.to(elFront, { y: '+=140', opacity: 0, scale: 0.85, duration: 0.35 })
  tl.addLabel('desplazar', '-=0.25')

  nuevoOrden.forEach((cardIdx, nuevaPos) => {
    if (cardIdx === front) return
    const el = cardRefs.value[cardIdx]
    if (!el) return
    const slot = calcularSlot(nuevaPos, total)
    tl.set(el, { zIndex: slot.zIndex }, 'desplazar')
    tl.to(el, {
      x: slot.x,
      y: slot.y,
      z: slot.z,
      opacity: slot.opacity,
      scale: slot.scale,
      duration: 0.4
    }, 'desplazar')
  })

  const backSlot = calcularSlot(total - 1, total)
  tl.set(elFront, {
    x: backSlot.x,
    y: backSlot.y,
    z: backSlot.z,
    scale: backSlot.scale,
    zIndex: backSlot.zIndex
  })

  tl.to(elFront, {
    opacity: backSlot.opacity,
    duration: 0.25,
    onComplete: () => { order.value = nuevoOrden }
  }, '-=0.15')
}

const anteriorCaptura = () => {
  if (tl && tl.isActive()) return
  const total = order.value.length
  if (total < 2) return

  const back = order.value[total - 1]
  const rest = order.value.slice(0, total - 1)
  const nuevoOrden = [back, ...rest]
  const elBack = cardRefs.value[back]
  if (!elBack) return

  tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })

  gsap.set(elBack, {
    y: '+=140',
    opacity: 0,
    scale: 0.85,
    zIndex: total + 1
  })

  nuevoOrden.forEach((cardIdx, nuevaPos) => {
    if (cardIdx === back) return
    const el = cardRefs.value[cardIdx]
    if (!el) return
    const slot = calcularSlot(nuevaPos, total)
    tl.to(el, {
      x: slot.x,
      y: slot.y,
      z: slot.z,
      opacity: slot.opacity,
      scale: slot.scale,
      duration: 0.4
    }, 0)
    tl.set(el, { zIndex: slot.zIndex }, 0.4)
  })

  const frontSlot = calcularSlot(0, total)
  tl.to(elBack, {
    x: frontSlot.x,
    y: frontSlot.y,
    z: frontSlot.z,
    opacity: 1,
    scale: 1,
    duration: 0.35,
    onComplete: () => { order.value = nuevoOrden }
  }, 0.1)
}

const reiniciarTimer = () => {
  clearInterval(intervalId)
  intervalId = window.setInterval(siguienteCaptura, props.delay)
}

const handleManualNext = () => {
  siguienteCaptura()
  reiniciarTimer()
}

const handleManualPrev = () => {
  anteriorCaptura()
  reiniciarTimer()
}

const handleResize = () => {
  if (wrapperRef.value) {
    const width = wrapperRef.value.clientWidth
    containerWidth.value = width
    isMobile.value = width < 640
    aplicarPosicionesIniciales()
  }
}

const setCardRef = (el, idx) => {
  if (el) cardRefs.value[idx] = el
}

const handleCardClick = (idx) => {
  emit('click-card', idx)
}

onMounted(() => {
  if (wrapperRef.value) {
    resizeObserver = new ResizeObserver(() => handleResize())
    resizeObserver.observe(wrapperRef.value)
  }

  setTimeout(() => {
    handleResize()
    intervalId = window.setInterval(siguienteCaptura, props.delay)
  }, 50)

  if (props.pauseOnHover && containerRef.value) {
    containerRef.value.addEventListener('mouseenter', () => clearInterval(intervalId))
    containerRef.value.addEventListener('mouseleave', () => reiniciarTimer())
  }
})

onUnmounted(() => {
  clearInterval(intervalId)
  if (tl) tl.kill()
  if (resizeObserver) resizeObserver.disconnect()
})
</script>

<template>
  <div ref="wrapperRef" class="card-swap-wrapper">
    <div
      ref="containerRef"
      class="card-swap-container"
      :style="{
        width: `${responsiveCardWidth}px`,
        height: `${responsiveCardHeight}px`
      }"
    >
      <div
        v-for="(child, idx) in getValidChildren()"
        :key="idx"
        :ref="(el) => setCardRef(el, idx)"
        class="card-swap-item"
        :style="{
          width: `${responsiveCardWidth}px`,
          height: `${responsiveCardHeight}px`
        }"
        @click="handleCardClick(idx)"
      >
        <component :is="child" />
      </div>
    </div>

    <!-- Botones de navegación -->
    <div class="controls-container">
      <button class="nav-btn" aria-label="Foto anterior" @click="handleManualPrev">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button class="nav-btn" aria-label="Siguiente foto" @click="handleManualNext">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.card-swap-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100%;
  padding: 10px 16px;
  box-sizing: border-box;
  overflow: hidden;
}

.card-swap-container {
  position: relative;
  perspective: 1000px;
  overflow: visible;
  margin: 30px auto 10px auto;
}

.card-swap-item {
  position: absolute;
  top: 50%;
  left: 38%; /* Desplazado ligeramente a la izquierda para compensar la acumulación a la derecha */
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: #0d111a;
  overflow: hidden;
  cursor: pointer;
  transform-style: preserve-3d;
  will-change: transform, opacity;
  box-shadow: -8px 12px 25px rgba(0, 0, 0, 0.6);
}

.card-swap-item :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.controls-container {
  display: flex;
  gap: 12px;
  margin-top: 15px;
  z-index: 10;
}

.nav-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.nav-btn:active {
  transform: translateY(0);
}

@media (max-width: 640px) {
  .card-swap-item {
    left: 32%; /* Compensación mayor para pantallas delgadas */
  }

  .card-swap-container {
    margin-top: 20px;
  }
  
  .nav-btn {
    width: 36px;
    height: 36px;
  }
}
</style>