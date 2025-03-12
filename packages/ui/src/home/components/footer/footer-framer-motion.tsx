"use client"

import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, Instagram, Linkedin, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function FuturisticFooter() {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.1 })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: 0.1,
      },
    },
  }

  const linkVariants = {
    initial: { x: 0 },
    hover: { x: 10, transition: { type: "spring", stiffness: 400 } },
  }

  const glowVariants = {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
      opacity: [0.5, 0.7, 0.5],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
      },
    },
  }

  const quickLinks = ["Home", "About", "Services", "Portfolio", "Blog"]
  const services = ["Web Development", "App Design", "UI/UX Design", "Consulting", "Digital Marketing"]

  return (
    <footer ref={footerRef} className="w-full bg-black text-white border-t border-gray-800 relative overflow-hidden">
      {/* Background glow effects */}
      <motion.div
        className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl"
        variants={glowVariants}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"
        variants={glowVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 1 }}
      />

      <motion.div
        className="container mx-auto px-4 py-12 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description section */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.div className="flex items-center space-x-2" variants={logoVariants}>
              <motion.div
                className="relative w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full overflow-hidden"
                whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
              >
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </motion.div>
              <motion.span
                className="text-xl font-bold tracking-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                FutureSpace
              </motion.span>
            </motion.div>
            <motion.p
              className="text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Creating innovative solutions for tomorrow's challenges. Join us on our journey to the future.
            </motion.p>
            <motion.div className="flex space-x-4 pt-2" variants={itemVariants}>
              {[Twitter, Instagram, Github, Linkedin].map((Icon, index) => (
                <motion.div
                  key={`${index + 1}`}
                  whileHover={{ y: -5, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">Social Media</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-lg font-semibold mb-4 relative inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Quick Links
              <motion.span
                className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: "3rem" }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </motion.h3>
            <ul className="space-y-2">
              {quickLinks.map((item, index) => (
                <motion.li key={item} variants={itemVariants} custom={index} transition={{ delay: 0.3 + index * 0.1 }}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <motion.div
                      className="flex items-center"
                      variants={linkVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" />
                      {item}
                    </motion.div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-lg font-semibold mb-4 relative inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Services
              <motion.span
                className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: "3rem" }}
                transition={{ delay: 0.7, duration: 0.8 }}
             />
            </motion.h3>
            <ul className="space-y-2">
              {services.map((item, index) => (
                <motion.li key={item} variants={itemVariants} custom={index} transition={{ delay: 0.4 + index * 0.1 }}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <motion.div
                      className="flex items-center"
                      variants={linkVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" />
                      {item}
                    </motion.div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-lg font-semibold mb-4 relative inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Contact Us
              <motion.span
                className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: "3rem" }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </motion.h3>
            <motion.ul className="space-y-2 text-gray-400" variants={containerVariants}>
              {["123 Future Avenue", "Tech City, TC 10101", "contact@futurespace.com", "+1 (555) 123-4567"].map(
                (item, index) => (
                  <motion.li
                    key={item}
                    variants={itemVariants}
                    custom={index}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {item}
                  </motion.li>
                ),
              )}
            </motion.ul>
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, type: "spring" }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#"
                  className="px-4 py-2 text-sm bg-gradient-to-r from-purple-500 to-blue-500 rounded-md hover:opacity-90 transition-opacity inline-block"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.p
            className="text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            © {new Date().getFullYear()} FutureSpace. All rights reserved.
          </motion.p>
          <motion.div
            className="flex space-x-6 mt-4 md:mt-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            {["Privacy Policy", "Terms of Service", "Cookies"].map((item, index) => (
              <motion.div key={item} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                  {item}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  )
}

