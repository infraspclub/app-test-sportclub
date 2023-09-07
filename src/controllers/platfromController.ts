import { NextFunction, Request, Response } from 'express'

import Platform from '../models/platform'
import error from '../utils/customErrorHandler'
import { success } from '../network/response'
import Page from '../models/page'
import GroupCard from '../models/group-card'
import GroupBanner from '../models/group-banner'
import Banner from '../models/banner'
import Card from '../models/card'
import Component from '../models/component'
import Section from '../models/section'

const platformController = {
  createPlatform: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Platform']
    try {
      const { name } = req.body
      const validatePlatform = await Platform.findOne({ where: { name } })

      if (validatePlatform) throw error('Platform already exists', 400)
      const platform = await Platform.create({ name })

      success(req, res, platform, 200)
    } catch (e) {
      next(e)
    }
  },
  deletePlatform: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Platform']
    try {
      const { name } = req.body

      const platform = await Platform.findOne({
        where: {
          name,
        },
      })

      if (!platform) throw error('Platform not found', 400)
      await platform.destroy()
      success(req, res, 'Platform deleted', 200)
    } catch (e) {
      next(e)
    }
  },
  getPlatformByName: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Platform']
    try {
      const { name } = req.params
      const platform = await Platform.findOne({
        where: { name },
        include: [
          {
            model: Page,
            as: 'pages',
          },
        ],
      })

      if (!platform) throw error('Platform not found', 400)
      success(req, res, platform, 200)
    } catch (e) {
      next(e)
    }
  },
  getPlatforms: async (_req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Platform']
    try {
      const platforms = await Platform.findAll({
        include: [
          {
            model: Page,
            as: 'pages',
            include: [
              {
                model: Section,
                as: 'sections',
                include: [
                  {
                    model: Component,
                    as: 'components',
                    include: [
                      {
                        model: Card,
                        as: 'cards',
                      },
                      {
                        model: Banner,
                        as: 'banners',
                      },
                      {
                        model: GroupBanner,
                        as: 'groupBanners',
                      },
                      {
                        model: GroupCard,
                        as: 'groupCards',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      })

      success(_req, res, platforms, 200)
    } catch (e) {
      next(e)
    }
  },
  updatePlatform: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Platform']
    try {
      const { id } = req.params
      const { name } = req.body

      const platform = await Platform.findOne({
        where: {
          id,
        },
      })

      if (!platform) throw error('Platform not found', 400)

      const updatedPlatform = await platform.update({
        name,
      })

      success(req, res, updatedPlatform, 200)
    } catch (e) {
      next(e)
    }
  },
}

export default platformController
