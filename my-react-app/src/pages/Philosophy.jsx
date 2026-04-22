import { useEffect, useRef } from "react";
import Navbar from '../components/wedding/Navbar';
import Footer from '../components/wedding/Footer';

const GSAP_CDN = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
const SCROLL_TRIGGER_CDN = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";

function useGSAP(callback, deps = []) {
  useEffect(() => {
    let cleanup;
    const loadGSAP = async () => {
      if (!window.gsap) {
        await new Promise((res) => {
          const s = document.createElement("script");
          s.src = GSAP_CDN;
          s.onload = res;
          document.head.appendChild(s);
        });
      }
      if (!window.ScrollTrigger) {
        await new Promise((res) => {
          const s = document.createElement("script");
          s.src = SCROLL_TRIGGER_CDN;
          s.onload = res;
          document.head.appendChild(s);
        });
        window.gsap.registerPlugin(window.ScrollTrigger);
      }
      cleanup = callback(window.gsap, window.ScrollTrigger);
    };
    loadGSAP();
    return () => { if (typeof cleanup === "function") cleanup(); };
  }, deps);
}

const paragraphs = [
  { num: "01", text: "We don't just photograph moments — we preserve emotions that words often fail to express." },
  { num: "02", text: "From quiet anticipation to unspoken promises, every frame is rooted in authenticity." },
  { num: "03", text: "Our philosophy is simple — real emotion creates timeless art." },
  { num: "04", text: "We embrace the unscripted, the imperfect, and the beautifully raw moments that define every story." },
  { num: "05", text: "In a world that moves fast, we choose to slow down — capturing not just how it looked, but how it truly felt." },
];

const stats = [
  { num: "800+", label: "Stories" },
  { num: "12+", label: "Years" },
  { num: "4.9★", label: "Rating" },
];

export default function PhilosophySection() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const dividerRef = useRef(null);
  const parasRef = useRef([]);
  const pullQuoteRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef([]);
  const canvasRef = useRef(null);
  const orbsRef = useRef([]);
  const grainFrameRef = useRef(null);

  /* ── Animated grain canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let frameCount = 0;
    const draw = () => {
      const { width: w, height: h } = canvas;
      const imageData = ctx.createImageData(w, h);
      const d = imageData.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = d[i + 1] = d[i + 2] = v;
        d[i + 3] = 28;
      }
      ctx.putImageData(imageData, 0, 0);
      frameCount++;
      // Throttle: re-draw every ~80ms for performance
      grainFrameRef.current = setTimeout(() => requestAnimationFrame(draw), 80);
    };
    requestAnimationFrame(draw);
    return () => {
      clearTimeout(grainFrameRef.current);
      ro.disconnect();
    };
  }, []);

  /* ── Mouse parallax ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${-6 + cy * 5}%) translateX(${cx * 2}%) scale(1.06)`;
      }
      orbsRef.current.forEach((orb, i) => {
        if (!orb) return;
        const mul = i % 2 === 0 ? 1 : -1;
        orb.style.transform = `translate(${cx * 24 * mul}px, ${cy * 18 * mul}px)`;
      });
    };
    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  /* ── GSAP scroll animations ── */
  useGSAP((gsap, ScrollTrigger) => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(eyebrowRef.current, { opacity: 0, x: -20 });
      gsap.set(headingRef.current, { opacity: 0, y: 36, scale: 0.97 });
      gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(parasRef.current, { opacity: 0, x: -20 });
      gsap.set(pullQuoteRef.current, { opacity: 0, y: 20 });
      gsap.set(imageWrapRef.current, { opacity: 0, x: 50 });
      gsap.set(statsRef.current, { opacity: 0, y: 16, scale: 0.9 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl
        .to(eyebrowRef.current, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" })
        .to(headingRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.95, ease: "power3.out" }, "-=0.3")
        .to(dividerRef.current, { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, "-=0.5")
        .to(parasRef.current, { opacity: 1, x: 0, duration: 0.65, ease: "power3.out", stagger: 0.11 }, "-=0.4")
        .to(pullQuoteRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.2")
        .to(imageWrapRef.current, { opacity: 1, x: 0, duration: 1.1, ease: "power3.out" }, 0.15)
        .to(statsRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.4)", stagger: 0.1 }, "-=0.5");

      // Scroll parallax on image
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        yPercent: -10,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@200;300;400&display=swap');

        /* ── Section shell ── */
        .phil-section {
          background: #080806;
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow: hidden;
          padding: 7rem 2rem;
          display: flex;
          align-items: center;
          box-sizing: border-box;
        }

        /* ── Animated grain canvas ── */
        .grain-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          opacity: 0.055;
        }

        /* ── Floating ambient orbs ── */
        .orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          will-change: transform;
          transition: transform 0.6s ease;
        }
        .orb-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(212,175,55,0.065) 0%, transparent 65%);
          top: -180px; left: -160px;
          z-index: 0;
          animation: orbPulse1 12s ease-in-out infinite;
        }
        .orb-2 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(180,120,55,0.05) 0%, transparent 65%);
          bottom: -100px; right: -80px;
          z-index: 0;
          animation: orbPulse2 15s ease-in-out infinite;
        }
        .orb-3 {
          width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 65%);
          top: 48%; left: 45%;
          transform: translate(-50%, -50%);
          z-index: 0;
          animation: orbPulse3 9s ease-in-out infinite;
        }
        @keyframes orbPulse1 {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes orbPulse2 {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.55; }
        }
        @keyframes orbPulse3 {
          0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.8; }
          50% { transform: translate(-50%,-50%) scale(1.4); opacity: 0.3; }
        }

        /* ── Subtle grid lines ── */
        .grid-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .grid-line {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.045) 30%, rgba(212,175,55,0.045) 70%, transparent 100%);
        }

        /* ── Main container ── */
        .phil-container {
          max-width: 1120px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5.5rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        /* ── Eyebrow ── */
        .eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
        }
        .eyebrow-line {
          height: 1px;
          background: #D4AF37;
        }
        .eyebrow-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          font-weight: 300;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: #D4AF37;
        }

        /* ── Heading ── */
        .phil-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.6rem, 4.5vw, 3.8rem);
          font-weight: 300;
          line-height: 1.07;
          color: #F5EFE2;
          margin: 0 0 28px 0;
          letter-spacing: -0.01em;
        }
        .phil-heading em {
          font-style: italic;
          color: #E8D5A8;
        }

        /* ── Divider ── */
        .phil-divider {
          height: 1px;
          background: linear-gradient(90deg, #D4AF37, rgba(212,175,55,0.08));
          margin-bottom: 28px;
        }

        /* ── Numbered paragraphs ── */
        .para-list {
          display: flex;
          flex-direction: column;
          margin-bottom: 28px;
        }
        .phil-para {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(212,175,55,0.07);
          position: relative;
        }
        .phil-para::before {
          content: '';
          position: absolute;
          left: 0; bottom: -1px;
          height: 1px;
          width: 0;
          background: rgba(212,175,55,0.3);
          transition: width 0.5s ease;
        }
        .phil-para:hover::before { width: 100%; }
        .para-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.65rem;
          color: rgba(212,175,55,0.4);
          margin-top: 5px;
          flex-shrink: 0;
          letter-spacing: 0.1em;
          user-select: none;
        }
        .para-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.9;
          color: rgba(200,192,178,0.82);
          letter-spacing: 0.01em;
          margin: 0;
        }

        /* ── Pull quote ── */
        .pull-quote {
          padding: 18px 22px;
          border-left: 2px solid #D4AF37;
          background: rgba(212,175,55,0.04);
          border-radius: 0 6px 6px 0;
        }
        .pull-quote p {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.15rem;
          color: #D4AF37;
          letter-spacing: 0.02em;
          line-height: 1.55;
          margin: 0;
        }

        /* ── Image column ── */
        .image-stack {
          position: relative;
          height: 600px;
        }

        /* Spinning badge */
        .spin-badge {
          position: absolute;
          top: -18px;
          right: -18px;
          width: 92px;
          height: 92px;
          z-index: 5;
          animation: badgeSpin 22s linear infinite;
          pointer-events: none;
        }
        @keyframes badgeSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Main image */
        .img-main-wrap {
          position: absolute;
          inset: 0;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 40px 90px rgba(0,0,0,0.75), 0 0 0 1px rgba(212,175,55,0.09);
        }
        .img-inner {
          width: 100%;
          height: 116%;
          position: absolute;
          top: -8%;
          left: 0;
          overflow: hidden;
        }
        .phil-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(0.68) contrast(1.1) brightness(0.88);
          transition: transform 0.12s linear;
          transform: translateY(-4%);
        }
        .img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(8,8,6,0.08) 0%,
            transparent 22%,
            transparent 52%,
            rgba(8,8,6,0.7) 100%
          );
        }

        /* Corner marks */
        .corner {
          position: absolute;
          width: 26px; height: 26px;
          border-color: rgba(212,175,55,0.4);
          border-style: solid;
          z-index: 4;
          pointer-events: none;
        }
        .corner-tl { top: 14px; left: 14px; border-width: 1px 0 0 1px; }
        .corner-br { bottom: 14px; right: 14px; border-width: 0 1px 1px 0; }

        /* Floating label pill */
        .float-label {
          position: absolute;
          top: 22px;
          left: 22px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(212,175,55,0.72);
          background: rgba(8,8,6,0.65);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(212,175,55,0.18);
          padding: 5px 13px;
          border-radius: 20px;
          z-index: 4;
        }

        /* Accent image */
        .img-accent {
          position: absolute;
          bottom: 32px;
          left: -30px;
          width: 156px;
          height: 200px;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid rgba(212,175,55,0.28);
          box-shadow: 0 24px 48px rgba(0,0,0,0.65);
          z-index: 4;
          transform: rotate(-3.5deg);
          transition: transform 0.45s ease, box-shadow 0.45s ease;
        }
        .img-accent:hover {
          transform: rotate(0deg) scale(1.04);
          box-shadow: 0 32px 64px rgba(0,0,0,0.7);
        }
        .img-accent img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: saturate(0.55) brightness(0.82);
        }

        /* Stats strip */
        .stats-strip {
          position: absolute;
          bottom: 22px;
          left: 0; right: 0;
          display: flex;
          justify-content: flex-end;
          padding: 0 18px 0 148px;
          z-index: 5;
          gap: 10px;
        }
        .stat-card {
          text-align: center;
          background: rgba(8,8,6,0.65);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(212,175,55,0.16);
          border-radius: 8px;
          padding: 10px 14px;
          min-width: 78px;
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .stat-card:hover {
          border-color: rgba(212,175,55,0.4);
          transform: translateY(-2px);
        }
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.45rem;
          font-weight: 300;
          color: #D4AF37;
          line-height: 1;
          display: block;
        }
        .stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(200,192,178,0.48);
          display: block;
          margin-top: 3px;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .phil-container { grid-template-columns: 1fr; gap: 3.5rem; }
          .image-stack { height: 420px; }
          .img-accent { display: none; }
          .stats-strip { padding-left: 16px; justify-content: center; }
          .phil-section { padding: 5.5rem 1.5rem; }
        }
        @media (max-width: 600px) {
          .phil-heading { font-size: 2.4rem; }
          .image-stack { height: 320px; }
          .pull-quote p { font-size: 1rem; }
        }
      `}</style>

      <Navbar />

      <section ref={sectionRef} className="phil-section">
        {/* Animated grain */}
        <canvas ref={canvasRef} className="grain-canvas" />

        {/* Ambient orbs */}
        <div ref={el => orbsRef.current[0] = el} className="orb orb-1" />
        <div ref={el => orbsRef.current[1] = el} className="orb orb-2" />
        <div className="orb orb-3" />

        {/* Grid lines */}
        <div className="grid-lines">
          {[14, 30, 50, 68, 84].map((pct, i) => (
            <div key={i} className="grid-line" style={{ top: `${pct}%` }} />
          ))}
        </div>

        <div className="phil-container">

          {/* ── LEFT: Text ── */}
          <div>
            {/* Eyebrow */}
            <div ref={eyebrowRef} className="eyebrow">
              <div className="eyebrow-line" style={{ width: 32 }} />
              <span className="eyebrow-text">Our Philosophy</span>
              <div className="eyebrow-line" style={{ width: 16, opacity: 0.4 }} />
            </div>

            {/* Heading */}
            <h2 ref={headingRef} className="phil-heading">
              Where Art<br />
              <em>Meets Emotion</em>
            </h2>

            {/* Divider */}
            <div ref={dividerRef} className="phil-divider" />

            {/* Numbered paragraphs */}
            <div className="para-list">
              {paragraphs.map((p, i) => (
                <div
                  key={i}
                  ref={el => parasRef.current[i] = el}
                  className="phil-para"
                >
                  <span className="para-num">{p.num}</span>
                  <p className="para-text">{p.text}</p>
                </div>
              ))}
            </div>

            {/* Pull quote */}
            <div ref={pullQuoteRef} className="pull-quote">
              <p>"We don't capture photos.<br />We capture feeling."</p>
            </div>
          </div>

          {/* ── RIGHT: Image stack ── */}
          <div ref={imageWrapRef} className="image-stack">

            {/* Spinning circular badge */}
            <svg className="spin-badge" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <path id="circlePath" d="M 45 45 m -30 0 a 30 30 0 1 1 60 0 a 30 30 0 1 1 -60 0" />
              </defs>
              <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
              <text fill="rgba(212,175,55,0.65)" fontSize="7.5" fontFamily="DM Sans" letterSpacing="3.2" fontWeight="300">
                <textPath href="#circlePath">CINEMATIC  ·  AUTHENTIC  ·  TIMELESS  ·</textPath>
              </text>
              <circle cx="45" cy="45" r="6" fill="rgba(212,175,55,0.1)" stroke="rgba(212,175,55,0.4)" strokeWidth="0.5" />
              <line x1="42" y1="45" x2="48" y2="45" stroke="rgba(212,175,55,0.6)" strokeWidth="0.8" />
              <line x1="45" y1="42" x2="45" y2="48" stroke="rgba(212,175,55,0.6)" strokeWidth="0.8" />
            </svg>

            {/* Main image */}
            <div className="img-main-wrap">
              <div className="img-inner">
                <img
                  ref={imageRef}
                  className="phil-img"
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=85&auto=format&fit=crop"
                  alt="Cinematic wedding moment — a couple sharing an intimate glance"
                />
              </div>
              <div className="img-overlay" />
              {/* Corner marks */}
              <div className="corner corner-tl" />
              <div className="corner corner-br" />
              {/* Float label */}
              <span className="float-label">Stories · Emotions · Time</span>
            </div>

            {/* Accent thumbnail */}
            <div className="img-accent">
              <img
                src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80&auto=format&fit=crop"
                alt="Wedding detail"
              />
            </div>

            {/* Stats */}
            <div className="stats-strip">
              {stats.map((s, i) => (
                <div
                  key={i}
                  ref={el => statsRef.current[i] = el}
                  className="stat-card"
                >
                  <span className="stat-num">{s.num}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}