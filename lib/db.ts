// lib/prisma.ts or db.ts
import "dotenv/config";
import { PrismaClient } from '../generated/prisma/client'

const globalForPrisma = global as unknown as { 
  prisma: PrismaClient | undefined
};

export const db = globalForPrisma.prisma ?? new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL, // ✅ Sahi property
})

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}