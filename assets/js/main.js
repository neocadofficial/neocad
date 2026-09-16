/* =========================================================
   NeoCAD — shared site behavior
   Vanilla JS, no build step, safe to include on every page.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initSearch();
  initGallery();
  initCalculator();
});

/* ---------------- mobile nav ---------------- */
function initNav() {
  const burger = document.querySelector(".nav-burger");
  const links = document.querySelector(".nav-links");
  if (!burger || !links) return;
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("is-open"))
  );
}

/* ---------------- search ----------------
   Static site, so the index is just a small array shipped
   with the page. Add an entry here any time you add a page,
   product, or blog post. */
const SEARCH_INDEX = [
  { title: "Home", tag: "Page", url: "index.html", snippet: "NeoCAD — CAD design & 3D printing for cars, RC builds, and one-off parts." },
  { title: "Transmission Mount Bushing Set — BRZ / FR-S / 86", tag: "Shop", url: "shop.html", snippet: "TPU 95A bushing set — $40 shipped / $35 local pickup. Cuts driveline slop using the stock mount." },
  { title: "Pricing Guide", tag: "Page", url: "pricing.html", snippet: "How jobs are priced: materials, machine time, labor, and a live estimate tool." },
  { title: "Equipment", tag: "Page", url: "equipment.html", snippet: "The printer fleet, the scanner, and the materials on the shelf right now." },
  { title: "Blog", tag: "Page", url: "blog.html", snippet: "Build logs, finished parts, and whatever's on the plate this week." },
  { title: "First product drop: the bushing set is live", tag: "Blog", url: "blog/first-drop.html", snippet: "From a one-off fix to a listed product — the story behind the first release." },
  { title: "Materials price book", tag: "Pricing", url: "pricing.html#materials", snippet: "PLA, PETG, ABS, ASA, TPU, PET-CF17, ASA-GF, PPA-CF — cost per gram." },
  { title: "Bambu Lab A1", tag: "Equipment", url: "equipment.html#printers", snippet: "256×256×256mm, the general-purpose PLA/PETG workhorse." },
  { title: "Bambu Lab P1P", tag: "Equipment", url: "equipment.html#printers", snippet: "256×256×256mm CoreXY — handles the TPU jobs." },
  { title: "Bambu Lab H2S / H2C", tag: "Equipment", url: "equipment.html#printers", snippet: "Enclosed, high-temp printers for ABS, ASA, and composite filament." },
  { title: "Creality K1 Max", tag: "Equipment", url: "equipment.html#printers", snippet: "300×300×300mm — the printer for oversized parts and plates." },
  { title: "Revopoint MetroY Pro 3D scanner", tag: "Equipment", url: "equipment.html#scanner", snippet: "Blue-laser scanning for reverse-engineering exact-fit parts." },
  { title: "Get a price estimate", tag: "Tool", url: "pricing.html#estimator", snippet: "Pick a material and print time to see a rough quote instantly." },
];
const IN_SUBFOLDER = /\/blog\//.test(window.location.pathname);

function initSearch() {
  const openBtns = document.querySelectorAll("[data-search-open]");
  const overlay = document.getElementById("search-overlay");
  if (!overlay) return;
  const input = document.getElementById("search-input");
  const resultsEl = document.getElementById("search-results");
  const closeBtn = overlay.querySelector(".search-close");

  const open = () => {
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    setTimeout(() => input.focus(), 10);
    render("");
  };
  const close = () => {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  openBtns.forEach((b) => b.addEventListener("click", open));
  closeBtn && closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement.tagName !== "INPUT" && !overlay.classList.contains("is-open")) {
      e.preventDefault();
      open();
    }
    if (e.key === "Escape") close();
  });

  function render(query) {
    const q = query.trim().toLowerCase();
    const matches = !q
      ? SEARCH_INDEX
      : SEARCH_INDEX.filter((item) =>
          (item.title + " " + item.snippet + " " + item.tag).toLowerCase().includes(q)
        );

    if (!matches.length) {
      resultsEl.innerHTML = `<div class="search-empty">No matches for "${escapeHtml(query)}" — try a different word, or email direct.</div>`;
      return;
    }
    resultsEl.innerHTML = matches
      .map((item) => {
        const href = (IN_SUBFOLDER ? "../" : "") + item.url;
        return `
      <a href="${href}">
        <span class="search-result-tag">${item.tag}</span>
        <div class="search-result-title">${item.title}</div>
        <div class="search-result-snippet">${item.snippet}</div>
      </a>`;
      })
      .join("");
  }

  input.addEventListener("input", (e) => render(e.target.value));
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ---------------- product gallery (shop page) ---------------- */
function initGallery() {
  const main = document.getElementById("gallery-main");
  const thumbs = document.querySelectorAll(".gallery-thumb");
  if (!main || !thumbs.length) return;
  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const src = thumb.getAttribute("data-full");
      const alt = thumb.getAttribute("data-alt") || "";
      main.src = src;
      main.alt = alt;
      thumbs.forEach((t) => t.classList.remove("is-active"));
      thumb.classList.add("is-active");
    });
  });
}

/* ---------------- pricing estimator ----------------
   Mirrors the shop's real quote workbook:
   materials ($/gram) + 5% material markup
   + machine time ($/hr by category)
   + 5% production contingency on (materials + markup + machine time)
   + hands-on labor ($/hr by service)
   + dryer equipment ($0.25/hr)
   + $5 minimum order floor before shipping/tax
   Numbers below are the shop's current posted rates —
   update assets/js/main.js if rates change. */
const RATES = {
  materials: [
    { name: "Bambu PLA Basic / Matte", perGram: 0.01999 },
    { name: "Bambu PETG / PETG HF", perGram: 0.01999 },
    { name: "Overture ASA / Bambu ABS", perGram: 0.01999 },
    { name: "SUNLU TPU 95A", perGram: 0.03099 },
    { name: "Polymaker PET-CF17 (composite)", perGram: 0.04998 },
    { name: "iSANMATE ASA-GF (composite)", perGram: 0.02999 },
    { name: "Siraya Tech PPA-CF (high-temp)", perGram: 0.05949 },
  ],
  machine: [
    { name: "PLA / PETG", perHour: 1.75 },
    { name: "ABS / ASA", perHour: 2.5 },
    { name: "TPU", perHour: 2.25 },
    { name: "Composite (CF / GF)", perHour: 3.0 },
    { name: "PPA-CF", perHour: 3.5 },
  ],
  services: [
    { name: "Setup / slicing", perHour: 5 },
    { name: "3D scanning", perHour: 25 },
    { name: "Scan cleanup", perHour: 10 },
    { name: "CAD / reverse engineering", perHour: 25 },
    { name: "Finishing / assembly", perHour: 10 },
  ],
  materialMarkup: 0.05,
  contingency: 0.05,
  dryerPerHour: 0.25,
  minimumOrder: 5,
};

function initCalculator() {
  const form = document.getElementById("estimator-form");
  if (!form) return;

  const materialSel = document.getElementById("est-material");
  const machineSel = document.getElementById("est-machine");
  RATES.materials.forEach((m, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${m.name} — $${m.perGram.toFixed(5)}/g`;
    materialSel.appendChild(opt);
  });
  RATES.machine.forEach((m, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${m.name} — $${m.perHour.toFixed(2)}/hr`;
    machineSel.appendChild(opt);
  });
  // Default to TPU, since that's the shop's current flagship material
  materialSel.value = RATES.materials.findIndex((m) => m.name.includes("TPU 95A"));
  machineSel.value = RATES.machine.findIndex((m) => m.name === "TPU");

  const gramsInput = document.getElementById("est-grams");
  const hoursInput = document.getElementById("est-hours");
  const serviceSel = document.getElementById("est-service");
  const serviceHoursInput = document.getElementById("est-service-hours");
  const shippingInput = document.getElementById("est-shipping");

  RATES.services.forEach((s, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${s.name} — $${s.perHour}/hr`;
    serviceSel.appendChild(opt);
  });
  const noneOpt = document.createElement("option");
  noneOpt.value = "-1";
  noneOpt.textContent = "None";
  noneOpt.selected = true;
  serviceSel.insertBefore(noneOpt, serviceSel.firstChild);

  const out = {
    materials: document.getElementById("out-materials"),
    markup: document.getElementById("out-markup"),
    machine: document.getElementById("out-machine"),
    contingency: document.getElementById("out-contingency"),
    labor: document.getElementById("out-labor"),
    shipping: document.getElementById("out-shipping"),
    total: document.getElementById("out-total"),
  };

  function calc() {
    const grams = parseFloat(gramsInput.value) || 0;
    const hours = parseFloat(hoursInput.value) || 0;
    const serviceHours = parseFloat(serviceHoursInput.value) || 0;
    const shipping = parseFloat(shippingInput.value) || 0;

    const material = RATES.materials[materialSel.value];
    const machine = RATES.machine[machineSel.value];
    const serviceIdx = parseInt(serviceSel.value, 10);
    const service = serviceIdx >= 0 ? RATES.services[serviceIdx] : null;

    const materialsSubtotal = grams * material.perGram;
    const markup = materialsSubtotal * RATES.materialMarkup;
    const machineSubtotal = hours * machine.perHour;
    const contingency = (materialsSubtotal + markup + machineSubtotal) * RATES.contingency;
    const laborSubtotal = service ? serviceHours * service.perHour : 0;

    let calculated = materialsSubtotal + markup + machineSubtotal + contingency + laborSubtotal;
    const topUp = Math.max(0, RATES.minimumOrder - calculated);
    calculated += topUp;

    const total = calculated + shipping;

    out.materials.textContent = money(materialsSubtotal);
    out.markup.textContent = money(markup);
    out.machine.textContent = money(machineSubtotal);
    out.contingency.textContent = money(contingency);
    out.labor.textContent = money(laborSubtotal);
    out.shipping.textContent = money(shipping);
    out.total.textContent = money(total);
  }

  function money(n) {
    return "$" + n.toFixed(2);
  }

  form.addEventListener("input", calc);
  calc();
}
