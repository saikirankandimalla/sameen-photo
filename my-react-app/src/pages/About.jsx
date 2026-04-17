import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/wedding/Navbar';

const team = [
  {
    name: 'Arjun Mehta',
    role: 'Lead Photographer & Founder',
    bio: 'With over 12 years behind the lens, Arjun brings a cinematic eye and an obsession with authentic emotion to every frame.',
    image: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/a69bbd327_generated_image.png',
    specialty: 'Candid & Fine Art',
  },
  {
    name: 'Priya Sharma',
    role: 'Senior Photographer',
    bio: "Priya's gentle presence and editorial instincts create a safe space for couples to be completely themselves.",
    image: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/9636c4ea0_generated_image.png',
    specialty: 'Portraits & Bridal',
  },
  {
    name: 'Kabir Nair',
    role: 'Cinematographer',
    bio: 'Kabir crafts wedding films that feel like feature movies — intimate, sweeping, and impossible to watch without feeling something.',
    image: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/b128666a0_generated_image.png',
    specialty: 'Cinematic Films',
  },
  {
    name: 'Nisha Patel',
    role: 'Photo Editor & Colorist',
    bio: "Every image passes through Nisha's hands. Her signature color science gives Eternal photographs their timeless, film-like quality.",
    image: 'https://media.base44.com/images/public/69df8879cb8202c53abec211/3d072065a_generated_image.png',
    specialty: 'Color Grading & Retouching',
  },
];

const values = [
  { number: '01', title: 'Authentic Storytelling', desc: 'We don\'t pose moments — we find them. Every shot is a real breath of your day.' },
  { number: '02', title: 'Cinematic Vision', desc: 'Trained in film aesthetics, we treat every wedding as a short film waiting to be made.' },
  { number: '03', title: 'Quiet Presence', desc: 'We move through your day invisibly, so nothing feels staged and everything feels real.' },
  { number: '04', title: 'Timeless Craft', desc: 'We reject trends. The photographs we make today should move you just as much in 50 years.' },
];

export default function About() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative h-[70vh] lg:h-screen overflow-hidden flex items-end pb-16 lg:pb-24 pt-20">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src="https://media.base44.com/images/public/69df8879cb8202c53abec211/bc2c257c0_generated_image.png"
            alt="The Eternal Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        </motion.div>

        <div className="relative z-10 px-6 lg:px-16 max-w-5xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/50 text-xs tracking-[0.4em] uppercase block mb-4"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-heading text-5xl sm:text-7xl lg:text-8xl text-white italic leading-tight"
          >
            We Are the <br />People Behind <br />the Frame
          </motion.h1>
        </div>
      </section>

      {/* ── About Text ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-16 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground block mb-5">About Eternal</span>
            <h2 className="font-heading text-4xl lg:text-5xl italic leading-tight mb-6">
              Born from a love of real moments
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 font-light">
              Eternal was founded in 2013 with one belief: the best wedding photographs are the ones you didn't know were being taken. We are a boutique team of storytellers, artists, and quiet observers who travel across India and the world to document love in its purest form.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed font-light">
              Every wedding is unique, and so is the way we approach it. We spend time with our couples before the day, understanding not just their vision but who they are — so that when the moment arrives, we're already speaking the same language.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="col-span-2 h-64 overflow-hidden">
              <img
                src="https://media.base44.com/images/public/69df8879cb8202c53abec211/a69bbd327_generated_image.png"
                alt="Behind the scenes"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="h-40 overflow-hidden">
              <img
                src="https://media.base44.com/images/public/69df8879cb8202c53abec211/9636c4ea0_generated_image.png"
                alt="Team"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="h-40 overflow-hidden">
              <img
                src="https://media.base44.com/images/public/69df8879cb8202c53abec211/b128666a0_generated_image.png"
                alt="Filming"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-16 lg:py-24 px-6 lg:px-16 border-t border-foreground/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-14 text-center"
          >
            <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground block mb-3">What We Believe</span>
            <h2 className="font-heading text-3xl sm:text-4xl italic">Our Philosophy</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-foreground/5">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="border-r border-foreground/5 last:border-r-0 py-8 px-6 hover:bg-foreground/[0.02] transition-colors duration-300"
              >
                <div className="font-heading text-3xl italic text-muted-foreground/30 mb-4">{v.number}</div>
                <div className="text-sm font-medium mb-2">{v.title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed font-light">{v.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground block mb-3">The Faces</span>
            <h2 className="font-heading text-4xl sm:text-5xl italic">Meet Our Team</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
                className="group"
              >
                {/* Photo */}
                <div className="relative overflow-hidden mb-5 aspect-[3/4]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-white text-[10px] tracking-[0.2em] uppercase">{member.specialty}</span>
                  </div>
                </div>

                {/* Info */}
                <h3 className="font-heading text-xl italic mb-0.5">{member.name}</h3>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">{member.role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 lg:py-32 px-6 border-t border-foreground/5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground block mb-4">Ready?</span>
          <h2 className="font-heading text-4xl sm:text-6xl italic mb-8">Let's Tell Your Story</h2>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase border-b border-foreground/30 pb-1 hover:border-foreground transition-colors duration-300"
          >
            Get in Touch
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}