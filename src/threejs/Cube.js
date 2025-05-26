// Importamos la librería Three.js
import * as THREE from 'three'

// Clase que representa un cubo en la escena
export class Cube {
  constructor(scene) {
    // Variables para manejar el salto del cubo
    this.isJumping = false       // Indica si el cubo está saltando
    this.jumpSpeed = 0           // Velocidad actual del salto
    this.gravity = -0.01         // Gravedad que afecta al salto
    this.groundY = 0.5           // Altura del suelo (para detener el salto al caer)

    // Creamos la geometría del cubo (1x1x1)
    const geometry = new THREE.BoxGeometry(1, 1, 1)

    // Cargamos las texturas (color y normal map)
    const loader = new THREE.TextureLoader()
    const colorMap = loader.load('/textures/brick/brick_diff.jpg')    // Textura de color
    const normalMap = loader.load('/textures/brick/brick_normal.jpg') // Mapa de normales

    // Creamos el material con la textura y propiedades físicas
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,       // Color base blanco
      map: colorMap,         // Textura de color
      normalMap: normalMap,  // Mapa de normales para detalles de superficie
      roughness: 0.5,        // Rugosidad (afecta a la reflexión)
      metalness: 0.5         // Metalicidad (apariencia metálica)
    })

    // Creamos la malla (geometría + material)
    this.mesh = new THREE.Mesh(geometry, this.material)

    // Posicionamos el cubo en la escena
    this.mesh.position.set(-3, 0.5, 0) // X: -3, Y: 0.5, Z: 0
    this.mesh.castShadow = true       // El cubo proyecta sombras

    // Añadimos el cubo a la escena
    scene.add(this.mesh)
  }

  // Método que se ejecuta en cada frame para actualizar el cubo
  update() {
    // Rotación del cubo en el eje Y (si tiene velocidad definida)
    this.mesh.rotation.y += this.rotationSpeed || 0.01

    // Lógica de salto
    if (this.isJumping) {
      this.mesh.position.y += this.jumpSpeed    // Movimiento hacia arriba o abajo
      this.jumpSpeed += this.gravity            // Aplicamos gravedad

      // Si el cubo llega al suelo, detenemos el salto
      if (this.mesh.position.y <= this.groundY) {
        this.mesh.position.y = this.groundY     // Lo colocamos justo en el suelo
        this.isJumping = false                  // Ya no está saltando
        this.jumpSpeed = 0                      // Reiniciamos velocidad
      }
    }
  }

  // Cambia el color del cubo
  setColor(color) {
    this.material.color.set(color)
  }

  // Hace que el cubo salte (si no está ya saltando)
  jump() {
    if (!this.isJumping) {
      this.isJumping = true
      this.jumpSpeed = 0.15 // Velocidad inicial hacia arriba
    }
  }

  // Cambia la velocidad de rotación del cubo
  setSpeed(speed) {
    this.rotationSpeed = speed
  }
}
