import { FaFacebook, FaInstagram, FaTiktok, FaDiscord, FaWhatsapp } from "react-icons/fa";

// Agrega la propiedad hoverClass a cada red social
const navigation = {
  main: [
    { name: 'Nosotros', href: '#' },
    { name: 'Buscar Ticket', href: '#' },
    { name: 'Galería', href: '#' },
    { name: 'Términos y Condiciones', href: '#' },
    { name: 'Políticas de privacidad', href: '#' },
    { name: 'Contacto', href: '#' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: FaFacebook,
      hoverClass: 'hover:text-[#1877F3]', // Facebook blue
    },
    {
      name: 'Instagram',
      href: '#',
      icon: FaInstagram,
      hoverClass: 'hover:text-[#E4405F]', // Instagram pink
    },
    {
      name: 'TikTok',
      href: '#',
      icon: FaTiktok,
      hoverClass: 'hover:text-[#25F4EE]', // TikTok blue
    },
    {
      name: 'Discord',
      href: '#',
      icon: FaDiscord,
      hoverClass: 'hover:text-[#5865F2]', // Discord blurple
    },
    {
      name: 'Whatsapp',
      href: '#',
      icon: FaWhatsapp,
      hoverClass: 'hover:text-[#25D366]', // Whatsapp green
    },
  ],
}

export function Footer() {
  return (
    <footer className="w-full">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
        <nav aria-label="Footer" className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6">
          {navigation.main.map((item) => (
            <a key={item.name} href={item.href} className="text-gray-400 hover:text-white">
              {item.name}
            </a>
          ))}
        </nav>
        <div className="mt-16 flex justify-center gap-x-10">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-gray-400 ${item.hoverClass}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="size-6" />
            </a>
          ))}
        </div>
        <p className="mt-10 text-center text-sm/6 text-gray-400">&copy; 2025 Las Cámaras del Dragón. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
