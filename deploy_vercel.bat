@echo off
title WACRM - 1-Click Vercel Deploy
color 0E
cd /d "%~dp0"

echo =========================================================
echo       ▲ 1-CLICK VERCEL PRODUCTION DEPLOYMENT
echo =========================================================
echo.

echo Deploying WACRM to Vercel Production...
call npx vercel deploy --prod --yes

echo.
echo =========================================================
echo Deployment command finished! Check above for production URL.
echo =========================================================
echo.
pause
