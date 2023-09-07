import { Router } from 'express'

import sectionController from '../controllers/sectionController'
const sectionRouter = Router()

sectionRouter.get('/', sectionController.getAllSections)
sectionRouter.get('/:name', sectionController.getOneSection)
sectionRouter.post('/', sectionController.createSection)
sectionRouter.put('/:name', sectionController.updateSection)
sectionRouter.delete('/:name', sectionController.deleteSection)

export default sectionRouter
