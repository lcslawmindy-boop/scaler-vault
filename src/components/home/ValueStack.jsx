import React from 'react';
import { BookOpen, Cpu, FileText, RefreshCw, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: BookOpen, title: 'Documented Build Guides', desc: 'Step-by-step technical references covering circuit design, assembly sequence, and testing procedures.' },
  { icon: FileText, title: 'Verified Bill of Materials', desc: 'Itemized component lists with exact part numbers, sourcing links, and tolerance specifications.' },
  { icon: Cpu, title: 'Tested Execution Sequences', desc: 'Assembly and debugging workflows derived from real prototype builds, not theoretical walkthroughs.' },
  { icon: RefreshCw, title: 'Continuously Updated', desc: 'Build references are revised as components change, better techniques emerge, or issues are reported.' },
  { icon: Shield, title: 'Engineer-Reviewed', desc: 'Each guide is reviewed for technical accuracy before publication and after reader feedback.' },
  { icon: Users, title: 'Practitioner Community', desc: 'A community of working engineers and researchers building from the same reference library.' },
];

export default function ValueStack() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Each Reference Includes</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every build guide is structured around documentation standards used in professional hardware development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-cyan transition-all">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}