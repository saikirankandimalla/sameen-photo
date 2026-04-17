import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Aarav & Sneha',
    location: 'Hyderabad, 2025',
    text: 'We cried looking at our photos for the first time. Not because they were pretty — because they were real. Every tear, every laugh, every quiet in-between moment was captured with such soul. Sameen\'s Photography didn\'t document our wedding; they preserved our love story forever.',
    rating: 5,
    avatar: 'A',
  },
  {
    id: 2,
    name: 'Rohan & Priya',
    location: 'Udaipur, 2025',
    text: 'I\'ve seen hundreds of wedding photographs but nothing prepared me for what Sameen\'s Photography delivered. The cinematic quality, the emotional depth — it felt like watching a film of our lives. Our families were completely speechless. Worth every single rupee.',
    rating: 5,
    avatar: 'R',
  },
  {
    id: 3,
    name: 'Arjun & Maya',
    location: 'Goa, 2024',
    text: 'From our very first call, we knew these were our people. They understood what we wanted before we could even articulate it. The images are art. Pure, timeless art. Two years later, our wedding gallery is still the most viewed thing in our home.',
    rating: 5,
    avatar: 'A',
  },
  {
    id: 4,
    name: 'Karan & Ananya',
    location: 'Jaipur, 2025',
    text: 'Booking Sameen\'s Photography was the best wedding decision we made — after saying yes to each other. The team was invisible during the day but somehow captured everything. Magic is the only word I have for what they do.',
    rating: 5,
    avatar: 'K',
  },
  {
    id: 5,
    name: 'Vikram & Ishita',
    location: 'Kerala, 2024',
    text: 'Our destination wedding in Kerala was a logistical dream and a photographic masterpiece thanks to Sameen\'s Photography. They scouted locations, understood the light, and created imagery that belongs in a museum. We are forever grateful.',
    rating: 5,
    avatar: 'V',
  },
];

export default function Reviews() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((p) => (p - 1 + reviews.length) % reviews.length);
  const next = () => setActive((p) => (p + 1) % reviews.length);

  const review = reviews[active];

  return (
    <section className="py-32 lg:py-40 overflow-hidden bg-foreground text-background">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-background/40 block mb-4">Testimonials</span>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl italic text-background">
            Told By Love
          </h2>
        </motion.div>

        {/* Review card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-background/40 text-background/40" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-heading text-xl sm:text-2xl lg:text-3xl italic text-background/80 leading-relaxed max-w-3xl mx-auto mb-10">
                "{review.text}"
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-background/10 border border-background/20 flex items-center justify-center font-heading text-lg text-background/60">
                  {review.avatar}
                </div>
                <p className="text-background font-medium text-sm tracking-wide">{review.name}</p>
                <p className="text-background/40 text-xs tracking-[0.2em] uppercase">{review.location}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-16">
            <button
              onClick={prev}
              data-cursor-hover
              className="w-12 h-12 border border-background/20 flex items-center justify-center hover:bg-background/10 transition-colors duration-300 group"
            >
              <ChevronLeft className="w-5 h-5 text-background/50 group-hover:text-background transition-colors" />
            </button>

            {/* Dots */}
            <div className="flex gap-3">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-400 ${i === active ? 'w-8 h-[2px] bg-background' : 'w-2 h-[2px] bg-background/30'}`}
                  data-cursor-hover
                />
              ))}
            </div>

            <button
              onClick={next}
              data-cursor-hover
              className="w-12 h-12 border border-background/20 flex items-center justify-center hover:bg-background/10 transition-colors duration-300 group"
            >
              <ChevronRight className="w-5 h-5 text-background/50 group-hover:text-background transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}