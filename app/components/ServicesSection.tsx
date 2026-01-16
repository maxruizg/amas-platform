import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  Car,
  CreditCard,
  RefreshCw,
  FileCheck,
  ArrowRight,
} from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

const services = [
  {
    icon: Car,
    title: "Autos Certificados",
    description:
      "Todos nuestros vehículos pasan por una rigurosa inspección de más de 150 puntos de verificación.",
    color: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  },
  {
    icon: CreditCard,
    title: "Financiamiento",
    description:
      "Planes de financiamiento desde 20% de enganche y hasta 60 meses para pagar.",
    color: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  },
  {
    icon: RefreshCw,
    title: "Toma a Cuenta",
    description:
      "Recibimos tu auto actual como parte de pago. Hacemos avalúo sin compromiso.",
    color: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  },
  {
    icon: FileCheck,
    title: "Garantía Incluida",
    description:
      "Todos nuestros autos incluyen garantía de motor y transmisión por 3 meses o 5,000 km.",
    color: "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-navy-50/50 dark:bg-navy-950">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-200 rounded-full text-sm font-medium mb-4">
            Nuestros Servicios
          </span>
          <h2 className="heading-lg text-navy-900 dark:text-white mb-4">
            Todo lo que necesitas
            <br />
            <span className="text-navy-500 dark:text-navy-400">en un solo lugar</span>
          </h2>
          <p className="text-navy-600 dark:text-navy-300 max-w-2xl mx-auto text-lg">
            Más de 45 años de experiencia nos permiten ofrecerte los mejores
            servicios para la compra de tu próximo auto.
          </p>
        </AnimatedSection>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.1}>
              <motion.div
                className="bg-white dark:bg-navy-900 rounded-2xl p-8 h-full shadow-lg shadow-navy-900/5 dark:shadow-navy-950/50 border border-navy-100/50 dark:border-navy-800 card-hover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6`}
                >
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-navy-600 dark:text-navy-300 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.4} className="text-center mt-12">
          <Link
            to="/servicios"
            className="inline-flex items-center gap-2 text-navy-900 dark:text-white font-semibold hover:text-navy-700 dark:hover:text-navy-200 transition-colors group"
          >
            Ver todos los servicios
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
