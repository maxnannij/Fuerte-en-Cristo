# Fuerte En Cristo — Rutinas de Fe y Movilidad

Una aplicación web interactiva diseñada con amor pastoral para guiar a los hermanos de la iglesia en su camino de fortalecimiento físico, mental y espiritual. El sistema ofrece rutas de entrenamiento de diferente intensidad (Suave, Rodillas, Fuerza, Legendario) integrando reflexiones de fe, cronómetros interactivos con voz, y un sistema seguro de acceso personalizado por Apellido.

Este repositorio está adaptado para ser publicado directamente en **GitHub**, **Vercel**, **Netlify** o cualquier servidor de hosting.

---

## 🚀 Características Principales

- **Rutas de Gracia**: Cuatro rutas de ejercicios optimizadas y completamente offline (Suave, Rodillas, Fuerza, Legendario).
- **Enfoque Espiritual**: Cada día de la semana ofrece una cita o reflexión bíblica para nutrir el espíritu mientras se fortalece el cuerpo como templo del Espíritu Santo.
- **Entrenador Guiado por Voz interactivo**: Jugador de ejercicios integrado con cronómetros, alarmas auditivas y guías paso a paso para evitar confusiones.
- **Acceso Directo Simple por Apellido y Clave**: No requiere que los hermanos memoricen correos largos. Solo ingresan su **Apellido paterno** y una contraseña provista por el instructor.

---

## 🛠️ Instrucciones de Desarrollo Local

Si deseas probar la aplicación localmente en tu computadora:

1. **Clonar el repositorio**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_DIRECTORIO>
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   La aplicación se abrirá en `http://localhost:3000` (o el puerto configurado por Vite).

4. **Compilar para producción**:
   ```bash
   npm run build
   ```

---

## 🔐 Configuración de Firebase y Gestión de Usuarios

La aplicación utiliza **Firebase Authentication** bajo una ingeniosa fórmula que permite a los usuarios ingresar usando únicamente su **Apellido** y su **Contraseña**.

### 1. ¿Cómo registrar a los hermanos en Firebase? (Procedimiento Manual)

Dado que las cuentas se registran manualmente una vez que cada usuario abona, debes ingresar a tu consola web de Firebase y seguir estos pasos:

1. Visita la **Consola de Firebase** y entra a tu proyecto.
2. Dirígete a la sección **Authentication** en la barra lateral.
3. Ve a la pestaña **Users (Usuarios)** y haz clic en **Add User (Añadir usuario)**.
4. En el campo de correo electrónico, escribe el apellido del hermano convertido según la **Fórmula de Normalización** (ver abajo) seguido de `@fiel.com`.
5. Define la contraseña que el hermano usará y haz clic en guardar.

### 📝 Ejemplo Práctico y Fórmula de Normalización
El sistema convierte automáticamente el apellido escrito por el hermano para validarlo con Firebase eliminando mayúsculas, espacios y acentos. 

**Reglas de conversión:**
- **Pérez** $\rightarrow$ se registra en la consola como `perez@fiel.com`
- **Díaz** $\rightarrow$ se registra en la consola como `diaz@fiel.com`
- **Gómez** $\rightarrow$ se registra en la consola como `gomez@fiel.com`
- **San Martín** $\rightarrow$ se registra en la consola como `sanmartin@fiel.com`

**Para ingresar en la App:**
El hermano introduce simplemente `Pérez` (o `perez`) en el primer campo, y su clave secreta en el segundo. ¡La aplicación resolverá el correo `@fiel.com` en background de inmediato!

---

## 🌐 Despliegue en la Nube (GitHub Pages / Vercel / Netlify)

Cuando subas el código a GitHub y desees publicarlo de forma independiente en tu propio dominio o servidores externos, puedes configurar las credenciales de Firebase de forma segura para tu producción.

Simplemente agrega las siguientes **Variables de Entorno** (Environment Variables) en la configuración de tu plataforma de despliegue:

```env
VITE_FIREBASE_API_KEY="tu-api-key-de-produccion"
VITE_FIREBASE_AUTH_DOMAIN="tu-auth-domain"
VITE_FIREBASE_PROJECT_ID="tu-project-id"
VITE_FIREBASE_STORAGE_BUCKET="tu-storage-bucket"
VITE_FIREBASE_MESSAGING_SENDER_ID="tu-sender-id"
VITE_FIREBASE_APP_ID="tu-app-id"
```

*Nota: Si la aplicación no detecta estas variables de entorno en sistemas externos, buscará de forma predeterminada el archivo local `firebase-applet-config.json`.*

---

## 📂 Estructura del Código

- `/src/firebase.ts`: Contiene la lógica de inicialización híbrida Firebase y la función `normalizeLastNameToEmail` que realiza la conversión de apellidos.
- `/src/App.tsx`: Contiene las interfaces visuales, pantallas de login con diseño pastoral, selector de rutas semanales e interactivos cronómetros.
- `/src/routines.ts`: Almacena la rica base de datos offline de ejercicios segmentados por día y ruta para un rendimiento 100% inmediato y disponible sin llamadas adicionales de base de datos.
- `/src/types.ts`: Definición rigurosa de las firmas de tipos TypeScript.
