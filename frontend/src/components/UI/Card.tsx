import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-gray-900/20 backdrop-blur-sm border border-gray-100 dark:border-gray-700 ${className}`}
    >
      {children}
    </motion.div>
  );
};