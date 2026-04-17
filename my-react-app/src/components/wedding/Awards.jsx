import { motion } from 'framer-motion';

const stats = [
  { number: '500+', label: 'Weddings Captured' },
  { number: '12', label: 'Years of Experience' },
  { number: '28', label: 'Awards Won' },
  { number: '15', label: 'Countries Traveled' },
];

const awards = [
  { name: 'Junebug Weddings', year: '2024', title: 'Best of the Best' },
  { name: 'WPJA', year: '2024', title: 'Platinum Award' },
  { name: 'Fearless Photographers', year: '2023–24', title: 'Member' },
  { name: 'SLR Lounge', year: '2023', title: 'Top 50 India' },
  { name: 'Wedding Sutra', year: '2022–25', title: 'Editor\'s Choice' },
  { name: 'The Knot', year: '2024', title: 'Best of Weddings' },
];

export default function Awards() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 border-t border-foreground/5">
      <div className="max-w-7xl mx-auto">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-heading text-5xl lg:text-6xl italic mb-2">{stat.number}</div>
              <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Recognition</span>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border-t border-foreground/5">
          {awards.map((award, i) => (
            <motion.div
              key={award.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="border-b md:border-b-0 border-r border-foreground/5 py-8 px-6 text-center hover:bg-foreground/[0.02] transition-colors duration-300 group"
            >
              <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/50 mb-2">{award.year}</div>
              <div className="font-heading text-base italic mb-1 group-hover:scale-105 transition-transform duration-300 origin-center">{award.name}</div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground/60">{award.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}