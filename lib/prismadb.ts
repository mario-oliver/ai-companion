/**
 * This library will be used by our routes and library components
 */

import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

//this prevents hot reloading issues with Next.js
const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb;

export default prismadb;
