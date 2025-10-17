import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas3D } from '@/components/Canvas3D';
import { ScrollProgress } from '@/components/ScrollProgress';
import { SectionNav } from '@/components/SectionNav';
import { Button } from '@/components/ui/button';
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

      // Determine current section
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
    window.scrollTo({
      top: scrollHeight * targetProgress,
      behavior: 'smooth',
    });
  };

  return (
    <div ref={containerRef} className="relative">
      <ScrollProgress progress={scrollProgress} />
      <SectionNav currentSection={currentSectionIndex} onNavigate={handleNavigate} />
      <Canvas3D scrollProgress={scrollProgress} currentSection={currentSection} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-5xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-9xl font-black mb-6 leading-none font-display">
              <span className="text-deep-blue">₹10 Crore</span>
              <br />
              <span className="text-foreground">for</span>{' '}
              <span className="text-accent-blue">10%</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-mono">
              (post-money <span className="text-deep-blue font-bold">₹100 Cr</span>)
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-12"
          >
            <Card className="inline-block p-8 bg-card/95 backdrop-blur-xl border-border soft-shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-deep-blue">
                One Platform. A ₹100 Cr Vision.
              </h2>
              <div className="flex flex-wrap gap-4 justify-center text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent-blue" />
                  <span className="text-accent-blue font-semibold">Education</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-deep-blue" />
                  <span className="text-deep-blue font-semibold">Entrepreneurship</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-primary font-semibold">Finance</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground soft-shadow text-lg px-8 py-6 font-bold"
            >
              View Deck
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-center font-display">
              Real Pain. <span className="text-accent-blue">Real People.</span>
            </h2>
            <p className="text-center text-lg text-muted-foreground mb-12">
              90% of Tier 2/3 founders give up pre-launch
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <Card className="p-6 bg-card/95 backdrop-blur-xl border-border soft-shadow">
                <div className="text-4xl mb-4">💔</div>
                <h3 className="text-xl font-bold mb-2 text-deep-blue">Fragmented Knowledge</h3>
                <p className="text-muted-foreground">
                  Jump between 10+ platforms for learning, incubation, and funding
                </p>
              </Card>

              <Card className="p-6 bg-card/95 backdrop-blur-xl border-border soft-shadow">
                <div className="text-4xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold mb-2 text-deep-blue">Scams & Uncertainty</h3>
                <p className="text-muted-foreground">
                  Unverified courses, fake mentors, predatory lending
                </p>
              </Card>

              <Card className="p-6 bg-card/95 backdrop-blur-xl border-border soft-shadow">
                <div className="text-4xl mb-4">❌</div>
                <h3 className="text-xl font-bold mb-2 text-deep-blue">No Real-time Help</h3>
                <p className="text-muted-foreground">
                  Critical moments—pitch prep, funding asks—zero instant support
                </p>
              </Card>
            </div>

            <div className="text-center">
              <Card className="inline-block p-8 bg-accent-blue/10 backdrop-blur-xl border-accent-blue soft-shadow-lg">
                <h3 className="text-3xl font-bold mb-4 text-deep-blue">
                  VroPay Bridge Changes Everything
                </h3>
                <p className="text-lg text-muted-foreground">
                  One platform. All solutions. Real-time support.
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-5xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-12 text-center font-display">
              A Single Engine. <span className="text-accent-blue">3 Growth Levers.</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="p-8 bg-card/95 backdrop-blur-xl border-accent-blue soft-shadow-lg">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold mb-4 text-accent-blue">Education</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Startup Tuition</li>
                  <li>• Playbooks</li>
                  <li>• Live Expert Sessions</li>
                  <li>• Certifications</li>
                </ul>
              </Card>

              <Card className="p-8 bg-card/95 backdrop-blur-xl border-deep-blue soft-shadow-lg">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold mb-4 text-deep-blue">Entrepreneurship</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Incubation</li>
                  <li>• Hiring Platform</li>
                  <li>• Community</li>
                  <li>• Pitch Practice AI</li>
                </ul>
              </Card>

              <Card className="p-8 bg-card/95 backdrop-blur-xl border-primary soft-shadow-lg">
                <div className="text-6xl mb-4">💳</div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Finance</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Credit & Lending</li>
                  <li>• Personal Finance</li>
                  <li>• Fundraising Support</li>
                  <li>• Investment Tracking</li>
                </ul>
              </Card>
            </div>

            <div className="text-center">
              <Card className="inline-block p-10 bg-card/95 backdrop-blur-xl border-accent-blue soft-shadow-lg">
                <p className="text-5xl md:text-7xl font-black mb-4 font-mono">
                  <span className="text-deep-blue">₹200</span>
                  <span className="text-foreground">/month</span>
                </p>
                <p className="text-xl text-muted-foreground">
                  Cheaper than a McD Meal
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Financials Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pb-20">
        <div className="max-w-6xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-12 text-center font-display">
              Strong Economics. <span className="text-accent-blue">Scalable Vision.</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <Card className="p-8 bg-card/95 backdrop-blur-xl border-border soft-shadow">
                <p className="text-sm text-muted-foreground mb-2 font-mono">Year 1</p>
                <p className="text-4xl font-black text-deep-blue mb-2 font-mono">₹24 Cr</p>
                <p className="text-sm text-muted-foreground">~1L users ARR</p>
              </Card>

              <Card className="p-8 bg-card/95 backdrop-blur-xl border-border soft-shadow">
                <p className="text-sm text-muted-foreground mb-2 font-mono">Year 2</p>
                <p className="text-4xl font-black text-accent-blue mb-2 font-mono">₹240 Cr</p>
                <p className="text-sm text-muted-foreground">~10L users ARR</p>
              </Card>

              <Card className="p-8 bg-card/95 backdrop-blur-xl border-border soft-shadow">
                <p className="text-sm text-muted-foreground mb-2 font-mono">Year 3</p>
                <p className="text-4xl font-black text-deep-blue mb-2 font-mono">₹2,400 Cr</p>
                <p className="text-sm text-muted-foreground">~1Cr users ARR</p>
              </Card>
            </div>

            <Card className="p-10 bg-card/95 backdrop-blur-xl border-accent-blue soft-shadow-lg mb-16">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <p className="text-sm text-muted-foreground mb-2">Unit Economics</p>
                  <p className="text-5xl font-black font-mono">
                    <span className="text-deep-blue">LTV/CAC:</span>{' '}
                    <span className="text-accent-blue">60x</span>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">CAC</p>
                    <p className="font-bold text-lg font-mono">₹100</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">LTV</p>
                    <p className="font-bold text-lg font-mono">₹6,000</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Churn</p>
                    <p className="font-bold text-lg font-mono">8%/yr</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">NPS</p>
                    <p className="font-bold text-lg font-mono">72</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="text-center">
              <h3 className="text-4xl md:text-6xl font-black mb-6 font-display">
                <span className="text-deep-blue">Make in India</span>
                <br />
                <span className="text-accent-blue">Made for the World</span>
              </h3>
              <p className="text-xl text-muted-foreground mb-12">
                Scaling globally. Starting locally. Building for Gen-Z everywhere.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground soft-shadow text-lg px-8 py-6 font-bold"
                >
                  Schedule Call
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6 font-bold soft-shadow"
                >
                  Download Deck
                </Button>
              </div>

              <Card className="inline-block p-8 bg-soft-gray backdrop-blur-xl border-border soft-shadow">
                <h4 className="text-xl font-bold mb-4 text-deep-blue">Use of Funds</h4>
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-muted-foreground text-sm">Product & Tech</p>
                    <p className="font-bold text-lg font-mono">40%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">GTM</p>
                    <p className="font-bold text-lg font-mono">30%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Community & Partnerships</p>
                    <p className="font-bold text-lg font-mono">20%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Ops</p>
                    <p className="font-bold text-lg font-mono">10%</p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
