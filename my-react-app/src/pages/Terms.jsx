import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const sections = [
  {
    title: '1. Agreement to Terms',
    content: [
      'By accessing our website or engaging our services, you agree to be bound by these Terms & Conditions.',
      'These terms apply to all visitors, clients, and others who access or use our services.',
      'If you disagree with any part of these terms, you may not access our services.',
      'We reserve the right to update these terms at any time. Continued use constitutes acceptance of revised terms.',
    ],
  },
  {
    title: '2. Services',
    content: [
      'Eternal Photography provides professional wedding, pre-wedding, and destination photography services.',
      'All services are subject to availability and confirmation via a signed contract.',
      'The specific scope of services will be outlined in your individual service agreement.',
      'We reserve the right to decline bookings at our discretion.',
    ],
  },
  {
    title: '3. Booking & Payments',
    content: [
      'A non-refundable retainer fee of 50% is required to secure your wedding date.',
      'The remaining balance is due 30 days prior to your event date.',
      'All prices are inclusive of applicable taxes unless otherwise stated.',
      'Payments can be made via bank transfer, UPI, or our secure online payment portal.',
      'Late payments may result in cancellation of your booking without refund of the retainer.',
    ],
  },
  {
    title: '4. Cancellation & Rescheduling',
    content: [
      'Cancellations made more than 90 days before the event: retainer is forfeited.',
      'Cancellations made within 90 days of the event: 75% of the total contract value is due.',
      'Cancellations within 30 days of the event: 100% of the total contract value is due.',
      'Rescheduling requests are subject to availability and must be made at least 60 days in advance.',
      'Rescheduling is treated as a new booking if the new date is unavailable.',
    ],
  },
  {
    title: '5. Copyright & Image Usage',
    content: [
      'All photographs and videos created by Eternal Photography remain the intellectual property of Eternal Photography.',
      'Clients are granted a non-exclusive, personal-use licence to print and share images from their gallery.',
      'Clients may not sell, sublicense, or use images for commercial purposes without written consent.',
      'Eternal Photography reserves the right to use images for portfolio, website, social media, and promotional purposes unless a written privacy agreement is signed.',
      'Watermark removal or image manipulation without permission is strictly prohibited.',
    ],
  },
  {
    title: '6. Delivery Timeline',
    content: [
      'Edited photographs are delivered within 6–8 weeks of the event date via an online gallery.',
      'Highlight films are delivered within 10–12 weeks of the event.',
      'Rush delivery is available at an additional fee, subject to availability.',
      'Raw/unedited files are not included and are not available for purchase.',
      'Galleries remain active for 90 days; download within this period.',
    ],
  },
  {
    title: '7. Client Responsibilities',
    content: [
      'Clients are responsible for providing accurate event details and timelines.',
      'A point of contact must be designated for the day of the event.',
      'Access to all ceremony and reception spaces must be arranged by the client.',
      'Clients accept that outdoor events are subject to natural lighting conditions.',
      'The photographer\'s safety and wellbeing must be prioritised at all times.',
    ],
  },
  {
    title: '8. Force Majeure',
    content: [
      'Eternal Photography will not be liable for failure to perform due to circumstances beyond our control.',
      'This includes natural disasters, government restrictions, illness, or equipment failure.',
      'In such cases, we will make every effort to recommend a qualified substitute photographer.',
      'Liability is limited to a refund of all payments received.',
    ],
  },
  {
    title: '9. Limitation of Liability',
    content: [
      'Our liability is limited to the total amount paid for services under the contract.',
      'We are not liable for indirect, consequential, or incidental damages.',
      'In the unlikely event of total media failure, our maximum liability is a full refund.',
      'We strongly recommend couples back up all delivered digital files immediately.',
    ],
  },
  {
    title: '10. Governing Law',
    content: [
      'These terms are governed by the laws of the Republic of India.',
      'Any disputes shall be subject to the exclusive jurisdiction of the courts of Hyderabad, Telangana.',
      'For any questions regarding these terms, contact us at legal@eternalphotography.in.',
    ],
  },
];

export default function Terms() {
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
          <h1 className="font-heading text-5xl sm:text-6xl italic mb-6">Terms & Conditions</h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
            Please read these terms carefully before engaging our services. By booking with Eternal Photography, 
            you agree to the following terms and conditions in full.
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
              transition={{ duration: 0.6, delay: i * 0.04 }}
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
            <Link to="/privacy-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide underline underline-offset-2">
              Privacy Policy
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