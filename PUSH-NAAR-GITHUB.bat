@echo off
chcp 65001 >nul
title DenCRM - GitHub Sync

cd /d "C:\Users\Dennis\Documents\DenCRM"

echo.
echo =======================================
echo   DenCRM - GitHub Sync
echo =======================================
echo.

:: Controleer of er wijzigingen zijn
git status --short > "%TEMP%\gitstatus.txt"
for /f %%A in ('type "%TEMP%\gitstatus.txt" ^| find /c /v ""') do set REGELS=%%A

if %REGELS%==0 (
    echo Geen wijzigingen gevonden - alles is al up to date.
    echo.
    pause
    exit /b 0
)

echo Gewijzigde bestanden:
type "%TEMP%\gitstatus.txt"
echo.

:: Commit bericht vragen
set /p BERICHT="Commit-bericht (Enter = datum+tijd): "

if "%BERICHT%"=="" (
    for /f "tokens=1-5 delims=/:. " %%a in ("%date% %time%") do (
        set BERICHT=Update %%a-%%b-%%c %%d:%%e
    )
)

echo.
echo Bestanden toevoegen...
git add .

echo Committen: %BERICHT%
git commit -m "%BERICHT%"

if errorlevel 1 (
    echo.
    echo FOUT: Commit mislukt.
    pause
    exit /b 1
)

echo Pushen naar GitHub...
git push

if errorlevel 1 (
    echo.
    echo Push mislukt. Mogelijke oorzaken:
    echo   - Geen internetverbinding
    echo   - GitHub token verlopen
    echo   - Doe eerst: git pull
) else (
    echo.
    echo Succesvol gepusht naar GitHub!
    echo Live op: https://dennisie1.github.io/dencrm/
)

echo.
pause
