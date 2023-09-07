import { NextFunction, Request, Response } from 'express'

import error from '../utils/customErrorHandler'
import { success } from '../network/response'
import GroupBanner from '../models/group-banner'
import Component from '../models/component'
import Banner from '../models/banner'

const groupBannerController = {
  createGroupBanner: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Group Banner']
    try {
      const { name, componentId } = req.body
      const validateGroupBanner = await GroupBanner.findOne({ where: { name } })

      if (validateGroupBanner) throw error('GroupBanner already exists', 400)

      if (!componentId) throw error('Component is required', 400)

      const groupBanner = await GroupBanner.create({ name, componentId })

      const component = await Component.findByPk(componentId)

      if (!component) throw error('Component not found', 400)

      groupBanner.setComponent(componentId)

      success(req, res, component, 201)
    } catch (e) {
      next(e)
    }
  },
  deleteGroupBanner: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Group Banner']
    const { name } = req.params

    try {
      const groupBanner = await GroupBanner.destroy({ where: { name } })

      if (!groupBanner) throw error('GroupBanner not found', 400)
      success(req, res, groupBanner, 200)
    } catch (e) {
      next(e)
    }
  },
  getGroupBannerByName: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Group Banner']
    try {
      const { name } = req.params

      const groupBanner = await GroupBanner.findOne({
        where: { name },
        include: [
          {
            model: Banner,
            as: 'banners',
          },
        ],
      })

      if (!groupBanner) throw error('Group banner not found', 400)

      success(req, res, groupBanner, 200)
    } catch (e) {
      next(e)
    }
  },
  getGroupBanners: async (_req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Group Banner']
    try {
      const groupBanner = await GroupBanner.findAll({
        include: [
          {
            model: Banner,
            as: 'banners',
          },
        ],
      })

      if (!groupBanner) throw error('GroupBanner not found', 400)

      success(_req, res, groupBanner, 200)
    } catch (e) {
      next(e)
    }
  },
  updateGroupBanner: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Group Banner']
    try {
      const { id } = req.params
      const { name } = req.body

      const groupBanner = await GroupBanner.findOne({
        where: {
          id,
        },
      })

      if (!groupBanner) throw error('GroupBanner not found', 400)

      const updateGroupBanner = await groupBanner.update({
        name,
      })

      success(req, res, updateGroupBanner, 200)
    } catch (e) {
      next(e)
    }
  },
}

export default groupBannerController
