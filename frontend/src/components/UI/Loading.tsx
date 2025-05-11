import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export const Loading = ({ size = 'md', text, className = '' }: LoadingProps) => {
  const sizeClass = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`flex flex-col items-center justify-center py-6 ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className={`text-blue-600 dark:text-blue-400 ${sizeClass[size]}`} />
      </motion.div>
      {text && <p className="mt-2 text-gray-600 dark:text-gray-400">{text}</p>}
    </div>
  );
};