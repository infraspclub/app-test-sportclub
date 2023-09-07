import { Router } from 'express'

import componentController from '../controllers/componentController'

const componentRouter = Router()

componentRouter.get('/', componentController.getComponents)
componentRouter.get('/:name', componentController.getComponentByName)
componentRouter.post('/', componentController.createComponent)
componentRouter.put('/:name', componentController.updateComponent)
componentRouter.delete('/:name', componentController.deleteComponent)

export default componentRouter
