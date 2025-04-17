import type React from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SocialButtonProps {
  icon: ReactNode;
  onClick: () => void;
}

export const SocialButton: React.FC<SocialButtonProps> = ({ icon, onClick }) => {
  return (
    <motion.button
      type="button"
      className="w-10 h-10 inline-flex justify-center items-center border border-gray-300 rounded-full shadow-xs bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.button>
  );
};
