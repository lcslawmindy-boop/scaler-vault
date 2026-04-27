import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export default function ProblemSection() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-7 h-7 text-destructive" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Problem</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Most engineering knowledge is fragmented across blogs, YouTube, and PDFs. Hard to apply. Impossible to verify. No clear path from concept to working system.
        </p>
      </motion.div>
    </div>
  );
}