<#
PowerShell helper to run the Docker image with Firebase credentials mounted.
Usage:
  - Put your `serviceAccount.json` at the project root (next to this script) OR provide path when asked.
  - Create a `.env.local` with env vars (optional). This script will use it as --env-file if present.
  - Run: `.
ecipes\docker-run-debug.ps1` or `.	ools\docker-run-debug.ps1` from repo root.

What it does:
  - Verifies `serviceAccount.json` or prompts to continue without it.
  - Uses `.env.local` as --env-file if present.
  - Runs docker with port 3000 mapped and mounts `serviceAccount.json` to /app/serviceAccount.json.
  - Shows how to pass individual env vars if needed.
#>

param(
    [string]$Image = 'vinhvudex/web_pot:v1.0.1',
    [int]$Port = 3000
)

$cwd = (Get-Location).Path
$saPath = Join-Path $cwd 'serviceAccount.json'
$envFile = Join-Path $cwd '.env.local'

Write-Host "Working dir: $cwd"

if (-Not (Test-Path $saPath)) {
    Write-Warning "serviceAccount.json not found at $saPath"
    $resp = Read-Host "Continue without mounting serviceAccount.json? (y/N)"
    if ($resp -ne 'y' -and $resp -ne 'Y') {
        Write-Host "Place your serviceAccount.json in the project root and re-run. Exiting."
        exit 1
    }
}

# Build docker run arguments
$volumes = @()
if (Test-Path $saPath) {
    # Mount read-only to /app/serviceAccount.json (our code looks in process.cwd())
    $volumes += "-v `"$saPath`":/app/serviceAccount.json:ro"
}

$envArgs = ''
if (Test-Path $envFile) {
    Write-Host ".env.local found — using as --env-file"
    $envArgs = "--env-file `"$envFile`""
} else {
    Write-Warning ".env.local not found. You can create one from .env.local.example or pass env vars manually."
    # Example showing how to pass env vars inline (commented)
    # $envArgs = "-e PROJECT_ID='your-project-id' -e CLIENT_EMAIL='xxx@...' -e PRIVATE_KEY='-----BEGIN...\n'"
}

$volumesArg = ($volumes -join ' ')

$cmd = "docker run --rm -p $Port:3000 $volumesArg $envArgs --name test_frontend_debug $Image"

Write-Host "Running: $cmd" -ForegroundColor Cyan

# Start the container (PowerShell will display output)
Invoke-Expression $cmd
