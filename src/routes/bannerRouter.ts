import { Router } from 'express'

import upload from '../middlewares/multer'
import bannerController from '../controllers/bannerController'

const bannerRouter = Router()

bannerRouter.get('/', bannerController.getBanners)
bannerRouter.get('/:name', bannerController.getBannerByName)
bannerRouter.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
  ]),
  bannerController.createBanner,
)
bannerRouter.put(
  '/:name',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
  ]),
  bannerController.updateBanner,
)
bannerRouter.delete('/:name', bannerController.deleteBanner)

export default bannerRouter
