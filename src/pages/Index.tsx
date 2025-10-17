import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas3D } from '@/components/Canvas3D';
import { ScrollProgress } from '@/components/ScrollProgress';
import { SectionNav } from '@/components/SectionNav';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';

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
    <div ref={containerRef} className="relative min-h-screen bg-gradient-hero overflow-x-hidden">
      <ScrollProgress progress={scrollProgress} />
      <SectionNav currentSection={currentSectionIndex} onNavigate={handleNavigate} />
      <Canvas3D scrollProgress={scrollProgress} currentSection={currentSection} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-secondary">India's First Founder OS</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold text-secondary leading-tight"
          >
            One Platform.
            <br />
            A <span className="bg-gradient-primary bg-clip-text text-transparent">₹100 Cr</span> Vision.
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <p className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ₹10 Crore for 10%
            </p>
            <p className="text-2xl text-muted-foreground">
              (post-money ₹100 Cr)
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow text-white text-lg px-8 py-6 rounded-xl shadow-soft transition-bounce group"
            >
              View Deck
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-smooth" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-secondary text-center"
          >
            Real Pain. <span className="text-primary">Real People.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto text-center"
          >
            Millions of aspiring founders stuck in broken systems. 
            <span className="font-bold text-primary"> 90% of Tier 2/3 founders give up pre-launch.</span>
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: "🪤", title: "Scams", desc: "Unverified mentors and fake courses", delay: 0 },
              { icon: "📉", title: "No Literacy", desc: "Fragmented financial knowledge", delay: 0.1 },
              { icon: "🧾", title: "No Capital", desc: "Limited access to funding", delay: 0.2 }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.delay }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card className="p-6 glass-effect hover:shadow-card transition-smooth cursor-pointer group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-bounce">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-secondary mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto space-y-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-secondary">
              A Single Engine. <span className="bg-gradient-primary bg-clip-text text-transparent">3 Growth Levers.</span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Users, 
                emoji: "📘",
                title: "Education", 
                items: ["Startup Tuition", "Playbooks", "Expert Mentorship"],
                delay: 0 
              },
              { 
                icon: Zap, 
                emoji: "🤝",
                title: "Entrepreneurship", 
                items: ["Community", "Incubation", "Hiring Support"],
                delay: 0.1 
              },
              { 
                icon: TrendingUp, 
                emoji: "💳",
                title: "Finance", 
                items: ["Personal Finance", "Credit Access", "Lending Support"],
                delay: 0.2 
              }
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: pillar.delay }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
              >
                <Card className="p-8 glass-effect hover:shadow-glow transition-smooth cursor-pointer group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-smooth" />
                  <div className="relative space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl group-hover:scale-110 transition-bounce">{pillar.emoji}</div>
                      <pillar.icon className="w-8 h-8 text-primary opacity-50" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary">{pillar.title}</h3>
                    <ul className="text-muted-foreground space-y-2">
                      {pillar.items.map((item, j) => (
                        <motion.li 
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: pillar.delay + 0.1 * j }}
                        >
                          • {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="text-center p-12 gradient-card rounded-3xl border-2 border-primary/20 shadow-glow cursor-pointer"
          >
            <p className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ₹200/month
            </p>
            <p className="text-xl text-muted-foreground mt-4">
              Cheaper than a McD Meal 🍔
            </p>
          </motion.div>
        </div>
      </section>

      {/* Financials Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto space-y-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-secondary">
              Strong Economics. <span className="bg-gradient-primary bg-clip-text text-transparent">Scalable Vision.</span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { year: "Year 1", arr: "₹24 Cr", users: "~1L users", delay: 0 },
              { year: "Year 2", arr: "₹240 Cr", users: "~10L users", delay: 0.1 },
              { year: "Year 3", arr: "₹2400 Cr", users: "~1Cr users", delay: 0.2 }
            ].map((data, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: data.delay }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="p-6 glass-effect hover:shadow-glow transition-smooth cursor-pointer text-center space-y-2 group">
                  <p className="text-sm text-muted-foreground">{data.year}</p>
                  <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent font-mono group-hover:scale-110 transition-bounce inline-block">
                    {data.arr} ARR
                  </p>
                  <p className="text-sm text-muted-foreground">{data.users}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="p-8 glass-effect hover:shadow-glow transition-smooth cursor-pointer">
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary mb-2">Unit Economics</p>
                <p className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent font-mono">
                  LTV/CAC: 60x
                </p>
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 glass-effect shadow-card">
              <h3 className="text-2xl font-bold text-secondary mb-6 text-center">Use of Funds</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { label: "Product & Tech", percent: 40, delay: 0 },
                  { label: "GTM", percent: 30, delay: 0.1 },
                  { label: "Community & Partnerships", percent: 20, delay: 0.2 },
                  { label: "Ops", percent: 10, delay: 0.3 }
                ].map((fund, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: fund.delay }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{fund.label}</span>
                      <span className="font-bold text-primary">{fund.percent}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${fund.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: fund.delay + 0.2, ease: "easeOut" }}
                        className="h-full bg-gradient-primary"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center p-12 gradient-card rounded-3xl shadow-glow"
          >
            <p className="text-5xl md:text-6xl font-bold text-secondary">
              Make in India <motion.span 
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block text-primary"
              >→</motion.span> Made for the World 🌍
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
