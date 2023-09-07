import {
  DataTypes,
  HasOneCreateAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'

import sequelize from '../db'

import Page from './page'

class Section extends Model<InferAttributes<Section>, InferCreationAttributes<Section>> {
  declare id?: number
  declare name: string
  declare pageId: number | string
  declare setPage: HasOneCreateAssociationMixin<Page>
}

Section.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    pageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
