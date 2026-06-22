@echo off
setlocal
cd /d "%~dp0"
set PORT=8091
title Jastin Ankur Website

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed or not available.
  echo Opening website file directly instead.
  start "" "%~dp0index.html"
  pause
  exit /b
)

node "%~dp0static-server.js"
pause
