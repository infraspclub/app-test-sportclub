/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BelongsToManyCreateAssociationMixin,
  DataTypes,
  HasOneCreateAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import sequelize from '../db'
import s3 from '../utils/s3-client'

import Component from './component'

class Card extends Model<InferAttributes<Card>, InferCreationAttributes<Card>> {
  declare id?: number
  declare name: string
  declare title: string
  declare description: string
  declare textLink: string
  declare image: string
  declare link: string
  declare logo: string
  declare groupCardId?: string | number
  declare componentId?: string | number
  declare imageUrl?: string
  declare logoUrl?: string
  declare order: number | null
  declare setComponent: HasOneCreateAssociationMixin<Component>
  declare setGroupCard: BelongsToManyCreateAssociationMixin<Card>
}

Card.init(
  {
    name: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    textLink: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.TEXT,
    },
    link: {
      type: DataTypes.TEXT,
    },
    logo: {
      type: DataTypes.TEXT,
    },
    groupCardId: {
      type: DataTypes.INTEGER,
    },
    componentId: {
      type: DataTypes.INTEGER,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: null
    }
  },
  {
    sequelize,
    modelName: 'card',
    tableName: 'cards',
    timestamps: false,
  },
)

Card.afterFind(async (instances: any) => {
  const instancesArray = Array.isArray(instances) ? instances : [instances]

  if (!instancesArray[0]) return
  if (instancesArray) {
    for (const instance of instancesArray) {
      const getObjectParamsImage = {
        Bucket: process.env.BUCKET_NAME,
        Key: instance.image,
      }

      const getObjectParamsLogo = {
        Bucket: process.env.BUCKET_NAME,
        Key: instance.logo,
      }

      const commandLogo = new GetObjectCommand(getObjectParamsLogo)
      const command = new GetObjectCommand(getObjectParamsImage)
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
      const urlLogo = await getSignedUrl(s3, commandLogo, { expiresIn: 3600 })

      instance.logo = urlLogo
      instance.image = url
    }
  }
})

export default Card
