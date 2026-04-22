import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const weddings = [
  {
    couple: 'Aarav & Sneha',
    location: 'Hyderabad, Telangana',
    date: 'November 2024',
    style: 'Grand Palace Wedding',
    cover: 'https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?w=800&q=80',
    secondary: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400&q=80',
    story: 'A monsoon-lit ceremony in the heart of Hyderabad — where jasmine garlands met candlelight and 800 guests danced till sunrise.',
    tag: 'Featured',
    color: 'bg-amber-50',
  },
  {
    couple: 'Rohan & Priya',
    location: 'Lake Pichola, Udaipur',
    date: 'February 2024',
    style: 'Royal Lakeside Ceremony',
    cover: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    secondary: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80',
    story: 'Floating on the serene waters of Lake Pichola, their love story unfolded against a backdrop of pink Rajasthani sky.',
    tag: 'Editor\'s Pick',
    color: 'bg-rose-50',
  },
  {
    couple: 'Karan & Ananya',
    location: 'Vagator Beach, Goa',
    date: 'January 2025',
    style: 'Bohemian Beachfront',
    cover: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
    secondary: 'https://images.unsplash.com/photo-1529636444744-adffc9135a5e?w=400&q=80',
    story: 'Bare feet on white sand, ocean winds in her veil — a ceremony so intimate it felt like the world held its breath.',
    tag: 'Destination',
    color: 'bg-sky-50',
  },
];

export default function FeaturedWeddings() {
  return (
    <section id="featured" className="py-24 lg:py-40 px-6 lg:px-12 border-t border-foreground/5">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-4">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground block mb-3"
            >
              Real Stories
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl italic"
            >
              Featured Weddings
            </motion.h2>
          </div>
          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase border-b border-foreground/20 pb-1 hover:border-foreground transition-colors self-start sm:self-auto whitespace-nowrap"
          >
            All Stories <ArrowRight className="w-3 h-3" />
          </motion.a>
        </div>

        {/* Wedding cards */}
        <div className="space-y-24">
          {weddings.map((w, i) => (
            <motion.article
              key={w.couple}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className={`grid lg:grid-cols-2 gap-0 ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}
            >
              {/* Images side */}
              <div className={`relative ${i % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                <div className="aspect-[4/3] lg:aspect-auto lg:h-[520px] overflow-hidden">
                  <img
                    src={w.cover}
                    alt={w.couple}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </div>
                {/* Floating secondary image */}
                <div className={`absolute -bottom-8 ${i % 2 === 1 ? 'left-6' : 'right-6'} w-36 sm:w-48 h-44 sm:h-60 overflow-hidden shadow-2xl border-4 border-background`}>
                  <img
                    src={w.secondary}
                    alt={`${w.couple} detail`}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                {/* Tag */}
                <div className="absolute top-5 left-5">
                  <span className="bg-background text-foreground text-[9px] tracking-[0.2em] uppercase px-3 py-1.5">
                    {w.tag}
                  </span>
                </div>
              </div>

              {/* Text side */}
              <div className={`flex flex-col justify-center px-6 lg:px-14 pt-14 lg:pt-0 ${i % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{w.date}</span>
                  <span className="w-8 h-[1px] bg-foreground/20" />
                  <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{w.style}</span>
                </div>
                <h3 className="font-heading text-4xl sm:text-5xl italic mb-2">{w.couple}</h3>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">{w.location}</p>
                <p className="text-muted-foreground text-sm leading-relaxed font-light mb-8 max-w-sm">
                  {w.story}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase border-b border-foreground/20 pb-1 hover:border-foreground transition-colors self-start"
                >
                  View Full Story <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}