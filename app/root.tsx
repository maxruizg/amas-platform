import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { motion, AnimatePresence } from "framer-motion";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function meta() {
  return [
    { title: "AMSA Autos | Seminuevos Certificados en CDMX" },
    {
      name: "description",
      content:
        "Líder en autos seminuevos certificados en Ciudad de México desde 1978. Encuentra tu próximo auto con garantía, financiamiento y el mejor servicio.",
    },
    { name: "keywords", content: "autos seminuevos, cdmx, carros usados, financiamiento, garantía" },
    { property: "og:title", content: "AMSA Autos | Seminuevos Certificados" },
    { property: "og:description", content: "Líder en autos seminuevos certificados en CDMX desde 1978." },
    { property: "og:type", content: "website" },
  ];
}

// Script to apply saved theme (default is light mode)
const themeScript = `
  (function() {
    const stored = localStorage.getItem('theme');
    // Always remove dark class first, then add only if explicitly set to dark
    document.documentElement.classList.remove('dark');
    if (stored === 'dark') {
      document.documentElement.classList.add('dark');
    }
  })();
`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#102a43" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Meta />
        <Links />
      </head>
      <body className="overflow-x-hidden">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "¡Oops!";
  let details = "Ocurrió un error inesperado.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "La página que buscas no existe."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-navy-50 dark:bg-navy-950">
      <div className="text-center px-4">
        <h1 className="text-8xl font-bold text-navy-900 dark:text-white mb-4">{message}</h1>
        <p className="text-xl text-navy-600 dark:text-navy-300 mb-8">{details}</p>
        <a
          href="/"
          className="btn-primary inline-block"
        >
          Volver al inicio
        </a>
        {stack && (
          <pre className="mt-8 p-4 bg-navy-900 text-navy-200 rounded-xl overflow-x-auto text-left text-sm max-w-2xl mx-auto">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}
