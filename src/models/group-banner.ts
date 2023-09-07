import {
  DataTypes,
  HasOneCreateAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'

import sequelize from '../db'

import Component from './component'

class GroupBanner extends Model<
  InferAttributes<GroupBanner>,
  InferCreationAttributes<GroupBanner>
> {
  declare id?: number
  declare name: string
  declare componentId: string | number
  declare setComponent: HasOneCreateAssociationMixin<Component>
}

GroupBanner.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    componentId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'groupBanner',
    tableName: 'groupBanners',
    timestamps: false,
  },
)

export default GroupBanner
