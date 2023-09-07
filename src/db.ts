import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize('postgres', 'sportclub', process.env.DB_PASSWORD as string, {
  host: process.env.DB_URL as string,
  dialect: 'postgres',
  logging: false,
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
