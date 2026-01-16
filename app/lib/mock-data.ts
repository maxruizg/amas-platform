// Mock data for demo deployment without database

export const mockCars = [
  {
    id: "1",
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
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    images: [
      { id: "img1", url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80", alt: "BMW X4", isPrimary: true, order: 0, carId: "1", createdAt: new Date() },
      { id: "img2", url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80", alt: "BMW X4 Interior", isPrimary: false, order: 1, carId: "1", createdAt: new Date() },
    ],
  },
  {
    id: "2",
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
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
    images: [
      { id: "img3", url: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80", alt: "Jeep Wrangler", isPrimary: true, order: 0, carId: "2", createdAt: new Date() },
    ],
  },
  {
    id: "3",
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
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08"),
    images: [
      { id: "img4", url: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80", alt: "Volvo XC90", isPrimary: true, order: 0, carId: "3", createdAt: new Date() },
    ],
  },
  {
    id: "4",
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
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
    images: [
      { id: "img5", url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80", alt: "Lincoln Navigator", isPrimary: true, order: 0, carId: "4", createdAt: new Date() },
    ],
  },
  {
    id: "5",
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
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
    images: [
      { id: "img6", url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80", alt: "SEAT Arona", isPrimary: true, order: 0, carId: "5", createdAt: new Date() },
    ],
  },
  {
    id: "6",
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
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    images: [
      { id: "img7", url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80", alt: "Chevrolet Suburban", isPrimary: true, order: 0, carId: "6", createdAt: new Date() },
    ],
  },
  {
    id: "7",
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
    createdAt: new Date("2023-12-28"),
    updatedAt: new Date("2023-12-28"),
    images: [
      { id: "img8", url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80", alt: "Honda CR-V", isPrimary: true, order: 0, carId: "7", createdAt: new Date() },
    ],
  },
  {
    id: "8",
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
    createdAt: new Date("2023-12-25"),
    updatedAt: new Date("2023-12-25"),
    images: [
      { id: "img9", url: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80", alt: "Toyota Camry", isPrimary: true, order: 0, carId: "8", createdAt: new Date() },
    ],
  },
  {
    id: "9",
    brand: "Mercedes-Benz",
    model: "GLE 450",
    year: 2022,
    price: 1250000,
    mileage: 22000,
    fuelType: "gasoline",
    transmission: "automatic",
    color: "Blanco",
    description: "Mercedes-Benz GLE 450 4MATIC. Lujo alemán con tecnología de punta. Sistema MBUX, conducción semi-autónoma, interiores de piel Nappa.",
    status: "available",
    featured: true,
    createdAt: new Date("2023-12-20"),
    updatedAt: new Date("2023-12-20"),
    images: [
      { id: "img10", url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80", alt: "Mercedes-Benz GLE", isPrimary: true, order: 0, carId: "9", createdAt: new Date() },
    ],
  },
];

export const mockSiteImages = [
  {
    id: "site1",
    section: "hero",
    url: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&q=80",
    title: "Banner Principal",
    alt: "Showroom de autos AMSA",
    order: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "site2",
    section: "about",
    url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
    title: "Nuestro Showroom",
    alt: "Interior del showroom AMSA",
    order: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockUser = {
  id: "admin1",
  email: "admin@autosamsa.com.mx",
  password: "$2b$10$DonzYRROWiBoV.dDapDuTuvLc11wtVvPcDqWhb4z5p5Nj.Ju.WwvO", // admin123
  name: "Administrador",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Helper functions to simulate database queries
export const mockDb = {
  car: {
    findMany: async (options?: any) => {
      let cars = [...mockCars];

      if (options?.where) {
        if (options.where.status) {
          if (options.where.status.not) {
            cars = cars.filter(c => c.status !== options.where.status.not);
          } else {
            cars = cars.filter(c => c.status === options.where.status);
          }
        }
        if (options.where.featured !== undefined) {
          cars = cars.filter(c => c.featured === options.where.featured);
        }
        if (options.where.brand) {
          cars = cars.filter(c => c.brand === options.where.brand);
        }
        if (options.where.id?.not) {
          cars = cars.filter(c => c.id !== options.where.id.not);
        }
        if (options.where.OR) {
          cars = cars.filter(c =>
            options.where.OR.some((condition: any) => {
              if (condition.brand?.contains) {
                return c.brand.toLowerCase().includes(condition.brand.contains.toLowerCase());
              }
              if (condition.model?.contains) {
                return c.model.toLowerCase().includes(condition.model.contains.toLowerCase());
              }
              if (condition.description?.contains) {
                return c.description.toLowerCase().includes(condition.description.contains.toLowerCase());
              }
              return false;
            })
          );
        }
        if (options.where.price) {
          if (options.where.price.gte) {
            cars = cars.filter(c => c.price >= options.where.price.gte);
          }
          if (options.where.price.lte) {
            cars = cars.filter(c => c.price <= options.where.price.lte);
          }
        }
        if (options.where.year) {
          if (options.where.year.gte) {
            cars = cars.filter(c => c.year >= options.where.year.gte);
          }
          if (options.where.year.lte) {
            cars = cars.filter(c => c.year <= options.where.year.lte);
          }
        }
        if (options.where.fuelType) {
          cars = cars.filter(c => c.fuelType === options.where.fuelType);
        }
        if (options.where.transmission) {
          cars = cars.filter(c => c.transmission === options.where.transmission);
        }
      }

      if (options?.orderBy?.createdAt === "desc") {
        cars.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      }

      if (options?.take) {
        cars = cars.slice(0, options.take);
      }

      return cars;
    },
    findUnique: async (options: any) => {
      return mockCars.find(c => c.id === options.where.id) || null;
    },
    findFirst: async (options?: any) => {
      let cars = [...mockCars];
      if (options?.where) {
        if (options.where.brand && options.where.model && options.where.year) {
          return cars.find(c =>
            c.brand === options.where.brand &&
            c.model === options.where.model &&
            c.year === options.where.year
          ) || null;
        }
      }
      return cars[0] || null;
    },
    count: async (options?: any) => {
      let cars = [...mockCars];
      if (options?.where?.status) {
        cars = cars.filter(c => c.status === options.where.status);
      }
      return cars.length;
    },
    create: async (data: any) => {
      console.log("Mock: Would create car", data);
      return { id: "new-car", ...data.data };
    },
    update: async (options: any) => {
      console.log("Mock: Would update car", options);
      return mockCars.find(c => c.id === options.where.id);
    },
    delete: async (options: any) => {
      console.log("Mock: Would delete car", options);
      return { id: options.where.id };
    },
  },
  user: {
    findUnique: async (options: any) => {
      if (options.where.email === mockUser.email) {
        return mockUser;
      }
      return null;
    },
    upsert: async () => mockUser,
    create: async () => mockUser,
  },
  siteImage: {
    findMany: async () => mockSiteImages,
    findFirst: async () => mockSiteImages[0],
    create: async (data: any) => {
      console.log("Mock: Would create site image", data);
      return { id: "new-image", ...data.data };
    },
    update: async (options: any) => {
      console.log("Mock: Would update site image", options);
      return mockSiteImages[0];
    },
    delete: async (options: any) => {
      console.log("Mock: Would delete site image", options);
      return { id: options.where.id };
    },
  },
  contactSubmission: {
    create: async (data: any) => {
      console.log("Mock: Would create contact submission", data);
      return { id: "new-contact", ...data.data };
    },
    count: async () => 3,
  },
  carImage: {
    deleteMany: async () => {
      console.log("Mock: Would delete car images");
      return { count: 0 };
    },
  },
};
