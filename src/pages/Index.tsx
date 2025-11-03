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

      {/* HERO SECTION - Purple & Hot Pink */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 text-center overflow-hidden">
        {/* Decorative geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 shape-circle animate-float" />
        <div className="absolute top-40 right-16 w-24 h-24 bg-accent/20 rounded-3xl rotate-45 animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-secondary/15 shape-blob animate-float" style={{ animationDelay: '1s' }} />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-primary/20"
          >
            <span className="text-sm font-semibold text-vro-dark">🚀 India's First Founder OS</span>
          </motion.div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-tight mb-6 font-display">
            <span className="text-vro-dark">VroPay</span>
            <br />
            <span className="gradient-text-hero">Finance</span>
            <br />
            <span className="text-vro-purple">EcoSystem</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Dream, Build, Launch — Your all-in-one platform for education, entrepreneurship, and finance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full flex justify-center mt-8 relative z-10"
        >
          <Card className="glass-effect shadow-card-hover max-w-lg w-full gradient-card-hero">
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap justify-center gap-3 text-sm sm:text-base mb-6">
                {[
                  ['Education', 'vro-purple', '📚'],
                  ['Entrepreneurship', 'vro-hotpink', '🚀'],
                  ['Finance', 'vro-pink', '💳'],
                ].map(([text, color, icon]) => (
                  <motion.div
                    key={text}
                    className="flex items-center gap-2 px-4 py-2 rounded-full glass-effect transition-smooth"
                    whileHover={{ scale: 1.08, y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-lg">{icon}</span>
                    <span className={`text-${color} font-bold`}>{text}</span>
                  </motion.div>
                ))}
              </div>
              <motion.button
                className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold shadow-card-hover transition-smooth hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started →
              </motion.button>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* PROBLEM SECTION - Hot Pink & Pink */}
      <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 py-20 overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-10 right-20 w-28 h-28 bg-accent/20 rounded-2xl rotate-12 animate-float" />
        <div className="absolute bottom-20 left-10 w-36 h-36 bg-secondary/20 shape-circle animate-float" style={{ animationDelay: '0.7s' }} />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-center font-display">
            We Understand Your <span className="gradient-text-problem">Struggle</span>
          </h2>
          <p className="text-base sm:text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Launching a startup is tough — especially in Tier 2/3 cities. We bring you everything you need in one place.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              ['💔', 'Fragmented Knowledge', 'We bring everything you need — no more scattered platforms.', 'accent'],
              ['⚠️', 'Scams & Uncertainty', 'We connect you with verified mentors and trusted resources.', 'secondary'],
              ['❌', 'No Real-Time Help', 'Our platform gives you instant support exactly when you need it.', 'accent'],
            ].map(([icon, title, desc, color], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <Card className={`p-6 glass-effect shadow-card h-full gradient-card-problem hover:shadow-card-hover transition-smooth border-l-4 border-${color}`}>
                  <motion.div 
                    className="text-5xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {icon}
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 text-vro-dark">{title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="p-8 sm:p-10 glass-effect glow-hotpink inline-block max-w-3xl gradient-card-problem">
                <h3 className="text-3xl sm:text-4xl font-black gradient-text-problem mb-4">
                  VroPay Bridge solves it all
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground">
                  One platform. All solutions. Real-time support.
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ECOSYSTEM SECTION - Pink & Purple */}
      <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 py-20 overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-32 left-16 w-32 h-32 bg-secondary/20 rounded-3xl rotate-45 animate-float" />
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-primary/15 shape-blob animate-float" style={{ animationDelay: '0.5s' }} />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-center mb-6 font-display">
            A Single Engine. <span className="gradient-text-ecosystem">3 Growth Levers.</span>
          </h2>
          <p className="text-base sm:text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Everything you need to turn your startup idea into reality — in one unified platform.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              ['📚', 'Education', 'vro-purple', 'Get curated playbooks and expert sessions.', 'primary'],
              ['🚀', 'Entrepreneurship', 'vro-hotpink', 'Access AI tools, community, and incubation.', 'accent'],
              ['💳', 'Finance', 'vro-pink', 'Manage funds, raise capital, and get credit.', 'secondary'],
            ].map(([icon, title, color, desc, shadowColor], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -12, scale: 1.05 }}
              >
                <Card className={`p-8 glass-effect shadow-card h-full gradient-card-ecosystem hover:glow-${shadowColor === 'primary' ? 'purple' : shadowColor === 'accent' ? 'hotpink' : 'pink'} transition-smooth relative overflow-hidden`}>
                  <div className={`absolute -top-10 -right-10 w-32 h-32 bg-${shadowColor}/10 rounded-full`} />
                  <motion.div
                    className="text-6xl mb-4 relative z-10"
                    whileHover={{ scale: 1.3, rotate: 15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {icon}
                  </motion.div>
                  <h3 className={`text-2xl sm:text-3xl font-black mb-3 text-${color} relative z-10`}>{title}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed relative z-10">{desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.08, rotate: -1 }}
            >
              <Card className="p-8 sm:p-12 glass-effect glow-pink inline-block gradient-card-ecosystem relative overflow-hidden">
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-secondary/20 rounded-full" />
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/20 rounded-full" />
                <p className="text-5xl sm:text-7xl font-black mb-3 font-mono relative z-10">
                  <span className="gradient-text-ecosystem">₹200</span>
                  <span className="text-vro-dark">/month</span>
                </p>
                <p className="text-lg sm:text-xl font-semibold text-muted-foreground relative z-10">
                  Less than a meal — full access to launch and grow your startup.
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FINANCIALS SECTION - Purple & Dark Purple */}
      <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 py-20 overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-16 right-10 w-36 h-36 bg-primary/15 shape-circle animate-float" />
        <div className="absolute bottom-24 left-16 w-28 h-28 bg-vro-dark/10 rounded-2xl rotate-12 animate-float" style={{ animationDelay: '0.6s' }} />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="max-w-6xl mx-auto relative z-10"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-center mb-6 font-display">
            Strong Foundations. <span className="gradient-text-financials">Scalable Opportunities.</span>
          </h2>
          <p className="text-base sm:text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Built on proven metrics and trusted by ambitious founders across India.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'Proven Growth', value: '3x', desc: 'Average founder revenue growth' },
              { title: 'Active Mentors', value: '500+', desc: 'Industry experts ready to guide' },
              { title: 'Success Rate', value: '85%', desc: 'Startups reach first milestone' },
              { title: 'Capital Access', value: '₹10L+', desc: 'Average funding facilitated' },
              { title: 'Community', value: '10K+', desc: 'Founders building together' },
              { title: 'Resources', value: '1000+', desc: 'Curated playbooks & tools' },
            ].map(({ title, value, desc }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.03 }}
              >
                <Card className="p-6 sm:p-8 glass-effect shadow-card h-full hover:glow-purple transition-smooth">
                  <p className="text-4xl sm:text-5xl font-black gradient-text-financials mb-2 font-mono">{value}</p>
                  <h3 className="text-lg sm:text-xl font-bold text-vro-dark mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-8 sm:p-10 glass-effect glow-purple inline-block max-w-4xl">
              <h3 className="text-3xl sm:text-5xl font-black mb-6 font-display">
                <span className="text-vro-dark">Make in India</span>
                <br />
                <span className="gradient-text-financials">Made for the World</span>
              </h3>
              <p className="text-lg sm:text-xl text-muted-foreground mb-6">
                Scaling globally. Starting locally. Building for Gen-Z everywhere.
              </p>
              <motion.button
                className="px-10 py-4 rounded-full bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold text-lg shadow-card-hover transition-smooth hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
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
