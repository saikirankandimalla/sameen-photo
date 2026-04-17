import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const VIDEO_IMG = 'https://media.base44.com/images/public/69df8879cb8202c53abec211/fb31b799d_generated_49f25257.png';

export default function CinematicVideo() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale }}>
        <img
          src={VIDEO_IMG}
          alt="Wedding film"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ opacity }}
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-white/50 text-xs tracking-[0.4em] uppercase mb-6"
        >
          Wedding Film
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-5xl sm:text-7xl lg:text-8xl text-white italic mb-8"
        >
          A Story You Can Feel
        </motion.h2>

        <motion.a
          href="#"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          data-cursor-hover
          className="flex items-center gap-3 text-white group"
        >
          <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/10 transition-all duration-500 group-hover:scale-110">
            <svg className="w-5 h-5 ml-1" fill="white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-xs tracking-[0.2em] uppercase">Watch Film</span>
        </motion.a>
      </motion.div>
    </section>
  );
}