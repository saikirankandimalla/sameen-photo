import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const pairs = [
  {
    left: {
      src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/24a097cb6_generated_image.png',
      label: 'Bridal Portrait',
    },
    right: {
      src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/af4dc1a4e_generated_image.png',
      label: 'Aerial Mandap',
    },
    heading: 'Every Detail, Immortalised',
    sub: 'We see the beauty in the grand spectacle and the whispered intimacy — capturing both with equal reverence.',
  },
  {
    left: {
      src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/d48a52a97_generated_image.png',
      label: 'Heritage Steps',
    },
    right: {
      src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/19b174a31_generated_image.png',
      label: 'Reception Detail',
    },
    heading: 'Before the World Sees It',
    sub: 'In the quiet moments before the ceremony, an entire lifetime of love waits to unfold.',
  },
];

function SplitPair({ pair, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const leftY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);

  const isReversed = index % 2 !== 0;

  return (
    <div ref={ref} className="py-16 lg:py-24 px-6 lg:px-12">
      <motion.div
        style={{ opacity }}
        className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-6 lg:gap-12 items-center max-w-7xl mx-auto`}
      >
        {/* Left image */}
        <motion.div style={{ y: leftY }} className="w-full lg:w-[45%] overflow-hidden">
          <div className="relative aspect-[3/4] overflow-hidden group">
            <img
              src={pair.left.src}
              alt={pair.left.label}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] grayscale hover:grayscale-0"
            />
            <div className="absolute bottom-4 left-4 text-[10px] tracking-[0.25em] uppercase text-white/50">
              {pair.left.label}
            </div>
          </div>
        </motion.div>

        {/* Center text */}
        <motion.div style={{ y: textY }} className="w-full lg:w-[30%] text-center lg:text-left flex flex-col justify-center gap-5 py-8">
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            {String(index + 1).padStart(2, '0')} / 02
          </span>
          <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl italic leading-tight">
            {pair.heading}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed font-light max-w-sm">
            {pair.sub}
          </p>
          <div className="w-12 h-[1px] bg-foreground/20 mx-auto lg:mx-0 mt-2" />
        </motion.div>

        {/* Right image */}
        <motion.div style={{ y: rightY }} className="w-full lg:w-[25%] overflow-hidden">
          <div className="relative aspect-[2/3] overflow-hidden group">
            <img
              src={pair.right.src}
              alt={pair.right.label}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] grayscale hover:grayscale-0"
            />
            <div className="absolute bottom-4 left-4 text-[10px] tracking-[0.25em] uppercase text-white/50">
              {pair.right.label}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function SplitImageSection() {
  return (
    <section className="border-t border-foreground/5">
      <div className="max-w-7xl mx-auto pt-16 px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-4">Image Stories</span>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl italic">Frames of Forever</h2>
        </motion.div>
      </div>
      {pairs.map((pair, i) => (
        <SplitPair key={i} pair={pair} index={i} />
      ))}
    </section>
  );
}