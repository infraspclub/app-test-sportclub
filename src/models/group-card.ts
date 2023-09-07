import {
  DataTypes,
  HasOneCreateAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'

import sequelize from '../db'

import Component from './component'

class GroupCard extends Model<InferAttributes<GroupCard>, InferCreationAttributes<GroupCard>> {
  declare id?: number
  declare name: string
  declare componentId: string | number
  declare setComponent: HasOneCreateAssociationMixin<Component>
}

GroupCard.init(
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
    modelName: 'groupCard',
    tableName: 'groupCards',
    timestamps: false,
  },
)

export default GroupCard
