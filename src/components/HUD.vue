<template>
  <div class="hud-container">
    <div class="hud-icon" @click="toggleHUD" :class="{ hidden: hudVisible }">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
        <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z"></path>
    </svg>
    </div>
    <div class="hud" :class="{ hidden: !hudVisible }">
      <div class="hud-icon-close" @click="toggleHUD">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
          <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
        </svg>
      </div>
      <!-- Cube -->
      <div class="element">
        <h3>CUBE</h3>
        <div class="control">
          <label>Color</label>
          <input type="color" v-model="localCubeColor" />
        </div>
        <div class="control">
          <label>Rotation Speed</label>
          <input type="range" min="0" max="0.1" step="0.001" v-model.number="localCubeSpeed" />
        </div>
      </div>

      <!-- Sphere -->
      <div class="element">
        <h3>SPHERE</h3>
        <div class="control">
          <label>Color</label>
          <input type="color" v-model="localSphereColor" />
        </div>
        <div class="control">
          <label>Rotation Speed</label>
          <input type="range" min="0" max="0.1" step="0.001" v-model.number="localSphereSpeed" />
        </div>
      </div>

      <!-- Torus -->
      <div class="element">
          <h3>TORUS</h3>
        <div class="control">
          <label>Color</label>
          <input type="color" v-model="localTorusColor" />
        </div>
        <div class="control">
          <label>Rotation Speed</label>
          <input type="range" min="0" max="0.1" step="0.001" v-model.number="localTorusSpeed" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  cubeColor: String,
  sphereColor: String,
  torusColor: String,
  cubeSpeed: Number,
  sphereSpeed: Number,
  torusSpeed: Number
})

const emit = defineEmits([
  'update:cubeColor',
  'update:sphereColor',
  'update:torusColor',
  'update:cubeSpeed',
  'update:sphereSpeed',
  'update:torusSpeed'
])

const localCubeColor = ref(props.cubeColor)
const localSphereColor = ref(props.sphereColor)
const localTorusColor = ref(props.torusColor)

const localCubeSpeed = ref(props.cubeSpeed ?? 0.01)
const localSphereSpeed = ref(props.sphereSpeed ?? 0.01)
const localTorusSpeed = ref(props.torusSpeed ?? 0.01)

// Emit color updates
watch(localCubeColor, (val) => emit('update:cubeColor', val))
watch(localSphereColor, (val) => emit('update:sphereColor', val))
watch(localTorusColor, (val) => emit('update:torusColor', val))

// Emit speed updates
watch(localCubeSpeed, (val) => emit('update:cubeSpeed', val))
watch(localSphereSpeed, (val) => emit('update:sphereSpeed', val))
watch(localTorusSpeed, (val) => emit('update:torusSpeed', val))

const hudVisible = ref(false)

const toggleHUD = () => {
  hudVisible.value = !hudVisible.value
}

</script>

<style scoped>

.hud {
  position: fixed;
  width: fit-content;

  top: 50%;
  left: 10px;
  
  background: rgba(255, 255, 255, 0.9);
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  font-family: sans-serif;
  color: #000;

  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: translateY(-50%) translateX(0);
  opacity: 1;

  &.hidden {
    transform: translateY(-50%) translateX(-120%);
    opacity: 0;
    pointer-events: none;

  }
}
.hud-icon {
  position: fixed;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);


  width: fit-content;
  cursor: pointer;
  opacity: 1;

  transition: opacity 0.3s ease;

  &.hidden {
    opacity: 0;
  }
}
.hud-icon-close {
  display: flex;
  justify-content: flex-end;
  svg {
    cursor: pointer;
    width: 30px;
    height: 30px;
  }
}
.control {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.control label {
  margin-bottom: 4px;
  font-size: 13px;
}
input[type='range'] {
  width: 150px;
}
.element {
  margin-bottom: 30px;
  border-bottom: 1px solid #000;
  padding-left: 15px;
  padding-right: 15px;
  &:last-child {
    border-bottom: none;
  }
  h3 {
    margin-top: 0;
    margin-bottom: 10px;
  }
}
</style>
