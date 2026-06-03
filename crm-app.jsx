import { useState, useRef, useEffect } from "react";

function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return h.toString(16);
}

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
      alignItems:"center", justifyContent:"center", zIndex:1000, padding:"1rem" }}
      onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{ backgroundColor:"#ffffff", color:"#1a1a1a", borderRadius:12,
        border:"1px solid #d0d0d0", padding:"1.5rem", width:"100%", maxWidth:560,
        maxHeight:"90vh", overflowY:"auto", boxShadow:"0 8px 32px rgba(0,0,0,0.18)", fontSize:fs }}>
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
function LoginPage({ users, onLogin, onDemo, kleur }) {
  const [un, setUn] = useState(""); const [pw, setPw] = useState("");
  const [err, setErr] = useState(""); const [toon, setToon] = useState(false);
  function doLogin() {
    const u = users.find(x=>x.username===un && x.passHash===simpleHash(pw));
    if (u) { setErr(""); onLogin(u); } else setErr("Gebruikersnaam of wachtwoord onjuist.");
  }
  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:"linear-gradient(135deg,#e8f0fb 0%,#f5f5f5 100%)" }}>
      <div style={{ background:"#fff", borderRadius:16, border:"1px solid #e0e0e0",
        padding:"2.5rem 2rem", width:360, boxShadow:"0 8px 40px rgba(0,0,0,0.10)" }}>
        <div style={{ textAlign:"center", marginBottom:"2rem" }}>
          <div style={{ width:52, height:52, borderRadius:"50%", background:kleur.licht,
            display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1rem", fontSize:24 }}>🏢</div>
          <h1 style={{ margin:0, fontSize:22, fontWeight:600, color:"#1a1a1a" }}>DenCRM</h1>
          <p style={{ margin:"4px 0 0", fontSize:13, color:"#888" }}>Log in om verder te gaan</p>
        </div>
        <div style={{ marginBottom:"1rem" }}>
          <label style={{ display:"block", fontSize:13, color:"#555", marginBottom:4 }}>Gebruikersnaam</label>
          <input value={un} onChange={e=>setUn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()}
            style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:"1px solid #ccc",
              background:"#fafafa", fontSize:14, color:"#1a1a1a", boxSizing:"border-box" }} />
        </div>
        <div style={{ marginBottom:"1.5rem" }}>
          <label style={{ display:"block", fontSize:13, color:"#555", marginBottom:4 }}>Wachtwoord</label>
          <div style={{ position:"relative" }}>
            <input type={toon?"text":"password"} value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()}
              style={{ width:"100%", padding:"10px 40px 10px 12px", borderRadius:8, border:"1px solid #ccc",
                background:"#fafafa", fontSize:14, color:"#1a1a1a", boxSizing:"border-box" }} />
            <button onClick={()=>setToon(t=>!t)} style={{ position:"absolute", right:10, top:"50%",
              transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#888", fontSize:16 }}>
              {toon?"🙈":"👁"}
            </button>
          </div>
        </div>
        {err && <p style={{ color:"#A32D2D", fontSize:13, marginBottom:"1rem", background:"#FCEBEB", padding:"8px 12px", borderRadius:6 }}>{err}</p>}
        <button onClick={doLogin} style={{ width:"100%", padding:"11px", borderRadius:8,
          background:kleur.hoofd, color:"#fff", border:"none", cursor:"pointer", fontSize:15, fontWeight:500 }}>
          Inloggen
        </button>

        <div style={{ marginTop:"1.5rem" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"1rem" }}>
            <div style={{ flex:1, height:"0.5px", background:"#e0e0e0" }} />
            <span style={{ fontSize:12, color:"#bbb" }}>of</span>
            <div style={{ flex:1, height:"0.5px", background:"#e0e0e0" }} />
          </div>
          <button onClick={onDemo} style={{ width:"100%", padding:"11px 16px", borderRadius:8,
            background:"#fffbf0", color:"#7a5800", border:"1.5px dashed #e8c44a",
            cursor:"pointer", fontSize:14, fontWeight:400,
            display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            <span style={{ fontSize:18 }}>🧪</span>
            <div style={{ textAlign:"left" }}>
              <div style={{ fontWeight:500 }}>Probeer de applicatie</div>
              <div style={{ fontSize:11, color:"#a07820", marginTop:1 }}>Demo modus — wijzigingen worden niet opgeslagen</div>
            </div>
          </button>
        </div>
      </div>
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

  const filtered = klanten.filter(k=>
    k.naam.toLowerCase().includes(zoek.toLowerCase()) ||
    k.email.toLowerCase().includes(zoek.toLowerCase())
  );

  function openNieuw() { setForm({ naam:"", email:"", telefoon:"", adres:"", producten:[], offertes:[] }); setModal("nieuw"); }
  function openBewerk(k) { setForm({...k}); setModal("bewerk"); }
  function save() {
    if (!form.naam) return;
    if (modal==="nieuw") setKlanten(p=>[...p,{...form,id:"k"+uid()}]);
    else { setKlanten(p=>p.map(k=>k.id===form.id?form:k)); if(sel?.id===form.id) setSel(form); }
    setModal(null);
  }
  function del(id) { if(confirm("Klant verwijderen?")){ setKlanten(p=>p.filter(k=>k.id!==id)); if(sel?.id===id) setSel(null); } }
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
            <div key={k.id} onClick={()=>selectKlant(k)} style={{ background:"var(--color-background-primary)",
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
    </div>
  );
}

// ── PRODUCTEN ────────────────────────────────────────────────────────────────
function ProductenPage({ producten, setProducten, kleur, fs }) {
  const [modal, setModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ naam:"", prijs:"", beschrijving:"", categorie:"" });
  const [activeCat, setActiveCat] = useState("Alle");
  const [zoek, setZoek] = useState("");

  const cats = [...new Set(producten.map(p=>p.categorie).filter(Boolean))].sort();
  const alleCats = ["Alle", ...cats];

  const gefilterd = producten.filter(p => {
    const catOk = activeCat === "Alle" || p.categorie === activeCat;
    const zoekOk = !zoek || p.naam.toLowerCase().includes(zoek.toLowerCase()) || (p.beschrijving||"").toLowerCase().includes(zoek.toLowerCase());
    return catOk && zoekOk;
  });

  function openNieuw() { setForm({ naam:"", prijs:"", beschrijving:"", categorie: activeCat !== "Alle" ? activeCat : "" }); setEditProduct(null); setModal(true); }
  function openEdit(p) { setForm({ naam:p.naam, prijs:String(p.prijs), beschrijving:p.beschrijving||"", categorie:p.categorie||"" }); setEditProduct(p); setModal(true); }

  function save() {
    if(!form.naam||!form.prijs) return;
    if (editProduct) {
      setProducten(prev => prev.map(p => p.id === editProduct.id ? {...p, ...form, prijs:parseFloat(form.prijs)} : p));
    } else {
      setProducten(p=>[...p,{...form,id:"p"+uid(),prijs:parseFloat(form.prijs)}]);
    }
    setModal(false);
  }

  function del(id) { if(confirm("Product verwijderen?")) setProducten(p=>p.filter(x=>x.id!==id)); }

  return (
    <div>
      {/* Categorieën tabs */}
      <div style={{ display:"flex", gap:6, marginBottom:"1rem", flexWrap:"wrap", alignItems:"center" }}>
        <div style={{ display:"flex", gap:4, flex:1, flexWrap:"wrap" }}>
          {alleCats.map(cat=>(
            <button key={cat} onClick={()=>setActiveCat(cat)} style={{
              padding:"6px 14px", borderRadius:99, border:"none", cursor:"pointer",
              fontSize:fs-1, fontWeight:500, transition:"all 0.15s",
              background: activeCat===cat ? kleur.hoofd : "var(--color-background-secondary)",
              color: activeCat===cat ? "#fff" : "var(--color-text-secondary)",
            }}>
              {cat}
              <span style={{ marginLeft:6, fontSize:fs-3, opacity:0.75 }}>
                {cat==="Alle" ? producten.length : producten.filter(p=>p.categorie===cat).length}
              </span>
            </button>
          ))}
        </div>
        <input value={zoek} onChange={e=>setZoek(e.target.value)} placeholder="Zoeken…"
          style={{ padding:"6px 12px", borderRadius:8, border:"0.5px solid var(--color-border-secondary)",
            background:"var(--color-background-primary)", color:"var(--color-text-primary)", fontSize:fs-1, width:160 }} />
        <Btn variant="primary" onClick={openNieuw} kleur={kleur} fs={fs}>+ Nieuw product</Btn>
      </div>

      {/* Productenlijst — verticaal zoals klanten */}
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
            {/* Kleur-indicator op basis van categorie */}
            <div style={{ width:4, alignSelf:"stretch", borderRadius:4, flexShrink:0,
              background: cats.length ? kleur.hoofd : "#ccc", opacity: p.categorie ? 1 : 0.3 }} />
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:2 }}>
                <p style={{ margin:0, fontWeight:500, fontSize:fs, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.naam}</p>
                {p.categorie&&<Badge kleur={kleur}>{p.categorie}</Badge>}
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

      {modal&&(
        <Modal title={editProduct?"Product bewerken":"Nieuw product"} onClose={()=>setModal(false)} fs={fs}>
          <FF label="Productnaam" fs={fs}><input value={form.naam} onChange={e=>setForm(f=>({...f,naam:e.target.value}))} style={iSt(fs)} /></FF>
          <FF label="Prijs (€)" fs={fs}><input type="number" value={form.prijs} onChange={e=>setForm(f=>({...f,prijs:e.target.value}))} style={iSt(fs)} /></FF>
          <FF label="Beschrijving" fs={fs}><textarea value={form.beschrijving} onChange={e=>setForm(f=>({...f,beschrijving:e.target.value}))} rows={3} style={{...iSt(fs),resize:"vertical"}} /></FF>
          <FF label="Categorie" fs={fs}>
            <input value={form.categorie} onChange={e=>setForm(f=>({...f,categorie:e.target.value}))} list="prod-cats" style={iSt(fs)} placeholder="Bijv. Web, Marketing, Design…" />
            <datalist id="prod-cats">{cats.map(c=><option key={c} value={c}/>)}</datalist>
          </FF>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:"1rem" }}>
            <Btn onClick={()=>setModal(false)} fs={fs}>Annuleren</Btn>
            <Btn variant="primary" onClick={save} kleur={kleur} fs={fs}>Opslaan</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── AGENDA ───────────────────────────────────────────────────────────────────
function AgendaPage({ klanten, agenda, setAgenda, kleur, fs }) {
  const [view, setView] = useState("lijst");
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ klantId:"", datum:"", tijd:"", notitie:"" });
  const [filterDatum, setFilterDatum] = useState(new Date().toISOString().slice(0,10));
  const [hover, setHover] = useState(null);

  const sorted = [...agenda]
    .filter(a=>!filterDatum||a.datum===filterDatum)
    .sort((a,b)=>(a.datum+a.tijd).localeCompare(b.datum+b.tijd));

  function openNieuw(tijd="09:00") {
    setForm({ klantId:"", datum:filterDatum||new Date().toISOString().slice(0,10), tijd, notitie:"" });
    setModal(true);
  }
  function save() {
    if(!form.klantId||!form.datum||!form.tijd) return;
    setAgenda(p=>[...p,{...form,id:"a"+uid()}]);
    setModal(false);
  }
  function del(id) { if(confirm("Afspraak verwijderen?")) setAgenda(p=>p.filter(a=>a.id!==id)); }

  const groups = {};
  sorted.forEach(a=>{ if(!groups[a.datum]) groups[a.datum]=[]; groups[a.datum].push(a); });

  const dagAfsp = agenda.filter(a=>a.datum===filterDatum);
  function afspVoorUur(uur) { return dagAfsp.filter(a=>a.tijd.startsWith(uur.slice(0,2))); }

  return (
    <div>
      <div style={{ display:"flex", gap:8, marginBottom:"1rem", alignItems:"center", flexWrap:"wrap" }}>
        <input type="date" value={filterDatum} onChange={e=>setFilterDatum(e.target.value)}
          style={{ padding:"8px 12px", borderRadius:8, border:"0.5px solid var(--color-border-secondary)",
            background:"var(--color-background-primary)", color:"var(--color-text-primary)", fontSize:fs }} />
        <div style={{ display:"flex", borderRadius:8, overflow:"hidden", border:`1px solid ${kleur.hoofd}` }}>
          {[{id:"lijst",label:"☰ Lijst"},{id:"blok",label:"⊞ Uurblokken"}].map(v=>(
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
                  <div style={{ background:kleur.licht, color:kleur.donker, borderRadius:8, padding:"8px 12px", textAlign:"center", minWidth:60 }}>
                    <p style={{ margin:0, fontSize:fs+1, fontWeight:500 }}>{a.tijd}</p>
                  </div>
                  {k&&<Avatar naam={k.naam} size={36} kleur={kleur}/>}
                  <div style={{ flex:1 }}>
                    <p style={{ margin:0, fontSize:fs, fontWeight:500 }}>{k?.naam||"Onbekende klant"}</p>
                    <p style={{ margin:0, fontSize:fs-1, color:"var(--color-text-secondary)" }}>{a.notitie}</p>
                  </div>
                  <button onClick={()=>del(a.id)} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--color-text-secondary)",padding:4,fontSize:fs+2 }}>✕</button>
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
                  <div style={{ width:64, flexShrink:0, padding:"10px 12px 6px", fontSize:fs-2,
                    color:"var(--color-text-secondary)", borderRight:"0.5px solid var(--color-border-tertiary)" }}>{uur}</div>
                  <div style={{ flex:1, padding:"4px 8px", display:"flex", flexDirection:"column", gap:4 }}>
                    {afspraken.length===0&&isH&&<span style={{ fontSize:fs-2, color:kleur.donker, padding:"4px 0" }}>+ Klik om afspraak toe te voegen</span>}
                    {afspraken.map(a=>{const k=klanten.find(x=>x.id===a.klantId);return(
                      <div key={a.id} style={{ background:kleur.hoofd, color:"#fff", borderRadius:6,
                        padding:"5px 10px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <div>
                          <span style={{ fontSize:fs-1, fontWeight:500 }}>{a.tijd} — {k?.naam||"?"}</span>
                          {a.notitie&&<p style={{ margin:"1px 0 0", fontSize:fs-3, opacity:0.85 }}>{a.notitie}</p>}
                        </div>
                        <button onClick={e=>{e.stopPropagation();del(a.id);}} style={{ background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.8)",fontSize:14,padding:"0 4px" }}>✕</button>
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
        <Modal title="Nieuwe afspraak" onClose={()=>setModal(false)} fs={fs}>
          <FF label="Klant zoeken" fs={fs}>
            <KlantZoekBox klanten={klanten} value={form.klantId} onChange={id=>setForm(f=>({...f,klantId:id}))} fs={fs} />
          </FF>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            <FF label="Datum" fs={fs}><input type="date" value={form.datum} onChange={e=>setForm(f=>({...f,datum:e.target.value}))} style={iSt(fs)} /></FF>
            <FF label="Tijd" fs={fs}><input type="time" value={form.tijd} onChange={e=>setForm(f=>({...f,tijd:e.target.value}))} style={iSt(fs)} /></FF>
          </div>
          <FF label="Notitie" fs={fs}><textarea value={form.notitie} onChange={e=>setForm(f=>({...f,notitie:e.target.value}))} rows={3} style={{...iSt(fs),resize:"vertical"}} /></FF>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:"1rem" }}>
            <Btn onClick={()=>setModal(false)} fs={fs}>Annuleren</Btn>
            <Btn variant="primary" onClick={save} kleur={kleur} fs={fs} disabled={!form.klantId}>Opslaan</Btn>
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

  function slaOp() {
    if (!klantId||regels.length===0) return;
    const offerte = { id:"o"+uid(), referentie:ref, datum:vandaagISO, regels, totaalInclBtw, inclBtw,
      bedrijfsnaam, bedrijfAdres, iban, btwNr, template };
    setKlanten(p=>p.map(k=>k.id===klantId?{...k,offertes:[...(k.offertes||[]),offerte]}:k));
    setOpgeslagen(true);
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

          <button onClick={()=>setNieuweKlantModal(true)} style={{ width:"100%", padding:"10px", borderRadius:8,
            background:"var(--color-background-primary)", color:"var(--color-text-primary)",
            border:"0.5px solid var(--color-border-secondary)", cursor:"pointer", fontSize:fs,
            display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            + Voeg nieuwe klant toe
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
          <div style={{ display:"flex", gap:8, justifyContent:"space-between", marginBottom:"1.5rem" }}>
            <Btn onClick={()=>setStap(2)} fs={fs}>← Terug</Btn>
            <div style={{ display:"flex", gap:8 }}>
              {!opgeslagen?(
                <Btn onClick={slaOp} kleur={kleur} fs={fs} variant="primary">💾 Opslaan onder klant</Btn>
              ):(
                <span style={{ fontSize:fs-1, color:"green", padding:"8px 12px" }}>✓ Opgeslagen</span>
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
  const [filterBetaald, setFilterBetaald] = useState("alle"); // "alle" | "betaald" | "open"
  const [openOfferte, setOpenOfferte] = useState(null);
  const [openKlant,   setOpenKlant]   = useState(null);

  // Verzamel alle offertes uit alle klanten, plat
  const alleOffertes = klanten.flatMap(k =>
    (k.offertes || []).map(o => ({ ...o, klant: k }))
  );

  // Sorteren op datum (nieuwste eerst)
  const gesorteerd = [...alleOffertes].sort((a, b) => b.datum.localeCompare(a.datum));

  // Filteren
  const gefilterd = gesorteerd.filter(o => {
    if (filterKlant && o.klant.id !== filterKlant) return false;
    if (filterVan   && o.datum < filterVan)         return false;
    if (filterTot   && o.datum > filterTot)         return false;
    if (filterBetaald === "betaald" && !o.betaald)  return false;
    if (filterBetaald === "open"    &&  o.betaald)  return false;
    return true;
  });

  // Totalen
  const totaalAlle    = gefilterd.reduce((s, o) => s + (o.totaalInclBtw || 0), 0);
  const totaalBetaald = gefilterd.filter(o => o.betaald).reduce((s, o) => s + (o.totaalInclBtw || 0), 0);
  const totaalOpen    = totaalAlle - totaalBetaald;

  function toggleBetaald(klantId, offerteId) {
    setKlanten(prev => prev.map(k => {
      if (k.id !== klantId) return k;
      return {
        ...k,
        offertes: (k.offertes || []).map(o =>
          o.id === offerteId ? { ...o, betaald: !o.betaald } : o
        )
      };
    }));
    // Ook openOfferte bijwerken als die open is
    if (openOfferte?.id === offerteId) {
      setOpenOfferte(prev => ({ ...prev, betaald: !prev.betaald }));
    }
  }

  function fmt(bedrag) {
    return "€" + bedrag.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function fmtDatum(iso) {
    if (!iso) return "—";
    return new Date(iso + "T12:00:00").toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" });
  }

  return (
    <div>
      {/* ── Samenvattingkaarten ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: "1.5rem" }}>
        {[
          { label: "Totaal gefactureerd", bedrag: totaalAlle,    kleurBg: "var(--color-background-secondary)", kleurTekst: "var(--color-text-primary)" },
          { label: "Betaald",             bedrag: totaalBetaald, kleurBg: "#eaf3de",                           kleurTekst: "#27500a" },
          { label: "Openstaand",          bedrag: totaalOpen,    kleurBg: "#fcebeb",                           kleurTekst: "#a32d2d" },
        ].map(k => (
          <div key={k.label} style={{ background: k.kleurBg, borderRadius: 10, padding: "14px 16px" }}>
            <p style={{ margin: 0, fontSize: fs - 2, color: k.kleurTekst, opacity: 0.75, marginBottom: 4 }}>{k.label}</p>
            <p style={{ margin: 0, fontSize: fs + 6, fontWeight: 600, color: k.kleurTekst }}>{fmt(k.bedrag)}</p>
            <p style={{ margin: "4px 0 0", fontSize: fs - 2, color: k.kleurTekst, opacity: 0.6 }}>
              {gefilterd.filter(o => k.label === "Betaald" ? o.betaald : k.label === "Openstaand" ? !o.betaald : true).length} offerte{gefilterd.length !== 1 ? "s" : ""}
            </p>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div style={{ display: "flex", gap: 8, marginBottom: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        {/* Klant filter */}
        <select value={filterKlant} onChange={e => setFilterKlant(e.target.value)}
          style={{ padding: "7px 10px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)",
            background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontSize: fs - 1 }}>
          <option value="">Alle klanten</option>
          {klanten.filter(k => (k.offertes || []).length > 0).map(k => (
            <option key={k.id} value={k.id}>{k.naam}</option>
          ))}
        </select>

        {/* Datum van */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: fs - 2, color: "var(--color-text-secondary)" }}>Van</span>
          <input type="date" value={filterVan} onChange={e => setFilterVan(e.target.value)}
            style={{ padding: "7px 10px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)",
              background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontSize: fs - 1 }} />
        </div>

        {/* Datum tot */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: fs - 2, color: "var(--color-text-secondary)" }}>Tot</span>
          <input type="date" value={filterTot} onChange={e => setFilterTot(e.target.value)}
            style={{ padding: "7px 10px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)",
              background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontSize: fs - 1 }} />
        </div>

        {/* Status filter */}
        <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: `1px solid ${kleur.hoofd}` }}>
          {[{ id: "alle", label: "Alle" }, { id: "open", label: "Openstaand" }, { id: "betaald", label: "Betaald" }].map(v => (
            <button key={v.id} onClick={() => setFilterBetaald(v.id)} style={{
              padding: "7px 12px", border: "none", cursor: "pointer", fontSize: fs - 2,
              background: filterBetaald === v.id ? kleur.hoofd : "var(--color-background-primary)",
              color: filterBetaald === v.id ? "#fff" : "var(--color-text-primary)"
            }}>{v.label}</button>
          ))}
        </div>

        {/* Filters wissen */}
        {(filterKlant || filterVan || filterTot || filterBetaald !== "alle") && (
          <button onClick={() => { setFilterKlant(""); setFilterVan(""); setFilterTot(""); setFilterBetaald("alle"); }}
            style={{ padding: "7px 12px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)",
              background: "none", color: "var(--color-text-secondary)", cursor: "pointer", fontSize: fs - 2 }}>
            ✕ Wis filters
          </button>
        )}

        <span style={{ marginLeft: "auto", fontSize: fs - 2, color: "var(--color-text-secondary)" }}>
          {gefilterd.length} {gefilterd.length === 1 ? "offerte" : "offertes"}
        </span>
      </div>

      {/* ── Lijst ── */}
      {gefilterd.length === 0 ? (
        <div style={{ padding: "2rem", textAlign: "center", color: "var(--color-text-secondary)", fontSize: fs - 1,
          border: "0.5px dashed var(--color-border-tertiary)", borderRadius: 12 }}>
          Geen offertes gevonden met de huidige filters.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {gefilterd.map(o => (
            <div key={o.id} style={{
              background: "var(--color-background-primary)",
              border: `0.5px solid ${o.betaald ? "#c0ddb0" : "var(--color-border-tertiary)"}`,
              borderRadius: 12, padding: "12px 16px",
              display: "flex", alignItems: "center", gap: 14,
              opacity: o.betaald ? 0.75 : 1,
              transition: "opacity 0.15s"
            }}>
              {/* Betaald-vinkje */}
              <button
                onClick={() => toggleBetaald(o.klant.id, o.id)}
                title={o.betaald ? "Markeer als onbetaald" : "Markeer als betaald"}
                style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  border: `2px solid ${o.betaald ? "#3b6d11" : "var(--color-border-secondary)"}`,
                  background: o.betaald ? "#3b6d11" : "transparent",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 14, transition: "all 0.15s"
                }}>
                {o.betaald ? "✓" : ""}
              </button>

              {/* Klant avatar */}
              <Avatar naam={o.klant.naam} size={36} kleur={kleur} />

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <p style={{ margin: 0, fontWeight: 500, fontSize: fs, color: "var(--color-text-primary)" }}>
                    {o.klant.naam}
                  </p>
                  <span style={{ fontSize: fs - 2, color: "var(--color-text-secondary)" }}>—</span>
                  <p style={{ margin: 0, fontSize: fs - 1, color: "var(--color-text-secondary)" }}>{o.referentie}</p>
                  {o.betaald && (
                    <span style={{ background: "#eaf3de", color: "#27500a", fontSize: fs - 3,
                      fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}>BETAALD</span>
                  )}
                </div>
                <p style={{ margin: "2px 0 0", fontSize: fs - 2, color: "var(--color-text-secondary)" }}>
                  {fmtDatum(o.datum)} · {o.regels?.length || 0} regel{(o.regels?.length || 0) !== 1 ? "s" : ""}
                  {o.regels?.length > 0 && (
                    <span> · {o.regels.map(r => r.naam).filter(Boolean).slice(0, 2).join(", ")}
                    {o.regels.length > 2 ? ` +${o.regels.length - 2} meer` : ""}</span>
                  )}
                </p>
              </div>

              {/* Bedrag */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ margin: 0, fontSize: fs + 1, fontWeight: 600,
                  color: o.betaald ? "#3b6d11" : kleur.hoofd }}>
                  {fmt(o.totaalInclBtw || 0)}
                </p>
                <p style={{ margin: 0, fontSize: fs - 2, color: "var(--color-text-secondary)" }}>
                  {o.inclBtw ? "incl. BTW" : "excl. BTW"}
                </p>
              </div>

              {/* Open-knop */}
              <button onClick={() => { setOpenOfferte(o); setOpenKlant(o.klant); }}
                style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${kleur.hoofd}`,
                  background: kleur.licht, color: kleur.donker, cursor: "pointer",
                  fontSize: fs - 2, fontWeight: 500, flexShrink: 0 }}>
                📄 Openen
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── Offerte-viewer overlay ── */}
      {openOfferte && openKlant && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
          display: "flex", alignItems: "flex-start", justifyContent: "center",
          zIndex: 1000, padding: "1rem", overflowY: "auto" }}
          onClick={e => e.target === e.currentTarget && setOpenOfferte(null)}>
          <div style={{ background: "#f5f5f5", borderRadius: 12, padding: "1rem",
            width: "100%", maxWidth: 700, marginTop: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: 8 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: fs + 2, fontWeight: 500, color: "#1a1a1a" }}>{openOfferte.referentie}</h2>
                <p style={{ margin: 0, fontSize: fs - 2, color: "#888" }}>{openKlant.naam} · {fmtDatum(openOfferte.datum)}</p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button
                  onClick={() => {
                    toggleBetaald(openKlant.id, openOfferte.id);
                  }}
                  style={{ padding: "7px 14px", borderRadius: 8, cursor: "pointer", fontSize: fs - 1,
                    background: openOfferte.betaald ? "#eaf3de" : kleur.licht,
                    color: openOfferte.betaald ? "#27500a" : kleur.donker,
                    border: `1px solid ${openOfferte.betaald ? "#3b6d11" : kleur.hoofd}`,
                    fontWeight: 500
                  }}>
                  {openOfferte.betaald ? "✓ Betaald" : "○ Markeer als betaald"}
                </button>
                <button onClick={() => window.print()}
                  style={{ padding: "7px 14px", borderRadius: 8, background: kleur.hoofd,
                    color: "#fff", border: "none", cursor: "pointer", fontSize: fs - 1 }}>
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
const DEMO_KLANTEN = [
  { id:"dk1", naam:"Bakkerij de Gouden Korst", email:"info@goudenkors.nl", telefoon:"06-12345678", adres:"Hoofdstraat 14, 1234 AB Amsterdam", producten:["dp1","dp3"], offertes:[] },
  { id:"dk2", naam:"Autogarage Versteeg",      email:"versteeg@garage.nl", telefoon:"06-87654321", adres:"Industrieweg 7, 5678 CD Utrecht",   producten:["dp2","dp4"], offertes:[] },
  { id:"dk3", naam:"Kapsalon Mooiste Knip",   email:"knip@kapsalon.nl",   telefoon:"06-11223344", adres:"Dorpsstraat 3, 9012 EF Groningen",  producten:["dp1"],        offertes:[] },
];
const DEMO_PRODUCTEN = [
  { id:"dp1", naam:"Website Pakket Basic", prijs:1200, beschrijving:"5-pagina website met CMS",        categorie:"Web"       },
  { id:"dp2", naam:"Website Pakket Pro",   prijs:2800, beschrijving:"Maatwerk website met webshop",    categorie:"Web"       },
  { id:"dp3", naam:"SEO Optimalisatie",    prijs:650,  beschrijving:"Maandelijkse SEO-begeleiding",    categorie:"Marketing" },
  { id:"dp4", naam:"Logo & Huisstijl",     prijs:950,  beschrijving:"Complete huisstijl ontwikkeling", categorie:"Design"    },
];
const DEMO_AGENDA = [
  { id:"da1", klantId:"dk1", datum:"2026-06-10", tijd:"10:00", notitie:"Bespreking nieuwe website" },
  { id:"da2", klantId:"dk2", datum:"2026-06-15", tijd:"14:30", notitie:"Offerte presentatie"       },
];

// ── APP SHELL ─────────────────────────────────────────────────────────────────
export default function App() {
  const [users, setUsers] = useState(INIT_USERS);
  const [huidigUser, setHuidigUser] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Echte gebruikersdata
  const [alleKlanten,  setAlleKlanten]  = useState(INIT_KLANTEN);
  const [alleProducten,setAlleProducten]= useState(INIT_PRODUCTEN);
  const [alleAgenda,   setAlleAgenda]   = useState(INIT_AGENDA);

  // Demo data — lokale state die na uitloggen wordt gereset
  const [demoKlanten,  setDemoKlanten]  = useState(DEMO_KLANTEN);
  const [demoProducten,setDemoProducten]= useState(DEMO_PRODUCTEN);
  const [demoAgenda,   setDemoAgenda]   = useState(DEMO_AGENDA);

  const [pagina, setPagina] = useState("klanten");
  const [kleurIdx, setKleurIdx] = useState(0);
  const [fs, setFs] = useState(14);
  const [bgIdx, setBgIdx] = useState(0);
  const [instellOpen, setInstellOpen] = useState(false);

  const kleur = KLEUREN[kleurIdx];
  const bg = BGOVS[bgIdx];
  const isDark = DARK_BGS.includes(bg.w);
  const uid_ = huidigUser?.id;

  // Selecteer de juiste data op basis van modus
  const klanten   = isDemoMode ? demoKlanten  : (uid_ ? (alleKlanten[uid_]   || []) : []);
  const producten = isDemoMode ? demoProducten : (uid_ ? (alleProducten[uid_] || []) : []);
  const agenda    = isDemoMode ? demoAgenda    : (uid_ ? (alleAgenda[uid_]    || []) : []);

  // Setters: in demo modus schrijven naar demo state, anders naar echte state
  function setKlanten(fn)   {
    if (isDemoMode) setDemoKlanten(fn);
    else setAlleKlanten(a=>({...a,[uid_]:typeof fn==="function"?fn(a[uid_]||[]):fn}));
  }
  function setProducten(fn) {
    if (isDemoMode) setDemoProducten(fn);
    else setAlleProducten(a=>({...a,[uid_]:typeof fn==="function"?fn(a[uid_]||[]):fn}));
  }
  function setAgenda(fn) {
    if (isDemoMode) setDemoAgenda(fn);
    else setAlleAgenda(a=>({...a,[uid_]:typeof fn==="function"?fn(a[uid_]||[]):fn}));
  }

  function logout() {
    setHuidigUser(null); setIsDemoMode(false); setPagina("klanten"); setInstellOpen(false);
    // Reset demo data naar origineel zodat volgende demo-sessie schoon begint
    setDemoKlanten(DEMO_KLANTEN); setDemoProducten(DEMO_PRODUCTEN); setDemoAgenda(DEMO_AGENDA);
  }

  function startDemo() {
    setIsDemoMode(true);
    setDemoKlanten(DEMO_KLANTEN); setDemoProducten(DEMO_PRODUCTEN); setDemoAgenda(DEMO_AGENDA);
    setPagina("klanten");
  }

  if (!huidigUser && !isDemoMode) return <LoginPage users={users} onLogin={setHuidigUser} onDemo={startDemo} kleur={kleur} />;

  const nav = [
    { id:"klanten",    label:"Klanten",    icon:"👥" },
    { id:"producten",  label:"Producten",  icon:"📦" },
    { id:"agenda",     label:"Agenda",     icon:"📅" },
    { id:"offertes",   label:"Offertes",   icon:"📄" },
    { id:"financieel", label:"Financieel", icon:"💶" },
    ...(!isDemoMode && huidigUser?.isAdmin ? [{ id:"gebruikers", label:"Gebruikers", icon:"🔐" }] : []),
  ];

  const tekstK = isDark?"#e8e8e8":"#1a1a1a";
  const gebruikersnaam = isDemoMode ? "Demo modus" : huidigUser?.naam;

  return (
    <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh", fontFamily:"var(--font-sans)", fontSize:fs, background:bg.w, color:tekstK }}>
      {/* Demo banner bovenaan de hele pagina */}
      {isDemoMode && <DemoBanner onUitloggen={logout} fs={fs} />}

      <div style={{ display:"flex", flex:1 }}>
      <aside style={{ width:220, flexShrink:0,
        background:isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",
        borderRight:`0.5px solid ${isDark?"rgba(255,255,255,0.12)":"rgba(0,0,0,0.1)"}`,
        padding:"1.5rem 1rem", display:"flex", flexDirection:"column", position:"relative" }}>
        <div style={{ marginBottom:"2rem" }}>
          <h1 style={{ margin:0, fontSize:fs+4, fontWeight:500, color:kleur.hoofd }}>DenCRM</h1>
          <p style={{ margin:"2px 0 0", fontSize:fs-2, color:isDark?"rgba(255,255,255,0.5)":"#888" }}>
            {klanten.length} klanten · {producten.length} producten
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

        <div style={{ borderTop:`0.5px solid ${isDark?"rgba(255,255,255,0.12)":"rgba(0,0,0,0.1)"}`, paddingTop:8, marginTop:8 }}>
          <button onClick={()=>setInstellOpen(o=>!o)} style={{ display:"flex", alignItems:"center", gap:8, width:"100%",
            padding:"9px 12px", borderRadius:8,
            background:instellOpen?kleur.licht:"none",
            color:instellOpen?kleur.donker:(isDark?"rgba(255,255,255,0.7)":"#666"),
            border:"none", cursor:"pointer", fontSize:fs, textAlign:"left" }}>
            ⚙ Instellingen
          </button>
          <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 12px" }}>
            {isDemoMode
              ? <span style={{ fontSize:18 }}>🧪</span>
              : <Avatar naam={gebruikersnaam} size={26} kleur={kleur} />
            }
            <span style={{ flex:1, fontSize:fs-2, color:isDark?"rgba(255,255,255,0.6)":"#888",
              overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
              ...(isDemoMode?{color:"#f97316",fontStyle:"italic"}:{}) }}>{gebruikersnaam}</span>
            <button onClick={logout} title="Uitloggen" style={{ background:"none",border:"none",cursor:"pointer",
              fontSize:16,padding:2,color:isDark?"rgba(255,255,255,0.5)":"#aaa" }}>⏻</button>
          </div>
        </div>
      </aside>

      <main style={{ flex:1, padding:"1.5rem 2rem", overflowY:"auto" }}>
        <h2 style={{ margin:"0 0 1.25rem", fontSize:fs+6, fontWeight:500, color:tekstK }}>
          {nav.find(n=>n.id===pagina)?.icon} {nav.find(n=>n.id===pagina)?.label}
        </h2>
        {pagina==="klanten"   &&<KlantenPage   klanten={klanten} setKlanten={setKlanten} producten={producten} agenda={agenda} kleur={kleur} fs={fs} />}
        {pagina==="producten" &&<ProductenPage producten={producten} setProducten={setProducten} kleur={kleur} fs={fs} />}
        {pagina==="agenda"    &&<AgendaPage    klanten={klanten} agenda={agenda} setAgenda={setAgenda} kleur={kleur} fs={fs} />}
        {pagina==="offertes"  &&<OffertesPage  klanten={klanten} setKlanten={setKlanten} producten={producten} kleur={kleur} fs={fs} />}
        {pagina==="financieel"&&<FinancieelPage klanten={klanten} setKlanten={setKlanten} kleur={kleur} fs={fs} />}
        {pagina==="gebruikers"&&!isDemoMode&&huidigUser?.isAdmin&&<GebruikersBeheer users={users} setUsers={setUsers} kleur={kleur} fs={fs} />}
      </main>
      </div>
    </div>
  );
}
