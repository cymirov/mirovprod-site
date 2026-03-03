
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

/* Preloader
  Hide preloader reliably.
  Using only window 'load' can keep the preloader forever when heavy media
  (e.g., background video) delays the load event.
*/
function hidePreloader(){
  const pre = $('#preloader');
  if (!pre) return;
  if (pre.dataset.done === '1') return;
  pre.dataset.done = '1';
  // Keep the original feel (short delay), but never block entering the site.
  setTimeout(() => {
    pre.classList.add('is-done');
    setTimeout(() => pre.remove(), 650);
  }, 250);
}
document.addEventListener('DOMContentLoaded', hidePreloader);
addEventListener('load', hidePreloader);
setTimeout(hidePreloader, 4000);

/* Cursor */
const cursor = $('#cursor');
let mx = innerWidth/2, my = innerHeight/2;
let cx = mx, cy = my;
function raf(){
  cx += (mx - cx) * 0.18;
  cy += (my - cy) * 0.18;
  if (cursor) cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
addEventListener('mousemove', (e)=>{
  mx=e.clientX; my=e.clientY;
  document.body.classList.add('hasCursor');
});
addEventListener('mouseover', (e)=>{
  const h = e.target.closest('a,button,.card,.work,video,.chip,.pill,.pillBtn');
  cursor?.classList.toggle('isHover', !!h);
});

/* Modal */
const modal = $('#modal');
const modalContent = $('#modalContent');
function openModal(html){
  if (!modal || !modalContent) return;
  modalContent.innerHTML = html;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = '';
  if (modalContent) modalContent.innerHTML = '';
}
document.addEventListener('click', (e)=>{
  if (e.target && e.target.matches && e.target.matches('[data-close="1"]')) closeModal();
});
addEventListener('keydown', (e)=>{ if (e.key === 'Escape') closeModal(); });

/* Data placeholders */
const LANG = (document.documentElement.getAttribute('lang') || 'ru').toLowerCase().startsWith('en') ? 'en' : 'ru';

const casesRu = [
  {
    id: "rhythm-cut",
    type: "REELS",
    title: "REELS",
    desc: "",
    year: "2025",
    ctaText: "СМОТРЕТЬ ВИДЕО - КЛИК",
    ctaUrl: "https://www.instagram.com/reel/DS0LDI1AYJT/?igsh=MW5nNDhjb202MDc1Ng==",
    // Optional poster (used only where explicitly applied)
    poster: './assets/mix.jpg',
    video: './assets/mix_vid.mp4'
  },
  {
    id: "clean-motion",
    type: "YOUTUBE",
    title: "youtube video",
    desc: "",
    year: "2025",
    ctaText: "СМОТРЕТЬ ВИДЕО - КЛИК",
    ctaUrl: "https://youtu.be/hA8G5i5jttQ?si=Ca_qMUJtCU2wtr6j",
    youtubeId: "hA8G5i5jttQ"
  },
  {
    id: "story-edit",
    type: "YOUTUBE",
    title: "Story edit",
    desc: "Структура · паузы · разгон · удержание.",
    year: "2026"
  },
  {
    id: "brand-pack",
    type: "REELS",
    title: "Brand pack",
    desc: "Серия роликов в одном стиле.",
    year: "2026"
  }
];

const casesEn = [
  {
    id: "rhythm-cut",
    type: "REELS",
    title: "REELS",
    desc: "",
    year: "2025",
    ctaText: "СМОТРЕТЬ ВИДЕО - КЛИК",
    ctaUrl: "https://www.instagram.com/reel/DS0LDI1AYJT/?igsh=MW5nNDhjb202MDc1Ng==",
    // Optional poster (used only where explicitly applied)
    poster: './assets/mix.jpg',
    video: './assets/mix_vid.mp4'
  },
  {
    id: "clean-motion",
    type: "YOUTUBE",
    title: "youtube video",
    desc: "",
    year: "2025",
    ctaText: "СМОТРЕТЬ ВИДЕО - КЛИК",
    ctaUrl: "https://youtu.be/hA8G5i5jttQ?si=Ca_qMUJtCU2wtr6j",
    youtubeId: "hA8G5i5jttQ"
  },
  {
    id: "story-edit",
    type: "YOUTUBE",
    title: "Story edit",
    desc: "Structure · pauses · buildup · retention.",
    year: "2026"
  },
  {
    id: "brand-pack",
    type: "REELS",
    title: "Brand pack",
    desc: "A series of videos in one style.",
    year: "2026"
  }
];

const cases = LANG === 'en' ? casesEn : casesRu;

/* Works page data (separate from Home featured cases) */
const worksCasesRu = [
  { id:"mix2",      type:"reels",   kind:"event",        title:"reels",        year:"2025", ctaText:"Первый ролик из 2-х, который Михаил не выложил", ctaUrl:"", poster:"./assets/mix2_prev.jpg", video:"./assets/mix2_vid.mp4" },
  { id:"radick",    type:"reels",   kind:"promo",        title:"reels",        year:"2025", ctaText:"СМОТРЕТЬ ВИДЕО - КЛИК", ctaUrl:"https://www.instagram.com/reel/DPLU_HOES0N/?igsh=MWFmemkyaHF5cXgwOQ==", poster:"./assets/radick_prev.jpg", video:"./assets/radick_vid.mp4", also:["motion"] },
  { id:"cleanmotion", type:"youtube", kind:"YOUTUBE",     title:"youtube video", year:"2025", ctaText:"СМОТРЕТЬ ВИДЕО - КЛИК", ctaUrl:"https://youtu.be/hA8G5i5jttQ?si=Ca_qMUJtCU2wtr6j", youtubeId:"hA8G5i5jttQ", poster:"./assets/def.jpg", also:["motion"] },
  { id:"trad",      type:"reels",   kind:"talking head", title:"reels",        year:"2025", ctaText:"СМОТРЕТЬ ВИДЕО - КЛИК", ctaUrl:"https://www.instagram.com/reel/DUATbnojKyX/?igsh=OWpmd2c5YnFxMHph", poster:"./assets/trad_prev.jpg", video:"./assets/trad_vid.mp4" },
  { id:"wrapcar",   type:"reels",   kind:"talking head", title:"reels",        year:"2025", ctaText:"СМОТРЕТЬ ВИДЕО - КЛИК", ctaUrl:"https://www.instagram.com/reel/DQcE-XFDDbB/?igsh=aDE5eXBmdjVtNzZo", poster:"./assets/wrapcar_prev.jpg", video:"./assets/wrapcar_vid.mp4" },
  { id:"mirov",     type:"motion",  kind:"just motion",  title:"motion",       year:"2025", ctaText:"", ctaUrl:"", poster:"./assets/mirov_prev.jpg", video:"./assets/mirov_vid.mp4" },
  { id:"mont",      type:"motion",  kind:"just motion",  title:"motion",       year:"2025", ctaText:"", ctaUrl:"", poster:"./assets/mont_prev.jpg", video:"./assets/mont_vid.mp4" },
  { id:"vm_test",   type:"motion",  kind:"motion reels", title:"motion",       year:"2025", ctaText:"", ctaUrl:"", poster:"./assets/vm_test_prev.jpg", video:"./assets/vm_test_vid.mp4", also:["reels"] }
];

const worksCasesEn = [
  { id:"mix2",      type:"reels",   kind:"event",        title:"reels",        year:"2025", ctaText:"First of two videos that Mikhail didn’t publish", ctaUrl:"", poster:"./assets/mix2_prev.jpg", video:"./assets/mix2_vid.mp4" },
  { id:"radick",    type:"reels",   kind:"promo",        title:"reels",        year:"2025", ctaText:"WATCH VIDEO — CLICK", ctaUrl:"https://www.instagram.com/reel/DPLU_HOES0N/?igsh=MWFmemkyaHF5cXgwOQ==", poster:"./assets/radick_prev.jpg", video:"./assets/radick_vid.mp4", also:["motion"] },
  { id:"cleanmotion", type:"youtube", kind:"YOUTUBE",     title:"youtube video", year:"2025", ctaText:"WATCH VIDEO — CLICK", ctaUrl:"https://youtu.be/hA8G5i5jttQ?si=Ca_qMUJtCU2wtr6j", youtubeId:"hA8G5i5jttQ", poster:"./assets/def.jpg", also:["motion"] },
  { id:"trad",      type:"reels",   kind:"talking head", title:"reels",        year:"2025", ctaText:"WATCH VIDEO — CLICK", ctaUrl:"https://www.instagram.com/reel/DUATbnojKyX/?igsh=OWpmd2c5YnFxMHph", poster:"./assets/trad_prev.jpg", video:"./assets/trad_vid.mp4" },
  { id:"wrapcar",   type:"reels",   kind:"talking head", title:"reels",        year:"2025", ctaText:"WATCH VIDEO — CLICK", ctaUrl:"https://www.instagram.com/reel/DQcE-XFDDbB/?igsh=aDE5eXBmdjVtNzZo", poster:"./assets/wrapcar_prev.jpg", video:"./assets/wrapcar_vid.mp4" },
  { id:"mirov",     type:"motion",  kind:"just motion",  title:"motion",       year:"2025", ctaText:"", ctaUrl:"", poster:"./assets/mirov_prev.jpg", video:"./assets/mirov_vid.mp4" },
  { id:"mont",      type:"motion",  kind:"just motion",  title:"motion",       year:"2025", ctaText:"", ctaUrl:"", poster:"./assets/mont_prev.jpg", video:"./assets/mont_vid.mp4" },
  { id:"vm_test",   type:"motion",  kind:"motion reels", title:"motion",       year:"2025", ctaText:"", ctaUrl:"", poster:"./assets/vm_test_prev.jpg", video:"./assets/vm_test_vid.mp4", also:["reels"] }
];

const worksCases = LANG === 'en' ? worksCasesEn : worksCasesRu;

// Works page must include one featured item from Home to make 9 items.
// (Keep it minimal: only add the specific case, no placeholders.)
const featuredForWorks = cases.find(c => String(c.id) === 'rhythm-cut');
const worksCasesAll = (() => {
  const merged = featuredForWorks ? [...worksCases, featuredForWorks] : worksCases.slice();
  const seen = new Set();
  const keyOf = (c) => {
    if (c.youtubeId) return `yt:${String(c.youtubeId)}`;
    if (c.video) return `v:${String(c.video)}`;
    if (c.ctaUrl) return `u:${String(c.ctaUrl)}`;
    return `id:${String(c.id)}`;
  };
  return merged.filter(c => {
    const k = keyOf(c);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
})();

// Default poster is used for video modals / Works page only.
// (Home "4 cases" grid shows a poster only when explicitly provided.)
const DEFAULT_POSTER_WORKS = './assets/defolt_prev.jpg';
const SLOT1_POSTER = './assets/mix.jpg';
const SLOT2_POSTER = './assets/def.jpg';
// Works page should show 9 items.
const worksLayout = [
  { span:'s7' }, { span:'s5' },
  { span:'s4' }, { span:'s8' },
  { span:'s6' }, { span:'s6' },
  { span:'s6' }, { span:'s6' },
  { span:'s6' },
];

function esc(s){
  return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'","&#039;");
}

/* Render cases */
const casesGrid = $('#casesGrid');
if (casesGrid){
  // Main page: show only 2 featured cases (01 and 02).
  // Keep the same asymmetric spans so the section still feels designed.
  const layout = [
    { id:1, span:'span7' },
    { id:2, span:'span5' },
  ];
  casesGrid.innerHTML = '';
  layout.forEach(cell => {
    const c = cases[cell.id-1] || cases[0];
    const el = document.createElement('article');
    el.className = `card ${cell.span}`;
    // Only the 1st card in the 4-case block uses a preview image.
    // Others stay clean (no image) so you don't need to prepare multiple aspect-ratio previews.
    const posterSrc = (cell.id === 1) ? SLOT1_POSTER : (cell.id === 2) ? SLOT2_POSTER : '';
    // Main page 4-case block: show only the preview and the index number (no captions).
    el.innerHTML = `
      ${posterSrc ? `<img src="${esc(posterSrc)}" alt="">` : ''}
      <div class="card__shade"></div>
      <div class="card__meta">
        <span>[ ${String(cell.id).padStart(2,'0')} ]</span>
        <span></span>
      </div>
    `;
    el.addEventListener('click', ()=>{
      const badges = [c.client, c.type, c.year]
        .filter(v => v && String(v).toLowerCase() !== 'undefined')
        .map(v => `<span class="badgeD">${esc(v)}</span>`)
        .join('');

      const cta = c.ctaUrl
        ? `<a class="modalLink" href="${esc(c.ctaUrl)}" target="_blank" rel="noopener">${esc(c.ctaText || 'OPEN LINK')}</a>`
        : (c.ctaText ? esc(c.ctaText) : '');
const descHtml = c.desc ? `${esc(c.desc)}<br><br>` : '';

      openModal(`
        <h3 class="modalTitle">${esc(c.title)}</h3>
        <div class="badgesRow">${badges}</div>
        ${c.youtubeId ? `
        <div class="modalVideo isEmbed">
          <iframe src="https://www.youtube.com/embed/${esc(c.youtubeId)}?rel=0&modestbranding=1&playsinline=1" title="${esc(c.title)}" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        ` : `
        <div class="modalVideo">
          <video controls playsinline preload="metadata" poster="${esc(c.poster || DEFAULT_POSTER_WORKS)}">
            <source src="${esc(c.video || '')}" type="video/mp4">
          </video>
        </div>
        `}
        <p class="modalText">${cta}</p>
      `);
    });
    casesGrid.appendChild(el);
  });
}

/* Works page */
const worksGrid = $('#worksGrid');
if (worksGrid){
  const btns = $$('#filters [data-filter]');

  // helper to create one work card
  const makeWork = (c, span) => {
    const el = document.createElement('article');
    el.className = `work ${span}`;
    el.dataset.type = c.type;

    el.innerHTML = `
      <img src="${esc(c.poster || DEFAULT_POSTER_WORKS)}" alt="">
      <div class="work__shade"></div>
      <div class="work__info">
        <!-- No captions on preview: keep only the year -->
        <div class="work__top"><span></span><span>${esc(c.year || '')}</span></div>
      </div>
    `;

    el.addEventListener('click', ()=>{
      const badges = [c.client, c.type, c.year]
        .filter(v => v && String(v).toLowerCase() !== 'undefined')
        .map(v => `<span class="badgeD">${esc(v)}</span>`)
        .join('');
      const cta = c.ctaUrl
        ? `<a class="modalLink" href="${esc(c.ctaUrl)}" target="_blank" rel="noopener">${esc(c.ctaText || 'OPEN LINK')}</a>`
        : (c.ctaText ? esc(c.ctaText) : '');

      const descHtml = c.desc ? `${esc(c.desc)}<br><br>` : '';

      openModal(`
        <h3 class="modalTitle">${esc(c.title)}</h3>
        <div class="badgesRow">${badges}</div>
        ${c.youtubeId ? `
        <div class="modalVideo isEmbed">
          <iframe src="https://www.youtube.com/embed/${esc(c.youtubeId)}?rel=0&modestbranding=1&playsinline=1" title="${esc(c.title)}" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        ` : (c.video ? `
        <div class="modalVideo">
          <video controls playsinline preload="metadata" poster="${esc(c.poster || DEFAULT_POSTER_WORKS)}">
            <source src="${esc(c.video)}" type="video/mp4">
          </video>
        </div>
        ` : ``)}
        <p class="modalText">${descHtml}${cta}</p>
      `);
    });

    return el;
  };

  let activeFilter = 'all';
  let renderTimer = null;

  const renderWorks = (filter) => {
    activeFilter = filter || 'all';
    const list = (activeFilter === 'all')
      ? worksCasesAll.slice()
      : worksCasesAll.filter(c => {
          const t = String(c.type||'').toLowerCase();
          if (t === activeFilter) return true;
          return Array.isArray(c.also) && c.also.map(x=>String(x).toLowerCase()).includes(activeFilter);
        });

    // graceful when empty
    const cells = worksLayout.slice(0, list.length);

    worksGrid.innerHTML = '';
    cells.forEach((cell, i) => {
      const c = list[i];
      const el = makeWork(c, cell.span);
      el.classList.add('is-enter');
      worksGrid.appendChild(el);
      // next frame -> animate in
      requestAnimationFrame(()=>{
        requestAnimationFrame(()=> el.classList.remove('is-enter'));
      });
    });

    // If there are no items, show a tiny hint
    if (!list.length){
      const empty = document.createElement('div');
      empty.className = 'muted no-reveal';
      empty.style.padding = '28px 0';
      empty.textContent = 'Пока нет работ в этой категории.';
      worksGrid.appendChild(empty);
    }
  };

  const animateTo = (filter) => {
    // cancel pending
    if (renderTimer) { clearTimeout(renderTimer); renderTimer = null; }

    // exit animation for current cards
    const cards = Array.from(worksGrid.querySelectorAll('.work'));
    cards.forEach((el, idx) => {
      el.style.transitionDelay = `${Math.min(140, idx*10)}ms`;
      el.classList.add('is-exit');
    });
    worksGrid.classList.add('is-fading');

    // after exit, re-render new set and fade-in via is-enter
    renderTimer = setTimeout(()=>{
      worksGrid.classList.remove('is-fading');
      renderWorks(filter);
      // clear per-card delay so hover feels snappy
      requestAnimationFrame(()=>{
        Array.from(worksGrid.querySelectorAll('.work')).forEach(el => el.style.transitionDelay = '0ms');
      });
    }, 220);
  };

  // init
  renderWorks('all');

  btns.forEach(b => b.addEventListener('click', ()=>{
    btns.forEach(x=>x.classList.remove('is-active'));
    b.classList.add('is-active');
    const f = b.dataset.filter;
    if (f === activeFilter) return;
    animateTo(f);
  }));
}
/* ===== Auto scroll-reveal (subtle, like ref) ===== */
(function initAutoReveal(){
  const selector = [
    "h1","h2","h3","p","li",
    "a","button",
    "figure","figcaption",
    ".kicker",".aboutBig",".fact",".skill",
    ".thumb",".cap",".item",".wItem",
    ".chip",".footerPill",".pillBtn",".pillLink",
    ".heroBtn",".heroTop__meta",".heroTop__nav",
    ".worksTitle",".filters"
  ].join(",");

  const nodes = Array.from(document.querySelectorAll(selector))
    .filter(el => !el.closest(".modal"))
    .filter(el => !el.classList.contains("no-reveal"));

  nodes.forEach((el, i) => {
    el.classList.add("reveal");
    const delay = Math.min(260, i * 14);
    el.style.transitionDelay = `${delay}ms`;
    if (i % 7 === 0) el.classList.add("r-fast");
    if (i % 11 === 0) el.classList.add("r-slow");
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    });
  }, {
    threshold: 0.14,
    rootMargin: "0px 0px -12% 0px"
  });

  nodes.forEach(el => io.observe(el));
})();


/* ===== Ref-style accordion (philosophy) ===== */
(function initRefAccordion(){
  const list = document.querySelector('[data-accordion="philosophy"]');
  if (!list) return;

  const rows = Array.from(list.querySelectorAll('.refRow'));
  const closeRow = (row) => {
    row.classList.remove('is-open');
    const btn = row.querySelector('.refHead');
    const body = row.querySelector('.refBody');
    if (btn) btn.setAttribute('aria-expanded','false');
    if (body) body.style.height = '0px';
  };
  const openRow = (row) => {
    row.classList.add('is-open');
    const btn = row.querySelector('.refHead');
    const body = row.querySelector('.refBody');
    if (btn) btn.setAttribute('aria-expanded','true');
    if (body){
      const inner = body.querySelector('.refBody__inner');
      const h = inner ? inner.getBoundingClientRect().height : 0;
      body.style.height = h + 'px';
    }
  };

  // init heights: keep first open if marked
  rows.forEach(r => {
    const body = r.querySelector('.refBody');
    if (!body) return;
    if (r.classList.contains('is-open')){
      const inner = body.querySelector('.refBody__inner');
      const h = inner ? inner.getBoundingClientRect().height : 0;
      body.style.height = h + 'px';
    } else {
      body.style.height = '0px';
    }
  });

  // click
  list.addEventListener('click', (e) => {
    const btn = e.target.closest('.refHead');
    if (!btn) return;
    const row = btn.closest('.refRow');
    if (!row) return;

    const isOpen = row.classList.contains('is-open');
    // single-open behavior
    rows.forEach(r => r !== row && closeRow(r));
    if (isOpen) closeRow(row);
    else openRow(row);
  });

  // keep heights on resize
  addEventListener('resize', () => {
    rows.forEach(r => {
      if (!r.classList.contains('is-open')) return;
      const body = r.querySelector('.refBody');
      const inner = body?.querySelector('.refBody__inner');
      if (body && inner){
        body.style.height = inner.getBoundingClientRect().height + 'px';
      }
    });
  });
})();


/* ===== SegBar animate on view ===== */
(function initSegBar(){
  const bars = Array.from(document.querySelectorAll('.segBar'));
  if (!bars.length) return;

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (!e.isIntersecting) return;
      const el = e.target;
      // small delay like ref
      const delay = parseInt(el.getAttribute('data-delay') || '120', 10);
      setTimeout(()=> el.classList.add('segBar--in'), delay);
      io.unobserve(el);
    });
  }, { threshold: 0.35, rootMargin: "0px 0px -10% 0px" });

  bars.forEach((b,i)=>{
    // optional per-bar stagger if ever multiple
    b.setAttribute('data-delay', String(120 + i*80));
    io.observe(b);
  });
})();

