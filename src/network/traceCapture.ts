import { Request, Response, NextFunction } from 'express'

import { generateUuid } from '../utils/uuidGenerator'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const traceCapture = function (_err: any, req: Request, res: Response, next: NextFunction) {
  let trace = req.header('x-request-id')

  if (!trace) {
    trace = generateUuid()
  }
  res.set({
    'x-request-id': `${trace}`,
  })
  req.headers['Sopapo'] = trace
  next()
}

export default traceCapture
