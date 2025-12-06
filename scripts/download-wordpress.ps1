<#
.SYNOPSIS
  Download a WordPress site's files via SFTP/FTP using WinSCP.

.DESCRIPTION
  Mirrors remote site files (e.g., /var/www/html) to a local folder.
  Supports SFTP (recommended) or FTPS/FTP. Requires WinSCP .NET assembly.

  Note: This downloads files only. To fully back up WordPress, also export
  the database (via WP-CLI, phpMyAdmin, or a backup plugin).

.PARAMETER Protocol
  'Sftp' (default) or 'Ftp'. For FTP, Explicit TLS is attempted when possible.

.PARAMETER HostName
  Hostname of your server (e.g., sftp.example.com).

.PARAMETER Port
  Port number (SFTP default 22, FTP default 21).

.PARAMETER UserName
  Login username.

.PARAMETER Password
  SecureString password (omit if using key auth).

.PARAMETER PrivateKeyPath
  Path to private key file for SFTP key authentication (.ppk or OpenSSH key).

.PARAMETER SshHostKeyFingerprint
  SFTP server host key fingerprint (recommended for security).

.
PARAMETER RemotePath
  Remote web root (e.g., /var/www/html or public_html).

.
PARAMETER LocalPath
  Local destination folder (will be created if missing).

.
PARAMETER Exclude
  Paths/patterns to exclude (WinSCP file mask). Defaults include cache dirs.

.EXAMPLE
  # SFTP with password
  $pw = Read-Host "Password" -AsSecureString
  .\scripts\download-wordpress.ps1 -Protocol Sftp -HostName myhost -UserName myuser -Password $pw `
    -SshHostKeyFingerprint "ssh-ed25519 255 abcdef...=" -RemotePath "/var/www/html" -LocalPath ".\backup\sitefiles"

.EXAMPLE
  # SFTP with private key
  .\scripts\download-wordpress.ps1 -Protocol Sftp -HostName myhost -UserName myuser -PrivateKeyPath "C:\\keys\\id_ed25519" `
    -SshHostKeyFingerprint "ssh-ed25519 255 abcdef...=" -RemotePath "/var/www/html" -LocalPath ".\backup\sitefiles"

.EXAMPLE
  # FTP/FTPS
  $pw = Read-Host "Password" -AsSecureString
  .\scripts\download-wordpress.ps1 -Protocol Ftp -HostName myhost -Port 21 -UserName myuser -Password $pw `
    -RemotePath "/public_html" -LocalPath ".\backup\sitefiles"
#>

[CmdletBinding(DefaultParameterSetName='Run')]
param(
  [Parameter(ParameterSetName='Run')]
  [Parameter(ParameterSetName='Dry')]
  [ValidateSet('Sftp','Ftp')]
  [string]$Protocol = 'Sftp',

  [Parameter(Mandatory=$true, ParameterSetName='Run')]
  [Parameter(ParameterSetName='Dry')]
  [string]$HostName,

  [Parameter(ParameterSetName='Run')]
  [Parameter(ParameterSetName='Dry')]
  [int]$Port = 0,

  [Parameter(Mandatory=$true, ParameterSetName='Run')]
  [Parameter(ParameterSetName='Dry')]
  [string]$UserName,

  [Parameter(ParameterSetName='Run')]
  [securestring]$Password,

  [Parameter(ParameterSetName='Run')]
  [Parameter(ParameterSetName='Dry')]
  [string]$PrivateKeyPath,

  [Parameter(ParameterSetName='Run')]
  [Parameter(ParameterSetName='Dry')]
  [string]$SshHostKeyFingerprint,

  [Parameter(ParameterSetName='Run')]
  [Parameter(ParameterSetName='Dry')]
  [string]$RemotePath = '/var/www/html',

  [Parameter(ParameterSetName='Run')]
  [Parameter(ParameterSetName='Dry')]
  [string]$LocalPath = '.\\backup\\sitefiles',

  [Parameter(ParameterSetName='Run')]
  [Parameter(ParameterSetName='Dry')]
  [string[]]$Exclude = @('*/cache/*','*/cache/**','*/wp-content/cache/*'),

  [Parameter(ParameterSetName='Run')]
  [Parameter(ParameterSetName='Dry')]
  [string]$SessionLogPath,

  [Parameter(ParameterSetName='Dry')]
  [switch]$DryRun,

  [Parameter(ParameterSetName='Run')]
  [Parameter(ParameterSetName='Dry')]
  [string]$WinScpNetPath
)

function Convert-SecureStringToPlainText {
  param([securestring]$Sec)
  if (-not $Sec) { return $null }
  $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($Sec)
  try { [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr) } finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr) }
}

Write-Verbose "Ensuring local path exists: $LocalPath"
New-Item -ItemType Directory -Path $LocalPath -Force | Out-Null

# Try to load WinSCP .NET assembly
$loaded = $false
$candidatePaths = @()
if ($WinScpNetPath) { $candidatePaths += $WinScpNetPath }
if ($env:WINSCPSHARP_PATH) { $candidatePaths += $env:WINSCPSHARP_PATH }
$candidatePaths += @(
  "$PSScriptRoot\\..\\..\\WinSCPnet.dll",
  "C:\\Program Files (x86)\\WinSCP\\WinSCPnet.dll",
  "C:\\Program Files\\WinSCP\\WinSCPnet.dll"
)

try {
  $winscpCmd = Get-Command WinSCP -ErrorAction SilentlyContinue
  if ($winscpCmd -and $winscpCmd.Path) {
    $candidatePaths += (Join-Path (Split-Path $winscpCmd.Path -Parent) 'WinSCPnet.dll')
  }
} catch {}

foreach ($p in ($candidatePaths | Select-Object -Unique)) {
  if ($p -and (Test-Path $p)) {
    try { Add-Type -Path $p; $loaded = $true; break } catch { }
  }
}

if (-not $loaded) {
  $searchRoots = @("C:\\Program Files","C:\\Program Files (x86)", "$env:LOCALAPPDATA\\Programs") | Where-Object { Test-Path $_ }
  foreach ($root in $searchRoots) {
    try {
      $found = Get-ChildItem -Path $root -Filter WinSCPnet.dll -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
      if ($found) {
        Add-Type -Path $found.FullName
        $loaded = $true
        break
      }
    } catch {}
  }
}

if (-not $loaded) {
  Write-Error "WinSCP .NET assembly not found. Provide -WinScpNetPath to WinSCPnet.dll or install WinSCP. Example path: 'C:\\Program Files (x86)\\WinSCP\\WinSCPnet.dll'"
  exit 1
}

$session = $null
$plain = $null

# Default port by protocol if not provided
if ($Port -eq 0) {
  $Port = if ($Protocol -eq 'Sftp') { 22 } else { 21 }
}

# Dry run prints plan and exits after assembly validation
if ($DryRun.IsPresent) {
  Write-Host "[DryRun] WinSCP assembly loaded successfully." -ForegroundColor Green
  Write-Host "[DryRun] Protocol : $Protocol" -ForegroundColor Cyan
  Write-Host "[DryRun] Host     : $HostName" -ForegroundColor Cyan
  Write-Host "[DryRun] Port     : $Port" -ForegroundColor Cyan
  Write-Host "[DryRun] User     : $UserName" -ForegroundColor Cyan
  Write-Host "[DryRun] Remote   : $RemotePath" -ForegroundColor Cyan
  Write-Host "[DryRun] Local    : $LocalPath" -ForegroundColor Cyan
  if ($PrivateKeyPath) { Write-Host "[DryRun] Using key : $PrivateKeyPath" -ForegroundColor Cyan }
  if ($SshHostKeyFingerprint) { Write-Host "[DryRun] SSH FP   : $SshHostKeyFingerprint" -ForegroundColor Cyan }
  if ($Exclude -and $Exclude.Count) { Write-Host ("[DryRun] Exclude  : " + ($Exclude -join ';')) -ForegroundColor Cyan }
  exit 0
}

try {
  $sessionOptions = New-Object WinSCP.SessionOptions
  if ($Protocol -eq 'Sftp') {
    $sessionOptions.Protocol = [WinSCP.Protocol]::Sftp
  } else {
    $sessionOptions.Protocol = [WinSCP.Protocol]::Ftp
    $sessionOptions.FtpSecure = [WinSCP.FtpSecure]::Explicit
  }
  $sessionOptions.HostName = $HostName
  $sessionOptions.UserName = $UserName
  $sessionOptions.PortNumber = $Port

  if ($Protocol -eq 'Sftp') {
    if ($SshHostKeyFingerprint) {
      $sessionOptions.SshHostKeyFingerprint = $SshHostKeyFingerprint
    } else {
      Write-Warning "No SshHostKeyFingerprint provided. For security, supply the server's host key fingerprint."
    }
    if ($PrivateKeyPath) { $sessionOptions.SshPrivateKeyPath = $PrivateKeyPath }
  }

  $plain = Convert-SecureStringToPlainText $Password
  if ($plain) { $sessionOptions.Password = $plain }

  $session = New-Object WinSCP.Session
  $session.AddRawConfiguration("Interface\CopyParam\PreserveTime","1")
  if ($SessionLogPath) { $session.SessionLogPath = $SessionLogPath }
  $session.Open($sessionOptions)

  $transferOptions = New-Object WinSCP.TransferOptions
  $transferOptions.TransferMode = [WinSCP.TransferMode]::Binary
  $transferOptions.PreserveTimestamp = $true

  # Build mask: include everything, exclude patterns after '|'
  if ($Exclude -and $Exclude.Count -gt 0) {
    $mask = "*|" + ($Exclude -join ';')
    $transferOptions.FileMask = $mask
  }

  Write-Host "Starting synchronization..." -ForegroundColor Cyan
  Write-Host "Remote: $RemotePath" -ForegroundColor DarkCyan
  Write-Host "Local : $LocalPath" -ForegroundColor DarkCyan

  $result = $session.SynchronizeDirectories(
    [WinSCP.SynchronizationMode]::Local,
    (Resolve-Path $LocalPath).Path,
    $RemotePath,
    $false,   # removeFiles
    $true,    # mirror
    [WinSCP.SynchronizationCriteria]::Time,
    $transferOptions
  )

  # Check for errors
  $result.Check()

  $ok = $result.Downloads | Where-Object { $_.Error -eq $null } | Measure-Object | Select-Object -ExpandProperty Count
  $fail = $result.Downloads | Where-Object { $_.Error -ne $null } | Measure-Object | Select-Object -ExpandProperty Count
  Write-Host "Completed. Files downloaded: $ok, Failures: $fail" -ForegroundColor Green

  if ($fail -gt 0) {
    Write-Warning "Some files failed to transfer. See session log above for details."
  }
}
catch {
  Write-Error $_.Exception.Message
  exit 2
}
finally {
  if ($session) { $session.Dispose() }
  if ($plain) { [Array]::Clear([char[]]$plain, 0, $plain.Length) | Out-Null }
}
