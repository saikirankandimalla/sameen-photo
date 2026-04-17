import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const stories = [
  {
    title: 'The Arrival',
    subtitle: 'A moment of quiet grace before the world changes forever.',
    images: [
      'https://media.base44.com/images/public/69df8879cb8202c53abec211/70a230258_generated_9fbc190e.png',
      'https://media.base44.com/images/public/69df8879cb8202c53abec211/895bce6f6_generated_image.png',
      'https://media.base44.com/images/public/69df8879cb8202c53abec211/5bbd0ce70_generated_image.png',
    ],
  },
  {
    title: 'First Glance',
    subtitle: 'When time stops and everything else fades away.',
    images: [
      'https://media.base44.com/images/public/69df8879cb8202c53abec211/b32b1f3a4_generated_31c40fbe.png',
      'https://media.base44.com/images/public/69df8879cb8202c53abec211/33c3eabbe_generated_image.png',
      'https://media.base44.com/images/public/69df8879cb8202c53abec211/dcb109a85_generated_image.png',
    ],
  },
  {
    title: 'Together',
    subtitle: 'Two souls becoming one, in the language of touch.',
    images: [
      'https://media.base44.com/images/public/69df8879cb8202c53abec211/06bc59cfb_generated_d2325568.png',
      'https://media.base44.com/images/public/69df8879cb8202c53abec211/c207cf1cb_generated_image.png',
      'https://media.base44.com/images/public/69df8879cb8202c53abec211/c2c1a86f4_generated_image.png',
    ],
  },
  {
    title: 'Celebration',
    subtitle: 'The world erupts in joy. This is what forever looks like.',
    images: [
      'https://media.base44.com/images/public/69df8879cb8202c53abec211/0e31f2188_generated_df6025af.png',
      'https://media.base44.com/images/public/69df8879cb8202c53abec211/96eaeff3b_generated_image.png',
      'https://media.base44.com/images/public/69df8879cb8202c53abec211/030e03002_generated_image.png',
    ],
  },
  {
    title: 'Forever',
    subtitle: 'Not an ending — just the beginning of everything beautiful.',
    images: [
      'https://media.base44.com/images/public/69df8879cb8202c53abec211/7d03487ca_generated_image.png',
      'https://media.base44.com/images/public/69df8879cb8202c53abec211/1fce5717b_generated_image.png',
      'https://media.base44.com/images/public/69df8879cb8202c53abec211/1b6d96c84_generated_image.png',
    ],
  },
];

function ChapterSlider({ story, index }) {
  const ref = useRef(null);
  const [current, setCurrent] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.08]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);

  // Auto-advance slider every 3s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % story.images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [story.images.length]);

  const prev = () => setCurrent((p) => (p - 1 + story.images.length) % story.images.length);
  const next = () => setCurrent((p) => (p + 1) % story.images.length);

  return (
    <div ref={ref} className="h-screen w-full relative overflow-hidden flex items-center justify-center">
      {/* Background slider */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <AnimatePresence mode="sync">
          <motion.img
            key={current}
            src={story.images[current]}
            alt={`${story.title} ${current + 1}`}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </motion.div>

      {/* Chapter text */}
      <motion.div
        className="relative z-10 text-center px-6 pointer-events-none"
        style={{ opacity: textOpacity, y: textY }}
      >
        <span className="text-white/50 text-xs tracking-[0.35em] uppercase mb-3 block font-body">
          Chapter {String(index + 1).padStart(2, '0')}
        </span>
        <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-white mb-4 italic drop-shadow-2xl">
          {story.title}
        </h2>
        <p className="text-white/65 text-sm sm:text-base max-w-md mx-auto font-light tracking-wide">
          {story.subtitle}
        </p>
      </motion.div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        data-cursor-hover
        className="absolute left-5 lg:left-10 z-20 w-11 h-11 border border-white/25 flex items-center justify-center text-white hover:bg-white/15 transition-all duration-300 group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={next}
        data-cursor-hover
        className="absolute right-5 lg:right-10 z-20 w-11 h-11 border border-white/25 flex items-center justify-center text-white hover:bg-white/15 transition-all duration-300 group"
      >
        <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {story.images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            data-cursor-hover
            className={`transition-all duration-500 rounded-full ${
              i === current ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/35 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Image counter — top right */}
      <div className="absolute top-6 right-6 lg:right-10 z-20 text-right">
        <span className="text-white/35 text-[10px] tracking-[0.2em]">
          {String(current + 1).padStart(2, '0')} / {String(story.images.length).padStart(2, '0')}
        </span>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-white/10">
        <motion.div
          key={`${index}-${current}`}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 3, ease: 'linear' }}
          className="h-full bg-white/40"
        />
      </div>
    </div>
  );
}

export default function ScrollStory() {
  return (
    <section id="stories">
      {stories.map((story, i) => (
        <ChapterSlider key={i} story={story} index={i} />
      ))}
    </section>
  );
}