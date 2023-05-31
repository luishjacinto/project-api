import { Document, Model, ObjectId } from "mongoose"

export interface IUserProduct {
  name: string
  gtin: string
  productId: ObjectId
  userId: ObjectId
  quantity: number
  addedAt: Date
  expiresAt?: Date
}

export interface IUserProductDocument extends Document{
  name: string
  gtin: string
  productId: ObjectId
  userId: ObjectId
  quantity: number
  addedAt: Date
  expiresAt?: Date
}

export interface IUserProductModel extends Model<IUserProductDocument> {
  findByGTIN: ( gtin: string ) => Promise<IUserProductDocument | null>;
}
