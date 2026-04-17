import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const panels = [
  {
    src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/a89c27c8b_generated_image.png',
    title: 'Under The Stars',
    sub: 'Dev & Nisha — Mumbai 2025',
  },
  {
    src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/d48a52a97_generated_image.png',
    title: 'Heritage & Heart',
    sub: 'Ravi & Meera — Jaipur 2024',
  },
  {
    src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/af4dc1a4e_generated_image.png',
    title: 'From Above, With Love',
    sub: 'Nikhil & Pooja — Udaipur 2025',
  },
];

function FullBleedPanel({ panel }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale }}>
        <img src={panel.src} alt={panel.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </motion.div>
      <motion.div
        className="absolute bottom-16 left-6 lg:left-16 z-10"
        style={{ y: textY, opacity }}
      >
        <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase mb-2">{panel.sub}</p>
        <h3 className="font-heading text-4xl sm:text-6xl lg:text-7xl text-white italic">{panel.title}</h3>
      </motion.div>
    </div>
  );
}

export default function FullBleedGallery() {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-4">Signature Work</span>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl italic">Cinematic Portraits</h2>
        </motion.div>
      </div>
      {panels.map((panel, i) => (
        <FullBleedPanel key={i} panel={panel} />
      ))}
    </section>
  );
}