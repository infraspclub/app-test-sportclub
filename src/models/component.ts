import {
  DataTypes,
  HasOneCreateAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'

import sequelize from '../db'

import Section from './section'

class Component extends Model<InferAttributes<Component>, InferCreationAttributes<Component>> {
  declare id?: number
  declare name: string
  declare sectionId?: number | string
  declare setSection: HasOneCreateAssociationMixin<Section>
}

Component.init(
  {
    name: {
      type: DataTypes.STRING,
    },

  },
  {
    sequelize,
    modelName: 'component',
    tableName: 'components',
    timestamps: false,
  },
)

export default Component
