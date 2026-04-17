import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ShieldCheck, Star, Zap } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' as const } }),
};

const values = [
  {
    icon: <Lightbulb size={24} />,
    title: 'Fresh Ideas',
    desc: 'We don\'t just copy what others do. We think hard about your problem and design real solutions that fit you.',
    featured: true,
  },
  { icon: <ShieldCheck size={24} />, title: 'Honest Work', desc: 'Clear pricing, clear timelines, no hidden fees. What we promise is what you get.' },
  { icon: <Star size={24} />, title: 'Top Quality', desc: 'Clean code, beautiful design, careful testing — every time.' },
  { icon: <Zap size={24} />, title: 'Fast Support', desc: 'When something needs help, we reply quickly and fix it properly.' },
];

export const ValueCards: React.FC = () => {
  return (
    <section className="py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <span className="font-label text-primary text-xs font-bold tracking-[0.4em] uppercase mb-4 block">What We Stand For</span>
          <h2 className="font-headline text-4xl md:text-5xl font-bold">
            The <span className="text-primary italic">Technospyre</span> Way
          </h2>
          <p className="text-on-surface-variant mt-4 max-w-xl mx-auto">Four simple values that shape every project we touch.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.1}
              whileHover={{ y: -8 }}
              className={`group p-8 rounded-2xl border border-outline-variant transition-all duration-400 hover:border-primary/40 hover:shadow-[0_20px_50px_-25px_color-mix(in_srgb,var(--color-primary)_30%,transparent)] cursor-pointer ${
                v.featured
                  ? 'md:col-span-2 bg-gradient-to-br from-surface-container-high to-surface-container min-h-[280px] flex flex-col justify-end relative overflow-hidden'
                  : 'bg-surface-container'
              }`}
            >
              {v.featured && (
                <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-25 transition-opacity">
                  <Lightbulb size={120} className="text-primary" />
                </div>
              )}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform relative z-10">
                {v.icon}
              </div>
              <h3 className={`font-headline font-bold mb-3 relative z-10 ${v.featured ? 'text-3xl' : 'text-xl'}`}>{v.title}</h3>
              <p className={`text-on-surface-variant leading-relaxed relative z-10 ${v.featured ? 'text-base' : 'text-sm'}`}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
