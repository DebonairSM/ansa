@echo off
echo ===== Logo Copy Script =====
echo.
echo Checking source file...
if exist "C:\git\ansa\backup\ANSA-logo.png" (
    echo [OK] Source file exists
    dir "C:\git\ansa\backup\ANSA-logo.png"
) else (
    echo [ERROR] Source file not found!
    exit /b 1
)
echo.
echo Creating public directory...
if not exist "C:\git\ansa\apps\web\public" mkdir "C:\git\ansa\apps\web\public"
echo.
echo Copying file...
copy /Y "C:\git\ansa\backup\ANSA-logo.png" "C:\git\ansa\apps\web\public\ansa-logo.png"
if errorlevel 1 (
    echo [ERROR] Copy failed!
    exit /b 1
)
echo.
echo Verifying destination...
if exist "C:\git\ansa\apps\web\public\ansa-logo.png" (
    echo [SUCCESS] Logo file created!
    dir "C:\git\ansa\apps\web\public\ansa-logo.png"
) else (
    echo [ERROR] Destination file not found!
    exit /b 1
)
echo.
echo Listing public directory...
dir "C:\git\ansa\apps\web\public"
echo.
echo ===== Done =====
