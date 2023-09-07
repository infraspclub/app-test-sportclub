/* eslint-disable node/no-extraneous-import */
import { v4 as uuidv4 } from 'uuid'

export const generateUuid = (): string => {
  return uuidv4()
}
