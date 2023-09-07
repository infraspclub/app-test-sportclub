import { Router } from 'express'

import groupBannerController from '../controllers/groupBannerController'

const groupBannerRouter = Router()

groupBannerRouter.get('/', groupBannerController.getGroupBanners)
groupBannerRouter.get('/:name', groupBannerController.getGroupBannerByName)
groupBannerRouter.post('/', groupBannerController.createGroupBanner)
groupBannerRouter.put('/:name', groupBannerController.updateGroupBanner)
groupBannerRouter.delete('/:name', groupBannerController.deleteGroupBanner)

export default groupBannerRouter
