import { IUserProductDocument } from '../../database/users-products'
import { ResponseLocalsWithUser } from '../users'

export type ResponseLocalsWithUserProduct = {
  product: IUserProductDocument
} & ResponseLocalsWithUser