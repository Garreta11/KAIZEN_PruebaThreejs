// threejs/Torus.js
import * as THREE from 'three'

export class Torus {
  constructor(scene) {

    this.isJumping = false
    this.jumpSpeed = 0
    this.gravity = -0.01
    this.groundY = 0.5

    const geometry = new THREE.TorusGeometry(0.4, 0.15, 16, 100)

    const loader = new THREE.TextureLoader()
    const colorMap = loader.load('/textures/fabric/fabric_diff.jpg')
    const roughMap = loader.load('/textures/fabric/fabric_rough.jpg')
    const normalMap = loader.load('/textures/fabric/fabric_normal.jpg')

    this.material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      map: colorMap,
      roughnessMap: roughMap,
      normalMap: normalMap,
      roughness: 0.4,
      metalness: 0.4
    })
    this.mesh = new THREE.Mesh(geometry, this.material)
    this.mesh.position.set(3, 0.5, 0)
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
