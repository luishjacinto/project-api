import { Document, Model } from "mongoose"

import { IProductDocument } from '../products'
import { IUserDocument } from '../users/users.types'

export interface IUserProduct {
  name: string
  gtin: string
  product: IProductDocument
  user: IUserDocument
  quantity: number
  addedAt: Date
  expiresAt?: Date
  lastUpdated?: Date
}

export interface IUserProductDocument extends Document{
  name: string
  gtin: string
  product: IProductDocument
  user: IUserDocument
  quantity: number
  addedAt: Date
  expiresAt?: Date
  lastUpdated?: Date
  setLastUpdated: () => Promise<void>
}

export interface IUserProductModel extends Model<IUserProductDocument> {
  findByGTIN: ( gtin: string ) => Promise<IUserProductDocument | null>;
}
