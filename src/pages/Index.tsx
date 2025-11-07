import { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas3D } from '@/components/Canvas3D';
import { ScrollProgress } from '@/components/ScrollProgress';
import { SectionNav } from '@/components/SectionNav';
import { Card } from '@/components/ui/card';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState<'hero' | 'problem' | 'ecosystem' | 'financials'>('hero');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollProgress(latest);
      if (latest < 0.2) {
        setCurrentSection('hero');
        setCurrentSectionIndex(0);
      } else if (latest < 0.4) {
        setCurrentSection('problem');
        setCurrentSectionIndex(1);
      } else if (latest < 0.7) {
        setCurrentSection('ecosystem');
        setCurrentSectionIndex(2);
      } else {
        setCurrentSection('financials');
        setCurrentSectionIndex(3);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleNavigate = (targetProgress: number) => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: scrollHeight * targetProgress, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative">
      <ScrollProgress progress={scrollProgress} />
      <SectionNav currentSection={currentSectionIndex} onNavigate={handleNavigate} />
      <Canvas3D scrollProgress={scrollProgress} currentSection={currentSection} />

      {/* HERO SECTION - Light with Purple Accents */}
      <section className="section-hero relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 text-center overflow-hidden">
        {/* Decorative geometric shapes */}
        <div className="absolute top-20 left-[5%] w-40 h-40 bg-purple/20 shape-circle animate-float" />
        <div className="absolute top-32 right-[8%] w-32 h-32 bg-hot-pink/25 shape-rounded rotate-12 animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-40 left-[15%] w-36 h-36 bg-pink/20 shape-blob animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-[12%] w-28 h-28 bg-purple/15 rounded-3xl rotate-45 animate-float" style={{ animationDelay: '1.5s' }} />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-5xl mx-auto relative z-10"
        >
          {/* <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-8 px-6 py-3 rounded-full bg-white shadow-medium border border-purple/20"
          >
            <span className="text-sm font-bold text-dark-purple tracking-wide">fghjk</span>
          </motion.div> */}
          
          <h1 className="text-6xl sm:text-7xl md:text-9xl font-black leading-[0.95] mb-8 font-display tracking-tight">
            <br />
            <span className="text-dark-purple">VroPay</span>
            <br />
            <span className="gradient-text-primary">Finance</span>
            <br />
            <span className="text-purple">EcoSystem</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray max-w-2xl mx-auto mb-10 font-medium">
            Dream, Build, Launch — Your all-in-one platform for education, entrepreneurship, and finance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="w-full flex justify-center mt-4 relative z-10"
        >
          <Card className="bg-transparent shadow-none border-none max-w-2xl w-full">

            
            <div className="p-8 sm:p-10">
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[
                  ['Education', 'purple', '📚', 'bg-purple/10'],
                  ['Entrepreneurship', 'hot-pink', '🚀', 'bg-hot-pink/10'],
                  ['Finance', 'pink', '💳', 'bg-pink/10'],
                ].map(([text, color, icon, bgClass]) => (
                  <motion.div
                    key={text}
                    className={`flex items-center gap-3 px-6 py-3 rounded-full ${bgClass} border border-${color}/20 transition-smooth`}
                    whileHover={{ scale: 1.1, y: -4 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <span className="text-2xl">{icon}</span>
                    <span className={`text-${color} font-bold text-lg`}>{text}</span>
                  </motion.div>
                ))}
              </div>
              <motion.button
                className="px-12 py-4 rounded-full bg-gradient-to-r from-purple to-hot-pink text-pink font-bold text-lg shadow-purple hover:shadow-pink transition-smooth"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Now →
              </motion.button>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* PROBLEM SECTION - Dark with Hot Pink Accents */}
      <section className="section-problem relative min-h-screen flex flex-col justify-center px-4 sm:px-8 py-24 overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-16 right-[10%] w-32 h-32 bg-hot-pink/30 rounded-3xl rotate-12 animate-float" />
        <div className="absolute bottom-24 left-[8%] w-40 h-40 bg-pink/25 shape-circle animate-float" style={{ animationDelay: '0.7s' }} />
        <div className="absolute top-1/3 left-[5%] w-24 h-24 bg-white/10 shape-rounded animate-float" style={{ animationDelay: '1.2s' }} />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="max-w-6xl mx-auto relative z-10"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-8 text-center font-display text-white leading-tight">
            We Understand Your <span className="gradient-text-secondary">Struggle</span>
          </h2>
          <p className="text-xl sm:text-2xl text-center text-white/80 mb-16 max-w-3xl mx-auto font-medium">
            Launching a startup is tough — especially in Tier 2/3 cities. We bring you everything you need in one place.
          </p>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
  {[
    ['💔', 'Fragmented Knowledge', 'We bring everything you need — no more scattered platforms.', 'black'],
    ['⚠️', 'Scams & Uncertainty', 'We connect you with verified mentors and trusted resources.', 'pink'],
    ['❌', 'No Real-Time Help', 'Our platform gives you instant support exactly when you need it.', 'hot-pink'],
  ].map(([icon, title, desc, accentColor], index) => {
    // Fix for Tailwind dynamic class names
    const borderColor =
      accentColor === 'pink'
        ? 'border-pink-500'
        : accentColor === 'hot-pink'
        ? 'border-pink-400'
        : 'border-black';

    const hoverShadow =
      accentColor === 'hot-pink'
        ? 'hover:shadow-pink-500/50'
        : 'hover:shadow-purple-500/50';

    return (
      <motion.div
        key={title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15, duration: 0.6 }}
        whileHover={{ y: -12, scale: 1.03 }}
      >
        <Card
          className={`card-glass-dark shadow-md h-full p-8 transition-all duration-300 border-l-4 ${borderColor} ${hoverShadow} bg-black/50 backdrop-blur-md`}
        >
          <motion.div
            className="text-6xl mb-5"
            whileHover={{ scale: 1.3, rotate: 15 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {icon}
          </motion.div>
          <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
          <p className="text-white/80 text-base leading-relaxed">{desc}</p>
        </Card>
      </motion.div>
    );
  })}
</div>


          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -8 }}
            >
              <Card className="card-glass-dark p-10 sm:p-14 shadow-pink inline-block max-w-4xl">
                <h3 className="text-4xl sm:text-5xl font-black gradient-text-secondary mb-5 leading-tight">
                  VroPay Bridge solves it all
                </h3>
                <p className="text-xl sm:text-2xl text-white/80 font-medium">
                  One platform. All solutions. Real-time support.
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ECOSYSTEM SECTION - Light with Pink/Purple Accents */}
      <section className="section-ecosystem relative min-h-screen flex flex-col justify-center px-4 sm:px-8 py-24 overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-24 left-[8%] w-36 h-36 bg-pink/25 rounded-3xl rotate-45 animate-float" />
        <div className="absolute bottom-32 right-[10%] w-44 h-44 bg-purple/20 shape-blob animate-float" style={{ animationDelay: '0.6s' }} />
        <div className="absolute top-1/2 right-[5%] w-28 h-28 bg-hot-pink/15 shape-circle animate-float" style={{ animationDelay: '1s' }} />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="max-w-6xl mx-auto relative z-10"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-center mb-8 font-display text-dark-purple leading-tight">
            A Single Engine. <span className="gradient-text-light">3 Growth Levers.</span>
          </h2>
          <p className="text-xl sm:text-2xl text-center text-gray mb-16 max-w-3xl mx-auto font-medium">
            Everything you need to turn your startup idea into reality — in one unified platform.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              ['📚', 'Education', 'purple', 'Get curated playbooks and expert sessions.', 'card-gradient-purple'],
              ['🚀', 'Entrepreneurship', 'hot-pink', 'Access AI tools, community, and incubation.', 'card-gradient-pink'],
              ['💳', 'Finance', 'pink', 'Manage funds, raise capital, and get credit.', 'card-gradient-purple'],
            ].map(([icon, title, color, desc, cardClass], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -14, scale: 1.05 }}
              >
                <Card className={`${cardClass} p-10 shadow-medium h-full hover:shadow-${color === 'hot-pink' ? 'pink' : 'purple'} transition-smooth relative overflow-hidden`}>
                  <div className={`absolute -top-16 -right-16 w-40 h-40 bg-${color}/10 rounded-full blur-2xl`} />
                  <motion.div
                    className="text-7xl mb-5 relative z-10"
                    whileHover={{ scale: 1.4, rotate: 20 }}
                    transition={{ type: "spring", stiffness: 350 }}
                  >
                    {icon}
                  </motion.div>
                  <h3 className={`text-3xl font-black mb-4 text-${color} relative z-10`}>{title}</h3>
                  <p className="text-gray text-lg leading-relaxed relative z-10">{desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.08, rotate: -2 }}
            >
              <Card className="card-glass p-12 sm:p-16 shadow-large inline-block relative overflow-hidden">
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-pink/20 rounded-full blur-3xl" />
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple/20 rounded-full blur-3xl" />
                <p className="text-6xl sm:text-8xl font-black mb-4 font-mono relative z-10">
                  <span className="gradient-text-light">₹200</span>
                  <span className="text-dark-purple">/mo</span>
                </p>
                <p className="text-2xl font-bold text-gray relative z-10">
                  Less than a meal — full startup access
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FINANCIALS SECTION - Dark with Purple/Pink Accents */}
      <section className="section-financials relative min-h-screen flex flex-col justify-center px-4 sm:px-8 py-24 overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-20 right-[8%] w-40 h-40 bg-purple/20 shape-circle animate-float" />
        <div className="absolute bottom-32 left-[10%] w-32 h-32 bg-pink/20 rounded-3xl rotate-12 animate-float" style={{ animationDelay: '0.7s' }} />
        <div className="absolute top-1/3 left-[6%] w-28 h-28 bg-white/10 shape-blob animate-float" style={{ animationDelay: '1.3s' }} />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-center mb-8 font-display text-white leading-tight">
            Strong Foundations. <span className="gradient-text-light">Scalable Opportunities.</span>
          </h2>
          <p className="text-xl sm:text-2xl text-center text-white/80 mb-16 max-w-3xl mx-auto font-medium">
            Built on proven metrics and trusted by ambitious founders across India.
          </p>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
  {[
    {
      title: 'Proven Growth Potential',
      desc: 'Our tools and guidance are designed to scale with you.',
      color: 'pink',
    },
    {
      title: 'Incubation and Resources',
      desc: 'Access AI-powered pitch practice, hiring tools, and incubation programs tailored for first-time founders.',
      color: 'purple',
    },
    {
      title: 'Metrics That Matter',
      desc: 'High user retention, strong support systems, and a thriving founder community.',
      color: 'hot-pink',
    },
    {
      title: 'Affordable Access',
      desc: 'Launch and grow your venture at just ₹200/month — no hidden costs.',
      color: 'pink',
    },

    {
      title: 'Real-Time Mentorship',
      desc: 'Get instant expert feedback through live sessions and AI-driven mentor matching.',
      color: 'purple',
    },
    {
      title: 'Trusted & Verified',
      desc: 'Connect only with verified mentors, investors, and founders — ensuring credibility and trust.',
      color: 'pink',
    },
  ].map(({ title, desc, color }, index) => {
    const borderColor =
      color === 'pink'
        ? 'border-pink-500'
        : color === 'hot-pink'
        ? 'border-pink-400'
        : 'border-purple-500';

    const hoverShadow =
      color === 'hot-pink'
        ? 'hover:shadow-pink-500/50'
        : 'hover:shadow-purple-500/50';

    const gradientText =
      color === 'purple'
        ? 'bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent'
        : 'bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent';

    return (
      <motion.div
        key={title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ y: -10, scale: 1.04 }}
      >
        <Card
          className={`card-glass-dark p-8 h-full shadow-md transition-all duration-300 border-t-4 ${borderColor} ${hoverShadow} bg-black/50 backdrop-blur-md`}
        >
          <h3
            className={`text-2xl font-bold mb-3 ${gradientText}`}
          >
            {title}
          </h3>
          <p className="text-base text-white/70 leading-relaxed">{desc}</p>
        </Card>
      </motion.div>
    );
  })}
</div>




          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="bg-transparent p-12 sm:p-16 shadow-large inline-block max-w-5xl border-white/20">
              <h3 className="text-4xl sm:text-6xl font-black mb-6 font-display leading-tight">
                <span className="text-white">Make in India</span>
                <br />
                <span className="gradient-text-light">Made for the World</span>
              </h3>
              <p className="text-xl sm:text-2xl text-white/80 mb-10 font-medium">
                Scaling globally. Starting locally. Building for Gen-Z everywhere.
              </p>
              <motion.button
                className="px-14 py-5 rounded-full bg-gradient-to-r from-purple via-pink to-hot-pink text-white font-bold text-xl shadow-pink hover:shadow-purple transition-smooth"
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                Join the Movement →
              </motion.button>
            </Card>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
