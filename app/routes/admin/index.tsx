import { Link, redirect } from "react-router";
import type { Route } from "./+types/index";
import { prisma } from "~/lib/db.server";
import { requireAuth } from "~/lib/auth.server";
import { motion } from "framer-motion";
import {
  Car,
  Users,
  MessageSquare,
  Image,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  LogOut,
} from "lucide-react";
import { formatPrice } from "~/lib/utils";
import { ThemeToggle } from "~/components/ThemeToggle";

export function meta() {
  return [{ title: "Dashboard | Admin AMSA" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireAuth(request);

  const [
    totalCars,
    availableCars,
    soldCars,
    reservedCars,
    newMessages,
    recentCars,
  ] = await Promise.all([
    prisma.car.count(),
    prisma.car.count({ where: { status: "available" } }),
    prisma.car.count({ where: { status: "sold" } }),
    prisma.car.count({ where: { status: "reserved" } }),
    prisma.contactSubmission.count({ where: { status: "new" } }),
    prisma.car.findMany({
      include: { images: { take: 1 } },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return {
    user,
    stats: {
      totalCars,
      availableCars,
      soldCars,
      reservedCars,
      newMessages,
    },
    recentCars,
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "logout") {
    return redirect("/admin/login", {
      headers: {
        "Set-Cookie": "auth_token=; Path=/; HttpOnly; Max-Age=0",
      },
    });
  }

  return null;
}

const statCards = [
  {
    icon: Car,
    label: "Total Autos",
    key: "totalCars",
    color: "bg-blue-500",
  },
  {
    icon: TrendingUp,
    label: "Disponibles",
    key: "availableCars",
    color: "bg-green-500",
  },
  {
    icon: Clock,
    label: "Reservados",
    key: "reservedCars",
    color: "bg-yellow-500",
  },
  {
    icon: MessageSquare,
    label: "Mensajes Nuevos",
    key: "newMessages",
    color: "bg-purple-500",
  },
];

export default function AdminDashboard({ loaderData }: Route.ComponentProps) {
  const { user, stats, recentCars } = loaderData;

  return (
    <div className="min-h-screen bg-navy-50 dark:bg-navy-950">
      {/* Header */}
      <header className="bg-white dark:bg-navy-900 border-b border-navy-100 dark:border-navy-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-navy-900 dark:bg-white rounded-xl flex items-center justify-center">
                  <Car className="w-6 h-6 text-white dark:text-navy-900" />
                </div>
                <span className="text-xl font-bold text-navy-900 dark:text-white">
                  AMSA Admin
                </span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/admin"
                className="px-4 py-2 rounded-lg bg-navy-100 dark:bg-navy-800 text-navy-900 dark:text-white font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/autos"
                className="px-4 py-2 rounded-lg text-navy-600 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors"
              >
                Inventario
              </Link>
              <Link
                to="/admin/imagenes"
                className="px-4 py-2 rounded-lg text-navy-600 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors"
              >
                Imágenes
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <span className="text-sm text-navy-600 dark:text-navy-300">
                Hola, {user.name}
              </span>
              <ThemeToggle />
              <form method="post">
                <button
                  type="submit"
                  name="intent"
                  value="logout"
                  className="p-2 rounded-lg text-navy-400 hover:text-navy-600 dark:hover:text-navy-200 hover:bg-navy-100 dark:hover:bg-navy-800 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy-900 dark:text-white">Dashboard</h1>
          <p className="text-navy-600 dark:text-navy-300 mt-1">
            Bienvenido al panel de administración de AMSA Autos
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-navy-900 rounded-2xl p-6 shadow-sm border border-navy-100 dark:border-navy-800"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-navy-900 dark:text-white">
                    {stats[stat.key as keyof typeof stats]}
                  </p>
                  <p className="text-sm text-navy-500 dark:text-navy-400">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick actions and recent cars */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold text-navy-900 dark:text-white mb-4">
              Acciones Rápidas
            </h2>
            <div className="space-y-3">
              <Link
                to="/admin/autos/nuevo"
                className="flex items-center gap-4 bg-white dark:bg-navy-900 rounded-xl p-4 shadow-sm border border-navy-100 dark:border-navy-800 hover:border-navy-300 dark:hover:border-navy-600 transition-colors group"
              >
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-navy-900 dark:text-white">Agregar Auto</p>
                  <p className="text-sm text-navy-500 dark:text-navy-400">
                    Nuevo vehículo al inventario
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-navy-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/admin/autos"
                className="flex items-center gap-4 bg-white dark:bg-navy-900 rounded-xl p-4 shadow-sm border border-navy-100 dark:border-navy-800 hover:border-navy-300 dark:hover:border-navy-600 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-navy-900 dark:text-white">Ver Inventario</p>
                  <p className="text-sm text-navy-500 dark:text-navy-400">
                    Gestionar vehículos
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-navy-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/admin/imagenes"
                className="flex items-center gap-4 bg-white dark:bg-navy-900 rounded-xl p-4 shadow-sm border border-navy-100 dark:border-navy-800 hover:border-navy-300 dark:hover:border-navy-600 transition-colors group"
              >
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Image className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-navy-900 dark:text-white">Imágenes del Sitio</p>
                  <p className="text-sm text-navy-500 dark:text-navy-400">
                    Gestionar banners y fotos
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-navy-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Recent Cars */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-navy-900 dark:text-white">
                Autos Recientes
              </h2>
              <Link
                to="/admin/autos"
                className="text-sm text-navy-600 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white transition-colors"
              >
                Ver todos →
              </Link>
            </div>

            <div className="bg-white dark:bg-navy-900 rounded-2xl shadow-sm border border-navy-100 dark:border-navy-800 overflow-hidden">
              {recentCars.length > 0 ? (
                <div className="divide-y divide-navy-100 dark:divide-navy-800">
                  {recentCars.map((car) => (
                    <Link
                      key={car.id}
                      to={`/admin/autos/${car.id}`}
                      className="flex items-center gap-4 p-4 hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors"
                    >
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-navy-100 dark:bg-navy-800 flex-shrink-0">
                        {car.images[0] ? (
                          <img
                            src={car.images[0].url}
                            alt={`${car.brand} ${car.model}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Car className="w-6 h-6 text-navy-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-navy-900 dark:text-white truncate">
                          {car.brand} {car.model}
                        </p>
                        <p className="text-sm text-navy-500 dark:text-navy-400">{car.year}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-navy-900 dark:text-white">
                          {formatPrice(car.price)}
                        </p>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            car.status === "available"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                              : car.status === "reserved"
                              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                          }`}
                        >
                          {car.status === "available"
                            ? "Disponible"
                            : car.status === "reserved"
                            ? "Reservado"
                            : "Vendido"}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Car className="w-12 h-12 text-navy-300 dark:text-navy-600 mx-auto mb-4" />
                  <p className="text-navy-600 dark:text-navy-400">No hay autos en el inventario</p>
                  <Link
                    to="/admin/autos/nuevo"
                    className="btn-primary mt-4 inline-block"
                  >
                    Agregar primer auto
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
