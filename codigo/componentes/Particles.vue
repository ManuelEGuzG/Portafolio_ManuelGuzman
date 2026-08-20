<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Camera, Geometry, Mesh, Program, Renderer } from 'ogl'

const props = defineProps({
  particleCount: { type: Number, default: 200 },
  particleSpread: { type: Number, default: 10 },
  speed: { type: Number, default: 0.1 },
  particleColors: { type: Array, default: () => ['#ffffff'] },
  moveParticlesOnHover: { type: Boolean, default: false },
  particleHoverFactor: { type: Number, default: 1 },
  alphaParticles: { type: Boolean, default: false },
  particleBaseSize: { type: Number, default: 100 },
  sizeRandomness: { type: Number, default: 1 },
  cameraDistance: { type: Number, default: 20 },
  disableRotation: { type: Boolean, default: false },
  pixelRatio: { type: Number, default: 1 }
})

const contenedor = ref(null)
let renderer
let camara
let malla
let programa
let idAnimacion
let controladorSalida

function convertirColor(hexadecimal) {
  const valor = hexadecimal.replace(/^#/, '')
  const completo = valor.length === 3 ? valor.split('').map((letra) => letra + letra).join('') : valor
  const numero = Number.parseInt(completo.slice(0, 6), 16)
  return [(numero >> 16 & 255) / 255, (numero >> 8 & 255) / 255, (numero & 255) / 255]
}

const vertexShader = `
attribute vec3 position;
attribute vec4 random;
attribute vec3 color;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uSpread;
uniform float uBaseSize;
uniform float uSizeRandomness;
varying vec4 vRandom;
varying vec3 vColor;
void main() {
  vRandom = random;
  vColor = color;
  vec3 pos = position * uSpread;
  pos.z *= 10.0;
  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  modelPosition.x += sin(uTime * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
  modelPosition.y += sin(uTime * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
  modelPosition.z += sin(uTime * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_PointSize = uSizeRandomness == 0.0 ? uBaseSize : (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(viewPosition.xyz);
  gl_Position = projectionMatrix * viewPosition;
}`

const fragmentShader = `
precision highp float;
uniform float uTime;
uniform float uAlphaParticles;
varying vec4 vRandom;
varying vec3 vColor;
void main() {
  vec2 uv = gl_PointCoord.xy;
  float distanceFromCenter = length(uv - vec2(0.5));
  if (uAlphaParticles < 0.5) {
    if (distanceFromCenter > 0.5) discard;
    gl_FragColor = vec4(vColor + 0.15 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
  } else {
    float circle = smoothstep(0.5, 0.4, distanceFromCenter) * 0.8;
    gl_FragColor = vec4(vColor + 0.15 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
  }
}`

function crearParticulas(gl) {
  const cantidad = Math.max(1, Math.floor(props.particleCount))
  const posiciones = new Float32Array(cantidad * 3)
  const aleatorios = new Float32Array(cantidad * 4)
  const colores = new Float32Array(cantidad * 3)
  const paleta = props.particleColors.length ? props.particleColors : ['#8be28b']

  for (let indice = 0; indice < cantidad; indice += 1) {
    let x
    let y
    let z
    let longitud
    do {
      x = Math.random() * 2 - 1
      y = Math.random() * 2 - 1
      z = Math.random() * 2 - 1
      longitud = x * x + y * y + z * z
    } while (longitud > 1 || longitud === 0)

    const radio = Math.cbrt(Math.random())
    posiciones.set([x * radio, y * radio, z * radio], indice * 3)
    aleatorios.set([Math.random(), Math.random(), Math.random(), Math.random()], indice * 4)
    colores.set(convertirColor(paleta[Math.floor(Math.random() * paleta.length)]), indice * 3)
  }

  const geometria = new Geometry(gl, {
    position: { size: 3, data: posiciones },
    random: { size: 4, data: aleatorios },
    color: { size: 3, data: colores }
  })
  return new Mesh(gl, { mode: gl.POINTS, geometry: geometria, program: programa })
}

onMounted(() => {
  if (!contenedor.value) return
  renderer = new Renderer({ dpr: props.pixelRatio, depth: false, alpha: true })
  const gl = renderer.gl
  gl.clearColor(0, 0, 0, 0)
  camara = new Camera(gl, { fov: 15 })
  camara.position.set(0, 0, props.cameraDistance)

  programa = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uSpread: { value: props.particleSpread },
      uBaseSize: { value: props.particleBaseSize * props.pixelRatio },
      uSizeRandomness: { value: props.sizeRandomness },
      uAlphaParticles: { value: props.alphaParticles ? 1 : 0 }
    },
    transparent: true,
    depthTest: false
  })
  malla = crearParticulas(gl)
  contenedor.value.appendChild(gl.canvas)

  const raton = { x: 0, y: 0 }
  const redimensionar = () => {
    renderer.setSize(contenedor.value.clientWidth, contenedor.value.clientHeight)
    camara.perspective({ aspect: gl.canvas.width / gl.canvas.height })
  }
  const moverRaton = (evento) => {
    const rectangulo = contenedor.value.getBoundingClientRect()
    raton.x = ((evento.clientX - rectangulo.left) / rectangulo.width) * 2 - 1
    raton.y = -(((evento.clientY - rectangulo.top) / rectangulo.height) * 2 - 1)
  }
  const actualizar = (tiempo) => {
    programa.uniforms.uTime.value = tiempo * 0.001 * props.speed
    if (props.moveParticlesOnHover) {
      malla.position.x = -raton.x * props.particleHoverFactor
      malla.position.y = -raton.y * props.particleHoverFactor
    }
    if (!props.disableRotation) {
      malla.rotation.x = Math.sin(tiempo * 0.0002) * 0.1
      malla.rotation.y = Math.cos(tiempo * 0.0005) * 0.15
      malla.rotation.z += 0.01 * props.speed
    }
    renderer.render({ scene: malla, camera: camara })
    idAnimacion = requestAnimationFrame(actualizar)
  }

  controladorSalida = () => {
    cancelAnimationFrame(idAnimacion)
    window.removeEventListener('resize', redimensionar)
    if (props.moveParticlesOnHover) contenedor.value.removeEventListener('mousemove', moverRaton)
    if (gl.canvas.parentNode === contenedor.value) contenedor.value.removeChild(gl.canvas)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
  window.addEventListener('resize', redimensionar)
  if (props.moveParticlesOnHover) contenedor.value.addEventListener('mousemove', moverRaton)
  redimensionar()
  idAnimacion = requestAnimationFrame(actualizar)
})

onBeforeUnmount(() => controladorSalida?.())
</script>

<template>
  <div ref="contenedor" class="particles-container" aria-hidden="true" />
</template>
