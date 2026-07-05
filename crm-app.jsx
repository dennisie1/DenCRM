import { useState, useRef, useEffect } from "react";
import * as API from './api.js';

// ── Vertalingen ───────────────────────────────────────────────
const VERTALINGEN = {
  nl: {
    // Algemeen
    appNaam: "DenCRM",
    appOndertitel: "De registratietool voor ondernemers",
    opslaan: "Opslaan",
    annuleren: "Annuleren",
    verwijderen: "Verwijderen",
    bewerken: "Bewerken",
    nieuw: "Nieuw",
    zoeken: "Zoeken",
    sluiten: "Sluiten",
    laden: "DenCRM laden…",
    ja: "Ja",
    nee: "Nee",
    van: "Van",
    tot: "Tot",
    alle: "Alle",
    terug: "← Terug",
    volgende: "Volgende →",
    geen: "Geen",
    bezig: "Bezig…",
    // Login
    inloggen: "Inloggen",
    uitloggen: "Uitloggen",
    gebruikersnaam: "Gebruikersnaam",
    wachtwoord: "Wachtwoord",
    inlogMislukt: "Inloggen mislukt.",
    vulAllesIn: "Vul gebruikersnaam en wachtwoord in.",
    probeerApp: "Probeer de applicatie",
    demoOndertitel: "Demo modus — wijzigingen worden niet opgeslagen",
    maakAccount: "Maak een account aan",
    // Registratie
    naam: "Naam",
    bedrijfsnaam: "Bedrijfsnaam",
    emailadres: "E-mailadres",
    naamVerplicht: "Naam is verplicht.",
    emailOngeldig: "Vul een geldig e-mailadres in.",
    registratieMislukt: "Registratie mislukt.",
    accountAangevraagd: "Aanvraag ontvangen!",
    activatieMailInfo: "Zodra de mailserver gekoppeld is ontvangt",
    activatieMailInfo2: "een activatiemail met een link om een wachtwoord in te stellen.",
    optioneel: "optioneel",
    // Navigatie
    klanten: "Klanten",
    producten: "Producten",
    agenda: "Agenda",
    offertes: "Offertes & Facturen",
    financieel: "Financieel",
    gebruikers: "Gebruikers",
    instellingen: "Instellingen",
    // Demo
    demoModus: "Demo modus",
    demoBannerTitel: "U bevindt zich in de demo modus",
    demoBannerTekst: "Alle wijzigingen die u maakt worden niet opgeslagen en gaan verloren zodra u de pagina sluit of uitlogt. U werkt met voorbeelddata.",
    minimaliseren: "▲ Minimaliseren",
    terugNaarLogin: "← Terug naar inloggen",
    demoActief: "Demo modus actief",
    // Klanten
    nieuweKlant: "Nieuwe klant",
    klantBewerken: "Klant bewerken",
    zoekKlantPlaceholder: "Zoek op naam of e-mail…",
    selecteerKlant: "Selecteer een klant om details te zien",
    telefoon: "Telefoon",
    adres: "Adres",
    afgenomenProducten: "Afgenomen producten",
    geenProducten: "Geen producten gekoppeld.",
    totaal: "Totaal",
    productenKoppelen: "Producten koppelen",
    klantVerwijderen: "Klant verwijderen?",
    geenKlantenGevonden: "Geen klanten gevonden.",
    info: "Info",
    afspraken: "Afspraken",
    komend: "KOMEND",
    verleden: "VERLEDEN",
    geenAfspraken: "Geen afspraken gevonden.",
    nogGeenOffertes: "Nog geen offertes opgeslagen.",
    offerteOpenen: "📄 Openen",
    // Producten
    nieuwProduct: "Nieuw product",
    productBewerken: "Product bewerken",
    productNaam: "Productnaam",
    verkoopprijs: "Verkoopprijs (€)",
    inkoopprijs: "Inkoopprijs (€)",
    beschrijving: "Beschrijving",
    categorie: "Categorie",
    voorraad: "Voorraad",
    aantalOpVoorraad: "Aantal op voorraad",
    productVerwijderen: "Product verwijderen?",
    categorieToevoegen: "Categorie toevoegen",
    nieuweCategorieNaam: "Nieuwe categorie naam",
    categorieVerwijderen: "Categorie verwijderen?",
    categorieBestaatAl: "Deze categorie bestaat al.",
    geenProductenGevonden: "Geen producten gevonden",
    // Agenda
    nieuweAfspraak: "Nieuwe afspraak",
    afspraakBewerken: "Afspraak bewerken",
    klantZoeken: "Klant zoeken",
    datum: "Datum",
    vanaf: "Vanaf",
    tijdTot: "Tot",
    notitie: "Notitie",
    afspraakVerwijderen: "Afspraak verwijderen?",
    uurblokken: "⊞ Uurblokken",
    lijst: "☰ Lijst",
    klikToevoegen: "+ Klik om afspraak toe te voegen",
    datumLabel: "📅 Datum:",
    // Offertes
    klantKiezen: "Klant kiezen",
    productenEnRegels: "Producten & regels",
    tekstEnVoorbeeld: "Tekst & voorbeeld",
    klantSelecteren: "Klant zoeken",
    zoekBestaandeKlant: "Zoek een bestaande klant of voeg een nieuwe klant toe.",
    voegNieuweKlantToe: "+ Voeg nieuwe klant toe",
    nieuweKlantToevoegen: "Nieuwe klant toevoegen",
    klantToevoegenSelecteren: "Klant toevoegen & selecteren",
    offerteRegels: "Offerteregels",
    geselecteerdeRegels: "Geselecteerde regels",
    voegEenmaligToe: "+ Voeg eenmalig nog niet bestaand product toe",
    btwToevoegen: "BTW (21%) toevoegen aan totaal",
    slaOpOnderKlant: "💾 Opslaan onder klant",
    opgeslagen: "✓ Opgeslagen",
    nieuweOfferte: "Nieuwe offerte",
    mailenNaarKlant: "✉ Mailen naar klant",
    geenMailadres: "✉ Geen mailadres bekend",
    referentienummer: "Referentienummer",
    iBAN: "IBAN rekeningnummer",
    btwNummer: "BTW-nummer",
    uwBedrijfsnaam: "Uw bedrijfsnaam",
    uwAdres: "Uw adres",
    offertetekst: "Offertetekst (gebruik {klant_naam} als variabele)",
    afdrukken: "🖨 Afdrukken / PDF",
    selecteerProducten: "Producten selecteren voor offerte",
    // Financieel
    totaalGefactureerd: "Totaal gefactureerd",
    betaald: "Betaald",
    openstaand: "Openstaand",
    alleKlanten: "Alle klanten",
    wisFilters: "✕ Wis filters",
    exporteerPrint: "📊 Exporteer / Print",
    losseFactuur: "+ Losse factuur",
    losseFactuurAanmaken: "Losse factuur aanmaken",
    factuurAanmaken: "💾 Factuur aanmaken",
    regelToevoegen: "+ Regel toevoegen",
    exportTitel: "Exporteer / Print overzicht",
    kiesTijdsperiode: "Kies de tijdsperiode voor het overzicht. Laat leeg voor alle documenten.",
    mailenNaarMijzelf: "✉ Mailen naar mijn mailadres",
    markerenAlsBetaald: "○ Markeer als betaald",
    geenDocumenten: "Geen documenten gevonden met de huidige filters.",
    // Instellingen
    tekstgrootte: "TEKSTGROOTTE",
    accentkleur: "ACCENTKLEUR",
    achtergrondkleur: "ACHTERGRONDKLEUR",
    klein: "Klein",
    groot: "Groot",
    // Profiel
    profiel: "Profiel",
    wachtwoordWijzigen: "Wachtwoord",
    huidigWachtwoord: "Huidig wachtwoord",
    nieuwWachtwoord: "Nieuw wachtwoord",
    bevestigWachtwoord: "Bevestig nieuw wachtwoord",
    wachtwoordOpslaan: "Wachtwoord opslaan",
    wachtwoordGewijzigd: "Wachtwoord succesvol gewijzigd!",
    wachtwoordKloptNiet: "Huidig wachtwoord klopt niet.",
    wachtwoordTeKort: "Wachtwoord moet minimaal 8 tekens, 1 hoofdletter en 1 speciaal teken bevatten.",
    wachtwoordNietOvereen: "Wachtwoorden komen niet overeen.",
    rechten: "Rechten",
    administrator: "Administrator",
    standaardGebruiker: "Standaard gebruiker",
    // Gebruikersbeheer
    nieuweGebruiker: "Nieuwe gebruiker",
    gebruikerBewerken: "Gebruiker bewerken",
    adminRechten: "Admin-rechten (toegang tot gebruikersbeheer)",
    gebruikerVerwijderen: "Verwijderen?",
    gebruikersnaamInGebruik: "Gebruikersnaam al in gebruik.",
    naamEnUsernameVerplicht: "Naam en gebruikersnaam zijn verplicht.",
    wachtwoordVerplicht: "Vul een wachtwoord in.",
    nieuwWachtwoordOptioneel: "Nieuw wachtwoord (leeg = ongewijzigd)",
    volledigeNaam: "Volledige naam",
    admin: "Admin",
    // Kassa
    kassa: "Kassa",
    bonTemplate: "Bon template",
    logeRegelToevoegen: "+ Los product toevoegen",
    afrekenen: "Afrekenen",
    nieuweBon: "Nieuwe bon",
    klassiekebon: "🧾 Klassieke bon",
    a4pdf: "📄 A4 PDF",
    bonTemplateAanpassen: "⚙ Bon template aanpassen",
    kortingToevoegen: "🏷 Korting",
    betaalMethode: "Betaalmethode",
    contant: "💵 Contant",
    pin: "💳 Pin",
    overig: "📋 Overig",
    dagomzet: "Vandaag verkocht",
    bonnen: "bonnen",
    // Werkbonnen
    werkbonnen: "Werkbonnen & Reparaties",
    nieuweWerkbon: "Nieuwe werkbon",
    werkbonBewerken: "Werkbon bewerken",
    productOmschrijving: "Te repareren product",
    datumInname: "Datum inname",
    klaarVoor: "Klaar voor datum",
    klacht: "Klacht / Reden",
    onderdelen: "Benodigde onderdelen",
    statusNieuw: "Nieuw",
    statusInBehandeling: "In behandeling",
    statusWachtOnderdelen: "Wacht op onderdelen",
    statusKlaar: "Klaar",
    statusAfgeleverd: "Afgeleverd",
    // Declaraties
    declaraties: "Declaraties & Boekhouding",
    nieuweDeclaratie: "Nieuwe declaratie",
    omschrijving: "Omschrijving",
    leverancier: "Leverancier",
    bedragExclBtw: "Bedrag excl. BTW",
    btwPercentage: "BTW-percentage",
    btwAftrekbaar: "BTW aftrekbaar",
    bonnetjeUpload: "Bonnetje / factuur",
    afschrijvingen: "Bedrijfsmiddelen & afschrijvingen",
    nieuwBedrijfsmiddel: "Nieuw bedrijfsmiddel",
    aanschafprijs: "Aanschafprijs",
    restwaarde: "Restwaarde",
    looptijdJaren: "Looptijd (jaren)",
    aankoopdatum: "Aankoopdatum",
    boekwaarde: "Boekwaarde",
    // Belastingoverzicht
    belastingoverzicht: "Belastingoverzicht",
    omzetLabel: "Omzet",
    kostenLabel: "Kosten",
    btwSaldo: "Btw-saldo",
    nettoResultaat: "Netto resultaat",
    teBetalen: "Te betalen",
    teOntvangen: "Terug te ontvangen",
    periodeKiezen: "Periode kiezen",
    perKwartaal: "Per kwartaal",
    vrijePeriode: "Vrije periode",
    genereer: "Genereer overzicht",
    // Reviews
    plaatsReview: "Plaats een Review",
    reviewPlaatsen: "✓ Review plaatsen",
    geenReview: "Nee, ik wil geen review plaatsen",
    // Contact
    contact: "Contact",
    supportInbox: "Support inbox",
  },

  en: {
    appNaam: "DenCRM",
    appOndertitel: "The registration tool for entrepreneurs",
    opslaan: "Save",
    annuleren: "Cancel",
    verwijderen: "Delete",
    bewerken: "Edit",
    nieuw: "New",
    zoeken: "Search",
    sluiten: "Close",
    laden: "Loading DenCRM…",
    ja: "Yes",
    nee: "No",
    van: "From",
    tot: "To",
    alle: "All",
    terug: "← Back",
    volgende: "Next →",
    geen: "None",
    bezig: "Loading…",
    inloggen: "Sign in",
    uitloggen: "Sign out",
    gebruikersnaam: "Username",
    wachtwoord: "Password",
    inlogMislukt: "Login failed.",
    vulAllesIn: "Please enter your username and password.",
    probeerApp: "Try the application",
    demoOndertitel: "Demo mode — changes will not be saved",
    maakAccount: "Create an account",
    naam: "Name",
    bedrijfsnaam: "Company name",
    emailadres: "Email address",
    naamVerplicht: "Name is required.",
    emailOngeldig: "Please enter a valid email address.",
    registratieMislukt: "Registration failed.",
    accountAangevraagd: "Request received!",
    activatieMailInfo: "Once the mail server is connected,",
    activatieMailInfo2: "will receive an activation email with a link to set a password.",
    optioneel: "optional",
    klanten: "Customers",
    producten: "Products",
    agenda: "Calendar",
    offertes: "Quotes & Invoices",
    financieel: "Financial",
    gebruikers: "Users",
    instellingen: "Settings",
    demoModus: "Demo mode",
    demoBannerTitel: "You are in demo mode",
    demoBannerTekst: "All changes you make will not be saved and will be lost when you close the page or log out. You are working with example data.",
    minimaliseren: "▲ Minimize",
    terugNaarLogin: "← Back to login",
    demoActief: "Demo mode active",
    nieuweKlant: "New customer",
    klantBewerken: "Edit customer",
    zoekKlantPlaceholder: "Search by name or email…",
    selecteerKlant: "Select a customer to view details",
    telefoon: "Phone",
    adres: "Address",
    afgenomenProducten: "Purchased products",
    geenProducten: "No products linked.",
    totaal: "Total",
    productenKoppelen: "Link products",
    klantVerwijderen: "Delete customer?",
    geenKlantenGevonden: "No customers found.",
    info: "Info",
    afspraken: "Appointments",
    komend: "UPCOMING",
    verleden: "PAST",
    geenAfspraken: "No appointments found.",
    nogGeenOffertes: "No quotes saved yet.",
    offerteOpenen: "📄 Open",
    nieuwProduct: "New product",
    productBewerken: "Edit product",
    productNaam: "Product name",
    verkoopprijs: "Sales price (€)",
    inkoopprijs: "Purchase price (€)",
    beschrijving: "Description",
    categorie: "Category",
    voorraad: "Stock",
    aantalOpVoorraad: "Units in stock",
    productVerwijderen: "Delete product?",
    categorieToevoegen: "Add category",
    nieuweCategorieNaam: "New category name",
    categorieVerwijderen: "Delete category?",
    categorieBestaatAl: "This category already exists.",
    geenProductenGevonden: "No products found",
    nieuweAfspraak: "New appointment",
    afspraakBewerken: "Edit appointment",
    klantZoeken: "Search customer",
    datum: "Date",
    vanaf: "From",
    tijdTot: "To",
    notitie: "Note",
    afspraakVerwijderen: "Delete appointment?",
    uurblokken: "⊞ Hour blocks",
    lijst: "☰ List",
    klikToevoegen: "+ Click to add appointment",
    datumLabel: "📅 Date:",
    klantKiezen: "Choose customer",
    productenEnRegels: "Products & lines",
    tekstEnVoorbeeld: "Text & preview",
    klantSelecteren: "Search customer",
    zoekBestaandeKlant: "Search an existing customer or add a new one.",
    voegNieuweKlantToe: "+ Add new customer",
    nieuweKlantToevoegen: "Add new customer",
    klantToevoegenSelecteren: "Add customer & select",
    offerteRegels: "Quote lines",
    geselecteerdeRegels: "Selected lines",
    voegEenmaligToe: "+ Add one-time product",
    btwToevoegen: "Add VAT (21%) to total",
    slaOpOnderKlant: "💾 Save under customer",
    opgeslagen: "✓ Saved",
    nieuweOfferte: "New quote",
    mailenNaarKlant: "✉ Email to customer",
    geenMailadres: "✉ No email address known",
    referentienummer: "Reference number",
    iBAN: "IBAN account number",
    btwNummer: "VAT number",
    uwBedrijfsnaam: "Your company name",
    uwAdres: "Your address",
    offertetekst: "Quote text (use {klant_naam} as variable)",
    afdrukken: "🖨 Print / PDF",
    selecteerProducten: "Select products for quote",
    totaalGefactureerd: "Total invoiced",
    betaald: "Paid",
    openstaand: "Outstanding",
    alleKlanten: "All customers",
    wisFilters: "✕ Clear filters",
    exporteerPrint: "📊 Export / Print",
    losseFactuur: "+ Standalone invoice",
    losseFactuurAanmaken: "Create standalone invoice",
    factuurAanmaken: "💾 Create invoice",
    regelToevoegen: "+ Add line",
    exportTitel: "Export / Print overview",
    kiesTijdsperiode: "Choose the time period for the overview. Leave empty for all documents.",
    mailenNaarMijzelf: "✉ Email to my address",
    markerenAlsBetaald: "○ Mark as paid",
    geenDocumenten: "No documents found with the current filters.",
    tekstgrootte: "FONT SIZE",
    accentkleur: "ACCENT COLOR",
    achtergrondkleur: "BACKGROUND COLOR",
    klein: "Small",
    groot: "Large",
    profiel: "Profile",
    wachtwoordWijzigen: "Password",
    huidigWachtwoord: "Current password",
    nieuwWachtwoord: "New password",
    bevestigWachtwoord: "Confirm new password",
    wachtwoordOpslaan: "Save password",
    wachtwoordGewijzigd: "Password changed successfully!",
    wachtwoordKloptNiet: "Current password is incorrect.",
    wachtwoordTeKort: "Password must be at least 8 characters, 1 uppercase letter and 1 special character.",
    wachtwoordNietOvereen: "Passwords do not match.",
    rechten: "Permissions",
    administrator: "Administrator",
    standaardGebruiker: "Standard user",
    nieuweGebruiker: "New user",
    gebruikerBewerken: "Edit user",
    adminRechten: "Admin rights (access to user management)",
    gebruikerVerwijderen: "Delete?",
    gebruikersnaamInGebruik: "Username already in use.",
    naamEnUsernameVerplicht: "Name and username are required.",
    wachtwoordVerplicht: "Please enter a password.",
    nieuwWachtwoordOptioneel: "New password (leave empty to keep current)",
    volledigeNaam: "Full name",
    admin: "Admin",
    // Kassa
    kassa: "Cash Register",
    bonTemplate: "Receipt template",
    logeRegelToevoegen: "+ Add loose line",
    afrekenen: "Checkout",
    nieuweBon: "New receipt",
    klassiekebon: "🧾 Classic receipt",
    a4pdf: "📄 A4 PDF",
    bonTemplateAanpassen: "⚙ Customize receipt template",
    kortingToevoegen: "🏷 Discount",
    betaalMethode: "Payment method",
    contant: "💵 Cash",
    pin: "💳 Card",
    overig: "📋 Other",
    dagomzet: "Today's revenue",
    bonnen: "receipts",
    // Werkbonnen
    werkbonnen: "Work Orders & Repairs",
    nieuweWerkbon: "New work order",
    werkbonBewerken: "Edit work order",
    productOmschrijving: "Item to repair",
    datumInname: "Date received",
    klaarVoor: "Ready by date",
    klacht: "Issue / Reason",
    onderdelen: "Required parts",
    statusNieuw: "New",
    statusInBehandeling: "In progress",
    statusWachtOnderdelen: "Waiting for parts",
    statusKlaar: "Ready",
    statusAfgeleverd: "Delivered",
    // Declaraties
    declaraties: "Expenses & Bookkeeping",
    nieuweDeclaratie: "New expense",
    omschrijving: "Description",
    leverancier: "Supplier",
    bedragExclBtw: "Amount excl. VAT",
    btwPercentage: "VAT percentage",
    btwAftrekbaar: "VAT deductible",
    bonnetjeUpload: "Receipt / invoice",
    afschrijvingen: "Assets & depreciation",
    nieuwBedrijfsmiddel: "New asset",
    aanschafprijs: "Purchase price",
    restwaarde: "Residual value",
    looptijdJaren: "Useful life (years)",
    aankoopdatum: "Purchase date",
    boekwaarde: "Book value",
    // Belastingoverzicht
    belastingoverzicht: "Tax overview",
    omzetLabel: "Revenue",
    kostenLabel: "Costs",
    btwSaldo: "VAT balance",
    nettoResultaat: "Net result",
    teBetalen: "Amount due",
    teOntvangen: "Amount refundable",
    periodeKiezen: "Choose period",
    perKwartaal: "Per quarter",
    vrijePeriode: "Custom period",
    genereer: "Generate overview",
    // Reviews
    plaatsReview: "Place a Review",
    reviewPlaatsen: "✓ Submit review",
    geenReview: "No, I don't want to place a review",
    // Contact
    contact: "Contact",
    supportInbox: "Support inbox",
  },

  de: {
    appNaam: "DenCRM",
    appOndertitel: "Das Registrierungstool für Unternehmer",
    opslaan: "Speichern",
    annuleren: "Abbrechen",
    verwijderen: "Löschen",
    bewerken: "Bearbeiten",
    nieuw: "Neu",
    zoeken: "Suchen",
    sluiten: "Schließen",
    laden: "DenCRM wird geladen…",
    ja: "Ja",
    nee: "Nein",
    van: "Von",
    tot: "Bis",
    alle: "Alle",
    terug: "← Zurück",
    volgende: "Weiter →",
    geen: "Keine",
    bezig: "Laden…",
    inloggen: "Anmelden",
    uitloggen: "Abmelden",
    gebruikersnaam: "Benutzername",
    wachtwoord: "Passwort",
    inlogMislukt: "Anmeldung fehlgeschlagen.",
    vulAllesIn: "Bitte Benutzername und Passwort eingeben.",
    probeerApp: "Anwendung ausprobieren",
    demoOndertitel: "Demo-Modus — Änderungen werden nicht gespeichert",
    maakAccount: "Konto erstellen",
    naam: "Name",
    bedrijfsnaam: "Firmenname",
    emailadres: "E-Mail-Adresse",
    naamVerplicht: "Name ist erforderlich.",
    emailOngeldig: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    registratieMislukt: "Registrierung fehlgeschlagen.",
    accountAangevraagd: "Anfrage erhalten!",
    activatieMailInfo: "Sobald der Mailserver verbunden ist, erhält",
    activatieMailInfo2: "eine Aktivierungs-E-Mail mit einem Link zum Festlegen eines Passworts.",
    optioneel: "optional",
    klanten: "Kunden",
    producten: "Produkte",
    agenda: "Kalender",
    offertes: "Angebote & Rechnungen",
    financieel: "Finanzen",
    gebruikers: "Benutzer",
    instellingen: "Einstellungen",
    demoModus: "Demo-Modus",
    demoBannerTitel: "Sie befinden sich im Demo-Modus",
    demoBannerTekst: "Alle Änderungen werden nicht gespeichert und gehen verloren, wenn Sie die Seite schließen oder abmelden. Sie arbeiten mit Beispieldaten.",
    minimaliseren: "▲ Minimieren",
    terugNaarLogin: "← Zurück zur Anmeldung",
    demoActief: "Demo-Modus aktiv",
    nieuweKlant: "Neuer Kunde",
    klantBewerken: "Kunde bearbeiten",
    zoekKlantPlaceholder: "Nach Name oder E-Mail suchen…",
    selecteerKlant: "Wählen Sie einen Kunden aus",
    telefoon: "Telefon",
    adres: "Adresse",
    afgenomenProducten: "Gekaufte Produkte",
    geenProducten: "Keine Produkte verknüpft.",
    totaal: "Gesamt",
    productenKoppelen: "Produkte verknüpfen",
    klantVerwijderen: "Kunden löschen?",
    geenKlantenGevonden: "Keine Kunden gefunden.",
    info: "Info",
    afspraken: "Termine",
    komend: "BEVORSTEHEND",
    verleden: "VERGANGEN",
    geenAfspraken: "Keine Termine gefunden.",
    nogGeenOffertes: "Noch keine Angebote gespeichert.",
    offerteOpenen: "📄 Öffnen",
    nieuwProduct: "Neues Produkt",
    productBewerken: "Produkt bearbeiten",
    productNaam: "Produktname",
    verkoopprijs: "Verkaufspreis (€)",
    inkoopprijs: "Einkaufspreis (€)",
    beschrijving: "Beschreibung",
    categorie: "Kategorie",
    voorraad: "Lagerbestand",
    aantalOpVoorraad: "Stück auf Lager",
    productVerwijderen: "Produkt löschen?",
    categorieToevoegen: "Kategorie hinzufügen",
    nieuweCategorieNaam: "Neuer Kategoriename",
    categorieVerwijderen: "Kategorie löschen?",
    categorieBestaatAl: "Diese Kategorie existiert bereits.",
    geenProductenGevonden: "Keine Produkte gefunden",
    nieuweAfspraak: "Neuer Termin",
    afspraakBewerken: "Termin bearbeiten",
    klantZoeken: "Kunden suchen",
    datum: "Datum",
    vanaf: "Von",
    tijdTot: "Bis",
    notitie: "Notiz",
    afspraakVerwijderen: "Termin löschen?",
    uurblokken: "⊞ Stundenblöcke",
    lijst: "☰ Liste",
    klikToevoegen: "+ Klicken um Termin hinzuzufügen",
    datumLabel: "📅 Datum:",
    klantKiezen: "Kunden wählen",
    productenEnRegels: "Produkte & Zeilen",
    tekstEnVoorbeeld: "Text & Vorschau",
    klantSelecteren: "Kunden suchen",
    zoekBestaandeKlant: "Suchen Sie einen bestehenden Kunden oder fügen Sie einen neuen hinzu.",
    voegNieuweKlantToe: "+ Neuen Kunden hinzufügen",
    nieuweKlantToevoegen: "Neuen Kunden hinzufügen",
    klantToevoegenSelecteren: "Kunden hinzufügen & auswählen",
    offerteRegels: "Angebotspositionen",
    geselecteerdeRegels: "Ausgewählte Positionen",
    voegEenmaligToe: "+ Einmaliges Produkt hinzufügen",
    btwToevoegen: "MwSt. (21%) zum Gesamtbetrag hinzufügen",
    slaOpOnderKlant: "💾 Unter Kunde speichern",
    opgeslagen: "✓ Gespeichert",
    nieuweOfferte: "Neues Angebot",
    mailenNaarKlant: "✉ Per E-Mail an Kunden",
    geenMailadres: "✉ Keine E-Mail-Adresse bekannt",
    referentienummer: "Referenznummer",
    iBAN: "IBAN Kontonummer",
    btwNummer: "USt-IdNr.",
    uwBedrijfsnaam: "Ihr Firmenname",
    uwAdres: "Ihre Adresse",
    offertetekst: "Angebotstext (verwenden Sie {klant_naam} als Variable)",
    afdrukken: "🖨 Drucken / PDF",
    selecteerProducten: "Produkte für Angebot auswählen",
    totaalGefactureerd: "Gesamt fakturiert",
    betaald: "Bezahlt",
    openstaand: "Ausstehend",
    alleKlanten: "Alle Kunden",
    wisFilters: "✕ Filter löschen",
    exporteerPrint: "📊 Exportieren / Drucken",
    losseFactuur: "+ Einzelrechnung",
    losseFactuurAanmaken: "Einzelrechnung erstellen",
    factuurAanmaken: "💾 Rechnung erstellen",
    regelToevoegen: "+ Zeile hinzufügen",
    exportTitel: "Exportieren / Drucken Übersicht",
    kiesTijdsperiode: "Wählen Sie den Zeitraum für die Übersicht. Leer lassen für alle Dokumente.",
    mailenNaarMijzelf: "✉ An meine E-Mail-Adresse",
    markerenAlsBetaald: "○ Als bezahlt markieren",
    geenDocumenten: "Keine Dokumente mit den aktuellen Filtern gefunden.",
    tekstgrootte: "SCHRIFTGRÖSSE",
    accentkleur: "AKZENTFARBE",
    achtergrondkleur: "HINTERGRUNDFARBE",
    klein: "Klein",
    groot: "Groß",
    profiel: "Profil",
    wachtwoordWijzigen: "Passwort",
    huidigWachtwoord: "Aktuelles Passwort",
    nieuwWachtwoord: "Neues Passwort",
    bevestigWachtwoord: "Neues Passwort bestätigen",
    wachtwoordOpslaan: "Passwort speichern",
    wachtwoordGewijzigd: "Passwort erfolgreich geändert!",
    wachtwoordKloptNiet: "Aktuelles Passwort ist falsch.",
    wachtwoordTeKort: "Passwort muss mindestens 8 Zeichen, 1 Großbuchstaben und 1 Sonderzeichen enthalten.",
    wachtwoordNietOvereen: "Passwörter stimmen nicht überein.",
    rechten: "Berechtigungen",
    administrator: "Administrator",
    standaardGebruiker: "Standardbenutzer",
    nieuweGebruiker: "Neuer Benutzer",
    gebruikerBewerken: "Benutzer bearbeiten",
    adminRechten: "Adminrechte (Zugang zur Benutzerverwaltung)",
    gebruikerVerwijderen: "Löschen?",
    gebruikersnaamInGebruik: "Benutzername bereits vergeben.",
    naamEnUsernameVerplicht: "Name und Benutzername sind erforderlich.",
    wachtwoordVerplicht: "Bitte geben Sie ein Passwort ein.",
    nieuwWachtwoordOptioneel: "Neues Passwort (leer lassen um beizubehalten)",
    volledigeNaam: "Vollständiger Name",
    admin: "Admin",
    // Kassa
    kassa: "Kasse",
    bonTemplate: "Bon-Vorlage",
    logeRegelToevoegen: "+ Freie Zeile hinzufügen",
    afrekenen: "Abrechnen",
    nieuweBon: "Neuer Bon",
    klassiekebon: "🧾 Klassischer Bon",
    a4pdf: "📄 A4 PDF",
    bonTemplateAanpassen: "⚙ Bon-Vorlage anpassen",
    kortingToevoegen: "🏷 Rabatt",
    betaalMethode: "Zahlungsmethode",
    contant: "💵 Bar",
    pin: "💳 Karte",
    overig: "📋 Sonstige",
    dagomzet: "Heutiger Umsatz",
    bonnen: "Bons",
    // Werkbonnen
    werkbonnen: "Werkaufträge & Reparaturen",
    nieuweWerkbon: "Neuer Werkauftrag",
    werkbonBewerken: "Werkauftrag bearbeiten",
    productOmschrijving: "Zu reparierender Artikel",
    datumInname: "Eingangsdatum",
    klaarVoor: "Fertig bis",
    klacht: "Problem / Grund",
    onderdelen: "Benötigte Teile",
    statusNieuw: "Neu",
    statusInBehandeling: "In Bearbeitung",
    statusWachtOnderdelen: "Warte auf Teile",
    statusKlaar: "Fertig",
    statusAfgeleverd: "Geliefert",
    // Declaraties
    declaraties: "Ausgaben & Buchhaltung",
    nieuweDeclaratie: "Neue Ausgabe",
    omschrijving: "Beschreibung",
    leverancier: "Lieferant",
    bedragExclBtw: "Betrag exkl. MwSt.",
    btwPercentage: "MwSt.-Satz",
    btwAftrekbaar: "MwSt. abzugsfähig",
    bonnetjeUpload: "Beleg / Rechnung",
    afschrijvingen: "Anlagegüter & Abschreibungen",
    nieuwBedrijfsmiddel: "Neues Anlagegut",
    aanschafprijs: "Anschaffungspreis",
    restwaarde: "Restwert",
    looptijdJaren: "Nutzungsdauer (Jahre)",
    aankoopdatum: "Kaufdatum",
    boekwaarde: "Buchwert",
    // Belastingoverzicht
    belastingoverzicht: "Steuerübersicht",
    omzetLabel: "Umsatz",
    kostenLabel: "Kosten",
    btwSaldo: "MwSt.-Saldo",
    nettoResultaat: "Nettoergebnis",
    teBetalen: "Zu zahlen",
    teOntvangen: "Zu erstatten",
    periodeKiezen: "Zeitraum wählen",
    perKwartaal: "Pro Quartal",
    vrijePeriode: "Freier Zeitraum",
    genereer: "Übersicht generieren",
    // Reviews
    plaatsReview: "Bewertung abgeben",
    reviewPlaatsen: "✓ Bewertung senden",
    geenReview: "Nein, ich möchte keine Bewertung abgeben",
    // Contact
    contact: "Kontakt",
    supportInbox: "Support-Posteingang",
  },
};

// Taal context — wordt doorgegeven via props
const VLAGGEN = {
  nl: "🇳🇱",
  en: "🇬🇧",
  de: "🇩🇪",
};


// ── Wachtwoord validatie ──────────────────────────────────────
function valideerWachtwoord(ww) {
  const regels = [
    { ok: ww.length >= 8,           tekst: "Minimaal 8 tekens" },
    { ok: /[A-Z]/.test(ww),         tekst: "Minimaal 1 hoofdletter" },
    { ok: /[!@#$%^&*()_+\-=\[\]{};':"\|,.<>\/?`~]/.test(ww), tekst: "Minimaal 1 speciaal teken (!@#$...)" },
  ];
  return regels;
}

function WachtwoordSterkte({ ww }) {
  if (!ww) return null;
  const regels = valideerWachtwoord(ww);
  const aantalOk = regels.filter(r => r.ok).length;
  const kleuren = ['#e8e8e8', '#e8e8e8', '#e8e8e8'];
  if (aantalOk >= 1) kleuren[0] = '#e8a32d';
  if (aantalOk >= 2) kleuren[1] = '#e8a32d';
  if (aantalOk >= 3) { kleuren[0] = '#3b6d11'; kleuren[1] = '#3b6d11'; kleuren[2] = '#3b6d11'; }
  return (
    <div style={{ marginTop:6 }}>
      <div style={{ display:"flex", gap:4, marginBottom:6 }}>
        {kleuren.map((k,i) => (
          <div key={i} style={{ flex:1, height:4, borderRadius:2, background:k, transition:"background 0.2s" }} />
        ))}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
        {regels.map(r => (
          <span key={r.tekst} style={{ fontSize:11, color: r.ok ? "#3b6d11" : "#888",
            display:"flex", alignItems:"center", gap:4 }}>
            {r.ok ? "✓" : "○"} {r.tekst}
          </span>
        ))}
      </div>
    </div>
  );
}

function t(vertalingen, sleutel, fallback) {
  return vertalingen[sleutel] || fallback || sleutel;
}

// Betere hash dan de vorige (nog steeds client-side demo, geen vervanging voor echte backend auth)
function simpleHash(str) {
  // djb2a variant — beter dan de vorige maar nog steeds NIET productie-veilig
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) ^ str.charCodeAt(i);
    h = h >>> 0; // unsigned 32-bit
  }
  // Extra ronden voor meer verspreiding
  for (let r = 0; r < 3; r++) {
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) + h) ^ (str.charCodeAt(i) * 0x9e3779b9);
      h = h >>> 0;
    }
  }
  return h.toString(16).padStart(8,"0");
}
// ⚠️ Wachtwoorden zijn gehashed maar nog steeds client-side. Voor productie: gebruik een echte backend met bcrypt/argon2.

const INIT_USERS = [
  { id:"u1", username:"dennis.goosen", passHash:simpleHash("Tijdelijk1"), isAdmin:true,  naam:"Dennis Goosen"  },
  { id:"u2", username:"demo",          passHash:simpleHash("Demo123"),    isAdmin:false, naam:"Demo Gebruiker" },
];

const INIT_KLANTEN = {
  u1:[
    { id:"k1", naam:"Bakkerij de Gouden Korst", email:"info@goudenkors.nl",  telefoon:"06-12345678", adres:"Hoofdstraat 14, 1234 AB Amsterdam", producten:["p1","p3"], offertes:[] },
    { id:"k2", naam:"Autogarage Versteeg",       email:"versteeg@garage.nl",  telefoon:"06-87654321", adres:"Industrieweg 7, 5678 CD Utrecht",   producten:["p2","p4"], offertes:[] },
  ],
  u2:[
    { id:"k3", naam:"Kapsalon Mooiste Knip", email:"knip@kapsalon.nl", telefoon:"06-11223344", adres:"Dorpsstraat 3, 9012 EF Groningen", producten:["p5"], offertes:[] },
  ],
};

const INIT_PRODUCTEN = {
  u1:[
    { id:"p1", naam:"Website Pakket Basic", prijs:1200, beschrijving:"5-pagina website met CMS",        categorie:"Web"       },
    { id:"p2", naam:"Website Pakket Pro",   prijs:2800, beschrijving:"Maatwerk website met webshop",    categorie:"Web"       },
    { id:"p3", naam:"SEO Optimalisatie",    prijs:650,  beschrijving:"Maandelijkse SEO-begeleiding",    categorie:"Marketing" },
    { id:"p4", naam:"Logo & Huisstijl",     prijs:950,  beschrijving:"Complete huisstijl ontwikkeling", categorie:"Design"    },
  ],
  u2:[
    { id:"p5", naam:"Knipbeurt Pakket", prijs:45, beschrijving:"Wassen, knippen, föhnen", categorie:"Diensten" },
  ],
};

const INIT_AGENDA = {
  u1:[
    { id:"a1", klantId:"k1", datum:"2026-06-10", tijd:"10:00", notitie:"Bespreking nieuwe website" },
    { id:"a2", klantId:"k2", datum:"2026-06-12", tijd:"14:30", notitie:"Offerte presentatie"       },
  ],
  u2:[],
};

const OFFERTE_TEMPLATE = `Geachte {klant_naam},

Hartelijk dank voor uw interesse in onze diensten. Hierbij ontvangt u onze offerte voor de gevraagde producten en/of diensten.

Wij staan altijd open voor vragen of aanpassingen aan deze offerte.

Met vriendelijke groet,
Uw bedrijfsnaam`;

const FACTUUR_TEMPLATE = `Geachte {klant_naam},

Hierbij ontvangt u onze factuur voor de geleverde producten en/of diensten. Wij verzoeken u vriendelijk het bedrag binnen de gestelde betalingstermijn te voldoen.

Heeft u vragen over deze factuur? Neem dan gerust contact met ons op.

Met vriendelijke groet,
Uw bedrijfsnaam`;

// Gedeelde print-functie voor offertes: gebruikt op de opstelpagina én bij een reeds opgeslagen offerte,
// zodat het afgedrukte resultaat er altijd hetzelfde (mooie) uit ziet als de schermvoorbeeld.
function printOfferteHtml(offerte, klant) {
  const vandaag = offerte.datum
    ? new Date(offerte.datum+"T12:00:00").toLocaleDateString("nl-NL",{day:"numeric",month:"long",year:"numeric"})
    : new Date().toLocaleDateString("nl-NL",{day:"numeric",month:"long",year:"numeric"});
  const fmt = n => "€"+parseFloat(n||0).toLocaleString("nl-NL",{minimumFractionDigits:2});
  const tekst = (offerte.template||OFFERTE_TEMPLATE).replace("{klant_naam}", klant?.naam||"");
  const exclBtw = (offerte.regels||[]).reduce((s,r)=>s+(parseFloat(r.prijs)||0)*(parseInt(r.aantal)||1),0);
  const btwBedrag = offerte.inclBtw ? Math.round(exclBtw*0.21) : 0;
  const totaal = offerte.totaalInclBtw || (exclBtw + btwBedrag);
  const regelsHtml = (offerte.regels||[]).map(r =>
    `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee">${r.naam||"—"}</td>
     <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center">${r.aantal||1}</td>
     <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right">${fmt((parseFloat(r.prijs)||0)*(parseInt(r.aantal)||1))}</td></tr>`
  ).join('');
  const script = '<scr'+'ipt>window.onload=()=>{window.print();window.onafterprint=()=>window.close();}<\/scr'+'ipt>';
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <style>
    body { font-family: Georgia, serif; font-size: 13px; margin: 0; padding: 40px; color: #222; line-height:1.7; }
    .header { display: flex; justify-content: space-between; margin-bottom: 32px; }
    .bedrijf { display:flex; align-items:flex-start; gap:12px; }
    .bedrijf img { height:44px; max-width:70px; object-fit:contain; }
    .bedrijf h1 { margin: 0; font-size: 22px; color: #185FA5; }
    .bedrijf p { margin: 2px 0; color: #666; font-size: 12px; }
    .info { text-align: right; }
    .info p { margin: 2px 0; color: #666; font-size: 13px; }
    hr { border: none; border-top: 2px solid #185FA5; margin: 0 0 24px; }
    .klant p { margin: 2px 0; }
    table { width: 100%; border-collapse: collapse; margin: 24px 0; }
    thead th { background: #185FA5; color: #fff; padding: 8px 12px; text-align: left; font-size: 12px; }
    thead th:nth-child(2) { text-align: center; }
    thead th:last-child { text-align: right; }
    .totaal-tabel { width: 300px; margin-left: auto; }
    .totaal-tabel td { padding: 6px 12px; font-size: 13px; }
    .totaal-rij td { font-size: 15px; font-weight: bold; color: #185FA5; padding: 10px 12px; background: #e8f0fb; }
    @media print { body { padding: 20px; } }
  </style></head><body>
  <div class="header">
    <div class="bedrijf">
      <img src="${API.logoUrl()}" alt="" onerror="this.style.display='none'" />
      <div>
        <h1>${offerte.bedrijfsnaam||"Uw Bedrijfsnaam"}</h1>
        <p>${offerte.bedrijfAdres||""}</p>
        ${offerte.iban?`<p>IBAN: ${offerte.iban}</p>`:''}
        ${offerte.btwNr?`<p>BTW-nr: ${offerte.btwNr}</p>`:''}
      </div>
    </div>
    <div class="info">
      <p>Datum: ${vandaag}</p>
      <p>Referentie: ${offerte.referentie}</p>
    </div>
  </div>
  <hr>
  <div class="klant">
    <p style="color:#666;font-size:12px">Offerte voor:</p>
    <p style="font-weight:bold;font-size:16px">${klant?.naam||""}</p>
    <p style="color:#444">${klant?.email||""}</p>
  </div>
  <p style="white-space:pre-wrap;margin:24px 0">${tekst}</p>
  <table>
    <thead><tr><th>Omschrijving</th><th>Aantal</th><th style="text-align:right">Bedrag</th></tr></thead>
    <tbody>${regelsHtml}</tbody>
  </table>
  <table class="totaal-tabel">
    ${offerte.inclBtw ? `
      <tr><td>Subtotaal excl. BTW</td><td style="text-align:right">${fmt(exclBtw)}</td></tr>
      <tr><td>BTW 21%</td><td style="text-align:right">${fmt(btwBedrag)}</td></tr>
    ` : ''}
    <tr class="totaal-rij"><td>Totaal</td><td style="text-align:right">${fmt(totaal)}</td></tr>
  </table>
  ${script}
  </body></html>`;
  const w = window.open('', '_blank', 'width=800,height=900');
  w.document.write(html);
  w.document.close();
}

const KLEUREN = [
  { label:"Blauw",   hoofd:"#185FA5", licht:"#E6F1FB", donker:"#0C447C" },
  { label:"Groen",   hoofd:"#1D7A4A", licht:"#E1F5EE", donker:"#085041" },
  { label:"Paars",   hoofd:"#534AB7", licht:"#EEEDFE", donker:"#3C3489" },
  { label:"Oranje",  hoofd:"#BA7517", licht:"#FAEEDA", donker:"#633806" },
  { label:"Rood",    hoofd:"#A32D2D", licht:"#FCEBEB", donker:"#791F1F" },
  { label:"Roze",    hoofd:"#993556", licht:"#FBEAF0", donker:"#72243E" },
];

const BGOVS = [
  { label:"Wit",         w:"#ffffff" },
  { label:"Lichtgrijs",  w:"#f4f4f2" },
  { label:"Zand",        w:"#faf7f2" },
  { label:"Leisteen",    w:"#1e2430" },
  { label:"Nacht",       w:"#111318" },
  { label:"Marineblauw", w:"#0f1e2e" },
];

const UREN = Array.from({length:24},(_,i)=>`${String(i).padStart(2,"0")}:00`);
const DARK_BGS = ["#1e2430","#111318","#0f1e2e"];

function uid() { return Math.random().toString(36).slice(2,9); }

// ── Klant zoekbox met autocomplete ──────────────────────────────────────────
function KlantZoekBox({ klanten, value, onChange, fs, placeholder }) {
  const [query, setQuery] = useState(value ? (klanten.find(k=>k.id===value)?.naam||"") : "");
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function click(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", click);
    return () => document.removeEventListener("mousedown", click);
  }, []);

  const matches = query.length > 0
    ? klanten.filter(k => k.naam.toLowerCase().includes(query.toLowerCase())).slice(0,8)
    : klanten.slice(0,8);

  function select(k) { setQuery(k.naam); onChange(k.id); setOpen(false); }

  return (
    <div ref={ref} style={{ position:"relative" }}>
      <input
        value={query}
        onChange={e => { setQuery(e.target.value); onChange(""); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder || "Typ om te zoeken…"}
        style={{ width:"100%", padding:"8px 12px", borderRadius:8, border:"1px solid #c0c0c0",
          background:"#f9f9f9", color:"#1a1a1a", fontSize:fs, boxSizing:"border-box" }}
      />
      {open && matches.length > 0 && (
        <div style={{ position:"absolute", top:"calc(100% + 4px)", left:0, right:0, zIndex:999,
          background:"#fff", border:"1px solid #d0d0d0", borderRadius:8,
          boxShadow:"0 4px 16px rgba(0,0,0,0.12)", maxHeight:220, overflowY:"auto" }}>
          {matches.map(k => (
            <div key={k.id} onClick={() => select(k)}
              style={{ padding:"9px 14px", cursor:"pointer", fontSize:fs,
                borderBottom:"0.5px solid #f0f0f0", color:"#1a1a1a" }}
              onMouseEnter={e=>e.currentTarget.style.background="#f5f5f5"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <span style={{ fontWeight:500 }}>{k.naam}</span>
              <span style={{ fontSize:fs-2, color:"#888", marginLeft:8 }}>{k.email}</span>
            </div>
          ))}
          {query && matches.length === 0 && (
            <div style={{ padding:"9px 14px", fontSize:fs-1, color:"#888" }}>Geen klanten gevonden</div>
          )}
        </div>
      )}
    </div>
  );
}

// ── UI primitieven ───────────────────────────────────────────────────────────
function Avatar({ naam, size=40, kleur }) {
  const ini = naam.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase();
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:kleur.licht, color:kleur.donker,
      display:"flex", alignItems:"center", justifyContent:"center", fontWeight:500, fontSize:size*0.35, flexShrink:0 }}>
      {ini}
    </div>
  );
}

function Modal({ title, onClose, children, fs }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", display:"flex",
      alignItems:"center", justifyContent:"center", zIndex:1000, padding:"1rem", overflowY:"auto" }}
      onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{ backgroundColor:"#ffffff", color:"#1a1a1a", borderRadius:12,
        border:"1px solid #d0d0d0", padding:"1.5rem", width:"100%", maxWidth:560,
        boxShadow:"0 8px 32px rgba(0,0,0,0.18)", fontSize:fs,
        margin:"auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.25rem" }}>
          <h2 style={{ margin:0, fontSize:fs+4, fontWeight:500, color:"#1a1a1a" }}>{title}</h2>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", fontSize:22, color:"#666", padding:"4px 8px", lineHeight:1 }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

const iSt = fs => ({ width:"100%", padding:"8px 12px", borderRadius:8, border:"1px solid #c0c0c0",
  background:"#f9f9f9", color:"#1a1a1a", fontSize:fs, boxSizing:"border-box" });

function FF({ label, children, fs }) {
  return (
    <div style={{ marginBottom:"1rem" }}>
      <label style={{ display:"block", fontSize:fs-1, color:"#555", marginBottom:4 }}>{label}</label>
      {children}
    </div>
  );
}

function Btn({ onClick, variant="default", children, style={}, kleur, fs=14, disabled=false }) {
  const s = {
    default: { background:"#ffffff", color:"#1a1a1a", border:"0.5px solid #bbb" },
    primary: { background:kleur?.hoofd||"#185FA5", color:"#fff", border:"none" },
    danger:  { background:"#FCEBEB", color:"#A32D2D", border:"0.5px solid #f09595" },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{ padding:"8px 16px", borderRadius:8,
      cursor:disabled?"not-allowed":"pointer", fontSize:fs, fontWeight:400,
      display:"inline-flex", alignItems:"center", gap:6, opacity:disabled?0.5:1,
      ...s[variant], ...style }}>{children}</button>
  );
}

function Badge({ children, kleur }) {
  return <span style={{ background:kleur.licht, color:kleur.donker, padding:"2px 10px", borderRadius:99, fontSize:12, fontWeight:500 }}>{children}</span>;
}

function Toggle({ aan, onToggle, label, fs }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={onToggle}>
      <div style={{ width:40, height:22, borderRadius:11, background:aan?"#185FA5":"#ccc",
        position:"relative", transition:"background 0.2s", flexShrink:0 }}>
        <div style={{ position:"absolute", top:3, left:aan?20:3, width:16, height:16,
          borderRadius:"50%", background:"#fff", transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }} />
      </div>
      <span style={{ fontSize:fs, color:"#1a1a1a" }}>{label}</span>
    </div>
  );
}

// ── ACTIVATIE PAGINA ──────────────────────────────────────────
function ActivatiePagina({ token, kleur }) {
  const [fase, setFase] = useState('laden'); // laden | formulier | klaar | fout
  const [gebruikerInfo, setGebruikerInfo] = useState(null);
  const [ww1, setWw1] = useState('');
  const [ww2, setWw2] = useState('');
  const [toon1, setToon1] = useState(false);
  const [toon2, setToon2] = useState(false);
  const [fout, setFout] = useState('');
  const [bezig, setBezig] = useState(false);

  useEffect(() => {
    API.controleerActivatieToken(token)
      .then(data => { setGebruikerInfo(data); setFase('formulier'); })
      .catch(() => setFase('fout'));
  }, [token]);

  async function stelWachtwoordIn() {
    setFout('');
    const regels = valideerWachtwoord(ww1);
    if (!regels.every(r => r.ok)) { setFout('Wachtwoord voldoet niet aan de eisen.'); return; }
    if (ww1 !== ww2) { setFout('Wachtwoorden komen niet overeen.'); return; }
    setBezig(true);
    try {
      await API.activeerAccount(token, ww1);
      setFase('klaar');
    } catch(e) {
      setFout(e.message || 'Activatie mislukt.');
    } finally { setBezig(false); }
  }

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:"linear-gradient(160deg,#0f1e2e 0%,#1a3a5c 50%,#0f1e2e 100%)" }}>
      <div style={{ background:"#fff", borderRadius:24, padding:"3rem", width:"100%", maxWidth:440,
        boxShadow:"0 24px 80px rgba(0,0,0,0.35)", margin:"1rem" }}>

        <div style={{ textAlign:"center", marginBottom:"2rem" }}>
          <img src="afbeeldingen/dencrm.png" alt="DenCRM"
            style={{ height:100, objectFit:"contain" }}
            onError={e=>{ e.target.style.display="none"; }} />
          <h1 style={{ margin:"1rem 0 0", fontSize:24, fontWeight:700, color:"#1a1a1a" }}>DenCRM</h1>
        </div>

        {fase === 'laden' && (
          <p style={{ textAlign:"center", color:"#888" }}>Token controleren…</p>
        )}

        {fase === 'fout' && (
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:48, marginBottom:"1rem" }}>❌</div>
            <h2 style={{ color:"#a32d2d" }}>Link ongeldig of verlopen</h2>
            <p style={{ color:"#666", fontSize:14 }}>
              De activatielink is verlopen of al gebruikt.<br/>
              Registreer opnieuw of neem contact op.
            </p>
            <button onClick={()=>window.location.href='/'}
              style={{ marginTop:"1.5rem", padding:"10px 24px", borderRadius:8,
                background:kleur.hoofd, color:"#fff", border:"none", cursor:"pointer", fontSize:14 }}>
              Terug naar inloggen
            </button>
          </div>
        )}

        {fase === 'formulier' && (
          <>
            <h2 style={{ margin:"0 0 0.5rem", fontSize:20, color:"#1a1a1a" }}>Welkom, {gebruikerInfo?.naam}!</h2>
            <p style={{ color:"#666", fontSize:14, marginBottom:"1.5rem" }}>
              Stel hieronder uw wachtwoord in om uw account te activeren.
            </p>

            <div style={{ marginBottom:"1rem" }}>
              <label style={{ display:"block", fontSize:13, color:"#555", marginBottom:4, fontWeight:500 }}>
                Wachtwoord
              </label>
              <div style={{ position:"relative" }}>
                <input type={toon1?"text":"password"} value={ww1} onChange={e=>setWw1(e.target.value)}
                  placeholder="Minimaal 8 tekens"
                  style={{ width:"100%", padding:"11px 40px 11px 12px", borderRadius:8,
                    border:"1.5px solid #ddd", background:"#fafafa", fontSize:14,
                    color:"#1a1a1a", boxSizing:"border-box" }} />
                <button onClick={()=>setToon1(t=>!t)} style={{ position:"absolute", right:10,
                  top:"50%", transform:"translateY(-50%)", background:"none",
                  border:"none", cursor:"pointer", color:"#aaa", fontSize:16 }}>
                  {toon1?"🙈":"👁"}
                </button>
              </div>
            </div>

            <WachtwoordSterkte ww={ww1} />

            <div style={{ marginBottom:"1.5rem" }}>
              <label style={{ display:"block", fontSize:13, color:"#555", marginBottom:4, fontWeight:500 }}>
                Wachtwoord bevestigen
              </label>
              <div style={{ position:"relative" }}>
                <input type={toon2?"text":"password"} value={ww2}
                  onChange={e=>setWw2(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&stelWachtwoordIn()}
                  placeholder="Herhaal uw wachtwoord"
                  style={{ width:"100%", padding:"11px 40px 11px 12px", borderRadius:8,
                    border:"1.5px solid #ddd", background:"#fafafa", fontSize:14,
                    color:"#1a1a1a", boxSizing:"border-box" }} />
                <button onClick={()=>setToon2(t=>!t)} style={{ position:"absolute", right:10,
                  top:"50%", transform:"translateY(-50%)", background:"none",
                  border:"none", cursor:"pointer", color:"#aaa", fontSize:16 }}>
                  {toon2?"🙈":"👁"}
                </button>
              </div>
            </div>

            {fout && <p style={{ color:"#a32d2d", fontSize:13, background:"#fcebeb",
              padding:"8px 12px", borderRadius:6, marginBottom:"1rem" }}>{fout}</p>}

            <button onClick={stelWachtwoordIn} disabled={bezig}
              style={{ width:"100%", padding:"13px", borderRadius:10,
                background:kleur.hoofd, color:"#fff", border:"none", cursor:"pointer",
                fontSize:15, fontWeight:600, opacity:bezig?0.7:1 }}>
              {bezig ? "Bezig…" : "✓ Account activeren"}
            </button>
          </>
        )}

        {fase === 'klaar' && (
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:56, marginBottom:"1rem" }}>🎉</div>
            <h2 style={{ color:"#27500a", margin:"0 0 0.5rem" }}>Account geactiveerd!</h2>
            <p style={{ color:"#666", fontSize:14, marginBottom:"1.5rem" }}>
              Uw wachtwoord is ingesteld. U kunt nu inloggen met uw e-mailadres.
            </p>
            <button onClick={()=>window.location.href='/'}
              style={{ padding:"12px 28px", borderRadius:10, background:kleur.hoofd,
                color:"#fff", border:"none", cursor:"pointer", fontSize:15, fontWeight:600 }}>
              Naar inloggen →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── WACHTWOORD RESET PAGINA ─────────────────────────────────────
function WachtwoordResetPagina({ token, kleur }) {
  const [fase, setFase] = useState('laden'); // laden | formulier | klaar | fout
  const [naam, setNaam] = useState('');
  const [ww1, setWw1] = useState('');
  const [ww2, setWw2] = useState('');
  const [toon1, setToon1] = useState(false);
  const [toon2, setToon2] = useState(false);
  const [fout, setFout] = useState('');
  const [bezig, setBezig] = useState(false);

  useEffect(() => {
    API.controleerResetToken(token)
      .then(data => { setNaam(data.naam); setFase('formulier'); })
      .catch(() => setFase('fout'));
  }, [token]);

  async function stelNieuwWachtwoordIn() {
    setFout('');
    const regels = valideerWachtwoord(ww1);
    if (!regels.every(r => r.ok)) { setFout('Wachtwoord voldoet niet aan de eisen.'); return; }
    if (ww1 !== ww2) { setFout('Wachtwoorden komen niet overeen.'); return; }
    setBezig(true);
    try {
      await API.resetWachtwoord(token, ww1);
      setFase('klaar');
    } catch(e) {
      setFout(e.message || 'Wachtwoord wijzigen mislukt.');
    } finally { setBezig(false); }
  }

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:"linear-gradient(160deg,#0f1e2e 0%,#1a3a5c 50%,#0f1e2e 100%)" }}>
      <div style={{ background:"#fff", borderRadius:24, padding:"3rem", width:"100%", maxWidth:440,
        boxShadow:"0 24px 80px rgba(0,0,0,0.35)", margin:"1rem" }}>

        <div style={{ textAlign:"center", marginBottom:"2rem" }}>
          <img src="afbeeldingen/dencrm.png" alt="DenCRM"
            style={{ height:100, objectFit:"contain" }}
            onError={e=>{ e.target.style.display="none"; }} />
          <h1 style={{ margin:"1rem 0 0", fontSize:24, fontWeight:700, color:"#1a1a1a" }}>DenCRM</h1>
        </div>

        {fase === 'laden' && (
          <p style={{ textAlign:"center", color:"#888" }}>Link controleren…</p>
        )}

        {fase === 'fout' && (
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:48, marginBottom:"1rem" }}>❌</div>
            <h2 style={{ color:"#a32d2d" }}>Link ongeldig of verlopen</h2>
            <p style={{ color:"#666", fontSize:14 }}>
              Deze resetlink is verlopen (na 30 minuten) of al gebruikt.<br/>
              Vraag een nieuwe link aan via "Wachtwoord vergeten".
            </p>
            <button onClick={()=>window.location.href='/'}
              style={{ marginTop:"1.5rem", padding:"10px 24px", borderRadius:8,
                background:kleur.hoofd, color:"#fff", border:"none", cursor:"pointer", fontSize:14 }}>
              Terug naar inloggen
            </button>
          </div>
        )}

        {fase === 'formulier' && (
          <>
            <h2 style={{ margin:"0 0 0.5rem", fontSize:20, color:"#1a1a1a" }}>Nieuw wachtwoord, {naam}</h2>
            <p style={{ color:"#666", fontSize:14, marginBottom:"1.5rem" }}>
              Stel hieronder uw nieuwe wachtwoord in.
            </p>

            <div style={{ marginBottom:"1rem" }}>
              <label style={{ display:"block", fontSize:13, color:"#555", marginBottom:4, fontWeight:500 }}>
                Nieuw wachtwoord
              </label>
              <div style={{ position:"relative" }}>
                <input type={toon1?"text":"password"} value={ww1} onChange={e=>setWw1(e.target.value)}
                  placeholder="Minimaal 8 tekens"
                  style={{ width:"100%", padding:"11px 40px 11px 12px", borderRadius:8,
                    border:"1.5px solid #ddd", background:"#fafafa", fontSize:14,
                    color:"#1a1a1a", boxSizing:"border-box" }} />
                <button onClick={()=>setToon1(t=>!t)} style={{ position:"absolute", right:10,
                  top:"50%", transform:"translateY(-50%)", background:"none",
                  border:"none", cursor:"pointer", color:"#aaa", fontSize:16 }}>
                  {toon1?"🙈":"👁"}
                </button>
              </div>
            </div>

            <WachtwoordSterkte ww={ww1} />

            <div style={{ marginBottom:"1.5rem", marginTop:12 }}>
              <label style={{ display:"block", fontSize:13, color:"#555", marginBottom:4, fontWeight:500 }}>
                Wachtwoord bevestigen
              </label>
              <div style={{ position:"relative" }}>
                <input type={toon2?"text":"password"} value={ww2}
                  onChange={e=>setWw2(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&stelNieuwWachtwoordIn()}
                  placeholder="Herhaal uw wachtwoord"
                  style={{ width:"100%", padding:"11px 40px 11px 12px", borderRadius:8,
                    border:"1.5px solid #ddd", background:"#fafafa", fontSize:14,
                    color:"#1a1a1a", boxSizing:"border-box" }} />
                <button onClick={()=>setToon2(t=>!t)} style={{ position:"absolute", right:10,
                  top:"50%", transform:"translateY(-50%)", background:"none",
                  border:"none", cursor:"pointer", color:"#aaa", fontSize:16 }}>
                  {toon2?"🙈":"👁"}
                </button>
              </div>
            </div>

            {fout && <p style={{ color:"#a32d2d", fontSize:13, background:"#fcebeb",
              padding:"8px 12px", borderRadius:6, marginBottom:"1rem" }}>{fout}</p>}

            <button onClick={stelNieuwWachtwoordIn} disabled={bezig}
              style={{ width:"100%", padding:"13px", borderRadius:10,
                background:kleur.hoofd, color:"#fff", border:"none", cursor:"pointer",
                fontSize:15, fontWeight:600, opacity:bezig?0.7:1 }}>
              {bezig ? "Bezig…" : "✓ Wachtwoord wijzigen"}
            </button>
          </>
        )}

        {fase === 'klaar' && (
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:56, marginBottom:"1rem" }}>🎉</div>
            <h2 style={{ color:"#27500a", margin:"0 0 0.5rem" }}>Wachtwoord gewijzigd!</h2>
            <p style={{ color:"#666", fontSize:14, marginBottom:"1.5rem" }}>
              U kunt nu inloggen met uw nieuwe wachtwoord.
            </p>
            <button onClick={()=>window.location.href='/'}
              style={{ padding:"12px 28px", borderRadius:10, background:kleur.hoofd,
                color:"#fff", border:"none", cursor:"pointer", fontSize:15, fontWeight:600 }}>
              Naar inloggen →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── UITNODIGING ACCEPTEREN (koppel account) ──────────────────
function UitnodigingAccepterenPagina({ token, kleur }) {
  const [fase, setFase] = useState('laden'); // laden | formulier | klaar | fout
  const [info, setInfo] = useState(null);
  const [naam, setNaam] = useState('');
  const [username, setUsername] = useState('');
  const [ww1, setWw1] = useState('');
  const [ww2, setWw2] = useState('');
  const [fout, setFout] = useState('');
  const [bezig, setBezig] = useState(false);

  const MODULE_LABELS = {
    kassa:"🧾 Kassa", werkbonnen:"🔧 Werkbonnen & Reparaties", klanten:"👥 Klanten",
    producten:"📦 Producten", agenda:"📅 Agenda", offertes:"📄 Offertes",
    financieel:"💶 Financieel overzicht", declaraties:"🧮 Declaraties & Boekhouding", contact:"💬 Contact",
  };

  useEffect(() => {
    API.controleerUitnodiging(token)
      .then(data => { setInfo(data); setNaam(data.naam || ''); setFase('formulier'); })
      .catch(() => setFase('fout'));
  }, [token]);

  async function maakAccountAan() {
    setFout('');
    if (!naam || !username) { setFout('Vul naam en gebruikersnaam in.'); return; }
    const regels = valideerWachtwoord(ww1);
    if (!regels.every(r => r.ok)) { setFout('Wachtwoord voldoet niet aan de eisen.'); return; }
    if (ww1 !== ww2) { setFout('Wachtwoorden komen niet overeen.'); return; }
    setBezig(true);
    try {
      await API.accepteerUitnodiging({ token, naam, username, wachtwoord: ww1 });
      setFase('klaar');
    } catch(e) {
      setFout(e.message || 'Account aanmaken mislukt.');
    } finally { setBezig(false); }
  }

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:"linear-gradient(160deg,#0f1e2e 0%,#1a3a5c 50%,#0f1e2e 100%)" }}>
      <div style={{ background:"#fff", borderRadius:24, padding:"3rem", width:"100%", maxWidth:460,
        boxShadow:"0 24px 80px rgba(0,0,0,0.35)", margin:"1rem" }}>

        <div style={{ textAlign:"center", marginBottom:"2rem" }}>
          <img src="afbeeldingen/dencrm.png" alt="DenCRM" style={{ height:90, objectFit:"contain" }}
            onError={e=>{ e.target.style.display="none"; }} />
          <h1 style={{ margin:"1rem 0 0", fontSize:24, fontWeight:700, color:"#1a1a1a" }}>DenCRM</h1>
        </div>

        {fase === 'laden' && <p style={{ textAlign:"center", color:"#888" }}>Uitnodiging controleren…</p>}

        {fase === 'fout' && (
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:48, marginBottom:"1rem" }}>❌</div>
            <h2 style={{ color:"#a32d2d" }}>Uitnodiging ongeldig of verlopen</h2>
            <p style={{ color:"#666", fontSize:14 }}>Vraag de beheerder om een nieuwe uitnodiging te versturen.</p>
            <button onClick={()=>window.location.href='/'}
              style={{ marginTop:"1.5rem", padding:"10px 24px", borderRadius:8, background:kleur.hoofd,
                color:"#fff", border:"none", cursor:"pointer", fontSize:14 }}>
              Terug naar inloggen
            </button>
          </div>
        )}

        {fase === 'formulier' && info && (
          <>
            <h2 style={{ margin:"0 0 0.5rem", fontSize:20, color:"#1a1a1a" }}>Welkom bij {info.bedrijfsnaam}!</h2>
            <p style={{ color:"#666", fontSize:14, marginBottom:"1rem", lineHeight:1.5 }}>
              U bent uitgenodigd om mee te werken. Maak hieronder uw eigen account aan.
            </p>
            <div style={{ background:"var(--color-background-secondary,#f5f5f5)", borderRadius:10, padding:"10px 14px", marginBottom:"1.25rem" }}>
              <p style={{ margin:"0 0 6px", fontSize:12, fontWeight:600, color:"#666" }}>U krijgt toegang tot:</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {info.modules.map(m => (
                  <span key={m} style={{ fontSize:12, padding:"3px 10px", borderRadius:99, background:"#fff", color:"#185FA5", border:"1px solid #185FA522" }}>
                    {MODULE_LABELS[m] || m}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom:"0.75rem" }}>
              <label style={{ display:"block", fontSize:13, color:"#555", marginBottom:4, fontWeight:500 }}>Uw naam</label>
              <input value={naam} onChange={e=>setNaam(e.target.value)}
                style={{ width:"100%", padding:"11px 12px", borderRadius:8, border:"1.5px solid #ddd",
                  background:"#fafafa", fontSize:14, color:"#1a1a1a", boxSizing:"border-box" }} />
            </div>
            <div style={{ marginBottom:"0.75rem" }}>
              <label style={{ display:"block", fontSize:13, color:"#555", marginBottom:4, fontWeight:500 }}>Gebruikersnaam</label>
              <input value={username} onChange={e=>setUsername(e.target.value)}
                style={{ width:"100%", padding:"11px 12px", borderRadius:8, border:"1.5px solid #ddd",
                  background:"#fafafa", fontSize:14, color:"#1a1a1a", boxSizing:"border-box" }} />
            </div>
            <div style={{ marginBottom:"0.75rem" }}>
              <label style={{ display:"block", fontSize:13, color:"#555", marginBottom:4, fontWeight:500 }}>Wachtwoord</label>
              <input type="password" value={ww1} onChange={e=>setWw1(e.target.value)}
                style={{ width:"100%", padding:"11px 12px", borderRadius:8, border:"1.5px solid #ddd",
                  background:"#fafafa", fontSize:14, color:"#1a1a1a", boxSizing:"border-box" }} />
            </div>
            <WachtwoordSterkte ww={ww1} />
            <div style={{ margin:"0.75rem 0 1.25rem" }}>
              <label style={{ display:"block", fontSize:13, color:"#555", marginBottom:4, fontWeight:500 }}>Bevestig wachtwoord</label>
              <input type="password" value={ww2} onChange={e=>setWw2(e.target.value)}
                onKeyDown={e=>e.key==="Enter" && maakAccountAan()}
                style={{ width:"100%", padding:"11px 12px", borderRadius:8, border:"1.5px solid #ddd",
                  background:"#fafafa", fontSize:14, color:"#1a1a1a", boxSizing:"border-box" }} />
            </div>

            {fout && <p style={{ color:"#a32d2d", fontSize:13, background:"#fcebeb", padding:"8px 12px", borderRadius:6, marginBottom:"1rem" }}>{fout}</p>}

            <button onClick={maakAccountAan} disabled={bezig}
              style={{ width:"100%", padding:"13px", borderRadius:10, background:kleur.hoofd, color:"#fff",
                border:"none", cursor:"pointer", fontSize:15, fontWeight:600, opacity:bezig?0.7:1 }}>
              {bezig ? "Bezig…" : "✓ Account aanmaken"}
            </button>
          </>
        )}

        {fase === 'klaar' && (
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:56, marginBottom:"1rem" }}>🎉</div>
            <h2 style={{ color:"#27500a", margin:"0 0 0.5rem" }}>Account aangemaakt!</h2>
            <p style={{ color:"#666", fontSize:14, marginBottom:"1.5rem" }}>U kunt nu inloggen.</p>
            <button onClick={()=>window.location.href='/'}
              style={{ padding:"12px 28px", borderRadius:10, background:kleur.hoofd, color:"#fff",
                border:"none", cursor:"pointer", fontSize:15, fontWeight:600 }}>
              Naar inloggen →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
// ── OVER ONS (publieke bedrijfspagina, o.a. voor Mollie verificatie) ──
// ── PUBLIEKE AGENDA BOEKINGSPAGINA ────────────────────────────
function PubliekeAgendaPagina({ slug, kleur }) {
  const [fase, setFase] = useState('laden'); // laden | kiezen | tijdstip | bevestigen | klaar | fout
  const [info, setInfo] = useState(null);
  const [gekozenProduct, setGekozenProduct] = useState(null);
  const [gekozenDatum, setGekozenDatum] = useState(new Date().toISOString().slice(0,10));
  const [slots, setSlots] = useState([]);
  const [slotsLaden, setSlotsLaden] = useState(false);
  const [gekozenTijd, setGekozenTijd] = useState(null);
  const [email, setEmail] = useState("");
  const [naam, setNaam] = useState("");
  const [straat, setStraat] = useState("");
  const [postcode, setPostcode] = useState("");
  const [stad, setStad] = useState("");
  const [opmerking, setOpmerking] = useState("");
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState("");

  useEffect(() => {
    API.haalPubliekeAgendaOp(slug)
      .then(data => { setInfo(data); setFase('kiezen'); })
      .catch(() => setFase('fout'));
  }, [slug]);

  useEffect(() => {
    if (!gekozenProduct || fase !== 'tijdstip') return;
    setSlotsLaden(true);
    setGekozenTijd(null);
    API.haalBeschikbaarheidOp(slug, gekozenProduct.id, gekozenDatum)
      .then(data => setSlots(data.slots || []))
      .catch(() => setSlots([]))
      .finally(() => setSlotsLaden(false));
  }, [gekozenProduct, gekozenDatum, fase]);

  async function bevestigBoeking() {
    setFout("");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setFout("Vul een geldig e-mailadres in."); return; }
    const velden = info?.velden || {};
    if (velden.naam && !naam.trim()) { setFout("Vul uw naam in."); return; }
    if (velden.straat && !straat.trim()) { setFout("Vul straat + huisnummer in."); return; }
    if (velden.postcode && !postcode.trim()) { setFout("Vul uw postcode in."); return; }
    if (velden.stad && !stad.trim()) { setFout("Vul uw stad/dorp in."); return; }
    setBezig(true);
    try {
      await API.boekAfspraak(slug, {
        product_id: gekozenProduct.id, datum: gekozenDatum, tijd: gekozenTijd, email,
        naam: naam || undefined, straat: straat || undefined, postcode: postcode || undefined,
        stad: stad || undefined, opmerking: opmerking || undefined,
      });
      setFase('klaar');
    } catch(e) { setFout(e.message || "Boeken mislukt."); }
    finally { setBezig(false); }
  }

  const minDatum = new Date().toISOString().slice(0,10);
  const maxDatumObj = new Date(); maxDatumObj.setMonth(maxDatumObj.getMonth()+3);
  const maxDatum = maxDatumObj.toISOString().slice(0,10);

  return (
    <div style={{ minHeight:"100vh", background:"#f5f7fa", fontFamily:"system-ui, sans-serif", padding:"2rem 1rem" }}>
      <div style={{ maxWidth:560, margin:"0 auto" }}>
        <div style={{ background:"#fff", borderRadius:16, padding:"2rem", boxShadow:"0 2px 16px rgba(0,0,0,0.06)" }}>

          {fase === 'laden' && <p style={{ textAlign:"center", color:"#888" }}>Laden…</p>}

          {fase === 'fout' && (
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:48, marginBottom:"1rem" }}>❌</div>
              <h2 style={{ color:"#a32d2d" }}>Agenda niet beschikbaar</h2>
              <p style={{ color:"#666", fontSize:14 }}>Deze link is ongeldig of online boeken staat niet aan.</p>
            </div>
          )}

          {info && fase !== 'laden' && fase !== 'fout' && (
            <h1 style={{ margin:"0 0 1.5rem", fontSize:22, color:"#1a1a1a" }}>Afspraak maken bij {info.bedrijfsnaam}</h1>
          )}

          {fase === 'kiezen' && (
            <>
              <p style={{ fontSize:14, color:"#666", marginBottom:"1rem" }}>Kies het type afspraak:</p>
              {info.producten.length === 0 && <p style={{ color:"#999", fontSize:14 }}>Er zijn momenteel geen afspraaktypes beschikbaar.</p>}
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {info.producten.map(p => (
                  <button key={p.id} onClick={()=>{ setGekozenProduct(p); setFase('tijdstip'); }}
                    style={{ padding:"14px 16px", borderRadius:10, border:"1.5px solid #e0e0e0",
                      background:"#fafafa", cursor:"pointer", textAlign:"left" }}>
                    <p style={{ margin:0, fontSize:15, fontWeight:600, color:"#1a1a1a" }}>{p.naam}</p>
                    <p style={{ margin:"2px 0 0", fontSize:13, color:"#888" }}>
                      {p.duur_minuten} minuten{p.prijs ? ` · €${parseFloat(p.prijs).toLocaleString("nl-NL",{minimumFractionDigits:2})}` : ' · Gratis'}
                    </p>
                  </button>
                ))}
              </div>
            </>
          )}

          {fase === 'tijdstip' && gekozenProduct && (
            <>
              <button onClick={()=>setFase('kiezen')} style={{ background:"none", border:"none", color:kleur.hoofd, cursor:"pointer", fontSize:13, marginBottom:"1rem", padding:0 }}>
                ← Ander afspraaktype
              </button>
              <p style={{ fontSize:15, fontWeight:600, marginBottom:12 }}>{gekozenProduct.naam}</p>
              <FF label="Datum" fs={14}>
                <input type="date" value={gekozenDatum} min={minDatum} max={maxDatum}
                  onChange={e=>setGekozenDatum(e.target.value)}
                  style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #ddd", fontSize:14, boxSizing:"border-box" }} />
              </FF>
              <p style={{ fontSize:13, color:"#666", margin:"12px 0 8px" }}>Beschikbare tijden:</p>
              {slotsLaden && <p style={{ color:"#999", fontSize:13 }}>Beschikbaarheid ophalen…</p>}
              {!slotsLaden && slots.length === 0 && <p style={{ color:"#999", fontSize:13 }}>Geen beschikbare tijden op deze dag.</p>}
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:"1.5rem" }}>
                {slots.map(s => (
                  <button key={s} onClick={()=>setGekozenTijd(s)}
                    style={{ padding:"8px 14px", borderRadius:8, cursor:"pointer", fontSize:14,
                      border: gekozenTijd===s ? `2px solid ${kleur.hoofd}` : "1px solid #ddd",
                      background: gekozenTijd===s ? kleur.hoofd : "#fff",
                      color: gekozenTijd===s ? "#fff" : "#333", fontWeight: gekozenTijd===s ? 600 : 400 }}>
                    {s}
                  </button>
                ))}
              </div>
              <button onClick={()=>setFase('bevestigen')} disabled={!gekozenTijd}
                style={{ width:"100%", padding:"12px", borderRadius:10, border:"none",
                  background: gekozenTijd ? kleur.hoofd : "#ccc", color:"#fff",
                  cursor: gekozenTijd ? "pointer" : "not-allowed", fontSize:15, fontWeight:600 }}>
                Verder →
              </button>
            </>
          )}

          {fase === 'bevestigen' && (
            <>
              <button onClick={()=>setFase('tijdstip')} style={{ background:"none", border:"none", color:kleur.hoofd, cursor:"pointer", fontSize:13, marginBottom:"1rem", padding:0 }}>
                ← Ander tijdstip
              </button>
              <div style={{ background:"#f5f7fa", borderRadius:10, padding:"14px 16px", marginBottom:"1.25rem" }}>
                <p style={{ margin:0, fontWeight:600, fontSize:15 }}>{gekozenProduct.naam}</p>
                <p style={{ margin:"4px 0 0", fontSize:13, color:"#666" }}>
                  {new Date(gekozenDatum+"T12:00:00").toLocaleDateString("nl-NL",{weekday:"long",day:"numeric",month:"long"})} om {gekozenTijd}
                </p>
                {gekozenProduct.prijs && <p style={{ margin:"4px 0 0", fontSize:13, color:"#666" }}>Kosten: €{parseFloat(gekozenProduct.prijs).toLocaleString("nl-NL",{minimumFractionDigits:2})}</p>}
              </div>
              {info.velden?.naam && (
                <FF label="Uw naam" fs={14}>
                  <input value={naam} onChange={e=>setNaam(e.target.value)}
                    placeholder="Voor- en achternaam"
                    style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #ddd", fontSize:14, boxSizing:"border-box" }} />
                </FF>
              )}
              <FF label="Uw e-mailadres" fs={14}>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                  placeholder="naam@voorbeeld.nl"
                  style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #ddd", fontSize:14, boxSizing:"border-box" }} />
              </FF>
              {info.velden?.straat && (
                <FF label="Straat + huisnummer" fs={14}>
                  <input value={straat} onChange={e=>setStraat(e.target.value)}
                    style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #ddd", fontSize:14, boxSizing:"border-box" }} />
                </FF>
              )}
              {(info.velden?.postcode || info.velden?.stad) && (
                <div style={{ display:"grid", gridTemplateColumns: (info.velden?.postcode && info.velden?.stad) ? "1fr 2fr" : "1fr", gap:8 }}>
                  {info.velden?.postcode && (
                    <FF label="Postcode" fs={14}>
                      <input value={postcode} onChange={e=>setPostcode(e.target.value)}
                        style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #ddd", fontSize:14, boxSizing:"border-box" }} />
                    </FF>
                  )}
                  {info.velden?.stad && (
                    <FF label="Stad/dorp" fs={14}>
                      <input value={stad} onChange={e=>setStad(e.target.value)}
                        style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #ddd", fontSize:14, boxSizing:"border-box" }} />
                    </FF>
                  )}
                </div>
              )}
              {info.velden?.opmerking && (
                <FF label="Opmerking (optioneel)" fs={14}>
                  <textarea value={opmerking} onChange={e=>setOpmerking(e.target.value)} rows={3}
                    style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #ddd", fontSize:14, boxSizing:"border-box", resize:"vertical", fontFamily:"inherit" }} />
                </FF>
              )}
              <p style={{ fontSize:12, color:"#999", margin:"-6px 0 1rem" }}>
                U ontvangt een bevestiging per e-mail, met een link om de afspraak indien nodig te annuleren.
              </p>
              {fout && <p style={{ color:"#a32d2d", fontSize:13, background:"#fcebeb", padding:"8px 12px", borderRadius:6, marginBottom:"1rem" }}>{fout}</p>}
              <button onClick={bevestigBoeking} disabled={bezig}
                style={{ width:"100%", padding:"13px", borderRadius:10, border:"none",
                  background:kleur.hoofd, color:"#fff", cursor:"pointer", fontSize:15, fontWeight:600, opacity:bezig?0.7:1 }}>
                {bezig ? "Bezig…" : "✓ Afspraak bevestigen"}
              </button>
            </>
          )}

          {fase === 'klaar' && (
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:56, marginBottom:"1rem" }}>🎉</div>
              <h2 style={{ color:"#27500a", margin:"0 0 0.5rem" }}>Afspraak bevestigd!</h2>
              <p style={{ color:"#666", fontSize:14 }}>
                U ontvangt zo een bevestigingsmail op {email}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── PUBLIEKE AGENDA ANNULEREN ──────────────────────────────────
function PubliekeAgendaAnnulerenPagina({ token, kleur }) {
  const [fase, setFase] = useState('laden'); // laden | klaar | fout
  const [bedrijfsnaam, setBedrijfsnaam] = useState("");

  useEffect(() => {
    if (!token) { setFase('fout'); return; }
    API.annuleerExterneAfspraak(token)
      .then(data => { setBedrijfsnaam(data.bedrijfsnaam || ""); setFase('klaar'); })
      .catch(() => setFase('fout'));
  }, [token]);

  return (
    <div style={{ minHeight:"100vh", background:"#f5f7fa", display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}>
      <div style={{ background:"#fff", borderRadius:16, padding:"2.5rem", maxWidth:440, width:"100%",
        boxShadow:"0 2px 16px rgba(0,0,0,0.06)", textAlign:"center" }}>
        {fase === 'laden' && <p style={{ color:"#888" }}>Bezig met annuleren…</p>}
        {fase === 'klaar' && (
          <>
            <div style={{ fontSize:48, marginBottom:"1rem" }}>✓</div>
            <h2 style={{ margin:"0 0 0.5rem", color:"#1a1a1a" }}>Afspraak geannuleerd</h2>
            <p style={{ color:"#666", fontSize:14 }}>
              Uw afspraak bij {bedrijfsnaam || "het bedrijf"} is geannuleerd. U hoeft verder niets te doen.
            </p>
          </>
        )}
        {fase === 'fout' && (
          <>
            <div style={{ fontSize:48, marginBottom:"1rem" }}>❌</div>
            <h2 style={{ margin:"0 0 0.5rem", color:"#a32d2d" }}>Kon niet annuleren</h2>
            <p style={{ color:"#666", fontSize:14 }}>Deze annuleerlink is ongeldig of de afspraak is al geannuleerd.</p>
          </>
        )}
      </div>
    </div>
  );
}

function OverOnsPagina({ kleur }) {
  return (
    <div style={{ minHeight:"100vh", background:"#f7f8fa", fontFamily:"system-ui, sans-serif" }}>
      <div style={{ maxWidth:760, margin:"0 auto", padding:"3rem 1.5rem" }}>

        <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
          <img src="/afbeeldingen/dencrm.png" alt="DenCRM" style={{ height:70, objectFit:"contain" }}
            onError={e=>{ e.target.style.display="none"; }} />
          <h1 style={{ margin:"1rem 0 0", fontSize:28, fontWeight:700, color:"#1a1a1a" }}>DenCRM</h1>
          <p style={{ margin:"4px 0 0", color:"#666", fontSize:15 }}>
            CRM-software voor zelfstandig ondernemers
          </p>
        </div>

        <div style={{ background:"#fff", borderRadius:16, padding:"2.5rem", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>

          <h2 style={{ fontSize:20, color:"#185FA5", margin:"0 0 1rem" }}>Over DenCRM</h2>
          <p style={{ fontSize:14.5, color:"#333", lineHeight:1.7, margin:"0 0 1.5rem" }}>
            DenCRM is een online CRM-applicatie speciaal ontwikkeld voor zelfstandige ondernemers (ZZP'ers) in
            Nederland. Met DenCRM beheert u eenvoudig uw klanten, offertes, facturen, kassa-verkopen, werkbonnen
            en boekhouding op één centrale plek.
          </p>

          <h2 style={{ fontSize:20, color:"#185FA5", margin:"2rem 0 1rem" }}>Bedrijfsgegevens</h2>
          <table style={{ width:"100%", fontSize:14.5, color:"#333", lineHeight:2 }}>
            <tbody>
              <tr><td style={{ color:"#888", width:180, verticalAlign:"top" }}>Handelsnaam</td><td style={{ fontWeight:500 }}>Dennis Software Solutions</td></tr>
              <tr><td style={{ color:"#888", verticalAlign:"top" }}>Product / dienst</td><td style={{ fontWeight:500 }}>DenCRM — CRM-software (SaaS)</td></tr>
              <tr><td style={{ color:"#888", verticalAlign:"top" }}>KVK-nummer</td><td style={{ fontWeight:500 }}>42105830</td></tr>
              <tr><td style={{ color:"#888", verticalAlign:"top" }}>Land</td><td style={{ fontWeight:500 }}>Nederland</td></tr>
              <tr><td style={{ color:"#888", verticalAlign:"top" }}>Website</td><td style={{ fontWeight:500 }}>https://dencrm.nl</td></tr>
              <tr><td style={{ color:"#888", verticalAlign:"top" }}>E-mail</td><td style={{ fontWeight:500 }}>info@dencrm.nl</td></tr>
            </tbody>
          </table>

          <h2 style={{ fontSize:20, color:"#185FA5", margin:"2rem 0 1rem" }}>Wat bieden wij aan?</h2>
          <ul style={{ fontSize:14.5, color:"#333", lineHeight:1.9, margin:0, paddingLeft:20 }}>
            <li>Klantenbeheer (CRM)</li>
            <li>Offertes en facturen opstellen en versturen</li>
            <li>Kassa-module voor directe verkopen</li>
            <li>Werkbonnen &amp; reparatiebeheer</li>
            <li>Agenda met afsprakenbeheer</li>
            <li>Declaraties, boekhouding en belastingoverzichten</li>
          </ul>

          <h2 style={{ fontSize:20, color:"#185FA5", margin:"2rem 0 1rem" }}>Abonnementen &amp; prijzen</h2>
          <p style={{ fontSize:14.5, color:"#333", lineHeight:1.7, margin:"0 0 1rem" }}>
            Voor het gebruik van DenCRM is een geldig abonnement vereist. Na een gratis proefperiode van 1 maand
            gelden de volgende eenmalige prijzen per gekozen periode (geen doorlopend abonnement, geen automatische
            incasso):
          </p>
          <table style={{ width:"100%", borderCollapse:"collapse", marginBottom:"1rem" }}>
            <thead>
              <tr style={{ borderBottom:"2px solid #eee" }}>
                <th style={{ textAlign:"left", padding:"6px 8px", fontSize:12, color:"#888" }}>Periode</th>
                <th style={{ textAlign:"right", padding:"6px 8px", fontSize:12, color:"#888" }}>Prijs</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom:"1px solid #f0f0f0" }}>
                <td style={{ padding:"8px" }}>1 maand</td>
                <td style={{ padding:"8px", textAlign:"right", fontWeight:600 }}>€ 9,99</td>
              </tr>
              <tr style={{ borderBottom:"1px solid #f0f0f0" }}>
                <td style={{ padding:"8px" }}>6 maanden</td>
                <td style={{ padding:"8px", textAlign:"right", fontWeight:600 }}>€ 49,99</td>
              </tr>
              <tr>
                <td style={{ padding:"8px" }}>12 maanden</td>
                <td style={{ padding:"8px", textAlign:"right", fontWeight:600 }}>€ 89,99</td>
              </tr>
            </tbody>
          </table>

          <h2 style={{ fontSize:20, color:"#185FA5", margin:"2rem 0 1rem" }}>Betalingen</h2>
          <p style={{ fontSize:14.5, color:"#333", lineHeight:1.7, margin:0 }}>
            Betalingen op DenCRM worden veilig verwerkt via Mollie. Wij ontvangen of bewaren zelf geen
            betaalgegevens (zoals creditcard- of bankgegevens); deze worden uitsluitend door Mollie verwerkt.
          </p>

          <h2 style={{ fontSize:20, color:"#185FA5", margin:"2rem 0 1rem" }}>Contact</h2>
          <p style={{ fontSize:14.5, color:"#333", lineHeight:1.7, margin:0 }}>
            Voor vragen kunt u contact opnemen via{" "}
            <a href="mailto:info@dencrm.nl" style={{ color:"#185FA5" }}>info@dencrm.nl</a>.
          </p>

        </div>

        <div style={{ textAlign:"center", marginTop:"2rem" }}>
          <a href="/" style={{ color:kleur.hoofd, fontSize:14, textDecoration:"none", fontWeight:500 }}>
            ← Terug naar DenCRM
          </a>
        </div>
      </div>
    </div>
  );
}

function LoginPage({ onLogin, onDemo, kleur, taal, setTaal }) {
  const T = VERTALINGEN[taal] || VERTALINGEN.nl;
  const [un, setUn] = useState(() => localStorage.getItem('dencrm_onthoud_gebruikersnaam') || "");
  const [pw, setPw] = useState(() => localStorage.getItem('dencrm_onthoud_wachtwoord') || "");
  const [onthoudMij, setOnthoudMij] = useState(() => !!localStorage.getItem('dencrm_onthoud_gebruikersnaam'));
  const [err, setErr] = useState(""); const [toon, setToon] = useState(false);
  const [bezig, setBezig] = useState(false);
  const [regModal, setRegModal] = useState(false);
  const [regForm, setRegForm] = useState({ naam:"", bedrijf:"", email:"" });
  const [regErr, setRegErr] = useState("");
  const [regOk, setRegOk] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [wwVergetenModal, setWwVergetenModal] = useState(false);
  const [wwVergetenEmail, setWwVergetenEmail] = useState("");
  const [wwVergetenFase, setWwVergetenFase] = useState("formulier"); // formulier | bezig | klaar
  const [wwVergetenErr, setWwVergetenErr] = useState("");
  const [voorwaardenModal, setVoorwaardenModal] = useState(false);
  const [bedrijfsgegevensModal, setBedrijfsgegevensModal] = useState(false);
  const [pogingen, setPogingen] = useState(0);
  const [geblokkeerd, setGeblokkeerd] = useState(false);

  useEffect(() => {
    API.haalReviewsOp().then(data => setReviews(data.filter(r=>r.tekst).slice(0,6))).catch(()=>{});
  }, []);

  async function doLogin() {
    if (geblokkeerd) return;
    if (!un || !pw) { setErr("Vul gebruikersnaam en wachtwoord in."); return; }
    setBezig(true); setErr("");
    try {
      const gebruiker = await API.login(un, pw);
      if (onthoudMij) {
        localStorage.setItem('dencrm_onthoud_gebruikersnaam', un);
        localStorage.setItem('dencrm_onthoud_wachtwoord', pw);
      } else {
        localStorage.removeItem('dencrm_onthoud_gebruikersnaam');
        localStorage.removeItem('dencrm_onthoud_wachtwoord');
      }
      onLogin(gebruiker);
    } catch (e) {
      const nieuwePogingen = pogingen + 1;
      setPogingen(nieuwePogingen);
      if (nieuwePogingen >= 3) {
        setGeblokkeerd(true);
        setErr("Te vaak foutief ingelogd. Ververs de pagina om het opnieuw te proberen.");
      } else {
        setErr(e.message || "Inloggen mislukt.");
      }
    } finally { setBezig(false); }
  }

  async function doRegistreer() {
    setRegErr("");
    if (!regForm.naam) { setRegErr("Naam is verplicht."); return; }
    if (!regForm.email || !regForm.email.includes("@")) { setRegErr("Vul een geldig e-mailadres in."); return; }
    try {
      await API.registreer(regForm.naam, regForm.email, regForm.bedrijf);
      setRegOk(true);
    } catch (e) { setRegErr(e.message || "Registratie mislukt."); }
  }

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:"linear-gradient(160deg,#0f1e2e 0%,#1a3a5c 50%,#0f1e2e 100%)", position:"relative", padding:"1rem",
      overflow:"hidden" }}>

      {/* Zwevende ZZP-iconen op de achtergrond */}
      <style>{`
        @keyframes zweefA { 0%{transform:translate(0,0) rotate(0deg);} 50%{transform:translate(30px,-40px) rotate(12deg);} 100%{transform:translate(0,0) rotate(0deg);} }
        @keyframes zweefB { 0%{transform:translate(0,0) rotate(0deg);} 50%{transform:translate(-35px,30px) rotate(-10deg);} 100%{transform:translate(0,0) rotate(0deg);} }
        @keyframes zweefC { 0%{transform:translate(0,0) rotate(0deg);} 50%{transform:translate(20px,35px) rotate(8deg);} 100%{transform:translate(0,0) rotate(0deg);} }
        .zwever { position:absolute; opacity:0.16; pointer-events:none; user-select:none; filter:blur(0.3px); }
      `}</style>
      <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
        <span className="zwever" style={{ top:"8%", left:"6%", fontSize:46, animation:"zweefA 9s ease-in-out infinite" }}>💼</span>
        <span className="zwever" style={{ top:"15%", left:"85%", fontSize:38, animation:"zweefB 11s ease-in-out infinite" }}>🧾</span>
        <span className="zwever" style={{ top:"70%", left:"10%", fontSize:42, animation:"zweefC 10s ease-in-out infinite" }}>💻</span>
        <span className="zwever" style={{ top:"80%", left:"88%", fontSize:36, animation:"zweefA 8s ease-in-out infinite 1s" }}>🧮</span>
        <span className="zwever" style={{ top:"40%", left:"3%", fontSize:34, animation:"zweefB 12s ease-in-out infinite 0.5s" }}>☕</span>
        <span className="zwever" style={{ top:"50%", left:"93%", fontSize:40, animation:"zweefC 9s ease-in-out infinite 2s" }}>🛠️</span>
        <span className="zwever" style={{ top:"25%", left:"45%", fontSize:32, animation:"zweefA 13s ease-in-out infinite 1.5s" }}>📊</span>
        <span className="zwever" style={{ top:"88%", left:"45%", fontSize:36, animation:"zweefB 10s ease-in-out infinite" }}>📅</span>
        <span className="zwever" style={{ top:"5%", left:"65%", fontSize:30, animation:"zweefC 11s ease-in-out infinite 0.8s" }}>💶</span>
        <span className="zwever" style={{ top:"60%", left:"55%", fontSize:28, animation:"zweefA 14s ease-in-out infinite 2.2s" }}>📈</span>
        <span className="zwever" style={{ top:"92%", left:"20%", fontSize:32, animation:"zweefB 9s ease-in-out infinite 1.2s" }}>✉️</span>
        <span className="zwever" style={{ top:"12%", left:"28%", fontSize:30, animation:"zweefC 12s ease-in-out infinite 0.3s" }}>📦</span>
      </div>

      {/* Reviews sidebar — los gepositioneerd, beïnvloedt centrering niet */}
      {reviews.length > 0 && window.innerWidth > 1100 && (
        <div style={{ position:"absolute", right:"calc(50% + 280px)", top:"50%", transform:"translateY(-50%)",
          width:320, flexShrink:0, display:"flex", flexDirection:"column", gap:12,
          maxHeight:"85vh", overflowY:"auto", zIndex:1 }}
          className="reviews-sidebar">
          <p style={{ color:"#fff", fontSize:14, fontWeight:600, margin:"0 0 4px", opacity:0.9 }}>
            💬 Wat gebruikers zeggen
          </p>
          {reviews.map((r,i) => (
            <div key={i} style={{ background:"rgba(255,255,255,0.08)", borderRadius:12, padding:"14px 16px",
              backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.12)" }}>
              <div style={{ marginBottom:6 }}>
                {[1,2,3,4,5].map(s => (
                  <span key={s} style={{ color: s<=r.sterren ? "#f5b400" : "rgba(255,255,255,0.2)", fontSize:14 }}>★</span>
                ))}
              </div>
              <p style={{ color:"rgba(255,255,255,0.9)", fontSize:13, lineHeight:1.5, margin:"0 0 8px" }}>
                "{r.tekst}"
              </p>
              <p style={{ color:"rgba(255,255,255,0.6)", fontSize:11, margin:0, fontWeight:500 }}>
                — {r.bedrijfsnaam || "DenCRM gebruiker"}
              </p>
            </div>
          ))}
        </div>
      )}

      <div style={{ background:"linear-gradient(180deg, #ffffff 0%, #fbfcfe 100%)", borderRadius:24,
        border:"1px solid rgba(24,95,165,0.12)", padding:"3rem 3rem 2.5rem", width:"100%", maxWidth:480,
        position:"relative", zIndex:1, overflow:"hidden",
        boxShadow:"0 24px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.6) inset, 0 -60px 120px -60px rgba(24,95,165,0.15) inset",
        margin:"1rem" }}>

        {/* Kleuraccent bovenaan */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:5,
          background:`linear-gradient(90deg, ${kleur.hoofd}, #4fa3e0, ${kleur.hoofd})` }} />

        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:"2rem" }}>
          <img src="afbeeldingen/dencrm.png" alt="DenCRM logo"
            style={{ height:96, objectFit:"contain", marginBottom:"0.25rem" }}
            onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="block"; }} />
          <div style={{ display:"none", textAlign:"center" }}>
            <div style={{ width:72, height:72, borderRadius:"50%", background:kleur.licht,
              display:"flex", alignItems:"center", justifyContent:"center",
              margin:"0 auto 0.75rem", fontSize:32 }}>🏢</div>
            <h1 style={{ margin:0, fontSize:28, fontWeight:700, color:"#1a1a1a" }}>DenCRM</h1>
          </div>
          <h1 style={{ margin:"0.5rem 0 0", fontSize:28, fontWeight:700, color:"#1a1a1a" }}>DenCRM</h1>
          <p style={{ margin:"0.25rem 0 0", fontSize:14, color:"#888" }}>{T.appOndertitel}</p>
        </div>

        <div style={{ marginBottom:"1.25rem" }}>
          <label style={{ display:"block", fontSize:14, color:"#555", marginBottom:6, fontWeight:500 }}>{T.gebruikersnaam} <span style={{fontWeight:400, color:"#aaa"}}>(mailadres)</span></label>
          <input value={un} onChange={e=>setUn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()}
            placeholder={T.gebruikersnaam}
            style={{ width:"100%", padding:"13px 16px", borderRadius:10, border:"1.5px solid #ddd",
              background:"#fafafa", fontSize:15, color:"#1a1a1a", boxSizing:"border-box" }} />
        </div>
        <div style={{ marginBottom:"1.75rem" }}>
          <label style={{ display:"block", fontSize:14, color:"#555", marginBottom:6, fontWeight:500 }}>{T.wachtwoord}</label>
          <div style={{ position:"relative" }}>
            <input type={toon?"text":"password"} value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()}
              placeholder={T.wachtwoord}
              style={{ width:"100%", padding:"13px 48px 13px 16px", borderRadius:10, border:"1.5px solid #ddd",
                background:"#fafafa", fontSize:15, color:"#1a1a1a", boxSizing:"border-box" }} />
            <button onClick={()=>setToon(t=>!t)} style={{ position:"absolute", right:14, top:"50%",
              transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#aaa", fontSize:18 }}>
              {toon?"🙈":"👁"}
            </button>
          </div>
        </div>

        <label style={{ display:"flex", alignItems:"center", gap:8, marginBottom:"1.25rem", cursor:"pointer" }}>
          <input type="checkbox" checked={onthoudMij} onChange={e=>setOnthoudMij(e.target.checked)}
            style={{ width:16, height:16, accentColor:kleur.hoofd, cursor:"pointer" }} />
          <span style={{ fontSize:13, color:"#666" }}>Onthoud mijn gegevens</span>
        </label>

        {err && <p style={{ color:"#A32D2D", fontSize:14, marginBottom:"1.25rem", background:"#FCEBEB",
          padding:"10px 14px", borderRadius:8 }}>{err}</p>}

        <button onClick={doLogin} disabled={geblokkeerd} style={{ width:"100%", padding:"14px", borderRadius:10,
          background: geblokkeerd ? "#bbb" : kleur.hoofd, color:"#fff", border:"none",
          cursor: geblokkeerd ? "not-allowed" : "pointer",
          fontSize:16, fontWeight:600, letterSpacing:"0.02em",
          boxShadow: geblokkeerd ? "none" : `0 4px 16px ${kleur.hoofd}55`,
          opacity: bezig ? 0.7 : 1 }}>
          {geblokkeerd ? "Geblokkeerd — ververs de pagina" : (bezig ? T.bezig : T.inloggen)}
        </button>

        <button onClick={()=>{ setWwVergetenModal(true); setWwVergetenEmail(""); setWwVergetenFase("formulier"); }}
          style={{ width:"100%", padding:"8px", marginTop:8, background:"none", border:"none",
            cursor:"pointer", fontSize:13, color:kleur.hoofd, textAlign:"center" }}>
          Wachtwoord vergeten?
        </button>

        <div style={{ marginTop:"1rem", display:"flex", flexDirection:"column", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ flex:1, height:"0.5px", background:"#e8e8e8" }} />
            <span style={{ fontSize:13, color:"#bbb" }}>of</span>
            <div style={{ flex:1, height:"0.5px", background:"#e8e8e8" }} />
          </div>

          {/* Account aanmaken */}
          <button onClick={()=>{ setRegModal(true); setRegOk(false); setRegErr(""); setRegForm({naam:"",bedrijf:"",email:""}); }}
            style={{ width:"100%", padding:"13px 16px", borderRadius:10,
              background:"#f0f4ff", color:"#2a4ab5", border:"1.5px solid #c5d0f5",
              cursor:"pointer", fontSize:14, fontWeight:500,
              display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            <span style={{ fontSize:18 }}>✉</span> {T.maakAccount}
          </button>

          {/* Demo modus */}
          <button onClick={onDemo} style={{ width:"100%", padding:"13px 16px", borderRadius:10,
            background:"#fffbf0", color:"#7a5800", border:"1.5px dashed #e8c44a",
            cursor:"pointer", fontSize:14,
            display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
            <span style={{ fontSize:20 }}>🧪</span>
            <div style={{ textAlign:"left" }}>
              <div style={{ fontWeight:600, fontSize:14 }}>{T.probeerApp}</div>
              <div style={{ fontSize:12, color:"#a07820", marginTop:2 }}>{T.demoOndertitel}</div>
            </div>
          </button>
        </div>

        <div style={{ display:"flex", justifyContent:"center", gap:6, marginTop:14, flexWrap:"wrap" }}>
          <button onClick={()=>setVoorwaardenModal(true)}
            style={{ padding:"8px 4px", background:"none", border:"none",
              cursor:"pointer", fontSize:11, color:"#aaa" }}>
            Algemene voorwaarden & privacy
          </button>
          <span style={{ color:"#ccc", fontSize:11 }}>·</span>
          <button onClick={()=>setBedrijfsgegevensModal(true)}
            style={{ padding:"8px 4px", background:"none", border:"none",
              cursor:"pointer", fontSize:11, color:"#aaa" }}>
            Bedrijfsgegevens & abonnement
          </button>
        </div>
      </div>

      {/* Bedrijfsgegevens & abonnement modal */}
      {bedrijfsgegevensModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)",
          display:"flex", alignItems:"center", justifyContent:"center", zIndex:2000, padding:"1rem" }}
          onClick={e=>e.target===e.currentTarget && setBedrijfsgegevensModal(false)}>
          <div style={{ background:"#fff", borderRadius:16, padding:"2rem", width:"100%", maxWidth:480,
            maxHeight:"85vh", overflowY:"auto", boxShadow:"0 16px 48px rgba(0,0,0,0.25)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1.25rem" }}>
              <h2 style={{ margin:0, fontSize:20, color:"#1a1a1a" }}>Bedrijfsgegevens & abonnement</h2>
              <button onClick={()=>setBedrijfsgegevensModal(false)} style={{ background:"none", border:"none",
                cursor:"pointer", fontSize:22, color:"#666", padding:"4px 8px", lineHeight:1 }}>×</button>
            </div>

            <div style={{ fontSize:13.5, color:"#444", lineHeight:1.7 }}>
              <h3 style={{ fontSize:14, color:"#185FA5", margin:"0 0 0.5rem" }}>Aanbieder</h3>
              <p style={{ margin:"0 0 1rem" }}>
                DenCRM is een product van <strong>Dennis Software Solutions</strong>, geregistreerd bij de Kamer van
                Koophandel onder KVK-nummer <strong>42105830</strong>.
              </p>

              <h3 style={{ fontSize:14, color:"#185FA5", margin:"1.25rem 0 0.5rem" }}>Abonnement</h3>
              <p style={{ margin:"0 0 1rem" }}>
                Voor het gebruik van DenCRM is een geldig abonnement vereist. Na een gratis proefperiode van
                1 maand kunt u kiezen uit de volgende periodes:
              </p>
              <table style={{ width:"100%", borderCollapse:"collapse", marginBottom:"1rem" }}>
                <thead>
                  <tr style={{ borderBottom:"2px solid #eee" }}>
                    <th style={{ textAlign:"left", padding:"6px 8px", fontSize:12, color:"#888" }}>Periode</th>
                    <th style={{ textAlign:"right", padding:"6px 8px", fontSize:12, color:"#888" }}>Prijs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom:"1px solid #f0f0f0" }}>
                    <td style={{ padding:"8px" }}>1 maand</td>
                    <td style={{ padding:"8px", textAlign:"right", fontWeight:600 }}>€ 9,99</td>
                  </tr>
                  <tr style={{ borderBottom:"1px solid #f0f0f0" }}>
                    <td style={{ padding:"8px" }}>6 maanden</td>
                    <td style={{ padding:"8px", textAlign:"right", fontWeight:600 }}>€ 49,99</td>
                  </tr>
                  <tr>
                    <td style={{ padding:"8px" }}>12 maanden</td>
                    <td style={{ padding:"8px", textAlign:"right", fontWeight:600 }}>€ 89,99</td>
                  </tr>
                </tbody>
              </table>
              <p style={{ margin:"0 0 1rem", fontSize:12.5, color:"#666" }}>
                Alle prijzen zijn eenmalige betalingen per gekozen periode. Er is geen sprake van een doorlopend
                abonnement met automatische incasso — na afloop van de periode vervalt de toegang totdat een
                nieuwe periode wordt aangeschaft. Prijzen zijn onder voorbehoud van wijzigingen.
              </p>

              <h3 style={{ fontSize:14, color:"#185FA5", margin:"1.25rem 0 0.5rem" }}>Betalingen</h3>
              <p style={{ margin:0 }}>
                Betalingen worden veilig verwerkt via Mollie. Dennis Software Solutions ontvangt of bewaart zelf
                geen betaalgegevens (zoals creditcard- of bankgegevens); deze worden uitsluitend door Mollie verwerkt.
              </p>
            </div>

            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:"1.5rem" }}>
              <button onClick={()=>setBedrijfsgegevensModal(false)}
                style={{ padding:"10px 24px", borderRadius:10, background:kleur.hoofd,
                  color:"#fff", border:"none", cursor:"pointer", fontSize:14, fontWeight:600 }}>
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account aanmaken modal */}
      {regModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", display:"flex",
          alignItems:"center", justifyContent:"center", zIndex:1000, padding:"1rem" }}
          onClick={e=>e.target===e.currentTarget&&setRegModal(false)}>
          <div style={{ background:"#fff", borderRadius:16, padding:"2rem", width:"100%", maxWidth:440,
            boxShadow:"0 12px 40px rgba(0,0,0,0.2)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem" }}>
              <h2 style={{ margin:0, fontSize:20, fontWeight:600, color:"#1a1a1a" }}>Account aanmaken</h2>
              <button onClick={()=>setRegModal(false)} style={{ background:"none",border:"none",cursor:"pointer",fontSize:22,color:"#666" }}>×</button>
            </div>

            {regOk ? (
              <div style={{ textAlign:"center", padding:"1rem 0" }}>
                <div style={{ fontSize:48, marginBottom:"1rem" }}>✉</div>
                <h3 style={{ margin:"0 0 0.5rem", color:"#1a1a1a" }}>Aanvraag ontvangen!</h3>
                <p style={{ color:"#666", fontSize:14, lineHeight:1.6 }}>
                  Er is een activatiemail verstuurd naar <strong>{regForm.email}</strong> met een link om uw wachtwoord in te stellen.
                </p>
                <p style={{ color:"#888", fontSize:13, marginTop:"0.75rem", padding:"10px 14px",
                  background:"#fffbf0", borderRadius:8, border:"1px solid #e8c44a" }}>
                  📧 Kijk ook in uw spamfolder — soms wordt onze mail helaas gemarkeerd als ongewenst.
                </p>
                <button onClick={()=>setRegModal(false)} style={{ marginTop:"1.5rem", padding:"10px 24px",
                  borderRadius:8, background:kleur.hoofd, color:"#fff", border:"none", cursor:"pointer", fontSize:14 }}>
                  Sluiten
                </button>
              </div>
            ) : (
              <>
                <div style={{ marginBottom:"1rem" }}>
                  <label style={{ display:"block", fontSize:13, color:"#555", marginBottom:4, fontWeight:500 }}>
                    Naam <span style={{ color:"#a32d2d" }}>*</span>
                  </label>
                  <input value={regForm.naam} onChange={e=>setRegForm(f=>({...f,naam:e.target.value}))}
                    placeholder="Uw volledige naam"
                    style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:"1px solid #ddd",
                      background:"#fafafa", fontSize:14, color:"#1a1a1a", boxSizing:"border-box" }} />
                </div>
                <div style={{ marginBottom:"1rem" }}>
                  <label style={{ display:"block", fontSize:13, color:"#555", marginBottom:4, fontWeight:500 }}>
                    Bedrijfsnaam <span style={{ color:"#bbb", fontWeight:400 }}>(optioneel)</span>
                  </label>
                  <input value={regForm.bedrijf} onChange={e=>setRegForm(f=>({...f,bedrijf:e.target.value}))}
                    placeholder={T.uwBedrijfsnaam}
                    style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:"1px solid #ddd",
                      background:"#fafafa", fontSize:14, color:"#1a1a1a", boxSizing:"border-box" }} />
                </div>
                <div style={{ marginBottom:"1.5rem" }}>
                  <label style={{ display:"block", fontSize:13, color:"#555", marginBottom:4, fontWeight:500 }}>
                    E-mailadres <span style={{ color:"#a32d2d" }}>*</span>
                  </label>
                  <input type="email" value={regForm.email} onChange={e=>setRegForm(f=>({...f,email:e.target.value}))}
                    placeholder="uw@emailadres.nl"
                    style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:"1px solid #ddd",
                      background:"#fafafa", fontSize:14, color:"#1a1a1a", boxSizing:"border-box" }} />
                </div>
                {regErr && <p style={{ color:"#a32d2d", fontSize:13, background:"#fcebeb",
                  padding:"8px 12px", borderRadius:6, marginBottom:"1rem" }}>{regErr}</p>}
                <p style={{ fontSize:12, color:"#aaa", marginBottom:"1.25rem", lineHeight:1.5 }}>
                  Na registratie ontvangt u een e-mail met een link om uw wachtwoord in te stellen.
                </p>
                <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
                  <button onClick={()=>setRegModal(false)} style={{ padding:"10px 16px", borderRadius:8,
                    background:"#f5f5f5", color:"#333", border:"none", cursor:"pointer", fontSize:14 }}>
                    Annuleren
                  </button>
                  <button onClick={doRegistreer} style={{ padding:"10px 20px", borderRadius:8,
                    background:kleur.hoofd, color:"#fff", border:"none", cursor:"pointer",
                    fontSize:14, fontWeight:500 }}>
                    Account aanmaken
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Algemene voorwaarden modal */}
      {voorwaardenModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)",
          display:"flex", alignItems:"center", justifyContent:"center", zIndex:2000, padding:"1rem" }}
          onClick={e=>e.target===e.currentTarget && setVoorwaardenModal(false)}>
          <div style={{ background:"#fff", borderRadius:16, padding:"2rem", width:"100%", maxWidth:640,
            maxHeight:"85vh", overflowY:"auto", boxShadow:"0 16px 48px rgba(0,0,0,0.25)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1.25rem" }}>
              <h2 style={{ margin:0, fontSize:20, color:"#1a1a1a" }}>Algemene voorwaarden & privacy</h2>
              <button onClick={()=>setVoorwaardenModal(false)} style={{ background:"none", border:"none",
                cursor:"pointer", fontSize:22, color:"#666", padding:"4px 8px", lineHeight:1 }}>×</button>
            </div>

            <div style={{ fontSize:13.5, color:"#444", lineHeight:1.7 }}>
              <p style={{ color:"#888", fontSize:12, marginBottom:"1.25rem" }}>
                Laatst bijgewerkt: {new Date().toLocaleDateString("nl-NL",{day:"numeric",month:"long",year:"numeric"})}
              </p>

              <h3 style={{ fontSize:14, color:"#185FA5", margin:"1.25rem 0 0.5rem" }}>1. Algemeen</h3>
              <p>
                Deze algemene voorwaarden zijn van toepassing op het gebruik van DenCRM, een online CRM-applicatie
                voor het beheren van klanten, offertes, facturen en aanverwante bedrijfsadministratie ("de Dienst").
                Door een account aan te maken en/of de Dienst te gebruiken, gaat u akkoord met deze voorwaarden.
              </p>

              <h3 style={{ fontSize:14, color:"#185FA5", margin:"1.25rem 0 0.5rem" }}>2. Het account en gebruik</h3>
              <p>
                U bent zelf verantwoordelijk voor het geheimhouden van uw inloggegevens en voor alle activiteiten
                die plaatsvinden via uw account. Het is niet toegestaan de Dienst te gebruiken voor onwettige
                doeleinden, of op een manier die de werking van de Dienst voor andere gebruikers verstoort.
              </p>

              <h3 style={{ fontSize:14, color:"#185FA5", margin:"1.25rem 0 0.5rem" }}>3. Lidmaatschap en betaling</h3>
              <p>
                DenCRM werkt op basis van vooraf aangeschafte periodes (bijvoorbeeld 1 maand, 6 maanden of 1 jaar).
                Er is geen sprake van een doorlopend abonnement met automatische incasso; na afloop van de periode
                vervalt de toegang totdat een nieuwe periode wordt aangeschaft. Reeds betaalde periodes worden niet
                gerestitueerd, behoudens wettelijke verplichtingen.
              </p>

              <h3 style={{ fontSize:14, color:"#185FA5", margin:"1.25rem 0 0.5rem" }}>4. Uw gegevens</h3>
              <p>
                Wij gaan zo zorgvuldig mogelijk om met de gegevens die u in DenCRM invoert, waaronder klantgegevens,
                offertes, financiële informatie en overige bedrijfsdata. Wij nemen passende technische en
                organisatorische maatregelen om deze gegevens te beveiligen, waaronder versleutelde verbindingen
                (HTTPS), beveiligde wachtwoordopslag en regelmatige back-ups.
              </p>
              <p>
                Ondanks deze maatregelen kan geen enkel systeem 100% beveiligd worden gegarandeerd. DenCRM en haar
                beheerder(s) kunnen niet aansprakelijk worden gehouden voor schade die voortvloeit uit ongeautoriseerde
                toegang tot, verlies van, of diefstal van gegevens, voor zover dit niet het directe gevolg is van opzet
                of grove nalatigheid van onze kant. Wij adviseren gebruikers dringend om zelf geen zeer gevoelige
                gegevens (zoals BSN-nummers, medische gegevens of betaalkaartgegevens) in het systeem op te slaan.
              </p>

              <h3 style={{ fontSize:14, color:"#185FA5", margin:"1.25rem 0 0.5rem" }}>5. Beschikbaarheid</h3>
              <p>
                Wij streven naar een zo hoog mogelijke beschikbaarheid van de Dienst, maar garanderen geen
                ononderbroken of foutloze werking. Onderhoud, storingen of overmacht kunnen leiden tot tijdelijke
                onbeschikbaarheid. Wij zijn niet aansprakelijk voor schade die voortvloeit uit het (tijdelijk)
                niet beschikbaar zijn van de Dienst.
              </p>

              <h3 style={{ fontSize:14, color:"#185FA5", margin:"1.25rem 0 0.5rem" }}>6. Aansprakelijkheid</h3>
              <p>
                Het gebruik van DenCRM is voor eigen risico. Voor zover wettelijk toegestaan, is onze
                aansprakelijkheid voor directe of indirecte schade — waaronder gederfde winst, gegevensverlies of
                bedrijfsschade — beperkt tot het bedrag dat u in de voorafgaande 12 maanden voor de Dienst heeft
                betaald. Deze beperking geldt niet bij opzet of grove schuld.
              </p>

              <h3 style={{ fontSize:14, color:"#185FA5", margin:"1.25rem 0 0.5rem" }}>7. Privacy en verwerking persoonsgegevens</h3>
              <p>
                Bij gebruik van DenCRM verwerkt u mogelijk persoonsgegevens van uw eigen klanten (zoals namen,
                adressen en contactgegevens). U bent zelf verantwoordelijke in de zin van de AVG/GDPR voor deze
                verwerking; DenCRM treedt hierbij op als verwerker. Wij verwerken deze gegevens uitsluitend in
                opdracht van u en niet voor eigen doeleinden, behalve waar nodig voor het functioneren van de Dienst
                zelf (bijvoorbeeld het versturen van offertes namens u).
              </p>

              <h3 style={{ fontSize:14, color:"#185FA5", margin:"1.25rem 0 0.5rem" }}>8. Reviews</h3>
              <p>
                Indien u een review achterlaat via de Dienst, gaat u ermee akkoord dat de naam van uw bedrijf,
                samen met uw beoordeling en eventuele tekst, getoond kan worden aan bezoekers van DenCRM, onder
                meer op het inlogscherm.
              </p>

              <h3 style={{ fontSize:14, color:"#185FA5", margin:"1.25rem 0 0.5rem" }}>9. Wijzigingen</h3>
              <p>
                Wij behouden ons het recht voor deze voorwaarden te wijzigen. Wezenlijke wijzigingen worden, indien
                redelijkerwijs mogelijk, vooraf gecommuniceerd. Voortgezet gebruik van de Dienst na een wijziging
                geldt als acceptatie van de gewijzigde voorwaarden.
              </p>

              <h3 style={{ fontSize:14, color:"#185FA5", margin:"1.25rem 0 0.5rem" }}>10. Contact</h3>
              <p>
                Voor vragen over deze voorwaarden of over de verwerking van uw gegevens kunt u contact opnemen via{" "}
                <a href="mailto:info@dencrm.nl" style={{ color:"#185FA5" }}>info@dencrm.nl</a>.
              </p>
            </div>

            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:"1.5rem" }}>
              <button onClick={()=>setVoorwaardenModal(false)}
                style={{ padding:"10px 24px", borderRadius:10, background:kleur.hoofd,
                  color:"#fff", border:"none", cursor:"pointer", fontSize:14, fontWeight:600 }}>
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wachtwoord vergeten modal */}
      {wwVergetenModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)",
          display:"flex", alignItems:"center", justifyContent:"center", zIndex:2000, padding:"1rem" }}
          onClick={e=>e.target===e.currentTarget && setWwVergetenModal(false)}>
          <div style={{ background:"#fff", borderRadius:16, padding:"2rem", width:"100%", maxWidth:420,
            boxShadow:"0 16px 48px rgba(0,0,0,0.25)" }}>

            {wwVergetenFase === "formulier" && (
              <>
                <h2 style={{ margin:"0 0 0.5rem", fontSize:20, color:"#1a1a1a" }}>Wachtwoord vergeten?</h2>
                <p style={{ color:"#666", fontSize:14, marginBottom:"1.25rem", lineHeight:1.5 }}>
                  Vul uw e-mailadres in. Als dit adres bij ons bekend is, ontvangt u een link om uw wachtwoord opnieuw in te stellen.
                </p>
                <input type="email" value={wwVergetenEmail} onChange={e=>setWwVergetenEmail(e.target.value)}
                  onKeyDown={e=>e.key==="Enter" && document.getElementById("wwv-verstuur-btn")?.click()}
                  placeholder="uw@emailadres.nl"
                  style={{ width:"100%", padding:"11px 14px", borderRadius:8, border:"1.5px solid #ddd",
                    background:"#fafafa", fontSize:14, color:"#1a1a1a", boxSizing:"border-box", marginBottom:"1rem" }} />
                {wwVergetenErr && <p style={{ color:"#a32d2d", fontSize:13, background:"#fcebeb",
                  padding:"8px 12px", borderRadius:6, marginBottom:"1rem" }}>{wwVergetenErr}</p>}
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={()=>setWwVergetenModal(false)}
                    style={{ flex:1, padding:"11px", borderRadius:10, background:"#f5f5f5",
                      color:"#666", border:"1px solid #ddd", cursor:"pointer", fontSize:13 }}>
                    Annuleren
                  </button>
                  <button id="wwv-verstuur-btn" onClick={async ()=>{
                      if (!wwVergetenEmail || !wwVergetenEmail.includes("@")) {
                        setWwVergetenErr("Vul een geldig e-mailadres in."); return;
                      }
                      setWwVergetenErr(""); setWwVergetenFase("bezig");
                      try {
                        await API.vraagWachtwoordResetAan(wwVergetenEmail);
                        setWwVergetenFase("klaar");
                      } catch(e) {
                        // Toon ook bij fout dezelfde geruststellende boodschap (geen account-enumeratie)
                        setWwVergetenFase("klaar");
                      }
                    }}
                    style={{ flex:1, padding:"11px", borderRadius:10, background:kleur.hoofd,
                      color:"#fff", border:"none", cursor:"pointer", fontSize:13, fontWeight:600 }}>
                    Versturen
                  </button>
                </div>
              </>
            )}

            {wwVergetenFase === "bezig" && (
              <p style={{ textAlign:"center", color:"#888", padding:"1rem 0" }}>Bezig…</p>
            )}

            {wwVergetenFase === "klaar" && (
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:48, marginBottom:"0.75rem" }}>📧</div>
                <h2 style={{ margin:"0 0 0.75rem", color:"#1a1a1a", fontSize:18 }}>Controleer uw mail</h2>
                <p style={{ color:"#666", fontSize:14, lineHeight:1.6, marginBottom:"1.5rem" }}>
                  Mocht u een geldig e-mailadres hebben ingevuld, ontvangt u een mail om uw wachtwoord te herstellen.
                  De link is 30 minuten geldig.
                </p>
                <p style={{ color:"#888", fontSize:13, marginBottom:"1.5rem", padding:"10px 14px",
                  background:"#fffbf0", borderRadius:8, border:"1px solid #e8c44a" }}>
                  📧 Kijk ook in uw spamfolder — soms wordt onze mail helaas gemarkeerd als ongewenst.
                </p>
                <button onClick={()=>setWwVergetenModal(false)}
                  style={{ padding:"10px 24px", borderRadius:10, background:kleur.hoofd,
                    color:"#fff", border:"none", cursor:"pointer", fontSize:14, fontWeight:600 }}>
                  Sluiten
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── GEBRUIKERSBEHEER ─────────────────────────────────────────────────────────
function GebruikersBeheer({ users, setUsers, kleur, fs, T, huidigUserId }) {
  const [gebruikers, setGebruikers] = useState([]);
  const [laden, setLaden] = useState(true);
  const [verwijderModal, setVerwijderModal] = useState(null); // gebruiker object of null

  useEffect(() => {
    API.haalGebruikersOp().then(data => {
      setGebruikers(data);
      setLaden(false);
    }).catch(() => setLaden(false));
  }, []);

  async function updateLidmaatschap(id, dagen) {
    const huidig = gebruikers.find(g=>g.id===id);
    const basis = huidig?.lidmaatschap_tot && new Date(huidig.lidmaatschap_tot) > new Date()
      ? new Date(huidig.lidmaatschap_tot)
      : new Date();
    const nieuw = new Date(basis);
    nieuw.setDate(nieuw.getDate() + dagen);
    const tot = nieuw.toISOString().slice(0,10);
    try {
      await API.updateGebruikerLidmaatschap(id, { lidmaatschap_tot: tot });
      setGebruikers(prev => prev.map(g => g.id===id ? {...g, lidmaatschap_tot:tot} : g));
    } catch(e) { alert("Bijwerken mislukt: "+e.message); }
  }

  async function toggleBlokkeren(u) {
    const blokkeren = u.is_actief; // als hij nu actief is, gaan we blokkeren
    if (blokkeren && !confirm(`${u.naam} blokkeren? Deze gebruiker kan dan niet meer inloggen, maar alle data blijft bewaard.`)) return;
    try {
      await API.blokkeerGebruiker(u.id, blokkeren);
      setGebruikers(prev => prev.map(g => g.id===u.id ? {...g, is_actief: !blokkeren} : g));
    } catch(e) { alert("Bijwerken mislukt: "+e.message); }
  }

  async function bevestigVerwijderen() {
    if (!verwijderModal) return;
    try {
      await API.verwijderGebruiker(verwijderModal.id);
      setGebruikers(prev => prev.filter(g => g.id !== verwijderModal.id));
      setVerwijderModal(null);
    } catch(e) { alert("Verwijderen mislukt: "+e.message); }
  }

  function fmtDatum(iso) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("nl-NL", {day:"numeric",month:"short",year:"numeric"});
  }

  function lidmaatschapStatus(tot) {
    if (!tot) return { label:"Geen", kleur:"#a32d2d", bg:"#fcebeb" };
    const d = new Date(tot);
    const nu = new Date();
    const diff = Math.ceil((d - nu) / (1000*60*60*24));
    if (diff < 0) return { label:"Verlopen", kleur:"#a32d2d", bg:"#fcebeb" };
    if (diff < 14) return { label:`Verloopt over ${diff}d`, kleur:"#7a5800", bg:"#fffbf0" };
    return { label:`Geldig t/m ${fmtDatum(tot)}`, kleur:"#27500a", bg:"#eaf3de" };
  }

  if (laden) return <p style={{ color:"var(--color-text-secondary)" }}>Laden…</p>;

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem" }}>
        <h3 style={{ margin:0, fontSize:fs+2 }}>Gebruikers ({gebruikers.length})</h3>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {gebruikers.map(u => {
          const lid = lidmaatschapStatus(u.lidmaatschap_tot);
          return (
            <div key={u.id} style={{ background:"var(--color-background-primary)",
              border:"0.5px solid var(--color-border-tertiary)",
              borderRadius:12, padding:"14px 16px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
                <Avatar naam={u.naam} kleur={kleur} />
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <p style={{ margin:0, fontWeight:500, fontSize:fs }}>{u.naam}</p>
                    {u.is_admin && <Badge kleur={kleur}>Admin</Badge>}
                    {!u.is_actief && <span style={{ fontSize:fs-3, padding:"2px 8px", borderRadius:99, background:"#fcebeb", color:"#a32d2d" }}>Inactief</span>}
                  </div>
                  <p style={{ margin:0, fontSize:fs-2, color:"var(--color-text-secondary)" }}>@{u.username} · {u.email||"geen email"}</p>
                </div>
                <span style={{ fontSize:fs-2, padding:"3px 10px", borderRadius:99, background:lid.bg, color:lid.kleur, fontWeight:500 }}>
                  {lid.label}
                </span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, fontSize:fs-2,
                color:"var(--color-text-secondary)", marginBottom:10 }}>
                <div>
                  <span style={{ fontWeight:600 }}>Aangemaakt:</span> {fmtDatum(u.aangemaakt_op)}
                </div>
                <div>
                  <span style={{ fontWeight:600 }}>Laatste login:</span> {u.laatste_login ? new Date(u.laatste_login).toLocaleString("nl-NL") : "Nooit"}
                </div>
              </div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
                <span style={{ fontSize:fs-2, color:"var(--color-text-secondary)", alignSelf:"center", marginRight:4 }}>
                  Verleng lidmaatschap:
                </span>
                {[{l:"+1 maand", d:30},{l:"+6 maanden", d:182},{l:"+1 jaar", d:365}].map(opt=>(
                  <button key={opt.d} onClick={()=>updateLidmaatschap(u.id, opt.d)}
                    style={{ padding:"4px 10px", borderRadius:6, border:`1px solid ${kleur.hoofd}`,
                      background:kleur.licht, color:kleur.donker, cursor:"pointer", fontSize:fs-3 }}>
                    {opt.l}
                  </button>
                ))}

                {u.id !== huidigUserId && (
                  <>
                    <span style={{ width:1, height:18, background:"var(--color-border-tertiary)", margin:"0 4px" }} />
                    <button onClick={()=>toggleBlokkeren(u)}
                      style={{ padding:"4px 10px", borderRadius:6, cursor:"pointer", fontSize:fs-3, border:"none",
                        background: u.is_actief ? "#fffbf0" : "#eaf3de",
                        color: u.is_actief ? "#7a5800" : "#27500a" }}>
                      {u.is_actief ? "🔒 Blokkeren" : "🔓 Deblokkeren"}
                    </button>
                    <button onClick={()=>setVerwijderModal(u)}
                      style={{ padding:"4px 10px", borderRadius:6, cursor:"pointer", fontSize:fs-3,
                        background:"#fcebeb", color:"#a32d2d", border:"none" }}>
                      🗑 Verwijderen
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Verwijder bevestiging */}
      {verwijderModal && (
        <Modal title="⚠ Gebruiker verwijderen" onClose={()=>setVerwijderModal(null)} fs={fs}>
          <p style={{ fontSize:fs, color:"var(--color-text-primary)", marginBottom:"1rem", lineHeight:1.6 }}>
            Weet u zeker dat u <strong>{verwijderModal.naam}</strong> ({verwijderModal.username}) wilt verwijderen?
          </p>
          <div style={{ background:"#fcebeb", borderRadius:10, padding:"12px 14px", marginBottom:"1.25rem" }}>
            <p style={{ margin:0, fontSize:fs-1, color:"#a32d2d", fontWeight:600 }}>
              Deze actie kan niet ongedaan worden gemaakt.
            </p>
            <p style={{ margin:"6px 0 0", fontSize:fs-2, color:"#a32d2d", lineHeight:1.5 }}>
              Alle gekoppelde data wordt permanent verwijderd: klanten, offertes, kassa bonnen,
              werkbonnen, declaraties, agenda-afspraken, producten en alle overige gegevens van deze gebruiker.
            </p>
          </div>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
            <Btn onClick={()=>setVerwijderModal(null)} fs={fs}>Annuleren</Btn>
            <Btn variant="danger" onClick={bevestigVerwijderen} fs={fs}>🗑 Definitief verwijderen</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── KLANTEN ──────────────────────────────────────────────────────────────────
function KlantenPage({ klanten, setKlanten, producten, agenda, werkbonnen, kassaBonnen, kleur, fs, isDemoMode, herlaad, T, isMobiel }) {
  const [zoek, setZoek] = useState("");
  const [modal, setModal] = useState(null);
  const [sel, setSel] = useState(null);
  const [form, setForm] = useState({ naam:"", email:"", telefoon:"", straat:"", postcode:"", stad:"", producten:[], offertes:[] });
  const [tabblad, setTabblad] = useState("info"); // "info" | "afspraken" | "offertes"
  const [openOfferte, setOpenOfferte] = useState(null);
  const [openKassaBon, setOpenKassaBon] = useState(null);
  const [klantDetailModal, setKlantDetailModal] = useState(null); // klant voor popup

  const filtered = klanten.filter(k=>
    (k.naam||"").toLowerCase().includes(zoek.toLowerCase()) ||
    (k.email||"").toLowerCase().includes(zoek.toLowerCase())
  );

  function openNieuw() { setForm({ naam:"", email:"", telefoon:"", straat:"", postcode:"", stad:"", producten:[], offertes:[] }); setModal("nieuw"); }
  function openBewerk(k) { setForm({...k, straat:k.straat||"", postcode:k.postcode||"", stad:k.stad||""}); setModal("bewerk"); }

  async function save() {
    if (!form.naam) return;
    if (isDemoMode) {
      if (modal==="nieuw") setKlanten(p=>[...p,{...form,id:"k"+uid()}]);
      else { setKlanten(p=>p.map(k=>k.id===form.id?form:k)); if(sel?.id===form.id) setSel(form); }
      setModal(null); return;
    }
    try {
      if (modal==="nieuw") {
        const { id } = await API.maakKlantAan({ naam:form.naam, email:form.email, telefoon:form.telefoon, straat:form.straat, postcode:form.postcode, stad:form.stad });
        if (form.producten?.length) await API.updateKlant(id, { naam:form.naam, email:form.email, telefoon:form.telefoon, straat:form.straat, postcode:form.postcode, stad:form.stad, producten:form.producten });
      } else {
        await API.updateKlant(form.id, { naam:form.naam, email:form.email, telefoon:form.telefoon, straat:form.straat, postcode:form.postcode, stad:form.stad, producten:form.producten });
      }
      await herlaad();
      setModal(null);
    } catch(e) { alert("Opslaan mislukt: " + e.message); }
  }

  async function del(id) {
    if (!confirm(T.klantVerwijderen)) return;
    if (isDemoMode) { setKlanten(p=>p.filter(k=>k.id!==id)); if(sel?.id===id) setSel(null); return; }
    try { await API.verwijderKlant(id); if(sel?.id===id) setSel(null); await herlaad(); }
    catch(e) { alert("Verwijderen mislukt: " + e.message); }
  }
  function togP(pid) { setForm(f=>({...f,producten:f.producten.includes(pid)?f.producten.filter(x=>x!==pid):[...f.producten,pid]})); }

  function selectKlant(k) { setSel(k); setTabblad("info"); }

  // Afspraken voor geselecteerde klant
  const klantAfspraken = sel ? agenda.filter(a=>a.klantId===sel.id).sort((a,b)=>(a.datum+a.tijd).localeCompare(b.datum+b.tijd)) : [];
  const nu = new Date().toISOString().slice(0,10);
  const toekomst = klantAfspraken.filter(a=>a.datum>=nu);
  const verleden = klantAfspraken.filter(a=>a.datum<nu);

  // Offertes voor geselecteerde klant
  const klantOffertes = sel ? (sel.offertes||[]) : [];
  const klantWerkbonnen = sel ? (werkbonnen||[]).filter(w=>w.klant_id===sel.id) : [];
  const klantKassa = sel ? (kassaBonnen||[]).filter(b=>b.klant_id===sel.id) : [];

  return (
    <div style={{ display:"grid", gridTemplateColumns: isMobiel ? "1fr" : "1fr 1fr", gap:"1.5rem" }}>
      <div>
        <div style={{ display:"flex", gap:8, marginBottom:"1rem" }}>
          <input value={zoek} onChange={e=>setZoek(e.target.value)} placeholder={T.zoekKlantPlaceholder}
            style={{ flex:1, padding:"8px 12px", borderRadius:8, border:"0.5px solid var(--color-border-secondary)",
              background:"var(--color-background-primary)", color:"var(--color-text-primary)", fontSize:fs }} />
          <Btn variant="primary" onClick={openNieuw} kleur={kleur} fs={fs}>{T.nieuw}</Btn>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {filtered.length===0&&<p style={{ color:"var(--color-text-secondary)", fontSize:fs }}>Geen klanten gevonden.</p>}
          {filtered.map(k=>(
            <div key={k.id} onClick={()=>selectKlant(k)}
              onDoubleClick={()=>{ selectKlant(k); setKlantDetailModal(k); }}
              title="Klik om te selecteren · Dubbelklik voor popup"
              style={{ background:"var(--color-background-primary)",
              border:sel?.id===k.id?`1.5px solid ${kleur.hoofd}`:"0.5px solid var(--color-border-tertiary)",
              borderRadius:12, padding:"12px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:12 }}>
              <Avatar naam={k.naam} kleur={kleur} />
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ margin:0, fontWeight:500, fontSize:fs, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{k.naam}</p>
                <p style={{ margin:0, fontSize:fs-1, color:"var(--color-text-secondary)" }}>{k.email}</p>
              </div>
              <Badge kleur={kleur}>{k.producten.length} prod.</Badge>
              <div style={{ display:"flex", gap:4 }}>
                <button onClick={e=>{e.stopPropagation();openBewerk(k);}} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--color-text-secondary)",padding:4,fontSize:fs+2 }}>✎</button>
                <button onClick={e=>{e.stopPropagation();del(k.id);}} style={{ background:"none",border:"none",cursor:"pointer",color:"#A32D2D",padding:4,fontSize:fs+2 }}>✕</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        {sel ? (
          <div style={{ background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:12, padding:"1.25rem" }}>
            {/* Header */}
            <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:"1rem" }}>
              <Avatar naam={sel.naam} size={48} kleur={kleur} />
              <div style={{ flex:1 }}>
                <h3 style={{ margin:0, fontSize:fs+2, fontWeight:500 }}>{sel.naam}</h3>
                <p style={{ margin:0, fontSize:fs-1, color:"var(--color-text-secondary)" }}>{sel.email}</p>
              </div>
            </div>
            {/* Tabbladen */}
            <div style={{ display:"flex", borderBottom:"0.5px solid var(--color-border-tertiary)", marginBottom:"1rem", gap:0 }}>
              {[
                {id:"info",label:T.info},
                {id:"afspraken",label:T.afspraken+" ("+klantAfspraken.length+")"},
                {id:"offertes",label:T.offertes+" ("+klantOffertes.length+")"},
                {id:"werkbonnen",label:"Werkbonnen ("+klantWerkbonnen.length+")"},
                {id:"kassa",label:"Kassa ("+klantKassa.length+")"},
              ].map(t=>(
                <button key={t.id} onClick={()=>setTabblad(t.id)} style={{
                  padding:"7px 14px", border:"none", background:"none", cursor:"pointer",
                  fontSize:fs-1, fontWeight:500,
                  color:tabblad===t.id?kleur.hoofd:"var(--color-text-secondary)",
                  borderBottom:tabblad===t.id?`2px solid ${kleur.hoofd}`:"2px solid transparent",
                  marginBottom:-1
                }}>{t.label}</button>
              ))}
            </div>

            {tabblad==="info"&&(
              <>
                <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:"1rem" }}>
                  {[{l:T.telefoon,v:sel.telefoon},{l:T.adres,v:[sel.straat,sel.postcode,sel.stad].filter(Boolean).join(', ')}].map(r=>(
                    <div key={r.l} style={{ display:"flex", gap:8 }}>
                      <span style={{ fontSize:fs-1, color:"var(--color-text-secondary)", minWidth:70 }}>{r.l}</span>
                      <span style={{ fontSize:fs-1 }}>{r.v||"—"}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize:fs-1, color:"var(--color-text-secondary)", marginBottom:8 }}>Afgenomen producten</p>
                {sel.producten.length===0&&<p style={{ fontSize:fs-1, color:"var(--color-text-secondary)" }}>Geen producten gekoppeld.</p>}
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {sel.producten.map(pid=>{const p=producten.find(x=>x.id===pid);if(!p)return null;return(
                    <div key={pid} style={{ background:"var(--color-background-secondary)", borderRadius:8, padding:"8px 12px", display:"flex", justifyContent:"space-between" }}>
                      <span style={{ fontSize:fs }}>{p.naam}</span>
                      <span style={{ fontSize:fs, fontWeight:500, color:kleur.hoofd }}>€{p.prijs.toLocaleString("nl-NL")}</span>
                    </div>
                  );})}
                </div>
              </>
            )}

            {tabblad==="afspraken"&&(
              <div>
                {klantAfspraken.length===0&&<p style={{ fontSize:fs-1, color:"var(--color-text-secondary)" }}>Geen afspraken gevonden.</p>}
                {toekomst.length>0&&(
                  <>
                    <p style={{ fontSize:fs-2, fontWeight:600, color:kleur.donker, marginBottom:6, letterSpacing:"0.04em" }}>KOMEND</p>
                    {toekomst.map(a=>(
                      <div key={a.id} style={{ display:"flex", gap:10, marginBottom:8, padding:"8px 10px",
                        background:kleur.licht, borderRadius:8, borderLeft:`3px solid ${kleur.hoofd}` }}>
                        <div style={{ minWidth:80, fontSize:fs-1, fontWeight:500, color:kleur.donker }}>
                          {new Date(a.datum+"T12:00:00").toLocaleDateString("nl-NL",{day:"numeric",month:"short"})}<br/>
                          <span style={{ fontWeight:400 }}>{a.tijd}</span>
                        </div>
                        <span style={{ fontSize:fs-1, color:"#333" }}>{a.notitie||"—"}</span>
                      </div>
                    ))}
                  </>
                )}
                {verleden.length>0&&(
                  <>
                    <p style={{ fontSize:fs-2, fontWeight:600, color:"#888", marginBottom:6, marginTop:12, letterSpacing:"0.04em" }}>VERLEDEN</p>
                    {verleden.map(a=>(
                      <div key={a.id} style={{ display:"flex", gap:10, marginBottom:8, padding:"8px 10px",
                        background:"var(--color-background-secondary)", borderRadius:8, borderLeft:"3px solid #ccc" }}>
                        <div style={{ minWidth:80, fontSize:fs-1, color:"#888" }}>
                          {new Date(a.datum+"T12:00:00").toLocaleDateString("nl-NL",{day:"numeric",month:"short"})}<br/>
                          {a.tijd}
                        </div>
                        <span style={{ fontSize:fs-1, color:"var(--color-text-secondary)" }}>{a.notitie||"—"}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}

            {tabblad==="offertes"&&(
              <div>
                {klantOffertes.length===0&&<p style={{ fontSize:fs-1, color:"var(--color-text-secondary)" }}>Nog geen offertes opgeslagen.</p>}
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {klantOffertes.map(o=>(
                    <div key={o.id} style={{ background:"var(--color-background-secondary)", borderRadius:8, padding:"10px 12px" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <div>
                          <p style={{ margin:0, fontWeight:500, fontSize:fs }}>{o.referentie}</p>
                          <p style={{ margin:0, fontSize:fs-2, color:"var(--color-text-secondary)" }}>
                            {o.datum} · {o.regels.length} regel{o.regels.length!==1?"s":""}
                          </p>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <span style={{ fontSize:fs, fontWeight:500, color:kleur.hoofd }}>
                            €{o.totaalInclBtw.toLocaleString("nl-NL",{minimumFractionDigits:2})}
                          </span>
                          <button onClick={()=>setOpenOfferte(o)}
                            style={{ padding:"5px 12px", borderRadius:8, border:`1px solid ${kleur.hoofd}`,
                              background:kleur.licht, color:kleur.donker, cursor:"pointer", fontSize:fs-2, fontWeight:500 }}>
                            📄 Openen
                          </button>
                        </div>
                      </div>
                      <p style={{ margin:"4px 0 0", fontSize:fs-2, color:"var(--color-text-secondary)" }}>
                        {o.regels.map(r=>r.naam).filter(Boolean).join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tabblad==="werkbonnen"&&(
              <div>
                {klantWerkbonnen.length===0&&<p style={{ fontSize:fs-1, color:"var(--color-text-secondary)" }}>Geen werkbonnen gevonden.</p>}
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {klantWerkbonnen.map(w=>{
                    const st = WERKBON_STATUSSEN?.find(s=>s.id===w.status);
                    return (
                      <div key={w.id} style={{ background:"var(--color-background-secondary)", borderRadius:8, padding:"10px 12px",
                        borderLeft:`3px solid ${st?.kleur||kleur.hoofd}` }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                          <div>
                            <p style={{ margin:0, fontWeight:500, fontSize:fs }}>{w.referentie}</p>
                            <p style={{ margin:0, fontSize:fs-2, color:"var(--color-text-secondary)" }}>{w.product_omschrijving||"—"}</p>
                          </div>
                          <span style={{ fontSize:fs-3, padding:"2px 8px", borderRadius:99,
                            background:st?.bg||kleur.licht, color:st?.kleur||kleur.donker }}>{st?.label||w.status}</span>
                        </div>
                        {w.datum_klaar&&<p style={{ margin:"4px 0 0", fontSize:fs-3, color:"var(--color-text-secondary)" }}>Klaar: {w.datum_klaar}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {tabblad==="kassa"&&(
              <div>
                {klantKassa.length===0&&<p style={{ fontSize:fs-1, color:"var(--color-text-secondary)" }}>Geen kassa bonnen gevonden.</p>}
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {klantKassa.map(b=>(
                    <div key={b.id} onClick={()=>setOpenKassaBon(b)}
                      style={{ background:"var(--color-background-secondary)", borderRadius:8, padding:"10px 12px", cursor:"pointer" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <div>
                          <p style={{ margin:0, fontWeight:500, fontSize:fs }}>{b.referentie}</p>
                          <p style={{ margin:0, fontSize:fs-2, color:"var(--color-text-secondary)" }}>
                            {b.datum||""} · {b.betaalmethode||""} · {(b.regels||[]).length} artikel{(b.regels||[]).length!==1?"en":""}
                          </p>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <span style={{ fontSize:fs, fontWeight:700, color:kleur.hoofd }}>
                            €{parseFloat(b.totaal_incl_btw||0).toLocaleString("nl-NL",{minimumFractionDigits:2})}
                          </span>
                          <button onClick={e=>{e.stopPropagation();setOpenKassaBon(b);}}
                            style={{ padding:"5px 12px", borderRadius:8, border:`1px solid ${kleur.hoofd}`,
                              background:kleur.licht, color:kleur.donker, cursor:"pointer", fontSize:fs-2, fontWeight:500 }}>
                            🧾 Openen
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ):(
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:200,
            color:"var(--color-text-secondary)", fontSize:fs, border:"0.5px dashed var(--color-border-tertiary)", borderRadius:12 }}>
            Selecteer een klant om details te zien
          </div>
        )}
      </div>

      {(modal==="nieuw"||modal==="bewerk")&&(
        <Modal title={modal==="nieuw"?T.nieuweKlant:T.klantBewerken} onClose={()=>setModal(null)} fs={fs}>
          <FF label={T.naam} fs={fs}><input value={form.naam} onChange={e=>setForm(f=>({...f,naam:e.target.value}))} style={iSt(fs)} /></FF>
          <FF label={T.emailadres} fs={fs}><input type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} style={iSt(fs)} /></FF>
          <FF label={T.telefoon} fs={fs}><input value={form.telefoon} onChange={e=>setForm(f=>({...f,telefoon:e.target.value}))} style={iSt(fs)} /></FF>
          <FF label="Straat" fs={fs}><input value={form.straat||""} onChange={e=>setForm(f=>({...f,straat:e.target.value}))} placeholder="Straatnaam + huisnummer" style={iSt(fs)} /></FF>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:8 }}>
            <FF label="Postcode" fs={fs}><input value={form.postcode||""} onChange={e=>setForm(f=>({...f,postcode:e.target.value}))} placeholder="1234 AB" style={iSt(fs)} /></FF>
            <FF label="Dorp / Stad" fs={fs}><input value={form.stad||""} onChange={e=>setForm(f=>({...f,stad:e.target.value}))} placeholder="Amsterdam" style={iSt(fs)} /></FF>
          </div>
          <FF label={T.productenKoppelen} fs={fs}>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {producten.map(p=>(
                <label key={p.id} style={{ display:"flex", alignItems:"center", gap:8, fontSize:fs, cursor:"pointer", color:"#1a1a1a" }}>
                  <input type="checkbox" checked={form.producten.includes(p.id)} onChange={()=>togP(p.id)} />
                  {p.naam} — €{p.prijs.toLocaleString("nl-NL")}
                </label>
              ))}
            </div>
          </FF>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:"1rem" }}>
            <Btn onClick={()=>setModal(null)} fs={fs}>Annuleren</Btn>
            <Btn variant="primary" onClick={save} kleur={kleur} fs={fs}>Opslaan</Btn>
          </div>
        </Modal>
      )}

      {/* Offerte viewer modal */}
      {openOfferte&&(
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", display:"flex",
          alignItems:"flex-start", justifyContent:"center", zIndex:1000, padding:"1rem", overflowY:"auto" }}
          onClick={e=>e.target===e.currentTarget&&setOpenOfferte(null)}>
          <div style={{ background:"#f5f5f5", borderRadius:12, padding:"1rem", width:"100%", maxWidth:680, marginTop:"1rem" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem" }}>
              <div>
                <h2 style={{ margin:0, fontSize:fs+2, fontWeight:500, color:"#1a1a1a" }}>{openOfferte.referentie}</h2>
                <p style={{ margin:0, fontSize:fs-2, color:"#888" }}>{sel?.naam} · {openOfferte.datum}</p>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>window.print()} style={{ padding:"7px 14px", borderRadius:8,
                  background:kleur.hoofd, color:"#fff", border:"none", cursor:"pointer", fontSize:fs-1 }}>
                  🖨 Afdrukken
                </button>
                <button onClick={()=>setOpenOfferte(null)} style={{ background:"none", border:"none",
                  cursor:"pointer", fontSize:22, color:"#666", padding:"4px 8px", lineHeight:1 }}>×</button>
              </div>
            </div>
            <OffertePreview offerte={openOfferte} klant={sel} kleur={kleur} />
          </div>
        </div>
      )}

      {/* Kassa bon viewer modal */}
      {openKassaBon&&(()=>{
        const fmtB = n => "€" + parseFloat(n||0).toLocaleString("nl-NL",{minimumFractionDigits:2});
        const regels = openKassaBon.regels || [];
        const subTotaal = regels.reduce((s,r)=>s+(parseFloat(r.prijs)||0)*(r.aantal||1),0);
        const btwBedrag = openKassaBon.incl_btw ? Math.round(subTotaal*0.21*100)/100 : 0;
        return (
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", display:"flex",
            alignItems:"flex-start", justifyContent:"center", zIndex:1000, padding:"1rem", overflowY:"auto" }}
            onClick={e=>e.target===e.currentTarget&&setOpenKassaBon(null)}>
            <div style={{ background:"#fff", borderRadius:12, padding:"1.5rem", width:"100%", maxWidth:420, marginTop:"1rem" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1rem" }}>
                <div>
                  <h2 style={{ margin:0, fontSize:fs+2, fontWeight:600, color:"#1a1a1a" }}>🧾 {openKassaBon.referentie}</h2>
                  <p style={{ margin:"2px 0 0", fontSize:fs-2, color:"#888" }}>
                    {sel?.naam} · {openKassaBon.datum} · {openKassaBon.betaalmethode}
                  </p>
                </div>
                <button onClick={()=>setOpenKassaBon(null)} style={{ background:"none", border:"none",
                  cursor:"pointer", fontSize:22, color:"#666", padding:"4px 8px", lineHeight:1 }}>×</button>
              </div>

              <div style={{ background:"#f5f5f5", borderRadius:8, padding:"12px", marginBottom:"1rem" }}>
                {regels.length===0 && <p style={{ fontSize:fs-1, color:"#888", margin:0 }}>Geen artikelen gevonden.</p>}
                {regels.map((r,i)=>(
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom:6, fontSize:fs-1 }}>
                    <span>{r.aantal||1}× {r.naam||"—"}</span>
                    <span style={{ fontWeight:500 }}>{fmtB((parseFloat(r.prijs)||0)*(r.aantal||1))}</span>
                  </div>
                ))}
                {openKassaBon.incl_btw && (
                  <>
                    <div style={{ borderTop:"1px solid #ddd", margin:"8px 0" }} />
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:fs-2, color:"#666" }}>
                      <span>Subtotaal excl. BTW</span><span>{fmtB(subTotaal)}</span>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:fs-2, color:"#666" }}>
                      <span>BTW 21%</span><span>{fmtB(btwBedrag)}</span>
                    </div>
                  </>
                )}
                <div style={{ borderTop:"1px solid #ddd", margin:"8px 0" }} />
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:fs+2, fontWeight:700, color:kleur.hoofd }}>
                  <span>Totaal</span><span>{fmtB(openKassaBon.totaal_incl_btw)}</span>
                </div>
              </div>

              <button onClick={()=>setOpenKassaBon(null)}
                style={{ width:"100%", padding:"10px", borderRadius:8, background:kleur.hoofd,
                  color:"#fff", border:"none", cursor:"pointer", fontSize:fs-1, fontWeight:500 }}>
                Sluiten
              </button>
            </div>
          </div>
        );
      })()}

      {/* Klant detail popup (dubbelklik) */}
      {klantDetailModal&&(()=>{
        const k = klantDetailModal;
        const kAfspraken = agenda.filter(a=>a.klantId===k.id).sort((a,b)=>(a.datum+a.tijd).localeCompare(b.datum+b.tijd));
        const nu = new Date().toISOString().slice(0,10);
        return (
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", display:"flex",
            alignItems:"center", justifyContent:"center", zIndex:1000, padding:"1rem", overflowY:"auto" }}
            onClick={e=>e.target===e.currentTarget&&setKlantDetailModal(null)}>
            <div style={{ background:"#ffffff", color:"#1a1a1a", borderRadius:16,
              border:"1px solid #d0d0d0", width:"100%", maxWidth:560,
              boxShadow:"0 16px 48px rgba(0,0,0,0.25)", overflow:"hidden" }}>
              {/* Header */}
              <div style={{ background:kleur.hoofd, padding:"1.25rem 1.5rem", display:"flex", alignItems:"center", gap:14 }}>
                <Avatar naam={k.naam} size={48} kleur={{licht:"rgba(255,255,255,0.2)",donker:"#fff"}} />
                <div style={{ flex:1 }}>
                  <h2 style={{ margin:0, fontSize:fs+4, fontWeight:600, color:"#fff" }}>{k.naam}</h2>
                  <p style={{ margin:0, fontSize:fs-1, color:"rgba(255,255,255,0.8)" }}>{k.email}</p>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={()=>{ openBewerk(k); setKlantDetailModal(null); }}
                    style={{ padding:"6px 12px", borderRadius:8, background:"rgba(255,255,255,0.2)",
                      color:"#fff", border:"1px solid rgba(255,255,255,0.4)", cursor:"pointer", fontSize:fs-1 }}>
                    ✎ Bewerken
                  </button>
                  <button onClick={()=>setKlantDetailModal(null)}
                    style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.7)", fontSize:22, lineHeight:1, padding:"0 4px" }}>×</button>
                </div>
              </div>
              {/* Content */}
              <div style={{ padding:"1.25rem 1.5rem", display:"flex", flexDirection:"column", gap:16, maxHeight:"65vh", overflowY:"auto" }}>
                {/* Contact */}
                <div>
                  <p style={{ margin:"0 0 8px", fontSize:fs-2, fontWeight:600, color:"#888", letterSpacing:"0.05em" }}>{T.telefoon.toUpperCase()} & {T.adres.toUpperCase()}</p>
                  {[{l:"Telefoon",v:k.telefoon},{l:T.adres,v:[k.straat,k.postcode,k.stad].filter(Boolean).join(', ')}].map(r=>(
                    <div key={r.l} style={{ display:"flex", gap:8, marginBottom:4 }}>
                      <span style={{ fontSize:fs-1, color:"#888", minWidth:70 }}>{r.l}</span>
                      <span style={{ fontSize:fs-1 }}>{r.v||"—"}</span>
                    </div>
                  ))}
                </div>
                {/* Producten */}
                <div>
                  <p style={{ margin:"0 0 8px", fontSize:fs-2, fontWeight:600, color:"#888", letterSpacing:"0.05em" }}>PRODUCTEN ({k.producten.length})</p>
                  {k.producten.length===0 ? <p style={{ fontSize:fs-1, color:"#888" }}>Geen producten gekoppeld.</p> : (
                    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                      {k.producten.map(pid=>{const p=producten.find(x=>x.id===pid);if(!p)return null;return(
                        <div key={pid} style={{ display:"flex", justifyContent:"space-between", padding:"7px 10px",
                          background:"#f5f5f5", borderRadius:8 }}>
                          <span style={{ fontSize:fs-1 }}>{p.naam}</span>
                          <span style={{ fontSize:fs-1, fontWeight:500, color:kleur.hoofd }}>€{p.prijs.toLocaleString("nl-NL",{minimumFractionDigits:2})}</span>
                        </div>
                      );})}
                      <div style={{ textAlign:"right", fontSize:fs-1, color:"#888", marginTop:4 }}>
                        {T.totaal}: <strong>€{k.producten.reduce((s,pid)=>s+(producten.find(p=>p.id===pid)?.prijs||0),0).toLocaleString("nl-NL",{minimumFractionDigits:2})}</strong>
                      </div>
                    </div>
                  )}
                </div>
                {/* Aankomende afspraken */}
                {kAfspraken.filter(a=>a.datum>=nu).length>0&&(
                  <div>
                    <p style={{ margin:"0 0 8px", fontSize:fs-2, fontWeight:600, color:"#888", letterSpacing:"0.05em" }}>AANKOMENDE AFSPRAKEN</p>
                    {kAfspraken.filter(a=>a.datum>=nu).map(a=>(
                      <div key={a.id} style={{ display:"flex", gap:10, padding:"7px 10px",
                        background:kleur.licht, borderRadius:8, borderLeft:`3px solid ${kleur.hoofd}`, marginBottom:6 }}>
                        <span style={{ fontSize:fs-1, fontWeight:500, color:kleur.donker, minWidth:80 }}>
                          {new Date(a.datum+"T12:00:00").toLocaleDateString("nl-NL",{day:"numeric",month:"short"})} {a.tijd}
                        </span>
                        <span style={{ fontSize:fs-1 }}>{a.notitie||"—"}</span>
                      </div>
                    ))}
                  </div>
                )}
                {/* Offertes */}
                {(k.offertes||[]).length>0&&(
                  <div>
                    <p style={{ margin:"0 0 8px", fontSize:fs-2, fontWeight:600, color:"#888", letterSpacing:"0.05em" }}>OFFERTES ({k.offertes.length})</p>
                    {k.offertes.map(o=>(
                      <div key={o.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                        padding:"7px 10px", background:"#f5f5f5", borderRadius:8, marginBottom:6 }}>
                        <div>
                          <p style={{ margin:0, fontSize:fs-1, fontWeight:500 }}>{o.referentie}</p>
                          <p style={{ margin:0, fontSize:fs-3, color:"#888" }}>{o.datum}</p>
                        </div>
                        <span style={{ fontSize:fs-1, fontWeight:500, color:kleur.hoofd }}>€{o.totaalInclBtw?.toLocaleString("nl-NL",{minimumFractionDigits:2})}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
function ProductenPage({ producten, setProducten, kleur, fs, isDemoMode, herlaad, T }) {
  const [modal, setModal] = useState(false);
  const [catModal, setCatModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ naam:"", prijs:"", beschrijving:"", categorie:"", voorraad:"", inkoopprijs:"" });
  const [activeCat, setActiveCat] = useState("Alle");
  const [zoek, setZoek] = useState("");
  const [toonInkoop, setToonInkoop] = useState(false);
  const [nieuweCategorie, setNieuweCategorie] = useState("");

  const cats = [...new Set(producten.map(p=>p.categorie).filter(Boolean))].sort();
  const alleCats = ["Alle", ...cats];

  const gefilterd = producten.filter(p => {
    const catOk = activeCat === "Alle" || p.categorie === activeCat;
    const zoekOk = !zoek || p.naam.toLowerCase().includes(zoek.toLowerCase()) || (p.beschrijving||"").toLowerCase().includes(zoek.toLowerCase());
    return catOk && zoekOk;
  });

  function openNieuw() {
    setForm({ naam:"", prijs:"", beschrijving:"", categorie: activeCat !== "Alle" ? activeCat : "", voorraad:"", inkoopprijs:"" });
    setEditProduct(null); setToonInkoop(false); setModal(true);
  }
  function openEdit(p) {
    setForm({ naam:p.naam, prijs:String(p.prijs), beschrijving:p.beschrijving||"",
      categorie:p.categorie||"", voorraad:p.voorraad!=null?String(p.voorraad):"",
      inkoopprijs:p.inkoopprijs!=null?String(p.inkoopprijs):"" });
    setEditProduct(p); setToonInkoop(false); setModal(true);
  }

  async function save() {
    if(!form.naam||!form.prijs) return;
    const extra = {
      voorraad: form.voorraad !== "" ? parseInt(form.voorraad) : null,
      inkoopprijs: form.inkoopprijs !== "" ? parseFloat(form.inkoopprijs) : null,
    };
    if (isDemoMode) {
      if (editProduct) setProducten(prev => prev.map(p => p.id === editProduct.id ? {...p, ...form, prijs:parseFloat(form.prijs), ...extra} : p));
      else setProducten(p=>[...p,{...form,id:"p"+uid(),prijs:parseFloat(form.prijs),...extra}]);
      setModal(false); return;
    }
    try {
      const data = { naam:form.naam, prijs:parseFloat(form.prijs), beschrijving:form.beschrijving,
        categorie_id: null, voorraad:extra.voorraad, inkoopprijs:extra.inkoopprijs,
        // Stuur categorie naam mee, server slaat op als tekst in producten
        categorie: form.categorie };
      if (editProduct) await API.updateProduct(editProduct.id, data);
      else await API.maakProductAan(data);
      await herlaad();
      setModal(false);
    } catch(e) { alert("Opslaan mislukt: " + e.message); }
  }

  async function del(id) {
    if (!confirm(T.productVerwijderen)) return;
    if (isDemoMode) { setProducten(p=>p.filter(x=>x.id!==id)); return; }
    try { await API.verwijderProduct(id); await herlaad(); }
    catch(e) { alert("Verwijderen mislukt: " + e.message); }
  }

  function voegCatToe() {
    const naam = nieuweCategorie.trim();
    if (!naam || cats.includes(naam)) return;
    setNieuweCategorie("");
    setActiveCat(naam);
    setForm(f=>({...f, categorie:naam}));
    setEditProduct(null); setToonInkoop(false); setModal(true);
    setCatModal(false);
  }

  async function verwijderCategorie(cat) {
    if (!confirm(`${T.categorieVerwijderen} "${cat}"?`)) return;
    if (isDemoMode) {
      setProducten(prev => prev.map(p => p.categorie === cat ? {...p, categorie:""} : p));
      if (activeCat === cat) setActiveCat("Alle"); return;
    }
    try {
      // Update alle producten in deze categorie — verwijder hun categorie
      const teUpdaten = producten.filter(p => p.categorie === cat);
      await Promise.all(teUpdaten.map(p => API.updateProduct(p.id, {...p, categorie:"", categorie_id:null})));
      await herlaad();
      if (activeCat === cat) setActiveCat("Alle");
    } catch(e) { alert("Verwijderen mislukt: " + e.message); }
  }

  return (
    <div>
      {/* Categorieën tabs + beheer */}
      <div style={{ display:"flex", gap:6, marginBottom:"1rem", flexWrap:"wrap", alignItems:"center" }}>
        <div style={{ display:"flex", gap:4, flex:1, flexWrap:"wrap" }}>
          {alleCats.map(cat=>(
            <div key={cat} style={{ display:"flex", alignItems:"center", gap:0 }}>
              <button onClick={()=>setActiveCat(cat)} style={{
                padding:"6px 14px", borderRadius: cat==="Alle" ? 99 : "99px 0 0 99px",
                border:"none", cursor:"pointer", fontSize:fs-1, fontWeight:500, transition:"all 0.15s",
                background: activeCat===cat ? kleur.hoofd : "var(--color-background-secondary)",
                color: activeCat===cat ? "#fff" : "var(--color-text-secondary)",
                paddingRight: cat!=="Alle" ? 8 : 14,
              }}>
                {cat}
                <span style={{ marginLeft:6, fontSize:fs-3, opacity:0.75 }}>
                  {cat==="Alle" ? producten.length : producten.filter(p=>p.categorie===cat).length}
                </span>
              </button>
              {cat!=="Alle" && (
                <button onClick={()=>verwijderCategorie(cat)} title={`Categorie "${cat}" verwijderen`}
                  style={{ padding:"6px 8px", borderRadius:"0 99px 99px 0", border:"none", cursor:"pointer",
                    fontSize:fs-2, transition:"all 0.15s",
                    background: activeCat===cat ? kleur.donker : "var(--color-background-secondary)",
                    color: activeCat===cat ? "#fff" : "#aaa" }}>✕</button>
              )}
            </div>
          ))}
          {/* Categorie toevoegen knop */}
          <button onClick={()=>{ setNieuweCategorie(""); setCatModal(true); }}
            style={{ padding:"6px 12px", borderRadius:99, border:`1.5px dashed ${kleur.hoofd}`,
              cursor:"pointer", fontSize:fs-2, fontWeight:500,
              background:"transparent", color:kleur.hoofd }}>
            + Categorie
          </button>
        </div>
        <input value={zoek} onChange={e=>setZoek(e.target.value)} placeholder="Zoeken…"
          style={{ padding:"6px 12px", borderRadius:8, border:"0.5px solid var(--color-border-secondary)",
            background:"var(--color-background-primary)", color:"var(--color-text-primary)", fontSize:fs-1, width:160 }} />
        <Btn variant="primary" onClick={openNieuw} kleur={kleur} fs={fs}>+ Nieuw product</Btn>
      </div>

      {/* Productenlijst */}
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {gefilterd.length===0&&(
          <div style={{ padding:"2rem", textAlign:"center", color:"var(--color-text-secondary)", fontSize:fs-1,
            border:"0.5px dashed var(--color-border-tertiary)", borderRadius:12 }}>
            Geen producten gevonden{activeCat!=="Alle"?` in categorie "${activeCat}"`:""}
          </div>
        )}
        {gefilterd.map(p=>(
          <div key={p.id} style={{ background:"var(--color-background-primary)",
            border:"0.5px solid var(--color-border-tertiary)", borderRadius:12,
            padding:"12px 16px", display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:4, alignSelf:"stretch", borderRadius:4, flexShrink:0,
              background: cats.length ? kleur.hoofd : "#ccc", opacity: p.categorie ? 1 : 0.3 }} />
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:2 }}>
                <p style={{ margin:0, fontWeight:500, fontSize:fs, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.naam}</p>
                {p.categorie&&<Badge kleur={kleur}>{p.categorie}</Badge>}
                {p.voorraad!=null&&<span style={{ fontSize:fs-3, color:"var(--color-text-secondary)" }}>Voorraad: {p.voorraad}</span>}
              </div>
              {p.beschrijving&&<p style={{ margin:0, fontSize:fs-2, color:"var(--color-text-secondary)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.beschrijving}</p>}
            </div>
            <p style={{ margin:0, fontSize:fs+2, fontWeight:600, color:kleur.hoofd, flexShrink:0 }}>
              €{p.prijs.toLocaleString("nl-NL",{minimumFractionDigits:2,maximumFractionDigits:2})}
            </p>
            <div style={{ display:"flex", gap:4, flexShrink:0 }}>
              <button onClick={()=>openEdit(p)} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--color-text-secondary)",padding:4,fontSize:fs+2 }}>✎</button>
              <button onClick={()=>del(p.id)} style={{ background:"none",border:"none",cursor:"pointer",color:"#A32D2D",padding:4,fontSize:fs+2 }}>✕</button>
            </div>
          </div>
        ))}
      </div>

      {/* Product modal */}
      {modal&&(
        <Modal title={editProduct?T.productBewerken:T.nieuwProduct} onClose={()=>setModal(false)} fs={fs}>
          <FF label={T.productNaam} fs={fs}><input value={form.naam} onChange={e=>setForm(f=>({...f,naam:e.target.value}))} style={iSt(fs)} /></FF>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            <FF label={T.verkoopprijs} fs={fs}><input type="number" value={form.prijs} onChange={e=>setForm(f=>({...f,prijs:e.target.value}))} style={iSt(fs)} /></FF>
            <FF label={T.inkoopprijs} fs={fs}>
              <div style={{ position:"relative" }}>
                <input type={toonInkoop?"number":"password"} value={form.inkoopprijs}
                  onChange={e=>setForm(f=>({...f,inkoopprijs:e.target.value}))}
                  placeholder="Verborgen"
                  style={{...iSt(fs), paddingRight:36}} />
                <button onClick={()=>setToonInkoop(t=>!t)}
                  style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)",
                    background:"none", border:"none", cursor:"pointer", color:"#aaa", fontSize:16 }}>
                  {toonInkoop?"🙈":"👁"}
                </button>
              </div>
            </FF>
          </div>
          <FF label={T.beschrijving} fs={fs}><textarea value={form.beschrijving} onChange={e=>setForm(f=>({...f,beschrijving:e.target.value}))} rows={3} style={{...iSt(fs),resize:"vertical"}} /></FF>
          <FF label={T.categorie} fs={fs}>
            <input value={form.categorie} onChange={e=>setForm(f=>({...f,categorie:e.target.value}))} list="prod-cats" style={iSt(fs)} placeholder="Bijv. Web, Marketing, Design…" />
            <datalist id="prod-cats">{cats.map(c=><option key={c} value={c}/>)}</datalist>
          </FF>
          {/* Voorraad */}
          <div style={{ borderTop:"0.5px solid var(--color-border-tertiary)", paddingTop:"1rem", marginTop:"0.25rem" }}>
            <p style={{ margin:"0 0 8px", fontSize:fs-1, fontWeight:500, color:"var(--color-text-secondary)", letterSpacing:"0.04em" }}>VOORRAAD</p>
            <FF label={T.aantalOpVoorraad} fs={fs}>
              <input type="number" min="0" value={form.voorraad} onChange={e=>setForm(f=>({...f,voorraad:e.target.value}))}
                placeholder="Laat leeg indien niet van toepassing" style={iSt(fs)} />
            </FF>
          </div>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:"1rem" }}>
            <Btn onClick={()=>setModal(false)} fs={fs}>Annuleren</Btn>
            <Btn variant="primary" onClick={save} kleur={kleur} fs={fs}>Opslaan</Btn>
          </div>
        </Modal>
      )}

      {/* Categorie beheer modal */}
      {catModal&&(
        <Modal title={T.categorieToevoegen} onClose={()=>setCatModal(false)} fs={fs}>
          <p style={{ fontSize:fs-1, color:"#555", margin:"0 0 1rem" }}>
            Bestaande categorieën kun je verwijderen via het ✕-knopje naast de categorieknop.
          </p>
          {cats.length > 0 && (
            <div style={{ marginBottom:"1.25rem" }}>
              <p style={{ fontSize:fs-2, color:"#888", margin:"0 0 8px", fontWeight:500 }}>HUIDIGE CATEGORIEËN</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {cats.map(c=>(
                  <div key={c} style={{ display:"flex", alignItems:"center", gap:4, background:kleur.licht,
                    color:kleur.donker, borderRadius:99, padding:"4px 12px", fontSize:fs-1 }}>
                    <span>{c}</span>
                    <span style={{ fontSize:fs-3, color:"var(--color-text-secondary)" }}>
                      ({producten.filter(p=>p.categorie===c).length})
                    </span>
                    <button onClick={()=>{ verwijderCategorie(c); }} style={{ background:"none",border:"none",cursor:"pointer",color:kleur.donker,fontSize:13,padding:"0 0 0 4px",lineHeight:1 }}>✕</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <FF label={T.nieuweCategorieNaam} fs={fs}>
            <input value={nieuweCategorie} onChange={e=>setNieuweCategorie(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&voegCatToe()}
              placeholder="Bijv. Diensten, Hardware, Licenties…"
              style={iSt(fs)} />
          </FF>
          {cats.includes(nieuweCategorie.trim()) && (
            <p style={{ fontSize:fs-2, color:"#a32d2d", margin:"-0.5rem 0 0.5rem" }}>Deze categorie bestaat al.</p>
          )}
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:"1rem" }}>
            <Btn onClick={()=>setCatModal(false)} fs={fs}>Sluiten</Btn>
            <Btn variant="primary" onClick={voegCatToe} kleur={kleur} fs={fs}
              disabled={!nieuweCategorie.trim() || cats.includes(nieuweCategorie.trim())}>
              + Toevoegen & nieuw product
            </Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── AGENDA ───────────────────────────────────────────────────────────────────
function AgendaPage({ klanten, agenda, setAgenda, kleur, fs, isDemoMode, herlaad, T, instellingen, updateInstelling }) {
  const [view, setView] = useState("blok"); // blok | week | werkweek | lijst
  const [modal, setModal] = useState(false);
  const [werkweekModal, setWerkweekModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editAfspraak, setEditAfspraak] = useState(null);
  const [form, setForm] = useState({ klantId:"", datum:"", tijd:"", tijdTot:"", notitie:"" });
  const [filterDatum, setFilterDatum] = useState(new Date().toISOString().slice(0,10));
  const [hover, setHover] = useState(null);
  const [agendaNkModal, setAgendaNkModal] = useState(false);
  const [agendaNkForm, setAgendaNkForm] = useState({ naam:"", email:"", telefoon:"" });
  const [personen, setPersonen] = useState([]);
  const [personenModal, setPersonenModal] = useState(false);
  const [onlineBoekenModal, setOnlineBoekenModal] = useState(false);
  const [agendaInstelling, setAgendaInstelling] = useState({ agenda_publiek_actief:false, agenda_publiek_slug:"" });
  const [slugInvoer, setSlugInvoer] = useState("");
  const [velden, setVelden] = useState({ naam:true, straat:false, postcode:false, stad:false, opmerking:true });
  const [agendaProducten, setAgendaProducten] = useState([]);
  const [obBezig, setObBezig] = useState(false);
  const [obFout, setObFout] = useState("");
  const [obOpgeslagen, setObOpgeslagen] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [productEditId, setProductEditId] = useState(null);
  const [productForm, setProductForm] = useState({ naam:"", duur_minuten:30, min_vooraf_uren:1, prijs:"" });

  useEffect(() => {
    if (isDemoMode) return;
    API.haalAgendaInstellingOp().then(data => {
      setAgendaInstelling(data);
      setSlugInvoer(data.agenda_publiek_slug || "");
      if (data.agenda_publiek_velden) setVelden(data.agenda_publiek_velden);
    }).catch(()=>{});
    API.haalAgendaProductenOp().then(setAgendaProducten).catch(()=>{});
  }, []);

  async function slaAgendaInstellingOp(actief) {
    setObFout(""); setObBezig(true);
    try {
      await API.updateAgendaInstelling({ actief, slug: slugInvoer.trim().toLowerCase(), velden });
      setAgendaInstelling({ agenda_publiek_actief: actief, agenda_publiek_slug: slugInvoer.trim().toLowerCase() });
      setObOpgeslagen(true);
      setTimeout(()=>setObOpgeslagen(false), 2500);
    } catch(e) { setObFout(e.message); }
    finally { setObBezig(false); }
  }

  function openProductNieuw() { setProductForm({ naam:"", duur_minuten:30, min_vooraf_uren:1, prijs:"" }); setProductEditId(null); setProductModal(true); }
  function openProductEdit(p) {
    setProductForm({ naam:p.naam, duur_minuten:p.duur_minuten, min_vooraf_uren:p.min_vooraf_uren, prijs:p.prijs||"" });
    setProductEditId(p.id); setProductModal(true);
  }
  async function slaProductOp() {
    if (!productForm.naam || !productForm.duur_minuten) return;
    try {
      if (productEditId) await API.updateAgendaProduct(productEditId, productForm);
      else await API.maakAgendaProductAan(productForm);
      setAgendaProducten(await API.haalAgendaProductenOp());
      setProductModal(false);
    } catch(e) { alert("Opslaan mislukt: "+e.message); }
  }
  async function verwijderProduct(id) {
    if (!confirm("Dit afspraaktype verwijderen?")) return;
    try { await API.verwijderAgendaProduct(id); setAgendaProducten(await API.haalAgendaProductenOp()); }
    catch(e) { alert("Verwijderen mislukt: "+e.message); }
  }
  const [nieuwePersoonNaam, setNieuwePersoonNaam] = useState("");
  const [nieuwePersoonKleur, setNieuwePersoonKleur] = useState("#185FA5");
  const [gekozenPersonen, setGekozenPersonen] = useState([]);

  const PERSOON_KLEUREN = ["#185FA5","#c0392b","#27ae60","#e67e22","#8e44ad","#16a085","#d35400","#2c3e50"];

  useEffect(() => {
    if (!isDemoMode) API.haalAgendaPersonenOp().then(setPersonen).catch(()=>{});
  }, []);

  async function voegPersoonToe() {
    if (!nieuwePersoonNaam.trim()) return;
    try {
      await API.maakAgendaPersoonAan({ naam: nieuwePersoonNaam.trim(), kleur: nieuwePersoonKleur });
      setNieuwePersoonNaam("");
      setNieuwePersoonKleur("#185FA5");
      setPersonen(await API.haalAgendaPersonenOp());
    } catch(e) { alert("Toevoegen mislukt: "+e.message); }
  }

  async function verwijderPersoon(id) {
    if (!confirm("Werknemer verwijderen? Deze wordt dan ook uit alle afspraken gehaald.")) return;
    try {
      await API.verwijderAgendaPersoon(id);
      setPersonen(await API.haalAgendaPersonenOp());
    } catch(e) { alert("Verwijderen mislukt: "+e.message); }
  }

  // Werkweek instellingen (bewaard in de database, gedeeld tussen alle gekoppelde gebruikers)
  const werkweekInst = instellingen?.werkweek || { dagen:[1,2,3,4,5], vanUur:"08:00", totUur:"17:00" };

  function setWerkweekInst(v) {
    const nieuw = typeof v === 'function' ? v(werkweekInst) : v;
    updateInstelling({ werkweek: nieuw });
  }

  // Week navigatie — maandag van de huidige week
  const [weekStart, setWeekStart] = useState(() => {
    const d = new Date();
    const dag = d.getDay() || 7;
    d.setDate(d.getDate() - dag + 1);
    return d.toISOString().slice(0,10);
  });

  function weekDagen(startISO, alleenWerkdagen=false) {
    const result = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startISO + "T12:00:00");
      d.setDate(d.getDate() + i);
      const iso = d.toISOString().slice(0,10);
      const dagNr = d.getDay() || 7; // 1=ma, 7=zo
      if (!alleenWerkdagen || werkweekInst.dagen.includes(dagNr)) {
        result.push({ iso, dagNr, label: d.toLocaleDateString("nl-NL",{weekday:"short",day:"numeric",month:"short"}) });
      }
    }
    return result;
  }

  function navigeerWeek(richting) {
    const d = new Date(weekStart + "T12:00:00");
    d.setDate(d.getDate() + richting * 7);
    setWeekStart(d.toISOString().slice(0,10));
  }

  function naarVandaag() {
    const d = new Date();
    const dag = d.getDay() || 7;
    d.setDate(d.getDate() - dag + 1);
    setWeekStart(d.toISOString().slice(0,10));
    setFilterDatum(new Date().toISOString().slice(0,10));
  }

  // Uren gefilterd op werkweek instelling
  const zichtbareUren = (view === 'werkweek')
    ? UREN.filter(u => u >= werkweekInst.vanUur && u <= werkweekInst.totUur)
    : UREN;

  const sorted = [...agenda]
    .filter(a=>!filterDatum||a.datum===filterDatum)
    .sort((a,b)=>(a.datum+a.tijd).localeCompare(b.datum+b.tijd));

  function openNieuw(tijd="09:00", datum=null) {
    const [h,m] = tijd.split(":").map(Number);
    const tijdTot = `${String(Math.min(h+1,23)).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
    setForm({ klantId:"", datum:datum||filterDatum||new Date().toISOString().slice(0,10), tijd, tijdTot, notitie:"" });
    setGekozenPersonen([]);
    setEditAfspraak(null);
    setEditId(null); setModal(true);
  }

  function openEdit(a) {
    setForm({ klantId:a.klantId, datum:a.datum, tijd:a.tijd, tijdTot:a.tijdTot||"", notitie:a.notitie||"" });
    setGekozenPersonen((a.personen||[]).map(p=>p.id));
    setEditAfspraak(a);
    setEditId(a.id); setModal(true);
  }

  async function save() {
    if(!form.klantId||!form.datum||!form.tijd) return;
    if (isDemoMode) {
      if (editId) setAgenda(p=>p.map(a=>a.id===editId?{...a,...form}:a));
      else setAgenda(p=>[...p,{...form,id:"a"+uid()}]);
      setModal(false); return;
    }
    try {
      const data = { klant_id:form.klantId||null, datum:form.datum,
        tijd_van:form.tijd, tijd_tot:(form.tijdTot && form.tijdTot.trim()) ? form.tijdTot : null, notitie:form.notitie||null };
      let afspraakId = editId;
      if (editId) await API.updateAfspraak(editId, data);
      else { const r = await API.maakAfspraakAan(data); afspraakId = r.id; }
      await API.koppelPersonenAanAfspraak(afspraakId, gekozenPersonen);
      await herlaad();
      setModal(false);
    } catch(e) { alert("Opslaan mislukt: " + e.message); }
  }

  async function del(id) {
    if (!confirm(T.afspraakVerwijderen)) return;
    if (isDemoMode) { setAgenda(p=>p.filter(a=>a.id!==id)); if(editId===id) setModal(false); return; }
    try { await API.verwijderAfspraak(id); if(editId===id) setModal(false); await herlaad(); }
    catch(e) { alert("Verwijderen mislukt: " + e.message); }
  }

  const groups = {};
  sorted.forEach(a=>{ if(!groups[a.datum]) groups[a.datum]=[]; groups[a.datum].push(a); });

  const dagAfsp = agenda.filter(a=>a.datum===filterDatum);
  function afspVoorUur(uur) { return dagAfsp.filter(a=>a.tijd.startsWith(uur.slice(0,2))); }
  function afspVoorDagUur(datum, uur) { return agenda.filter(a=>a.datum===datum&&a.tijd.startsWith(uur.slice(0,2))); }
  function tijdLabel(a) { return a.tijdTot ? `${a.tijd} – ${a.tijdTot}` : a.tijd; }

  const dagNamen = ["","Ma","Di","Wo","Do","Vr","Za","Zo"];

  return (
    <div>
      <div style={{ display:"flex", gap:8, marginBottom:"1rem", alignItems:"center", flexWrap:"wrap" }}>
        {/* Datum of week navigatie */}
        {(view==="blok"||view==="lijst") ? (
          <label style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 14px",
            borderRadius:8, border:`1.5px solid ${kleur.hoofd}`,
            background:"var(--color-background-primary)", cursor:"pointer",
            boxShadow:`0 0 0 3px ${kleur.hoofd}22` }}>
            <span style={{ fontSize:fs-1, color:kleur.hoofd, fontWeight:500 }}>📅 {T.datum}:</span>
            <input type="date" value={filterDatum} onChange={e=>setFilterDatum(e.target.value)}
              style={{ border:"none", background:"transparent", color:"var(--color-text-primary)",
                fontSize:fs, cursor:"pointer", outline:"none", fontWeight:500 }} />
          </label>
        ) : (
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <button onClick={()=>navigeerWeek(-1)} style={{ padding:"6px 10px", borderRadius:8, border:`1px solid ${kleur.hoofd}`,
              background:"var(--color-background-primary)", cursor:"pointer", fontSize:fs }}>◀</button>
            <button onClick={naarVandaag} style={{ padding:"6px 12px", borderRadius:8, border:`1px solid ${kleur.hoofd}`,
              background:kleur.licht, color:kleur.donker, cursor:"pointer", fontSize:fs-1, fontWeight:500 }}>Vandaag</button>
            <button onClick={()=>navigeerWeek(1)} style={{ padding:"6px 10px", borderRadius:8, border:`1px solid ${kleur.hoofd}`,
              background:"var(--color-background-primary)", cursor:"pointer", fontSize:fs }}>▶</button>
            <span style={{ fontSize:fs-1, color:"var(--color-text-secondary)", marginLeft:4 }}>
              {new Date(weekStart+"T12:00:00").toLocaleDateString("nl-NL",{day:"numeric",month:"long"})} – {
                new Date(new Date(weekStart+"T12:00:00").setDate(new Date(weekStart+"T12:00:00").getDate()+6)).toLocaleDateString("nl-NL",{day:"numeric",month:"long",year:"numeric"})
              }
            </span>
          </div>
        )}

        {/* View knoppen */}
        <div style={{ display:"flex", borderRadius:8, overflow:"hidden", border:`1px solid ${kleur.hoofd}` }}>
          {[
            {id:"blok",     label:"⊞ Dag"},
            {id:"week",     label:"📅 Week"},
            {id:"werkweek", label:"💼 Werkweek"},
            {id:"lijst",    label:"☰ Lijst"},
          ].map(v=>(
            <button key={v.id} onClick={()=>setView(v.id)} style={{ padding:"7px 12px", border:"none", cursor:"pointer", fontSize:fs-2,
              background:view===v.id?kleur.hoofd:"var(--color-background-primary)",
              color:view===v.id?"#fff":"var(--color-text-primary)" }}>{v.label}</button>
          ))}
        </div>

        {/* Werkweek instelling knop */}
        {(view==="werkweek") && (
          <button onClick={()=>setWerkweekModal(true)}
            style={{ padding:"7px 12px", borderRadius:8, border:`1px dashed ${kleur.hoofd}`,
              background:kleur.licht, color:kleur.donker, cursor:"pointer", fontSize:fs-2 }}>
            ⚙ Werkweek instellen
          </button>
        )}

        <div style={{ flex:1 }}/>
        <button onClick={()=>setOnlineBoekenModal(true)}
          style={{ padding:"7px 12px", borderRadius:8, border:"1px solid var(--color-border-secondary)",
            background:"var(--color-background-primary)", color:"var(--color-text-secondary)",
            cursor:"pointer", fontSize:fs-2 }}>
          🌐 Online boeken
        </button>
        <button onClick={()=>setPersonenModal(true)}
          style={{ padding:"7px 12px", borderRadius:8, border:"1px solid var(--color-border-secondary)",
            background:"var(--color-background-primary)", color:"var(--color-text-secondary)",
            cursor:"pointer", fontSize:fs-2 }}>
          👤 Werknemers beheren
        </button>
        <Btn variant="primary" onClick={()=>openNieuw()} kleur={kleur} fs={fs}>+ {T.nieuweAfspraak}</Btn>
      </div>

      {/* ── LEGENDA PERSONEN ── */}
      {personen.length > 0 && (
        <div style={{ display:"flex", flexWrap:"wrap", gap:12, alignItems:"center",
          padding:"8px 12px", marginBottom:"1rem", borderRadius:8,
          background:"var(--color-background-secondary)" }}>
          <span style={{ fontSize:fs-2, color:"var(--color-text-secondary)", fontWeight:600 }}>Medewerkers:</span>
          {personen.map(p => (
            <div key={p.id} style={{ display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ width:12, height:12, borderRadius:"50%", background:p.kleur||"#999", display:"inline-block" }} />
              <span style={{ fontSize:fs-2, color:"var(--color-text-secondary)" }}>{p.naam}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── ONLINE BOEKEN MODAL ── */}
      {onlineBoekenModal && (
        <Modal title="🌐 Online boeken" onClose={()=>setOnlineBoekenModal(false)} fs={fs}>
          <p style={{ fontSize:fs-1, color:"var(--color-text-secondary)", margin:"0 0 1rem" }}>
            Laat klanten zelf online een afspraak inplannen via een persoonlijke link. Uw volledige agenda blijft
            daarbij privé — bezoekers zien alleen welke tijdstippen vrij zijn.
          </p>

          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"10px 14px", borderRadius:10, background:"var(--color-background-secondary)", marginBottom:"1rem" }}>
            <span style={{ fontSize:fs-1, fontWeight:500 }}>Online boeken inschakelen</span>
            <div onClick={()=>slaAgendaInstellingOp(!agendaInstelling.agenda_publiek_actief)}
              style={{ width:38, height:20, borderRadius:99, cursor: obBezig?"wait":"pointer",
                background: agendaInstelling.agenda_publiek_actief ? kleur.hoofd : "#ccc", position:"relative" }}>
              <div style={{ position:"absolute", top:2, left: agendaInstelling.agenda_publiek_actief ? 20 : 2,
                width:16, height:16, borderRadius:"50%", background:"#fff", transition:"left 0.2s" }} />
            </div>
          </div>

          <FF label="Uw persoonlijke boekingslink" fs={fs}>
            <div style={{ display:"flex", alignItems:"center", gap:4 }}>
              <span style={{ fontSize:fs-2, color:"var(--color-text-secondary)", whiteSpace:"nowrap" }}>dencrm.nl/agenda/</span>
              <input value={slugInvoer} onChange={e=>setSlugInvoer(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,''))}
                placeholder="uw-naam" style={{ ...iSt(fs-1), flex:1 }} />
            </div>
          </FF>

          <p style={{ margin:"0 0 6px", fontSize:fs-2, color:"var(--color-text-secondary)", fontWeight:600 }}>
            Welke gegevens moet de klant invullen?
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:"1rem" }}>
            {[
              { key:"email", label:"E-mailadres", vast:true },
              { key:"naam", label:"Naam" },
              { key:"straat", label:"Straat + huisnummer" },
              { key:"postcode", label:"Postcode" },
              { key:"stad", label:"Stad/dorp" },
              { key:"opmerking", label:"Opmerking" },
            ].map(veld => (
              <label key={veld.key} style={{ display:"flex", alignItems:"center", gap:8, fontSize:fs-1,
                color: veld.vast ? "var(--color-text-secondary)" : "var(--color-text-primary)", cursor: veld.vast ? "default" : "pointer" }}>
                <input type="checkbox" checked={veld.vast ? true : !!velden[veld.key]} disabled={veld.vast}
                  onChange={e=>setVelden(v=>({...v, [veld.key]:e.target.checked}))}
                  style={{ width:16, height:16, accentColor:kleur.hoofd }} />
                {veld.label}{veld.vast && <span style={{ fontSize:fs-3, color:"var(--color-text-secondary)" }}>(altijd verplicht)</span>}
              </label>
            ))}
          </div>

          {obFout && <p style={{ color:"#a32d2d", fontSize:fs-2, margin:"-8px 0 10px" }}>{obFout}</p>}
          {obOpgeslagen && <p style={{ color:"#27500a", fontSize:fs-2, margin:"-8px 0 10px" }}>✓ Opgeslagen</p>}
          {agendaInstelling.agenda_publiek_actief && agendaInstelling.agenda_publiek_slug && (
            <p style={{ fontSize:fs-2, color:kleur.hoofd, margin:"-6px 0 14px" }}>
              Live op: <a href={`/agenda/${agendaInstelling.agenda_publiek_slug}`} target="_blank" rel="noreferrer" style={{ color:kleur.hoofd }}>
                dencrm.nl/agenda/{agendaInstelling.agenda_publiek_slug}
              </a>
            </p>
          )}
          <Btn onClick={()=>slaAgendaInstellingOp(agendaInstelling.agenda_publiek_actief)} kleur={kleur} fs={fs} variant="primary" disabled={obBezig}>
            💾 Instellingen opslaan
          </Btn>

          <hr style={{ margin:"1.25rem 0", border:"none", borderTop:"1px solid var(--color-border-tertiary)" }} />

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.75rem" }}>
            <p style={{ margin:0, fontSize:fs-1, fontWeight:600 }}>Boekbare afspraaktypes</p>
            <Btn onClick={openProductNieuw} kleur={kleur} fs={fs-2}>+ Toevoegen</Btn>
          </div>
          {agendaProducten.length === 0 && (
            <p style={{ fontSize:fs-2, color:"var(--color-text-secondary)" }}>
              Nog geen afspraaktypes. Voeg er minimaal 1 toe zodat bezoekers iets kunnen boeken.
            </p>
          )}
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {agendaProducten.map(p => (
              <div key={p.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                padding:"8px 12px", borderRadius:8, background:"var(--color-background-secondary)" }}>
                <div>
                  <p style={{ margin:0, fontSize:fs-1, fontWeight:500 }}>{p.naam}</p>
                  <p style={{ margin:0, fontSize:fs-3, color:"var(--color-text-secondary)" }}>
                    {p.duur_minuten} min · min. {p.min_vooraf_uren}u vooraf{p.prijs ? ` · €${parseFloat(p.prijs).toLocaleString("nl-NL",{minimumFractionDigits:2})}` : ''}
                  </p>
                </div>
                <div style={{ display:"flex", gap:4 }}>
                  <button onClick={()=>openProductEdit(p)}
                    style={{ padding:"4px 8px", borderRadius:6, background:"none", border:"1px solid var(--color-border-secondary)", cursor:"pointer", fontSize:fs-3 }}>✎</button>
                  <button onClick={()=>verwijderProduct(p.id)}
                    style={{ padding:"4px 8px", borderRadius:6, background:"#fcebeb", color:"#a32d2d", border:"none", cursor:"pointer", fontSize:fs-3 }}>✕</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display:"flex", justifyContent:"flex-end", marginTop:"1.25rem" }}>
            <Btn onClick={()=>setOnlineBoekenModal(false)} fs={fs}>Sluiten</Btn>
          </div>
        </Modal>
      )}

      {/* Afspraaktype toevoegen/bewerken */}
      {productModal && (
        <Modal title={productEditId ? "Afspraaktype bewerken" : "Nieuw afspraaktype"} onClose={()=>setProductModal(false)} fs={fs}>
          <FF label="Naam" fs={fs}>
            <input value={productForm.naam} onChange={e=>setProductForm(f=>({...f,naam:e.target.value}))}
              placeholder="Bijv. Kennismakingsgesprek" style={iSt(fs)} />
          </FF>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            <FF label="Duur (minuten)" fs={fs}>
              <div style={{ display:"flex", gap:4 }}>
                {[15,30,45,60].map(d=>(
                  <button key={d} onClick={()=>setProductForm(f=>({...f,duur_minuten:d}))}
                    style={{ flex:1, padding:"7px", borderRadius:8, cursor:"pointer", fontSize:fs-2,
                      border:`1.5px solid ${productForm.duur_minuten===d?kleur.hoofd:"var(--color-border-secondary)"}`,
                      background: productForm.duur_minuten===d ? kleur.hoofd : "var(--color-background-primary)",
                      color: productForm.duur_minuten===d ? "#fff" : "var(--color-text-secondary)" }}>
                    {d}
                  </button>
                ))}
              </div>
            </FF>
            <FF label="Min. vooraf (uren)" fs={fs}>
              <input type="number" step="0.5" min="0" value={productForm.min_vooraf_uren}
                onChange={e=>setProductForm(f=>({...f,min_vooraf_uren:e.target.value}))} style={iSt(fs)} />
            </FF>
          </div>
          <FF label="Kosten (optioneel)" fs={fs}>
            <input type="number" step="0.01" min="0" value={productForm.prijs}
              onChange={e=>setProductForm(f=>({...f,prijs:e.target.value}))} placeholder="0.00" style={iSt(fs)} />
          </FF>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:"1rem" }}>
            <Btn onClick={()=>setProductModal(false)} fs={fs}>Annuleren</Btn>
            <Btn variant="primary" onClick={slaProductOp} kleur={kleur} fs={fs}>💾 Opslaan</Btn>
          </div>
        </Modal>
      )}

      {/* ── PERSONEN BEHEER MODAL ── */}
      {personenModal && (
        <Modal title="👤 Werknemers beheren" onClose={()=>setPersonenModal(false)} fs={fs}>
          <p style={{ fontSize:fs-1, color:"var(--color-text-secondary)", margin:"0 0 1rem" }}>
            Werknemers die je aan afspraken kunt koppelen, bijvoorbeeld collega's of monteurs.
          </p>
          <div style={{ marginBottom:"1rem" }}>
            <div style={{ display:"flex", gap:8, marginBottom:8 }}>
              <input value={nieuwePersoonNaam} onChange={e=>setNieuwePersoonNaam(e.target.value)}
                onKeyDown={e=>e.key==="Enter" && voegPersoonToe()}
                placeholder="Naam van de werknemer" style={{ ...iSt(fs), flex:1 }} />
              <Btn variant="primary" onClick={voegPersoonToe} kleur={kleur} fs={fs}>+ Toevoegen</Btn>
            </div>
            <div style={{ display:"flex", gap:6, alignItems:"center" }}>
              <span style={{ fontSize:fs-2, color:"var(--color-text-secondary)" }}>Kleur:</span>
              {PERSOON_KLEUREN.map(k => (
                <button key={k} onClick={()=>setNieuwePersoonKleur(k)}
                  style={{ width:22, height:22, borderRadius:"50%", background:k, cursor:"pointer",
                    border: nieuwePersoonKleur===k ? "3px solid var(--color-text-primary)" : "1px solid rgba(0,0,0,0.15)",
                    padding:0 }} />
              ))}
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {personen.length === 0 && <p style={{ fontSize:fs-1, color:"var(--color-text-secondary)" }}>Nog geen werknemers toegevoegd.</p>}
            {personen.map(p => (
              <div key={p.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                padding:"8px 12px", borderRadius:8, background:"var(--color-background-secondary)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ width:12, height:12, borderRadius:"50%", background:p.kleur||"#999", display:"inline-block" }} />
                  <span style={{ fontSize:fs-1 }}>{p.naam}</span>
                </div>
                <button onClick={()=>verwijderPersoon(p.id)}
                  style={{ padding:"4px 10px", borderRadius:6, background:"#fcebeb", color:"#a32d2d",
                    border:"none", cursor:"pointer", fontSize:fs-3 }}>
                  Verwijderen
                </button>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"flex-end", marginTop:"1.25rem" }}>
            <Btn onClick={()=>setPersonenModal(false)} fs={fs}>Sluiten</Btn>
          </div>
        </Modal>
      )}

      {/* ── LIJSTWEERGAVE ── */}
      {view==="lijst"&&(
        <>
          {Object.keys(groups).length===0&&<p style={{ color:"var(--color-text-secondary)", fontSize:fs }}>{T.geenAfspraken}</p>}
          {Object.entries(groups).map(([datum,afspraken])=>(
            <div key={datum} style={{ marginBottom:"1.5rem" }}>
              <p style={{ fontSize:fs-1, fontWeight:500, color:"var(--color-text-secondary)", marginBottom:8 }}>
                {new Date(datum+"T12:00:00").toLocaleDateString("nl-NL",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}
              </p>
              {afspraken.map(a=>{const k=klanten.find(x=>x.id===a.klantId); const persoonKleur=a.personen?.[0]?.kleur;return(
                <div key={a.id} style={{
                  background: persoonKleur ? `${persoonKleur}22` : "var(--color-background-primary)",
                  border: persoonKleur ? `1.5px solid ${persoonKleur}` : "0.5px solid var(--color-border-tertiary)",
                  borderRadius:12, padding:"12px 16px", display:"flex", gap:16, alignItems:"center", marginBottom:8 }}>
                  <div style={{ background:kleur.licht, color:kleur.donker, borderRadius:8, padding:"8px 12px", textAlign:"center", minWidth:80 }}>
                    <p style={{ margin:0, fontSize:fs, fontWeight:500 }}>{a.tijd}</p>
                    {a.tijdTot&&<p style={{ margin:0, fontSize:fs-3, opacity:0.8 }}>t/m {a.tijdTot}</p>}
                  </div>
                  {k&&<Avatar naam={k.naam} size={36} kleur={kleur}/>}
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <p style={{ margin:0, fontSize:fs, fontWeight:500 }}>{k?.naam||(a.extern?"Extern geboekt":"Onbekende klant")}</p>
                      {a.extern && (
                        <span style={{ fontSize:fs-3, padding:"1px 8px", borderRadius:99, background:"#e6f1fb", color:"#0c447c", fontWeight:600 }}>
                          🌐 Extern
                        </span>
                      )}
                    </div>
                    <p style={{ margin:0, fontSize:fs-1, color:"var(--color-text-secondary)" }}>{a.notitie}</p>
                    {a.extern_email && <p style={{ margin:0, fontSize:fs-3, color:"var(--color-text-secondary)" }}>✉ {a.extern_email}</p>}
                    {a.personen?.length>0&&(
                      <div style={{ display:"flex", gap:5, marginTop:4, flexWrap:"wrap" }}>
                        {a.personen.map(p=>(
                          <span key={p.id} style={{ display:"flex", alignItems:"center", gap:4, fontSize:fs-3,
                            padding:"1px 8px", borderRadius:99, background:"var(--color-background-secondary)" }}>
                            <span style={{ width:7, height:7, borderRadius:"50%", background:p.kleur||"#999" }} />
                            {p.naam}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={()=>openEdit(a)} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--color-text-secondary)",padding:4,fontSize:fs+2 }}>✎</button>
                  <button onClick={()=>del(a.id)} style={{ background:"none",border:"none",cursor:"pointer",color:"#A32D2D",padding:4,fontSize:fs+2 }}>✕</button>
                </div>
              );})}
            </div>
          ))}
        </>
      )}

      {/* ── DAG BLOKWEERGAVE ── */}
      {view==="blok"&&(
        <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:12, overflow:"hidden" }}>
          <div style={{ background:kleur.hoofd, color:"#fff", padding:"10px 16px", fontSize:fs, fontWeight:500 }}>
            {filterDatum?new Date(filterDatum+"T12:00:00").toLocaleDateString("nl-NL",{weekday:"long",day:"numeric",month:"long",year:"numeric"}):"Selecteer een datum"}
          </div>
          <div style={{ overflowY:"auto", maxHeight:"60vh" }}>
            {UREN.map(uur=>{
              const afspraken=afspVoorUur(uur);
              const isH=hover===uur;
              return(
                <div key={uur} onMouseEnter={()=>setHover(uur)} onMouseLeave={()=>setHover(null)}
                  onClick={()=>afspraken.length===0&&openNieuw(uur)}
                  style={{ display:"flex", minHeight:52, borderBottom:"0.5px solid var(--color-border-tertiary)",
                    background:isH&&afspraken.length===0?kleur.licht:"var(--color-background-primary)",
                    cursor:afspraken.length===0?"pointer":"default", transition:"background 0.12s" }}>
                  <div style={{ width:72, flexShrink:0, padding:"10px 12px 6px", fontSize:fs-2,
                    color:"var(--color-text-secondary)", borderRight:"0.5px solid var(--color-border-tertiary)" }}>{uur}</div>
                  <div style={{ flex:1, padding:"4px 8px", display:"flex", flexDirection:"column", gap:4 }}>
                    {afspraken.length===0&&isH&&<span style={{ fontSize:fs-2, color:kleur.donker, padding:"4px 0" }}>{T.klikToevoegen}</span>}
                    {afspraken.map(a=>{const k=klanten.find(x=>x.id===a.klantId); const persoonKleur=a.personen?.[0]?.kleur;return(
                      <div key={a.id} onClick={e=>{e.stopPropagation();openEdit(a);}}
                        style={{ background: persoonKleur || kleur.hoofd, color:"#fff", borderRadius:6,
                          padding:"5px 10px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer" }}>
                        <div>
                          <span style={{ fontSize:fs-1, fontWeight:500 }}>{tijdLabel(a)} — {k?.naam||"?"}</span>
                          {a.notitie&&<p style={{ margin:"1px 0 0", fontSize:fs-3, opacity:0.85 }}>{a.notitie}</p>}
                          {a.personen?.length>0&&<p style={{ margin:"1px 0 0", fontSize:fs-3, opacity:0.9 }}>👤 {a.personen.map(p=>p.naam).join(", ")}</p>}
                        </div>
                        <div style={{ display:"flex", gap:4 }}>
                          <span style={{ fontSize:fs-2, opacity:0.7, padding:"0 4px" }}>✎</span>
                          <button onClick={e=>{e.stopPropagation();del(a.id);}} style={{ background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.8)",fontSize:14,padding:"0 4px" }}>✕</button>
                        </div>
                      </div>
                    );})}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── WEEK / WERKWEEK WEERGAVE ── */}
      {(view==="week"||view==="werkweek")&&(()=>{
        const dagen = weekDagen(weekStart, view==="werkweek");
        const uren = view==="werkweek" ? zichtbareUren : UREN;
        const vandaag = new Date().toISOString().slice(0,10);
        return (
          <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:12, overflow:"hidden" }}>
            {/* Header met dagnamen */}
            <div style={{ display:"grid", gridTemplateColumns:`64px repeat(${dagen.length}, 1fr)`,
              background:kleur.hoofd, color:"#fff" }}>
              <div style={{ padding:"8px", fontSize:fs-3, borderRight:"0.5px solid rgba(255,255,255,0.2)" }} />
              {dagen.map(d=>(
                <div key={d.iso} style={{ padding:"8px 4px", textAlign:"center", fontSize:fs-2,
                  borderRight:"0.5px solid rgba(255,255,255,0.2)",
                  background: d.iso===vandaag ? "rgba(255,255,255,0.2)" : "transparent",
                  fontWeight: d.iso===vandaag ? 700 : 400 }}>
                  {d.label}
                </div>
              ))}
            </div>
            {/* Uurblokken */}
            <div style={{ overflowY:"auto", maxHeight:"65vh" }}>
              {uren.map(uur=>(
                <div key={uur} style={{ display:"grid", gridTemplateColumns:`64px repeat(${dagen.length}, 1fr)`,
                  borderBottom:"0.5px solid var(--color-border-tertiary)", minHeight:48 }}>
                  <div style={{ padding:"8px 6px", fontSize:fs-3, color:"var(--color-text-secondary)",
                    borderRight:"0.5px solid var(--color-border-tertiary)", flexShrink:0 }}>{uur}</div>
                  {dagen.map(d=>{
                    const afspraken = afspVoorDagUur(d.iso, uur);
                    const isVandaag = d.iso === vandaag;
                    return (
                      <div key={d.iso} onClick={()=>afspraken.length===0&&openNieuw(uur,d.iso)}
                        style={{ padding:"2px 3px", borderRight:"0.5px solid var(--color-border-tertiary)",
                          cursor:afspraken.length===0?"pointer":"default",
                          background: isVandaag ? `${kleur.hoofd}08` : "transparent",
                          transition:"background 0.1s" }}
                        onMouseEnter={e=>{ if(afspraken.length===0) e.currentTarget.style.background=`${kleur.hoofd}18`; }}
                        onMouseLeave={e=>{ e.currentTarget.style.background = isVandaag ? `${kleur.hoofd}08` : "transparent"; }}>
                        {afspraken.map(a=>{const k=klanten.find(x=>x.id===a.klantId); const persoonKleur=a.personen?.[0]?.kleur;return(
                          <div key={a.id} onClick={e=>{e.stopPropagation();openEdit(a);}}
                            style={{ background: persoonKleur || kleur.hoofd, color:"#fff", borderRadius:4, padding:"2px 5px",
                              fontSize:fs-3, cursor:"pointer", marginBottom:2, lineHeight:1.3 }}>
                            <div style={{ fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                              {a.tijd} {k?.naam||"?"}
                            </div>
                            {a.notitie&&<div style={{ opacity:0.8, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.notitie}</div>}
                          </div>
                        );})}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* ── WERKWEEK INSTELLING MODAL ── */}
      {werkweekModal && (
        <Modal title="💼 Werkweek instellen" onClose={()=>setWerkweekModal(false)} fs={fs}>
          <p style={{ fontSize:fs-1, color:"var(--color-text-secondary)", margin:"0 0 1rem" }}>
            Kies welke dagen en tijden zichtbaar zijn in de werkweekweergave.
          </p>
          <FF label="Werkdagen" fs={fs}>
            <div style={{ display:"flex", gap:6 }}>
              {[1,2,3,4,5,6,7].map(d=>{
                const aan = werkweekInst.dagen.includes(d);
                return (
                  <button key={d} onClick={()=>setWerkweekInst(prev=>({
                    ...prev,
                    dagen: aan ? prev.dagen.filter(x=>x!==d) : [...prev.dagen, d].sort()
                  }))}
                    style={{ width:40, height:36, borderRadius:8, cursor:"pointer", fontSize:fs-2, fontWeight:600,
                      border:`1.5px solid ${aan ? kleur.hoofd : "var(--color-border-secondary)"}`,
                      background: aan ? kleur.hoofd : "var(--color-background-primary)",
                      color: aan ? "#fff" : "var(--color-text-secondary)" }}>
                    {dagNamen[d]}
                  </button>
                );
              })}
            </div>
          </FF>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <FF label="Begintijd" fs={fs}>
              <input type="time" value={werkweekInst.vanUur}
                onChange={e=>setWerkweekInst(p=>({...p,vanUur:e.target.value}))}
                style={iSt(fs)} />
            </FF>
            <FF label="Eindtijd" fs={fs}>
              <input type="time" value={werkweekInst.totUur}
                onChange={e=>setWerkweekInst(p=>({...p,totUur:e.target.value}))}
                style={iSt(fs)} />
            </FF>
          </div>
          <div style={{ padding:"10px 14px", borderRadius:8, background:"var(--color-background-secondary)",
            fontSize:fs-2, color:"var(--color-text-secondary)", marginTop:"0.5rem" }}>
            Huidige instelling: {werkweekInst.dagen.map(d=>dagNamen[d]).join(", ")} · {werkweekInst.vanUur} – {werkweekInst.totUur}
          </div>
          <div style={{ display:"flex", justifyContent:"flex-end", gap:8, marginTop:"1rem" }}>
            <Btn onClick={()=>setWerkweekModal(false)} fs={fs}>Sluiten</Btn>
            <Btn variant="primary" onClick={()=>setWerkweekModal(false)} kleur={kleur} fs={fs}>✓ Opslaan</Btn>
          </div>
        </Modal>
      )}

      {/* ── AFSPRAAK MODAL ── */}
      {modal&&(
        <Modal title={editId?T.afspraakBewerken:T.nieuweAfspraak} onClose={()=>setModal(false)} fs={fs}>
          {editAfspraak?.extern && (
            <div style={{ padding:"10px 14px", borderRadius:8, background:"#e6f1fb", marginBottom:"1rem" }}>
              <p style={{ margin:"0 0 6px", fontSize:fs-2, fontWeight:600, color:"#0c447c" }}>
                🌐 Extern geboekt via online agenda
              </p>
              {editAfspraak.extern_naam && <p style={{ margin:"2px 0", fontSize:fs-2, color:"#333" }}>👤 {editAfspraak.extern_naam}</p>}
              {editAfspraak.extern_email && <p style={{ margin:"2px 0", fontSize:fs-2, color:"#333" }}>✉ {editAfspraak.extern_email}</p>}
              {(editAfspraak.extern_straat || editAfspraak.extern_postcode || editAfspraak.extern_stad) && (
                <p style={{ margin:"2px 0", fontSize:fs-2, color:"#333" }}>
                  📍 {[editAfspraak.extern_straat, [editAfspraak.extern_postcode, editAfspraak.extern_stad].filter(Boolean).join(" ")].filter(Boolean).join(", ")}
                </p>
              )}
              {editAfspraak.extern_opmerking && <p style={{ margin:"6px 0 0", fontSize:fs-2, color:"#333", whiteSpace:"pre-wrap" }}>💬 {editAfspraak.extern_opmerking}</p>}
            </div>
          )}
          <FF label={T.klantZoeken} fs={fs}>
            <KlantZoekBox klanten={klanten} value={form.klantId} onChange={id=>setForm(f=>({...f,klantId:id}))} fs={fs} />
            <button onClick={()=>setAgendaNkModal(true)}
              style={{ marginTop:6, padding:"5px 10px", borderRadius:6, border:`1px dashed ${kleur.hoofd}`,
                background:"transparent", color:kleur.hoofd, cursor:"pointer", fontSize:fs-2 }}>
              + Nieuwe klant aanmaken
            </button>
          </FF>
          <FF label={T.datum} fs={fs}>
            <input type="date" value={form.datum} onChange={e=>setForm(f=>({...f,datum:e.target.value}))} style={iSt(fs)} />
          </FF>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            <FF label={T.vanaf} fs={fs}><input type="time" value={form.tijd} onChange={e=>setForm(f=>({...f,tijd:e.target.value}))} style={iSt(fs)} /></FF>
            <FF label={T.tijdTot} fs={fs}><input type="time" value={form.tijdTot} onChange={e=>setForm(f=>({...f,tijdTot:e.target.value}))} style={iSt(fs)} /></FF>
          </div>
          {personen.length > 0 && (
            <FF label="Werknemers koppelen" fs={fs}>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {personen.map(p => {
                  const aan = gekozenPersonen.includes(p.id);
                  return (
                    <button key={p.id} type="button"
                      onClick={()=>setGekozenPersonen(prev => aan ? prev.filter(id=>id!==p.id) : [...prev, p.id])}
                      style={{ fontSize:fs-2, padding:"5px 11px", borderRadius:99, cursor:"pointer",
                        display:"flex", alignItems:"center", gap:6,
                        border: aan ? `1px solid ${p.kleur||kleur.hoofd}` : "1px solid var(--color-border-secondary)",
                        background: aan ? (p.kleur||kleur.hoofd) : "var(--color-background-primary)",
                        color: aan ? "#fff" : "var(--color-text-secondary)" }}>
                      <span style={{ width:8, height:8, borderRadius:"50%",
                        background: aan ? "#fff" : (p.kleur||"#999") }} />
                      {p.naam}
                    </button>
                  );
                })}
              </div>
            </FF>
          )}
          <FF label={T.notitie} fs={fs}><textarea value={form.notitie} onChange={e=>setForm(f=>({...f,notitie:e.target.value}))} rows={3} style={{...iSt(fs),resize:"vertical"}} /></FF>
          <div style={{ display:"flex", gap:8, justifyContent:"space-between", marginTop:"1rem" }}>
            {editId && <Btn variant="danger" onClick={()=>del(editId)} fs={fs}>{T.verwijderen}</Btn>}
            <div style={{ display:"flex", gap:8, marginLeft:"auto" }}>
              <Btn onClick={()=>setModal(false)} fs={fs}>{T.annuleren}</Btn>
              <Btn variant="primary" onClick={save} kleur={kleur} fs={fs} disabled={!form.klantId}>{T.opslaan}</Btn>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Nieuwe klant modal ── */}
      {agendaNkModal && (
        <Modal title={T?.nieuweKlantToevoegen||"Nieuwe klant aanmaken"} onClose={()=>setAgendaNkModal(false)} fs={fs}>
          <FF label="Naam" fs={fs}><input value={agendaNkForm.naam} onChange={e=>setAgendaNkForm(f=>({...f,naam:e.target.value}))} style={iSt(fs)} /></FF>
          <FF label="E-mailadres" fs={fs}><input type="email" value={agendaNkForm.email} onChange={e=>setAgendaNkForm(f=>({...f,email:e.target.value}))} style={iSt(fs)} /></FF>
          <FF label="Telefoon" fs={fs}><input value={agendaNkForm.telefoon} onChange={e=>setAgendaNkForm(f=>({...f,telefoon:e.target.value}))} style={iSt(fs)} /></FF>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:"1rem" }}>
            <Btn onClick={()=>setAgendaNkModal(false)} fs={fs}>Annuleren</Btn>
            <Btn variant="primary" kleur={kleur} fs={fs} disabled={!agendaNkForm.naam}
              onClick={async()=>{
                try {
                  const { id } = await API.maakKlantAan({ naam:agendaNkForm.naam, email:agendaNkForm.email, telefoon:agendaNkForm.telefoon });
                  await herlaad();
                  setForm(f=>({...f, klantId:id}));
                  setAgendaNkModal(false);
                  setAgendaNkForm({naam:"",email:"",telefoon:""});
                } catch(e) { alert("Aanmaken mislukt: "+e.message); }
              }}>
              Aanmaken & koppelen
            </Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}


// ── KASSA PAGINA ──────────────────────────────────────────────
function KassaPage({ producten, klanten, kleur, fs, isDemoMode, herlaad, T, instellingen, updateInstelling, isMobiel }) {
  const [winkelwagen, setWinkelwagen] = useState([]);
  const [klantId, setKlantId] = useState("");
  const [klantVrij, setKlantVrij] = useState("");

  // BTW instelling opslaan in de database (gedeeld tussen alle gekoppelde gebruikers)
  const inclBtw = instellingen?.kassaBtw ?? false;
  function setInclBtw(v) { updateInstelling({ kassaBtw: v }); }

  const [betaalmethode, setBetaalmethode] = useState("contant");
  const [zoek, setZoek] = useState("");
  const [toonTeller, setToonTeller] = useState(true);
  const [dagBonnen, setDagBonnen] = useState([]);
  const [bezig, setBezig] = useState(false);
  const [succesBon, setSuccesBon] = useState(null);
  const [activeCat, setActiveCat] = useState("Alle");
  const [kassaNkModal, setKassaNkModal] = useState(false);
  const [kassaNkForm, setKassaNkForm] = useState({ naam:"", email:"", telefoon:"" });
  const [templateModal, setTemplateModal] = useState(false);

  const DEFAULT_BON_TEMPLATE = {
    bedrijfsnaam: "", adres: "", telefoon: "", website: "",
    slotTekst: "Bedankt voor uw aankoop!", toonBtw: true, toonBetaalmethode: true,
  };
  const bonTemplate = instellingen?.bonTemplate || DEFAULT_BON_TEMPLATE;
  function setBonTemplate(v) { updateInstelling({ bonTemplate: v }); }

  const vandaag = new Date().toISOString().slice(0,10);


  useEffect(() => {
    if (!isDemoMode) {
      API.haalKassaBonnenOp()
        .then(data => setDagBonnen(data.filter(b => b.datum === vandaag)))
        .catch(() => {});
    }
  }, []);

  // Vul bon-template eenmalig met bedrijfsgegevens uit het profiel, als die nog leeg is
  useEffect(() => {
    if (isDemoMode || bonTemplate.bedrijfsnaam) return;
    API.haalProfielOp().then(data => {
      if (data.bedrijfsnaam || data.bedrijf_adres) {
        setBonTemplate({ ...bonTemplate, bedrijfsnaam: data.bedrijfsnaam || "", adres: data.bedrijf_adres || "" });
      }
    }).catch(()=>{});
  }, []);

  const cats = ["Alle", ...new Set(producten.map(p=>p.categorie).filter(Boolean))];
  const gefilterd = producten.filter(p => {
    const catOk = activeCat === "Alle" || p.categorie === activeCat;
    const zoekOk = !zoek || p.naam.toLowerCase().includes(zoek.toLowerCase());
    return catOk && zoekOk;
  });

  function voegToe(product) {
    setWinkelwagen(prev => {
      const bestaand = prev.find(r => r.product_id === product.id);
      if (bestaand) return prev.map(r => r.product_id===product.id ? {...r, aantal:r.aantal+1} : r);
      return [...prev, { id:"w"+uid(), product_id:product.id, naam:product.naam, prijs:product.prijs, aantal:1 }];
    });
  }

  function updateAantal(id, delta) {
    setWinkelwagen(prev => prev.map(r => r.id===id ? {...r, aantal:Math.max(1,r.aantal+delta)} : r));
  }

  function updateRegel(id, veld, waarde) {
    setWinkelwagen(prev => prev.map(r => r.id===id ? {...r, [veld]:waarde} : r));
  }

  function verwijderRegel(id) {
    setWinkelwagen(prev => prev.filter(r => r.id !== id));
  }

  const [bewerkRegelId, setBewerkRegelId] = useState(null);

  const [losFormOpen, setLosFormOpen] = useState(false);
  const [losFormNaam, setLosFormNaam] = useState("");
  const [losFormPrijs, setLosFormPrijs] = useState("");

  function voegLosToe() {
    if (!losFormNaam.trim() || !parseFloat(losFormPrijs)) return;
    setWinkelwagen(prev => [...prev, { id:"w"+uid(), product_id:null, naam:losFormNaam.trim(), prijs:losFormPrijs, aantal:1, los:true }]);
    setLosFormNaam(""); setLosFormPrijs(""); setLosFormOpen(false);
  }

  function printBonA4(bon, subTotaalBon, btwBedragBon, inclBtwBon) {
    const t = bonTemplate;
    const nu = new Date().toLocaleDateString("nl-NL", {day:"numeric",month:"long",year:"numeric"});
    const regels = bon.regels.map(r =>
      `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee">${r.aantal}× ${r.naam||"—"}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right">${fmt((parseFloat(r.prijs)||0)*r.aantal)}</td>
      </tr>`
    ).join('');
    const script = '<scr'+'ipt>window.onload=()=>{window.print();window.onafterprint=()=>window.close();}<\/scr'+'ipt>';
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <style>
      body { font-family: Arial, sans-serif; font-size: 12px; margin: 0; padding: 32px; color: #222; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
      .bedrijf h1 { margin: 0 0 4px; font-size: 22px; color: #185FA5; }
      .bedrijf p { margin: 2px 0; color: #666; font-size: 11px; }
      .bon-info { text-align: right; }
      .bon-info h2 { margin: 0 0 4px; font-size: 16px; color: #185FA5; }
      .bon-info p { margin: 2px 0; color: #666; font-size: 11px; }
      hr { border: none; border-top: 2px solid #185FA5; margin: 0 0 16px; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
      thead th { background: #185FA5; color: #fff; padding: 8px 12px; text-align: left; font-size: 11px; }
      thead th:last-child { text-align: right; }
      .totaal-tabel td { padding: 6px 12px; font-size: 12px; }
      .totaal-rij td { font-size: 14px; font-weight: bold; color: #185FA5; padding: 10px 12px; background: #e8f0fb; }
      .footer { margin-top: 40px; text-align: center; font-size: 11px; color: #888; }
      @media print { body { padding: 16px; } }
    </style></head><body>
    <div class="header">
      <div class="bedrijf" style="display:flex;align-items:flex-start;gap:12px">
        <img src="${API.logoUrl()}" alt="" style="height:48px;max-width:80px;object-fit:contain"
          onerror="this.style.display='none'" />
        <div>
          ${t.bedrijfsnaam ? `<h1>${t.bedrijfsnaam}</h1>` : '<h1>DenCRM</h1>'}
          ${t.adres ? `<p>${t.adres}</p>` : ''}
          ${t.telefoon ? `<p>Tel: ${t.telefoon}</p>` : ''}
          ${t.website ? `<p>${t.website}</p>` : ''}
        </div>
      </div>
      <div class="bon-info">
        <h2>Kassabon</h2>
        <p><strong>${bon.referentie}</strong></p>
        <p>Datum: ${nu}</p>
        ${bon.klantNaam ? `<p>Klant: ${bon.klantNaam}</p>` : ''}
      </div>
    </div>
    <hr>
    <table>
      <thead><tr><th>Omschrijving</th><th style="text-align:right">Bedrag</th></tr></thead>
      <tbody>${regels}</tbody>
    </table>
    <table class="totaal-tabel" style="width:300px;margin-left:auto">
      ${inclBtwBon && t.toonBtw ? `
        <tr><td>Subtotaal excl. BTW</td><td style="text-align:right">${fmt(subTotaalBon)}</td></tr>
        <tr><td>BTW 21%</td><td style="text-align:right">${fmt(btwBedragBon)}</td></tr>
      ` : ''}
      <tr class="totaal-rij"><td>Totaal</td><td style="text-align:right">${fmt(bon.totaal)}</td></tr>
      ${t.toonBetaalmethode ? `<tr><td colspan="2" style="color:#666;font-size:11px">Betaald met: ${bon.betaalmethode}</td></tr>` : ''}
    </table>
    ${t.slotTekst ? `<div class="footer">${t.slotTekst}</div>` : ''}
    ${script}
    </body></html>`;
    const w = window.open('', '_blank', 'width=800,height=900');
    w.document.write(html);
    w.document.close();
  }

  const [kortingType, setKortingType] = useState("percentage"); // percentage | bedrag
  const [kortingWaarde, setKortingWaarde] = useState("");

  // Filter lege losse regels (placeholder-regels zonder naam/prijs) overal uit
  const geldigeRegels = winkelwagen.filter(r => !r.los || (r.naam && r.naam.trim() && parseFloat(r.prijs) > 0));

  const subTotaalVoorKorting = geldigeRegels.reduce((s,r) => s + (parseFloat(r.prijs)||0)*r.aantal, 0);
  const kortingBedrag = kortingType === "percentage"
    ? Math.round(subTotaalVoorKorting * (parseFloat(kortingWaarde)||0) / 100 * 100) / 100
    : Math.min(parseFloat(kortingWaarde)||0, subTotaalVoorKorting);
  const subTotaal = Math.max(0, subTotaalVoorKorting - kortingBedrag);
  const btwBedrag = inclBtw ? Math.round(subTotaal * 0.21 * 100) / 100 : 0;
  const totaal    = subTotaal + btwBedrag;
  const fmt = n => "€" + parseFloat(n||0).toLocaleString("nl-NL",{minimumFractionDigits:2});

  const dagTotaal = dagBonnen.reduce((s,b) => s + parseFloat(b.totaal_incl_btw||0), 0);

  async function afrekenen() {
    if (geldigeRegels.length === 0) return;
    setBezig(true);
    const ref = `KASSA-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(Math.random()*10000).toString().padStart(4,'0')}`;
    const bon = {
      klant_id: klantId || null,
      klant_naam_vrij: !klantId ? klantVrij || null : null,
      referentie: ref,
      regels: geldigeRegels.map(r => ({ product_id:r.product_id, naam:r.naam, prijs:parseFloat(r.prijs)||0, aantal:r.aantal })),
      totaal_excl_btw: subTotaal,
      totaal_incl_btw: totaal,
      incl_btw: inclBtw,
      betaalmethode,
    };
    try {
      if (!isDemoMode) {
        const { id } = await API.slaKassaBonOp(bon);
        bon.id = id;
        setDagBonnen(prev => [{ ...bon, datum:vandaag, totaal_incl_btw:totaal }, ...prev]);
        await herlaad(); // ververs productenlijst zodat bijgewerkte voorraad direct zichtbaar is
      }
      setSuccesBon({ ...bon, totaal, subTotaal, btwBedrag, regels:geldigeRegels, betaalmethode, klantNaam: klantId ? klanten.find(k=>k.id===klantId)?.naam : klantVrij });
      setWinkelwagen([]); setKlantId(""); setKlantVrij(""); setKortingType("percentage"); setKortingWaarde("");
    } catch(e) { alert("Afrekenen mislukt: "+e.message); }
    finally { setBezig(false); }
  }

  function printBon(bon) {
    const t = bonTemplate;
    const nu = new Date().toLocaleString("nl-NL");
    const regels = bon.regels.map(r =>
      `<tr><td>${r.aantal}× ${r.naam}</td><td style="text-align:right">${fmt((parseFloat(r.prijs)||0)*r.aantal)}</td></tr>`
    ).join('');
    const script = '<scr'+'ipt>window.onload=()=>{window.print();window.onafterprint=()=>window.close();}</scr'+'ipt>';
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <style>
      body { font-family: monospace; font-size: 12px; max-width: 300px; margin: 0 auto; padding: 10px; }
      h2 { text-align: center; font-size: 14px; margin: 0 0 4px; }
      p { text-align: center; margin: 2px 0; font-size: 11px; }
      hr { border: none; border-top: 1px dashed #000; margin: 8px 0; }
      table { width: 100%; border-collapse: collapse; font-size: 11px; }
      td { padding: 2px 0; }
      .totaal { font-weight: bold; font-size: 13px; }
      .slot { text-align: center; margin-top: 12px; font-size: 11px; }
    </style></head><body>
    <img src="${API.logoUrl()}" alt="" style="display:block;margin:0 auto 6px;max-height:60px;max-width:180px;object-fit:contain"
      onerror="this.style.display='none'" />
    ${t.bedrijfsnaam ? `<h2>${t.bedrijfsnaam}</h2>` : ''}
    ${t.adres ? `<p>${t.adres}</p>` : ''}
    ${t.telefoon ? `<p>Tel: ${t.telefoon}</p>` : ''}
    ${t.website ? `<p>${t.website}</p>` : ''}
    <hr>
    <p>${nu}</p>
    <p>${bon.referentie}</p>
    ${bon.klantNaam ? `<p>Klant: ${bon.klantNaam}</p>` : ''}
    <hr>
    <table>${regels}</table>
    <hr>
    ${inclBtw && t.toonBtw ? `<table><tr><td>Subtotaal excl. BTW</td><td style="text-align:right">${fmt(bon.subTotaal)}</td></tr><tr><td>BTW 21%</td><td style="text-align:right">${fmt(bon.btwBedrag)}</td></tr></table>` : ''}
    <table><tr class="totaal"><td>TOTAAL</td><td style="text-align:right">${fmt(bon.totaal)}</td></tr></table>
    ${t.toonBetaalmethode ? `<p style="margin-top:4px">Betaald met: ${bon.betaalmethode}</p>` : ''}
    ${t.slotTekst ? `<p class="slot">${t.slotTekst}</p>` : ''}
    ${script}
    </body></html>`;
    const w = window.open('', '_blank', 'width=400,height=600');
    w.document.write(html);
    w.document.close();
  }

  return (
    <div style={{ display:"flex", flexDirection: isMobiel ? "column" : "row", gap:16,
      height: isMobiel ? "auto" : "calc(100vh - 160px)" }}>

      {/* ── Linker kolom: producten ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:8, minWidth:0 }}>

        {/* Dagomzet teller */}
        {toonTeller && (
          <div style={{ background:kleur.hoofd, borderRadius:12, padding:"12px 16px",
            display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <p style={{ margin:0, fontSize:fs-2, color:"rgba(255,255,255,0.8)" }}>Vandaag verkocht</p>
              <p style={{ margin:0, fontSize:fs+8, fontWeight:700, color:"#fff" }}>{fmt(dagTotaal)}</p>
              <p style={{ margin:0, fontSize:fs-3, color:"rgba(255,255,255,0.7)" }}>{dagBonnen.length} {dagBonnen.length===1?"bon":"bonnen"}</p>
            </div>
            <button onClick={()=>setToonTeller(false)}
              style={{ background:"rgba(255,255,255,0.2)", border:"none", borderRadius:8,
                color:"#fff", cursor:"pointer", padding:"6px 10px", fontSize:fs-2 }}>
              Verberg
            </button>
          </div>
        )}
        {!toonTeller && (
          <button onClick={()=>setToonTeller(true)}
            style={{ padding:"8px 14px", borderRadius:8, border:`1px solid ${kleur.hoofd}`,
              background:kleur.licht, color:kleur.donker, cursor:"pointer", fontSize:fs-2, textAlign:"left" }}>
            📊 Toon dagomzet teller
          </button>
        )}

        {/* Zoek + categoriefilter */}
        <div style={{ display:"flex", gap:8 }}>
          <input value={zoek} onChange={e=>setZoek(e.target.value)} placeholder={T?.zoeken||"Zoeken"}
            style={{ ...iSt(fs), flex:1 }} />
        </div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {cats.map(c=>(
            <button key={c} onClick={()=>setActiveCat(c)}
              style={{ padding:"5px 12px", borderRadius:99, border:"none", cursor:"pointer", fontSize:fs-2,
                background: activeCat===c ? kleur.hoofd : "var(--color-background-secondary)",
                color: activeCat===c ? "#fff" : "var(--color-text-secondary)" }}>
              {c}
            </button>
          ))}
        </div>

        {/* Productenraster */}
        <div style={{ overflowY:"auto", flex: isMobiel ? "none" : 1, maxHeight: isMobiel ? "50vh" : "none" }}>
          {gefilterd.length > 0 && (
            <p style={{ margin:"0 0 8px", fontSize:fs-2, color:"var(--color-text-secondary)", textAlign:"center" }}>
              Klik een product om toe te voegen
            </p>
          )}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(130px,1fr))", gap:8 }}>
            {gefilterd.map(p=>(
              <button key={p.id} onClick={()=>voegToe(p)}
                style={{ padding:"12px 8px", borderRadius:10, border:`1px solid ${kleur.hoofd}22`,
                  background:"var(--color-background-primary)", cursor:"pointer", textAlign:"left",
                  transition:"all 0.1s" }}
                onMouseEnter={e=>{ e.currentTarget.style.background=kleur.licht; e.currentTarget.style.borderColor=kleur.hoofd; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="var(--color-background-primary)"; e.currentTarget.style.borderColor=`${kleur.hoofd}22`; }}>
                <p style={{ margin:"0 0 4px", fontSize:fs-1, fontWeight:500, color:"var(--color-text-primary)",
                  overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.naam}</p>
                {p.categorie&&<p style={{ margin:"0 0 4px", fontSize:fs-3, color:"var(--color-text-secondary)" }}>{p.categorie}</p>}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <p style={{ margin:0, fontSize:fs, fontWeight:700, color:kleur.hoofd }}>{fmt(p.prijs)}</p>
                  {p.voorraad !== null && p.voorraad !== undefined && (
                    <span style={{ fontSize:fs-3, padding:"1px 6px", borderRadius:99,
                      background: p.voorraad === 0 ? "#fcebeb" : p.voorraad <= 3 ? "#fffbf0" : "#eaf3de",
                      color: p.voorraad === 0 ? "#a32d2d" : p.voorraad <= 3 ? "#7a5800" : "#27500a",
                      fontWeight:600 }}>
                      {p.voorraad === 0 ? "uitverkocht" : `${p.voorraad} op voorraad`}
                    </span>
                  )}
                </div>
              </button>
            ))}
            {!losFormOpen ? (
              <button onClick={()=>setLosFormOpen(true)}
                style={{ padding:"12px 8px", borderRadius:10, border:`1px dashed ${kleur.hoofd}`,
                  background:"transparent", color:kleur.hoofd, cursor:"pointer", textAlign:"center",
                  display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4,
                  fontSize:fs-1, fontWeight:500, minHeight:74 }}>
                <span style={{ fontSize:fs+4 }}>+</span>
                Los product toevoegen
              </button>
            ) : (
              <div style={{ gridColumn:"1/-1", padding:"12px", borderRadius:10,
                border:`1.5px solid ${kleur.hoofd}`, background:kleur.licht,
                display:"flex", flexDirection:"column", gap:8 }}>
                <p style={{ margin:0, fontSize:fs-1, fontWeight:600, color:kleur.donker }}>Los product toevoegen</p>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  <input value={losFormNaam} onChange={e=>setLosFormNaam(e.target.value)}
                    placeholder="Omschrijving" autoFocus
                    style={{ ...iSt(fs), flex:2, minWidth:160 }} />
                  <div style={{ display:"flex", alignItems:"center", gap:4, flex:1, minWidth:100 }}>
                    <span style={{ fontSize:fs, color:"var(--color-text-secondary)" }}>€</span>
                    <input type="number" value={losFormPrijs} onChange={e=>setLosFormPrijs(e.target.value)}
                      placeholder="0.00" min="0" step="0.01"
                      onKeyDown={e=>e.key==="Enter" && voegLosToe()}
                      style={{ ...iSt(fs), flex:1 }} />
                  </div>
                </div>
                <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
                  <button onClick={()=>{ setLosFormOpen(false); setLosFormNaam(""); setLosFormPrijs(""); }}
                    style={{ padding:"7px 14px", borderRadius:8, border:"1px solid #ccc",
                      background:"var(--color-background-primary)", color:"var(--color-text-secondary)",
                      cursor:"pointer", fontSize:fs-1 }}>
                    Annuleren
                  </button>
                  <button onClick={voegLosToe} disabled={!losFormNaam.trim() || !parseFloat(losFormPrijs)}
                    style={{ padding:"7px 14px", borderRadius:8, border:"none",
                      background: (losFormNaam.trim() && parseFloat(losFormPrijs)) ? kleur.hoofd : "#ccc",
                      color:"#fff", cursor: (losFormNaam.trim() && parseFloat(losFormPrijs)) ? "pointer" : "not-allowed",
                      fontSize:fs-1, fontWeight:600 }}>
                    + Toevoegen aan bon
                  </button>
                </div>
              </div>
            )}
            {gefilterd.length===0&&<p style={{ color:"var(--color-text-secondary)", fontSize:fs-1, padding:"1rem" }}>Geen producten gevonden.</p>}
          </div>
        </div>
      </div>

      {/* ── Rechter kolom: bon ── */}
      <div style={{ width: isMobiel ? "100%" : 600, flexShrink:0, display:"flex", flexDirection:"column", gap:8 }}>
        <div style={{ background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)",
          borderRadius:12, padding:"1rem", flex:1, display:"flex", flexDirection:"column" }}>
          <h3 style={{ margin:"0 0 12px", fontSize:fs+1, fontWeight:600 }}>🧾 Bon</h3>

          {/* Klant (optioneel) */}
          <div style={{ marginBottom:10 }}>
            <KlantZoekBox klanten={klanten} value={klantId}
              onChange={id=>setKlantId(id)}
              placeholder={T?.zoekKlantPlaceholder||"Zoek op naam…"}
              fs={fs} />
            {!klantId && (
              <button onClick={()=>setKassaNkModal(true)}
                style={{ marginTop:6, padding:"5px 10px", borderRadius:6,
                  border:`1px dashed ${kleur.hoofd}`, background:"transparent",
                  color:kleur.hoofd, cursor:"pointer", fontSize:fs-2 }}>
                + Nieuwe klant aanmaken
              </button>
            )}
          </div>

          {/* Winkelwagen */}
          <div style={{ flex:1, overflowY:"auto", marginBottom:8 }}>
            {winkelwagen.filter(r=>!r.los).length===0 && winkelwagen.filter(r=>r.los).every(r=>!r.naam) && (
              <p style={{ color:"var(--color-text-secondary)", fontSize:fs-1, textAlign:"center", padding:"0.5rem 0" }}>
                Winkelwagen is nog leeg
              </p>
            )}
            {winkelwagen.map(r=>(
              <div key={r.id} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6,
                padding:"6px 8px", borderRadius:8, background:"var(--color-background-secondary)" }}>
                {bewerkRegelId === r.id ? (
                  <>
                    <input value={r.naam} onChange={e=>updateRegel(r.id,"naam",e.target.value)}
                      autoFocus
                      style={{ ...iSt(fs-1), flex:1, padding:"4px 8px" }} />
                    <div style={{ display:"flex", alignItems:"center", gap:2 }}>
                      <span style={{ fontSize:fs-2, color:"var(--color-text-secondary)" }}>€</span>
                      <input type="number" value={r.prijs} onChange={e=>updateRegel(r.id,"prijs",e.target.value)}
                        onKeyDown={e=>e.key==="Enter" && setBewerkRegelId(null)}
                        min="0" step="0.01"
                        style={{ ...iSt(fs-1), width:70, padding:"4px 6px" }} />
                    </div>
                    <button onClick={()=>setBewerkRegelId(null)}
                      style={{ background:kleur.hoofd, border:"none", borderRadius:6, color:"#fff",
                        cursor:"pointer", fontSize:fs-2, padding:"5px 10px", flexShrink:0 }}>
                      ✓
                    </button>
                  </>
                ) : (
                  <>
                    <span onClick={()=>setBewerkRegelId(r.id)}
                      title="Klik om te bewerken"
                      style={{ flex:1, fontSize:fs-1, fontWeight:500, cursor:"pointer",
                        overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.naam}</span>
                    <div style={{ display:"flex", alignItems:"center", gap:3, flexShrink:0 }}>
                      <button onClick={()=>updateAantal(r.id,-1)}
                        style={{ width:22,height:22,borderRadius:"50%",border:`1px solid ${kleur.hoofd}`,
                          background:kleur.licht,color:kleur.donker,cursor:"pointer",fontSize:14,padding:0 }}>−</button>
                      <span style={{ fontSize:fs-1, fontWeight:600, minWidth:16, textAlign:"center" }}>{r.aantal}</span>
                      <button onClick={()=>updateAantal(r.id,1)}
                        style={{ width:22,height:22,borderRadius:"50%",border:`1px solid ${kleur.hoofd}`,
                          background:kleur.licht,color:kleur.donker,cursor:"pointer",fontSize:14,padding:0 }}>+</button>
                    </div>
                    <span onClick={()=>setBewerkRegelId(r.id)} title="Klik om te bewerken"
                      style={{ fontSize:fs-1, fontWeight:600, color:kleur.hoofd, minWidth:50, textAlign:"right", cursor:"pointer" }}>
                      {fmt((parseFloat(r.prijs)||0)*r.aantal)}
                    </span>
                    <button onClick={()=>setBewerkRegelId(r.id)}
                      style={{ background:"none",border:"none",cursor:"pointer",color:"var(--color-text-secondary)",fontSize:13,padding:"0 2px" }}>✎</button>
                    <button onClick={()=>verwijderRegel(r.id)}
                      style={{ background:"none",border:"none",cursor:"pointer",color:"#a32d2d",fontSize:14,padding:"0 2px" }}>✕</button>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* BTW toggle */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"6px 8px", background:"var(--color-background-secondary)", borderRadius:8, marginBottom:8 }}>
            <div>
              <span style={{ fontSize:fs-2, fontWeight:500 }}>BTW (21%) toevoegen</span>
              <span style={{ fontSize:fs-3, color:"var(--color-text-secondary)", display:"block" }}>
                Standaard uit — instelling wordt onthouden
              </span>
            </div>
            <div onClick={()=>setInclBtw(!inclBtw)}
              style={{ width:36,height:20,borderRadius:99,cursor:"pointer",flexShrink:0,
                background:inclBtw?kleur.hoofd:"#ccc",position:"relative",transition:"background 0.2s" }}>
              <div style={{ position:"absolute",top:2,left:inclBtw?18:2,width:16,height:16,
                borderRadius:"50%",background:"#fff",transition:"left 0.2s" }} />
            </div>
          </div>

          {/* Korting */}
          <div style={{ marginBottom:8, padding:"8px", background:"var(--color-background-secondary)", borderRadius:8 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
              <span style={{ fontSize:fs-2, fontWeight:500 }}>🏷 Korting</span>
              <div style={{ display:"flex", borderRadius:6, overflow:"hidden", border:`1px solid ${kleur.hoofd}` }}>
                <button onClick={()=>setKortingType("percentage")}
                  style={{ padding:"3px 8px", border:"none", cursor:"pointer", fontSize:fs-3,
                    background:kortingType==="percentage"?kleur.hoofd:"var(--color-background-primary)",
                    color:kortingType==="percentage"?"#fff":"var(--color-text-secondary)" }}>%</button>
                <button onClick={()=>setKortingType("bedrag")}
                  style={{ padding:"3px 8px", border:"none", cursor:"pointer", fontSize:fs-3,
                    background:kortingType==="bedrag"?kleur.hoofd:"var(--color-background-primary)",
                    color:kortingType==="bedrag"?"#fff":"var(--color-text-secondary)" }}>€</button>
              </div>
            </div>
            <input type="number" value={kortingWaarde} onChange={e=>setKortingWaarde(e.target.value)}
              placeholder={kortingType==="percentage"?"0 %":"€ 0,00"} min="0"
              step={kortingType==="percentage"?"1":"0.01"}
              style={{ ...iSt(fs-1), padding:"5px 8px" }} />
          </div>

          {/* Totaal */}
          <div style={{ borderTop:"0.5px solid var(--color-border-tertiary)", paddingTop:8, marginBottom:8 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:fs-1, color:"var(--color-text-secondary)", marginBottom:4 }}>
              <span>Subtotaal</span><span>{fmt(subTotaalVoorKorting)}</span>
            </div>
            {kortingBedrag>0 && (
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:fs-1, color:"#a32d2d", marginBottom:4 }}>
                <span>Korting {kortingType==="percentage"?`(${kortingWaarde}%)`:""}</span>
                <span>−{fmt(kortingBedrag)}</span>
              </div>
            )}
            {inclBtw&&<div style={{ display:"flex", justifyContent:"space-between", fontSize:fs-1, color:"var(--color-text-secondary)", marginBottom:4 }}>
              <span>BTW 21%</span><span>{fmt(btwBedrag)}</span>
            </div>}
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:fs+2, fontWeight:700, color:kleur.hoofd }}>
              <span>Totaal</span><span>{fmt(totaal)}</span>
            </div>
          </div>

          {/* Betaalmethode */}
          <div style={{ display:"flex", gap:6, marginBottom:10 }}>
            {["contant","pin","overig"].map(m=>(
              <button key={m} onClick={()=>setBetaalmethode(m)}
                style={{ flex:1, padding:"6px", borderRadius:8, cursor:"pointer", fontSize:fs-2,
                  border:`1.5px solid ${betaalmethode===m?kleur.hoofd:"var(--color-border-secondary)"}`,
                  background:betaalmethode===m?kleur.hoofd:"var(--color-background-primary)",
                  color:betaalmethode===m?"#fff":"var(--color-text-secondary)",
                  fontWeight:betaalmethode===m?600:400 }}>
                {m==="contant"?"💵 Contant":m==="pin"?"💳 Pin":"📋 Overig"}
              </button>
            ))}
          </div>

          {/* Afrekenen knop */}
          <button onClick={afrekenen} disabled={bezig||geldigeRegels.length===0}
            style={{ width:"100%", padding:"14px", borderRadius:10, border:"none",
              background:geldigeRegels.length>0?kleur.hoofd:"#ccc",
              color:"#fff", cursor:geldigeRegels.length>0?"pointer":"not-allowed",
              fontSize:fs+1, fontWeight:700, transition:"all 0.15s" }}>
            {bezig ? "Bezig…" : `✓ ${T?.afrekenen||"Afrekenen"} ${geldigeRegels.length>0?fmt(totaal):""}`}
          </button>
        </div>
      </div>

      {kassaNkModal && (
        <Modal title="Nieuwe klant aanmaken" onClose={()=>setKassaNkModal(false)} fs={fs}>
          <FF label="Naam" fs={fs}><input value={kassaNkForm.naam} onChange={e=>setKassaNkForm(f=>({...f,naam:e.target.value}))} style={iSt(fs)} /></FF>
          <FF label="E-mailadres" fs={fs}><input type="email" value={kassaNkForm.email} onChange={e=>setKassaNkForm(f=>({...f,email:e.target.value}))} style={iSt(fs)} /></FF>
          <FF label="Telefoon" fs={fs}><input value={kassaNkForm.telefoon} onChange={e=>setKassaNkForm(f=>({...f,telefoon:e.target.value}))} style={iSt(fs)} /></FF>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:"1rem" }}>
            <Btn onClick={()=>setKassaNkModal(false)} fs={fs}>Annuleren</Btn>
            <Btn variant="primary" kleur={kleur} fs={fs} disabled={!kassaNkForm.naam}
              onClick={async()=>{
                try {
                  const { id } = await API.maakKlantAan({ naam:kassaNkForm.naam, email:kassaNkForm.email, telefoon:kassaNkForm.telefoon });
                  await herlaad();
                  setKlantId(id);
                  setKassaNkModal(false);
                  setKassaNkForm({naam:"",email:"",telefoon:""});
                } catch(e) { alert("Aanmaken mislukt: "+e.message); }
              }}>
              Aanmaken & koppelen
            </Btn>
          </div>
        </Modal>
      )}

      {/* ── Bon template modal ── */}
      {templateModal && (
        <div style={{ position:"fixed", inset:0, zIndex:1100 }}>
        <Modal title={T?.bonTemplateAanpassen||"🖨 Bon template aanpassen"} onClose={()=>{ setTemplateModal(false); }} fs={fs}>
          <p style={{ fontSize:fs-1, color:"var(--color-text-secondary)", margin:"0 0 1rem" }}>
            Pas de opmaak van uw printbon aan. Deze instellingen worden lokaal opgeslagen.
          </p>
          {[
            {l:"Bedrijfsnaam", k:"bedrijfsnaam", ph:"Uw bedrijfsnaam"},
            {l:"Adres", k:"adres", ph:"Straat 1, 1234 AB Stad"},
            {l:"Telefoonnummer", k:"telefoon", ph:"06-12345678"},
            {l:"Website", k:"website", ph:"www.uwsite.nl"},
            {l:"Slottekst (onderaan de bon)", k:"slotTekst", ph:"Bedankt voor uw aankoop!"},
          ].map(veld=>(
            <div key={veld.k} style={{ marginBottom:10 }}>
              <label style={{ display:"block", fontSize:fs-2, color:"#555", marginBottom:3, fontWeight:500 }}>{veld.l}</label>
              <input value={bonTemplate[veld.k]||""} onChange={e=>setBonTemplate({...bonTemplate,[veld.k]:e.target.value})}
                placeholder={veld.ph} style={iSt(fs)} />
            </div>
          ))}
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:"1rem" }}>
            {[
              {l:"BTW-bedrag tonen op bon", k:"toonBtw"},
              {l:"Betaalmethode tonen op bon", k:"toonBetaalmethode"},
            ].map(opt=>(
              <div key={opt.k} style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                padding:"8px 10px", borderRadius:8, background:"var(--color-background-secondary)" }}>
                <span style={{ fontSize:fs-2 }}>{opt.l}</span>
                <div onClick={()=>setBonTemplate({...bonTemplate,[opt.k]:!bonTemplate[opt.k]})}
                  style={{ width:36,height:20,borderRadius:99,cursor:"pointer",
                    background:bonTemplate[opt.k]?kleur.hoofd:"#ccc",position:"relative",transition:"background 0.2s" }}>
                  <div style={{ position:"absolute",top:2,left:bonTemplate[opt.k]?18:2,width:16,height:16,
                    borderRadius:"50%",background:"#fff",transition:"left 0.2s" }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
            <Btn onClick={()=>setTemplateModal(false)} fs={fs}>Sluiten</Btn>
            <Btn variant="primary" onClick={()=>setTemplateModal(false)} kleur={kleur} fs={fs}>✓ Opslaan</Btn>
          </div>
        </Modal>
        </div>
      )}

      {/* ── Succes bon popup ── */}
      {succesBon && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)",
          display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:"1rem" }}>
          <div style={{ background:"#fff", borderRadius:16, padding:"2rem", width:"100%", maxWidth:400,
            textAlign:"center", boxShadow:"0 16px 48px rgba(0,0,0,0.25)" }}>
            <div style={{ fontSize:56, marginBottom:"0.5rem" }}>✅</div>
            <h2 style={{ margin:"0 0 0.5rem", color:"#27500a" }}>Betaald!</h2>
            <p style={{ color:"#555", fontSize:fs, marginBottom:"0.25rem" }}>{succesBon.referentie}</p>
            <p style={{ color:kleur.hoofd, fontSize:fs+6, fontWeight:700, margin:"0 0 1rem" }}>{fmt(succesBon.totaal)}</p>
            <div style={{ background:"#f5f5f5", borderRadius:8, padding:"10px", marginBottom:"1rem",
              fontSize:fs-1, textAlign:"left" }}>
              {succesBon.regels.map(r=>(
                <div key={r.id} style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span>{r.aantal}× {r.naam||"—"}</span>
                  <span>{fmt((parseFloat(r.prijs)||0)*r.aantal)}</span>
                </div>
              ))}
              {inclBtw && (
                <>
                  <div style={{ borderTop:"1px solid #ddd", margin:"6px 0" }} />
                  <div style={{ display:"flex", justifyContent:"space-between", color:"#666" }}>
                    <span>BTW 21%</span><span>{fmt(succesBon.btwBedrag)}</span>
                  </div>
                </>
              )}
            </div>

            {/* Print opties */}
            <p style={{ fontSize:fs-2, color:"#888", margin:"0 0 8px", fontWeight:500 }}>Afdrukken als:</p>
            <div style={{ display:"flex", gap:8, marginBottom:8 }}>
              <button onClick={()=>printBon(succesBon)}
                style={{ flex:1, padding:"11px", borderRadius:10, background:"#f5f5f5",
                  color:"#333", border:"1px solid #ddd", cursor:"pointer", fontSize:fs-1, fontWeight:500,
                  display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <span style={{ fontSize:20 }}>🧾</span>
                <span>Klassieke bon</span>
                <span style={{ fontSize:fs-3, color:"#888" }}>Kassabon formaat</span>
              </button>
              <button onClick={()=>printBonA4(succesBon, succesBon.subTotaal, succesBon.btwBedrag, inclBtw)}
                style={{ flex:1, padding:"11px", borderRadius:10, background:"#f5f5f5",
                  color:"#333", border:"1px solid #ddd", cursor:"pointer", fontSize:fs-1, fontWeight:500,
                  display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <span style={{ fontSize:20 }}>📄</span>
                <span>A4 PDF</span>
                <span style={{ fontSize:fs-3, color:"#888" }}>Factuurformaat</span>
              </button>
            </div>

            {/* Bon template + Nieuwe bon */}
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={()=>setTemplateModal(true)}
                style={{ padding:"10px 14px", borderRadius:10, background:"#f0f4ff",
                  color:"#2a4ab5", border:"1px solid #c5d0f5", cursor:"pointer", fontSize:fs-2, fontWeight:500 }}>
                ⚙ Bon template
              </button>
              <button onClick={()=>setSuccesBon(null)}
                style={{ flex:1, padding:"11px", borderRadius:10, background:kleur.hoofd,
                  color:"#fff", border:"none", cursor:"pointer", fontSize:fs-1, fontWeight:600 }}>
                Nieuwe bon
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── WERKBONNEN / REPARATIES ──────────────────────────────────
const WERKBON_STATUSSEN = [
  { id:"nieuw",       label:"Nieuw",        kleur:"#185FA5", bg:"#e8f0fb" },
  { id:"in_behandeling", label:"In behandeling", kleur:"#7a5800", bg:"#fffbf0" },
  { id:"wacht_onderdelen", label:"Wacht op onderdelen", kleur:"#7a3500", bg:"#fff3e8" },
  { id:"klaar",       label:"Klaar",        kleur:"#27500a", bg:"#eaf3de" },
  { id:"afgeleverd",  label:"Afgeleverd",   kleur:"#444",    bg:"#f0f0f0" },
];

function WerkbonnenPage({ klanten, setKlanten, kleur, fs, isDemoMode, herlaad, T, isMobiel }) {
  const [werkbonnen, setWerkbonnen] = useState([]);
  const [laden, setLaden] = useState(true);
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [filterStatus, setFilterStatus] = useState("alle");
  const [zoek, setZoek] = useState("");
  const [nkModal, setNkModal] = useState(false);
  const [nkForm, setNkForm] = useState({ naam:"", email:"", telefoon:"" });

  const leegForm = () => ({
    klant_id:"", product_omschrijving:"",
    datum_inname: new Date().toISOString().slice(0,16),
    datum_klaar:"", klacht:"", notitie:"", onderdelen:[], status:"nieuw",
  });
  const [form, setForm] = useState(leegForm);

  useEffect(() => { laad(); }, []);

  async function laad() {
    setLaden(true);
    try { if (!isDemoMode) { const data = await API.haalWerkbonnenOp(); setWerkbonnen(data); } }
    catch(e) { console.error(e); }
    finally { setLaden(false); }
  }

  function openNieuw() { setForm(leegForm()); setEditId(null); setModal(true); }

  function openEdit(w) {
    setForm({
      klant_id: w.klant_id||"", product_omschrijving: w.product_omschrijving||"",
      datum_inname: w.datum_inname ? w.datum_inname.slice(0,16) : "",
      datum_klaar: w.datum_klaar||"", klacht: w.klacht||"",
      notitie: w.notitie||"", onderdelen: w.onderdelen||[], status: w.status||"nieuw",
    });
    setEditId(w.id); setModal(true);
  }

  async function slaOp() {
    const data = {
      klant_id: form.klant_id||null, product_omschrijving: form.product_omschrijving||null,
      datum_inname: form.datum_inname||null, datum_klaar: form.datum_klaar||null,
      klacht: form.klacht||null, notitie: form.notitie||null,
      onderdelen: form.onderdelen.filter(o=>o.naam), status: form.status,
    };
    try {
      if (editId) {
        await API.updateWerkbon(editId, data);
      } else {
        const ref = `WB-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*10000).toString().padStart(4,"0")}`;
        await API.maakWerkbonAan({...data, referentie:ref});
      }
      await laad(); setModal(false);
    } catch(e) { alert("Opslaan mislukt: "+e.message); }
  }

  async function verwijder(id) {
    if (!confirm("Werkbon verwijderen?")) return;
    try { await API.verwijderWerkbon(id); await laad(); setDetail(null); }
    catch(e) { alert("Verwijderen mislukt: "+e.message); }
  }

  async function maakNieuweKlant() {
    if (!nkForm.naam) return;
    try {
      const { id } = await API.maakKlantAan({ naam:nkForm.naam, email:nkForm.email, telefoon:nkForm.telefoon });
      await herlaad();
      setForm(f=>({...f, klant_id:id}));
      setNkModal(false); setNkForm({naam:"",email:"",telefoon:""});
    } catch(e) { alert("Klant aanmaken mislukt: "+e.message); }
  }

  function voegOnderdeelToe() {
    setForm(f=>({...f, onderdelen:[...f.onderdelen,{id:uid(),naam:"",aantal:1,prijs:""}]}));
  }
  function updateOnderdeel(id,veld,val) {
    setForm(f=>({...f, onderdelen:f.onderdelen.map(o=>o.id===id?{...o,[veld]:val}:o)}));
  }
  function verwijderOnderdeel(id) {
    setForm(f=>({...f, onderdelen:f.onderdelen.filter(o=>o.id!==id)}));
  }

  function printWerkbon(w) {
    const klant = klanten.find(k=>k.id===w.klant_id);
    const fmtP = n => n?"€"+parseFloat(n).toLocaleString("nl-NL",{minimumFractionDigits:2}):"—";
    const totaal = (w.onderdelen||[]).reduce((s,o)=>s+(parseFloat(o.prijs)||0)*o.aantal,0);
    const script = "<scr"+"ipt>window.onload=()=>{window.print();window.onafterprint=()=>window.close();}<\/scr"+"ipt>";
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
      body{font-family:Arial,sans-serif;font-size:12px;margin:0;padding:28px}
      h1{font-size:20px;color:#185FA5;margin:0 0 4px}
      .hdr{display:flex;justify-content:space-between;margin-bottom:20px}
      .lbl{font-size:10px;color:#888;font-weight:600;letter-spacing:.05em;margin-bottom:2px}
      .val{font-size:12px;margin-bottom:10px;white-space:pre-wrap}
      hr{border:none;border-top:2px solid #185FA5;margin:14px 0}
      table{width:100%;border-collapse:collapse;margin-top:8px}
      th{background:#185FA5;color:#fff;padding:7px 10px;text-align:left;font-size:11px}
      td{padding:6px 10px;border-bottom:1px solid #eee;font-size:11px}
      .footer{margin-top:30px;font-size:11px;color:#888;text-align:center}
      @media print{body{padding:16px}}
    </style></head><body>
    <div class="hdr">
      <div><h1>Werkbon / Reparatie</h1><p style="color:#666;font-size:11px">${w.referentie}</p></div>
      <div style="text-align:right">
        <p style="font-size:11px;color:#666">Inname: ${w.datum_inname?new Date(w.datum_inname).toLocaleString("nl-NL"):"—"}</p>
        <p style="font-size:11px;color:#666">Klaar voor: ${w.datum_klaar||"—"}</p>
      </div>
    </div><hr>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
      <div>
        <div class="lbl">KLANT</div><div class="val"><strong>${w.klant_naam||"—"}</strong><br>${klant?.email||""} ${klant?.telefoon?`· ${klant.telefoon}`:""}</div>
        <div class="lbl">PRODUCT</div><div class="val">${w.product_omschrijving||"—"}</div>
      </div>
      <div>
        <div class="lbl">KLACHT / REDEN</div><div class="val">${w.klacht||"—"}</div>
        <div class="lbl">STATUS</div><div class="val">${WERKBON_STATUSSEN.find(s=>s.id===w.status)?.label||w.status}</div>
      </div>
    </div>
    ${(w.onderdelen||[]).length>0?`<hr><div class="lbl">ONDERDELEN</div>
    <table><tr><th>Onderdeel</th><th>Aantal</th><th style="text-align:right">Prijs</th><th style="text-align:right">Totaal</th></tr>
    ${(w.onderdelen||[]).map(o=>`<tr><td>${o.naam}</td><td>${o.aantal}</td><td style="text-align:right">${fmtP(o.prijs)}</td><td style="text-align:right">${fmtP((parseFloat(o.prijs)||0)*o.aantal)}</td></tr>`).join("")}
    <tr><td colspan="3" style="text-align:right;font-weight:bold">Totaal:</td><td style="text-align:right;font-weight:bold">${fmtP(totaal)}</td></tr></table>`:""}
    ${w.notitie?`<hr><div class="lbl">NOTITIE</div><div class="val">${w.notitie}</div>`:""}
    <div class="footer">Handtekening klant: _____________________________ &nbsp;&nbsp; Datum: _____________</div>
    ${script}</body></html>`;
    const win = window.open("","_blank","width=800,height=900");
    win.document.write(html); win.document.close();
  }

  const gefilterd = werkbonnen
    .filter(w=>filterStatus==="alle"||w.status===filterStatus)
    .filter(w=>!zoek||(w.klant_naam||"").toLowerCase().includes(zoek.toLowerCase())
             ||w.referentie.toLowerCase().includes(zoek.toLowerCase())
             ||(w.product_omschrijving||"").toLowerCase().includes(zoek.toLowerCase()));

  const statusBadge = (status) => {
    const s = WERKBON_STATUSSEN.find(x=>x.id===status)||WERKBON_STATUSSEN[0];
    return <span style={{ fontSize:fs-3, padding:"2px 8px", borderRadius:99, background:s.bg, color:s.kleur, fontWeight:500 }}>{s.label}</span>;
  };

  const fmtP = n => n ? "€"+parseFloat(n).toLocaleString("nl-NL",{minimumFractionDigits:2}) : "";

  return (
    <div style={{ display:"flex", flexDirection: isMobiel ? "column" : "row", gap:16, height: isMobiel ? "auto" : "calc(100vh - 160px)" }}>
      {/* ── Lijst ── */}
      <div style={{ width: isMobiel ? "100%" : 340, flexShrink:0, display:"flex", flexDirection:"column", gap:8,
        maxHeight: isMobiel ? "45vh" : "none", overflowY: isMobiel ? "auto" : "visible" }}>
        <input value={zoek} onChange={e=>setZoek(e.target.value)} placeholder="Zoek op klant, product, referentie…" style={iSt(fs)} />
        <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
          <button onClick={()=>setFilterStatus("alle")}
            style={{ padding:"4px 10px", borderRadius:99, border:"none", cursor:"pointer", fontSize:fs-3,
              background:filterStatus==="alle"?kleur.hoofd:"var(--color-background-secondary)",
              color:filterStatus==="alle"?"#fff":"var(--color-text-secondary)" }}>
            Alle ({werkbonnen.length})
          </button>
          {WERKBON_STATUSSEN.map(s=>(
            <button key={s.id} onClick={()=>setFilterStatus(s.id)}
              style={{ padding:"4px 10px", borderRadius:99, border:"none", cursor:"pointer", fontSize:fs-3,
                background:filterStatus===s.id?s.kleur:s.bg, color:filterStatus===s.id?"#fff":s.kleur }}>
              {s.label} ({werkbonnen.filter(w=>w.status===s.id).length})
            </button>
          ))}
        </div>
        <Btn variant="primary" onClick={openNieuw} kleur={kleur} fs={fs}>+ Nieuwe werkbon</Btn>
        <div style={{ overflowY:"auto", flex:1, display:"flex", flexDirection:"column", gap:6 }}>
          {laden&&<p style={{ color:"var(--color-text-secondary)", fontSize:fs-1 }}>Laden…</p>}
          {!laden&&gefilterd.length===0&&<p style={{ color:"var(--color-text-secondary)", fontSize:fs-1 }}>Geen werkbonnen gevonden.</p>}
          {gefilterd.map(w=>(
            <div key={w.id} onClick={()=>setDetail(w)}
              style={{ background:"var(--color-background-primary)",
                border:`1px solid ${detail?.id===w.id?kleur.hoofd:"var(--color-border-tertiary)"}`,
                borderRadius:10, padding:"10px 12px", cursor:"pointer",
                borderLeft:`4px solid ${WERKBON_STATUSSEN.find(s=>s.id===w.status)?.kleur||kleur.hoofd}` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                <span style={{ fontSize:fs-2, fontWeight:600, color:kleur.hoofd }}>{w.referentie}</span>
                {statusBadge(w.status)}
              </div>
              <p style={{ margin:0, fontSize:fs-1, fontWeight:500 }}>{w.klant_naam||"Geen klant"}</p>
              {w.product_omschrijving&&<p style={{ margin:"2px 0 0", fontSize:fs-2, color:"var(--color-text-secondary)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{w.product_omschrijving}</p>}
              {w.datum_klaar&&<p style={{ margin:"2px 0 0", fontSize:fs-3, color:"var(--color-text-secondary)" }}>Klaar: {w.datum_klaar}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* ── Detail ── */}
      <div style={{ flex:1, background:"var(--color-background-primary)",
        border:"0.5px solid var(--color-border-tertiary)", borderRadius:16, padding:"1.5rem", overflowY:"auto" }}>
        {!detail ? (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
            height:"100%", color:"var(--color-text-secondary)", fontSize:fs }}>
            Selecteer een werkbon om details te zien
          </div>
        ) : (<>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1.5rem", flexWrap:"wrap", gap:8 }}>
            <div>
              <h2 style={{ margin:0, fontSize:fs+4 }}>{detail.referentie}</h2>
              <p style={{ margin:"4px 0 0", fontSize:fs-1, color:"var(--color-text-secondary)" }}>
                Aangemaakt: {new Date(detail.aangemaakt_op).toLocaleString("nl-NL")}
              </p>
            </div>
            <div style={{ display:"flex", gap:6 }}>
              <button onClick={()=>printWerkbon(detail)}
                style={{ padding:"7px 12px", borderRadius:8, background:"var(--color-background-secondary)",
                  border:"1px solid var(--color-border-secondary)", cursor:"pointer", fontSize:fs-1 }}>
                🖨 Afdrukken
              </button>
              <button onClick={()=>openEdit(detail)}
                style={{ padding:"7px 12px", borderRadius:8, background:kleur.licht,
                  border:`1px solid ${kleur.hoofd}`, color:kleur.donker, cursor:"pointer", fontSize:fs-1 }}>
                ✎ Bewerken
              </button>
              <button onClick={()=>{ verwijder(detail.id); }}
                style={{ padding:"7px 12px", borderRadius:8, background:"#fcebeb",
                  border:"none", color:"#a32d2d", cursor:"pointer", fontSize:fs-1 }}>
                ✕ Verwijderen
              </button>
            </div>
          </div>
          <div style={{ display:"flex", gap:6, marginBottom:"1.5rem", flexWrap:"wrap" }}>
            {WERKBON_STATUSSEN.map(s=>(
              <button key={s.id} onClick={async()=>{
                  const updated={...detail,status:s.id};
                  setDetail(updated); setWerkbonnen(prev=>prev.map(w=>w.id===detail.id?updated:w));
                  if (!isDemoMode) await API.updateWerkbon(detail.id,{...detail,status:s.id});
                }}
                style={{ padding:"5px 12px", borderRadius:99, cursor:"pointer", fontSize:fs-2, border:"none",
                  background:detail.status===s.id?s.kleur:s.bg, color:detail.status===s.id?"#fff":s.kleur,
                  fontWeight:detail.status===s.id?700:400 }}>
                {s.label}
              </button>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:"1.5rem" }}>
            <div>
              <p style={{ margin:"0 0 4px", fontSize:fs-2, fontWeight:600, color:"var(--color-text-secondary)" }}>KLANT</p>
              <p style={{ margin:0, fontSize:fs, fontWeight:500 }}>{detail.klant_naam||"—"}</p>
              {detail.klant_email&&<p style={{ margin:"2px 0 0", fontSize:fs-2, color:"var(--color-text-secondary)" }}>{detail.klant_email}</p>}
              {detail.klant_telefoon&&<p style={{ margin:"2px 0 0", fontSize:fs-2, color:"var(--color-text-secondary)" }}>{detail.klant_telefoon}</p>}
            </div>
            <div>
              <p style={{ margin:"0 0 4px", fontSize:fs-2, fontWeight:600, color:"var(--color-text-secondary)" }}>PRODUCT</p>
              <p style={{ margin:0, fontSize:fs }}>{detail.product_omschrijving||"—"}</p>
            </div>
            <div>
              <p style={{ margin:"0 0 4px", fontSize:fs-2, fontWeight:600, color:"var(--color-text-secondary)" }}>DATUM INNAME</p>
              <p style={{ margin:0, fontSize:fs }}>{detail.datum_inname?new Date(detail.datum_inname).toLocaleString("nl-NL"):"—"}</p>
            </div>
            <div>
              <p style={{ margin:"0 0 4px", fontSize:fs-2, fontWeight:600, color:"var(--color-text-secondary)" }}>KLAAR VOOR</p>
              <p style={{ margin:0, fontSize:fs }}>{detail.datum_klaar||"—"}</p>
            </div>
          </div>
          {detail.klacht&&(
            <div style={{ marginBottom:"1.5rem" }}>
              <p style={{ margin:"0 0 4px", fontSize:fs-2, fontWeight:600, color:"var(--color-text-secondary)" }}>KLACHT / REDEN</p>
              <p style={{ margin:0, fontSize:fs, whiteSpace:"pre-wrap", background:"var(--color-background-secondary)", padding:"10px", borderRadius:8 }}>{detail.klacht}</p>
            </div>
          )}
          {detail.onderdelen?.length>0&&(
            <div style={{ marginBottom:"1.5rem" }}>
              <p style={{ margin:"0 0 8px", fontSize:fs-2, fontWeight:600, color:"var(--color-text-secondary)" }}>BENODIGDE ONDERDELEN</p>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead><tr style={{ background:"var(--color-background-secondary)" }}>
                  <th style={{ padding:"6px 10px", textAlign:"left", fontSize:fs-2 }}>Onderdeel</th>
                  <th style={{ padding:"6px 10px", textAlign:"center", fontSize:fs-2 }}>Aantal</th>
                  <th style={{ padding:"6px 10px", textAlign:"right", fontSize:fs-2 }}>Prijs</th>
                  <th style={{ padding:"6px 10px", textAlign:"right", fontSize:fs-2 }}>Totaal</th>
                </tr></thead>
                <tbody>
                  {detail.onderdelen.map(o=>(
                    <tr key={o.id} style={{ borderBottom:"0.5px solid var(--color-border-tertiary)" }}>
                      <td style={{ padding:"6px 10px", fontSize:fs-1 }}>{o.naam}</td>
                      <td style={{ padding:"6px 10px", textAlign:"center", fontSize:fs-1 }}>{o.aantal}</td>
                      <td style={{ padding:"6px 10px", textAlign:"right", fontSize:fs-1 }}>{fmtP(o.prijs)}</td>
                      <td style={{ padding:"6px 10px", textAlign:"right", fontSize:fs-1, fontWeight:500 }}>{fmtP((parseFloat(o.prijs)||0)*o.aantal)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={3} style={{ padding:"8px 10px", textAlign:"right", fontWeight:600, fontSize:fs }}>Totaal onderdelen:</td>
                    <td style={{ padding:"8px 10px", textAlign:"right", fontWeight:700, fontSize:fs, color:kleur.hoofd }}>
                      {fmtP(detail.onderdelen.reduce((s,o)=>s+(parseFloat(o.prijs)||0)*o.aantal,0))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {detail.notitie&&(
            <div>
              <p style={{ margin:"0 0 4px", fontSize:fs-2, fontWeight:600, color:"var(--color-text-secondary)" }}>NOTITIE</p>
              <p style={{ margin:0, fontSize:fs, whiteSpace:"pre-wrap", background:"var(--color-background-secondary)", padding:"10px", borderRadius:8 }}>{detail.notitie}</p>
            </div>
          )}
        </>)}
      </div>

      {/* ── Werkbon modal ── */}
      {modal&&(
        <Modal title={editId?"Werkbon bewerken":"Nieuwe werkbon"} onClose={()=>setModal(false)} fs={fs}>
          <FF label={T?.status||"Status"} fs={fs}>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {WERKBON_STATUSSEN.map(s=>(
                <button key={s.id} onClick={()=>setForm(f=>({...f,status:s.id}))}
                  style={{ padding:"5px 12px", borderRadius:99, cursor:"pointer", fontSize:fs-2, border:"none",
                    background:form.status===s.id?s.kleur:s.bg, color:form.status===s.id?"#fff":s.kleur,
                    fontWeight:form.status===s.id?700:400 }}>
                  {s.label}
                </button>
              ))}
            </div>
          </FF>
          <FF label="Klant (optioneel)" fs={fs}>
            <KlantZoekBox klanten={klanten} value={form.klant_id} onChange={id=>setForm(f=>({...f,klant_id:id}))} fs={fs} />
            <button onClick={()=>setNkModal(true)}
              style={{ marginTop:6, padding:"5px 10px", borderRadius:6, border:`1px dashed ${kleur.hoofd}`,
                background:"transparent", color:kleur.hoofd, cursor:"pointer", fontSize:fs-2 }}>
              + Nieuwe klant aanmaken en koppelen
            </button>
          </FF>
          <FF label={T?.productOmschrijving||"Te repareren product (optioneel)"} fs={fs}>
            <input value={form.product_omschrijving} onChange={e=>setForm(f=>({...f,product_omschrijving:e.target.value}))}
              placeholder="Bijv. Samsung TV model X, Laptop merk Y…" style={iSt(fs)} />
          </FF>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            <FF label={T?.datumInname||"Datum inname"} fs={fs}>
              <input type="datetime-local" value={form.datum_inname} onChange={e=>setForm(f=>({...f,datum_inname:e.target.value}))} style={iSt(fs)} />
            </FF>
            <FF label={T?.klaarVoor||"Klaar voor datum"} fs={fs}>
              <input type="date" value={form.datum_klaar} onChange={e=>setForm(f=>({...f,datum_klaar:e.target.value}))} style={iSt(fs)} />
            </FF>
          </div>
          <FF label={T?.klacht||"Klacht / Reden voor reparatie"} fs={fs}>
            <textarea value={form.klacht} onChange={e=>setForm(f=>({...f,klacht:e.target.value}))}
              rows={3} placeholder="Beschrijf de klacht…" style={{...iSt(fs),resize:"vertical"}} />
          </FF>
          <div style={{ marginBottom:"1rem" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
              <label style={{ fontSize:fs-1, fontWeight:500 }}>Benodigde onderdelen (optioneel)</label>
              <button onClick={voegOnderdeelToe}
                style={{ padding:"4px 10px", borderRadius:6, border:`1px solid ${kleur.hoofd}`,
                  background:kleur.licht, color:kleur.donker, cursor:"pointer", fontSize:fs-2 }}>
                + Onderdeel
              </button>
            </div>
            {form.onderdelen.map(o=>(
              <div key={o.id} style={{ display:"flex", gap:6, marginBottom:6, alignItems:"center" }}>
                <input value={o.naam} onChange={e=>updateOnderdeel(o.id,"naam",e.target.value)}
                  placeholder="Naam onderdeel" style={{ ...iSt(fs-1), flex:2 }} />
                <input type="number" value={o.aantal} onChange={e=>updateOnderdeel(o.id,"aantal",parseInt(e.target.value)||1)}
                  min={1} style={{ ...iSt(fs-1), width:56 }} />
                <input type="number" value={o.prijs} onChange={e=>updateOnderdeel(o.id,"prijs",e.target.value)}
                  placeholder="€" step="0.01" style={{ ...iSt(fs-1), width:72 }} />
                <button onClick={()=>verwijderOnderdeel(o.id)}
                  style={{ background:"none",border:"none",cursor:"pointer",color:"#a32d2d",fontSize:16 }}>✕</button>
              </div>
            ))}
          </div>
          <FF label={`${T?.notitie||"Notitie"} (optioneel)`} fs={fs}>
            <textarea value={form.notitie} onChange={e=>setForm(f=>({...f,notitie:e.target.value}))}
              rows={3} placeholder="Interne notitie" style={{...iSt(fs),resize:"vertical"}} />
          </FF>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:"1rem" }}>
            <Btn onClick={()=>setModal(false)} fs={fs}>Annuleren</Btn>
            <Btn variant="primary" onClick={slaOp} kleur={kleur} fs={fs}>💾 Opslaan</Btn>
          </div>
        </Modal>
      )}

      {/* ── Nieuwe klant modal ── */}
      {nkModal&&(
        <Modal title="Nieuwe klant aanmaken" onClose={()=>setNkModal(false)} fs={fs}>
          <FF label="Naam" fs={fs}><input value={nkForm.naam} onChange={e=>setNkForm(f=>({...f,naam:e.target.value}))} style={iSt(fs)} /></FF>
          <FF label="E-mailadres" fs={fs}><input type="email" value={nkForm.email} onChange={e=>setNkForm(f=>({...f,email:e.target.value}))} style={iSt(fs)} /></FF>
          <FF label="Telefoon" fs={fs}><input value={nkForm.telefoon} onChange={e=>setNkForm(f=>({...f,telefoon:e.target.value}))} style={iSt(fs)} /></FF>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:"1rem" }}>
            <Btn onClick={()=>setNkModal(false)} fs={fs}>Annuleren</Btn>
            <Btn variant="primary" onClick={maakNieuweKlant} kleur={kleur} fs={fs} disabled={!nkForm.naam}>Aanmaken & koppelen</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
// ── DECLARATIES & BOEKHOUDING ─────────────────────────────────
const DECLARATIE_CATEGORIEEN = [
  { id:"kantoor",      label:"Kantoorbenodigdheden", icon:"📎" },
  { id:"reiskosten",   label:"Reiskosten",            icon:"🚗" },
  { id:"software",     label:"Software/abonnementen", icon:"💻" },
  { id:"marketing",    label:"Marketing",              icon:"📢" },
  { id:"voorraad",     label:"Voorraad/inkoop",        icon:"📦" },
  { id:"huisvesting",  label:"Huisvesting",            icon:"🏢" },
  { id:"verzekering",  label:"Verzekeringen",          icon:"🛡" },
  { id:"overig",       label:"Overig",                 icon:"📄" },
];

function DeclaratiesPage({ kleur, fs, isDemoMode, T, isMobiel }) {
  const [tabblad, setTabblad] = useState("declaraties"); // declaraties | afschrijvingen
  const [declaraties, setDeclaraties] = useState([]);
  const [laden, setLaden] = useState(true);
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [filterCat, setFilterCat] = useState("alle");
  const [zoek, setZoek] = useState("");

  const leegForm = () => ({
    omschrijving:"", categorie:"overig", datum:new Date().toISOString().slice(0,10),
    leverancier:"", bedrag_excl_btw:"", btw_percentage:21, btw_aftrekbaar:true,
    betaalmethode:"bankoverschrijving", notitie:"",
    bijlage_naam:null, bijlage_type:null, bijlage_base64:null, bijlage_preview:null,
  });
  const [form, setForm] = useState(leegForm);
  const [bedragInvoerType, setBedragInvoerType] = useState("incl"); // incl | excl — wat de gebruiker invoert
  const [bedragInvoerWaarde, setBedragInvoerWaarde] = useState("");

  useEffect(() => { laad(); }, []);

  async function laad() {
    setLaden(true);
    try { if (!isDemoMode) { const data = await API.haalDeclaratiesOp(); setDeclaraties(data); } }
    catch(e) { console.error(e); }
    finally { setLaden(false); }
  }

  function openNieuw() { setForm(leegForm()); setBedragInvoerType("incl"); setBedragInvoerWaarde(""); setEditId(null); setModal(true); }

  function openEdit(d) {
    setForm({
      omschrijving:d.omschrijving, categorie:d.categorie, datum:d.datum,
      leverancier:d.leverancier||"", bedrag_excl_btw:d.bedrag_excl_btw, btw_percentage:d.btw_percentage,
      btw_aftrekbaar:!!d.btw_aftrekbaar, betaalmethode:d.betaalmethode||"bankoverschrijving",
      notitie:d.notitie||"", bijlage_naam:d.bijlage_naam, bijlage_type:d.bijlage_type,
      bijlage_base64:null, bijlage_preview:null,
    });
    // Bij bewerken: toon het bekende excl.-bedrag (we kennen niet meer wat oorspronkelijk is ingetypt)
    setBedragInvoerType("excl");
    setBedragInvoerWaarde(d.bedrag_excl_btw != null ? String(d.bedrag_excl_btw) : "");
    setEditId(d.id); setModal(true);
  }

  // Bereken bedrag_excl_btw automatisch op basis van wat de gebruiker invoert (excl. of incl. BTW)
  useEffect(() => {
    const waarde = parseFloat(bedragInvoerWaarde);
    if (isNaN(waarde)) { setForm(f => ({ ...f, bedrag_excl_btw: "" })); return; }
    const excl = bedragInvoerType === "incl"
      ? waarde / (1 + (form.btw_percentage||0) / 100)
      : waarde;
    setForm(f => ({ ...f, bedrag_excl_btw: Math.round(excl * 100) / 100 }));
  }, [bedragInvoerWaarde, bedragInvoerType, form.btw_percentage]);

  function handleBestand(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) { alert("Bestand is te groot (max 8MB)."); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      setForm(f => ({ ...f, bijlage_naam:file.name, bijlage_type:file.type, bijlage_base64:base64, bijlage_preview: file.type.startsWith("image/") ? reader.result : null }));
    };
    reader.readAsDataURL(file);
  }

  async function slaOp() {
    if (!form.omschrijving) { alert("Vul een omschrijving in."); return; }
    try {
      if (editId) await API.updateDeclaratie(editId, form);
      else await API.maakDeclaratieAan(form);
      await laad();
      setModal(false);
    } catch(e) { alert("Opslaan mislukt: " + e.message); }
  }

  async function verwijder(id) {
    if (!confirm("Declaratie verwijderen?")) return;
    try { await API.verwijderDeclaratie(id); await laad(); setDetail(null); }
    catch(e) { alert("Verwijderen mislukt: " + e.message); }
  }

  const gefilterd = declaraties
    .filter(d => filterCat==="alle" || d.categorie===filterCat)
    .filter(d => !zoek || d.omschrijving.toLowerCase().includes(zoek.toLowerCase())
               || (d.leverancier||"").toLowerCase().includes(zoek.toLowerCase()));

  const fmt = n => "€" + parseFloat(n||0).toLocaleString("nl-NL",{minimumFractionDigits:2});
  const totaalExcl = gefilterd.reduce((s,d)=>s+(parseFloat(d.bedrag_excl_btw)||0),0);
  const totaalIncl = gefilterd.reduce((s,d)=>s+(parseFloat(d.bedrag_incl_btw)||0),0);
  const totaalBtw  = totaalIncl - totaalExcl;

  const catInfo = (id) => DECLARATIE_CATEGORIEEN.find(c=>c.id===id) || DECLARATIE_CATEGORIEEN[7];

  return (
    <div>
    <div style={{ marginBottom:"1rem", display:"flex", gap:4 }}>
      {[
        { id:"declaraties",   label:"🧮 Declaraties & kosten" },
        { id:"afschrijvingen", label:"🏗 Bedrijfsmiddelen & afschrijvingen" },
      ].map(t => (
        <button key={t.id} onClick={()=>setTabblad(t.id)}
          style={{ padding:"8px 16px", borderRadius:8, border:"none", cursor:"pointer", fontSize:fs,
            background: tabblad===t.id ? kleur.hoofd : "var(--color-background-secondary)",
            color: tabblad===t.id ? "#fff" : "var(--color-text-secondary)",
            fontWeight: tabblad===t.id ? 600 : 400 }}>
          {t.label}
        </button>
      ))}
    </div>
    {tabblad==="declaraties" && (
      <div style={{ display:"flex", flexDirection: isMobiel ? "column" : "row", gap:16, height: isMobiel ? "auto" : "calc(100vh - 160px)" }}>

      <div style={{ width: isMobiel ? "100%" : 380, flexShrink:0, display:"flex", flexDirection:"column", gap:8 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6 }}>
          <div style={{ background:"var(--color-background-secondary)", borderRadius:8, padding:"8px 10px", textAlign:"center" }}>
            <p style={{ margin:0, fontSize:fs-3, color:"var(--color-text-secondary)" }}>Excl. BTW</p>
            <p style={{ margin:0, fontSize:fs-1, fontWeight:700 }}>{fmt(totaalExcl)}</p>
          </div>
          <div style={{ background:"#fcebeb", borderRadius:8, padding:"8px 10px", textAlign:"center" }}>
            <p style={{ margin:0, fontSize:fs-3, color:"#a32d2d" }}>BTW</p>
            <p style={{ margin:0, fontSize:fs-1, fontWeight:700, color:"#a32d2d" }}>{fmt(totaalBtw)}</p>
          </div>
          <div style={{ background:kleur.licht, borderRadius:8, padding:"8px 10px", textAlign:"center" }}>
            <p style={{ margin:0, fontSize:fs-3, color:kleur.donker }}>Totaal</p>
            <p style={{ margin:0, fontSize:fs-1, fontWeight:700, color:kleur.donker }}>{fmt(totaalIncl)}</p>
          </div>
        </div>

        <input value={zoek} onChange={e=>setZoek(e.target.value)} placeholder="Zoek op omschrijving of leverancier…" style={iSt(fs)} />
        <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
          <button onClick={()=>setFilterCat("alle")}
            style={{ padding:"4px 10px", borderRadius:99, border:"none", cursor:"pointer", fontSize:fs-3,
              background: filterCat==="alle" ? kleur.hoofd : "var(--color-background-secondary)",
              color: filterCat==="alle" ? "#fff" : "var(--color-text-secondary)" }}>
            Alle ({declaraties.length})
          </button>
          {DECLARATIE_CATEGORIEEN.map(c=>(
            <button key={c.id} onClick={()=>setFilterCat(c.id)}
              style={{ padding:"4px 10px", borderRadius:99, border:"none", cursor:"pointer", fontSize:fs-3,
                background: filterCat===c.id ? kleur.hoofd : "var(--color-background-secondary)",
                color: filterCat===c.id ? "#fff" : "var(--color-text-secondary)" }}>
              {c.icon} {declaraties.filter(d=>d.categorie===c.id).length}
            </button>
          ))}
        </div>

        <Btn variant="primary" onClick={openNieuw} kleur={kleur} fs={fs}>+ Nieuwe declaratie</Btn>

        <div style={{ overflowY:"auto", flex: isMobiel ? "none" : 1, maxHeight: isMobiel ? "40vh" : "none", display:"flex", flexDirection:"column", gap:6 }}>
          {laden && <p style={{ color:"var(--color-text-secondary)", fontSize:fs-1 }}>Laden…</p>}
          {!laden && gefilterd.length===0 && <p style={{ color:"var(--color-text-secondary)", fontSize:fs-1 }}>Geen declaraties gevonden.</p>}
          {gefilterd.map(d=>{
            const cat = catInfo(d.categorie);
            return (
              <div key={d.id} onClick={()=>setDetail(d)}
                style={{ background:"var(--color-background-primary)",
                  border:`1px solid ${detail?.id===d.id ? kleur.hoofd : "var(--color-border-tertiary)"}`,
                  borderRadius:10, padding:"10px 12px", cursor:"pointer" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:fs-1, fontWeight:500 }}>{cat.icon} {d.omschrijving}</span>
                  <span style={{ fontSize:fs-1, fontWeight:700, color:kleur.hoofd }}>{fmt(d.bedrag_incl_btw)}</span>
                </div>
                <p style={{ margin:"2px 0 0", fontSize:fs-2, color:"var(--color-text-secondary)" }}>
                  {d.datum} {d.leverancier ? `· ${d.leverancier}` : ""} {d.heeft_bijlage ? "· 📎" : ""}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ flex:1, background:"var(--color-background-primary)",
        border:"0.5px solid var(--color-border-tertiary)", borderRadius:16, padding:"1.5rem", overflowY:"auto" }}>
        {!detail ? (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
            height:"100%", color:"var(--color-text-secondary)", fontSize:fs }}>
            Selecteer een declaratie om details te zien
          </div>
        ) : (<>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1.5rem", flexWrap:"wrap", gap:8 }}>
            <div>
              <h2 style={{ margin:0, fontSize:fs+4 }}>{catInfo(detail.categorie).icon} {detail.omschrijving}</h2>
              <p style={{ margin:"4px 0 0", fontSize:fs-1, color:"var(--color-text-secondary)" }}>
                {catInfo(detail.categorie).label} · {detail.datum}
              </p>
            </div>
            <div style={{ display:"flex", gap:6 }}>
              <button onClick={()=>openEdit(detail)}
                style={{ padding:"7px 12px", borderRadius:8, background:kleur.licht,
                  border:`1px solid ${kleur.hoofd}`, color:kleur.donker, cursor:"pointer", fontSize:fs-1 }}>
                ✎ Bewerken
              </button>
              <button onClick={()=>verwijder(detail.id)}
                style={{ padding:"7px 12px", borderRadius:8, background:"#fcebeb",
                  border:"none", color:"#a32d2d", cursor:"pointer", fontSize:fs-1 }}>
                ✕ Verwijderen
              </button>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:"1.5rem" }}>
            <div>
              <p style={{ margin:"0 0 4px", fontSize:fs-2, fontWeight:600, color:"var(--color-text-secondary)" }}>LEVERANCIER</p>
              <p style={{ margin:0, fontSize:fs }}>{detail.leverancier||"—"}</p>
            </div>
            <div>
              <p style={{ margin:"0 0 4px", fontSize:fs-2, fontWeight:600, color:"var(--color-text-secondary)" }}>BETAALMETHODE</p>
              <p style={{ margin:0, fontSize:fs }}>{detail.betaalmethode||"—"}</p>
            </div>
            <div>
              <p style={{ margin:"0 0 4px", fontSize:fs-2, fontWeight:600, color:"var(--color-text-secondary)" }}>BEDRAG EXCL. BTW</p>
              <p style={{ margin:0, fontSize:fs }}>{fmt(detail.bedrag_excl_btw)}</p>
            </div>
            <div>
              <p style={{ margin:"0 0 4px", fontSize:fs-2, fontWeight:600, color:"var(--color-text-secondary)" }}>BTW ({detail.btw_percentage}%)</p>
              <p style={{ margin:0, fontSize:fs }}>{fmt(detail.bedrag_incl_btw - detail.bedrag_excl_btw)} {detail.btw_aftrekbaar ? "(aftrekbaar)" : "(niet aftrekbaar)"}</p>
            </div>
          </div>

          <div style={{ background:kleur.licht, borderRadius:10, padding:"14px", marginBottom:"1.5rem",
            display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:fs, fontWeight:600, color:kleur.donker }}>Totaal incl. BTW</span>
            <span style={{ fontSize:fs+4, fontWeight:700, color:kleur.donker }}>{fmt(detail.bedrag_incl_btw)}</span>
          </div>

          {detail.notitie && (
            <div style={{ marginBottom:"1.5rem" }}>
              <p style={{ margin:"0 0 4px", fontSize:fs-2, fontWeight:600, color:"var(--color-text-secondary)" }}>NOTITIE</p>
              <p style={{ margin:0, fontSize:fs, whiteSpace:"pre-wrap", background:"var(--color-background-secondary)", padding:"10px", borderRadius:8 }}>{detail.notitie}</p>
            </div>
          )}

          {detail.heeft_bijlage && (
            <div>
              <p style={{ margin:"0 0 8px", fontSize:fs-2, fontWeight:600, color:"var(--color-text-secondary)" }}>BIJLAGE</p>
              {(detail.bijlage_type||"").startsWith("image/") ? (
                <img src={API.declaratieBijlageUrl(detail.id)} alt="Bijlage"
                  style={{ maxWidth:"100%", maxHeight:400, borderRadius:8, border:"1px solid var(--color-border-tertiary)" }} />
              ) : (
                <a href={API.declaratieBijlageUrl(detail.id)} target="_blank" rel="noreferrer"
                  style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"10px 16px",
                    borderRadius:8, background:"var(--color-background-secondary)",
                    color:kleur.hoofd, textDecoration:"none", fontSize:fs-1, fontWeight:500 }}>
                  📄 {detail.bijlage_naam || "Bijlage openen"}
                </a>
              )}
            </div>
          )}
        </>)}
      </div>

      {modal && (
        <Modal title={editId?"Declaratie bewerken":"Nieuwe declaratie"} onClose={()=>setModal(false)} fs={fs}>
          <FF label="Omschrijving" fs={fs}>
            <input value={form.omschrijving} onChange={e=>setForm(f=>({...f,omschrijving:e.target.value}))}
              placeholder="Bijv. Kantoorartikelen Action" style={iSt(fs)} />
          </FF>

          <FF label="Categorie" fs={fs}>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {DECLARATIE_CATEGORIEEN.map(c=>(
                <button key={c.id} onClick={()=>setForm(f=>({...f,categorie:c.id}))}
                  style={{ padding:"6px 12px", borderRadius:99, cursor:"pointer", fontSize:fs-2, border:"none",
                    background: form.categorie===c.id ? kleur.hoofd : "var(--color-background-secondary)",
                    color: form.categorie===c.id ? "#fff" : "var(--color-text-secondary)" }}>
                  {c.icon} {c.label}
                </button>
              ))}
            </div>
          </FF>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            <FF label="Datum" fs={fs}>
              <input type="date" value={form.datum} onChange={e=>setForm(f=>({...f,datum:e.target.value}))} style={iSt(fs)} />
            </FF>
            <FF label={`${T?.leverancier||"Leverancier"} (optioneel)`} fs={fs}>
              <input value={form.leverancier} onChange={e=>setForm(f=>({...f,leverancier:e.target.value}))} style={iSt(fs)} />
            </FF>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            <FF label={
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%" }}>
                <span>Bedrag</span>
                <div style={{ display:"flex", borderRadius:6, overflow:"hidden", border:`1px solid ${kleur.hoofd}` }}>
                  <button type="button" onClick={()=>setBedragInvoerType("incl")}
                    style={{ padding:"2px 8px", border:"none", cursor:"pointer", fontSize:fs-3,
                      background: bedragInvoerType==="incl" ? kleur.hoofd : "var(--color-background-primary)",
                      color: bedragInvoerType==="incl" ? "#fff" : "var(--color-text-secondary)" }}>
                    incl. BTW
                  </button>
                  <button type="button" onClick={()=>setBedragInvoerType("excl")}
                    style={{ padding:"2px 8px", border:"none", cursor:"pointer", fontSize:fs-3,
                      background: bedragInvoerType==="excl" ? kleur.hoofd : "var(--color-background-primary)",
                      color: bedragInvoerType==="excl" ? "#fff" : "var(--color-text-secondary)" }}>
                    excl. BTW
                  </button>
                </div>
              </div>
            } fs={fs}>
              <input type="number" step="0.01" value={bedragInvoerWaarde}
                onChange={e=>setBedragInvoerWaarde(e.target.value)}
                placeholder="0.00" style={iSt(fs)} />
            </FF>
            <FF label="BTW-percentage" fs={fs}>
              <div style={{ display:"flex", gap:6 }}>
                {[0,9,21].map(p=>(
                  <button key={p} onClick={()=>setForm(f=>({...f,btw_percentage:p}))}
                    style={{ flex:1, padding:"8px", borderRadius:8, cursor:"pointer", fontSize:fs-1,
                      border:`1.5px solid ${form.btw_percentage===p?kleur.hoofd:"var(--color-border-secondary)"}`,
                      background: form.btw_percentage===p ? kleur.hoofd : "var(--color-background-primary)",
                      color: form.btw_percentage===p ? "#fff" : "var(--color-text-secondary)" }}>
                    {p}%
                  </button>
                ))}
              </div>
            </FF>
          </div>

          {bedragInvoerWaarde && (
            <p style={{ fontSize:fs-1, color:"var(--color-text-secondary)", margin:"-8px 0 12px" }}>
              {bedragInvoerType==="incl" ? (
                <>Bedrag excl. BTW: <strong>€{parseFloat(form.bedrag_excl_btw||0).toLocaleString("nl-NL",{minimumFractionDigits:2})}</strong></>
              ) : (
                <>Totaal incl. BTW: <strong>€{(parseFloat(form.bedrag_excl_btw||0)*(1+form.btw_percentage/100)).toLocaleString("nl-NL",{minimumFractionDigits:2})}</strong></>
              )}
            </p>
          )}

          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"8px 10px", borderRadius:8, background:"var(--color-background-secondary)", marginBottom:12 }}>
            <span style={{ fontSize:fs-1 }}>BTW aftrekbaar</span>
            <div onClick={()=>setForm(f=>({...f,btw_aftrekbaar:!f.btw_aftrekbaar}))}
              style={{ width:36,height:20,borderRadius:99,cursor:"pointer",
                background:form.btw_aftrekbaar?kleur.hoofd:"#ccc",position:"relative",transition:"background 0.2s" }}>
              <div style={{ position:"absolute",top:2,left:form.btw_aftrekbaar?18:2,width:16,height:16,
                borderRadius:"50%",background:"#fff",transition:"left 0.2s" }} />
            </div>
          </div>

          <FF label="Betaalmethode" fs={fs}>
            <div style={{ display:"flex", gap:6 }}>
              {[{id:"bankoverschrijving",l:"🏦 Bank"},{id:"contant",l:"💵 Contant"},{id:"creditcard",l:"💳 Kaart"}].map(m=>(
                <button key={m.id} onClick={()=>setForm(f=>({...f,betaalmethode:m.id}))}
                  style={{ flex:1, padding:"6px", borderRadius:8, cursor:"pointer", fontSize:fs-2,
                    border:`1.5px solid ${form.betaalmethode===m.id?kleur.hoofd:"var(--color-border-secondary)"}`,
                    background: form.betaalmethode===m.id ? kleur.hoofd : "var(--color-background-primary)",
                    color: form.betaalmethode===m.id ? "#fff" : "var(--color-text-secondary)" }}>
                  {m.l}
                </button>
              ))}
            </div>
          </FF>

          <FF label={`${T?.bonnetjeUpload||"Bonnetje / factuur"} (PDF/foto)`} fs={fs}>
            <input type="file" accept="image/*,application/pdf" onChange={handleBestand}
              style={{ fontSize:fs-1 }} />
            {form.bijlage_preview && (
              <img src={form.bijlage_preview} alt="Voorbeeld" style={{ maxWidth:120, marginTop:8, borderRadius:6 }} />
            )}
            {form.bijlage_naam && !form.bijlage_preview && (
              <p style={{ fontSize:fs-2, color:"var(--color-text-secondary)", marginTop:4 }}>📎 {form.bijlage_naam}</p>
            )}
          </FF>

          <FF label="Notitie (optioneel)" fs={fs}>
            <textarea value={form.notitie} onChange={e=>setForm(f=>({...f,notitie:e.target.value}))}
              rows={2} style={{...iSt(fs),resize:"vertical"}} />
          </FF>

          <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:"1rem" }}>
            <Btn onClick={()=>setModal(false)} fs={fs}>Annuleren</Btn>
            <Btn variant="primary" onClick={slaOp} kleur={kleur} fs={fs}>💾 Opslaan</Btn>
          </div>
        </Modal>
      )}
      </div>
    )}
    {tabblad==="afschrijvingen" && (
      <AfschrijvingenTab kleur={kleur} fs={fs} isDemoMode={isDemoMode} T={T} isMobiel={isMobiel} />
    )}
    </div>
  );
}


function AfschrijvingenTab({ kleur, fs, isDemoMode, T, isMobiel }) {
  const [items, setItems] = useState([]);
  const [laden, setLaden] = useState(true);
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [detail, setDetail] = useState(null);

  const CATEGORIEEN = [
    { id:"computer", label:"Computer/laptop" },
    { id:"auto", label:"Voertuig" },
    { id:"machine", label:"Machine/apparatuur" },
    { id:"inventaris", label:"Inventaris/meubilair" },
    { id:"software", label:"Software" },
    { id:"overig", label:"Overig" },
  ];

  const leegForm = () => ({ naam:"", categorie:"computer", aankoopdatum:new Date().toISOString().slice(0,10), aanschafprijs:"", restwaarde:"0", looptijd_jaren:"5", notitie:"" });
  const [form, setForm] = useState(leegForm);

  useEffect(() => { laad(); }, []);

  async function laad() {
    setLaden(true);
    try { if (!isDemoMode) { setItems(await API.haalAfschrijvingenOp()); } }
    catch(e) { console.error(e); }
    finally { setLaden(false); }
  }

  function openNieuw() { setForm(leegForm()); setEditId(null); setModal(true); }
  function openEdit(item) {
    setForm({ naam:item.naam, categorie:item.categorie, aankoopdatum:item.aankoopdatum,
      aanschafprijs:item.aanschafprijs, restwaarde:item.restwaarde,
      looptijd_jaren:item.looptijd_jaren, notitie:item.notitie||"" });
    setEditId(item.id); setModal(true);
  }

  async function slaOp() {
    if (!form.naam || !form.aanschafprijs || !form.looptijd_jaren) { alert("Vul naam, aanschafprijs en looptijd in."); return; }
    try {
      if (editId) await API.updateAfschrijving(editId, form);
      else await API.maakAfschrijvingAan(form);
      await laad(); setModal(false);
    } catch(e) { alert("Opslaan mislukt: "+e.message); }
  }

  async function verwijder(id) {
    if (!confirm("Bedrijfsmiddel verwijderen?")) return;
    try { await API.verwijderAfschrijving(id); await laad(); setDetail(null); }
    catch(e) { alert("Verwijderen mislukt: "+e.message); }
  }

  const fmt = n => "€"+parseFloat(n||0).toLocaleString("nl-NL",{minimumFractionDigits:2});

  // Bereken afschrijving voor een item
  function berekenAfschrijving(item) {
    const aanschaf = new Date(item.aankoopdatum);
    const einddatum = new Date(aanschaf);
    einddatum.setFullYear(einddatum.getFullYear() + parseInt(item.looptijd_jaren));
    const afschrPerJaar = (parseFloat(item.aanschafprijs) - parseFloat(item.restwaarde)) / parseInt(item.looptijd_jaren);
    const nu = new Date();
    const verlopenJaren = Math.min(parseInt(item.looptijd_jaren), Math.max(0, (nu - aanschaf) / (1000*60*60*24*365.25)));
    const totaalAfgeschreven = Math.min(parseFloat(item.aanschafprijs) - parseFloat(item.restwaarde), afschrPerJaar * verlopenJaren);
    const boekwaarde = parseFloat(item.aanschafprijs) - totaalAfgeschreven;
    const isActief = nu < einddatum;
    return { afschrPerJaar, totaalAfgeschreven, boekwaarde, einddatum, isActief, verlopenJaren };
  }

  return (
    <div style={{ display:"flex", flexDirection: isMobiel ? "column" : "row", gap:16, height: isMobiel ? "auto" : "calc(100vh - 220px)" }}>
      {/* Lijst */}
      <div style={{ width: isMobiel ? "100%" : 340, flexShrink:0, display:"flex", flexDirection:"column", gap:8,
        maxHeight: isMobiel ? "45vh" : "none" }}>
        <Btn variant="primary" onClick={openNieuw} kleur={kleur} fs={fs}>+ Nieuw bedrijfsmiddel</Btn>
        <div style={{ overflowY:"auto", flex:1, display:"flex", flexDirection:"column", gap:6 }}>
          {laden && <p style={{ color:"var(--color-text-secondary)", fontSize:fs-1 }}>Laden…</p>}
          {!laden && items.length===0 && <p style={{ color:"var(--color-text-secondary)", fontSize:fs-1 }}>Nog geen bedrijfsmiddelen ingevoerd.</p>}
          {items.map(item => {
            const { afschrPerJaar, boekwaarde, isActief } = berekenAfschrijving(item);
            return (
              <div key={item.id} onClick={()=>setDetail(item)}
                style={{ background:"var(--color-background-primary)",
                  border:`1px solid ${detail?.id===item.id ? kleur.hoofd : "var(--color-border-tertiary)"}`,
                  borderRadius:10, padding:"10px 12px", cursor:"pointer" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:fs-1, fontWeight:500 }}>{item.naam}</span>
                  <span style={{ fontSize:fs-3, padding:"2px 8px", borderRadius:99,
                    background: isActief ? "#e8f0fb" : "#f0f0f0",
                    color: isActief ? "#185FA5" : "#888" }}>
                    {isActief ? "Actief" : "Afgeschreven"}
                  </span>
                </div>
                <p style={{ margin:"2px 0 0", fontSize:fs-2, color:"var(--color-text-secondary)" }}>
                  {fmt(item.aanschafprijs)} · {item.looptijd_jaren}jr · {fmt(afschrPerJaar)}/jr
                </p>
                <p style={{ margin:"2px 0 0", fontSize:fs-2, color:kleur.hoofd }}>
                  Boekwaarde: {fmt(boekwaarde)}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail */}
      <div style={{ flex:1, background:"var(--color-background-primary)",
        border:"0.5px solid var(--color-border-tertiary)", borderRadius:16, padding:"1.5rem", overflowY:"auto" }}>
        {!detail ? (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
            height:"100%", color:"var(--color-text-secondary)", fontSize:fs }}>
            Selecteer een bedrijfsmiddel om details te zien
          </div>
        ) : (() => {
          const { afschrPerJaar, totaalAfgeschreven, boekwaarde, einddatum, isActief, verlopenJaren } = berekenAfschrijving(detail);
          const jaarlijksBar = Math.min(100, (verlopenJaren / parseInt(detail.looptijd_jaren)) * 100);
          return (
            <>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1.5rem", flexWrap:"wrap", gap:8 }}>
                <div>
                  <h2 style={{ margin:0, fontSize:fs+4 }}>{detail.naam}</h2>
                  <p style={{ margin:"4px 0 0", fontSize:fs-1, color:"var(--color-text-secondary)" }}>
                    {CATEGORIEEN.find(c=>c.id===detail.categorie)?.label || detail.categorie} · Aangeschaft {detail.aankoopdatum}
                  </p>
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  <button onClick={()=>openEdit(detail)}
                    style={{ padding:"7px 12px", borderRadius:8, background:kleur.licht,
                      border:`1px solid ${kleur.hoofd}`, color:kleur.donker, cursor:"pointer", fontSize:fs-1 }}>✎ Bewerken</button>
                  <button onClick={()=>verwijder(detail.id)}
                    style={{ padding:"7px 12px", borderRadius:8, background:"#fcebeb",
                      border:"none", color:"#a32d2d", cursor:"pointer", fontSize:fs-1 }}>✕ Verwijderen</button>
                </div>
              </div>

              {/* Voortgangsbalk */}
              <div style={{ marginBottom:"1.5rem" }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:fs-2, color:"var(--color-text-secondary)", marginBottom:4 }}>
                  <span>Afschrijvingsvoortgang</span>
                  <span>{Math.round(jaarlijksBar)}% ({Math.round(verlopenJaren*10)/10} van {detail.looptijd_jaren} jaar)</span>
                </div>
                <div style={{ height:10, background:"var(--color-background-secondary)", borderRadius:99 }}>
                  <div style={{ height:"100%", width:`${jaarlijksBar}%`, background: isActief ? kleur.hoofd : "#888", borderRadius:99, transition:"width 0.3s" }} />
                </div>
              </div>

              {/* Bedragen grid */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:"1.5rem" }}>
                {[
                  { label:"Aanschafprijs", waarde:fmt(detail.aanschafprijs) },
                  { label:"Restwaarde", waarde:fmt(detail.restwaarde) },
                  { label:"Afschr. per jaar", waarde:fmt(afschrPerJaar) },
                  { label:"Totaal afgeschreven", waarde:fmt(totaalAfgeschreven) },
                  { label:T?.boekwaarde||"Huidige boekwaarde", waarde:fmt(boekwaarde), accent:true },
                  { label:"Einddatum", waarde:einddatum.toLocaleDateString("nl-NL") },
                ].map(item => (
                  <div key={item.label} style={{ background: item.accent ? kleur.licht : "var(--color-background-secondary)",
                    borderRadius:8, padding:"10px 12px" }}>
                    <p style={{ margin:"0 0 4px", fontSize:fs-3, color: item.accent ? kleur.donker : "var(--color-text-secondary)", fontWeight:600 }}>{item.label}</p>
                    <p style={{ margin:0, fontSize:fs, fontWeight: item.accent ? 700 : 400, color: item.accent ? kleur.donker : "var(--color-text-primary)" }}>{item.waarde}</p>
                  </div>
                ))}
              </div>

              {/* Jaarlijks overzicht */}
              <p style={{ margin:"0 0 8px", fontSize:fs-1, fontWeight:600, color:"var(--color-text-secondary)" }}>AFSCHRIJVING PER JAAR</p>
              <table style={{ width:"100%", borderCollapse:"collapse", marginBottom:"1rem" }}>
                <thead><tr style={{ background:"var(--color-background-secondary)" }}>
                  <th style={{ padding:"6px 10px", textAlign:"left", fontSize:fs-2 }}>Jaar</th>
                  <th style={{ padding:"6px 10px", textAlign:"right", fontSize:fs-2 }}>Afschrijving</th>
                  <th style={{ padding:"6px 10px", textAlign:"right", fontSize:fs-2 }}>Boekwaarde eind jaar</th>
                </tr></thead>
                <tbody>
                  {Array.from({length: parseInt(detail.looptijd_jaren)}, (_,i) => {
                    const jaar = new Date(detail.aankoopdatum).getFullYear() + i;
                    const bw = parseFloat(detail.aanschafprijs) - afschrPerJaar * (i+1);
                    const nuJaar = new Date().getFullYear();
                    const isHuidig = jaar === nuJaar;
                    return (
                      <tr key={jaar} style={{ borderBottom:"0.5px solid var(--color-border-tertiary)",
                        background: isHuidig ? kleur.licht+"44" : "transparent" }}>
                        <td style={{ padding:"6px 10px", fontSize:fs-1, fontWeight: isHuidig ? 600 : 400 }}>
                          {jaar} {isHuidig && <span style={{ fontSize:fs-3, color:kleur.donker }}>← huidig jaar</span>}
                        </td>
                        <td style={{ padding:"6px 10px", textAlign:"right", fontSize:fs-1 }}>{fmt(afschrPerJaar)}</td>
                        <td style={{ padding:"6px 10px", textAlign:"right", fontSize:fs-1 }}>{fmt(Math.max(parseFloat(detail.restwaarde), bw))}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {detail.notitie && (
                <div>
                  <p style={{ margin:"0 0 4px", fontSize:fs-2, fontWeight:600, color:"var(--color-text-secondary)" }}>NOTITIE</p>
                  <p style={{ margin:0, fontSize:fs, whiteSpace:"pre-wrap", background:"var(--color-background-secondary)", padding:"10px", borderRadius:8 }}>{detail.notitie}</p>
                </div>
              )}
            </>
          );
        })()}
      </div>

      {/* Modal */}
      {modal && (
        <Modal title={editId ? "Bedrijfsmiddel bewerken" : "Nieuw bedrijfsmiddel"} onClose={()=>setModal(false)} fs={fs}>
          <FF label="Naam" fs={fs}><input value={form.naam} onChange={e=>setForm(f=>({...f,naam:e.target.value}))} placeholder="Bijv. Laptop Dell, Auto, Printer" style={iSt(fs)} /></FF>
          <FF label="Categorie" fs={fs}>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {CATEGORIEEN.map(c=>(
                <button key={c.id} onClick={()=>setForm(f=>({...f,categorie:c.id}))}
                  style={{ padding:"5px 12px", borderRadius:99, cursor:"pointer", fontSize:fs-2, border:"none",
                    background: form.categorie===c.id ? kleur.hoofd : "var(--color-background-secondary)",
                    color: form.categorie===c.id ? "#fff" : "var(--color-text-secondary)" }}>
                  {c.label}
                </button>
              ))}
            </div>
          </FF>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            <FF label="Aankoopdatum" fs={fs}><input type="date" value={form.aankoopdatum} onChange={e=>setForm(f=>({...f,aankoopdatum:e.target.value}))} style={iSt(fs)} /></FF>
            <FF label="Looptijd (jaren)" fs={fs}>
              <div style={{ display:"flex", gap:4 }}>
                {[3,4,5,10,20].map(j=>(
                  <button key={j} onClick={()=>setForm(f=>({...f,looptijd_jaren:j}))}
                    style={{ flex:1, padding:"7px", borderRadius:8, cursor:"pointer", fontSize:fs-2, border:`1.5px solid ${parseInt(form.looptijd_jaren)===j?kleur.hoofd:"var(--color-border-secondary)"}`,
                      background: parseInt(form.looptijd_jaren)===j ? kleur.hoofd : "var(--color-background-primary)",
                      color: parseInt(form.looptijd_jaren)===j ? "#fff" : "var(--color-text-secondary)" }}>
                    {j}jr
                  </button>
                ))}
                <input type="number" value={form.looptijd_jaren} onChange={e=>setForm(f=>({...f,looptijd_jaren:e.target.value}))} min="1" max="50" style={{ ...iSt(fs-1), width:48 }} />
              </div>
            </FF>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            <FF label={`${T?.aanschafprijs||"Aanschafprijs"} (incl. btw)`} fs={fs}><input type="number" step="0.01" value={form.aanschafprijs} onChange={e=>setForm(f=>({...f,aanschafprijs:e.target.value}))} placeholder="0.00" style={iSt(fs)} /></FF>
            <FF label={`${T?.restwaarde||"Restwaarde"} na afschrijving`} fs={fs}><input type="number" step="0.01" value={form.restwaarde} onChange={e=>setForm(f=>({...f,restwaarde:e.target.value}))} placeholder="0.00" style={iSt(fs)} /></FF>
          </div>
          {form.aanschafprijs && form.looptijd_jaren && (
            <p style={{ fontSize:fs-1, color:"var(--color-text-secondary)", margin:"-6px 0 12px", padding:"8px 12px", background:"var(--color-background-secondary)", borderRadius:8 }}>
              Jaarlijkse afschrijving: <strong>{fmt((parseFloat(form.aanschafprijs||0) - parseFloat(form.restwaarde||0)) / parseInt(form.looptijd_jaren||1))}</strong> per jaar
            </p>
          )}
          <FF label="Notitie (optioneel)" fs={fs}><textarea value={form.notitie} onChange={e=>setForm(f=>({...f,notitie:e.target.value}))} rows={2} style={{...iSt(fs),resize:"vertical"}} /></FF>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:"1rem" }}>
            <Btn onClick={()=>setModal(false)} fs={fs}>Annuleren</Btn>
            <Btn variant="primary" onClick={slaOp} kleur={kleur} fs={fs}>💾 Opslaan</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

function ContactPage({ huidigUser, kleur, fs, T }) {
  const [form, setForm] = useState({
    naam: huidigUser?.naam || "",
    email: huidigUser?.email || huidigUser?.username || "",
    onderwerp: "",
    bericht: "",
    type: "vraag",
  });
  const [bezig, setBezig] = useState(false);
  const [melding, setMelding] = useState(null);

  async function verstuur() {
    if (!form.naam || !form.email || !form.onderwerp || !form.bericht) {
      setMelding({ type:"fout", tekst:"Vul alle verplichte velden in." });
      return;
    }
    setBezig(true); setMelding(null);
    try {
      await API.stuurSupportBericht(form);
      setMelding({ type:"ok", tekst:"Je bericht is verstuurd! We nemen zo snel mogelijk contact op." });
      setForm(f => ({ ...f, onderwerp:"", bericht:"", type:"vraag" }));
    } catch(e) {
      setMelding({ type:"fout", tekst:"Versturen mislukt: " + e.message });
    } finally { setBezig(false); }
  }

  return (
    <div style={{ maxWidth:680 }}>
      <div style={{ background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)",
        borderRadius:16, padding:"2rem", marginBottom:"1.5rem" }}>
        <p style={{ margin:"0 0 1.5rem", fontSize:fs, color:"var(--color-text-secondary)", lineHeight:1.7 }}>
          Heb je een vraag, mis je een functionaliteit of zie je ergens een foutje?<br/>
          Vul dan onderstaand formulier in.
        </p>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
          <FF label="Naam" fs={fs}>
            <input value={form.naam} onChange={e=>setForm(f=>({...f,naam:e.target.value}))}
              style={iSt(fs)} />
          </FF>
          <FF label="E-mailadres" fs={fs}>
            <input type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}
              style={iSt(fs)} />
          </FF>
        </div>

        <FF label="Type bericht" fs={fs}>
          <div style={{ display:"flex", gap:8 }}>
            {[
              { id:"vraag", label:"❓ Vraag" },
              { id:"functionaliteit", label:"💡 Functionaliteit" },
              { id:"fout", label:"🐛 Foutmelding" },
            ].map(t => (
              <button key={t.id} onClick={()=>setForm(f=>({...f,type:t.id}))}
                style={{ flex:1, padding:"8px", borderRadius:8, cursor:"pointer", fontSize:fs-1,
                  border:`1.5px solid ${form.type===t.id ? kleur.hoofd : "var(--color-border-secondary)"}`,
                  background: form.type===t.id ? kleur.licht : "var(--color-background-primary)",
                  color: form.type===t.id ? kleur.donker : "var(--color-text-secondary)",
                  fontWeight: form.type===t.id ? 500 : 400 }}>
                {t.label}
              </button>
            ))}
          </div>
        </FF>

        <FF label="Onderwerp" fs={fs}>
          <input value={form.onderwerp} onChange={e=>setForm(f=>({...f,onderwerp:e.target.value}))}
            placeholder="Korte omschrijving" style={iSt(fs)} />
        </FF>

        <FF label="Bericht" fs={fs}>
          <textarea value={form.bericht} onChange={e=>setForm(f=>({...f,bericht:e.target.value}))}
            rows={6} placeholder="Beschrijf je vraag of probleem zo duidelijk mogelijk…"
            style={{...iSt(fs), resize:"vertical"}} />
        </FF>

        {melding && (
          <p style={{ padding:"10px 14px", borderRadius:8, fontSize:fs-1, margin:"0.5rem 0",
            background: melding.type==="ok" ? "#eaf3de" : "#fcebeb",
            color: melding.type==="ok" ? "#27500a" : "#a32d2d" }}>
            {melding.tekst}
          </p>
        )}

        <div style={{ display:"flex", justifyContent:"flex-end", marginTop:"1rem" }}>
          <Btn variant="primary" onClick={verstuur} kleur={kleur} fs={fs} disabled={bezig}>
            {bezig ? "Versturen…" : "✉ Verstuur bericht"}
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ── SUPPORT INBOX (admin only) ────────────────────────────────
function SupportInboxPage({ kleur, fs }) {
  const [berichten, setBerichten] = useState([]);
  const [laden, setLaden] = useState(true);
  const [filter, setFilter] = useState("alle");
  const [open, setOpen] = useState(null);

  useEffect(() => { laadBerichten(); }, []);

  async function laadBerichten() {
    setLaden(true);
    try {
      const data = await API.haalSupportBerichtenOp();
      setBerichten(data);
    } catch(e) { console.error(e); }
    finally { setLaden(false); }
  }

  async function updateStatus(id, status) {
    await API.updateSupportStatus(id, status);
    setBerichten(prev => prev.map(b => b.id===id ? {...b, status} : b));
    if (open?.id === id) setOpen(prev => ({...prev, status}));
  }

  async function verwijder(id) {
    if (!confirm("Bericht verwijderen?")) return;
    await API.verwijderSupportBericht(id);
    setBerichten(prev => prev.filter(b => b.id!==id));
    if (open?.id === id) setOpen(null);
  }

  const gefilterd = berichten.filter(b => filter === "alle" || b.status === filter);

  const statusKleur = {
    nieuw: { bg:"#e6f1fb", tekst:"#0c447c" },
    in_behandeling: { bg:"#fffbf0", tekst:"#7a5800" },
    afgehandeld: { bg:"#eaf3de", tekst:"#27500a" },
  };

  const typeIcoon = { vraag:"❓", functionaliteit:"💡", fout:"🐛" };

  function fmtDatum(iso) {
    return new Date(iso).toLocaleDateString("nl-NL", { day:"numeric", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" });
  }

  return (
    <div style={{ display:"flex", gap:16, height:"calc(100vh - 160px)" }}>
      {/* Lijst */}
      <div style={{ width:340, flexShrink:0, display:"flex", flexDirection:"column", gap:8 }}>
        {/* Filter tabs */}
        <div style={{ display:"flex", borderRadius:8, overflow:"hidden", border:`1px solid ${kleur.hoofd}`, flexShrink:0 }}>
          {[
            { id:"alle", label:`Alle (${berichten.length})` },
            { id:"nieuw", label:`Nieuw (${berichten.filter(b=>b.status==="nieuw").length})` },
            { id:"in_behandeling", label:"In behandeling" },
            { id:"afgehandeld", label:"Afgehandeld" },
          ].map(f => (
            <button key={f.id} onClick={()=>setFilter(f.id)} style={{
              flex:1, padding:"6px 4px", border:"none", cursor:"pointer", fontSize:fs-3,
              background: filter===f.id ? kleur.hoofd : "var(--color-background-primary)",
              color: filter===f.id ? "#fff" : "var(--color-text-primary)" }}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Berichten lijst */}
        <div style={{ overflowY:"auto", flex:1, display:"flex", flexDirection:"column", gap:6 }}>
          {laden && <p style={{ color:"var(--color-text-secondary)", fontSize:fs-1, padding:"1rem" }}>Laden…</p>}
          {!laden && gefilterd.length===0 && (
            <p style={{ color:"var(--color-text-secondary)", fontSize:fs-1, padding:"1rem" }}>Geen berichten gevonden.</p>
          )}
          {gefilterd.map(b => (
            <div key={b.id} onClick={()=>setOpen(b)}
              style={{ background:"var(--color-background-primary)",
                border:`1px solid ${open?.id===b.id ? kleur.hoofd : "var(--color-border-tertiary)"}`,
                borderRadius:10, padding:"10px 12px", cursor:"pointer",
                borderLeft:`4px solid ${statusKleur[b.status]?.bg || "#ddd"}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                <span style={{ fontSize:14 }}>{typeIcoon[b.type] || "📩"}</span>
                <span style={{ fontSize:fs-1, fontWeight:500, flex:1, overflow:"hidden",
                  textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.onderwerp}</span>
                <span style={{ fontSize:fs-3, padding:"2px 8px", borderRadius:99,
                  background: statusKleur[b.status]?.bg,
                  color: statusKleur[b.status]?.tekst }}>
                  {b.status.replace("_"," ")}
                </span>
              </div>
              <p style={{ margin:0, fontSize:fs-2, color:"var(--color-text-secondary)" }}>
                {b.naam} · {fmtDatum(b.aangemaakt_op)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Detail */}
      <div style={{ flex:1, background:"var(--color-background-primary)",
        border:"0.5px solid var(--color-border-tertiary)", borderRadius:16,
        padding:"1.5rem", overflowY:"auto" }}>
        {!open ? (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
            height:"100%", color:"var(--color-text-secondary)", fontSize:fs }}>
            Selecteer een bericht om te lezen
          </div>
        ) : (
          <>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1.5rem", flexWrap:"wrap", gap:8 }}>
              <div>
                <h2 style={{ margin:0, fontSize:fs+4, fontWeight:600 }}>{open.onderwerp}</h2>
                <p style={{ margin:"4px 0 0", fontSize:fs-1, color:"var(--color-text-secondary)" }}>
                  {typeIcoon[open.type]} {open.type} · {open.naam} · {open.email} · {fmtDatum(open.aangemaakt_op)}
                </p>
              </div>
              <div style={{ display:"flex", gap:6 }}>
                {["nieuw","in_behandeling","afgehandeld"].map(s => (
                  <button key={s} onClick={()=>updateStatus(open.id, s)}
                    style={{ padding:"6px 10px", borderRadius:8, cursor:"pointer", fontSize:fs-2, border:"none",
                      background: open.status===s ? kleur.hoofd : "var(--color-background-secondary)",
                      color: open.status===s ? "#fff" : "var(--color-text-secondary)",
                      fontWeight: open.status===s ? 500 : 400 }}>
                    {s.replace("_"," ")}
                  </button>
                ))}
                <button onClick={()=>verwijder(open.id)}
                  style={{ padding:"6px 10px", borderRadius:8, cursor:"pointer", fontSize:fs-2,
                    background:"#fcebeb", color:"#a32d2d", border:"none" }}>
                  ✕ Verwijderen
                </button>
              </div>
            </div>

            <div style={{ background:"var(--color-background-secondary)", borderRadius:10,
              padding:"1.25rem", fontSize:fs, lineHeight:1.8, whiteSpace:"pre-wrap" }}>
              {open.bericht}
            </div>

            {open.email && (
              <div style={{ marginTop:"1rem" }}>
                <a href={`mailto:${open.email}?subject=Re: ${open.onderwerp}`}
                  style={{ padding:"8px 16px", borderRadius:8, background:kleur.hoofd,
                    color:"#fff", textDecoration:"none", fontSize:fs-1, fontWeight:500 }}>
                  ✉ Beantwoorden via mail
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
function OffertePreview({ offerte, klant, kleur }) {
  const vandaag = offerte.datum
    ? new Date(offerte.datum+"T12:00:00").toLocaleDateString("nl-NL",{day:"numeric",month:"long",year:"numeric"})
    : new Date().toLocaleDateString("nl-NL",{day:"numeric",month:"long",year:"numeric"});
  const tekst = (offerte.template||OFFERTE_TEMPLATE).replace("{klant_naam}", klant?.naam||"");
  const exclBtw = offerte.regels.reduce((s,r)=>s+(parseFloat(r.prijs)||0)*(parseInt(r.aantal)||1),0);
  const btwBedrag = offerte.inclBtw ? Math.round(exclBtw*0.21) : 0;
  const totaal = exclBtw + btwBedrag;
  return (
    <div style={{ background:"#fff", color:"#222", border:"0.5px solid #ddd", borderRadius:12,
      padding:"2.5rem", fontFamily:"Georgia,serif", lineHeight:1.7 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"2rem" }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
          <img src={API.logoUrl()} alt="" style={{ height:44, maxWidth:70, objectFit:"contain" }}
            onError={e=>{ e.target.style.display="none"; }} />
          <div>
            <h2 style={{ margin:0, fontSize:22, fontWeight:700, color:kleur.hoofd }}>{offerte.bedrijfsnaam||"Uw Bedrijfsnaam"}</h2>
            <p style={{ margin:0, fontSize:13, color:"#666" }}>{offerte.bedrijfAdres||""}</p>
            {offerte.iban&&<p style={{ margin:"2px 0 0", fontSize:12, color:"#888" }}>IBAN: {offerte.iban}</p>}
            {offerte.btwNr&&<p style={{ margin:"2px 0 0", fontSize:12, color:"#888" }}>BTW-nr: {offerte.btwNr}</p>}
          </div>
        </div>
        <div style={{ textAlign:"right" }}>
          <p style={{ margin:0, fontSize:13, color:"#666" }}>Datum: {vandaag}</p>
          <p style={{ margin:0, fontSize:13, color:"#666" }}>Referentie: {offerte.referentie}</p>
        </div>
      </div>
      <div style={{ borderTop:`2px solid ${kleur.hoofd}`, paddingTop:"1.5rem", marginBottom:"1.5rem" }}>
        <p style={{ margin:"0 0 4px", fontSize:13, color:"#666" }}>Offerte voor:</p>
        <p style={{ margin:0, fontWeight:700, fontSize:16 }}>{klant?.naam}</p>
        <p style={{ margin:0, fontSize:13, color:"#444" }}>{klant?.email}</p>
        <p style={{ margin:0, fontSize:13, color:"#444" }}>{klant?.adres}</p>
      </div>
      <p style={{ margin:"0 0 1.5rem", fontSize:14, color:"#333", whiteSpace:"pre-wrap" }}>{tekst}</p>
      <table style={{ width:"100%", borderCollapse:"collapse", marginBottom:"1.5rem" }}>
        <thead>
          <tr style={{ background:kleur.hoofd, color:"#fff" }}>
            <th style={{ padding:"10px 12px", textAlign:"left", fontSize:13, fontWeight:500 }}>Omschrijving</th>
            <th style={{ padding:"10px 12px", textAlign:"left", fontSize:13, fontWeight:500 }}>Toelichting</th>
            <th style={{ padding:"10px 12px", textAlign:"center", fontSize:13, fontWeight:500 }}>Aantal</th>
            <th style={{ padding:"10px 12px", textAlign:"right", fontSize:13, fontWeight:500 }}>Prijs</th>
          </tr>
        </thead>
        <tbody>
          {offerte.regels.map((r,i)=>(
            <tr key={r.id||i} style={{ background:i%2===0?"#f8f8f8":"#fff" }}>
              <td style={{ padding:"9px 12px", fontSize:13 }}>{r.naam||"—"}</td>
              <td style={{ padding:"9px 12px", fontSize:13, color:"#555" }}>{r.beschrijving||""}</td>
              <td style={{ padding:"9px 12px", fontSize:13, textAlign:"center" }}>{r.aantal||1}</td>
              <td style={{ padding:"9px 12px", fontSize:13, textAlign:"right", fontWeight:500 }}>
                €{((parseFloat(r.prijs)||0)*(parseInt(r.aantal)||1)).toLocaleString("nl-NL",{minimumFractionDigits:2})}
              </td>
            </tr>
          ))}
          <tr style={{ borderTop:`2px solid ${kleur.hoofd}` }}>
            <td colSpan={3} style={{ padding:"10px 12px", fontWeight:700, fontSize:14 }}>Subtotaal excl. BTW</td>
            <td style={{ padding:"10px 12px", fontWeight:700, fontSize:15, textAlign:"right", color:"#333" }}>
              €{exclBtw.toLocaleString("nl-NL",{minimumFractionDigits:2})}
            </td>
          </tr>
          {offerte.inclBtw&&(
            <tr>
              <td colSpan={3} style={{ padding:"4px 12px", color:"#666", fontSize:13 }}>BTW 21%</td>
              <td style={{ padding:"4px 12px", fontSize:13, textAlign:"right", color:"#666" }}>
                €{btwBedrag.toLocaleString("nl-NL",{minimumFractionDigits:2})}
              </td>
            </tr>
          )}
          <tr style={{ background:kleur.licht }}>
            <td colSpan={3} style={{ padding:"10px 12px", fontWeight:700, fontSize:14, color:kleur.donker }}>
              Totaal {offerte.inclBtw?"incl. BTW":"(geen BTW)"}
            </td>
            <td style={{ padding:"10px 12px", fontWeight:700, fontSize:17, textAlign:"right", color:kleur.hoofd }}>
              €{totaal.toLocaleString("nl-NL",{minimumFractionDigits:2})}
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ borderTop:"0.5px solid #eee", paddingTop:"1rem", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
        <p style={{ fontSize:12, color:"#888", margin:0 }}>Deze offerte is geldig tot 30 dagen na de datum van uitgifte.</p>
        <div style={{ fontSize:12, color:"#888", textAlign:"right" }}>
          {offerte.iban&&<p style={{ margin:0 }}>Betalen op: {offerte.iban}</p>}
          {offerte.btwNr&&<p style={{ margin:0 }}>BTW-nummer: {offerte.btwNr}</p>}
        </div>
      </div>
    </div>
  );
}

// ── OFFERTES ─────────────────────────────────────────────────────────────────────────────
const LEEG_REGEL = () => ({ id:"r"+uid(), naam:"", beschrijving:"", prijs:0, aantal:1, isVariabel:true });

function OffertesPage({ klanten, setKlanten, producten, kleur, fs, isDemoMode, herlaad, T, instellingen, updateInstelling }) {
  const [stap, setStap] = useState(1);
  const [documentType, setDocumentType] = useState(null); // "offerte" | "factuur"
  const [klantId, setKlantId] = useState("");
  const [regels, setRegels] = useState([]);
  const [inclBtw, setInclBtw] = useState(true);
  const [template, setTemplate] = useState(OFFERTE_TEMPLATE);
  const [bedrijfsnaam, setBedrijfsnaam] = useState("Uw Bedrijfsnaam");
  const [bedrijfAdres, setBedrijfAdres] = useState("Adres 1, 1234 AB Stad");
  const [ref, setRef] = useState(`OFF-${new Date().getFullYear()}-001`);
  const [iban, setIban] = useState("");
  const [btwNr, setBtwNr] = useState("");
  const [opgeslagen, setOpgeslagen] = useState(false);
  const [geslagenOfferteId, setGeslagenOfferteId] = useState(null);
  const mailModus = instellingen?.mailModus || 'dencrm';
  function setMailModus(v) { updateInstelling({ mailModus: v }); }

  const ccMijzelf = instellingen?.ccMijzelf ?? false;
  function setCcMijzelf(v) { updateInstelling({ ccMijzelf: v }); }
  const [nieuweKlantModal, setNieuweKlantModal] = useState(false);
  const [nkForm, setNkForm] = useState({ naam:"", email:"", telefoon:"", adres:"" });
  const [catFilter, setCatFilter] = useState("Alle");
  const [kortingType, setKortingType] = useState("percentage"); // percentage | bedrag
  const [kortingWaarde, setKortingWaarde] = useState("");

  function kiesDocumentType(type) {
    setDocumentType(type);
    const prefix = type === "factuur" ? "FACT" : "OFF";
    setRef(`${prefix}-${new Date().getFullYear()}-001`);
    setTemplate(type === "factuur" ? FACTUUR_TEMPLATE : OFFERTE_TEMPLATE);
    setStap(2);
  }

  const [opgeslagenTemplates, setOpgeslagenTemplates] = useState([]);
  const [gekozenTemplateId, setGekozenTemplateId] = useState("");
  const [templateNaamModal, setTemplateNaamModal] = useState(false);
  const [templateNaamInvoer, setTemplateNaamInvoer] = useState("");
  const [templateOpslaanBezig, setTemplateOpslaanBezig] = useState(false);

  useEffect(() => {
    if (isDemoMode || !documentType) return;
    API.haalDocumentTemplatesOp(documentType).then(setOpgeslagenTemplates).catch(()=>{});
  }, [documentType]);

  function kiesOpgeslagenTemplate(id) {
    setGekozenTemplateId(id);
    if (!id) return;
    const t = opgeslagenTemplates.find(t => t.id === id);
    if (t) setTemplate(t.tekst); // laadt de tekst, wijzigingen daarna worden niet automatisch teruggeschreven
  }

  async function slaTemplateOp() {
    if (!templateNaamInvoer.trim()) return;
    setTemplateOpslaanBezig(true);
    try {
      const { id } = await API.maakDocumentTemplateAan({ type: documentType, naam: templateNaamInvoer.trim(), tekst: template });
      setOpgeslagenTemplates(await API.haalDocumentTemplatesOp(documentType));
      setGekozenTemplateId(id);
      setTemplateNaamModal(false);
      setTemplateNaamInvoer("");
    } catch(e) { alert("Opslaan mislukt: "+e.message); }
    finally { setTemplateOpslaanBezig(false); }
  }

  async function verwijderOpgeslagenTemplate(id) {
    if (!confirm("Deze template verwijderen?")) return;
    try {
      await API.verwijderDocumentTemplate(id);
      setOpgeslagenTemplates(await API.haalDocumentTemplatesOp(documentType));
      if (gekozenTemplateId === id) setGekozenTemplateId("");
    } catch(e) { alert("Verwijderen mislukt: "+e.message); }
  }

  const klant = klanten.find(k=>k.id===klantId);
  const exclBtwVoorKorting = regels.reduce((s,r)=>s+(parseFloat(r.prijs)||0)*(parseInt(r.aantal)||1),0);
  const kortingBedrag = kortingType === "percentage"
    ? Math.round(exclBtwVoorKorting * (parseFloat(kortingWaarde)||0) / 100 * 100) / 100
    : Math.min(parseFloat(kortingWaarde)||0, exclBtwVoorKorting);
  const exclBtw = Math.max(0, exclBtwVoorKorting - kortingBedrag);
  const btwBedrag = inclBtw ? Math.round(exclBtw*0.21) : 0;
  const totaalInclBtw = exclBtw + btwBedrag;
  const vandaagISO = new Date().toISOString().slice(0,10);

  const cats = ["Alle", ...new Set(producten.map(p=>p.categorie).filter(Boolean))];
  const gefilterdeProd = catFilter==="Alle" ? producten : producten.filter(p=>p.categorie===catFilter);

  // Haal bedrijfsgegevens eenmalig op uit het profiel (Instellingen > Mijn profiel), zodat je ze niet elke keer opnieuw hoeft in te vullen
  useEffect(() => {
    if (isDemoMode) return;
    API.haalProfielOp().then(data => {
      if (data.bedrijfsnaam) setBedrijfsnaam(data.bedrijfsnaam);
      if (data.bedrijf_adres) setBedrijfAdres(data.bedrijf_adres);
      if (data.iban) setIban(data.iban);
      if (data.btw_nummer) setBtwNr(data.btw_nummer);
    }).catch(()=>{});
  }, []);

  function printOfferteVoorbeeld() {
    printOfferteHtml(
      { bedrijfsnaam, bedrijfAdres, iban, btwNr, referentie:ref, datum:vandaagISO, template, regels, inclBtw, totaalInclBtw },
      klant
    );
  }

  function addProductRegel(p) {
    setRegels(r=>[...r,{ id:"r"+uid(), naam:p.naam, beschrijving:p.beschrijving||"", prijs:p.prijs, aantal:1, isVariabel:false }]);
  }
  function addLegeRegel() { setRegels(r=>[...r, LEEG_REGEL()]); }
  function updateRegel(id, veld, val) { setRegels(r=>r.map(x=>x.id===id?{...x,[veld]:val}:x)); }
  function delRegel(id) { setRegels(r=>r.filter(x=>x.id!==id)); }

  function voegKlantToe() {
    if (!nkForm.naam) return;
    const nieuw = { ...nkForm, id:"k"+uid(), producten:[], offertes:[] };
    setKlanten(p=>[...p, nieuw]);
    setKlantId(nieuw.id);
    setNieuweKlantModal(false);
    setNkForm({ naam:"", email:"", telefoon:"", adres:"" });
  }

  async function slaOp() {
    if (!klantId||regels.length===0) return;
    const regelsMetKorting = kortingBedrag > 0
      ? [...regels, { id:"korting", naam:"Korting", beschrijving: kortingType==="percentage" ? `${kortingWaarde}% korting` : "", prijs: -kortingBedrag, aantal:1, isVariabel:false }]
      : regels;
    if (isDemoMode) {
      const offerte = { id:"o"+uid(), referentie:ref, datum:vandaagISO, regels:regelsMetKorting, totaalInclBtw, inclBtw,
        bedrijfsnaam, bedrijfAdres, iban, btwNr, template };
      setKlanten(p=>p.map(k=>k.id===klantId?{...k,offertes:[...(k.offertes||[]),offerte]}:k));
      setOpgeslagen(true); return;
    }
    try {
      const { id } = await API.maakOfferteAan({
        klant_id: klantId,
        referentie: ref,
        datum: vandaagISO,
        type: documentType || "offerte",
        incl_btw: inclBtw,
        totaal_excl_btw: exclBtw,
        totaal_incl_btw: totaalInclBtw,
        bedrijfsnaam, bedrijf_adres: bedrijfAdres,
        iban, btw_nummer: btwNr,
        offerte_tekst: template,
        regels: regelsMetKorting.map((r,i) => ({ naam:r.naam, beschrijving:r.beschrijving||"", prijs:parseFloat(r.prijs)||0, aantal:parseInt(r.aantal)||1, volgorde:i, isVariabel:r.isVariabel||false })),
      });
      await herlaad();
      setGeslagenOfferteId(id);
      setOpgeslagen(true);
    } catch(e) { alert("Opslaan mislukt: " + e.message); }
  }

  function reset() {
    setStap(1); setDocumentType(null); setKlantId(""); setRegels([]); setInclBtw(true);
    setRef(`OFF-${new Date().getFullYear()}-001`); setOpgeslagen(false); setCatFilter("Alle");
    setKortingType("percentage"); setKortingWaarde(""); setGeslagenOfferteId(null);
  }

  const stapLabels = ["Type document", T.klantKiezen, T.productenEnRegels, T.tekstEnVoorbeeld];

  return (
    <div>
      <div style={{ display:"flex", gap:8, marginBottom:"1.5rem", flexWrap:"wrap" }}>
        {[1,2,3,4].map(s=>(
          <div key={s} style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:28, height:28, borderRadius:"50%",
              background:stap>=s?kleur.hoofd:"var(--color-background-secondary)",
              color:stap>=s?"#fff":"var(--color-text-secondary)",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:500 }}>{s}</div>
            <span style={{ fontSize:fs-1, color:stap===s?"var(--color-text-primary)":"var(--color-text-secondary)" }}>
              {stapLabels[s-1]}
            </span>
            {s<4&&<span style={{ color:"var(--color-text-secondary)", margin:"0 4px" }}>›</span>}
          </div>
        ))}
      </div>

      {/* ─ STAP 1: Type document kiezen ─ */}
      {stap===1&&(
        <div style={{ maxWidth:520 }}>
          <p style={{ margin:"0 0 1.25rem", fontSize:fs-1, color:"var(--color-text-secondary)" }}>
            Wilt u een offerte of een factuur opstellen?
          </p>
          <div style={{ display:"flex", gap:12 }}>
            <button onClick={()=>kiesDocumentType("offerte")}
              style={{ flex:1, padding:"1.5rem", borderRadius:12, cursor:"pointer", textAlign:"center",
                border:`2px solid ${kleur.hoofd}`, background:kleur.licht }}>
              <div style={{ fontSize:32, marginBottom:8 }}>📄</div>
              <p style={{ margin:0, fontSize:fs+1, fontWeight:600, color:kleur.donker }}>Offerte</p>
              <p style={{ margin:"4px 0 0", fontSize:fs-2, color:"var(--color-text-secondary)" }}>Een vrijblijvend voorstel</p>
            </button>
            <button onClick={()=>kiesDocumentType("factuur")}
              style={{ flex:1, padding:"1.5rem", borderRadius:12, cursor:"pointer", textAlign:"center",
                border:`2px solid ${kleur.hoofd}`, background:kleur.licht }}>
              <div style={{ fontSize:32, marginBottom:8 }}>🧾</div>
              <p style={{ margin:0, fontSize:fs+1, fontWeight:600, color:kleur.donker }}>Factuur</p>
              <p style={{ margin:"4px 0 0", fontSize:fs-2, color:"var(--color-text-secondary)" }}>Een betalingsverzoek</p>
            </button>
          </div>
        </div>
      )}

      {/* ─ STAP 2: Klant kiezen ─ */}
      {stap===2&&(
        <div style={{ maxWidth:520 }}>
          <p style={{ margin:"0 0 1.25rem", fontSize:fs-1, color:"var(--color-text-secondary)" }}>
            Zoek een bestaande klant of voeg een nieuwe klant toe.
          </p>
          <FF label={T.klantZoeken} fs={fs}>
            <KlantZoekBox klanten={klanten} value={klantId} onChange={id=>setKlantId(id)} fs={fs} />
          </FF>

          {klant&&(
            <div style={{ background:kleur.licht, borderRadius:10, padding:"12px 14px", marginBottom:"1rem",
              borderLeft:`3px solid ${kleur.hoofd}`, display:"flex", alignItems:"center", gap:10 }}>
              <Avatar naam={klant.naam} size={36} kleur={kleur}/>
              <div style={{ flex:1 }}>
                <p style={{ margin:0, fontWeight:500, fontSize:fs }}>{klant.naam}</p>
                <p style={{ margin:0, fontSize:fs-2, color:kleur.donker }}>{klant.email}</p>
              </div>
              <button onClick={()=>setKlantId("")} style={{ background:"none",border:"none",cursor:"pointer",color:kleur.donker,fontSize:18 }}>×</button>
            </div>
          )}

          <div style={{ display:"flex", alignItems:"center", gap:10, margin:"1.25rem 0" }}>
            <div style={{ flex:1, height:"0.5px", background:"var(--color-border-tertiary)" }}/>
            <span style={{ fontSize:fs-2, color:"var(--color-text-secondary)" }}>of</span>
            <div style={{ flex:1, height:"0.5px", background:"var(--color-border-tertiary)" }}/>
          </div>

          <button onClick={()=>setNieuweKlantModal(true)} style={{ width:"100%", padding:"11px 16px", borderRadius:10,
            background:kleur.licht, color:kleur.donker,
            border:`2px dashed ${kleur.hoofd}`, cursor:"pointer", fontSize:fs, fontWeight:500,
            display:"flex", alignItems:"center", justifyContent:"center", gap:10,
            transition:"all 0.15s" }}
            onMouseEnter={e=>{e.currentTarget.style.background=kleur.hoofd;e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background=kleur.licht;e.currentTarget.style.color=kleur.donker;}}>
            <span style={{ fontSize:18 }}>👤</span>
            <span>+ Voeg nieuwe klant toe</span>
          </button>

          <div style={{ display:"flex", justifyContent:"flex-end", marginTop:"2rem" }}>
            <Btn variant="primary" onClick={()=>klantId&&setStap(3)} kleur={kleur} fs={fs} disabled={!klantId}>
              Volgende →
            </Btn>
          </div>

          {nieuweKlantModal&&(
            <Modal title={T.nieuweKlantToevoegen} onClose={()=>setNieuweKlantModal(false)} fs={fs}>
              <FF label={T.naam} fs={fs}><input value={nkForm.naam} onChange={e=>setNkForm(f=>({...f,naam:e.target.value}))} style={iSt(fs)} /></FF>
              <FF label={T.emailadres} fs={fs}><input type="email" value={nkForm.email} onChange={e=>setNkForm(f=>({...f,email:e.target.value}))} style={iSt(fs)} /></FF>
              <FF label={T.telefoon} fs={fs}><input value={nkForm.telefoon} onChange={e=>setNkForm(f=>({...f,telefoon:e.target.value}))} style={iSt(fs)} /></FF>
              <FF label="Straat" fs={fs}><input value={nkForm.straat||""} onChange={e=>setNkForm(f=>({...f,straat:e.target.value}))} style={iSt(fs)} /></FF>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:8 }}>
                <FF label="Postcode" fs={fs}><input value={nkForm.postcode||""} onChange={e=>setNkForm(f=>({...f,postcode:e.target.value}))} style={iSt(fs)} /></FF>
                <FF label="Dorp / Stad" fs={fs}><input value={nkForm.stad||""} onChange={e=>setNkForm(f=>({...f,stad:e.target.value}))} style={iSt(fs)} /></FF>
              </div>
              <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:"1rem" }}>
                <Btn onClick={()=>setNieuweKlantModal(false)} fs={fs}>Annuleren</Btn>
                <Btn variant="primary" onClick={voegKlantToe} kleur={kleur} fs={fs}>Klant toevoegen & selecteren</Btn>
              </div>
            </Modal>
          )}
        </div>
      )}

      {/* ─ STAP 3: Producten & regels ─ */}
      {stap===3&&(
        <div>
          {klant&&(
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:"1.25rem",
              background:kleur.licht, borderRadius:99, padding:"6px 14px" }}>
              <Avatar naam={klant.naam} size={22} kleur={kleur}/>
              <span style={{ fontSize:fs-1, fontWeight:500, color:kleur.donker }}>{klant.naam}</span>
            </div>
          )}

          {cats.length>1&&(
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:"1rem" }}>
              {cats.map(c=>(
                <button key={c} onClick={()=>setCatFilter(c)} style={{ padding:"5px 14px", borderRadius:99, border:"none",
                  cursor:"pointer", fontSize:fs-2, fontWeight:500,
                  background:catFilter===c?kleur.hoofd:"var(--color-background-secondary)",
                  color:catFilter===c?"#fff":"var(--color-text-secondary)" }}>{c}</button>
              ))}
            </div>
          )}

          <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:"1rem" }}>
            {gefilterdeProd.map(p=>{
              const alIn = regels.some(r=>r.naam===p.naam&&!r.isVariabel);
              return (
                <div key={p.id} style={{ background:"var(--color-background-primary)",
                  border:`0.5px solid ${alIn?kleur.hoofd:"var(--color-border-tertiary)"}`,
                  borderRadius:10, padding:"10px 14px", display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:4, alignSelf:"stretch", borderRadius:4, background:kleur.hoofd, flexShrink:0 }}/>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <p style={{ margin:0, fontWeight:500, fontSize:fs }}>{p.naam}</p>
                      {p.categorie&&<Badge kleur={kleur}>{p.categorie}</Badge>}
                    </div>
                    {p.beschrijving&&<p style={{ margin:"2px 0 0", fontSize:fs-2, color:"var(--color-text-secondary)" }}>{p.beschrijving}</p>}
                  </div>
                  <p style={{ margin:0, fontSize:fs+1, fontWeight:600, color:kleur.hoofd, flexShrink:0 }}>
                    €{p.prijs.toLocaleString("nl-NL",{minimumFractionDigits:2})}
                  </p>
                  <button onClick={()=>addProductRegel(p)} style={{ padding:"6px 14px", borderRadius:8,
                    border:`1px solid ${kleur.hoofd}`, background:alIn?kleur.licht:"var(--color-background-primary)",
                    color:kleur.hoofd, cursor:"pointer", fontSize:fs-1, fontWeight:500, flexShrink:0 }}>
                    {alIn?"+ nogmaals":"+ Toevoegen"}
                  </button>
                </div>
              );
            })}
            {gefilterdeProd.length===0&&<p style={{ fontSize:fs-1, color:"var(--color-text-secondary)" }}>Geen producten gevonden.</p>}
          </div>

          {regels.length>0&&(
            <div style={{ marginBottom:"1rem" }}>
              <p style={{ fontSize:fs-1, fontWeight:500, color:"var(--color-text-secondary)", marginBottom:8 }}>
                Geselecteerde regels ({regels.length})
              </p>
              {regels.map(r=>(
                <div key={r.id} style={{ background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)",
                  borderRadius:10, padding:"10px 12px", marginBottom:6 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr auto auto auto", gap:8, marginBottom:r.isVariabel?6:0, alignItems:"center" }}>
                    <input value={r.naam} onChange={e=>updateRegel(r.id,"naam",e.target.value)} placeholder="Omschrijving"
                      style={{ padding:"6px 10px", borderRadius:6, border:"1px solid #d0d0d0", background:"#f9f9f9", color:"#1a1a1a", fontSize:fs }} />
                    <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                      <span style={{ fontSize:fs-2, color:"#666" }}>aantal</span>
                      <input type="number" min="1" value={r.aantal||1} onChange={e=>updateRegel(r.id,"aantal",Math.max(1,parseInt(e.target.value)||1))}
                        style={{ width:52, padding:"6px 6px", borderRadius:6, border:"1px solid #d0d0d0", background:"#f9f9f9", color:"#1a1a1a", fontSize:fs, textAlign:"center" }} />
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <span style={{ fontSize:fs-1, color:"#666" }}>€</span>
                      <input type="number" value={r.prijs} onChange={e=>updateRegel(r.id,"prijs",e.target.value)}
                        placeholder="0,00" style={{ width:90, padding:"6px 8px", borderRadius:6, border:"1px solid #d0d0d0", background:"#f9f9f9", color:"#1a1a1a", fontSize:fs }} />
                    </div>
                    <button onClick={()=>delRegel(r.id)} style={{ background:"none",border:"none",cursor:"pointer",color:"#A32D2D",fontSize:fs+2,padding:"0 4px" }}>✕</button>
                  </div>
                  {r.isVariabel&&(
                    <input value={r.beschrijving} onChange={e=>updateRegel(r.id,"beschrijving",e.target.value)} placeholder="Toelichting (optioneel)"
                      style={{ width:"100%", padding:"5px 10px", borderRadius:6, border:"1px solid #e0e0e0", background:"#f9f9f9", color:"#666", fontSize:fs-2, boxSizing:"border-box" }} />
                  )}
                  {(parseInt(r.aantal)||1) > 1 && (
                    <p style={{ margin:"4px 0 0", fontSize:fs-2, color:"var(--color-text-secondary)", textAlign:"right" }}>
                      {r.aantal} × €{parseFloat(r.prijs||0).toLocaleString("nl-NL",{minimumFractionDigits:2})} = <strong style={{ color:kleur.hoofd }}>€{((parseFloat(r.prijs)||0)*(parseInt(r.aantal)||1)).toLocaleString("nl-NL",{minimumFractionDigits:2})}</strong>
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          <button onClick={addLegeRegel} style={{ width:"100%", padding:"11px", borderRadius:8,
            background:kleur.licht, color:kleur.donker,
            border:`1.5px dashed ${kleur.hoofd}`, cursor:"pointer", fontSize:fs, fontWeight:500,
            display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:"1rem" }}>
            ➕ Voeg eenmalig nog niet bestaand product toe
          </button>

          {/* Korting */}
          <div style={{ marginBottom:"1rem", padding:"12px 14px", background:"var(--color-background-secondary)", borderRadius:8 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
              <span style={{ fontSize:fs, fontWeight:500 }}>🏷 Korting</span>
              <div style={{ display:"flex", borderRadius:6, overflow:"hidden", border:`1px solid ${kleur.hoofd}` }}>
                <button onClick={()=>setKortingType("percentage")}
                  style={{ padding:"4px 10px", border:"none", cursor:"pointer", fontSize:fs-2,
                    background:kortingType==="percentage"?kleur.hoofd:"var(--color-background-primary)",
                    color:kortingType==="percentage"?"#fff":"var(--color-text-secondary)" }}>%</button>
                <button onClick={()=>setKortingType("bedrag")}
                  style={{ padding:"4px 10px", border:"none", cursor:"pointer", fontSize:fs-2,
                    background:kortingType==="bedrag"?kleur.hoofd:"var(--color-background-primary)",
                    color:kortingType==="bedrag"?"#fff":"var(--color-text-secondary)" }}>€</button>
              </div>
            </div>
            <input type="number" value={kortingWaarde} onChange={e=>setKortingWaarde(e.target.value)}
              placeholder={kortingType==="percentage"?"0 %":"€ 0,00"} min="0"
              step={kortingType==="percentage"?"1":"0.01"}
              style={{ width:"100%", padding:"7px 10px", borderRadius:6, border:"1px solid #ddd",
                background:"#fff", fontSize:fs-1, color:"#1a1a1a", boxSizing:"border-box" }} />
            {kortingBedrag > 0 && (
              <p style={{ margin:"6px 0 0", fontSize:fs-2, color:"#a32d2d" }}>
                Korting toegepast: −€{kortingBedrag.toLocaleString("nl-NL",{minimumFractionDigits:2})}
              </p>
            )}
          </div>

          <div style={{ margin:"0 0 1rem", padding:"12px 14px", background:"var(--color-background-secondary)", borderRadius:8 }}>
            <Toggle aan={inclBtw} onToggle={()=>setInclBtw(v=>!v)} label={T.btwToevoegen} fs={fs} />
          </div>

          {regels.length>0&&(
            <div style={{ textAlign:"right", fontSize:fs-1, color:"var(--color-text-secondary)", marginBottom:"1rem" }}>
              {kortingBedrag > 0 && <>Subtotaal: €{exclBtwVoorKorting.toLocaleString("nl-NL",{minimumFractionDigits:2})} &nbsp;·&nbsp; </>}
              Na korting excl. BTW: <strong>€{exclBtw.toLocaleString("nl-NL",{minimumFractionDigits:2})}</strong>
              {inclBtw&&<> &nbsp;·&nbsp; Totaal incl. BTW: <strong style={{ color:kleur.hoofd }}>€{totaalInclBtw.toLocaleString("nl-NL",{minimumFractionDigits:2})}</strong></>}
            </div>
          )}

          <div style={{ display:"flex", gap:8, justifyContent:"space-between" }}>
            <Btn onClick={()=>setStap(2)} fs={fs}>← Terug</Btn>
            <Btn variant="primary" onClick={()=>regels.length>0&&setStap(4)} kleur={kleur} fs={fs} disabled={regels.length===0}>
              Volgende →
            </Btn>
          </div>
        </div>
      )}

      {/* ─ STAP 4: Tekst & bedrijfsgegevens + voorbeeld ─ */}
      {stap===4&&(
        <div>
          {/* Mail voorkeur toggle — bovenaan */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"1rem",
            padding:"10px 14px", borderRadius:10, background:"var(--color-background-secondary)",
            border:`1px solid ${kleur.hoofd}22`, flexWrap:"wrap" }}>
            <span style={{ fontSize:fs-1, color:"var(--color-text-secondary)", fontWeight:500 }}>
              ✉ Mail versturen via:
            </span>
            <div style={{ display:"flex", borderRadius:8, overflow:"hidden",
              border:`1px solid ${kleur.hoofd}`, fontSize:fs-2 }}>
              <button onClick={()=>setMailModus("dencrm")}
                style={{ padding:"6px 14px", border:"none", cursor:"pointer",
                  background: mailModus==="dencrm" ? kleur.hoofd : "var(--color-background-primary)",
                  color: mailModus==="dencrm" ? "#fff" : "var(--color-text-secondary)",
                  fontWeight: mailModus==="dencrm" ? 600 : 400 }}>
                📤 DenCRM mail
              </button>
              <button onClick={()=>setMailModus("mailto")}
                style={{ padding:"6px 14px", border:"none", cursor:"pointer",
                  borderLeft:`1px solid ${kleur.hoofd}`,
                  background: mailModus==="mailto" ? kleur.hoofd : "var(--color-background-primary)",
                  color: mailModus==="mailto" ? "#fff" : "var(--color-text-secondary)",
                  fontWeight: mailModus==="mailto" ? 600 : 400 }}>
                📧 Eigen pakket (Outlook e.d.)
              </button>
            </div>

            {/* CC mijzelf toggle — alleen zichtbaar bij DenCRM mail */}
            {mailModus === "dencrm" && (
              <div style={{ display:"flex", alignItems:"center", gap:8, marginLeft:4 }}>
                <div onClick={()=>setCcMijzelf(!ccMijzelf)}
                  style={{ width:32, height:18, borderRadius:99, cursor:"pointer",
                    background: ccMijzelf ? kleur.hoofd : "#ccc", position:"relative", transition:"background 0.2s" }}>
                  <div style={{ position:"absolute", top:2, left: ccMijzelf ? 14 : 2, width:14, height:14,
                    borderRadius:"50%", background:"#fff", transition:"left 0.2s" }} />
                </div>
                <span style={{ fontSize:fs-2, color:"var(--color-text-secondary)", cursor:"pointer" }}
                  onClick={()=>setCcMijzelf(!ccMijzelf)}>
                  Zet mijzelf in de CC
                </span>
              </div>
            )}
            {mailModus==="mailto" && (
              <span style={{ fontSize:fs-3, color:"var(--color-text-secondary)", fontStyle:"italic" }}>
                PDF zelf toevoegen als bijlage
              </span>
            )}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:"1rem" }}>
            <FF label={T.uwBedrijfsnaam} fs={fs}><input value={bedrijfsnaam} onChange={e=>setBedrijfsnaam(e.target.value)} style={iSt(fs)} /></FF>
            <FF label={T.uwAdres} fs={fs}><input value={bedrijfAdres} onChange={e=>setBedrijfAdres(e.target.value)} style={iSt(fs)} /></FF>
            <FF label={T.iBAN} fs={fs}><input value={iban} onChange={e=>setIban(e.target.value)} placeholder="NL00 BANK 0000 0000 00" style={iSt(fs)} /></FF>
            <FF label={T.btwNummer} fs={fs}><input value={btwNr} onChange={e=>setBtwNr(e.target.value)} placeholder="NL000000000B01" style={iSt(fs)} /></FF>
          </div>
          <FF label={documentType==="factuur" ? "Factuurnummer" : "Offertenummer"} fs={fs}><input value={ref} onChange={e=>setRef(e.target.value)} style={iSt(fs)} /></FF>
          <FF label={`${documentType==="factuur"?"Factuur":"Offerte"}-template`} fs={fs}>
            <div style={{ display:"flex", gap:6 }}>
              <select value={gekozenTemplateId} onChange={e=>kiesOpgeslagenTemplate(e.target.value)} style={{ ...iSt(fs), flex:1 }}>
                <option value="">— Standaardtekst (niet opgeslagen) —</option>
                {opgeslagenTemplates.map(t => (
                  <option key={t.id} value={t.id}>{t.naam}</option>
                ))}
              </select>
              {gekozenTemplateId && (
                <button onClick={()=>verwijderOpgeslagenTemplate(gekozenTemplateId)}
                  style={{ padding:"0 12px", borderRadius:8, background:"#fcebeb", color:"#a32d2d",
                    border:"none", cursor:"pointer", fontSize:fs-2 }}>
                  ✕ Verwijderen
                </button>
              )}
              <button onClick={()=>{ setTemplateNaamInvoer(""); setTemplateNaamModal(true); }}
                style={{ padding:"0 12px", borderRadius:8, border:`1px dashed ${kleur.hoofd}`,
                  background:"transparent", color:kleur.hoofd, cursor:"pointer", fontSize:fs-2, whiteSpace:"nowrap" }}>
                💾 Opslaan als template
              </button>
            </div>
            <p style={{ margin:"4px 0 0", fontSize:fs-3, color:"var(--color-text-secondary)" }}>
              Kies een opgeslagen template om te laden, of wijzig de tekst hieronder vrij — die wijzigingen worden
              alleen in deze {documentType==="factuur"?"factuur":"offerte"} gebruikt, tenzij u opnieuw op "Opslaan als template" klikt.
            </p>
          </FF>
          <FF label={T.offertetekst} fs={fs}>
            <textarea value={template} onChange={e=>setTemplate(e.target.value)} rows={6}
              style={{...iSt(fs), resize:"vertical", fontFamily:"monospace"}} />
          </FF>

          {templateNaamModal && (
            <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:1000,
              display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}
              onClick={e=>e.target===e.currentTarget && setTemplateNaamModal(false)}>
              <div style={{ background:"var(--color-background-primary)", borderRadius:16, padding:"1.75rem", width:"100%", maxWidth:400 }}>
                <h3 style={{ margin:"0 0 1rem", fontSize:16 }}>Template opslaan</h3>
                <FF label="Naam van de template" fs={fs}>
                  <input value={templateNaamInvoer} onChange={e=>setTemplateNaamInvoer(e.target.value)}
                    onKeyDown={e=>e.key==="Enter" && slaTemplateOp()}
                    placeholder="Bijv. Standaard particulier" autoFocus style={iSt(fs)} />
                </FF>
                <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:"1rem" }}>
                  <Btn onClick={()=>setTemplateNaamModal(false)} fs={fs}>Annuleren</Btn>
                  <Btn variant="primary" onClick={slaTemplateOp} kleur={kleur} fs={fs} disabled={!templateNaamInvoer.trim()||templateOpslaanBezig}>
                    {templateOpslaanBezig ? "Bezig…" : "💾 Opslaan"}
                  </Btn>
                </div>
              </div>
            </div>
          )}
          <div style={{ display:"flex", gap:8, justifyContent:"space-between", marginBottom:"0.75rem", flexWrap:"wrap" }}>
            <Btn onClick={()=>setStap(3)} fs={fs}>← Terug</Btn>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {!opgeslagen?(
                <Btn onClick={slaOp} kleur={kleur} fs={fs} variant="primary">💾 Opslaan onder klant</Btn>
              ):(
                <span style={{ fontSize:fs-1, color:"green", padding:"8px 12px" }}>✓ Opgeslagen</span>
              )}
              {/* Mail knop */}
              {klant?.email ? (
                mailModus==="dencrm" ? (
                  <button onClick={async ()=>{
                      if (!opgeslagen) { alert("Sla de offerte eerst op voor u hem mailt."); return; }
                      try {
                        await API.stuurOfferteMail(geslagenOfferteId, ccMijzelf);
                        alert(`Offerte verstuurd naar ${klant.email}`);
                      } catch(e) { alert("Mailen mislukt: " + e.message); }
                    }}
                    style={{ padding:"8px 14px", borderRadius:8, border:`1px solid ${kleur.hoofd}`,
                      background:kleur.licht, color:kleur.donker, cursor:"pointer", fontSize:fs, fontWeight:500 }}>
                    ✉ Mailen naar klant
                  </button>
                ) : (
                  <a href={`mailto:${klant.email}?subject=${encodeURIComponent(`Offerte ${ref}`)}&body=${encodeURIComponent(`Beste ${klant.naam},\n\nHierbij ontvangt u offerte ${ref}.\n\nMet vriendelijke groet`)}`}
                    style={{ padding:"8px 14px", borderRadius:8, border:`1px solid ${kleur.hoofd}`,
                      background:kleur.licht, color:kleur.donker, cursor:"pointer", fontSize:fs, fontWeight:500,
                      textDecoration:"none", display:"inline-flex", alignItems:"center" }}>
                    📧 Mailen naar klant
                  </a>
                )
              ) : (
                <button disabled style={{ padding:"8px 14px", borderRadius:8, border:"1px solid #ddd",
                  background:"transparent", color:"#bbb", cursor:"not-allowed", fontSize:fs, opacity:0.5 }}>
                  ✉ Geen mailadres bekend
                </button>
              )}
              <Btn onClick={printOfferteVoorbeeld} kleur={kleur} fs={fs} variant="primary">{T.afdrukken}</Btn>
              <Btn onClick={reset} fs={fs}>Nieuwe offerte</Btn>
            </div>
          </div>

          {/* Notitie bij eigen pakket */}
          {mailModus==="mailto" && klant?.email && (
            <div style={{ fontSize:fs-1, color:"#7a5800", margin:"-4px 0 12px",
              padding:"8px 12px", borderRadius:8, background:"#fffbf0",
              border:"1px solid #e8c44a" }}>
              📎 U gebruikt uw eigen e-mailprogramma. Download eerst de PDF via "Afdrukken/PDF" en voeg deze zelf als bijlage toe aan uw e-mail.
            </div>
          )}
          <p style={{ fontSize:fs-1, fontWeight:500, color:"var(--color-text-secondary)", marginBottom:12 }}>Voorbeeld offerte</p>
          <OffertePreview offerte={{
            regels: kortingBedrag > 0 ? [...regels, { id:"korting", naam:"Korting", beschrijving: kortingType==="percentage" ? `${kortingWaarde}% korting` : "", prijs: -kortingBedrag, aantal:1, isVariabel:false }] : regels,
            inclBtw, referentie:ref, datum:new Date().toISOString().slice(0,10),
            bedrijfsnaam, bedrijfAdres, iban, btwNr, template }} klant={klant} kleur={kleur} />
        </div>
      )}

    </div>
  );
}

// ── FINANCIEEL OVERZICHT ──────────────────────────────────────────────────────
function FinancieelPage({ klanten, setKlanten, kleur, fs, isDemoMode, herlaad, T }) {
  const [filterKlant, setFilterKlant] = useState("");
  const [filterVan,   setFilterVan]   = useState("");
  const [filterTot,   setFilterTot]   = useState("");
  const [filterBetaald, setFilterBetaald] = useState("alle");
  const [toonKassa,   setToonKassa]   = useState(true);
  const [kassaBonnen, setKassaBonnen] = useState([]);
  const [toonDeclaraties, setToonDeclaraties] = useState(false);
  const [belastingModal, setBelastingModal] = useState(false);
  const [declaraties, setDeclaraties] = useState([]);
  const [openOfferte, setOpenOfferte] = useState(null);
  const [openKlant,   setOpenKlant]   = useState(null);

  // Laad kassa bonnen en declaraties
  useEffect(() => {
    if (!isDemoMode) {
      API.haalKassaBonnenOp().then(setKassaBonnen).catch(()=>{});
      API.haalDeclaratiesOp().then(setDeclaraties).catch(()=>{});
    }
  }, []);
  const [losseFactuurModal, setLosseFactuurModal] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [rapportModal, setRapportModal] = useState(false);
  const [rapportInst, setRapportInst] = useState(null);
  const [vervalDagen, setVervalDagen] = useState("");
  const [vervalOpgeslagen, setVervalOpgeslagen] = useState(false);
  const [rapportForm, setRapportForm] = useState({
    actief: true, frequentie: 'week', dag_van_week: 1, dag_van_maand: 1, inhoud: 'alle', incl_kassa: false
  });
  const [rapportOpgeslagen, setRapportOpgeslagen] = useState(false);

  // Laad verval instelling bij initialisatie
  useEffect(() => {
    if (!isDemoMode) {
      API.haalRapportInstellingOp().then(data => {
        if (data?.offerte_verval_dagen) setVervalDagen(data.offerte_verval_dagen.toString());
      }).catch(()=>{});
    }
  }, []);

  useEffect(() => {
    if (rapportModal && !isDemoMode) {
      API.haalRapportInstellingOp().then(data => {
        if (data) {
          setRapportInst(data);
          setRapportForm({
            actief: !!data.actief,
            frequentie: data.frequentie || 'week',
            dag_van_week: data.dag_van_week || 1,
            dag_van_maand: data.dag_van_maand || 1,
            inhoud: data.inhoud || 'alle',
          });
        }
      }).catch(()=>{});
    }
  }, [rapportModal]);

  // Losse factuur state
  const [lfKlantId, setLfKlantId]   = useState("");
  const [lfKlantVrij, setLfKlantVrij] = useState("");
  const [lfRegels, setLfRegels]     = useState([{ id:"lf1", naam:"", prijs:0 }]);
  const [lfInclBtw, setLfInclBtw]   = useState(true);
  const [lfRef, setLfRef]           = useState(`FACT-${new Date().getFullYear()}-001`);

  // Export modal state
  const [expVan, setExpVan] = useState("");
  const [expTot, setExpTot] = useState("");
  const [expMail, setExpMail] = useState(false);

  // Verzamel alle offertes + optioneel kassa bonnen
  const nu = new Date();
  const vervalMs = vervalDagen ? parseInt(vervalDagen) * 24 * 60 * 60 * 1000 : null;

  const alleOffertes = [
    ...klanten.flatMap(k =>
      (k.offertes || []).map(o => {
        const isVervallen = !o.betaald && vervalMs && o.datum
          ? (nu - new Date(o.datum + "T12:00:00")) > vervalMs
          : false;
        return { ...o, klant: k, type: o.factuur ? "factuur" : "offerte", isVervallen };
      })
    ),
    ...(toonKassa ? kassaBonnen.map(b => ({
      ...b,
      klant: b.klant_naam ? { id: b.klant_id, naam: b.klant_naam } : { id: null, naam: b.klant_naam_vrij || "Kassa" },
      type: "kassa",
      totaalInclBtw: parseFloat(b.totaal_incl_btw) || 0,
      datum: b.datum || (b.aangemaakt_op ? b.aangemaakt_op.slice(0,10) : ''),
      betaald: true,
      status: "betaald",
      referentie: b.referentie,
      regels: b.regels || [],
    })) : []),
    ...(toonDeclaraties ? declaraties.map(d => ({
      ...d,
      klant: { id: null, naam: d.leverancier || "Declaratie" },
      type: "declaratie",
      totaalInclBtw: -(parseFloat(d.bedrag_incl_btw) || 0), // negatief = uitgave
      datum: d.datum,
      betaald: true,
      status: "uitgave",
      referentie: d.omschrijving,
      regels: [],
    })) : []),
  ];

  const gesorteerd = [...alleOffertes].sort((a, b) => b.datum.localeCompare(a.datum));

  const gefilterd = gesorteerd.filter(o => {
    if (filterKlant && o.klant.id !== filterKlant) return false;
    if (filterVan   && o.datum < filterVan) return false;
    if (filterTot   && o.datum > filterTot) return false;
    if (filterBetaald === "betaald" && !o.betaald) return false;
    if (filterBetaald === "open"    &&  o.betaald) return false;
    return true;
  });

  const totaalAlle    = gefilterd.filter(o => !o.isVervallen).reduce((s, o) => s + (o.totaalInclBtw || 0), 0);
  const totaalBetaald = gefilterd.filter(o => o.betaald).reduce((s, o) => s + (o.totaalInclBtw || 0), 0);
  const totaalOpen    = totaalAlle - totaalBetaald;

  async function toggleBetaald(klantId, offerteId) {
    const huidig = alleOffertes.find(o=>o.id===offerteId);
    const nieuwStatus = (huidig?.betaald || huidig?.status==="betaald") ? "open" : "betaald";
    // Optimistisch updaten in UI
    setKlanten(prev => prev.map(k => {
      if (k.id !== klantId) return k;
      return { ...k, offertes: (k.offertes || []).map(o => o.id === offerteId ? { ...o, betaald: nieuwStatus==="betaald", status: nieuwStatus } : o) };
    }));
    if (openOfferte?.id === offerteId) setOpenOfferte(prev => ({ ...prev, betaald: nieuwStatus==="betaald" }));
    if (!isDemoMode) {
      try { await API.updateOfferteStatus(offerteId, nieuwStatus); }
      catch(e) { alert("Status bijwerken mislukt: " + e.message); await herlaad(); }
    }
  }

  function fmt(bedrag) {
    return "€" + bedrag.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function fmtDatum(iso) {
    if (!iso) return "—";
    // Werkt zowel met "2026-06-30" als met volledige ISO timestamps
    const datumDeel = iso.toString().slice(0,10);
    const d = new Date(datumDeel + "T12:00:00");
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" });
  }

  // Losse factuur helpers
  function lfAddRegel() { setLfRegels(r => [...r, { id: "lf"+uid(), naam: "", prijs: 0 }]); }
  function lfUpdateRegel(id, veld, val) { setLfRegels(r => r.map(x => x.id===id ? {...x,[veld]:val} : x)); }
  function lfDelRegel(id) { setLfRegels(r => r.filter(x => x.id!==id)); }

  function lfSlaOp() {
    const exclBtw = lfRegels.reduce((s,r) => s+(parseFloat(r.prijs)||0), 0);
    const totaal = lfInclBtw ? Math.round(exclBtw*1.21) : exclBtw;
    const klantObj = klanten.find(k => k.id === lfKlantId);
    const naamVoorFactuur = klantObj?.naam || lfKlantVrij || "Losse klant";
    const factuur = {
      id: "fact"+uid(), referentie: lfRef, datum: new Date().toISOString().slice(0,10),
      regels: lfRegels, totaalInclBtw: totaal, inclBtw: lfInclBtw,
      bedrijfsnaam: "", bedrijfAdres: "", iban: "", btwNr: "", template: "",
      factuur: true, betaald: false,
    };
    if (klantObj) {
      setKlanten(prev => prev.map(k => k.id===lfKlantId ? {...k, offertes:[...(k.offertes||[]),factuur]} : k));
    } else {
      // Losse klant: maak tijdelijke klant aan
      const tijdelijkeKlant = { id:"k"+uid(), naam:naamVoorFactuur, email:"", telefoon:"", adres:"", producten:[], offertes:[factuur] };
      setKlanten(prev => [...prev, tijdelijkeKlant]);
    }
    setLosseFactuurModal(false);
    setLfKlantId(""); setLfKlantVrij(""); setLfRegels([{ id:"lf1", naam:"", prijs:0 }]); setLfInclBtw(true);
  }

  // Export/print helpers
  const exportGefilterd = gesorteerd.filter(o => {
    if (expVan && o.datum < expVan) return false;
    if (expTot && o.datum > expTot) return false;
    return true;
  });
  const expTotaal = exportGefilterd.reduce((s,o) => s+(o.totaalInclBtw||0), 0);
  const expBetaald = exportGefilterd.filter(o=>o.betaald).reduce((s,o) => s+(o.totaalInclBtw||0), 0);

  function doPrint() {
    window.print();
  }

  async function doMail() {
    const inhoud = exportGefilterd.map(o =>
        `${o.datum} | ${o.klant?.naam||o.klant_naam_vrij||"?"} | ${o.referentie} | €${(o.totaalInclBtw||0).toLocaleString("nl-NL",{minimumFractionDigits:2})} | ${o.betaald?T.betaald:"Open"}`
    ).join("\n");
    try {
      await API.stuurExportMail(expVan, expTot, inhoud);
      alert("Overzicht verstuurd naar uw e-mailadres!");
      setExportModal(false);
    } catch(e) { alert("Mailen mislukt: " + e.message); }
  }

  return (
    <div>
      {/* ── Vervaldagen instelling ── */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"1rem", padding:"10px 14px",
        borderRadius:10, background:"var(--color-background-secondary)",
        border:`1px solid ${kleur.hoofd}22` }}>
        <span style={{ fontSize:fs-1, color:"var(--color-text-secondary)" }}>
          ⏱ Onbetaalde offertes automatisch laten vervallen na
        </span>
        <input type="number" min="1" max="365" value={vervalDagen}
          onChange={e=>setVervalDagen(e.target.value)}
          placeholder="—"
          style={{ width:60, padding:"4px 8px", borderRadius:6, border:`1px solid ${kleur.hoofd}`,
            textAlign:"center", fontSize:fs-1, color:"var(--color-text-primary)",
            background:"var(--color-background-primary)" }} />
        <span style={{ fontSize:fs-1, color:"var(--color-text-secondary)" }}>dagen</span>
        <button onClick={async()=>{
          try {
            await API.slaRapportInstellingOp({ offerte_verval_dagen: vervalDagen ? parseInt(vervalDagen) : null });
            setVervalOpgeslagen(true);
            setTimeout(() => setVervalOpgeslagen(false), 3000);
          } catch(e) { console.error(e); }
        }}
          style={{ padding:"4px 12px", borderRadius:6, background:kleur.hoofd, color:"#fff",
            border:"none", cursor:"pointer", fontSize:fs-2, fontWeight:500 }}>
          Opslaan
        </button>
        {vervalOpgeslagen && (
          <span style={{ fontSize:fs-2, color:"#27500a", fontWeight:500 }}>✓ Succesvol opgeslagen</span>
        )}
        {vervalDagen && (
          <span style={{ fontSize:fs-2, color:"var(--color-text-secondary)", marginLeft:4 }}>
            Vervallen offertes tellen niet mee in "nog te ontvangen" en worden rood gemarkeerd.
          </span>
        )}
      </div>

      {/* ── Samenvattingkaarten ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: "1.5rem" }}>
        {[
          { label: T.totaalGefactureerd, bedrag: totaalAlle,    kleurBg: "var(--color-background-secondary)", kleurTekst: "var(--color-text-primary)" },
          { label: T.betaald,             bedrag: totaalBetaald, kleurBg: "#eaf3de", kleurTekst: "#27500a" },
          { label: T.openstaand,          bedrag: totaalOpen,    kleurBg: "#fcebeb", kleurTekst: "#a32d2d" },
        ].map(k => (
          <div key={k.label} style={{ background: k.kleurBg, borderRadius: 10, padding: "14px 16px" }}>
            <p style={{ margin: 0, fontSize: fs - 2, color: k.kleurTekst, opacity: 0.75, marginBottom: 4 }}>{k.label}</p>
            <p style={{ margin: 0, fontSize: fs + 6, fontWeight: 600, color: k.kleurTekst }}>{fmt(k.bedrag)}</p>
            <p style={{ margin: "4px 0 0", fontSize: fs - 2, color: k.kleurTekst, opacity: 0.6 }}>
                {gefilterd.filter(o => k.label === T.betaald ? o.betaald : k.label === T.openstaand ? !o.betaald : true).length} document(en)
            </p>
          </div>
        ))}
      </div>

      {/* ── Actiebalk ── */}
      <div style={{ display: "flex", gap: 8, marginBottom: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <select value={filterKlant} onChange={e => setFilterKlant(e.target.value)}
          style={{ padding: "7px 10px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)",
            background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontSize: fs - 1 }}>
          <option value="">Alle klanten</option>
          {klanten.filter(k => (k.offertes || []).length > 0).map(k => (
            <option key={k.id} value={k.id}>{k.naam}</option>
          ))}
        </select>
        <label style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 14px",
          borderRadius:8, border:`1.5px solid ${kleur.hoofd}`,
          background:"var(--color-background-primary)", cursor:"pointer",
          boxShadow:`0 0 0 3px ${kleur.hoofd}22` }}>
          <span style={{ fontSize:fs-2, color:kleur.hoofd, fontWeight:500 }}>📅 Van:</span>
          <input type="date" value={filterVan} onChange={e => setFilterVan(e.target.value)}
            style={{ border:"none", background:"transparent", color:"var(--color-text-primary)",
              fontSize:fs-1, cursor:"pointer", outline:"none", fontWeight:500 }} />
        </label>
        <label style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 14px",
          borderRadius:8, border:`1.5px solid ${kleur.hoofd}`,
          background:"var(--color-background-primary)", cursor:"pointer",
          boxShadow:`0 0 0 3px ${kleur.hoofd}22` }}>
          <span style={{ fontSize:fs-2, color:kleur.hoofd, fontWeight:500 }}>📅 Tot:</span>
          <input type="date" value={filterTot} onChange={e => setFilterTot(e.target.value)}
            style={{ border:"none", background:"transparent", color:"var(--color-text-primary)",
              fontSize:fs-1, cursor:"pointer", outline:"none", fontWeight:500 }} />
        </label>
        <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: `1px solid ${kleur.hoofd}` }}>
          {[{ id: "alle", label: "Alle" }, { id: "open", label: T.openstaand }, { id: "betaald", label: T.betaald }].map(v => (
            <button key={v.id} onClick={() => setFilterBetaald(v.id)} style={{
              padding: "7px 12px", border: "none", cursor: "pointer", fontSize: fs - 2,
              background: filterBetaald === v.id ? kleur.hoofd : "var(--color-background-primary)",
              color: filterBetaald === v.id ? "#fff" : "var(--color-text-primary)"
            }}>{v.label}</button>
          ))}
        </div>
        {(filterKlant || filterVan || filterTot || filterBetaald !== "alle") && (
          <button onClick={() => { setFilterKlant(""); setFilterVan(""); setFilterTot(""); setFilterBetaald("alle"); }}
            style={{ padding: "7px 12px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)",
              background: "none", color: "var(--color-text-secondary)", cursor: "pointer", fontSize: fs - 2 }}>
            ✕ Wis filters
          </button>
        )}
        {/* Kassa bonnen toggle */}
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 12px",
          borderRadius:8, border:`1px solid ${toonKassa?kleur.hoofd:"var(--color-border-secondary)"}`,
          background:toonKassa?kleur.licht:"var(--color-background-primary)", cursor:"pointer" }}
          onClick={()=>setToonKassa(v=>!v)}>
          <span style={{ fontSize:fs-2, color:toonKassa?kleur.donker:"var(--color-text-secondary)" }}>🧾 Kassa bonnen</span>
          <div style={{ width:32,height:18,borderRadius:99,background:toonKassa?kleur.hoofd:"#ccc",position:"relative",transition:"background 0.2s" }}>
            <div style={{ position:"absolute",top:2,left:toonKassa?14:2,width:14,height:14,borderRadius:"50%",background:"#fff",transition:"left 0.2s" }} />
          </div>
        </div>
        {/* Declaraties toggle */}
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 12px",
          borderRadius:8, border:`1px solid ${toonDeclaraties?kleur.hoofd:"var(--color-border-secondary)"}`,
          background:toonDeclaraties?kleur.licht:"var(--color-background-primary)", cursor:"pointer" }}
          onClick={()=>setToonDeclaraties(v=>!v)}>
          <span style={{ fontSize:fs-2, color:toonDeclaraties?kleur.donker:"var(--color-text-secondary)" }}>🧮 Declaraties</span>
          <div style={{ width:32,height:18,borderRadius:99,background:toonDeclaraties?kleur.hoofd:"#ccc",position:"relative",transition:"background 0.2s" }}>
            <div style={{ position:"absolute",top:2,left:toonDeclaraties?14:2,width:14,height:14,borderRadius:"50%",background:"#fff",transition:"left 0.2s" }} />
          </div>
        </div>
        <span style={{ fontSize: fs - 2, color: "var(--color-text-secondary)" }}>
          {gefilterd.length} {gefilterd.length === 1 ? "document" : "documenten"}
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button onClick={() => setBelastingModal(true)}
            style={{ padding: "8px 14px", borderRadius: 8, border: `1px solid ${kleur.hoofd}`,
              background: kleur.licht, color: kleur.donker, cursor: "pointer", fontSize: fs - 1, fontWeight: 500,
              display: "flex", alignItems: "center", gap: 6 }}>
            🧾 Belastingoverzicht
          </button>
          <button onClick={() => setRapportModal(true)}
            style={{ padding: "8px 14px", borderRadius: 8, border: `1px solid ${kleur.hoofd}`,
              background: kleur.licht, color: kleur.donker, cursor: "pointer", fontSize: fs - 1, fontWeight: 500,
              display: "flex", alignItems: "center", gap: 6 }}>
            📬 Rapporten automatisch mailen
          </button>
          <button onClick={() => setExportModal(true)}
            style={{ padding: "8px 14px", borderRadius: 8, border: `1px solid ${kleur.hoofd}`,
              background: kleur.licht, color: kleur.donker, cursor: "pointer", fontSize: fs - 1, fontWeight: 500,
              display: "flex", alignItems: "center", gap: 6 }}>
            📊 Exporteer / Print
          </button>
          <button onClick={() => setLosseFactuurModal(true)}
            style={{ padding: "8px 14px", borderRadius: 8, border: "none",
              background: kleur.hoofd, color: "#fff", cursor: "pointer", fontSize: fs - 1, fontWeight: 500,
              display: "flex", alignItems: "center", gap: 6 }}>
            + Losse factuur
          </button>
        </div>
      </div>

      {/* ── Lijst ── */}
      {gefilterd.length === 0 ? (
        <div style={{ padding: "2rem", textAlign: "center", color: "var(--color-text-secondary)", fontSize: fs - 1,
          border: "0.5px dashed var(--color-border-tertiary)", borderRadius: 12 }}>
          Geen documenten gevonden met de huidige filters.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8,
          overflowY: "auto", maxHeight: "calc(100vh - 420px)",
          paddingRight: 4 }}>
          {gefilterd.map(o => (
            <div key={o.id} style={{
              background: o.isVervallen ? "#fff5f5" : "var(--color-background-primary)",
              border: `0.5px solid ${o.isVervallen ? "#f5a0a0" : o.betaald ? "#c0ddb0" : "var(--color-border-tertiary)"}`,
              borderRadius: 12, padding: "12px 16px",
              display: "flex", alignItems: "center", gap: 14,
              opacity: o.betaald ? 0.75 : 1, transition: "opacity 0.15s"
            }}>
              <button onClick={() => toggleBetaald(o.klant.id, o.id)}
                title={o.betaald ? "Markeer als onbetaald" : "Markeer als betaald"}
                style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  border: `2px solid ${o.betaald ? "#3b6d11" : "var(--color-border-secondary)"}`,
                  background: o.betaald ? "#3b6d11" : "transparent",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 14, transition: "all 0.15s" }}>
                {o.betaald ? "✓" : ""}
              </button>
              <Avatar naam={o.klant.naam} size={36} kleur={kleur} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <p style={{ margin: 0, fontWeight: 500, fontSize: fs }}>{o.klant.naam}</p>
                  <span style={{ fontSize: fs - 2, color: "var(--color-text-secondary)" }}>—</span>
                  <p style={{ margin: 0, fontSize: fs - 1, color: "var(--color-text-secondary)" }}>{o.referentie}</p>
                  {o.factuur && <span style={{ background: "#e6f1fb", color: "#0c447c", fontSize: fs - 3, fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}>FACTUUR</span>}
                  {o.betaald && <span style={{ background: "#eaf3de", color: "#27500a", fontSize: fs - 3, fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}>BETAALD</span>}
                  {o.isVervallen && !o.betaald && <span style={{ background: "#fcebeb", color: "#a32d2d", fontSize: fs - 3, fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}>VERVALLEN</span>}
                </div>
                <p style={{ margin: "2px 0 0", fontSize: fs - 2, color: "var(--color-text-secondary)" }}>
                  {fmtDatum(o.datum)} · {o.regels?.length || 0} regel(s)
                  {o.regels?.length > 0 && <span> · {o.regels.map(r => r.naam).filter(Boolean).slice(0, 2).join(", ")}{o.regels.length > 2 ? ` +${o.regels.length - 2}` : ""}</span>}
                </p>
                {o.laatste_mail_datum && (
                  <p style={{ margin: "2px 0 0", fontSize: fs - 3, color: "var(--color-text-secondary)" }}>
                    📧 Gemaild: {new Date(o.laatste_mail_datum).toLocaleString("nl-NL", {day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}
                  </p>
                )}
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ margin: 0, fontSize: fs + 1, fontWeight: 600, color: o.isVervallen && !o.betaald ? "#a32d2d" : o.betaald ? "#3b6d11" : kleur.hoofd }}>{fmt(o.totaalInclBtw || 0)}</p>
                <p style={{ margin: 0, fontSize: fs - 2, color: "var(--color-text-secondary)" }}>{o.inclBtw ? "incl. BTW" : "excl. BTW"}</p>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:5, flexShrink:0 }}>
                <button onClick={() => { setOpenOfferte(o); setOpenKlant(o.klant); }}
                  style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${kleur.hoofd}`,
                    background: kleur.licht, color: kleur.donker, cursor: "pointer", fontSize: fs - 2, fontWeight: 500 }}>
                  📄 Openen
                </button>
                {!o.betaald && o.klant?.email && o.type !== "kassa" && o.type !== "declaratie" && (
                  <button onClick={async () => {
                      try {
                        await API.stuurOfferteMail(o.id);
                        alert(`Offerte opnieuw verstuurd naar ${o.klant.email}`);
                        await herlaad();
                      } catch(e) { alert("Versturen mislukt: " + e.message); }
                    }}
                    style={{ padding: "5px 10px", borderRadius: 8, border: `1px solid #888`,
                      background: "var(--color-background-secondary)", color: "var(--color-text-secondary)",
                      cursor: "pointer", fontSize: fs - 3, fontWeight: 400 }}>
                    📨 Stuur nogmaals
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Offerte viewer overlay ── */}
      {openOfferte && openKlant && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex",
          alignItems: "flex-start", justifyContent: "center", zIndex: 1000, padding: "1rem", overflowY: "auto" }}
          onClick={e => e.target === e.currentTarget && setOpenOfferte(null)}>
          <div style={{ background: "#f5f5f5", borderRadius: 12, padding: "1rem", width: "100%", maxWidth: 700, marginTop: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: 8 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: fs + 2, fontWeight: 500, color: "#1a1a1a" }}>{openOfferte.referentie}</h2>
                <p style={{ margin: 0, fontSize: fs - 2, color: "#888" }}>{openKlant.naam} · {fmtDatum(openOfferte.datum)}</p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button onClick={() => toggleBetaald(openKlant.id, openOfferte.id)}
                  style={{ padding: "7px 14px", borderRadius: 8, cursor: "pointer", fontSize: fs - 1,
                    background: openOfferte.betaald ? "#eaf3de" : kleur.licht,
                    color: openOfferte.betaald ? "#27500a" : kleur.donker,
                    border: `1px solid ${openOfferte.betaald ? "#3b6d11" : kleur.hoofd}`, fontWeight: 500 }}>
                  {openOfferte.betaald ? "✓ Betaald" : T.markerenAlsBetaald}
                </button>
                <button onClick={() => printOfferteHtml(openOfferte, openKlant)}
                  style={{ padding: "7px 14px", borderRadius: 8, background: kleur.hoofd, color: "#fff", border: "none", cursor: "pointer", fontSize: fs - 1 }}>
                  🖨 Afdrukken / PDF
                </button>
                <button onClick={() => setOpenOfferte(null)}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#666", padding: "4px 8px", lineHeight: 1 }}>×</button>
              </div>
            </div>
            <OffertePreview offerte={openOfferte} klant={openKlant} kleur={kleur} />
          </div>
        </div>
      )}

      {/* ── Losse factuur modal ── */}
      {losseFactuurModal && (
        <Modal title={T.losseFactuurAanmaken} onClose={() => setLosseFactuurModal(false)} fs={fs}>
          <FF label="Klant (zoek bestaande of typ een naam)" fs={fs}>
            <KlantZoekBox klanten={klanten} value={lfKlantId} onChange={id => { setLfKlantId(id); if(id) setLfKlantVrij(""); }} fs={fs} />
          </FF>
          {!lfKlantId && (
            <FF label="Of typ een klantnaam (losse factuur)" fs={fs}>
              <input value={lfKlantVrij} onChange={e => setLfKlantVrij(e.target.value)}
                placeholder="Bijv. Particulier, Eenmalige klant…"
                style={iSt(fs)} />
            </FF>
          )}
          <FF label={T.referentienummer} fs={fs}>
            <input value={lfRef} onChange={e => setLfRef(e.target.value)} style={iSt(fs)} />
          </FF>
          <p style={{ fontSize: fs - 1, fontWeight: 500, color: "var(--color-text-secondary)", margin: "0 0 8px" }}>Regels</p>
          {lfRegels.map(r => (
            <div key={r.id} style={{ display: "grid", gridTemplateColumns: "1fr 100px auto", gap: 8, marginBottom: 8, alignItems: "center" }}>
              <input value={r.naam} onChange={e => lfUpdateRegel(r.id, "naam", e.target.value)}
                placeholder="Omschrijving" style={{ ...iSt(fs), width: "auto" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: fs - 1, color: "#666" }}>€</span>
                <input type="number" value={r.prijs} onChange={e => lfUpdateRegel(r.id, "prijs", e.target.value)}
                  placeholder="0,00" style={{ ...iSt(fs), width: "auto" }} />
              </div>
              {lfRegels.length > 1 && (
                <button onClick={() => lfDelRegel(r.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#a32d2d", fontSize: fs + 2, padding: 0 }}>✕</button>
              )}
            </div>
          ))}
          <button onClick={lfAddRegel} style={{ fontSize: fs - 1, color: kleur.hoofd, background: "none", border: "none", cursor: "pointer", padding: "4px 0", marginBottom: "1rem" }}>
            + Regel toevoegen
          </button>
          <div style={{ padding: "10px 14px", background: "var(--color-background-secondary)", borderRadius: 8, marginBottom: "1rem" }}>
            <Toggle aan={lfInclBtw} onToggle={() => setLfInclBtw(v => !v)} label={T?.btwToevoegen||"BTW (21%) toevoegen"} fs={fs} />
            <p style={{ margin: "8px 0 0", fontSize: fs - 1, color: "var(--color-text-secondary)", textAlign: "right" }}>
              {T.totaal}: <strong style={{ color: kleur.hoofd }}>€{(lfInclBtw ? Math.round(lfRegels.reduce((s,r)=>s+(parseFloat(r.prijs)||0),0)*1.21) : lfRegels.reduce((s,r)=>s+(parseFloat(r.prijs)||0),0)).toLocaleString("nl-NL", {minimumFractionDigits:2})}</strong>
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Btn onClick={() => setLosseFactuurModal(false)} fs={fs}>Annuleren</Btn>
            <Btn variant="primary" onClick={lfSlaOp} kleur={kleur} fs={fs}
              disabled={!lfKlantId && !lfKlantVrij}>
              💾 Factuur aanmaken
            </Btn>
          </div>
        </Modal>
      )}

      {/* ── Export / Print modal ── */}
      {exportModal && (
        <Modal title={T.exportTitel} onClose={() => setExportModal(false)} fs={fs}>
          <p style={{ fontSize: fs - 1, color: "var(--color-text-secondary)", margin: "0 0 1rem" }}>
            Kies de tijdsperiode voor het overzicht. Laat leeg voor alle documenten.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1rem" }}>
            <FF label="Van datum" fs={fs}>
              <input type="date" value={expVan} onChange={e => setExpVan(e.target.value)} style={iSt(fs)} />
            </FF>
            <FF label="Tot datum" fs={fs}>
              <input type="date" value={expTot} onChange={e => setExpTot(e.target.value)} style={iSt(fs)} />
            </FF>
          </div>
          <div style={{ background: "var(--color-background-secondary)", borderRadius: 10, padding: "12px 14px", marginBottom: "1.25rem" }}>
            <p style={{ margin: "0 0 4px", fontSize: fs - 1, fontWeight: 500 }}>Samenvatting voor geselecteerde periode</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginTop: 8 }}>
              {[
                { l: "Documenten", v: exportGefilterd.length },
                { l: "Totaal",     v: "€"+expTotaal.toLocaleString("nl-NL",{minimumFractionDigits:2}) },
                { l: T.betaald,    v: "€"+expBetaald.toLocaleString("nl-NL",{minimumFractionDigits:2}) },
              ].map(x => (
                <div key={x.l} style={{ textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: fs - 2, color: "var(--color-text-secondary)" }}>{x.l}</p>
                  <p style={{ margin: 0, fontSize: fs + 2, fontWeight: 600 }}>{x.v}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", flexWrap: "wrap" }}>
            <Btn onClick={() => setExportModal(false)} fs={fs}>Annuleren</Btn>
            <button onClick={doMail}
              style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid ${kleur.hoofd}`,
                background: kleur.licht, color: kleur.donker, cursor: "pointer", fontSize: fs,
                display: "flex", alignItems: "center", gap: 6 }}>
              ✉ Mailen naar mijn mailadres
            </button>
            <Btn variant="primary" onClick={doPrint} kleur={kleur} fs={fs}>🖨 Afdrukken</Btn>
          </div>
        </Modal>
      )}

      {/* ── Rapport instellingen modal ── */}
      {rapportModal && (
        <Modal title="📬 Rapporten automatisch mailen" onClose={()=>{ setRapportModal(false); setRapportOpgeslagen(false); }} fs={fs}>
          <p style={{ fontSize:fs-1, color:"var(--color-text-secondary)", margin:"0 0 1.25rem", lineHeight:1.6 }}>
            Ontvang automatisch een financieel rapport op uw e-mailadres. U kunt kiezen hoe vaak en wat er gestuurd wordt.
          </p>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"10px 14px", background:"var(--color-background-secondary)", borderRadius:10, marginBottom:"1rem" }}>
            <span style={{ fontSize:fs, fontWeight:500 }}>Automatisch mailen</span>
            <div onClick={()=>setRapportForm(f=>({...f,actief:!f.actief}))}
              style={{ width:44, height:24, borderRadius:99, cursor:"pointer",
                background: rapportForm.actief ? kleur.hoofd : "#ccc", position:"relative", transition:"background 0.2s" }}>
              <div style={{ position:"absolute", top:3, left: rapportForm.actief ? 22 : 3,
                width:18, height:18, borderRadius:"50%", background:"#fff", transition:"left 0.2s",
                boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }} />
            </div>
          </div>
          {rapportForm.actief && (<>
            <FF label="Hoe vaak?" fs={fs}>
              <div style={{ display:"flex", gap:8 }}>
                {[{id:"dag",label:"📅 Dagelijks"},{id:"week",label:"📆 Wekelijks"},{id:"maand",label:"🗓 Maandelijks"}].map(f=>(
                  <button key={f.id} onClick={()=>setRapportForm(p=>({...p,frequentie:f.id}))}
                    style={{ flex:1, padding:"8px", borderRadius:8, cursor:"pointer", fontSize:fs-1,
                      border:`1.5px solid ${rapportForm.frequentie===f.id ? kleur.hoofd : "var(--color-border-secondary)"}`,
                      background: rapportForm.frequentie===f.id ? kleur.licht : "var(--color-background-primary)",
                      color: rapportForm.frequentie===f.id ? kleur.donker : "var(--color-text-secondary)",
                      fontWeight: rapportForm.frequentie===f.id ? 500 : 400 }}>
                    {f.label}
                  </button>
                ))}
              </div>
              {/* Uitleg per frequentie */}
              {rapportForm.frequentie === 'dag' && (
                <div style={{ marginTop:8, padding:"10px 12px", borderRadius:8,
                  background:"#f0f4ff", border:"1px solid #c5d0f5", fontSize:fs-2 }}>
                  <p style={{ margin:0, fontWeight:500, color:"#2a4ab5" }}>📋 Wat u ontvangt:</p>
                  <p style={{ margin:"4px 0 0", color:"#444", lineHeight:1.5 }}>
                    Elke ochtend om 07:00 een overzicht van alle documenten van <strong>gisteren</strong>.<br/>
                    Voorbeeld: op dinsdag ontvangt u de data van maandag.
                  </p>
                </div>
              )}
              {rapportForm.frequentie === 'week' && (
                <div style={{ marginTop:8, padding:"10px 12px", borderRadius:8,
                  background:"#f0f4ff", border:"1px solid #c5d0f5", fontSize:fs-2 }}>
                  <p style={{ margin:0, fontWeight:500, color:"#2a4ab5" }}>📋 Wat u ontvangt:</p>
                  <p style={{ margin:"4px 0 0", color:"#444", lineHeight:1.5 }}>
                    Op de door u gekozen dag een overzicht van de <strong>afgelopen 7 dagen</strong>.<br/>
                    Voorbeeld: elke maandag ontvangt u de data van maandag t/m zondag.
                  </p>
                </div>
              )}
              {rapportForm.frequentie === 'maand' && (
                <div style={{ marginTop:8, padding:"10px 12px", borderRadius:8,
                  background:"#f0f4ff", border:"1px solid #c5d0f5", fontSize:fs-2 }}>
                  <p style={{ margin:0, fontWeight:500, color:"#2a4ab5" }}>📋 Wat u ontvangt:</p>
                  <p style={{ margin:"4px 0 0", color:"#444", lineHeight:1.5 }}>
                    Op de gekozen dag een overzicht van de <strong>volledige vorige kalendermaand</strong>.<br/>
                    Voorbeeld: op 1 juni ontvangt u alle data van mei.
                  </p>
                </div>
              )}
            </FF>
            {rapportForm.frequentie === 'week' && (
              <FF label="Op welke dag?" fs={fs}>
                <div style={{ display:"flex", gap:6 }}>
                  {["Ma","Di","Wo","Do","Vr","Za","Zo"].map((d,i)=>(
                    <button key={i} onClick={()=>setRapportForm(p=>({...p,dag_van_week:i+1}))}
                      style={{ width:40, height:36, borderRadius:8, cursor:"pointer", fontSize:fs-2,
                        border:`1.5px solid ${rapportForm.dag_van_week===i+1 ? kleur.hoofd : "var(--color-border-secondary)"}`,
                        background: rapportForm.dag_van_week===i+1 ? kleur.hoofd : "var(--color-background-primary)",
                        color: rapportForm.dag_van_week===i+1 ? "#fff" : "var(--color-text-secondary)",
                        fontWeight: rapportForm.dag_van_week===i+1 ? 600 : 400 }}>
                      {d}
                    </button>
                  ))}
                </div>
              </FF>
            )}
            {rapportForm.frequentie === 'maand' && (
              <FF label="Op welke dag van de maand?" fs={fs}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <input type="number" min={1} max={28} value={rapportForm.dag_van_maand}
                    onChange={e=>setRapportForm(p=>({...p,dag_van_maand:parseInt(e.target.value)||1}))}
                    style={{...iSt(fs), width:70}} />
                  <span style={{ fontSize:fs-2, color:"var(--color-text-secondary)" }}>van de maand (max. 28)</span>
                </div>
              </FF>
            )}
            <FF label="Wat wilt u ontvangen?" fs={fs}>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {[
                  { id:"alle",       label:"📄 Alle facturen en offertes",           omschr:"Compleet overzicht van zowel betaalde als openstaande documenten in de periode." },
                  { id:"betaald",    label:"✅ Alleen betaalde facturen/offertes",    omschr:"Overzicht van alle betalingen die in de periode zijn ontvangen." },
                  { id:"openstaand", label:"⏳ Alleen openstaande facturen/offertes", omschr:"Overzicht van alle documenten die nog niet betaald zijn, ongeacht de aanmaakdatum." },
                ].map(o=>(
                  <div key={o.id} onClick={()=>setRapportForm(p=>({...p,inhoud:o.id}))}
                    style={{ padding:"10px 14px", borderRadius:10, cursor:"pointer",
                      border:`1.5px solid ${rapportForm.inhoud===o.id ? kleur.hoofd : "var(--color-border-secondary)"}`,
                      background: rapportForm.inhoud===o.id ? kleur.licht : "var(--color-background-primary)" }}>
                    <p style={{ margin:0, fontSize:fs-1, fontWeight:500,
                      color: rapportForm.inhoud===o.id ? kleur.donker : "var(--color-text-primary)" }}>{o.label}</p>
                    <p style={{ margin:"2px 0 0", fontSize:fs-2, color:"var(--color-text-secondary)" }}>{o.omschr}</p>
                  </div>
                ))}
              </div>
            </FF>
          </>)}
          {/* Kassa bonnen meesturen */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"10px 14px", background:"var(--color-background-secondary)", borderRadius:10, marginBottom:"0.5rem" }}>
            <div>
              <p style={{ margin:0, fontSize:fs-1, fontWeight:500 }}>🧾 Kassa bonnen meesturen</p>
              <p style={{ margin:"2px 0 0", fontSize:fs-2, color:"var(--color-text-secondary)" }}>Voeg ook losse kassa transacties toe aan het rapport</p>
            </div>
            <div onClick={()=>setRapportForm(f=>({...f,incl_kassa:!f.incl_kassa}))}
              style={{ width:44, height:24, borderRadius:99, cursor:"pointer", flexShrink:0,
                background: rapportForm.incl_kassa ? kleur.hoofd : "#ccc",
                position:"relative", transition:"background 0.2s", marginLeft:12 }}>
              <div style={{ position:"absolute", top:3, left: rapportForm.incl_kassa ? 22 : 3,
                width:18, height:18, borderRadius:"50%", background:"#fff", transition:"left 0.2s" }} />
            </div>
          </div>

          {rapportOpgeslagen && (            <p style={{ padding:"8px 12px", borderRadius:8, background:"#eaf3de",
              color:"#27500a", fontSize:fs-1, margin:"0.5rem 0" }}>
              ✓ Instellingen opgeslagen! Rapporten worden om 07:00 verstuurd.
            </p>
          )}
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:"1rem" }}>
            <Btn onClick={()=>{ setRapportModal(false); setRapportOpgeslagen(false); }} fs={fs}>Sluiten</Btn>
            <Btn variant="primary" onClick={async ()=>{
              if (isDemoMode) { setRapportOpgeslagen(true); return; }
              try {
                await API.slaRapportInstellingOp(rapportForm);
                setRapportOpgeslagen(true);
              } catch(e) { alert("Opslaan mislukt: "+e.message); }
            }} kleur={kleur} fs={fs}>💾 Opslaan</Btn>
          </div>
        </Modal>
      )}

      {belastingModal && (
        <BelastingOverzichtModal onClose={()=>setBelastingModal(false)} kleur={kleur} fs={fs} isDemoMode={isDemoMode} T={T} />
      )}
    </div>
  );
}

// ── BELASTINGOVERZICHT MODAL ──────────────────────────────────
function BelastingOverzichtModal({ onClose, kleur, fs, isDemoMode, T }) {
  const huidigJaar = new Date().getFullYear();
  const [modus, setModus] = useState("kwartaal"); // kwartaal | vrij
  const [jaar, setJaar] = useState(huidigJaar);
  const [kwartaal, setKwartaal] = useState(Math.ceil((new Date().getMonth()+1)/3));
  const [vanDatum, setVanDatum] = useState(`${huidigJaar}-01-01`);
  const [totDatum, setTotDatum] = useState(new Date().toISOString().slice(0,10));
  const [data, setData] = useState(null);
  const [laden, setLaden] = useState(false);
  const [fout, setFout] = useState("");

  const kwartaalRanges = {
    1: [`${jaar}-01-01`, `${jaar}-03-31`],
    2: [`${jaar}-04-01`, `${jaar}-06-30`],
    3: [`${jaar}-07-01`, `${jaar}-09-30`],
    4: [`${jaar}-10-01`, `${jaar}-12-31`],
  };

  const fmt = n => "€" + parseFloat(n||0).toLocaleString("nl-NL",{minimumFractionDigits:2});

  async function genereer() {
    setLaden(true); setFout(""); setData(null);
    const [van, tot] = modus === "kwartaal" ? kwartaalRanges[kwartaal] : [vanDatum, totDatum];
    try {
      if (isDemoMode) {
        setFout("Belastingoverzicht is niet beschikbaar in demo modus.");
        return;
      }
      const result = await API.haalBelastingOverzichtOp(van, tot);
      setData(result);
    } catch(e) { setFout(e.message || "Ophalen mislukt."); }
    finally { setLaden(false); }
  }

  function printOverzicht() {
    if (!data) return;
    const periodeLabel = modus === "kwartaal" ? `Q${kwartaal} ${jaar}` : `${data.periode.van} t/m ${data.periode.tot}`;
    const script = "<scr"+"ipt>window.onload=()=>{window.print();window.onafterprint=()=>window.close();}<\/scr"+"ipt>";
    const catRijen = Object.entries(data.kosten.per_categorie).map(([cat,bedrag]) =>
      `<tr><td style="padding:6px 10px;border-bottom:1px solid #eee">${cat}</td><td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right">${fmt(bedrag)}</td></tr>`
    ).join('');
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
      body{font-family:Arial,sans-serif;font-size:13px;margin:0;padding:32px;color:#1a1a1a}
      h1{font-size:22px;color:#185FA5;margin:0 0 4px}
      .sub{color:#666;font-size:13px;margin:0 0 24px}
      h2{font-size:15px;color:#185FA5;margin:24px 0 10px;border-bottom:2px solid #185FA5;padding-bottom:4px}
      table{width:100%;border-collapse:collapse;margin-bottom:8px}
      td{padding:6px 10px;font-size:13px}
      .rij{border-bottom:1px solid #eee}
      .totaal{font-weight:bold;font-size:14px;background:#e8f0fb}
      .saldo{font-weight:bold;font-size:16px;padding:14px;border-radius:8px;margin-top:8px}
      .pos{background:#fcebeb;color:#a32d2d}
      .neg{background:#eaf3de;color:#27500a}
      .footer{margin-top:30px;font-size:11px;color:#888}
      @media print{body{padding:16px}}
    </style></head><body>
    <h1>Belastingoverzicht</h1>
    <p class="sub">Periode: ${periodeLabel} (${data.periode.van} t/m ${data.periode.tot})</p>

    <h2>1. Omzet</h2>
    <table>
      <tr class="rij"><td>Omzet 21% btw (excl.)</td><td style="text-align:right">${fmt(data.omzet.omzet_21_excl)}</td></tr>
      <tr class="rij"><td>Btw over omzet (rubriek 1)</td><td style="text-align:right">${fmt(data.omzet.btw_over_omzet)}</td></tr>
      <tr class="rij"><td>Omzet vrijgesteld/0%</td><td style="text-align:right">${fmt(data.omzet.omzet_vrijgesteld)}</td></tr>
      <tr class="totaal"><td>Totaal omzet excl. btw</td><td style="text-align:right">${fmt(data.omzet.totaal_omzet_excl)}</td></tr>
      <tr class="totaal"><td>Totaal omzet incl. btw</td><td style="text-align:right">${fmt(data.omzet.totaal_omzet_incl)}</td></tr>
    </table>
    <p style="font-size:11px;color:#888">${data.omzet.aantal_documenten} betaalde document(en) in deze periode</p>

    <h2>2. Kosten / Voorbelasting</h2>
    <table>
      <tr class="rij"><td>Totaal kosten excl. btw</td><td style="text-align:right">${fmt(data.kosten.totaal_kosten_excl)}</td></tr>
      <tr class="rij"><td>Totaal kosten incl. btw</td><td style="text-align:right">${fmt(data.kosten.totaal_kosten_incl)}</td></tr>
      <tr class="totaal"><td>Voorbelasting (rubriek 5b, aftrekbaar)</td><td style="text-align:right">${fmt(data.kosten.totaal_voorbelasting)}</td></tr>
    </table>
    ${catRijen ? `<p style="font-size:12px;font-weight:600;margin-top:12px">Kosten per categorie:</p><table>${catRijen}</table>` : ''}
    <p style="font-size:11px;color:#888">${data.kosten.aantal_declaraties} declaratie(s) in deze periode</p>

    <h2>3. Btw-aangifte (samenvatting)</h2>
    <table>
      <tr class="rij"><td>Verschuldigde btw (rubriek 1)</td><td style="text-align:right">${fmt(data.btw.verschuldigd)}</td></tr>
      <tr class="rij"><td>Voorbelasting (rubriek 5b)</td><td style="text-align:right">−${fmt(data.btw.voorbelasting)}</td></tr>
    </table>
    <div class="saldo ${data.btw.saldo >= 0 ? 'pos' : 'neg'}">
      ${data.btw.saldo >= 0 ? 'Te betalen aan Belastingdienst' : 'Terug te ontvangen van Belastingdienst'}: ${fmt(Math.abs(data.btw.saldo))}
    </div>

    <h2>4. Resultaat (winst/verlies)</h2>
    <table>
      <tr class="rij"><td>Omzet excl. btw</td><td style="text-align:right">${fmt(data.resultaat.omzet_excl)}</td></tr>
      <tr class="rij"><td>Kosten excl. btw</td><td style="text-align:right">−${fmt(data.resultaat.kosten_excl)}</td></tr>
      <tr class="totaal"><td>Netto resultaat</td><td style="text-align:right">${fmt(data.resultaat.netto_resultaat)}</td></tr>
    </table>

    <p class="footer">Dit overzicht is automatisch gegenereerd door DenCRM op basis van geregistreerde offertes, kassabonnen en declaraties.
    Afschrijvingen en overige fiscale correcties zijn hierin niet meegenomen. Raadpleeg uw boekhouder of de Belastingdienst voor de definitieve aangifte.</p>
    ${script}
    </body></html>`;
    const w = window.open('', '_blank', 'width=800,height=900');
    w.document.write(html); w.document.close();
  }

  return (
    <Modal title={T?.belastingoverzicht||"🧾 Belastingoverzicht"} onClose={onClose} fs={fs}>
      <p style={{ fontSize:fs-1, color:"var(--color-text-secondary)", margin:"0 0 1rem" }}>
        Genereer een overzicht van omzet, kosten, btw-saldo en resultaat voor een gekozen periode.
        Handig als basis voor uw btw-aangifte of jaarrekening.
      </p>

      <FF label="Periode kiezen" fs={fs}>
        <div style={{ display:"flex", gap:8, marginBottom:8 }}>
          <button onClick={()=>setModus("kwartaal")}
            style={{ flex:1, padding:"8px", borderRadius:8, cursor:"pointer", fontSize:fs-1,
              border:`1.5px solid ${modus==="kwartaal"?kleur.hoofd:"var(--color-border-secondary)"}`,
              background: modus==="kwartaal" ? kleur.hoofd : "var(--color-background-primary)",
              color: modus==="kwartaal" ? "#fff" : "var(--color-text-secondary)" }}>
            📅 Per kwartaal
          </button>
          <button onClick={()=>setModus("vrij")}
            style={{ flex:1, padding:"8px", borderRadius:8, cursor:"pointer", fontSize:fs-1,
              border:`1.5px solid ${modus==="vrij"?kleur.hoofd:"var(--color-border-secondary)"}`,
              background: modus==="vrij" ? kleur.hoofd : "var(--color-background-primary)",
              color: modus==="vrij" ? "#fff" : "var(--color-text-secondary)" }}>
            🗓 Vrije periode
          </button>
        </div>

        {modus === "kwartaal" ? (
          <div style={{ display:"flex", gap:8 }}>
            <select value={jaar} onChange={e=>setJaar(parseInt(e.target.value))} style={iSt(fs)}>
              {[huidigJaar, huidigJaar-1, huidigJaar-2].map(j => <option key={j} value={j}>{j}</option>)}
            </select>
            <div style={{ display:"flex", gap:4, flex:1 }}>
              {[1,2,3,4].map(q => (
                <button key={q} onClick={()=>setKwartaal(q)}
                  style={{ flex:1, padding:"8px", borderRadius:8, cursor:"pointer", fontSize:fs-1,
                    border:`1.5px solid ${kwartaal===q?kleur.hoofd:"var(--color-border-secondary)"}`,
                    background: kwartaal===q ? kleur.hoofd : "var(--color-background-primary)",
                    color: kwartaal===q ? "#fff" : "var(--color-text-secondary)" }}>
                  Q{q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            <div>
              <label style={{ fontSize:fs-2, color:"var(--color-text-secondary)" }}>Van</label>
              <input type="date" value={vanDatum} onChange={e=>setVanDatum(e.target.value)} style={iSt(fs)} />
            </div>
            <div>
              <label style={{ fontSize:fs-2, color:"var(--color-text-secondary)" }}>Tot</label>
              <input type="date" value={totDatum} onChange={e=>setTotDatum(e.target.value)} style={iSt(fs)} />
            </div>
          </div>
        )}
      </FF>

      <Btn variant="primary" onClick={genereer} kleur={kleur} fs={fs} disabled={laden}>
        {laden ? "Bezig…" : T?.genereer||"📊 Genereer overzicht"}
      </Btn>

      {fout && <p style={{ margin:"1rem 0 0", padding:"10px 14px", borderRadius:8,
        background:"#fcebeb", color:"#a32d2d", fontSize:fs-1 }}>{fout}</p>}

      {data && (
        <div style={{ marginTop:"1.25rem" }}>
          {/* Omzet */}
          <div style={{ background:"var(--color-background-secondary)", borderRadius:10, padding:"14px", marginBottom:10 }}>
            <p style={{ margin:"0 0 8px", fontSize:fs-1, fontWeight:600, color:kleur.hoofd }}>1. Omzet</p>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:fs-2, marginBottom:4 }}>
              <span>Omzet 21% excl.</span><span>{fmt(data.omzet.omzet_21_excl)}</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:fs-2, marginBottom:4 }}>
              <span>Btw over omzet</span><span>{fmt(data.omzet.btw_over_omzet)}</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:fs-2, marginBottom:4 }}>
              <span>Vrijgesteld/0%</span><span>{fmt(data.omzet.omzet_vrijgesteld)}</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:fs, fontWeight:700, borderTop:"1px solid var(--color-border-tertiary)", paddingTop:6, marginTop:6 }}>
              <span>Totaal incl. btw</span><span style={{ color:kleur.hoofd }}>{fmt(data.omzet.totaal_omzet_incl)}</span>
            </div>
          </div>

          {/* Kosten */}
          <div style={{ background:"var(--color-background-secondary)", borderRadius:10, padding:"14px", marginBottom:10 }}>
            <p style={{ margin:"0 0 8px", fontSize:fs-1, fontWeight:600, color:kleur.hoofd }}>2. Kosten / Voorbelasting</p>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:fs-2, marginBottom:4 }}>
              <span>Kosten excl. btw</span><span>{fmt(data.kosten.totaal_kosten_excl)}</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:fs, fontWeight:700, borderTop:"1px solid var(--color-border-tertiary)", paddingTop:6, marginTop:6 }}>
              <span>Voorbelasting (aftrekbaar)</span><span style={{ color:kleur.hoofd }}>{fmt(data.kosten.totaal_voorbelasting)}</span>
            </div>
          </div>

          {/* Afschrijvingen */}
          {data.afschrijvingen?.totaal > 0 && (
            <div style={{ background:"var(--color-background-secondary)", borderRadius:10, padding:"14px", marginBottom:10 }}>
              <p style={{ margin:"0 0 8px", fontSize:fs-1, fontWeight:600, color:kleur.hoofd }}>2b. Afschrijvingen in deze periode</p>
              {data.afschrijvingen.details.map((a,i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", fontSize:fs-2, marginBottom:4 }}>
                  <span>{a.naam}</span><span>{fmt(a.bedrag)}</span>
                </div>
              ))}
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:fs, fontWeight:700, borderTop:"1px solid var(--color-border-tertiary)", paddingTop:6, marginTop:6 }}>
                <span>Totaal afschrijvingen</span><span style={{ color:kleur.hoofd }}>{fmt(data.afschrijvingen.totaal)}</span>
              </div>
            </div>
          )}

          {/* Btw saldo */}
          <div style={{ background: data.btw.saldo >= 0 ? "#fcebeb" : "#eaf3de", borderRadius:10, padding:"14px", marginBottom:10 }}>
            <p style={{ margin:"0 0 4px", fontSize:fs-1, fontWeight:600, color: data.btw.saldo >= 0 ? "#a32d2d" : "#27500a" }}>
              3. Btw-saldo
            </p>
            <p style={{ margin:0, fontSize:fs+2, fontWeight:700, color: data.btw.saldo >= 0 ? "#a32d2d" : "#27500a" }}>
              {data.btw.saldo >= 0 ? (T?.teBetalen||"Te betalen") + ": " : (T?.teOntvangen||"Terug te ontvangen") + ": "}{fmt(Math.abs(data.btw.saldo))}
            </p>
          </div>

          {/* Resultaat */}
          <div style={{ background:kleur.licht, borderRadius:10, padding:"14px" }}>
            <p style={{ margin:"0 0 8px", fontSize:fs-1, fontWeight:600, color:kleur.donker }}>4. Netto resultaat</p>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:fs-2, marginBottom:4, color:kleur.donker }}>
              <span>Omzet excl. btw</span><span>{fmt(data.resultaat.omzet_excl)}</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:fs-2, marginBottom:4, color:kleur.donker }}>
              <span>− Kosten excl. btw</span><span>{fmt(data.resultaat.kosten_excl)}</span>
            </div>
            {data.resultaat.afschrijvingen > 0 && (
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:fs-2, marginBottom:4, color:kleur.donker }}>
                <span>− Afschrijvingen</span><span>{fmt(data.resultaat.afschrijvingen)}</span>
              </div>
            )}
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:fs+2, fontWeight:700, borderTop:`1px solid ${kleur.hoofd}44`, paddingTop:6, marginTop:6 }}>
              <span style={{ color:kleur.donker }}>Netto resultaat</span>
              <span style={{ color:kleur.donker }}>{fmt(data.resultaat.netto_resultaat)}</span>
            </div>
          </div>

          <p style={{ fontSize:fs-3, color:"var(--color-text-secondary)", marginTop:10, lineHeight:1.5 }}>
            ℹ Afschrijvingen en overige fiscale correcties zijn hierin niet meegenomen. Raadpleeg uw boekhouder
            of de Belastingdienst voor de definitieve aangifte.
          </p>

          <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:"1.25rem" }}>
            <Btn onClick={onClose} fs={fs}>Sluiten</Btn>
            <Btn variant="primary" onClick={printOverzicht} kleur={kleur} fs={fs}>🖨 Afdrukken / PDF</Btn>
          </div>
        </div>
      )}
    </Modal>
  );
}

function KoppelAccountsPanel({ kleur, fs, onClose }) {
  const [data, setData] = useState({ uitnodigingen:[], gekoppeld:[] });
  const [laden, setLaden] = useState(true);
  const [uitnodigModal, setUitnodigModal] = useState(false);
  const [email, setEmail] = useState("");
  const [naam, setNaam] = useState("");
  const [gekozenModules, setGekozenModules] = useState([]);
  const [versturen, setVersturen] = useState(false);
  const [fout, setFout] = useState("");

  const ALLE_MODULES = [
    { id:"kassa",       label:"🧾 Kassa" },
    { id:"werkbonnen",  label:"🔧 Werkbonnen & Reparaties" },
    { id:"klanten",     label:"👥 Klanten" },
    { id:"producten",   label:"📦 Producten" },
    { id:"agenda",      label:"📅 Agenda" },
    { id:"offertes",    label:"📄 Offertes & Facturen" },
    { id:"financieel",  label:"💶 Financieel overzicht" },
    { id:"declaraties", label:"🧮 Declaraties & Boekhouding" },
    { id:"contact",     label:"💬 Contact" },
  ];

  useEffect(() => { laad(); }, []);

  async function laad() {
    setLaden(true);
    try { setData(await API.haalKoppelAccountsOp()); }
    catch(e) { console.error(e); }
    finally { setLaden(false); }
  }

  function toggleModule(id) {
    setGekozenModules(prev => prev.includes(id) ? prev.filter(m=>m!==id) : [...prev, id]);
  }

  async function verstuurUitnodiging() {
    setFout("");
    if (!email || !email.includes("@")) { setFout("Vul een geldig e-mailadres in."); return; }
    if (gekozenModules.length === 0) { setFout("Kies minimaal 1 module."); return; }
    setVersturen(true);
    try {
      await API.nodigGebruikerUit({ email, naam, modules: gekozenModules });
      setUitnodigModal(false); setEmail(""); setNaam(""); setGekozenModules([]);
      await laad();
    } catch(e) { setFout(e.message || "Versturen mislukt."); }
    finally { setVersturen(false); }
  }

  async function trekIn(id) {
    if (!confirm("Deze uitnodiging intrekken?")) return;
    try { await API.trekUitnodigingIn(id); await laad(); }
    catch(e) { alert("Intrekken mislukt: "+e.message); }
  }

  async function toggleGekoppeldeModule(gebruiker, moduleId) {
    const huidig = (gebruiker.toegestane_modules || "").split(",").filter(Boolean);
    const nieuw = huidig.includes(moduleId) ? huidig.filter(m=>m!==moduleId) : [...huidig, moduleId];
    try {
      await API.updateGekoppeldeModules(gebruiker.id, nieuw);
      await laad();
    } catch(e) { alert("Bijwerken mislukt: "+e.message); }
  }

  async function verwijderGekoppeld(id) {
    if (!confirm("Deze gebruiker de toegang ontnemen? Het account blijft bestaan maar kan niet meer inloggen op uw gegevens.")) return;
    try { await API.verwijderGekoppeldeGebruiker(id); await laad(); }
    catch(e) { alert("Verwijderen mislukt: "+e.message); }
  }

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:1000,
      display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}
      onClick={e=>e.target===e.currentTarget && onClose()}>
      <div style={{ background:"#fff", borderRadius:16, padding:"2rem", width:"100%", maxWidth:640,
        maxHeight:"85vh", overflowY:"auto", boxShadow:"0 16px 48px rgba(0,0,0,0.25)" }}>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1rem" }}>
          <div>
            <h2 style={{ margin:0, fontSize:20, color:"#1a1a1a" }}>👥 Koppel accounts</h2>
            <p style={{ margin:"4px 0 0", fontSize:13, color:"#666" }}>
              Nodig collega's of medewerkers uit om samen te werken in uw DenCRM-omgeving.
            </p>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", fontSize:22, color:"#666" }}>×</button>
        </div>

        <button onClick={()=>setUitnodigModal(true)}
          style={{ width:"100%", padding:"11px", borderRadius:10, background:kleur.hoofd, color:"#fff",
            border:"none", cursor:"pointer", fontSize:14, fontWeight:600, marginBottom:"1.5rem" }}>
          + Gebruiker uitnodigen
        </button>

        {laden ? <p style={{ color:"#888", fontSize:13 }}>Laden…</p> : (
          <>
            {/* Gekoppelde gebruikers */}
            <p style={{ fontSize:12, fontWeight:600, color:"#666", letterSpacing:"0.05em", margin:"0 0 8px" }}>
              GEKOPPELDE GEBRUIKERS ({data.gekoppeld.length})
            </p>
            {data.gekoppeld.length === 0 && <p style={{ fontSize:13, color:"#aaa", marginBottom:"1.5rem" }}>Nog geen gekoppelde gebruikers.</p>}
            {data.gekoppeld.map(g => {
              const modules = (g.toegestane_modules || "").split(",").filter(Boolean);
              return (
                <div key={g.id} style={{ border:"1px solid #eee", borderRadius:10, padding:"12px 14px", marginBottom:8 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                    <div>
                      <p style={{ margin:0, fontWeight:500, fontSize:14 }}>{g.naam} <span style={{ color:"#999", fontWeight:400 }}>({g.username})</span></p>
                      <p style={{ margin:"2px 0 0", fontSize:12, color:"#888" }}>{g.email}</p>
                    </div>
                    <button onClick={()=>verwijderGekoppeld(g.id)}
                      style={{ padding:"5px 10px", borderRadius:6, background:"#fcebeb", color:"#a32d2d",
                        border:"none", cursor:"pointer", fontSize:12 }}>
                      Toegang intrekken
                    </button>
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                    {ALLE_MODULES.map(m => {
                      const aan = modules.includes(m.id);
                      return (
                        <button key={m.id} onClick={()=>toggleGekoppeldeModule(g, m.id)}
                          style={{ fontSize:11, padding:"3px 9px", borderRadius:99, cursor:"pointer", border:"none",
                            background: aan ? kleur.hoofd : "#f0f0f0", color: aan ? "#fff" : "#999" }}>
                          {m.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Open uitnodigingen */}
            {data.uitnodigingen.filter(u=>u.status==="open").length > 0 && (
              <>
                <p style={{ fontSize:12, fontWeight:600, color:"#666", letterSpacing:"0.05em", margin:"1.5rem 0 8px" }}>
                  OPEN UITNODIGINGEN
                </p>
                {data.uitnodigingen.filter(u=>u.status==="open").map(u => (
                  <div key={u.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                    border:"1px dashed #ddd", borderRadius:10, padding:"10px 14px", marginBottom:6 }}>
                    <div>
                      <p style={{ margin:0, fontSize:13, fontWeight:500 }}>{u.email}</p>
                      <p style={{ margin:"2px 0 0", fontSize:11, color:"#aaa" }}>
                        Verstuurd {new Date(u.aangemaakt_op).toLocaleDateString("nl-NL")} · vervalt {new Date(u.vervalt_op).toLocaleDateString("nl-NL")}
                      </p>
                    </div>
                    <button onClick={()=>trekIn(u.id)}
                      style={{ padding:"4px 10px", borderRadius:6, background:"#f5f5f5", color:"#888",
                        border:"none", cursor:"pointer", fontSize:12 }}>
                      Intrekken
                    </button>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>

      {/* Uitnodig modal */}
      {uitnodigModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:1100,
          display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}
          onClick={e=>e.target===e.currentTarget && setUitnodigModal(false)}>
          <div style={{ background:"#fff", borderRadius:16, padding:"1.75rem", width:"100%", maxWidth:440 }}>
            <h3 style={{ margin:"0 0 1rem", fontSize:17 }}>Gebruiker uitnodigen</h3>
            <div style={{ marginBottom:10 }}>
              <label style={{ fontSize:12, color:"#666", fontWeight:500 }}>E-mailadres</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="collega@bedrijf.nl"
                style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #ddd", fontSize:14, marginTop:4, boxSizing:"border-box" }} />
            </div>
            <div style={{ marginBottom:12 }}>
              <label style={{ fontSize:12, color:"#666", fontWeight:500 }}>Naam (optioneel)</label>
              <input value={naam} onChange={e=>setNaam(e.target.value)}
                style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #ddd", fontSize:14, marginTop:4, boxSizing:"border-box" }} />
            </div>
            <label style={{ fontSize:12, color:"#666", fontWeight:500 }}>Welke modules mag deze gebruiker zien?</label>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, margin:"6px 0 14px" }}>
              {ALLE_MODULES.map(m => {
                const aan = gekozenModules.includes(m.id);
                return (
                  <button key={m.id} onClick={()=>toggleModule(m.id)}
                    style={{ fontSize:12, padding:"5px 11px", borderRadius:99, cursor:"pointer",
                      border: aan ? `1px solid ${kleur.hoofd}` : "1px solid #ddd",
                      background: aan ? kleur.hoofd : "#fafafa", color: aan ? "#fff" : "#666" }}>
                    {m.label}
                  </button>
                );
              })}
            </div>
            {fout && <p style={{ color:"#a32d2d", fontSize:12, background:"#fcebeb", padding:"7px 10px", borderRadius:6, marginBottom:10 }}>{fout}</p>}
            <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
              <button onClick={()=>setUitnodigModal(false)}
                style={{ padding:"9px 16px", borderRadius:8, background:"#f5f5f5", border:"none", cursor:"pointer", fontSize:13 }}>
                Annuleren
              </button>
              <button onClick={verstuurUitnodiging} disabled={versturen}
                style={{ padding:"9px 16px", borderRadius:8, background:kleur.hoofd, color:"#fff",
                  border:"none", cursor:"pointer", fontSize:13, fontWeight:600, opacity:versturen?0.7:1 }}>
                {versturen ? "Bezig…" : "Uitnodiging versturen"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InstellingenPanel({ kleur, kleurIdx, setKleurIdx, fs, setFs, bgIdx, setBgIdx, taal, setTaal, T, onClose, modulesAan, setModulesAan, lidmaatschapTot, isAdmin, isGekoppeld, toegestaneModules, onOpenKoppelAccounts }) {
  const [modulesOpen, setModulesOpen] = useState(false);
  const [abonnementOpen, setAbonnementOpen] = useState(false);
  const [heeftLogo, setHeeftLogo] = useState(false);
  const [logoBezig, setLogoBezig] = useState(false);
  const [logoFout, setLogoFout] = useState("");
  const [logoVersie, setLogoVersie] = useState(0);

  useEffect(() => {
    API.haalLogoInfoOp().then(data => setHeeftLogo(!!data.heeft_logo)).catch(()=>{});
  }, []);

  async function uploadLogoBestand(file) {
    setLogoFout("");
    const toegestaan = ['image/png', 'image/svg+xml', 'image/jpeg'];
    if (!toegestaan.includes(file.type)) { setLogoFout("Alleen PNG, SVG of JPG toegestaan."); return; }
    if (file.size > 2 * 1024 * 1024) { setLogoFout("Bestand mag maximaal 2MB zijn."); return; }
    setLogoBezig(true);
    try {
      const base64 = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result.split(",")[1]);
        r.onerror = () => rej(new Error("Lezen mislukt"));
        r.readAsDataURL(file);
      });
      await API.uploadLogo(base64, file.type);
      setHeeftLogo(true);
      setLogoVersie(v => v+1);
    } catch(e) { setLogoFout(e.message || "Uploaden mislukt."); }
    finally { setLogoBezig(false); }
  }

  async function verwijderLogoNu() {
    if (!confirm("Bedrijfslogo verwijderen?")) return;
    try {
      await API.verwijderLogo();
      setHeeftLogo(false);
      setLogoVersie(v => v+1);
    } catch(e) { alert("Verwijderen mislukt: "+e.message); }
  }

  const alleModulesBasis = [
    { id:"kassa",       label:T?.kassa||"Kassa",                      icon:"🧾" },
    { id:"werkbonnen",  label:T?.werkbonnen||"Werkbonnen & Reparaties",     icon:"🔧" },
    { id:"klanten",     label:T?.klanten||"Klanten",         icon:"👥" },
    { id:"producten",   label:T?.producten||"Producten",     icon:"📦" },
    { id:"agenda",      label:T?.agenda||"Agenda",           icon:"📅" },
    { id:"offertes",    label:T?.offertes||"Offertes & Facturen",       icon:"📄" },
    { id:"financieel",  label:T?.financieel||"Financieel overzicht",        icon:"💶" },
    { id:"declaraties", label:T?.declaraties||"Declaraties & Boekhouding",   icon:"🧮" },
    { id:"contact",     label:T?.contact||"Contact",         icon:"💬" },
  ];
  // Gekoppelde (sub)gebruikers zien alleen de modules die de beheerder heeft toegestaan
  const alleModules = isGekoppeld && toegestaneModules
    ? alleModulesBasis.filter(m => toegestaneModules.includes(m.id))
    : alleModulesBasis;

  return (
    <div style={{ position:"absolute", bottom:60, left:12, width:260,
      backgroundColor:"#ffffff", color:"#1a1a1a",
      border:"1px solid #d0d0d0", borderRadius:12,
      padding:"1.25rem", boxShadow:"0 8px 24px rgba(0,0,0,0.15)", zIndex:500,
      maxHeight:"80vh", overflowY:"auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem" }}>
        <span style={{ fontWeight:500, fontSize:14 }}>⚙ {T?.instellingen||"Instellingen"}</span>
        <button onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",color:"#888",fontSize:18,lineHeight:1,padding:"2px 6px" }}>×</button>
      </div>

      {/* Bedrijfslogo (gedeeld met gekoppelde accounts, alleen door hoofdgebruiker aan te passen) */}
      {!isGekoppeld && (
        <div style={{ marginBottom:"1.25rem" }}>
          <p style={{ margin:"0 0 6px", fontSize:11, color:"#666", fontWeight:600, letterSpacing:"0.05em" }}>BEDRIJFSLOGO</p>
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"8px", borderRadius:8,
            border:"1px dashed #ccc", background:"#fafafa" }}>
            <div style={{ width:44, height:44, borderRadius:6, background:"#fff", border:"1px solid #e0e0e0",
              display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", flexShrink:0 }}>
              {heeftLogo ? (
                <img src={`${API.logoUrl()}&v=${logoVersie}`} alt="Logo" style={{ maxWidth:"100%", maxHeight:"100%", objectFit:"contain" }} />
              ) : (
                <span style={{ fontSize:18, color:"#ccc" }}>🖼</span>
              )}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <label style={{ display:"inline-block", padding:"5px 10px", borderRadius:6,
                background:kleur.hoofd, color:"#fff", fontSize:11, fontWeight:500, cursor:"pointer" }}>
                {logoBezig ? "Bezig…" : (heeftLogo ? "Vervangen" : "Uploaden")}
                <input type="file" accept="image/png,image/svg+xml,image/jpeg" style={{ display:"none" }}
                  disabled={logoBezig}
                  onChange={e => { if (e.target.files[0]) uploadLogoBestand(e.target.files[0]); e.target.value=""; }} />
              </label>
              {heeftLogo && (
                <button onClick={verwijderLogoNu}
                  style={{ marginLeft:6, padding:"5px 10px", borderRadius:6, background:"#fcebeb",
                    color:"#a32d2d", border:"none", fontSize:11, cursor:"pointer" }}>
                  Verwijderen
                </button>
              )}
            </div>
          </div>
          {logoFout && <p style={{ margin:"4px 0 0", fontSize:11, color:"#a32d2d" }}>{logoFout}</p>}
          <p style={{ margin:"4px 0 0", fontSize:10, color:"#999" }}>
            PNG, SVG of JPG, max 2MB. Verschijnt linksboven op offertes en kassabonnen.
          </p>
        </div>
      )}

      {/* Taal */}
      <p style={{ margin:"0 0 6px", fontSize:11, color:"#666", fontWeight:600, letterSpacing:"0.05em" }}>TAAL / LANGUAGE / SPRACHE</p>
      <div style={{ display:"flex", gap:8, marginBottom:"1.25rem" }}>
        {[
          { code:"nl", img:"afbeeldingen/vlagnederland.png", alt:"Nederlands" },
          { code:"en", img:"afbeeldingen/vlagengeland.png",  alt:"English" },
          { code:"de", img:"afbeeldingen/vlagduitsland.png", alt:"Deutsch" },
        ].map(({ code, img, alt }) => (
          <button key={code} onClick={() => setTaal(code)}
            style={{ flex:1, padding:"4px", borderRadius:8, cursor:"pointer",
              background: taal===code ? kleur.licht : "#fafafa",
              border: taal===code ? `2px solid ${kleur.hoofd}` : "1px solid #ddd" }}>
            <img src={img} alt={alt} style={{ width:"100%", height:20, objectFit:"cover", borderRadius:3, display:"block" }}
              onError={e=>{ e.target.style.display="none"; e.target.nextSibling.style.display="block"; }} />
            <span style={{ display:"none", fontSize:11, fontWeight:600 }}>{code.toUpperCase()}</span>
          </button>
        ))}
      </div>

      <p style={{ margin:"0 0 6px", fontSize:11, color:"#666", fontWeight:600, letterSpacing:"0.05em" }}>{T?.tekstgrootte||"TEKSTGROOTTE"}</p>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
        <button onClick={()=>setFs(s=>Math.max(12,s-1))} style={{ width:28,height:28,borderRadius:"50%",border:"1px solid #d0d0d0",background:"#f5f5f5",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center" }}>−</button>
        <span style={{ flex:1,textAlign:"center",fontSize:14,fontWeight:500 }}>{fs}px</span>
        <button onClick={()=>setFs(s=>Math.min(20,s+1))} style={{ width:28,height:28,borderRadius:"50%",border:"1px solid #d0d0d0",background:"#f5f5f5",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center" }}>+</button>
      </div>
      <input type="range" min={12} max={20} step={1} value={fs} onChange={e=>setFs(parseInt(e.target.value))} style={{ width:"100%", marginBottom:"1.25rem" }} />

      <p style={{ margin:"0 0 6px", fontSize:11, color:"#666", fontWeight:600, letterSpacing:"0.05em" }}>{T?.accentkleur||"ACCENTKLEUR"}</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6, marginBottom:"1.25rem" }}>
        {KLEUREN.map((k,i)=>(
          <button key={k.label} onClick={()=>setKleurIdx(i)} style={{ padding:"6px 4px", borderRadius:8,
            border:kleurIdx===i?`2.5px solid ${k.hoofd}`:"1px solid #ddd",
            background:kleurIdx===i?k.licht:"#fafafa",
            boxShadow:kleurIdx===i?`0 0 0 2px ${k.hoofd}33`:"none",
            cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4, position:"relative" }}>
            <div style={{ width:20,height:20,borderRadius:"50%",background:k.hoofd, display:"flex",
              alignItems:"center", justifyContent:"center" }}>
              {kleurIdx===i && <span style={{ color:"#fff", fontSize:12, fontWeight:700 }}>✓</span>}
            </div>
            <span style={{ fontSize:10, fontWeight:kleurIdx===i?700:400, color:kleurIdx===i?k.donker:"#666" }}>{k.label}</span>
          </button>
        ))}
      </div>

      <p style={{ margin:"0 0 6px", fontSize:11, color:"#666", fontWeight:600, letterSpacing:"0.05em" }}>{T?.achtergrondkleur||"ACHTERGRONDKLEUR"}</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6, marginBottom:"1.25rem" }}>
        {BGOVS.map((b,i)=>(
          <button key={b.label} onClick={()=>setBgIdx(i)} style={{ padding:"6px 4px", borderRadius:8,
            border:bgIdx===i?`2.5px solid ${kleur.hoofd}`:"1px solid #ddd",
            background:bgIdx===i?kleur.licht:"#fafafa",
            boxShadow:bgIdx===i?`0 0 0 2px ${kleur.hoofd}33`:"none",
            cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <div style={{ width:20,height:20,borderRadius:4,background:b.w,border:"1px solid #ccc",
              display:"flex", alignItems:"center", justifyContent:"center" }}>
              {bgIdx===i && <span style={{ color:kleur.hoofd, fontSize:12, fontWeight:700 }}>✓</span>}
            </div>
            <span style={{ fontSize:9, fontWeight:bgIdx===i?700:400, color:bgIdx===i?kleur.donker:"#555", textAlign:"center", lineHeight:1.2 }}>{b.label}</span>
          </button>
        ))}
      </div>

      {/* Modules */}
      <button onClick={()=>setModulesOpen(o=>!o)}
        style={{ width:"100%", padding:"8px 12px", borderRadius:8, cursor:"pointer",
          border:`1px solid ${modulesOpen ? kleur.hoofd : "#ddd"}`,
          background: modulesOpen ? kleur.licht : "#fafafa",
          color: modulesOpen ? kleur.donker : "#555",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          fontSize:12, fontWeight:500 }}>
        <span>⊞ Zet modules aan of uit</span>
        <span>{modulesOpen ? "▲" : "▼"}</span>
      </button>

      {modulesOpen && (
        <div style={{ marginTop:8, display:"flex", flexDirection:"column", gap:6 }}>
          {alleModules.map(m => {
            const aan = modulesAan[m.id] !== false;
            return (
              <div key={m.id} onClick={()=>setModulesAan(prev=>({...prev,[m.id]:!aan}))}
                style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 10px",
                  borderRadius:8, cursor:"pointer",
                  background: aan ? kleur.licht : "#f5f5f5",
                  border: `1px solid ${aan ? kleur.hoofd : "#e0e0e0"}` }}>
                <span style={{ fontSize:16 }}>{m.icon}</span>
                <span style={{ flex:1, fontSize:12, fontWeight:500,
                  color: aan ? kleur.donker : "#aaa" }}>{m.label}</span>
                <div style={{ width:36, height:20, borderRadius:99,
                  background: aan ? kleur.hoofd : "#ccc",
                  position:"relative", transition:"background 0.2s" }}>
                  <div style={{ position:"absolute", top:2,
                    left: aan ? 18 : 2,
                    width:16, height:16, borderRadius:"50%",
                    background:"#fff", transition:"left 0.2s",
                    boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }} />
                </div>
              </div>
            );
          })}
          <p style={{ fontSize:10, color:"#aaa", margin:"4px 0 0", textAlign:"center" }}>
            Keuzes worden automatisch opgeslagen
          </p>
        </div>
      )}

      {!isGekoppeld && (
        <button onClick={onOpenKoppelAccounts}
          style={{ width:"100%", padding:"8px 12px", borderRadius:8, cursor:"pointer",
            border:"1px solid #ddd", background:"#fafafa", color:"#555",
            display:"flex", alignItems:"center", justifyContent:"space-between",
            fontSize:12, fontWeight:500, marginTop:8 }}>
          <span>👥 Koppel accounts</span>
          <span>→</span>
        </button>
      )}

      {/* Mijn abonnement */}
      {!isAdmin && (
        <>
          <button onClick={()=>setAbonnementOpen(o=>!o)}
            style={{ width:"100%", padding:"8px 12px", borderRadius:8, cursor:"pointer", marginTop:8,
              border:`1px solid ${abonnementOpen ? kleur.hoofd : "#ddd"}`,
              background: abonnementOpen ? kleur.licht : "#fafafa",
              color: abonnementOpen ? kleur.donker : "#555",
              display:"flex", alignItems:"center", justifyContent:"space-between",
              fontSize:12, fontWeight:500 }}>
            <span>💳 Mijn abonnement</span>
            <span>{abonnementOpen ? "▲" : "▼"}</span>
          </button>

          {abonnementOpen && (() => {
            const geldig = lidmaatschapTot ? new Date(lidmaatschapTot) >= new Date() : false;
            const diff = lidmaatschapTot ? Math.ceil((new Date(lidmaatschapTot) - new Date()) / (1000*60*60*24)) : null;
            const fmtD = iso => iso ? new Date(iso).toLocaleDateString('nl-NL',{day:'numeric',month:'long',year:'numeric'}) : '—';
            return (
              <div style={{ marginTop:8, padding:"12px", borderRadius:10,
                background: geldig ? "#eaf3de" : "#fcebeb" }}>
                <p style={{ margin:"0 0 4px", fontSize:11, fontWeight:600,
                  color: geldig ? "#27500a" : "#a32d2d" }}>
                  {geldig ? "✓ Actief lidmaatschap" : "✕ Lidmaatschap verlopen"}
                </p>
                <p style={{ margin:0, fontSize:12, color:"#444" }}>
                  Geldig {geldig ? "tot" : "tot was"}: <strong>{fmtD(lidmaatschapTot)}</strong>
                </p>
                {geldig && diff !== null && diff < 30 && (
                  <p style={{ margin:"4px 0 0", fontSize:11, color:"#7a5800" }}>
                    Verloopt over {diff} dag{diff!==1?'en':''}
                  </p>
                )}
                <p style={{ margin:"8px 0 0", fontSize:10, color:"#888" }}>
                  Verlengen kan binnenkort via uw accountpagina (Mollie betaling volgt).
                </p>
              </div>
            );
          })()}
        </>
      )}
    </div>
  );
}

// ── DEMO BANNER ───────────────────────────────────────────────────────────────
// ── WELKOM ONBOARDING (bij allereerste inloggen) ──────────────
function WelkomOnboardingModal({ kleur, modulesAan, setModulesAan, onClose }) {
  const [stap, setStap] = useState(1); // 1=intro/logo, 2=bedrijfsgegevens, 3=modules
  const [heeftLogo, setHeeftLogo] = useState(false);
  const [logoBezig, setLogoBezig] = useState(false);
  const [logoFout, setLogoFout] = useState("");
  const [logoVersie, setLogoVersie] = useState(0);

  const [bedrijfsnaam, setBedrijfsnaam] = useState("");
  const [bedrijfAdres, setBedrijfAdres] = useState("");
  const [iban, setIban] = useState("");
  const [btwNr, setBtwNr] = useState("");
  const [opslaanBezig, setOpslaanBezig] = useState(false);

  const alleModulesBasis = [
    { id:"kassa",       label:"Kassa",                      icon:"🧾" },
    { id:"werkbonnen",  label:"Werkbonnen & Reparaties",     icon:"🔧" },
    { id:"klanten",     label:"Klanten",                     icon:"👥" },
    { id:"producten",   label:"Producten",                   icon:"📦" },
    { id:"agenda",      label:"Agenda",                      icon:"📅" },
    { id:"offertes",    label:"Offertes & Facturen",         icon:"📄" },
    { id:"financieel",  label:"Financieel overzicht",        icon:"💶" },
    { id:"declaraties", label:"Declaraties & Boekhouding",   icon:"🧮" },
    { id:"contact",     label:"Contact",                     icon:"💬" },
  ];

  async function uploadLogoBestand(file) {
    setLogoFout("");
    const toegestaan = ['image/png', 'image/svg+xml', 'image/jpeg'];
    if (!toegestaan.includes(file.type)) { setLogoFout("Alleen PNG, SVG of JPG toegestaan."); return; }
    if (file.size > 2 * 1024 * 1024) { setLogoFout("Bestand mag maximaal 2MB zijn."); return; }
    setLogoBezig(true);
    try {
      const base64 = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result.split(",")[1]);
        r.onerror = () => rej(new Error("Lezen mislukt"));
        r.readAsDataURL(file);
      });
      await API.uploadLogo(base64, file.type);
      setHeeftLogo(true);
      setLogoVersie(v => v+1);
    } catch(e) { setLogoFout(e.message || "Uploaden mislukt."); }
    finally { setLogoBezig(false); }
  }

  async function slaBedrijfsgegevensOp() {
    setOpslaanBezig(true);
    try {
      await API.updateProfiel({ bedrijfsnaam, bedrijf_adres: bedrijfAdres, iban, btw_nummer: btwNr });
    } catch(e) { /* niet blokkerend, gebruiker kan dit later alsnog invullen */ }
    finally { setOpslaanBezig(false); setStap(3); }
  }

  function toggleModule(id) {
    setModulesAan(prev => ({ ...prev, [id]: prev[id] === false ? true : false }));
  }

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)",
      display:"flex", alignItems:"center", justifyContent:"center", zIndex:2000, padding:"1rem" }}>
      <div style={{ background:"#fff", borderRadius:16, padding:"2rem", width:"100%", maxWidth:520,
        boxShadow:"0 16px 48px rgba(0,0,0,0.25)", maxHeight:"90vh", overflowY:"auto" }}>

        {/* Voortgangsindicator */}
        <div style={{ display:"flex", gap:6, marginBottom:"1.5rem" }}>
          {[1,2,3].map(s => (
            <div key={s} style={{ flex:1, height:4, borderRadius:99, background: stap>=s ? kleur.hoofd : "#eee" }} />
          ))}
        </div>

        {stap === 1 && (
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:48, marginBottom:"0.75rem" }}>👋</div>
            <h2 style={{ margin:"0 0 0.75rem", color:"#1a1a1a", fontSize:20 }}>Welkom bij DenCRM!</h2>
            <p style={{ color:"#555", fontSize:14, lineHeight:1.6, marginBottom:"1.5rem" }}>
              Laten we uw account in een paar stappen inrichten. Wilt u meteen uw bedrijfslogo uploaden?
              Dit verschijnt straks automatisch op uw offertes, facturen en kassabonnen.
            </p>

            <div style={{ display:"flex", alignItems:"center", gap:12, padding:"14px", borderRadius:10,
              border:"1px dashed #ccc", background:"#fafafa", marginBottom:"1rem", textAlign:"left" }}>
              <div style={{ width:56, height:56, borderRadius:8, background:"#fff", border:"1px solid #e0e0e0",
                display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", flexShrink:0 }}>
                {heeftLogo ? (
                  <img src={`${API.logoUrl()}&v=${logoVersie}`} alt="Logo" style={{ maxWidth:"100%", maxHeight:"100%", objectFit:"contain" }} />
                ) : (
                  <span style={{ fontSize:22, color:"#ccc" }}>🖼</span>
                )}
              </div>
              <div style={{ flex:1 }}>
                <label style={{ display:"inline-block", padding:"7px 14px", borderRadius:8,
                  background:kleur.hoofd, color:"#fff", fontSize:13, fontWeight:500, cursor:"pointer" }}>
                  {logoBezig ? "Bezig…" : (heeftLogo ? "Vervangen" : "Logo uploaden")}
                  <input type="file" accept="image/png,image/svg+xml,image/jpeg" style={{ display:"none" }}
                    disabled={logoBezig}
                    onChange={e => { if (e.target.files[0]) uploadLogoBestand(e.target.files[0]); e.target.value=""; }} />
                </label>
                {logoFout && <p style={{ margin:"6px 0 0", fontSize:12, color:"#a32d2d" }}>{logoFout}</p>}
                <p style={{ margin:"6px 0 0", fontSize:11, color:"#999" }}>PNG, SVG of JPG, max 2MB</p>
              </div>
            </div>

            <button onClick={()=>setStap(2)}
              style={{ width:"100%", padding:"12px", borderRadius:10, background:kleur.hoofd,
                color:"#fff", border:"none", cursor:"pointer", fontSize:14, fontWeight:600 }}>
              Volgende →
            </button>
          </div>
        )}

        {stap === 2 && (
          <div>
            <h2 style={{ margin:"0 0 0.5rem", color:"#1a1a1a", fontSize:19 }}>Uw bedrijfsgegevens</h2>
            <p style={{ color:"#666", fontSize:13.5, lineHeight:1.5, marginBottom:"1.25rem" }}>
              Deze gegevens worden automatisch ingevuld op uw offertes, facturen en kassabonnen.
            </p>

            <div style={{ marginBottom:10 }}>
              <label style={{ fontSize:12, color:"#555", fontWeight:500 }}>Bedrijfsnaam</label>
              <input value={bedrijfsnaam} onChange={e=>setBedrijfsnaam(e.target.value)}
                style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #ddd", fontSize:14, marginTop:4, boxSizing:"border-box" }} />
            </div>
            <div style={{ marginBottom:10 }}>
              <label style={{ fontSize:12, color:"#555", fontWeight:500 }}>Adres</label>
              <input value={bedrijfAdres} onChange={e=>setBedrijfAdres(e.target.value)}
                placeholder="Straat 1, 1234 AB Plaats"
                style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #ddd", fontSize:14, marginTop:4, boxSizing:"border-box" }} />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
              <div>
                <label style={{ fontSize:12, color:"#555", fontWeight:500 }}>IBAN</label>
                <input value={iban} onChange={e=>setIban(e.target.value)} placeholder="NL00 BANK 0000 0000 00"
                  style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #ddd", fontSize:14, marginTop:4, boxSizing:"border-box" }} />
              </div>
              <div>
                <label style={{ fontSize:12, color:"#555", fontWeight:500 }}>BTW-nummer</label>
                <input value={btwNr} onChange={e=>setBtwNr(e.target.value)} placeholder="NL000000000B01"
                  style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #ddd", fontSize:14, marginTop:4, boxSizing:"border-box" }} />
              </div>
            </div>

            <div style={{ display:"flex", gap:8, marginTop:"1.5rem" }}>
              <button onClick={()=>setStap(1)}
                style={{ padding:"12px 18px", borderRadius:10, background:"#f5f5f5",
                  color:"#666", border:"none", cursor:"pointer", fontSize:14 }}>
                ← Terug
              </button>
              <button onClick={slaBedrijfsgegevensOp} disabled={opslaanBezig}
                style={{ flex:1, padding:"12px", borderRadius:10, background:kleur.hoofd,
                  color:"#fff", border:"none", cursor:"pointer", fontSize:14, fontWeight:600, opacity:opslaanBezig?0.7:1 }}>
                {opslaanBezig ? "Bezig…" : "Volgende →"}
              </button>
            </div>
          </div>
        )}

        {stap === 3 && (
          <div>
            <h2 style={{ margin:"0 0 0.5rem", color:"#1a1a1a", fontSize:19 }}>Welke onderdelen gaat u gebruiken?</h2>
            <p style={{ color:"#666", fontSize:13.5, lineHeight:1.5, marginBottom:"1.25rem" }}>
              Zet uit wat u niet nodig heeft — dat houdt het overzicht lekker rustig. U kunt dit altijd weer aanpassen.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:"1.5rem" }}>
              {alleModulesBasis.map(m => {
                const aan = modulesAan[m.id] !== false;
                return (
                  <div key={m.id} onClick={()=>toggleModule(m.id)}
                    style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                      padding:"10px 14px", borderRadius:10, cursor:"pointer",
                      background: aan ? kleur.licht : "#f5f5f5", border:`1px solid ${aan ? kleur.hoofd+'33' : '#e5e5e5'}` }}>
                    <span style={{ fontSize:14, color: aan ? kleur.donker : "#999" }}>{m.icon} {m.label}</span>
                    <div style={{ width:36, height:20, borderRadius:99, position:"relative",
                      background: aan ? kleur.hoofd : "#ccc" }}>
                      <div style={{ position:"absolute", top:2, left: aan ? 18 : 2, width:16, height:16,
                        borderRadius:"50%", background:"#fff", transition:"left 0.15s" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <p style={{ color:"#888", fontSize:12.5, lineHeight:1.5, marginBottom:"1.5rem",
              background:"#f5f5f5", padding:"10px 14px", borderRadius:8 }}>
              💡 Logo, bedrijfsgegevens, modules en kleuren zijn altijd aan te passen via{" "}
              <strong>⚙ Instellingen</strong> en <strong>👤 Mijn profiel</strong> linksonder in het scherm.
            </p>

            <div style={{ display:"flex", gap:8 }}>
              <button onClick={()=>setStap(2)}
                style={{ padding:"12px 18px", borderRadius:10, background:"#f5f5f5",
                  color:"#666", border:"none", cursor:"pointer", fontSize:14 }}>
                ← Terug
              </button>
              <button onClick={onClose}
                style={{ flex:1, padding:"12px", borderRadius:10, background:kleur.hoofd,
                  color:"#fff", border:"none", cursor:"pointer", fontSize:14, fontWeight:600 }}>
                Begrepen, aan de slag!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DemoBanner({ onUitloggen, fs, T }) {
  const [ingeklapt, setIngeklapt] = useState(false);
  const TT = T || VERTALINGEN.nl;
  if (ingeklapt) return (
    <div style={{ background:"#7f1d1d", color:"#fecaca", padding:"6px 16px",
      display:"flex", alignItems:"center", gap:10, fontSize:fs-2, cursor:"pointer" }}
      onClick={()=>setIngeklapt(false)}>
      <span style={{ fontSize:16 }}>⚠</span>
      <span style={{ fontWeight:500 }}>{TT.demoActief}</span>
      <span style={{ opacity:0.7 }}>— {TT.demoOndertitel}</span>
      <span style={{ marginLeft:"auto", opacity:0.7, fontSize:12 }}>▼ toon meer</span>
    </div>
  );
  return (
    <div style={{ background:"#991b1b", color:"#fff", padding:"14px 20px",
      display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, flex:1, minWidth:0 }}>
        <div style={{ width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,0.15)",
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>⚠</div>
        <div>
          <p style={{ margin:0, fontWeight:700, fontSize:fs+1, letterSpacing:"0.02em" }}>{TT.demoBannerTitel}</p>
          <p style={{ margin:"3px 0 0", fontSize:fs-1, opacity:0.85, lineHeight:1.4 }}>{TT.demoBannerTekst}</p>
        </div>
      </div>
      <div style={{ display:"flex", gap:8, flexShrink:0 }}>
        <button onClick={()=>setIngeklapt(true)} style={{ padding:"7px 14px", borderRadius:8,
          background:"rgba(255,255,255,0.15)", color:"#fff", border:"1px solid rgba(255,255,255,0.3)",
          cursor:"pointer", fontSize:fs-1 }}>{TT.minimaliseren}</button>
        <button onClick={onUitloggen} style={{ padding:"7px 14px", borderRadius:8,
          background:"#fff", color:"#991b1b", border:"none",
          cursor:"pointer", fontSize:fs-1, fontWeight:500 }}>{TT.terugNaarLogin}</button>
      </div>
    </div>
  );
}

// Demo data — verse kopie elke keer zodat echte data nooit wordt aangeraakt
const DEMO_AGENDA = [
  { id:"da1", klantId:"dk1", datum: new Date().toISOString().slice(0,10), tijd:"10:00", tijdTot:"11:00", notitie:"Kennismaking & bespreking wensen" },
  { id:"da2", klantId:"dk2", datum: new Date(Date.now()+86400000*3).toISOString().slice(0,10), tijd:"14:00", tijdTot:"15:00", notitie:"Offerte presentatie" },
];
const DEMO_OFFERTE = {
  id:"do1", referentie:"OFF-DEMO-001",
  datum: new Date().toISOString().slice(0,10),
  regels:[
    { id:"dr1", naam:"Website Pakket Basic", beschrijving:"5-pagina website met CMS", prijs:1200, isVariabel:false },
    { id:"dr2", naam:"SEO Optimalisatie", beschrijving:"Maandelijkse SEO-begeleiding", prijs:650, isVariabel:false },
  ],
  totaalInclBtw: Math.round((1200+650)*1.21),
  inclBtw:true,
  bedrijfsnaam:"Uw Bedrijfsnaam", bedrijfAdres:"Adres 1, 1234 AB Stad",
  iban:"", btwNr:"",
  template: OFFERTE_TEMPLATE, betaald:false,
};
const DEMO_KLANTEN = [
  { id:"dk1", naam:"Bakkerij de Gouden Korst", email:"info@goudenkors.nl", telefoon:"06-12345678", adres:"Hoofdstraat 14, 1234 AB Amsterdam", producten:["dp1","dp3"], offertes:[DEMO_OFFERTE] },
  { id:"dk2", naam:"Autogarage Versteeg",      email:"versteeg@garage.nl", telefoon:"06-87654321", adres:"Industrieweg 7, 5678 CD Utrecht",   producten:["dp2","dp4"], offertes:[] },
  { id:"dk3", naam:"Kapsalon Mooiste Knip",    email:"knip@kapsalon.nl",   telefoon:"06-11223344", adres:"Dorpsstraat 3, 9012 EF Groningen",  producten:["dp1"],        offertes:[] },
];
const DEMO_PRODUCTEN = [
  { id:"dp1", naam:"Website Pakket Basic", prijs:1200, beschrijving:"5-pagina website met CMS",        categorie:"Web"       },
  { id:"dp2", naam:"Website Pakket Pro",   prijs:2800, beschrijving:"Maatwerk website met webshop",    categorie:"Web"       },
  { id:"dp3", naam:"SEO Optimalisatie",    prijs:650,  beschrijving:"Maandelijkse SEO-begeleiding",    categorie:"Marketing" },
  { id:"dp4", naam:"Logo & Huisstijl",     prijs:950,  beschrijving:"Complete huisstijl ontwikkeling", categorie:"Design"    },
];

// ── PROFIEL PANEEL ────────────────────────────────────────────────────────────
function ProfielPanel({ user, setUsers, onClose, kleur, fs, T }) {
  const [tab, setTab] = useState("info");
  const [huidigWw, setHuidigWw] = useState("");
  const [nieuwWw, setNieuwWw]   = useState("");
  const [bevestig, setBevestig] = useState("");
  const [toonH, setToonH] = useState(false);
  const [toonN, setToonN] = useState(false);
  const [melding, setMelding] = useState(null);
  const [gegevens, setGegevens] = useState(null);
  const [gegevensForm, setGegevensForm] = useState({});
  const [gegevensBezig, setGegevensBezig] = useState(false);

  useEffect(() => {
    if (tab === "gegevens" && !gegevens) {
      API.haalProfielOp().then(data => {
        setGegevens(data);
        setGegevensForm(data);
      }).catch(() => {});
    }
  }, [tab]);

  async function slaWwOp() {
    setMelding(null);
    const regels = valideerWachtwoord(nieuwWw);
    if (!regels.every(r => r.ok)) { setMelding({type:"fout", tekst:"Wachtwoord voldoet niet (min. 8 tekens, 1 hoofdletter, 1 speciaal teken)."}); return; }
    if (nieuwWw !== bevestig) { setMelding({type:"fout", tekst:T.wachtwoordNietOvereen}); return; }
    try {
      await API.wijzigWachtwoord(huidigWw, nieuwWw);
      setHuidigWw(""); setNieuwWw(""); setBevestig("");
      setMelding({type:"ok", tekst:T.wachtwoordGewijzigd});
    } catch(e) { setMelding({type:"fout", tekst:e.message||"Wijzigen mislukt."}); }
  }

  async function slaGegevensOp() {
    setGegevensBezig(true);
    try {
      await API.updateProfiel(gegevensForm);
      setGegevens(gegevensForm);
      setMelding({type:"ok", tekst:"Gegevens opgeslagen!"});
    } catch(e) { setMelding({type:"fout", tekst:e.message||"Opslaan mislukt."}); }
    finally { setGegevensBezig(false); }
  }

  return (
    <div style={{ position:"absolute", bottom:60, left:12, width:280,
      backgroundColor:"#ffffff", color:"#1a1a1a",
      border:"1px solid #d0d0d0", borderRadius:12,
      boxShadow:"0 8px 24px rgba(0,0,0,0.15)", zIndex:500, overflow:"hidden" }}>
      <div style={{ background:kleur.hoofd, padding:"14px 16px", display:"flex", alignItems:"center", gap:10 }}>
        <Avatar naam={user.naam} size={36} kleur={{licht:"rgba(255,255,255,0.25)", donker:"#fff"}} />
        <div style={{ flex:1, minWidth:0 }}>
          <p style={{ margin:0, fontWeight:600, fontSize:fs, color:"#fff", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.naam}</p>
          <p style={{ margin:0, fontSize:fs-3, color:"rgba(255,255,255,0.75)" }}>@{user.username}{user.is_admin?" · Admin":""}</p>
        </div>
        <button onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.8)",fontSize:18,lineHeight:1,padding:"2px 4px" }}>×</button>
      </div>

      <div style={{ display:"flex", borderBottom:"0.5px solid #e8e8e8" }}>
        {[{id:"info",label:"Profiel"},{id:"gegevens",label:"Gegevens"},{id:"ww",label:"Wachtwoord"}].map(t=>(
          <button key={t.id} onClick={()=>{setTab(t.id);setMelding(null);}} style={{
            flex:1, padding:"8px 4px", border:"none", background:"none", cursor:"pointer",
            fontSize:fs-2, fontWeight:500,
            color:tab===t.id?kleur.hoofd:"#888",
            borderBottom:tab===t.id?`2px solid ${kleur.hoofd}`:"2px solid transparent"
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding:"1rem", maxHeight:420, overflowY:"auto" }}>
        {tab==="info" && (
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {[{l:"Naam",v:user.naam},{l:"Gebruikersnaam",v:`@${user.username}`},{l:"Rechten",v:user.is_admin?"Administrator":"Standaard gebruiker"}].map(r=>(
              <div key={r.l}>
                <p style={{ margin:0, fontSize:fs-3, color:"#888", marginBottom:2 }}>{r.l}</p>
                <p style={{ margin:0, fontSize:fs-1, fontWeight:500, color:"#1a1a1a" }}>{r.v}</p>
              </div>
            ))}
          </div>
        )}

        {tab==="gegevens" && (
          <div>
            {!gegevens ? <p style={{ color:"#888", fontSize:fs-1 }}>Laden…</p> : (<>
              <p style={{ margin:"0 0 10px", fontSize:fs-2, color:"#888" }}>
                Deze gegevens worden gebruikt op offertes en in uitgaande mails.
              </p>
              {[
                {l:"Volledige naam", k:"naam", verplicht:true},
                {l:"Bedrijfsnaam", k:"bedrijfsnaam"},
                {l:"Bedrijfsadres", k:"bedrijf_adres"},
                {l:"IBAN", k:"iban"},
                {l:"BTW-nummer", k:"btw_nummer"},
                {l:"E-mailadres voor rapporten", k:"mail_adres"},
              ].map(veld=>(
                <div key={veld.k} style={{ marginBottom:10 }}>
                  <label style={{ display:"block", fontSize:fs-3, color:"#555", marginBottom:3, fontWeight:500 }}>
                    {veld.l}{veld.verplicht&&<span style={{color:"#a32d2d"}}> *</span>}
                  </label>
                  <input value={gegevensForm[veld.k]||""} onChange={e=>setGegevensForm(f=>({...f,[veld.k]:e.target.value}))}
                    style={{ width:"100%", padding:"7px 10px", borderRadius:7, border:"1px solid #ddd",
                      background:"#fafafa", fontSize:fs-1, color:"#1a1a1a", boxSizing:"border-box" }} />
                </div>
              ))}
              {melding && tab==="gegevens" && (
                <p style={{ fontSize:fs-2, padding:"7px 10px", borderRadius:6, marginBottom:8,
                  background:melding.type==="ok"?"#eaf3de":"#fcebeb",
                  color:melding.type==="ok"?"#27500a":"#a32d2d" }}>{melding.tekst}</p>
              )}
              <button onClick={slaGegevensOp} disabled={gegevensBezig}
                style={{ width:"100%", padding:"9px", borderRadius:8, background:kleur.hoofd,
                  color:"#fff", border:"none", cursor:"pointer", fontSize:fs-1, fontWeight:500, opacity:gegevensBezig?0.7:1 }}>
                {gegevensBezig?"Opslaan…":"💾 Gegevens opslaan"}
              </button>
            </>)}
          </div>
        )}

        {tab==="ww" && (
          <div>
            <div style={{ marginBottom:10 }}>
              <label style={{ display:"block", fontSize:fs-2, color:"#555", marginBottom:4 }}>{T.huidigWachtwoord}</label>
              <div style={{ position:"relative" }}>
                <input type={toonH?"text":"password"} value={huidigWw} onChange={e=>setHuidigWw(e.target.value)}
                  style={{ width:"100%", padding:"8px 32px 8px 10px", borderRadius:7, border:"1px solid #ccc", background:"#fafafa", fontSize:fs-1, color:"#1a1a1a", boxSizing:"border-box" }} />
                <button onClick={()=>setToonH(t=>!t)} style={{ position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#aaa",fontSize:13 }}>{toonH?"🙈":"👁"}</button>
              </div>
            </div>
            <div style={{ marginBottom:6 }}>
              <label style={{ display:"block", fontSize:fs-2, color:"#555", marginBottom:4 }}>{T.nieuwWachtwoord}</label>
              <div style={{ position:"relative" }}>
                <input type={toonN?"text":"password"} value={nieuwWw} onChange={e=>setNieuwWw(e.target.value)}
                  style={{ width:"100%", padding:"8px 32px 8px 10px", borderRadius:7, border:"1px solid #ccc", background:"#fafafa", fontSize:fs-1, color:"#1a1a1a", boxSizing:"border-box" }} />
                <button onClick={()=>setToonN(t=>!t)} style={{ position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#aaa",fontSize:13 }}>{toonN?"🙈":"👁"}</button>
              </div>
            </div>
            <WachtwoordSterkte ww={nieuwWw} />
            <div style={{ marginBottom:12, marginTop:8 }}>
              <label style={{ display:"block", fontSize:fs-2, color:"#555", marginBottom:4 }}>{T.bevestigWachtwoord}</label>
              <input type="password" value={bevestig} onChange={e=>setBevestig(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&slaWwOp()}
                style={{ width:"100%", padding:"8px 10px", borderRadius:7, border:"1px solid #ccc", background:"#fafafa", fontSize:fs-1, color:"#1a1a1a", boxSizing:"border-box" }} />
            </div>
            {melding && tab==="ww" && (
              <p style={{ margin:"0 0 10px", fontSize:fs-2, padding:"7px 10px", borderRadius:6,
                background:melding.type==="ok"?"#eaf3de":"#fcebeb",
                color:melding.type==="ok"?"#27500a":"#a32d2d" }}>{melding.tekst}</p>
            )}
            <button onClick={slaWwOp} style={{ width:"100%", padding:"9px", borderRadius:8,
              background:kleur.hoofd, color:"#fff", border:"none", cursor:"pointer", fontSize:fs-1, fontWeight:500 }}>
              {T.wachtwoordOpslaan}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── APP SHELL ─────────────────────────────────────────────────────────────────
export default function App() {
  const [huidigUser, setHuidigUser] = useState(null);
  const [isMobiel, setIsMobiel] = useState(() => window.innerWidth < 900);
  const [mobielMenuOpen, setMobielMenuOpen] = useState(false);
  useEffect(() => {
    function checkSize() { setIsMobiel(window.innerWidth < 900); }
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);
  const [welkomModal, setWelkomModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [isDemoMode, setIsDemoMode]  = useState(false);
  const [laden, setLaden]            = useState(true); // eerste laad-check

  // ── Echte data uit API ─────────────────────────────────────
  const [klanten,   setKlantenState]   = useState([]);
  const [appWerkbonnen, setAppWerkbonnen] = useState([]);
  const [appKassaBonnen, setAppKassaBonnen] = useState([]);
  const [producten, setProductenState] = useState([]);
  const [agenda,    setAgendaState]    = useState([]);

  // ── Demo data (in-memory) ──────────────────────────────────
  const [demoKlanten,   setDemoKlanten]   = useState(DEMO_KLANTEN);
  const [demoProducten, setDemoProducten] = useState(DEMO_PRODUCTEN);
  const [demoAgenda,    setDemoAgenda]    = useState(DEMO_AGENDA);

  // ── UI state ───────────────────────────────────────────────
  const [pagina,      setPagina]      = useState("kassa");
  const [kleurIdx,    setKleurIdx]    = useState(0);
  const [fs,          setFs]          = useState(14);
  const [bgIdx,       setBgIdx]       = useState(0);
  const [instellOpen, setInstellOpen] = useState(false);
  const [koppelAccountsOpen, setKoppelAccountsOpen] = useState(false);
  const [profielOpen, setProfielOpen] = useState(false);
  const [apiError,    setApiError]    = useState(null);
  const [autoRetryPoging, setAutoRetryPoging] = useState(0);

  // ── Gecentraliseerde instellingen: opgeslagen in de database i.p.v. localStorage ──
  const [instellingen, setInstellingenState] = useState({});
  const [instellingenGeladen, setInstellingenGeladen] = useState(false);

  useEffect(() => {
    if (isDemoMode || !huidigUser) { setInstellingenGeladen(true); return; }
    API.haalInstellingenOp()
      .then(data => {
        setInstellingenState(data || {});
        if (data?.taal) localStorage.setItem('dencrm_taal', data.taal);
        setInstellingenGeladen(true);
      })
      .catch(() => setInstellingenGeladen(true));
  }, [isDemoMode, huidigUser]);

  // Werk 1 of meerdere instellingen bij: lokaal direct zichtbaar, database op de achtergrond bijgewerkt
  function updateInstelling(patch) {
    setInstellingenState(prev => ({ ...prev, ...patch }));
    if (!isDemoMode) API.updateInstellingen(patch).catch(e => console.error('Instelling opslaan mislukt:', e));
  }

  const [preLoginTaal, setPreLoginTaal] = useState(() => localStorage.getItem('dencrm_taal') || 'nl');
  const taal = instellingen.taal || preLoginTaal;
  function setTaal(nieuweTaal) {
    localStorage.setItem('dencrm_taal', nieuweTaal); // werkt ook vóór inloggen (login-scherm taalkeuze)
    setPreLoginTaal(nieuweTaal); // triggert direct een re-render, ook zonder ingelogde gebruiker
    if (huidigUser) updateInstelling({ taal: nieuweTaal }); // na inloggen: sync naar database
  }

  const modulesAan = instellingen.modulesAan || {};
  function setModulesAan(fn) {
    const nieuw = typeof fn === 'function' ? fn(modulesAan) : fn;
    updateInstelling({ modulesAan: nieuw });
  }

  const T = VERTALINGEN[taal] || VERTALINGEN.nl;

  const kleur = KLEUREN[kleurIdx];
  const bg    = BGOVS[bgIdx];
  const isDark = DARK_BGS.includes(bg.w);

  // ── Bij opstarten: kijk of er een activatietoken in de URL zit ──
  const activatieToken = new URLSearchParams(window.location.search).get('token');
  if (activatieToken) {
    return <ActivatiePagina token={activatieToken} kleur={kleur} />;
  }

  const resetToken = new URLSearchParams(window.location.search).get('reset');
  if (resetToken) {
    return <WachtwoordResetPagina token={resetToken} kleur={kleur} />;
  }

  const uitnodigingToken = new URLSearchParams(window.location.search).get('uitnodiging');
  if (uitnodigingToken) {
    return <UitnodigingAccepterenPagina token={uitnodigingToken} kleur={kleur} />;
  }

  if (window.location.pathname === '/over' || window.location.pathname === '/over/') {
    return <OverOnsPagina kleur={kleur} />;
  }

  const agendaPadMatch = window.location.pathname.match(/^\/agenda\/([a-z0-9-]+)\/?(annuleren)?\/?$/);
  if (agendaPadMatch) {
    const slug = agendaPadMatch[1];
    const isAnnuleren = !!agendaPadMatch[2];
    const annuleerToken = new URLSearchParams(window.location.search).get('token');
    if (isAnnuleren) {
      return <PubliekeAgendaAnnulerenPagina token={annuleerToken} kleur={kleur} />;
    }
    return <PubliekeAgendaPagina slug={slug} kleur={kleur} />;
  }

  // ── Bij opstarten: kijk of er nog een token is ────────────
  useEffect(() => {
    if (API.heeftTokens()) {
      // Herstel de ingelogde gebruiker (voorkomt dat een pagina-refresh je uitlogt)
      API.haalSessieOp()
        .then(gebruiker => { setHuidigUser(gebruiker); return laadAlleData(); })
        .catch(() => { API.tokensWissen(); })
        .finally(() => setLaden(false));
    } else {
      setLaden(false);
    }
  }, []);

  // ── Data ophalen uit API ───────────────────────────────────
  async function laadAlleData() {
    try {
      const [k, p, a] = await Promise.all([
        API.haalKlantenOp(),
        API.haalProductenOp(),
        API.haalAgendaOp(),
      ]);
      // Zet offertes in klanten zodat de bestaande componenten werken
      const offertes = await API.haalOffertesOp();
      const normaliseOfferte = o => ({
        ...o,
        // Normaliseer veldnamen van API naar wat de componenten verwachten
        totaalInclBtw: parseFloat(o.totaal_incl_btw) || 0,
        inclBtw:       !!o.incl_btw,
        betaald:       o.status === 'betaald',
        datum:         o.datum ? o.datum.toString().slice(0, 10) : '',
        bedrijfAdres:  o.bedrijf_adres || '',
        btwNr:         o.btw_nummer || '',
        template:      o.offerte_tekst || '',
        regels:        (o.regels || []).map(r => ({
          ...r,
          isVariabel: !!r.is_variabel,
        })),
      });
      const klantenMetOffertes = k.map(klant => ({
        ...klant,
        offertes: offertes.filter(o => o.klant_id === klant.id).map(normaliseOfferte),
      }));
      setKlantenState(klantenMetOffertes);
      setProductenState(p.map(prod => ({
        ...prod,
        categorie: prod.categorie_naam || prod.categorie || '',
      })));
      setAgendaState(a.map(afspraak => ({
        ...afspraak,
        klantId: afspraak.klant_id,
        tijd:    afspraak.tijd_van,
        tijdTot: afspraak.tijd_tot,
      })));
      // Laad werkbonnen en kassa bonnen voor klantenpagina
      try {
        const [wb, kb] = await Promise.all([
          API.haalWerkbonnenOp(),
          API.haalKassaBonnenOp(),
        ]);
        setAppWerkbonnen(wb);
        setAppKassaBonnen(kb);
      } catch(e) { console.error('Werkbonnen/kassa laden mislukt:', e); }
      setAutoRetryPoging(0);
      setApiError(null);
    } catch (e) {
      console.error('Data laden mislukt:', e);
      // Probeer automatisch een paar keer opnieuw voordat de rode foutmelding getoond wordt
      setAutoRetryPoging(prev => {
        const nieuwePoging = prev + 1;
        if (nieuwePoging <= 3) {
          const vertraging = nieuwePoging * 1500; // 1.5s, 3s, 4.5s
          setTimeout(() => { laadAlleData(); }, vertraging);
        } else {
          setApiError(e.message);
        }
        return nieuwePoging;
      });
    }
  }

  // ── Data accessors op basis van modus ─────────────────────
  const actieveKlanten   = isDemoMode ? demoKlanten   : klanten;
  const actieveProducten = isDemoMode ? demoProducten : producten;
  const actieveAgenda    = isDemoMode ? demoAgenda    : agenda;

  // ── Klanten setters ────────────────────────────────────────
  async function setKlanten(fn) {
    if (isDemoMode) { setDemoKlanten(fn); return; }
    const nieuw = typeof fn === 'function' ? fn(klanten) : fn;
    setKlantenState(nieuw);
    // Synchroniseer gewijzigde klanten naar API
    // (individuele CRUD gaat via de pagina-componenten direct)
  }

  // ── Producten setters ──────────────────────────────────────
  async function setProducten(fn) {
    if (isDemoMode) { setDemoProducten(fn); return; }
    const nieuw = typeof fn === 'function' ? fn(producten) : fn;
    setProductenState(nieuw);
  }

  // ── Agenda setters ─────────────────────────────────────────
  async function setAgenda(fn) {
    if (isDemoMode) { setDemoAgenda(fn); return; }
    const nieuw = typeof fn === 'function' ? fn(agenda) : fn;
    setAgendaState(nieuw);
  }

  // ── Login ──────────────────────────────────────────────────
  async function doLogin(gebruiker) {
    setHuidigUser(gebruiker);
    await laadAlleData();
    // Welkomstmelding bij eerste keer inloggen
    if (gebruiker.login_count === 1) {
      setWelkomModal(true);
    }
  }

  // ── Logout ─────────────────────────────────────────────────
  async function logout() {
    await API.logout().catch(() => {});
    setHuidigUser(null); setIsDemoMode(false);
    setKlantenState([]); setProductenState([]); setAgendaState([]);
    setPagina("klanten"); setInstellOpen(false); setProfielOpen(false);
  }

  // ── Demo modus ─────────────────────────────────────────────
  function startDemo() {
    setIsDemoMode(true);
    setDemoKlanten(DEMO_KLANTEN); setDemoProducten(DEMO_PRODUCTEN); setDemoAgenda(DEMO_AGENDA);
    setPagina("klanten");
  }

  // ── Laadscherm ────────────────────────────────────────────
  if (laden) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
        background:"linear-gradient(160deg,#0f1e2e 0%,#1a3a5c 50%,#0f1e2e 100%)" }}>
        <div style={{ textAlign:"center", color:"#fff" }}>
          <div style={{ fontSize:48, marginBottom:16 }}>⏳</div>
          <p style={{ fontSize:16, opacity:0.8 }}>{VERTALINGEN[localStorage.getItem("dencrm_taal")||"nl"]?.laden||"DenCRM laden…"}</p>
        </div>
      </div>
    );
  }

  // ── Login scherm ───────────────────────────────────────────
  if (!huidigUser && !isDemoMode) {
    return (
      <LoginPage
        onLogin={async (gebruiker) => { await doLogin(gebruiker); }}
        onDemo={startDemo}
        kleur={kleur}
        taal={taal}
        setTaal={setTaal}
      />
    );
  }

  // ── Lidmaatschap check (niet voor admins en niet in demo) ──
  if (!isDemoMode && huidigUser && !huidigUser.is_admin) {
    const lidTot = huidigUser.lidmaatschap_tot;
    const lidGeldig = lidTot ? new Date(lidTot) >= new Date() : false;
    if (!lidGeldig) {
      return (
        <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
          background:"linear-gradient(160deg,#0f1e2e 0%,#1a3a5c 50%,#0f1e2e 100%)", padding:"1rem" }}>
          <div style={{ background:"#fff", borderRadius:24, padding:"2.5rem", maxWidth:520, width:"100%",
            boxShadow:"0 24px 80px rgba(0,0,0,0.35)", textAlign:"center" }}>
            <img src="afbeeldingen/dencrm.png" alt="DenCRM" style={{ height:80, marginBottom:"1rem" }}
              onError={e=>e.target.style.display="none"} />
            <h2 style={{ margin:"0 0 0.5rem", fontSize:22, color:"#1a1a1a" }}>Lidmaatschap verlopen</h2>
            <p style={{ color:"#666", fontSize:14, marginBottom:"1rem", lineHeight:1.6 }}>
              Uw lidmaatschap is verlopen. Verleng hieronder om weer toegang te krijgen tot DenCRM.
            </p>

            <div style={{ background:"#eaf3de", borderRadius:10, padding:"10px 14px", marginBottom:"1.5rem" }}>
              <p style={{ margin:0, fontSize:13, color:"#27500a", lineHeight:1.5 }}>
                🔓 <strong>U zit nergens aan vast.</strong> Geen abonnement, geen automatische verlenging.
                U bepaalt zelf hoelang u DenCRM gebruikt door een periode aan te schaffen — daarna stopt het vanzelf.
              </p>
            </div>

            {/* Voordelen */}
            <div style={{ background:"#f0f4ff", borderRadius:12, padding:"14px 16px", marginBottom:"1.5rem", textAlign:"left" }}>
              <p style={{ margin:"0 0 8px", fontWeight:600, fontSize:14, color:"#185FA5" }}>✓ Wat u krijgt:</p>
              {["Volledige toegang tot alle modules","Klanten, Offertes, Kassa, Agenda, Werkbonnen","Onbeperkt gebruikers en data","Nooit extra kosten voor nieuwe modules — altijd inbegrepen"].map(v=>(
                <p key={v} style={{ margin:"3px 0", fontSize:13, color:"#333" }}>✓ {v}</p>
              ))}
            </div>

            {/* Prijsopties */}
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:"1.5rem" }}>
              {[
                { label:"1 maand", prijs:"€9,99", sub:"Maandelijks opzegbaar" },
                { label:"6 maanden", prijs:"€49,99", sub:"Bespaar €9,95 t.o.v. maandelijks" },
                { label:"1 jaar", prijs:"€89,99", sub:"Bespaar €29,89 t.o.v. maandelijks", aanbevolen:true },
              ].map(opt=>(
                <div key={opt.label} style={{ position:"relative", padding:"14px 16px", borderRadius:12,
                  border:`2px solid ${opt.aanbevolen ? kleur.hoofd : "#ddd"}`,
                  background: opt.aanbevolen ? kleur.licht : "#fafafa",
                  display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"default" }}>
                  {opt.aanbevolen && (
                    <span style={{ position:"absolute", top:-10, right:12, fontSize:11, fontWeight:700,
                      background:kleur.hoofd, color:"#fff", padding:"2px 10px", borderRadius:99 }}>
                      Meest gekozen
                    </span>
                  )}
                  <div style={{ textAlign:"left" }}>
                    <p style={{ margin:0, fontWeight:600, fontSize:15 }}>{opt.label}</p>
                    <p style={{ margin:0, fontSize:12, color:"#888" }}>{opt.sub}</p>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <p style={{ margin:0, fontWeight:700, fontSize:18, color:kleur.hoofd }}>{opt.prijs}</p>
                    <p style={{ margin:0, fontSize:11, color:"#aaa" }}>Binnenkort beschikbaar</p>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ fontSize:12, color:"#aaa", marginBottom:"1rem" }}>
              Betaling via Mollie (iDEAL, creditcard) — binnenkort beschikbaar.<br/>
              Neem contact op via <a href="mailto:info@dencrm.nl" style={{ color:kleur.hoofd }}>info@dencrm.nl</a> voor handmatige verlenging.
            </p>
            <button onClick={logout}
              style={{ padding:"10px 20px", borderRadius:8, background:"#f0f0f0",
                border:"none", cursor:"pointer", fontSize:13, color:"#666" }}>
              Uitloggen
            </button>
          </div>
        </div>
      );
    }
  }

  const alleNav = [
    { id:"kassa",      label:T?.kassa||"Kassa",              icon:"🧾" },
    { id:"werkbonnen", label:T?.werkbonnen||"Werkbonnen & Reparaties", icon:"🔧" },
    { id:"klanten",    label:T.klanten,    icon:"👥" },
    { id:"producten",  label:T.producten,  icon:"📦" },
    { id:"agenda",     label:T.agenda,     icon:"📅" },
    { id:"offertes",   label:T.offertes,   icon:"📄" },
    { id:"financieel", label:T?.financieel||"Financieel overzicht", icon:"💶" },
    ...(!isDemoMode && huidigUser?.is_admin ? [
      { id:"gebruikers", label:T.gebruikers, icon:"🔐" },
      { id:"support",    label:T?.supportInbox||"Support inbox", icon:"📥" },
    ] : []),
    { id:"declaraties", label:T?.declaraties||"Declaraties & Boekhouding", icon:"🧮" },
    { id:"contact",    label:T.contact||"Contact", icon:"💬" },
    ...((!isDemoMode && huidigUser && (() => {
      const lc = huidigUser.login_count || 0;
      if (huidigUser.review_status === 'geplaatst') return false; // nooit meer tonen
      if (huidigUser.review_status === 'geweigerd') {
        const geweigerdBij = huidigUser.review_geweigerd_bij_login || 0;
        return lc - geweigerdBij >= 10; // opnieuw na 10 logins
      }
      return lc >= 5; // eerste keer na 5 logins
    })()) ? [
      { id:"review", label:"Plaats een Review", icon:"⭐", isReview:true },
    ] : []),
  ];

  const nav = alleNav.filter(n => modulesAan[n.id] !== false);

  const tekstK      = isDark ? "#e8e8e8" : "#1a1a1a";
  const gebruikersnaam = isDemoMode ? "Demo modus" : huidigUser?.naam;

  return (
    <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh",
      fontFamily:"var(--font-sans)", fontSize:fs, background:bg.w, color:tekstK }}>

      {isDemoMode && <DemoBanner onUitloggen={logout} fs={fs} T={T} />}

      {/* API foutmelding banner */}
      {apiError && !isDemoMode && (
        <div style={{ background:"#7f1d1d", color:"#fff", padding:"20px 24px",
          display:"flex", alignItems:"center", gap:20, boxShadow:"0 4px 16px rgba(0,0,0,0.3)" }}>
          <span style={{ fontSize:32, flexShrink:0 }}>⚠</span>
          <div style={{ flex:1 }}>
            <p style={{ margin:0, fontWeight:700, fontSize:fs+3 }}>Verbinding met de server mislukt</p>
            <p style={{ margin:"4px 0 0", fontSize:fs, opacity:0.95, lineHeight:1.5 }}>
              {apiError}
            </p>
            <p style={{ margin:"6px 0 0", fontSize:fs, fontWeight:600, lineHeight:1.5 }}>
              Druk op de knop "Opnieuw proberen" om de connectie te herstellen. Zolang deze rode balk
              aanwezig is, kan het zijn dat uw bewerkingen niet opgeslagen worden.
            </p>
          </div>
          <button onClick={()=>{ setApiError(null); setAutoRetryPoging(0); laadAlleData(); }}
            style={{ flexShrink:0, padding:"12px 24px", borderRadius:10,
              background:"#fff", color:"#7f1d1d", border:"none", cursor:"pointer",
              fontSize:fs+1, fontWeight:700, whiteSpace:"nowrap" }}>
            🔄 Opnieuw proberen
          </button>
        </div>
      )}

      <div style={{ display:"flex", flex:1, flexDirection: isMobiel ? "column" : "row" }}>

        {isMobiel && (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"0.75rem 1rem", background:isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",
            borderBottom:`0.5px solid ${isDark?"rgba(255,255,255,0.12)":"rgba(0,0,0,0.1)"}`,
            position:"sticky", top:0, zIndex:100 }}>
            <button onClick={()=>setMobielMenuOpen(o=>!o)}
              style={{ background:"none", border:"none", cursor:"pointer", fontSize:22,
                color:tekstK, padding:"4px 8px", display:"flex", alignItems:"center", gap:8 }}>
              {mobielMenuOpen ? "✕" : "☰"}
              <span style={{ fontSize:fs }}>{nav.find(n=>n.id===pagina)?.icon} {nav.find(n=>n.id===pagina)?.label}</span>
            </button>
            <h1 style={{ margin:0, fontSize:fs+2, fontWeight:500, color:kleur.hoofd, flexShrink:0 }}>DenCRM</h1>
          </div>
        )}

        {(!isMobiel || mobielMenuOpen) && (
        <aside style={{
          width: isMobiel ? "100%" : 220, flexShrink:0,
          background:isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",
          borderRight: isMobiel ? "none" : `0.5px solid ${isDark?"rgba(255,255,255,0.12)":"rgba(0,0,0,0.1)"}`,
          borderBottom: isMobiel ? `0.5px solid ${isDark?"rgba(255,255,255,0.12)":"rgba(0,0,0,0.1)"}` : "none",
          padding:"1.5rem 1rem", display:"flex", flexDirection:"column", position: isMobiel ? "relative" : "relative",
          maxHeight: isMobiel ? "80vh" : "none", overflowY: isMobiel ? "auto" : "visible", zIndex: isMobiel ? 90 : "auto" }}>
          {!isMobiel && (
            <div style={{ marginBottom:"2rem" }}>
              <h1 style={{ margin:0, fontSize:fs+4, fontWeight:500, color:kleur.hoofd }}>DenCRM</h1>
              <p style={{ margin:"2px 0 0", fontSize:fs-2, color:isDark?"rgba(255,255,255,0.5)":"#888" }}>
                {actieveKlanten.length} klanten · {actieveProducten.length} producten
              </p>
            </div>
          )}
          <nav style={{ flex:1 }}>
            {nav.map(n=>(
              <button key={n.id} onClick={()=>{ n.isReview ? setReviewModal(true) : setPagina(n.id); setMobielMenuOpen(false); }}
                style={{ display:"flex", alignItems:"center", gap:10, width:"100%",
                padding:"10px 12px", borderRadius:8,
                background: n.isReview ? "#fffbf0" : (pagina===n.id?kleur.hoofd:"none"),
                color: n.isReview ? "#7a5800" : (pagina===n.id?"#fff":(isDark?"rgba(255,255,255,0.85)":tekstK)),
                border: n.isReview ? "1px dashed #e8c44a" : "none",
                cursor:"pointer", fontSize:fs, textAlign:"left", marginBottom:4, fontWeight: n.isReview?600:400 }}>
                <span>{n.icon}</span> {n.label}
                {n.id==="gebruikers"&&<span style={{ marginLeft:"auto", fontSize:10, background:"rgba(255,255,255,0.25)", borderRadius:99, padding:"1px 6px" }}>Admin</span>}
              </button>
            ))}
          </nav>

          {instellOpen&&(
            <InstellingenPanel kleur={kleur} kleurIdx={kleurIdx} setKleurIdx={setKleurIdx}
              fs={fs} setFs={setFs} bgIdx={bgIdx} setBgIdx={setBgIdx}
              taal={taal} setTaal={setTaal} T={T}
              modulesAan={modulesAan} setModulesAan={setModulesAan}
              lidmaatschapTot={huidigUser?.lidmaatschap_tot} isAdmin={huidigUser?.is_admin || isDemoMode}
              isGekoppeld={!!huidigUser?.hoofdgebruiker_id}
              toegestaneModules={huidigUser?.toegestane_modules ? huidigUser.toegestane_modules.split(',') : null}
              onOpenKoppelAccounts={()=>{ setInstellOpen(false); setKoppelAccountsOpen(true); }}
              onClose={()=>setInstellOpen(false)} />
          )}

          {koppelAccountsOpen && !isDemoMode && (
            <KoppelAccountsPanel kleur={kleur} fs={fs} onClose={()=>setKoppelAccountsOpen(false)} />
          )}

          {profielOpen && !isDemoMode && huidigUser && (
            <ProfielPanel
              user={huidigUser}
              setUsers={() => {}} // wordt afgehandeld via API
              onWachtwoordWijzigen={async (huidig, nieuw) => {
                await API.wijzigWachtwoord(huidig, nieuw);
              }}
              onClose={()=>setProfielOpen(false)}
              kleur={kleur} fs={fs} T={T}
            />
          )}

          <div style={{ borderTop:`0.5px solid ${isDark?"rgba(255,255,255,0.12)":"rgba(0,0,0,0.1)"}`, paddingTop:8, marginTop:8 }}>
            <button onClick={()=>setInstellOpen(o=>!o)} style={{ display:"flex", alignItems:"center", gap:8, width:"100%",
              padding:"9px 12px", borderRadius:8,
              background:instellOpen?kleur.licht:"none",
              color:instellOpen?kleur.donker:(isDark?"rgba(255,255,255,0.7)":"#666"),
              border:"none", cursor:"pointer", fontSize:fs, textAlign:"left" }}>
              ⚙ {T.instellingen}
            </button>

            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 12px",
              borderRadius:8, cursor:isDemoMode?"default":"pointer",
              background:profielOpen?kleur.licht:"none", transition:"background 0.15s" }}
              onClick={()=>{ if(!isDemoMode){ setProfielOpen(o=>!o); setInstellOpen(false); } }}>
              {isDemoMode
                ? <span style={{ fontSize:18 }}>🧪</span>
                : <Avatar naam={gebruikersnaam} size={26} kleur={kleur} />
              }
              <span style={{ flex:1, fontSize:fs-2,
                overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
                color: isDemoMode?"#f97316":(isDark?"rgba(255,255,255,0.6)":"#666"),
                fontStyle:isDemoMode?"italic":"normal" }}>{gebruikersnaam}</span>
              {!isDemoMode && <span style={{ fontSize:10, color:isDark?"rgba(255,255,255,0.4)":"#bbb" }}>▲</span>}
              <button onClick={e=>{e.stopPropagation();logout();}} title="Uitloggen"
                style={{ background:"none",border:"none",cursor:"pointer",
                  fontSize:16,padding:2,color:isDark?"rgba(255,255,255,0.5)":"#aaa" }}>⏻</button>
            </div>
          </div>
        </aside>
        )}

        <main style={{ flex:1, padding: isMobiel ? "1rem" : "1.5rem 2rem", overflowY:"auto", overflowX:"hidden", minWidth:0 }}>
          <h2 style={{ margin:"0 0 1.25rem", fontSize: isMobiel ? fs+2 : fs+6, fontWeight:500, color:tekstK }}>
            {!isMobiel && <>{nav.find(n=>n.id===pagina)?.icon} {nav.find(n=>n.id===pagina)?.label}</>}
          </h2>
          {pagina==="klanten"    && <KlantenPage   klanten={actieveKlanten} setKlanten={setKlanten} producten={actieveProducten} agenda={actieveAgenda} werkbonnen={appWerkbonnen} kassaBonnen={appKassaBonnen} kleur={kleur} fs={fs} isDemoMode={isDemoMode} herlaad={laadAlleData} T={T} isMobiel={isMobiel} />}
          {pagina==="producten"  && <ProductenPage producten={actieveProducten} setProducten={setProducten} kleur={kleur} fs={fs} isDemoMode={isDemoMode} herlaad={laadAlleData} T={T} />}
          {pagina==="agenda"     && <AgendaPage    klanten={actieveKlanten} agenda={actieveAgenda} setAgenda={setAgenda} kleur={kleur} fs={fs} isDemoMode={isDemoMode} herlaad={laadAlleData} T={T} instellingen={instellingen} updateInstelling={updateInstelling} />}
          {pagina==="offertes"   && <OffertesPage  klanten={actieveKlanten} setKlanten={setKlanten} producten={actieveProducten} kleur={kleur} fs={fs} isDemoMode={isDemoMode} herlaad={laadAlleData} T={T} instellingen={instellingen} updateInstelling={updateInstelling} />}
          {pagina==="financieel" && <FinancieelPage klanten={actieveKlanten} setKlanten={setKlanten} kleur={kleur} fs={fs} isDemoMode={isDemoMode} herlaad={laadAlleData} T={T} />}
          {pagina==="kassa"      && <KassaPage producten={actieveProducten} klanten={actieveKlanten} kleur={kleur} fs={fs} isDemoMode={isDemoMode} herlaad={laadAlleData} T={T} instellingen={instellingen} updateInstelling={updateInstelling} isMobiel={isMobiel} />}
          {pagina==="werkbonnen" && <WerkbonnenPage klanten={actieveKlanten} setKlanten={setKlanten} kleur={kleur} fs={fs} isDemoMode={isDemoMode} herlaad={laadAlleData} T={T} isMobiel={isMobiel} />}
          {pagina==="declaraties" && <DeclaratiesPage kleur={kleur} fs={fs} isDemoMode={isDemoMode} T={T} isMobiel={isMobiel} />}
          {pagina==="contact"    && <ContactPage huidigUser={huidigUser} kleur={kleur} fs={fs} T={T} />}
          {pagina==="gebruikers" && !isDemoMode && huidigUser?.is_admin && <GebruikersBeheer users={[]} setUsers={()=>{}} kleur={kleur} fs={fs} T={T} huidigUserId={huidigUser?.id} />}
          {pagina==="support"    && !isDemoMode && huidigUser?.is_admin && <SupportInboxPage kleur={kleur} fs={fs} />}
        </main>
      </div>

      {/* ── Welkomstmelding bij eerste login ── */}
      {welkomModal && !isDemoMode && (
        <WelkomOnboardingModal kleur={kleur} modulesAan={modulesAan} setModulesAan={setModulesAan}
          onClose={()=>setWelkomModal(false)} />
      )}

      {/* ── Review modal ── */}
      {reviewModal && (
        <ReviewModal
          huidigUser={huidigUser}
          kleur={kleur} fs={fs}
          onClose={()=>setReviewModal(false)}
          onGeplaatst={()=>{
            setHuidigUser(u=>({...u, review_status:'geplaatst'}));
            setReviewModal(false);
          }}
          onGeweigerd={()=>{
            setHuidigUser(u=>({...u, review_status:'geweigerd', review_geweigerd_bij_login: u.login_count||0}));
            setReviewModal(false);
          }}
        />
      )}
    </div>
  );
}

// ── REVIEW MODAL ──────────────────────────────────────────────
function ReviewModal({ huidigUser, kleur, fs, onClose, onGeplaatst, onGeweigerd }) {
  const [sterren, setSterren] = useState(0);
  const [hoverSter, setHoverSter] = useState(0);
  const [tekst, setTekst] = useState("");
  const [bezig, setBezig] = useState(false);
  const [bedankt, setBedankt] = useState(false);

  async function plaats() {
    if (sterren === 0) { alert("Selecteer minimaal 1 ster."); return; }
    setBezig(true);
    try {
      await API.plaatsReview(sterren, tekst);
      setBedankt(true);
      setTimeout(() => onGeplaatst(), 1800);
    } catch(e) { alert("Plaatsen mislukt: "+e.message); }
    finally { setBezig(false); }
  }

  async function weiger() {
    try { await API.weigerReview(); } catch {}
    onGeweigerd();
  }

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)",
      display:"flex", alignItems:"center", justifyContent:"center", zIndex:2000, padding:"1rem" }}
      onClick={e=>e.target===e.currentTarget && onClose()}>
      <div style={{ background:"#fff", borderRadius:16, padding:"2rem", width:"100%", maxWidth:460,
        boxShadow:"0 16px 48px rgba(0,0,0,0.25)" }}>

        {bedankt ? (
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:56, marginBottom:"0.75rem" }}>🎉</div>
            <h2 style={{ margin:"0 0 0.5rem", color:"#27500a" }}>Bedankt voor uw review!</h2>
            <p style={{ color:"#666", fontSize:14 }}>We waarderen uw feedback enorm.</p>
          </div>
        ) : (
          <>
            <h2 style={{ margin:"0 0 0.5rem", fontSize:20, color:"#1a1a1a" }}>⭐ Plaats een review</h2>
            <p style={{ color:"#666", fontSize:13, lineHeight:1.5, marginBottom:"1.25rem" }}>
              Wat vindt u van DenCRM? Uw mening helpt ons te verbeteren.
            </p>

            {/* Sterren */}
            <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:"1.25rem" }}>
              {[1,2,3,4,5].map(s => (
                <button key={s}
                  onClick={()=>setSterren(s)}
                  onMouseEnter={()=>setHoverSter(s)}
                  onMouseLeave={()=>setHoverSter(0)}
                  style={{ background:"none", border:"none", cursor:"pointer", fontSize:36, padding:2,
                    color: s <= (hoverSter||sterren) ? "#f5b400" : "#ddd",
                    transition:"color 0.1s" }}>
                  ★
                </button>
              ))}
            </div>

            <textarea value={tekst} onChange={e=>setTekst(e.target.value)}
              placeholder="Vertel ons over uw ervaring met DenCRM (optioneel)…"
              rows={4}
              style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:"1px solid #ddd",
                background:"#fafafa", fontSize:14, color:"#1a1a1a", boxSizing:"border-box",
                resize:"vertical", marginBottom:"1rem" }} />

            <div style={{ background:"#f0f4ff", borderRadius:8, padding:"10px 14px", marginBottom:"1.25rem" }}>
              <p style={{ margin:0, fontSize:12, color:"#2a4ab5", lineHeight:1.5 }}>
                ℹ De naam van uw bedrijf (<strong>{huidigUser?.bedrijfsnaam || huidigUser?.naam}</strong>) wordt
                gekoppeld aan deze review en kan getoond worden aan bezoekers van DenCRM.
              </p>
            </div>

            <div style={{ display:"flex", gap:8 }}>
              <button onClick={weiger}
                style={{ flex:1, padding:"11px", borderRadius:10, background:"#f5f5f5",
                  color:"#666", border:"1px solid #ddd", cursor:"pointer", fontSize:13 }}>
                Nee, ik wil geen review plaatsen
              </button>
              <button onClick={plaats} disabled={bezig}
                style={{ flex:1, padding:"11px", borderRadius:10, background:kleur.hoofd,
                  color:"#fff", border:"none", cursor:"pointer", fontSize:13, fontWeight:600,
                  opacity:bezig?0.7:1 }}>
                {bezig ? "Bezig…" : "✓ Review plaatsen"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
