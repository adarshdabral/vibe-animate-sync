import { motion } from 'framer-motion';

interface SectionNavProps {
  currentSection: number;
  onNavigate: (section: number) => void;
}

const sections = [
  { id: 0, label: 'Hero', progress: 0 },
  { id: 1, label: 'Problem', progress: 0.2 },
  { id: 2, label: 'Ecosystem', progress: 0.4 },
  { id: 3, label: 'Financials', progress: 0.85 },
];

export const SectionNav = ({ currentSection, onNavigate }: SectionNavProps) => {
  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onNavigate(section.progress)}
          className="group flex items-center gap-3"
          aria-label={`Navigate to ${section.label}`}
        >
          <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            {section.label}
          </span>
          <motion.div
            className={`w-2 h-2 rounded-full border-2 transition-colors ${
              currentSection === section.id
                ? 'border-primary bg-primary glow-cyan'
                : 'border-muted-foreground bg-transparent'
            }`}
            whileHover={{ scale: 1.5 }}
          />
        </button>
      ))}
    </nav>
  );
};
