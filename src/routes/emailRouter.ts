import { Router } from 'express'

import sendEmailController from '../controllers/sendEmailController'
import upload from '../middlewares/multer'

const sendEmailRouter = Router()

sendEmailRouter.post('/prestadores', sendEmailController.sendPrestadores)

sendEmailRouter.post('/comercios', sendEmailController.sendComercios)

sendEmailRouter.post('/empresas', sendEmailController.sendEmpresas)

sendEmailRouter.post('/info-empresas', sendEmailController.sendEmpresasInfo)

sendEmailRouter.post(
  '/aptos',
  upload.fields([{ name: 'image', maxCount: 1 }]),
  sendEmailController.sendApto,
)

export default sendEmailRouter
