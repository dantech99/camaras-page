'use client'

import type React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Facebook, Github, Mail, Check, X } from 'lucide-react';
import { SocialButton } from './social-button';

interface SignInProps {
  onForgotPassword: () => void;
}

export const SignIn: React.FC<SignInProps> = ({ onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail) {
      setIsEmailValid(validateEmail(newEmail));
    } else {
      setIsEmailValid(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Iniciar sesión con:', { email, password, rememberMe });
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } },
    blur: { scale: 1 }
  };

  const validationIconVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { staggerChildren: 0.1 }
        }
      }}
    >
      <motion.h2 
        className="text-2xl font-bold text-center text-gray-800 mb-6"
        variants={inputVariants}
      >
        Bienvenido de Nuevo
      </motion.h2>
      
      <form onSubmit={handleSubmit}>
        <motion.div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo Electrónico
          </label>
          <div className="relative">
            <motion.input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                isEmailValid === true ? 'border-green-500 focus:ring-green-500' :
                isEmailValid === false ? 'border-red-500 focus:ring-red-500' :
                'border-gray-300 focus:ring-indigo-500'
              } pr-10`}
              placeholder="tu@correo.com"
              required
              whileFocus="focus"
              whileTap="focus"
              variants={inputVariants}
            />
            {isEmailValid !== null && (
              <div className="absolute right-3 inset-y-0 flex items-center pointer-events-none">
                <motion.div
                  variants={validationIconVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center justify-center w-5 h-5"
                >
                  {isEmailValid ? (
                    <Check className="w-5 h-5 text-green-500" strokeWidth={2.5} />
                  ) : (
                    <X className="w-5 h-5 text-red-500" strokeWidth={2.5} />
                  )}
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
        
        <motion.div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <div className="relative">
            <motion.input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 pr-10"
              placeholder="••••••••"
              required
              whileFocus="focus"
              whileTap="focus"
              variants={inputVariants}
            />
            <div className="absolute right-3 inset-y-0 flex items-center">
              <button
                type="button"
                className="flex items-center justify-center w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" strokeWidth={2} />
                ) : (
                  <Eye className="w-5 h-5" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </motion.div>
        
        <motion.div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <motion.input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Recordarme
            </label>
          </div>
          
          <motion.button
            type="button"
            onClick={onForgotPassword}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ¿Olvidaste tu contraseña?
          </motion.button>
        </motion.div>
        
        <motion.button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          whileHover={{ scale: 1.02, backgroundColor: "#4338ca" }}
          whileTap={{ scale: 0.98 }}
        >
          Iniciar Sesión
        </motion.button>
      </form>
      
      <motion.div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"/>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">O continuar con</span>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center gap-4">
          <SocialButton icon={<Github className="h-5 w-5" />} onClick={() => console.log('Iniciar sesión con GitHub')} />
          <SocialButton icon={<Facebook className="h-5 w-5" />} onClick={() => console.log('Iniciar sesión con Facebook')} />
          <SocialButton icon={<Mail className="h-5 w-5" />} onClick={() => console.log('Iniciar sesión con Google')} />
        </div>
      </motion.div>
    </motion.div>
  );
};
