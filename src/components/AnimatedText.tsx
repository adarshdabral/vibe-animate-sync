import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  staggerDelay?: number;
}

export const AnimatedText = ({ text, className = '', staggerDelay = 0.05 }: AnimatedTextProps) => {
  const letters = text.split('');
  
  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block animated-letter"
          style={{ '--letter-index': index } as React.CSSProperties}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * staggerDelay,
            ease: [0.68, -0.55, 0.265, 1.55]
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
};
