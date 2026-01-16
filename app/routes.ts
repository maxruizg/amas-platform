import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("inventario", "routes/inventario.tsx"),
  route("auto/:id", "routes/auto.$id.tsx"),
  route("servicios", "routes/servicios.tsx"),
  route("nosotros", "routes/nosotros.tsx"),
  route("contacto", "routes/contacto.tsx"),

  // Admin routes
  route("admin/login", "routes/admin/login.tsx"),
  route("admin", "routes/admin/index.tsx"),
  route("admin/autos", "routes/admin/autos.tsx"),
  route("admin/autos/nuevo", "routes/admin/autos.nuevo.tsx"),
  route("admin/autos/:id", "routes/admin/autos.$id.tsx"),
  route("admin/imagenes", "routes/admin/imagenes.tsx"),

  // API routes
  route("api/upload", "routes/api/upload.tsx"),
] satisfies RouteConfig;
