import { NextFunction, Request, Response } from 'express'
import { PutObjectCommand } from '@aws-sdk/client-s3'

import s3 from '../utils/s3-client'
import Card from '../models/card'
import { success } from '../network/response'
import error from '../utils/customErrorHandler'
import Component from '../models/component'

const cardController = {
  getCardByName: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Card']
    const { name } = req.params

    try {
      if (!name) throw error('Name is required', 400)
      const card = await Card.findOne({
        where: {
          name,
        },
        include: [Component],
      })

      if (!card) throw error('Card not found', 400)

      success(req, res, card, 200)
    } catch (e) {
      next(e)
    }
  },
  getCards: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Card']
    try {
      const allCards = await Card.findAll({
        include: [Component],
      })

      success(req, res, allCards, 200)
    } catch (e) {
      next(e)
    }
  },
  createCard: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Card']
    try {
      console.log(req.body)

      if (!req.files) throw error('No files were uploaded.', 400)

      const files = req.files as { [fieldname: string]: Express.Multer.File[] }

      // Validar si se proporciona un archivo de imagen
      if (!files.image) {
        throw error('Image file is required', 400)
      }

      // Validar si se proporciona un archivo de logo
      if (!files.logo) {
        throw error('Logo file is required', 400)
      }

      // Validar si se proporciona un id del componente
      if (!req.body.componentId) {
        throw error('Component id is required', 400)
      }

      const { title, link, description, componentId, textLink } = req.body

      // Validar si se proporciona un nombre de card
      if (!title) {
        throw error('Card Title is required', 400)
      }

      // Subir imagen a AWS S3
      const imageParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: files.image[0].originalname,
        Body: files.image[0].buffer,
        ContentType: files.image[0].mimetype,
      }
      const imageCommand = new PutObjectCommand(imageParams)

      await s3.send(imageCommand)

      // Subir logo a AWS S3
      const logoParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: files.logo[0].originalname,
        Body: files.logo[0].buffer,
        ContentType: files.logo[0].mimetype,
      }
      const logoCommand = new PutObjectCommand(logoParams)

      await s3.send(logoCommand)

      // Validar si el card ya existe
      const validate = await Card.findOne({
        where: {
          name: req.body.name.replaceAll(' ', '-').toLowerCase() || '',
        },
      })

      // Crear card
      if (!validate) {
        const card = await Card.create({
          name: title.replaceAll(' ', '-').toLowerCase() || '',
          image: files.image[0].originalname || '',
          title: title || '',
          link: link || '',
          textLink: textLink || '',
          description: description || '',
          logo: files.logo[0].originalname || '',
          componentId: componentId || '',
        })

        const component = await Component.findByPk(req.body.componentId)

        if (!component) {
          throw error('Component not found', 400)
        }

        await card.setComponent(component)

        return success(req, res, card, 200)
      }

      success(req, res, 'Card already exists', 200)
    } catch (e) {
      next(e)
    }
  },
  deleteCard: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Card']
    const { name } = req.params

    try {
      if (!name) throw error('Name is required', 400)
      const card = await Card.destroy({ where: { name } })

      success(req, res, card, 200)
    } catch (e) {
      next(e)
    }
  },
  updateCard: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Card']
    const { name } = req.params

    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] }

      if (!files) throw error('No files provided', 400)

      // Validar si se proporciona un archivo de imagen
      if (files.image) {
        const imageParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: files.image[0].originalname,
          Body: files.image[0].buffer,
          ContentType: files.image[0].mimetype,
        }
        const imageCommand = new PutObjectCommand(imageParams)

        await s3.send(imageCommand)
      }

      // Validar si se proporciona un archivo de logo
      if (files.logo) {
        const logoParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: files.logo[0].originalname,
          Body: files.logo[0].buffer,
          ContentType: files.logo[0].mimetype,
        }
        const logoCommand = new PutObjectCommand(logoParams)

        await s3.send(logoCommand)
      }

      console.log(req.body)
      // Actualizar los datos del componente en la base de datos
      const validate = await Card.findOne({
        where: {
          name,
        },
      })

      if (!validate) {
        throw error('Card not found', 400)
      }

      if (!files.image && !files.logo) {
        const card = await Card.update(
          {
            name: req.body.title.replaceAll(' ', '-').toLowerCase(),
            title: req.body.title || validate.title,
            textLink: req.body.textLink || validate.textLink,
            link: req.body.link || validate.link,
            description: req.body.description || validate.description,
          },
          {
            where: {
              name,
            },
          },
        )

        success(req, res, card, 200)
      } else if (!files.image) {
        const card = await Card.update(
          {
            name: req.body.title.replaceAll(' ', '-').toLowerCase(),
            title: req.body.title || validate.title,
            textLink: req.body.textLink || validate.textLink,
            link: req.body.link || validate.link,
            description: req.body.description || validate.description,
            logo: files.logo[0].originalname,
          },
          {
            where: {
              name,
            },
          },
        )

        success(req, res, card, 200)
      } else if (!files.logo) {
        const card = await Card.update(
          {
            name: req.body.title.replaceAll(' ', '-').toLowerCase(),
            image: files.image[0].originalname,
            title: req.body.title || validate.title,
            textLink: req.body.textLink || validate.textLink,
            link: req.body.link || validate.link,
            description: req.body.description || validate.description,
          },
          {
            where: {
              name,
            },
          },
        )

        success(req, res, card, 200)
      } else if (files.image && files.logo) {
        const card = await Card.update(
          {
            name: req.body.title.replaceAll(' ', '-').toLowerCase(),
            image: files.image[0].originalname,
            title: req.body.title || validate.title,
            textLink: req.body.textLink || validate.textLink,
            link: req.body.link || validate.link,
            description: req.body.description || validate.description,
            logo: files.logo[0].originalname,
          },
          {
            where: {
              name,
            },
          },
        )

        success(req, res, card, 200)
      }
    } catch (e) {
      next(e)
    }
  },
  updateCardOrder: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Card']
    try {
      const { tarjetas } = req.body

      for (const tarjeta of tarjetas) {
        const tarjetaById = await Card.findOne({ where: { id: tarjeta.id } })

        if (tarjetaById) {
          tarjetaById.order = tarjeta.order
          await tarjeta.save()
        } else {
          throw error(`Card ${tarjeta.id} not found`, 400)
        }
      }
      success(req, res, 'Orden de tarjetas actualizado con éxito', 200)
    } catch (e) {
      next(e)
    }
  },
}

export default cardController
