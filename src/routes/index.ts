import { Router } from 'express'

import cardRouter from './cardRouter'
import sendEmailRouter from './emailRouter'
import platformRouter from './platformRouter'
import pagesRouter from './pageRouter'
import componentRouter from './componentRouter'
import groupCardRouter from './groupCardRouter'
import groupBannerRouter from './groupBannerRouter'
import bannerRouter from './bannerRouter'
import sectionRouter from './sectionRouter'
import pushRouter from './pushRouter'

const router = Router()

router.use('/platform', platformRouter)
router.use('/page', pagesRouter)
router.use('/section', sectionRouter)
router.use('/component', componentRouter)
router.use('/groupcard', groupCardRouter)
router.use('/card', cardRouter)
router.use('/groupBanner', groupBannerRouter)
router.use('/banner', bannerRouter)
router.use('/sendEmail', sendEmailRouter)
router.use('/push', pushRouter)

export default router
