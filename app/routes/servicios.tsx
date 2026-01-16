import { Layout } from "~/components/Layout";
import { AnimatedSection } from "~/components/AnimatedSection";
import { CTASection } from "~/components/CTASection";
import { motion } from "framer-motion";
import {
  Car,
  CreditCard,
  RefreshCw,
  FileCheck,
  Shield,
  Wrench,
  ClipboardCheck,
  Users,
} from "lucide-react";

export function meta() {
  return [
    { title: "Servicios | AMSA Autos" },
    { name: "description", content: "Conoce todos los servicios que AMSA Autos tiene para ti: financiamiento, garantía, toma a cuenta y más." },
  ];
}

const mainServices = [
  {
    icon: Car,
    title: "Autos Seminuevos Certificados",
    description:
      "Todos nuestros vehículos pasan por una inspección exhaustiva de más de 150 puntos. Garantizamos la calidad y procedencia de cada auto que vendemos.",
    features: [
      "Inspección mecánica completa",
      "Verificación de documentación",
      "Historial vehicular verificado",
      "Prueba de manejo garantizada",
    ],
    color: "bg-blue-500",
  },
  {
    icon: CreditCard,
    title: "Financiamiento Accesible",
    description:
      "Trabajamos con las principales instituciones financieras para ofrecerte las mejores opciones de crédito automotriz con tasas competitivas.",
    features: [
      "Desde 20% de enganche",
      "Hasta 60 meses para pagar",
      "Aprobación en 24 horas",
      "Sin penalización por pago anticipado",
    ],
    color: "bg-green-500",
  },
  {
    icon: RefreshCw,
    title: "Toma a Cuenta",
    description:
      "Recibimos tu auto actual como parte de pago. Realizamos avalúo profesional y te damos el mejor precio del mercado.",
    features: [
      "Avalúo sin compromiso",
      "Mejor precio garantizado",
      "Proceso rápido y transparente",
      "Pago inmediato",
    ],
    color: "bg-purple-500",
  },
  {
    icon: FileCheck,
    title: "Garantía Incluida",
    description:
      "Todos nuestros autos incluyen garantía de motor y transmisión. Tu tranquilidad es nuestra prioridad.",
    features: [
      "3 meses o 5,000 km",
      "Cobertura motor y transmisión",
      "Servicio en talleres autorizados",
      "Extensión de garantía disponible",
    ],
    color: "bg-orange-500",
  },
];

const additionalServices = [
  {
    icon: Shield,
    title: "Seguro Automotriz",
    description: "Te ayudamos a encontrar el mejor seguro para tu nuevo auto con cobertura amplia.",
  },
  {
    icon: Wrench,
    title: "Servicio Post-Venta",
    description: "Mantenimiento y servicio técnico con talleres autorizados y refacciones originales.",
  },
  {
    icon: ClipboardCheck,
    title: "Trámites Vehiculares",
    description: "Nos encargamos de todos los trámites: placas, tenencia, verificación y más.",
  },
  {
    icon: Users,
    title: "Asesoría Personalizada",
    description: "Nuestros asesores te guían en cada paso del proceso de compra de tu auto.",
  },
];

export default function Servicios() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-navy-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
              Nuestros Servicios
            </span>
            <h1 className="heading-xl text-white mb-6">
              Todo lo que necesitas
              <br />
              <span className="text-navy-200">para tu nuevo auto</span>
            </h1>
            <p className="text-xl text-navy-200">
              En AMSA no solo vendemos autos, te acompañamos en todo el proceso
              con servicios diseñados para tu comodidad y tranquilidad.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-24">
        <div className="container-custom">
          <div className="space-y-24">
            {mainServices.map((service, index) => (
              <AnimatedSection
                key={service.title}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <div
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div
                      className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="heading-md text-navy-900 mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-navy-600 mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3 text-navy-700"
                        >
                          <div className="w-6 h-6 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0">
                            <svg
                              className="w-4 h-4 text-navy-700"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="relative">
                      <div
                        className={`absolute -inset-4 ${service.color}/10 rounded-3xl ${
                          index % 2 === 0 ? "-rotate-3" : "rotate-3"
                        }`}
                      />
                      <div className="relative bg-white rounded-2xl p-8 shadow-2xl shadow-navy-900/10">
                        <img
                          src={`https://images.unsplash.com/photo-${
                            index === 0
                              ? "1583121274602-3e2820c69888"
                              : index === 1
                              ? "1560472354-8e0b4d0b5f0c"
                              : index === 2
                              ? "1549317661-bd32c8ce0db2"
                              : "1618843479313-40f8afb4b4d8"
                          }?w=600&q=80`}
                          alt={service.title}
                          className="w-full rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-navy-50">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="heading-lg text-navy-900 mb-4">
              Servicios Adicionales
            </h2>
            <p className="text-lg text-navy-600 max-w-2xl mx-auto">
              Complementamos tu experiencia de compra con servicios que facilitan
              todo el proceso.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.1}>
                <motion.div
                  className="bg-white rounded-2xl p-8 h-full shadow-lg shadow-navy-900/5 border border-navy-100/50"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-navy-100 flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-navy-700" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-navy-600">{service.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-navy-100 text-navy-700 rounded-full text-sm font-medium mb-4">
              Proceso de Compra
            </span>
            <h2 className="heading-lg text-navy-900 mb-4">
              Comprar tu auto es
              <br />
              <span className="text-navy-500">fácil y rápido</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Elige", desc: "Explora nuestro inventario y elige tu auto ideal" },
              { step: "02", title: "Visita", desc: "Agenda una cita para ver el auto y hacer prueba de manejo" },
              { step: "03", title: "Financia", desc: "Elige el plan de financiamiento que más te convenga" },
              { step: "04", title: "Disfruta", desc: "Llévate tu auto con toda la documentación en regla" },
            ].map((item, index) => (
              <AnimatedSection key={item.step} delay={index * 0.15}>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-navy-900 text-white flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-navy-600">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
