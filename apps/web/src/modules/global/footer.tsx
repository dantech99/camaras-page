"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTiktok, FaDiscord } from "react-icons/fa";

const socialMediaLinks = [
  {
    name: "Facebook",
    icon: FaFacebook,
    href: "#",
    color: "hover:text-blue-500",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "#",
    color: "hover:text-pink-400",
  },
  { name: "TikTok", icon: FaTiktok, href: "#", color: "hover:text-blue-400" },
  {
    name: "Discord",
    icon: FaDiscord,
    href: "#",
    color: "hover:text-purple-400",
  },
];

const navigationLinks = [
  { label: "BUSCAR TICKET", href: "#" },
  { label: "FOTÓGRAFOS", href: "#" },
  { label: "SOBRE NOSOTROS", href: "#" },
];

const secondaryLinks = [
  { label: "TERMINOS Y CONDICIONES", href: "#" },
  { label: "POLITICAS DE PRIVACIDAD", href: "#" },
  { label: "CONTACTO", href: "#" },
];

const headingClass =
  "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black font-unbounded text-primary-blue leading-[0.85] tracking-tight";
const linkClass =
  "block transition-colors duration-200 font-medium text-sm sm:text-base lg:text-lg";
const navLinkClass = `${linkClass} text-sm text-muted-foreground hover:text-primary-blue font-unbounded`;
const secLinkClass = `${linkClass} text-sm text-muted-foreground hover:text-primary-blue font-unbounded`;

const AnimatedLink = ({
  href,
  children,
  index,
}: {
  href: string;
  children: string;
  index: number;
}) => {
  return (
    <Link
      href={href}
      className="relative overflow-hidden inline-block h-6 flex items-center"
    >
      <motion.div
        className="font-unbounded font-semibold text-white cursor-pointer"
        whileHover="hover"
        initial="initial"
        variants={{
          initial: { y: 0 },
          hover: { y: -24 },
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        <span className="block text-white transition-transform duration-100 ease-out leading-6">
          {children}
        </span>
        <span className="absolute top-6 left-0 block text-primary-blue transition-transform duration-100 ease-out leading-6">
          {children}
        </span>
      </motion.div>
    </Link>
  );
};

export function Footer() {
  return (
    <footer className="text-primary-blue overflow-hidden bg-black w-full">
      <div className="w-full">
        <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-12">
          <div className="max-w-8xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16">
              <div className="lg:col-span-7 xl:col-span-8">
                <div className="space-y-1 sm:space-y-2">
                  {["LAS", "CÁMARAS", "DEL DRAGÓN"].map((text) => (
                    <h2 key={text} className={headingClass}>
                      {text}
                    </h2>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 xl:col-span-4 mt-6 lg:mt-0">
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-6 sm:gap-8 lg:gap-6 xl:gap-8">
                  <div className="flex-1">
                    <div className="space-y-3 sm:space-y-4">
                      {navigationLinks.map((link, index) => (
                        <motion.div
                          key={link.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{
                            duration: 0.2,
                            delay: index * 0.05,
                            ease: "easeOut",
                          }}
                          className="flex items-center"
                        >
                          <AnimatedLink href={link.href} index={index}>
                            {link.label}
                          </AnimatedLink>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-3 sm:space-y-4">
                      {secondaryLinks.map((link, index) => (
                        <motion.div
                          key={link.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{
                            duration: 0.2,
                            delay: index * 0.05,
                            ease: "easeOut",
                          }}
                          className="flex items-center"
                        >
                          <AnimatedLink href={link.href} index={index}>
                            {link.label}
                          </AnimatedLink>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 sm:mt-12 lg:mt-16 xl:mt-20">
              <div className="flex justify-center lg:justify-start">
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
                  {socialMediaLinks.map(({ name, icon: Icon, href, color }) => (
                    <Link
                      key={name}
                      href={href}
                      className={`text-primary-blue ${color} transition-all duration-200 p-2 sm:p-3 rounded-full hover:bg-white/10 hover:scale-110 transform active:scale-95`}
                      aria-label={`Visita nuestra página de ${name}`}
                    >
                      <Icon size={20} className="sm:size-6" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 sm:mt-12 lg:mt-16 border-t border-primary-blue/20 pt-6 sm:pt-8">
              <div className="text-center">
                <p className="text-primary-blue/60 text-xs sm:text-sm font-medium font-unbounded">
                  &copy; Las Cámaras del Dragón. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
