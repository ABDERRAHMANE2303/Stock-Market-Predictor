import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

type AlertType = 'info' | 'warning' | 'success' | 'error';

interface AlertProps {
  type: AlertType;
  message: string;
  className?: string;
}

export const Alert = ({ type, message, className = '' }: AlertProps) => {
  const typeConfig = {
    info: {
      icon: <Info className="h-5 w-5" />,
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-700 dark:text-blue-300',
      iconColor: 'text-blue-500 dark:text-blue-400',
    },
    warning: {
      icon: <AlertTriangle className="h-5 w-5" />,
      bg: 'bg-amber-50 dark:bg-amber-900/30',
      border: 'border-amber-200 dark:border-amber-800',
      text: 'text-amber-700 dark:text-amber-300',
      iconColor: 'text-amber-500 dark:text-amber-400',
    },
    success: {
      icon: <CheckCircle className="h-5 w-5" />,
      bg: 'bg-green-50 dark:bg-green-900/30',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-700 dark:text-green-300',
      iconColor: 'text-green-500 dark:text-green-400',
    },
    error: {
      icon: <XCircle className="h-5 w-5" />,
      bg: 'bg-red-50 dark:bg-red-900/30',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-700 dark:text-red-300',
      iconColor: 'text-red-500 dark:text-red-400',
    },
  };

  const { icon, bg, border, text, iconColor } = typeConfig[type];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex p-4 ${bg} ${border} border rounded-lg ${className}`}
    >
      <div className={`mr-3 ${iconColor}`}>{icon}</div>
      <div className={text}>{message}</div>
    </motion.div>
  );
};