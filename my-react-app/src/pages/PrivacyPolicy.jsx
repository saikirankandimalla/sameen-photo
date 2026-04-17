import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const sections = [
  {
    title: '1. Information We Collect',
    content: [
      'Personal identification information (name, email address, phone number, wedding date)',
      'Communication data from contact forms, emails, SMS, RCS, and WhatsApp messages',
      'Usage data including IP address, browser type, pages visited, and time spent on our website',
      'Cookie data and tracking technologies for analytics and performance optimization',
      'Payment information processed securely through our third-party payment providers',
    ],
  },
  {
    title: '2. How We Use Your Information',
    content: [
      'To respond to your enquiries and provide our photography services',
      'To send booking confirmations, contracts, and service-related communications',
      'To send promotional offers and updates via SMS, RCS, and WhatsApp (only with your explicit consent)',
      'To improve our website experience and understand how visitors interact with our content',
      'To comply with legal obligations and resolve any disputes',
    ],
  },
  {
    title: '3. SMS, RCS & WhatsApp Communications',
    content: [
      'By opting in, you consent to receive automated and manual messages from Eternal Photography',
      'Message frequency may vary based on your enquiry and booking status',
      'Message and data rates may apply depending on your carrier plan',
      'You can opt out at any time by replying STOP to any SMS/RCS message or contacting us directly',
      'Your consent to messaging is not a condition of any purchase or service',
    ],
  },
  {
    title: '4. Data Sharing & Third Parties',
    content: [
      'We do not sell, trade, or rent your personal information to third parties',
      'We may share data with trusted service providers (email platforms, payment processors, cloud storage) under strict confidentiality agreements',
      'We may disclose information if required by law or to protect our legal rights',
      'Analytics partners may receive anonymised, aggregated data for performance insights',
    ],
  },
  {
    title: '5. Data Security',
    content: [
      'We implement industry-standard SSL encryption for all data transmission',
      'Access to your personal data is restricted to authorised personnel only',
      'We regularly review and update our security practices',
      'Despite our best efforts, no method of electronic storage is 100% secure',
    ],
  },
  {
    title: '6. Cookies',
    content: [
      'We use essential cookies necessary for the website to function properly',
      'Analytics cookies help us understand visitor behaviour (Google Analytics)',
      'You can control cookies through your browser settings',
      'Disabling certain cookies may affect your experience on our website',
    ],
  },
  {
    title: '7. Your Rights',
    content: [
      'Right to access: You may request a copy of the personal data we hold about you',
      'Right to rectification: You may request correction of inaccurate or incomplete data',
      'Right to erasure: You may request deletion of your personal data, subject to legal obligations',
      'Right to restrict processing: You may request that we limit how we use your data',
      'Right to data portability: You may request your data in a machine-readable format',
    ],
  },
  {
    title: '8. Data Retention',
    content: [
      'We retain enquiry data for up to 2 years from the date of last contact',
      'Client booking and contract data is retained for 7 years for legal and tax purposes',
      'You may request earlier deletion by contacting us directly',
    ],
  },
  {
    title: '9. Contact Us',
    content: [
      'Eternal Photography — Privacy Officer',
      'Email: privacy@eternalphotography.in',
      'Phone: +91 98765 43210',
      'Address: 12 Artisan Lane, Banjara Hills, Hyderabad — 500034, Telangana, India',
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-foreground/5 sticky top-0 bg-background/90 backdrop-blur-md z-40">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <Link to="/" className="font-heading text-xl">Eternal</Link>
          <Link to="/" className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-4">Legal</span>
          <h1 className="font-heading text-5xl sm:text-6xl italic mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
            At Eternal Photography, your privacy is as precious to us as the moments we capture. 
            This policy explains how we collect, use, and protect your personal information.
          </p>
          <div className="flex gap-8 mt-6 text-xs text-muted-foreground/60">
            <span>Effective: 1 January 2025</span>
            <span>Last updated: 15 April 2026</span>
          </div>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="border-t border-foreground/5 pt-10"
            >
              <h2 className="font-heading text-2xl italic mb-5">{section.title}</h2>
              <ul className="space-y-3">
                {section.content.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-foreground/30 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 pt-10 border-t border-foreground/5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <p className="text-xs text-muted-foreground/50">
            © 2025 Eternal Photography. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide underline underline-offset-2">
              Terms & Conditions
            </Link>
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}