/* ===================================================================
   Crumb & Co. — page behaviour
   -------------------------------------------------------------------
   Reads CONFIG (config.js) and builds: the contact links, the Fresh
   Today strip, the service cards, the hours table, the open/closed
   pill and the footer. No business information lives in this file —
   edit config.js instead.
   =================================================================== */

/* ---- Inline icons — no external requests --------------------------- */
const ICONS = {
  bread: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 11c0-3.3 3.6-6 8-6s8 2.7 8 6c0 1.4-1.1 2.5-2.5 2.5H17V17a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-3.5h-.5A2.5 2.5 0 0 1 4 11Z"/><path d="M9 8.5v3M12 8.2v3.3M15 8.5v3"/></svg>',
  cake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 20h16v-5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v5Z"/><path d="M4 16.6c1.6 1.4 3.4 1.4 5 0s3.4-1.4 5 0 3.4 1.4 5 0"/><path d="M12 9V6.2"/><circle cx="12" cy="4.6" r="1.2"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5Z"/><path d="M3 8.5v7L12 20l9-4.5v-7"/><path d="M12 13v7"/></svg>',
  coffee: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 9h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9Z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 3v2.5M12 3v2.5"/></svg>',
  wa: '<svg class="ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5v-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.6 4c2.2.9 2.2.6 2.6.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"/></svg>',
  phone: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  instagram: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none"/></svg>'
};

/* ---- Illustrations -------------------------------------------------
   Drawn pictures for the Fresh Today strip, one per item. Each is the
   inside of an <svg viewBox="0 0 120 90"> — no wrapper, so the same
   markup can be scaled and reused inside the hero display case.

   Food keeps fixed warm colours (bread is bread in both themes); only
   the surrounding card takes its colour from the CSS tokens.
   -------------------------------------------------------------------- */
const ART = {
  /* Scoring runs as parallel diagonal cuts — a symmetrical arc across the
     middle reads as a smile, which is not the look we want. */
  sourdough:
    '<ellipse cx="60" cy="58" rx="41" ry="26" fill="#B4762F"/>' +
    '<ellipse cx="60" cy="52" rx="39" ry="24" fill="#D79B51"/>' +
    '<ellipse cx="58" cy="45" rx="31" ry="16" fill="#E7B776"/>' +
    '<g stroke-linecap="round" fill="none">' +
      '<path d="M39 53c3-6 7-10 12-13" stroke="#F3D5A6" stroke-width="5"/>' +
      '<path d="M40 55c3-6 7-10 12-13" stroke="#9C5F22" stroke-width="2.8"/>' +
      '<path d="M56 57c3-6 8-11 13-14" stroke="#F3D5A6" stroke-width="5"/>' +
      '<path d="M57 59c3-6 8-11 13-14" stroke="#9C5F22" stroke-width="2.8"/>' +
      '<path d="M73 55c3-5 7-9 11-12" stroke="#F3D5A6" stroke-width="5"/>' +
      '<path d="M74 57c3-5 7-9 11-12" stroke="#9C5F22" stroke-width="2.8"/>' +
    "</g>" +
    '<circle cx="48" cy="34" r="1.5" fill="#F7E6CB" opacity=".85"/>' +
    '<circle cx="72" cy="33" r="1.3" fill="#F7E6CB" opacity=".85"/>',

  /* Crescent body with tapered tips and segment seams. */
  croissant:
    '<path d="M14 68c-2-8 4-12 10-9 4 2 6 6 6 10z" fill="#C9873A"/>' +
    '<path d="M106 68c2-8-4-12-10-9-4 2-6 6-6 10z" fill="#C9873A"/>' +
    '<path d="M18 66C18 36 36 22 60 22s42 14 42 44c0 6-7 8-11 3-6-8-17-13-31-13s-25 5-31 13c-4 5-11 3-11-3z" fill="#C9873A"/>' +
    '<path d="M21 63C21 37 38 25 60 25s39 12 39 38c0 5-6 6-9 2-6-8-17-13-30-13s-24 5-30 13c-3 4-9 3-9-2z" fill="#E7A85B"/>' +
    '<g stroke="#C9873A" stroke-width="2.2" fill="none" stroke-linecap="round">' +
      '<path d="M38 62c-2-9 0-19 4-25"/>' +
      '<path d="M60 57V31"/>' +
      '<path d="M82 62c2-9 0-19-4-25"/>' +
    "</g>" +
    '<g stroke="#F6D8A8" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".85">' +
      '<path d="M50 34c6-3 14-3 20 0"/>' +
      '<path d="M31 48c2-5 5-9 8-11"/>' +
      '<path d="M89 48c-2-5-5-9-8-11"/>' +
    "</g>",

  babka:
    '<defs><clipPath id="babka-slice"><rect x="32" y="26" width="56" height="50" rx="7"/></clipPath></defs>' +
    '<g clip-path="url(#babka-slice)">' +
      '<rect x="32" y="26" width="56" height="50" fill="#EAC489"/>' +
      '<path d="M32 40c10 0 12-10 22-10s12 10 22 10 12-10 22-10" stroke="#4B2C18" stroke-width="7" fill="none"/>' +
      '<path d="M32 60c10 0 12-10 22-10s12 10 22 10 12-10 22-10" stroke="#4B2C18" stroke-width="7" fill="none"/>' +
      '<path d="M32 72c10 0 12-8 22-8s12 8 22 8" stroke="#4B2C18" stroke-width="5" fill="none" opacity=".85"/>' +
    "</g>" +
    '<rect x="32" y="26" width="56" height="50" rx="7" fill="none" stroke="#C08A4A" stroke-width="3"/>' +
    '<path d="M36 30c8-4 40-4 48 0" stroke="#D9A868" stroke-width="3" fill="none" stroke-linecap="round"/>',

  /* Spiral top, the way a knotted bun reads from above. */
  bun:
    '<ellipse cx="60" cy="56" rx="30" ry="26" fill="#B87731"/>' +
    '<ellipse cx="60" cy="52" rx="30" ry="26" fill="#DDA059"/>' +
    '<path d="M78 52a18 18 0 1 1-36 0 14 14 0 1 1 28 0 10 10 0 1 1-20 0 6 6 0 1 1 12 0" ' +
      'stroke="#B87731" stroke-width="3.4" fill="none" stroke-linecap="round"/>' +
    '<g fill="#FBF1E2">' +
      '<circle cx="47" cy="40" r="2.3"/><circle cx="70" cy="38" r="2.1"/>' +
      '<circle cx="76" cy="58" r="2.3"/><circle cx="49" cy="63" r="2.1"/>' +
      '<circle cx="61" cy="68" r="1.9"/>' +
    "</g>" +
    '<g fill="#8A551D" opacity=".55">' +
      '<circle cx="55" cy="45" r="1.2"/><circle cx="66" cy="55" r="1.1"/>' +
      '<circle cx="52" cy="56" r="1.1"/>' +
    "</g>",

  cookies:
    '<circle cx="44" cy="58" r="23" fill="#A9702C"/>' +
    '<circle cx="44" cy="56" r="22" fill="#C68A45"/>' +
    '<circle cx="76" cy="48" r="25" fill="#A9702C"/>' +
    '<circle cx="76" cy="46" r="24" fill="#D49A55"/>' +
    '<g fill="#8A551D">' +
      '<circle cx="70" cy="38" r="2.3"/><circle cx="84" cy="44" r="2.1"/>' +
      '<circle cx="74" cy="54" r="2.4"/><circle cx="63" cy="48" r="1.9"/>' +
      '<circle cx="86" cy="55" r="1.8"/><circle cx="38" cy="60" r="2"/>' +
      '<circle cx="49" cy="65" r="1.8"/>' +
    "</g>" +
    '<path d="M66 34c4 4 4 8 0 12" stroke="#E9BE85" stroke-width="1.8" fill="none" opacity=".7" stroke-linecap="round"/>',

  cake:
    '<rect x="26" y="52" width="68" height="26" rx="6" fill="#E5C79C"/>' +
    '<rect x="26" y="52" width="68" height="9" rx="4" fill="#FBEFE0"/>' +
    '<path d="M26 58c6 7 11 7 17 0s11-7 17 0 11 7 17 0 11-7 17 0" fill="#FBEFE0"/>' +
    '<rect x="38" y="32" width="44" height="22" rx="6" fill="#EFD5B0"/>' +
    '<path d="M38 38c5 6 9 6 14 0s9-6 14 0 9 6 14 0" fill="#FFF6EA"/>' +
    '<rect x="38" y="30" width="44" height="7" rx="3.5" fill="#FFF6EA"/>' +
    '<rect x="58" y="16" width="4.5" height="15" rx="2" fill="#C97B3C"/>' +
    '<path d="M60.2 8c4 4 4.5 7 0 9-4.5-2-4-5 0-9z" fill="#F0A93C"/>' +
    '<g fill="#7C8B6F">' +
      '<rect x="45" y="44" width="5" height="2.4" rx="1.2" transform="rotate(-20 45 44)"/>' +
      '<rect x="66" y="46" width="5" height="2.4" rx="1.2" transform="rotate(15 66 46)"/>' +
      '<rect x="34" y="66" width="5" height="2.4" rx="1.2" transform="rotate(12 34 66)"/>' +
      '<rect x="78" y="64" width="5" height="2.4" rx="1.2" transform="rotate(-14 78 64)"/>' +
    "</g>"
};

/* ---- Helpers ------------------------------------------------------- */
const $  = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const telHref = () => "tel:+" + CONFIG.phoneDigits;
const waHref = msg => "https://wa.me/" + CONFIG.phoneDigits + "?text=" + encodeURIComponent(msg);
const topicHref = topic => waHref(CONFIG.whatsappTopicMessage.replace("{topic}", topic));

const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const DAY_SHORT = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const WEEK_ORDER = [1,2,3,4,5,6,0]; // the table lists Monday first

const toMins = hhmm => {
  const bits = hhmm.split(":");
  return Number(bits[0]) * 60 + Number(bits[1]);
};
const fmt12 = mins => {
  const h = Math.floor(mins / 60), m = mins % 60;
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? h12 + suffix : h12 + ":" + String(m).padStart(2, "0") + suffix;
};
const rangeLabel = day => day ? fmt12(toMins(day.open)) + " – " + fmt12(toMins(day.close)) : "Closed";

/* Weekday + minutes since midnight — the visitor's own clock by
   default, or CONFIG.timezone when one is set. */
function nowParts() {
  const d = new Date();
  if (CONFIG.timezone) {
    try {
      const parts = {};
      new Intl.DateTimeFormat("en-US", {
        timeZone: CONFIG.timezone, weekday: "short",
        hour: "2-digit", minute: "2-digit", hour12: false
      }).formatToParts(d).forEach(p => { parts[p.type] = p.value; });
      let h = Number(parts.hour); if (h === 24) h = 0;
      return { day: DAY_SHORT.indexOf(parts.weekday), mins: h * 60 + Number(parts.minute) };
    } catch (e) { /* unknown zone — fall through to local time */ }
  }
  return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
}

/* ---- Shared business info (top bar, hero, address, directions) ------ */
function bindBasics() {
  $$('[data-bind="name"]').forEach(n => { n.textContent = CONFIG.name; });
  $$('[data-bind="tagline"]').forEach(n => { n.textContent = CONFIG.tagline; });

  $$('[data-bind="tel"]').forEach(a => {
    a.href = telHref();
    a.setAttribute("aria-label", "Call " + CONFIG.name + " on " + CONFIG.phone);
  });
  $$('[data-bind="wa"]').forEach(a => {
    a.href = waHref(CONFIG.whatsappMessage);
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("aria-label", "Order from " + CONFIG.name + " on WhatsApp");
  });

  const a = CONFIG.address;
  $('[data-bind="address-line"]').textContent = a.line;
  $('[data-bind="address-city"]').textContent = a.city + ", " + a.region + " " + a.postalCode;
  $('[data-bind="parking"]').textContent = CONFIG.parking;

  const query = [CONFIG.name, a.line, a.city, a.region, a.postalCode].join(", ");
  const dir = $("#directions");
  dir.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
  dir.setAttribute("aria-label",
    "Get directions to " + CONFIG.name + ", " + a.line + " (opens Google Maps in a new tab)");
}

/* ---- Open / Closed pill -------------------------------------------- */
function renderPill() {
  const pill = $("#status-pill");
  const now = nowParts();
  const today = CONFIG.hours[now.day];
  let isOpen = false, status = "", detail = "";

  if (today && now.mins >= toMins(today.open) && now.mins < toMins(today.close)) {
    isOpen = true;
    status = "Open now";
    detail = "· until " + fmt12(toMins(today.close));
  } else if (today && now.mins < toMins(today.open)) {
    status = "Closed";
    detail = "· opens today at " + fmt12(toMins(today.open));
  } else {
    // Walk forward to the next day that has hours.
    let next = null;
    for (let i = 1; i <= 7; i++) {
      const d = (now.day + i) % 7;
      if (CONFIG.hours[d]) { next = { day: d, hours: CONFIG.hours[d] }; break; }
    }
    status = today ? "Closed" : "Closed " + DAY_NAMES[now.day] + "s";
    if (next) {
      const when = next.day === (now.day + 1) % 7 ? "tomorrow" : DAY_SHORT[next.day];
      detail = "· opens " + when + " at " + fmt12(toMins(next.hours.open));
    }
  }

  pill.className = "pill " + (isOpen ? "is-open" : "is-closed");
  pill.querySelector(".pill-copy").innerHTML =
    '<span class="status">' + esc(status) + '</span> ' +
    '<span class="detail">' + esc(detail) + "</span>";
}

/* ---- Fresh Today ---------------------------------------------------- */
/* Each item shows a picture: the drawn illustration from ART, or a real
   photograph when config.js gives that item a `photo` path. */
function itemPicture(item) {
  const label = esc(item.name) + " from " + esc(CONFIG.name);
  if (item.photo) {
    return '<img class="item-art" src="' + esc(item.photo) + '" alt="' + label +
           '" width="600" height="450" loading="lazy" decoding="async">';
  }
  return '<svg class="item-art" viewBox="0 0 120 90" role="img" aria-label="Illustration of ' +
         esc(item.name) + '"><title>Illustration of ' + esc(item.name) + "</title>" +
         (ART[item.art] || "") + "</svg>";
}

function renderFresh() {
  $("#fresh-strip").innerHTML = CONFIG.freshToday.map(item =>
    '<li class="item-card">' +
      '<span class="item-frame">' + itemPicture(item) + "</span>" +
      '<span class="item-name">' + esc(item.name) + "</span>" +
      (item.note ? '<span class="item-note">' + esc(item.note) + "</span>" : "") +
    "</li>"
  ).join("");
}

/* ---- What We Do ----------------------------------------------------- */
function renderServices() {
  $("#service-cards").innerHTML = CONFIG.services.map(s =>
    '<article class="card">' +
      '<div class="card-top">' +
        // The icon repeats what the heading already says, so it stays
        // decorative rather than announcing itself twice.
        '<span class="card-icon" aria-hidden="true">' + (ICONS[s.icon] || "") + "</span>" +
        '<div class="menu-line">' +
          "<h3>" + esc(s.title) + "</h3>" +
          '<p class="price-row"><span class="leader" aria-hidden="true"></span>' +
            '<span class="price">' + esc(s.price) + "</span></p>" +
        "</div>" +
      "</div>" +
      "<p>" + esc(s.desc) + "</p>" +
      '<a class="card-link" href="' + esc(topicHref(s.topic)) + '" target="_blank" rel="noopener" ' +
        'aria-label="Ask about ' + esc(s.title) + ' on WhatsApp">' +
        ICONS.wa + "Ask on WhatsApp</a>" +
    "</article>"
  ).join("");
}

/* ---- Hours table ---------------------------------------------------- */
function renderHours() {
  const todayIdx = nowParts().day;
  $("#hours-body").innerHTML = WEEK_ORDER.map(d => {
    const isToday = d === todayIdx;
    return "<tr" + (isToday ? ' class="today" aria-current="date"' : "") + ">" +
      '<th scope="row">' + DAY_NAMES[d] +
        (isToday ? '<span class="today-tag">Today</span>' : "") + "</th>" +
      "<td>" + rangeLabel(CONFIG.hours[d]) + "</td>" +
    "</tr>";
  }).join("");
}

/* ---- Footer --------------------------------------------------------- */
function renderFooter() {
  $("#foot-links").innerHTML =
    '<li><a href="' + telHref() + '" aria-label="Call ' + esc(CONFIG.name) + ' on ' +
      esc(CONFIG.phone) + '">' + ICONS.phone + esc(CONFIG.phone) + "</a></li>" +
    '<li><a href="' + esc(waHref(CONFIG.whatsappMessage)) + '" target="_blank" rel="noopener">' +
      ICONS.wa + "WhatsApp us</a></li>" +
    '<li><a href="https://instagram.com/' + esc(CONFIG.instagram) + '" target="_blank" rel="noopener" ' +
      'aria-label="' + esc(CONFIG.name) + ' on Instagram, @' + esc(CONFIG.instagram) + '">' +
      ICONS.instagram + "@" + esc(CONFIG.instagram) + "</a></li>";

  $("#copyright").textContent =
    "© " + new Date().getFullYear() + " " + CONFIG.name + " · Made in " + CONFIG.address.city + ".";
}

/* ---- Behaviours ----------------------------------------------------- */
function initStickyShadow() {
  const bar = $("#topbar");
  const onScroll = () => { bar.classList.toggle("is-stuck", window.scrollY > 8); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initReveal() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = $$(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    targets.forEach(t => t.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
  targets.forEach(t => io.observe(t));
}

/* ---- Boot ----------------------------------------------------------- */
bindBasics();
renderFresh();
renderServices();
renderHours();
renderFooter();
renderPill();
initStickyShadow();
initReveal();

// Keep the pill and the highlighted row honest without a reload.
setInterval(() => { renderPill(); renderHours(); }, 60000);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) { renderPill(); renderHours(); }
});
