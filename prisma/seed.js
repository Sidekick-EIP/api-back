const { PrismaClient } = require('@prisma/client');
const argon = require('argon2');

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      username: "test",
      email: 'test@gmail.com',
      password: await argon.hash('password'),
    }
  })
}

main().catch(e => {
  throw e
}
).finally(async () => {
  await prisma.$disconnect()
})