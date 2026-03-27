$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendDir = Join-Path $projectRoot 'backend'
$frontendDir = Join-Path $projectRoot 'frontend'

$backendOutLog = Join-Path $projectRoot 'backend-dev.out.log'
$backendErrLog = Join-Path $projectRoot 'backend-dev.err.log'
$frontendOutLog = Join-Path $projectRoot 'frontend-dev.out.log'
$frontendErrLog = Join-Path $projectRoot 'frontend-dev.err.log'

function Test-UrlUp {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Url
  )

  try {
    Invoke-WebRequest -UseBasicParsing -Uri $Url -TimeoutSec 3 | Out-Null
    return $true
  } catch {
    return $false
  }
}

function Start-ServiceProcess {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Name,
    [Parameter(Mandatory = $true)]
    [string]$WorkingDirectory,
    [Parameter(Mandatory = $true)]
    [string[]]$Arguments,
    [Parameter(Mandatory = $true)]
    [string]$HealthUrl,
    [Parameter(Mandatory = $true)]
    [string]$OutLog,
    [Parameter(Mandatory = $true)]
    [string]$ErrLog,
    [hashtable]$EnvironmentVars = @{}
  )

  if (Test-UrlUp -Url $HealthUrl) {
    Write-Host "$Name is already running: $HealthUrl"
    return
  }

  if (Test-Path $OutLog) { Remove-Item -LiteralPath $OutLog -Force }
  if (Test-Path $ErrLog) { Remove-Item -LiteralPath $ErrLog -Force }

  $startInfo = @{
    FilePath = 'npm.cmd'
    ArgumentList = $Arguments
    WorkingDirectory = $WorkingDirectory
    RedirectStandardOutput = $OutLog
    RedirectStandardError = $ErrLog
    PassThru = $true
  }

  $previousEnvironment = @{}

  foreach ($entry in $EnvironmentVars.GetEnumerator()) {
    $previousEnvironment[$entry.Key] = [Environment]::GetEnvironmentVariable($entry.Key, 'Process')
    [Environment]::SetEnvironmentVariable($entry.Key, $entry.Value, 'Process')
  }

  try {
    $process = Start-Process @startInfo
  } finally {
    foreach ($entry in $EnvironmentVars.GetEnumerator()) {
      [Environment]::SetEnvironmentVariable($entry.Key, $previousEnvironment[$entry.Key], 'Process')
    }
  }

  Write-Host "$Name started with PID $($process.Id)"
}

Start-ServiceProcess `
  -Name 'Backend' `
  -WorkingDirectory $backendDir `
  -Arguments @('run', 'dev') `
  -HealthUrl 'http://localhost:5000/api/health' `
  -OutLog $backendOutLog `
  -ErrLog $backendErrLog

Start-ServiceProcess `
  -Name 'Frontend' `
  -WorkingDirectory $frontendDir `
  -Arguments @('start') `
  -HealthUrl 'http://localhost:3000' `
  -OutLog $frontendOutLog `
  -ErrLog $frontendErrLog `
  -EnvironmentVars @{ BROWSER = 'none' }

Write-Host ''
Write-Host 'Frontend: http://localhost:3000'
Write-Host 'Backend:  http://localhost:5000'
Write-Host 'Logs:'
Write-Host "  $backendOutLog"
Write-Host "  $backendErrLog"
Write-Host "  $frontendOutLog"
Write-Host "  $frontendErrLog"
