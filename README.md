# 🏋️ Fitness App con IA

Aplicación completa de fitness con inteligencia artificial para generar planes de entrenamiento personalizados.

## 🚀 Características

- **Autenticación completa** con JWT
- **Generador de planes de entrenamiento** con IA
- **Seguimiento de progreso** con métricas detalladas
- **Interfaz moderna** con Tailwind CSS
- **API RESTful** con Node.js y Express
- **Base de datos** MongoDB con Mongoose
- **Frontend** React con TypeScript

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- MongoDB (local o Atlas)

## 🛠️ Instalación

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd fitness-app
```

### 2. Instalar dependencias
```bash
npm run install-all
```

### 3. Configurar variables de entorno

#### Backend (.env en carpeta server)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/fitness-app
JWT_SECRET=tu_jwt_secret_super_seguro_cambiar_en_produccion
CLIENT_URL=http://localhost:3000
```

#### Frontend (.env en carpeta client)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚀 Ejecución

### Desarrollo (ambos servidores)
```bash
npm run dev
```

### Solo Backend
```bash
npm run server
```

### Solo Frontend
```bash
npm run client
```

### Producción
```bash
npm run build
```

## 📱 Uso

1. **Registro**: Crea una cuenta con tus datos personales y objetivos de fitness
2. **Login**: Inicia sesión con tu email y contraseña
3. **Dashboard**: Visualiza tu información y accesos rápidos
4. **Plan de IA**: Genera entrenamientos personalizados
5. **Progreso**: Registra y visualiza tu avance

## 🏗️ Estructura del Proyecto

```
fitness-app/
├── server/                 # Backend Node.js
│   ├── models/            # Modelos de MongoDB
│   ├── routes/            # Rutas de la API
│   ├── middleware/        # Middlewares (auth, etc.)
│   └── index.js           # Servidor principal
├── client/                # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/         # Páginas de la aplicación
│   │   ├── contexts/      # Contextos de React
│   │   ├── services/      # Servicios de API
│   │   └── types/         # Tipos TypeScript
│   └── package.json
└── package.json           # Scripts de desarrollo
```

## 🔧 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/me` - Obtener perfil actual

### Usuarios
- `GET /api/users/profile` - Obtener perfil
- `PUT /api/users/profile` - Actualizar perfil
- `PUT /api/users/password` - Cambiar contraseña

### Entrenamientos
- `GET /api/workouts` - Listar entrenamientos
- `POST /api/workouts` - Crear entrenamiento
- `GET /api/workouts/:id` - Obtener entrenamiento
- `PUT /api/workouts/:id` - Actualizar entrenamiento

### Ejercicios
- `GET /api/exercises` - Listar ejercicios
- `POST /api/exercises` - Crear ejercicio
- `GET /api/exercises/:id` - Obtener ejercicio

### Progreso
- `GET /api/progress` - Obtener progreso
- `POST /api/progress` - Registrar progreso
- `GET /api/progress/weight` - Progreso de peso
- `GET /api/progress/workout-stats` - Estadísticas

### Planes de IA
- `POST /api/plan/generate` - Generar plan personalizado
- `GET /api/plan/daily/:date` - Entrenamiento del día
- `GET /api/plan/recommendations` - Recomendaciones

## 🎨 Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación
- **bcryptjs** - Hash de contraseñas
- **express-validator** - Validación de datos

### Frontend
- **React** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt
- Autenticación JWT
- Validación de datos en frontend y backend
- CORS configurado
- Headers de seguridad con Helmet

## 📊 Base de Datos

### Modelos principales:
- **User**: Información del usuario y preferencias
- **Exercise**: Ejercicios individuales
- **Workout**: Rutinas de entrenamiento
- **Progress**: Seguimiento del progreso

## 🚀 Despliegue

### Heroku
1. Conectar repositorio a Heroku
2. Configurar variables de entorno
3. Desplegar automáticamente

### Vercel (Frontend)
1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Desplegar automáticamente

### MongoDB Atlas
1. Crear cluster en MongoDB Atlas
2. Configurar IP whitelist
3. Obtener connection string
4. Actualizar MONGODB_URI

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:
1. Revisa la documentación
2. Busca en issues existentes
3. Crea un nuevo issue con detalles del problema

---

**¡Disfruta tu viaje de fitness! 💪** 