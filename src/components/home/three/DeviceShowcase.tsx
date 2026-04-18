import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCREENS = [
  "/screens/laptop-erp-screen.jpg",
  "/screens/tablet-hms-screen.jpg",
  "/screens/phone-academy-screen.jpg",
];

interface Props {
  /** 0 = laptop, 1 = tablet, 2 = phone */
  index: number;
}

/**
 * Classic 2D device mockup showcase — replaces the 3D Three.js scene.
 * Pure CSS device frames (laptop / tablet / phone) with dashboard image inside.
 * Lightweight, sharp, and fully theme-aware.
 */
export const DeviceShowcase: React.FC<Props> = ({ index }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <AnimatePresence mode="wait">
        {index === 0 && (
          <motion.div
            key="laptop"
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <LaptopFrame src={SCREENS[0]} />
          </motion.div>
        )}
        {index === 1 && (
          <motion.div
            key="tablet"
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <TabletFrame src={SCREENS[1]} />
          </motion.div>
        )}
        {index === 2 && (
          <motion.div
            key="phone"
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <PhoneFrame src={SCREENS[2]} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ============================================================
   Device Frames — pure CSS / Tailwind, no external assets
   ============================================================ */

const LaptopFrame: React.FC<{ src: string }> = ({ src }) => (
  <motion.div
    whileHover={{ y: -6 }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
    className="relative w-full max-w-[520px] mx-auto"
  >
    {/* Lid + screen */}
    <div className="relative rounded-t-2xl bg-neutral-900 dark:bg-neutral-950 p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] ring-1 ring-black/10">
      {/* Camera notch */}
      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-2 rounded-full bg-neutral-800 z-10 flex items-center justify-center">
        <div className="w-1 h-1 rounded-full bg-neutral-700" />
      </div>
      {/* Screen */}
      <div className="rounded-lg overflow-hidden aspect-[16/10] bg-black">
        <img
          src={src}
          alt="TechnoSpyre ERP dashboard"
          loading="eager"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
    </div>

    {/* Hinge / base */}
    <div className="relative h-3 -mx-3">
      <div className="h-full bg-gradient-to-b from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-800 rounded-b-[14px] shadow-[0_10px_20px_rgba(0,0,0,0.25)]" />
      {/* Notch under screen for trackpad recess illusion */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1.5 rounded-b-full bg-neutral-400/60 dark:bg-neutral-700" />
    </div>
    <div className="h-1 bg-neutral-200/70 dark:bg-neutral-900 rounded-b-2xl shadow-[0_30px_40px_-20px_rgba(0,0,0,0.4)]" />
  </motion.div>
);

const TabletFrame: React.FC<{ src: string }> = ({ src }) => (
  <motion.div
    whileHover={{ y: -6, rotate: -1 }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
    className="relative w-full max-w-[300px] mx-auto"
  >
    <div className="relative rounded-[28px] bg-neutral-900 dark:bg-neutral-950 p-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.55)] ring-1 ring-black/10">
      {/* Front camera */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-neutral-700 z-10" />
      <div className="rounded-[18px] overflow-hidden aspect-[3/4] bg-black">
        <img
          src={src}
          alt="TechnoSpyre Hospital Management"
          loading="lazy"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
      {/* Side button */}
      <div className="absolute -right-0.5 top-16 w-1 h-12 rounded-r bg-neutral-700" />
    </div>
  </motion.div>
);

const PhoneFrame: React.FC<{ src: string }> = ({ src }) => (
  <motion.div
    whileHover={{ y: -6, rotate: 1 }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
    className="relative w-full max-w-[200px] mx-auto"
  >
    <div className="relative rounded-[36px] bg-neutral-900 dark:bg-neutral-950 p-2.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-black/10">
      {/* Dynamic island */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black z-10" />
      <div className="rounded-[28px] overflow-hidden aspect-[9/19] bg-black">
        <img
          src={src}
          alt="TechnoSpyre Academy mobile app"
          loading="lazy"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
      {/* Side buttons */}
      <div className="absolute -left-0.5 top-20 w-1 h-8 rounded-l bg-neutral-700" />
      <div className="absolute -left-0.5 top-32 w-1 h-12 rounded-l bg-neutral-700" />
      <div className="absolute -right-0.5 top-24 w-1 h-16 rounded-r bg-neutral-700" />
    </div>
  </motion.div>
);
