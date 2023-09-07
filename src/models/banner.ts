import {
  BelongsToManyCreateAssociationMixin,
  DataTypes,
  HasOneCreateAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'

import sequelize from '../db'

import Component from './component'

class Banner extends Model<InferAttributes<Banner>, InferCreationAttributes<Banner>> {
  declare id?: number
  declare name: string
  declare title?: string
  declare subtitle?: string
  declare image: string
  declare link?: string
  declare groupBannerId?: string | number
  declare componentId: string | number
  declare setComponent: HasOneCreateAssociationMixin<Component>
  declare setGroupBanner: BelongsToManyCreateAssociationMixin<Banner>
}

Banner.init(
  {
    name: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.TEXT,
    },
    subtitle: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.TEXT,
    },
    link: {
      type: DataTypes.TEXT,
    },
    groupBannerId: {
      type: DataTypes.INTEGER,
    },
    componentId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'banner',
    tableName: 'banners',
    timestamps: false,
  },
)

export default Banner
