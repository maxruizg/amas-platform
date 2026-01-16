import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@autosamsa.com.mx" },
    update: {},
    create: {
      email: "admin@autosamsa.com.mx",
      password: hashedPassword,
      name: "Administrador",
      role: "admin",
    },
  });

  console.log("✅ Admin user created:", admin.email);

  // Create sample cars
  const sampleCars = [
    {
      brand: "BMW",
      model: "X4",
      year: 2024,
      price: 1078000,
      mileage: 15000,
      fuelType: "gasoline",
      transmission: "automatic",
      color: "Negro",
      description: "BMW X4 en excelentes condiciones. Un solo dueño, servicio de agencia. Interiores de piel, sistema de navegación, sensores de estacionamiento, cámara de reversa. Garantía de agencia vigente.",
      status: "available",
      featured: true,
      images: [
        { url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80", isPrimary: true, order: 0 },
        { url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80", isPrimary: false, order: 1 },
      ],
    },
    {
      brand: "Jeep",
      model: "Wrangler Unlimited",
      year: 2021,
      price: 850000,
      mileage: 35000,
      fuelType: "gasoline",
      transmission: "automatic",
      color: "Blanco",
      description: "Jeep Wrangler Unlimited Sahara. Perfecta para aventuras todoterreno. Techo removible, tracción 4x4, sistema de sonido premium. Muy bien cuidada.",
      status: "available",
      featured: true,
      images: [
        { url: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80", isPrimary: true, order: 0 },
      ],
    },
    {
      brand: "Volvo",
      model: "XC90",
      year: 2021,
      price: 920000,
      mileage: 42000,
      fuelType: "hybrid",
      transmission: "automatic",
      color: "Gris",
      description: "Volvo XC90 T8 Híbrido. El SUV más seguro del mundo. Asientos para 7 pasajeros, sistema de sonido Bowers & Wilkins, conducción semi-autónoma Pilot Assist.",
      status: "available",
      featured: true,
      images: [
        { url: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80", isPrimary: true, order: 0 },
      ],
    },
    {
      brand: "Lincoln",
      model: "Navigator",
      year: 2021,
      price: 1350000,
      mileage: 28000,
      fuelType: "gasoline",
      transmission: "automatic",
      color: "Negro",
      description: "Lincoln Navigator Reserve. Lujo americano en su máxima expresión. Interiores de piel premium, sistema de entretenimiento para pasajeros traseros, suspensión adaptativa.",
      status: "available",
      featured: true,
      images: [
        { url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80", isPrimary: true, order: 0 },
      ],
    },
    {
      brand: "SEAT",
      model: "Arona",
      year: 2023,
      price: 420000,
      mileage: 12000,
      fuelType: "gasoline",
      transmission: "automatic",
      color: "Rojo",
      description: "SEAT Arona Style. SUV compacto ideal para la ciudad. Excelente rendimiento de combustible, pantalla táctil, Android Auto y Apple CarPlay.",
      status: "available",
      featured: true,
      images: [
        { url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80", isPrimary: true, order: 0 },
      ],
    },
    {
      brand: "Chevrolet",
      model: "Suburban",
      year: 2018,
      price: 680000,
      mileage: 75000,
      fuelType: "gasoline",
      transmission: "automatic",
      color: "Plata",
      description: "Chevrolet Suburban LT. El SUV familiar por excelencia. Amplio espacio para 8 pasajeros, capacidad de remolque, aire acondicionado tri-zona.",
      status: "available",
      featured: false,
      images: [
        { url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80", isPrimary: true, order: 0 },
      ],
    },
    {
      brand: "Honda",
      model: "CR-V",
      year: 2022,
      price: 520000,
      mileage: 25000,
      fuelType: "gasoline",
      transmission: "automatic",
      color: "Azul",
      description: "Honda CR-V Touring. SUV compacto con la confiabilidad Honda. Honda Sensing de serie, AWD, interior espacioso y versátil.",
      status: "reserved",
      featured: false,
      images: [
        { url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80", isPrimary: true, order: 0 },
      ],
    },
    {
      brand: "Toyota",
      model: "Camry",
      year: 2023,
      price: 580000,
      mileage: 18000,
      fuelType: "hybrid",
      transmission: "automatic",
      color: "Blanco",
      description: "Toyota Camry XLE Hybrid. Sedán ejecutivo con tecnología híbrida. Excelente rendimiento, interiores de piel, sistema JBL premium.",
      status: "available",
      featured: false,
      images: [
        { url: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80", isPrimary: true, order: 0 },
      ],
    },
  ];

  for (const carData of sampleCars) {
    const { images, ...car } = carData;

    const existingCar = await prisma.car.findFirst({
      where: {
        brand: car.brand,
        model: car.model,
        year: car.year,
      },
    });

    if (!existingCar) {
      await prisma.car.create({
        data: {
          ...car,
          images: {
            create: images,
          },
        },
      });
      console.log(`✅ Created car: ${car.brand} ${car.model} ${car.year}`);
    } else {
      console.log(`⏭️  Skipped existing car: ${car.brand} ${car.model} ${car.year}`);
    }
  }

  // Create sample site images
  const siteImages = [
    {
      section: "hero",
      url: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&q=80",
      title: "Banner Principal",
      alt: "Showroom de autos AMSA",
      order: 0,
      isActive: true,
    },
    {
      section: "about",
      url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
      title: "Nuestro Showroom",
      alt: "Interior del showroom AMSA",
      order: 0,
      isActive: true,
    },
  ];

  for (const imageData of siteImages) {
    const existing = await prisma.siteImage.findFirst({
      where: {
        section: imageData.section,
        url: imageData.url,
      },
    });

    if (!existing) {
      await prisma.siteImage.create({ data: imageData });
      console.log(`✅ Created site image: ${imageData.section}`);
    }
  }

  console.log("\n🎉 Database seeded successfully!");
  console.log("\n📧 Admin credentials:");
  console.log("   Email: admin@autosamsa.com.mx");
  console.log("   Password: admin123");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
