[CmdletBinding()]
param(
  [string]$ConfigPath = "./backup.config.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Read-Config {
  param([string]$Path)
  if (-not (Test-Path -LiteralPath $Path)) {
    throw "Config not found: $Path"
  }
  (Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json)
}

$nullProp = [ScriptBlock]::Create('$obj,$name = $args; if ($null -eq $obj) { return $null } if ($obj -is [hashtable]) { return ($obj.ContainsKey($name) ? $obj[$name] : $null) } $p = $obj.PSObject.Properties[$name]; if ($p) { return $p.Value } return $null')

function Ensure-Folder {
  param([string]$Path)
  if (-not [string]::IsNullOrWhiteSpace($Path)) {
    $dir = [System.IO.Path]::GetDirectoryName((Resolve-Path -LiteralPath $Path -ErrorAction SilentlyContinue)?.Path ?? $Path)
    if ($dir -and -not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  }
}

$cfg = Read-Config -Path $ConfigPath

if ($cfg.Verbose -eq $true) { $VerbosePreference = 'Continue' }

$splat = @{
  Protocol = $cfg.Protocol
  HostName = $cfg.HostName
  Port     = [int]($cfg.Port)
  UserName = $cfg.UserName
  RemotePath = ($cfg.RemotePath)
  LocalPath  = ($cfg.LocalPath)
}

if ($cfg.SshHostKeyFingerprint) { $splat.SshHostKeyFingerprint = $cfg.SshHostKeyFingerprint }
if ($cfg.Exclude) { $splat.Exclude = @($cfg.Exclude) }
if ($cfg.SessionLogPath) { 
  Ensure-Folder -Path $cfg.SessionLogPath
  $splat.SessionLogPath = $cfg.SessionLogPath 
}
if ($cfg.WinScpNetPath) { $splat.WinScpNetPath = $cfg.WinScpNetPath }

# Auth handling
$auth = $cfg.Auth
if ($auth) {
  if ($auth.PrivateKeyPath) { $splat.PrivateKeyPath = $auth.PrivateKeyPath }
  # Only prompt for password when not doing DryRun to avoid parameter set conflicts
  if (($cfg.DryRun -ne $true)) {
    $clixmlPath = & $nullProp $auth 'PasswordClixmlPath'
    if ($clixmlPath) {
      if (Test-Path -LiteralPath $clixmlPath) {
        try {
          $cred = Import-Clixml -Path $clixmlPath
          if ($cred -and $cred.Password) { $splat.Password = $cred.Password }
        } catch { Write-Warning "Failed to import password from CLIXML: $($_.Exception.Message)" }
      } else {
        Write-Warning "Password CLIXML not found: $clixmlPath"
      }
    } elseif ($auth.PromptPassword -eq $true) {
      $splat.Password = Read-Host "Password" -AsSecureString
    }
  }
}

if ($cfg.DryRun -eq $true) { $splat.DryRun = $true }

$dlScript = Join-Path $PSScriptRoot 'download-wordpress.ps1'
if (-not (Test-Path -LiteralPath $dlScript)) { throw "Downloader not found: $dlScript" }

Write-Verbose "Invoking downloader with provided configuration"
& $dlScript @splat
