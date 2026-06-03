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

export default function App() {
  const [users, setUsers] = useState(INIT_USERS);
  const [huidigUser, setHuidigUser] = useState(null);
  const [kleurIdx, setKleurIdx] = useState(0);
  const [fs, setFs] = useState(14);
  const [bgIdx, setBgIdx] = useState(0);

  const kleur = KLEUREN[kleurIdx];
  const bg = BGOVS[bgIdx];

  function logout() {
    setHuidigUser(null);
  }

  function startDemo() {
    setHuidigUser({ id:"demo", naam:"Demo", isAdmin:false });
  }

  if (!huidigUser) return <LoginPage users={users} onLogin={setHuidigUser} onDemo={startDemo} kleur={kleur} />;

  return (
    <div style={{ padding:"2rem", background:bg.w, color:"#1a1a1a", minHeight:"100vh" }}>
      <h1>Welkom, {huidigUser.naam}!</h1>
      <p>DenCRM is geladen ✓</p>
      <button onClick={logout} style={{ padding:"10px 20px", borderRadius:8, background:kleur.hoofd, color:"#fff", border:"none", cursor:"pointer" }}>
        Uitloggen
      </button>
    </div>
  );
}
