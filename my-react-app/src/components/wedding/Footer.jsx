import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-foreground/5 py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-heading text-xl"
        >
          Eternal
        </motion.span>

        <div className="flex gap-8">
          {['Instagram', 'Pinterest', 'YouTube'].map((social) => (
            <a
              key={social}
              href="#"
              data-cursor-hover
              className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {social}
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <Link to="/privacy-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide">
            Terms & Conditions
          </Link>
          <span className="text-xs text-muted-foreground">
            © 2025 Eternal. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}