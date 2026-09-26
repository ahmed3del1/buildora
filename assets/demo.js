// Demo viewer: loads a demo in an iframe and swaps its brand name for the visitor's business name.
(function () {
  const DICT = {
    ar: { title: 'Buildora | ديمو', name_lbl: 'اسم نشاطك', name_ph: '✍️ اكتب اسم نشاطك هنا', order: 'اطلب هذا الموقع',
      hint: 'اكتب اسم نشاطك فوق، وشوف الموقع يتغير باسمك 👆', copied: 'تم نسخ الرابط', missing: 'هذا الديمو غير موجود', back: 'ارجع للديموهات' },
    en: { title: 'Buildora | Demo', name_lbl: 'Business name', name_ph: '✍️ Type your business name', order: 'Order this site',
      hint: 'Type your business name above and watch the site change 👆', copied: 'Link copied', missing: 'This demo does not exist', back: 'Back to demos' }
  };

  const qs = new URLSearchParams(location.search);
  const slug = qs.get('d');
  let lang = BZ.getLang();
  let demo = null;
  let bizName = (qs.get('name') || '').slice(0, 40);

  const $ = id => document.getElementById(id);
  const frame = $('frame');
  const input = $('bizName');
  input.value = bizName;
  $('navLogo').innerHTML = BZ.logoSVG(20);
  $('loaderLogo').innerHTML = BZ.logoSVG(0, true);

  // ---------- Name swapping inside the iframe ----------
  const orig = new WeakMap();    // node -> original text from the demo
  const written = new WeakMap(); // node -> text we last wrote
  let patterns = [];
  let observer = null;
  let busy = false;

  function buildPatterns(terms) {
    const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Longest first so "Wadi Samar" wins over "Samar". Word-boundary on Arabic and Latin letters.
    return terms.slice().sort((a, b) => b.length - a.length).map(t =>
      new RegExp('(?<![\\u0600-\\u06FFA-Za-z])' + esc(t) + '(?![\\u0600-\\u06FFA-Za-z])', 'g'));
  }

  function swap(text) {
    if (!bizName) return text;
    let out = text;
    patterns.forEach(re => { out = out.replace(re, bizName); });
    return out;
  }

  function processNode(n) {
    const cur = n.nodeValue;
    if (!written.has(n) || written.get(n) !== cur) orig.set(n, cur); // demo changed it: treat as new original
    const next = swap(orig.get(n));
    if (next !== cur) n.nodeValue = next;
    written.set(n, n.nodeValue);
  }

  function pass() {
    let doc;
    try { doc = frame.contentDocument; } catch (e) { return; }
    if (!doc || !doc.body) return;
    busy = true;
    const w = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, {
      acceptNode: n => {
        const p = n.parentNode && n.parentNode.nodeName;
        return p === 'SCRIPT' || p === 'STYLE' || !n.nodeValue.trim() ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    let n;
    while ((n = w.nextNode())) processNode(n);
    if (doc.title) {
      if (!doc.__bzT || doc.__bzW !== doc.title) doc.__bzT = doc.title;
      doc.title = swap(doc.__bzT);
      doc.__bzW = doc.title;
    }
    busy = false;
  }

  let t = null;
  function schedule() { if (busy) return; clearTimeout(t); t = setTimeout(pass, 60); }

  function hookFrame() {
    let doc;
    try { doc = frame.contentDocument; } catch (e) { doc = null; }
    if (!doc || !doc.body) return; // cross-origin (e.g. opened from file://): demo still shows, just without the name swap
    pass();
    if (observer) observer.disconnect();
    observer = new MutationObserver(schedule);
    observer.observe(doc.body, { childList: true, subtree: true, characterData: true });
    setTimeout(pass, 800);
    setTimeout(pass, 2500);
  }

  // ---------- UI ----------
  function shareUrl() {
    const u = new URL('demo.html', location.href);
    u.searchParams.set('d', slug);
    if (bizName) u.searchParams.set('name', bizName);
    return u.toString();
  }

  function orderText() {
    const cat = (BZ.categories[demo.category] || { ar: '', en: '' })[lang];
    return lang === 'ar'
      ? 'أهلًا Buildora 👋\nأبغى موقع زي ديمو: ' + demo.name.ar + ' (' + cat + ')\nاسم النشاط: ' + (bizName || '') + '\nرابط الديمو: ' + shareUrl()
      : 'Hi Buildora 👋\nI want a website like the demo: ' + demo.name.en + ' (' + cat + ')\nBusiness name: ' + (bizName || '') + '\nDemo link: ' + shareUrl();
  }

  function refresh() {
    if (!demo) return;
    $('dName').textContent = demo.name[lang];
    $('dCat').textContent = (BZ.categories[demo.category] || { ar: '', en: '' })[lang];
    $('orderBtn').href = BZ.wa(orderText());
    history.replaceState(null, '', shareUrl().replace(/^.*\/demo\.html/, 'demo.html'));
  }

  function toast(msg) {
    const el = $('toast');
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 1800);
  }

  function applyLang() { BZ.setLang(lang, DICT); refresh(); }

  document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', () => { lang = lang === 'ar' ? 'en' : 'ar'; applyLang(); }));

  let personalized = false;
  input.addEventListener('input', () => {
    bizName = input.value.trim().slice(0, 40);
    if (!personalized && bizName.length > 2) { personalized = true; BZ.track('DemoPersonalized', { content_name: slug }, true); }
    $('hint').hidden = true;
    pass();
    refresh();
  });

  document.querySelectorAll('.seg button').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.seg button').forEach(x => x.setAttribute('aria-pressed', x === b));
    $('stage').classList.toggle('mobile', b.dataset.dev === 'mobile');
  }));

  $('shareBtn').addEventListener('click', async () => {
    const url = shareUrl();
    if (navigator.share) {
      try { await navigator.share({ title: 'Buildora', url }); return; } catch (e) { if (e.name === 'AbortError') return; }
    }
    try { await navigator.clipboard.writeText(url); toast(DICT[lang].copied); } catch (e) { prompt('', url); }
  });

  $('hintX').addEventListener('click', () => { $('hint').hidden = true; });

  frame.addEventListener('load', () => {
    hookFrame();
    $('loader').classList.add('hide');
    if (!bizName) $('hint').hidden = false;
  });

  applyLang();

  fetch('data/demos.json').then(r => r.json()).then(list => {
    demo = list.find(d => d.slug === slug);
    if (!demo) {
      $('loader').classList.add('hide');
      frame.remove();
      $('stage').insertAdjacentHTML('beforeend', '<div class="notfound">' + BZ.logoSVG(40) + '<b>' + DICT[lang].missing + '</b><a class="btn" href="index.html#demos">' + DICT[lang].back + '</a></div>');
      return;
    }
    patterns = buildPatterns(demo.replace || []);
    BZ.track('ViewContent', { content_name: demo.slug, content_category: demo.category });
    frame.src = 'demos/' + demo.slug + '/index.html';
    applyLang();
  });
})();
