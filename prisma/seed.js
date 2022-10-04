const { PrismaClient } = require('@prisma/client');
const argon = require('argon2');

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'test@gmail.com',
      password: await argon.hash('password'),
      calories: {
        create: [
          {
            nbCalories: 1500
          },
          {
            nbCalories: 1700
          },
          {
            nbCalories: 1880
          },
          {
            nbCalories: 2000
          },
          {
            nbCalories: 2400
          },
          {
            nbCalories: 1700
          },
          {
            nbCalories: 1900
          },
        ]
      },
      steps: {
        create: [
          {
            nbOfSteps: 500
          },
          {
            nbOfSteps: 1000
          },
          {
            nbOfSteps: 1500
          },
          {
            nbOfSteps: 200
          },
          {
            nbOfSteps: 2000
          },
          {
            nbOfSteps: 5000
          },
          {
            nbOfSteps: 10000
          },
        ]
      }
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

  let calory = [];
  for (let i = 0; i < 7; i++) {
    let k = Math.floor(Math.random() * 2500);
    calory.push({
      where : {
        nbCalories: k
      },
      create: {
        userId: user.id,
        nbCalories: k
      }
    });
  }
}

main().catch(e => {
  throw e
}
).finally(async () => {
  await prisma.$disconnect()
})