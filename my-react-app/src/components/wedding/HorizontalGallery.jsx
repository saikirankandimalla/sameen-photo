import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const images = [
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/2e0525af7_generated_1cbaed0a.png', label: 'Aarav & Sneha' },
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/1b11be9c6_generated_image.png', label: 'First Kiss' },
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/d27732052_generated_5ebdc2c5.png', label: 'Rohan & Priya' },
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/0b98167c0_generated_image.png', label: 'Golden Hour' },
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/87f1ad109_generated_b3296a67.png', label: 'Arjun & Maya' },
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/10ec492a4_generated_image.png', label: 'Karan & Ananya' },
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/fb31b799d_generated_49f25257.png', label: 'First Dance' },
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/05b3898cd_generated_image.png', label: 'Forest Walk' },
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/22b0dd83b_generated_ad9958d0.png', label: 'Vikram & Ishita' },
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/a5485740e_generated_image.png', label: 'Rooftop Night' },
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/db828e1dc_generated_3607cc7f.png', label: 'Ring Detail' },
  { src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/a89c27c8b_generated_image.png', label: 'Reception Dance' },
];

const widths =  ['45vw', '30vw', '50vw', '35vw', '40vw', '28vw', '48vw', '32vw', '42vw', '36vw', '30vw', '44vw'];
const heights = ['65vh', '55vh', '70vh', '50vh', '60vh', '55vh', '65vh', '50vh', '60vh', '55vh', '65vh', '55vh'];

export default function HorizontalGallery() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-72%']);

  return (
    <section id="gallery" ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center bg-background">
        {/* Section label */}
        <div className="absolute top-10 left-6 lg:left-12 z-10 flex items-center gap-4">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Cinema Gallery</span>
          <span className="text-muted-foreground/30 text-xs">— {images.length} frames</span>
        </div>

        <motion.div
          style={{ x }}
          className="flex gap-5 pl-12 pr-[60vw] items-center h-[75vh]"
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="relative flex-shrink-0 overflow-hidden group cursor-pointer"
              style={{ width: widths[i], height: heights[i] }}
              data-cursor-hover
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-700 flex items-end p-5">
                <span className="text-white/0 group-hover:text-white/80 transition-all duration-500 text-xs tracking-[0.2em] uppercase translate-y-3 group-hover:translate-y-0">
                  {img.label}
                </span>
              </div>
              {/* Frame number */}
              <div className="absolute top-4 right-4 text-white/0 group-hover:text-white/40 transition-all duration-500 text-[10px] tracking-widest">
                {String(i + 1).padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll progress */}
        <div className="absolute bottom-10 left-6 lg:left-12 flex items-center gap-3">
          <div className="w-24 h-[1px] bg-foreground/10 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-foreground/40"
              style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
            />
          </div>
          <span className="text-[10px] tracking-widest text-muted-foreground/40 uppercase">Drag to explore</span>
        </div>
      </div>
    </section>
  );
}