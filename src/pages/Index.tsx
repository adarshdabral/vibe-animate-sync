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

      {/* HERO SECTION - Off-white with Blue & Yellow Accents */}
      <section className="section-hero relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 text-center overflow-hidden">
        {/* Decorative geometric shapes with brand colors */}
        <div className="absolute top-20 left-[5%] w-40 h-40 bg-royal-blue/15 shape-circle animate-float" />
        <div className="absolute top-32 right-[8%] w-32 h-32 bg-bright-yellow/30 shape-rounded rotate-12 animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-40 left-[15%] w-36 h-36 bg-teal/20 shape-blob animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-[12%] w-28 h-28 bg-royal-blue/20 rounded-3xl rotate-45 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-[20%] w-24 h-24 bg-bright-yellow/25 shape-circle animate-float" style={{ animationDelay: '2s' }} />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 font-display">
            <span className="gradient-text">VroPay Finance EcoSystem</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-navy/90 max-w-2xl mx-auto mb-8 font-semibold">
            Dream, Build, Launch — Your all-in-one platform for education, entrepreneurship, and finance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative z-10 w-full max-w-3xl mx-auto"
        >
          <Card className="card-vibrant p-8 shadow-glow-blue">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 text-left">
                <h3 className="text-2xl font-bold text-navy mb-3">
                  Join the Revolution
                </h3>
                <p className="text-navy/80 mb-4">
                  Start building your dreams today with our comprehensive ecosystem.
                </p>
              </div>
              <button className="btn-vibrant text-lg px-8 py-4 whitespace-nowrap">
                Get Started Free
              </button>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* PROBLEM SECTION - Navy with Teal & Yellow Accents */}
      <section className="section-problem relative min-h-screen flex flex-col justify-center px-4 sm:px-8 py-24 overflow-hidden">
        {/* Decorative shapes with brand accents */}
        <div className="absolute top-16 right-[10%] w-32 h-32 bg-teal/25 rounded-3xl rotate-12 animate-float" />
        <div className="absolute bottom-24 left-[8%] w-40 h-40 bg-bright-yellow/15 shape-circle animate-float" style={{ animationDelay: '0.7s' }} />
        <div className="absolute top-1/3 left-[5%] w-24 h-24 bg-royal-blue/20 shape-rounded animate-float" style={{ animationDelay: '1.2s' }} />
        <div className="absolute bottom-1/3 right-[15%] w-28 h-28 bg-teal/20 shape-blob animate-float" style={{ animationDelay: '1.8s' }} />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="max-w-6xl mx-auto relative z-10"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-center">
            <span className="gradient-text-blue-teal">The Challenge We Solve</span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 text-center max-w-3xl mx-auto mb-16 font-medium">
            Aspiring entrepreneurs and learners face fragmented tools and limited access to resources.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { 
                title: 'Fragmented Learning', 
                desc: 'Students juggle multiple platforms without cohesive progress tracking',
                icon: '🎓'
              },
              { 
                title: 'Resource Barriers', 
                desc: 'High costs and limited access prevent many from starting their journey',
                icon: '💰'
              },
              { 
                title: 'Complex Tools', 
                desc: 'Entrepreneurs struggle with disconnected systems for payments and finance',
                icon: '⚙️'
              }
            ].map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: false }}
              >
                <Card className="card-vibrant-dark p-8 h-full hover:shadow-glow-teal transition-all">
                  <div className="text-5xl mb-4">{problem.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{problem.title}</h3>
                  <p className="text-white/80">{problem.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ECOSYSTEM SECTION - Off-white with Blue, Yellow & Teal */}
      <section className="section-ecosystem relative min-h-screen flex flex-col justify-center px-4 sm:px-8 py-24 overflow-hidden">
        {/* Decorative shapes with brand colors */}
        <div className="absolute top-24 left-[8%] w-36 h-36 bg-bright-yellow/25 rounded-3xl rotate-45 animate-float" />
        <div className="absolute bottom-32 right-[10%] w-44 h-44 bg-royal-blue/15 shape-blob animate-float" style={{ animationDelay: '0.6s' }} />
        <div className="absolute top-1/2 right-[5%] w-28 h-28 bg-teal/20 shape-circle animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 left-[12%] w-32 h-32 bg-bright-yellow/20 shape-rounded animate-float" style={{ animationDelay: '1.5s' }} />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="max-w-6xl mx-auto relative z-10"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-center">
            <span className="gradient-text">Our Solution Ecosystem</span>
          </h2>
          
          <p className="text-lg md:text-xl text-navy/90 text-center max-w-3xl mx-auto mb-16 font-medium">
            Four integrated modules designed to empower your complete journey
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { name: 'VroHub', desc: 'Interactive learning & collaboration', color: 'border-royal-blue/40' },
              { name: 'VroPay Finance', desc: 'Seamless payment solutions', color: 'border-teal/40' },
              { name: 'VroPay EduLoan', desc: 'Accessible education financing', color: 'border-bright-yellow/60' },
              { name: 'VroPay Invest', desc: 'Smart investment opportunities', color: 'border-royal-blue/40' }
            ].map((module, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: false }}
              >
                <Card className={`card-vibrant p-6 h-full text-center border-2 ${module.color} hover:shadow-glow-blue transition-all`}>
                  <h3 className="text-xl font-bold text-navy mb-2">{module.name}</h3>
                  <p className="text-navy/70">{module.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false }}
            className="text-center"
          >
            <button className="btn-vibrant text-xl px-10 py-5 shadow-glow-blue mb-12">
              Get Started Now
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <Card className="card-vibrant p-10 border-2 border-bright-yellow/40 shadow-glow-yellow">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 text-left">
                  <div className="inline-block px-4 py-2 bg-bright-yellow/20 text-navy font-bold rounded-full text-sm mb-4">
                    PREMIUM ACCESS
                  </div>
                  <h3 className="text-3xl font-black text-navy mb-4">
                    ₹999<span className="text-lg font-normal">/year</span>
                  </h3>
                  <p className="text-navy/80 mb-4">
                    Full access to all ecosystem features, priority support, and exclusive resources
                  </p>
                  <ul className="space-y-2 text-navy/80">
                    <li className="flex items-center gap-2">
                      <span className="text-teal text-xl">✓</span> Unlimited learning modules
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-teal text-xl">✓</span> Premium payment features
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-teal text-xl">✓</span> Priority loan processing
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-teal text-xl">✓</span> Investment insights
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/3">
                  <button className="btn-vibrant w-full text-lg py-4">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* FINANCIALS SECTION - Navy with Yellow & Teal Accents */}
      <section className="section-financials relative min-h-screen flex flex-col justify-center px-4 sm:px-8 py-24 overflow-hidden">
        {/* Decorative shapes with brand accents */}
        <div className="absolute top-20 right-[8%] w-40 h-40 bg-bright-yellow/15 shape-circle animate-float" />
        <div className="absolute bottom-32 left-[10%] w-32 h-32 bg-teal/20 rounded-3xl rotate-12 animate-float" style={{ animationDelay: '0.7s' }} />
        <div className="absolute top-1/3 left-[6%] w-28 h-28 bg-white/10 shape-blob animate-float" style={{ animationDelay: '1.3s' }} />
        <div className="absolute bottom-1/3 right-[12%] w-36 h-36 bg-bright-yellow/20 shape-rounded animate-float" style={{ animationDelay: '1.8s' }} />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="max-w-6xl mx-auto relative z-10"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-center">
            <span className="gradient-text-yellow-teal">Market Opportunity</span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 text-center max-w-3xl mx-auto mb-16 font-medium">
            Capturing value in India's booming digital economy
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { 
                metric: '₹80,000 Cr', 
                label: 'EdTech Market (2025)', 
                growth: '+30% CAGR',
                color: 'border-teal/40'
              },
              { 
                metric: '₹1,00,000 Cr', 
                label: 'Digital Payments (2025)', 
                growth: '+25% CAGR',
                color: 'border-bright-yellow/50'
              },
              { 
                metric: '₹20,000 Cr', 
                label: 'Student Loans (2024)', 
                growth: '+22% CAGR',
                color: 'border-teal/40'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: false }}
              >
                <Card className={`card-vibrant-dark p-8 text-center border-2 ${item.color} hover:shadow-glow-teal transition-all`}>
                  <div className="text-4xl font-black text-white mb-2">{item.metric}</div>
                  <div className="text-white/90 font-semibold mb-2">{item.label}</div>
                  <div className="inline-block px-3 py-1 bg-teal/20 text-teal rounded-full text-sm font-bold">
                    {item.growth}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="mb-20"
          >
            <Card className="card-vibrant-dark p-12 border-2 border-bright-yellow/40 shadow-glow-yellow">
              <div className="text-center">
                <div className="inline-block px-4 py-2 bg-bright-yellow/20 text-bright-yellow font-bold rounded-full text-sm mb-6">
                  MADE IN INDIA
                </div>
                <h3 className="text-4xl md:text-5xl font-black mb-6">
                  <span className="gradient-text-yellow-teal">Build for the World</span>
                </h3>
                <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                  Proudly crafted in India, empowering millions to learn, earn, and grow together
                </p>
                <button className="btn-vibrant text-lg px-10 py-4 shadow-glow-blue">
                  Join the Movement
                </button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
