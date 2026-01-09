@echo off
echo ==========================================
echo Mobile Showroom Deployment Script
echo ==========================================

echo Checking for Docker...
docker --version
IF %ERRORLEVEL% NEQ 0 (
    echo Error: Docker is not installed or not in the PATH.
    echo Please install Docker Desktop and try again.
    pause
    exit /b
)

echo.
echo Building and Starting Containers...
docker-compose up --build -d

IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo Deployment Failed. Please check the logs above.
    pause
    exit /b
)

echo.
echo ==========================================
echo Deployment Successful!
echo ==========================================
echo Frontend: http://localhost:4200
echo Backend:  http://localhost:8080
echo Database: localhost:5432
echo.
pause
