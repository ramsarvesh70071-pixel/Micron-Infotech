@echo off
title Micron InfoTech Launcher
echo ============================================================
echo   Starting Micron InfoTech Full-Stack Application
echo ============================================================
echo.

echo [1/2] Starting Backend API Server (Port 5000)...
start "Micron Backend Server" cmd /k "node server/dist/server.js"

timeout /t 2 >nul

echo [2/2] Starting Frontend Vite Server (Port 5173)...
start "Micron Frontend Client" cmd /k "call node_modules\.bin\vite.cmd"

echo.
echo ============================================================
echo   Application is running!
echo   - Website:       http://localhost:5173
echo   - Admin Panel:   http://localhost:5173/admin
echo   - API Health:    http://localhost:5000/api/health
echo ============================================================
echo.
echo Press any key to close this launcher window (servers will keep running)...
pause >nul
