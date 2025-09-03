# 🏃‍♂️ Fitness App - Script de Inicio Automático para PowerShell
# Este script inicia toda la aplicación (backend y frontend web)

Write-Host "🚀 Iniciando Fitness App..." -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# Función para imprimir con colores
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Verificar si estamos en el directorio correcto
if (-not (Test-Path "package.json") -and -not (Test-Path "server") -and -not (Test-Path "client-vite")) {
    Write-Error "No se encontró la estructura del proyecto. Asegúrate de estar en el directorio raíz."
    exit 1
}

Write-Status "Verificando prerrequisitos..."

# Verificar Node.js
try {
    $nodeVersion = node --version
    Write-Success "Node.js $nodeVersion detectado"
} catch {
    Write-Error "Node.js no está instalado. Por favor instala Node.js 18+"
    exit 1
}

# Verificar npm
try {
    $npmVersion = npm --version
    Write-Success "npm $npmVersion detectado"
} catch {
    Write-Error "npm no está instalado"
    exit 1
}

Write-Status "Verificando estructura del proyecto..."

# Verificar que existan los directorios necesarios
if (-not (Test-Path "server")) {
    Write-Error "Directorio 'server' no encontrado"
    exit 1
}

if (-not (Test-Path "client-vite")) {
    Write-Error "Directorio 'client-vite' no encontrado"
    exit 1
}

Write-Success "Estructura del proyecto verificada"

# Función para instalar dependencias
function Install-Dependencies {
    param([string]$Dir, [string]$Name)
    
    if (Test-Path $Dir) {
        Write-Status "Instalando dependencias de $Name..."
        Set-Location $Dir
        
        if (-not (Test-Path "node_modules")) {
            npm install
            if ($LASTEXITCODE -eq 0) {
                Write-Success "Dependencias de $Name instaladas"
            } else {
                Write-Error "Error instalando dependencias de $Name"
                return $false
            }
        } else {
            Write-Success "Dependencias de $Name ya están instaladas"
        }
        
        Set-Location ..
    }
}

# Instalar dependencias
Write-Status "Instalando dependencias..."

Install-Dependencies "server" "Backend"
Install-Dependencies "client-vite" "Frontend Web"

# Verificar configuración del backend
Write-Status "Verificando configuración del backend..."

if (-not (Test-Path "server/.env")) {
    Write-Warning "Archivo .env no encontrado en server/"
    Write-Status "Copiando env.example..."
    Set-Location server
    if (Test-Path "env.example") {
        Copy-Item env.example .env
        Write-Success "Archivo .env creado. Edítalo con tus configuraciones."
    } else {
        Write-Error "Archivo env.example no encontrado"
        exit 1
    }
    Set-Location ..
} else {
    Write-Success "Configuración del backend encontrada"
}

# Función para verificar puertos
function Test-Port {
    param([int]$Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        Write-Warning "Puerto $Port está en uso"
        return $false
    } catch {
        Write-Success "Puerto $Port disponible"
        return $true
    }
}

# Verificar puertos
Write-Status "Verificando puertos..."

Test-Port 5000  # Backend
Test-Port 5173  # Frontend

# Función para iniciar servicios
function Start-Backend {
    Write-Status "Iniciando backend..."
    Set-Location server
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Minimized
    Set-Location ..
    Write-Success "Backend iniciado"
}

function Start-Frontend {
    Write-Status "Iniciando frontend web..."
    Set-Location client-vite
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Minimized
    Set-Location ..
    Write-Success "Frontend web iniciado"
}

# Función para mostrar URLs
function Show-Urls {
    Write-Host ""
    Write-Host "🌐 URLs de la aplicación:" -ForegroundColor Green
    Write-Host "================================" -ForegroundColor Green
    Write-Host "Frontend Web: http://localhost:5173" -ForegroundColor Green
    Write-Host "Backend API: http://localhost:5000" -ForegroundColor Green
    Write-Host "Documentación API: http://localhost:5000/api/docs" -ForegroundColor Green
    Write-Host ""
}

# Iniciar servicios
Write-Host ""
Write-Status "Iniciando servicios..."

Start-Backend
Start-Sleep 5  # Esperar a que el backend se inicie

Start-Frontend
Start-Sleep 3  # Esperar a que el frontend se inicie

# Mostrar URLs
Show-Urls

Write-Success "🎉 ¡Fitness App iniciada exitosamente!"
Write-Host ""
Write-Status "Los servicios están ejecutándose en ventanas separadas"
Write-Host "Cierra las ventanas de PowerShell para detener los servicios"
Write-Host ""

# Mantener el script ejecutándose
Write-Host "Presiona cualquier tecla para salir..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
