import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Marcus Chen',
    role: 'Hardware Engineer',
    text: 'The BOM detail alone saved me weeks of research. Absolutely worth the investment.',
  },
  {
    name: 'Sarah Okonkwo',
    role: 'Systems Architect',
    text: 'I built my first prototype in 3 days using the execution framework from the vault.',
  },
  {
    name: 'James Patterson',
    role: 'Electronics Hobbyist',
    text: 'The quality of documentation here is better than anything I\'ve found elsewhere. Period.',
  },
];

export default function CredibilitySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Trusted by Builders</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Engineers and makers who ship use Scalar Vault to accelerate their builds.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl border border-border/50 bg-card/50"
          >
            <Quote className="w-8 h-8 text-primary/30 mb-4" />
            <p className="text-sm text-foreground/80 leading-relaxed mb-5">{t.text}</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">{t.name[0]}</span>
              </div>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
            <div className="flex gap-0.5 mt-4">
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} className="w-3.5 h-3.5 fill-primary text-primary" />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}