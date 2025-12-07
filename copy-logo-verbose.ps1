$ErrorActionPreference = "Continue"
$source = "C:\git\ansa\backup\ANSA-logo.png"
$dest = "C:\git\ansa\apps\web\public\ansa-logo.png"
$logFile = "C:\git\ansa\copy-log.txt"

"Starting logo copy..." | Out-File $logFile

if (Test-Path $source) {
    "Source file exists: $source" | Out-File $logFile -Append
    $sourceSize = (Get-Item $source).Length
    "Source file size: $sourceSize bytes" | Out-File $logFile -Append
} else {
    "ERROR: Source file not found: $source" | Out-File $logFile -Append
    exit 1
}

$destDir = Split-Path $dest -Parent
if (!(Test-Path $destDir)) {
    "Creating directory: $destDir" | Out-File $logFile -Append
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

try {
    Copy-Item -Path $source -Destination $dest -Force
    "Copy completed" | Out-File $logFile -Append
    
    if (Test-Path $dest) {
        $destSize = (Get-Item $dest).Length
        "Destination file exists: $dest" | Out-File $logFile -Append
        "Destination file size: $destSize bytes" | Out-File $logFile -Append
        Write-Host "SUCCESS: Logo copied to $dest"
    } else {
        "ERROR: Destination file not found after copy" | Out-File $logFile -Append
        Write-Host "ERROR: File not found after copy"
    }
} catch {
    "ERROR: $_" | Out-File $logFile -Append
    Write-Host "ERROR: $_"
}

"Script completed" | Out-File $logFile -Append







