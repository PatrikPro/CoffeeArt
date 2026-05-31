/* =====================================================================
   CafeArt — i18n (English / Čeština)
   Drives every [data-i18n], [data-i18n-html] and [data-i18n-attr] element,
   plus a global t() used by main.js for JS-generated content.
   ===================================================================== */
(function () {
    'use strict';

    const I18N = {
        en: {
            'meta.title': 'CafeArt · Where Every Cup Is a Masterpiece',
            'meta.desc': 'CafeArt — where every cup is a masterpiece. An artisan coffee roastery serving slow-roasted single origins, sculpted latte art, and a space designed to make you linger.',
            'a11y.skip': 'Skip to content',
            'a11y.toTop': 'Back to top',
            'loader.text': 'Brewing your experience',

            'nav.brandAria': 'CafeArt home',
            'nav.primary': 'Primary',
            'nav.home': 'Home', 'nav.story': 'Story', 'nav.menu': 'Menu',
            'nav.craft': 'Craft', 'nav.gallery': 'Gallery', 'nav.visit': 'Visit',
            'nav.reserve': 'Reserve a Table', 'nav.burger': 'Toggle menu',

            'hero.eyebrow': '✦ Artisan Roastery · Est. 2014 ✦',
            'hero.title1': 'Where Every', 'hero.title2': 'Cup Is a', 'hero.title3': 'Masterpiece',
            'hero.sub': 'Slow-roasted single origins, sculpted latte art, and a space designed to make you linger. Welcome to <strong>CafeArt</strong>.',
            'hero.cta1': 'Explore the Menu', 'hero.cta2': 'Our Story →',
            'hero.stat1': 'Single Origins', 'hero.stat2': 'Years Roasting', 'hero.stat3': 'Cups Poured',
            'hero.scrollAria': 'Scroll to story', 'hero.scroll': 'Scroll',

            'marquee.handRoasted': 'Hand Roasted',

            'story.img1Alt': 'A barista pouring steamed milk to finish a latte at the CafeArt bar',
            'story.img2Alt': 'A scoop of fresh green coffee cherries from the harvest',
            'story.badge': 'Ethically Sourced',
            'story.eyebrow': '— Our Story',
            'story.title': 'From the highlands<br />to your hands.',
            'story.p1': 'CafeArt began in a tiny corner roastery with a single drum roaster and an obsession: treat coffee like a craft, not a commodity. A decade later, we still source every bean directly from growers who share our love of the land.',
            'story.p2': 'Each batch is roasted in small lots, rested to perfection, and pulled by baristas who consider the pour an art form. The result is a cup with a signature — yours.',
            'story.list1': 'Small-batch drum roasting',
            'story.list2': 'Direct-trade relationships',
            'story.list3': 'Signature latte artistry',
            'story.list4': 'Zero-waste kitchen',
            'story.cta': 'See How We Craft It',

            'menu.eyebrow': '— The Menu', 'menu.title': 'Crafted to Order',
            'menu.lead': 'Tilt a card to see it come alive. Every drink is made with house-roasted beans and a whole lot of heart.',
            'menu.filterAll': 'All', 'menu.filterEspresso': 'Espresso', 'menu.filterBrew': 'Slow Brew',
            'menu.filterCold': 'Cold', 'menu.filterSignature': 'Signature',

            'menu.espresso.name': 'Origin Espresso', 'menu.espresso.tag': 'House', 'menu.espresso.note': 'Bold · 28s pull',
            'menu.espresso.desc': 'A syrupy single-origin shot with notes of cocoa and toasted hazelnut.',
            'menu.flatwhite.name': 'Velvet Flat White', 'menu.flatwhite.tag': 'Loved', 'menu.flatwhite.note': 'Silky · 5oz',
            'menu.flatwhite.desc': 'Double ristretto under a paper-thin layer of microfoam. Pure balance.',
            'menu.cortado.name': 'Honey Cortado', 'menu.cortado.note': 'Sweet · 4oz',
            'menu.cortado.desc': 'Equal parts espresso and steamed milk, finished with raw wildflower honey.',
            'menu.pourover.name': 'Slow Pour-Over', 'menu.pourover.tag': 'Single Origin', 'menu.pourover.note': 'Bright · V60',
            'menu.pourover.desc': 'Hand-poured over four minutes to coax out delicate floral and citrus tones.',
            'menu.siphon.name': 'Siphon Reserve', 'menu.siphon.tag': 'Rare', 'menu.siphon.note': 'Clean · Theatrical',
            'menu.siphon.desc': 'Vacuum-brewed tableside for a crystal-clear, tea-like cup. A whole experience.',
            'menu.nitro.name': 'Nitro Cold Brew', 'menu.nitro.tag': 'On Tap', 'menu.nitro.note': 'Creamy · Cascading',
            'menu.nitro.desc': '20-hour steeped and charged with nitrogen for a stout-like, velvety head.',
            'menu.iced.name': 'Iced Maple Latte', 'menu.iced.note': 'Smooth · 12oz',
            'menu.iced.desc': 'Cold-pressed espresso, oat milk, and a thread of dark maple over clear ice.',
            'menu.painter.name': 'The Painter', 'menu.painter.tag': 'Signature', 'menu.painter.note': "Barista's choice",
            'menu.painter.desc': 'A rotating latte-art masterpiece — house blend, a secret spice, and a steady hand.',
            'menu.mocha.name': 'Midnight Mocha', 'menu.mocha.tag': 'Signature', 'menu.mocha.note': '70% dark',
            'menu.mocha.desc': 'Single-origin espresso, stone-ground dark chocolate, a pinch of sea salt.',

            'craft.eyebrow': '— The Craft', 'craft.title': 'Four Steps to the Perfect Cup',
            'craft.s1t': 'Source', 'craft.s1d': 'We travel to origin to taste, select, and hand-pick lots from farms we trust.',
            'craft.s2t': 'Roast', 'craft.s2d': "Small batches roasted on a vintage drum, profiled to unlock each bean's character.",
            'craft.s3t': 'Rest', 'craft.s3d': 'Beans rest for days so the flavors settle, then we grind only to order.',
            'craft.s4t': 'Pour', 'craft.s4d': "Our baristas extract with precision and finish with art you'll hate to drink.",

            'gallery.eyebrow': '— The Space', 'gallery.title': 'A Place to Linger',
            'gallery.lead': 'Warm light, worn timber, and the gentle hum of the grinder. Step inside.',
            'gallery.cap1': 'The Roastery', 'gallery.cap2': 'Pour Bar', 'gallery.cap3': 'Window Seats',
            'gallery.cap4': 'The Long Table', 'gallery.cap5': 'The Mezzanine',
            'gallery.aria1': 'Enlarge: The Roastery', 'gallery.aria2': 'Enlarge: Pour Bar', 'gallery.aria3': 'Enlarge: Window Seats',
            'gallery.aria4': 'Enlarge: The Long Table', 'gallery.aria5': 'Enlarge: The Mezzanine',

            'quotes.eyebrow': '— Kind Words',
            'quote1.text': 'The flat white here ruined every other coffee for me. Worth every minute of the queue.',
            'quote1.role': 'regular since 2017',
            'quote2.text': "It's not a café, it's a meditation. The light, the smell, the pour — pure art.",
            'quote2.role': 'local photographer',
            'quote3.text': 'I came for the latte art and stayed for three hours. Best cold brew in the city, full stop.',
            'quote3.role': 'writer & wanderer',
            'press.label': 'As featured in',

            'visit.eyebrow': '— Come Say Hi', 'visit.title': 'Visit the Roastery',
            'visit.lead': "Pull up a stool at the pour bar, grab a window seat, or take a bag of fresh beans home. We'd love to share a cup with you.",
            'visit.findus': 'Find us', 'visit.hours': 'Open daily', 'visit.hoursVal': 'Mon–Fri 7am–7pm · Sat–Sun 8am–6pm',
            'visit.hello': 'Say hello', 'visit.playlist': 'Our Playlist',
            'visit.mapTitle': 'Map showing the location of CafeArt roastery',

            'form.title': 'Reserve a Table', 'form.name': 'Your name', 'form.email': 'Email address',
            'form.date': 'Date', 'form.party': 'Party',
            'form.g1': '1 guest', 'form.g2': '2 guests', 'form.g3': '3 guests', 'form.g4': '4 guests', 'form.g5': '5+ guests',
            'form.note': 'Anything we should know? (optional)', 'form.submit': 'Request Reservation', 'form.sending': 'Sending…',
            'form.errRequired': 'Please add your name, a valid email, and a date. ☕',
            'form.demoOk': "Thanks, {name}! We'll confirm your table at hello@cafeart.coffee shortly.",
            'form.sent': "Thanks, {name}! Your reservation request is in — we'll be in touch shortly.",
            'form.fail': "Hmm, that didn't go through. Email us at hello@cafeart.coffee and we'll sort it.",
            'form.neterr': 'Network hiccup — please try again, or email hello@cafeart.coffee.',

            'footer.tagline': 'Where every cup is a masterpiece. Roasted with intention, served with love.',
            'footer.c1': 'Explore', 'footer.c1a': 'Our Story', 'footer.c1b': 'Menu', 'footer.c1c': 'The Craft', 'footer.c1d': 'Gallery',
            'footer.c2': 'Visit', 'footer.c2a': 'Hours', 'footer.c2b': 'Location', 'footer.c2c': 'Reserve',
            'footer.c3': 'Beans', 'footer.c3a': 'Shop Roasts', 'footer.c3b': 'Subscriptions', 'footer.c3c': 'Wholesale',
            'footer.rights': 'CafeArt Roastery. Brewed with care.',
            'footer.credit': 'Crafted with ☕ & <span>real roast footage</span>',

            'lb.title': 'Image viewer', 'lb.close': 'Close', 'lb.prev': 'Previous image', 'lb.next': 'Next image',
        },

        cs: {
            'meta.title': 'CafeArt · Každý šálek je umělecké dílo',
            'meta.desc': 'CafeArt — kde je každý šálek uměleckým dílem. Řemeslná pražírna kávy nabízející pomalu pražené single origin kávy, vykreslované latte art a prostor, ve kterém se budete chtít zdržet.',
            'a11y.skip': 'Přeskočit na obsah',
            'a11y.toTop': 'Zpět nahoru',
            'loader.text': 'Připravujeme váš zážitek',

            'nav.brandAria': 'CafeArt — domů',
            'nav.primary': 'Hlavní',
            'nav.home': 'Domů', 'nav.story': 'Příběh', 'nav.menu': 'Menu',
            'nav.craft': 'Řemeslo', 'nav.gallery': 'Galerie', 'nav.visit': 'Návštěva',
            'nav.reserve': 'Rezervovat stůl', 'nav.burger': 'Přepnout menu',

            'hero.eyebrow': '✦ Řemeslná pražírna · Založeno 2014 ✦',
            'hero.title1': 'Každý šálek', 'hero.title2': 'je mistrovské', 'hero.title3': 'dílo',
            'hero.sub': 'Pomalu pražené single origin kávy, vykreslované latte art a prostor, ve kterém se budete chtít zdržet. Vítejte v <strong>CafeArt</strong>.',
            'hero.cta1': 'Prohlédnout menu', 'hero.cta2': 'Náš příběh →',
            'hero.stat1': 'Single origin kávy', 'hero.stat2': 'Let pražení', 'hero.stat3': 'Naservírovaných šálků',
            'hero.scrollAria': 'Přejít na příběh', 'hero.scroll': 'Dolů',

            'marquee.handRoasted': 'Ručně pražené',

            'story.img1Alt': 'Barista dolévá napěněné mléko a dokončuje latte u baru CafeArt',
            'story.img2Alt': 'Naběračka čerstvých zelených kávových třešní ze sklizně',
            'story.badge': 'Etický původ',
            'story.eyebrow': '— Náš příběh',
            'story.title': 'Z vysočiny<br />do vašich rukou.',
            'story.p1': 'CafeArt vznikla v malinké rohové pražírně s jediným bubnovým pražičem a jednou posedlostí: vnímat kávu jako řemeslo, ne jako komoditu. O deset let později stále odebíráme každé zrnko přímo od pěstitelů, kteří sdílejí naši lásku k půdě.',
            'story.p2': 'Každou dávku pražíme v malých šaržích, necháme ji dokonale odpočinout a připravují ji baristé, pro které je příprava uměním. Výsledkem je šálek s podpisem — tím vaším.',
            'story.list1': 'Bubnové pražení v malých dávkách',
            'story.list2': 'Přímý obchod s pěstiteli',
            'story.list3': 'Vlastní latte art',
            'story.list4': 'Bezodpadová kuchyně',
            'story.cta': 'Jak to děláme',

            'menu.eyebrow': '— Naše menu', 'menu.title': 'Připravené na míru',
            'menu.lead': 'Nakloňte kartu a ožije. Každý nápoj připravujeme z vlastnoručně pražených zrn a se spoustou srdce.',
            'menu.filterAll': 'Vše', 'menu.filterEspresso': 'Espresso', 'menu.filterBrew': 'Pomalá příprava',
            'menu.filterCold': 'Studené', 'menu.filterSignature': 'Speciály',

            'menu.espresso.name': 'Origin Espresso', 'menu.espresso.tag': 'Domácí', 'menu.espresso.note': 'Výrazné · 28 s',
            'menu.espresso.desc': 'Sirupovité single origin espresso s tóny kakaa a pražených lískových oříšků.',
            'menu.flatwhite.name': 'Velvet Flat White', 'menu.flatwhite.tag': 'Oblíbené', 'menu.flatwhite.note': 'Hedvábné · 150 ml',
            'menu.flatwhite.desc': 'Dvojité ristretto pod tenoučkou vrstvou jemné mléčné pěny. Čistá rovnováha.',
            'menu.cortado.name': 'Medový Cortado', 'menu.cortado.note': 'Sladké · 120 ml',
            'menu.cortado.desc': 'Stejný díl espressa a napěněného mléka, dochucené pravým květovým medem.',
            'menu.pourover.name': 'Pomalý Pour-Over', 'menu.pourover.tag': 'Single Origin', 'menu.pourover.note': 'Svěží · V60',
            'menu.pourover.desc': 'Ručně přeléváno po dobu čtyř minut, aby vynikly jemné květinové a citrusové tóny.',
            'menu.siphon.name': 'Siphon Reserve', 'menu.siphon.tag': 'Vzácné', 'menu.siphon.note': 'Čisté · Divadelní',
            'menu.siphon.desc': 'Vakuově připravené přímo u stolu pro křišťálově čistý, čaji podobný šálek. Zážitek sám o sobě.',
            'menu.nitro.name': 'Nitro Cold Brew', 'menu.nitro.tag': 'Z pípy', 'menu.nitro.note': 'Krémové · Kaskádovité',
            'menu.nitro.desc': 'Louhované 20 hodin a sycené dusíkem pro sametovou pěnu jako u stoutu.',
            'menu.iced.name': 'Ledové javorové latte', 'menu.iced.note': 'Jemné · 350 ml',
            'menu.iced.desc': 'Za studena připravené espresso, ovesné mléko a nitka tmavého javorového sirupu přes čirý led.',
            'menu.painter.name': 'Malíř', 'menu.painter.tag': 'Speciál', 'menu.painter.note': 'Volba baristy',
            'menu.painter.desc': 'Proměnlivé latte-art mistrovské dílo — domácí směs, tajné koření a pevná ruka.',
            'menu.mocha.name': 'Půlnoční mocha', 'menu.mocha.tag': 'Speciál', 'menu.mocha.note': '70% hořká',
            'menu.mocha.desc': 'Single origin espresso, na kameni mletá hořká čokoláda a špetka mořské soli.',

            'craft.eyebrow': '— Řemeslo', 'craft.title': 'Čtyři kroky k dokonalému šálku',
            'craft.s1t': 'Zdroj', 'craft.s1d': 'Cestujeme přímo k pěstitelům, ochutnáváme a ručně vybíráme dávky z farem, kterým důvěřujeme.',
            'craft.s2t': 'Pražení', 'craft.s2d': 'Malé dávky pražené na historickém bubnu, profilované tak, aby vynikl charakter každého zrna.',
            'craft.s3t': 'Odpočinek', 'craft.s3d': 'Zrna několik dní odpočívají, aby se chutě ustálily, a meleme je až na objednávku.',
            'craft.s4t': 'Příprava', 'craft.s4d': 'Naši baristé extrahují s přesností a dokončí to uměním, které se vám nebude chtít vypít.',

            'gallery.eyebrow': '— Prostor', 'gallery.title': 'Místo, kde se budete chtít zdržet',
            'gallery.lead': 'Teplé světlo, ošlapané dřevo a tiché hučení mlýnku. Pojďte dál.',
            'gallery.cap1': 'Pražírna', 'gallery.cap2': 'Barový pult', 'gallery.cap3': 'Místa u oken',
            'gallery.cap4': 'Dlouhý stůl', 'gallery.cap5': 'Mezanin',
            'gallery.aria1': 'Zvětšit: Pražírna', 'gallery.aria2': 'Zvětšit: Barový pult', 'gallery.aria3': 'Zvětšit: Místa u oken',
            'gallery.aria4': 'Zvětšit: Dlouhý stůl', 'gallery.aria5': 'Zvětšit: Mezanin',

            'quotes.eyebrow': '— Milá slova',
            'quote1.text': 'Zdejší flat white mi znechutil každou jinou kávu. Stojí za každou minutu ve frontě.',
            'quote1.role': 'stálá hostka od roku 2017',
            'quote2.text': 'Není to kavárna, je to meditace. Světlo, vůně, příprava — čisté umění.',
            'quote2.role': 'místní fotograf',
            'quote3.text': 'Přišla jsem kvůli latte art a zůstala tři hodiny. Nejlepší cold brew ve městě, tečka.',
            'quote3.role': 'spisovatelka a poutnice',
            'press.label': 'Psali o nás',

            'visit.eyebrow': '— Zastavte se', 'visit.title': 'Navštivte pražírnu',
            'visit.lead': 'Přisedněte si k baru, zaberte místo u okna nebo si odneste sáček čerstvých zrn domů. Rádi s vámi sdílíme šálek.',
            'visit.findus': 'Kde nás najdete', 'visit.hours': 'Otevřeno denně', 'visit.hoursVal': 'Po–Pá 7–19 · So–Ne 8–18',
            'visit.hello': 'Napište nám', 'visit.playlist': 'Náš playlist',
            'visit.mapTitle': 'Mapa s polohou pražírny CafeArt',

            'form.title': 'Rezervovat stůl', 'form.name': 'Vaše jméno', 'form.email': 'E-mailová adresa',
            'form.date': 'Datum', 'form.party': 'Počet osob',
            'form.g1': '1 host', 'form.g2': '2 hosté', 'form.g3': '3 hosté', 'form.g4': '4 hosté', 'form.g5': '5+ hostů',
            'form.note': 'Máme něco vědět? (nepovinné)', 'form.submit': 'Odeslat rezervaci', 'form.sending': 'Odesílám…',
            'form.errRequired': 'Doplňte prosím jméno, platný e-mail a datum. ☕',
            'form.demoOk': 'Děkujeme, {name}! Brzy potvrdíme váš stůl na hello@cafeart.coffee.',
            'form.sent': 'Děkujeme, {name}! Vaše rezervace dorazila — brzy se ozveme.',
            'form.fail': 'Hmm, odeslání se nezdařilo. Napište nám na hello@cafeart.coffee a vyřešíme to.',
            'form.neterr': 'Výpadek sítě — zkuste to prosím znovu nebo napište na hello@cafeart.coffee.',

            'footer.tagline': 'Každý šálek je umělecké dílo. Pražíme s rozmyslem, podáváme s láskou.',
            'footer.c1': 'Objevte', 'footer.c1a': 'Náš příběh', 'footer.c1b': 'Menu', 'footer.c1c': 'Řemeslo', 'footer.c1d': 'Galerie',
            'footer.c2': 'Návštěva', 'footer.c2a': 'Otevírací doba', 'footer.c2b': 'Kde nás najdete', 'footer.c2c': 'Rezervace',
            'footer.c3': 'Zrna', 'footer.c3a': 'Nakoupit kávu', 'footer.c3b': 'Předplatné', 'footer.c3c': 'Velkoobchod',
            'footer.rights': 'CafeArt Roastery. Uvařeno s péčí.',
            'footer.credit': 'Vytvořeno s ☕ a <span>opravdovými záběry z pražení</span>',

            'lb.title': 'Prohlížeč obrázků', 'lb.close': 'Zavřít', 'lb.prev': 'Předchozí obrázek', 'lb.next': 'Další obrázek',
        },
    };

    const SUPPORTED = ['en', 'cs'];
    const STORE_KEY = 'cafeart-lang';

    function detect() {
        const saved = localStorage.getItem(STORE_KEY);
        if (saved && SUPPORTED.includes(saved)) return saved;
        const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
        return nav.startsWith('cs') ? 'cs' : 'en';
    }

    let lang = detect();

    function t(key) {
        const d = I18N[lang] || I18N.en;
        return (d[key] != null ? d[key] : (I18N.en[key] != null ? I18N.en[key] : key));
    }

    function applyTranslations() {
        const root = document;
        root.querySelectorAll('[data-i18n]').forEach((el) => {
            const v = t(el.getAttribute('data-i18n'));
            if (v != null) el.textContent = v;
        });
        root.querySelectorAll('[data-i18n-html]').forEach((el) => {
            const v = t(el.getAttribute('data-i18n-html'));
            if (v != null) el.innerHTML = v;
        });
        root.querySelectorAll('[data-i18n-attr]').forEach((el) => {
            el.getAttribute('data-i18n-attr').split(';').forEach((pair) => {
                const i = pair.indexOf(':');
                if (i < 0) return;
                const attr = pair.slice(0, i).trim();
                const v = t(pair.slice(i + 1).trim());
                if (v != null) el.setAttribute(attr, v);
            });
        });
        document.documentElement.lang = lang;
        const ogLocale = document.querySelector('meta[property="og:locale"]');
        if (ogLocale) ogLocale.setAttribute('content', lang === 'cs' ? 'cs_CZ' : 'en_US');
    }

    function syncButtons() {
        document.querySelectorAll('#langToggle .lang__btn').forEach((b) => {
            const on = b.dataset.lang === lang;
            b.classList.toggle('is-active', on);
            b.setAttribute('aria-pressed', String(on));
        });
    }

    function setLang(next) {
        if (!SUPPORTED.includes(next)) return;
        lang = next;
        window.cafeLang = lang;
        try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* ignore */ }
        applyTranslations();
        syncButtons();
        window.dispatchEvent(new CustomEvent('cafeart:langchange', { detail: { lang } }));
    }

    // Expose for main.js (menu cards, form messages)
    window.cafeLang = lang;
    window.t = t;
    window.applyTranslations = applyTranslations;
    window.setLang = setLang;

    function init() {
        applyTranslations();
        syncButtons();
        const toggle = document.getElementById('langToggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                const btn = e.target.closest('.lang__btn');
                if (btn) setLang(btn.dataset.lang);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
