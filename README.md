# prueba-threejs

Este proyecto es una plantilla base para comenzar a desarrollar con **Vue 3** utilizando **Vite**, e integrando **Three.js** para gráficos 3D en el navegador.

## Instrucciones para ejecutar el proyecto

1. **Instalar dependencias**

   Ejecuta el siguiente comando en la raíz del proyecto:

   ```bash
   npm install
   ```

2. **Compilar y recargar en caliente para desarrollo**

   ```bash
   npm run dev
   ```

   Esto abrirá una instancia local del proyecto en modo desarrollo con recarga automática.

3. **Compilar y minificar para producción**

   ```bash
   npm run build
   ```

   Este comando genera una versión optimizada del proyecto lista para desplegar en producción.

## ¿Cómo se comunican Vue y Three.js?

En este proyecto, Vue se encarga de la estructura de la interfaz de usuario y el control del estado de la aplicación, mientras que Three.js maneja la renderización de gráficos 3D dentro de un `<canvas>`.

La integración se realiza generalmente de la siguiente forma:

* Se crea un componente de Vue (`<Experience />`) que contiene un contenedor `div` y el componente `<HUD />` con el que podremos modificar los valores de cada uno de los 3D objetos.
* Dentro del ciclo de vida del componente (`onMounted()`), se inicializa la escena de Three.js, incluyendo la cámara, la luz, los objetos y el renderer.
* Vue puede controlar parámetros de la escena de Three.js mediante `ref`s y `reactive` (reactividad), lo que permite que los cambios en la UI (por ejemplo, sliders o botones) afecten directamente a la escena 3D.
* La animación se gestiona con un bucle de renderizado (`requestAnimationFrame`) desde Three.js.

De esta manera, Vue y Three.js trabajan en conjunto: Vue como capa de control y Three.js como motor visual.