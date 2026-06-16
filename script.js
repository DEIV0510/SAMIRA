/* ============================================================
   SAMIRA · Bienestar desde adentro — script.js
   ============================================================ */

/* -------------------------------------------------------------
   1) CONFIGURACIÓN  ←  EDITA AQUÍ
   ------------------------------------------------------------- */
const CONFIG = {
  // Número de WhatsApp (formato: 57 + número, sin +, espacios ni guiones)
  whatsapp: "573145093256",
  instagram: "https://www.instagram.com/samira.bienestar/",
};

// Productos — edita nombres, descripciones y PRECIOS aquí
const PRODUCTS = [
  { type:"jar", name:"Colágeno Hidrolizado", short:"COLÁGENO", sub:"HIDROLIZADO · VIT C",
    desc:"Piel firme, articulaciones sanas y cabello fuerte, con vitamina C para máxima absorción.",
    chips:["Piel","Antiedad","Vit C"], price:"89.900", tag:"Más vendido", accent:"#C2A36B" },
  { type:"bottle", name:"Omega 3 Ultra", short:"OMEGA 3", sub:"EPA · DHA",
    desc:"Aceite de pescado ultra puro para tu corazón, tu cerebro y tu equilibrio hormonal.",
    chips:["Corazón","Cerebro","Hormonal"], price:"79.900", accent:"#6E8B6E" },
  { type:"jar", name:"Biotina + Colágeno", short:"BIOTINA", sub:"+ COLÁGENO",
    desc:"El dúo perfecto para un cabello abundante, piel luminosa y uñas más fuertes.",
    chips:["Cabello","Uñas","Piel"], price:"69.900", accent:"#C2A36B" },
  { type:"bottle", name:"Magnesio + Zinc", short:"MAGNESIO", sub:"+ ZINC",
    desc:"Relájate, duerme mejor y recupera tu energía. Tu mejor aliado para el descanso.",
    chips:["Sueño","Calma","Energía"], price:"59.900", accent:"#6E8B6E" },
  { type:"jar", name:"Multivitamínico Mujer", short:"MULTIVIT", sub:"MUJER",
    desc:"Vitaminas y minerales esenciales, pensados para el cuerpo y el ritmo de la mujer.",
    chips:["Vitalidad","Inmunidad"], price:"74.900", tag:"Esencial", accent:"#34503D" },
];

const TESTIMONIALS = [
  { name:"Valentina R.", role:"Bogotá", stars:5, text:"Mi piel cambió por completo en dos meses. El colágeno de SAMIRA ya es parte de mi ritual diario." },
  { name:"Daniela M.", role:"Medellín", stars:5, text:"Por fin un Omega 3 que no sabe mal y de verdad siento la diferencia en mi energía." },
  { name:"Carolina S.", role:"Cali", stars:5, text:"Duermo muchísimo mejor desde que tomo el magnesio. Me siento más tranquila y descansada." },
  { name:"Andrea L.", role:"Barranquilla", stars:5, text:"Mis uñas y mi cabello están más fuertes que nunca. SAMIRA se volvió parte de mí." },
];

const HERO_WORDS = ["tu piel", "tu energía", "tu cabello", "tu descanso", "tu equilibrio"];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer  = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
const waLink = (msg) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg || "Hola SAMIRA 🌿")}`;
const $  = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];

/* ============================================================
   2) PRELOADER — el logo real se revela con un destello dorado
   ============================================================ */
(function preloader(){
  const pre = $("#preloader");
  const bar = $("#plBar");
  const pct = $("#plPct");
  if(!pre) return;

  document.body.style.overflow = "hidden";

  // la revelación del logo (barrido) y el destello dorado son 100% CSS; aquí solo el progreso
  const DURATION = reduceMotion ? 600
    : (location.search.includes("slow") ? 11000 : 3000);
  let startT = null, done = false;
  function finish(){
    if(done) return; done = true;
    bar.style.width = "100%"; pct.textContent = 100;
    document.body.style.overflow = "";
    document.body.classList.add("loaded");
    pre.classList.add("is-done");
    setTimeout(() => pre.remove(), 780);
    startHeroSwap();
  }
  function tick(t){
    if(startT === null) startT = t;
    const p = Math.min(100, ((t - startT) / DURATION) * 100);
    bar.style.width = p + "%";
    pct.textContent = Math.round(p);
    if(p < 100) requestAnimationFrame(tick);
    else setTimeout(finish, 200);
  }
  requestAnimationFrame(tick);
  setTimeout(finish, DURATION + 4000);            // red de seguridad
})();

/* ============================================================
   3) RENDER — products & testimonials
   ============================================================ */
function bottleSVG(p){
  const a = p.accent;
  if(p.type === "jar"){
    return `<svg viewBox="0 0 200 260" class="pcard__bottle" aria-hidden="true">
      <rect x="64" y="14" width="72" height="26" rx="7" fill="#1d2f24"/>
      <rect x="44" y="44" width="112" height="180" rx="20" fill="#2E4636"/>
      <rect x="50" y="50" width="20" height="168" rx="10" fill="#ffffff" opacity=".10"/>
      <rect x="56" y="92" width="88" height="100" rx="10" fill="#F4F2EA"/>
      <text x="100" y="120" text-anchor="middle" style="font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:600;letter-spacing:3px;fill:#2E4636">SAMIRA</text>
      <line x1="72" y1="132" x2="128" y2="132" stroke="${a}" stroke-width="2"/>
      <text x="100" y="152" text-anchor="middle" style="font-family:'Jost',sans-serif;font-size:12px;font-weight:500;letter-spacing:1.5px;fill:#2E4636">${p.short}</text>
      <text x="100" y="170" text-anchor="middle" style="font-family:'Jost',sans-serif;font-size:7px;letter-spacing:1px;fill:#6E8B6E">${p.sub}</text>
      <rect x="72" y="182" width="56" height="4" rx="2" fill="${a}" opacity=".7"/>
    </svg>`;
  }
  return `<svg viewBox="0 0 160 280" class="pcard__bottle" aria-hidden="true">
    <rect x="58" y="10" width="44" height="22" rx="5" fill="${a}"/>
    <rect x="64" y="30" width="32" height="16" fill="#1d2f24" opacity=".5"/>
    <rect x="40" y="46" width="80" height="212" rx="22" fill="#3f5c46"/>
    <rect x="46" y="52" width="14" height="198" rx="7" fill="#ffffff" opacity=".12"/>
    <rect x="50" y="96" width="60" height="124" rx="10" fill="#F4F2EA"/>
    <text x="80" y="124" text-anchor="middle" style="font-family:'Cormorant Garamond',serif;font-size:13px;font-weight:600;letter-spacing:2px;fill:#2E4636">SAMIRA</text>
    <line x1="62" y1="134" x2="98" y2="134" stroke="${a}" stroke-width="1.6"/>
    <text x="80" y="156" text-anchor="middle" style="font-family:'Jost',sans-serif;font-size:10px;font-weight:500;letter-spacing:1px;fill:#2E4636">${p.short}</text>
    <text x="80" y="172" text-anchor="middle" style="font-family:'Jost',sans-serif;font-size:6px;letter-spacing:1px;fill:#6E8B6E">${p.sub}</text>
    <circle cx="80" cy="200" r="9" fill="${a}" opacity=".85"/>
  </svg>`;
}

(function renderProducts(){
  const grid = $("#productGrid"); if(!grid) return;
  grid.innerHTML = PRODUCTS.map((p,i) => `
    <article class="pcard reveal reveal--pop" data-d="${i%3}" style="--pc:${p.accent}33">
      ${p.tag ? `<span class="pcard__tag">${p.tag}</span>` : ""}
      <div class="pcard__visual"><span class="stage__glow"></span>${bottleSVG(p)}</div>
      <h3 class="pcard__name">${p.name}</h3>
      <p class="pcard__desc">${p.desc}</p>
      <div class="pcard__chips">${p.chips.map(c=>`<span>${c}</span>`).join("")}</div>
      <div class="pcard__foot">
        <span class="pcard__price">$${p.price}<small>COP</small></span>
        <button class="pcard__buy" data-add="${i}" aria-label="Agregar ${p.name} a mi pedido">
          Agregar
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>
    </article>`).join("");
})();

(function renderTestimonials(){
  const grid = $("#testimonialGrid"); if(!grid) return;
  const star = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 20.3l1.3-6.7-5-4.6 6.8-.8z"/></svg>`;
  grid.innerHTML = TESTIMONIALS.map((t,i) => `
    <article class="tcard reveal" data-d="${i%4}">
      <div class="tcard__stars" aria-label="${t.stars} de 5 estrellas">${star.repeat(t.stars)}</div>
      <p class="tcard__text">“${t.text}”</p>
      <div class="tcard__who">
        <span class="tcard__ava" aria-hidden="true">${t.name.charAt(0)}</span>
        <span><span class="tcard__name">${t.name}</span><br><span class="tcard__role">${t.role}</span></span>
      </div>
    </article>`).join("");
})();

/* ============================================================
   4) WHATSAPP wiring (all [data-wa])
   ============================================================ */
$$("[data-wa]").forEach(el => { el.href = waLink(el.dataset.wa); el.target = "_blank"; el.rel = "noopener"; });
const ig = $("#igLink"); if(ig) ig.href = CONFIG.instagram;
const yr = $("#year"); if(yr) yr.textContent = new Date().getFullYear();

/* ============================================================
   5) HEADER · mobile menu · back-to-top
   ============================================================ */
const header = $("#header"), nav = $("#nav"), burger = $("#burger"), toTop = $("#toTop");
const progress = $("#scrollProgress");
const onScroll = () => {
  const y = scrollY;
  header.classList.toggle("is-stuck", y > 30);
  toTop.classList.toggle("is-on", y > 700);
  if (progress) { const h = document.documentElement.scrollHeight - innerHeight; progress.style.transform = `scaleX(${h > 0 ? y / h : 0})`; }
};
addEventListener("scroll", onScroll, {passive:true}); onScroll();

function closeMenu(){ nav.classList.remove("is-open"); burger.setAttribute("aria-expanded","false"); document.body.classList.remove("menu-open"); }
burger?.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", open);
  document.body.classList.toggle("menu-open", open);
});
$$("#nav a").forEach(a => a.addEventListener("click", closeMenu));
toTop?.addEventListener("click", () => scrollTo({top:0, behavior: reduceMotion ? "auto":"smooth"}));

/* ============================================================
   6) REVEAL on scroll + STAT counters
   ============================================================ */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add("is-in"); io.unobserve(e.target); } });
}, {threshold:0.14, rootMargin:"0px 0px -8% 0px"});
$$(".reveal").forEach(el => io.observe(el));

function animateCount(el){
  const target = parseFloat(el.dataset.count);
  const dec = parseInt(el.dataset.decimals||"0",10);
  const suffix = el.dataset.suffix||"";
  if(reduceMotion){ el.textContent = target.toFixed(dec)+suffix; return; }
  const dur = 1600; let s=null;
  const step = (t) => {
    if(s===null) s=t; const p = Math.min(1,(t-s)/dur);
    const eased = 1-Math.pow(1-p,3);
    el.textContent = (target*eased).toFixed(dec) + suffix;
    if(p<1) requestAnimationFrame(step); else el.textContent = target.toFixed(dec)+suffix;
  };
  requestAnimationFrame(step);
}
const statIO = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ animateCount(e.target); statIO.unobserve(e.target); } });
}, {threshold:0.6});
$$(".stat__num").forEach(el => statIO.observe(el));

/* ============================================================
   7) HERO kinetic word swap
   ============================================================ */
let heroSwapStarted = false;
function startHeroSwap(){
  if(heroSwapStarted || reduceMotion) return; heroSwapStarted = true;
  const wrap = $("#heroSwap"); if(!wrap) return;
  // build words & lock width to the widest to avoid layout shift
  wrap.innerHTML = HERO_WORDS.map((w,i)=>`<span class="swap__word${i===0?" is-on":""}">${w}</span>`).join("");
  const words = $$(".swap__word", wrap);
  let max = 0; words.forEach(w => { max = Math.max(max, w.offsetWidth); });
  wrap.style.width = max + "px";
  let i = 0;
  setInterval(() => {
    const cur = words[i]; i = (i+1)%words.length; const nxt = words[i];
    cur.classList.add("is-out"); cur.classList.remove("is-on");
    nxt.classList.remove("is-out"); nxt.classList.add("is-on");
    setTimeout(() => cur.classList.remove("is-out"), 600);
  }, 2400);
}
if(reduceMotion){ const w = $("#heroSwap .swap__word"); if(w) w.classList.add("is-on"); }

/* ============================================================
   8) DESKTOP delights — cursor · magnetic · tilt · parallax
   ============================================================ */
if(finePointer && !reduceMotion){
  document.body.classList.add("cursor-on");
  const cur = $("#cursor"), dot = $(".cursor__dot"), ring = $(".cursor__ring");
  let rx=0, ry=0, mx=0, my=0;
  addEventListener("pointermove", e => {
    mx=e.clientX; my=e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px)`;
  });
  (function ringLoop(){ rx += (mx-rx)*0.18; ry += (my-ry)*0.18; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(ringLoop); })();
  $$("a, button, .pcard, .benefit, .tcard, [data-tilt], summary").forEach(el => {
    el.addEventListener("pointerenter", () => cur.classList.add("is-hover"));
    el.addEventListener("pointerleave", () => cur.classList.remove("is-hover"));
  });

  // magnetic buttons
  $$(".magnetic").forEach(el => {
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2, y = e.clientY - r.top - r.height/2;
      el.style.transform = `translate(${x*0.25}px, ${y*0.35}px)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transform = ""; });
  });

  // tilt
  $$("[data-tilt]").forEach(el => {
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-0.5, y = (e.clientY-r.top)/r.height-0.5;
      el.style.transform = `perspective(700px) rotateY(${x*14}deg) rotateX(${-y*14}deg)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transform = ""; });
  });

  // pointer parallax for floating leaves / blobs
  const layers = $$("[data-parallax]");
  addEventListener("pointermove", e => {
    const cx = (e.clientX/innerWidth-0.5), cy = (e.clientY/innerHeight-0.5);
    layers.forEach(l => { const d = parseFloat(l.dataset.parallax)*100; l.style.transform = `translate(${cx*d}px, ${cy*d}px)`; });
  });
}

/* ============================================================
   9) FAQ — single-open accordion (si existe)
   ============================================================ */
$$("#faqList details").forEach(d => {
  d.addEventListener("toggle", () => {
    if(d.open) $$("#faqList details").forEach(o => { if(o!==d) o.open = false; });
  });
});

/* ============================================================
   10) ✨ Chispas de dopamina al hacer clic en los CTA
   ============================================================ */
if(!reduceMotion){
  const SPARK_COLORS = ["#C2A36B","#E8896B","#8FCFAE","#E79DAE","#d8bf94","#6E8B6E"];
  function sparkBurst(x, y){
    const n = 16;
    for(let i=0;i<n;i++){
      const s = document.createElement("span");
      s.className = "spark";
      s.style.left = x + "px"; s.style.top = y + "px";
      s.style.background = SPARK_COLORS[i % SPARK_COLORS.length];
      const ang = (Math.PI*2/n)*i + Math.random()*0.6;
      const dist = 55 + Math.random()*80;
      const dx = Math.cos(ang)*dist, dy = Math.sin(ang)*dist - 10;
      document.body.appendChild(s);
      s.animate([
        { transform:"translate(-50%,-50%) scale(1) rotate(0deg)", opacity:1 },
        { transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(0) rotate(240deg)`, opacity:0 }
      ], { duration: 700 + Math.random()*350, easing:"cubic-bezier(.22,1,.36,1)" });
      setTimeout(() => s.remove(), 1100);
    }
  }
  addEventListener("click", (e) => {
    const t = e.target.closest(".pcard__buy, .btn--solid, .wa-float, [data-wa]");
    if(t) sparkBurst(e.clientX, e.clientY);
  }, true);
}

/* ============================================================
   11) 🛒 CARRITO + pedido automático por WhatsApp
   ============================================================ */
(function cartModule(){
  const KEY = "samira_cart";
  const btn = $("#cartBtn"), count = $("#cartCount"), root = $("#cart"), overlay = $("#cartOverlay"),
        closeBtn = $("#cartClose"), itemsEl = $("#cartItems"), emptyEl = $("#cartEmpty"),
        footEl = $("#cartFoot"), totalEl = $("#cartTotal"), checkout = $("#cartCheckout");
  if(!btn || !root) return;

  const priceNum = s => parseInt(String(s).replace(/\D/g, ""), 10) || 0;
  const fmt = n => "$" + n.toLocaleString("es-CO");

  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch(e) { cart = []; }
  cart = cart.filter(it => PRODUCTS[it.i]).map(it => ({ i: it.i, qty: Math.max(1, it.qty | 0) }));

  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch(e) {} };
  const totalQty = () => cart.reduce((s, it) => s + it.qty, 0);
  const totalCOP = () => cart.reduce((s, it) => s + priceNum(PRODUCTS[it.i].price) * it.qty, 0);

  function buildMessage(){
    const lines = cart.map(it => { const p = PRODUCTS[it.i]; return `• ${it.qty}× ${p.name} — ${fmt(priceNum(p.price) * it.qty)}`; }).join("\n");
    return `¡Hola SAMIRA 🌿! Quiero hacer este pedido:\n\n${lines}\n\n*Total: ${fmt(totalCOP())} COP*\n\nMi nombre: \nCiudad y dirección de envío: \n\n¿Me confirmas disponibilidad? 🙌`;
  }

  function updateBadge(){
    const q = totalQty();
    count.textContent = q;
    count.classList.toggle("is-on", q > 0);
    btn.classList.remove("bump"); void btn.offsetWidth; if(q > 0) btn.classList.add("bump");
  }

  function render(){
    if(!cart.length){
      itemsEl.innerHTML = ""; emptyEl.hidden = false; footEl.hidden = true;
    } else {
      emptyEl.hidden = true; footEl.hidden = false;
      itemsEl.innerHTML = cart.map(it => {
        const p = PRODUCTS[it.i];
        return `<div class="cart__row" data-i="${it.i}">
          <div class="cart__row-info">
            <span class="cart__row-name">${p.name}</span>
            <span class="cart__row-price">${fmt(priceNum(p.price))} c/u</span>
          </div>
          <div class="cart__qty">
            <button class="cart__qbtn" data-act="dec" aria-label="Quitar uno">−</button>
            <span class="cart__qn">${it.qty}</span>
            <button class="cart__qbtn" data-act="inc" aria-label="Agregar uno">+</button>
          </div>
          <span class="cart__row-total">${fmt(priceNum(p.price) * it.qty)}</span>
          <button class="cart__row-del" data-act="del" aria-label="Eliminar">×</button>
        </div>`;
      }).join("");
    }
    totalEl.textContent = fmt(totalCOP());
    checkout.href = waLink(buildMessage());
    updateBadge();
    save();
  }

  function add(i){
    const ex = cart.find(it => it.i === i);
    if(ex) ex.qty++; else cart.push({ i, qty: 1 });
    render();
  }

  // botones "Agregar" de las tarjetas (delegado)
  document.addEventListener("click", e => {
    const addBtn = e.target.closest("[data-add]");
    if(!addBtn) return;
    const i = parseInt(addBtn.dataset.add, 10);
    if(!PRODUCTS[i]) return;
    add(i); toast(`${PRODUCTS[i].name} agregado`);
  });

  // controles dentro del carrito (delegado)
  itemsEl.addEventListener("click", e => {
    const act = e.target.closest("[data-act]")?.dataset.act; if(!act) return;
    const row = e.target.closest(".cart__row"); if(!row) return;
    const i = parseInt(row.dataset.i, 10);
    const it = cart.find(c => c.i === i); if(!it) return;
    if(act === "inc") it.qty++;
    else if(act === "dec") { it.qty--; if(it.qty <= 0) cart = cart.filter(c => c.i !== i); }
    else if(act === "del") cart = cart.filter(c => c.i !== i);
    render();
  });

  const open = () => { root.classList.add("is-open"); root.setAttribute("aria-hidden", "false"); document.body.classList.add("cart-open"); };
  const close = () => { root.classList.remove("is-open"); root.setAttribute("aria-hidden", "true"); document.body.classList.remove("cart-open"); };
  btn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);
  addEventListener("keydown", e => { if(e.key === "Escape") close(); });
  checkout.addEventListener("click", () => setTimeout(close, 500));

  // mini-toast de confirmación
  let toastEl;
  function toast(msg){
    if(!toastEl){ toastEl = document.createElement("div"); toastEl.className = "cart-toast"; document.body.appendChild(toastEl); }
    toastEl.textContent = "✓ " + msg;
    toastEl.classList.remove("is-on"); void toastEl.offsetWidth; toastEl.classList.add("is-on");
    clearTimeout(toastEl._t); toastEl._t = setTimeout(() => toastEl.classList.remove("is-on"), 2200);
  }

  render();
})();
