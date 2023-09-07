import { NextFunction, Request, Response } from 'express'
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import s3 from '../utils/s3-client'
import Banner from '../models/banner'
import { success } from '../network/response'
import error from '../utils/customErrorHandler'
import Component from '../models/component'

const bannerController = {
  getBannerByName: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Banner']
    const { name } = req.params

    try {
      if (!name) throw error('Name is required', 400)
      const banner = await Banner.findOne({
        where: {
          name,
        },
        include: [Component],
      })

      if (!banner) throw error('Banner not found', 400)

      const getObjectParamsImage = {
        Bucket: process.env.BUCKET_NAME,
        Key: banner.image,
      }

      const command = new GetObjectCommand(getObjectParamsImage)
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 })

      banner.image = url
      success(req, res, banner, 200)
    } catch (e) {
      next(e)
    }
  },
  getBanners: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Banner']
    try {
      const allBanners = await Banner.findAll({
        include: [Component],
      })

      const promises = allBanners.map(async (banner) => {
        const getObjectParamsImage = {
          Bucket: process.env.BUCKET_NAME,
          Key: banner.image,
        }

        const command = new GetObjectCommand(getObjectParamsImage)
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 })

        banner.image = url

        return banner
      })

      const modifiedBanners = await Promise.all(promises)

      success(req, res, modifiedBanners, 200)
    } catch (e) {
      next(e)
    }
  },
  createBanner: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Banner']
    try {
      if (!req.files) throw error('No files were uploaded.', 400)

      const files = req.files as { [fieldname: string]: Express.Multer.File[] }

      // Validar si se proporciona un archivo de imagen
      if (!files.image) {
        throw error('Image file is required', 400)
      }

      const { name, componentId, groupBannerId, title, link, subtitle } = req.body

      // Validar si se proporciona un id del componente
      if (componentId) {
        throw error('Component id is required', 400)
      }

      // Validar si se proporciona un nombre de Banner
      if (name) {
        throw error('Banner name is required', 400)
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

      // Validar si el card ya existe
      const validate = await Banner.findOne({
        where: {
          name,
        },
      })

      // Crear card
      if (!validate) {
        const banner = await Banner.create({
          name: name,
          image: files.image[0].originalname || '',
          title: title || '',
          subtitle: subtitle || '',
          link: link || '',
          componentId: componentId || '',
          groupBannerId: groupBannerId || '',
        })

        const component = await Component.findByPk(componentId)

        if (!component) {
          throw error('Component not found', 400)
        }

        await banner.setComponent(component)

        if (groupBannerId) await banner.setGroupBanner(groupBannerId)

        return success(req, res, banner, 200)
      }

      throw error('Banner already exists', 400)
    } catch (e) {
      next(e)
    }
  },
  deleteBanner: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Banner']
    const { name } = req.params

    try {
      if (!name) throw error('Name is required', 400)
      const banner = await Banner.destroy({ where: { name } })

      success(req, res, banner, 200)
    } catch (e) {
      next(e)
    }
  },
  updateBanner: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Banner']
    const { name } = req.params
    const { title, subtitle, link, componentId, groupBannerId } = req.body

    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] }

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

      // Actualizar los datos del componente en la base de datos
      const validate = await Banner.findOne({
        where: {
          name,
        },
      })

      if (!validate) {
        throw error('Card not found', 400)
      }

      const banner = await Banner.update(
        {
          image: files.image ? files.image[0].originalname : validate.image,
          title: title || validate.title,
          subtitle: subtitle || validate.subtitle,
          link: link || validate.link,
          componentId: componentId || validate.componentId,
          groupBannerId: groupBannerId || validate.groupBannerId,
        },
        {
          where: {
            name,
          },
        },
      )

      success(req, res, banner, 200)
    } catch (e) {
      next(e)
    }
  },
}

export default bannerController
