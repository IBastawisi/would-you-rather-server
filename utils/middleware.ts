import express from "express"

const requestLogger = (request: express.Request, response: express.Response, next: any) => {
  console.info('Method:', request.method)
  console.info('Path:  ', request.path)
  console.info('Body:  ', request.body)
  console.info('---')
  next()
}

const unknownEndpoint = (request: express.Request, response: express.Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error: any, request: express.Request, response: express.Response, next: any) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }
  next(error)
}

const tokenExtractor = (request: express.Request, response: express.Response, next: any) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

export {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}