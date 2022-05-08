const { PrismaClient } = require('@prisma/client');
const argon = require('argon2');

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      username: "test",
      email: 'test@gmail.com',
      password: await argon.hash('password'),
      firstname: "Test",
      lastname: "LeTest",
      size: 180,
      weight: 75,
      gender: 'MALE',
      description: 'Testttttttt',
      sport_frequence: 'TWICE_A_WEEK'
    }
  })
}

main().catch(e => {
  throw e
}
).finally(async () => {
  await prisma.$disconnect()
})