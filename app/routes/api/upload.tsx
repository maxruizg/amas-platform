import type { Route } from "./+types/upload";
import { requireAuth } from "~/lib/auth.server";

// This is a placeholder for file upload functionality
// In production, you would integrate with a service like:
// - Cloudinary
// - AWS S3
// - Uploadthing
// - Vercel Blob

export async function action({ request }: Route.ActionArgs) {
  await requireAuth(request);

  // For now, return a message explaining how to use image URLs
  return Response.json({
    message: "Para agregar imágenes, usa URLs de servicios como Cloudinary, Imgur, o cualquier servicio de hosting de imágenes.",
    instructions: [
      "1. Sube tu imagen a un servicio como Cloudinary o Imgur",
      "2. Copia la URL directa de la imagen",
      "3. Pega la URL en el campo correspondiente",
    ],
  });
}

export async function loader() {
  return Response.json({
    status: "ok",
    message: "Upload API endpoint",
  });
}
