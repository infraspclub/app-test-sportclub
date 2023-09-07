import { Router } from 'express'

import platformController from '../controllers/platfromController'

const platformRouter = Router()

platformRouter.get('/', platformController.getPlatforms)
platformRouter.get('/:name', platformController.getPlatformByName)
platformRouter.post('/', platformController.createPlatform)
platformRouter.put('/:name', platformController.updatePlatform)
platformRouter.delete('/:name', platformController.deletePlatform)

export default platformRouter
