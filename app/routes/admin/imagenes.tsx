import { useState } from "react";
import { Form, useNavigation, Link } from "react-router";
import type { Route } from "./+types/imagenes";
import { prisma } from "~/lib/db.server";
import { requireAuth } from "~/lib/auth.server";
import { motion } from "framer-motion";
import { Car, Image, Plus, X, Save, Trash2, LogOut } from "lucide-react";
import { ThemeToggle } from "~/components/ThemeToggle";

export function meta() {
  return [{ title: "Imágenes del Sitio | Admin AMSA" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  await requireAuth(request);

  const images = await prisma.siteImage.findMany({
    orderBy: [{ section: "asc" }, { order: "asc" }],
  });

  // Group by section
  const groupedImages = images.reduce((acc, img) => {
    if (!acc[img.section]) {
      acc[img.section] = [];
    }
    acc[img.section].push(img);
    return acc;
  }, {} as Record<string, typeof images>);

  return { groupedImages };
}

export async function action({ request }: Route.ActionArgs) {
  await requireAuth(request);

  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "add") {
    const section = formData.get("section") as string;
    const url = formData.get("url") as string;
    const title = formData.get("title") as string;
    const alt = formData.get("alt") as string;

    if (!section || !url) {
      return { error: "Sección y URL son requeridos" };
    }

    const maxOrder = await prisma.siteImage.findFirst({
      where: { section },
      orderBy: { order: "desc" },
    });

    await prisma.siteImage.create({
      data: {
        section,
        url,
        title: title || null,
        alt: alt || null,
        order: (maxOrder?.order ?? -1) + 1,
      },
    });

    return { success: true };
  }

  if (intent === "delete") {
    const imageId = formData.get("imageId") as string;
    await prisma.siteImage.delete({ where: { id: imageId } });
    return { success: true };
  }

  if (intent === "toggle") {
    const imageId = formData.get("imageId") as string;
    const image = await prisma.siteImage.findUnique({ where: { id: imageId } });
    if (image) {
      await prisma.siteImage.update({
        where: { id: imageId },
        data: { isActive: !image.isActive },
      });
    }
    return { success: true };
  }

  return null;
}

const sections = [
  { value: "hero", label: "Hero / Banner Principal" },
  { value: "about", label: "Nosotros" },
  { value: "services", label: "Servicios" },
  { value: "gallery", label: "Galería" },
];

export default function AdminImagenes({ loaderData, actionData }: Route.ComponentProps) {
  const { groupedImages } = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [showAddForm, setShowAddForm] = useState(false);

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
                className="px-4 py-2 rounded-lg text-navy-600 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors"
              >
                Inventario
              </Link>
              <Link
                to="/admin/imagenes"
                className="px-4 py-2 rounded-lg bg-navy-100 dark:bg-navy-800 text-navy-900 dark:text-white font-medium"
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title and actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy-900 dark:text-white">
              Imágenes del Sitio
            </h1>
            <p className="text-navy-600 dark:text-navy-300 mt-1">
              Gestiona las imágenes de las diferentes secciones del sitio web
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary flex items-center gap-2 w-fit"
          >
            <Plus className="w-5 h-5" />
            Agregar Imagen
          </button>
        </div>

        {/* Success/Error messages */}
        {actionData?.success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl mb-6"
          >
            Operación completada exitosamente
          </motion.div>
        )}

        {actionData?.error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl mb-6"
          >
            {actionData.error}
          </motion.div>
        )}

        {/* Images by section */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div
              key={section.value}
              className="bg-white dark:bg-navy-900 rounded-2xl shadow-sm border border-navy-100 dark:border-navy-800 overflow-hidden"
            >
              <div className="px-6 py-4 bg-navy-50 dark:bg-navy-800 border-b border-navy-100 dark:border-navy-700">
                <h2 className="text-lg font-semibold text-navy-900 dark:text-white">
                  {section.label}
                </h2>
              </div>

              <div className="p-6">
                {groupedImages[section.value]?.length > 0 ? (
                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {groupedImages[section.value].map((image) => (
                      <div
                        key={image.id}
                        className={`relative rounded-xl overflow-hidden border-2 ${
                          image.isActive
                            ? "border-green-400 dark:border-green-500"
                            : "border-navy-200 dark:border-navy-700 opacity-50"
                        }`}
                      >
                        <div className="aspect-video">
                          <img
                            src={image.url}
                            alt={image.alt || ""}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Image info */}
                        <div className="p-3 bg-white dark:bg-navy-800">
                          {image.title && (
                            <p className="font-medium text-navy-900 dark:text-white text-sm truncate">
                              {image.title}
                            </p>
                          )}
                          <p className="text-xs text-navy-500 dark:text-navy-400 truncate">
                            {image.url}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Form method="post">
                            <input type="hidden" name="intent" value="toggle" />
                            <input type="hidden" name="imageId" value={image.id} />
                            <button
                              type="submit"
                              className={`p-2 rounded-lg ${
                                image.isActive
                                  ? "bg-green-500 text-white"
                                  : "bg-navy-500 text-white"
                              }`}
                              title={image.isActive ? "Desactivar" : "Activar"}
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                {image.isActive ? (
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                ) : (
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                  />
                                )}
                              </svg>
                            </button>
                          </Form>
                          <Form method="post">
                            <input type="hidden" name="intent" value="delete" />
                            <input type="hidden" name="imageId" value={image.id} />
                            <button
                              type="submit"
                              className="p-2 rounded-lg bg-red-500 text-white"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </Form>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-navy-500 dark:text-navy-400">
                    <Image className="w-12 h-12 mx-auto mb-3 text-navy-300 dark:text-navy-600" />
                    <p>No hay imágenes en esta sección</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add image modal */}
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-navy-900 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white">
                  Agregar Imagen
                </h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-2 text-navy-400 hover:text-navy-600 dark:hover:text-navy-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <Form method="post" onSubmit={() => setShowAddForm(false)}>
                <input type="hidden" name="intent" value="add" />

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-2">
                      Sección *
                    </label>
                    <select name="section" required className="w-full rounded-xl bg-white dark:bg-navy-800 border-navy-200 dark:border-navy-700 text-navy-900 dark:text-white">
                      <option value="">Seleccionar sección</option>
                      {sections.map((section) => (
                        <option key={section.value} value={section.value}>
                          {section.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-2">
                      URL de la imagen *
                    </label>
                    <input
                      type="url"
                      name="url"
                      required
                      placeholder="https://ejemplo.com/imagen.jpg"
                      className="w-full bg-white dark:bg-navy-800 border-navy-200 dark:border-navy-700 text-navy-900 dark:text-white placeholder:text-navy-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-2">
                      Título (opcional)
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Título de la imagen"
                      className="w-full bg-white dark:bg-navy-800 border-navy-200 dark:border-navy-700 text-navy-900 dark:text-white placeholder:text-navy-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-2">
                      Texto alternativo (opcional)
                    </label>
                    <input
                      type="text"
                      name="alt"
                      placeholder="Descripción para accesibilidad"
                      className="w-full bg-white dark:bg-navy-800 border-navy-200 dark:border-navy-700 text-navy-900 dark:text-white placeholder:text-navy-400"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancelar
                  </button>
                </div>
              </Form>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}
