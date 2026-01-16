import { motion } from "framer-motion";
import { Link } from "react-router";
import { Phone, MessageCircle } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-navy-700/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-navy-600/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center">
          <h2 className="heading-lg text-white mb-6">
            ¿Listo para encontrar
            <br />
            <span className="text-navy-200">tu próximo auto?</span>
          </h2>
          <p className="text-xl text-navy-200 mb-10 max-w-2xl mx-auto">
            Visítanos en nuestro showroom o contáctanos para agendar una prueba
            de manejo. Estamos para ayudarte.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contacto"
              className="btn-secondary bg-white text-navy-900 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Enviar Mensaje
            </Link>
            <a
              href="tel:5556011787"
              className="btn-ghost text-white border border-white/30 hover:bg-white/10 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              (55) 5601-1787
            </a>
          </div>

          {/* Trust indicator */}
          <p className="mt-12 text-navy-300 text-sm">
            Miembro de ANCA #11 • Más de 45 años de experiencia
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
