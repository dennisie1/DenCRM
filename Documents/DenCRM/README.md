# DenCRM

> Nederlandstalige CRM-webapplicatie gebouwd als single-file React-component.  
> Bestemd voor klant- en productbeheer, agendaplanning en offertes.

---

## Wijzigingslog

| Versie | Datum | Tijdstip | Omschrijving |
|--------|-------|----------|--------------|
| 1.0.0 | 2026-06-03 | 18:00 | Initiële opzet: klanten, producten, agenda, offertes |
| 1.1.0 | 2026-06-03 | 18:30 | Instellingenpaneel toegevoegd (tekstgrootte, accentkleur); modals vaste achtergrond |
| 1.2.0 | 2026-06-03 | 19:00 | Achtergrondkleur-instelling; agenda uurblokkenweergave; inlogvenster; gebruikersbeheer; gescheiden data per gebruiker |
| 1.3.0 | 2026-06-03 | 19:30 | Agenda klant-zoekbox met autocomplete; klant-detailpaneel met tabbladen (afspraken + offertes); offertes opslaan onder klant; vrije productregels; BTW-toggle; IBAN + BTW-nummer op offerte |
| 1.4.0 | 2026-06-03 | 20:00 | Producten: categoriefilter tabs, lijstweergave, bewerken-knop, zoekbalk |
| 1.5.0 | 2026-06-03 | 20:30 | Demo-modus met rode banner; "Probeer de applicatie"-knop op loginscherm |
| 1.6.0 | 2026-06-03 | 21:00 | Hernoemd van "CRM Beheer" naar "DenCRM" |
| 1.7.0 | 2026-06-03 | 21:30 | Offertes volledig heringedeeld (3 stappen); klant toevoegen vanuit offerte; producten als lijst in stap 2; offerte openbaar vanuit klantenpagina |
| 1.8.0 | 2026-06-03 | 22:00 | README aangemaakt; GitHub Actions workflow toegevoegd |
| 1.9.0 | 2026-06-03 | 22:30 | Financieel overzicht: alle offertes op datum, filter op klant/datum/status, betaald-markering, samenvattingskaarten |

---

## Projectoverzicht

DenCRM is een volledig Nederlandstalige CRM-applicatie gebouwd als één React JSX-bestand (`crm-app.jsx`). De app draait volledig in de browser zonder backend — data leeft in React-state. Voor persistente opslag is koppeling met een REST API + MSSQL-database voorzien maar nog niet geïmplementeerd.

### Technologieën

- **React** (JSX, hooks: `useState`, `useRef`, `useEffect`)
- **Geen externe UI-bibliotheek** — alle componenten zijn zelfgebouwd
- **Styling** via inline styles met CSS-variabelen van de host-omgeving
- **Authenticatie** — eenvoudige client-side hash (demo only, niet productie-ready)

---

## Bestandsstructuur

```
dencrm/
├── crm-app.jsx        ← Volledige applicatie (één bestand)
├── README.md          ← Dit bestand
└── .github/
    └── workflows/
        └── deploy.yml ← GitHub Actions: auto-commit bij push
```

---

## Architectuur & codekaart

### Constanten & initiële data (regels 1–73)

| Naam | Regel | Beschrijving |
|------|-------|--------------|
| `simpleHash(str)` | 3 | Eenvoudige hash voor wachtwoorden (demo only) |
| `INIT_USERS` | 9 | Startgebruikers: `dennis.goosen` (admin) en `demo` |
| `INIT_KLANTEN` | 14 | Voorbeeldklanten per gebruiker-ID |
| `INIT_PRODUCTEN` | 24 | Voorbeeldproducten per gebruiker-ID |
| `INIT_AGENDA` | 36 | Voorbeeldafspraken per gebruiker-ID |
| `OFFERTE_TEMPLATE` | 44 | Standaard offertetekst met `{klant_naam}` variabele |
| `KLEUREN` | 53 | 6 accentkleurthema's (hoofd, licht, donker) |
| `BGOVS` | 62 | 6 achtergrondkleuren (3 licht, 3 donker) |
| `UREN` | 71 | Array van 24 uurslots voor agenda-blokweergave |
| `DARK_BGS` | 72 | Hex-waarden van donkere thema's |
| `uid()` | 74 | Genereert korte unieke ID-strings |

---

### UI-primitieven (regels 76–197)

| Component | Regel | Props | Beschrijving |
|-----------|-------|-------|--------------|
| `KlantZoekBox` | 77 | `klanten, value, onChange, fs` | Typvenster met live autocomplete op klantnaam en e-mail. Toont maximaal 8 suggesties. Sluit bij klik buiten het veld. |
| `Avatar` | 128 | `naam, size=40, kleur` | Ronde initialen-avatar. Kleur wordt bepaald door de actieve accentkleur. |
| `Modal` | 138 | `title, onClose, children, fs` | Overlay-venster met vaste witte achtergrond (`#ffffff`). Sluit bij klik op de achtergrond. |
| `FF` (FormField) | 159 | `label, children, fs` | Formulierveld-wrapper met label erboven. |
| `Btn` | 168 | `onClick, variant, children, style, kleur, fs, disabled` | Knop met varianten: `default`, `primary`, `danger`. Primary gebruikt de actieve accentkleur. |
| `Badge` | 182 | `children, kleur` | Kleine pill-badge in de accentkleur (licht + donker). |
| `Toggle` | 186 | `aan, onToggle, label, fs` | Schuifregelaar (aan/uit) voor booleaanse instellingen. |

---

### Pagina's & modules

#### `LoginPage` (regel 200)
**Props:** `users, onLogin, onDemo, kleur`

Het inlogscherm. Bevat:
- Gebruikersnaam + wachtwoord met zichtbaarheidsknop
- Foutmelding bij verkeerde inloggegevens
- "Probeer de applicatie"-knop die demo-modus opstart (gele stippelrand)

Inloggegevens standaard:
- `dennis.goosen` / `Tijdelijk1` (admin)
- `demo` / `Demo123` (normale gebruiker)

---

#### `GebruikersBeheer` (regel 265)
**Props:** `users, setUsers, kleur, fs`  
**Zichtbaar voor:** alleen admin-gebruikers (dennis.goosen)

Beheerpagina voor gebruikersaccounts:
- Lijst van alle gebruikers met naam, gebruikersnaam en admin-badge
- Nieuwe gebruiker aanmaken (naam, gebruikersnaam, wachtwoord, admin-vlag)
- Bestaande gebruiker bewerken (wachtwoord optioneel wijzigen)
- Gebruiker verwijderen (dennis.goosen zelf is beschermd)
- Duplicaat-gebruikersnaam detectie

---

#### `KlantenPage` (regel 328)
**Props:** `klanten, setKlanten, producten, agenda, kleur, fs`

Tweekoloms layout:
- **Links:** zoekbalk + klantenlijst (avatar, naam, e-mail, badge met aantal producten, bewerk/verwijder-knoppen)
- **Rechts:** detailpaneel van geselecteerde klant met 3 tabbladen:
  - **Info:** telefoon, adres, gekoppelde producten met prijzen en totaal
  - **Afspraken:** komende (gekleurd) en verleden afspraken (grijs), gesorteerd op datum
  - **Offertes:** lijst van opgeslagen offertes met referentie, datum, regels en totaal. Knop "📄 Openen" toont de volledige offerte in een overlay.

Modals: Nieuwe klant aanmaken / bewerken (naam, e-mail, telefoon, adres, producten koppelen via checkboxen).

**Offerte-viewer overlay:** toont `OffertePreview` voor de geselecteerde offerte van een klant. Bevat afdrukknop.

---

#### `ProductenPage` (regel 569)
**Props:** `producten, setProducten, kleur, fs`

Verticale lijstweergave (niet grid):
- **Categorie-tabs bovenin:** pills voor elke aanwezige categorie + "Alle". Telt producten per categorie. Actieve tab in accentkleur.
- **Zoekbalk:** filtert tegelijk op naam en beschrijving
- **Productrij:** gekleurde balk links, naam + categorie-badge, beschrijving, prijs rechts, bewerk + verwijder-knoppen
- **Bewerken-modal:** alle velden aanpasbaar, categorie met autocomplete datalist
- **Nieuw product:** naam (verplicht), prijs (verplicht), beschrijving, categorie

---

#### `AgendaPage` (regel 678)
**Props:** `klanten, agenda, setAgenda, kleur, fs`

Twee weergavemodi (schakelknop):
- **Lijstweergave:** afspraken gegroepeerd per datum, gesorteerd chronologisch. Per afspraak: tijdblokje, klantavatar, naam, notitie.
- **Uurblokken (Outlook-stijl):** 24 uurvakken voor de geselecteerde datum. Lege vakken highlighten bij hover en openen direct het aanmaakformulier met dat tijdstip vooringevuld.

Datum-filter boven de weergave. Afspraken verwijderen via ✕-knop.

**Aanmaakmodal:** klant via `KlantZoekBox` (geen dropdown), datum, tijd, notitie. Opslaan-knop uitgeschakeld zolang geen klant geselecteerd.

---

#### `OffertePreview` (regel 808)
**Props:** `offerte, klant, kleur`

Herbruikbare printklare offerteweergave. Gebruikt door zowel `OffertesPage` (stap 3) als de offerte-viewer in `KlantenPage`. Toont:
- Bedrijfsnaam, adres, IBAN, BTW-nummer
- Datum en referentienummer
- Klantgegevens
- Offertetekst (met `{klant_naam}` vervangen)
- Producttabel met subtotaal, BTW (optioneel) en totaal
- Voettekst met geldigheid en betaalgegevens

---

#### `OffertesPage` (regel 894)
**Props:** `klanten, setKlanten, producten, kleur, fs`

3-staps wizard:

**Stap 1 — Klant kiezen**
- `KlantZoekBox` voor bestaande klanten
- Geselecteerde klant getoond als kaartje (met × om te wissen)
- "Voeg nieuwe klant toe"-knop opent modal om direct een nieuwe klant aan te maken en te selecteren

**Stap 2 — Producten & regels**
- Categorie-filter tabs bovenin
- Producten in verticale lijst (zelfde stijl als `ProductenPage`)
- "+ Toevoegen"-knop per product; "+ nogmaals" als al toegevoegd
- Toegevoegde regels bewerkbaar onderaan (naam, prijs, toelichting)
- Checkbox "Variabele prijs" maakt prijs-invoerveld actief
- "Voeg eenmalig nog niet bestaand product toe"-knop voegt lege regel toe
- BTW-toggle (21%)
- Live subtotaal + totaal incl. BTW

**Stap 3 — Tekst & voorbeeld**
- Bedrijfsnaam, adres, IBAN, BTW-nummer, referentie
- Vrij tekstveld met `{klant_naam}` variabele
- Knoppen: Opslaan onder klant / Afdrukken / Nieuwe offerte
- Live voorbeeld via `OffertePreview`

Opgeslagen offertes worden gekoppeld aan de klant en zijn zichtbaar in het Offertes-tabblad van de klantenpagina.

---

#### `FinancieelPage` (regel ~1171)
**Props:** `klanten, setKlanten, kleur, fs`

Gecombineerd overzicht van alle opgeslagen offertes uit alle klanten:

- **Samenvattingskaarten bovenin:** Totaal gefactureerd (neutraal), Betaald (groen), Openstaand (rood) — elk met bedrag en aantal offertes. Kaarten volgen de actieve filters.
- **Filters:** klant (dropdown), datum-van, datum-tot, status-toggle (Alle / Openstaand / Betaald), "Wis filters"-knop. Teller toont het aantal resultaten.
- **Offerterijen:** gesorteerd op datum (nieuwste eerst). Per rij: betaald-cirkel, klantavatar, klantnaam + referentie + BETAALD-badge, datum + regeloverzicht, bedrag (groen als betaald), "📄 Openen"-knop.
- **Betaald markeren:** klik op de cirkel links van een rij. De rij dimmt subtiel en de BETAALD-badge verschijnt. Status wordt ook bijgewerkt in het klant-tabblad Offertes.
- **Offerte-viewer overlay:** identiek aan die in KlantenPage. Bevat ook een "Markeer als betaald/onbetaald"-knop direct in het overlay-venster.

---

#### `InstellingenPanel` (regel ~1340)
**Props:** `kleur, kleurIdx, setKleurIdx, fs, setFs, bgIdx, setBgIdx, onClose`

Pop-up paneel linksonder in de zijbalk. Bevat:
- **Tekstgrootte:** slider 12–20px + ± knoppen. Schaalt mee door de hele app.
- **Accentkleur:** 6 opties (Blauw, Groen, Paars, Oranje, Rood, Roze). Kleurt knoppen, badges, avatars, agenda, offerte-header.
- **Achtergrondkleur:** 6 opties (3 licht: Wit, Lichtgrijs, Zand; 3 donker: Leisteen, Nacht, Marineblauw). Donkere thema's passen automatisch tekst en zijbalk aan.

---

#### `DemoBanner` (regel 1218)
**Props:** `onUitloggen, fs`

Rode banner bovenaan het scherm in demo-modus. Twee staten:
- **Uitgevouwen:** groot rood blok met waarschuwingstekst, "Minimaliseren"- en "Terug naar inloggen"-knoppen
- **Ingeklapt:** smalle donkerrode balk met klikfunctie om te heropenen

---

#### `App` — hoofdcomponent (regel ~1450)
**State:**
| Variabele | Type | Beschrijving |
|-----------|------|--------------|
| `users` | array | Alle gebruikersaccounts |
| `huidigUser` | object\|null | Ingelogde gebruiker |
| `isDemoMode` | boolean | Of de demo-modus actief is |
| `alleKlanten` | object | Klanten per gebruiker-ID |
| `alleProducten` | object | Producten per gebruiker-ID |
| `alleAgenda` | object | Agenda per gebruiker-ID |
| `demoKlanten/Producten/Agenda` | arrays | Tijdelijke demo-data (reset bij uitloggen) |
| `pagina` | string | Actieve pagina: `klanten`, `producten`, `agenda`, `offertes`, `gebruikers` |
| `kleurIdx` | number | Index in `KLEUREN`-array |
| `fs` | number | Globale lettergrootte (12–20) |
| `bgIdx` | number | Index in `BGOVS`-array |
| `instellOpen` | boolean | Of het instellingenpaneel open is |

**Data-isolatie:** in demo-modus schrijven alle setters naar de demo-arrays, nooit naar de echte gebruikersdata. Bij uitloggen worden de demo-arrays gereset naar `DEMO_*` constanten.

**Navigatie:** admin-gebruikers zien een extra menu-item "🔐 Gebruikers". In demo-modus is dit verborgen.

---

## Datapstructuren

### Gebruiker
```js
{
  id: "u1",
  username: "dennis.goosen",
  passHash: "...",       // simpleHash van wachtwoord
  isAdmin: true,
  naam: "Dennis Goosen"
}
```

### Klant
```js
{
  id: "k1",
  naam: "Bedrijfsnaam",
  email: "info@bedrijf.nl",
  telefoon: "06-12345678",
  adres: "Straat 1, 1234 AB Stad",
  producten: ["p1", "p3"],  // array van product-ID's
  offertes: []              // array van opgeslagen offerte-objecten
}
```

### Product
```js
{
  id: "p1",
  naam: "Website Pakket Basic",
  prijs: 1200,              // getal, geen string
  beschrijving: "...",
  categorie: "Web"
}
```

### Afspraak
```js
{
  id: "a1",
  klantId: "k1",
  datum: "2026-06-10",      // ISO-formaat YYYY-MM-DD
  tijd: "10:00",            // HH:MM
  notitie: "..."
}
```

### Offerte
```js
{
  id: "o1",
  referentie: "OFF-2026-001",
  datum: "2026-06-03",      // ISO-formaat
  regels: [
    { id: "r1", naam: "Product A", beschrijving: "...", prijs: 1200, isVariabel: false }
  ],
  totaalInclBtw: 1452,
  inclBtw: true,
  bedrijfsnaam: "Uw Bedrijf",
  bedrijfAdres: "Adres 1, 1234 AB",
  iban: "NL00 BANK 0000 0000 00",
  btwNr: "NL000000000B01",
  template: "Geachte {klant_naam}, ..."
}
```

---

## Inloggegevens

| Gebruiker | Wachtwoord | Rechten |
|-----------|-----------|---------|
| `dennis.goosen` | `Tijdelijk1` | Admin (gebruikersbeheer) |
| `demo` | `Demo123` | Standaard |

> ⚠️ Wachtwoorden worden opgeslagen als een eenvoudige client-side hash. Dit is **niet veilig voor productie**. Koppel een echte backend-authenticatie voor live gebruik.

---

## Bekende beperkingen & toekomstige verbeteringen

- [ ] **Backend koppeling** — data leeft nu alleen in browser-state. Bij herladen gaat alles verloren. Koppel aan een REST API + MSSQL voor persistentie.
- [ ] **Echte authenticatie** — vervang `simpleHash` door een JWT/OAuth-flow via de backend.
- [ ] **Offerte PDF-export** — "Afdrukken" gebruikt `window.print()`. Integreer een PDF-bibliotheek (bijv. `jsPDF`) voor directe download.
- [ ] **Meerdere offertes bewerken** — opgeslagen offertes zijn nu read-only. Voeg bewerkfunctionaliteit toe.
- [ ] **Klant zoeken in agenda-blokweergave** — bij klik op leeg uurvak opent al het juiste tijdstip, maar de klant-zoekbox reset nog.
- [ ] **Notificaties** — herinnering voor aankomende afspraken.

---

## GitHub-integratie

Zie `.github/workflows/deploy.yml` voor de automatische GitHub Actions workflow die bij elke push de laatste versie commit en optioneel deployt naar GitHub Pages.

---

*README bijgehouden door: DenCRM project*  
*Laatste update: 2026-06-03 22:30*
