import { IProductDocument } from '../../../database/products'
import { ResponseLocalsWithUser } from '../response-locals-with-user'

export type ResponseLocalsWithProduct = {
  product: IProductDocument
} & ResponseLocalsWithUser