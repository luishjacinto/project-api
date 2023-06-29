import { Model } from "mongoose";

import { FindOneOrCreateParams } from './products.statics';
import { ModelWithLoad } from '../../types/model-with-load'

export interface IProduct {
  name: string
  barcode: string
  thumbnail?: string
  createdAt: Date
  updatedAt: Date
}

export interface IProductDocument extends ModelWithLoad<IProduct>{
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
