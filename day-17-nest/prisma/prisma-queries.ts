import 'dotenv/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // CREATE USER
  const user = await prisma.user.create({
    data: {
      name: 'Hamza',
    },
  });

  console.log('Created user:', user);

  // CREATE TASK
  const task = await prisma.task.create({
    data: {
      title: 'Learn Prisma',
      description: 'Practice Prisma ORM and database queries',
      userId: user.id,
    },
  });

  console.log('Created task:', task);

  // READ USERS
  const users = await prisma.user.findMany();

  console.log('All users:', users);

  // READ ONE USER
  const singleUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  console.log('Single user:', singleUser);

  // UPDATE USER
  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name: 'Hamza Updated',
    },
  });

  console.log('Updated user:', updatedUser);

  // RELATION: USER + TASKS
  const usersWithTasks = await prisma.user.findMany({
    include: {
      tasks: true,
    },
  });

  console.log('Users with tasks:', usersWithTasks);

  // DELETE TASK
  await prisma.task.delete({
    where: {
      id: task.id,
    },
  });

  console.log('Task deleted');

  // DELETE USER
  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });

  console.log('User deleted');
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });