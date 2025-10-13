import { motion } from 'framer-motion';

interface ScrollProgressProps {
  progress: number;
}

export const ScrollProgress = ({ progress }: ScrollProgressProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-muted/30 z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
        style={{ width: `${progress * 100}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};
