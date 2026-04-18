import React, { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';

// Real partner logos uploaded by the client. Files live in /public/partners.
const partners = [
  { src: '/partners/bahria-town-logo-d1a3f8c43c-seeklogo.com.png', alt: 'Bahria Town' },
  { src: '/partners/park-view-city.png', alt: 'Park View City' },
  { src: '/partners/new-city.jpg', alt: 'New City' },
  { src: '/partners/banu-mukhtar.jpg', alt: 'Banu Mukhtar' },
  { src: '/partners/areaa-construction-north-pvt.-ltd..jpg', alt: 'AREAA Construction' },
  { src: '/partners/asl_logo.png', alt: 'ASL' },
  { src: '/partners/pgcl-logo-black1.png', alt: 'PGCL' },
  { src: '/partners/jmc-logo.png', alt: 'JMC' },
  { src: '/partners/gmis.png', alt: 'GMIS' },
  { src: '/partners/base-college.jpg', alt: 'Base College' },
  { src: '/partners/college_logo.jpg', alt: 'College' },
  { src: '/partners/peshawar-excellence.jpg', alt: 'Peshawar Excellence' },
  { src: '/partners/rsz_ajk-logo-symbol-57.png', alt: 'AJK' },
  { src: '/partners/park-view-city.png', alt: 'Park View City' },
  { src: '/partners/sangel.png', alt: 'Sangel' },
  { src: '/partners/shenghui.png', alt: 'Shenghui' },
  { src: '/partners/tomorroland.png', alt: 'Tomorroland' },
  { src: '/partners/valley.png', alt: 'Valley' },
  { src: '/partners/welcome.png', alt: 'Welcome' },
  { src: '/partners/yomifood-copy.jpg', alt: 'Yomifood' },
  { src: '/partners/izzat-ali-sha.png', alt: 'Izzat Ali Sha' },
  { src: '/partners/rehmat.jpg', alt: 'Rehmat' },
];

export const AnimatedCounter: React.FC<{ from: number; to: number; duration?: number; decimals?: number; suffix?: string; className?: string }> = ({ from, to, duration = 2.5, decimals = 0, suffix = "", className }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    const node = nodeRef.current;
    if (node && isInView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = value.toFixed(decimals) + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, decimals, suffix, isInView]);

  return <span ref={nodeRef} className={className} />;
};

export const LogoTicker: React.FC = () => {
  return (
    <section className="py-14 bg-surface-container-lowest border-y border-outline-variant relative overflow-hidden">
      {/* Edge fade masks for clean entry/exit */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-surface-container-lowest to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-surface-container-lowest to-transparent" />

      <div className="container mx-auto px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="font-label text-primary text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase">
            Trusted by Industry Leaders
          </span>
          <h3 className="text-lg sm:text-xl mt-2 text-on-surface-variant font-medium">
            22+ enterprises across construction, education & retail
          </h3>
        </motion.div>
      </div>

      <div className="flex">
        <motion.div
          animate={{ x: '-50%' }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="flex items-center gap-6 md:gap-10 whitespace-nowrap px-6"
        >
          {[...partners, ...partners].map((logo, idx) => (
            <div
              key={idx}
              className="group flex items-center justify-center shrink-0 w-32 h-20 md:w-40 md:h-24 rounded-2xl bg-white border border-outline-variant shadow-sm hover:shadow-lg hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 p-3"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                draggable={false}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
