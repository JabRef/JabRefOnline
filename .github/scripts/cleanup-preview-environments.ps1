#requires -Version 7.0
[CmdletBinding(SupportsShouldProcess)]
param(
    [string]$SubscriptionId = "",
    [string]$ResourceGroup = "JabRefOnline",
    [string]$StaticSiteName = "jabref-online",
    [int]$OlderThanDays = 7,
    [string]$RepoOwner = "JabRef",
    [string]$RepoName = "JabRefOnline",
    [string]$GitHubToken = "",
    [switch]$Delete
)


if (-not (Get-Command az -ErrorAction SilentlyContinue)) {
    throw "Azure CLI (az) not found in PATH. Install it from https://aka.ms/installazurecliwindows"
}


if (-not $SubscriptionId) {
  $SubscriptionId = $env:AZURE_SUBSCRIPTION_ID
  if (-not $SubscriptionId) {
    Write-Host "SubscriptionId not provided via parameter or AZURE_SUBSCRIPTION_ID environment variable. Attempting to load from .env file..." -ForegroundColor Yellow
    if (Test-Path .env) {
      Get-Content .env | foreach {
        $name, $value = $_.split('=')
        if ($name -eq "AZURE_SUBSCRIPTION_ID") {
          $SubscriptionId = $value.Trim()
          Write-Host "Loaded SubscriptionId from .env file." -ForegroundColor Green
        }
      }
    }
    if (-not $SubscriptionId) {
      throw "SubscriptionId is required. Provide it via parameter or AZURE_SUBSCRIPTION_ID environment variable."
    }
  }
}

az account set --subscription $SubscriptionId

if (-not $GitHubToken) {
  $GitHubToken = $env:GITHUB_TOKEN
}

function Get-PullRequestState {
  param(
    [string]$PullRequest,
    [string]$Owner,
    [string]$Repository,
    [string]$Token
  )

  $uri = "https://api.github.com/repos/$Owner/$Repository/pulls/$PullRequest"
  $headers = @{ "User-Agent" = "cleanup-preview-environments" }
  if ($Token) {
    $headers["Authorization"] = "Bearer $Token"
  }

  try {
    $response = Invoke-RestMethod -Method Get -Uri $uri -Headers $headers
    return $response.state
  }
  catch {
    Write-Warning "Failed to fetch PR #${PullRequest}: $($_.Exception.Message)"
    return $null
  }
}

$raw = az staticwebapp environment list --name $StaticSiteName --resource-group $ResourceGroup --output json
$environments = $raw | ConvertFrom-Json
if (-not $environments) {
    Write-Host "No environments returned for $StaticSiteName in $ResourceGroup." -ForegroundColor Yellow
    return
}

# Log all environments for debugging
Write-Host "Retrieved environments:" -ForegroundColor Cyan
foreach ($env in $environments) {
    Write-Host " - $($env.name)" -ForegroundColor Gray
}
$previewEnvs = $environments | Where-Object {
  $_.name -notin @("default", "staging", "dev")
}
$previewEnvs | Format-Table -AutoSize -Wrap

$cutoff = (Get-Date).ToUniversalTime().AddDays(-$OlderThanDays)
Write-Host "Cutoff: $cutoff" -ForegroundColor Cyan
$result = foreach ($env in $previewEnvs) {
    $timestamp = $env.lastUpdatedOn
    $olderThanCutoff = $timestamp -and $timestamp -lt $cutoff

    $isPrEnvironment = $env.name -match '^\d+$'
    $prNumber = $null
    $prState = $null
    $deleteBecauseClosedPr = $false
    if ($isPrEnvironment -and -not $olderThanCutoff) {
      $prState = Get-PullRequestState -PullRequest $env.name -Owner $RepoOwner -Repository $RepoName -Token $GitHubToken
      $deleteBecauseClosedPr = $prState -eq 'closed'
    }


    [pscustomobject]@{
      Name = $env.name
      LastUpdatedOn = $timestamp
      OlderThanCutoff = $olderThanCutoff
      IsPrEnvironment = $isPrEnvironment
      PullRequestNumber = $prNumber
      PullRequestState = $prState
      DeleteBecauseClosedPr = $deleteBecauseClosedPr
      MarkedForDeletion = ($olderThanCutoff -or $deleteBecauseClosedPr)
      LinkedBackends = ($env.linkedBackends | ForEach-Object { $_.backendResourceId })
    }
}

Write-Host "Environments with timestamps:" -ForegroundColor Cyan
$result | Sort-Object OlderThanCutoff, Name | Format-Table -AutoSize -Wrap

if ($Delete) {
  $toDelete = $result | Where-Object { $_.MarkedForDeletion }
    if (-not $toDelete) {
        Write-Host "No environments to delete." -ForegroundColor Green
        return
    }

    foreach ($item in $toDelete) {
      # Delete Function App
      az functionapp delete --ids $item.LinkedBackends

      # Delete test database
      az postgres flexible-server db delete --server-name jabrefdb --resource-group $ResourceGroup --database-name "postgres_test_$($item.Name)" --yes

      # Delete Static Web App environment
      az staticwebapp environment delete --name $StaticSiteName --resource-group $ResourceGroup --environment-name $item.Name --yes
    }
    Write-Host "Deleted the environments: $($toDelete.Name -join ", ")." -ForegroundColor Green
}
