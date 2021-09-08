import express from "express"

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from '../models/user'
import { SECRET } from "../utils/config"
import { authedUser, userLoginRequest } from "../types"

const router = express.Router();

router.post('/', async (request, response) => {
  const body: userLoginRequest = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user && await bcrypt.compare(body.password, user.passwordHash)

  if (!passwordCorrect) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, SECRET)
  const authedUser: authedUser = { token, username: user.username, name: user.name }

  response
    .status(200)
    .send(authedUser)
})

export default router