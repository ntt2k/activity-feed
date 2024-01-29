import { PrismaClient, Prisma } from '@prisma/client'
import jsonData from './activity.json'

const prisma = new PrismaClient()

const activityData: Prisma.ActivityCreateInput[] = jsonData.activity;

async function main() {
  console.log(`Start seeding ...`)
  for (const a of activityData) {
    const activity = await prisma.activity.create({
      data: a
    })
    console.log(`Create activity with id: ${activity.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
