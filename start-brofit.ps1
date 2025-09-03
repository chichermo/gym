# BRO FIT - Script de Inicio Automático para PowerShell
Write-Host "🚀 Iniciando BRO FIT..." -ForegroundColor Green

# Limpiar procesos anteriores
Write-Host "Limpiando procesos anteriores..." -ForegroundColor Blue
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Iniciar backend
Write-Host "Iniciando backend..." -ForegroundColor Blue
Set-Location server
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal
Set-Location ..

# Esperar y iniciar frontend
Start-Sleep -Seconds 8
Write-Host "Iniciando frontend..." -ForegroundColor Blue
Set-Location client-vite
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal
Set-Location ..

# Mostrar URLs
Start-Sleep -Seconds 5
Write-Host ""
Write-Host "🌐 URLs de BRO FIT:" -ForegroundColor Green
Write-Host "Frontend Web: http://localhost:5173" -ForegroundColor Green
Write-Host "Backend API: http://localhost:5000" -ForegroundColor Green
Write-Host "Documentación API: http://localhost:5000/api/docs" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 ¡BRO FIT iniciado!" -ForegroundColor Green
Write-Host "Los servicios están ejecutándose en ventanas separadas" -ForegroundColor Yellow
