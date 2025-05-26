// threejs/Ground.js
import * as THREE from 'three'

export class Ground {
  constructor(scene) {
    const geometry = new THREE.PlaneGeometry(20, 20)
    const material = new THREE.MeshStandardMaterial({ color: 0xa6a6a6, side: THREE.DoubleSide })
    const ground = new THREE.Mesh(geometry, material)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)
  }
}
