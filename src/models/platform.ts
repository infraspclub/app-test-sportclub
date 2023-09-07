/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'

import sequelize from '../db'

class Platform extends Model<InferAttributes<Platform>, InferCreationAttributes<Platform>> {
  declare id?: number
  declare name: string
}

Platform.init(
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'platform',
    tableName: 'platforms',
    timestamps: false,
  },
)

const afterFindForIncludedEntities: any = async (instances: any, options: any, level = 0) => {
  if (!instances) return

  if (Array.isArray(instances)) {
    return Promise.all(
      instances.map((instance: any) => {
        const { options: instanceOptions } = instance.constructor

        return afterFindForIncludedEntities(instance, instanceOptions, level)
      }),
    )
  }

  const instance = instances
  const { constructor } = instance

  /**
   * Root model will have already run their "afterFind" hook.
   * Only run children "afterFind" hooks.
   */
  if (level >= 1) {
    await constructor.runHooks('afterFind', instance, options)
  }

  const { associations } = constructor
  const associatedNames = Object.keys(instance).filter((attribute) =>
    Object.keys(associations).includes(attribute),
  )

  if (associatedNames.length) {
    const childInstances = associatedNames.map((name) => instance[name]).filter((v) => !!v)

    return afterFindForIncludedEntities(childInstances, options, level + 1)
  }
}

Platform.afterFind(afterFindForIncludedEntities)

export default Platform
