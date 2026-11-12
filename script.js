/* ============================================================
   WellNen · Bienestar · Energía · Equilibrio — script.js
   ============================================================ */
clearTimeout(window.__wnShowAll); // el JS llegó: se cancela la red de seguridad del <head>

/* -------------------------------------------------------------
   1) CONFIGURACIÓN — edita aquí
   ------------------------------------------------------------- */
const CONFIG = {
  whatsapp: "573145093256", // 57 + número, sin +, espacios ni guiones
  instagram: "https://www.instagram.com/samira.bienestar/",
};

/* Productos — nombre, textos, foto y PRECIOS (en pesos, sin puntos).
   pillar: "Bienestar" | "Energía" | "Equilibrio"  ·  tag: etiqueta opcional sobre la foto */
const PRODUCTS = [
  { id:"nad", img:"nad-resveratrol.webp", w:433, name:"NAD+ y Resveratrol", pillar:"Energía", tag:"Nuevo",
    hook:"¿Sientes que ya no tienes la misma energía?",
    line:"Energía celular para tus días más activos. Nicotinamida y resveratrol en una gomita liposomal.",
    benefits:[
      "Aporta nicotinamida, precursora del NAD+ que tus células usan para producir energía.",
      "Con resveratrol, un antioxidante de origen vegetal.",
      "Fórmula liposomal en gomitas masticables.",
      "1.500 mg por porción (2 gomitas).",
    ], price:70000, oldPrice:85000 },
  { id:"omega3", img:"omega3.webp", w:414, name:"Omega 3", pillar:"Bienestar",
    hook:"El básico que tu rutina necesita.",
    line:"Para tu corazón, tu mente y tu día a día, en una gomita masticable con relleno líquido.",
    benefits:[
      "Aporta ácidos grasos omega 3 a tu alimentación.",
      "Ayuda a cuidar la salud de tu corazón.",
      "Apoya la memoria y la concentración.",
      "Fácil de tomar: gomita con relleno líquido.",
    ], price:70000, oldPrice:85000 },
  { id:"magnesio-potasio", img:"magnesio-potasio.webp", w:452, name:"Magnesio y Potasio 5 en 1", pillar:"Equilibrio",
    hook:"Menos calambres, más rendimiento.",
    line:"Cinco fuentes de magnesio y potasio para tus músculos, antes y después del ejercicio.",
    benefits:[
      "Ayuda a disminuir los calambres musculares.",
      "Apoya la recuperación después de la actividad física.",
      "Apoya la hidratación y el equilibrio mineral.",
      "Citrato, glicinato y cloruro de magnesio; citrato y cloruro de potasio.",
    ], price:70000, oldPrice:85000 },
];

const ICON = { "Bienestar":"#i-bienestar", "Energía":"#i-energia", "Equilibrio":"#i-equilibrio" };

/* -------------------------------------------------------------
   2) Utilidades
   ------------------------------------------------------------- */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const fmt = (n) => "$" + Number(n).toLocaleString("es-CO");
const waLink = (msg) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg || "Hola WellNen, quiero información sobre sus suplementos.")}`;

/* -------------------------------------------------------------
   3) Productos
   ------------------------------------------------------------- */
(function renderProducts(){
  const list = $("#productList");
  if(!list) return;
  list.innerHTML = PRODUCTS.map((p, i) => `
    <article class="feat reveal${i % 2 ? " feat--dark feat--flip" : ""}" id="p-${p.id}">
      <div class="feat__media">
        <span class="feat__band" aria-hidden="true"></span>
        <span class="feat__ring" aria-hidden="true"></span>
        <span class="feat__disc" aria-hidden="true"></span>
        ${p.tag ? `<span class="feat__tag">${p.tag}</span>` : ""}
        <img src="assets/products/${p.img}" alt="${p.name}" width="${p.w}" height="820" loading="${i ? "lazy" : "eager"}" decoding="async" />
      </div>
      <div class="feat__body">
        <p class="feat__pillar"><svg viewBox="0 0 32 32" aria-hidden="true"><use href="${ICON[p.pillar]}"/></svg>${p.pillar}</p>
        <h3 class="feat__name">${p.name}</h3>
        <p class="feat__hook">${p.hook}</p>
        <p class="feat__line">${p.line}</p>
        <ul class="feat__list">
          ${p.benefits.map(b => `<li><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-check"/></svg>${b}</li>`).join("")}
        </ul>
        <div class="feat__buy">
          <p class="feat__price">
            <strong><span class="sr">Ahora </span>${fmt(p.price)}</strong>
            ${p.oldPrice ? `<span class="feat__was"><s><span class="sr">Antes </span>${fmt(p.oldPrice)}</s><span class="feat__save">Ahorras ${fmt(p.oldPrice - p.price)}</span></span>` : ""}
          </p>
          <div class="feat__ctas">
            <button class="btn ${i % 2 ? "btn--lima" : "btn--primary"} feat__add" type="button" data-add="${p.id}">
              <svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-check"/></svg><span>Agregar al pedido</span>
            </button>
            <a class="btn ${i % 2 ? "btn--line-claro" : "btn--line"}" data-wa="Hola WellNen, quiero pedir ${p.name} (${fmt(p.price)}). Mi ciudad es: " href="#contacto">
              <svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-wa"/></svg> Pedir por WhatsApp
            </a>
          </div>
          <p class="feat__trust">Envío gratis a toda Colombia · Pago contra entrega</p>
        </div>
      </div>
    </article>`).join("");
})();

/* -------------------------------------------------------------
   4) Enlaces de WhatsApp e Instagram
   ------------------------------------------------------------- */
$$("[data-wa]").forEach(a => {
  a.href = waLink(a.dataset.wa);
  a.target = "_blank";
  a.rel = "noopener";
});
const ig = $("#igLink");
if(ig) ig.href = CONFIG.instagram;
const yr = $("#year");
if(yr) yr.textContent = new Date().getFullYear();

/* -------------------------------------------------------------
   5) Encabezado y menú móvil
   ------------------------------------------------------------- */
const header = $("#header"), nav = $("#nav"), burger = $("#burger");
let ticking = false;
function onScroll(){
  if(ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    header?.classList.toggle("is-scrolled", scrollY > 8);
    sweep();
    ticking = false;
  });
}

function setMenu(open){
  nav.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  document.body.classList.toggle("menu-open", open);
}
burger?.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
$$("#nav a").forEach(a => a.addEventListener("click", () => setMenu(false)));
addEventListener("keydown", e => { if(e.key === "Escape" && nav.classList.contains("is-open")) setMenu(false); });
matchMedia("(min-width: 861px)").addEventListener("change", e => { if(e.matches) setMenu(false); });

/* -------------------------------------------------------------
   6) Aparición al hacer scroll (barrido propio, sin IntersectionObserver)
   ------------------------------------------------------------- */
let pending = $$(".reveal");
function sweep(){
  if(!pending.length) return;
  const limit = innerHeight * 0.92;
  pending = pending.filter(el => {
    if(el.getBoundingClientRect().top < limit){ el.classList.add("is-in"); return false; }
    return true;
  });
}
addEventListener("scroll", onScroll, { passive:true });
addEventListener("resize", onScroll);
addEventListener("load", sweep);
sweep();
header?.classList.toggle("is-scrolled", scrollY > 8);

/* -------------------------------------------------------------
   7) Pedido (carrito) → mensaje de WhatsApp automático
   ------------------------------------------------------------- */
(function cartModule(){
  const KEY = "wellnen_cart";
  const byId = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
  const btn = $("#cartBtn"), count = $("#cartCount"), root = $("#cart"), overlay = $("#cartOverlay"),
        closeBtn = $("#cartClose"), itemsEl = $("#cartItems"), emptyEl = $("#cartEmpty"),
        footEl = $("#cartFoot"), totalEl = $("#cartTotal"), checkout = $("#cartCheckout"), browse = $("#cartBrowse");
  if(!btn || !root) return;

  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch(e) { cart = []; }
  cart = cart.filter(it => byId[it.id]).map(it => ({ id: it.id, qty: Math.max(1, it.qty | 0) }));

  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch(e) {} };
  const totalQty = () => cart.reduce((s, it) => s + it.qty, 0);
  const totalCOP = () => cart.reduce((s, it) => s + byId[it.id].price * it.qty, 0);

  function buildMessage(){
    const lines = cart.map(it => {
      const p = byId[it.id];
      return `• ${it.qty} x ${p.name} — ${fmt(p.price * it.qty)}`;
    }).join("\n");
    return `Hola WellNen, quiero hacer este pedido:\n\n${lines}\n\n*Total: ${fmt(totalCOP())}*\n\nNombre:\nCiudad:\nDirección:\n\n(Envío gratis · Pago contra entrega)`;
  }

  function updateBadge(bump){
    const q = totalQty();
    count.textContent = q;
    count.classList.toggle("is-on", q > 0);
    btn.setAttribute("aria-label", q ? `Ver tu pedido (${q} ${q === 1 ? "producto" : "productos"})` : "Ver tu pedido");
    if(bump){ btn.classList.remove("bump"); void btn.offsetWidth; btn.classList.add("bump"); }
  }

  function render(bump){
    if(!cart.length){
      itemsEl.innerHTML = ""; emptyEl.hidden = false; footEl.hidden = true;
    } else {
      emptyEl.hidden = true; footEl.hidden = false;
      itemsEl.innerHTML = cart.map(it => {
        const p = byId[it.id];
        return `<div class="cart__row" data-id="${p.id}">
          <div class="cart__thumb"><img src="assets/products/${p.img}" alt="" width="${p.w}" height="820" /></div>
          <p class="cart__name">${p.name}<span class="cart__unit">${fmt(p.price)} c/u</span></p>
          <button class="cart__del" type="button" data-act="del">Quitar</button>
          <div class="cart__qty">
            <button class="cart__qbtn" type="button" data-act="dec" aria-label="Quitar uno de ${p.name}">−</button>
            <span class="cart__qn" aria-label="Cantidad">${it.qty}</span>
            <button class="cart__qbtn" type="button" data-act="inc" aria-label="Agregar uno de ${p.name}">+</button>
          </div>
          <span class="cart__sub">${fmt(p.price * it.qty)}</span>
        </div>`;
      }).join("");
    }
    totalEl.textContent = fmt(totalCOP());
    checkout.href = waLink(buildMessage());
    updateBadge(bump);
    save();
  }

  function add(id){
    const ex = cart.find(it => it.id === id);
    if(ex) ex.qty++; else cart.push({ id, qty: 1 });
    render(true);
  }

  // «Agregar» en las tarjetas
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-add]");
    if(!b || !byId[b.dataset.add]) return;
    add(b.dataset.add);
    const label = b.querySelector("span");
    label.dataset.t ||= label.textContent;
    b.classList.add("is-done"); label.textContent = "Agregado";
    clearTimeout(b._t);
    b._t = setTimeout(() => { b.classList.remove("is-done"); label.textContent = label.dataset.t; }, 1600);
    toast(`${byId[b.dataset.add].name} agregado`);
  });

  // controles dentro del pedido
  itemsEl.addEventListener("click", e => {
    const act = e.target.closest("[data-act]")?.dataset.act; if(!act) return;
    const row = e.target.closest(".cart__row"); if(!row) return;
    const it = cart.find(c => c.id === row.dataset.id); if(!it) return;
    if(act === "inc") it.qty++;
    else if(act === "dec"){ it.qty--; if(it.qty <= 0) cart = cart.filter(c => c !== it); }
    else if(act === "del") cart = cart.filter(c => c !== it);
    render();
  });

  let lastFocus = null;
  function open(){
    lastFocus = document.activeElement;
    $("#toast")?.classList.remove("is-on");
    root.classList.add("is-open"); root.setAttribute("aria-hidden", "false");
    document.body.classList.add("cart-open");
    setTimeout(() => closeBtn.focus(), 60);
  }
  function close(){
    if(!root.classList.contains("is-open")) return;
    root.classList.remove("is-open"); root.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cart-open");
    lastFocus?.focus?.();
  }
  btn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);
  browse?.addEventListener("click", close);
  addEventListener("keydown", e => { if(e.key === "Escape") close(); });
  checkout.addEventListener("click", () => setTimeout(close, 400));

  // aviso al agregar
  const toastEl = $("#toast");
  function toast(msg){
    if(!toastEl) return;
    toastEl.innerHTML = `<span>${msg}</span><button type="button">Ver pedido</button>`;
    toastEl.querySelector("button").addEventListener("click", () => { toastEl.classList.remove("is-on"); open(); });
    toastEl.classList.add("is-on");
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => toastEl.classList.remove("is-on"), 3200);
  }

  render();
})();
