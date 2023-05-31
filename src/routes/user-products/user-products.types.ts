import { IUserProductDocument } from '../../database/users-products'
import { ResponseLocalsWithUser } from '../users'

export type ResponseLocalsWithUserProduct = {
  userProduct: IUserProductDocument
} & ResponseLocalsWithUser