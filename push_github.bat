@echo off
title WACRM - 1-Click GitHub Push
color 0B
cd /d "%~dp0"

echo =========================================================
echo       🐙 1-CLICK GITHUB PUSH - MOHIT12836/WACRM
echo =========================================================
echo.

python "%~dp0scripts\push_github.py" %*

echo.
echo =========================================================
pause
