import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { AlertTriangle, Lightbulb } from 'lucide-react';

export default function ProblemSolution() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-destructive/[0.02] to-accent/[0.02]" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Problem */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 border-border/50 bg-destructive/5 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-destructive/15 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="text-xl font-bold">The Problem</h3>
              </div>
              <p className="text-foreground/75 leading-relaxed">
                Advanced technical knowledge is fragmented, scattered across academic papers, YouTube tutorials, and forums. When you try to apply it, you hit execution gaps — missing BOMs, unclear tolerances, integration failures, and no way to know why your prototype failed.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Most engineers stay on the surface. They never build what they learn.
              </p>
            </Card>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 border-border/50 bg-accent/5 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-xl font-bold">The Solution</h3>
              </div>
              <p className="text-foreground/75 leading-relaxed">
                Structured courses that teach the systems. Real build frameworks with complete BOMs, schematics, and verified execution paths. Everything you need to understand AND apply the knowledge immediately.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Learn the concepts. Build the systems. Join builders who actually prototype.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}