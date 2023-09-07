import { Router } from 'express'

import upload from '../middlewares/multer'
import cardController from '../controllers/cardController'

const cardRouter = Router()

cardRouter.get('/', cardController.getCards)
cardRouter.get('/:name', cardController.getCardByName)
cardRouter.post('/order', cardController.updateCardOrder)
cardRouter.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
  ]),
  cardController.createCard,
)
cardRouter.put(
  '/:name',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
  ]),
  cardController.updateCard,
)
cardRouter.delete('/:name', cardController.deleteCard)

export default cardRouter
