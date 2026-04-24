import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Marcus Chen',
    role: 'Hardware Engineer, Embedded Systems',
    text: 'The BOM documentation cut my component research time significantly. Part numbers, tolerances, and sourcing options all in one place.',
  },
  {
    name: 'Sarah Okonkwo',
    role: 'Systems Architect, IoT',
    text: 'The assembly sequences are structured the way professional documentation should be — test points, expected values, and failure modes all documented.',
  },
  {
    name: 'James Patterson',
    role: 'Research Engineer, Biomedical',
    text: 'The EEG guide covers the analog front-end design at a level I haven\'t seen in public literature. Exactly what I needed for my prototype.',
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
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Used by Working Engineers</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Engineers across hardware, embedded systems, and research use Scalar Vault as a reference during active prototyping.
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
            className="p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-primary/20 transition-all"
          >
            <Quote className="w-8 h-8 text-primary/20 mb-4" />
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