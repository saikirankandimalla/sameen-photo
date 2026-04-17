import { motion } from 'framer-motion';

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-32 lg:py-48 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-6"
        >
          Our Philosophy
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-heading text-5xl sm:text-7xl lg:text-8xl italic mb-12"
        >
          Art Meets Emotion
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-6 text-muted-foreground leading-relaxed font-light"
        >
          <p className="text-base sm:text-lg">
            We don't just photograph weddings — we immerse ourselves in the story unfolding before us. 
            Every stolen glance, every trembling hand, every unscripted tear becomes part of a visual 
            narrative that transcends the ordinary.
          </p>
          <p className="text-base sm:text-lg">
            Our approach is rooted in the belief that the most powerful images come from genuine 
            connection. We become invisible observers, allowing raw emotion to guide our lens, 
            creating timeless art from fleeting moments.
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-24 h-[1px] bg-foreground/20 mx-auto mt-16"
        />
      </div>
    </section>
  );
}