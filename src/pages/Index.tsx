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
            <span className="text-deep-blue">VroPay</span>
            <br />
            <span className="text-accent-blue">Finance</span>
            <br />
            <span className="text-foreground">EcoSystem</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full flex justify-center mt-8"
        >
          <Card className="p-6 sm:p-8 bg-card/95 backdrop-blur-xl border-border soft-shadow-lg max-w-lg w-full">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-deep-blue">
              VroPay: Dream, Build, Launch
            </h2>
            <div className="flex flex-wrap justify-center gap-3 text-sm sm:text-base">
              {[
                ['Education', 'accent-blue'],
                ['Entrepreneurship', 'deep-blue'],
                ['Finance', 'primary'],
              ].map(([text, color]) => (
                <div key={text} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-${color}`} />
                  <span className={`text-${color} font-semibold`}>{text}</span>
                </div>
              ))}
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
            We Understand Your <span className="text-accent-blue">Struggle</span>
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
              <Card key={title} className="p-6 bg-card/95 backdrop-blur-xl border-border soft-shadow">
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-deep-blue">{title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{desc}</p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Card className="p-6 sm:p-8 bg-accent-blue/10 border-accent-blue backdrop-blur-xl soft-shadow-lg inline-block max-w-3xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-deep-blue mb-3">
                VroPay Bridge solves it all — one platform, real-time support.
              </h3>
              <p className="text-muted-foreground text-base sm:text-lg">
                One platform. All solutions. Real-time support.
              </p>
            </Card>
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
            A Single Engine. <span className="text-accent-blue">3 Growth Levers.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {[
              ['📚', 'Education', 'accent-blue', 'Get curated playbooks and expert sessions.'],
              ['🚀', 'Entrepreneurship', 'deep-blue', 'Access AI tools, community, and incubation.'],
              ['💳', 'Finance', 'primary', 'Manage funds, raise capital, and get credit.'],
            ].map(([icon, title, color, desc]) => (
              <Card key={title} className={`p-6 sm:p-8 bg-card/95 border-${color} soft-shadow-lg`}>
                <div className="text-5xl mb-3">{icon}</div>
                <h3 className={`text-xl sm:text-2xl font-bold mb-3 text-${color}`}>{title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{desc}</p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Card className="p-6 sm:p-10 bg-card/95 backdrop-blur-xl border-accent-blue soft-shadow-lg inline-block">
              <p className="text-4xl sm:text-6xl font-black mb-2 font-mono">
                <span className="text-deep-blue">₹200</span>
                <span className="text-foreground">/month</span>
              </p>
              <p className="text-base sm:text-lg text-muted-foreground">
                Less than a meal — full access to launch and grow your startup.
              </p>
            </Card>
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
            Strong Foundations.<span className="text-accent-blue"> Scalable Opportunities.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              'Proven growth potential',
              'Metrics that matter',
              'Real-Time Mentorship',
              'Incubation & Resources',
              'Affordable Access',
              'Trusted & Verified',
            ].map((title) => (
              <Card key={title} className="p-6 sm:p-8 bg-card/95 backdrop-blur-xl border-border soft-shadow">
                <p className="text-2xl sm:text-3xl font-black text-deep-blue mb-2 font-mono">{title}</p>
                <p className="text-sm text-muted-foreground">
                  Empowering founders with verified support and tools to scale.
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 font-display">
              <span className="text-deep-blue">Make in India</span>
              <br />
              <span className="text-accent-blue">Made for the World</span>
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
