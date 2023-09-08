import {
  DataTypes,
  HasOneCreateAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'

import sequelize from '../db'

import Platform from './platform'
import Section from './section'

class Page extends Model<InferAttributes<Page>, InferCreationAttributes<Page>> {
  declare id?: number
  declare name: string
  declare platformId?: number
  sections?: Section[]
  declare setPlatform: HasOneCreateAssociationMixin<Platform>
}

Page.init(
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'page',
    tableName: 'pages',
    timestamps: false,
  },
)

export default Page
