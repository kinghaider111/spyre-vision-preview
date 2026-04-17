import React from 'react';
import { 
  Users, Award, Globe, TrendingUp, Code2, Cloud, Brain, 
  Settings, CreditCard, Smartphone, HeartPulse, Building2, 
  Package, Shield, School, ShoppingCart, FileText, 
  Home as HomeIcon, Hotel, Stethoscope, Briefcase, Scale, 
  Palette, GraduationCap, Tv2 
} from 'lucide-react';

export const stats = [
  { icon: React.createElement(Users, { size: 20 }), value: '500+', label: 'Students Trained' },
  { icon: React.createElement(Award, { size: 20 }), value: '98%', label: 'Job Placement' },
  { icon: React.createElement(Globe, { size: 20 }), value: '4', label: 'Countries Served' },
  { icon: React.createElement(TrendingUp, { size: 20 }), value: '200+', label: 'Happy Clients' },
];

export const services = [
  {
    title: 'Custom Software',
    icon: React.createElement(Code2, { className: 'text-secondary' }),
    items: ['Mobile Apps', 'Websites & Web Apps', 'Desktop Software'],
    accent: 'primary',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
  },
  {
    title: 'Hospital & ERP Systems',
    icon: React.createElement(HeartPulse, { className: 'text-secondary' }),
    items: ['Hospital Management', 'Inventory & HR', 'Accounting & Billing'],
    accent: 'secondary',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
  },
  {
    title: 'AI & Smart Tools',
    icon: React.createElement(Brain, { className: 'text-secondary' }),
    items: ['AI Chat & Assistants', 'Data Dashboards', 'Smart Automation'],
    accent: 'primary',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&auto=format&fit=crop&q=80',
  },
  {
    title: 'Tech Training',
    icon: React.createElement(GraduationCap, { className: 'text-secondary' }),
    items: ['Web Development', 'Mobile Development', 'AI & Cloud Courses'],
    accent: 'secondary',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80',
  },
];

export const categories = [
  {
    id: 'operations',
    label: 'Hospital & Office (ERP)',
    tag: 'ERP SYSTEMS',
    icon: React.createElement(Settings, { size: 22 }),
    count: 6,
    desc: 'All-in-one software to run hospitals, schools, HR, accounts, and stock — easy for any team to use.',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=900&auto=format&fit=crop&q=80',
    items: ['Hospital Management', 'Accounts & Ledger', 'HR & Payroll', 'Stock & Purchase', 'Insurance Software', 'School Management'],
    itemIcons: [
      React.createElement(HeartPulse, { size: 14 }), 
      React.createElement(Building2, { size: 14 }), 
      React.createElement(Users, { size: 14 }), 
      React.createElement(Package, { size: 14 }), 
      React.createElement(Shield, { size: 14 }), 
      React.createElement(School, { size: 14 })
    ],
  },
  {
    id: 'sales',
    label: 'Sales & Billing',
    tag: 'POS & INVOICING',
    icon: React.createElement(CreditCard, { size: 22 }),
    count: 4,
    desc: 'Fast point-of-sale, invoices, real estate and hotel booking tools to grow your sales.',
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=900&auto=format&fit=crop&q=80',
    items: ['Point of Sale (POS)', 'Invoicing & Billing', 'Real Estate Software', 'Hotel Management'],
    itemIcons: [
      React.createElement(ShoppingCart, { size: 14 }), 
      React.createElement(FileText, { size: 14 }), 
      React.createElement(HomeIcon, { size: 14 }), 
      React.createElement(Hotel, { size: 14 })
    ],
  },
  {
    id: 'websites',
    label: 'Websites',
    tag: 'WEB DESIGN',
    icon: React.createElement(Globe, { size: 22 }),
    count: 5,
    desc: 'Modern, mobile-friendly websites for businesses, lawyers, schools, creators and media brands.',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=900&auto=format&fit=crop&q=80',
    items: ['Business Websites', 'Law & Professional', 'Personal & Creative', 'School & Education', 'Media & News'],
    itemIcons: [
      React.createElement(Briefcase, { size: 14 }), 
      React.createElement(Scale, { size: 14 }), 
      React.createElement(Palette, { size: 14 }), 
      React.createElement(GraduationCap, { size: 14 }), 
      React.createElement(Tv2, { size: 14 })
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile Apps',
    tag: 'iOS & ANDROID',
    icon: React.createElement(Smartphone, { size: 22 }),
    count: 3,
    desc: 'Smooth Android & iOS apps for shops, clinics, and hospitals — built for everyday users.',
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=900&auto=format&fit=crop&q=80',
    items: ['POS Mobile App', 'Health App', 'Hospital App'],
    itemIcons: [
      React.createElement(ShoppingCart, { size: 14 }), 
      React.createElement(HeartPulse, { size: 14 }), 
      React.createElement(Stethoscope, { size: 14 })
    ],
  },
];

export const testimonials = [
  { quote: "Technospyre built our hospital software in record time. Our staff learned it in a day and our reports are now ready in minutes, not hours.", author: 'Dr. Sarah Jenkins', role: 'Director, City Care Hospital', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80' },
  { quote: "We hired three students from the Academy. They were ready to work from day one — clean code, good attitude, and very strong basics.", author: 'Marcus Thorne', role: 'VP Engineering, FinTech Solutions', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
  { quote: "Their POS and inventory app made our retail chain twice as fast. Even the cashiers love it. Best decision we made this year.", author: 'Elena Rodriguez', role: 'Founder, Streamline Retail', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80' },
];

export const technologies = [
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Laravel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
  { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'Swift', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
  { name: 'Kotlin', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
];

export const faqs = [
  {
    q: 'How long does it take to build my software or website?',
    a: 'Most websites take 2–4 weeks. Custom software like ERP or hospital systems usually takes 6–12 weeks depending on the features. We share a clear timeline before we start.',
  },
  {
    q: 'Do I need to know tech stuff to work with you?',
    a: 'No. We talk in simple language and show you everything step by step. You only tell us what you need — we handle the technical part.',
  },
  {
    q: 'Will you support the software after delivery?',
    a: 'Yes. Every project comes with free support for the first 3 months, plus easy monthly support plans after that. We are always one message away.',
  },
  {
    q: 'Can I join the Academy if I am a beginner?',
    a: 'Yes. Our courses start from zero. We teach you the basics first, then move to real projects. Many of our top students started with no tech background.',
  },
  {
    q: 'How much does a custom project cost?',
    a: 'It depends on the size and features. We offer affordable plans for small businesses and detailed quotes for larger projects. Book a free call to get a price.',
  },
  {
    q: 'Do you work with clients outside Pakistan?',
    a: 'Yes. We work with clients in the US, UK, UAE, and across Asia. Everything is done online with regular video calls and clear updates.',
  },
];

export const powerComparison = [
  { feature: 'Easy to understand & use', us: true, others: false },
  { feature: 'Local support in your language', us: true, others: false },
  { feature: 'Free 3-month support after launch', us: true, others: false },
  { feature: 'Hospital & ERP ready templates', us: true, others: false },
  { feature: 'Trained staff from our own Academy', us: true, others: false },
  { feature: 'Fixed prices, no hidden fees', us: true, others: false },
];
