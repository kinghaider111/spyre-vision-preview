import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutHero: React.FC = () => {
  return (
    <section className="relative pt-40 pb-28 overflow-hidden px-6 sm:px-8">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1800&auto=format&fit=crop&q=80"
          alt=""
          aria-hidden
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/15 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 -left-10 w-[400px] h-[400px] bg-secondary/10 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-end">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-primary border border-primary/30 bg-primary/10 mb-8">
              <Calendar size={12} /> Founded in 2013 · 12+ Years Strong
            </span>
            <h1 className="font-headline text-5xl md:text-7xl lg:text-[5rem] font-bold leading-[1.05] tracking-tight text-on-surface mb-8">
              We Build <span className="text-primary italic">Real Software</span><br />
              for Real Businesses.
            </h1>
            <p className="max-w-2xl text-on-surface-variant text-lg md:text-xl leading-relaxed mb-8">
              Technospyre is a Pakistani-rooted, globally-trusted software company. We make simple, powerful tools — from hospital systems to mobile apps — and we train the next generation of developers in our own Academy.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary text-on-primary px-7 py-3.5 rounded-full font-bold text-sm hover:shadow-[0_8px_24px_color-mix(in_srgb,var(--color-primary)_40%,transparent)] hover:-translate-y-0.5 transition-all"
              >
                Work With Us <ArrowRight size={16} />
              </Link>
              <Link
                to="/solutions"
                className="inline-flex items-center gap-2 border border-outline-variant px-7 py-3.5 rounded-full font-bold text-sm hover:border-primary hover:text-primary transition-all"
              >
                See Our Products
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: '12+', label: 'Years Building' },
              { value: '200+', label: 'Happy Clients' },
              { value: '500+', label: 'Students Trained' },
              { value: '4', label: 'Countries' },
            ].map((s) => (
              <div
                key={s.label}
                className="group rounded-2xl border border-outline-variant bg-surface-container p-5 hover:border-primary/40 hover:-translate-y-1 transition-all"
              >
                <Sparkles size={16} className="text-primary mb-3 group-hover:rotate-12 transition-transform" />
                <p className="font-headline text-3xl md:text-4xl font-bold text-primary mb-1">{s.value}</p>
                <p className="text-xs uppercase tracking-widest text-on-surface-variant">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
