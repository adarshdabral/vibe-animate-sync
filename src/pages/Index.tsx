import { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas3D } from '@/components/Canvas3D';
import { ScrollProgress } from '@/components/ScrollProgress';
import { SectionNav } from '@/components/SectionNav';
import { Card } from '@/components/ui/card';
import { AnimatedText } from '@/components/AnimatedText';
import { Canvas } from '@react-three/fiber';
import { Icon3D } from '@/components/Icon3D';

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

      {/* HERO SECTION - Bold & Playful */}
      <section className="section-hero relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 text-center overflow-hidden">
        {/* Large animated blobs */}
        <div className="absolute top-10 left-[5%] w-72 h-72 bg-neon-purple/30 shape-blob animate-float" />
        <div className="absolute top-20 right-[8%] w-60 h-60 bg-cyber-pink/35 shape-circle animate-float" style={{ animationDelay: '0.7s' }} />
        <div className="absolute bottom-32 left-[12%] w-64 h-64 bg-electric-blue/30 shape-rounded animate-float" style={{ animationDelay: '1.2s' }} />
        <div className="absolute bottom-20 right-[10%] w-56 h-56 bg-sunny-yellow/25 shape-blob animate-float" style={{ animationDelay: '1.8s' }} />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.68, -0.55, 0.265, 1.55] }}
          className="max-w-6xl mx-auto relative z-10"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-block mb-10 px-8 py-4 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border-4 border-neon-purple/30 glow-purple"
          >
            <span className="text-lg font-black text-neon-purple tracking-wide">✨ The Future of Finance is Here</span>
          </motion.div>
          
          <h1 className="text-7xl sm:text-8xl md:text-[12rem] font-black leading-[0.9] mb-12 font-display tracking-tighter">
            <AnimatedText text="VroPay" className="block text-near-black" />
            <AnimatedText text="Finance" className="block gradient-text-primary" />
            <AnimatedText text="EcoSystem" className="block gradient-text-secondary" />
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-2xl sm:text-3xl text-near-black/80 max-w-3xl mx-auto mb-14 font-bold leading-relaxed"
          >
            Dream Big. Build Fast. Launch Smart.
            <br />
            <span className="gradient-text-accent">Your all-in-one creative powerhouse</span>
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="w-full flex justify-center mt-8 relative z-10"
        >
          <div className="max-w-4xl w-full">
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {[
                ['Education', 'neon-purple', 'education'],
                ['Entrepreneurship', 'cyber-pink', 'entrepreneurship'],
                ['Finance', 'electric-blue', 'finance'],
              ].map(([text, color, iconType], index) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2 + index * 0.2, duration: 0.5 }}
                  whileHover={{ scale: 1.15, y: -8, rotate: -2 }}
                  className="relative"
                >
                  <div className={`card-bold px-8 py-5 rounded-3xl cursor-pointer group`}>
                    {/* 3D Icon Container */}
                    <div className="w-20 h-20 mx-auto mb-3">
                      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                        <Icon3D type={iconType as any} position={[0, 0, 0]} scale={1.2} />
                        <ambientLight intensity={1} />
                      </Canvas>
                    </div>
                    <span className={`text-${color} font-black text-xl group-hover:scale-110 inline-block transition-transform`}>
                      {text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.6, duration: 0.5 }}
              className="px-16 py-6 rounded-full bg-gradient-to-r from-neon-purple via-cyber-pink to-electric-blue text-white font-black text-2xl glow-purple hover:glow-pink transition-all duration-300 transform hover:scale-110 hover:rotate-1 shadow-2xl"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              🚀 Start Your Journey
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* PROBLEM SECTION - Bold Dark */}
      <section className="section-problem relative min-h-screen flex flex-col justify-center px-4 sm:px-8 py-24 overflow-hidden">
        <div className="absolute top-16 right-[10%] w-80 h-80 bg-cyber-pink/20 shape-blob animate-float" />
        <div className="absolute bottom-24 left-[8%] w-72 h-72 bg-mint/15 shape-circle animate-float" style={{ animationDelay: '0.9s' }} />
        <div className="absolute top-1/3 left-[5%] w-64 h-64 bg-lime-green/15 shape-rounded animate-float" style={{ animationDelay: '1.4s' }} />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <h2 className="text-6xl sm:text-7xl md:text-8xl font-black mb-10 text-center font-display text-white leading-tight">
            We Get Your <AnimatedText text="Struggle" className="gradient-text-secondary" />
          </h2>
          <p className="text-2xl sm:text-3xl text-center text-white/90 mb-20 max-w-4xl mx-auto font-bold">
            Starting up is hard. We make it <span className="text-mint font-black">ridiculously simple</span>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            {[
              ['problem', 'Fragmented Chaos', 'Everything scattered everywhere? Not anymore. One platform, infinite possibilities.'],
              ['support', 'Scam Anxiety', 'Only verified mentors. Only trusted resources. Zero BS.'],
              ['mentor', 'Lonely Journey', 'Real-time support when you need it. A community that gets you.'],
            ].map(([iconType, title, desc], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.7 }}
                whileHover={{ y: -15, scale: 1.05, rotate: 1 }}
              >
                <Card className="card-glass-dark h-full p-10 relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-48 h-48 bg-cyber-pink/20 rounded-full blur-3xl" />
                  
                  {/* 3D Icon */}
                  <div className="w-32 h-32 mx-auto mb-6 relative z-10">
                    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                      <Icon3D type={iconType as any} position={[0, 0, 0]} scale={1.5} />
                      <ambientLight intensity={1.2} />
                    </Canvas>
                  </div>
                  
                  <h3 className="text-3xl font-black mb-5 text-white relative z-10">{title}</h3>
                  <p className="text-white/80 text-lg leading-relaxed relative z-10 font-medium">{desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>


          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              whileHover={{ scale: 1.08, rotate: -1 }}
            >
              <Card className="card-glass-dark p-14 sm:p-20 glow-pink inline-block max-w-5xl">
                <h3 className="text-5xl sm:text-7xl font-black gradient-text-secondary mb-6 leading-tight">
                  <AnimatedText text="VroPay Solves Everything" />
                </h3>
                <p className="text-2xl sm:text-3xl text-white/90 font-bold">
                  One platform. Infinite possibilities. Zero friction.
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ECOSYSTEM SECTION - Bold & Colorful */}
      <section className="section-ecosystem relative min-h-screen flex flex-col justify-center px-4 sm:px-8 py-24 overflow-hidden">
        <div className="absolute top-24 left-[8%] w-80 h-80 bg-sunny-yellow/25 shape-blob animate-float" />
        <div className="absolute bottom-32 right-[10%] w-72 h-72 bg-coral/20 shape-circle animate-float" style={{ animationDelay: '0.8s' }} />
        <div className="absolute top-1/2 right-[5%] w-64 h-64 bg-neon-purple/15 shape-rounded animate-float" style={{ animationDelay: '1.3s' }} />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <h2 className="text-6xl sm:text-7xl md:text-8xl font-black text-center mb-10 font-display text-near-black leading-tight">
            <AnimatedText text="One Engine." className="block" />
            <AnimatedText text="3 Superpowers." className="block gradient-text-accent" />
          </h2>
          <p className="text-2xl sm:text-3xl text-center text-near-black/80 mb-20 max-w-4xl mx-auto font-bold">
            From idea to IPO — all in one place
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            {[
              ['education', 'Education', 'Curated playbooks. Expert sessions. Level up fast.'],
              ['entrepreneurship', 'Launch', 'AI tools. Community vibes. Incubation magic.'],
              ['finance', 'Finance', 'Manage money. Raise capital. Get credit instantly.'],
            ].map(([iconType, title, desc], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.7 }}
                whileHover={{ y: -18, scale: 1.08, rotate: -2 }}
              >
                <Card className="card-bold p-12 h-full relative overflow-hidden group">
                  <div className="absolute -top-24 -right-24 w-56 h-56 bg-cyber-pink/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
                  
                  {/* 3D Icon */}
                  <div className="w-40 h-40 mx-auto mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300">
                    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                      <Icon3D type={iconType as any} position={[0, 0, 0]} scale={1.8} />
                      <ambientLight intensity={1.2} />
                    </Canvas>
                  </div>
                  
                  <h3 className="text-4xl font-black mb-5 gradient-text-primary relative z-10">{title}</h3>
                  <p className="text-near-black/80 text-xl leading-relaxed relative z-10 font-bold">{desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              whileHover={{ scale: 1.1, rotate: 2 }}
            >
              <Card className="card-bold p-16 sm:p-24 glow-yellow inline-block relative overflow-hidden">
                <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-sunny-yellow/30 rounded-full blur-3xl animate-pulse-glow" />
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-cyber-pink/30 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
                <p className="text-7xl sm:text-9xl font-black mb-6 font-mono relative z-10 animate-wiggle">
                  <span className="gradient-text-accent">₹200</span>
                  <span className="text-near-black">/mo</span>
                </p>
                <p className="text-3xl font-black text-near-black/80 relative z-10">
                  Less than chai ☕ — Full startup superpowers 🚀
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FINANCIALS SECTION - Bold Dark Finale */}
      <section className="section-financials relative min-h-screen flex flex-col justify-center px-4 sm:px-8 py-24 overflow-hidden">
        <div className="absolute top-20 right-[8%] w-80 h-80 bg-electric-blue/20 shape-circle animate-float" />
        <div className="absolute bottom-32 left-[10%] w-72 h-72 bg-mint/15 rounded-3xl rotate-12 animate-float" style={{ animationDelay: '0.9s' }} />
        <div className="absolute top-1/3 left-[6%] w-64 h-64 bg-cyber-pink/15 shape-blob animate-float" style={{ animationDelay: '1.5s' }} />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <h2 className="text-6xl sm:text-7xl md:text-8xl font-black text-center mb-10 font-display text-white leading-tight">
            <AnimatedText text="Built Different." className="block" />
            <AnimatedText text="Scaled for Success." className="block gradient-text-accent" />
          </h2>
          <p className="text-2xl sm:text-3xl text-center text-white/90 mb-20 max-w-4xl mx-auto font-bold">
            Trusted by ambitious founders. Powered by real results.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            {[
              {
                title: 'Growth on Steroids',
                desc: 'Tools that scale with your ambition. From zero to hero.',
              },
              {
                title: 'Full Incubation Suite',
                desc: 'AI pitch practice. Smart hiring. Everything first-timers need.',
              },
              {
                title: 'Metrics That Pop',
                desc: 'Sky-high retention. Thriving community. Real impact.',
              },
              {
                title: 'Insanely Affordable',
                desc: '₹200/month. No tricks. No hidden fees. Just value.',
              },
              {
                title: 'Live Mentorship',
                desc: 'Instant expert feedback. AI-matched mentors. 24/7 support.',
              },
              {
                title: 'Verified Trust',
                desc: 'Only real mentors. Only legit investors. Zero scams.',
              },
            ].map(({ title, desc }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -15, scale: 1.06 }}
              >
                <Card className="card-glass-dark p-10 h-full relative overflow-hidden group">
                  <div className="absolute -top-20 -right-20 w-48 h-48 bg-electric-blue/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
                  <h3 className="text-3xl font-black mb-4 gradient-text-secondary relative z-10">
                    {title}
                  </h3>
                  <p className="text-xl text-white/80 leading-relaxed relative z-10 font-medium">{desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>




          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Card className="card-glass-dark p-16 sm:p-24 glow-purple inline-block max-w-6xl relative overflow-hidden">
              <div className="absolute -top-32 -left-32 w-80 h-80 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-glow" />
              <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-cyber-pink/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
              
              <h3 className="text-5xl sm:text-8xl font-black mb-8 font-display leading-tight relative z-10">
                <AnimatedText text="Made in India" className="block text-white" />
                <AnimatedText text="Built for the World" className="block gradient-text-accent" />
              </h3>
              <p className="text-2xl sm:text-4xl text-white/90 mb-12 font-black relative z-10">
                Global scale. Local heart. GenZ energy. 🌍✨
              </p>
              <motion.button
                className="px-20 py-7 rounded-full bg-gradient-to-r from-neon-purple via-cyber-pink to-electric-blue text-white font-black text-3xl glow-purple hover:glow-pink transition-all duration-300 relative z-10 shadow-2xl"
                whileHover={{ scale: 1.12, y: -8, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                🚀 Join the Revolution
              </motion.button>
            </Card>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
