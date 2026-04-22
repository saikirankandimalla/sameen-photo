import { useState, useEffect, useRef } from "react";

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
  },
];

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return inView;
}

function ChapterCard({ story, index, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="story-chapter"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(48px)",
        transition: `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`,
      }}
    >
      <div className={`chapter-inner ${isEven ? "even" : "odd"}`}>
        {/* IMAGE SIDE */}
        <div className="chapter-image-wrap" onClick={() => onClick(story)}>
          <img src={story.cover} alt={story.title} className="chapter-img" />
          <div className="chapter-img-overlay" style={{ "--accent": story.color }} />
          <div className="chapter-number-badge">
            <span>{story.chapter}</span>
          </div>
        </div>

        {/* TEXT SIDE */}
        <div className="chapter-text">
          <div className="chapter-meta">
            <span className="meta-tag" style={{ color: story.color }}>{story.category}</span>
            <span className="meta-divider">·</span>
            <span className="meta-location">{story.location}</span>
            <span className="meta-divider">·</span>
            <span className="meta-year">{story.year}</span>
          </div>

          <h2 className="chapter-title">{story.title}</h2>
          <p className="chapter-subtitle">{story.subtitle}</p>

          <div className="chapter-rule" style={{ background: story.color }} />

          <p className="chapter-desc">{story.description}</p>

          <button
            className="chapter-cta"
            style={{ "--accent": story.color }}
            onClick={() => onClick(story)}
          >
            <span>Read this story</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function Modal({ story, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="modal-hero">
          <img src={story.cover} alt={story.title} className="modal-hero-img" />
          <div className="modal-hero-gradient" style={{ "--accent": story.color }} />
          <div className="modal-hero-text">
            <p className="modal-chapter">Chapter {story.chapter}</p>
            <h2 className="modal-title">{story.title}</h2>
            <p className="modal-subtitle">{story.subtitle}</p>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-meta">
            <span style={{ color: story.color }}>{story.category}</span>
            <span>·</span>
            <span>{story.location}</span>
            <span>·</span>
            <span>{story.year}</span>
          </div>
          <p className="modal-desc">{story.description}</p>

          <div className="modal-gallery">
            {story.images.map((img, i) => (
              <div key={i} className="modal-gallery-item" style={{ animationDelay: `${i * 0.12}s` }}>
                <img src={img} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Stories() {
  const [selectedStory, setSelectedStory] = useState(null);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, 0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0D0C0A;
          color: #E8E2D9;
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* ─── HERO ─── */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 6vw 8vh;
          position: relative;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 20% 60%, rgba(201,169,110,0.06) 0%, transparent 70%),
                      radial-gradient(ellipse 60% 40% at 80% 20%, rgba(139,158,199,0.04) 0%, transparent 70%);
        }
        .hero-line {
          width: 1px; height: 80px;
          background: linear-gradient(to bottom, transparent, #C9A96E);
          margin-bottom: 32px;
        }
        .hero-eyebrow {
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          color: #C9A96E; margin-bottom: 16px; font-weight: 400;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(48px, 8vw, 100px);
          line-height: 1.0;
          font-weight: 400;
          color: #F0EBE3;
          margin-bottom: 24px;
        }
        .hero-title em { font-style: italic; color: #C9A96E; }
        .hero-sub {
          max-width: 420px;
          font-size: 15px; line-height: 1.7;
          color: #7A7168;
          font-weight: 300;
          margin-bottom: 48px;
        }
        .hero-scroll {
          display: flex; align-items: center; gap: 12px;
          font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
          color: #4A4540;
        }
        .hero-scroll-line {
          width: 40px; height: 1px; background: #4A4540;
        }

        /* ─── CHAPTERS ─── */
        .chapters {
          padding: 6vh 6vw 12vh;
          display: flex; flex-direction: column; gap: 10vh;
        }
        .story-chapter {
          width: 100%;
        }
        .chapter-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6vw;
          align-items: center;
        }
        .chapter-inner.odd {
          direction: rtl;
        }
        .chapter-inner.odd > * { direction: ltr; }

        .chapter-image-wrap {
          position: relative; cursor: pointer;
          border-radius: 4px; overflow: hidden;
        }
        .chapter-img {
          width: 100%; aspect-ratio: 4/5;
          object-fit: cover; display: block;
          transition: transform 0.7s ease;
        }
        .chapter-image-wrap:hover .chapter-img { transform: scale(1.04); }
        .chapter-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%);
          opacity: 0.7;
        }
        .chapter-number-badge {
          position: absolute; top: 20px; right: 20px;
          font-family: 'Playfair Display', serif;
          font-size: 13px; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.15);
          padding: 6px 12px; border-radius: 2px;
        }

        .chapter-text { padding: 16px 0; }
        .chapter-meta {
          display: flex; align-items: center; gap: 10px;
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          color: #4A4540; margin-bottom: 20px;
        }
        .meta-tag { font-weight: 500; }
        .meta-divider { color: #2E2B27; }

        .chapter-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 4vw, 54px);
          font-weight: 400; line-height: 1.1;
          color: #F0EBE3; margin-bottom: 8px;
        }
        .chapter-subtitle {
          font-size: 14px; color: #5A5550;
          font-style: italic; margin-bottom: 28px;
          font-family: 'Playfair Display', serif;
        }
        .chapter-rule {
          width: 40px; height: 1px; margin-bottom: 24px;
          opacity: 0.6;
        }
        .chapter-desc {
          font-size: 15px; line-height: 1.8;
          color: #7A7168; font-weight: 300;
          max-width: 400px; margin-bottom: 36px;
        }
        .chapter-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--accent); padding: 0;
          transition: gap 0.3s ease;
        }
        .chapter-cta:hover { gap: 16px; }
        .chapter-cta svg { transition: transform 0.3s ease; }
        .chapter-cta:hover svg { transform: translateX(4px); }

        /* ─── MODAL ─── */
        .modal-backdrop {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(10,9,7,0.92);
          display: flex; justify-content: flex-end;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        .modal-panel {
          width: min(680px, 100vw);
          height: 100vh; overflow-y: auto;
          background: #131210;
          position: relative;
          animation: slideIn 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes slideIn { from { transform: translateX(60px); opacity: 0 } to { transform: none; opacity: 1 } }
        .modal-close {
          position: sticky; top: 0; z-index: 10;
          float: right; margin: 20px 20px 0 0;
          background: rgba(13,12,10,0.8); border: 1px solid #2A2822;
          border-radius: 50%; width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #7A7168;
          transition: color 0.2s, border-color 0.2s;
        }
        .modal-close:hover { color: #F0EBE3; border-color: #4A4540; }
        .modal-hero {
          position: relative; width: 100%; aspect-ratio: 16/9;
          overflow: hidden;
        }
        .modal-hero-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .modal-hero-gradient {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(19,18,16,0.95) 0%, rgba(19,18,16,0.2) 60%, transparent 100%);
        }
        .modal-hero-text {
          position: absolute; bottom: 28px; left: 32px; right: 32px;
        }
        .modal-chapter {
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.4); margin-bottom: 6px;
        }
        .modal-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 5vw, 44px); font-weight: 400;
          color: #F0EBE3; line-height: 1.1; margin-bottom: 4px;
        }
        .modal-subtitle {
          font-family: 'Playfair Display', serif;
          font-size: 15px; font-style: italic; color: rgba(240,235,227,0.5);
        }
        .modal-body { padding: 32px; }
        .modal-meta {
          display: flex; align-items: center; gap: 10px;
          font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
          color: #4A4540; margin-bottom: 20px;
        }
        .modal-desc {
          font-size: 15px; line-height: 1.85;
          color: #7A7168; font-weight: 300; margin-bottom: 36px;
          border-left: 1px solid #2A2822; padding-left: 20px;
        }
        .modal-gallery {
          display: flex; flex-direction: column; gap: 16px;
        }
        .modal-gallery-item {
          border-radius: 3px; overflow: hidden;
          animation: fadeUp 0.5s ease both;
        }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: none } }
        .modal-gallery-item img {
          width: 100%; display: block; object-fit: cover;
          max-height: 420px;
        }

        /* ─── FOOTER STRIP ─── */
        .stories-footer {
          border-top: 1px solid #1E1C19;
          padding: 40px 6vw;
          display: flex; justify-content: space-between; align-items: center;
          font-size: 12px; letter-spacing: 0.1em;
          color: #3A3830;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 768px) {
          .chapter-inner, .chapter-inner.odd {
            grid-template-columns: 1fr;
            direction: ltr;
          }
          .chapter-desc { max-width: 100%; }
          .chapter-img { aspect-ratio: 3/2; }
        }
      `}</style>

      <div style={{ background: "#0D0C0A", minHeight: "100vh" }}>
        {/* HERO */}
        <div className="hero" ref={heroRef}>
          <div className="hero-bg" />
          <div
            className="hero-line"
            style={{
              opacity: heroInView ? 1 : 0,
              transition: "opacity 1s ease 0.3s",
            }}
          />
          <p
            className="hero-eyebrow"
            style={{ opacity: heroInView ? 1 : 0, transition: "opacity 0.8s ease 0.4s" }}
          >
            A Visual Archive
          </p>
          <h1
            className="hero-title"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "none" : "translateY(24px)",
              transition: "opacity 0.9s ease 0.5s, transform 0.9s ease 0.5s",
            }}
          >
            Life,<br />
            <em>documented.</em>
          </h1>
          <p
            className="hero-sub"
            style={{
              opacity: heroInView ? 1 : 0,
              transition: "opacity 0.8s ease 0.7s",
            }}
          >
            Not just photographs — chapters. Every moment we capture is part of a larger story, told with intention.
          </p>
          <div
            className="hero-scroll"
            style={{ opacity: heroInView ? 1 : 0, transition: "opacity 0.8s ease 0.9s" }}
          >
            <span className="hero-scroll-line" />
            Scroll to explore
          </div>
        </div>

        {/* CHAPTERS */}
        <div className="chapters">
          {storiesData.map((story, index) => (
            <ChapterCard
              key={story.id}
              story={story}
              index={index}
              onClick={setSelectedStory}
            />
          ))}
        </div>

        {/* FOOTER STRIP */}
        <div className="stories-footer">
          <span>© 2024 — Every moment matters</span>
          <span>Life Stories Archive</span>
        </div>

        {/* MODAL */}
        {selectedStory && (
          <Modal story={selectedStory} onClose={() => setSelectedStory(null)} />
        )}
      </div>
    </>
  );
}