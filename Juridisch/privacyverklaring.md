# Privacyverklaring DenCRM

> ⚠️ **DIT IS EEN CONCEPT, GEEN JURIDISCH GECONTROLEERD DOCUMENT.**
> Dit document is opgesteld op basis van algemene AVG/GDPR-praktijk voor Nederlandse SaaS-bedrijven,
> maar is **niet door een jurist beoordeeld**. Claude is geen advocaat en dit is geen juridisch advies.
> Laat dit document controleren door een jurist of AVG-specialist voordat het publiceert wordt,
> zeker gezien DenCRM persoonsgegevens verwerkt namens haar gebruikers (zie ook de
> Verwerkersovereenkomst). Vul de gemarkeerde plekken [TODO: ...] zelf aan.

**Laatst bijgewerkt:** [TODO: datum invullen bij publicatie]

## 1. Wie zijn wij?

Dennis Software Solutions
KVK: 42105830
BTW-nummer: NL005497501B33
E-mail: info@dencrm.nl
Website: dencrm.nl

[TODO: eventueel post-/bezoekadres toevoegen — de AVG vereist geen fysiek adres in de
privacyverklaring, maar het komt de duidelijkheid/vertrouwen ten goede]

Deze privacyverklaring beschrijft welke persoonsgegevens wij verzamelen wanneer u een
account aanmaakt en DenCRM gebruikt, en hoe wij daarmee omgaan.

**Let op het onderscheid:** deze verklaring gaat over de gegevens die **wij als DenCRM**
van **u** (de accounthouder) verzamelen. Gegevens die u zelf in DenCRM invoert over úw eigen
klanten (bijvoorbeeld in de module Klanten) vallen onder een aparte regeling — zie de
**Verwerkersovereenkomst**, want daarvoor bent u zelf de verwerkingsverantwoordelijke en
treedt DenCRM op als verwerker.

## 2. Welke gegevens verzamelen wij van u?

### 2.1 Bij het aanmaken van een account
- Naam
- Bedrijfsnaam
- E-mailadres
- Gebruikersnaam
- Wachtwoord (dit wordt bij ons **nooit** in leesbare vorm opgeslagen, alleen als
  onomkeerbare hash met bcrypt)

### 2.2 Bij het invullen van uw bedrijfsprofiel (optioneel)
- Bedrijfsadres
- IBAN
- BTW-nummer
- Bedrijfslogo

### 2.3 Automatisch verzameld tijdens gebruik
- Inlogtijdstippen en -frequentie (login_count, laatste inlogmoment)
- IP-adres, uitsluitend kortstondig, voor beveiligingsdoeleinden (zie §7)
- Technische sessiegegevens (toegangstokens) — zie §6 over lokale opslag

### 2.4 Bij een betaling (abonnement)
Wanneer u een abonnementsperiode aanschaft, verloopt de betaling via Mollie. Wij ontvangen
van Mollie een bevestiging van de betaling (bedrag, datum, status) maar **niet** uw volledige
betaalgegevens (zoals een creditcardnummer of bankrekeningnummer) — die worden rechtstreeks
door Mollie verwerkt.

### 2.5 Bij gebruik van de optionele bankkoppeling
Kiest u ervoor uw bankrekening te koppelen via Ponto (Ibanity/Isabel Group), dan gaat u
daarvoor een aparte, rechtstreekse overeenkomst aan met Ponto — inclusief hun eigen
facturering (± €4/maand per gekoppelde rekening). DenCRM ontvangt via deze koppeling
uw banktransactiegegevens (datum, bedrag, omschrijving, naam tegenpartij) om deze in uw
eigen declaraties-overzicht te tonen. Wij ontvangen **geen** toegang tot uw bankrekening
zelf, alleen tot de transactiegegevens die u expliciet deelt bij het koppelen.

## 3. Waarvoor gebruiken wij uw gegevens?

| Doel | Rechtsgrond (AVG) |
|---|---|
| Het aanmaken en beheren van uw account | Uitvoering van de overeenkomst (art. 6.1.b) |
| Het functioneren van de Dienst (bijv. uw logo tonen op offertes) | Uitvoering van de overeenkomst |
| Facturering van uw abonnement | Uitvoering van de overeenkomst |
| Klantenservice en support-vragen beantwoorden | Uitvoering van de overeenkomst |
| Beveiliging (bijv. het blokkeren van verdachte inlogpogingen) | Gerechtvaardigd belang (art. 6.1.f) |
| Automatische betalingsherinneringen versturen (indien door u geactiveerd) | Uitvoering van de overeenkomst, in opdracht van u |
| Marketing/nieuwsbrief | [TODO: alleen invullen indien van toepassing — vereist expliciete toestemming, art. 6.1.a] |

Wij verkopen uw gegevens **nooit** aan derden en gebruiken ze niet voor advertentiedoeleinden.

## 4. Met wie delen wij uw gegevens? (sub-verwerkers)

Voor het functioneren van DenCRM maken wij gebruik van de volgende externe partijen, die
daarbij (een deel van) uw gegevens verwerken:

| Partij | Doel | Locatie (voor zover bekend) |
|---|---|---|
| TransIP B.V. | Hosting van de server waarop DenCRM draait | Nederland |
| Brevo (voorheen Sendinblue) | Versturen van transactionele e-mails (bijv. wachtwoord-reset, facturen) | EU (Frankrijk) |
| Mollie B.V. | Verwerken van abonnementsbetalingen | Nederland |
| Ibanity/Isabel Group (Ponto) | Optionele bankkoppeling, uitsluitend indien u dit zelf activeert | België |

[TODO: controleer of deze lijst compleet en actueel is, en of er verwerkersovereenkomsten
met elk van deze partijen zijn afgesloten — dit is een AVG-verplichting]

Wij delen uw gegevens niet met andere derden, behalve wanneer wij daartoe wettelijk
verplicht zijn (bijvoorbeeld een gerechtelijk bevel).

## 5. Hoe lang bewaren wij uw gegevens?

- Accountgegevens: zolang uw account actief is, plus [TODO: bepaal bewaartermijn na
  opzegging, bijv. 30 dagen] na beëindiging, tenzij een langere bewaarplicht geldt
  (bijvoorbeeld de fiscale bewaarplicht van 7 jaar voor facturen die via DenCRM zijn
  gemaakt — deze blijft echter uw eigen verantwoordelijkheid als verwerkingsverantwoordelijke)
- Verlopen inlog- en resettokens: worden automatisch dagelijks opgeruimd
- Logingeschiedenis: [TODO: bewaartermijn bepalen]

## 6. Lokale opslag in uw browser (geen tracking-cookies)

DenCRM gebruikt **geen tracking-cookies** en plaatst geen advertentie- of
analyse-cookies. Wel slaan wij, om u ingelogd te houden, een beperkt aantal technische
gegevens op in de lokale opslag (`localStorage`) van uw browser:

- Een toegangstoken en vernieuwingstoken (om u ingelogd te houden zonder steeds opnieuw
  te moeten inloggen)
- Optioneel, indien u "Onthoud mijn gegevens" aanvinkt: uw gebruikersnaam (nooit uw
  wachtwoord — dat onthoudt hoogstens uw eigen browser via zijn ingebouwde
  wachtwoordbeheer, dat volledig buiten DenCRM om werkt)

Deze gegevens verlaten uw apparaat niet, behalve richting onze eigen server om u te
authenticeren. Zie ook de losse Cookie- en lokale-opslagverklaring.

## 7. Beveiliging

Wij nemen de bescherming van uw gegevens serieus en hebben onder meer de volgende
maatregelen getroffen:
- Alle verbindingen verlopen via HTTPS (versleuteld)
- Wachtwoorden worden gehasht opgeslagen (bcrypt), nooit in leesbare vorm
- Optionele twee-factor-authenticatie (2FA)
- Beveiligingsgevoelige gegevens (zoals tweefactor-geheimen) worden extra versleuteld
  opgeslagen (AES-256)
- Automatische limitering van inlogpogingen ter voorkoming van misbruik
- Dagelijkse back-ups van de database

## 8. Uw rechten

Op grond van de AVG heeft u het recht om:
- Inzage te vragen in de gegevens die wij van u verwerken
- Onjuiste gegevens te laten corrigeren
- Verwijdering van uw gegevens te vragen ("recht op vergetelheid")
- Bezwaar te maken tegen bepaalde verwerkingen
- Uw gegevens in een overdraagbaar formaat te ontvangen ("dataportabiliteit")
- Een klacht in te dienen bij de Autoriteit Persoonsgegevens

U kunt hiervoor contact opnemen via info@dencrm.nl. Wij reageren binnen [TODO: wettelijk
is dit doorgaans 1 maand] op uw verzoek.

## 9. Wijzigingen

Wij kunnen deze privacyverklaring van tijd tot tijd aanpassen. Bij wezenlijke wijzigingen
informeren wij u hierover, bijvoorbeeld per e-mail of via een melding in de applicatie.

## 10. Contact

Vragen over deze privacyverklaring? Neem contact op via info@dencrm.nl.

[TODO: overweeg of een aparte functionaris gegevensbescherming (FG) nodig/wenselijk is —
voor de meeste kleine SaaS-bedrijven is dit niet wettelijk verplicht, maar dit hangt af
van de aard en schaal van de verwerking]
