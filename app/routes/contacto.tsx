import { useState } from "react";
import { Form, useSearchParams, useActionData, useNavigation } from "react-router";
import type { Route } from "./+types/contacto";
import { prisma } from "~/lib/db.server";
import { Layout } from "~/components/Layout";
import { AnimatedSection } from "~/components/AnimatedSection";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { z } from "zod";

export function meta() {
  return [
    { title: "Contacto | AMSA Autos" },
    { name: "description", content: "Contáctanos para más información sobre nuestros autos seminuevos, financiamiento y servicios." },
  ];
}

const contactSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
  carId: z.string().optional(),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.contactSubmission.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone || null,
        message: result.data.message,
        carId: result.data.carId || null,
      },
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      errors: { _form: ["Error al enviar el mensaje. Intenta de nuevo."] },
    };
  }
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const carId = url.searchParams.get("auto");

  let car = null;
  if (carId) {
    car = await prisma.car.findUnique({
      where: { id: carId },
      select: { id: true, brand: true, model: true, year: true },
    });
  }

  return { car };
}

const contactInfo = [
  {
    icon: Phone,
    title: "Teléfono",
    content: "(55) 5601-1787",
    subcontent: "(55) 5601-7250",
    href: "tel:5556011787",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@autosamsa.com.mx",
    href: "mailto:info@autosamsa.com.mx",
  },
  {
    icon: MapPin,
    title: "Dirección",
    content: "Av. Barranca del Muerto #5",
    subcontent: "Col. Florida, CDMX",
  },
  {
    icon: Clock,
    title: "Horario",
    content: "Lun - Vie: 9:00 - 19:00",
    subcontent: "Sáb: 9:00 - 15:00",
  },
];

export default function Contacto({ loaderData, actionData }: Route.ComponentProps) {
  const { car } = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-navy-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
              Contáctanos
            </span>
            <h1 className="heading-xl text-white mb-6">
              Estamos aquí
              <br />
              <span className="text-navy-200">para ayudarte</span>
            </h1>
            <p className="text-xl text-navy-200">
              ¿Tienes preguntas? ¿Quieres agendar una cita? Escríbenos y te
              responderemos lo antes posible.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <AnimatedSection>
              <div className="bg-white rounded-2xl p-8 shadow-xl shadow-navy-900/10 border border-navy-100">
                {actionData?.success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-navy-900 mb-2">
                      ¡Mensaje enviado!
                    </h3>
                    <p className="text-navy-600">
                      Gracias por contactarnos. Te responderemos pronto.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="heading-sm text-navy-900 mb-6">
                      Envíanos un mensaje
                    </h2>

                    {car && (
                      <div className="bg-navy-50 rounded-xl p-4 mb-6">
                        <p className="text-sm text-navy-500">
                          Consulta sobre:
                        </p>
                        <p className="font-semibold text-navy-900">
                          {car.brand} {car.model} {car.year}
                        </p>
                      </div>
                    )}

                    <Form method="post" className="space-y-6">
                      {car && (
                        <input type="hidden" name="carId" value={car.id} />
                      )}

                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-navy-700 mb-2"
                        >
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="Tu nombre"
                          className="w-full"
                        />
                        {actionData?.errors?.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {actionData.errors.name[0]}
                          </p>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-navy-700 mb-2"
                          >
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="tu@email.com"
                            className="w-full"
                          />
                          {actionData?.errors?.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {actionData.errors.email[0]}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-navy-700 mb-2"
                          >
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="55 1234 5678"
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-navy-700 mb-2"
                        >
                          Mensaje *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          placeholder="¿En qué podemos ayudarte?"
                          className="w-full resize-none"
                        />
                        {actionData?.errors?.message && (
                          <p className="text-red-500 text-sm mt-1">
                            {actionData.errors.message[0]}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Enviar Mensaje
                          </>
                        )}
                      </button>
                    </Form>
                  </>
                )}
              </div>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection direction="right">
              <div className="space-y-8">
                <div>
                  <h2 className="heading-sm text-navy-900 mb-4">
                    Información de Contacto
                  </h2>
                  <p className="text-navy-600 text-lg">
                    Estamos disponibles para atenderte en cualquiera de nuestros
                    canales de comunicación.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-navy-100 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-navy-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy-900">
                          {info.title}
                        </h3>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-navy-600 hover:text-navy-900 transition-colors"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-navy-600">{info.content}</p>
                        )}
                        {info.subcontent && (
                          <p className="text-navy-500 text-sm">
                            {info.subcontent}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <div className="bg-green-50 rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
                      <MessageCircle className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900">
                        WhatsApp directo
                      </h3>
                      <p className="text-navy-600 text-sm">
                        Escríbenos y te atenderemos de inmediato
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/5215556011787"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Iniciar chat
                  </a>
                </div>

                {/* Map */}
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.180558267767!2d-99.18080492395397!3d19.36316454151894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff9c33d3a9b7%3A0x7c6e3d93e9c8b123!2sAv.%20Barranca%20del%20Muerto%2C%20Florida%2C%20Ciudad%20de%20M%C3%A9xico!5e0!3m2!1ses!2smx!4v1699900000000!5m2!1ses!2smx"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
}
