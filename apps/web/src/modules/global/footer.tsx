import Link from "next/link";
import Image from "next/image";
import { Twitter, Instagram, ChevronRight, Facebook } from "lucide-react";

const InfoLikns = [
  { name: "Quienes Somos", href: "/somos" },
  { name: "Misión y Visión", href: "/" },
  { name: "Nuestro Equipo", href: "/" },
  { name: "Testimonios", href: "/" },
];

const accountLinks = [
  { name: "Perfil", href: "/" },
  { name: "Agendar", href: "/" },
  { name: "Mi Carrito", href: "/" },
];

export function Footer() {
  return (
    <footer className="w-full bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
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
              <span className="text-xl font-bold tracking-tight">
                Las Cámaras del Dragón
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Creating innovative solutions for tomorrow's challenges. Join us
              on our journey to the future.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Ayuda y Contacto
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500" />
            </h3>
            <ul className="space-y-2">
              {InfoLikns.map((item) => (
                <li key={item.name} className="group">
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center group-hover:translate-x-1 duration-200"
                  >
                    <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Mi Cuenta
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500" />
            </h3>
            <ul className="space-y-2">
              {accountLinks.map((item) => (
                <li key={item.name} className="group">
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center group-hover:translate-x-1 duration-200"
                  >
                    <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Contáctenos
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500" />
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="mailto:lascamarasdeldragon@gmail.com">
                  lascamarasdeldragon@gmail.com
                </a>
              </li>
              <li>+57 312 1235467</li>
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

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} Las Cámaras del Dragón. Todos los
            derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Políticas de privacidad
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Términos y condiciones
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
