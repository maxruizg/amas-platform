import { useState } from "react";
import { useSearchParams } from "react-router";
import type { Route } from "./+types/inventario";
import { prisma } from "~/lib/db.server";
import { Layout } from "~/components/Layout";
import { CarCard } from "~/components/CarCard";
import { AnimatedSection } from "~/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import { carBrands, fuelTypes, transmissionTypes, cn } from "~/lib/utils";

export function meta() {
  return [
    { title: "Inventario | AMSA Autos" },
    { name: "description", content: "Explora nuestro inventario de autos seminuevos certificados." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const brand = url.searchParams.get("marca");
  const minPrice = url.searchParams.get("precio_min");
  const maxPrice = url.searchParams.get("precio_max");
  const minYear = url.searchParams.get("ano_min");
  const maxYear = url.searchParams.get("ano_max");
  const fuelType = url.searchParams.get("combustible");
  const transmission = url.searchParams.get("transmision");
  const search = url.searchParams.get("buscar");

  const where: any = {
    status: { not: "sold" },
  };

  if (brand) {
    where.brand = brand;
  }

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice);
    if (maxPrice) where.price.lte = parseFloat(maxPrice);
  }

  if (minYear || maxYear) {
    where.year = {};
    if (minYear) where.year.gte = parseInt(minYear);
    if (maxYear) where.year.lte = parseInt(maxYear);
  }

  if (fuelType) {
    where.fuelType = fuelType;
  }

  if (transmission) {
    where.transmission = transmission;
  }

  if (search) {
    where.OR = [
      { brand: { contains: search } },
      { model: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const cars = await prisma.car.findMany({
    where,
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const brands = await prisma.car.findMany({
    where: { status: { not: "sold" } },
    select: { brand: true },
    distinct: ["brand"],
  });

  return {
    cars,
    availableBrands: brands.map((b) => b.brand),
  };
}

export default function Inventario({ loaderData }: Route.ComponentProps) {
  const { cars, availableBrands } = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("buscar") || "");

  const activeFilters = Array.from(searchParams.entries()).filter(
    ([key]) => key !== "buscar"
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchTerm) {
      newParams.set("buscar", searchTerm);
    } else {
      newParams.delete("buscar");
    }
    setSearchParams(newParams);
  };

  const setFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setSearchTerm("");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-navy-900 dark:bg-navy-950 py-12 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Nuestro Inventario
            </h1>
            <p className="text-navy-200 max-w-2xl mx-auto">
              Encuentra el auto perfecto entre nuestra selección de vehículos seminuevos certificados
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-3 bg-white dark:bg-navy-900 border-b border-navy-100 dark:border-navy-800 sticky top-0 z-40">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-3 items-center">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 w-full lg:max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 z-10" />
                <input
                  type="text"
                  placeholder="Buscar por marca, modelo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: '2.25rem' }}
                  className="w-full pr-3 py-2 text-sm rounded-full border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 dark:text-white dark:placeholder:text-navy-400 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 transition-all"
                />
              </div>
            </form>

            {/* Filter button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                showFilters
                  ? "bg-navy-900 dark:bg-white text-white dark:text-navy-900"
                  : "bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-200 hover:bg-navy-200 dark:hover:bg-navy-700"
              )}
            >
              <Filter className="w-4 h-4" />
              Filtros
              {activeFilters.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-white dark:bg-navy-900 text-navy-900 dark:text-white text-xs flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </button>

            {/* Clear filters */}
            {activeFilters.length > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-navy-600 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Limpiar
              </button>
            )}

            {/* Results count */}
            <p className="text-sm text-navy-500 dark:text-navy-400">
              {cars.length} {cars.length === 1 ? "resultado" : "resultados"}
            </p>
          </div>

          {/* Expandable filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-3 pb-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {/* Brand */}
                  <div>
                    <label className="block text-xs font-medium text-navy-700 dark:text-navy-200 mb-1">
                      Marca
                    </label>
                    <select
                      value={searchParams.get("marca") || ""}
                      onChange={(e) => setFilter("marca", e.target.value)}
                      className="w-full rounded-lg text-sm py-1.5 px-2 border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 dark:text-white"
                    >
                      <option value="">Todas</option>
                      {availableBrands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Min Year */}
                  <div>
                    <label className="block text-xs font-medium text-navy-700 dark:text-navy-200 mb-1">
                      Año desde
                    </label>
                    <select
                      value={searchParams.get("ano_min") || ""}
                      onChange={(e) => setFilter("ano_min", e.target.value)}
                      className="w-full rounded-lg text-sm py-1.5 px-2 border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 dark:text-white"
                    >
                      <option value="">Cualquiera</option>
                      {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i).map(
                        (year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* Max Year */}
                  <div>
                    <label className="block text-xs font-medium text-navy-700 dark:text-navy-200 mb-1">
                      Año hasta
                    </label>
                    <select
                      value={searchParams.get("ano_max") || ""}
                      onChange={(e) => setFilter("ano_max", e.target.value)}
                      className="w-full rounded-lg text-sm py-1.5 px-2 border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 dark:text-white"
                    >
                      <option value="">Cualquiera</option>
                      {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i).map(
                        (year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* Fuel Type */}
                  <div>
                    <label className="block text-xs font-medium text-navy-700 dark:text-navy-200 mb-1">
                      Combustible
                    </label>
                    <select
                      value={searchParams.get("combustible") || ""}
                      onChange={(e) => setFilter("combustible", e.target.value)}
                      className="w-full rounded-lg text-sm py-1.5 px-2 border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 dark:text-white"
                    >
                      <option value="">Todos</option>
                      {fuelTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Transmission */}
                  <div>
                    <label className="block text-xs font-medium text-navy-700 dark:text-navy-200 mb-1">
                      Transmisión
                    </label>
                    <select
                      value={searchParams.get("transmision") || ""}
                      onChange={(e) => setFilter("transmision", e.target.value)}
                      className="w-full rounded-lg text-sm py-1.5 px-2 border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 dark:text-white"
                    >
                      <option value="">Todas</option>
                      {transmissionTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Max Price */}
                  <div>
                    <label className="block text-xs font-medium text-navy-700 dark:text-navy-200 mb-1">
                      Precio máximo
                    </label>
                    <select
                      value={searchParams.get("precio_max") || ""}
                      onChange={(e) => setFilter("precio_max", e.target.value)}
                      className="w-full rounded-lg text-sm py-1.5 px-2 border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 dark:text-white"
                    >
                      <option value="">Sin límite</option>
                      {[300000, 500000, 700000, 1000000, 1500000, 2000000].map(
                        (price) => (
                          <option key={price} value={price}>
                            ${(price / 1000).toFixed(0)}k
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 bg-navy-50/50 dark:bg-navy-950">
        <div className="container-custom">
          {cars.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car, index) => (
                <CarCard key={car.id} car={car} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-navy-100 dark:bg-navy-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-navy-400" />
              </div>
              <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">
                No encontramos resultados
              </h3>
              <p className="text-navy-600 dark:text-navy-300 mb-6">
                Intenta ajustar los filtros o buscar con otros términos
              </p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Ver todo el inventario
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
