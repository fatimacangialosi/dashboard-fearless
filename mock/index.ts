/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express'
import { tokens, users } from './data'

export default () => {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // authenticate
  app.use((req, res, next) => {
    if (req.path.startsWith('/auth')) return next()
    const [, accessToken] = req.headers.authorization?.split(' ') || []
    if (accessToken == null) {
      return res.status(401).send({ message: 'Requires authentication' })
    }
    const token = tokens.find(t => t.accessToken === accessToken)
    if (token == null) {
      return res.status(401).send({ message: 'Bad credentials: invalid access_token' })
    }
    if (token.expires <= Date.now()) {
      return res.status(401).send({ message: 'Bad credentials: access_token expired' })
    }
    const user = users.find(u => u.id === token.userId)
    if (user == null) {
      return res.status(401).send({ message: 'Bad credentials: invalid access_token' })
    }
    req.user = user
    next()
  })

  // endpoints
  app.use('/auth', require('./auth').default)
  app.use('/menus', require('./menus').default)
  app.use('/users', require('./users').default)

  return app
}
