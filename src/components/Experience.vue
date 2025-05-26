<template>
  <div class="experience-container" ref="sceneContainer">
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
import { ref, onMounted, watch } from 'vue'
import { SceneManager } from '../threejs/SceneManager'
import HUD from '../components/HUD.vue'

const sceneContainer = ref(null)
const sceneManager = ref(null)

const cubeColor = ref('#ffffff')
const sphereColor = ref('#ffffff')
const torusColor = ref('#ffffff')

const cubeSpeed = ref(0.01)
const sphereSpeed = ref(0.01)
const torusSpeed = ref(0.01)

onMounted(() => {
  sceneManager.value = new SceneManager(sceneContainer.value)

  sceneManager.value?.cube.setColor(cubeColor.value)
  sceneManager.value?.sphere.setColor(sphereColor.value)
  sceneManager.value?.torus.setColor(torusColor.value)
})

watch(cubeColor, (color) => sceneManager.value?.cube.setColor(color))
watch(sphereColor, (color) => sceneManager.value?.sphere.setColor(color))
watch(torusColor, (color) => sceneManager.value?.torus.setColor(color))

watch(cubeSpeed, (speed) => sceneManager.value?.cube.setSpeed(speed))
watch(sphereSpeed, (speed) => sceneManager.value?.sphere.setSpeed(speed))
watch(torusSpeed, (speed) => sceneManager.value?.torus.setSpeed(speed))
</script>

<style scoped>
.experience-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>
