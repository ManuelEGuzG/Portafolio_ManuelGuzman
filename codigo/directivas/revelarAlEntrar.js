/**
 * revelarAlEntrar.js
 * -----------------------------------------------------------------------
 * Directiva personalizada de Vue: v-revelar
 *
 * ¿Qué hace?
 *   Anima un elemento (fade + desplazamiento hacia arriba) la primera vez
 *   que entra en el área visible de la pantalla (viewport) al hacer scroll.
 *
 * ¿Cómo funciona por dentro?
 *   1. Al montar el elemento, le agrega la clase CSS 'reveal' (definida en
 *      recursos/estilos.css), que lo deja invisible y desplazado.
 *   2. Crea un IntersectionObserver, que es una API nativa del navegador
 *      para saber cuándo un elemento se vuelve visible en pantalla.
 *   3. Cuando el elemento se hace visible, le agrega la clase 'reveal-visible',
 *      que dispara la transición CSS hacia su estado final (visible, en su lugar).
 *   4. Deja de observar el elemento (solo se anima una vez).
 *
 * Cómo usarla en una plantilla .vue:
 *   <div v-revelar>Aparece con animación</div>
 *
 *   <!-- Con retraso manual, útil para animar listas en cascada ("stagger") -->
 *   <div v-for="(item, i) in lista" v-revelar="{ delay: i * 100 }">
 *     {{ item }}
 *   </div>
 * -----------------------------------------------------------------------
 */
export const revelarAlEntrar = {
  mounted(elemento, binding) {
    elemento.classList.add('reveal')

    const mostrarElemento = () => {
      elemento.classList.add('reveal-visible')
    }

    // binding.value es el objeto que le pasas a la directiva, ej: { delay: 100 }
    const retraso = binding.value?.delay ?? 0
    if (retraso) {
      elemento.style.transitionDelay = `${retraso}ms`
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            mostrarElemento()
            // Ya se animó, dejamos de observarlo para no gastar recursos.
            observador.unobserve(elemento)
          }
        })
      },
      {
        threshold: 0.15, // se dispara cuando el 15% del elemento es visible
        rootMargin: '0px 0px -40px 0px' // dispara un poco antes de llegar al borde inferior
      }
    )

    observador.observe(elemento)

    // Durante una transición entre rutas el observer puede perder la primera
    // intersección; revela de inmediato los elementos que ya están visibles.
    requestAnimationFrame(() => {
      const rectangulo = elemento.getBoundingClientRect()
      const estaVisible = rectangulo.top < window.innerHeight && rectangulo.bottom > 0
      if (estaVisible) {
        mostrarElemento()
        observador.unobserve(elemento)
      }
    })

    // Guardamos la referencia al observador en el propio elemento del DOM
    // para poder desconectarlo si el componente se destruye (ver abajo).
    elemento._observadorRevelar = observador
  },

  // Se ejecuta cuando Vue elimina el elemento del DOM (ej. al cambiar de filtro).
  // Es buena práctica limpiar el observer para evitar fugas de memoria.
  unmounted(elemento) {
    elemento._observadorRevelar?.disconnect()
  }
}
