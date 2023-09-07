import { NextFunction, Request, Response } from 'express'
import Expo from 'expo-server-sdk'

import error from '../utils/customErrorHandler'
import { success } from '../network/response'

const pushController = {
  sendNotification: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Push Notifications']
    try {
      const expo = new Expo()
      const { tokens, title, body } = req.body

      if (!tokens || !title || !body) {
        error('Faltan tokens, titulo o cuerpo de notificación', 400)
      }

      const messages = [
        {
          to: tokens,
          title,
          body,
          data: { data: 'goes here' },
        },
      ]

      const chunks = expo.chunkPushNotifications(messages)

      for (const chunk of chunks) {
        await expo.sendPushNotificationsAsync(chunk)
      }

      success(req, res, 'Push notifications sent successfully', 200)
    } catch (e) {
      next(e)
    }
  },
}

export default pushController
