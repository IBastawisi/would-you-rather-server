import jwt from 'jsonwebtoken';
import User from '../models/user';
import Question from '../models/question';
import express from 'express';
import { SECRET } from '../utils/config';
import { question, questionPostRequest } from '../types';

const router = express.Router();

router.get('/', async (request, response) => {
  const questions = await Question.find({})
  response.json(questions)
})

router.post('/', async (request, response) => {
  const body: questionPostRequest = request.body
  const token = request.token as string;

  const decodedToken: any = jwt.verify(token, SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(404).json({ error: 'no such user' })
  }

  if (!body.optionOne || !body.optionTwo) {
    return response.status(422).json({ error: 'malformatted input' })
  }

  const question = new Question({
    author: user.username,
    timestamp: Date.now(),
    optionOne: {
      votes: [],
      text: body.optionOne,
    },
    optionTwo: {
      votes: [],
      text: body.optionTwo,
    }
  })

  const savedquestion = await question.save()

  user.questions = user.questions.concat(savedquestion._id)
  await user.save()

  response.json(savedquestion)
})

router.put('/:id', async (request, response) => {
  const body: question = request.body
  const token = request.token as string;
  
  const decodedToken: any = jwt.verify(token, SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(404).json({ error: 'no such user' })
  }

  const id = request.params.id

  const updated = await Question.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' });

  const userAnswer = body.optionOne?.votes.includes(user.username) ? "optionOne" :
    body.optionTwo?.votes.includes(user.username) ? "optionTwo" : null;

  if (userAnswer) {
    (user.answers as any).set(id, userAnswer)
    await user.save()
  }

  response.json(updated)
})

router.delete('/:id', async (request, response) => {
  const token = request.token as string;
  const decodedToken: any = jwt.verify(token, SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(404).json({ error: 'no such user' })
  }
  const question = await Question.findById(request.params.id)
  if (!question) {
    return response.status(404).json({ error: 'no such question' })
  }

  if (question.author.toString() === user.username.toString()) {
    await Question.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
})

export default router