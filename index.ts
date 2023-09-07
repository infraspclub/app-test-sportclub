import dotenv from 'dotenv'

import database from './src/db'
import server from './src/app'

dotenv.config()

const port = process.env.PORT || 3001

database
  .sync({ force: false })
  .then(() => {
    server.listen(port, () => {
      console.log(`⚡️⚡️[server]: Servidor levantado en el puerto: http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('No se pudo correr el servidor:', error)
  })
