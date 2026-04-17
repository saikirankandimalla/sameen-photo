import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
  { label: 'About', href: '/about' },
    { label: 'Stories', href: '#stories' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          <Link to="/" className="font-heading text-2xl tracking-wide">
            <span className={scrolled ? 'text-foreground' : 'text-white'}>Sameen's Photography</span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:opacity-60 ${
                    scrolled ? 'text-foreground' : 'text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:opacity-60 ${
                    scrolled ? 'text-foreground' : 'text-white'
                  }`}
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden"
            data-cursor-hover
          >
            <Menu className={`w-6 h-6 ${scrolled ? 'text-foreground' : 'text-white'}`} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-foreground flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6"
            >
              <X className="w-8 h-8 text-background" />
            </button>
            <div className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                link.href.startsWith('/') ? (
                  <motion.div key={link.label} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                    <Link
                      to={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-heading text-4xl text-background hover:opacity-60 transition-opacity"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="font-heading text-4xl text-background hover:opacity-60 transition-opacity"
                  >
                    {link.label}
                  </motion.a>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}