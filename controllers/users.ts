import bcrypt from 'bcrypt'
import express from 'express';
import User from '../models/user'
import { userRegisterRequest } from '../types';

const router = express.Router();

router.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

router.post('/', async (request, response) => {
  const body: userRegisterRequest = request.body

  if (!body.password) {
    return response.status(400).json({
      error: 'password is required'
    })
  }
  if (body.password.length < 3) {
    return response.status(400).json({
      error: 'password must be at least 3 characters long'
    })
  }
  if (!body.name) {
    return response.status(400).json({
      error: 'name is required'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const avatarURL = body.avatarURL || "https://ui-avatars.com/api/?name=" + body.name.replace(" ", "+")

  const user = new User({
    username: body.username,
    name: body.name,
    avatarURL,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.json(savedUser)
  } catch (error: any) {
    return response.status(400).json({
      error: error.message
    })

  }
})

export default router