import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', message: '' });
  const [consented, setConsented] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (/** @type {{ preventDefault: () => void; }} */ e) => {
    e.preventDefault();
    if (!consented || !policyAccepted) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="contact" className="py-32 lg:py-48 px-6 lg:px-12 flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="w-16 h-16 border border-foreground/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-4xl italic mb-3">Message Received</h3>
          <p className="text-muted-foreground text-sm font-light">
            We'll be in touch within 24 hours to begin crafting your story.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-32 lg:py-48 px-6 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-4">Get In Touch</span>
          <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl italic leading-tight">
            Let's Create Something Beautiful
          </h2>
          <p className="text-muted-foreground text-sm mt-5 font-light max-w-md mx-auto">
            Every great love story deserves to be told beautifully. Tell us about yours.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Row 1 */}
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-3">Full Name *</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="bg-transparent border-0 border-b border-foreground/20 rounded-none px-0 py-3 text-base focus-visible:ring-0 focus-visible:border-foreground placeholder:text-muted-foreground/40 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-3">Email *</label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Your email"
                className="bg-transparent border-0 border-b border-foreground/20 rounded-none px-0 py-3 text-base focus-visible:ring-0 focus-visible:border-foreground placeholder:text-muted-foreground/40 transition-colors"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-3">Phone / WhatsApp</label>
              <Input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 00000 00000"
                className="bg-transparent border-0 border-b border-foreground/20 rounded-none px-0 py-3 text-base focus-visible:ring-0 focus-visible:border-foreground placeholder:text-muted-foreground/40 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-3">Wedding Date</label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="bg-transparent border-0 border-b border-foreground/20 rounded-none px-0 py-3 text-base focus-visible:ring-0 focus-visible:border-foreground placeholder:text-muted-foreground/40 transition-colors"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-3">Your Story</label>
            <Textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us about your special day — venue, vision, and what makes your love story unique."
              rows={4}
              className="bg-transparent border-0 border-b border-foreground/20 rounded-none px-0 py-3 text-base focus-visible:ring-0 focus-visible:border-foreground placeholder:text-muted-foreground/40 resize-none transition-colors"
            />
          </div>

          {/* Consent checkboxes */}
          <div className="space-y-4 pt-2">
            {/* SMS/WhatsApp consent */}
            <label className="flex items-start gap-3 cursor-pointer group" data-cursor-hover>
              <button
                type="button"
                onClick={() => setConsented(!consented)}
                className={`mt-0.5 w-4 h-4 flex-shrink-0 border transition-all duration-300 flex items-center justify-center ${
                  consented ? 'bg-foreground border-foreground' : 'border-foreground/30 group-hover:border-foreground/60'
                }`}
              >
                {consented && <Check className="w-2.5 h-2.5 text-background" />}
              </button>
              <span className="text-xs text-muted-foreground leading-relaxed">
                I agree to receive communication via{' '}
                <span className="text-foreground font-medium">SMS, RCS, and WhatsApp</span>{' '}
                from Sameen's Photography regarding my enquiry, booking updates, and exclusive offers.
                Message &amp; data rates may apply. Reply STOP to opt out.
              </span>
            </label>

            {/* Privacy & Terms consent */}
            <label className="flex items-start gap-3 cursor-pointer group" data-cursor-hover>
              <button
                type="button"
                onClick={() => setPolicyAccepted(!policyAccepted)}
                className={`mt-0.5 w-4 h-4 flex-shrink-0 border transition-all duration-300 flex items-center justify-center ${
                  policyAccepted ? 'bg-foreground border-foreground' : 'border-foreground/30 group-hover:border-foreground/60'
                }`}
              >
                {policyAccepted && <Check className="w-2.5 h-2.5 text-background" />}
              </button>
              <span className="text-xs text-muted-foreground leading-relaxed">
                I accept the{' '}
                <Link
                  to="/privacy-policy"
                  className="text-foreground underline underline-offset-2 hover:opacity-60 transition-opacity"
                  target="_blank"
                >
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link
                  to="/terms"
                  className="text-foreground underline underline-offset-2 hover:opacity-60 transition-opacity"
                  target="_blank"
                >
                  Terms &amp; Conditions
                </Link>{' '}
                of Sameen Photography. *
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={!consented || !policyAccepted}
              data-cursor-hover
              className={`group flex items-center gap-4 text-xs tracking-[0.2em] uppercase transition-all duration-500 ${
                consented && policyAccepted
                  ? 'opacity-100 hover:gap-6'
                  : 'opacity-30 cursor-not-allowed'
              }`}
            >
              Send Message
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            {(!consented || !policyAccepted) && (
              <p className="text-[10px] text-muted-foreground/50 mt-3 tracking-wide">
                Please accept both checkboxes to submit.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}