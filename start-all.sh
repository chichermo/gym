#!/bin/bash

# 🏃‍♂️ Fitness App - Script de Inicio Automático
# Este script inicia toda la aplicación (backend, frontend web y móvil)

echo "🚀 Iniciando Fitness App..."
echo "================================"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir con colores
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar si estamos en el directorio correcto
if [ ! -f "package.json" ] && [ ! -d "server" ] && [ ! -d "client-vite" ]; then
    print_error "No se encontró la estructura del proyecto. Asegúrate de estar en el directorio raíz."
    exit 1
fi

print_status "Verificando prerrequisitos..."

# Verificar Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado. Por favor instala Node.js 18+"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js versión $NODE_VERSION detectada. Se requiere Node.js 18+"
    exit 1
fi

print_success "Node.js $(node -v) detectado"

# Verificar npm
if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado"
    exit 1
fi

print_success "npm $(npm -v) detectado"

# Verificar Git
if ! command -v git &> /dev/null; then
    print_warning "Git no está instalado (opcional)"
else
    print_success "Git $(git --version | cut -d' ' -f3) detectado"
fi

print_status "Verificando estructura del proyecto..."

# Verificar que existan los directorios necesarios
if [ ! -d "server" ]; then
    print_error "Directorio 'server' no encontrado"
    exit 1
fi

if [ ! -d "client-vite" ]; then
    print_error "Directorio 'client-vite' no encontrado"
    exit 1
fi

if [ ! -d "mobile" ]; then
    print_warning "Directorio 'mobile' no encontrado (opcional)"
fi

print_success "Estructura del proyecto verificada"

# Función para instalar dependencias
install_dependencies() {
    local dir=$1
    local name=$2
    
    if [ -d "$dir" ]; then
        print_status "Instalando dependencias de $name..."
        cd "$dir"
        
        if [ ! -d "node_modules" ]; then
            npm install
            if [ $? -eq 0 ]; then
                print_success "Dependencias de $name instaladas"
            else
                print_error "Error instalando dependencias de $name"
                return 1
            fi
        else
            print_success "Dependencias de $name ya están instaladas"
        fi
        
        cd ..
    fi
}

# Instalar dependencias
print_status "Instalando dependencias..."

install_dependencies "server" "Backend"
install_dependencies "client-vite" "Frontend Web"

if [ -d "mobile" ]; then
    install_dependencies "mobile" "Móvil"
fi

# Verificar configuración del backend
print_status "Verificando configuración del backend..."

if [ ! -f "server/.env" ]; then
    print_warning "Archivo .env no encontrado en server/"
    print_status "Copiando env.example..."
    cd server
    if [ -f "env.example" ]; then
        cp env.example .env
        print_success "Archivo .env creado. Edítalo con tus configuraciones."
    else
        print_error "Archivo env.example no encontrado"
        exit 1
    fi
    cd ..
else
    print_success "Configuración del backend encontrada"
fi

# Función para verificar puertos
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        print_warning "Puerto $port está en uso"
        return 1
    else
        print_success "Puerto $port disponible"
        return 0
    fi
}

# Verificar puertos
print_status "Verificando puertos..."

check_port 5000  # Backend
check_port 5173  # Frontend

# Función para iniciar servicios
start_backend() {
    print_status "Iniciando backend..."
    cd server
    npm run dev &
    BACKEND_PID=$!
    cd ..
    print_success "Backend iniciado (PID: $BACKEND_PID)"
}

start_frontend() {
    print_status "Iniciando frontend web..."
    cd client-vite
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    print_success "Frontend web iniciado (PID: $FRONTEND_PID)"
}

start_mobile() {
    if [ -d "mobile" ]; then
        print_status "¿Deseas iniciar la aplicación móvil? (y/n)"
        read -r response
        if [[ "$response" =~ ^[Yy]$ ]]; then
            print_status "Iniciando aplicación móvil..."
            cd mobile
            
            # Detectar sistema operativo
            if [[ "$OSTYPE" == "darwin"* ]]; then
                # macOS
                print_status "Detectado macOS. Iniciando iOS..."
                npx react-native run-ios &
            else
                # Linux/Windows
                print_status "Iniciando Android..."
                npx react-native run-android &
            fi
            
            MOBILE_PID=$!
            cd ..
            print_success "Aplicación móvil iniciada (PID: $MOBILE_PID)"
        else
            print_warning "Aplicación móvil omitida"
        fi
    fi
}

# Función para mostrar URLs
show_urls() {
    echo ""
    echo "🌐 URLs de la aplicación:"
    echo "================================"
    echo -e "${GREEN}Frontend Web:${NC} http://localhost:5173"
    echo -e "${GREEN}Backend API:${NC} http://localhost:5000"
    echo -e "${GREEN}Documentación API:${NC} http://localhost:5000/api/docs"
    echo ""
    echo "📱 Aplicación móvil:"
    echo "================================"
    echo -e "${GREEN}iOS Simulator:${NC} Se abrirá automáticamente"
    echo -e "${GREEN}Android Emulator:${NC} Se abrirá automáticamente"
    echo ""
    echo "⌚ Wearables:"
    echo "================================"
    echo -e "${GREEN}Apple Watch:${NC} Abrir Xcode > Product > Run"
    echo -e "${GREEN}Wear OS:${NC} Abrir Android Studio > Run"
    echo ""
}

# Función para manejar señales de interrupción
cleanup() {
    print_status "Deteniendo servicios..."
    
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        print_success "Backend detenido"
    fi
    
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        print_success "Frontend detenido"
    fi
    
    if [ ! -z "$MOBILE_PID" ]; then
        kill $MOBILE_PID 2>/dev/null
        print_success "Aplicación móvil detenida"
    fi
    
    print_success "Todos los servicios detenidos"
    exit 0
}

# Configurar trap para manejar Ctrl+C
trap cleanup SIGINT SIGTERM

# Iniciar servicios
echo ""
print_status "Iniciando servicios..."

start_backend
sleep 3  # Esperar a que el backend se inicie

start_frontend
sleep 2  # Esperar a que el frontend se inicie

start_mobile

# Mostrar URLs
show_urls

print_success "🎉 ¡Fitness App iniciada exitosamente!"
echo ""
print_status "Presiona Ctrl+C para detener todos los servicios"
echo ""

# Mantener el script ejecutándose
while true; do
    sleep 1
done 