/* =====================================================================
   CafeArt — UI interactions & motion
   Loader · custom cursor · nav · scroll reveals · animated counters ·
   tilt menu cards + filtering · gallery tilt · testimonial carousel ·
   reservation form · back-to-top · parallax
   ===================================================================== */
(function () {
    'use strict';

    const $ = (s, ctx = document) => ctx.querySelector(s);
    const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none)').matches;

    /* ================================================================
       LOADER  (hides on scene ready, scene error, or safety timeout)
       ================================================================ */
    const loader = $('#loader');
    const loaderBar = $('#loaderBar');
    let loaderDone = false;
    let fakeProgress = 0;

    const progressTimer = setInterval(() => {
        fakeProgress = Math.min(fakeProgress + Math.random() * 9, 92);
        if (loaderBar) loaderBar.style.width = fakeProgress + '%';
    }, 180);

    function finishLoader() {
        if (loaderDone) return;
        loaderDone = true;
        clearInterval(progressTimer);
        if (loaderBar) loaderBar.style.width = '100%';
        setTimeout(() => {
            loader && loader.classList.add('is-done');
            document.body.classList.remove('is-loading');
            startCounters();
        }, 350);
    }

    /* Hero video drives the loader; degrade gracefully to the poster frame. */
    const heroVideo = $('#heroVideo');
    const heroSection = $('#home');
    function holdStill() { heroSection && heroSection.classList.add('is-still'); }

    if (heroVideo) {
        if (reduceMotion) {
            holdStill();
            heroVideo.removeAttribute('autoplay');
            heroVideo.pause();
            finishLoader();
        } else {
            heroVideo.addEventListener('loadeddata', finishLoader, { once: true });
            heroVideo.addEventListener('canplay', finishLoader, { once: true });
            heroVideo.addEventListener('error', () => { holdStill(); finishLoader(); }, { once: true });
            // Some browsers need an explicit kick; if autoplay is blocked the poster shows.
            const p = heroVideo.play();
            if (p && typeof p.catch === 'function') p.catch(holdStill);
        }
    } else {
        finishLoader();
    }

    // Safety nets: never let the loader hang.
    setTimeout(finishLoader, 4500);
    window.addEventListener('load', () => setTimeout(finishLoader, 800));

    /* ================================================================
       CUSTOM CURSOR
       ================================================================ */
    if (!isTouch && !reduceMotion) {
        const cursor = $('#cursor');
        const trail = $('#cursorTrail');
        let cx = 0, cy = 0, tx = 0, ty = 0;
        document.body.classList.add('cursor-ready');

        window.addEventListener('pointermove', (e) => {
            cx = e.clientX; cy = e.clientY;
            cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
        });
        (function trailLoop() {
            tx += (cx - tx) * 0.18;
            ty += (cy - ty) * 0.18;
            trail.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
            requestAnimationFrame(trailLoop);
        })();

        const hoverables = 'a, button, .menu-card, .gallery__item, .chip, input, select, textarea';
        document.addEventListener('pointerover', (e) => {
            if (e.target.closest(hoverables)) trail.classList.add('is-hover');
        });
        document.addEventListener('pointerout', (e) => {
            if (e.target.closest(hoverables)) trail.classList.remove('is-hover');
        });
    }

    /* ================================================================
       SCROLL PROGRESS + NAV STATE + BACK TO TOP
       ================================================================ */
    const nav = $('#nav');
    const progress = $('#scrollProgress');
    const toTop = $('#toTop');
    const hero = $('#home');

    function onScroll() {
        const y = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        if (progress) progress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + '%';

        const heroBottom = (hero ? hero.offsetHeight : 600) - 90;
        if (y < heroBottom) {
            nav.classList.add('is-light');
            nav.classList.remove('is-scrolled');
        } else {
            nav.classList.remove('is-light');
            nav.classList.add('is-scrolled');
        }
        toTop && toTop.classList.toggle('is-show', y > 700);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    toTop && toTop.addEventListener('click', () =>
        window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* ================================================================
       MOBILE NAV
       ================================================================ */
    const burger = $('#navBurger');
    const navMenu = $('#navMenu');
    function toggleMenu(force) {
        const open = force ?? !navMenu.classList.contains('is-open');
        navMenu.classList.toggle('is-open', open);
        burger.classList.toggle('is-open', open);
        burger.setAttribute('aria-expanded', String(open));
    }
    burger && burger.addEventListener('click', () => toggleMenu());
    $$('.nav__link', navMenu).forEach((l) =>
        l.addEventListener('click', () => toggleMenu(false)));

    /* ================================================================
       ACTIVE NAV LINK + REVEAL ON SCROLL
       ================================================================ */
    const revealItems = $$('.reveal');
    if ('IntersectionObserver' in window && !reduceMotion) {
        const revObs = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add('is-visible');
                    revObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        revealItems.forEach((el) => revObs.observe(el));
    } else {
        revealItems.forEach((el) => el.classList.add('is-visible'));
    }

    const sections = $$('main section[id]');
    const navLinks = $$('.nav__link');
    if ('IntersectionObserver' in window) {
        const secObs = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    const id = e.target.id;
                    navLinks.forEach((l) =>
                        l.classList.toggle('is-current', l.getAttribute('href') === '#' + id));
                }
            });
        }, { threshold: 0.5 });
        sections.forEach((s) => secObs.observe(s));
    }

    /* ================================================================
       ANIMATED STAT COUNTERS
       ================================================================ */
    let countersRun = false;
    function startCounters() {
        if (countersRun) return;
        countersRun = true;
        $$('.stat__num').forEach((el) => {
            const target = +el.dataset.count;
            const suffix = el.dataset.suffix || '';
            const dur = 1600;
            const start = performance.now();
            function step(now) {
                const p = Math.min((now - start) / dur, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(target * eased) + suffix;
                if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        });
    }

    /* ================================================================
       MENU — data → cards with 3D tilt + filtering
       ================================================================ */
    const MENU = [
        { name: 'Origin Espresso', price: '$3.5', cat: 'espresso', tag: 'House', art: '☕',
          bg: 'radial-gradient(circle at 35% 30%, #6f4e37, #1d0f08)', strength: 5,
          note: 'Bold · 28s pull', desc: 'A syrupy single-origin shot with notes of cocoa and toasted hazelnut.' },
        { name: 'Velvet Flat White', price: '$4.5', cat: 'espresso', tag: 'Loved', art: '🤍',
          bg: 'radial-gradient(circle at 60% 40%, #e0c4a0, #6f4e37)', strength: 3,
          note: 'Silky · 5oz', desc: 'Double ristretto under a paper-thin layer of microfoam. Pure balance.' },
        { name: 'Honey Cortado', price: '$4.0', cat: 'espresso', tag: null, art: '🍯',
          bg: 'radial-gradient(circle at 40% 30%, #e0b878, #b87333)', strength: 3,
          note: 'Sweet · 4oz', desc: 'Equal parts espresso and steamed milk, finished with raw wildflower honey.' },
        { name: 'Slow Pour-Over', price: '$5.0', cat: 'brew', tag: 'Single Origin', art: '⏳',
          bg: 'radial-gradient(circle at 50% 35%, #c8956d, #4a2c1d)', strength: 2,
          note: 'Bright · V60', desc: 'Hand-poured over four minutes to coax out delicate floral and citrus tones.' },
        { name: 'Siphon Reserve', price: '$6.5', cat: 'brew', tag: 'Rare', art: '🔬',
          bg: 'radial-gradient(circle at 45% 45%, #b87333, #2c1810)', strength: 3,
          note: 'Clean · Theatrical', desc: 'Vacuum-brewed tableside for a crystal-clear, tea-like cup. A whole experience.' },
        { name: 'Nitro Cold Brew', price: '$5.5', cat: 'cold', tag: 'On Tap', art: '🌊',
          bg: 'radial-gradient(circle at 50% 60%, #4a2c1d, #1a0f0a)', strength: 4,
          note: 'Creamy · Cascading', desc: '20-hour steeped and charged with nitrogen for a stout-like, velvety head.' },
        { name: 'Iced Maple Latte', price: '$5.0', cat: 'cold', tag: null, art: '🍁',
          bg: 'radial-gradient(circle at 40% 40%, #e0b878, #8a5a2b)', strength: 2,
          note: 'Smooth · 12oz', desc: 'Cold-pressed espresso, oat milk, and a thread of dark maple over clear ice.' },
        { name: 'The Painter', price: '$6.0', cat: 'signature', tag: 'Signature', art: '🎨',
          bg: 'radial-gradient(circle at 50% 30%, #f0cd8e, #b87333)', strength: 4,
          note: "Barista's choice", desc: 'A rotating latte-art masterpiece — house blend, a secret spice, and a steady hand.' },
        { name: 'Midnight Mocha', price: '$5.5', cat: 'signature', tag: 'Signature', art: '🌙',
          bg: 'radial-gradient(circle at 45% 35%, #4a2c1d, #1d0f08)', strength: 4,
          note: '70% dark', desc: 'Single-origin espresso, stone-ground dark chocolate, a pinch of sea salt.' },
    ];

    const grid = $('#menuGrid');
    function strengthDots(n) {
        let s = '';
        for (let i = 0; i < 5; i++) s += `<i class="${i < n ? 'on' : ''}"></i>`;
        return s;
    }
    if (grid) {
        grid.innerHTML = MENU.map((d, i) => `
            <article class="menu-card reveal" data-cat="${d.cat}" style="--d:${(i % 3) * 0.08}s">
                <div class="menu-card__glow"></div>
                ${d.tag ? `<span class="menu-card__tag">${d.tag}</span>` : ''}
                <div class="menu-card__art" style="background:${d.bg}">${d.art}</div>
                <div class="menu-card__head">
                    <h3 class="menu-card__name">${d.name}</h3>
                    <span class="menu-card__price">${d.price}</span>
                </div>
                <p class="menu-card__desc">${d.desc}</p>
                <div class="menu-card__foot">
                    <span class="menu-card__dots">${strengthDots(d.strength)}</span>
                    <span class="menu-card__note">${d.note}</span>
                </div>
            </article>`).join('');

        // reveal observe the freshly-built cards
        if ('IntersectionObserver' in window && !reduceMotion) {
            const o = new IntersectionObserver((entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) { e.target.classList.add('is-visible'); o.unobserve(e.target); }
                });
            }, { threshold: 0.12 });
            $$('.menu-card', grid).forEach((c) => o.observe(c));
        } else {
            $$('.menu-card', grid).forEach((c) => c.classList.add('is-visible'));
        }

        // 3D tilt
        if (!isTouch && !reduceMotion) {
            $$('.menu-card', grid).forEach((card) => {
                const glow = $('.menu-card__glow', card);
                card.addEventListener('pointermove', (e) => {
                    const r = card.getBoundingClientRect();
                    const px = (e.clientX - r.left) / r.width;
                    const py = (e.clientY - r.top) / r.height;
                    const rx = (0.5 - py) * 14;
                    const ry = (px - 0.5) * 16;
                    card.style.transform = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
                    if (glow) {
                        glow.style.left = (px * 100) + '%';
                        glow.style.top = (py * 100) + '%';
                        glow.style.transform = 'translate(-50%, -50%)';
                    }
                });
                card.addEventListener('pointerleave', () => {
                    card.style.transform = '';
                });
            });
        }
    }

    // Filtering
    const filters = $('#menuFilters');
    filters && filters.addEventListener('click', (e) => {
        const btn = e.target.closest('.chip');
        if (!btn) return;
        $$('.chip', filters).forEach((c) => c.classList.remove('is-active'));
        btn.classList.add('is-active');
        const f = btn.dataset.filter;
        $$('.menu-card', grid).forEach((card) => {
            const show = f === 'all' || card.dataset.cat === f;
            card.classList.toggle('is-hidden', !show);
        });
    });

    /* ================================================================
       GALLERY TILT
       ================================================================ */
    if (!isTouch && !reduceMotion) {
        $$('.gallery__item').forEach((item) => {
            item.addEventListener('pointermove', (e) => {
                const r = item.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;
                item.style.transform =
                    `perspective(800px) rotateX(${(0.5 - py) * 10}deg) rotateY(${(px - 0.5) * 12}deg) scale(1.02)`;
            });
            item.addEventListener('pointerleave', () => { item.style.transform = ''; });
        });
    }

    /* ================================================================
       TESTIMONIAL CAROUSEL
       ================================================================ */
    const quotes = $$('.quote');
    const dotsWrap = $('#quotesDots');
    if (quotes.length && dotsWrap) {
        let idx = 0;
        let timer;
        quotes.forEach((_, i) => {
            const b = document.createElement('button');
            b.setAttribute('aria-label', `Show quote ${i + 1}`);
            if (i === 0) b.classList.add('is-active');
            b.addEventListener('click', () => { go(i); restart(); });
            dotsWrap.appendChild(b);
        });
        const dots = $$('button', dotsWrap);
        function go(n) {
            quotes[idx].classList.remove('is-active');
            dots[idx].classList.remove('is-active');
            idx = (n + quotes.length) % quotes.length;
            quotes[idx].classList.add('is-active');
            dots[idx].classList.add('is-active');
        }
        function restart() {
            clearInterval(timer);
            if (!reduceMotion) timer = setInterval(() => go(idx + 1), 5500);
        }
        restart();
    }

    /* ================================================================
       PARALLAX (story images)
       ================================================================ */
    const parallaxEls = $$('[data-parallax]');
    if (parallaxEls.length && !reduceMotion) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const vh = window.innerHeight;
                parallaxEls.forEach((el) => {
                    const r = el.getBoundingClientRect();
                    const center = r.top + r.height / 2;
                    const off = (center - vh / 2) / vh;
                    const speed = parseFloat(el.dataset.parallax) || 0.1;
                    el.style.transform = `translateY(${off * speed * 100}px)`;
                });
                ticking = false;
            });
        }, { passive: true });
    }

    /* ================================================================
       RESERVATION FORM
       ================================================================ */
    const form = $('#reserveForm');
    const note = $('#formNote');
    if (form) {
        // sensible min date = today
        const dateInput = $('#rdate', form);
        if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = $('#rname', form).value.trim();
            const email = $('#remail', form).value.trim();
            const date = $('#rdate', form).value;
            const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            if (!name || !emailOk || !date) {
                note.textContent = 'Please add your name, a valid email, and a date. ☕';
                note.classList.add('is-error');
                return;
            }
            note.classList.remove('is-error');
            note.textContent = `Thanks, ${name.split(' ')[0]}! We'll confirm your table at hello@cafeart.coffee shortly.`;
            form.reset();
            if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];
        });
    }

    /* ================================================================
       MISC
       ================================================================ */
    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
