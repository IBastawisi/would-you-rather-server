import { MONGODB_URI} from './utils/config';
import express from 'express';
import cors from 'cors';
require('express-async-errors')

const app = express()

import loginRouter from './controllers/login';
import usersRouter from './controllers/users';
import questionsRouter from './controllers/questions';

import * as middleware from './utils/middleware';

import mongoose from "mongoose";

console.info('connecting to', MONGODB_URI)

MONGODB_URI && mongoose.connect(MONGODB_URI)
  .then(() => {
    console.info('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/questions', questionsRouter)

app.get('*', (req, res) => {
  res.send("API for Would You Rather ReactND Project")
})

app.use(middleware.errorHandler)

export default app