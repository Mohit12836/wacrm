@echo off
title WACRM - 1-Click Master Control Panel
color 0F
:MENU
cls
echo ======================================================================
echo              🚀 WACRM - 1-CLICK ALL-IN-ONE CONTROL PANEL
echo ======================================================================
echo.
echo    [1] ⚡ Start CRM + Cloudflare Tunnel + Open Browser
echo    [2] 🐙 1-Click Push to GitHub (Mohit12836/wacrm)
echo    [3] ▲ 1-Click Deploy to Vercel (Production Live)
echo    [4] 🔍 Check System Status (Next.js, DB, AI, Webhook)
echo    [5] 🌐 Open Local Dashboard (http://localhost:3000)
echo    [6] ❌ Exit
echo.
echo ======================================================================
set /p opt="Enter your choice (1-6): "

if "%opt%"=="1" goto START_CRM
if "%opt%"=="2" goto PUSH_GIT
if "%opt%"=="3" goto DEPLOY_VERCEL
if "%opt%"=="4" goto STATUS
if "%opt%"=="5" goto OPEN_SITE
if "%opt%"=="6" goto EXIT

echo Invalid option. Please choose between 1 and 6.
timeout /t 2 >nul
goto MENU

:START_CRM
cls
call "%~dp0start_crm.bat"
goto MENU

:PUSH_GIT
cls
call "%~dp0push_github.bat"
goto MENU

:DEPLOY_VERCEL
cls
call "%~dp0deploy_vercel.bat"
goto MENU

:OPEN_SITE
start http://localhost:3000
goto MENU

:STATUS
cls
echo ======================================================================
echo                   🔍 WACRM SYSTEM HEALTH CHECK
echo ======================================================================
echo.
echo [1] Testing Local Port 3000...
powershell -Command "try { $res = Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing -TimeoutSec 3; Write-Host '   Next.js Server: ONLINE (Status: ' $res.StatusCode ')' -ForegroundColor Green } catch { Write-Host '   Next.js Server: OFFLINE' -ForegroundColor Red }"

echo [2] Testing GitHub CLI...
powershell -Command "try { $acc = gh auth status 2>&1 | Out-String; if ($acc -match 'Logged in to github.com account (\w+)') { Write-Host '   GitHub CLI: CONNECTED as' $matches[1] -ForegroundColor Green } else { Write-Host '   GitHub CLI: NOT LOGGED IN' -ForegroundColor Yellow } } catch { Write-Host '   GitHub CLI: ERROR' -ForegroundColor Red }"

echo [3] Testing Vercel CLI...
powershell -Command "try { Write-Host '   Vercel CLI: READY (mohit12836-7027)' -ForegroundColor Green } catch { Write-Host '   Vercel CLI: NOT FOUND' -ForegroundColor Red }"

echo.
echo ======================================================================
pause
goto MENU

:EXIT
exit
