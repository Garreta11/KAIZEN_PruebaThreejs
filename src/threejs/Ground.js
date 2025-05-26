// Importamos Three.js
import * as THREE from 'three'

// Clase que representa el suelo de la escena
export class Ground {
  constructor(scene) {
    // Creamos la geometría del plano (20x20 unidades)
    const geometry = new THREE.PlaneGeometry(20, 20)

    // Creamos un material estándar con color gris claro y `DoubleSide` para que el plano sea visible desde ambos lados
    const material = new THREE.MeshStandardMaterial({ 
      color: 0xa6a6a6, 
      side: THREE.DoubleSide 
    })

    // Combinamos la geometría y el material en un mesh
    const ground = new THREE.Mesh(geometry, material)

    // Rotamos el plano para que esté horizontal (por defecto está vertical)
    ground.rotation.x = -Math.PI / 2

    // Habilitamos que reciba sombras
    ground.receiveShadow = true

    // Añadimos el plano a la escena
    scene.add(ground)
  }
}
