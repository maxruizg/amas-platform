import { Link } from "react-router";
import { motion } from "framer-motion";
import { Fuel, Gauge, Calendar, Settings } from "lucide-react";
import { formatPrice, formatMileage, cn } from "~/lib/utils";

interface CarCardProps {
  car: {
    id: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    fuelType: string;
    transmission: string;
    images: { url: string; alt?: string | null }[];
    status: string;
    featured?: boolean;
  };
  index?: number;
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

export function CarCard({ car, index = 0 }: CarCardProps) {
  const primaryImage = car.images.find((img) => img.url) || car.images[0];
  const imageUrl = primaryImage?.url || "/placeholder-car.jpg";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/auto/${car.id}`} className="block">
        <div className="bg-white dark:bg-navy-900 rounded-2xl overflow-hidden shadow-lg shadow-navy-900/5 dark:shadow-navy-950/50 card-hover border border-navy-100/50 dark:border-navy-800">
          {/* Image container */}
          <div className="relative aspect-[4/3] img-zoom">
            <img
              src={imageUrl}
              alt={`${car.brand} ${car.model} ${car.year}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />

            {/* Status badge */}
            {car.status === "reserved" && (
              <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Reservado
              </div>
            )}
            {car.status === "sold" && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Vendido
              </div>
            )}

            {/* Featured badge */}
            {car.featured && car.status === "available" && (
              <div className="absolute top-4 left-4 bg-navy-900 dark:bg-white text-white dark:text-navy-900 px-3 py-1 rounded-full text-sm font-medium">
                Destacado
              </div>
            )}

            {/* Price tag */}
            <div className="absolute bottom-4 right-4 price-tag">
              {formatPrice(car.price)}
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Title */}
            <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-1 group-hover:text-navy-700 dark:group-hover:text-navy-200 transition-colors">
              {car.brand} {car.model}
            </h3>

            {/* Year */}
            <p className="text-navy-500 dark:text-navy-400 text-sm mb-4">{car.year}</p>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-navy-600 dark:text-navy-300">
                <Gauge className="w-4 h-4 text-navy-400 dark:text-navy-500" />
                <span className="text-sm">{formatMileage(car.mileage)}</span>
              </div>
              <div className="flex items-center gap-2 text-navy-600 dark:text-navy-300">
                <Fuel className="w-4 h-4 text-navy-400 dark:text-navy-500" />
                <span className="text-sm">{fuelLabels[car.fuelType] || car.fuelType}</span>
              </div>
              <div className="flex items-center gap-2 text-navy-600 dark:text-navy-300">
                <Calendar className="w-4 h-4 text-navy-400 dark:text-navy-500" />
                <span className="text-sm">{car.year}</span>
              </div>
              <div className="flex items-center gap-2 text-navy-600 dark:text-navy-300">
                <Settings className="w-4 h-4 text-navy-400 dark:text-navy-500" />
                <span className="text-sm">
                  {transmissionLabels[car.transmission] || car.transmission}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 pt-4 border-t border-navy-100 dark:border-navy-800">
              <span className="text-navy-900 dark:text-white font-semibold text-sm group-hover:text-navy-700 dark:group-hover:text-navy-200 transition-colors flex items-center justify-between">
                Ver Detalles
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
