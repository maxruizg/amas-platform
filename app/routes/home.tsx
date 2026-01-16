import type { Route } from "./+types/home";
import { prisma } from "~/lib/db.server";
import { Layout } from "~/components/Layout";
import { HeroSection } from "~/components/HeroSection";
import { FeaturedCars } from "~/components/FeaturedCars";
import { ServicesSection } from "~/components/ServicesSection";
import { CTASection } from "~/components/CTASection";
import { AnimatedSection } from "~/components/AnimatedSection";
import { motion } from "framer-motion";
import { Star, Users, Award, Clock } from "lucide-react";

export async function loader({}: Route.LoaderArgs) {
  const featuredCars = await prisma.car.findMany({
    where: {
      status: "available",
      featured: true,
    },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  // If no featured cars, get latest available cars
  const cars =
    featuredCars.length > 0
      ? featuredCars
      : await prisma.car.findMany({
          where: { status: "available" },
          include: {
            images: {
              orderBy: { order: "asc" },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 6,
        });

  return { cars };
}

const stats = [
  { icon: Clock, value: "45+", label: "Años de experiencia" },
  { icon: Users, value: "10,000+", label: "Clientes satisfechos" },
  { icon: Award, value: "500+", label: "Autos vendidos/año" },
  { icon: Star, value: "4.9", label: "Calificación promedio" },
];

export default function Home({ loaderData }: Route.ComponentProps) {
  const { cars } = loaderData;

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-16 bg-white relative -mt-1">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection
                key={stat.label}
                delay={index * 0.1}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
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

      {/* Featured Cars */}
      <FeaturedCars cars={cars} />

      {/* Services Section */}
      <ServicesSection />

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-2 bg-navy-100 text-navy-700 rounded-full text-sm font-medium mb-4">
                ¿Por qué elegirnos?
              </span>
              <h2 className="heading-lg text-navy-900 mb-6">
                La confianza que
                <br />
                <span className="text-navy-500">mereces</span>
              </h2>
              <p className="text-navy-600 text-lg mb-8 leading-relaxed">
                Con más de 45 años en el mercado, AMSA se ha convertido en
                sinónimo de confianza y calidad en la venta de autos seminuevos
                en la Ciudad de México. Somos miembros activos de ANCA y
                cumplimos con los más altos estándares de la industria.
              </p>

              <ul className="space-y-4">
                {[
                  "Inspección de 150+ puntos en cada vehículo",
                  "Garantía de motor y transmisión incluida",
                  "Financiamiento con las mejores tasas",
                  "Documentación 100% en regla",
                  "Asistencia post-venta personalizada",
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
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
                    {item}
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="relative">
                <div className="absolute -inset-4 bg-navy-100 rounded-3xl -rotate-3" />
                <img
                  src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80"
                  alt="Showroom AMSA"
                  className="relative rounded-2xl shadow-2xl shadow-navy-900/20 w-full"
                />

                {/* Floating badge */}
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <p className="text-sm text-navy-500 mb-1">Miembro ANCA</p>
                  <p className="text-3xl font-bold text-navy-900">#11</p>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </Layout>
  );
}
