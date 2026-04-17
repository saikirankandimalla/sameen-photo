import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const slides = [
  {
    image: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/814399c2b_generated_86d1e86f.png',
    tag: 'Aarav & Sneha — Hyderabad',
  },
  {
    image: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/60bded5a5_generated_image.png',
    tag: 'Rohan & Priya — Udaipur',
  },
  {
    image: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/be0b9e0f4_generated_image.png',
    tag: 'Arjun & Maya — Mumbai',
  },
  {
    image: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/d688f24f5_generated_image.png',
    tag: 'Karan & Ananya — Goa',
  },
  {
    image: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/89505e3f0_generated_image.png',
    tag: 'Vikram & Ishita — Jaipur',
  },
];

const words = ['CAPTURING', 'FOREVER', 'MOMENTS'];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [textReady, setTextReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTextReady(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Sliding images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt="Wedding"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/65" />

      {/* Slide counter + tag — top right */}
      <div className="absolute top-24 right-6 lg:right-12 z-20 text-right">
        <AnimatePresence mode="wait">
          <motion.span
            key={current + 'tag'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="text-white/50 text-[10px] tracking-[0.2em] uppercase block"
          >
            {slides[current].tag}
          </motion.span>
        </AnimatePresence>
        <span className="text-white/30 text-[10px] tracking-[0.15em] mt-1 block">
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* Slide progress dots */}
      <div className="absolute bottom-24 right-6 lg:right-12 z-20 flex flex-col gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="group flex items-center justify-end gap-2"
            data-cursor-hover
          >
            <span className={`text-[10px] tracking-widest transition-colors duration-300 ${i === current ? 'text-white/60' : 'text-white/20'}`}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className={`h-[1px] transition-all duration-500 ${i === current ? 'w-8 bg-white' : 'w-3 bg-white/30'}`} />
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-6">
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }}
              animate={textReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{
                delay: i * 0.18,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-heading text-5xl sm:text-7xl lg:text-9xl text-white leading-none"
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={textReady ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-white/70 text-sm sm:text-base tracking-wide max-w-md font-light"
        >
          Every frame tells a story of love, emotion, and timeless beauty.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={textReady ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 mt-10"
        >
          <a
            href="#stories"
            data-cursor-hover
            className="px-8 py-3.5 bg-white text-black text-xs tracking-[0.2em] uppercase hover:bg-white/90 transition-all duration-300"
          >
            View Stories
          </a>
          <a
            href="#contact"
            data-cursor-hover
            className="px-8 py-3.5 border border-white/40 text-white text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition-all duration-300"
          >
            Book Now
          </a>
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-white/10">
        <motion.div
          key={current}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear' }}
          className="h-full bg-white/50"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}