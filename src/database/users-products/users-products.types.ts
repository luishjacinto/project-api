import { Document, Model, ObjectId } from "mongoose"
import { IProduct } from '../products'
import { IUser } from '../users/users.types'

export interface IUserProduct {
  name: string
  gtin: string
  productId?: ObjectId
  userId: ObjectId
  quantity: number
  quantityUsed: number
  quantityDiscarded: number
  expiresAt?: Date
}

export interface IUserProductDocument extends Document{
  name: string
  gtin: string
  productId?: ObjectId
  userId: ObjectId
  quantity: number
  quantityUsed: number
  quantityDiscarded: number
  expiresAt?: Date
  user: () => Promise<IUser | null>
  product: () => Promise<IProduct | null>
  howManyLeft: () => number
  use: (quantity?: number) => Promise<void>
  disuse: (quantity?: number) => Promise<void>
  discard: (quantity?: number) => Promise<void>
  reiterate: (quantity?: number) => Promise<void>
}

export interface IUserProductModel extends Model<IUserProductDocument> {}
