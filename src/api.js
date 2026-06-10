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
export async function stuurOfferteMail(offerte_id)     { return apiFetch('/mail/offerte', { method: 'POST', body: { offerte_id } }); }
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
