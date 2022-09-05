const { PrismaClient } = require('@prisma/client');
const argon = require('argon2');

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'test@gmail.com',
      password: await argon.hash('password'),
    }
  })

  const userDatas = await prisma.userData.create({
    data: {
      userId: user.id,
      firstname: 'Test',
      lastname: 'Touste',
      size: 185,
      weight: 85,
      gender: 'MALE',
      description: 'je suis présent',
      sport_frequence: 'ONCE_A_MONTH'
    }
  })
}

main().catch(e => {
  throw e
}
).finally(async () => {
  await prisma.$disconnect()
})