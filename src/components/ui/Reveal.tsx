import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { fadeUp } from '../../lib/motion';

export function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6, ease: 'easeOut', delay }} className={cn(className)}>
      {children}
    </motion.div>
  );
}
