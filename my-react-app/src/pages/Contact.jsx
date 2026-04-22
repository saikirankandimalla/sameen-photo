import { useState } from "react";
import Navbar from '../components/wedding/Navbar';
import Footer from '../components/wedding/Footer';

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cormorant:ital,wght@1,300;1,400&family=Lato:wght@200;300;400&display=swap";
document.head.appendChild(fontLink);

const styles = `
  :root {
    --bg:         #0d0c09;
    --bg2:        #111009;
    --surface:    #161410;
    --gold:       #c9a84c;
    --gold-dim:   #7a6028;
    --gold-glow:  rgba(201,168,76,0.08);
    --text:       #ddd5be;
    --text-muted: #6a6255;
    --border:     rgba(201,168,76,0.15);
    --white:      #f2ece0;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .cp {
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ══════════════════════════════
     HERO — split layout like Story
     ══════════════════════════════ */
  .cp-hero {
    display: grid;
    grid-template-columns: 55% 45%;
    min-height: 88vh;
    position: relative;
  }

  /* left dark panel */
  .cp-hero-left {
    background: var(--bg2);
    padding: 120px 72px 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  /* ghost number watermark */
  .cp-ghost-num {
    position: absolute;
    top: 40px;
    left: 52px;
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(140px, 18vw, 220px);
    font-weight: 300;
    color: rgba(201,168,76,0.055);
    line-height: 1;
    user-select: none;
    pointer-events: none;
    letter-spacing: -0.04em;
  }

  .cp-eyebrow {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 32px;
    position: relative;
    z-index: 1;
  }
  .cp-eyebrow::before {
    content: '';
    width: 32px;
    height: 1px;
    background: var(--gold-dim);
  }
  .cp-eyebrow span {
    font-size: 0.62rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 400;
  }

  .cp-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(3rem, 5.5vw, 5.2rem);
    line-height: 1.05;
    color: var(--white);
    position: relative;
    z-index: 1;
    letter-spacing: -0.01em;
  }
  .cp-hero-title em {
    font-style: italic;
    color: var(--gold);
    display: block;
    font-weight: 300;
  }

  .cp-hero-desc {
    margin-top: 28px;
    font-size: 0.83rem;
    line-height: 1.9;
    color: var(--text-muted);
    max-width: 360px;
    position: relative;
    z-index: 1;
  }

  /* bottom stats row — exactly like Story page */
  .cp-hero-stats {
    display: flex;
    gap: 48px;
    margin-top: 64px;
    position: relative;
    z-index: 1;
    padding-top: 32px;
    border-top: 1px solid var(--border);
    align-self: flex-end;
  }
  .cp-hstat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.6rem;
    font-weight: 300;
    color: var(--white);
    line-height: 1;
    letter-spacing: -0.02em;
  }
  .cp-hstat-lbl {
    font-size: 0.58rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-top: 6px;
  }

  /* right photo panel */
  .cp-hero-right {
    position: relative;
    background: #080806;
    overflow: hidden;
  }
  /* Placeholder gradient simulating a moody wedding photo */
  .cp-hero-photo {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(to bottom left, rgba(10,9,6,0) 30%, rgba(10,9,6,0.7) 100%),
      linear-gradient(160deg, #2a2318 0%, #1a1510 30%, #0e0c08 65%, #1c1a10 100%);
  }
  /* Decorative floral shimmer shapes */
  .cp-hero-photo::before {
    content: '';
    position: absolute;
    top: 60px; right: 40px;
    width: 340px; height: 460px;
    border-radius: 50% 50% 45% 55% / 55% 45% 55% 45%;
    background: radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%);
  }
  .cp-hero-photo::after {
    content: '';
    position: absolute;
    bottom: 100px; left: 20px;
    width: 180px; height: 240px;
    border-radius: 50%;
    background: radial-gradient(ellipse, rgba(180,140,80,0.05) 0%, transparent 70%);
  }

  /* caption card bottom-right */
  .cp-caption {
    position: absolute;
    bottom: 40px;
    right: 32px;
    background: rgba(8,7,5,0.82);
    backdrop-filter: blur(10px);
    border: 1px solid var(--border);
    padding: 18px 24px;
    z-index: 2;
  }
  .cp-caption-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.05rem;
    font-weight: 400;
    color: var(--white);
    letter-spacing: 0.02em;
  }
  .cp-caption-loc {
    font-size: 0.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-top: 5px;
  }

  /* ══════════════════════════
     INFO STRIP
     ══════════════════════════ */
  .cp-info-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    background: var(--surface);
  }
  .cp-info-item {
    padding: 36px 44px;
    display: flex;
    align-items: flex-start;
    gap: 18px;
    border-right: 1px solid var(--border);
    transition: background 0.35s;
    cursor: default;
  }
  .cp-info-item:last-child { border-right: none; }
  .cp-info-item:hover { background: var(--gold-glow); }
  .cp-info-icon {
    width: 32px; height: 32px;
    flex-shrink: 0;
    color: var(--gold);
    margin-top: 3px;
  }
  .cp-info-icon svg { width: 100%; height: 100%; stroke: currentColor; fill: none; stroke-width: 1.3; }
  .cp-info-text h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem;
    font-weight: 400;
    color: var(--white);
    margin-bottom: 5px;
  }
  .cp-info-text p,
  .cp-info-text a {
    font-size: 0.78rem;
    color: var(--text-muted);
    line-height: 1.65;
    text-decoration: none;
    transition: color 0.2s;
  }
  .cp-info-text a:hover { color: var(--gold); }

  /* ══════════════════════════
     FORM SECTION
     ══════════════════════════ */
  .cp-form-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 600px;
  }

  /* left: section label panel */
  .cp-form-left {
    background: var(--bg2);
    padding: 88px 64px;
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
    overflow: hidden;
  }
  .cp-form-ghost {
    position: absolute;
    bottom: -20px;
    left: -10px;
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(100px, 14vw, 180px);
    font-weight: 300;
    color: rgba(201,168,76,0.04);
    line-height: 1;
    user-select: none;
    pointer-events: none;
    font-style: italic;
  }
  .cp-form-label {
    font-size: 0.6rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 36px;
  }
  .cp-form-label::before {
    content: '';
    width: 28px;
    height: 1px;
    background: var(--gold-dim);
  }
  .cp-form-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 300;
    color: var(--white);
    line-height: 1.15;
    position: relative;
    z-index: 1;
  }
  .cp-form-heading em {
    font-style: italic;
    color: var(--gold);
    display: block;
  }
  .cp-form-sub {
    margin-top: 20px;
    font-size: 0.8rem;
    line-height: 1.85;
    color: var(--text-muted);
    max-width: 300px;
    position: relative;
    z-index: 1;
  }
  .cp-form-sub a { color: var(--gold); text-decoration: underline; text-underline-offset: 3px; }

  /* right: actual form */
  .cp-form-right {
    padding: 88px 64px;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .cp-form { display: flex; flex-direction: column; }
  .cp-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 36px;
  }
  .cp-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
  }
  .cp-field label {
    font-size: 0.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold-dim);
    margin-bottom: 12px;
    font-weight: 400;
  }
  .cp-field label .req { color: var(--gold); }
  .cp-field input,
  .cp-field textarea {
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(201,168,76,0.18);
    padding: 10px 0;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem;
    color: var(--text);
    outline: none;
    transition: border-color 0.3s;
    width: 100%;
    caret-color: var(--gold);
  }
  .cp-field input::placeholder,
  .cp-field textarea::placeholder {
    color: rgba(106,98,85,0.5);
    font-style: italic;
  }
  .cp-field input:focus,
  .cp-field textarea:focus { border-bottom-color: var(--gold); }
  .cp-field textarea { resize: none; height: 88px; }
  .cp-field input[type="date"] { color-scheme: dark; }

  .cp-hr { height: 1px; background: var(--border); margin: 4px 0 28px; }

  .cp-consent {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 16px;
  }
  .cp-consent input[type="checkbox"] {
    margin-top: 3px;
    accent-color: var(--gold);
    flex-shrink: 0;
  }
  .cp-consent label {
    font-size: 0.77rem;
    color: var(--text-muted);
    line-height: 1.7;
  }
  .cp-consent label strong { color: var(--text); font-weight: 400; }
  .cp-consent label a { color: var(--gold); text-decoration: underline; text-underline-offset: 2px; }

  .cp-submit-wrap { margin-top: 28px; }
  .cp-submit {
    background: transparent;
    color: var(--gold);
    border: 1px solid var(--gold-dim);
    padding: 14px 52px;
    font-family: 'Lato', sans-serif;
    font-size: 0.68rem;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: color 0.38s, border-color 0.38s;
  }
  .cp-submit::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gold);
    transform: translateX(-101%);
    transition: transform 0.4s ease;
    z-index: 0;
  }
  .cp-submit:hover::before { transform: translateX(0); }
  .cp-submit:hover { color: var(--bg); border-color: var(--gold); }
  .cp-submit span { position: relative; z-index: 1; }

  /* ══════════════════════════
     MAP
     ══════════════════════════ */
  .cp-map {
    height: 280px;
    background: var(--surface);
    position: relative;
    overflow: hidden;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .cp-map::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  .cp-map-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
  .cp-pin {
    width: 14px; height: 14px;
    background: var(--gold);
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 0 0 5px rgba(201,168,76,0.16), 0 0 24px rgba(201,168,76,0.25);
    margin-bottom: 18px;
  }
  .cp-map-lbl {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 0.92rem;
    color: var(--text-muted);
  }

  /* ══════════════════════════
     INSTAGRAM
     ══════════════════════════ */
  .cp-insta {
    padding: 64px 0 0;
    text-align: center;
    background: var(--bg2);
    border-top: 1px solid var(--border);
  }
  .cp-insta-hd {
    font-size: 0.6rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 32px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  .cp-insta-hd::before, .cp-insta-hd::after {
    content: '';
    width: 52px;
    height: 1px;
    background: var(--border);
  }
  .cp-ig-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0;
  }
  .cp-ig-tile {
    aspect-ratio: 1;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
  .cp-ig-tile:nth-child(1) { background: #1e1b11; }
  .cp-ig-tile:nth-child(2) { background: #19170e; }
  .cp-ig-tile:nth-child(3) { background: #1c1a10; }
  .cp-ig-tile:nth-child(4) { background: #181610; }
  .cp-ig-tile:nth-child(5) { background: #1b1910; }
  /* inner glow pattern per tile */
  .cp-ig-tile::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%);
    transition: opacity 0.3s;
    opacity: 0;
  }
  .cp-ig-tile:hover::before { opacity: 1; }
  .cp-ig-ov {
    position: absolute;
    inset: 0;
    background: rgba(8,7,5,0.5);
    opacity: 0;
    transition: opacity 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    transition: opacity 0.3s, border-color 0.3s;
  }
  .cp-ig-tile:hover .cp-ig-ov {
    opacity: 1;
    border-color: var(--border);
  }
  .cp-ig-ov svg { width: 22px; height: 22px; stroke: var(--gold); fill: none; stroke-width: 1.4; }

  /* ══════════════════════════
     SUCCESS STATE
     ══════════════════════════ */
  .cp-success {
    text-align: center;
    padding: 72px 20px;
    animation: fadeUp 0.6s ease;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: none; }
  }
  .cp-success h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    font-style: italic;
    color: var(--gold);
    margin-bottom: 14px;
    font-weight: 300;
  }
  .cp-success p {
    font-size: 0.84rem;
    color: var(--text-muted);
    line-height: 1.8;
  }

  /* ══════════════════════════
     RESPONSIVE
     ══════════════════════════ */
  @media (max-width: 900px) {
    .cp-hero { grid-template-columns: 1fr; min-height: auto; }
    .cp-hero-left { padding: 80px 36px 60px; }
    .cp-hero-right { height: 50vw; min-height: 280px; }
    .cp-form-wrap { grid-template-columns: 1fr; }
    .cp-form-left { padding: 60px 36px 48px; border-right: none; border-bottom: 1px solid var(--border); }
    .cp-form-right { padding: 60px 36px; }
    .cp-info-strip { grid-template-columns: 1fr; }
    .cp-info-item { border-right: none; border-bottom: 1px solid var(--border); }
    .cp-ig-grid { grid-template-columns: repeat(3, 1fr); }
    .cp-row { grid-template-columns: 1fr; gap: 0; }
  }
`;

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", weddingDate: "",
    story: "", smsConsent: false, termsConsent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.termsConsent) return;
    setSubmitted(true);
  };

  return (
    <>
      <style>{styles}</style>
      <Navbar />
      <div className="cp">

        {/* ── HERO ── */}
        <section className="cp-hero">
          <div className="cp-hero-left">
            <div className="cp-ghost-num">06</div>
            <div className="cp-eyebrow"><span>Contact</span></div>
            <h1 className="cp-hero-title">
              Tell Us Your<br />
              <em>Beautiful Story.</em>
            </h1>
            <p className="cp-hero-desc">
              Not just a booking — a conversation. Every great love story
              deserves to be preserved with intention and told with care.
            </p>
            <div className="cp-hero-stats">
              <div>
                <div className="cp-hstat-num">800+</div>
                <div className="cp-hstat-lbl">Stories Told</div>
              </div>
              <div>
                <div className="cp-hstat-num">12</div>
                <div className="cp-hstat-lbl">Years</div>
              </div>
              <div>
                <div className="cp-hstat-num">4.9★</div>
                <div className="cp-hstat-lbl">Rating</div>
              </div>
            </div>
          </div>

          <div className="cp-hero-right">
            <div className="cp-hero-photo" />
            <div className="cp-caption">
              <div className="cp-caption-name">Aarav &amp; Sneha</div>
              <div className="cp-caption-loc">Jaipur, Rajasthan · 2024</div>
            </div>
          </div>
        </section>

        {/* ── INFO STRIP ── */}
        <div className="cp-info-strip">
          <div className="cp-info-item">
            <div className="cp-info-icon">
              <svg viewBox="0 0 24 24"><path d="M12 21C12 21 5 13.5 5 8.5a7 7 0 0114 0C19 13.5 12 21 12 21z"/><circle cx="12" cy="8.5" r="2.5"/></svg>
            </div>
            <div className="cp-info-text">
              <h3>Find Us</h3>
              <p>Hyderabad, Telangana<br />Available Pan-India</p>
            </div>
          </div>
          <div className="cp-info-item">
            <div className="cp-info-icon">
              <svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
            </div>
            <div className="cp-info-text">
              <h3>Call Us</h3>
              <a href="tel:+919000000000">+91 90000 00000</a>
            </div>
          </div>
          <div className="cp-info-item">
            <div className="cp-info-icon">
              <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            </div>
            <div className="cp-info-text">
              <h3>Book Online</h3>
              <a href="#">Lock in a Session</a>
            </div>
          </div>
        </div>

        {/* ── FORM — two-column split ── */}
        <div className="cp-form-wrap">
          <div className="cp-form-left">
            <div className="cp-form-ghost">Story</div>
            <div className="cp-form-label">Your Enquiry</div>
            <h2 className="cp-form-heading">
              Every frame<br />
              <em>starts here.</em>
            </h2>
            <p className="cp-form-sub">
              Fill in the form to share your vision with us.
              Alternatively, give us a <a href="#">call</a> or make a <a href="#">booking online</a>.
            </p>
          </div>

          <div className="cp-form-right">
            {submitted ? (
              <div className="cp-success">
                <h3>Thank you, {form.name}.</h3>
                <p>We've received your story and will be in touch within 24 hours.<br />Every great love story deserves to be told beautifully.</p>
              </div>
            ) : (
              <div className="cp-form">
                <div className="cp-row">
                  <div className="cp-field">
                    <label>Full Name <span className="req">*</span></label>
                    <input name="name" value={form.name} onChange={handle} placeholder="Your name" />
                  </div>
                  <div className="cp-field">
                    <label>Email <span className="req">*</span></label>
                    <input name="email" type="email" value={form.email} onChange={handle} placeholder="Your email" />
                  </div>
                </div>
                <div className="cp-row">
                  <div className="cp-field">
                    <label>Phone / WhatsApp</label>
                    <input name="phone" value={form.phone} onChange={handle} placeholder="+91 00000 00000" />
                  </div>
                  <div className="cp-field">
                    <label>Wedding Date</label>
                    <input name="weddingDate" type="date" value={form.weddingDate} onChange={handle} />
                  </div>
                </div>
                <div className="cp-field">
                  <label>Your Story</label>
                  <textarea
                    name="story"
                    value={form.story}
                    onChange={handle}
                    placeholder="Tell us about your special day — venue, vision, and what makes your love story unique."
                  />
                </div>
                <div className="cp-hr" />
                <div className="cp-consent">
                  <input type="checkbox" id="sms" name="smsConsent" checked={form.smsConsent} onChange={handle} />
                  <label htmlFor="sms">
                    I agree to receive communication via <strong>SMS, RCS, and WhatsApp</strong> from Sameen's Photography
                    regarding my enquiry, booking updates, and exclusive offers. Reply STOP to opt out.
                  </label>
                </div>
                <div className="cp-consent">
                  <input type="checkbox" id="terms" name="termsConsent" checked={form.termsConsent} onChange={handle} />
                  <label htmlFor="terms">
                    I accept the <a href="#">Privacy Policy</a> and <a href="#">Terms &amp; Conditions</a> of Sameen's Photography. <span className="req">*</span>
                  </label>
                </div>
                <div className="cp-submit-wrap">
                  <button className="cp-submit" onClick={handleSubmit}>
                    <span>Send Your Story</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── MAP ── */}
        <div className="cp-map">
          <div className="cp-map-content">
            <div className="cp-pin" />
            <p className="cp-map-lbl">Hyderabad, Telangana</p>
          </div>
        </div>

        {/* ── INSTAGRAM ── */}
        <section className="cp-insta">
          <div className="cp-insta-hd">Follow Us on Instagram</div>
          <div className="cp-ig-grid">
            {[...Array(5)].map((_, i) => (
              <div className="cp-ig-tile" key={i}>
                <div className="cp-ig-ov">
                  <svg viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="5"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="#c9a84c" stroke="none"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}