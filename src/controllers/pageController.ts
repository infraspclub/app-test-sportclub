import { NextFunction, Request, Response } from 'express'

import Page from '../models/page'
import error from '../utils/customErrorHandler'
import { success } from '../network/response'
import Platform from '../models/platform'
import Section from '../models/section'

const pageController = {
  createPage: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Page']
    try {
      const { name, platformId } = req.body
      const validatePage = await Page.findOne({ where: { name } })

      if (validatePage) throw error('Page already exists', 400)

      if (!platformId) throw error('Platform is required', 400)

      const page = await Page.create({ name, platformId })

      const platform = await Platform.findByPk(req.body.platformId)

      if (!platform) throw error('Platform not found', 400)

      page.setPlatform(platformId)

      success(req, res, page, 200)
    } catch (e) {
      next(e)
    }
  },
  deletePage: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Page']
    const { name } = req.params

    try {
      const page = await Page.destroy({ where: { name } })

      if (!page) throw error('Page not found', 400)

      success(req, res, page, 200)
    } catch (e) {
      next(e)
    }
  },
  getOnePage: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Page']
    try {
      const { name } = req.params

      const page = await Page.findOne({
        where: { name },
        include: [
          {
            model: Section,
            as: 'sections',
          },
        ],
      })

      if (!page) throw error('Page not found', 400)

      success(req, res, page, 200)
    } catch (e) {
      next(e)
    }
  },
  getPages: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Page']
    try {
      const page = await Page.findAll({
        include: [
          {
            model: Section,
            as: 'sections',
          },
        ],
      })

      if (!page) throw error('Page not found', 400)

      success(req, res, page, 200)
    } catch (e) {
      next(e)
    }
  },
  updatePage: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Page']
    try {
      const { id } = req.params
      const { name } = req.body

      const page = await Page.findOne({
        where: {
          id,
        },
      })

      if (!page) throw error('Page not found', 400)

      const updatedPage = await page.update({
        name,
      })

      success(req, res, updatedPage, 200)
    } catch (e) {
      next(e)
    }
  },
}

export default pageController
