import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'

import swaggerFile from '../swagger-output.json'

import router from './routes'
import './models'
import errors from './network/error'
import JWTMiddleware from './middlewares/JWTMiddleware'

dotenv.config()

const server = express()

server.use(express.static('public'))
server.use(express.json())
server.use(morgan('dev'))
server.use(cors())
server.disable('x-powered-by')

server.get('/', (_req, res) => {
  res.send('Running server on PRODUCTION')
})
server.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

server.use(JWTMiddleware)

server.use('/api', router)
server.use(errors)

export default server
