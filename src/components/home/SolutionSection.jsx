import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Zap, CheckCircle2, Layers } from 'lucide-react';

const FEATURES = [
  {
    icon: BookOpen,
    title: 'Structured Courses',
    description: 'Learn frameworks, not fragments. Complete systems with theory + execution.',
  },
  {
    icon: Zap,
    title: 'Build Systems',
    description: 'Step-by-step execution guides with verified BOMs and schematics.',
  },
  {
    icon: CheckCircle2,
    title: 'Execution Frameworks',
    description: 'Code, CAD, and architectural patterns you can use immediately.',
  },
  {
    icon: Layers,
    title: 'Weekly Updates',
    description: 'New courses and builds released every week. Always learning.',
  },
];

export default function SolutionSection() {
  return (
    <div className="relative py-20 bg-gradient-to-b from-card/30 to-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Solution</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            This platform turns concepts into structured systems you can actually use. Everything verified. Everything actionable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border border-border/40 bg-card hover:border-primary/25 transition-all"
            >
              <feature.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}