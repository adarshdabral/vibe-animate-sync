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

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-tight mb-6 font-display">
            <span className="text-genz-dark">VroPay</span>
            <br />
            <span className="gradient-text-vibrant">Finance</span>
            <br />
            <span className="text-genz-purple">EcoSystem</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full flex justify-center mt-8"
        >
          <Card className="glass-effect glow-shadow max-w-lg w-full">
            <div className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-genz-dark">
                VroPay: Dream, Build, Launch
              </h2>
              <div className="flex flex-wrap justify-center gap-3 text-sm sm:text-base">
                {[
                  ['Education', 'genz-purple'],
                  ['Entrepreneurship', 'genz-hotpink'],
                  ['Finance', 'genz-pink'],
                ].map(([text, color]) => (
                  <motion.div
                    key={text}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-effect"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className={`w-3 h-3 rounded-full bg-${color}`} />
                    <span className={`text-${color} font-semibold`}>{text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 text-center font-display">
            We Understand Your <span className="gradient-text-vibrant">Struggle</span>
          </h2>
          <p className="text-base sm:text-lg text-center text-muted-foreground mb-10">
            Launching a startup is tough — especially in Tier 2/3 cities. We bring you everything you need in one place.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              ['💔', 'Fragmented Knowledge', 'We bring everything you need — no more scattered platforms.'],
              ['⚠️', 'Scams & Uncertainty', 'We connect you with verified mentors and trusted resources.'],
              ['❌', 'No Real-Time Help', 'Our platform gives you instant support exactly when you need it.'],
            ].map(([icon, title, desc]) => (
              <motion.div
                key={title}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-6 glass-effect soft-shadow-lg h-full">
                  <div className="text-4xl mb-3">{icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-genz-dark">{title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">{desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-6 sm:p-8 glass-effect gradient-border glow-shadow inline-block max-w-3xl">
                <h3 className="text-2xl sm:text-3xl font-bold gradient-text mb-3">
                  VroPay Bridge solves it all — one platform, real-time support.
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg">
                  One platform. All solutions. Real-time support.
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ECOSYSTEM SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-center mb-12 font-display">
            A Single Engine. <span className="gradient-text-vibrant">3 Growth Levers.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {[
              ['📚', 'Education', 'genz-purple', 'Get curated playbooks and expert sessions.'],
              ['🚀', 'Entrepreneurship', 'genz-hotpink', 'Access AI tools, community, and incubation.'],
              ['💳', 'Finance', 'genz-pink', 'Manage funds, raise capital, and get credit.'],
            ].map(([icon, title, color, desc]) => (
              <motion.div
                key={title}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-6 sm:p-8 glass-effect glow-shadow h-full">
                  <motion.div
                    className="text-5xl mb-3"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {icon}
                  </motion.div>
                  <h3 className={`text-xl sm:text-2xl font-bold mb-3 text-${color}`}>{title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">{desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-6 sm:p-10 glass-effect hotpink-shadow gradient-border inline-block">
                <p className="text-4xl sm:text-6xl font-black mb-2 font-mono">
                  <span className="gradient-text-vibrant">₹200</span>
                  <span className="text-genz-dark">/month</span>
                </p>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Less than a meal — full access to launch and grow your startup.
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FINANCIALS SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-center mb-12 font-display">
            Strong Foundations.<span className="gradient-text-vibrant"> Scalable Opportunities.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              'Proven growth potential',
              'Metrics that matter',
              'Real-Time Mentorship',
              'Incubation & Resources',
              'Affordable Access',
              'Trusted & Verified',
            ].map((title, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.03 }}
              >
                <Card className="p-6 sm:p-8 glass-effect soft-shadow-lg h-full">
                  <p className="text-2xl sm:text-3xl font-black gradient-text mb-2 font-mono">{title}</p>
                  <p className="text-sm text-muted-foreground">
                    Empowering founders with verified support and tools to scale.
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 font-display">
              <span className="text-genz-dark">Make in India</span>
              <br />
              <span className="gradient-text-vibrant">Made for the World</span>
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground">
              Scaling globally. Starting locally. Building for Gen-Z everywhere.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
