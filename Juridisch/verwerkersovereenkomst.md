# Verwerkersovereenkomst DenCRM

> ⚠️ **DIT IS EEN CONCEPT, GEEN JURIDISCH GECONTROLEERD DOCUMENT.**
> Een verwerkersovereenkomst is een formeel, wettelijk vereist document (art. 28 AVG) zodra
> u als partij (DenCRM) persoonsgegevens verwerkt namens uw gebruikers. Dit concept dekt de
> standaard, verplichte onderdelen, maar moet **voor gebruik door een jurist gecontroleerd
> worden** — mede omdat de exacte formulering juridisch bindend is. Claude is geen advocaat.

**Tussen:**
De gebruiker van DenCRM (hierna: "**Verwerkingsverantwoordelijke**")

**En:**
Dennis Software Solutions, KVK 42105830, BTW NL005497501B33, gevestigd te [TODO: vestigingsplaats],
hierna: "**Verwerker**" of "**DenCRM**"

Hierna gezamenlijk: "Partijen"

## Overwegingen

- De Verwerkingsverantwoordelijke maakt gebruik van de DenCRM-applicatie voor het beheren
  van zijn/haar klantgegevens, offertes, facturen en aanverwante bedrijfsadministratie.
- Bij dit gebruik verwerkt DenCRM, in opdracht van en ten behoeve van de
  Verwerkingsverantwoordelijke, persoonsgegevens van diens klanten (zoals naam,
  contactgegevens en adresgegevens).
- Partijen wensen deze verwerking vast te leggen conform artikel 28 van de Algemene
  Verordening Gegevensbescherming (AVG/GDPR).
- Door DenCRM te gebruiken, aanvaardt de Verwerkingsverantwoordelijke de voorwaarden van
  deze Verwerkersovereenkomst. [TODO: bepaal of dit voldoende is, of dat een expliciete
  akkoordknop bij registratie wenselijk/vereist is — dit laatste is aan te raden]

## Artikel 1 — Onderwerp en duur

1.1 Deze overeenkomst regelt de verwerking van persoonsgegevens door DenCRM in haar
hoedanigheid van verwerker, in opdracht van de Verwerkingsverantwoordelijke.

1.2 Deze overeenkomst geldt voor de duur van de onderliggende overeenkomst tussen Partijen
(het gebruik van DenCRM) en eindigt automatisch bij beëindiging daarvan.

## Artikel 2 — Aard, doel en categorieën van gegevens

2.1 **Aard van de verwerking:** opslag, raadpleging, wijziging en verwijdering van
persoonsgegevens middels de DenCRM-applicatie, en het (desgewenst) automatisch versturen
van e-mails namens de Verwerkingsverantwoordelijke (bijv. offertes, facturen,
betalingsherinneringen).

2.2 **Doel van de verwerking:** het technisch mogelijk maken van bedrijfsvoering door de
Verwerkingsverantwoordelijke, waaronder klantbeheer, facturatie, agendabeheer, kassa- en
voorraadbeheer, en aanverwante administratie.

2.3 **Categorieën betrokkenen:** klanten van de Verwerkingsverantwoordelijke, en in
voorkomend geval diens eigen werknemers/gekoppelde gebruikers.

2.4 **Categorieën persoonsgegevens**, voor zover door de Verwerkingsverantwoordelijke
ingevoerd:
- NAW-gegevens (naam, adres, postcode, plaats) van klanten
- Contactgegevens (e-mailadres, telefoonnummer)
- Financiële gegevens die inherent zijn aan facturen/offertes (bedragen, IBAN indien
  ingevuld)
- [TODO: eventueel aanvullen, bijvoorbeeld indien werknemersgegevens worden ingevoerd]

DenCRM adviseert de Verwerkingsverantwoordelijke uitdrukkelijk om **geen bijzondere
persoonsgegevens** (zoals gezondheidsgegevens, BSN, of strafrechtelijke gegevens) in het
systeem in te voeren, tenzij daar een aparte, aanvullende grondslag/afspraak voor is.

## Artikel 3 — Verplichtingen van de Verwerker (DenCRM)

3.1 DenCRM verwerkt de persoonsgegevens uitsluitend op basis van schriftelijke instructies
van de Verwerkingsverantwoordelijke, zoals deze instructies besloten liggen in het normale
functioneren van de DenCRM-applicatie, tenzij een wettelijke verplichting tot verwerking
DenCRM daartoe verplicht.

3.2 DenCRM waarborgt dat personen die door DenCRM gemachtigd zijn om de persoonsgegevens
te verwerken, zich hebben verbonden tot geheimhouding.

3.3 DenCRM treft passende technische en organisatorische maatregelen om een op het risico
afgestemd beveiligingsniveau te waarborgen, waaronder in ieder geval:
- Versleutelde verbindingen (HTTPS/TLS) voor alle gegevensoverdracht
- Gehashte opslag van wachtwoorden (bcrypt)
- Versleutelde opslag van bijzonder gevoelige technische gegevens (zoals
  2FA-geheimen, AES-256)
- Toegangsbeperking op basis van gebruikersrollen
- Automatische limitering van inlogpogingen (rate limiting)
- Dagelijkse geautomatiseerde back-ups
- [TODO: overweeg een periodieke, onafhankelijke beveiligingsaudit/pentest naarmate
  het aantal gebruikers groeit]

3.4 DenCRM stelt de Verwerkingsverantwoordelijke zo spoedig mogelijk, en in ieder geval
binnen 48 uur nadat DenCRM hiervan kennis heeft genomen, op de hoogte van een
datalek dat gevolgen kan hebben voor de door de Verwerkingsverantwoordelijke
verstrekte/beheerde persoonsgegevens, zodat de Verwerkingsverantwoordelijke zijn eigen
wettelijke meldplicht (aan de Autoriteit Persoonsgegevens en/of betrokkenen) kan nakomen.

3.5 DenCRM verleent redelijke medewerking aan verzoeken van de
Verwerkingsverantwoordelijke ter uitvoering van diens verplichtingen jegens betrokkenen
(bijvoorbeeld inzage-, correctie- of verwijderingsverzoeken van een klant van de
Verwerkingsverantwoordelijke).

## Artikel 4 — Subverwerkers

4.1 De Verwerkingsverantwoordelijke geeft DenCRM toestemming om gebruik te maken van de
volgende subverwerkers, voor zover relevant voor de betreffende verwerking:

| Subverwerker | Functie |
|---|---|
| TransIP B.V. | Hosting |
| Brevo | Transactionele e-mail |
| Mollie B.V. | Betalingsverwerking (uitsluitend voor het DenCRM-abonnement zelf, niet voor klantgegevens) |
| Ibanity/Isabel Group (Ponto) | Optionele bankkoppeling, uitsluitend indien geactiveerd door de Verwerkingsverantwoordelijke |

4.2 DenCRM zal de Verwerkingsverantwoordelijke informeren over elke voorgenomen
verandering met betrekking tot het inschakelen van nieuwe subverwerkers, zodat de
Verwerkingsverantwoordelijke daartegen bezwaar kan maken.

4.3 DenCRM zorgt ervoor dat subverwerkers ten minste dezelfde verplichtingen op het gebied
van gegevensbescherming naleven als in deze overeenkomst zijn opgenomen.

[TODO: controleer of met elk van bovenstaande subverwerkers daadwerkelijk een eigen
verwerkersovereenkomst is afgesloten — vraag deze desnoods op bij de betreffende
leverancier]

## Artikel 5 — Locatie van gegevensverwerking

5.1 De persoonsgegevens worden verwerkt binnen de Europese Economische Ruimte (EER).
[TODO: dit expliciet verifiëren per subverwerker — met name bij eventuele toekomstige
Amerikaanse dienstverleners is een aparte grondslag (zoals EU-VS Data Privacy Framework)
vereist]

## Artikel 6 — Bewaartermijn en verwijdering

6.1 DenCRM bewaart de persoonsgegevens niet langer dan noodzakelijk is voor het doel van
de verwerking, of zolang de Verwerkingsverantwoordelijke een actief account heeft.

6.2 Bij beëindiging van het gebruik van DenCRM door de Verwerkingsverantwoordelijke, zal
DenCRM naar keuze van de Verwerkingsverantwoordelijke alle persoonsgegevens wissen of
terugbezorgen, en bestaande kopieën verwijderen, tenzij een wettelijke bewaarplicht
zich hiertegen verzet (bijvoorbeeld de fiscale bewaarplicht van 7 jaar voor facturen).

[TODO: bepaal een concrete termijn, bijv. "binnen 30 dagen na beëindiging", en bouw
zo nodig een technisch proces om dit daadwerkelijk uit te voeren]

## Artikel 7 — Aansprakelijkheid

7.1 Aansprakelijkheid tussen Partijen in het kader van deze Verwerkersovereenkomst is
onderworpen aan de aansprakelijkheidsbeperkingen zoals opgenomen in de Algemene
Voorwaarden van DenCRM.

## Artikel 8 — Audit

8.1 De Verwerkingsverantwoordelijke heeft het recht om, na voorafgaand overleg en
redelijke aankondiging, DenCRM te controleren op naleving van deze overeenkomst, of dit
door een onafhankelijke derde te laten doen.

[TODO: bepaal of/hoe dit praktisch vormgegeven wordt — bijvoorbeeld door het beschikbaar
stellen van een beveiligingsoverzicht/verklaring in plaats van een fysieke audit, wat voor
een klein bedrijf vaak praktischer is]

## Artikel 9 — Slotbepalingen

9.1 Deze overeenkomst maakt onlosmakelijk deel uit van de overeenkomst tussen DenCRM en
de Verwerkingsverantwoordelijke voor het gebruik van de DenCRM-applicatie.

9.2 Op deze overeenkomst is Nederlands recht van toepassing.

---

[TODO: overweeg om dit document, samen met de Algemene Voorwaarden, expliciet te laten
accorderen bij registratie (bijv. een verplichte checkbox "ik ga akkoord met de
Verwerkersovereenkomst"), in plaats van alleen impliciete acceptatie door gebruik.]
