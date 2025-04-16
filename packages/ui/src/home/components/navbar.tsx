'use client'

import React, { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@camaras/ui/src/components/ui/dialog";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "Somos", href: "/somos" },
    { name: "Fotógrafos", href: "/fotografos" },
    { name: "Agenda", href: "/agenda" },
    { name: "Galería", href: "/galeria" },
    { name: "Contacto", href: "/contacto" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 180);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/20 backdrop-blur-md border-cyan-500/20' : 'bg-transparent'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left section - Logo and Search */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-cyan-600">
                  Logo
                </span>
              </Link>

              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200">
                    <Search className="h-5 w-5" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-gray-900 border-cyan-500/20">
                  <DialogHeader>
                    <DialogTitle className="text-cyan-400">Busca tu ticket</DialogTitle>
                  </DialogHeader>
                  <div className="relative mt-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-cyan-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Ingresa tu número de ticket..."
                      className="block w-full pl-10 pr-3 py-2 border border-cyan-500/30 rounded-md bg-black/30 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Center section - Navigation links */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                >
                  <span className="text-sm font-medium">{item.name}</span>
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-linear-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              ))}
            </div>

            {/* Right section - Login button */}
            <div className="hidden md:flex items-center">
              <button className="px-4 py-2 rounded-md border border-cyan-500/30 bg-black/30 text-cyan-400 hover:bg-cyan-500/10 transition-colors duration-200">
                Iniciar sesión
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-cyan-400 focus:outline-hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        className={`fixed inset-0 z-50 md:hidden ${isMenuOpen ? 'block' : 'hidden'
          }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xs" onClick={() => setIsMenuOpen(false)} />

        <motion.div
          className="relative h-full w-full"
          initial={{ x: '100%' }}
          animate={{ x: isMenuOpen ? '0%' : '100%' }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-linear-to-b from-gray-900 via-purple-900 to-violet-900">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-cyan-400"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="px-4 py-6">
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-cyan-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="block w-full pl-10 pr-3 py-2 border border-cyan-500/30 rounded-full bg-black/30 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
                />
              </div>

              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <button className="w-full px-4 py-2 rounded-md border border-cyan-500/30 bg-black/30 text-cyan-400 hover:bg-cyan-500/10 transition-colors duration-200">
                  Iniciar sesión
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
