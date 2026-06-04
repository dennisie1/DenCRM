# ─────────────────────────────────────────────────────────────
# DenCRM – Auto Push naar GitHub
# Dubbelklik op dit bestand om wijzigingen te committen & pushen
# Bewaar dit bestand in: C:\Users\Dennis\Documents\DenCRM\
# ─────────────────────────────────────────────────────────────

$REPO_MAP = "C:\Users\Dennis\Documents\DenCRM"

# Kleuren instellen
function Schrijf-Succes($tekst) { Write-Host $tekst -ForegroundColor Green }
function Schrijf-Info($tekst)   { Write-Host $tekst -ForegroundColor Cyan }
function Schrijf-Fout($tekst)   { Write-Host $tekst -ForegroundColor Red }
function Schrijf-Kop($tekst)    {
    Write-Host ""
    Write-Host "═══════════════════════════════════════" -ForegroundColor DarkCyan
    Write-Host "  $tekst" -ForegroundColor White
    Write-Host "═══════════════════════════════════════" -ForegroundColor DarkCyan
}

Clear-Host
Schrijf-Kop "DenCRM – GitHub Sync"

# ── Stap 1: Ga naar de juiste map ────────────────────────────
if (-not (Test-Path $REPO_MAP)) {
    Schrijf-Fout "Map niet gevonden: $REPO_MAP"
    Schrijf-Fout "Pas de variabele REPO_MAP bovenaan het script aan."
    Read-Host "`nDruk op Enter om af te sluiten"
    exit 1
}

Set-Location $REPO_MAP
Schrijf-Info "Map: $REPO_MAP"

# ── Stap 2: Controleer of git beschikbaar is ─────────────────
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Schrijf-Fout "Git is niet geinstalleerd of niet gevonden in PATH."
    Schrijf-Fout "Download git via: https://git-scm.com/download/win"
    Read-Host "`nDruk op Enter om af te sluiten"
    exit 1
}

# ── Stap 3: Status tonen ─────────────────────────────────────
Write-Host ""
Schrijf-Info "Gewijzigde bestanden:"
$status = git status --short
if ($status) {
    Write-Host $status -ForegroundColor Yellow
} else {
    Schrijf-Succes "Geen wijzigingen gevonden – alles is al up to date."
    Read-Host "`nDruk op Enter om af te sluiten"
    exit 0
}

# ── Stap 4: Commit-bericht vragen ────────────────────────────
Write-Host ""
$tijdstip = Get-Date -Format "yyyy-MM-dd HH:mm"

Write-Host "Wat wil je committen?" -ForegroundColor White
Write-Host "(Druk Enter voor automatisch tijdstip-bericht)" -ForegroundColor DarkGray
$bericht = Read-Host "Commit-bericht"

if ([string]::IsNullOrWhiteSpace($bericht)) {
    $bericht = "Update $tijdstip"
}

# ── Stap 5: Git add, commit, push ────────────────────────────
Write-Host ""
Schrijf-Info "Bestanden toevoegen..."
git add .

Schrijf-Info "Committen: `"$bericht`""
git commit -m $bericht

if ($LASTEXITCODE -ne 0) {
    Schrijf-Fout "Commit mislukt. Controleer bovenstaande foutmelding."
    Read-Host "`nDruk op Enter om af te sluiten"
    exit 1
}

Schrijf-Info "Pushen naar GitHub..."
git push

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Schrijf-Succes "✓ Succesvol gepusht naar GitHub!"
    Schrijf-Succes "✓ GitHub Actions bouwt nu automatisch de nieuwe versie."
    Write-Host ""
    Write-Host "Je app is straks live op:" -ForegroundColor White
    Write-Host "https://dennisie1.github.io/DenCRM/" -ForegroundColor Cyan
} else {
    Write-Host ""
    Schrijf-Fout "Push mislukt. Mogelijke oorzaken:"
    Write-Host "  - Geen internetverbinding" -ForegroundColor Yellow
    Write-Host "  - GitHub token verlopen (maak een nieuw token aan)" -ForegroundColor Yellow
    Write-Host "  - Remote repository heeft nieuwere commits (doe eerst: git pull)" -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Druk op Enter om af te sluiten"
