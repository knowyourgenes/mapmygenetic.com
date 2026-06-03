"use client";

import { useEffect } from "react";
import { styles } from "./homepageStyles";
import type {
  HomepageContent,
  Category,
  Question,
  Stat,
  AnswerBlock,
} from "../sanity/fetch";

const fontsHref =
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=DM+Mono:wght@400;500&display=swap";

type Props = {
  content: HomepageContent;
  categories: Category[];
  questions: Question[];
  stats: Stat[];
};

const Chevron = () => (
  <svg viewBox="0 0 14 14" fill="none">
    <path
      d="M3 5l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Decorative category icons, keyed by category slug. Presentational only -
// all textual content comes from Sanity.
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  all: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect
        x="1.5"
        y="1.5"
        width="6"
        height="6"
        rx="1.5"
        stroke="var(--gold)"
        strokeWidth="1.5"
      />
      <rect
        x="10.5"
        y="1.5"
        width="6"
        height="6"
        rx="1.5"
        stroke="var(--gold)"
        strokeWidth="1.5"
      />
      <rect
        x="1.5"
        y="10.5"
        width="6"
        height="6"
        rx="1.5"
        stroke="var(--gold)"
        strokeWidth="1.5"
      />
      <rect
        x="10.5"
        y="10.5"
        width="6"
        height="6"
        rx="1.5"
        stroke="var(--gold)"
        strokeWidth="1.5"
      />
    </svg>
  ),
  basics: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="var(--ink-3)" strokeWidth="1.5" />
      <path
        d="M9 5v4l2.5 2.5"
        stroke="var(--ink-3)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  dna: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M5 2c0 3.5 4 4.5 4 7s-4 4-4 7"
        stroke="var(--ink-3)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13 2c0 3.5-4 4.5-4 7s4 4 4 7"
        stroke="var(--ink-3)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="5.5"
        y1="5.5"
        x2="12.5"
        y2="5.5"
        stroke="var(--ink-3)"
        strokeWidth="1"
        opacity=".5"
      />
      <line
        x1="5.5"
        y1="9"
        x2="12.5"
        y2="9"
        stroke="var(--ink-3)"
        strokeWidth="1"
        opacity=".5"
      />
      <line
        x1="5.5"
        y1="12.5"
        x2="12.5"
        y2="12.5"
        stroke="var(--ink-3)"
        strokeWidth="1"
        opacity=".5"
      />
    </svg>
  ),
  inheritance: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="3" r="2" stroke="var(--ink-3)" strokeWidth="1.5" />
      <circle cx="4" cy="13" r="2" stroke="var(--ink-3)" strokeWidth="1.5" />
      <circle cx="14" cy="13" r="2" stroke="var(--ink-3)" strokeWidth="1.5" />
      <path
        d="M9 5v3M7 8l-3 3M11 8l3 3"
        stroke="var(--ink-3)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  ancestry: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="var(--ink-3)" strokeWidth="1.5" />
      <path
        d="M2 9h14M9 2c-2 2-3 4-3 7s1 5 3 7"
        stroke="var(--ink-3)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  ),
  health: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M9 16s-7-4.5-7-8.5a4.5 4.5 0 018.5-1.5A4.5 4.5 0 0116 7.5C16 11.5 9 16 9 16z"
        stroke="var(--ink-3)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  traits: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M3 14l4-4 3 3 5-7"
        stroke="var(--ink-3)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  pregnancy: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="7" r="3.5" stroke="var(--ink-3)" strokeWidth="1.5" />
      <path
        d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6"
        stroke="var(--ink-3)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  ethics: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M9 1.5L11 6.5H16L12 9.5L14 14.5L9 11.5L4 14.5L6 9.5L2 6.5H7L9 1.5Z"
        stroke="var(--ink-3)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  default: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="var(--ink-3)" strokeWidth="1.5" />
      <circle cx="9" cy="9" r="2.5" stroke="var(--ink-3)" strokeWidth="1.5" />
    </svg>
  ),
};

function categoryIcon(slug: string): React.ReactNode {
  return CATEGORY_ICONS[slug] ?? CATEGORY_ICONS.default;
}

function answerCount(n: number): string {
  return `${n} ${n === 1 ? "answer" : "answers"}`;
}

// Render Sanity portable-text answer blocks, honouring bold (`strong`) runs.
function renderAnswer(blocks: AnswerBlock[]) {
  return (blocks ?? []).map((block, i) => (
    <p key={block._key ?? i}>
      {(block.children ?? []).map((span, j) =>
        span.marks?.includes("strong") ? (
          <strong key={j}>{span.text}</strong>
        ) : (
          <span key={j}>{span.text}</span>
        )
      )}
    </p>
  ));
}

export default function Homepage({
  content,
  categories,
  questions,
  stats,
}: Props) {
  useEffect(() => {
    /* ===== Nav scroll ===== */
    const nav = document.getElementById("nav");
    const onScroll = () => {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);

    /* ===== Intersection observer for animations ===== */
    const animEls = document.querySelectorAll(".anim");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    animEls.forEach((el) => observer.observe(el));

    /* ===== State ===== */
    let activeCategory = "all";
    let searchVal = "";

    /* ===== FAQ accordion ===== */
    const toggleFaq = (btn: HTMLElement) => {
      const item = btn.closest(".faq__item");
      if (!item) return;
      const isOpen = item.classList.contains("open");
      document
        .querySelectorAll(".faq__item.open")
        .forEach((el) => el.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    };

    /* ===== Category filter ===== */
    const filterCategory = (card: HTMLElement, cat: string) => {
      document
        .querySelectorAll(".cat-card")
        .forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
      activeCategory = cat;
      updateFaqList();
    };

    /* ===== Search filter ===== */
    const searchInput = document.querySelector(
      ".hero__search-input"
    ) as HTMLInputElement | null;
    const onSearchInput = function (this: HTMLInputElement) {
      searchVal = this.value.toLowerCase();
      updateFaqList();
    };
    if (searchInput) searchInput.addEventListener("input", onSearchInput);

    const filterByTag = (tag: string) => {
      if (searchInput) {
        searchInput.value = tag;
        searchVal = tag.toLowerCase();
      }
      updateFaqList();
      document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
    };

    function updateFaqList() {
      const items = document.querySelectorAll<HTMLElement>(".faq__item");
      const total = items.length;
      let visible = 0;

      items.forEach((item) => {
        const cat = item.dataset.cat;
        const tags = (item.dataset.tags || "").toLowerCase();
        const qText =
          item.querySelector(".faq__q-text")?.textContent?.toLowerCase() || "";
        const bodyText =
          item.querySelector(".faq__body")?.textContent?.toLowerCase() || "";

        const catMatch = activeCategory === "all" || cat === activeCategory;
        const searchMatch =
          !searchVal ||
          qText.includes(searchVal) ||
          tags.includes(searchVal) ||
          bodyText.includes(searchVal);

        if (catMatch && searchMatch) {
          item.style.display = "";
          visible++;
          const badge = item.querySelector(".faq__cat-badge");
          badge?.classList.toggle("show", activeCategory === "all");
        } else {
          item.style.display = "none";
        }
      });

      const countEl = document.getElementById("faq-count");
      if (countEl) {
        if (activeCategory === "all" && !searchVal) {
          countEl.textContent = `Showing all ${total}`;
        } else {
          countEl.textContent = `Showing ${visible} of ${total}`;
        }
      }
    }

    /* ===== Wire delegated handlers ===== */
    const onFaqClick = (e: Event) => {
      const target = (e.target as HTMLElement).closest(
        ".faq__q"
      ) as HTMLElement | null;
      if (target) toggleFaq(target);
    };
    document.addEventListener("click", onFaqClick);

    const catCards = document.querySelectorAll<HTMLElement>(".cat-card");
    const catHandlers: Array<{ el: HTMLElement; fn: () => void }> = [];
    catCards.forEach((card) => {
      const fn = () => filterCategory(card, card.dataset.cat || "all");
      card.addEventListener("click", fn);
      catHandlers.push({ el: card, fn });
    });

    const pills = document.querySelectorAll<HTMLElement>(".pill");
    const pillHandlers: Array<{ el: HTMLElement; fn: () => void }> = [];
    pills.forEach((pill) => {
      const fn = () => filterByTag(pill.dataset.tag || pill.textContent || "");
      pill.addEventListener("click", fn);
      pillHandlers.push({ el: pill, fn });
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      if (searchInput) searchInput.removeEventListener("input", onSearchInput);
      document.removeEventListener("click", onFaqClick);
      catHandlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
      pillHandlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
    };
  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link href={fontsHref} rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* ===== NAV ===== */}
      <nav className="nav" id="nav">
        <div className="nav__inner">
          <a href="#" className="nav__brand">
            <div className="nav__mark">
              <svg className="nav__dna" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5 2c0 3 5 4 5 8s-5 5-5 8"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M15 2c0 3-5 4-5 8s5 5 5 8"
                  stroke="#C49A3C"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <line
                  x1="5.5"
                  y1="6.5"
                  x2="14.5"
                  y2="6.5"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                />
                <line
                  x1="5.5"
                  y1="10"
                  x2="14.5"
                  y2="10"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                />
                <line
                  x1="5.5"
                  y1="13.5"
                  x2="14.5"
                  y2="13.5"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                />
              </svg>
            </div>
            <div className="nav__wordmark">
              <span className="nav__site">{content.brandName}</span>
              <span className="nav__tld">{content.brandTld}</span>
            </div>
          </a>

          <nav className="nav__links">
            {content.navLinks?.map((link) => (
              <a
                key={link.anchor + link.label}
                href={link.anchor}
                className="nav__link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a href={content.navCtaAnchor || "#"} className="nav__cta btn">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M1 3.5a.5.5 0 01.5-.5h12a.5.5 0 01.5.5v8a.5.5 0 01-.5.5h-12a.5.5 0 01-.5-.5v-8zm1 1v6.5h11V4.5L7.5 9 2 4.5zm.8-.5h9.4L7.5 7.8 2.8 4z"
                fill="currentColor"
              />
            </svg>
            {content.navCtaLabel}
          </a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero__inner">
          <p className="hero__eyebrow anim anim-d1">{content.heroEyebrow}</p>

          <h1 className="hero__h1 anim anim-d2">
            {content.heroHeadline}
            <br />
            <em className="hero__h1_br">{content.heroHeadlineAccent}</em>
          </h1>

          <p className="hero__sub anim anim-d3">{content.heroSubhead}</p>

          <div className="hero__actions anim anim-d4">
            <a
              href={content.heroPrimaryCtaAnchor || "#"}
              className="btn btn--navy"
            >
              {content.heroPrimaryCtaLabel}
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path
                  d="M8.5 2.5L13 7.5M13 7.5L8.5 12.5M13 7.5H2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href={content.heroSecondaryCtaAnchor || "#"}
              className="btn btn--outline"
            >
              {content.heroSecondaryCtaLabel}
            </a>
          </div>

          <div className="hero__search anim anim-d5">
            <svg className="hero__search-icon" viewBox="0 0 20 20" fill="none">
              <circle
                cx="8.5"
                cy="8.5"
                r="5.75"
                stroke="var(--ink-4)"
                strokeWidth="1.5"
              />
              <path
                d="M13 13l3.5 3.5"
                stroke="var(--ink-4)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              className="hero__search-input"
              placeholder={content.searchPlaceholder}
            />
          </div>

          <div className="hero__search-pills anim anim-d5">
            {content.searchPills?.map((pill) => (
              <span
                key={pill.tag + pill.label}
                className="pill"
                data-tag={pill.tag}
              >
                {pill.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="rule"></div>

      {/* ===== STATS ===== */}
      <section className="stats">
        <div className="wrap">
          <div className="stats__grid">
            {stats?.map((stat) => (
              <div key={stat.label} className="stats__item">
                <div className="stats__num">{stat.value}</div>
                <div className="stats__label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="categories" id="categories">
        <div className="wrap wrap--mid">
          <p className="section-label anim">{content.categoriesLabel}</p>
          <h2 className="section-title anim anim-d1">
            {content.categoriesTitle} <em>{content.categoriesTitleAccent}</em>
          </h2>

          <div className="cats__grid anim anim-d2">
            <div className="cat-card active" data-cat="all">
              <div className="cat__icon">{CATEGORY_ICONS.all}</div>
              <div className="cat__name">{content.allQuestionsLabel}</div>
              <div className="cat__count">{answerCount(questions.length)}</div>
            </div>

            {categories?.map((cat) => (
              <div key={cat.slug} className="cat-card" data-cat={cat.slug}>
                <div className="cat__icon">{categoryIcon(cat.slug)}</div>
                <div className="cat__name">{cat.title}</div>
                <div className="cat__count">{answerCount(cat.count)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ LIST ===== */}
      <section className="faq-section" id="faq">
        <div className="wrap wrap--mid">
          <div className="faq__header">
            <h2 className="faq__title">{content.faqTitle}</h2>
            <span className="faq__showing" id="faq-count">
              Showing all {questions.length}
            </span>
          </div>

          <div className="faq__list" id="faq-list">
            {questions?.map((q) => (
              <div
                key={q.slug}
                className="faq__item"
                data-cat={q.categorySlug}
                data-tags={(q.tags ?? []).join(" ")}
              >
                <button className="faq__q">
                  <div className="faq__q-left">
                    <span className="faq__cat-badge show">
                      {q.categoryTitle}
                    </span>
                    <span className="faq__q-text">{q.question}</span>
                  </div>
                  <span className="faq__chevron">
                    <Chevron />
                  </span>
                </button>
                <div className="faq__a">
                  <div className="faq__a-inner">
                    <div className="faq__body">{renderAnswer(q.answer)}</div>
                    <div className="faq__meta">
                      <span>
                        Reviewed by {q.reviewerName}, {q.reviewerTitle}
                      </span>
                      <span className="faq__meta-dot"></span>
                      <span>{q.categoryTitle}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EDITORIAL STANDARDS ===== */}
      <section className="standards" id="standards">
        <div className="wrap">
          <div className="standards__inner">
            <div>
              <p className="standards__label">{content.standardsLabel}</p>
              <h2 className="standards__h2">
                {content.standardsHeadline}
                <br />
                <em className="standards__h2_br">
                  {content.standardsHeadlineAccent}
                </em>
              </h2>
              <p className="standards__body">{content.standardsBody}</p>
            </div>
            <div className="standards__pillars">
              {content.pillars?.map((pillar) => (
                <div key={pillar.num} className="pillar">
                  <span className="pillar__num">{pillar.num}</span>
                  <div className="pillar__content">
                    <div className="pillar__title">{pillar.title}</div>
                    <div className="pillar__text">{pillar.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="newsletter" id="newsletter">
        <div className="wrap">
          <div className="newsletter__box anim">
            <div className="newsletter__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 8l8.5 6 8.5-6M3 8v10a1 1 0 001 1h16a1 1 0 001-1V8M3 8a1 1 0 011-1h16a1 1 0 011 1"
                  stroke="var(--gold-light)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="newsletter__h2">
              {content.newsletterHeadline}
              <br />
              <em className="newsletter__h2_br">
                {content.newsletterHeadlineAccent}
              </em>
            </h2>
            <p className="newsletter__sub">{content.newsletterSubhead}</p>
            <div className="newsletter__form">
              <input
                type="email"
                className="newsletter__input"
                placeholder={content.newsletterPlaceholder}
              />
              <a href="#" className="btn btn--navy">
                {content.newsletterButton}
              </a>
            </div>
            <p className="newsletter__note">{content.newsletterNote}</p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer__inner">
            <div className="footer__brand">
              {content.brandName}
              <span>{content.brandTld}</span>
            </div>
            <div className="footer__links">
              {content.footerLinks?.map((link) => (
                <a key={link.label} href={link.anchor} className="footer__link">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="footer__copy">{content.footerCopy}</div>
          </div>
        </div>
      </footer>
    </>
  );
}
