# Leeswijzer — juridische documenten DenCRM

Deze map bevat drie concept-documenten, klaargezet zodat je zelf onderzoek kunt doen naar
de exacte wet- en regelgeving en de documenten kunt aanscherpen of laten controleren.

## ⚠️ Belangrijk vooraf

Ik ben geen jurist en dit is geen juridisch advies. Deze documenten zijn opgesteld op basis
van standaardpraktijk voor Nederlandse SaaS-bedrijven en de AVG-hoofdlijnen, maar:

- Elk document bevat `[TODO: ...]`-markeringen op plekken waar een keuze, aanvulling, of
  bevestiging nodig is
- Laat de documenten — zeker de Verwerkersovereenkomst, die juridisch bindend is —
  controleren door een jurist of AVG-specialist voordat je ze publiceert
- Sommige zaken (zoals of je een Functionaris Gegevensbescherming nodig hebt, en de exacte
  bewaartermijnen) hangen af van keuzes die alleen jij kunt maken

## De drie documenten

1. **privacyverklaring.md** — voor de gebruikers van DenCRM (de ZZP'ers/winkeliers die een
   account hebben), over wat DenCRM zelf van hén verzamelt en waarom.

2. **verwerkersovereenkomst.md** — het formele document tussen DenCRM (als verwerker) en
   elke gebruiker (als verwerkingsverantwoordelijke) over hoe DenCRM omgaat met de
   klantgegevens die de gebruiker zélf in de app invoert. Dit is wettelijk verplicht
   (art. 28 AVG) zodra je persoonsgegevens namens anderen verwerkt — en dat doe je, want
   elke DenCRM-gebruiker voert de gegevens van zíjn klanten in.

3. **cookie-en-lokale-opslagverklaring.md** — kort document, want DenCRM gebruikt geen
   trackingcookies. Beschrijft wel de technische lokale opslag die nodig is om ingelogd te
   blijven.

## Wat ik verder al heb aangepast in de code

Tijdens het opstellen van deze documenten viel me een concreet beveiligingsprobleem op dat
ik gelijk heb gefixt, los van deze documenten zelf:

**Wachtwoorden werden bij "Onthoud mijn gegevens" in leesbare vorm opgeslagen in de
lokale opslag van de browser.** Dat is nu gecorrigeerd — alleen de gebruikersnaam wordt nog
onthouden; het wachtwoord onthouden gebeurt voortaan (indien de gebruiker dat wil) via de
eigen, veilige wachtwoordbeheerder van de browser zelf, niet meer via DenCRM.

## Suggesties voor vervolgstappen

- [TODO] Bepaal of je bij registratie een expliciete akkoord-checkbox wilt voor de
  Verwerkersovereenkomst (aan te raden, sterker dan alleen "door gebruik gaat u akkoord")
- [TODO] Vraag na bij Mollie, Brevo, TransIP en Ibanity/Ponto of zij zelf al een
  verwerkersovereenkomst met jou als hun klant hebben klaarstaan (meestal wel, vaak
  standaard beschikbaar via hun eigen voorwaarden-pagina)
- [TODO] Bepaal concrete bewaartermijnen (hoe lang bewaar je gegevens na accountopzegging?)
- [TODO] Overweeg of een Functionaris Gegevensbescherming nodig/wenselijk is
- [TODO] Zodra de documenten definitief zijn, kan ik ze eventueel ook netjes in de app zelf
  integreren (bijvoorbeeld als aparte, leesbare pagina's naast de bestaande "Algemene
  voorwaarden"-modal op het inlogscherm) — zeg het maar als je dat wilt
