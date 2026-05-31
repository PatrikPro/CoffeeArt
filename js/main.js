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
        { id: 'espresso',  cat: 'espresso',  price: '$3.5', img: 'assets/img/menu-espresso.jpg',  strength: 5, tag: true },
        { id: 'flatwhite', cat: 'espresso',  price: '$4.5', img: 'assets/img/menu-flatwhite.jpg', strength: 3, tag: true },
        { id: 'cortado',   cat: 'espresso',  price: '$4.0', img: 'assets/img/menu-cortado.jpg',   strength: 3, tag: false },
        { id: 'pourover',  cat: 'brew',      price: '$5.0', img: 'assets/img/menu-pourover.jpg',  strength: 2, tag: true },
        { id: 'siphon',    cat: 'brew',      price: '$6.5', img: 'assets/img/menu-siphon.jpg',    strength: 3, tag: true },
        { id: 'nitro',     cat: 'cold',      price: '$5.5', img: 'assets/img/menu-nitro.jpg',     strength: 4, tag: true },
        { id: 'iced',      cat: 'cold',      price: '$5.0', img: 'assets/img/menu-iced.jpg',      strength: 2, tag: false },
        { id: 'painter',   cat: 'signature', price: '$6.0', img: 'assets/img/menu-painter.jpg',   strength: 4, tag: true },
        { id: 'mocha',     cat: 'signature', price: '$5.5', img: 'assets/img/menu-mocha.jpg',     strength: 4, tag: true },
    ];
    const tr = (k) => (window.t ? window.t(k) : k);

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
                ${d.tag ? `<span class="menu-card__tag" data-i18n="menu.${d.id}.tag">${tr('menu.' + d.id + '.tag')}</span>` : ''}
                <div class="menu-card__art">
                    <picture>
                        <source srcset="${d.img.replace('.jpg', '.webp')}" type="image/webp" />
                        <img src="${d.img}" loading="lazy" decoding="async" data-i18n-attr="alt:menu.${d.id}.name" alt="${tr('menu.' + d.id + '.name')}" />
                    </picture>
                </div>
                <div class="menu-card__head">
                    <h3 class="menu-card__name" data-i18n="menu.${d.id}.name">${tr('menu.' + d.id + '.name')}</h3>
                    <span class="menu-card__price">${d.price}</span>
                </div>
                <p class="menu-card__desc" data-i18n="menu.${d.id}.desc">${tr('menu.' + d.id + '.desc')}</p>
                <div class="menu-card__foot">
                    <span class="menu-card__dots">${strengthDots(d.strength)}</span>
                    <span class="menu-card__note" data-i18n="menu.${d.id}.note">${tr('menu.' + d.id + '.note')}</span>
                </div>
            </article>`).join('');
        if (window.applyTranslations) window.applyTranslations();

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
        const dateInput = $('#rdate', form);
        const setMin = () => { if (dateInput) dateInput.min = new Date().toISOString().split('T')[0]; };
        setMin();

        const say = (msg, isError) => {
            note.textContent = msg;
            note.classList.toggle('is-error', !!isError);
        };

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (form.elements['bot-field'] && form.elements['bot-field'].value) return; // honeypot
            const name = $('#rname', form).value.trim();
            const email = $('#remail', form).value.trim();
            const date = $('#rdate', form).value;
            const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            const T = (k) => (window.t ? window.t(k) : k);
            if (!name || !emailOk || !date) {
                say(T('form.errRequired'), true);
                return;
            }

            const first = name.split(' ')[0];
            const endpoint = form.getAttribute('action') || '';
            const configured = endpoint && !endpoint.includes('your-form-id');
            const btn = $('button[type="submit"]', form);

            // Not wired to a backend yet → friendly simulated confirmation (demo mode)
            if (!configured) {
                say(T('form.demoOk').replace('{name}', first));
                form.reset(); setMin();
                return;
            }

            // Real submission — works with Formspree or Netlify Forms
            if (btn) { btn.disabled = true; btn.textContent = T('form.sending'); }
            say(T('form.sending'));
            try {
                const res = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(new FormData(form)).toString(),
                });
                if (res.ok) {
                    say(T('form.sent').replace('{name}', first));
                    form.reset(); setMin();
                } else {
                    say(T('form.fail'), true);
                }
            } catch (_) {
                say(T('form.neterr'), true);
            } finally {
                if (btn) { btn.disabled = false; btn.textContent = T('form.submit'); }
            }
        });
    }

    /* ================================================================
       GALLERY LIGHTBOX
       ================================================================ */
    const lightbox = $('#lightbox');
    if (lightbox) {
        const lbImg = $('#lbImg'), lbCap = $('#lbCap');
        const items = $$('#galleryGrid .gallery__item');
        const shots = items.map((fig) => {
            const img = $('img', fig);
            return { src: img ? img.currentSrc || img.src : '', cap: ($('span', fig) || {}).textContent || '', alt: img ? img.alt : '' };
        });
        let cur = 0;
        let lastFocus = null;

        const render = () => {
            const s = shots[cur];
            lbImg.src = s.src; lbImg.alt = s.alt; lbCap.textContent = s.cap;
        };
        const open = (i) => {
            cur = i; render();
            lightbox.classList.add('is-open');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            lastFocus = document.activeElement;
            $('#lbClose').focus();
        };
        const close = () => {
            lightbox.classList.remove('is-open');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (lastFocus) lastFocus.focus();
        };
        const step = (d) => { cur = (cur + d + shots.length) % shots.length; render(); };

        items.forEach((fig, i) => {
            fig.addEventListener('click', () => open(i));
            fig.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
            });
        });
        $('#lbClose').addEventListener('click', close);
        $('#lbPrev').addEventListener('click', (e) => { e.stopPropagation(); step(-1); });
        $('#lbNext').addEventListener('click', (e) => { e.stopPropagation(); step(1); });
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('is-open')) return;
            if (e.key === 'Escape') close();
            else if (e.key === 'ArrowLeft') step(-1);
            else if (e.key === 'ArrowRight') step(1);
        });
    }

    /* ================================================================
       MISC
       ================================================================ */
    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
