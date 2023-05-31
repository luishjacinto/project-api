import { ResponseLocalsWithUser } from '../users/users.types'
import { IProductDocument } from '../../database/products'

export interface RequestParamsWithGTIN {
  gtin: string
}

export type ResponseLocalsWithProduct = {
  product: IProductDocument
} & ResponseLocalsWithUser
