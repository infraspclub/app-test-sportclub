import { NextFunction, Request, Response } from 'express'

import error from '../utils/customErrorHandler'
import { success } from '../network/response'
import Section from '../models/section'
import Page from '../models/page'
import Component from '../models/component'

const sectionController = {
  createSection: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Section']
    try {
      const { name, pageId } = req.body
      const validateSection = await Section.findOne({ where: { name } })

      if (validateSection) throw error('Section already exists', 400)

      if (!pageId) throw error('Page is required', 400)

      const section = await Section.create({ name, pageId })

      const page = await Page.findByPk(pageId)

      if (!page) throw error('Page not found', 400)

      section.setPage(pageId)

      success(req, res, page, 200)
    } catch (e) {
      next(e)
    }
  },
  deleteSection: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Section']
    const { name } = req.params

    try {
      const section = await Section.destroy({ where: { name } })

      if (!section) throw error('Section not found', 400)

      success(req, res, section, 200)
    } catch (e) {
      next(e)
    }
  },
  getOneSection: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Section']
    try {
      const { name } = req.params

      const section = await Section.findOne({
        where: { name },
        include: [
          {
            model: Component,
            as: 'components',
          },
        ],
      })

      if (!section) throw error('Section not found', 400)

      success(req, res, section, 200)
    } catch (e) {
      next(e)
    }
  },
  getAllSections: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Section']
    try {
      const section = await Section.findAll({
        include: [
          {
            model: Component,
            as: 'components',
          },
        ],
      })

      if (!section) throw error('Section not found', 400)

      success(req, res, section, 200)
    } catch (e) {
      next(e)
    }
  },
  updateSection: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Section']
    try {
      const { name } = req.params
      const { name: newName } = req.body

      const section = await Section.findOne({
        where: {
          name,
        },
      })

      if (!section) throw error('Section not found', 400)

      const updatedPage = await section.update({
        name: newName,
      })

      success(req, res, updatedPage, 200)
    } catch (e) {
      next(e)
    }
  },
}

export default sectionController
