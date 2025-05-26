// Importación de módulos de Three.js y clases personalizadas
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Ground } from './Ground'
import { Cube } from './Cube'
import { Sphere } from './Sphere'
import { Torus } from './Torus'
import { Lights } from './Lights'

// Clase principal que administra la escena 3D
export class SceneManager {
  constructor(container) {
    // Guardamos el contenedor HTML donde se renderizará la escena
    this.container = container

    // Creamos una nueva escena de Three.js con un color de fondo claro
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xf0f0f0)

    // Configuración de la cámara en perspectiva
    this.camera = new THREE.PerspectiveCamera(
      75, // ángulo de visión
      window.innerWidth / window.innerHeight, // relación de aspecto
      0.1, // distancia mínima de renderizado
      100  // distancia máxima de renderizado
    )
    this.camera.position.set(3, 3, 5) // Posición inicial de la cámara

    // Configuración del renderizador WebGL
    this.renderer = new THREE.WebGLRenderer({ antialias: true }) // suavizado de bordes
    this.renderer.setSize(window.innerWidth, window.innerHeight) // tamaño del canvas
    this.renderer.shadowMap.enabled = true // habilita las sombras
    container.appendChild(this.renderer.domElement) // añadimos el canvas al DOM

    // Controles de órbita para mover la cámara con el mouse
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true // suaviza el movimiento de la cámara
    this.controls.enablePan = false // desactiva el paneo
    this.controls.minPolarAngle = Math.PI / 4 // límite inferior del ángulo vertical
    this.controls.maxPolarAngle = Math.PI / 2.1 // límite superior del ángulo vertical

    // Agregamos los elementos a la escena
    new Lights(this.scene) // luces
    new Ground(this.scene) // suelo
    this.cube = new Cube(this.scene) // cubo
    this.sphere = new Sphere(this.scene) // esfera
    this.torus = new Torus(this.scene) // toroide

    // Configuración de raycasting (para detectar clics sobre objetos)
    this.raycaster = new THREE.Raycaster()
    this.pointer = new THREE.Vector2() // coordenadas normalizadas del mouse

    // Escuchamos eventos de clic y de redimensionamiento
    container.addEventListener('click', this.onClick.bind(this))
    window.addEventListener('resize', this.onWindowResize.bind(this))

    // Iniciamos el ciclo de animación
    this.animate()
  }

  // Método que se ejecuta al redimensionar la ventana
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  // Método que se ejecuta al hacer clic en la escena
  onClick(event) {
    // Convertimos la posición del clic del mouse a coordenadas normalizadas
    const rect = this.renderer.domElement.getBoundingClientRect()
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    // Actualizamos el rayo a partir de la cámara y la posición del mouse
    this.raycaster.setFromCamera(this.pointer, this.camera)

    // Revisamos si alguno de los objetos fue clicado
    const allMeshes = [this.cube.mesh, this.sphere.mesh, this.torus.mesh]
    const intersects = this.raycaster.intersectObjects(allMeshes, true)

    // Si hay intersección, ejecutamos la función `jump` del objeto correspondiente
    if (intersects.length > 0) {
      const object = intersects[0].object
      if (object === this.cube.mesh) this.cube.jump()
      else if (object === this.sphere.mesh) this.sphere.jump()
      else if (object === this.torus.mesh) this.torus.jump()
    }
  }

  // Función que actualiza y renderiza la escena en cada frame
  animate() {
    requestAnimationFrame(this.animate.bind(this)) // bucle de animación

    // Actualizamos cada figura
    this.cube.update()
    this.sphere.update()
    this.torus.update()

    // Actualizamos los controles (por ejemplo, la cámara si hay damping)
    this.controls.update()

    // Renderizamos la escena
    this.renderer.render(this.scene, this.camera)
  }
}
