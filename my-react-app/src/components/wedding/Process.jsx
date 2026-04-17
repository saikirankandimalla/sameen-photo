import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Discovery Call',
    desc: 'We begin with a conversation — about you, your love story, and the vision you have for your day.',
  },
  {
    num: '02',
    title: 'Creative Planning',
    desc: 'We craft a tailored photographic strategy, scouting locations and timing light for maximum beauty.',
  },
  {
    num: '03',
    title: 'Your Wedding Day',
    desc: 'We arrive as quiet observers. Unhurried, unobtrusive — fully present to capture every real moment.',
  },
  {
    num: '04',
    title: 'Cinematic Edit',
    desc: 'Each image is hand-edited with our signature filmic tone — colour, contrast, and soul.',
  },
  {
    num: '05',
    title: 'Delivery',
    desc: 'Your gallery arrives within 6 weeks — a timeless collection of images you\'ll revisit forever.',
  },
];

export default function Process() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 border-t border-foreground/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-4">How It Works</span>
          <h2 className="font-heading text-5xl sm:text-6xl italic">The Process</h2>
        </motion.div>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 py-8 border-b border-foreground/5 group hover:pl-2 transition-all duration-500"
            >
              <span className="font-heading text-lg italic text-muted-foreground/30 w-12 flex-shrink-0">
                {step.num}
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl italic flex-shrink-0 md:w-56 group-hover:translate-x-1 transition-transform duration-500">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-light max-w-lg">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}