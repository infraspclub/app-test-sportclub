import { Dialect, Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD as string, {
  host: process.env.DB_HOST as string,
  dialect: process.env.DB_DIALECT as Dialect,
  logging: true,
  schema: 'autogestion',
})

const tryConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log('⚡️[server]: DB conectada con éxito')
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error)
  }
}

tryConnection()

export default sequelize
