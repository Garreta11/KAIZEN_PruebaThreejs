<template>
  <!-- Pie de página fijo en la parte inferior -->
  <div class="footer">
    <p>Jordi Garreta i Duarte</p>       <!-- Nombre -->
    <p>jordigarreta11@gmail.com</p>    <!-- Email -->
  </div>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 100;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  font-size: 20px;
  font-weight: 600;
  mix-blend-mode: difference;
}
</style>
