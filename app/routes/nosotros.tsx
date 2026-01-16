import { Layout } from "~/components/Layout";
import { AnimatedSection } from "~/components/AnimatedSection";
import { CTASection } from "~/components/CTASection";
import { motion } from "framer-motion";
import { Award, Users, Clock, Shield, Target, Heart } from "lucide-react";

export function meta() {
  return [
    { title: "Nosotros | AMSA Autos" },
    { name: "description", content: "Conoce la historia de AMSA Autos, líderes en seminuevos certificados desde 1978 en la Ciudad de México." },
  ];
}

const values = [
  {
    icon: Shield,
    title: "Confianza",
    description: "Más de 45 años siendo sinónimo de honestidad y transparencia en cada transacción.",
  },
  {
    icon: Award,
    title: "Calidad",
    description: "Solo los mejores vehículos pasan nuestra rigurosa inspección de 150+ puntos.",
  },
  {
    icon: Heart,
    title: "Compromiso",
    description: "Tu satisfacción es nuestra prioridad, antes, durante y después de la compra.",
  },
  {
    icon: Target,
    title: "Excelencia",
    description: "Buscamos superar tus expectativas en cada aspecto de nuestro servicio.",
  },
];

const milestones = [
  { year: "1978", title: "Fundación", desc: "AMSA abre sus puertas en la Ciudad de México" },
  { year: "1990", title: "Expansión", desc: "Nos convertimos en referente de seminuevos en CDMX" },
  { year: "2005", title: "ANCA #11", desc: "Nos unimos a la Asociación Nacional de Comerciantes en Automóviles" },
  { year: "2015", title: "Modernización", desc: "Implementamos tecnología de punta en nuestros procesos" },
  { year: "2024", title: "Presente", desc: "Seguimos siendo líderes con más de 500 autos vendidos al año" },
];

export default function Nosotros() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-navy-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
              Nuestra Historia
            </span>
            <h1 className="heading-xl text-white mb-6">
              45 años siendo
              <br />
              <span className="text-navy-200">tu mejor opción</span>
            </h1>
            <p className="text-xl text-navy-200">
              Desde 1978, AMSA ha sido sinónimo de confianza y calidad en el
              mercado de autos seminuevos en la Ciudad de México.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white -mt-1 relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, value: "45+", label: "Años de experiencia" },
              { icon: Users, value: "10,000+", label: "Clientes satisfechos" },
              { icon: Award, value: "500+", label: "Autos vendidos/año" },
              { icon: Shield, value: "#11", label: "Miembro ANCA" },
            ].map((stat, index) => (
              <AnimatedSection
                key={stat.label}
                delay={index * 0.1}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6"
                >
                  <stat.icon className="w-8 h-8 text-navy-500 mx-auto mb-3" />
                  <p className="text-4xl font-bold text-navy-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-navy-500 text-sm">{stat.label}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="heading-lg text-navy-900 mb-6">
                Líderes en seminuevos
                <br />
                <span className="text-navy-500">en la CDMX</span>
              </h2>
              <div className="space-y-6 text-navy-600 text-lg leading-relaxed">
                <p>
                  AMSA nació en 1978 con una visión clara: ofrecer a los
                  mexicanos una alternativa confiable y de calidad para adquirir
                  un auto seminuevo. Desde entonces, nos hemos convertido en un
                  referente del mercado automotriz en la Ciudad de México.
                </p>
                <p>
                  Nuestra trayectoria de más de 45 años nos ha permitido
                  desarrollar procesos rigurosos de selección y certificación de
                  vehículos, garantizando que cada auto que vendemos cumple con
                  los más altos estándares de calidad.
                </p>
                <p>
                  Como miembros activos de ANCA (Asociación Nacional de
                  Comerciantes en Automóviles) desde 2005, nos comprometemos a
                  seguir las mejores prácticas de la industria y a ofrecer un
                  servicio transparente y profesional.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="relative">
                <div className="absolute -inset-4 bg-navy-100 rounded-3xl -rotate-3" />
                <img
                  src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80"
                  alt="AMSA Showroom"
                  className="relative rounded-2xl shadow-2xl shadow-navy-900/20 w-full"
                />
                <motion.div
                  className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/ANCA_logo.svg/200px-ANCA_logo.svg.png"
                    alt="ANCA"
                    className="h-12 opacity-80"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <p className="text-sm text-navy-500 mt-2">Miembro certificado</p>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-navy-50">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-navy-100 text-navy-700 rounded-full text-sm font-medium mb-4">
              Nuestros Valores
            </span>
            <h2 className="heading-lg text-navy-900">
              Lo que nos define
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <motion.div
                  className="bg-white rounded-2xl p-8 h-full shadow-lg shadow-navy-900/5 border border-navy-100/50 text-center"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 rounded-full bg-navy-100 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-navy-700" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-navy-600">{value.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-navy-100 text-navy-700 rounded-full text-sm font-medium mb-4">
              Nuestra Trayectoria
            </span>
            <h2 className="heading-lg text-navy-900">
              Una historia de éxito
            </h2>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-navy-200 hidden lg:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <AnimatedSection
                  key={milestone.year}
                  delay={index * 0.15}
                  direction={index % 2 === 0 ? "left" : "right"}
                >
                  <div
                    className={`flex items-center gap-8 ${
                      index % 2 === 0
                        ? "lg:flex-row"
                        : "lg:flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`flex-1 ${
                        index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                      }`}
                    >
                      <span className="text-4xl font-bold text-navy-300">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-bold text-navy-900 mt-2">
                        {milestone.title}
                      </h3>
                      <p className="text-navy-600 mt-1">{milestone.desc}</p>
                    </div>

                    {/* Center dot */}
                    <div className="hidden lg:flex w-4 h-4 rounded-full bg-navy-900 ring-4 ring-navy-100 flex-shrink-0" />

                    <div className="flex-1 hidden lg:block" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team/Location */}
      <section className="py-24 bg-navy-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-2 bg-navy-100 text-navy-700 rounded-full text-sm font-medium mb-4">
                Visítanos
              </span>
              <h2 className="heading-md text-navy-900 mb-6">
                Te esperamos en
                <br />
                <span className="text-navy-500">nuestro showroom</span>
              </h2>
              <p className="text-lg text-navy-600 mb-8">
                Ubicados estratégicamente en la colonia Florida, te invitamos a
                visitar nuestras instalaciones y conocer en persona nuestro
                inventario de autos seminuevos certificados.
              </p>

              <div className="space-y-4 text-navy-700">
                <p className="flex items-center gap-3">
                  <span className="font-semibold">Dirección:</span>
                  Av. Barranca del Muerto #5, Col. Florida, CDMX
                </p>
                <p className="flex items-center gap-3">
                  <span className="font-semibold">Teléfono:</span>
                  (55) 5601-1787 / 5601-7250
                </p>
                <p className="flex items-center gap-3">
                  <span className="font-semibold">Horario:</span>
                  Lun-Vie 9:00-19:00, Sáb 9:00-15:00
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-navy-900/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.180558267767!2d-99.18080492395397!3d19.36316454151894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff9c33d3a9b7%3A0x7c6e3d93e9c8b123!2sAv.%20Barranca%20del%20Muerto%2C%20Florida%2C%20Ciudad%20de%20M%C3%A9xico!5e0!3m2!1ses!2smx!4v1699900000000!5m2!1ses!2smx"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
