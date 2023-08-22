//this is in pure NOde.js because it has no relation to anything else in our project
const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: 'Famous People' },
        { name: 'Movies & TV' },
        { name: 'Animals' },
        { name: 'Games' },
        { name: 'Musicians' },
        { name: 'Philosophy' },
      ],
    });
  } catch (error) {
    console.log('Error seeding default categories', error);
  } finally {
    await db.$disconnect();
  }
}

main();
