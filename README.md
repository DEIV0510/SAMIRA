# SAMIRA · Bienestar desde adentro

Landing page premium para **SAMIRA**, marca de suplementos (colágeno, omega 3 y más) enfocada en el bienestar femenino.

100% HTML/CSS/JS puro — **se abre con solo dar doble clic a `index.html`**. No necesita instalar nada.

## 🖼️ Logo (importante)
Para que el logo se vea idéntico al tuyo, guarda tus imágenes en la carpeta `assets/`:

1. **`assets/logo.png`** — tu logo a color (para el encabezado). Preferiblemente con **fondo transparente**.
2. **`assets/logo-blanco.png`** — *(opcional)* versión en blanco/claro para el pie de página oscuro.

Si no agregas estos archivos, la página muestra automáticamente un logo de respaldo en SVG (no se rompe nada).
La **pantalla de carga** dibuja una versión animada del emblema y luego aparece "SAMIRA".

## ✍️ Qué personalizar (todo en `script.js`, arriba del archivo)
1. **WhatsApp** → cambia `CONFIG.whatsapp` por tu número real (formato `57` + número, sin `+`, espacios ni guiones).
2. **Precios y productos** → edita el array `PRODUCTS`.
3. **Testimonios** → edita el array `TESTIMONIALS`.
4. **Instagram** → ya apunta a `@samira.bienestar`.

## Estructura
- `index.html` — estructura y contenido
- `styles.css` — diseño (verde sage/bosque + crema + dorado, Cormorant Garamond + Jost)
- `script.js` — pantalla de carga, animaciones y datos de productos
- `server.js` — servidor opcional para previsualizar (`node server.js` → http://localhost:5200)
- `assets/` — tus logos (`logo.png`, `logo-blanco.png`)

## Detalles
- **Pantalla de carga**: el emblema se **dibuja trazo a trazo** y se rellena, luego aparece "SAMIRA" letra por letra. Ligera y optimizada para celular. (Tip: abre `index.html?slow` para verla en cámara lenta.)
- Responsive, menú móvil, y respeta `prefers-reduced-motion`.
- En escritorio: cursor personalizado, botones magnéticos, tarjetas con inclinación 3D y parallax suave.

> Las imágenes de producto son ilustraciones SVG hechas a medida con la marca. Si tienes fotos reales, se pueden reemplazar.
