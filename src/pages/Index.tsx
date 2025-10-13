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
            <h1 className="text-7xl md:text-9xl font-black mb-6 leading-none">
              <span className="text-neon-cyan">₹10 Crore</span>
              <br />
              <span className="text-foreground">for</span>{' '}
              <span className="text-neon-magenta">10%</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              (post-money <span className="text-neon-yellow">₹100 Cr</span>)
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-12"
          >
            <Card className="inline-block p-8 bg-card/80 backdrop-blur-xl border-primary/50 glow-cyan">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                VroPay: The Complete Gen-Z Financial OS
              </h2>
              <div className="flex flex-wrap gap-4 justify-center text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-neon-cyan glow-cyan" />
                  <span className="text-neon-cyan font-semibold">Education</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-neon-magenta glow-magenta" />
                  <span className="text-neon-magenta font-semibold">Entrepreneurship</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-neon-yellow glow-yellow" />
                  <span className="text-neon-yellow font-semibold">Finance</span>
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
              className="bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan text-lg px-8 py-6 font-bold"
            >
              View Investor Deck
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
            <h2 className="text-5xl md:text-7xl font-black mb-12 text-center">
              The <span className="text-neon-magenta">Problem</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
                <div className="text-neon-cyan text-4xl mb-4">💔</div>
                <h3 className="text-xl font-bold mb-2">Fragmented Knowledge</h3>
                <p className="text-muted-foreground">
                  Students jump between 10+ platforms for learning, incubation, and funding
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
                <div className="text-neon-magenta text-4xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold mb-2">Scams & Uncertainty</h3>
                <p className="text-muted-foreground">
                  Unverified courses, fake mentors, and predatory lending
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
                <div className="text-neon-yellow text-4xl mb-4">❌</div>
                <h3 className="text-xl font-bold mb-2">No Real-time Help</h3>
                <p className="text-muted-foreground">
                  Critical moments—pitch prep, funding asks—with zero instant support
                </p>
              </Card>
            </div>

            <div className="text-center">
              <Card className="inline-block p-8 bg-primary/10 backdrop-blur-xl border-primary">
                <h3 className="text-3xl font-bold mb-4">
                  <span className="text-neon-cyan">VroPay Bridge</span> Changes Everything
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
            <h2 className="text-5xl md:text-7xl font-black mb-12 text-center">
              The <span className="text-neon-cyan">Ecosystem</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="p-8 bg-card/50 backdrop-blur-xl border-primary/50 glow-cyan">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold mb-4 text-neon-cyan">Education</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Curated Content Library</li>
                  <li>• Startup Tuition Programs</li>
                  <li>• Live Expert Sessions</li>
                  <li>• Skill Certifications</li>
                </ul>
              </Card>

              <Card className="p-8 bg-card/50 backdrop-blur-xl border-secondary/50 glow-magenta">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold mb-4 text-neon-magenta">Entrepreneurship</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Founder Community</li>
                  <li>• Incubation Support</li>
                  <li>• Hiring Platform</li>
                  <li>• Pitch Practice AI</li>
                </ul>
              </Card>

              <Card className="p-8 bg-card/50 backdrop-blur-xl border-accent/50 glow-yellow">
                <div className="text-6xl mb-4">💰</div>
                <h3 className="text-2xl font-bold mb-4 text-neon-yellow">Finance</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Personal Finance Tools</li>
                  <li>• Credit & Lending</li>
                  <li>• Fundraising Support</li>
                  <li>• Investment Tracking</li>
                </ul>
              </Card>
            </div>

            <div className="text-center">
              <Card className="inline-block p-10 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 backdrop-blur-xl border-primary">
                <p className="text-5xl md:text-7xl font-black mb-4">
                  <span className="text-neon-yellow">₹200</span>
                  <span className="text-foreground">/month</span>
                </p>
                <p className="text-xl text-muted-foreground">
                  Less than a McD meal. Everything you need to succeed.
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
            <h2 className="text-5xl md:text-7xl font-black mb-12 text-center">
              The <span className="text-neon-cyan">Numbers</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <Card className="p-8 bg-card/50 backdrop-blur-xl border-accent/50">
                <p className="text-sm text-muted-foreground mb-2">Year 1</p>
                <p className="text-4xl font-black text-neon-yellow mb-2">₹24 Cr</p>
                <p className="text-sm text-muted-foreground">~1L users ARR</p>
              </Card>

              <Card className="p-8 bg-card/50 backdrop-blur-xl border-secondary/50">
                <p className="text-sm text-muted-foreground mb-2">Year 2</p>
                <p className="text-4xl font-black text-neon-magenta mb-2">₹240 Cr</p>
                <p className="text-sm text-muted-foreground">~10L users ARR</p>
              </Card>

              <Card className="p-8 bg-card/50 backdrop-blur-xl border-primary/50">
                <p className="text-sm text-muted-foreground mb-2">Year 3</p>
                <p className="text-4xl font-black text-neon-cyan mb-2">₹2,400 Cr</p>
                <p className="text-sm text-muted-foreground">~1Cr users ARR</p>
              </Card>
            </div>

            <Card className="p-10 bg-card/80 backdrop-blur-xl border-primary/50 glow-cyan mb-16">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <p className="text-sm text-muted-foreground mb-2">Unit Economics</p>
                  <p className="text-5xl font-black">
                    <span className="text-neon-cyan">LTV/CAC:</span>{' '}
                    <span className="text-neon-yellow">60x</span>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">CAC</p>
                    <p className="font-bold text-lg">₹100</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">LTV</p>
                    <p className="font-bold text-lg">₹6,000</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Churn</p>
                    <p className="font-bold text-lg">8%/yr</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">NPS</p>
                    <p className="font-bold text-lg">72</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="text-center">
              <h3 className="text-4xl md:text-6xl font-black mb-6">
                <span className="text-neon-yellow">Make in India</span>
                <br />
                <span className="text-neon-cyan">Made for the World</span>
              </h3>
              <p className="text-xl text-muted-foreground mb-12">
                Scaling globally. Starting locally. Building for Gen-Z everywhere.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan text-lg px-8 py-6 font-bold"
                >
                  Schedule Call
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6 font-bold"
                >
                  Download Deck
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
