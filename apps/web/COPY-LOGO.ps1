$ErrorActionPreference = "Stop"

Write-Host "===== Starting Logo Copy =====" -ForegroundColor Green

$source = "C:\git\ansa\backup\ANSA-logo.png"
$dest = "C:\git\ansa\apps\web\public\ansa-logo.png"
$logPath = "C:\git\ansa\copy-result.log"

"Logo Copy Log - $(Get-Date)" | Out-File $logPath

try {
    # Check source
    Write-Host "Checking source file..." -ForegroundColor Yellow
    if (Test-Path $source) {
        $sourceInfo = Get-Item $source
        Write-Host "[OK] Source exists: $($sourceInfo.Length) bytes" -ForegroundColor Green
        "Source exists: $($sourceInfo.FullName) - $($sourceInfo.Length) bytes" | Out-File $logPath -Append
    } else {
        throw "Source file not found: $source"
    }
    
    # Create directory
    $destDir = Split-Path $dest -Parent
    Write-Host "Creating directory: $destDir" -ForegroundColor Yellow
    if (!(Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        Write-Host "[OK] Directory created" -ForegroundColor Green
        "Directory created" | Out-File $logPath -Append
    }
    
    # Copy file
    Write-Host "Copying file..." -ForegroundColor Yellow
    Copy-Item -Path $source -Destination $dest -Force
    "File copied" | Out-File $logPath -Append
    
    # Verify
    if (Test-Path $dest) {
        $destInfo = Get-Item $dest
        Write-Host "[SUCCESS] Logo copied successfully!" -ForegroundColor Green
        Write-Host "Destination: $($destInfo.Length) bytes" -ForegroundColor Green
        "SUCCESS: $($destInfo.FullName) - $($destInfo.Length) bytes" | Out-File $logPath -Append
    } else {
        throw "Destination file not created"
    }
    
} catch {
    Write-Host "[ERROR] $_" -ForegroundColor Red
    "ERROR: $_" | Out-File $logPath -Append
    exit 1
}

Write-Host "===== Complete =====" -ForegroundColor Green





