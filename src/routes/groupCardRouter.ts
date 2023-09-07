import { Router } from 'express'

import groupCardController from '../controllers/groupCardController'

const groupCardRouter = Router()

groupCardRouter.get('/', groupCardController.getGroupCards)
groupCardRouter.get('/:name', groupCardController.getGroupCardByName)
groupCardRouter.post('/', groupCardController.createGroupCard)
groupCardRouter.put('/:name', groupCardController.updateGroupCard)
groupCardRouter.delete('/:name', groupCardController.deleteGroupCard)

export default groupCardRouter
