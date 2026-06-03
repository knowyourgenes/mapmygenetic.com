// Base styles for the homepage, extracted verbatim from the original design.
// Responsive media queries are appended at the end of this string.
export const styles = `
/* ============================================================
   MAPMYGENETIC.COM · FAQ REFERENCE SITE
   Aesthetic: Editorial / Clinical / Reference - think a well-designed
   medical journal meets a broadsheet newspaper. Deep navy structure,
   warm parchment ground, gold accents, serif display, clean sans body.
   ============================================================ */

:root {
  --navy:         #0E4D4B;
  --navy-2:       #0E4D4B;
  --navy-3:       #0E4D4B;
  --gold:         #C49A3C;
  --gold-light:   #E8C97A;
  --gold-pale:    #F5E9C8;
  --parchment:    #FAF6EF;
  --parchment-2:  #EDE7D7;
  --parchment-3:  #E0D8C4;
  --ink:          #1A1510;
  --ink-2:        #3D3628;
  --ink-3:        #6B6050;
  --ink-4:        #9A8E7E;
  --line:         rgba(11,27,46,.10);
  --line-gold:    rgba(196,154,60,.25);

  --r-sm: 8px;
  --r-md: 14px;
  --r-lg: 20px;
  --r-xl: 28px;

  --sh-card: 0 4px 24px -8px rgba(11,27,46,.10);
  --sh-deep: 0 16px 50px -12px rgba(11,27,46,.18);

  --e-out: cubic-bezier(0.22, 1, 0.36, 1);

  --ff: 'Figtree', system-ui, sans-serif;
  --ff-serif: 'Instrument Serif', Georgia, serif;
  --ff-mono: 'DM Mono', monospace;
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
body {
  margin: 0;
  font-family: var(--ff);
  font-size: 16px;
  line-height: 1.6;
  color: var(--ink);
  background: var(--parchment);
  overflow-x: hidden;
}
img, svg { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
button { font-family: inherit; cursor: pointer; border: 0; background: none; color: inherit; }
h1, h2, h3, h4, p { margin: 0; }
h1, h2 { font-weight: 700; }
h3, h4 { font-weight: 600; }
strong, b { font-weight: 700; }

/* ===== Subtle grid texture ===== */
body::before {
  content: "";
  position: fixed; inset: 0; z-index: -1;
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.35;
  pointer-events: none;
}

/* ===== Container ===== */
.wrap { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 32px; }
.wrap--narrow { max-width: 860px; }
.wrap--mid { max-width: 1040px; }

/* ============================================================
   NAV
   ============================================================ */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  transition: all .4s var(--e-out);
}
.nav__inner {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 40px;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: padding .4s var(--e-out), background .4s var(--e-out), border-color .4s var(--e-out);
}
.nav.scrolled .nav__inner {
  padding: 12px 40px;
  background: rgba(247, 243, 234, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom-color: var(--line-gold);
}
.nav__brand {
  display: flex; align-items: center; gap: 14px;
}
.nav__mark {
  width: 36px; height: 36px;
  background: var(--navy);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}
.nav__mark::after {
  content: "";
  position: absolute; inset: 0;
  background: linear-gradient(135deg, transparent 40%, rgba(196,154,60,.3));
}
.nav__dna {
  width: 20px; height: 20px;
  position: relative; z-index: 1;
}
.nav__wordmark {
  display: flex; flex-direction: column; gap: 1px;
}
.nav__site {
  font-family: var(--ff-serif);
  font-size: 17px;
  color: var(--navy);
  letter-spacing: -.01em;
  line-height: 1;
}
.nav__tld {
  font-family: var(--ff-mono);
  font-size: 10px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--gold);
}
.nav__links {
  display: flex; align-items: center; gap: 28px;
}
.nav__link {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--ink-3);
  letter-spacing: .01em;
  transition: color .3s;
}
.nav__link:hover { color: var(--navy); }
.nav__cta {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 18px;
  background: var(--navy);
  color: var(--parchment);
  border-radius: 999px;
  font-size: 13.5px;
  font-weight: 500;
  letter-spacing: .01em;
  transition: all .4s var(--e-out);
}
.nav__cta:hover {
  background: var(--navy-3);
  transform: translateY(-1px);
}

/* ============================================================
   HERO
   ============================================================ */
.hero {
  padding: 160px 0 100px;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: "";
  position: absolute;
  top: 0; left: 50%; transform: translateX(-50%);
  width: 900px; height: 600px;
  background: radial-gradient(ellipse at 50% 30%, rgba(196,154,60,.12) 0%, transparent 65%);
  pointer-events: none;
}
.hero__inner {
  max-width: 820px;
  margin: 0 auto;
  padding: 0 32px;
  text-align: center;
  position: relative;
}
.hero__badge {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 7px 16px;
  border: 1px solid var(--line-gold);
  background: rgba(245, 233, 200, .5);
  border-radius: 999px;
  margin-bottom: 36px;
}
.hero__badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--gold);
}
.hero__badge-text {
  font-family: var(--ff-mono);
  font-size: 11px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.hero__eyebrow {
  font-family: var(--ff-mono);
  font-size: 11.5px;
  letter-spacing: .15em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 20px;
}
.hero__h1 {
  font-family: var(--ff);
  font-size: clamp(44px, 7vw, 76px);
  line-height: 1.06;
  letter-spacing: -.02em;
  color: var(--navy);
  margin-bottom: 24px;
}
.hero__h1_br {
  font-family: var(--ff-serif);
  font-size: clamp(44px, 7vw, 76px);
  line-height: 1.06;
  letter-spacing: -.02em;
  color: var(--navy);
  margin-bottom: 24px;
}
.hero__h1 em {
  font-style: italic;
  color: var(--gold);
}
.hero__sub {
  font-size: 18px;
  line-height: 1.65;
  color: var(--ink-3);
  max-width: 600px;
  margin: 0 auto 44px;
  font-weight: 300;
}
.hero__actions {
  display: flex; align-items: center; justify-content: center; gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 64px;
}
.btn {
  display: inline-flex; align-items: center; gap: 9px;
  padding: 13px 24px;
  border-radius: 999px;
  font-weight: 500; font-size: 14.5px;
  letter-spacing: .005em;
  transition: all .4s var(--e-out);
  white-space: nowrap;
}
.btn--navy {
  background: var(--navy);
  color: var(--parchment);
  box-shadow: 0 8px 24px -8px rgba(11,27,46,.35);
}
.btn--navy:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px -10px rgba(11,27,46,.45);
}
.btn--outline {
  background: transparent;
  color: var(--navy);
  border: 1.5px solid var(--parchment-3);
}
.btn--outline:hover {
  border-color: var(--navy);
  background: rgba(11,27,46,.04);
}

/* ===== Search bar ===== */
.hero__search {
  max-width: 580px;
  margin: 0 auto;
  position: relative;
}
.hero__search-icon {
  position: absolute; left: 20px; top: 50%; transform: translateY(-50%);
  width: 20px; height: 20px; pointer-events: none;
}
.hero__search-input {
  width: 100%;
  padding: 16px 24px 16px 52px;
  background: white;
  border: 1.5px solid var(--parchment-3);
  border-radius: 999px;
  font-family: var(--ff);
  font-size: 15px;
  color: var(--ink);
  outline: none;
  box-shadow: var(--sh-card);
  transition: all .3s var(--e-out);
}
.hero__search-input::placeholder { color: var(--ink-4); }
.hero__search-input:focus {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px rgba(196,154,60,.15), var(--sh-card);
}
.hero__search-pills {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  flex-wrap: wrap;
  margin-top: 16px;
}
.pill {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 14px;
  background: white;
  border: 1px solid var(--parchment-3);
  border-radius: 999px;
  font-size: 12.5px;
  color: var(--ink-3);
  cursor: pointer;
  transition: all .3s var(--e-out);
}
.pill:hover {
  border-color: var(--gold);
  color: var(--navy);
  background: var(--gold-pale);
}

/* ============================================================
   DIVIDER LINE
   ============================================================ */
.rule {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--line-gold) 30%, var(--line-gold) 70%, transparent);
  margin: 0;
}

/* ============================================================
   STATS BAR
   ============================================================ */
.stats {
  padding: 40px 0;
  background: var(--navy);
  position: relative;
}
.stats::before {
  content: "";
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(196,154,60,.07) 0%, transparent 60%);
  pointer-events: none;
}
.stats__grid {
  display: flex; align-items: center; justify-content: center;
  gap: 0;
  position: relative;
}
.stats__item {
  flex: 1; max-width: 240px;
  padding: 0 40px;
  text-align: center;
  border-right: 1px solid rgba(255,255,255,.08);
}
.stats__item:last-child { border-right: 0; }
.stats__num {
  font-family: var(--ff);
  font-size: 38px;
  color: var(--gold-light);
  line-height: 1;
  margin-bottom: 6px;
}
.stats__label {
  font-size: 12px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: rgba(247,243,234,.5);
  font-family: var(--ff-mono);
}

/* ============================================================
   CATEGORIES
   ============================================================ */
.categories {
  padding: 80px 0 60px;
}
.section-label {
  font-family: var(--ff-mono);
  font-size: 11px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 12px;
}
.section-title {
  font-family: var(--ff-serif);
  font-size: clamp(28px, 4vw, 40px);
  color: var(--navy);
  letter-spacing: -.02em;
  line-height: 1.15;
  margin-bottom: 48px;
}
.section-title em { font-style: italic; }

.cats__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.cat-card {
  padding: 22px 20px 20px;
  background: white;
  border: 1px solid var(--parchment-3);
  border-radius: var(--r-lg);
  cursor: pointer;
  transition: all .4s var(--e-out);
  position: relative;
  overflow: hidden;
}
.cat-card::before {
  content: "";
  position: absolute; top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .4s var(--e-out);
}
.cat-card:hover {
  border-color: var(--line-gold);
  box-shadow: var(--sh-card);
  transform: translateY(-3px);
}
.cat-card:hover::before { transform: scaleX(1); }
.cat-card.active {
  border-color: var(--gold);
  background: var(--gold-pale);
}
.cat-card.active::before { transform: scaleX(1); }
.cat__icon {
  width: 36px; height: 36px;
  background: var(--parchment-2);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 14px;
  transition: background .3s;
}
.cat-card.active .cat__icon,
.cat-card:hover .cat__icon {
  background: rgba(196,154,60,.2);
}
.cat__name {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--navy);
  margin-bottom: 5px;
  line-height: 1.3;
}
.cat__count {
  font-size: 11.5px;
  color: var(--ink-4);
  font-family: var(--ff-mono);
}

/* ============================================================
   FAQ SECTION
   ============================================================ */
.faq-section {
  padding: 0 0 100px;
}
.faq__header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 32px;
}
.faq__title {
  font-family: var(--ff-serif);
  font-size: 26px;
  color: var(--navy);
  letter-spacing: -.015em;
}
.faq__showing {
  font-size: 13px;
  color: var(--ink-4);
  font-family: var(--ff-mono);
}
.faq__list {
  display: flex; flex-direction: column; gap: 2px;
}
.faq__item {
  border: 1px solid var(--parchment-3);
  border-radius: var(--r-md);
  background: white;
  overflow: hidden;
  transition: border-color .3s var(--e-out), box-shadow .3s var(--e-out);
}
.faq__item:hover {
  border-color: var(--line-gold);
}
.faq__item.open {
  border-color: var(--gold);
  box-shadow: var(--sh-card);
}
.faq__q {
  width: 100%;
  display: flex; align-items: center; justify-content: space-between;
  gap: 20px;
  padding: 22px 24px;
  text-align: left;
  cursor: pointer;
}
.faq__q-left {
  display: flex; align-items: center; gap: 16px;
  flex: 1;
}
.faq__cat-badge {
  flex-shrink: 0;
  padding: 3px 10px;
  border-radius: 999px;
  font-family: var(--ff-mono);
  font-size: 9.5px;
  letter-spacing: .1em;
  text-transform: uppercase;
  background: var(--parchment-2);
  color: var(--ink-3);
  white-space: nowrap;
  display: none;
}
.faq__cat-badge.show { display: block; }
.faq__q-text {
  font-size: 15.5px;
  font-weight: 500;
  color: var(--navy);
  line-height: 1.45;
}
.faq__chevron {
  flex-shrink: 0;
  width: 30px; height: 30px;
  border-radius: 999px;
  background: var(--parchment-2);
  display: flex; align-items: center; justify-content: center;
  transition: all .35s var(--e-out);
}
.faq__item.open .faq__chevron {
  background: var(--gold);
  transform: rotate(180deg);
}
.faq__chevron svg { width: 14px; height: 14px; }
.faq__a {
  max-height: 0;
  overflow: hidden;
  transition: max-height .5s var(--e-out);
}
.faq__item.open .faq__a { max-height: 800px; }
.faq__a-inner {
  padding: 0 24px 28px;
  border-top: 1px solid var(--parchment-2);
  padding-top: 22px;
}
.faq__body {
  font-size: 15px;
  line-height: 1.75;
  color: var(--ink-2);
}
.faq__body p { margin: 0 0 14px; }
.faq__body p:last-of-type { margin-bottom: 0; }
.faq__meta {
  display: flex; align-items: center; gap: 8px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--parchment-2);
  font-family: var(--ff-mono);
  font-size: 11px;
  color: var(--ink-4);
  letter-spacing: .04em;
}
.faq__meta-dot {
  width: 3px; height: 3px;
  border-radius: 50%;
  background: var(--ink-4);
}

/* ============================================================
   EDITORIAL STANDARDS
   ============================================================ */
.standards {
  padding: 80px 0;
  background: var(--navy);
  position: relative;
  overflow: hidden;
}
.standards::before {
  content: "";
  position: absolute;
  top: -200px; right: -200px;
  width: 600px; height: 600px;
  border: 1px solid rgba(196,154,60,.1);
  border-radius: 50%;
  pointer-events: none;
}
.standards::after {
  content: "";
  position: absolute;
  bottom: -300px; left: -200px;
  width: 700px; height: 700px;
  border: 1px solid rgba(196,154,60,.06);
  border-radius: 50%;
  pointer-events: none;
}
.standards__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  position: relative; z-index: 1;
}
.standards__label {
  font-family: var(--ff-mono);
  font-size: 11px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 14px;
}
.standards__h2 {
  font-family: var(--ff);
  font-size: clamp(30px, 4vw, 44px);
  color: white;
  line-height: 1.12;
  letter-spacing: -.02em;
  margin-bottom: 22px;
}
.standards__h2_br {
  font-family: var(--ff-serif);
  font-size: clamp(30px, 4vw, 44px);
  color: white;
  line-height: 1.12;
  letter-spacing: -.02em;
  margin-bottom: 22px;
}
.standards__h2 em { color: var(--gold-light); font-style: italic; }
.standards__body {
  font-size: 15.5px;
  line-height: 1.75;
  color: rgba(247,243,234,.7);
  font-weight: 300;
}
.standards__pillars {
  display: flex; flex-direction: column; gap: 20px;
}
.pillar {
  display: flex; gap: 18px;
  align-items: flex-start;
  padding: 20px 22px;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(196,154,60,.15);
  border-radius: var(--r-md);
  transition: background .3s;
}
.pillar:hover { background: rgba(255,255,255,.08); }
.pillar__num {
  font-family: var(--ff-serif);
  font-size: 28px;
  color: var(--gold);
  line-height: 1;
  min-width: 28px;
}
.pillar__content {}
.pillar__title {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 5px;
}
.pillar__text {
  font-size: 13.5px;
  line-height: 1.6;
  color: rgba(247,243,234,.55);
  font-weight: 300;
}

/* ============================================================
   NEWSLETTER
   ============================================================ */
.newsletter {
  padding: 80px 0;
  background: var(--parchment);
}
.newsletter__box {
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
}
.newsletter__icon {
  width: 56px; height: 56px;
  background: var(--navy);
  border-radius: var(--r-lg);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 24px;
}
.newsletter__h2 {
  font-family: var(--ff);
  font-size: 34px;
  color: var(--navy);
  letter-spacing: -.02em;
  line-height: 1.15;
  margin-bottom: 12px;
}
.newsletter__h2_br {
  font-family: var(--ff-serif);
  font-size: 34px;
  color: var(--navy);
  letter-spacing: -.02em;
  line-height: 1.15;
  margin-bottom: 12px;
}
.newsletter__sub {
  font-size: 15.5px;
  color: var(--ink-3);
  line-height: 1.65;
  margin-bottom: 36px;
  font-weight: 300;
}
.newsletter__form {
  display: flex; gap: 10px;
  max-width: 480px;
  margin: 0 auto;
}
.newsletter__input {
  flex: 1;
  padding: 14px 20px;
  border: 1.5px solid var(--parchment-3);
  border-radius: 999px;
  font-family: var(--ff);
  font-size: 14.5px;
  color: var(--ink);
  background: white;
  outline: none;
  transition: border-color .3s;
}
.newsletter__input:focus { border-color: var(--gold); }
.newsletter__input::placeholder { color: var(--ink-4); }
.newsletter__note {
  margin-top: 14px;
  font-size: 12.5px;
  color: var(--ink-4);
}

/* ============================================================
   FOOTER
   ============================================================ */
.footer {
  padding: 48px 0;
  background: var(--navy-2);
  border-top: 1px solid rgba(196,154,60,.12);
}
.footer__inner {
  display: flex; align-items: center; justify-content: space-between;
}
.footer__brand {
  font-family: var(--ff-serif);
  font-size: 18px;
  color: white;
}
.footer__brand span {
  color: var(--gold);
}
.footer__links {
  display: flex; gap: 28px;
}
.footer__link {
  font-size: 13px;
  color: rgba(255,255,255,.4);
  transition: color .3s;
}
.footer__link:hover { color: rgba(255,255,255,.8); }
.footer__copy {
  font-family: var(--ff-mono);
  font-size: 11px;
  color: rgba(255,255,255,.25);
  letter-spacing: .04em;
}

/* ============================================================
   ANIMATIONS
   ============================================================ */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.anim { opacity: 0; }
.anim.in { animation: fadeUp .7s var(--e-out) forwards; }
.anim-d1 { animation-delay: .1s; }
.anim-d2 { animation-delay: .2s; }
.anim-d3 { animation-delay: .3s; }
.anim-d4 { animation-delay: .4s; }
.anim-d5 { animation-delay: .5s; }

/* No-JS fallback */
.no-js .anim { opacity: 1; }

/* ============================================================
   RESPONSIVE
   ============================================================ */

/* Keep long answers from being clipped by the accordion's max-height. */
.faq__item.open .faq__a { max-height: 3000px; }

@media (max-width: 1024px) {
  .standards__inner { gap: 48px; }
}

@media (max-width: 900px) {
  .cats__grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 860px) {
  .standards__inner { grid-template-columns: 1fr; gap: 40px; }
}

@media (max-width: 768px) {
  .wrap { padding: 0 20px; }

  .nav__inner { padding: 16px 20px; }
  .nav.scrolled .nav__inner { padding: 10px 20px; }
  .nav__links { display: none; }

  .hero { padding: 120px 0 72px; }
  .hero__inner { padding: 0 20px; }
  .hero__actions { margin-bottom: 48px; }

  .stats { padding: 32px 0; }
  .stats__grid { flex-wrap: wrap; gap: 28px 0; }
  .stats__item { flex: 0 0 50%; max-width: 50%; padding: 0 16px; border-right: 0; }
  .stats__item:nth-child(odd) { border-right: 1px solid rgba(255,255,255,.08); }
  .stats__num { font-size: 32px; }

  .categories { padding: 60px 0 48px; }
  .section-title { margin-bottom: 32px; }

  .standards { padding: 56px 0; }

  .faq-section { padding: 0 0 72px; }
  .faq__q { padding: 18px 16px; gap: 12px; }
  .faq__q-left { gap: 10px; flex-wrap: wrap; }
  .faq__a-inner { padding: 0 16px 22px; padding-top: 18px; }

  .newsletter { padding: 56px 0; }
}

@media (max-width: 640px) {
  .cats__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 520px) {
  .newsletter__form { flex-direction: column; }
  .newsletter__form .btn { justify-content: center; }
  .newsletter__h2, .newsletter__h2_br { font-size: 27px; }

  .footer__inner { flex-direction: column; gap: 18px; text-align: center; }
  .footer__links { flex-wrap: wrap; justify-content: center; gap: 18px 22px; }
}

@media (max-width: 480px) {
  /* Compact nav so the brand + CTA fit small phones. */
  .nav__inner { padding: 12px 16px; }
  .nav.scrolled .nav__inner { padding: 10px 16px; }
  .nav__brand { gap: 9px; }
  .nav__mark { width: 30px; height: 30px; }
  .nav__site { font-size: 15px; }
  .nav__cta { padding: 8px 14px; font-size: 12px; gap: 6px; }
  .nav__cta svg { width: 13px; height: 13px; }
}

@media (max-width: 420px) {
  .hero { padding: 104px 0 60px; }
  .faq__header { flex-direction: column; align-items: flex-start; gap: 6px; }
  .stats__num { font-size: 28px; }
  .pillar { padding: 16px 16px; gap: 14px; }
}

@media (max-width: 360px) {
  /* 320px-class screens: trim the CTA to just its label and ease the headline. */
  .nav__inner { padding: 11px 12px; }
  .nav__brand { gap: 8px; }
  .nav__cta { padding: 7px 12px; }
  .nav__cta svg { display: none; }
  .hero__inner { padding: 0 16px; }
  .hero__h1, .hero__h1_br { font-size: 38px; }
  .wrap { padding: 0 16px; }
}
`;
