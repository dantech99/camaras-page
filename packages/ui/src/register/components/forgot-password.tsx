'use client'

import type React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, X } from 'lucide-react';

interface ForgotPasswordProps {
  onBackToSignIn: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBackToSignIn }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    if (isEmailValid) {
      console.log('Restablecer contraseña para:', email);
      setIsSubmitted(true);
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
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
      <motion.button
        type="button"
        onClick={onBackToSignIn}
        className="flex items-center text-indigo-600 hover:text-indigo-500 mb-6"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Volver a iniciar sesión
      </motion.button>
      
      <motion.h2 
        className="text-2xl font-bold text-center text-gray-800 mb-6"
        variants={itemVariants}
      >
        Restablecer Tu Contraseña
      </motion.h2>
      
      {!isSubmitted ? (
        <>
          <motion.p 
            className="text-gray-600 text-center mb-6"
            variants={itemVariants}
          >
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </motion.p>
          
          <form onSubmit={handleSubmit}>
            <motion.div className="mb-6">
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
            
            <motion.button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              variants={itemVariants}
              whileHover={{ scale: 1.02, backgroundColor: "#4338ca" }}
              whileTap={{ scale: 0.98 }}
              disabled={!isEmailValid}
            >
              Enviar Enlace
            </motion.button>
          </form>
        </>
      ) : (
        <motion.div 
          className="text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <title>Forgot Password</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Revisa tu correo</h3>
          <p className="text-gray-600 mb-6">
            Hemos enviado un enlace para restablecer tu contraseña a <span className="font-medium">{email}</span>
          </p>
          <motion.button
            type="button"
            onClick={onBackToSignIn}
            className="text-indigo-600 hover:text-indigo-500 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Volver a iniciar sesión
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};