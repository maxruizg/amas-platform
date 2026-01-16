import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { CarCard } from "./CarCard";

interface FeaturedCarsProps {
  cars: Array<{
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
  }>;
}

export function FeaturedCars({ cars }: FeaturedCarsProps) {
  if (cars.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-navy-50 dark:bg-navy-900">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-block px-4 py-2 bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-200 rounded-full text-sm font-medium mb-4">
              Inventario Destacado
            </span>
            <h2 className="heading-lg text-navy-900 dark:text-white">
              Autos seleccionados
              <br />
              <span className="text-navy-500 dark:text-navy-400">para ti</span>
            </h2>
          </div>
          <Link
            to="/inventario"
            className="inline-flex items-center gap-2 text-navy-900 dark:text-white font-semibold hover:text-navy-700 dark:hover:text-navy-200 transition-colors group mt-4 md:mt-0"
          >
            Ver todo el inventario
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>

        {/* Cars grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <CarCard key={car.id} car={car} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
