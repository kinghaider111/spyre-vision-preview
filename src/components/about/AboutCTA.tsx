import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const AboutCTA: React.FC = () => {
  return (
    <section className="py-24 px-6 sm:px-8 relative overflow-hidden bg-surface-container-low border-t border-outline-variant">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 blur-[160px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto relative z-10 rounded-3xl border border-outline-variant bg-surface-container p-10 md:p-14 text-center shadow-[0_30px_80px_-40px_color-mix(in_srgb,var(--color-primary)_30%,transparent)]"
      >
        <span className="inline-flex items-center gap-2 text-primary text-xs font-bold tracking-[0.3em] uppercase mb-6">
          <Sparkles size={14} /> Let's Build Together
        </span>
        <h2 className="font-headline text-3xl md:text-5xl font-bold mb-5 leading-tight">
          Want to be part of the <span className="text-primary italic">story?</span>
        </h2>
        <p className="text-on-surface-variant mb-10 max-w-xl mx-auto leading-relaxed">
          Whether you need software for your business or want to learn at our Academy — let's start a simple conversation today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-sm hover:shadow-[0_8px_24px_color-mix(in_srgb,var(--color-primary)_45%,transparent)] hover:-translate-y-0.5 transition-all"
          >
            Get In Touch <ArrowRight size={16} />
          </Link>
          <Link
            to="/academy"
            className="inline-flex items-center justify-center gap-2 bg-surface-container-high border border-outline-variant text-on-surface px-8 py-4 rounded-full font-bold text-sm hover:border-primary/50 hover:text-primary hover:-translate-y-0.5 transition-all"
          >
            Explore Academy
          </Link>
        </div>
      </motion.div>
    </section>
  );
};
