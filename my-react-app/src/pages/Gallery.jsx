import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { X, ArrowUpRight, ArrowRight, Sparkles, Camera, Users, Calendar, MapPin, ChevronDown } from 'lucide-react';
import Navbar from '../components/wedding/Navbar';
import Footer from '../components/wedding/Footer';

/* ─── SCROLL TO TOP ─────────────────────────────────────────────── */
function useScrollTop() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
}

/* ─── CATEGORIES ────────────────────────────────────────────────── */
const CATS = ['All', 'Weddings', 'Birthdays', 'Corporate', 'Portraits', 'Engagements', 'Milestones'];

/* ─── DATA ──────────────────────────────────────────────────────── */
const ITEMS = [
  { id:1,  cat:'Weddings',    label:'Aarav & Sneha',    loc:'Mumbai Ballroom',    year:'2024', span:'wide', src:'https://media.base44.com/images/public/69df8879cb8202c53abec211/2e0525af7_generated_1cbaed0a.png' },
  { id:2,  cat:'Weddings',    label:'First Kiss',        loc:'Outdoor Ceremony',   year:'2024', span:'tall', src:'https://media.base44.com/images/public/69df8879cb8202c53abec211/1b11be9c6_generated_image.png' },
  { id:3,  cat:'Weddings',    label:'Rohan & Priya',    loc:'Beachside · Goa',    year:'2023', span:'norm', src:'https://media.base44.com/images/public/69df8879cb8202c53abec211/d27732052_generated_5ebdc2c5.png' },
  { id:4,  cat:'Weddings',    label:'Golden Hour',       loc:'Sunset Portraits',   year:'2024', span:'wide', src:'https://media.base44.com/images/public/69df8879cb8202c53abec211/0b98167c0_generated_image.png' },
  { id:5,  cat:'Birthdays',   label:'Sofia Turns 7',    loc:'Fairy Tale · Pune',  year:'2024', span:'tall', src:'https://media.base44.com/images/public/69df8879cb8202c53abec211/87f1ad109_generated_b3296a67.png' },
  { id:6,  cat:'Birthdays',   label:'Sweet Sixteen',    loc:'Rooftop Celebration',year:'2023', span:'wide', src:'https://media.base44.com/images/public/69df8879cb8202c53abec211/10ec492a4_generated_image.png' },
  { id:7,  cat:'Birthdays',   label:'Golden 50th',       loc:'Family Milestone',   year:'2024', span:'norm', src:'https://media.base44.com/images/public/69df8879cb8202c53abec211/fb31b799d_generated_49f25257.png' },
  { id:8,  cat:'Corporate',   label:'Annual Gala',       loc:'ITC Grand · BLR',    year:'2024', span:'wide', src:'https://media.base44.com/images/public/69df8879cb8202c53abec211/05b3898cd_generated_image.png' },
  { id:9,  cat:'Corporate',   label:'Product Launch',   loc:'Tech Summit · HYD',  year:'2024', span:'tall', src:'https://media.base44.com/images/public/69df8879cb8202c53abec211/22b0dd83b_generated_ad9958d0.png' },
  { id:10, cat:'Portraits',   label:'Meera',             loc:'Studio Series',      year:'2024', span:'norm', src:'https://media.base44.com/images/public/69df8879cb8202c53abec211/a5485740e_generated_image.png' },
  { id:11, cat:'Portraits',   label:'Rooftop Night',    loc:'Urban Editorial',    year:'2023', span:'wide', src:'https://media.base44.com/images/public/69df8879cb8202c53abec211/db828e1dc_generated_3607cc7f.png' },
  { id:12, cat:'Engagements', label:'Karan & Ananya',   loc:'Ring Ceremony · DEL',year:'2024', span:'tall', src:'https://media.base44.com/images/public/69df8879cb8202c53abec211/a89c27c8b_generated_image.png' },
  { id:13, cat:'Engagements', label:'Ring Detail',       loc:'Macro Fine Art',     year:'2024', span:'norm', src:'https://media.base44.com/images/public/69df8879cb8202c53abec211/db828e1dc_generated_3607cc7f.png' },
  { id:14, cat:'Engagements', label:'Vikram & Ishita',  loc:'Garden Proposal',    year:'2023', span:'wide', src:'https://media.base44.com/images/public/69df8879cb8202c53abec211/2e0525af7_generated_1cbaed0a.png' },
  { id:15, cat:'Milestones',  label:'Graduation Day',   loc:'University · MUM',   year:'2024', span:'norm', src:'https://media.base44.com/images/public/69df8879cb8202c53abec211/1b11be9c6_generated_image.png' },
  { id:16, cat:'Milestones',  label:'First Dance',       loc:'Reception Night',    year:'2024', span:'wide', src:'https://media.base44.com/images/public/69df8879cb8202c53abec211/87f1ad109_generated_b3296a67.png' },
  { id:17, cat:'Milestones',  label:'Forest Walk',       loc:'Nature Series',      year:'2023', span:'tall', src:'https://media.base44.com/images/public/69df8879cb8202c53abec211/05b3898cd_generated_image.png' },
  { id:18, cat:'Milestones',  label:'Reception Dance',  loc:'Candid Moment',      year:'2024', span:'norm', src:'https://media.base44.com/images/public/69df8879cb8202c53abec211/a89c27c8b_generated_image.png' },
];

/* ─── PARTICLE BACKGROUND SYSTEM ─────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    const initParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 8000);
      particles.current = [];
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
    };
    
    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let p of particles.current) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
        
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - dist) / 100 * 0.5;
          p.x -= Math.cos(angle) * force;
          p.y -= Math.sin(angle) * force;
        }
      }
      animationId = requestAnimationFrame(draw);
    };
    
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    draw();
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />;
}

/* ─── VELOCITY MARQUEE ──────────────────────────────────────────── */
function VelocityMarquee({ children, baseVelocity = 3 }) {
  const x = useMotionValue(0);
  const scrollVelocity = useVelocity(useScroll().scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    let v = baseVelocity;
    if (velocityFactor.get() < 0) { directionFactor.current = -1; }
    else if (velocityFactor.get() > 0) { directionFactor.current = 1; }
    const moveBy = directionFactor.current * v * (delta / 1000);
    x.set(x.get() + moveBy);
  });

  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', position: 'relative', zIndex: 2 }}>
      <motion.div style={{ x, display: 'inline-flex', gap: 48 }}>
        {[...Array(4)].map((_, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 48 }}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── GRAIN OVERLAY ─────────────────────────────────────────────── */
function Grain() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999, pointerEvents: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
      opacity: 0.15,
    }} />
  );
}

/* ─── LIGHTBOX ──────────────────────────────────────────────────── */
function Lightbox({ item, total, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'ArrowLeft')  onPrev();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'Escape')     onClose();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onPrev, onNext, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ position:'fixed', inset:0, zIndex:300, background:'rgba(0,0,0,0.98)',
        display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(16px)' }}
      onClick={onClose}
    >
      <div style={{ position:'absolute', top:0, left:0, right:0, padding:'28px 40px',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:20 }}>
          <span style={{ fontSize:10, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)', fontWeight:400 }}>
            {item.cat}
          </span>
          <span style={{ width:1, height:14, background:'rgba(255,255,255,0.2)' }} />
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <MapPin size={10} color="rgba(255,255,255,0.3)" />
            <span style={{ fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)' }}>
              {item.loc}
            </span>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:28 }}>
          <div style={{ fontFamily:"'Inter', sans-serif", fontSize:12, letterSpacing:'0.15em', color:'rgba(255,255,255,0.3)' }}>
            {String(index+1).padStart(2,'0')} / {String(total).padStart(2,'0')}
          </div>
          <button onClick={onClose} style={{ color:'rgba(255,255,255,0.6)', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.1)', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            width:40, height:40, borderRadius:'50%', transition:'all .3s' }}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.color='#fff';}}
            onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.color='rgba(255,255,255,0.6)';}}>
            <X size={16} />
          </button>
        </div>
      </div>

      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth:'80vw', maxHeight:'70vh', position:'relative', zIndex:1 }}
        onClick={e => e.stopPropagation()}
      >
        <img src={item.src} alt={item.label}
          style={{ width:'100%', height:'100%', objectFit:'contain', display:'block' }} />

        <div style={{ marginTop:24, display:'flex', alignItems:'flex-end', justifyContent:'space-between', width:'100%' }}>
          <div>
            <div style={{ fontFamily:"'Inter', sans-serif", fontSize:'clamp(1.2rem,2.5vw,1.8rem)',
              fontWeight:300, color:'rgba(255,255,255,0.95)', lineHeight:1.2, marginBottom:8, letterSpacing:'-0.02em' }}>
              {item.label}
            </div>
            <div style={{ fontSize:9, letterSpacing:'0.35em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)' }}>
              {item.year}
            </div>
          </div>
          <div style={{ display:'flex', gap:6 }}>
            {Array.from({ length: Math.min(total, 6) }).map((_, i) => (
              <div key={i} style={{ width: i === index % 6 ? 20 : 3, height:3, borderRadius:1.5,
                background: i === index % 6 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.15)',
                transition:'all .3s' }} />
            ))}
          </div>
        </div>
      </motion.div>

      {['prev','next'].map(dir => (
        <button key={dir}
          onClick={e => { e.stopPropagation(); dir==='prev' ? onPrev() : onNext(); }}
          style={{ position:'absolute', [dir==='prev'?'left':'right']:32, top:'50%', transform:'translateY(-50%)',
            width:48, height:48, borderRadius:'50%', background:'rgba(255,255,255,0.02)',
            border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.5)',
            fontSize:'1.6rem', display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', transition:'all .25s', backdropFilter:'blur(8px)', zIndex:2 }}
          onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.3)'; e.currentTarget.style.color='#fff'; }}
          onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.color='rgba(255,255,255,0.5)'; }}>
          {dir === 'prev' ? '←' : '→'}
        </button>
      ))}
    </motion.div>
  );
}

/* ─── 3D TILT CARD WITH ADVANCED ANIMATIONS ─────────────────────── */
function Card({ item, index, onClick }) {
  const [hov, setHov] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.6, 0.6], [6, -6]), { stiffness: 300, damping: 25 });
  const ry = useSpring(useTransform(mx, [-0.6, 0.6], [-6, 6]), { stiffness: 300, damping: 25 });
  const glow = useSpring(0, { stiffness: 200, damping: 20 });

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
    glow.set(1);
  };
  const onMouseLeave = () => { mx.set(0); my.set(0); glow.set(0); setHov(false); };

  const isWide = item.span === 'wide';
  const isTall = item.span === 'tall';

  return (
    <motion.div
      initial={{ opacity: 0, y: 70, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (index % 5) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ gridColumn: isWide ? 'span 2' : 'span 1', gridRow: isTall ? 'span 2' : 'span 1',
        perspective: 1200 }}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d',
          position: 'relative', width: '100%', height: '100%',
          aspectRatio: isTall ? '3/4' : isWide ? '16/9' : '4/5',
          cursor: 'pointer', overflow: 'hidden', backgroundColor: '#111',
          borderRadius: 12, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)' }}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={onMouseLeave}
        onClick={() => onClick(item)}
        whileHover={{ scale: 1.02 }}
        transition={{ scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
      >
        <motion.img
          src={item.src} alt={item.label}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            filter: hov ? 'grayscale(0%) contrast(1.05)' : 'grayscale(30%) contrast(0.98)',
            transition: 'filter 0.8s cubic-bezier(0.2,0.9,0.4,1.1)' }}
          animate={{ scale: hov ? 1.08 : 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.div
          animate={{ opacity: hov ? 0.8 : 0.4 }}
          transition={{ duration: 0.4 }}
          style={{ position:'absolute', inset:0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: hov ? 1 : 0, x: hov ? 0 : -10 }}
          transition={{ duration: 0.3 }}
          style={{ position:'absolute', top:18, left:18,
            background:'rgba(0,0,0,0.7)', backdropFilter:'blur(12px)',
            borderRadius: 20, padding:'5px 14px', border:'1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontSize:8, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(255,255,255,0.9)', fontWeight:400 }}>
            {item.cat}
          </span>
        </motion.div>

        <motion.div
          animate={{ opacity: hov ? 0.25 : 0, scale: hov ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
          style={{ position:'absolute', top:18, right:20,
            fontSize:12, fontWeight:300, color:'#fff',
            fontFamily:"'Inter', sans-serif", letterSpacing:'0.05em' }}>
          {String(item.id).padStart(2,'0')}
        </motion.div>

        <motion.div
          animate={{ y: hov ? 0 : 15, opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ position:'absolute', bottom:0, left:0, right:0, padding:'22px 20px 20px' }}>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between' }}>
            <div>
              <motion.div
                animate={{ y: hov ? 0 : 8 }}
                transition={{ delay: 0.05 }}
                style={{ fontFamily:"'Inter', sans-serif", fontSize:'clamp(0.9rem,1.6vw,1.2rem)',
                  fontWeight:400, color:'#fff', lineHeight:1.2, marginBottom:4, letterSpacing:'-0.01em' }}>
                {item.label}
              </motion.div>
              <motion.div
                animate={{ y: hov ? 0 : 5 }}
                transition={{ delay: 0.1 }}
                style={{ fontSize:8, letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)' }}>
                {item.loc}
              </motion.div>
            </div>
            <motion.div
              animate={{ rotate: hov ? 45 : 0, x: hov ? 0 : 5 }}
              transition={{ duration: 0.25 }}>
              <ArrowUpRight size={15} color="rgba(255,255,255,0.8)" strokeWidth={1.5} />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: hov ? 0.5 : 0, x: hov ? '150%' : '-40%' }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{ position:'absolute', inset:0, pointerEvents:'none',
            background:'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.08) 45%, transparent 60%)',
            transform:'skewX(-15deg)' }} />
      </motion.div>
    </motion.div>
  );
}

/* ─── HORIZONTAL CINEMA STRIP WITH SCROLL PROGRESS ───────────────── */
const STRIP_W = ['44vw','30vw','50vw','34vw','42vw','28vw','46vw','33vw'];
const STRIP_H = ['64vh','54vh','70vh','50vh','60vh','55vh','65vh','52vh'];

function CinemaStrip({ items, onOpen }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-68vw']);
  const prog = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={ref} style={{ position:'relative', height:'420vh' }}>
      <div style={{ position:'sticky', top:0, height:'100vh', overflow:'hidden',
        display:'flex', alignItems:'center', background:'#0A0A0A' }}>
        <motion.div style={{ x, display:'flex', gap:16, paddingLeft:48, paddingRight:'55vw',
          alignItems:'center', height:'78vh' }}>
          {items.map((img, i) => (
            <motion.div key={i}
              style={{ position:'relative', flexShrink:0, overflow:'hidden', borderRadius:8,
                width: STRIP_W[i], height: STRIP_H[i], cursor:'pointer',
                boxShadow:'0 20px 40px -15px rgba(0,0,0,0.6)' }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => onOpen(img)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img src={img.src} alt={img.label}
                style={{ width:'100%', height:'100%', objectFit:'cover', display:'block',
                  transition:'transform 1.3s ease, filter 0.7s ease', filter:'grayscale(40%)' }}
                onMouseEnter={e=>{e.target.style.transform='scale(1.06)';e.target.style.filter='grayscale(0%)';}}
                onMouseLeave={e=>{e.target.style.transform='scale(1)';e.target.style.filter='grayscale(40%)';}}
              />
              <div style={{ position:'absolute', bottom:0, left:0, right:0,
                background:'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                padding:'24px 20px 18px', opacity:0, transition:'opacity 0.5s cubic-bezier(0.2,0.9,0.4,1.1)' }}
                onMouseEnter={e=>e.currentTarget.style.opacity='1'}
                onMouseLeave={e=>e.currentTarget.style.opacity='0'}>
                <div style={{ fontFamily:"'Inter', sans-serif", fontSize:'1rem',
                  fontWeight:400, color:'#fff', letterSpacing:'-0.01em' }}>{img.label}</div>
                <div style={{ fontSize:8, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)', marginTop:5 }}>
                  {img.cat}
                </div>
              </div>
              <div style={{ position:'absolute', top:0, left:10, bottom:0, width:10,
                display:'flex', flexDirection:'column', justifyContent:'space-around',
                background:'rgba(0,0,0,0.4)', borderRadius:4, padding:'8px 2px' }}>
                {[...Array(7)].map((_,k)=>(
                  <div key={k} style={{ width:5, height:5, borderRadius:1, background:'rgba(0,0,0,0.8)',
                    border:'0.5px solid rgba(255,255,255,0.15)' }} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div style={{ position:'absolute', bottom:36, left:48, display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ width:120, height:1, background:'rgba(255,255,255,0.1)', position:'relative' }}>
            <motion.div style={{ position:'absolute', top:0, left:0, height:'100%',
              background:'rgba(255,255,255,0.7)', width: prog }} />
          </div>
          <span style={{ fontSize:7, letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)' }}>
            scroll · cinematic journey
          </span>
        </div>

        <div style={{ position:'absolute', top:36, left:48 }}>
          <span style={{ fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(255,255,255,0.25)' }}>
            ◇ moving frames
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─── SPLIT FEATURED WITH ENHANCED INTERACTION ──────────────────── */
function FeaturedSplit({ items }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <section style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'85vh',
      background:'#0A0A0A', position:'relative' }}>
      <AnimatePresence mode="wait">
        <motion.div key={active}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ position:'relative', overflow:'hidden' }}>
          <img src={current.src} alt={current.label}
            style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
          <div style={{ position:'absolute', inset:0,
            background:'linear-gradient(to right, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.6) 100%)' }} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ position:'absolute', bottom:32, left:32, zIndex:2 }}>
            <div style={{ fontSize:9, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)' }}>
              featured story
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div style={{ display:'flex', flexDirection:'column', justifyContent:'center',
        padding:'80px 60px', gap:0, background:'#0A0A0A' }}>
        <div style={{ fontSize:8, letterSpacing:'0.5em', textTransform:'uppercase',
          color:'rgba(255,255,255,0.35)', marginBottom:56, fontWeight:400 }}>
          Editor's selection
        </div>

        {items.map((item, i) => (
          <motion.div key={item.id}
            onClick={() => setActive(i)}
            style={{ padding:'22px 0', borderBottom:'1px solid rgba(255,255,255,0.05)',
              cursor:'pointer', display:'flex', alignItems:'center',
              justifyContent:'space-between', gap:20 }}
            whileHover={{ x: 8 }}
            transition={{ duration: 0.2 }}
          >
            <div style={{ display:'flex', alignItems:'center', gap:24 }}>
              <span style={{ fontSize:10, letterSpacing:'0.15em', color: i === active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)',
                fontFamily:"'Inter', sans-serif", width:32 }}>
                {String(i+1).padStart(2,'0')}
              </span>
              <div>
                <div style={{ fontFamily:"'Inter', sans-serif",
                  fontSize: i === active ? 'clamp(1rem,2vw,1.4rem)' : 'clamp(0.9rem,1.6vw,1.1rem)',
                  fontWeight: i === active ? 400 : 300,
                  color: i === active ? '#fff' : 'rgba(255,255,255,0.35)',
                  transition:'all 0.3s ease', lineHeight:1.2 }}>
                  {item.label}
                </div>
                <div style={{ fontSize:8, letterSpacing:'0.25em', textTransform:'uppercase',
                  color:'rgba(255,255,255,0.25)', marginTop:4 }}>
                  {item.loc} · {item.year}
                </div>
              </div>
            </div>
            <motion.div animate={{ rotate: i === active ? 45 : 0, x: i === active ? 4 : 0 }} transition={{ duration:0.2 }}>
              <ArrowUpRight size={13} color={i === active ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.15)'} strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── COUNTER STRIP WITH ANIMATED NUMBERS ───────────────────────── */
function CounterStrip() {
  const stats = [
    { n: 528, label: 'stories told', icon: Camera },
    { n: 6,   label: 'event types', icon: Calendar },
    { n: 18,  label: 'selected frames', icon: Sparkles },
    { n: 2024, label: 'latest season', icon: Users },
  ];
  
  return (
    <div style={{ background:'#0A0A0A', padding:'72px 48px',
      display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0,
      borderTop:'1px solid rgba(255,255,255,0.04)',
      borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
      {stats.map((s, i) => {
        const [count, setCount] = useState(0);
        const ref = useRef(null);
        useEffect(() => {
          const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
              let start = 0;
              const duration = 1500;
              const step = (timestamp) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                setCount(Math.floor(progress * s.n));
                if (progress < 1) requestAnimationFrame(step);
              };
              requestAnimationFrame(step);
              observer.disconnect();
            }
          }, { threshold: 0.5 });
          if (ref.current) observer.observe(ref.current);
          return () => observer.disconnect();
        }, [s.n]);
        return (
          <motion.div key={s.label}
            ref={ref}
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ delay: i*0.1, duration:0.6 }}
            style={{ textAlign:'center', borderRight: i<3 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              padding:'24px 0' }}>
            <s.icon size={24} color="rgba(255,255,255,0.15)" style={{ marginBottom:14 }} />
            <div style={{ fontFamily:"'Inter', sans-serif", fontSize:'clamp(2rem,4.5vw,3.2rem)',
              fontWeight:400, color:'rgba(255,255,255,0.9)', lineHeight:1, marginBottom:10, letterSpacing:'-0.02em' }}>
              {count}{s.n >= 1000 ? '+' : ''}
            </div>
            <div style={{ fontSize:8, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(255,255,255,0.25)', fontWeight:400 }}>
              {s.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── MAIN PAGE — DYNAMIC MONOCHROME WITH PARTICLES ──────────────── */
export default function Gallery() {
  useScrollTop();

  const [activeCat, setActiveCat]     = useState('All');
  const [lightbox,  setLightbox]      = useState(null);
  const heroRef = useRef(null);
  const cursorRef = useRef(null);

  const { scrollYProgress: hs } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY   = useTransform(hs, [0,1], ['0%','22%']);
  const heroOp  = useTransform(hs, [0,0.65], [1,0]);
  const heroSc  = useTransform(hs, [0,1], [1, 1.05]);

  const filtered = useMemo(() => 
    activeCat === 'All' ? ITEMS : ITEMS.filter(g => g.cat === activeCat),
    [activeCat]
  );
  const idx      = lightbox ? filtered.findIndex(g => g.id === lightbox.id) : -1;

  const open  = (item) => setLightbox(item);
  const close = () => setLightbox(null);
  const prev  = useCallback(() => setLightbox(filtered[(idx-1+filtered.length)%filtered.length]), [idx, filtered]);
  const next  = useCallback(() => setLightbox(filtered[(idx+1)%filtered.length]), [idx, filtered]);

  const marqueeWords = ['Weddings', 'Birthdays', 'Engagements', 'Corporate', 'Portraits', 'Milestones', 'Anniversaries', 'Graduations'];

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div style={{ background:'#0A0A0A', color:'#fff', fontFamily:"'Inter', sans-serif", overflowX:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;cursor:none;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:#111;}
        ::-webkit-scrollbar-thumb{background:#333;border-radius:2px;}
        .filter-pill{
          font-size:9px;letter-spacing:.35em;text-transform:uppercase;
          padding:7px 18px;cursor:pointer;transition:all .25s;
          background:transparent;color:rgba(255,255,255,0.4);
          border:none;font-weight:400;white-space:nowrap;
          position:relative;
        }
        .filter-pill::after{
          content:'';position:absolute;bottom:-2px;left:18px;right:18px;
          height:1px;background:#fff;transform:scaleX(0);
          transition:transform 0.25s ease;
        }
        .filter-pill:hover{color:#fff;}
        .filter-pill.active{color:#fff;}
        .filter-pill.active::after{transform:scaleX(1);}
        @media(max-width:768px){
          *{cursor:auto;}
          .split-section{grid-template-columns:1fr!important;}
          .split-section>div:last-child{padding:40px 24px!important;}
          .counter-grid{grid-template-columns:1fr 1fr!important;}
          .masonry-grid{grid-template-columns:1fr!important;}
        }
        @media(max-width:480px){
          .filter-row{gap:6px!important;}
          .filter-pill{padding:5px 12px!important;font-size:8px!important;}
        }
      `}</style>

      <div ref={cursorRef} style={{
        position: 'fixed', top: 0, left: 0, width: 8, height: 8,
        background: '#fff', borderRadius: '50%', pointerEvents: 'none',
        zIndex: 10000, mixBlendMode: 'difference', transition: 'transform 0.05s ease',
        transform: 'translate(-50%, -50%)'
      }} />

      <ParticleField />
      <Grain />
      <Navbar />

      {/* ════════════════ HERO — DYNAMIC PRESENTATION ════════════════ */}
      <section ref={heroRef}
        style={{ position:'relative', height:'100vh', overflow:'hidden',
          display:'flex', alignItems:'flex-end', paddingBottom:'10vh', paddingLeft:'clamp(24px,6vw,80px)' }}>

        <motion.div style={{ position:'absolute', inset:0, scale: heroSc, y: heroY }}>
          <img
            src="https://media.base44.com/images/public/69df8879cb8202c53abec211/0b98167c0_generated_image.png"
            alt="hero"
            style={{ width:'100%', height:'115%', objectFit:'cover', display:'block' }}
          />
        </motion.div>

        <div style={{ position:'absolute', inset:0,
          background:'linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.4) 60%, rgba(10,10,10,0.1) 100%)' }} />
        <div style={{ position:'absolute', inset:0,
          background:'linear-gradient(to right, #0A0A0A 0%, transparent 70%)' }} />

        <motion.div style={{ opacity: heroOp, position:'relative', zIndex:10, maxWidth:800 }}>
          <motion.div
            initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
            transition={{ duration: 0.7 }}
            style={{ display:'flex', alignItems:'center', gap:12, marginBottom:28 }}>
            <div style={{ width:32, height:1, background:'rgba(255,255,255,0.4)' }} />
            <span style={{ fontSize:8, letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', fontWeight:400 }}>
              Every moment · eternal frame
            </span>
          </motion.div>

          <div style={{ overflow:'hidden', lineHeight:1.05 }}>
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily:"'Inter', sans-serif", fontSize:'clamp(3.5rem, 10vw, 8rem)',
                fontWeight:500, color:'rgba(255,255,255,0.95)', letterSpacing:'-0.03em' }}>
              A Life
            </motion.div>
          </div>
          <div style={{ overflow:'hidden', lineHeight:0.95, marginTop:-8 }}>
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily:"'Inter', sans-serif", fontSize:'clamp(3.5rem, 10vw, 8rem)',
                fontWeight:300, color:'rgba(255,255,255,0.3)', letterSpacing:'-0.03em' }}>
              in Frames
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.8, duration:0.7 }}
            style={{ fontSize:'0.8rem', lineHeight:1.7, color:'rgba(255,255,255,0.45)',
              maxWidth:440, marginTop:24, fontWeight:300 }}>
            Timeless imagery for life's most meaningful chapters — from whispered vows to jubilant celebrations.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.3 }}
          style={{ position:'absolute', bottom:48, right:48, display:'flex', flexDirection:'column',
            alignItems:'center', gap:10 }}>
          <motion.div
            animate={{ y: [0, 8, 0] }} transition={{ duration:1.6, repeat:Infinity }}
            style={{ width:1, height:36, background:'linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent)' }} />
          <span style={{ fontSize:7, letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)' }}>
            Scroll
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.1 }}
          style={{ position:'absolute', top:120, right:48, textAlign:'right' }}>
          <div style={{ fontFamily:"'Inter', sans-serif", fontSize:'3.5rem',
            fontWeight:300, color:'rgba(255,255,255,0.05)', lineHeight:1 }}>
            {ITEMS.length}
          </div>
          <div style={{ fontSize:7, letterSpacing:'0.35em', textTransform:'uppercase', color:'rgba(255,255,255,0.15)' }}>
            works
          </div>
        </motion.div>
      </section>

      {/* ════════════════ VELOCITY MARQUEE ════════════════ */}
      <div style={{ padding:'18px 0', borderTop:'1px solid rgba(255,255,255,0.04)',
        borderBottom:'1px solid rgba(255,255,255,0.04)', overflow:'hidden', background:'#0A0A0A', position:'relative', zIndex:2 }}>
        <VelocityMarquee baseVelocity={2.5}>
          {marqueeWords.map((w, i) => (
            <span key={i} style={{ fontSize:9, letterSpacing:'0.45em', textTransform:'uppercase',
              color:'rgba(255,255,255,0.2)', display:'inline-flex', alignItems:'center', gap:24, fontWeight:400 }}>
              {w}
              <span style={{ width:2, height:2, borderRadius:'50%', background:'rgba(255,255,255,0.3)' }} />
            </span>
          ))}
        </VelocityMarquee>
      </div>

      {/* ════════════════ COUNTER STRIP ════════════════ */}
      <CounterStrip />

      {/* ════════════════ FILTER + MASONRY GRID ════════════════ */}
      <section style={{ background:'#0A0A0A', position:'relative', zIndex:2 }}>
        <div style={{ position:'sticky', top:0, zIndex:50, background:'rgba(10,10,10,0.92)',
          backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(255,255,255,0.04)',
          padding:'12px clamp(16px,4vw,48px)' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
            <div className="filter-row" style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:2 }}>
              {CATS.map(cat => (
                <button key={cat} className={`filter-pill ${activeCat===cat?'active':''}`}
                  onClick={() => setActiveCat(cat)}>
                  {cat}
                </button>
              ))}
            </div>
            <span style={{ fontSize:8, letterSpacing:'0.3em', textTransform:'uppercase',
              color:'rgba(255,255,255,0.25)', flexShrink:0 }}>
              {filtered.length} works
            </span>
          </div>
        </div>

        <div style={{ padding:'clamp(16px,3vw,40px)' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat}
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              transition={{ duration:0.4 }}
              className="masonry-grid"
              style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)',
                gap:12, autoRows:'minmax(260px, auto)' }}>
              {filtered.map((item, i) => (
                <Card key={item.id} item={item} index={i} onClick={open} />
              ))}
            </motion.div>
          </AnimatePresence>
          {filtered.length === 0 && (
            <div style={{ padding:'120px 0', textAlign:'center' }}>
              <p style={{ fontSize:8, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(255,255,255,0.25)' }}>
                No works in this category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════ FEATURED SPLIT ════════════════ */}
      {/* <FeaturedSplit items={ITEMS.filter(i => i.span === 'wide').slice(0, 5)} /> */}

      {/* ════════════════ CINEMA STRIP ════════════════ */}
      {/* <CinemaStrip items={ITEMS.slice(0, 8)} onOpen={open} /> */}

      {/* ════════════════ SECONDARY MARQUEE ════════════════ */}
      <div style={{ padding:'20px 0', overflow:'hidden',
        borderTop:'1px solid rgba(255,255,255,0.04)', background:'#0A0A0A', position:'relative', zIndex:2 }}>
        <VelocityMarquee baseVelocity={-2}>
          {['Wedding Photography','Birthday Moments','Corporate Events','Portrait Sessions',
            'Engagement Stories','Life Milestones'].map((w,i) => (
            <span key={i} style={{ fontFamily:"'Inter', sans-serif", fontWeight:300,
              fontSize:'clamp(0.85rem,1.6vw,1.1rem)', color:'rgba(255,255,255,0.12)',
              display:'inline-flex', alignItems:'center', gap:32 }}>
              {w}
              <span style={{ width:3, height:3, borderRadius:'50%', background:'rgba(255,255,255,0.15)' }} />
            </span>
          ))}
        </VelocityMarquee>
      </div>

      {/* ════════════════ CTA — BOOKING SECTION ════════════════ */}
      <section style={{ padding:'120px clamp(24px,8vw,100px)', background:'#0A0A0A',
        borderTop:'1px solid rgba(255,255,255,0.04)', position:'relative', overflow:'hidden', zIndex:2 }}>
        <div style={{ position:'absolute', right:'-10%', top:'50%', transform:'translateY(-50%)',
          width:'40vw', height:'40vw', borderRadius:'50%',
          border:'1px solid rgba(255,255,255,0.02)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', right:'-5%', top:'50%', transform:'translateY(-50%)',
          width:'28vw', height:'28vw', borderRadius:'50%',
          border:'1px solid rgba(255,255,255,0.03)', pointerEvents:'none' }} />

        <div style={{ maxWidth:640, position:'relative', zIndex:1 }}>
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.7 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:32 }}>
              <div style={{ width:24, height:1, background:'rgba(255,255,255,0.3)' }} />
              <span style={{ fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(255,255,255,0.35)' }}>
                Book your session
              </span>
            </div>
            <div style={{ fontFamily:"'Inter', sans-serif",
              fontSize:'clamp(2.5rem,6vw,4.5rem)', fontWeight:500, lineHeight:1.08,
              marginBottom:12, letterSpacing:'-0.03em' }}>
              Your Story
            </div>
            <div style={{ fontFamily:"'Inter', sans-serif",
              fontSize:'clamp(2.5rem,6vw,4.5rem)', fontWeight:300,
              color:'rgba(255,255,255,0.35)', lineHeight:1.08, marginBottom:36, letterSpacing:'-0.03em' }}>
              Belongs Here
            </div>
            <p style={{ fontSize:'0.8rem', lineHeight:1.75, color:'rgba(255,255,255,0.4)',
              maxWidth:420, marginBottom:48, fontWeight:300 }}>
              Whether it's a birthday, wedding, or the quiet moments in between — let's capture them beautifully.
            </p>
            <motion.a href="/#contact"
              style={{ display:'inline-flex', alignItems:'center', gap:14,
                fontSize:8, letterSpacing:'0.3em', textTransform:'uppercase',
                color:'rgba(255,255,255,0.9)', textDecoration:'none',
                padding:'14px 32px', border:'1px solid rgba(255,255,255,0.2)',
                transition:'all .4s', position:'relative', overflow:'hidden', fontWeight:500 }}
              whileHover={{ borderColor:'rgba(255,255,255,0.6)' }}
            >
              <span>Begin your journey</span>
              <motion.span animate={{ x:[0,5,0] }} transition={{ duration:1.8, repeat:Infinity }}>
                <ArrowRight size={12} />
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />

      <AnimatePresence>
        {lightbox && (
          <Lightbox item={lightbox} total={filtered.length}
            index={idx} onClose={close} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>
    </div>
  );
}