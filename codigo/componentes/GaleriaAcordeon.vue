<!-- GaleriaAcordeon.vue -->
<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  defaultIndex: {
    type: Number,
    default: 0
  },
  accentColor: {
    type: String,
    default: '#ffffff'
  },
  overlayColor: {
    type: String,
    default: '#060010'
  },
  textColor: {
    type: String,
    default: '#ffffff'
  },
  height: {
    type: Number,
    default: 460
  },
  gap: {
    type: Number,
    default: 10
  },
  radius: {
    type: Number,
    default: 16
  },
  expandRatio: {
    type: Number,
    default: 0.65
  },
  orientation: {
    type: String,
    default: 'horizontal'
  },
  duration: {
    type: Number,
    default: 0.6
  },
  ease: {
    type: String,
    default: 'power3.out'
  },
  parallax: {
    type: Number,
    default: 0.5
  },
  tilt: {
    type: Number,
    default: 8
  },
  stagger: {
    type: Number,
    default: 0.06
  },
  trigger: {
    type: String,
    default: 'hover'
  },
  showLabels: {
    type: Boolean,
    default: true
  },
  grayscale: {
    type: Boolean,
    default: true
  },
  className: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click-item'])

const rootRef = ref(null)
const panelRefs = ref([])
const mediaRefs = ref([])
const barRefs = ref([])
const textRefs = ref([])

const tl = ref(null)
const firstRun = ref(true)
const mediaSize = ref(320)

const vertical = computed(() => props.orientation === 'vertical')
const count = computed(() => props.items.length)
const active = ref(Math.min(Math.max(props.defaultIndex, 0), count.value - 1))

const prefersReduced =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

const setPanelRef = (el, i) => { if (el) panelRefs.value[i] = el }
const setMediaRef = (el, i) => { if (el) mediaRefs.value[i] = el }
const setBarRef = (el, i) => { if (el) barRefs.value[i] = el }
const setTextRef = (el, i) => { if (el) textRefs.value[i] = el }

const applyLayout = (animate = true) => {
  const panels = panelRefs.value
  if (!panels || !panels.length) return

  const r = Math.min(Math.max(props.expandRatio, 0.2), 0.9)
  const grow = count.value > 1 ? (r * (count.value - 1)) / (1 - r) : 1
  const mSize = mediaSize.value

  tl.value?.kill()
  const dur = animate && !prefersReduced ? props.duration : 0
  const timeline = gsap.timeline()

  panels.forEach((panel, i) => {
    if (!panel) return
    const isActive = i === active.value
    const media = mediaRefs.value[i]
    const bar = barRefs.value[i]
    const text = textRefs.value[i]

    const rot = isActive ? 0 : i < active.value ? props.tilt : -props.tilt
    const rotProp = vertical.value ? { rotateX: -rot } : { rotateY: rot }

    timeline.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease: props.ease }, 0)

    if (media) {
      const drift = Math.max(-1.5, Math.min(1.5, active.value - i))
      const shift = drift * props.parallax * mSize * 0.06
      const gray = props.grayscale ? (isActive ? 0 : 1) : 0
      
      timeline.to(
        media,
        {
          xPercent: -50,
          yPercent: -50,
          width: isActive ? '100%' : 'var(--ag-media-size)',
          x: vertical.value ? 0 : isActive ? 0 : shift,
          y: vertical.value ? (isActive ? 0 : shift) : 0,
          '--ag-gray': gray,
          '--ag-dim': isActive ? 0 : 0.4,
          duration: dur,
          ease: props.ease
        },
        0
      )
    }

    if (props.showLabels && bar && text) {
      if (isActive) {
        timeline.to([bar, text], { opacity: 1, x: 0, duration: dur, ease: props.ease, stagger: prefersReduced ? 0 : props.stagger }, 0)
      } else {
        timeline.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease: props.ease }, 0)
      }
    }
  })

  tl.value = timeline
}

const measure = () => {
  const el = rootRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const total = vertical.value ? rect.height : rect.width
  const usable = Math.max(total - props.gap * (count.value - 1), 120)
  const size = Math.max(140, usable * Math.min(Math.max(props.expandRatio, 0.2), 0.9) * 1.22)
  mediaSize.value = size
  el.style.setProperty('--ag-media-size', `${size}px`)
  applyLayout(!firstRun.value)
}

let resizeObserver = null

onMounted(() => {
  nextTick(() => {
    measure()
    if (rootRef.value) {
      resizeObserver = new ResizeObserver(measure)
      resizeObserver.observe(rootRef.value)
    }
    firstRun.value = false
  })
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  tl.value?.kill()
})

watch(active, () => {
  applyLayout(!firstRun.value)
})

const handleEnter = (i) => {
  if (props.trigger === 'hover') active.value = i
}

const handleClick = (i, item) => {
  active.value = i
  emit('click-item', item)
}

const handleKeyDown = (i, e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault()
    active.value = (i + 1) % count.value
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault()
    active.value = (i - 1 + count.value) % count.value
  }
}
</script>

<template>
  <div
    ref="rootRef"
    :class="[
      'accordion-gallery',
      vertical ? 'accordion-gallery--vertical' : '',
      className
    ]"
    :style="{
      '--ag-accent': accentColor,
      '--ag-overlay': overlayColor,
      '--ag-text': textColor,
      '--ag-gap': `${gap}px`,
      '--ag-radius': `${radius}px`,
      height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`
    }"
    role="list"
    aria-label="Galería de imágenes en acordeón"
  >
    <div
      v-for="(item, i) in items"
      :key="i"
      :ref="(el) => setPanelRef(el, i)"
      :class="['ag-panel', i === active ? 'ag-panel--active' : '']"
      :style="{ borderRadius: `${radius}px` }"
      role="listitem"
      tabindex="0"
      :aria-current="i === active ? 'true' : undefined"
      :aria-label="item.label || `Imagen ${i + 1}`"
      @click="handleClick(i, item)"
      @mouseenter="handleEnter(i)"
      @focus="active = i"
      @keydown="handleKeyDown(i, $event)"
    >
      <span class="ag-panel__frame">
        <span :ref="(el) => setMediaRef(el, i)" class="ag-panel__media">
          <img 
            :src="item.image" 
            :alt="item.alt || item.label || ''" 
            :class="i === active ? 'img-contain' : 'img-cover'"
            draggable="false" 
          />
        </span>
        <span class="ag-panel__overlay" aria-hidden="true" />
      </span>

      <span v-if="showLabels" class="ag-panel__label" aria-hidden="true">
        <span :ref="(el) => setBarRef(el, i)" class="ag-panel__bar" />
        <span :ref="(el) => setTextRef(el, i)" class="ag-panel__text">
          {{ item.label }}
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.accordion-gallery {
  --ag-accent: #ffffff;
  --ag-overlay: #060010;
  --ag-text: #ffffff;
  --ag-gap: 10px;
  --ag-radius: 16px;
  --ag-media-size: 320px;

  display: flex;
  flex-direction: row;
  gap: var(--ag-gap);
  width: 100%;
  max-width: 100%;
  perspective: 1400px;
  perspective-origin: 50% 50%;
}

.accordion-gallery--vertical {
  flex-direction: column;
}

.ag-panel {
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border-radius: var(--ag-radius);
  cursor: pointer;
  display: block;
  text-decoration: none;
  outline: none;
  transform-style: preserve-3d;
  transform-origin: center center;
  background: #000000;
  box-shadow: 0 10px 30px -18px rgba(0, 0, 0, 0.8);
  will-change: flex-grow, transform;
  -webkit-tap-highlight-color: transparent;
}

.ag-panel:focus-visible {
  box-shadow:
    0 0 0 2px var(--ag-accent),
    0 10px 30px -18px rgba(0, 0, 0, 0.8);
}

.ag-panel__frame {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
}

.ag-panel__media {
  --ag-gray: 1;
  --ag-dim: 0.35;
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--ag-media-size);
  height: 100%;
  filter: grayscale(var(--ag-gray));
  will-change: transform, filter, width;
}

.accordion-gallery--vertical .ag-panel__media {
  width: 100%;
  height: var(--ag-media-size);
}

/* Modo recortado para inactivas */
.ag-panel__media img.img-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
}

/* Modo completo (sin recortes) para la activa */
.ag-panel__media img.img-contain {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
}

.ag-panel__overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg, transparent 55%, color-mix(in srgb, var(--ag-overlay) 78%, transparent) 100%),
    color-mix(in srgb, var(--ag-overlay) calc(var(--ag-dim, 0.35) * 100%), transparent);
}

.ag-panel__label {
  position: absolute;
  left: 20px;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  pointer-events: none;
  z-index: 2;
}

.ag-panel__bar {
  flex: 0 0 auto;
  width: 3px;
  height: 26px;
  border-radius: 3px;
  background: var(--ag-accent);
  opacity: 0;
  box-shadow: 0 0 12px color-mix(in srgb, var(--ag-accent) 60%, transparent);
}

.ag-panel__text {
  color: var(--ag-text);
  font-family: inherit;
  font-weight: 600;
  font-size: clamp(1rem, 1.4vw, 1.4rem);
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.55);
}

@media (max-width: 520px) {
  .accordion-gallery {
    flex-direction: column;
    perspective: none;
    height: auto !important;
  }
  .ag-panel {
    min-height: 100px;
    transform: none !important;
  }
  .accordion-gallery .ag-panel__media {
    width: 100%;
    height: var(--ag-media-size);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ag-panel,
  .ag-panel__media {
    will-change: auto;
  }
}
</style>