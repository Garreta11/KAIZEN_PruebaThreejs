// threejs/Cube.js
import * as THREE from 'three'

export class Cube {
  constructor(scene) {

    this.isJumping = false
    this.jumpSpeed = 0
    this.gravity = -0.01
    this.groundY = 0.5

    const geometry = new THREE.BoxGeometry(1, 1, 1)

    const loader = new THREE.TextureLoader()
    const colorMap = loader.load('/textures/brick/brick_diff.jpg')
    const normalMap = loader.load('/textures/brick/brick_normal.jpg')

    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: colorMap,
      normalMap: normalMap,
      roughness: 0.5,
      metalness: 0.5
    })
    this.mesh = new THREE.Mesh(geometry, this.material)
    this.mesh.position.set(-3, 0.5, 0)
    this.mesh.castShadow = true
    scene.add(this.mesh)
  }

  update() {
    this.mesh.rotation.y += this.rotationSpeed || 0.01

    if (this.isJumping) {
      this.mesh.position.y += this.jumpSpeed
      this.jumpSpeed += this.gravity

      if (this.mesh.position.y <= this.groundY) {
        this.mesh.position.y = this.groundY
        this.isJumping = false
        this.jumpSpeed = 0
      }
    }
  }

  setColor(color) {
    this.material.color.set(color)
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true
      this.jumpSpeed = 0.15 // initial upward velocity
    }
  }

  setSpeed(speed) {
    this.rotationSpeed = speed
  }
}
