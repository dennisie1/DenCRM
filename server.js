// ============================================================
// DenCRM – API Server
// Node.js + Express + MSSQL
// ============================================================
require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const bcrypt     = require('bcrypt');
const jwt        = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const sql        = require('mssql');
const crypto     = require('crypto');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── CORS ─────────────────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    process.env.FRONTEND_URL_PROD || 'https://dennisie1.github.io',
  ],
  credentials: true,
}));
app.use(express.json());

// ── Database configuratie ─────────────────────────────────────
const serverNaam = process.env.DB_SERVER || 'localhost\\sqlexpress';
const dbConfigFinal = {
  server:   serverNaam.split('\\')[0],   // bijv. "localhost"
  database: process.env.DB_DATABASE || 'dencrm',
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    trustServerCertificate: true,
    enableArithAbort: true,
    encrypt: false,
    instanceName: serverNaam.includes('\\') ? serverNaam.split('\\')[1] : undefined,
  },
};

let pool;
async function getPool() {
  if (!pool) pool = await sql.connect(dbConfigFinal);
  return pool;
}

// ── Encryptie helpers (voor inkoopprijs) ─────────────────────
const ENC_KEY = Buffer.from(process.env.ENCRYPTION_KEY || '0'.repeat(64), 'hex');
const ENC_ALG = 'aes-256-gcm';

function versleutel(tekst) {
  if (!tekst) return null;
  const iv  = crypto.randomBytes(12);
  const cip = crypto.createCipheriv(ENC_ALG, ENC_KEY, iv);
  const enc = Buffer.concat([cip.update(String(tekst), 'utf8'), cip.final()]);
  const tag = cip.getAuthTag();
  return `${iv.toString('hex')}:${enc.toString('hex')}:${tag.toString('hex')}`;
}

function ontsleutel(opgeslagen) {
  if (!opgeslagen) return null;
  try {
    const [ivHex, encHex, tagHex] = opgeslagen.split(':');
    const dec = crypto.createDecipheriv(ENC_ALG, ENC_KEY, Buffer.from(ivHex, 'hex'));
    dec.setAuthTag(Buffer.from(tagHex, 'hex'));
    return Buffer.concat([dec.update(Buffer.from(encHex, 'hex')), dec.final()]).toString('utf8');
  } catch { return null; }
}

// ── JWT helpers ───────────────────────────────────────────────
function maakTokens(gebruiker) {
  const payload = { id: gebruiker.id, username: gebruiker.username, is_admin: gebruiker.is_admin };
  const accessToken  = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '15m' });
  const refreshToken = uuidv4();
  return { accessToken, refreshToken };
}

// ── Middleware: authenticatie ─────────────────────────────────
function authCheck(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ fout: 'Niet ingelogd' });
  try {
    req.gebruiker = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ fout: 'Token verlopen of ongeldig' });
  }
}

// ── Middleware: admin check ───────────────────────────────────
function adminCheck(req, res, next) {
  if (!req.gebruiker?.is_admin) return res.status(403).json({ fout: 'Geen adminrechten' });
  next();
}

// ============================================================
// AUTH ENDPOINTS
// ============================================================

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { username, wachtwoord } = req.body;
  if (!username || !wachtwoord) return res.status(400).json({ fout: 'Vul alle velden in' });
  try {
    const db = await getPool();
    const result = await db.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT * FROM gebruikers WHERE username = @username AND is_actief = 1');
    const gebruiker = result.recordset[0];
    if (!gebruiker) return res.status(401).json({ fout: 'Onjuiste inloggegevens' });
    const ok = await bcrypt.compare(wachtwoord, gebruiker.wachtwoord_hash);
    if (!ok) return res.status(401).json({ fout: 'Onjuiste inloggegevens' });
    // Update laatste login
    await db.request().input('id', sql.NVarChar, gebruiker.id)
      .query('UPDATE gebruikers SET laatste_login = GETDATE() WHERE id = @id');
    const { accessToken, refreshToken } = maakTokens(gebruiker);
    // Sla refresh token hash op
    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const vervaltOp = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await db.request()
      .input('id', sql.NVarChar, uuidv4())
      .input('gebruiker_id', sql.NVarChar, gebruiker.id)
      .input('token_hash', sql.NVarChar, tokenHash)
      .input('vervalt_op', sql.DateTime2, vervaltOp)
      .query('INSERT INTO refresh_tokens VALUES (@id, @gebruiker_id, @token_hash, @vervalt_op, GETDATE())');
    res.json({
      accessToken, refreshToken,
      gebruiker: { id: gebruiker.id, naam: gebruiker.naam, username: gebruiker.username,
        is_admin: gebruiker.is_admin, kleur_idx: gebruiker.kleur_idx,
        bg_idx: gebruiker.bg_idx, font_size: gebruiker.font_size }
    });
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

// POST /api/auth/refresh
app.post('/api/auth/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ fout: 'Geen token' });
  try {
    const db = await getPool();
    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const result = await db.request()
      .input('hash', sql.NVarChar, tokenHash)
      .query(`SELECT rt.*, g.* FROM refresh_tokens rt
              JOIN gebruikers g ON rt.gebruiker_id = g.id
              WHERE rt.token_hash = @hash AND rt.vervalt_op > GETDATE()`);
    if (!result.recordset[0]) return res.status(401).json({ fout: 'Token ongeldig of verlopen' });
    const gebruiker = result.recordset[0];
    const { accessToken, refreshToken: nieuwToken } = maakTokens(gebruiker);
    // Roteer refresh token
    await db.request().input('hash', sql.NVarChar, tokenHash)
      .query('DELETE FROM refresh_tokens WHERE token_hash = @hash');
    const nieuwHash = crypto.createHash('sha256').update(nieuwToken).digest('hex');
    const vervaltOp = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await db.request()
      .input('id', sql.NVarChar, uuidv4()).input('gid', sql.NVarChar, gebruiker.gebruiker_id)
      .input('hash', sql.NVarChar, nieuwHash).input('vervalt', sql.DateTime2, vervaltOp)
      .query('INSERT INTO refresh_tokens VALUES (@id, @gid, @hash, @vervalt, GETDATE())');
    res.json({ accessToken, refreshToken: nieuwToken });
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

// POST /api/auth/logout
app.post('/api/auth/logout', async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken) {
    try {
      const db = await getPool();
      const hash = crypto.createHash('sha256').update(refreshToken).digest('hex');
      await db.request().input('hash', sql.NVarChar, hash)
        .query('DELETE FROM refresh_tokens WHERE token_hash = @hash');
    } catch {}
  }
  res.json({ ok: true });
});

// POST /api/auth/registreer
app.post('/api/auth/registreer', async (req, res) => {
  const { naam, email, bedrijf } = req.body;
  if (!naam || !email) return res.status(400).json({ fout: 'Naam en e-mail zijn verplicht' });
  if (!email.includes('@')) return res.status(400).json({ fout: 'Ongeldig e-mailadres' });
  try {
    const db = await getPool();
    const bestaand = await db.request().input('email', sql.NVarChar, email)
      .query('SELECT id FROM gebruikers WHERE email = @email OR username = @email');
    if (bestaand.recordset.length > 0) return res.status(409).json({ fout: 'E-mailadres al in gebruik' });
    const tijdelijkWw = crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(tijdelijkWw, 12);
    await db.request()
      .input('id', sql.NVarChar, uuidv4())
      .input('naam', sql.NVarChar, naam)
      .input('username', sql.NVarChar, email)
      .input('email', sql.NVarChar, email)
      .input('hash', sql.NVarChar, hash)
      .input('bedrijf', sql.NVarChar, bedrijf || null)
      .query(`INSERT INTO gebruikers (id, naam, username, email, wachtwoord_hash, bedrijf, is_admin, is_actief)
              VALUES (@id, @naam, @username, @email, @hash, @bedrijf, 0, 0)`);
    // TODO: Stuur activatiemail naar @email
    console.log(`[MAIL] Activatiemail nodig voor: ${email}`);
    res.json({ ok: true, bericht: 'Account aangemaakt. Activatiemail volgt zodra mailserver gekoppeld is.' });
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

// PATCH /api/auth/wachtwoord
app.patch('/api/auth/wachtwoord', authCheck, async (req, res) => {
  const { huidig, nieuw } = req.body;
  if (!huidig || !nieuw || nieuw.length < 6) return res.status(400).json({ fout: 'Vul alle velden in (min. 6 tekens)' });
  try {
    const db = await getPool();
    const result = await db.request().input('id', sql.NVarChar, req.gebruiker.id)
      .query('SELECT wachtwoord_hash FROM gebruikers WHERE id = @id');
    const ok = await bcrypt.compare(huidig, result.recordset[0].wachtwoord_hash);
    if (!ok) return res.status(401).json({ fout: 'Huidig wachtwoord klopt niet' });
    const nieuwHash = await bcrypt.hash(nieuw, 12);
    await db.request().input('hash', sql.NVarChar, nieuwHash).input('id', sql.NVarChar, req.gebruiker.id)
      .query('UPDATE gebruikers SET wachtwoord_hash = @hash WHERE id = @id');
    res.json({ ok: true });
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

// ============================================================
// KLANTEN ENDPOINTS
// ============================================================

// GET /api/klanten
app.get('/api/klanten', authCheck, async (req, res) => {
  try {
    const db = await getPool();
    const klanten = await db.request().input('uid', sql.NVarChar, req.gebruiker.id)
      .query(`SELECT k.*, 
              (SELECT STRING_AGG(product_id, ',') FROM klant_producten WHERE klant_id = k.id) as product_ids
              FROM klanten k WHERE k.gebruiker_id = @uid ORDER BY k.naam`);
    res.json(klanten.recordset.map(k => ({
      ...k,
      producten: k.product_ids ? k.product_ids.split(',') : [],
      product_ids: undefined
    })));
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

// POST /api/klanten
app.post('/api/klanten', authCheck, async (req, res) => {
  const { naam, email, telefoon, adres } = req.body;
  if (!naam) return res.status(400).json({ fout: 'Naam is verplicht' });
  try {
    const db = await getPool(); const id = uuidv4();
    await db.request()
      .input('id', sql.NVarChar, id).input('uid', sql.NVarChar, req.gebruiker.id)
      .input('naam', sql.NVarChar, naam).input('email', sql.NVarChar, email || null)
      .input('tel', sql.NVarChar, telefoon || null).input('adres', sql.NVarChar, adres || null)
      .query('INSERT INTO klanten (id,gebruiker_id,naam,email,telefoon,adres) VALUES (@id,@uid,@naam,@email,@tel,@adres)');
    res.status(201).json({ id });
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

// PUT /api/klanten/:id
app.put('/api/klanten/:id', authCheck, async (req, res) => {
  const { naam, email, telefoon, adres, producten } = req.body;
  try {
    const db = await getPool();
    // Controleer eigenaarschap — CRUCIAAL voor beveiliging
    const check = await db.request()
      .input('id', sql.NVarChar, req.params.id).input('uid', sql.NVarChar, req.gebruiker.id)
      .query('SELECT id FROM klanten WHERE id = @id AND gebruiker_id = @uid');
    if (!check.recordset[0]) return res.status(404).json({ fout: 'Niet gevonden' });
    await db.request()
      .input('naam', sql.NVarChar, naam).input('email', sql.NVarChar, email || null)
      .input('tel', sql.NVarChar, telefoon || null).input('adres', sql.NVarChar, adres || null)
      .input('id', sql.NVarChar, req.params.id)
      .query('UPDATE klanten SET naam=@naam,email=@email,telefoon=@tel,adres=@adres,gewijzigd_op=GETDATE() WHERE id=@id');
    // Koppeltabel bijwerken
    if (Array.isArray(producten)) {
      await db.request().input('kid', sql.NVarChar, req.params.id)
        .query('DELETE FROM klant_producten WHERE klant_id = @kid');
      for (const pid of producten) {
        await db.request().input('kid', sql.NVarChar, req.params.id).input('pid', sql.NVarChar, pid)
          .query('INSERT INTO klant_producten (klant_id, product_id) VALUES (@kid, @pid)');
      }
    }
    res.json({ ok: true });
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

// DELETE /api/klanten/:id
app.delete('/api/klanten/:id', authCheck, async (req, res) => {
  try {
    const db = await getPool();
    const result = await db.request()
      .input('id', sql.NVarChar, req.params.id).input('uid', sql.NVarChar, req.gebruiker.id)
      .query('DELETE FROM klanten WHERE id = @id AND gebruiker_id = @uid');
    if (result.rowsAffected[0] === 0) return res.status(404).json({ fout: 'Niet gevonden' });
    res.json({ ok: true });
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

// ============================================================
// PRODUCTEN ENDPOINTS
// ============================================================

app.get('/api/producten', authCheck, async (req, res) => {
  try {
    const db = await getPool();
    const result = await db.request().input('uid', sql.NVarChar, req.gebruiker.id)
      .query(`SELECT p.*, c.naam as categorie_naam FROM producten p
              LEFT JOIN product_categorieen c ON p.categorie_id = c.id
              WHERE p.gebruiker_id = @uid ORDER BY p.naam`);
    res.json(result.recordset.map(p => ({
      ...p,
      inkoopprijs: ontsleutel(p.inkoopprijs_enc),
      inkoopprijs_enc: undefined
    })));
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

app.post('/api/producten', authCheck, async (req, res) => {
  const { naam, prijs, beschrijving, categorie, voorraad, inkoopprijs } = req.body;
  if (!naam) return res.status(400).json({ fout: 'Naam is verplicht' });
  try {
    const db = await getPool(); const id = uuidv4();
    // categorie_id: zoek of maak aan
    let catId = null;
    if (categorie) {
      const catRes = await db.request()
        .input('uid', sql.NVarChar, req.gebruiker.id).input('naam', sql.NVarChar, categorie)
        .query('SELECT id FROM product_categorieen WHERE gebruiker_id=@uid AND naam=@naam');
      if (catRes.recordset[0]) {
        catId = catRes.recordset[0].id;
      } else {
        catId = uuidv4();
        await db.request().input('id', sql.NVarChar, catId)
          .input('uid', sql.NVarChar, req.gebruiker.id).input('naam', sql.NVarChar, categorie)
          .query('INSERT INTO product_categorieen (id,gebruiker_id,naam) VALUES (@id,@uid,@naam)');
      }
    }
    await db.request()
      .input('id', sql.NVarChar, id).input('uid', sql.NVarChar, req.gebruiker.id)
      .input('naam', sql.NVarChar, naam).input('prijs', sql.Decimal(10,2), prijs || 0)
      .input('beschr', sql.NVarChar, beschrijving || null)
      .input('cat', sql.NVarChar, catId)
      .input('voorraad', sql.Int, voorraad ?? null)
      .input('inkoop', sql.NVarChar, versleutel(inkoopprijs))
      .query(`INSERT INTO producten (id,gebruiker_id,naam,prijs,beschrijving,categorie_id,voorraad,inkoopprijs_enc)
              VALUES (@id,@uid,@naam,@prijs,@beschr,@cat,@voorraad,@inkoop)`);
    res.status(201).json({ id });
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

app.put('/api/producten/:id', authCheck, async (req, res) => {
  const { naam, prijs, beschrijving, categorie, voorraad, inkoopprijs } = req.body;
  try {
    const db = await getPool();
    const check = await db.request()
      .input('id', sql.NVarChar, req.params.id).input('uid', sql.NVarChar, req.gebruiker.id)
      .query('SELECT id FROM producten WHERE id = @id AND gebruiker_id = @uid');
    if (!check.recordset[0]) return res.status(404).json({ fout: 'Niet gevonden' });
    let catId = null;
    if (categorie) {
      const catRes = await db.request()
        .input('uid', sql.NVarChar, req.gebruiker.id).input('naam', sql.NVarChar, categorie)
        .query('SELECT id FROM product_categorieen WHERE gebruiker_id=@uid AND naam=@naam');
      if (catRes.recordset[0]) {
        catId = catRes.recordset[0].id;
      } else {
        catId = uuidv4();
        await db.request().input('id', sql.NVarChar, catId)
          .input('uid', sql.NVarChar, req.gebruiker.id).input('naam', sql.NVarChar, categorie)
          .query('INSERT INTO product_categorieen (id,gebruiker_id,naam) VALUES (@id,@uid,@naam)');
      }
    }
    await db.request()
      .input('naam', sql.NVarChar, naam).input('prijs', sql.Decimal(10,2), prijs || 0)
      .input('beschr', sql.NVarChar, beschrijving || null)
      .input('cat', sql.NVarChar, catId)
      .input('voorraad', sql.Int, voorraad ?? null)
      .input('inkoop', sql.NVarChar, versleutel(inkoopprijs))
      .input('id', sql.NVarChar, req.params.id)
      .query(`UPDATE producten SET naam=@naam,prijs=@prijs,beschrijving=@beschr,
              categorie_id=@cat,voorraad=@voorraad,inkoopprijs_enc=@inkoop,gewijzigd_op=GETDATE()
              WHERE id=@id`);
    res.json({ ok: true });
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

app.delete('/api/producten/:id', authCheck, async (req, res) => {
  try {
    const db = await getPool();
    const result = await db.request()
      .input('id', sql.NVarChar, req.params.id).input('uid', sql.NVarChar, req.gebruiker.id)
      .query('DELETE FROM producten WHERE id = @id AND gebruiker_id = @uid');
    if (result.rowsAffected[0] === 0) return res.status(404).json({ fout: 'Niet gevonden' });
    res.json({ ok: true });
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

// ============================================================
// AGENDA ENDPOINTS
// ============================================================

app.get('/api/agenda', authCheck, async (req, res) => {
  try {
    const db = await getPool();
    const result = await db.request().input('uid', sql.NVarChar, req.gebruiker.id)
      .query(`SELECT a.*, k.naam as klant_naam FROM agenda a
              LEFT JOIN klanten k ON a.klant_id = k.id
              WHERE a.gebruiker_id = @uid ORDER BY a.datum DESC, a.tijd_van`);
    res.json(result.recordset);
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

app.post('/api/agenda', authCheck, async (req, res) => {
  const { klant_id, datum, tijd_van, tijd_tot, notitie } = req.body;
  if (!datum || !tijd_van) return res.status(400).json({ fout: 'Datum en tijd zijn verplicht' });
  try {
    const db = await getPool(); const id = uuidv4();
    await db.request()
      .input('id', sql.NVarChar, id).input('uid', sql.NVarChar, req.gebruiker.id)
      .input('kid', sql.NVarChar, klant_id || null).input('datum', sql.Date, datum)
      .input('van', sql.Time, tijd_van).input('tot', sql.Time, tijd_tot || null)
      .input('notitie', sql.NVarChar, notitie || null)
      .query('INSERT INTO agenda (id,gebruiker_id,klant_id,datum,tijd_van,tijd_tot,notitie) VALUES (@id,@uid,@kid,@datum,@van,@tot,@notitie)');
    res.status(201).json({ id });
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

app.put('/api/agenda/:id', authCheck, async (req, res) => {
  const { klant_id, datum, tijd_van, tijd_tot, notitie } = req.body;
  try {
    const db = await getPool();
    const check = await db.request()
      .input('id', sql.NVarChar, req.params.id).input('uid', sql.NVarChar, req.gebruiker.id)
      .query('SELECT id FROM agenda WHERE id = @id AND gebruiker_id = @uid');
    if (!check.recordset[0]) return res.status(404).json({ fout: 'Niet gevonden' });
    await db.request()
      .input('kid', sql.NVarChar, klant_id || null).input('datum', sql.Date, datum)
      .input('van', sql.Time, tijd_van).input('tot', sql.Time, tijd_tot || null)
      .input('notitie', sql.NVarChar, notitie || null).input('id', sql.NVarChar, req.params.id)
      .query('UPDATE agenda SET klant_id=@kid,datum=@datum,tijd_van=@van,tijd_tot=@tot,notitie=@notitie WHERE id=@id');
    res.json({ ok: true });
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

app.delete('/api/agenda/:id', authCheck, async (req, res) => {
  try {
    const db = await getPool();
    await db.request()
      .input('id', sql.NVarChar, req.params.id).input('uid', sql.NVarChar, req.gebruiker.id)
      .query('DELETE FROM agenda WHERE id = @id AND gebruiker_id = @uid');
    res.json({ ok: true });
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

// ============================================================
// OFFERTES ENDPOINTS
// ============================================================

app.get('/api/offertes', authCheck, async (req, res) => {
  try {
    const db = await getPool();
    const offertes = await db.request().input('uid', sql.NVarChar, req.gebruiker.id)
      .query(`SELECT o.*, k.naam as klant_naam, k.email as klant_email, k.adres as klant_adres
              FROM offertes o LEFT JOIN klanten k ON o.klant_id = k.id
              WHERE o.gebruiker_id = @uid ORDER BY o.datum DESC`);
    // Haal regels op voor alle offertes
    const ids = offertes.recordset.map(o => `'${o.id}'`).join(',');
    let regels = [];
    if (ids) {
      const regelResult = await db.request()
        .query(`SELECT * FROM offerte_regels WHERE offerte_id IN (${ids}) ORDER BY volgorde`);
      regels = regelResult.recordset;
    }
    res.json(offertes.recordset.map(o => ({
      ...o,
      regels: regels.filter(r => r.offerte_id === o.id),
      klant: o.klant_naam ? { naam: o.klant_naam, email: o.klant_email, adres: o.klant_adres } : null,
    })));
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

app.post('/api/offertes', authCheck, async (req, res) => {
  const { klant_id, klant_naam_vrij, referentie, datum, type, incl_btw,
          totaal_excl_btw, totaal_incl_btw, bedrijfsnaam, bedrijf_adres,
          iban, btw_nummer, offerte_tekst, regels } = req.body;
  if (!referentie) return res.status(400).json({ fout: 'Referentie is verplicht' });
  try {
    const db = await getPool(); const id = uuidv4();
    await db.request()
      .input('id', sql.NVarChar, id).input('uid', sql.NVarChar, req.gebruiker.id)
      .input('kid', sql.NVarChar, klant_id || null)
      .input('knv', sql.NVarChar, klant_naam_vrij || null)
      .input('ref', sql.NVarChar, referentie)
      .input('datum', sql.Date, datum || new Date())
      .input('type', sql.NVarChar, type || 'offerte')
      .input('btw', sql.Bit, incl_btw ? 1 : 0)
      .input('excl', sql.Decimal(10,2), totaal_excl_btw || 0)
      .input('incl', sql.Decimal(10,2), totaal_incl_btw || 0)
      .input('bnaam', sql.NVarChar, bedrijfsnaam || null)
      .input('badres', sql.NVarChar, bedrijf_adres || null)
      .input('iban', sql.NVarChar, iban || null)
      .input('btwn', sql.NVarChar, btw_nummer || null)
      .input('tekst', sql.NVarChar, offerte_tekst || null)
      .query(`INSERT INTO offertes (id,gebruiker_id,klant_id,klant_naam_vrij,referentie,datum,type,
              incl_btw,totaal_excl_btw,totaal_incl_btw,bedrijfsnaam,bedrijf_adres,iban,btw_nummer,offerte_tekst)
              VALUES (@id,@uid,@kid,@knv,@ref,@datum,@type,@btw,@excl,@incl,@bnaam,@badres,@iban,@btwn,@tekst)`);
    // Regels invoegen
    if (Array.isArray(regels)) {
      for (let i = 0; i < regels.length; i++) {
        const r = regels[i];
        await db.request()
          .input('id', sql.NVarChar, uuidv4()).input('oid', sql.NVarChar, id)
          .input('naam', sql.NVarChar, r.naam || '').input('beschr', sql.NVarChar, r.beschrijving || null)
          .input('prijs', sql.Decimal(10,2), r.prijs || 0).input('volgorde', sql.Int, i)
          .input('var', sql.Bit, r.isVariabel ? 1 : 0)
          .query('INSERT INTO offerte_regels (id,offerte_id,naam,beschrijving,prijs,volgorde,is_variabel) VALUES (@id,@oid,@naam,@beschr,@prijs,@volgorde,@var)');
      }
    }
    res.status(201).json({ id });
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

// PATCH /api/offertes/:id/status (betaald markeren)
app.patch('/api/offertes/:id/status', authCheck, async (req, res) => {
  const { status } = req.body; // 'open', 'betaald', 'vervallen'
  try {
    const db = await getPool();
    const result = await db.request()
      .input('status', sql.NVarChar, status).input('id', sql.NVarChar, req.params.id)
      .input('uid', sql.NVarChar, req.gebruiker.id)
      .query('UPDATE offertes SET status=@status,gewijzigd_op=GETDATE() WHERE id=@id AND gebruiker_id=@uid');
    if (result.rowsAffected[0] === 0) return res.status(404).json({ fout: 'Niet gevonden' });
    res.json({ ok: true });
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

app.delete('/api/offertes/:id', authCheck, async (req, res) => {
  try {
    const db = await getPool();
    await db.request()
      .input('id', sql.NVarChar, req.params.id).input('uid', sql.NVarChar, req.gebruiker.id)
      .query('DELETE FROM offertes WHERE id = @id AND gebruiker_id = @uid');
    res.json({ ok: true });
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

// ============================================================
// GEBRUIKERSBEHEER (admin only)
// ============================================================

app.get('/api/gebruikers', authCheck, adminCheck, async (req, res) => {
  try {
    const db = await getPool();
    const result = await db.request()
      .query('SELECT id,naam,username,email,is_admin,is_actief,aangemaakt_op,laatste_login FROM gebruikers');
    res.json(result.recordset);
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

// ============================================================
// MAIL SERVICE
// ============================================================
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host:   process.env.MAIL_HOST || 'smtp-relay.brevo.com',
  port:   parseInt(process.env.MAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function stuurMail({ aan, onderwerp, html, tekst }) {
  try {
    await transporter.sendMail({
      from:    `"DenCRM" <${process.env.MAIL_FROM || 'info@dencrm.nl'}>`,
      to:      aan,
      subject: onderwerp,
      text:    tekst || '',
      html:    html  || '',
    });
    console.log(`Mail verstuurd naar ${aan}: ${onderwerp}`);
    return true;
  } catch (e) {
    console.error('Mail fout:', e.message);
    return false;
  }
}

// ── Mail templates ────────────────────────────────────────────
function activatieMailHtml(naam, activatieLink) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#185FA5;padding:24px;border-radius:8px 8px 0 0">
        <h1 style="color:#fff;margin:0;font-size:24px">DenCRM</h1>
      </div>
      <div style="padding:24px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px">
        <h2>Welkom ${naam}!</h2>
        <p>Uw account is aangemaakt. Klik op de knop hieronder om uw wachtwoord in te stellen en uw account te activeren.</p>
        <a href="${activatieLink}" style="display:inline-block;margin:16px 0;padding:12px 24px;background:#185FA5;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold">
          Account activeren
        </a>
        <p style="color:#888;font-size:13px">Deze link is 24 uur geldig. Heeft u geen account aangevraagd? Dan kunt u deze mail negeren.</p>
      </div>
    </div>
  `;
}

function offerteMailHtml(klantNaam, bedrijfsnaam, referentie, totaal) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#185FA5;padding:24px;border-radius:8px 8px 0 0">
        <h1 style="color:#fff;margin:0;font-size:24px">${bedrijfsnaam || 'DenCRM'}</h1>
      </div>
      <div style="padding:24px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px">
        <p>Geachte ${klantNaam},</p>
        <p>Hierbij ontvangt u offerte <strong>${referentie}</strong> met een totaalbedrag van <strong>€${totaal}</strong>.</p>
        <p>De offerte is als PDF bijgevoegd bij deze mail.</p>
        <p style="color:#888;font-size:13px">Heeft u vragen? Neem dan gerust contact op.</p>
      </div>
    </div>
  `;
}

// ── Mail endpoints ────────────────────────────────────────────

// POST /api/mail/activatie — stuur activatiemail
app.post('/api/mail/activatie', authCheck, async (req, res) => {
  const { gebruiker_id } = req.body;
  if (!req.gebruiker.is_admin) return res.status(403).json({ fout: 'Geen toegang' });
  try {
    const db = await getPool();
    const result = await db.request()
      .input('id', sql.NVarChar, gebruiker_id)
      .query('SELECT naam, email FROM gebruikers WHERE id = @id');
    const gebruiker = result.recordset[0];
    if (!gebruiker) return res.status(404).json({ fout: 'Gebruiker niet gevonden' });
    // Maak activatietoken aan
    const token = crypto.randomBytes(32).toString('hex');
    const vervaltOp = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await db.request()
      .input('id', sql.NVarChar, uuidv4())
      .input('uid', sql.NVarChar, gebruiker_id)
      .input('hash', sql.NVarChar, crypto.createHash('sha256').update(token).digest('hex'))
      .input('vervalt', sql.DateTime2, vervaltOp)
      .query('INSERT INTO refresh_tokens (id,gebruiker_id,token_hash,vervalt_op) VALUES (@id,@uid,@hash,@vervalt)');
    const activatieLink = `https://dencrm.nl/activeer?token=${token}`;
    await stuurMail({
      aan: gebruiker.email,
      onderwerp: 'Activeer uw DenCRM account',
      html: activatieMailHtml(gebruiker.naam, activatieLink),
    });
    res.json({ ok: true });
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

// POST /api/mail/offerte — stuur offerte naar klant
app.post('/api/mail/offerte', authCheck, async (req, res) => {
  const { offerte_id } = req.body;
  try {
    const db = await getPool();
    const result = await db.request()
      .input('id', sql.NVarChar, offerte_id)
      .input('uid', sql.NVarChar, req.gebruiker.id)
      .query(`SELECT o.*, k.naam as klant_naam, k.email as klant_email
              FROM offertes o LEFT JOIN klanten k ON o.klant_id = k.id
              WHERE o.id = @id AND o.gebruiker_id = @uid`);
    const offerte = result.recordset[0];
    if (!offerte) return res.status(404).json({ fout: 'Offerte niet gevonden' });
    if (!offerte.klant_email) return res.status(400).json({ fout: 'Klant heeft geen e-mailadres' });
    const totaal = parseFloat(offerte.totaal_incl_btw).toLocaleString('nl-NL', { minimumFractionDigits: 2 });
    await stuurMail({
      aan: offerte.klant_email,
      onderwerp: `Offerte ${offerte.referentie} van ${offerte.bedrijfsnaam || 'DenCRM'}`,
      html: offerteMailHtml(offerte.klant_naam, offerte.bedrijfsnaam, offerte.referentie, totaal),
    });
    res.json({ ok: true });
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

// POST /api/mail/export — stuur financieel overzicht naar uzelf
app.post('/api/mail/export', authCheck, async (req, res) => {
  const { van, tot, inhoud } = req.body;
  try {
    const db = await getPool();
    const result = await db.request()
      .input('id', sql.NVarChar, req.gebruiker.id)
      .query('SELECT email, naam FROM gebruikers WHERE id = @id');
    const gebruiker = result.recordset[0];
    if (!gebruiker?.email) return res.status(400).json({ fout: 'Geen e-mailadres bekend' });
    await stuurMail({
      aan: gebruiker.email,
      onderwerp: `DenCRM Financieel overzicht ${van || ''} t/m ${tot || 'heden'}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#185FA5;padding:24px;border-radius:8px 8px 0 0">
            <h1 style="color:#fff;margin:0">DenCRM Financieel overzicht</h1>
          </div>
          <div style="padding:24px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px">
            <p>Beste ${gebruiker.naam},</p>
            <p>Hierbij uw financieel overzicht${van ? ` van ${van}` : ''} ${tot ? `tot ${tot}` : ''}.</p>
            <pre style="background:#f5f5f5;padding:16px;border-radius:8px;font-size:13px">${inhoud || 'Geen data'}</pre>
          </div>
        </div>
      `,
    });
    res.json({ ok: true });
  } catch (e) { console.error(e); res.status(500).json({ fout: 'Serverfout' }); }
});

// POST /api/mail/test — stuur testmail
app.post('/api/mail/test', authCheck, async (req, res) => {
  if (!req.gebruiker.is_admin) return res.status(403).json({ fout: 'Geen toegang' });
  const ok = await stuurMail({
    aan: req.body.aan || 'dennis.goosen@example.com',
    onderwerp: 'DenCRM testmail',
    html: '<h2>DenCRM mailserver werkt!</h2><p>De mailkoppeling is succesvol ingesteld.</p>',
  });
  res.json({ ok });
});

// ============================================================
// SERVER STARTEN
// ============================================================

app.listen(PORT, () => {
  console.log(`DenCRM API draait op http://localhost:${PORT}`);
  console.log(`Database: ${process.env.DB_SERVER}\\${process.env.DB_DATABASE}`);
});
