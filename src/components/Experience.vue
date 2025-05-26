<template>
  <!-- Contenedor principal de la experiencia 3D, referenciado con ref="sceneContainer" -->
  <div class="experience-container" ref="sceneContainer">
    <!-- Componente HUD que permite al usuario modificar colores y velocidades de los objetos -->
    <HUD
      :cubeColor="cubeColor"
      :sphereColor="sphereColor"
      :torusColor="torusColor"
      :cubeSpeed="cubeSpeed"
      :sphereSpeed="sphereSpeed"
      :torusSpeed="torusSpeed"
      @update:cubeColor="cubeColor = $event"
      @update:sphereColor="sphereColor = $event"
      @update:torusColor="torusColor = $event"
      @update:cubeSpeed="cubeSpeed = $event"
      @update:sphereSpeed="sphereSpeed = $event"
      @update:torusSpeed="torusSpeed = $event"
    />
  </div>
</template>

<script setup>
// Importación de funciones reactivas y del ciclo de vida de Vue
import { ref, onMounted, watch } from 'vue'
// Importación del gestor de la escena 3D
import { SceneManager } from '../threejs/SceneManager'
// Importación del componente HUD (interfaz gráfica para el usuario)
import HUD from '../components/HUD.vue'

// Referencia al contenedor HTML donde se renderizará la escena
const sceneContainer = ref(null)
// Referencia al objeto SceneManager que manejará la escena 3D
const sceneManager = ref(null)

// Colores reactivos para las figuras
const cubeColor = ref('#ffffff')
const sphereColor = ref('#ffffff')
const torusColor = ref('#ffffff')

// Velocidades reactivas de rotación para cada figura
const cubeSpeed = ref(0.01)
const sphereSpeed = ref(0.01)
const torusSpeed = ref(0.01)

// Cuando el componente se monta...
onMounted(() => {
  // Se crea una nueva instancia del SceneManager, pasando el contenedor de la escena
  sceneManager.value = new SceneManager(sceneContainer.value)

  // Se aplican los colores iniciales a los objetos
  sceneManager.value?.cube.setColor(cubeColor.value)
  sceneManager.value?.sphere.setColor(sphereColor.value)
  sceneManager.value?.torus.setColor(torusColor.value)
})

// Se observa cualquier cambio en los colores y se actualizan en la escena 3D
watch(cubeColor, (color) => sceneManager.value?.cube.setColor(color))
watch(sphereColor, (color) => sceneManager.value?.sphere.setColor(color))
watch(torusColor, (color) => sceneManager.value?.torus.setColor(color))

// Se observa cualquier cambio en las velocidades y se actualizan en la escena 3D
watch(cubeSpeed, (speed) => sceneManager.value?.cube.setSpeed(speed))
watch(sphereSpeed, (speed) => sceneManager.value?.sphere.setSpeed(speed))
watch(torusSpeed, (speed) => sceneManager.value?.torus.setSpeed(speed))
</script>

<style scoped>
/* Estilos del contenedor principal: ocupa toda la pantalla y es relativo */
.experience-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>
