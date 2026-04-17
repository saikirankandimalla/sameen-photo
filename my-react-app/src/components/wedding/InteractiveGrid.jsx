import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const gridItems = [
  {
    src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/bd1c5bfed_generated_4346484d.png',
    couple: 'Aarav & Sneha',
    location: 'Hyderabad — 2025',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/d2ddedbc7_generated_7158780f.png',
    couple: 'Rohan & Priya',
    location: 'Udaipur — 2025',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/fb31b799d_generated_49f25257.png',
    couple: 'Arjun & Maya',
    location: 'Goa — 2024',
    span: 'col-span-1 row-span-2',
  },
  {
    src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/87f1ad109_generated_b3296a67.png',
    couple: 'Karan & Ananya',
    location: 'Jaipur — 2025',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/22b0dd83b_generated_ad9958d0.png',
    couple: 'Vikram & Ishita',
    location: 'Kerala — 2024',
    span: 'col-span-2 row-span-1',
  },
  {
    src: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/0e31f2188_generated_df6025af.png',
    couple: 'Dev & Nisha',
    location: 'Mumbai — 2025',
    span: 'col-span-1 row-span-1',
  },
];

function GridItem({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`${item.span} relative overflow-hidden group cursor-pointer`}
      data-cursor-hover
    >
      <img
        src={item.src}
        alt={item.couple}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
      />
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end p-6">
        <div className="translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <h3 className="font-heading text-2xl text-white italic">{item.couple}</h3>
          <p className="text-white/60 text-xs tracking-[0.2em] uppercase mt-1">{item.location}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function InteractiveGrid() {
  return (
    <section className="px-6 lg:px-12 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-4">Portfolio</span>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl italic">Love Stories</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[200px] md:auto-rows-[250px]">
          {gridItems.map((item, i) => (
            <GridItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}