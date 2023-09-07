import { NextFunction, Request, Response } from 'express'

import error from '../utils/customErrorHandler'
import { success } from '../network/response'
import GroupCard from '../models/group-card'
import Component from '../models/component'
import Card from '../models/card'

const groupCardController = {
  createGroupCard: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Group Card']
    try {
      const { name, componentId } = req.body
      const validateGroupCards = await GroupCard.findOne({ where: { name } })

      if (validateGroupCards) throw error('GroupCard already exists', 400)

      if (!componentId) throw error('Component is required', 400)

      const groupCard = await GroupCard.create({ name, componentId })

      const component = await Component.findByPk(componentId)

      if (!component) throw error('Component not found', 400)

      groupCard.setComponent(componentId)

      success(req, res, component, 201)
    } catch (e) {
      next(e)
    }
  },
  deleteGroupCard: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Group Card']
    const { name } = req.params

    try {
      const groupCard = await GroupCard.destroy({ where: { name } })

      if (!groupCard) throw error('GroupCard not found', 400)
      success(req, res, groupCard, 200)
    } catch (e) {
      next(e)
    }
  },
  getGroupCardByName: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Group Card']
    try {
      const { name } = req.params

      const groupCard = await GroupCard.findOne({
        where: { name },
        include: [
          {
            model: Card,
            as: 'cards',
          },
        ],
      })

      if (!groupCard) throw error('Group Card not found', 400)

      success(req, res, groupCard, 200)
    } catch (e) {
      next(e)
    }
  },
  getGroupCards: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Group Card']
    try {
      const groupCard = await GroupCard.findAll({
        include: [
          {
            model: Card,
            as: 'cards',
          },
        ],
      })

      if (!groupCard) throw error('GroupCard not found', 400)

      success(req, res, groupCard, 200)
    } catch (e) {
      next(e)
    }
  },
  updateGroupCard: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Group Card']
    try {
      const { id } = req.params
      const { name } = req.body

      const groupCard = await GroupCard.findOne({
        where: {
          id,
        },
      })

      if (!groupCard) throw error('GroupCard not found', 400)

      const updateGroupCard = await groupCard.update({
        name,
      })

      success(req, res, updateGroupCard, 200)
    } catch (e) {
      next(e)
    }
  },
}

export default groupCardController
