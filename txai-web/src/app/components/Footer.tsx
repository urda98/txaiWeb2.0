import Link from "next/link";
import {
  //Facebook,
  //Twitter,
  Instagram,
  MessageCircle,
  Mail,
  //Youtube,
  Globe,
  ChevronDown,
} from "lucide-react";

const socialLinks = [
  //{ href: "#", icon: Facebook, label: "Facebook" },
  //{ href: "#", icon: Twitter, label: "X (Twitter)" },
  { href: "https://www.instagram.com/use.txai/", icon: Instagram, label: "Instagram" },
  { href: "#", icon: MessageCircle, label: "Whatsapp" },
  { href: "mailto:txaiindumentaria@gmail.com", icon: Mail, label: "Email" },
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
    <footer className="w-full min-w-0 bg-[#212121] text-[#B0B0B0] mt-auto overflow-x-hidden box-border">
      <div className="w-full max-w-[100vw] box-border mx-auto px-4 py-12 sm:px-5 sm:py-14 md:px-6 md:py-14 lg:px-8 lg:py-16 xl:px-10">
        {/* Top section */}
        <div className="grid grid-cols-1 min-w-0 gap-10 pb-12 sm:gap-12 sm:pb-14 md:grid-cols-2 lg:grid-cols-6 lg:gap-14 lg:pb-16">
          {/* Brand column */}
          <div className="min-w-0 lg:col-span-2">
            <Link
              href="/"
              className="inline-block text-3xl font-bold uppercase tracking-tight text-white hover:opacity-90 transition-opacity mb-2"
            >
              TXAI
            </Link>
            <p className="text-sm uppercase tracking-wide text-white/90 mb-8">
              #EleganciaEnCadaGuardia
            </p>
            <div className="flex gap-5">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:opacity-80 transition-opacity"
                >
                  <Icon size={22} strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </div>

          {/* Get Help column */}
          <div className="min-w-0">
            <h3 className="font-bold text-white uppercase tracking-wide text-sm mb-5">
              Obtén ayuda
            </h3>
            <ul className="space-y-3 text-sm">
              {getHelpLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[#B0B0B0] hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div className="min-w-0">
            <h3 className="font-bold text-white uppercase tracking-wide text-sm mb-5">
              Nuestra empresa
            </h3>
            <ul className="space-y-3 text-sm">
              {companyLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[#B0B0B0] hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guías column */}
          <div className="min-w-0">
            <h3 className="font-bold text-white uppercase tracking-wide text-sm mb-5">
              Guías
            </h3>
            <ul className="space-y-3 text-sm">
              {guidesLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[#B0B0B0] hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div className="min-w-0">
            <h3 className="font-bold text-white uppercase tracking-wide text-sm mb-5">
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              {legalLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[#B0B0B0] hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#4A4A4A] pt-8 min-w-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 min-w-0">
            <div className="min-w-0 w-full md:w-auto space-y-1">
              <p className="text-sm text-[#B0B0B0] break-words">
                © {new Date().getFullYear()} TXAI. Todos los derechos reservados.
              </p>
              <p className="text-sm text-[#B0B0B0]">
                <Link href="#" className="hover:text-white transition-colors">
                  Términos de uso
                </Link>
                <span className="mx-1.5">·</span>
                <Link href="#" className="hover:text-white transition-colors">
                  Política de privacidad
                </Link>
              </p>
            </div>

            {/* Locale selector */}
            <button
              type="button"
              className="flex items-center gap-2 text-sm text-[#B0B0B0] hover:text-white transition-colors shrink-0"
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
