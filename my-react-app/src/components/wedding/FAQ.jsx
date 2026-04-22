import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'How far in advance should we book?',
    a: "We typically book 12–18 months in advance for peak wedding season (October–February). For destination weddings, we recommend reaching out at least 18 months prior. That said, we occasionally have last-minute availability — don't hesitate to enquire.",
  },
  {
    q: 'Do you travel for destination weddings?',
    a: 'Absolutely. We have covered weddings in over 15 countries including Greece, Bali, Italy, Sri Lanka, and the Maldives. Travel, accommodation, and logistics are coordinated as part of our destination wedding planning process.',
  },
  {
    q: 'What is your editing style?',
    a: "Our signature aesthetic is film-influenced — warm shadows, natural skin tones, and a timeless quality that doesn't follow trending Instagram filters. Every gallery is hand-edited and color-graded by our in-house colorist.",
  },
  {
    q: 'How many photographs will we receive?',
    a: 'For a full-day wedding, you can expect between 600–1000+ carefully edited photographs. We believe in quality over quantity — every image delivered is intentional, beautiful, and gallery-worthy.',
  },
  {
    q: 'How long does editing and delivery take?',
    a: 'Your sneak-peek gallery (50–100 images) is delivered within 5–7 days. The full edited gallery is delivered within 3–4 weeks for standard packages, and within 6 weeks for multi-day or destination weddings.',
  },
  {
    q: 'Do you offer both photography and videography?',
    a: 'Yes. Our Gold and Platinum packages include a cinematic wedding film alongside photography. We work with a dedicated video team that shares our aesthetic vision, ensuring a cohesive look across all deliverables.',
  },
  {
    q: 'What happens if you are ill or have an emergency?',
    a: 'We have a curated network of equally qualified photographers who serve as backups. This has never occurred in 12 years of business, but we have a comprehensive contingency plan to ensure your wedding day is always covered.',
  },
  {
    q: 'Can we meet before booking?',
    a: "We encourage it. A discovery call or in-person meeting helps us understand your vision, your personalities, and whether we're the right creative fit. We want you to feel completely comfortable with the people behind your memories.",
  },
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="border-b border-foreground/5"
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between py-6 text-left gap-4 hover:opacity-70 transition-opacity"
      >
        <span className="text-sm font-medium tracking-wide">{faq.q}</span>
        <span className="shrink-0 mt-0.5">
          {open ? <Minus className="w-4 h-4 text-muted-foreground" /> : <Plus className="w-4 h-4 text-muted-foreground" />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-muted-foreground text-sm leading-relaxed font-light pr-8">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section className="py-24 lg:py-40 px-6 lg:px-12 border-t border-foreground/5">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">

        {/* Left */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground block mb-4"
          >
            Got Questions?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl italic mb-6"
          >
            Frequently Asked
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-sm font-light leading-relaxed mb-8"
          >
            Everything you need to know before taking the first step. If something isn't answered here, please reach out — we love a good conversation.
          </motion.p>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            href="#contact"
            className="inline-flex text-xs tracking-[0.2em] uppercase border-b border-foreground/20 pb-1 hover:border-foreground transition-colors"
          >
            Ask Us Directly
          </motion.a>
        </div>

        {/* Right: FAQ list */}
        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}