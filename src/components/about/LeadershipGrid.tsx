import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Linkedin, Mail } from 'lucide-react';
import { leadership } from '../../data/about';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' as const } }),
};

export const LeadershipGrid: React.FC = () => {
  return (
    <section className="py-28 bg-surface-container-low border-t border-outline-variant">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16 text-center">
          <span className="font-label text-primary text-xs font-bold tracking-[0.4em] uppercase mb-4 block">The People</span>
          <h2 className="font-headline text-4xl md:text-5xl font-bold">
            Meet the <span className="text-primary italic">Team</span> Behind Technospyre
          </h2>
          <p className="text-on-surface-variant mt-4 max-w-xl mx-auto">
            Friendly experts who love what they do — and who you'll actually talk to.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((member, i) => (
            <motion.div
              key={member.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.12}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl mb-5 border border-outline-variant">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full aspect-[4/5] object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent opacity-90" />

                {/* Hover socials */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-500">
                  <button aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-background/80 backdrop-blur-md border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-on-primary hover:border-primary transition-all">
                    <Linkedin size={14} />
                  </button>
                  <button aria-label="Email" className="w-9 h-9 rounded-full bg-background/80 backdrop-blur-md border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-on-primary hover:border-primary transition-all">
                    <Mail size={14} />
                  </button>
                </div>

                {/* Bottom info on image */}
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="inline-block bg-primary/90 text-on-primary text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest mb-2">
                    {member.role}
                  </span>
                  <h3 className="font-headline text-2xl font-bold text-foreground">{member.name}</h3>
                </div>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed px-1">{member.desc}</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-primary text-xs font-bold mt-3 px-1 group-hover:gap-2.5 transition-all"
              >
                Connect <ArrowRight size={12} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
