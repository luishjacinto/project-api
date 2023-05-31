import { Document, Model } from "mongoose";

export interface IUserProduct {
  name: string
  product_id: string
  gtin: string
  quantity: number
  addedAt: Date
  expiresAt?: Date
  lastUpdated?: Date
}

export interface IUserProductDocument extends Document{
  name: string
  product_id: string
  gtin: string
  quantity: number
  addedAt: Date
  expiresAt?: Date
  lastUpdated?: Date
  setLastUpdated: () => Promise<void>
}

export interface IUserProductModel extends Model<IUserProductDocument> {
  findByGTIN: ( gtin: string ) => Promise<IUserProductDocument | null>;
}
