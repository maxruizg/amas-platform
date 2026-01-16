import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/auto.$id";
import { prisma } from "~/lib/db.server";
import { Layout } from "~/components/Layout";
import { AnimatedSection } from "~/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Fuel,
  Gauge,
  Calendar,
  Settings,
  Palette,
  Phone,
  MessageCircle,
  Share2,
  Heart,
  X,
} from "lucide-react";
import { formatPrice, formatMileage } from "~/lib/utils";

export async function loader({ params }: Route.LoaderArgs) {
  const car = await prisma.car.findUnique({
    where: { id: params.id },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!car) {
    throw new Response("Auto no encontrado", { status: 404 });
  }

  // Get related cars
  const relatedCars = await prisma.car.findMany({
    where: {
      brand: car.brand,
      id: { not: car.id },
      status: "available",
    },
    include: {
      images: {
        orderBy: { order: "asc" },
        take: 1,
      },
    },
    take: 3,
  });

  return { car, relatedCars };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.car) {
    return [{ title: "Auto no encontrado | AMSA Autos" }];
  }
  const { car } = data;
  return [
    { title: `${car.brand} ${car.model} ${car.year} | AMSA Autos` },
    { name: "description", content: car.description },
  ];
}

const fuelLabels: Record<string, string> = {
  gasoline: "Gasolina",
  diesel: "Diésel",
  hybrid: "Híbrido",
  electric: "Eléctrico",
};

const transmissionLabels: Record<string, string> = {
  automatic: "Automático",
  manual: "Manual",
};

export default function CarDetail({ loaderData }: Route.ComponentProps) {
  const { car, relatedCars } = loaderData;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const images = car.images.length > 0
    ? car.images
    : [{ url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80", alt: "Car placeholder" }];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const specs = [
    { icon: Calendar, label: "Año", value: car.year.toString() },
    { icon: Gauge, label: "Kilometraje", value: formatMileage(car.mileage) },
    { icon: Fuel, label: "Combustible", value: fuelLabels[car.fuelType] || car.fuelType },
    { icon: Settings, label: "Transmisión", value: transmissionLabels[car.transmission] || car.transmission },
    { icon: Palette, label: "Color", value: car.color },
  ];

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-navy-50 py-4">
        <div className="container-custom">
          <Link
            to="/inventario"
            className="inline-flex items-center gap-2 text-navy-600 hover:text-navy-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inventario
          </Link>
        </div>
      </div>

      <section className="py-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <AnimatedSection>
              <div className="relative">
                {/* Main image */}
                <div
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => setLightboxOpen(true)}
                >
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex].url}
                    alt={images[currentImageIndex].alt || `${car.brand} ${car.model}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Status badge */}
                  {car.status === "reserved" && (
                    <div className="absolute top-4 left-4 bg-yellow-500 text-white px-4 py-2 rounded-full font-medium">
                      Reservado
                    </div>
                  )}

                  {/* Zoom hint */}
                  <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-navy-900 px-4 py-2 rounded-full font-medium">
                      Click para ampliar
                    </span>
                  </div>

                  {/* Navigation arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                      >
                        <ChevronLeft className="w-6 h-6 text-navy-900" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                      >
                        <ChevronRight className="w-6 h-6 text-navy-900" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                          index === currentImageIndex
                            ? "border-navy-900"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={image.alt || `Imagen ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Car Info */}
            <AnimatedSection direction="right">
              <div className="sticky top-24">
                {/* Title and price */}
                <div className="mb-8">
                  <h1 className="heading-md text-navy-900 mb-2">
                    {car.brand} {car.model}
                  </h1>
                  <p className="text-2xl text-navy-500 mb-4">{car.year}</p>
                  <p className="text-4xl font-bold text-navy-900">
                    {formatPrice(car.price)}
                  </p>
                </div>

                {/* Specs grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  {specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="bg-navy-50 rounded-xl p-4"
                    >
                      <spec.icon className="w-5 h-5 text-navy-400 mb-2" />
                      <p className="text-sm text-navy-500">{spec.label}</p>
                      <p className="font-semibold text-navy-900">{spec.value}</p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-navy-900 mb-3">
                    Descripción
                  </h3>
                  <p className="text-navy-600 leading-relaxed whitespace-pre-line">
                    {car.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Link
                      to={`/contacto?auto=${car.id}`}
                      className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Solicitar Información
                    </Link>
                    <a
                      href="tel:5556011787"
                      className="btn-secondary flex items-center justify-center gap-2 px-6"
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  </div>

                  <div className="flex gap-4">
                    <button className="btn-ghost flex-1 flex items-center justify-center gap-2 border border-navy-200">
                      <Heart className="w-5 h-5" />
                      Guardar
                    </button>
                    <button className="btn-ghost flex-1 flex items-center justify-center gap-2 border border-navy-200">
                      <Share2 className="w-5 h-5" />
                      Compartir
                    </button>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="mt-8 pt-8 border-t border-navy-100">
                  <div className="flex flex-wrap gap-6 text-sm text-navy-500">
                    <span>✓ Garantía incluida</span>
                    <span>✓ Documentación en regla</span>
                    <span>✓ Financiamiento disponible</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Related Cars */}
      {relatedCars.length > 0 && (
        <section className="py-16 bg-navy-50">
          <div className="container-custom">
            <h2 className="heading-sm text-navy-900 mb-8">
              Más autos {car.brand}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedCars.map((relatedCar) => (
                <Link
                  key={relatedCar.id}
                  to={`/auto/${relatedCar.id}`}
                  className="bg-white rounded-xl overflow-hidden shadow-lg shadow-navy-900/5 card-hover group"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={relatedCar.images[0]?.url || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80"}
                      alt={`${relatedCar.brand} ${relatedCar.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-navy-900">
                      {relatedCar.brand} {relatedCar.model}
                    </h3>
                    <p className="text-navy-500">{relatedCar.year}</p>
                    <p className="font-bold text-navy-900 mt-2">
                      {formatPrice(relatedCar.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>

            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex].url}
              alt={images[currentImageIndex].alt || `${car.brand} ${car.model}`}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Image counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-2 rounded-full text-white">
              {currentImageIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
