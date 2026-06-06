import { useState, useRef, useEffect } from "react";
import * as API from './api.js';

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
function KlantZoekBox({ klanten, value, onChange, fs }) {
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
        placeholder="Typ om te zoeken…"
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
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", display:"flex",
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

// ── LOGIN ────────────────────────────────────────────────────────────────────
function LoginPage({ onLogin, onDemo, kleur }) {
  const [un, setUn] = useState(""); const [pw, setPw] = useState("");
  const [err, setErr] = useState(""); const [toon, setToon] = useState(false);
  const [bezig, setBezig] = useState(false);
  const [regModal, setRegModal] = useState(false);
  const [regForm, setRegForm] = useState({ naam:"", bedrijf:"", email:"" });
  const [regErr, setRegErr] = useState("");
  const [regOk, setRegOk] = useState(false);

  async function doLogin() {
    if (!un || !pw) { setErr("Vul gebruikersnaam en wachtwoord in."); return; }
    setBezig(true); setErr("");
    try {
      const gebruiker = await API.login(un, pw);
      onLogin(gebruiker);
    } catch (e) {
      setErr(e.message || "Inloggen mislukt.");
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
      background:"linear-gradient(160deg,#0f1e2e 0%,#1a3a5c 50%,#0f1e2e 100%)" }}>
      <div style={{ background:"#fff", borderRadius:24, border:"1px solid #e0e0e0",
        padding:"3rem 3rem 2.5rem", width:"100%", maxWidth:480,
        boxShadow:"0 24px 80px rgba(0,0,0,0.35)", margin:"1rem" }}>

        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:"2rem" }}>
          <img src="afbeeldingen/dencrm.png" alt="DenCRM logo"
            style={{ height:160, objectFit:"contain", marginBottom:"0.5rem" }}
            onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="block"; }} />
          <div style={{ display:"none", textAlign:"center" }}>
            <div style={{ width:72, height:72, borderRadius:"50%", background:kleur.licht,
              display:"flex", alignItems:"center", justifyContent:"center",
              margin:"0 auto 0.75rem", fontSize:32 }}>🏢</div>
            <h1 style={{ margin:0, fontSize:28, fontWeight:700, color:"#1a1a1a" }}>DenCRM</h1>
          </div>
          <p style={{ margin:"0.5rem 0 0", fontSize:14, color:"#888" }}>Klanten & Offertes Beheer</p>
        </div>

        <div style={{ marginBottom:"1.25rem" }}>
          <label style={{ display:"block", fontSize:14, color:"#555", marginBottom:6, fontWeight:500 }}>Gebruikersnaam</label>
          <input value={un} onChange={e=>setUn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()}
            placeholder="Vul je gebruikersnaam in"
            style={{ width:"100%", padding:"13px 16px", borderRadius:10, border:"1.5px solid #ddd",
              background:"#fafafa", fontSize:15, color:"#1a1a1a", boxSizing:"border-box" }} />
        </div>
        <div style={{ marginBottom:"1.75rem" }}>
          <label style={{ display:"block", fontSize:14, color:"#555", marginBottom:6, fontWeight:500 }}>Wachtwoord</label>
          <div style={{ position:"relative" }}>
            <input type={toon?"text":"password"} value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()}
              placeholder="Vul je wachtwoord in"
              style={{ width:"100%", padding:"13px 48px 13px 16px", borderRadius:10, border:"1.5px solid #ddd",
                background:"#fafafa", fontSize:15, color:"#1a1a1a", boxSizing:"border-box" }} />
            <button onClick={()=>setToon(t=>!t)} style={{ position:"absolute", right:14, top:"50%",
              transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#aaa", fontSize:18 }}>
              {toon?"🙈":"👁"}
            </button>
          </div>
        </div>

        {err && <p style={{ color:"#A32D2D", fontSize:14, marginBottom:"1.25rem", background:"#FCEBEB",
          padding:"10px 14px", borderRadius:8 }}>{err}</p>}

        <button onClick={doLogin} style={{ width:"100%", padding:"14px", borderRadius:10,
          background:kleur.hoofd, color:"#fff", border:"none", cursor:"pointer",
          fontSize:16, fontWeight:600, letterSpacing:"0.02em",
          boxShadow:`0 4px 16px ${kleur.hoofd}55`,
          opacity: bezig ? 0.7 : 1, cursor: bezig ? "not-allowed" : "pointer" }}>
          {bezig ? "Bezig…" : "Inloggen"}
        </button>

        <div style={{ marginTop:"1.25rem", display:"flex", flexDirection:"column", gap:10 }}>
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
            <span style={{ fontSize:18 }}>✉</span> Maak een account aan
          </button>

          {/* Demo modus */}
          <button onClick={onDemo} style={{ width:"100%", padding:"13px 16px", borderRadius:10,
            background:"#fffbf0", color:"#7a5800", border:"1.5px dashed #e8c44a",
            cursor:"pointer", fontSize:14,
            display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
            <span style={{ fontSize:20 }}>🧪</span>
            <div style={{ textAlign:"left" }}>
              <div style={{ fontWeight:600, fontSize:14 }}>Probeer de applicatie</div>
              <div style={{ fontSize:12, color:"#a07820", marginTop:2 }}>Demo modus — wijzigingen worden niet opgeslagen</div>
            </div>
          </button>
        </div>
      </div>

      {/* Account aanmaken modal */}
      {regModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", display:"flex",
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
                  Zodra de mailserver gekoppeld is ontvangt <strong>{regForm.email}</strong> een activatiemail
                  met een link om een wachtwoord in te stellen.
                </p>
                <p style={{ color:"#999", fontSize:12, marginTop:"1rem" }}>[MAIL VOORBEREIDING — wordt actief na koppeling mailserver]</p>
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
                    placeholder="Uw bedrijfsnaam"
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
    </div>
  );
}

// ── GEBRUIKERSBEHEER ─────────────────────────────────────────────────────────
function GebruikersBeheer({ users, setUsers, kleur, fs }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ naam:"", username:"", ww:"", isAdmin:false });
  const [editId, setEditId] = useState(null);
  const [err, setErr] = useState("");

  function openNieuw() { setForm({ naam:"", username:"", ww:"", isAdmin:false }); setEditId(null); setErr(""); setModal(true); }
  function openEdit(u) { setForm({ naam:u.naam, username:u.username, ww:"", isAdmin:u.isAdmin }); setEditId(u.id); setErr(""); setModal(true); }

  function save() {
    if (!form.naam||!form.username) { setErr("Naam en gebruikersnaam zijn verplicht."); return; }
    if (!editId&&!form.ww) { setErr("Vul een wachtwoord in."); return; }
    if (users.find(u=>u.username===form.username&&u.id!==editId)) { setErr("Gebruikersnaam al in gebruik."); return; }
    if (editId) setUsers(p=>p.map(u=>u.id===editId?{...u,naam:form.naam,username:form.username,isAdmin:form.isAdmin,...(form.ww?{passHash:simpleHash(form.ww)}:{})}:u));
    else setUsers(p=>[...p,{ id:"u"+uid(), naam:form.naam, username:form.username, passHash:simpleHash(form.ww), isAdmin:form.isAdmin }]);
    setModal(false);
  }

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:"1rem" }}>
        <Btn variant="primary" onClick={openNieuw} kleur={kleur} fs={fs}>+ Nieuwe gebruiker</Btn>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {users.map(u=>(
          <div key={u.id} style={{ background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)",
            borderRadius:12, padding:"12px 16px", display:"flex", alignItems:"center", gap:12 }}>
            <Avatar naam={u.naam} kleur={kleur} />
            <div style={{ flex:1 }}>
              <p style={{ margin:0, fontWeight:500, fontSize:fs }}>{u.naam}</p>
              <p style={{ margin:0, fontSize:fs-1, color:"var(--color-text-secondary)" }}>@{u.username}</p>
            </div>
            {u.isAdmin&&<Badge kleur={kleur}>Admin</Badge>}
            <div style={{ display:"flex", gap:6 }}>
              <Btn onClick={()=>openEdit(u)} fs={fs}>✎ Bewerken</Btn>
              {u.id!=="u1"&&<Btn variant="danger" onClick={()=>{ if(confirm("Verwijderen?")) setUsers(p=>p.filter(x=>x.id!==u.id)); }} fs={fs}>✕</Btn>}
            </div>
          </div>
        ))}
      </div>
      {modal&&(
        <Modal title={editId?"Gebruiker bewerken":"Nieuwe gebruiker"} onClose={()=>setModal(false)} fs={fs}>
          <FF label="Volledige naam" fs={fs}><input value={form.naam} onChange={e=>setForm(f=>({...f,naam:e.target.value}))} style={iSt(fs)} /></FF>
          <FF label="Gebruikersnaam" fs={fs}><input value={form.username} onChange={e=>setForm(f=>({...f,username:e.target.value}))} style={iSt(fs)} /></FF>
          <FF label={editId?"Nieuw wachtwoord (leeg = ongewijzigd)":"Wachtwoord"} fs={fs}>
            <input type="password" value={form.ww} onChange={e=>setForm(f=>({...f,ww:e.target.value}))} style={iSt(fs)} />
          </FF>
          <label style={{ display:"flex", alignItems:"center", gap:8, fontSize:fs, cursor:"pointer", marginBottom:"1rem", color:"#1a1a1a" }}>
            <input type="checkbox" checked={form.isAdmin} onChange={e=>setForm(f=>({...f,isAdmin:e.target.checked}))} />
            Admin-rechten
          </label>
          {err&&<p style={{ color:"#A32D2D", fontSize:fs-1, background:"#FCEBEB", padding:"8px 12px", borderRadius:6, marginBottom:"1rem" }}>{err}</p>}
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
            <Btn onClick={()=>setModal(false)} fs={fs}>Annuleren</Btn>
            <Btn variant="primary" onClick={save} kleur={kleur} fs={fs}>Opslaan</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── KLANTEN ──────────────────────────────────────────────────────────────────
function KlantenPage({ klanten, setKlanten, producten, agenda, kleur, fs }) {
  const [zoek, setZoek] = useState("");
  const [modal, setModal] = useState(null);
  const [sel, setSel] = useState(null);
  const [form, setForm] = useState({ naam:"", email:"", telefoon:"", adres:"", producten:[], offertes:[] });
  const [tabblad, setTabblad] = useState("info"); // "info" | "afspraken" | "offertes"
  const [openOfferte, setOpenOfferte] = useState(null);
  const [klantDetailModal, setKlantDetailModal] = useState(null); // klant voor popup

  const filtered = klanten.filter(k=>
    k.naam.toLowerCase().includes(zoek.toLowerCase()) ||
    k.email.toLowerCase().includes(zoek.toLowerCase())
  );

  function openNieuw() { setForm({ naam:"", email:"", telefoon:"", adres:"", producten:[], offertes:[] }); setModal("nieuw"); }
  function openBewerk(k) { setForm({...k}); setModal("bewerk"); }

  async function save() {
    if (!form.naam) return;
    if (isDemoMode) {
      if (modal==="nieuw") setKlanten(p=>[...p,{...form,id:"k"+uid()}]);
      else { setKlanten(p=>p.map(k=>k.id===form.id?form:k)); if(sel?.id===form.id) setSel(form); }
      setModal(null); return;
    }
    try {
      if (modal==="nieuw") {
        const { id } = await API.maakKlantAan({ naam:form.naam, email:form.email, telefoon:form.telefoon, adres:form.adres });
        await API.updateKlant(id, { ...form, producten:form.producten });
      } else {
        await API.updateKlant(form.id, { naam:form.naam, email:form.email, telefoon:form.telefoon, adres:form.adres, producten:form.producten });
      }
      await herlaad();
      setModal(null);
    } catch(e) { alert("Opslaan mislukt: " + e.message); }
  }

  async function del(id) {
    if (!confirm("Klant verwijderen?")) return;
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

  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
      <div>
        <div style={{ display:"flex", gap:8, marginBottom:"1rem" }}>
          <input value={zoek} onChange={e=>setZoek(e.target.value)} placeholder="Zoek op naam of e-mail…"
            style={{ flex:1, padding:"8px 12px", borderRadius:8, border:"0.5px solid var(--color-border-secondary)",
              background:"var(--color-background-primary)", color:"var(--color-text-primary)", fontSize:fs }} />
          <Btn variant="primary" onClick={openNieuw} kleur={kleur} fs={fs}>+ Nieuw</Btn>
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
              {[{id:"info",label:"Info"},{id:"afspraken",label:`Afspraken (${klantAfspraken.length})`},{id:"offertes",label:`Offertes (${klantOffertes.length})`}].map(t=>(
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
                  {[{l:"Telefoon",v:sel.telefoon},{l:"Adres",v:sel.adres}].map(r=>(
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
          </div>
        ):(
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:200,
            color:"var(--color-text-secondary)", fontSize:fs, border:"0.5px dashed var(--color-border-tertiary)", borderRadius:12 }}>
            Selecteer een klant om details te zien
          </div>
        )}
      </div>

      {(modal==="nieuw"||modal==="bewerk")&&(
        <Modal title={modal==="nieuw"?"Nieuwe klant":"Klant bewerken"} onClose={()=>setModal(null)} fs={fs}>
          <FF label="Naam" fs={fs}><input value={form.naam} onChange={e=>setForm(f=>({...f,naam:e.target.value}))} style={iSt(fs)} /></FF>
          <FF label="E-mailadres" fs={fs}><input type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} style={iSt(fs)} /></FF>
          <FF label="Telefoonnummer" fs={fs}><input value={form.telefoon} onChange={e=>setForm(f=>({...f,telefoon:e.target.value}))} style={iSt(fs)} /></FF>
          <FF label="Adres" fs={fs}><input value={form.adres} onChange={e=>setForm(f=>({...f,adres:e.target.value}))} style={iSt(fs)} /></FF>
          <FF label="Producten koppelen" fs={fs}>
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

      {/* Klant detail popup (dubbelklik) */}
      {klantDetailModal&&(()=>{
        const k = klantDetailModal;
        const kAfspraken = agenda.filter(a=>a.klantId===k.id).sort((a,b)=>(a.datum+a.tijd).localeCompare(b.datum+b.tijd));
        const nu = new Date().toISOString().slice(0,10);
        return (
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", display:"flex",
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
                  <p style={{ margin:"0 0 8px", fontSize:fs-2, fontWeight:600, color:"#888", letterSpacing:"0.05em" }}>CONTACTGEGEVENS</p>
                  {[{l:"Telefoon",v:k.telefoon},{l:"Adres",v:k.adres}].map(r=>(
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
                        Totaal: <strong>€{k.producten.reduce((s,pid)=>s+(producten.find(p=>p.id===pid)?.prijs||0),0).toLocaleString("nl-NL",{minimumFractionDigits:2})}</strong>
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
function ProductenPage({ producten, setProducten, kleur, fs }) {
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
    if (!confirm("Product verwijderen?")) return;
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
    if (!confirm(`Categorie "${cat}" verwijderen? Producten in deze categorie krijgen geen categorie meer.`)) return;
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
        <Modal title={editProduct?"Product bewerken":"Nieuw product"} onClose={()=>setModal(false)} fs={fs}>
          <FF label="Productnaam" fs={fs}><input value={form.naam} onChange={e=>setForm(f=>({...f,naam:e.target.value}))} style={iSt(fs)} /></FF>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            <FF label="Verkoopprijs (€)" fs={fs}><input type="number" value={form.prijs} onChange={e=>setForm(f=>({...f,prijs:e.target.value}))} style={iSt(fs)} /></FF>
            <FF label="Inkoopprijs (€)" fs={fs}>
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
          <FF label="Beschrijving" fs={fs}><textarea value={form.beschrijving} onChange={e=>setForm(f=>({...f,beschrijving:e.target.value}))} rows={3} style={{...iSt(fs),resize:"vertical"}} /></FF>
          <FF label="Categorie" fs={fs}>
            <input value={form.categorie} onChange={e=>setForm(f=>({...f,categorie:e.target.value}))} list="prod-cats" style={iSt(fs)} placeholder="Bijv. Web, Marketing, Design…" />
            <datalist id="prod-cats">{cats.map(c=><option key={c} value={c}/>)}</datalist>
          </FF>
          {/* Voorraad */}
          <div style={{ borderTop:"0.5px solid var(--color-border-tertiary)", paddingTop:"1rem", marginTop:"0.25rem" }}>
            <p style={{ margin:"0 0 8px", fontSize:fs-1, fontWeight:500, color:"var(--color-text-secondary)", letterSpacing:"0.04em" }}>VOORRAAD</p>
            <FF label="Aantal op voorraad" fs={fs}>
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
        <Modal title="Categorie toevoegen" onClose={()=>setCatModal(false)} fs={fs}>
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
          <FF label="Nieuwe categorie naam" fs={fs}>
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
function AgendaPage({ klanten, agenda, setAgenda, kleur, fs }) {
  const [view, setView] = useState("blok");
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ klantId:"", datum:"", tijd:"", tijdTot:"", notitie:"" });
  const [filterDatum, setFilterDatum] = useState(new Date().toISOString().slice(0,10));
  const [hover, setHover] = useState(null);

  const sorted = [...agenda]
    .filter(a=>!filterDatum||a.datum===filterDatum)
    .sort((a,b)=>(a.datum+a.tijd).localeCompare(b.datum+b.tijd));

  function openNieuw(tijd="09:00") {
    const [h,m] = tijd.split(":").map(Number);
    const tijdTot = `${String(Math.min(h+1,23)).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
    setForm({ klantId:"", datum:filterDatum||new Date().toISOString().slice(0,10), tijd, tijdTot, notitie:"" });
    setEditId(null); setModal(true);
  }

  function openEdit(a) {
    setForm({ klantId:a.klantId, datum:a.datum, tijd:a.tijd, tijdTot:a.tijdTot||"", notitie:a.notitie||"" });
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
      const data = { klant_id:form.klantId, datum:form.datum,
        tijd_van:form.tijd, tijd_tot:form.tijdTot||null, notitie:form.notitie||null };
      if (editId) await API.updateAfspraak(editId, data);
      else await API.maakAfspraakAan(data);
      await herlaad();
      setModal(false);
    } catch(e) { alert("Opslaan mislukt: " + e.message); }
  }

  async function del(id) {
    if (!confirm("Afspraak verwijderen?")) return;
    if (isDemoMode) { setAgenda(p=>p.filter(a=>a.id!==id)); if(editId===id) setModal(false); return; }
    try { await API.verwijderAfspraak(id); if(editId===id) setModal(false); await herlaad(); }
    catch(e) { alert("Verwijderen mislukt: " + e.message); }
  }

  const groups = {};
  sorted.forEach(a=>{ if(!groups[a.datum]) groups[a.datum]=[]; groups[a.datum].push(a); });

  const dagAfsp = agenda.filter(a=>a.datum===filterDatum);
  function afspVoorUur(uur) { return dagAfsp.filter(a=>a.tijd.startsWith(uur.slice(0,2))); }
  function tijdLabel(a) { return a.tijdTot ? `${a.tijd} – ${a.tijdTot}` : a.tijd; }

  return (
    <div>
      <div style={{ display:"flex", gap:8, marginBottom:"1rem", alignItems:"center", flexWrap:"wrap" }}>
        <label style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 14px",
          borderRadius:8, border:`1.5px solid ${kleur.hoofd}`,
          background:"var(--color-background-primary)", cursor:"pointer",
          boxShadow:`0 0 0 3px ${kleur.hoofd}22` }}>
          <span style={{ fontSize:fs-1, color:kleur.hoofd, fontWeight:500 }}>📅 Datum:</span>
          <input type="date" value={filterDatum} onChange={e=>setFilterDatum(e.target.value)}
            style={{ border:"none", background:"transparent", color:"var(--color-text-primary)",
              fontSize:fs, cursor:"pointer", outline:"none", fontWeight:500 }} />
        </label>
        <div style={{ display:"flex", borderRadius:8, overflow:"hidden", border:`1px solid ${kleur.hoofd}` }}>
          {[{id:"blok",label:"⊞ Uurblokken"},{id:"lijst",label:"☰ Lijst"}].map(v=>(
            <button key={v.id} onClick={()=>setView(v.id)} style={{ padding:"7px 14px", border:"none", cursor:"pointer", fontSize:fs-1,
              background:view===v.id?kleur.hoofd:"var(--color-background-primary)",
              color:view===v.id?"#fff":"var(--color-text-primary)" }}>{v.label}</button>
          ))}
        </div>
        <div style={{ flex:1 }}/>
        <Btn variant="primary" onClick={()=>openNieuw()} kleur={kleur} fs={fs}>+ Afspraak</Btn>
      </div>

      {view==="lijst"&&(
        <>
          {Object.keys(groups).length===0&&<p style={{ color:"var(--color-text-secondary)", fontSize:fs }}>Geen afspraken gevonden.</p>}
          {Object.entries(groups).map(([datum,afspraken])=>(
            <div key={datum} style={{ marginBottom:"1.5rem" }}>
              <p style={{ fontSize:fs-1, fontWeight:500, color:"var(--color-text-secondary)", marginBottom:8 }}>
                {new Date(datum+"T12:00:00").toLocaleDateString("nl-NL",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}
              </p>
              {afspraken.map(a=>{const k=klanten.find(x=>x.id===a.klantId);return(
                <div key={a.id} style={{ background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)",
                  borderRadius:12, padding:"12px 16px", display:"flex", gap:16, alignItems:"center", marginBottom:8 }}>
                  <div style={{ background:kleur.licht, color:kleur.donker, borderRadius:8, padding:"8px 12px", textAlign:"center", minWidth:80 }}>
                    <p style={{ margin:0, fontSize:fs, fontWeight:500 }}>{a.tijd}</p>
                    {a.tijdTot&&<p style={{ margin:0, fontSize:fs-3, opacity:0.8 }}>t/m {a.tijdTot}</p>}
                  </div>
                  {k&&<Avatar naam={k.naam} size={36} kleur={kleur}/>}
                  <div style={{ flex:1 }}>
                    <p style={{ margin:0, fontSize:fs, fontWeight:500 }}>{k?.naam||"Onbekende klant"}</p>
                    <p style={{ margin:0, fontSize:fs-1, color:"var(--color-text-secondary)" }}>{a.notitie}</p>
                  </div>
                  <button onClick={()=>openEdit(a)} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--color-text-secondary)",padding:4,fontSize:fs+2 }}>✎</button>
                  <button onClick={()=>del(a.id)} style={{ background:"none",border:"none",cursor:"pointer",color:"#A32D2D",padding:4,fontSize:fs+2 }}>✕</button>
                </div>
              );})}
            </div>
          ))}
        </>
      )}

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
                    {afspraken.length===0&&isH&&<span style={{ fontSize:fs-2, color:kleur.donker, padding:"4px 0" }}>+ Klik om afspraak toe te voegen</span>}
                    {afspraken.map(a=>{const k=klanten.find(x=>x.id===a.klantId);return(
                      <div key={a.id} onClick={e=>{e.stopPropagation();openEdit(a);}}
                        style={{ background:kleur.hoofd, color:"#fff", borderRadius:6,
                          padding:"5px 10px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer" }}>
                        <div>
                          <span style={{ fontSize:fs-1, fontWeight:500 }}>{tijdLabel(a)} — {k?.naam||"?"}</span>
                          {a.notitie&&<p style={{ margin:"1px 0 0", fontSize:fs-3, opacity:0.85 }}>{a.notitie}</p>}
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

      {modal&&(
        <Modal title={editId?"Afspraak bewerken":"Nieuwe afspraak"} onClose={()=>setModal(false)} fs={fs}>
          <FF label="Klant zoeken" fs={fs}>
            <KlantZoekBox klanten={klanten} value={form.klantId} onChange={id=>setForm(f=>({...f,klantId:id}))} fs={fs} />
          </FF>
          <FF label="Datum" fs={fs}>
            <input type="date" value={form.datum} onChange={e=>setForm(f=>({...f,datum:e.target.value}))} style={iSt(fs)} />
          </FF>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            <FF label="Vanaf" fs={fs}><input type="time" value={form.tijd} onChange={e=>setForm(f=>({...f,tijd:e.target.value}))} style={iSt(fs)} /></FF>
            <FF label="Tot" fs={fs}><input type="time" value={form.tijdTot} onChange={e=>setForm(f=>({...f,tijdTot:e.target.value}))} style={iSt(fs)} /></FF>
          </div>
          <FF label="Notitie" fs={fs}><textarea value={form.notitie} onChange={e=>setForm(f=>({...f,notitie:e.target.value}))} rows={3} style={{...iSt(fs),resize:"vertical"}} /></FF>
          <div style={{ display:"flex", gap:8, justifyContent:"space-between", marginTop:"1rem" }}>
            {editId && <Btn variant="danger" onClick={()=>del(editId)} fs={fs}>Verwijderen</Btn>}
            <div style={{ display:"flex", gap:8, marginLeft:"auto" }}>
              <Btn onClick={()=>setModal(false)} fs={fs}>Annuleren</Btn>
              <Btn variant="primary" onClick={save} kleur={kleur} fs={fs} disabled={!form.klantId}>Opslaan</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── OFFERTE PREVIEW (herbruikbaar) ───────────────────────────────────────────
function OffertePreview({ offerte, klant, kleur }) {
  const vandaag = offerte.datum
    ? new Date(offerte.datum+"T12:00:00").toLocaleDateString("nl-NL",{day:"numeric",month:"long",year:"numeric"})
    : new Date().toLocaleDateString("nl-NL",{day:"numeric",month:"long",year:"numeric"});
  const tekst = (offerte.template||OFFERTE_TEMPLATE).replace("{klant_naam}", klant?.naam||"");
  const exclBtw = offerte.regels.reduce((s,r)=>s+(parseFloat(r.prijs)||0),0);
  const btwBedrag = offerte.inclBtw ? Math.round(exclBtw*0.21) : 0;
  const totaal = exclBtw + btwBedrag;
  return (
    <div style={{ background:"#fff", color:"#222", border:"0.5px solid #ddd", borderRadius:12,
      padding:"2.5rem", fontFamily:"Georgia,serif", lineHeight:1.7 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"2rem" }}>
        <div>
          <h2 style={{ margin:0, fontSize:22, fontWeight:700, color:kleur.hoofd }}>{offerte.bedrijfsnaam||"Uw Bedrijfsnaam"}</h2>
          <p style={{ margin:0, fontSize:13, color:"#666" }}>{offerte.bedrijfAdres||""}</p>
          {offerte.iban&&<p style={{ margin:"2px 0 0", fontSize:12, color:"#888" }}>IBAN: {offerte.iban}</p>}
          {offerte.btwNr&&<p style={{ margin:"2px 0 0", fontSize:12, color:"#888" }}>BTW-nr: {offerte.btwNr}</p>}
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
            <th style={{ padding:"10px 12px", textAlign:"right", fontSize:13, fontWeight:500 }}>Prijs</th>
          </tr>
        </thead>
        <tbody>
          {offerte.regels.map((r,i)=>(
            <tr key={r.id||i} style={{ background:i%2===0?"#f8f8f8":"#fff" }}>
              <td style={{ padding:"9px 12px", fontSize:13 }}>{r.naam||"—"}</td>
              <td style={{ padding:"9px 12px", fontSize:13, color:"#555" }}>{r.beschrijving||""}</td>
              <td style={{ padding:"9px 12px", fontSize:13, textAlign:"right", fontWeight:500 }}>
                €{parseFloat(r.prijs||0).toLocaleString("nl-NL",{minimumFractionDigits:2})}
              </td>
            </tr>
          ))}
          <tr style={{ borderTop:`2px solid ${kleur.hoofd}` }}>
            <td colSpan={2} style={{ padding:"10px 12px", fontWeight:700, fontSize:14 }}>Subtotaal excl. BTW</td>
            <td style={{ padding:"10px 12px", fontWeight:700, fontSize:15, textAlign:"right", color:"#333" }}>
              €{exclBtw.toLocaleString("nl-NL",{minimumFractionDigits:2})}
            </td>
          </tr>
          {offerte.inclBtw&&(
            <tr>
              <td colSpan={2} style={{ padding:"4px 12px", color:"#666", fontSize:13 }}>BTW 21%</td>
              <td style={{ padding:"4px 12px", fontSize:13, textAlign:"right", color:"#666" }}>
                €{btwBedrag.toLocaleString("nl-NL",{minimumFractionDigits:2})}
              </td>
            </tr>
          )}
          <tr style={{ background:kleur.licht }}>
            <td colSpan={2} style={{ padding:"10px 12px", fontWeight:700, fontSize:14, color:kleur.donker }}>
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
const LEEG_REGEL = () => ({ id:"r"+uid(), naam:"", beschrijving:"", prijs:0, isVariabel:true });

function OffertesPage({ klanten, setKlanten, producten, kleur, fs }) {
  const [stap, setStap] = useState(1);
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
  const [nieuweKlantModal, setNieuweKlantModal] = useState(false);
  const [nkForm, setNkForm] = useState({ naam:"", email:"", telefoon:"", adres:"" });
  const [catFilter, setCatFilter] = useState("Alle");

  const klant = klanten.find(k=>k.id===klantId);
  const exclBtw = regels.reduce((s,r)=>s+(parseFloat(r.prijs)||0),0);
  const btwBedrag = inclBtw ? Math.round(exclBtw*0.21) : 0;
  const totaalInclBtw = exclBtw + btwBedrag;
  const vandaagISO = new Date().toISOString().slice(0,10);

  const cats = ["Alle", ...new Set(producten.map(p=>p.categorie).filter(Boolean))];
  const gefilterdeProd = catFilter==="Alle" ? producten : producten.filter(p=>p.categorie===catFilter);

  function addProductRegel(p) {
    setRegels(r=>[...r,{ id:"r"+uid(), naam:p.naam, beschrijving:p.beschrijving||"", prijs:p.prijs, isVariabel:false }]);
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
    if (isDemoMode) {
      const offerte = { id:"o"+uid(), referentie:ref, datum:vandaagISO, regels, totaalInclBtw, inclBtw,
        bedrijfsnaam, bedrijfAdres, iban, btwNr, template };
      setKlanten(p=>p.map(k=>k.id===klantId?{...k,offertes:[...(k.offertes||[]),offerte]}:k));
      setOpgeslagen(true); return;
    }
    try {
      await API.maakOfferteAan({
        klant_id: klantId,
        referentie: ref,
        datum: vandaagISO,
        type: "offerte",
        incl_btw: inclBtw,
        totaal_excl_btw: exclBtw,
        totaal_incl_btw: totaalInclBtw,
        bedrijfsnaam, bedrijf_adres: bedrijfAdres,
        iban, btw_nummer: btwNr,
        offerte_tekst: template,
        regels: regels.map((r,i) => ({ naam:r.naam, beschrijving:r.beschrijving||"", prijs:parseFloat(r.prijs)||0, volgorde:i, isVariabel:r.isVariabel||false })),
      });
      await herlaad();
      setOpgeslagen(true);
    } catch(e) { alert("Opslaan mislukt: " + e.message); }
  }

  function reset() {
    setStap(1); setKlantId(""); setRegels([]); setInclBtw(true);
    setRef(`OFF-${new Date().getFullYear()}-001`); setOpgeslagen(false); setCatFilter("Alle");
  }

  const stapLabels = ["Klant kiezen","Producten & regels","Tekst & voorbeeld"];

  return (
    <div>
      <div style={{ display:"flex", gap:8, marginBottom:"1.5rem", flexWrap:"wrap" }}>
        {[1,2,3].map(s=>(
          <div key={s} style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:28, height:28, borderRadius:"50%",
              background:stap>=s?kleur.hoofd:"var(--color-background-secondary)",
              color:stap>=s?"#fff":"var(--color-text-secondary)",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:500 }}>{s}</div>
            <span style={{ fontSize:fs-1, color:stap===s?"var(--color-text-primary)":"var(--color-text-secondary)" }}>
              {stapLabels[s-1]}
            </span>
            {s<3&&<span style={{ color:"var(--color-text-secondary)", margin:"0 4px" }}>›</span>}
          </div>
        ))}
      </div>

      {/* ─ STAP 1: Klant kiezen ─ */}
      {stap===1&&(
        <div style={{ maxWidth:520 }}>
          <p style={{ margin:"0 0 1.25rem", fontSize:fs-1, color:"var(--color-text-secondary)" }}>
            Zoek een bestaande klant of voeg een nieuwe klant toe.
          </p>
          <FF label="Klant zoeken" fs={fs}>
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
            <Btn variant="primary" onClick={()=>klantId&&setStap(2)} kleur={kleur} fs={fs} disabled={!klantId}>
              Volgende →
            </Btn>
          </div>

          {nieuweKlantModal&&(
            <Modal title="Nieuwe klant toevoegen" onClose={()=>setNieuweKlantModal(false)} fs={fs}>
              <FF label="Naam" fs={fs}><input value={nkForm.naam} onChange={e=>setNkForm(f=>({...f,naam:e.target.value}))} style={iSt(fs)} /></FF>
              <FF label="E-mailadres" fs={fs}><input type="email" value={nkForm.email} onChange={e=>setNkForm(f=>({...f,email:e.target.value}))} style={iSt(fs)} /></FF>
              <FF label="Telefoonnummer" fs={fs}><input value={nkForm.telefoon} onChange={e=>setNkForm(f=>({...f,telefoon:e.target.value}))} style={iSt(fs)} /></FF>
              <FF label="Adres" fs={fs}><input value={nkForm.adres} onChange={e=>setNkForm(f=>({...f,adres:e.target.value}))} style={iSt(fs)} /></FF>
              <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:"1rem" }}>
                <Btn onClick={()=>setNieuweKlantModal(false)} fs={fs}>Annuleren</Btn>
                <Btn variant="primary" onClick={voegKlantToe} kleur={kleur} fs={fs}>Klant toevoegen & selecteren</Btn>
              </div>
            </Modal>
          )}
        </div>
      )}

      {/* ─ STAP 2: Producten & regels ─ */}
      {stap===2&&(
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
                  <div style={{ display:"grid", gridTemplateColumns:"1fr auto auto", gap:8, marginBottom:r.isVariabel?6:0, alignItems:"center" }}>
                    <input value={r.naam} onChange={e=>updateRegel(r.id,"naam",e.target.value)} placeholder="Omschrijving"
                      style={{ padding:"6px 10px", borderRadius:6, border:"1px solid #d0d0d0", background:"#f9f9f9", color:"#1a1a1a", fontSize:fs }} />
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <span style={{ fontSize:fs-1, color:"#666" }}>€</span>
                      {r.isVariabel?(
                        <input type="number" value={r.prijs} onChange={e=>updateRegel(r.id,"prijs",e.target.value)}
                          placeholder="0,00" style={{ width:90, padding:"6px 8px", borderRadius:6, border:"1px solid #d0d0d0", background:"#f9f9f9", color:"#1a1a1a", fontSize:fs }} />
                      ):(
                        <span style={{ fontSize:fs, fontWeight:500, color:kleur.hoofd, minWidth:90, textAlign:"right" }}>
                          {parseFloat(r.prijs||0).toLocaleString("nl-NL",{minimumFractionDigits:2})}
                        </span>
                      )}
                    </div>
                    <button onClick={()=>delRegel(r.id)} style={{ background:"none",border:"none",cursor:"pointer",color:"#A32D2D",fontSize:fs+2,padding:"0 4px" }}>✕</button>
                  </div>
                  {r.isVariabel&&(
                    <input value={r.beschrijving} onChange={e=>updateRegel(r.id,"beschrijving",e.target.value)} placeholder="Toelichting (optioneel)"
                      style={{ width:"100%", padding:"5px 10px", borderRadius:6, border:"1px solid #e0e0e0", background:"#f9f9f9", color:"#666", fontSize:fs-2, boxSizing:"border-box" }} />
                  )}
                </div>
              ))}
            </div>
          )}

          <button onClick={addLegeRegel} style={{ width:"100%", padding:"9px", borderRadius:8,
            background:"var(--color-background-primary)", color:"var(--color-text-primary)",
            border:"0.5px solid var(--color-border-secondary)", cursor:"pointer", fontSize:fs,
            display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:"1rem" }}>
            + Voeg eenmalig nog niet bestaand product toe
          </button>

          <div style={{ margin:"0 0 1rem", padding:"12px 14px", background:"var(--color-background-secondary)", borderRadius:8 }}>
            <Toggle aan={inclBtw} onToggle={()=>setInclBtw(v=>!v)} label="BTW (21%) toevoegen aan totaal" fs={fs} />
          </div>

          {regels.length>0&&(
            <div style={{ textAlign:"right", fontSize:fs-1, color:"var(--color-text-secondary)", marginBottom:"1rem" }}>
              Subtotaal excl. BTW: <strong>€{exclBtw.toLocaleString("nl-NL",{minimumFractionDigits:2})}</strong>
              {inclBtw&&<> &nbsp;·&nbsp; Totaal incl. BTW: <strong style={{ color:kleur.hoofd }}>€{totaalInclBtw.toLocaleString("nl-NL",{minimumFractionDigits:2})}</strong></>}
            </div>
          )}

          <div style={{ display:"flex", gap:8, justifyContent:"space-between" }}>
            <Btn onClick={()=>setStap(1)} fs={fs}>← Terug</Btn>
            <Btn variant="primary" onClick={()=>regels.length>0&&setStap(3)} kleur={kleur} fs={fs} disabled={regels.length===0}>
              Volgende →
            </Btn>
          </div>
        </div>
      )}

      {/* ─ STAP 3: Tekst & bedrijfsgegevens + voorbeeld ─ */}
      {stap===3&&(
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:"1rem" }}>
            <FF label="Uw bedrijfsnaam" fs={fs}><input value={bedrijfsnaam} onChange={e=>setBedrijfsnaam(e.target.value)} style={iSt(fs)} /></FF>
            <FF label="Uw adres" fs={fs}><input value={bedrijfAdres} onChange={e=>setBedrijfAdres(e.target.value)} style={iSt(fs)} /></FF>
            <FF label="IBAN rekeningnummer" fs={fs}><input value={iban} onChange={e=>setIban(e.target.value)} placeholder="NL00 BANK 0000 0000 00" style={iSt(fs)} /></FF>
            <FF label="BTW-nummer" fs={fs}><input value={btwNr} onChange={e=>setBtwNr(e.target.value)} placeholder="NL000000000B01" style={iSt(fs)} /></FF>
          </div>
          <FF label="Referentienummer" fs={fs}><input value={ref} onChange={e=>setRef(e.target.value)} style={iSt(fs)} /></FF>
          <FF label="Offertetekst (gebruik {klant_naam} als variabele)" fs={fs}>
            <textarea value={template} onChange={e=>setTemplate(e.target.value)} rows={6}
              style={{...iSt(fs), resize:"vertical", fontFamily:"monospace"}} />
          </FF>
          <div style={{ display:"flex", gap:8, justifyContent:"space-between", marginBottom:"1.5rem", flexWrap:"wrap" }}>
            <Btn onClick={()=>setStap(2)} fs={fs}>← Terug</Btn>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {!opgeslagen?(
                <Btn onClick={slaOp} kleur={kleur} fs={fs} variant="primary">💾 Opslaan onder klant</Btn>
              ):(
                <span style={{ fontSize:fs-1, color:"green", padding:"8px 12px" }}>✓ Opgeslagen</span>
              )}
              {/* Mail knop — mail functionaliteit nog niet actief */}
              {klant?.email ? (
                <button
                  onClick={()=>alert(`[MAIL VOORBEREIDING]\nAan: ${klant.email}\nOnderwerp: Offerte ${ref}\n\nDeze functie wordt actief zodra de mailserver gekoppeld is.`)}
                  style={{ padding:"8px 14px", borderRadius:8, border:`1px solid ${kleur.hoofd}`,
                    background:kleur.licht, color:kleur.donker, cursor:"pointer", fontSize:fs,
                    display:"flex", alignItems:"center", gap:6, fontWeight:400 }}>
                  ✉ Mailen naar klant
                </button>
              ) : (
                <button disabled title="Er is geen mailadres gekoppeld aan deze klant"
                  style={{ padding:"8px 14px", borderRadius:8, border:"1px solid #ddd",
                    background:"transparent", color:"#bbb", cursor:"not-allowed", fontSize:fs,
                    display:"flex", alignItems:"center", gap:6, opacity:0.5 }}>
                  ✉ Geen mailadres bekend
                </button>
              )}
              <Btn onClick={()=>window.print()} kleur={kleur} fs={fs} variant="primary">🖨 Afdrukken / PDF</Btn>
              <Btn onClick={reset} fs={fs}>Nieuwe offerte</Btn>
            </div>
          </div>
          <p style={{ fontSize:fs-1, fontWeight:500, color:"var(--color-text-secondary)", marginBottom:12 }}>Voorbeeld offerte</p>
          <OffertePreview offerte={{ regels, inclBtw, referentie:ref, datum:new Date().toISOString().slice(0,10),
            bedrijfsnaam, bedrijfAdres, iban, btwNr, template }} klant={klant} kleur={kleur} />
        </div>
      )}

    </div>
  );
}

// ── FINANCIEEL OVERZICHT ──────────────────────────────────────────────────────
function FinancieelPage({ klanten, setKlanten, kleur, fs }) {
  const [filterKlant, setFilterKlant] = useState("");
  const [filterVan,   setFilterVan]   = useState("");
  const [filterTot,   setFilterTot]   = useState("");
  const [filterBetaald, setFilterBetaald] = useState("alle");
  const [openOfferte, setOpenOfferte] = useState(null);
  const [openKlant,   setOpenKlant]   = useState(null);
  const [losseFactuurModal, setLosseFactuurModal] = useState(false);
  const [exportModal, setExportModal] = useState(false);

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

  // Verzamel alle offertes + losse facturen uit alle klanten
  const alleOffertes = klanten.flatMap(k =>
    (k.offertes || []).map(o => ({ ...o, klant: k, type: o.factuur ? "factuur" : "offerte" }))
  );

  const gesorteerd = [...alleOffertes].sort((a, b) => b.datum.localeCompare(a.datum));

  const gefilterd = gesorteerd.filter(o => {
    if (filterKlant && o.klant.id !== filterKlant) return false;
    if (filterVan   && o.datum < filterVan) return false;
    if (filterTot   && o.datum > filterTot) return false;
    if (filterBetaald === "betaald" && !o.betaald) return false;
    if (filterBetaald === "open"    &&  o.betaald) return false;
    return true;
  });

  const totaalAlle    = gefilterd.reduce((s, o) => s + (o.totaalInclBtw || 0), 0);
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
    return new Date(iso + "T12:00:00").toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" });
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

  function doMail() {
    alert(`[MAIL VOORBEREIDING]\nOnderwerp: Financieel overzicht ${expVan||"begin"} t/m ${expTot||"heden"}\nAan: uw ingestelde mailadres\n\nDeze functie wordt actief zodra de mailserver gekoppeld is.`);
  }

  return (
    <div>
      {/* ── Samenvattingkaarten ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: "1.5rem" }}>
        {[
          { label: "Totaal gefactureerd", bedrag: totaalAlle,    kleurBg: "var(--color-background-secondary)", kleurTekst: "var(--color-text-primary)" },
          { label: "Betaald",             bedrag: totaalBetaald, kleurBg: "#eaf3de", kleurTekst: "#27500a" },
          { label: "Openstaand",          bedrag: totaalOpen,    kleurBg: "#fcebeb", kleurTekst: "#a32d2d" },
        ].map(k => (
          <div key={k.label} style={{ background: k.kleurBg, borderRadius: 10, padding: "14px 16px" }}>
            <p style={{ margin: 0, fontSize: fs - 2, color: k.kleurTekst, opacity: 0.75, marginBottom: 4 }}>{k.label}</p>
            <p style={{ margin: 0, fontSize: fs + 6, fontWeight: 600, color: k.kleurTekst }}>{fmt(k.bedrag)}</p>
            <p style={{ margin: "4px 0 0", fontSize: fs - 2, color: k.kleurTekst, opacity: 0.6 }}>
              {gefilterd.filter(o => k.label === "Betaald" ? o.betaald : k.label === "Openstaand" ? !o.betaald : true).length} document(en)
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
          {[{ id: "alle", label: "Alle" }, { id: "open", label: "Openstaand" }, { id: "betaald", label: "Betaald" }].map(v => (
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
        <span style={{ fontSize: fs - 2, color: "var(--color-text-secondary)" }}>
          {gefilterd.length} {gefilterd.length === 1 ? "document" : "documenten"}
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
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
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {gefilterd.map(o => (
            <div key={o.id} style={{
              background: "var(--color-background-primary)",
              border: `0.5px solid ${o.betaald ? "#c0ddb0" : "var(--color-border-tertiary)"}`,
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
                </div>
                <p style={{ margin: "2px 0 0", fontSize: fs - 2, color: "var(--color-text-secondary)" }}>
                  {fmtDatum(o.datum)} · {o.regels?.length || 0} regel(s)
                  {o.regels?.length > 0 && <span> · {o.regels.map(r => r.naam).filter(Boolean).slice(0, 2).join(", ")}{o.regels.length > 2 ? ` +${o.regels.length - 2}` : ""}</span>}
                </p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ margin: 0, fontSize: fs + 1, fontWeight: 600, color: o.betaald ? "#3b6d11" : kleur.hoofd }}>{fmt(o.totaalInclBtw || 0)}</p>
                <p style={{ margin: 0, fontSize: fs - 2, color: "var(--color-text-secondary)" }}>{o.inclBtw ? "incl. BTW" : "excl. BTW"}</p>
              </div>
              <button onClick={() => { setOpenOfferte(o); setOpenKlant(o.klant); }}
                style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${kleur.hoofd}`,
                  background: kleur.licht, color: kleur.donker, cursor: "pointer", fontSize: fs - 2, fontWeight: 500, flexShrink: 0 }}>
                📄 Openen
              </button>
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
                  {openOfferte.betaald ? "✓ Betaald" : "○ Markeer als betaald"}
                </button>
                <button onClick={() => window.print()}
                  style={{ padding: "7px 14px", borderRadius: 8, background: kleur.hoofd, color: "#fff", border: "none", cursor: "pointer", fontSize: fs - 1 }}>
                  🖨 Afdrukken
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
        <Modal title="Losse factuur aanmaken" onClose={() => setLosseFactuurModal(false)} fs={fs}>
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
          <FF label="Referentienummer" fs={fs}>
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
            <Toggle aan={lfInclBtw} onToggle={() => setLfInclBtw(v => !v)} label="BTW (21%) toevoegen" fs={fs} />
            <p style={{ margin: "8px 0 0", fontSize: fs - 1, color: "var(--color-text-secondary)", textAlign: "right" }}>
              Totaal: <strong style={{ color: kleur.hoofd }}>€{(lfInclBtw ? Math.round(lfRegels.reduce((s,r)=>s+(parseFloat(r.prijs)||0),0)*1.21) : lfRegels.reduce((s,r)=>s+(parseFloat(r.prijs)||0),0)).toLocaleString("nl-NL", {minimumFractionDigits:2})}</strong>
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
        <Modal title="Exporteer / Print overzicht" onClose={() => setExportModal(false)} fs={fs}>
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
                { l: "Betaald",    v: "€"+expBetaald.toLocaleString("nl-NL",{minimumFractionDigits:2}) },
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
              <span style={{ fontSize: fs - 3, opacity: 0.7 }}>(voorbereiding)</span>
            </button>
            <Btn variant="primary" onClick={doPrint} kleur={kleur} fs={fs}>🖨 Afdrukken</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── INSTELLINGEN PANEEL ───────────────────────────────────────────────────────
function InstellingenPanel({ kleur, kleurIdx, setKleurIdx, fs, setFs, bgIdx, setBgIdx, onClose }) {
  return (
    <div style={{ position:"absolute", bottom:60, left:12, width:240,
      backgroundColor:"#ffffff", color:"#1a1a1a",
      border:"1px solid #d0d0d0", borderRadius:12,
      padding:"1.25rem", boxShadow:"0 8px 24px rgba(0,0,0,0.15)", zIndex:500 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem" }}>
        <span style={{ fontWeight:500, fontSize:14 }}>⚙ Instellingen</span>
        <button onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",color:"#888",fontSize:18,lineHeight:1,padding:"2px 6px" }}>×</button>
      </div>
      <p style={{ margin:"0 0 6px", fontSize:11, color:"#666", fontWeight:600, letterSpacing:"0.05em" }}>TEKSTGROOTTE</p>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
        <button onClick={()=>setFs(s=>Math.max(12,s-1))} style={{ width:28,height:28,borderRadius:"50%",border:"1px solid #d0d0d0",background:"#f5f5f5",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center" }}>−</button>
        <span style={{ flex:1,textAlign:"center",fontSize:14,fontWeight:500 }}>{fs}px</span>
        <button onClick={()=>setFs(s=>Math.min(20,s+1))} style={{ width:28,height:28,borderRadius:"50%",border:"1px solid #d0d0d0",background:"#f5f5f5",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center" }}>+</button>
      </div>
      <input type="range" min={12} max={20} step={1} value={fs} onChange={e=>setFs(parseInt(e.target.value))} style={{ width:"100%", marginBottom:"1.25rem" }} />

      <p style={{ margin:"0 0 6px", fontSize:11, color:"#666", fontWeight:600, letterSpacing:"0.05em" }}>ACCENTKLEUR</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6, marginBottom:"1.25rem" }}>
        {KLEUREN.map((k,i)=>(
          <button key={k.label} onClick={()=>setKleurIdx(i)} style={{ padding:"6px 4px", borderRadius:8,
            border:kleurIdx===i?`2px solid ${k.hoofd}`:"1px solid #ddd",
            background:kleurIdx===i?k.licht:"#fafafa",
            cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <div style={{ width:20,height:20,borderRadius:"50%",background:k.hoofd }} />
            <span style={{ fontSize:10, color:kleurIdx===i?k.donker:"#666" }}>{k.label}</span>
          </button>
        ))}
      </div>

      <p style={{ margin:"0 0 6px", fontSize:11, color:"#666", fontWeight:600, letterSpacing:"0.05em" }}>ACHTERGRONDKLEUR</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6 }}>
        {BGOVS.map((b,i)=>(
          <button key={b.label} onClick={()=>setBgIdx(i)} style={{ padding:"6px 4px", borderRadius:8,
            border:bgIdx===i?`2px solid ${kleur.hoofd}`:"1px solid #ddd",
            background:"#fafafa", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <div style={{ width:20,height:20,borderRadius:4,background:b.w,border:"1px solid #ccc" }} />
            <span style={{ fontSize:9, color:"#555", textAlign:"center", lineHeight:1.2 }}>{b.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── DEMO BANNER ───────────────────────────────────────────────────────────────
function DemoBanner({ onUitloggen, fs }) {
  const [ingeklapt, setIngeklapt] = useState(false);
  if (ingeklapt) return (
    <div style={{ background:"#7f1d1d", color:"#fecaca", padding:"6px 16px",
      display:"flex", alignItems:"center", gap:10, fontSize:fs-2, cursor:"pointer" }}
      onClick={()=>setIngeklapt(false)}>
      <span style={{ fontSize:16 }}>⚠</span>
      <span style={{ fontWeight:500 }}>Demo modus actief</span>
      <span style={{ opacity:0.7 }}>— wijzigingen worden niet opgeslagen</span>
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
          <p style={{ margin:0, fontWeight:700, fontSize:fs+1, letterSpacing:"0.02em" }}>U bevindt zich in de demo modus</p>
          <p style={{ margin:"3px 0 0", fontSize:fs-1, opacity:0.85, lineHeight:1.4 }}>
            Alle wijzigingen die u maakt worden <strong>niet opgeslagen</strong> en gaan verloren zodra u de pagina sluit of uitlogt.
            U werkt met voorbeelddata.
          </p>
        </div>
      </div>
      <div style={{ display:"flex", gap:8, flexShrink:0 }}>
        <button onClick={()=>setIngeklapt(true)} style={{ padding:"7px 14px", borderRadius:8,
          background:"rgba(255,255,255,0.15)", color:"#fff", border:"1px solid rgba(255,255,255,0.3)",
          cursor:"pointer", fontSize:fs-1 }}>▲ Minimaliseren</button>
        <button onClick={onUitloggen} style={{ padding:"7px 14px", borderRadius:8,
          background:"#fff", color:"#991b1b", border:"none",
          cursor:"pointer", fontSize:fs-1, fontWeight:500 }}>← Terug naar inloggen</button>
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
function ProfielPanel({ user, setUsers, onClose, kleur, fs }) {
  const [tab, setTab] = useState("info");
  const [huidigWw, setHuidigWw] = useState("");
  const [nieuwWw, setNieuwWw]   = useState("");
  const [bevestig, setBevestig] = useState("");
  const [toonH, setToonH] = useState(false);
  const [toonN, setToonN] = useState(false);
  const [melding, setMelding] = useState(null); // {type:"ok"|"fout", tekst}

  async function slaWwOp() {
    setMelding(null);
    if (nieuwWw.length < 6) { setMelding({type:"fout", tekst:"Nieuw wachtwoord moet minimaal 6 tekens zijn."}); return; }
    if (nieuwWw !== bevestig) { setMelding({type:"fout", tekst:"Wachtwoorden komen niet overeen."}); return; }
    try {
      await API.wijzigWachtwoord(huidigWw, nieuwWw);
      setHuidigWw(""); setNieuwWw(""); setBevestig("");
      setMelding({type:"ok", tekst:"Wachtwoord succesvol gewijzigd!"});
    } catch(e) {
      setMelding({type:"fout", tekst: e.message || "Wijzigen mislukt."});
    }
  }

  return (
    <div style={{ position:"absolute", bottom:60, left:12, width:260,
      backgroundColor:"#ffffff", color:"#1a1a1a",
      border:"1px solid #d0d0d0", borderRadius:12,
      boxShadow:"0 8px 24px rgba(0,0,0,0.15)", zIndex:500, overflow:"hidden" }}>
      {/* Header */}
      <div style={{ background:kleur.hoofd, padding:"14px 16px", display:"flex", alignItems:"center", gap:10 }}>
        <Avatar naam={user.naam} size={36} kleur={{licht:"rgba(255,255,255,0.25)", donker:"#fff"}} />
        <div style={{ flex:1, minWidth:0 }}>
          <p style={{ margin:0, fontWeight:600, fontSize:fs, color:"#fff", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.naam}</p>
          <p style={{ margin:0, fontSize:fs-3, color:"rgba(255,255,255,0.75)" }}>@{user.username}{user.isAdmin?" · Admin":""}</p>
        </div>
        <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.8)", fontSize:18, lineHeight:1, padding:"2px 4px" }}>×</button>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", borderBottom:"0.5px solid #e8e8e8" }}>
        {[{id:"info",label:"Profiel"},{id:"ww",label:"Wachtwoord"}].map(t=>(
          <button key={t.id} onClick={()=>{setTab(t.id);setMelding(null);}} style={{
            flex:1, padding:"9px", border:"none", background:"none", cursor:"pointer",
            fontSize:fs-1, fontWeight:500,
            color:tab===t.id?kleur.hoofd:"#888",
            borderBottom:tab===t.id?`2px solid ${kleur.hoofd}`:"2px solid transparent"
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding:"1rem" }}>
        {tab==="info" && (
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {[{l:"Naam", v:user.naam},{l:"Gebruikersnaam", v:`@${user.username}`},{l:"Rechten", v:user.isAdmin?"Administrator":"Standaard gebruiker"}].map(r=>(
              <div key={r.l}>
                <p style={{ margin:0, fontSize:fs-3, color:"#888", marginBottom:2 }}>{r.l}</p>
                <p style={{ margin:0, fontSize:fs-1, fontWeight:500, color:"#1a1a1a" }}>{r.v}</p>
              </div>
            ))}
          </div>
        )}

        {tab==="ww" && (
          <div>
            <div style={{ marginBottom:10 }}>
              <label style={{ display:"block", fontSize:fs-2, color:"#555", marginBottom:4 }}>Huidig wachtwoord</label>
              <div style={{ position:"relative" }}>
                <input type={toonH?"text":"password"} value={huidigWw} onChange={e=>setHuidigWw(e.target.value)}
                  style={{ width:"100%", padding:"8px 32px 8px 10px", borderRadius:7, border:"1px solid #ccc", background:"#fafafa", fontSize:fs-1, color:"#1a1a1a", boxSizing:"border-box" }} />
                <button onClick={()=>setToonH(t=>!t)} style={{ position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#aaa",fontSize:13 }}>{toonH?"🙈":"👁"}</button>
              </div>
            </div>
            <div style={{ marginBottom:10 }}>
              <label style={{ display:"block", fontSize:fs-2, color:"#555", marginBottom:4 }}>Nieuw wachtwoord</label>
              <div style={{ position:"relative" }}>
                <input type={toonN?"text":"password"} value={nieuwWw} onChange={e=>setNieuwWw(e.target.value)}
                  style={{ width:"100%", padding:"8px 32px 8px 10px", borderRadius:7, border:"1px solid #ccc", background:"#fafafa", fontSize:fs-1, color:"#1a1a1a", boxSizing:"border-box" }} />
                <button onClick={()=>setToonN(t=>!t)} style={{ position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#aaa",fontSize:13 }}>{toonN?"🙈":"👁"}</button>
              </div>
            </div>
            <div style={{ marginBottom:12 }}>
              <label style={{ display:"block", fontSize:fs-2, color:"#555", marginBottom:4 }}>Bevestig nieuw wachtwoord</label>
              <input type="password" value={bevestig} onChange={e=>setBevestig(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&slaWwOp()}
                style={{ width:"100%", padding:"8px 10px", borderRadius:7, border:"1px solid #ccc", background:"#fafafa", fontSize:fs-1, color:"#1a1a1a", boxSizing:"border-box" }} />
            </div>
            {melding && (
              <p style={{ margin:"0 0 10px", fontSize:fs-2, padding:"7px 10px", borderRadius:6,
                background:melding.type==="ok"?"#eaf3de":"#fcebeb",
                color:melding.type==="ok"?"#27500a":"#a32d2d" }}>{melding.tekst}</p>
            )}
            <button onClick={slaWwOp} style={{ width:"100%", padding:"9px", borderRadius:8,
              background:kleur.hoofd, color:"#fff", border:"none", cursor:"pointer", fontSize:fs-1, fontWeight:500 }}>
              Wachtwoord opslaan
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
  const [isDemoMode, setIsDemoMode]  = useState(false);
  const [laden, setLaden]            = useState(true); // eerste laad-check

  // ── Echte data uit API ─────────────────────────────────────
  const [klanten,   setKlantenState]   = useState([]);
  const [producten, setProductenState] = useState([]);
  const [agenda,    setAgendaState]    = useState([]);

  // ── Demo data (in-memory) ──────────────────────────────────
  const [demoKlanten,   setDemoKlanten]   = useState(DEMO_KLANTEN);
  const [demoProducten, setDemoProducten] = useState(DEMO_PRODUCTEN);
  const [demoAgenda,    setDemoAgenda]    = useState(DEMO_AGENDA);

  // ── UI state ───────────────────────────────────────────────
  const [pagina,      setPagina]      = useState("klanten");
  const [kleurIdx,    setKleurIdx]    = useState(0);
  const [fs,          setFs]          = useState(14);
  const [bgIdx,       setBgIdx]       = useState(0);
  const [instellOpen, setInstellOpen] = useState(false);
  const [profielOpen, setProfielOpen] = useState(false);
  const [apiError,    setApiError]    = useState(null);

  const kleur = KLEUREN[kleurIdx];
  const bg    = BGOVS[bgIdx];
  const isDark = DARK_BGS.includes(bg.w);

  // ── Bij opstarten: kijk of er nog een token is ────────────
  useEffect(() => {
    if (API.heeftTokens()) {
      // Token aanwezig — laad data direct
      laadAlleData().then(() => setLaden(false));
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
      const klantenMetOffertes = k.map(klant => ({
        ...klant,
        offertes: offertes.filter(o => o.klant_id === klant.id),
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
    } catch (e) {
      console.error('Data laden mislukt:', e);
      setApiError(e.message);
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
          <p style={{ fontSize:16, opacity:0.8 }}>DenCRM laden…</p>
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
      />
    );
  }

  const nav = [
    { id:"klanten",    label:"Klanten",    icon:"👥" },
    { id:"producten",  label:"Producten",  icon:"📦" },
    { id:"agenda",     label:"Agenda",     icon:"📅" },
    { id:"offertes",   label:"Offertes",   icon:"📄" },
    { id:"financieel", label:"Financieel", icon:"💶" },
    ...(!isDemoMode && huidigUser?.is_admin ? [{ id:"gebruikers", label:"Gebruikers", icon:"🔐" }] : []),
  ];

  const tekstK      = isDark ? "#e8e8e8" : "#1a1a1a";
  const gebruikersnaam = isDemoMode ? "Demo modus" : huidigUser?.naam;

  return (
    <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh",
      fontFamily:"var(--font-sans)", fontSize:fs, background:bg.w, color:tekstK }}>

      {isDemoMode && <DemoBanner onUitloggen={logout} fs={fs} />}

      {/* API foutmelding banner */}
      {apiError && !isDemoMode && (
        <div style={{ background:"#7f1d1d", color:"#fecaca", padding:"10px 16px",
          display:"flex", alignItems:"center", gap:12, fontSize:fs-1 }}>
          <span>⚠ API-fout: {apiError}</span>
          <button onClick={()=>{ setApiError(null); laadAlleData(); }}
            style={{ marginLeft:"auto", padding:"4px 12px", borderRadius:6,
              background:"rgba(255,255,255,0.2)", color:"#fff", border:"none", cursor:"pointer", fontSize:fs-2 }}>
            Opnieuw proberen
          </button>
        </div>
      )}

      <div style={{ display:"flex", flex:1 }}>
        <aside style={{ width:220, flexShrink:0,
          background:isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",
          borderRight:`0.5px solid ${isDark?"rgba(255,255,255,0.12)":"rgba(0,0,0,0.1)"}`,
          padding:"1.5rem 1rem", display:"flex", flexDirection:"column", position:"relative" }}>
          <div style={{ marginBottom:"2rem" }}>
            <h1 style={{ margin:0, fontSize:fs+4, fontWeight:500, color:kleur.hoofd }}>DenCRM</h1>
            <p style={{ margin:"2px 0 0", fontSize:fs-2, color:isDark?"rgba(255,255,255,0.5)":"#888" }}>
              {actieveKlanten.length} klanten · {actieveProducten.length} producten
            </p>
          </div>
          <nav style={{ flex:1 }}>
            {nav.map(n=>(
              <button key={n.id} onClick={()=>setPagina(n.id)} style={{ display:"flex", alignItems:"center", gap:10, width:"100%",
                padding:"10px 12px", borderRadius:8,
                background:pagina===n.id?kleur.hoofd:"none",
                color:pagina===n.id?"#fff":(isDark?"rgba(255,255,255,0.85)":tekstK),
                border:"none", cursor:"pointer", fontSize:fs, textAlign:"left", marginBottom:4 }}>
                <span>{n.icon}</span> {n.label}
                {n.id==="gebruikers"&&<span style={{ marginLeft:"auto", fontSize:10, background:"rgba(255,255,255,0.25)", borderRadius:99, padding:"1px 6px" }}>Admin</span>}
              </button>
            ))}
          </nav>

          {instellOpen&&(
            <InstellingenPanel kleur={kleur} kleurIdx={kleurIdx} setKleurIdx={setKleurIdx}
              fs={fs} setFs={setFs} bgIdx={bgIdx} setBgIdx={setBgIdx} onClose={()=>setInstellOpen(false)} />
          )}

          {profielOpen && !isDemoMode && huidigUser && (
            <ProfielPanel
              user={huidigUser}
              setUsers={() => {}} // wordt afgehandeld via API
              onWachtwoordWijzigen={async (huidig, nieuw) => {
                await API.wijzigWachtwoord(huidig, nieuw);
              }}
              onClose={()=>setProfielOpen(false)}
              kleur={kleur} fs={fs}
            />
          )}

          <div style={{ borderTop:`0.5px solid ${isDark?"rgba(255,255,255,0.12)":"rgba(0,0,0,0.1)"}`, paddingTop:8, marginTop:8 }}>
            <button onClick={()=>setInstellOpen(o=>!o)} style={{ display:"flex", alignItems:"center", gap:8, width:"100%",
              padding:"9px 12px", borderRadius:8,
              background:instellOpen?kleur.licht:"none",
              color:instellOpen?kleur.donker:(isDark?"rgba(255,255,255,0.7)":"#666"),
              border:"none", cursor:"pointer", fontSize:fs, textAlign:"left" }}>
              ⚙ Instellingen
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

        <main style={{ flex:1, padding:"1.5rem 2rem", overflowY:"auto" }}>
          <h2 style={{ margin:"0 0 1.25rem", fontSize:fs+6, fontWeight:500, color:tekstK }}>
            {nav.find(n=>n.id===pagina)?.icon} {nav.find(n=>n.id===pagina)?.label}
          </h2>
          {pagina==="klanten"    && <KlantenPage   klanten={actieveKlanten} setKlanten={setKlanten} producten={actieveProducten} agenda={actieveAgenda} kleur={kleur} fs={fs} isDemoMode={isDemoMode} herlaad={laadAlleData} />}
          {pagina==="producten"  && <ProductenPage producten={actieveProducten} setProducten={setProducten} kleur={kleur} fs={fs} isDemoMode={isDemoMode} herlaad={laadAlleData} />}
          {pagina==="agenda"     && <AgendaPage    klanten={actieveKlanten} agenda={actieveAgenda} setAgenda={setAgenda} kleur={kleur} fs={fs} isDemoMode={isDemoMode} herlaad={laadAlleData} />}
          {pagina==="offertes"   && <OffertesPage  klanten={actieveKlanten} setKlanten={setKlanten} producten={actieveProducten} kleur={kleur} fs={fs} isDemoMode={isDemoMode} herlaad={laadAlleData} />}
          {pagina==="financieel" && <FinancieelPage klanten={actieveKlanten} setKlanten={setKlanten} kleur={kleur} fs={fs} isDemoMode={isDemoMode} herlaad={laadAlleData} />}
          {pagina==="gebruikers" && !isDemoMode && huidigUser?.is_admin && <GebruikersBeheer kleur={kleur} fs={fs} />}
        </main>
      </div>
    </div>
  );
}
