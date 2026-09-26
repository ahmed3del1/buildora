// Shared bits: WhatsApp number, language handling, categories.
const BZ = {
  whatsapp: '201034168277',
  // Launch offer: change "left" as clients sign up; set active:false to hide it everywhere.
  offer: { active: true, percent: 30, total: 10, left: 10 },
  categories: {
    restaurants: { ar: 'مطاعم وكافيهات', en: 'Restaurants and cafés' },
    'real-estate': { ar: 'عقارات', en: 'Real estate' },
    retail: { ar: 'متاجر وعطور', en: 'Stores and perfumes' },
    fashion: { ar: 'أزياء', en: 'Fashion' },
    cars: { ar: 'سيارات', en: 'Cars' },
    clinics: { ar: 'عيادات وتجميل', en: 'Clinics and beauty' },
    services: { ar: 'خدمات وشركات', en: 'Services and companies' },
    fitness: { ar: 'رياضة ولياقة', en: 'Fitness' },
    education: { ar: 'تعليم وتدريب', en: 'Education' },
    events: { ar: 'فعاليات وسياحة', en: 'Events and travel' }
  }
};

BZ.getLang = function () {
  const q = new URLSearchParams(location.search).get('lang');
  if (q === 'ar' || q === 'en') return q;
  try { const s = localStorage.getItem('bz-lang'); if (s === 'ar' || s === 'en') return s; } catch (e) {}
  return 'ar';
};

BZ.setLang = function (lang, dict) {
  try { localStorage.setItem('bz-lang', lang); } catch (e) {}
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = dict[lang][el.dataset.i18n];
    if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const v = dict[lang][el.dataset.i18nPh];
    if (v !== undefined) el.placeholder = v;
  });
  document.querySelectorAll('.lang-btn').forEach(b => { b.textContent = lang === 'ar' ? 'EN' : 'عربي'; });
  if (dict[lang].title) document.title = dict[lang].title;
};

BZ.wa = function (text) {
  return 'https://wa.me/' + BZ.whatsapp + '?text=' + encodeURIComponent(text);
};

BZ.isNew = function (added) {
  if (!added) return false;
  return (Date.now() - new Date(added + 'T00:00:00').getTime()) / 864e5 < 3;
};

BZ.logoSVG = function (size, animated) {
  const b = '<g fill="#39FF88"><rect x="0" y="0" width="10" height="10" rx="1.5"/><rect x="12" y="0" width="10" height="10" rx="1.5"/><rect x="24" y="0" width="10" height="10" rx="1.5"/><rect x="0" y="12" width="10" height="10" rx="1.5"/><rect x="0" y="24" width="10" height="10" rx="1.5"/><rect x="12" y="24" width="10" height="10" rx="1.5"/><rect x="24" y="24" width="10" height="10" rx="1.5"/><rect x="0" y="36" width="10" height="10" rx="1.5"/><rect x="36" y="36" width="10" height="10" rx="1.5"/><rect x="0" y="48" width="10" height="10" rx="1.5"/><rect x="12" y="48" width="10" height="10" rx="1.5"/><rect x="24" y="48" width="10" height="10" rx="1.5"/></g>';
  if (!animated) {
    return '<svg width="' + size + '" height="' + Math.round(size * 58 / 46) + '" viewBox="0 0 46 58" aria-hidden="true">' + b + '<rect x="36" y="12" width="10" height="10" rx="1.5" fill="#39FF88"/></svg>';
  }
  return '<svg viewBox="-6 -26 80 90" aria-hidden="true">' + b +
    '<rect x="36" y="12" width="10" height="10" rx="1.5" fill="none" stroke="#39FF88" stroke-width="1" stroke-dasharray="2 2" opacity=".6"/>' +
    '<g class="dg"><rect x="36" y="12" width="10" height="10" rx="1.5" fill="#39FF88"/>' +
    '<path d="M42 18 L42 33 L46 29 L49 35 L51.5 34 L48.5 28 L54 28 Z" fill="#fff" stroke="#0A0A0A" stroke-width="1.2" stroke-linejoin="round"/></g></svg>';
};

BZ.esc = function (s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
};

// ---------- Meta Pixel ----------
// Paste the Pixel ID from Meta Events Manager here. Empty = pixel off.
BZ.pixelId = '1782171553025479';

BZ.track = function (event, params, custom) {
  if (!window.fbq) return;
  try { fbq(custom ? 'trackCustom' : 'track', event, params || {}); } catch (e) {}
};

(function initPixel() {
  if (!BZ.pixelId) return;
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', BZ.pixelId);
  fbq('track', 'PageView');

  // Every WhatsApp click is a lead; the button tells us which one.
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="https://wa.me"]');
    if (!a) return;
    const kind = a.id === 'orderBtn' ? 'demo_order' : (a.dataset.wa || 'whatsapp');
    const params = { content_category: kind };
    if (a.dataset.pkg) params.content_name = a.dataset.pkg;
    const d = new URLSearchParams(location.search).get('d');
    if (d) params.content_name = d;
    BZ.track(kind === 'general' || kind === 'whatsapp' ? 'Contact' : 'Lead', params);
  }, true);
})();
