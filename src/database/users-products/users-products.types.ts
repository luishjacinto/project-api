import { Document, Model, ObjectId } from "mongoose"

export interface IUserProduct {
  name: string
  gtin: string
  productId: ObjectId
  userId: ObjectId
  quantity: number
  quantityUsed: number
  quantityDiscarded: number
  expiresAt?: Date
}

export interface IUserProductDocument extends Document{
  name: string
  gtin: string
  productId: ObjectId
  userId: ObjectId
  quantity: number
  quantityUsed: number
  quantityDiscarded: number
  expiresAt?: Date
  howManyLeft: () => number
  use: (quantity?: number) => Promise<void>
  disuse: (quantity?: number) => Promise<void>
  discard: (quantity?: number) => Promise<void>
  reiterate: (quantity?: number) => Promise<void>
}

export interface IUserProductModel extends Model<IUserProductDocument> {}
