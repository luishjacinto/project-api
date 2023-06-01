import { type IUserProductDocument } from '../../../database'
import { type ResponseLocalsWithUser } from '../response-locals-with-user'

export type ResponseLocalsWithUserProduct = {
  userProduct: IUserProductDocument
} & ResponseLocalsWithUser