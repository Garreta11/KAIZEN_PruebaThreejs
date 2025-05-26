// Importamos la librería Three.js
import * as THREE from 'three'

// Clase que gestiona la iluminación de la escena
export class Lights {
  constructor(scene) {
    // Luz ambiental: ilumina todos los objetos de forma uniforme
    // Color blanco (0xffffff), intensidad 0.5
    const ambient = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambient) // Añadimos la luz ambiental a la escena

    // Luz direccional: simula una fuente de luz lejana como el sol
    const dirLight = new THREE.DirectionalLight(0xffffff, 1) // Color blanco, intensidad 1
    dirLight.position.set(5, 10, 7.5) // Posición de la luz en el espacio 3D

    // Habilitamos que esta luz proyecte sombras
    dirLight.castShadow = true

    // Configuramos la resolución del mapa de sombras para mayor calidad
    dirLight.shadow.mapSize.set(1024, 1024)

    // Añadimos la luz direccional a la escena
    scene.add(dirLight)
  }
}
