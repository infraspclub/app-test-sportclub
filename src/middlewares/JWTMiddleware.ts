import { NextFunction, Request, Response } from 'express'
import axios from 'axios'
import error from '../utils/customErrorHandler'

const JWTMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { data } = await axios.post(
      `${process.env.API_SOCIOS}/auth/validate`,
      {},
      {
        headers: {
          authorization: req.headers.authorization,
        },
      },
    )

    if (!data.body.id) {
      throw error("JWT invalido", 401)
    }
    req.User = data.body
    next();
  } catch (e) {
    next(error("No se pudo validar JWT", 401))
  }
}

export default JWTMiddleware
