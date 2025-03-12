import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, Instagram, Linkedin, ChevronRight } from "lucide-react"

export function FuturisticFooter() {
  return (
    <footer className="w-full bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">FutureSpace</span>
            </div>
            <p className="text-gray-400 text-sm">
              Creating innovative solutions for tomorrow's challenges. Join us on our journey to the future.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500" />
            </h3>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Portfolio", "Blog"].map((item) => (
                <li key={item} className="group">
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group-hover:translate-x-1 duration-200"
                  >
                    <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Services
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"/>
            </h3>
            <ul className="space-y-2">
              {["Web Development", "App Design", "UI/UX Design", "Consulting", "Digital Marketing"].map((item) => (
                <li key={item} className="group">
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group-hover:translate-x-1 duration-200"
                  >
                    <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500" />
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 Future Avenue</li>
              <li>Tech City, TC 10101</li>
              <li>contact@futurespace.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
            <div className="mt-4">
              <Link
                href="#"
                className="px-4 py-2 text-sm bg-gradient-to-r from-purple-500 to-blue-500 rounded-md hover:opacity-90 transition-opacity inline-block"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} FutureSpace. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

