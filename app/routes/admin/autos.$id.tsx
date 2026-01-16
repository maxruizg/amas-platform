import { Form, redirect, useNavigation, Link } from "react-router";
import type { Route } from "./+types/autos.$id";
import { prisma } from "~/lib/db.server";
import { requireAuth } from "~/lib/auth.server";
import { motion } from "framer-motion";
import { Car, ArrowLeft, Save, Plus, X, Trash2, LogOut } from "lucide-react";
import { carBrands, fuelTypes, transmissionTypes } from "~/lib/utils";
import { z } from "zod";
import { useState } from "react";
import { ThemeToggle } from "~/components/ThemeToggle";

export function meta({ data }: Route.MetaArgs) {
  if (!data?.car) return [{ title: "Auto no encontrado | Admin AMSA" }];
  return [{ title: `Editar ${data.car.brand} ${data.car.model} | Admin AMSA` }];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  await requireAuth(request);

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

  return { car };
}

const carSchema = z.object({
  brand: z.string().min(1, "Marca requerida"),
  model: z.string().min(1, "Modelo requerido"),
  year: z.coerce.number().min(1990).max(new Date().getFullYear() + 1),
  price: z.coerce.number().min(1, "Precio requerido"),
  mileage: z.coerce.number().min(0),
  fuelType: z.string().min(1, "Tipo de combustible requerido"),
  transmission: z.string().min(1, "Transmisión requerida"),
  color: z.string().min(1, "Color requerido"),
  description: z.string().min(10, "Descripción muy corta"),
  status: z.string(),
  featured: z.coerce.boolean().default(false),
});

export async function action({ request, params }: Route.ActionArgs) {
  await requireAuth(request);

  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "delete") {
    await prisma.car.delete({ where: { id: params.id } });
    return redirect("/admin/autos");
  }

  const data = Object.fromEntries(formData);
  const imageUrls = formData.getAll("imageUrls") as string[];

  const result = carSchema.safeParse({
    ...data,
    featured: data.featured === "on",
  });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Delete existing images and create new ones
  await prisma.carImage.deleteMany({ where: { carId: params.id } });

  await prisma.car.update({
    where: { id: params.id },
    data: {
      ...result.data,
      images: {
        create: imageUrls
          .filter((url) => url.trim())
          .map((url, index) => ({
            url,
            order: index,
            isPrimary: index === 0,
          })),
      },
    },
  });

  return { success: true };
}

export default function EditarAuto({ loaderData, actionData }: Route.ComponentProps) {
  const { car } = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [imageUrls, setImageUrls] = useState<string[]>(
    car.images.length > 0 ? car.images.map((img) => img.url) : [""]
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const addImageUrl = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const updateImageUrl = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

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
                className="px-4 py-2 rounded-lg text-navy-600 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/autos"
                className="px-4 py-2 rounded-lg bg-navy-100 dark:bg-navy-800 text-navy-900 dark:text-white font-medium"
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

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <form method="post" action="/admin">
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link
          to="/admin/autos"
          className="inline-flex items-center gap-2 text-navy-600 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inventario
        </Link>

        {/* Success message */}
        {actionData?.success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl mb-6"
          >
            Auto actualizado correctamente
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-navy-900 rounded-2xl shadow-sm border border-navy-100 dark:border-navy-800 p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-navy-900 dark:text-white">
              Editar {car.brand} {car.model}
            </h1>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <Form method="post" className="space-y-6">
            {/* Basic info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-2">
                  Marca *
                </label>
                <select
                  name="brand"
                  required
                  defaultValue={car.brand}
                  className="w-full rounded-xl bg-white dark:bg-navy-800 border-navy-200 dark:border-navy-700 text-navy-900 dark:text-white"
                >
                  <option value="">Seleccionar marca</option>
                  {carBrands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-2">
                  Modelo *
                </label>
                <input
                  type="text"
                  name="model"
                  required
                  defaultValue={car.model}
                  className="w-full bg-white dark:bg-navy-800 border-navy-200 dark:border-navy-700 text-navy-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-2">
                  Año *
                </label>
                <input
                  type="number"
                  name="year"
                  required
                  defaultValue={car.year}
                  min="1990"
                  max={new Date().getFullYear() + 1}
                  className="w-full bg-white dark:bg-navy-800 border-navy-200 dark:border-navy-700 text-navy-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-2">
                  Precio (MXN) *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  defaultValue={car.price}
                  min="0"
                  className="w-full bg-white dark:bg-navy-800 border-navy-200 dark:border-navy-700 text-navy-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-2">
                  Kilometraje *
                </label>
                <input
                  type="number"
                  name="mileage"
                  required
                  defaultValue={car.mileage}
                  min="0"
                  className="w-full bg-white dark:bg-navy-800 border-navy-200 dark:border-navy-700 text-navy-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-2">
                  Color *
                </label>
                <input
                  type="text"
                  name="color"
                  required
                  defaultValue={car.color}
                  className="w-full bg-white dark:bg-navy-800 border-navy-200 dark:border-navy-700 text-navy-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-2">
                  Combustible *
                </label>
                <select
                  name="fuelType"
                  required
                  defaultValue={car.fuelType}
                  className="w-full rounded-xl bg-white dark:bg-navy-800 border-navy-200 dark:border-navy-700 text-navy-900 dark:text-white"
                >
                  <option value="">Seleccionar</option>
                  {fuelTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-2">
                  Transmisión *
                </label>
                <select
                  name="transmission"
                  required
                  defaultValue={car.transmission}
                  className="w-full rounded-xl bg-white dark:bg-navy-800 border-navy-200 dark:border-navy-700 text-navy-900 dark:text-white"
                >
                  <option value="">Seleccionar</option>
                  {transmissionTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-2">
                  Estado
                </label>
                <select
                  name="status"
                  defaultValue={car.status}
                  className="w-full rounded-xl bg-white dark:bg-navy-800 border-navy-200 dark:border-navy-700 text-navy-900 dark:text-white"
                >
                  <option value="available">Disponible</option>
                  <option value="reserved">Reservado</option>
                  <option value="sold">Vendido</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  defaultChecked={car.featured}
                  className="w-5 h-5 rounded border-navy-300 dark:border-navy-600 text-navy-900 dark:text-white bg-white dark:bg-navy-800 focus:ring-navy-500"
                />
                <label htmlFor="featured" className="text-sm font-medium text-navy-700 dark:text-navy-200">
                  Mostrar como destacado
                </label>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-2">
                Descripción *
              </label>
              <textarea
                name="description"
                required
                rows={4}
                defaultValue={car.description}
                className="w-full resize-none bg-white dark:bg-navy-800 border-navy-200 dark:border-navy-700 text-navy-900 dark:text-white"
              />
            </div>

            {/* Images */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-200">
                  URLs de Imágenes
                </label>
                <button
                  type="button"
                  onClick={addImageUrl}
                  className="text-sm text-navy-600 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Agregar imagen
                </button>
              </div>
              <div className="space-y-3">
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      name="imageUrls"
                      value={url}
                      onChange={(e) => updateImageUrl(index, e.target.value)}
                      placeholder="https://ejemplo.com/imagen.jpg"
                      className="flex-1 bg-white dark:bg-navy-800 border-navy-200 dark:border-navy-700 text-navy-900 dark:text-white placeholder:text-navy-400"
                    />
                    {imageUrls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageUrl(index)}
                        className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Image previews */}
              {imageUrls.some((url) => url.trim()) && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {imageUrls
                    .filter((url) => url.trim())
                    .map((url, index) => (
                      <div
                        key={index}
                        className="aspect-video rounded-lg overflow-hidden bg-navy-100 dark:bg-navy-800"
                      >
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "";
                            e.currentTarget.className = "hidden";
                          }}
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex gap-4 pt-6 border-t border-navy-100 dark:border-navy-800">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Guardar Cambios
                  </>
                )}
              </button>
              <Link to="/admin/autos" className="btn-secondary">
                Cancelar
              </Link>
            </div>
          </Form>
        </motion.div>

        {/* Delete confirmation modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-navy-900 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">
                ¿Eliminar este auto?
              </h3>
              <p className="text-navy-600 dark:text-navy-300 mb-6">
                Esta acción no se puede deshacer. Se eliminarán también todas las
                imágenes asociadas.
              </p>
              <div className="flex gap-4">
                <Form method="post" className="flex-1">
                  <input type="hidden" name="intent" value="delete" />
                  <button
                    type="submit"
                    className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
                  >
                    Sí, eliminar
                  </button>
                </Form>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-3 bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-200 rounded-xl font-semibold hover:bg-navy-200 dark:hover:bg-navy-700 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}
