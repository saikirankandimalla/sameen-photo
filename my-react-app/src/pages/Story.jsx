import { useState, useEffect, useRef } from "react";
import Navbar from '../components/wedding/Navbar';
import Footer from '../components/wedding/Footer';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const storiesData = [
  {
    id: 1,
    chapter: "01",
    category: "Wedding",
    title: "Aarav & Sneha",
    subtitle: "A Story of Forever",
    year: "2024",
    location: "Jaipur, Rajasthan",
    cover: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80",
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=900&q=80",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=900&q=80",
    ],
    description:
      "Every story begins with a moment. Aarav and Sneha's wedding was filled with emotions, laughter, and timeless memories that unfolded like pages of a book neither had written before.",
    color: "#C9A96E",
    colorRgb: "201,169,110",
    tag: "Nuptials",
  },
  {
    id: 2,
    chapter: "02",
    category: "Maternity",
    title: "Neha's Journey",
    subtitle: "A New Beginning",
    year: "2024",
    location: "Mumbai, Maharashtra",
    cover: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=900&q=80",
      "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=900&q=80",
    ],
    description:
      "A beautiful journey into motherhood — filled with love, hope, and the quiet anticipation of a life not yet begun but already deeply felt.",
    color: "#A8C5B5",
    colorRgb: "168,197,181",
    tag: "Motherhood",
  },
  {
    id: 3,
    chapter: "03",
    category: "Events",
    title: "Corporate Night",
    subtitle: "Moments of Celebration",
    year: "2023",
    location: "Hyderabad, Telangana",
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80",
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=900&q=80",
    ],
    description:
      "An evening full of energy, connection, and unforgettable experiences — where achievements met applause and every face told a story of its own.",
    color: "#8B9EC7",
    colorRgb: "139,158,199",
    tag: "Corporate",
  },
];

/* ─────────────────────────────────────────────
   HOOK
───────────────────────────────────────────── */
function useInView(ref, threshold = 0.12) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

/* ─────────────────────────────────────────────
   CHAPTER CARD
───────────────────────────────────────────── */
function ChapterCard({ story, index, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [hovered, setHovered] = useState(false);

  return (
    <article
      ref={ref}
      className="sc-chapter"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(60px)",
        transition: `opacity 0.9s cubic-bezier(.22,.68,0,1.2) ${index * 0.15}s,
                     transform 0.9s cubic-bezier(.22,.68,0,1.2) ${index * 0.15}s`,
        "--accent": story.color,
        "--accent-rgb": story.colorRgb,
      }}
    >
      {/* ── Large chapter number watermark ── */}
      <div className="sc-watermark">{story.chapter}</div>

      <div className={`sc-inner ${index % 2 !== 0 ? "sc-flip" : ""}`}>

        {/* ── IMAGE BLOCK ── */}
        <div
          className="sc-img-block"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => onClick(story)}
        >
          {/* Decorative frame lines */}
          <div className="sc-frame-tl" />
          <div className="sc-frame-br" />

          <div className="sc-img-clip">
            <img
              src={story.cover}
              alt={story.title}
              className="sc-img"
              style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
            />
            {/* Color wash overlay */}
            <div
              className="sc-img-wash"
              style={{ opacity: hovered ? 0.55 : 0.25 }}
            />
          </div>

          {/* Floating badge */}
          <div className="sc-badge">
            <span className="sc-badge-cat">{story.category}</span>
            <span className="sc-badge-ch">{story.chapter}</span>
          </div>

          {/* Bottom strip */}
          <div className="sc-img-strip">
            <span>{story.location}</span>
            <span>{story.year}</span>
          </div>

          {/* CTA overlay */}
          <div className="sc-hover-cta" style={{ opacity: hovered ? 1 : 0 }}>
            <div className="sc-hover-ring">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── TEXT BLOCK ── */}
        <div className="sc-text-block">

          {/* Vertical rule with dot */}
          <div className="sc-vert-rule">
            <div className="sc-vert-dot" />
            <div className="sc-vert-line" />
          </div>

          <div className="sc-text-inner">
            <div className="sc-eyebrow">
              <span className="sc-tag" style={{ color: story.color }}>{story.tag}</span>
              <span className="sc-dot" />
              <span className="sc-loc">{story.location}</span>
            </div>

            <h2 className="sc-title">{story.title}</h2>

            <p className="sc-subtitle">{story.subtitle}</p>

            {/* Ornamental divider */}
            <div className="sc-ornament">
              <div className="sc-orn-line" style={{ background: story.color }} />
              <div className="sc-orn-diamond" style={{ borderColor: story.color }} />
              <div className="sc-orn-line" style={{ background: story.color }} />
            </div>

            <p className="sc-desc">{story.description}</p>

            <div className="sc-year-row">
              <span className="sc-year-big" style={{ WebkitTextStrokeColor: story.color }}>
                {story.year}
              </span>
            </div>

            <button
              className="sc-cta"
              onClick={() => onClick(story)}
            >
              <span className="sc-cta-text">Read this story</span>
              <div className="sc-cta-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="sc-separator">
        <div className="sc-sep-line" />
        <div className="sc-sep-num">{story.chapter} / 0{storiesData.length}</div>
        <div className="sc-sep-line" />
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────
   MODAL
───────────────────────────────────────────── */
function Modal({ story, onClose }) {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="sm-backdrop" onClick={onClose}>
      <div className="sm-panel" onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button className="sm-close" onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Hero image with large thumbnail switcher */}
        <div className="sm-hero">
          <img
            key={imgIndex}
            src={story.images[imgIndex] || story.cover}
            alt=""
            className="sm-hero-img"
          />
          <div className="sm-hero-fog" style={{ "--accent-rgb": story.colorRgb }} />

          {/* Chapter label */}
          <div className="sm-chapter-pill">
            <span>Chapter</span>
            <span className="sm-chapter-num">{story.chapter}</span>
          </div>

          {/* Hero text */}
          <div className="sm-hero-text">
            <p className="sm-hero-cat" style={{ color: story.color }}>{story.category}</p>
            <h2 className="sm-hero-title">{story.title}</h2>
            <p className="sm-hero-sub">{story.subtitle}</p>
          </div>
        </div>

        {/* Thumbnail row */}
        <div className="sm-thumbs">
          {[story.cover, ...story.images].slice(0, 4).map((img, i) => (
            <button
              key={i}
              className={`sm-thumb${imgIndex === i ? " active" : ""}`}
              style={{ "--accent": story.color }}
              onClick={() => setImgIndex(i)}
            >
              <img src={img} alt="" />
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="sm-body">
          {/* Meta row */}
          <div className="sm-meta">
            <div className="sm-meta-item">
              <span className="sm-meta-label">Category</span>
              <span className="sm-meta-val" style={{ color: story.color }}>{story.category}</span>
            </div>
            <div className="sm-meta-div" />
            <div className="sm-meta-item">
              <span className="sm-meta-label">Location</span>
              <span className="sm-meta-val">{story.location}</span>
            </div>
            <div className="sm-meta-div" />
            <div className="sm-meta-item">
              <span className="sm-meta-label">Year</span>
              <span className="sm-meta-val">{story.year}</span>
            </div>
          </div>

          {/* Quote-style description */}
          <div className="sm-quote">
            <div className="sm-quote-mark" style={{ color: story.color }}>"</div>
            <p className="sm-quote-text">{story.description}</p>
          </div>

          {/* Gallery grid */}
          <div className="sm-gallery">
            {story.images.map((img, i) => (
              <div
                key={i}
                className="sm-gal-item"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => setImgIndex(i + 1 < story.images.length + 1 ? i : 0)}
              >
                <img src={img} alt="" />
                <div className="sm-gal-num">{String(i + 1).padStart(2, "0")}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Stories() {
  const [selectedStory, setSelectedStory] = useState(null);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, 0.05);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = e => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,500;1,400;1,500&family=Outfit:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #09090A;
          --surface: #111113;
          --border: #1C1C20;
          --border2: #242428;
          --text: #E8E4DE;
          --muted: #5C5A56;
          --muted2: #3A3835;
          --white: #F5F1EB;
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Outfit', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* ═══════════════════════════════════════
           HERO
        ═══════════════════════════════════════ */
        .s-hero {
          position: relative;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
        }

        /* Grain */
        .s-hero::before {
          content: '';
          position: absolute; inset: 0; z-index: 3; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          opacity: 0.5;
        }

        /* Left text half */
        .s-hero-left {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 0 64px 80px;
          background: var(--bg);
        }

        .s-hero-index {
          position: absolute; top: 48px; left: 64px;
          font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--muted);
          display: flex; align-items: center; gap: 12px;
        }
        .s-hero-index::before {
          content: ''; width: 24px; height: 1px; background: var(--muted);
        }

        .s-hero-scroll-hint {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 48px;
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--muted2);
        }
        .s-hero-scroll-track {
          width: 1px; height: 64px;
          background: linear-gradient(to bottom, transparent, var(--muted2));
        }

        .s-hero-num {
          font-family: 'Bodoni Moda', serif;
          font-size: clamp(100px, 14vw, 180px);
          font-weight: 400; line-height: 0.85;
          color: transparent;
          -webkit-text-stroke: 1px #1E1E22;
          display: block;
          margin-bottom: -8px;
          user-select: none;
        }

        .s-hero-title {
          font-family: 'Bodoni Moda', serif;
          font-size: clamp(48px, 6vw, 86px);
          font-weight: 400; line-height: 1.0;
          color: var(--white);
          margin-bottom: 28px;
        }
        .s-hero-title em {
          font-style: italic;
          background: linear-gradient(135deg, #C9A96E, #E8C88A);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .s-hero-desc {
          max-width: 340px;
          font-size: 14px; line-height: 1.8; font-weight: 300;
          color: var(--muted);
          margin-bottom: 48px;
          border-left: 1px solid #1E1E22;
          padding-left: 20px;
        }

        .s-hero-stats {
          display: flex; gap: 40px;
        }
        .s-stat-item {}
        .s-stat-num {
          font-family: 'Bodoni Moda', serif;
          font-size: 32px; font-weight: 400;
          color: var(--white); line-height: 1;
        }
        .s-stat-label {
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--muted); margin-top: 4px;
        }

        /* Right image half */
        .s-hero-right {
          position: relative; z-index: 1;
          overflow: hidden;
        }
        .s-hero-right img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          filter: brightness(0.55) saturate(0.8);
          transform-origin: center;
        }
        .s-hero-right-fog {
          position: absolute; inset: 0;
          background: linear-gradient(
            to right, var(--bg) 0%, transparent 30%
          ),
          linear-gradient(
            to top, rgba(9,9,10,0.7) 0%, transparent 40%
          );
        }

        /* Floating tag on hero image */
        .s-hero-float {
          position: absolute; bottom: 40px; right: 40px; z-index: 4;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          padding: 16px 24px;
        }
        .s-hero-float-title {
          font-family: 'Bodoni Moda', serif;
          font-size: 1rem; color: var(--white);
        }
        .s-hero-float-sub {
          font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--muted); margin-top: 4px;
        }

        /* Vertical line accent */
        .s-hero-vline {
          position: absolute; top: 0; left: 50%; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent 0%, #1E1E22 30%, #1E1E22 70%, transparent 100%);
          z-index: 4; pointer-events: none;
        }

        /* ═══════════════════════════════════════
           SECTION INTRO
        ═══════════════════════════════════════ */
        .s-section-intro {
          padding: 100px 7vw 60px;
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 40px; flex-wrap: wrap;
          position: relative;
        }
        .s-section-intro::before {
          content: 'STORIES';
          position: absolute; right: 5vw; top: 60px;
          font-family: 'Bodoni Moda', serif;
          font-size: 7vw; font-weight: 400;
          color: transparent; -webkit-text-stroke: 1px #151518;
          pointer-events: none; user-select: none;
          letter-spacing: 0.1em;
        }

        .s-section-tag {
          font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
          color: #C9A96E;
          display: flex; align-items: center; gap: 10px; margin-bottom: 16px;
        }
        .s-section-tag::before { content: ''; width: 32px; height: 1px; background: #C9A96E; }

        .s-section-h {
          font-family: 'Bodoni Moda', serif;
          font-size: clamp(28px, 3.5vw, 48px); font-weight: 400;
          color: var(--white); line-height: 1.15;
          position: relative; z-index: 1;
        }

        .s-section-right {
          max-width: 300px; font-size: 13px; line-height: 1.75;
          color: var(--muted); font-weight: 300;
          position: relative; z-index: 1;
        }

        /* ═══════════════════════════════════════
           CHAPTER CARDS
        ═══════════════════════════════════════ */
        .s-chapters {
          padding: 0 7vw 120px;
          display: flex; flex-direction: column; gap: 0;
        }

        .sc-chapter {
          position: relative;
          padding: 80px 0;
        }

        /* Watermark */
        .sc-watermark {
          position: absolute; top: 50%; right: -2vw;
          transform: translateY(-50%);
          font-family: 'Bodoni Moda', serif; font-style: italic;
          font-size: 20vw; font-weight: 400; line-height: 1;
          color: transparent; -webkit-text-stroke: 1px #111114;
          pointer-events: none; user-select: none; z-index: 0;
        }

        .sc-inner {
          display: grid;
          grid-template-columns: 5fr 4fr;
          gap: 6vw; align-items: center;
          position: relative; z-index: 1;
        }
        .sc-flip {
          grid-template-columns: 4fr 5fr;
        }
        .sc-flip .sc-img-block { order: 2; }
        .sc-flip .sc-text-block { order: 1; }

        /* ── Image block ── */
        .sc-img-block {
          position: relative; cursor: pointer;
        }

        /* Corner frames */
        .sc-frame-tl, .sc-frame-br {
          position: absolute; z-index: 2;
          width: 40px; height: 40px;
          pointer-events: none;
          transition: all 0.4s ease;
        }
        .sc-frame-tl {
          top: -8px; left: -8px;
          border-top: 1px solid var(--accent);
          border-left: 1px solid var(--accent);
          opacity: 0.4;
        }
        .sc-frame-br {
          bottom: -8px; right: -8px;
          border-bottom: 1px solid var(--accent);
          border-right: 1px solid var(--accent);
          opacity: 0.4;
        }
        .sc-img-block:hover .sc-frame-tl { top: -14px; left: -14px; opacity: 1; }
        .sc-img-block:hover .sc-frame-br { bottom: -14px; right: -14px; opacity: 1; }

        .sc-img-clip {
          position: relative; overflow: hidden;
          aspect-ratio: 3/4;
        }
        .sc-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.9s cubic-bezier(.25,.46,.45,.94);
        }
        .sc-img-wash {
          position: absolute; inset: 0;
          background: rgba(var(--accent-rgb), 0.3);
          mix-blend-mode: multiply;
          transition: opacity 0.5s;
        }

        /* Badge top-right */
        .sc-badge {
          position: absolute; top: 20px; right: 20px; z-index: 3;
          background: rgba(0,0,0,0.65);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(10px);
          padding: 8px 14px;
          display: flex; align-items: center; gap: 10px;
        }
        .sc-badge-cat {
          font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--accent);
        }
        .sc-badge-ch {
          font-family: 'Bodoni Moda', serif;
          font-size: 1rem; color: rgba(255,255,255,0.2);
        }

        /* Bottom strip */
        .sc-img-strip {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 3;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          padding: 20px 20px 16px;
          display: flex; justify-content: space-between; align-items: flex-end;
          font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        /* Center hover ring */
        .sc-hover-cta {
          position: absolute; inset: 0; z-index: 4;
          display: flex; align-items: center; justify-content: center;
          transition: opacity 0.35s;
          pointer-events: none;
        }
        .sc-hover-ring {
          width: 64px; height: 64px; border-radius: 50%;
          border: 1px solid var(--accent);
          background: rgba(var(--accent-rgb), 0.15);
          display: flex; align-items: center; justify-content: center;
          color: var(--accent);
        }

        /* ── Text block ── */
        .sc-text-block {
          display: flex; gap: 28px; align-items: flex-start;
          padding: 20px 0;
        }

        .sc-vert-rule {
          display: flex; flex-direction: column; align-items: center;
          padding-top: 6px; flex-shrink: 0;
        }
        .sc-vert-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent); margin-bottom: 8px; flex-shrink: 0;
        }
        .sc-vert-line {
          flex: 1; width: 1px; background: var(--border2); min-height: 60px;
        }

        .sc-text-inner { flex: 1; }

        .sc-eyebrow {
          display: flex; align-items: center; gap: 10px;
          font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
          margin-bottom: 20px;
        }
        .sc-tag { font-weight: 500; }
        .sc-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: var(--muted2); flex-shrink: 0;
        }
        .sc-loc { color: var(--muted); }

        .sc-title {
          font-family: 'Bodoni Moda', serif;
          font-size: clamp(36px, 3.8vw, 58px);
          font-weight: 400; line-height: 1.05;
          color: var(--white); margin-bottom: 10px;
          letter-spacing: -0.01em;
        }

        .sc-subtitle {
          font-family: 'Bodoni Moda', serif;
          font-size: 15px; font-style: italic;
          color: var(--muted); margin-bottom: 32px;
        }

        /* Diamond ornament */
        .sc-ornament {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 28px;
        }
        .sc-orn-line { flex: 1; height: 1px; opacity: 0.3; max-width: 60px; }
        .sc-orn-diamond {
          width: 7px; height: 7px;
          border: 1px solid;
          transform: rotate(45deg); flex-shrink: 0;
          opacity: 0.6;
        }

        .sc-desc {
          font-size: 14px; line-height: 1.85; font-weight: 300;
          color: var(--muted); margin-bottom: 36px;
          max-width: 380px;
        }

        .sc-year-row { margin-bottom: 36px; }
        .sc-year-big {
          font-family: 'Bodoni Moda', serif;
          font-size: 3.5rem; font-weight: 400;
          color: transparent;
          -webkit-text-stroke: 1px;
          -webkit-text-stroke-color: inherit;
          opacity: 0.15;
          letter-spacing: 0.05em;
        }

        /* CTA button */
        .sc-cta {
          display: inline-flex; align-items: center; gap: 0;
          background: none; border: none; cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--accent); padding: 0;
          position: relative;
        }
        .sc-cta-text {
          position: relative;
          padding-bottom: 4px;
        }
        .sc-cta-text::after {
          content: '';
          position: absolute; bottom: 0; left: 0;
          width: 0; height: 1px;
          background: var(--accent);
          transition: width 0.4s ease;
        }
        .sc-cta:hover .sc-cta-text::after { width: 100%; }
        .sc-cta-arrow {
          width: 32px; height: 32px;
          border: 1px solid currentColor; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin-left: 14px; flex-shrink: 0;
          transition: background 0.3s, transform 0.3s;
        }
        .sc-cta:hover .sc-cta-arrow {
          background: var(--accent);
          color: var(--bg);
          transform: translateX(4px);
        }

        /* Chapter separator */
        .sc-separator {
          display: flex; align-items: center; gap: 24px;
          padding-top: 80px;
        }
        .sc-sep-line { flex: 1; height: 1px; background: var(--border); }
        .sc-sep-num {
          font-size: 10px; letter-spacing: 0.2em;
          color: var(--muted2); flex-shrink: 0;
          font-family: 'Bodoni Moda', serif; font-style: italic;
        }

        /* ═══════════════════════════════════════
           MODAL
        ═══════════════════════════════════════ */
        .sm-backdrop {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(5,5,6,0.9);
          display: flex; justify-content: flex-end;
          backdrop-filter: blur(6px);
          animation: smFadeIn 0.35s ease;
        }
        @keyframes smFadeIn { from { opacity:0 } to { opacity:1 } }

        .sm-panel {
          width: min(720px, 100vw);
          height: 100vh; overflow-y: auto;
          background: var(--surface);
          border-left: 1px solid var(--border);
          position: relative;
          animation: smSlide 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes smSlide { from { transform: translateX(80px); opacity:0 } to { transform:none; opacity:1 } }

        .sm-close {
          position: sticky; top: 0; z-index: 20;
          float: right; margin: 24px 24px 0 0;
          background: rgba(15,15,17,0.9); border: 1px solid var(--border2);
          width: 42px; height: 42px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--muted);
          transition: color 0.2s, border-color 0.2s;
        }
        .sm-close:hover { color: var(--white); border-color: var(--muted); }

        .sm-hero {
          position: relative; width: 100%; aspect-ratio: 16/9; overflow: hidden;
        }
        .sm-hero-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          animation: smImgIn 0.5s ease;
        }
        @keyframes smImgIn { from { opacity:0; transform:scale(1.04) } to { opacity:1; transform:none } }

        .sm-hero-fog {
          position: absolute; inset: 0;
          background:
            linear-gradient(to top, rgba(17,17,19,0.98) 0%, rgba(17,17,19,0.4) 50%, transparent 100%),
            linear-gradient(to right, transparent 50%, rgba(var(--accent-rgb),0.08) 100%);
        }

        .sm-chapter-pill {
          position: absolute; top: 24px; left: 28px;
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          padding: 8px 16px;
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          display: flex; gap: 8px; align-items: center;
        }
        .sm-chapter-num {
          font-family: 'Bodoni Moda', serif;
          font-size: 1.1rem; color: rgba(255,255,255,0.2);
        }

        .sm-hero-text {
          position: absolute; bottom: 28px; left: 28px; right: 28px;
        }
        .sm-hero-cat {
          font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase;
          margin-bottom: 8px; font-weight: 500;
        }
        .sm-hero-title {
          font-family: 'Bodoni Moda', serif;
          font-size: clamp(28px, 5vw, 46px); font-weight: 400;
          color: var(--white); line-height: 1.1; margin-bottom: 6px;
        }
        .sm-hero-sub {
          font-family: 'Bodoni Moda', serif;
          font-size: 14px; font-style: italic;
          color: rgba(232,228,222,0.4);
        }

        /* Thumbs */
        .sm-thumbs {
          display: flex; gap: 6px;
          padding: 16px 28px;
          border-bottom: 1px solid var(--border);
        }
        .sm-thumb {
          flex: 1; aspect-ratio: 16/10; overflow: hidden;
          border: 1px solid transparent; cursor: pointer;
          background: none; padding: 0; transition: border-color 0.25s;
        }
        .sm-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; filter: brightness(0.6); transition: filter 0.25s; }
        .sm-thumb.active { border-color: var(--accent); }
        .sm-thumb.active img { filter: brightness(1); }
        .sm-thumb:hover img { filter: brightness(0.85); }

        /* Body */
        .sm-body { padding: 36px 28px 60px; }

        .sm-meta {
          display: flex; align-items: center; gap: 0;
          margin-bottom: 36px;
          border: 1px solid var(--border);
          overflow: hidden;
        }
        .sm-meta-item {
          flex: 1; padding: 14px 20px;
          display: flex; flex-direction: column; gap: 4px;
        }
        .sm-meta-div { width: 1px; background: var(--border); align-self: stretch; }
        .sm-meta-label {
          font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--muted2);
        }
        .sm-meta-val { font-size: 13px; color: var(--text); font-weight: 400; }

        .sm-quote {
          position: relative; padding: 24px 28px;
          background: rgba(255,255,255,0.02);
          border-left: 1px solid var(--border2);
          margin-bottom: 36px;
        }
        .sm-quote-mark {
          font-family: 'Bodoni Moda', serif;
          font-size: 5rem; line-height: 0.5;
          opacity: 0.2; margin-bottom: 12px; display: block;
        }
        .sm-quote-text {
          font-size: 14px; line-height: 1.85; font-weight: 300;
          color: var(--muted);
          font-style: italic;
        }

        .sm-gallery { display: flex; flex-direction: column; gap: 10px; }
        .sm-gal-item {
          position: relative; overflow: hidden; cursor: pointer;
          animation: smGalIn 0.5s ease both;
        }
        @keyframes smGalIn { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:none } }
        .sm-gal-item img { width: 100%; display: block; object-fit: cover; max-height: 380px; transition: transform 0.5s; }
        .sm-gal-item:hover img { transform: scale(1.03); }
        .sm-gal-num {
          position: absolute; bottom: 14px; right: 14px;
          font-family: 'Bodoni Moda', serif; font-style: italic;
          font-size: 0.85rem; color: rgba(255,255,255,0.25);
        }

        /* ═══════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════ */
        @media (max-width: 900px) {
          .s-hero { grid-template-columns: 1fr; }
          .s-hero-right { display: none; }
          .s-hero-left { min-height: 100vh; }
          .sc-inner, .sc-flip {
            grid-template-columns: 1fr;
          }
          .sc-flip .sc-img-block { order: 0; }
          .sc-flip .sc-text-block { order: 0; }
          .sc-img-clip { aspect-ratio: 4/3; }
          .sc-watermark { display: none; }
        }
        @media (max-width: 640px) {
          .s-hero-left { padding: 0 28px 60px; }
          .s-section-intro { padding: 60px 28px 40px; }
          .s-chapters { padding: 0 28px 80px; }
          .sm-panel { width: 100vw; }
          .sm-meta { flex-direction: column; }
          .sm-meta-div { width: auto; height: 1px; align-self: auto; }
        }
      `}</style>

      <Navbar />

      <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

        {/* ══════════ HERO ══════════ */}
        <section
          className="s-hero"
          ref={heroRef}
          style={{ "--accent": "#C9A96E", "--accent-rgb": "201,169,110" }}
        >
          {/* Left */}
          <div className="s-hero-left">
            <div className="s-hero-index">Life Stories Archive</div>

            <div
              className="s-hero-scroll-hint"
              style={{
                opacity: heroInView ? 1 : 0,
                transition: "opacity 0.8s ease 1.1s",
              }}
            >
              <div className="s-hero-scroll-track" />
              Scroll
            </div>

            <span
              className="s-hero-num"
              aria-hidden
              style={{
                opacity: heroInView ? 1 : 0,
                transition: "opacity 1s ease 0.2s",
              }}
            >
              {String(storiesData.length).padStart(2, "0")}
            </span>

            <h1
              className="s-hero-title"
              style={{
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? "none" : "translateY(32px)",
                transition: "opacity 0.9s ease 0.35s, transform 0.9s ease 0.35s",
              }}
            >
              Life,<br /><em>documented.</em>
            </h1>

            <p
              className="s-hero-desc"
              style={{
                opacity: heroInView ? 1 : 0,
                transition: "opacity 0.8s ease 0.55s",
              }}
            >
              Not just photographs — chapters. Every moment we capture is part of a larger story,
              told with intention and preserved with care.
            </p>

            <div
              className="s-hero-stats"
              style={{
                opacity: heroInView ? 1 : 0,
                transition: "opacity 0.8s ease 0.75s",
              }}
            >
              {[
                { num: "120+", label: "Stories told" },
                { num: "08", label: "Categories" },
                { num: "2019", label: "Since" },
              ].map(s => (
                <div key={s.label} className="s-stat-item">
                  <div className="s-stat-num">{s.num}</div>
                  <div className="s-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="s-hero-right">
            <img
              src={storiesData[0].cover}
              alt=""
              style={{
                transform: `scale(1.08) translate(${mousePos.x * 0.005}px, ${mousePos.y * 0.004}px)`,
                transition: "transform 0.8s ease",
              }}
            />
            <div className="s-hero-right-fog" />
            <div className="s-hero-float">
              <div className="s-hero-float-title">{storiesData[0].title}</div>
              <div className="s-hero-float-sub">{storiesData[0].location} · {storiesData[0].year}</div>
            </div>
          </div>

          {/* Center vertical line */}
          <div className="s-hero-vline" />
        </section>

        {/* ══════════ SECTION INTRO ══════════ */}
        <div className="s-section-intro">
          <div>
            <div className="s-section-tag">Visual Archive</div>
            <h2 className="s-section-h">
              Chapters of<br />lived experience
            </h2>
          </div>
          <p className="s-section-right">
            Each story is a chapter. Browse through weddings, maternity sessions, corporate events,
            and everyday moments — all captured with the same quiet reverence.
          </p>
        </div>

        {/* ══════════ CHAPTERS ══════════ */}
        <div className="s-chapters">
          {storiesData.map((story, i) => (
            <ChapterCard
              key={story.id}
              story={story}
              index={i}
              onClick={setSelectedStory}
            />
          ))}
        </div>

      </div>

      <Footer />

      {/* ══════════ MODAL ══════════ */}
      {selectedStory && (
        <Modal story={selectedStory} onClose={() => setSelectedStory(null)} />
      )}
    </>
  );
}