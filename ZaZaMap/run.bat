@echo off
color a
setlocal enabledelayedexpansion

echo Available versions:
for /d %%D in (v*) do (
    echo  - %%D
)

set /p version=Enter a version to run: 

if not exist "%version%/server.js" (
    echo.
    echo ❌ Error: "%version%\server.js" not found.
    echo Make sure you typed the version folder name correctly.
    pause
    exit /b
)

echo.
echo Running %version%/server.js ...
cd %version%
node server.js

pause