// Home page: i18n, gallery, hero builder, WhatsApp links.
(function () {
  const EN = {
    title: 'Buildora | Professional web design',
    ob: 'Launch offer: 30% off for our first 10 clients, <b class="left-n">10</b> spots left', ob_cta: 'Claim your spot',
    h_pill: '🎁 Launch offer: <b>30%</b> off for the first 10 clients',
    h_cta1: 'Try your site with your name ↓', h_cta2: 'See our work',
    t1: 'Arabic + English', t2: 'Delivery from 5 days', t3: 'Mobile first', t4: 'WhatsApp on every page',
    n_work: 'Work', n_offer: 'Offer',
    s_title: 'Work that speaks for itself', s_sub: 'Real, working websites designed for each industry. Pick one and see it on laptop and phone.',
    y_title: 'See your site <span class="neon">with your name</span> before you order', y_sub: 'Type your business name and pick your industry: in a second you see a full website with your name. Free, no commitment.',
    o_title: '30% off for our first 10 clients', o_sub: 'To celebrate the Buildora launch, our first 10 clients get any package at 30% off, plus one free month of care after delivery.',
    o_cta: 'Claim your spot on WhatsApp', o_left: 'spots left', o_note: 'The offer ends when the spots run out', k_deal: '30% off for launch clients',
    n_demos: 'Demos', n_how: 'How we work', n_pkg: 'Packages', n_faq: 'FAQ', n_cta: 'Get a quote',
    h_title: 'Professional websites<br>that turn visitors into <span class="neon">clients.</span>',
    h_lead: 'We design websites and stores for restaurants, real estate and brands across the GCC: fast, in native Arabic and English, and built to bring you clients.',
    h_name: 'Business name', h_name_ph: 'e.g. Al Reem Restaurant', h_cat: 'Industry', h_go: 'Build my site',
    st_1: 'live demos to try', st_2: 'new demos every week', st_3v: '5', st_3: 'days minimum delivery', st_4: 'Arabic and English on every site',
    d_title: 'Try before you order', d_sub: 'Every demo is a real, working website. Open it, type your business name, and see how your site will look.',
    p_title: 'From idea to launch in 5 steps',
    p1h: 'Pick a demo', p1p: 'Try the demos with your business name and choose the closest one.',
    p2h: 'Message us', p2p: 'One WhatsApp message that carries the demo you picked.',
    p3h: 'Get a quote', p3p: 'A clear quote with your name within 24 hours: timeline and everything included.',
    p4h: 'We build, you review', p4p: 'We build it with your brand and send a preview link, with two revision rounds.',
    p5h: 'Launch', p5p: 'Your site goes live on your domain, ready for customers and ads.',
    k_title: 'A package for every stage', k_sub: 'Every project is different, so we send a custom quote for your needs within 24 hours.',
    k1: 'Landing page', k1f: 'For a product launch or an ad campaign', k1t: '~ 5 days',
    k1l: '<li>One page built to convert</li><li>Arabic and English</li><li>WhatsApp button and contact form</li><li>Meta, TikTok and Snap pixels</li><li>Fast loading</li>',
    k_pop: 'Most popular', k2: 'Business website', k2f: 'For restaurants, clinics, companies and real estate', k2t: '~ 7 to 10 days',
    k2l: '<li>Up to 8 pages</li><li>Arabic and English</li><li>Bookings or orders via WhatsApp</li><li>SEO and Google Maps setup</li><li>Ads and analytics tools connected</li>',
    k3: 'Online store', k3f: 'For brands, perfumes and fashion', k3t: '~ 14 to 21 days',
    k3l: '<li>Products and cart</li><li>Payment gateway integration</li><li>Coupons and offers</li><li>Arabic and English</li><li>Store management training</li>',
    k_cta: 'Get a quote',
    c_h: 'Monthly care plan', c_p: 'Edits, updates and backups. Send your request on WhatsApp and we handle it.', c_cta: 'Learn more',
    w_title: 'Why Buildora?',
    w1: 'Native Arabic', w1p: 'Proper RTL and beautiful Arabic type, not a quick translation.',
    w2: 'Mobile first', w2p: 'Most of your customers come from their phones, so we design for that first.',
    w3: 'Really fast', w3p: 'A light site that opens instantly, so you never lose a customer.',
    w4: 'WhatsApp on every page', w4p: 'Customers reach you in one tap, with all the details.',
    w5: 'Ads ready', w5p: 'Meta, TikTok, Snap and Google tags installed from day one.',
    w6: 'Fully yours', w6p: 'Domain and files in your name, no forced subscriptions.',
    f_title: 'FAQ',
    f1q: 'How much does a website cost?', f1a: 'It depends on the package, pages and features. Message us on WhatsApp and get a clear quote within 24 hours.',
    f2q: 'Can I change the demo?', f2a: 'Of course. The demo is only a starting point; we change colors, photos, content and sections to match your brand.',
    f3q: 'I am in Saudi Arabia or the UAE. Do you work with me?', f3a: 'Yes. We work with GCC clients fully remotely: WhatsApp communication, preview links, and flexible payment.',
    f4q: 'Do I own the site and domain?', f4a: 'Yes. The domain is registered in your name and the site is fully yours.',
    f5q: 'How does payment work?', f5a: '50% to start, and 50% before the site goes live on your domain.',
    f6q: 'What happens after delivery?', f6a: 'You get 14 days of free support, then you can join the monthly care plan.',
    x_title: 'Ready to build your site?', x_sub: 'One WhatsApp message, and your quote arrives within 24 hours.', x_cta: 'Chat on WhatsApp'
  };
  const PKG = { k1: { ar: 'صفحة هبوط', en: 'Landing page' }, k2: { ar: 'موقع النشاط', en: 'Business website' }, k3: { ar: 'متجر إلكتروني', en: 'Online store' } };

  // Arabic strings live in the HTML; capture them so the toggle can restore them.
  const AR = { title: document.title };
  document.querySelectorAll('[data-i18n]').forEach(el => { AR[el.dataset.i18n] = el.innerHTML; });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { AR[el.dataset.i18nPh] = el.placeholder; });
  const DICT = { ar: AR, en: EN };

  let lang = BZ.getLang();
  let demos = [];
  let filter = 'all';

  document.getElementById('navLogo').innerHTML = BZ.logoSVG(22);
    document.getElementById('ctaLogo').innerHTML = BZ.logoSVG(40);
  document.getElementById('yr').textContent = new Date().getFullYear();

  function waText(kind, el) {
    if (kind === 'pkg') {
      const p = PKG[el.dataset.pkg][lang];
      return lang === 'ar'
        ? 'أهلًا Buildora 👋\nأبغى عرض سعر لباقة: ' + p + '\nاسم النشاط: '
        : 'Hi Buildora 👋\nI would like a quote for: ' + p + '\nBusiness name: ';
    }
    if (kind === 'offer') {
      return lang === 'ar' ? 'أهلًا Buildora 👋\nأبغى أحجز مكاني في عرض الإطلاق (خصم ' + BZ.offer.percent + '%)\nاسم النشاط: ' : 'Hi Buildora 👋\nI want to claim a launch offer spot (' + BZ.offer.percent + '% off)\nBusiness name: ';
    }
    if (kind === 'care') {
      return lang === 'ar' ? 'أهلًا Buildora 👋\nأبغى أعرف تفاصيل باقة العناية الشهرية' : 'Hi Buildora 👋\nI would like details about the monthly care plan';
    }
    return lang === 'ar' ? 'أهلًا Buildora 👋\nأبغى موقع لنشاطي' : 'Hi Buildora 👋\nI would like a website for my business';
  }

  function refreshWa() {
    document.querySelectorAll('[data-wa]').forEach(el => { el.href = BZ.wa(waText(el.dataset.wa, el)); });
  }

  function catsInUse() {
    const counts = {};
    demos.forEach(d => { counts[d.category] = (counts[d.category] || 0) + 1; });
    return counts;
  }

  function renderSelect() {
    const sel = document.getElementById('bCat');
    const prev = sel.value;
    const counts = catsInUse();
    sel.innerHTML = Object.keys(counts).map(c =>
      '<option value="' + c + '">' + BZ.esc((BZ.categories[c] || { ar: c, en: c })[lang]) + '</option>').join('');
    if (prev && counts[prev]) sel.value = prev;
    else if (counts.restaurants) sel.value = 'restaurants';
  }

  function renderChips() {
    const counts = catsInUse();
    const all = lang === 'ar' ? 'الكل' : 'All';
    const chips = [['all', all, demos.length]].concat(Object.keys(counts).map(c => [c, (BZ.categories[c] || { ar: c, en: c })[lang], counts[c]]));
    const box = document.getElementById('chips');
    box.innerHTML = chips.map(([k, label, n]) =>
      '<button class="chip" type="button" data-f="' + k + '" aria-pressed="' + (k === filter) + '">' + BZ.esc(label) + '<span class="n">' + n + '</span></button>').join('');
    box.querySelectorAll('.chip').forEach(b => b.addEventListener('click', () => { filter = b.dataset.f; renderChips(); renderGrid(); }));
  }

  function renderGrid() {
    const list = demos.filter(d => filter === 'all' || d.category === filter);
    const t = lang === 'ar'
      ? { try: 'جرّبه باسم نشاطك', neu: 'جديد', soon: 'ديمو جديد ينضاف كل يوم', soonP: 'تابعنا على تيك توك وإنستغرام عشان تشوفه أول واحد.', ask: 'مجالك مو موجود؟ كلّمنا' }
      : { try: 'Try it with your name', neu: 'NEW', soon: 'A new demo drops every day', soonP: 'Follow us on TikTok and Instagram to see it first.', ask: 'Your industry is not here? Message us' };
    const html = list.map(d => {
      const cat = (BZ.categories[d.category] || { ar: d.category, en: d.category })[lang];
      const thumb = d.thumb
        ? '<img src="' + d.thumb + '" alt="" loading="lazy">'
        : '<div class="ph" style="background:' + d.accent + '">' + BZ.esc(d.name[lang]) + '<small>interactive 3D</small></div>';
      return '<article class="card">' +
        '<a class="thumb" href="demo.html?d=' + d.slug + '" tabindex="-1">' + thumb +
        (BZ.isNew(d.added) ? '<span class="tag new">' + t.neu + '</span>' : '') +
        (d.badge ? '<span class="tag b3d">' + d.badge + '</span>' : '') + '</a>' +
        '<div class="card-body"><span class="meta">' + BZ.esc(cat) + ' · ' + BZ.esc(d.city[lang]) + '</span>' +
        '<h3>' + BZ.esc(d.name[lang]) + '</h3><p>' + BZ.esc(d.tagline[lang]) + '</p>' +
        '<a class="btn" href="demo.html?d=' + d.slug + '">' + t.try + '</a></div></article>';
    }).join('');
    const soon = '<div class="more-soon">' + BZ.logoSVG(40) + '<b>' + t.soon + '</b><span>' + t.soonP + '</span>' +
      '<a class="btn btn-sm" data-wa="general" target="_blank" rel="noopener" href="' + BZ.wa(waText('general')) + '">' + t.ask + '</a></div>';
    document.getElementById('grid').innerHTML = html + soon;
  }

  function applyLang() {
    BZ.setLang(lang, DICT);
    if (demos.length) { renderSelect(); renderChips(); renderGrid(); renderShowList(); miniUpdate(); }
    if (typeof renderOffer === 'function') renderOffer();
    refreshWa();
  }

  document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', () => { lang = lang === 'ar' ? 'en' : 'ar'; applyLang(); }));

  const nameEl = document.getElementById('bName');
  const errEl = document.getElementById('bErr');
  nameEl.addEventListener('input', () => { errEl.textContent = ''; });
  document.getElementById('builder').addEventListener('submit', e => {
    e.preventDefault();
    const name = nameEl.value.trim();
    if (!name) {
      errEl.textContent = lang === 'ar' ? 'اكتب اسم نشاطك أولًا' : 'Type your business name first';
      nameEl.focus();
      return;
    }
    const cat = document.getElementById('bCat').value;
    const pick = demos.filter(d => d.category === cat).sort((a, b) => (b.added || '').localeCompare(a.added || ''))[0] || demos[0];
    location.href = 'demo.html?d=' + pick.slug + '&name=' + encodeURIComponent(name);
  });


  // ---------- Hero wall, showcase, live mini preview, offer ----------
  const SHOTS = ['restaurant-hero','apex-cars--fleet','dubai-realestate-hero','perfume--products','asyl-clothing-hero','restaurant--menu','apex-cars-hero','dubai-realestate--why','perfume-hero','asyl-clothing--shop'];
  (function wall() {
    const el = document.getElementById('wall');
    const cols = window.innerWidth < 700 ? 3 : 5;
    let html = '';
    for (let c = 0; c < cols; c++) {
      const pick = SHOTS.filter((_, i) => i % cols === c).concat(SHOTS.filter((_, i) => i % cols !== c).slice(c, c + 2));
      const imgs = pick.map(n => '<img src="assets/shots/' + n + '.jpg" alt="" loading="' + (c < 2 ? 'eager' : 'lazy') + '">').join('');
      html += '<div class="col">' + imgs + imgs + '</div>';
    }
    el.innerHTML = html;
  })();

  const SHOW = [
    { slug: 'restaurant', desk: ['restaurant-hero', 'restaurant--menu'], m: 'm--restaurant' },
    { slug: 'apex-cars', desk: ['apex-cars-hero', 'apex-cars--fleet'], m: 'm--apex-cars' },
    { slug: 'dubai-realestate', desk: ['dubai-realestate-hero', 'dubai-realestate--why'], m: 'm--dubai-realestate' },
    { slug: 'perfume', desk: ['perfume-hero', 'perfume--products'], m: 'm--perfume' },
    { slug: 'asyl-clothing', desk: ['asyl-clothing-hero', 'asyl-clothing--shop'], m: 'm--asyl-clothing' }
  ];
  let showIdx = 0, frame = 0, showTimer = null;
  function paintShow() {
    const it = SHOW[showIdx];
    const scr = document.getElementById('screen'), ph = document.getElementById('phone');
    scr.innerHTML = it.desk.map((n, i) => '<img src="assets/shots/' + n + '.jpg" alt=""' + (i === 0 ? ' class="on"' : '') + '>').join('');
    ph.innerHTML = '<img class="on" src="assets/shots/' + it.m + '.jpg" alt="">';
    frame = 0;
    document.querySelectorAll('#showList button').forEach((b, i) => b.setAttribute('aria-pressed', i === showIdx));
  }
  function renderShowList() {
    const box = document.getElementById('showList');
    box.innerHTML = SHOW.map((it, i) => {
      const d = demos.find(x => x.slug === it.slug);
      if (!d) return '';
      const cat = (BZ.categories[d.category] || { ar: '', en: '' })[lang];
      return '<button type="button" data-i="' + i + '" aria-pressed="' + (i === showIdx) + '"><span><b>' + BZ.esc(d.name[lang]) + '</b><small>' + BZ.esc(cat) + ' · ' + BZ.esc(d.city[lang]) + '</small></span><a class="go" href="demo.html?d=' + d.slug + '">' + (lang === 'ar' ? 'جرّبه ←' : 'Try it →') + '</a></button>';
    }).join('');
    box.querySelectorAll('button').forEach(b => b.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      showIdx = +b.dataset.i; paintShow(); restartShow();
    }));
  }
  function restartShow() {
    clearInterval(showTimer);
    showTimer = setInterval(() => {
      const imgs = document.querySelectorAll('#screen img');
      if (!imgs.length) return;
      imgs[frame].classList.remove('on');
      frame = (frame + 1) % imgs.length;
      imgs[frame].classList.add('on');
      if (frame === 0) { showIdx = (showIdx + 1) % SHOW.length; paintShow(); }
    }, 2600);
  }
  paintShow(); restartShow();

  function miniUpdate() {
    const name = nameEl.value.trim() || (lang === 'ar' ? 'مطعم الريم' : 'Al Reem Restaurant');
    const cat = document.getElementById('bCat').value;
    const pick = demos.filter(d => d.category === cat)[0];
    document.getElementById('miniName').textContent = name;
    document.getElementById('miniUrl').textContent = 'buildora.agency/demo?name=' + name;
    document.getElementById('miniCat').textContent = pick ? (BZ.categories[cat] || {})[lang] || '' : '';
    const shot = pick ? SHOW.find(s => s.slug === pick.slug) : null;
    document.getElementById('miniBody').style.backgroundImage = 'url(assets/shots/' + (shot ? shot.desk[0] : 'restaurant-hero') + '.jpg)';
  }
  nameEl.addEventListener('input', miniUpdate);
  document.getElementById('bCat').addEventListener('change', miniUpdate);

  function renderOffer() {
    const o = BZ.offer;
    document.querySelectorAll('[data-offer]').forEach(el => { el.hidden = !o.active || o.left <= 0; });
    document.querySelectorAll('.left-n').forEach(el => { el.textContent = o.left; });
    document.getElementById('spotsLeft').textContent = o.left;
    document.getElementById('spotsGrid').innerHTML = Array.from({ length: o.total }, (_, i) => '<i class="' + (i < o.total - o.left ? 'taken' : '') + '"></i>').join('');
  }

  fetch('data/demos.json').then(r => r.json()).then(list => {
    demos = list.sort((a, b) => (b.added || '').localeCompare(a.added || ''));
    document.getElementById('stDemos').textContent = '+' + demos.length;
    applyLang();
  }).catch(() => { applyLang(); });

  applyLang();

  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll('.rv').forEach(el => io.observe(el));
})();
