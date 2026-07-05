// ============================================================
// DenCRM – API Client
// Alle communicatie met de backend via dit bestand.
// ============================================================

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// ── Token beheer ─────────────────────────────────────────────
let accessToken  = localStorage.getItem('dencrm_access')  || null;
let refreshToken = localStorage.getItem('dencrm_refresh') || null;

export function tokensBewaren(access, refresh) {
  accessToken  = access;
  refreshToken = refresh;
  localStorage.setItem('dencrm_access',  access);
  localStorage.setItem('dencrm_refresh', refresh);
}

export function tokensWissen() {
  accessToken = null; refreshToken = null;
  localStorage.removeItem('dencrm_access');
  localStorage.removeItem('dencrm_refresh');
}

export function heeftTokens() {
  return !!accessToken;
}

// ── Basis fetch met automatische token-refresh ────────────────
async function apiFetch(pad, opties = {}) {
  const doe = async (token) => fetch(`${API_URL}${pad}`, {
    ...opties,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opties.headers,
    },
    body: opties.body ? JSON.stringify(opties.body) : undefined,
  });

  let res = await doe(accessToken);

  // Access token verlopen → probeer te refreshen
  if (res.status === 401 && refreshToken) {
    const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (refreshRes.ok) {
      const data = await refreshRes.json();
      tokensBewaren(data.accessToken, data.refreshToken);
      res = await doe(data.accessToken);
    } else {
      tokensWissen();
      window.location.reload(); // Stuur terug naar login
      return;
    }
  }

  if (!res.ok) {
    const fout = await res.json().catch(() => ({ fout: `HTTP ${res.status}` }));
    throw new Error(fout.fout || `HTTP ${res.status}`);
  }

  return res.json();
}

// ============================================================
// AUTH
// ============================================================
export async function login(username, wachtwoord) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: { username, wachtwoord },
  });
  tokensBewaren(data.accessToken, data.refreshToken);
  return data.gebruiker;
}

// Herstel de ingelogde gebruiker na een pagina-refresh (gebruikt de bestaande, nog geldige tokens)
export async function haalSessieOp() {
  const data = await apiFetch('/auth/sessie');
  return data.gebruiker;
}

export async function logout() {
  await apiFetch('/auth/logout', { method: 'POST', body: { refreshToken } }).catch(() => {});
  tokensWissen();
}

export async function registreer(naam, email, bedrijf) {
  return apiFetch('/auth/registreer', { method: 'POST', body: { naam, email, bedrijf } });
}

export async function wijzigWachtwoord(huidig, nieuw) {
  return apiFetch('/auth/wachtwoord', { method: 'PATCH', body: { huidig, nieuw } });
}

export async function controleerActivatieToken(token) {
  return apiFetch(`/auth/activeer?token=${token}`);
}

export async function activeerAccount(token, wachtwoord) {
  return apiFetch('/auth/activeer', { method: 'POST', body: { token, wachtwoord } });
}

// ============================================================
// KLANTEN
// ============================================================
export async function haalKlantenOp()          { return apiFetch('/klanten'); }
export async function maakKlantAan(data)       { return apiFetch('/klanten', { method: 'POST', body: data }); }
export async function updateKlant(id, data)    { return apiFetch(`/klanten/${id}`, { method: 'PUT', body: data }); }
export async function verwijderKlant(id)       { return apiFetch(`/klanten/${id}`, { method: 'DELETE' }); }

// ============================================================
// PRODUCTEN
// ============================================================
export async function haalProductenOp()        { return apiFetch('/producten'); }
export async function maakProductAan(data)     { return apiFetch('/producten', { method: 'POST', body: data }); }
export async function updateProduct(id, data)  { return apiFetch(`/producten/${id}`, { method: 'PUT', body: data }); }
export async function verwijderProduct(id)     { return apiFetch(`/producten/${id}`, { method: 'DELETE' }); }

// ============================================================
// AGENDA
// ============================================================
export async function haalAgendaOp()           { return apiFetch('/agenda'); }
export async function maakAfspraakAan(data)    { return apiFetch('/agenda', { method: 'POST', body: data }); }
export async function updateAfspraak(id, data) { return apiFetch(`/agenda/${id}`, { method: 'PUT', body: data }); }
export async function verwijderAfspraak(id)    { return apiFetch(`/agenda/${id}`, { method: 'DELETE' }); }

// ============================================================
// OFFERTES
// ============================================================
export async function haalOffertesOp()              { return apiFetch('/offertes'); }
export async function maakOfferteAan(data)          { return apiFetch('/offertes', { method: 'POST', body: data }); }
export async function updateOfferteStatus(id, status) { return apiFetch(`/offertes/${id}/status`, { method: 'PATCH', body: { status } }); }
export async function verwijderOfferte(id)          { return apiFetch(`/offertes/${id}`, { method: 'DELETE' }); }

// ============================================================
// GEBRUIKERS (admin)
// ============================================================
export async function haalGebruikersOp()       { return apiFetch('/gebruikers'); }

// ============================================================
// MAIL
// ============================================================
export async function stuurOfferteMail(offerte_id, cc_mijzelf = false) { return apiFetch('/mail/offerte', { method: 'POST', body: { offerte_id, cc_mijzelf } }); }
export async function downloadOffertePDF(offerte_id, referentie) {
  const token = localStorage.getItem('dencrm_access');
  const res = await fetch(`${API_URL}/offertes/${offerte_id}/pdf`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('PDF generatie mislukt');
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `offerte-${referentie}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}
export async function stuurExportMail(van, tot, inhoud) { return apiFetch('/mail/export',  { method: 'POST', body: { van, tot, inhoud } }); }
export async function stuurTestMail(aan)               { return apiFetch('/mail/test',    { method: 'POST', body: { aan } }); }

// ============================================================
// SUPPORT
// ============================================================
export async function stuurSupportBericht(data)        { return apiFetch('/support', { method: 'POST', body: data }); }
export async function haalSupportBerichtenOp()         { return apiFetch('/support'); }
export async function updateSupportStatus(id, status)  { return apiFetch(`/support/${id}/status`, { method: 'PATCH', body: { status } }); }
export async function verwijderSupportBericht(id)      { return apiFetch(`/support/${id}`, { method: 'DELETE' }); }

// ============================================================
// RAPPORTEN
// ============================================================
export async function haalRapportInstellingOp()   { return apiFetch('/rapporten/instelling'); }
export async function slaRapportInstellingOp(data) { return apiFetch('/rapporten/instelling', { method: 'POST', body: data }); }

// ============================================================
// KASSA
// ============================================================
export async function haalKassaBonnenOp()      { return apiFetch('/kassa'); }
export async function slaKassaBonOp(data)      { return apiFetch('/kassa', { method: 'POST', body: data }); }
export async function verwijderKassaBon(id)    { return apiFetch(`/kassa/${id}`, { method: 'DELETE' }); }

// ============================================================
// PROFIEL
// ============================================================
export async function haalProfielOp()        { return apiFetch('/auth/profiel'); }
export async function updateProfiel(data)    { return apiFetch('/auth/profiel', { method: 'PATCH', body: data }); }
export async function haalAuditLogOp()       { return apiFetch('/audit'); }

// ============================================================
// WERKBONNEN
// ============================================================
export async function haalWerkbonnenOp()           { return apiFetch('/werkbonnen'); }
export async function maakWerkbonAan(data)         { return apiFetch('/werkbonnen', { method: 'POST', body: data }); }
export async function updateWerkbon(id, data)      { return apiFetch(`/werkbonnen/${id}`, { method: 'PUT', body: data }); }
export async function verwijderWerkbon(id)         { return apiFetch(`/werkbonnen/${id}`, { method: 'DELETE' }); }

// ============================================================
// GEBRUIKERS BEHEER (admin)
// ============================================================
export async function updateGebruikerLidmaatschap(id, data) {
  return apiFetch(`/gebruikers/${id}`, { method: 'PATCH', body: data });
}
export async function verwijderGebruiker(id) {
  return apiFetch(`/gebruikers/${id}`, { method: 'DELETE' });
}
export async function blokkeerGebruiker(id, blokkeren) {
  return apiFetch(`/gebruikers/${id}`, { method: 'PATCH', body: { is_actief: !blokkeren } });
}

// ============================================================
// REVIEWS
// ============================================================
export async function plaatsReview(sterren, tekst) { return apiFetch('/reviews', { method: 'POST', body: { sterren, tekst } }); }
export async function weigerReview()               { return apiFetch('/reviews/weiger', { method: 'POST' }); }
export async function haalReviewsOp()               { return apiFetch('/reviews'); }

// ============================================================
// DECLARATIES & BOEKHOUDING
// ============================================================
export async function haalDeclaratiesOp()        { return apiFetch('/declaraties'); }
export async function maakDeclaratieAan(data)     { return apiFetch('/declaraties', { method: 'POST', body: data }); }
export async function updateDeclaratie(id, data)  { return apiFetch(`/declaraties/${id}`, { method: 'PUT', body: data }); }
export async function verwijderDeclaratie(id)     { return apiFetch(`/declaraties/${id}`, { method: 'DELETE' }); }
export function declaratieBijlageUrl(id) {
  const token = localStorage.getItem('dencrm_access');
  return `${API_URL}/declaraties/${id}/bijlage?token=${encodeURIComponent(token||'')}`;
}

// ============================================================
// WACHTWOORD VERGETEN / RESET
// ============================================================
export async function vraagWachtwoordResetAan(email) { return apiFetch('/auth/wachtwoord-vergeten', { method: 'POST', body: { email } }); }
export async function controleerResetToken(token)     { return apiFetch(`/auth/wachtwoord-reset?token=${token}`); }
export async function resetWachtwoord(token, wachtwoord) { return apiFetch('/auth/wachtwoord-reset', { method: 'POST', body: { token, wachtwoord } }); }

// ============================================================
// BELASTINGOVERZICHT
// ============================================================
export async function haalBelastingOverzichtOp(van, tot) {
  return apiFetch(`/belastingoverzicht?van=${van}&tot=${tot}`);
}

// ============================================================
// AFSCHRIJVINGEN
// ============================================================
export async function haalAfschrijvingenOp()          { return apiFetch('/afschrijvingen'); }
export async function maakAfschrijvingAan(data)       { return apiFetch('/afschrijvingen', { method:'POST', body:data }); }
export async function updateAfschrijving(id, data)    { return apiFetch(`/afschrijvingen/${id}`, { method:'PUT', body:data }); }
export async function verwijderAfschrijving(id)       { return apiFetch(`/afschrijvingen/${id}`, { method:'DELETE' }); }

// ============================================================
// KOPPEL ACCOUNTS
// ============================================================
export async function haalKoppelAccountsOp()                 { return apiFetch('/koppel-accounts'); }
export async function nodigGebruikerUit(data)                { return apiFetch('/koppel-accounts/uitnodigen', { method:'POST', body:data }); }
export async function trekUitnodigingIn(id)                  { return apiFetch(`/koppel-accounts/uitnodiging/${id}`, { method:'DELETE' }); }
export async function updateGekoppeldeModules(id, modules)   { return apiFetch(`/koppel-accounts/${id}/modules`, { method:'PATCH', body:{ modules } }); }
export async function verwijderGekoppeldeGebruiker(id)        { return apiFetch(`/koppel-accounts/${id}`, { method:'DELETE' }); }
export async function controleerUitnodiging(token)            { return apiFetch(`/koppel-accounts/uitnodiging?token=${token}`); }
export async function accepteerUitnodiging(data)              { return apiFetch('/koppel-accounts/accepteren', { method:'POST', body:data }); }

// ============================================================
// AGENDA PERSONEN
// ============================================================
export async function haalAgendaPersonenOp()          { return apiFetch('/agenda-personen'); }
export async function maakAgendaPersoonAan(data)      { return apiFetch('/agenda-personen', { method:'POST', body:data }); }
export async function verwijderAgendaPersoon(id)      { return apiFetch(`/agenda-personen/${id}`, { method:'DELETE' }); }
export async function koppelPersonenAanAfspraak(afspraakId, persoonIds) {
  return apiFetch(`/agenda/${afspraakId}/personen`, { method:'PUT', body:{ persoon_ids: persoonIds } });
}

// ============================================================
// INSTELLINGEN (gedeeld, database-opgeslagen)
// ============================================================
export async function haalInstellingenOp()          { return apiFetch('/instellingen'); }
export async function updateInstellingen(data)      { return apiFetch('/instellingen', { method:'PATCH', body:data }); }

// ============================================================
// BEDRIJFSLOGO
// ============================================================
export async function haalLogoInfoOp()          { return apiFetch('/logo/info'); }
export async function uploadLogo(base64, type)  { return apiFetch('/logo', { method:'POST', body:{ logo_base64:base64, logo_type:type } }); }
export async function verwijderLogo()           { return apiFetch('/logo', { method:'DELETE' }); }
export function logoUrl() {
  const token = localStorage.getItem('dencrm_access');
  return `${API_URL}/logo?token=${encodeURIComponent(token||'')}&t=${Date.now()}`;
}

// ============================================================
// PUBLIEKE AGENDA / ONLINE AFSPRAKEN BOEKEN
// ============================================================
export async function haalAgendaInstellingOp()            { return apiFetch('/agenda-instelling'); }
export async function updateAgendaInstelling(data)        { return apiFetch('/agenda-instelling', { method:'PATCH', body:data }); }
export async function haalAgendaProductenOp()             { return apiFetch('/agenda-producten'); }
export async function maakAgendaProductAan(data)          { return apiFetch('/agenda-producten', { method:'POST', body:data }); }
export async function updateAgendaProduct(id, data)       { return apiFetch(`/agenda-producten/${id}`, { method:'PATCH', body:data }); }
export async function verwijderAgendaProduct(id)          { return apiFetch(`/agenda-producten/${id}`, { method:'DELETE' }); }

// Publieke (niet-ingelogde) functies — gebruiken een aparte fetch zonder auth-header
async function publiekFetch(pad, opts = {}) {
  const res = await fetch(`${API_URL}${pad}`, {
    method: opts.method || 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.fout || 'Er ging iets mis');
  return data;
}
export async function haalPubliekeAgendaOp(slug)                     { return publiekFetch(`/publieke-agenda/${slug}`); }
export async function haalBeschikbaarheidOp(slug, productId, datum)  { return publiekFetch(`/publieke-agenda/${slug}/beschikbaarheid?product_id=${productId}&datum=${datum}`); }
export async function boekAfspraak(slug, data)                       { return publiekFetch(`/publieke-agenda/${slug}/boeken`, { method:'POST', body:data }); }
export async function annuleerExterneAfspraak(token)                 { return publiekFetch(`/publieke-agenda-annuleren?token=${token}`); }

// ============================================================
// DOCUMENT TEMPLATES (offerte/factuur tekst)
// ============================================================
export async function haalDocumentTemplatesOp(type)  { return apiFetch(`/document-templates?type=${type}`); }
export async function maakDocumentTemplateAan(data)   { return apiFetch('/document-templates', { method:'POST', body:data }); }
export async function verwijderDocumentTemplate(id)   { return apiFetch(`/document-templates/${id}`, { method:'DELETE' }); }
