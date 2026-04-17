import React, { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { Hero } from '../components/home/Hero';
import { LogoTicker } from '../components/home/LogoTicker';
import { ProductsGrid } from '../components/home/ProductsGrid';
import { ExpertiseSection } from '../components/home/ExpertiseSection';
import { TechnologiesSection } from '../components/home/TechnologiesSection';
import { AcademyTeaser } from '../components/home/AcademyTeaser';
import { PowerComparison } from '../components/home/PowerComparison';
import { TestimonialsGrid } from '../components/home/TestimonialsGrid';
import { FAQSection } from '../components/home/FAQSection';
import { HomeCTA } from '../components/home/HomeCTA';
import SEO from '../components/SEO';

const Home = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="overflow-x-hidden">
      <SEO 
        title="Smart Software, Hospital ERP & Tech Courses"
        description="TechnoSpyre builds easy-to-use hospital management, ERP, websites, and mobile apps — and trains the next generation of developers."
      />
      <Hero smoothX={smoothX} smoothY={smoothY} />
      <LogoTicker />
      <ProductsGrid />
      <ExpertiseSection />
      <TechnologiesSection />
      <AcademyTeaser />
      <PowerComparison />
      <TestimonialsGrid />
      <FAQSection />
      <HomeCTA />
    </div>
  );
};

export default Home;
