import { Locals } from 'express'
import { IUserDocument } from '../../database/users'

export type ResponseLocalsWithUser = {
  user: IUserDocument
} & Locals


