import { Router } from 'express'

import pushController from '../controllers/pushController'

const pushRouter = Router()

pushRouter.post('/', pushController.sendNotification)

export default pushRouter
