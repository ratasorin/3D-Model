import prisma from '../utils/prisma';

const run = async () => {
  await prisma.user.deleteMany({});
};

run()
  .catch(() => {
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
