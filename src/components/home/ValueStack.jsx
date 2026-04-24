import React from 'react';
import { BookOpen, Cpu, FileText, RefreshCw, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: BookOpen, title: 'Complete Build Guides', desc: 'Step-by-step breakdowns from concept to completion with detailed instructions.' },
  { icon: FileText, title: 'Full BOMs', desc: 'Itemized bills of materials with costs, suppliers, and alternatives.' },
  { icon: Cpu, title: 'Execution Frameworks', desc: 'Proven systems and workflows to go from design to working prototype.' },
  { icon: RefreshCw, title: 'Weekly Updates', desc: 'New builds, updates, and improvements added to the vault every week.' },
  { icon: Shield, title: 'Verified Designs', desc: 'Every build is tested and documented by experienced engineers.' },
  { icon: Users, title: 'Private Community', desc: 'Connect with other builders and get support on your projects.' },
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What You Get Inside</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to build advanced engineering systems, from start to finish.
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