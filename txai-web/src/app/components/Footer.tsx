import Link from "next/link";
import {
  //Facebook,
  //Twitter,
  Instagram,
  MessageCircle,
  //Youtube,
  Globe,
  ChevronDown,
} from "lucide-react";

const socialLinks = [
  //{ href: "#", icon: Facebook, label: "Facebook" },
  //{ href: "#", icon: Twitter, label: "X (Twitter)" },
  { href: "https://www.instagram.com/use.txai/", icon: Instagram, label: "Instagram" },
  { href: "#", icon: MessageCircle, label: "Whatsapp" },
  //{ href: "#", icon: Youtube, label: "YouTube" },
];

const getHelpLinks = [
  { href: "#", label: "Preguntas frecuents" },
  { href: "#", label: "Envío" },
  { href: "#", label: "Devoluciones y cambios" },
  { href: "#", label: "Contáctanos" },
];

const companyLinks = [
  { href: "#", label: "Nuestra historia" },
  { href: "#", label: "Registro de marca" },
];

const guidesLinks = [
  { href: "#", label: "Guías de tallas" },
  { href: "#", label: "Tecnología de la tela" },
  { href: "#", label: "Instrucciones de cuidado" },
];

const legalLinks = [
  { href: "#", label: "Términos de uso" },
  { href: "#", label: "Política de privacidad" },
  { href: "#", label: "Declaración de accesibilidad" },
];

export default function Footer() {
  return (
    <footer className="bg-[#282828] text-[#A6A6A6] mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-12 md:px-12">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-block text-2xl font-bold uppercase tracking-tight text-[#A6A6A6] hover:text-white transition-colors mb-1"
            >
              TXAI
            </Link>
            <p className="text-sm mb-6">#EleganciaEnCadaGuardia</p>
            <div className="flex gap-4">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <Icon size={20} strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </div>

          {/* Get Help column */}
          <div>
            <h3 className="font-bold text-[#A6A6A6] uppercase tracking-wide text-sm mb-4">
              Obtén ayuda
            </h3>
            <ul className="space-y-2 text-sm">
              {getHelpLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Guides column */}
          <div>
            <h3 className="font-bold text-[#A6A6A6] uppercase tracking-wide text-sm mb-4">
              Nuestra empresa
            </h3>
            <ul className="space-y-2 text-sm mb-6">
              {companyLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-bold text-[#A6A6A6] uppercase tracking-wide text-sm mb-4">
              Guías
            </h3>
            <ul className="space-y-2 text-sm">
              {guidesLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h3 className="font-bold text-[#A6A6A6] uppercase tracking-wide text-sm mb-4">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              {legalLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#404040] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-sm">
                © {new Date().getFullYear()} TXAI. Todos los derechos reservados.
              </p>
              <div className="flex gap-2 mt-2 text-sm">
                <Link href="#" className="hover:text-white transition-colors">
                  Términos de uso
                </Link>
                <span>•</span>
                <Link href="#" className="hover:text-white transition-colors">
                  Política de privacidad
                </Link>
              </div>
            </div>

            {/* Locale selector */}
            <button
              type="button"
              className="flex items-center gap-2 text-sm hover:text-white transition-colors"
              aria-label="Cambiar país e idioma"
            >
              <Globe size={18} />
              <span>España | ES</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
