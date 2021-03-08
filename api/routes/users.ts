import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()

const prisma = new PrismaClient()

/* GET users listing. */
router.get('/users', async function (req, res, next) {
  const users = await prisma.user.findMany()
  res.json(users)
})

/* GET user by ID. */
router.get('/users/:id', async function (req, res, next) {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id
    }
  })
  res.json(user)
})

router.post('/user', async (req, res) => {
  // const result = await prisma.user.create({
  //   data: {
  //     email: req.body.email,
  //     name: req.body.name
  //   }
  // })
  // res.json(result)
})

export default router
