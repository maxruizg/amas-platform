import { useState } from "react";
import { Form, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/login";
import { authenticateUser, getOptionalUser } from "~/lib/auth.server";
import { motion } from "framer-motion";
import { Car, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { ThemeToggle } from "~/components/ThemeToggle";

export function meta() {
  return [{ title: "Admin Login | AMSA Autos" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getOptionalUser(request);
  if (user) {
    return redirect("/admin");
  }
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email y contraseña son requeridos" };
  }

  const result = await authenticateUser(email, password);

  if (!result) {
    return { error: "Credenciales inválidas" };
  }

  return redirect("/admin", {
    headers: {
      "Set-Cookie": `auth_token=${result.token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`,
    },
  });
}

export default function AdminLogin({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-navy-100 dark:bg-navy-950 flex items-center justify-center p-4">
      {/* Theme toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-navy-200/50 dark:bg-navy-800/30 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-navy-300/30 dark:bg-navy-700/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white dark:bg-navy-900 rounded-3xl p-8 shadow-2xl dark:shadow-navy-950/50">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-navy-900 dark:bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Car className="w-9 h-9 text-white dark:text-navy-900" />
            </div>
            <h1 className="text-2xl font-bold text-navy-900 dark:text-white">
              Panel de Administración
            </h1>
            <p className="text-navy-500 dark:text-navy-400 mt-1">AMSA Autos</p>
          </div>

          {/* Error message */}
          {actionData?.error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl mb-6"
            >
              {actionData.error}
            </motion.div>
          )}

          {/* Login form */}
          <Form method="post" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400 z-10" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="admin@autosamsa.com.mx"
                  style={{ paddingLeft: '3rem' }}
                  className="w-full pr-4 py-3 rounded-xl border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-navy-900 dark:text-white placeholder:text-navy-400 transition-all duration-300 focus:border-navy-500 dark:focus:border-navy-400 focus:ring-2 focus:ring-navy-500/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-2"
              >
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400 z-10" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
                  className="w-full py-3 rounded-xl border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-navy-900 dark:text-white placeholder:text-navy-400 transition-all duration-300 focus:border-navy-500 dark:focus:border-navy-400 focus:ring-2 focus:ring-navy-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600 dark:hover:text-navy-200 z-10"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full"
            >
              {isSubmitting ? (
                <motion.span
                  className="flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Iniciando sesión...
                </motion.span>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </Form>

          {/* Back to site */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-navy-500 dark:text-navy-400 hover:text-navy-700 dark:hover:text-navy-200 transition-colors"
            >
              ← Volver al sitio
            </a>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-navy-500 dark:text-navy-400 text-sm mt-6">
          Acceso restringido a personal autorizado
        </p>
      </motion.div>
    </div>
  );
}
