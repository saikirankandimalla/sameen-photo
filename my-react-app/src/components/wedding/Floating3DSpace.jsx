import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ─── image data ─────────────────────────────────────────── */
const floatingImages = [
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/70a230258_generated_9fbc190e.png',  x: '4%',  y: '8%',  z: 0,   w: 260, h: 340 },
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/2e0525af7_generated_1cbaed0a.png',  x: '54%', y: '4%',  z: 100, w: 300, h: 200 },
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/d27732052_generated_5ebdc2c5.png',  x: '26%', y: '42%', z: 200, w: 220, h: 290 },
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/b32b1f3a4_generated_31c40fbe.png',  x: '68%', y: '38%', z: 50,  w: 200, h: 260 },
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/db828e1dc_generated_3607cc7f.png',  x: '42%', y: '72%', z: 150, w: 220, h: 220 },
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/06bc59cfb_generated_d2325568.png',  x: '78%', y: '68%', z: 250, w: 240, h: 180 },
];

const mosaicImages = [
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/c97861a7b_generated_image.png',  label: 'Rings', span: 'col-span-2 row-span-2' },
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/94cf5974c_generated_image.png',  label: 'Above', span: 'col-span-1 row-span-1' },
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/b319056ad_generated_image.png',  label: 'Wind',  span: 'col-span-1 row-span-2' },
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/eeb55e72e_generated_image.png',  label: 'Dance', span: 'col-span-1 row-span-1' },
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/70a230258_generated_9fbc190e.png', label: 'Arrival', span: 'col-span-2 row-span-1' },
];

const stripImages = [
  'https://media.base44.com/images/public/69df8879cb8202c53abec211/0e31f2188_generated_df6025af.png',
  'https://media.base44.com/images/public/69df8879cb8202c53abec211/db828e1dc_generated_3607cc7f.png',
  'https://media.base44.com/images/public/69df8879cb8202c53abec211/2e0525af7_generated_1cbaed0a.png',
  'https://media.base44.com/images/public/69df8879cb8202c53abec211/d27732052_generated_5ebdc2c5.png',
];

/* ─── Desktop floating image ─────────────────────────────── */
function FloatingImage({ image, scrollYProgress }) {
  const y = useTransform(scrollYProgress, [0, 1], [image.z * 0.5, -image.z * 0.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.2, 1, 1, 0.2]);
  const blurVal = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [6, 0, 0, 6]);

  return (
    <motion.div
      className="absolute overflow-hidden shadow-2xl"
      style={{ left: image.x, top: image.y, width: image.w, height: image.h, y, opacity }}
    >
      <motion.div style={{ filter: useTransform(blurVal, v => `blur(${v}px)`) }} className="w-full h-full">
        <img
          src={image.src}
          alt="Wedding moment"
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 hover:scale-105"
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── Section 1 : Dimensional Space ─────────────────────── */
function DimensionalSpace() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ perspective: '1000px' }}>

      {/* ── Mobile: clean 2-col grid ── */}
      <div className="lg:hidden py-16 px-5">
        <div className="mb-8 text-center">
          <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground">Dimensional Space</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {floatingImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`overflow-hidden ${i === 0 ? 'col-span-2 h-64' : 'h-44'}`}
            >
              <img src={img.src} alt="Wedding" className="w-full h-full object-cover grayscale" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Desktop: original 3-D floating ── */}
      <div className="hidden lg:block h-[160vh]">
        <div className="sticky top-0 h-screen" style={{ transformStyle: 'preserve-3d' }}>
          <div className="absolute top-10 left-12 z-10">
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Dimensional Space</span>
          </div>
          <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
            {floatingImages.map((image, i) => (
              <FloatingImage key={i} image={image} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 2 : Mosaic Grid ────────────────────────────── */
function MosaicGrid() {
  return (
    <section className="py-16 lg:py-24 px-5 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground block mb-2">Gallery</span>
        <h3 className="font-heading text-3xl sm:text-4xl italic">Moments in Frame</h3>
      </motion.div>

      {/* Mobile: simple stack */}
      <div className="lg:hidden grid grid-cols-2 gap-3">
        {mosaicImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className={`overflow-hidden ${i === 0 ? 'col-span-2 h-60' : 'h-40'}`}
          >
            <img src={img.src} alt={img.label} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
        ))}
      </div>

      {/* Desktop: asymmetric CSS grid */}
      <div className="hidden lg:grid grid-cols-4 grid-rows-3 gap-3 h-[70vh] max-w-6xl mx-auto">
        {mosaicImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className={`${img.span} overflow-hidden relative group`}
          >
            <img
              src={img.src}
              alt={img.label}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-white text-[10px] tracking-[0.25em] uppercase">{img.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── Section 3 : Film Strip ─────────────────────────────── */
function FilmStrip() {
  return (
    <section className="py-12 lg:py-20 bg-foreground overflow-hidden">
      <div className="mb-6 px-5 lg:px-12 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.35em] uppercase text-background/40">Film Strip</span>
        <span className="font-heading text-sm italic text-background/60">The Raw Edit</span>
      </div>

      {/* Strip with sprocket holes feel */}
      <div className="flex gap-1.5 px-1.5">
        {stripImages.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            className="relative flex-shrink-0 overflow-hidden"
            style={{ width: 'clamp(160px, 28vw, 320px)', height: 'clamp(200px, 36vw, 420px)' }}
          >
            {/* Top & bottom film notches */}
            <div className="absolute top-2 left-0 right-0 z-10 flex justify-around">
              {[...Array(6)].map((_, j) => <div key={j} className="w-3 h-2 bg-foreground rounded-sm" />)}
            </div>
            <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-around">
              {[...Array(6)].map((_, j) => <div key={j} className="w-3 h-2 bg-foreground rounded-sm" />)}
            </div>

            <img
              src={src}
              alt={`Frame ${i + 1}`}
              className="w-full h-full object-cover grayscale contrast-125 brightness-90"
            />
            <div className="absolute bottom-6 left-3 z-10">
              <span className="text-background/50 text-[9px] font-mono tracking-widest">
                {String(i + 1).padStart(3, '0')}▲
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── Main export ─────────────────────────────────────────── */
export default function Floating3DSpace() {
  return (
    <>
      <DimensionalSpace />
      <MosaicGrid />
      <FilmStrip />
    </>
  );
}