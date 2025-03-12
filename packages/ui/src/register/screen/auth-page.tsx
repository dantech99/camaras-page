'use client';

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { SignIn } from "../components/sign-in";
import { SignUp } from "../components/sign-up";
import { ForgotPassword } from "../components/forgot-password";
import { Sparkles } from "lucide-react";

type AuthMode = "signin" | "signup" | "forgot-password";

export const AuthPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("signin");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="w-full max-w-[320px] sm:max-w-[380px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-gray-900/40 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-blue-500/10"
          variants={itemVariants}
        >
          <div className="p-4 sm:p-6">
            <div className="flex justify-center mb-4">
              <motion.div
                className="bg-blue-600 p-2.5 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="h-5 w-5 text-white" />
              </motion.div>
            </div>

            <motion.div
              className="flex justify-center space-x-3 mb-6"
              variants={itemVariants}
            >
              <button
                type="button"
                onClick={() => setAuthMode("signin")}
                className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all ${
                  authMode === "signin"
                    ? "bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                    : "text-gray-300 hover:text-blue-400"
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("signup")}
                className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all ${
                  authMode === "signup"
                    ? "bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                    : "text-gray-300 hover:text-blue-400"
                }`}
              >
                Registrarse
              </button>
            </motion.div>

            <motion.div
              key={authMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="text-gray-100"
            >
              {authMode === "signin" && (
                <SignIn
                  onForgotPassword={() => setAuthMode("forgot-password")}
                />
              )}
              {authMode === "signup" && <SignUp />}
              {authMode === "forgot-password" && (
                <ForgotPassword onBackToSignIn={() => setAuthMode("signin")} />
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};