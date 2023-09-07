import { Router } from 'express'

import pagesController from '../controllers/pageController'

const pagesRouter = Router()

pagesRouter.get('/', pagesController.getPages)
pagesRouter.get('/:name', pagesController.getOnePage)
pagesRouter.post('/', pagesController.createPage)
pagesRouter.put('/:name', pagesController.updatePage)
pagesRouter.delete('/:name', pagesController.deletePage)

export default pagesRouter
