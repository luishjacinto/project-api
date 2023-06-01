import { Locals } from 'express'
import { type IUserDocument } from '../../database'

export type ResponseLocalsWithUser = {
  user: IUserDocument
} & Locals