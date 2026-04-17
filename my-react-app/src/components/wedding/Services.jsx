import { motion } from 'framer-motion';
import { Camera, Heart, MapPin } from 'lucide-react';

const services = [
  {
    icon: Heart,
    title: 'Weddings',
    description: 'Full-day cinematic coverage capturing every emotion, from getting ready to the last dance.',
  },
  {
    icon: Camera,
    title: 'Pre-Wedding',
    description: 'Intimate editorial shoots that tell your love story in the most beautiful settings.',
  },
  {
    icon: MapPin,
    title: 'Destination',
    description: 'From the beaches of Goa to the palaces of Rajasthan — we travel where love takes us.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-4">What We Offer</span>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl italic">Services</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="text-center group cursor-pointer"
              data-cursor-hover
            >
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 border border-foreground/10 flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground transition-all duration-500">
                  <service.icon className="w-6 h-6 text-foreground/60 group-hover:text-background transition-colors duration-500" />
                </div>
              </div>
              <h3 className="font-heading text-3xl italic mb-3 group-hover:translate-y-[-4px] transition-transform duration-500">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-light max-w-xs mx-auto">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}