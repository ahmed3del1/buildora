// Home page: i18n, gallery, hero builder, WhatsApp links.
(function () {
  const EN = {
    title: 'Buildora | Websites, built block by block',
    n_demos: 'Demos', n_how: 'How we work', n_pkg: 'Packages', n_faq: 'FAQ', n_cta: 'Get a quote',
    h_title: 'Your website,<br><span class="neon">block by block.</span>',
    h_lead: 'Type your business name, pick your industry, and see your website ready with your name in a second. Like it? We deliver it with your name and brand.',
    h_name: 'Business name', h_name_ph: 'e.g. Al Reem Restaurant', h_cat: 'Industry', h_go: 'Build my site',
    st_1: 'live demos to try', st_2: 'new demo every day', st_3v: '5', st_3: 'days minimum delivery', st_4: 'Arabic and English on every site',
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
  document.getElementById('heroArt').innerHTML = BZ.logoSVG(0, true);
  document.getElementById('ctaLogo').innerHTML = BZ.logoSVG(40);
  document.getElementById('yr').textContent = new Date().getFullYear();

  function waText(kind, el) {
    if (kind === 'pkg') {
      const p = PKG[el.dataset.pkg][lang];
      return lang === 'ar'
        ? 'أهلًا Buildora 👋\nأبغى عرض سعر لباقة: ' + p + '\nاسم النشاط: '
        : 'Hi Buildora 👋\nI would like a quote for: ' + p + '\nBusiness name: ';
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
    if (demos.length) { renderSelect(); renderChips(); renderGrid(); }
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

  fetch('data/demos.json').then(r => r.json()).then(list => {
    demos = list.sort((a, b) => (b.added || '').localeCompare(a.added || ''));
    document.getElementById('stDemos').textContent = '+' + demos.length;
    applyLang();
  }).catch(() => { applyLang(); });

  applyLang();

  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll('.rv').forEach(el => io.observe(el));
})();
