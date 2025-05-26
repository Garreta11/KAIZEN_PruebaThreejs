// Importamos la librería Three.js
import * as THREE from 'three'

// Clase que representa una esfera en la escena
export class Sphere {
  constructor(scene) {
    // Variables para controlar el salto de la esfera
    this.isJumping = false       // Indica si la esfera está saltando
    this.jumpSpeed = 0           // Velocidad vertical del salto
    this.gravity = -0.01         // Gravedad que afecta el salto
    this.groundY = 0.5           // Altura del suelo para detener el salto

    // Creamos la geometría de la esfera
    // Radio 0.5, con 32 segmentos horizontales y verticales para suavidad
    const geometry = new THREE.SphereGeometry(0.5, 32, 32)

    // Cargamos las texturas para la esfera (color, rugosidad y normales)
    const loader = new THREE.TextureLoader()
    const colorMap = loader.load('/textures/grass/grass_diff.jpg')    // Textura de color (hierba)
    const roughMap = loader.load('/textures/grass/grass_rough.jpg')   // Mapa de rugosidad
    const normalMap = loader.load('/textures/grass/grass_normal.jpg') // Mapa de normales

    // Creamos el material estándar usando las texturas y propiedades físicas
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,          // Color base blanco
      map: colorMap,            // Textura color
      roughnessMap: roughMap,   // Textura de rugosidad (variación de la reflexión)
      normalMap: normalMap,     // Textura para simular detalles en la superficie
      roughness: 0.4,           // Nivel general de rugosidad
      metalness: 0.4            // Nivel de metalicidad
    })

    // Creamos la malla con la geometría y el material
    this.mesh = new THREE.Mesh(geometry, this.material)

    // Posicionamos la esfera en la escena (centro en X y Z, a 0.5 en Y para estar sobre el suelo)
    this.mesh.position.set(0, 0.5, 0)
    this.mesh.castShadow = true  // La esfera proyecta sombras

    // Añadimos la esfera a la escena
    scene.add(this.mesh)
  }

  // Método llamado en cada frame para actualizar la esfera
  update() {
    // Rotamos la esfera sobre el eje Y con una velocidad (default 0.01)
    this.mesh.rotation.y += this.rotationSpeed || 0.01

    // Si la esfera está saltando, actualizamos su posición y velocidad vertical
    if (this.isJumping) {
      this.mesh.position.y += this.jumpSpeed   // Movimiento vertical
      this.jumpSpeed += this.gravity            // Aplicamos gravedad

      // Si la esfera toca el suelo, detenemos el salto
      if (this.mesh.position.y <= this.groundY) {
        this.mesh.position.y = this.groundY    // Ajustamos a la altura del suelo
        this.isJumping = false                  // Fin del salto
        this.jumpSpeed = 0                      // Reseteamos la velocidad
      }
    }
  }

  // Cambia el color base del material de la esfera
  setColor(color) {
    this.material.color.set(color)
  }

  // Inicia el salto si no está saltando ya
  jump() {
    if (!this.isJumping) {
      this.isJumping = true
      this.jumpSpeed = 0.15 // Velocidad inicial hacia arriba
    }
  }

  // Establece la velocidad de rotación de la esfera
  setSpeed(speed) {
    this.rotationSpeed = speed
  }
}
