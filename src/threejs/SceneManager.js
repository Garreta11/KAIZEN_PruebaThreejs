// threejs/SceneManager.js
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Ground } from './Ground'
import { Cube } from './Cube'
import { Sphere } from './Sphere'
import { Torus } from './Torus'
import { Lights } from './Lights'

export class SceneManager {
  constructor(container) {
    this.container = container
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xf0f0f0)

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    this.camera.position.set(3, 3, 5)

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true
    container.appendChild(this.renderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.enablePan = false
    this.controls.minPolarAngle = Math.PI / 4     // 45 degrees
    this.controls.maxPolarAngle = Math.PI / 2.1    // 90 degrees

    // Add objects
    new Lights(this.scene)
    new Ground(this.scene)
    this.cube = new Cube(this.scene)
    this.sphere = new Sphere(this.scene)
    this.torus = new Torus(this.scene)

    // Raycasting
    this.raycaster = new THREE.Raycaster()
    this.pointer = new THREE.Vector2()

    container.addEventListener('click', this.onClick.bind(this))
    window.addEventListener('resize', this.onWindowResize.bind(this))

    this.animate()
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  onClick(event) {
    const rect = this.renderer.domElement.getBoundingClientRect()
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  
    this.raycaster.setFromCamera(this.pointer, this.camera)
  
    const allMeshes = [this.cube.mesh, this.sphere.mesh, this.torus.mesh]
    const intersects = this.raycaster.intersectObjects(allMeshes, true)
  
    if (intersects.length > 0) {
      const object = intersects[0].object
      if (object === this.cube.mesh) this.cube.jump()
      else if (object === this.sphere.mesh) this.sphere.jump()
      else if (object === this.torus.mesh) this.torus.jump()
    }
  }
  

  animate() {
    requestAnimationFrame(this.animate.bind(this))

    this.cube.update()
    this.sphere.update()
    this.torus.update()
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }
}
