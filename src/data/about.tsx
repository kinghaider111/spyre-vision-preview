import React from 'react';
import { 
  Rocket, TrendingUp, Award, Globe, 
  Lightbulb, ShieldCheck, Star, Zap, 
  Users, Calendar, MapPin 
} from 'lucide-react';

export const leadership = [
  {
    name: 'Harris Javid',
    role: 'Founder & CEO',
    desc: '20+ years building software and growing teams. Believes great tech should feel simple.',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Elena Vance',
    role: 'Chief Technology Officer',
    desc: 'Leads our engineering team. Loves clean architecture and fast, reliable systems.',
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Dr. Julian Grey',
    role: 'Head of Academy',
    desc: 'Designs our courses to turn complete beginners into confident developers.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
  },
];

export const timeline = [
  { year: '2013', title: 'How It Started', desc: 'Two engineers, one small office, and a goal to build software that actually helps people.', icon: <Rocket size={18} /> },
  { year: '2017', title: 'First Big Win', desc: 'Launched our enterprise tools, signed our first 50 business clients across 3 cities.', icon: <TrendingUp size={18} /> },
  { year: '2021', title: 'Academy Opens', desc: 'Started training developers in-house. Today, our students work in top companies worldwide.', icon: <Award size={18} /> },
  { year: 'Today', title: 'Going Global', desc: 'Working with 200+ clients across 4 countries — and still answering every email personally.', icon: <Globe size={18} /> },
];

export const values = [
  { icon: <Lightbulb size={24} />, title: 'Fresh Ideas', desc: 'We don\'t just copy what others do. We design real solutions that fit you.', featured: true },
  { icon: <ShieldCheck size={24} />, title: 'Honest Work', desc: 'Clear pricing, no hidden fees. What we promise is what you get.' },
  { icon: <Star size={24} />, title: 'Top Quality', desc: 'Clean code, beautiful design, careful testing — every time.' },
  { icon: <Zap size={24} />, title: 'Fast Support', desc: 'We reply quickly and fix problems properly.' },
];

export const globalStats = [
  { icon: <Users size={18} />, value: '200+', label: 'Team & Trainers' },
  { icon: <Globe size={18} />, value: '4', label: 'Countries Served' },
  { icon: <Calendar size={18} />, value: '12+', label: 'Years Active' },
  { icon: <MapPin size={18} />, value: '12+', label: 'Cities Reached' },
];
