'use client'

import React, { useState } from "react";
import { Home, Search, Menu, X, Images, CalendarCheck, Users, Contact, CircleUserIcon } from "lucide-react";
import  Link  from "next/link";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Inicio", icon: Home, href: "/" },
    { name: "Somos", icon: CircleUserIcon, href: "/somos" },
    { name: "Fotógrafos", icon: Users, href: "/fotografos" },
    { name: "Agenda", icon: CalendarCheck, href: "/agenda" },
    { name: "Galería", icon: Images, href: "/galeria" },
    { name: "Contacto", icon: Contact, href: "/contacto" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-center p-4 z-50">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-full px-8 py-3">
          <div className="flex items-center space-x-6">
            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-purple-400 transition-colors duration-200"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                Logo
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="nav-item flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200 group"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Sidebar - Now Fullscreen */}
      <div
        className={`fixed inset-0 bg-gradient-to-b from-gray-900 via-purple-900 to-violet-900 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-6">
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="text-white hover:text-purple-400 transition-colors duration-200"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-[calc(100%-5rem)] px-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="mobile-nav-item flex items-center space-x-3 text-gray-300 hover:text-white py-6 px-8 rounded-lg transition-colors duration-200 text-xl w-full max-w-sm justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <item.icon className="w-7 h-7" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
