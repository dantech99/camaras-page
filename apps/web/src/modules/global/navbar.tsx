"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@camaras/ui/src/components/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@camaras/ui/src/lib/utils";
import { authClient } from "@camaras/auth/client";

const links = [
  {
    name: "INICIO",
    href: "/",
  },
  {
    name: "GALERIA",
    href: "/galeria",
  },
  {
    name: "NOSOTROS",
    href: "/nosotros",
  },
  {
    name: "CONTACTO",
    href: "/contacto",
  },
  {
    name: "AGENDA",
    href: "/agenda",
  },
];

// Componente para el efecto hover de los links
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
        <span className="absolute top-6 left-0 block text-primary-foreground transition-transform duration-100 ease-out leading-6">
          {children}
        </span>
      </motion.div>
    </Link>
  );
};

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = authClient.useSession();

  const role = session?.user?.role;
  console.log(role);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed z-50 top-0 left-0 right-0 m-8">
      <div className="flex justify-between items-center h-12">
        <div className="flex items-center bg-primary-blue">
          {/* Botón de menú */}
          <Button onClick={toggleMenu} variant="landing">
            MENU
          </Button>

          {/* Contenedor de links con animación */}
          <div className="flex items-center h-full">
            <AnimatePresence mode="wait">
              {isMenuOpen && (
                <motion.div
                  initial={{
                    width: 0,
                    opacity: 0,
                  }}
                  animate={{
                    width: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    width: 0,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    width: { duration: 0.3 },
                    opacity: { duration: 0.15 },
                  }}
                  className="flex items-center gap-8 overflow-hidden ml-6"
                >
                  {links.map((link, index) => (
                    <motion.div
                      key={link.name}
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
                        {link.name}
                      </AnimatedLink>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {role === "admin" ? (
          <Link
            href="/admin"
            className={cn(
              buttonVariants({
                variant: "landing",
              })
            )}
          >
            {session.user?.name.toUpperCase()}
          </Link>
        ) : role === "photographer" ? (
          <Link
            href="/photographer"
            className={cn(
              buttonVariants({
                variant: "landing",
              })
            )}
          >
            {session.user?.name.toUpperCase()}
          </Link>
        ) : (
          <Link
            href="/auth"
            className={cn(
              buttonVariants({
                variant: "landing",
              })
            )}
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
}
