import { Document, Model } from "mongoose";

import { FindOneOrCreateParams } from './products.statics';

export interface IProduct {
  name: string
  barcode: string
  thumbnail?: string
  createdAt: Date
  updatedAt: Date
}

export interface IProductDocument extends Document{
  name: string
  barcode: string
  thumbnail?: string
  createdAt: Date
  updatedAt: Date
}

export interface IProductModel extends Model<IProductDocument> {
  findOneOrCreate: (
    {
      name,
      barcode,
    }: FindOneOrCreateParams
  ) => Promise<IProductDocument>,
  findByBarcode: ( barcode: string ) => Promise<IProductDocument | null>;
}
