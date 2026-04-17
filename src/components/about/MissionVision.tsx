import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Eye, Target } from 'lucide-react';

const items = [
  {
    icon: <Rocket size={22} />,
    label: 'Our Mission',
    title: 'Make powerful software simple for everyone.',
    desc: 'We help hospitals, shops, schools, and growing businesses use technology without stress. Our software is easy to learn, fast to use, and built around how your team actually works.',
    points: ['Easy for non-tech users', 'Fast onboarding', 'Real local support'],
  },
  {
    icon: <Eye size={22} />,
    label: 'Our Vision',
    title: 'Build a smarter Pakistan, then a smarter world.',
    desc: 'We want to be the first name people think of when they need digital tools — and the place where the next generation of developers learns to build them.',
    points: ['World-class quality', 'Local-first thinking', 'Train future talent'],
  },
];

export const MissionVision: React.FC = () => {
  return (
    <section className="py-28 bg-surface-container-low relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-primary/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -6 }}
            className="group relative p-8 md:p-10 rounded-3xl bg-surface-container border border-outline-variant hover:border-primary/40 hover:shadow-[0_20px_60px_-30px_color-mix(in_srgb,var(--color-primary)_30%,transparent)] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  {item.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">{item.label}</span>
              </div>
              <h3 className="font-headline text-2xl md:text-3xl font-bold mb-4 leading-tight">{item.title}</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">{item.desc}</p>
              <ul className="space-y-2">
                {item.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <Target size={14} className="text-primary shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
