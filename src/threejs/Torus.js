// Importamos la librería Three.js
import * as THREE from 'three'

// Clase que representa un toro (donut) en la escena
export class Torus {
  constructor(scene) {
    // Variables para controlar el salto del toro
    this.isJumping = false       // Indica si está saltando
    this.jumpSpeed = 0           // Velocidad vertical del salto
    this.gravity = -0.01         // Gravedad que afecta el salto
    this.groundY = 0.5           // Altura del suelo para detener el salto

    // Creamos la geometría del toro:
    // Radio principal 0.4, radio del tubo 0.15, segmentos tubulares 16, segmentos radiales 100
    const geometry = new THREE.TorusGeometry(0.4, 0.15, 16, 100)

    // Cargamos las texturas para el toro (color, rugosidad y normales)
    const loader = new THREE.TextureLoader()
    const colorMap = loader.load('/textures/fabric/fabric_diff.jpg')    // Textura de color (tela)
    const roughMap = loader.load('/textures/fabric/fabric_rough.jpg')   // Mapa de rugosidad
    const normalMap = loader.load('/textures/fabric/fabric_normal.jpg') // Mapa de normales

    // Creamos el material físico para el toro con las texturas y propiedades
    this.material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,          // Color base blanco
      map: colorMap,            // Textura color
      roughnessMap: roughMap,   // Textura de rugosidad
      normalMap: normalMap,     // Textura de normales para detalles
      roughness: 0.4,           // Nivel de rugosidad
      metalness: 0.4            // Nivel de metalicidad
    })

    // Creamos la malla con la geometría y material
    this.mesh = new THREE.Mesh(geometry, this.material)

    // Posicionamos el toro en la escena (x=3 para separar de otros objetos, y=0.5 para estar sobre el suelo)
    this.mesh.position.set(3, 0.5, 0)
    this.mesh.castShadow = true  // El toro proyecta sombra

    // Añadimos el toro a la escena
    scene.add(this.mesh)
  }

  // Método para actualizar la animación en cada frame
  update() {
    // Rotamos el toro sobre el eje Y con una velocidad (por defecto 0.01)
    this.mesh.rotation.y += this.rotationSpeed || 0.01

    // Si está saltando, actualizamos la posición y velocidad vertical
    if (this.isJumping) {
      this.mesh.position.y += this.jumpSpeed  // Movimiento vertical
      this.jumpSpeed += this.gravity           // Aplicamos gravedad

      // Si llega al suelo, detenemos el salto y reajustamos la posición
      if (this.mesh.position.y <= this.groundY) {
        this.mesh.position.y = this.groundY
        this.isJumping = false
        this.jumpSpeed = 0
      }
    }
  }

  // Cambia el color base del material del toro
  setColor(color) {
    this.material.color.set(color)
  }

  // Inicia el salto si no está ya saltando
  jump() {
    if (!this.isJumping) {
      this.isJumping = true
      this.jumpSpeed = 0.15 // velocidad inicial hacia arriba
    }
  }

  // Establece la velocidad de rotación del toro
  setSpeed(speed) {
    this.rotationSpeed = speed
  }
}
