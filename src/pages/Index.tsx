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
              <span className="text-deep-blue">VroPay</span>
              <br />
              <span className="text-accent-blue">Finance</span><br/>
              <span className="text-foreground">EcoSystem </span>{' '}
            </h1>
            {/*<p className="text-xl md:text-2xl text-muted-foreground mb-8 font-mono">
              (post-money <span className="text-deep-blue font-bold">₹100 Cr</span>)
            </p>*/}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-12"
          >
            <Card className="inline-block p-8 bg-card/95 backdrop-blur-xl border-border soft-shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-deep-blue">
                VroPay : Dream, Build, Launch
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

          {/*<motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground soft-shadow text-lg px-8 py-6 font-bold"
            >
              View Pitch Deck
            </Button>
          </motion.div>*/}
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
              We Understand Your <span className="text-accent-blue">Struggle</span>
            </h2>
            <p className="text-center text-lg text-muted-foreground mb-12">
              Launching a startup is tough — especially if you’re first-time founder in a Tier 2/3 city. Most give up because they can’t find reliable guidance, trustworthy mentors, or real-time support.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <Card className="p-6 bg-card/95 backdrop-blur-xl border-border soft-shadow">
                <div className="text-4xl mb-4">💔</div>
                <h3 className="text-xl font-bold mb-2 text-deep-blue">Fragmented Knowledge</h3>
                <p className="text-muted-foreground">
                  We bring everything you need to learn and grow — no more scattered platforms.
                </p>
              </Card>

              <Card className="p-6 bg-card/95 backdrop-blur-xl border-border soft-shadow">
                <div className="text-4xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold mb-2 text-deep-blue">Scams & Uncertainty</h3>
                <p className="text-muted-foreground">
                  We connect you with verified mentors and trusted resources.
                </p>
              </Card>

              <Card className="p-6 bg-card/95 backdrop-blur-xl border-border soft-shadow">
                <div className="text-4xl mb-4">❌</div>
                <h3 className="text-xl font-bold mb-2 text-deep-blue">No Real-Time Help</h3>
                <p className="text-muted-foreground">
                  Our platform gives you instant support exactly when you need it.
                </p>
              </Card>
            </div>

            <div className="text-center">
              <Card className="inline-block p-8 bg-accent-blue/10 backdrop-blur-xl border-accent-blue soft-shadow-lg">
                <h3 className="text-3xl font-bold mb-4 text-deep-blue">
                  VroPay Bridge solves it all — one platform, complete solutions, real-time support.
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
                  <li>Get curated playbooks, certifications, and expert sessions to master startup essentials</li>
                </ul>
              </Card>

              <Card className="p-8 bg-card/95 backdrop-blur-xl border-deep-blue soft-shadow-lg">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold mb-4 text-deep-blue">Entrepreneurship</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Access incubation, community support, AI-powered pitch practice, and hiring tools.</li>
                </ul>
              </Card>

              <Card className="p-8 bg-card/95 backdrop-blur-xl border-primary soft-shadow-lg">
                <div className="text-6xl mb-4">💳</div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Finance</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Manage funds, raise capital, and get credit without the hassle.</li>
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
                  - less than a meal out, full access to launch and grow your startup.
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
              Strong Foundations.<span className="text-accent-blue"> Scalable Opportunities.</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              
              <Card className="p-8 bg-card/95 backdrop-blur-xl border-border soft-shadow">
                <p className="text-4xl font-black text-deep-blue mb-2 font-mono">Proven growth potential</p>
                <p className="text-sm text-muted-foreground">~our tools and guidance are designed to scale with you.</p>
              </Card>

              <Card className="p-8 bg-card/95 backdrop-blur-xl border-border soft-shadow">
                <p className="text-4xl font-black text-deep-blue mb-2 font-mono">Metrics that matter</p>
                <p className="text-sm text-muted-foreground">~high user retention, strong support systems, and a community that grows</p>
              </Card>

              <Card className="p-8 bg-card/95 backdrop-blur-xl border-border soft-shadow">
                <p className="text-4xl font-black text-deep-blue mb-2 font-mono">Real-Time Mentorship</p>
                <p className="text-sm text-muted-foreground">~Connect with verified mentors whenever you face challenges.</p>
              </Card>

              <Card className="p-8 bg-card/95 backdrop-blur-xl border-border soft-shadow">
                <p className="text-4xl font-black text-deep-blue mb-2 font-mono">Incubation & Resources</p>
                <p className="text-sm text-muted-foreground">~Access AI-powered pitch practice, hiring tools, and incubation programs tailored for first-time founders.</p>
              </Card>

              <Card className="p-8 bg-card/95 backdrop-blur-xl border-border soft-shadow">
                <p className="text-4xl font-black text-deep-blue mb-2 font-mono">Affordable Access</p>
                <p className="text-sm text-muted-foreground">~Premium features for just ₹200/month — less than a meal out, full access to launch and grow your venture.</p>
              </Card>

              <Card className="p-8 bg-card/95 backdrop-blur-xl border-border soft-shadow">
                <p className="text-4xl font-black text-deep-blue mb-2 font-mono">Trusted & Verified</p>
                <p className="text-sm text-muted-foreground">~Backed by investors, accelerators, and partners to ensure credibility and reliability.</p>
              </Card>
            </div>

            <div className="text-center">
              <h3 className="text-4xl md:text-6xl font-black mb-6 font-display">
                <span className="text-deep-blue">Make in India</span>
                <br />
                <span className="text-accent-blue">Made for the World</span>
              </h3>
              <p className="text-xl text-muted-foreground mb-12">
                Scaling globally. Starting locally. Building for Gen-Z everywhere.
              </p>

              {/*<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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
                  Join as Founder
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
              </Card>*/}

            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
