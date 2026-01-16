import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import type { Route } from "./+types/autos";
import { prisma } from "~/lib/db.server";
import { requireAuth } from "~/lib/auth.server";
import { motion } from "framer-motion";
import {
  Car,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  LogOut,
} from "lucide-react";
import { formatPrice, formatMileage, cn } from "~/lib/utils";

export function meta() {
  return [{ title: "Inventario | Admin AMSA" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  await requireAuth(request);

  const url = new URL(request.url);
  const search = url.searchParams.get("buscar");
  const status = url.searchParams.get("estado");

  const where: any = {};

  if (search) {
    where.OR = [
      { brand: { contains: search } },
      { model: { contains: search } },
    ];
  }

  if (status) {
    where.status = status;
  }

  const cars = await prisma.car.findMany({
    where,
    include: {
      images: {
        take: 1,
        orderBy: { order: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return { cars };
}

export async function action({ request }: Route.ActionArgs) {
  await requireAuth(request);

  const formData = await request.formData();
  const intent = formData.get("intent");
  const carId = formData.get("carId") as string;

  if (intent === "delete" && carId) {
    await prisma.car.delete({ where: { id: carId } });
  }

  return null;
}

export default function AdminAutos({ loaderData }: Route.ComponentProps) {
  const { cars } = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("buscar") || "");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-navy-50">
      {/* Header */}
      <header className="bg-white border-b border-navy-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-navy-900">
                  AMSA Admin
                </span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/admin"
                className="px-4 py-2 rounded-lg text-navy-600 hover:bg-navy-50 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/autos"
                className="px-4 py-2 rounded-lg bg-navy-100 text-navy-900 font-medium"
              >
                Inventario
              </Link>
              <Link
                to="/admin/imagenes"
                className="px-4 py-2 rounded-lg text-navy-600 hover:bg-navy-50 transition-colors"
              >
                Imágenes
              </Link>
            </nav>

            <form method="post" action="/admin">
              <button
                type="submit"
                name="intent"
                value="logout"
                className="p-2 rounded-lg text-navy-400 hover:text-navy-600 hover:bg-navy-100 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title and actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy-900">Inventario</h1>
            <p className="text-navy-600 mt-1">
              {cars.length} {cars.length === 1 ? "auto" : "autos"} en total
            </p>
          </div>
          <Link
            to="/admin/autos/nuevo"
            className="btn-primary flex items-center gap-2 w-fit"
          >
            <Plus className="w-5 h-5" />
            Agregar Auto
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-navy-100 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                <input
                  type="text"
                  placeholder="Buscar por marca o modelo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 rounded-xl"
                />
              </div>
            </form>

            <select
              value={searchParams.get("estado") || ""}
              onChange={(e) => setFilter("estado", e.target.value)}
              className="rounded-xl"
            >
              <option value="">Todos los estados</option>
              <option value="available">Disponible</option>
              <option value="reserved">Reservado</option>
              <option value="sold">Vendido</option>
            </select>
          </div>
        </div>

        {/* Cars grid */}
        {cars.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-navy-100"
              >
                {/* Image */}
                <div className="aspect-video bg-navy-100 relative">
                  {car.images[0] ? (
                    <img
                      src={car.images[0].url}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Car className="w-12 h-12 text-navy-300" />
                    </div>
                  )}

                  {/* Status badge */}
                  <span
                    className={cn(
                      "absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium",
                      car.status === "available"
                        ? "bg-green-100 text-green-700"
                        : car.status === "reserved"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    )}
                  >
                    {car.status === "available"
                      ? "Disponible"
                      : car.status === "reserved"
                      ? "Reservado"
                      : "Vendido"}
                  </span>

                  {car.featured && (
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-navy-900 text-white">
                      Destacado
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-navy-900">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-navy-500">{car.year}</p>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-navy-100">
                    <div>
                      <p className="text-lg font-bold text-navy-900">
                        {formatPrice(car.price)}
                      </p>
                      <p className="text-sm text-navy-500">
                        {formatMileage(car.mileage)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/auto/${car.id}`}
                        target="_blank"
                        className="p-2 rounded-lg text-navy-400 hover:text-navy-600 hover:bg-navy-100 transition-colors"
                        title="Ver en sitio"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link
                        to={`/admin/autos/${car.id}`}
                        className="p-2 rounded-lg text-navy-400 hover:text-navy-600 hover:bg-navy-100 transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm(car.id)}
                        className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Delete confirmation */}
                {deleteConfirm === car.id && (
                  <div className="p-4 bg-red-50 border-t border-red-100">
                    <p className="text-sm text-red-700 mb-3">
                      ¿Seguro que quieres eliminar este auto?
                    </p>
                    <div className="flex gap-2">
                      <form method="post" className="flex-1">
                        <input type="hidden" name="intent" value="delete" />
                        <input type="hidden" name="carId" value={car.id} />
                        <button
                          type="submit"
                          className="w-full py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                          Sí, eliminar
                        </button>
                      </form>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="flex-1 py-2 bg-white text-navy-700 rounded-lg text-sm font-medium border border-navy-200 hover:bg-navy-50 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-navy-100">
            <Car className="w-16 h-16 text-navy-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-navy-900 mb-2">
              No hay autos
            </h3>
            <p className="text-navy-600 mb-6">
              {searchParams.toString()
                ? "No se encontraron autos con esos filtros"
                : "Agrega tu primer auto al inventario"}
            </p>
            {searchParams.toString() ? (
              <button
                onClick={() => setSearchParams(new URLSearchParams())}
                className="btn-secondary"
              >
                Limpiar filtros
              </button>
            ) : (
              <Link to="/admin/autos/nuevo" className="btn-primary inline-block">
                Agregar Auto
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
