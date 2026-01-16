import { Link } from "react-router";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Car,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />

      <div className="container-custom relative">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Car className="w-7 h-7 text-navy-900" />
              </div>
              <div>
                <span className="text-2xl font-bold">AMSA</span>
                <span className="block text-xs text-navy-300 -mt-1">
                  Autos Seminuevos
                </span>
              </div>
            </Link>
            <p className="text-navy-300 mb-6 leading-relaxed">
              Líderes en seminuevos certificados en CDMX desde 1978.
              Tu próximo auto te espera con nosotros.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center hover:bg-navy-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center hover:bg-navy-700 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {[
                { href: "/inventario", label: "Ver Inventario" },
                { href: "/servicios", label: "Servicios" },
                { href: "/nosotros", label: "Sobre Nosotros" },
                { href: "/contacto", label: "Contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-navy-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Servicios</h4>
            <ul className="space-y-3">
              {[
                "Compra de Autos",
                "Venta de Seminuevos",
                "Financiamiento",
                "Avalúos",
                "Toma a Cuenta",
              ].map((service) => (
                <li key={service}>
                  <span className="text-navy-300">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:5556011787"
                  className="flex items-start gap-3 text-navy-300 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>
                    (55) 5601-1787
                    <br />
                    (55) 5601-7250
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@autosamsa.com.mx"
                  className="flex items-center gap-3 text-navy-300 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span>info@autosamsa.com.mx</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-navy-300">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>
                  Av. Barranca del Muerto #5
                  <br />
                  Col. Florida, CDMX
                </span>
              </li>
              <li className="flex items-start gap-3 text-navy-300">
                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>
                  Lun - Vie: 9:00 - 19:00
                  <br />
                  Sáb: 9:00 - 15:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-800 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-navy-400 text-sm">
            © {new Date().getFullYear()} AMSA Autos. Todos los derechos reservados.
          </p>
          <p className="text-navy-400 text-sm">
            Miembro ANCA #{" "}
            <span className="text-white font-medium">11</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
