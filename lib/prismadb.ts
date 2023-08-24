/**
 * This library will be used by our routes and library components
 */

import { PrismaClient } from '@prisma/client';

declare global {
  var prismadb: PrismaClient | undefined;
}

//this prevents hot reloading issues with Next.js
const prismadb = globalThis.prismadb || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prismadb = prismadb;

export default prismadb;
