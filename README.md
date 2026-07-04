# 🎭 Teatro Director - Simulador Interactivo

Un simulador de director de teatro completamente interactivo donde puedes crear obras, contratar actores y gestionar auditorios. ¡Conquista el escenario y sube de nivel!

## 🎮 Características

✨ **Creación de obras**: Define el género, responde preguntas y crea descripciones personalizadas

🎭 **Contratación de actores**: Elige entre 7 actores diferentes con distintos niveles de popularidad y precios

🏛️ **Selección de auditorios**: 4 teatros diferentes con distintas capacidades y prestigio

📊 **Sistema de resultados**: Calcula automáticamente la calidad de tu obra basándose en:
- Calidad de ensayos (días y horas dedicadas)
- Popularidad del elenco
- Prestigio del auditorio

💰 **Sistema de economía**: Gestiona tu dinero, invierte en actores y auditorios

🎚️ **Progresión**: Sube de nivel, gana XP y desbloquea nuevos títulos

💾 **Guardado automático**: Los datos se guardan en el navegador (localStorage)

## 🚀 Tecnologías

- **React 18** - Framework de UI
- **CSS3** - Estilos modernos con variables CSS
- **LocalStorage** - Guardado de datos del navegador
- **Responsive Design** - Funciona en móvil, tablet y desktop

## 📥 Instalación Local

### Requisitos previos
- **Node.js** (v14 o superior) - Descarga desde https://nodejs.org/

### Pasos

1. **Clona el repositorio** (o descarga los archivos):
```bash
git clone https://github.com/TU_USUARIO/teatro-director.git
cd teatro-director
```

2. **Instala las dependencias**:
```bash
npm install
```

3. **Inicia el servidor local**:
```bash
npm start
```

4. **Abre en tu navegador**:
```
http://localhost:3000
```

¡El juego se cargará automáticamente!

## 🌐 Despliegue en Vercel

### Paso 1: Subir a GitHub

1. Crea una cuenta en https://github.com/ (si no tienes)
2. Haz clic en "New Repository"
3. Nombra el repositorio: `teatro-director`
4. Selecciona "Public"
5. Haz clic en "Create repository"
6. Sigue las instrucciones para subir el código

### Paso 2: Conectar con Vercel

1. Ve a https://vercel.com/
2. Haz clic en "Sign up" y elige "Continue with GitHub"
3. Autoriza Vercel con tu cuenta de GitHub
4. Haz clic en "New Project"
5. Selecciona tu repositorio `teatro-director`
6. Las configuraciones se detectarán automáticamente
7. Haz clic en "Deploy"

¡Tu app estará live en minutos! 🎉

## 📁 Estructura del Proyecto

```
teatro-director/
├── public/
│   └── index.html          # Página HTML principal
├── src/
│   ├── App.jsx            # Componente principal del juego
│   ├── App.css            # Estilos del juego
│   ├── index.js           # Punto de entrada de React
│   └── index.css          # Estilos globales
├── package.json           # Dependencias y scripts
├── .gitignore             # Archivos a ignorar en Git
└── README.md              # Este archivo
```

## 🎮 Cómo Jugar

1. **Menú Principal**: Haz clic en "CREAR NUEVA OBRA"

2. **Paso 1**: Selecciona el género de tu obra (Comedia, Drama, etc.)

3. **Paso 2**: Responde 5 preguntas sobre tu obra (pueden ser breves)

4. **Paso 3**: Escribe el nombre y la descripción (se genera automáticamente)

5. **Paso 4**: Elige el tipo de público (afecta el precio de entrada)

6. **Paso 5**: Contrata actores (mínimo 1) con tu presupuesto inicial

7. **Paso 6**: Elige un auditorio y configura días/horas de ensayo

8. **Resultado**: Ve cómo fue tu estreno, ganancias, XP y críticas

## 💾 Guardado de Datos

Los datos se guardan automáticamente en tu navegador cada vez que:
- Ganas/gastas dinero
- Ganas XP
- Subes de nivel
- Completas una obra

Para borrar tus datos (empezar desde cero):
1. Abre las DevTools (F12)
2. Ve a "Application" / "Storage"
3. Haz clic derecho en "Local Storage"
4. Selecciona "Clear All"

## 🛠️ Desarrollo

### Modificar el juego

Todos los datos del juego (actores, auditorios, etc.) están en el archivo `App.jsx` en las constantes al inicio:

```javascript
const ACTORES = [ /* ... */ ];
const AUDITORIOS = [ /* ... */ ];
const TIPOS_PUBLICO = [ /* ... */ ];
```

Puedes editarlas fácilmente sin tocar la lógica del juego.

### Cambiar estilos

Todos los estilos están en `App.css` con variables CSS fáciles de personalizar:

```css
:root {
  --color-accent-principal: #d4a574;  /* Cambiar este color */
  --color-fondo: #0a0e27;              /* Cambiar fondo */
  /* ... más variables */
}
```

## 📱 Compatibilidad

✅ Chrome, Firefox, Safari, Edge (últimas versiones)  
✅ Móvil (iOS Safari, Chrome móvil)  
✅ Tablet (todos los navegadores)  
⚠️ Internet Explorer no soportado

## 🐛 Problemas Comunes

### "npm: command not found"
→ Node.js no está instalado. Descárgalo desde https://nodejs.org/

### "Module not found"
→ Ejecuta `npm install` en la carpeta del proyecto

### Los estilos no se ven
→ Asegúrate de que `App.css` está en la misma carpeta que `App.jsx`

### Los datos no se guardan
→ El navegador puede tener el almacenamiento privado deshabilitado. Intenta en modo normal.

## 📝 Licencia

Este proyecto es de código abierto. Úsalo, modifícalo y comparte libremente.

## 🤝 Contribuciones

¿Quieres añadir características? ¡Haz un fork y manda un Pull Request!

## 📧 Contacto

Preguntas o sugerencias: abre un "Issue" en GitHub

---

**Made with ❤️ for theater lovers and game enthusiasts**
