// ============================================
// MOCK DATABASE FOR DEMO DEPLOYMENT
// ============================================
// To enable real database, uncomment the Prisma code below
// and set up Turso or another database provider

import { mockDb } from "./mock-data";

// Export mock database as prisma for compatibility
export const prisma = mockDb;

// ============================================
// REAL DATABASE CODE (COMMENTED OUT)
// ============================================
// Uncomment below and comment out the mock code above to use real database

/*
import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

let prisma: PrismaClient;

declare global {
  var __db__: PrismaClient | undefined;
}

function createPrismaClient() {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

  if (tursoUrl && tursoAuthToken) {
    const libsql = createClient({
      url: tursoUrl,
      authToken: tursoAuthToken,
    });
    const adapter = new PrismaLibSQL(libsql);
    return new PrismaClient({ adapter });
  } else {
    return new PrismaClient();
  }
}

if (process.env.NODE_ENV === "production") {
  prisma = createPrismaClient();
} else {
  if (!global.__db__) {
    global.__db__ = createPrismaClient();
  }
  prisma = global.__db__;
}

export { prisma };
*/
