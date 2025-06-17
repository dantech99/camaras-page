import Link from "next/link";
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
  { name: "TikTok",
    icon: FaTiktok,
    href: "#",
    color: "hover:text-blue-400" },
  {
    name: "Discord",
    icon: FaDiscord,
    href: "#",
    color: "hover:text-purple-400",
  },
];

const navigationLinks = [
  { label: "TALENT POOL", href: "#" },
  { label: "CONFERENCES", href: "#" },
  { label: "ONLINE COURSES", href: "#" },
];

const secondaryLinks = [
  { label: "BLOG", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "CONTACT", href: "#" },
  { label: "CREDITS", href: "#" },
];

const headingClass =
  "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black font-unbounded text-primary-blue leading-[0.85] tracking-tight";
const linkClass =
  "block transition-colors duration-200 font-medium text-sm sm:text-base lg:text-lg";
const navLinkClass = `${linkClass} text-muted-foreground hover:text-primary-blue hover:underline underline-offset-9 decoration-2 decoration-primary-blue/20`;
const secLinkClass = `${linkClass} text-muted-foreground hover:text-primary-blue hover:underline underline-offset-9 decoration-2 decoration-primary-blue/20`;

export function Footer() {
  return (
    <footer className="text-primary-blue overflow-hidden">
      <div className="w-full">
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-20">
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
                      {navigationLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className={navLinkClass}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-3 sm:space-y-4">
                      {secondaryLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className={secLinkClass}
                        >
                          {link.label}
                        </Link>
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
              <div className="text-center lg:text-left">
                <p className="text-primary-blue/60 text-xs sm:text-sm font-medium">
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
