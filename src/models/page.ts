import {
  DataTypes,
  HasOneCreateAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'

import sequelize from '../db'

import Platform from './platform'

class Page extends Model<InferAttributes<Page>, InferCreationAttributes<Page>> {
  declare id?: number
  declare name: string
  declare platformId: number | string
  declare setPlatform: HasOneCreateAssociationMixin<Platform>
}

Page.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    platformId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
