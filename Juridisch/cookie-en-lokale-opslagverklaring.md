# Cookie- en lokale-opslagverklaring DenCRM

> ⚠️ **DIT IS EEN CONCEPT, GEEN JURIDISCH GECONTROLEERD DOCUMENT.**
> Zie ook de toelichting bovenaan de Privacyverklaring.

**Laatst bijgewerkt:** [TODO: datum invullen bij publicatie]

## Gebruikt DenCRM cookies?

**Nee.** DenCRM plaatst geen tracking-cookies, geen advertentiecookies en geen
analysecookies (zoals Google Analytics). Er is dan ook geen cookiebanner nodig voor
tracking-doeleinden.

## Wat gebruikt DenCRM dan wel?

Om u ingelogd te houden en de applicatie te laten functioneren, maakt DenCRM gebruik van
**lokale opslag** (`localStorage`) in uw browser. Dit is technisch iets anders dan een
cookie: de gegevens blijven op uw eigen apparaat en worden niet automatisch mee verstuurd
bij elk verzoek zoals bij een cookie, maar bewust door de applicatie uitgelezen wanneer
dat nodig is.

De volgende gegevens worden lokaal opgeslagen:

| Naam | Doel | Bewaarduur |
|---|---|---|
| `dencrm_access` | Toegangstoken om u ingelogd te houden tijdens uw sessie | 15 minuten, wordt automatisch ververst |
| `dencrm_refresh` | Vernieuwingstoken om u niet elke 15 minuten opnieuw te laten inloggen | 7 dagen |
| `dencrm_onthoud_gebruikersnaam` | Uw gebruikersnaam, uitsluitend indien u "Onthoud mijn gegevens" aanvinkt | Tot u dit uitvinkt of uitlogt |

Deze gegevens zijn **strikt noodzakelijk** voor het functioneren van de Dienst — zonder
deze opslag zou u bij elke pagina opnieuw moeten inloggen. Om deze reden is voor deze
opslag, net als bij functionele cookies, geen aparte toestemming via een cookiebanner
vereist (vergelijkbaar met de uitzondering in art. 11.7a Telecommunicatiewet voor
technisch noodzakelijke cookies) — [TODO: dit standpunt laten bevestigen door een jurist,
met name of localStorage exact hetzelfde beoordeeld wordt als een cookie onder de
huidige interpretatie van de wet].

**Belangrijk:** uw wachtwoord wordt **nooit** door DenCRM zelf lokaal opgeslagen. Als uw
browser aanbiedt om uw wachtwoord te onthouden, is dat een functie van uw browser zelf
(bijvoorbeeld Chrome- of Safari-wachtwoordbeheer), niet van DenCRM.

## Externe content

Voor zover bekend laadt de DenCRM-applicatie zelf geen externe lettertypen of
CDN-bronnen vanuit de hoofdapplicatie (crm-app.jsx) — dit kon niet worden vastgesteld
voor het losse `index.html`-bestand en eventuele build-configuratie, dus [TODO:
controleer index.html en de Vite-buildconfiguratie zelf op eventuele externe bronnen,
zoals Google Fonts of een CDN voor icoon-bibliotheken]. Voor zover hierbij gegevens naar
een externe partij worden verstuurd (zoals uw IP-adres bij het laden van een lettertype
vanaf een extern CDN), geldt het privacybeleid van die externe partij.

## Vragen?

Neem contact op via info@dencrm.nl.
