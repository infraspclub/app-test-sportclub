import {
  DataTypes,
  HasOneCreateAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'

import sequelize from '../db'

import Page from './page'
import Component from './component'

class Section extends Model<InferAttributes<Section>, InferCreationAttributes<Section>> {
  declare id?: number
  declare name: string
  declare components?: Component[]
  declare pageId?: number
  declare setPage: HasOneCreateAssociationMixin<Page>
}

Section.init(
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'section',
    tableName: 'sections',
    timestamps: false,
  },
)

export default Section
