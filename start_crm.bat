@echo off
title WACRM - Start Local CRM ^& Tunnel
color 0A
cd /d "%~dp0"

echo =========================================================
echo    🚀 STARTING WACRM (NEXT.JS + CLOUDFLARE TUNNEL)
echo =========================================================
echo.

echo [1/3] Checking dependencies...
if not exist "node_modules" (
    echo Installing node dependencies...
    call npm install
)

echo [2/3] Starting Next.js Dev Server on http://localhost:3000...
start "WACRM - Next.js Server" cmd /k "cd /d %~dp0 && npm run dev"

echo [3/3] Starting Cloudflare Webhook Tunnel...
if exist "C:\Users\hp\.gemini\antigravity\scratch\jain-lead-extractor\cloudflared.exe" (
    start "WACRM - Cloudflare Tunnel" cmd /k "C:\Users\hp\.gemini\antigravity\scratch\jain-lead-extractor\cloudflared.exe tunnel --url http://localhost:3000"
) else (
    echo Note: cloudflared.exe not found at standard path, using local port 3000 only.
)

echo.
echo Waiting 5 seconds for server initialization...
timeout /t 5 /nobreak >nul

echo Opening WACRM in browser...
start http://localhost:3000

echo.
echo =========================================================
echo   ✅ WACRM IS LIVE!
echo   👉 Local Dashboard: http://localhost:3000
echo   👉 Inbox: http://localhost:3000/inbox
echo   👉 AI Agents: http://localhost:3000/agents
echo =========================================================
echo.
pause
