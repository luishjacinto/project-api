import { Model } from "mongoose";

import { FindOneOrCreateParams } from './products.statics';
import { DocumentWithAttachment } from '../../types/document-with-attachment'

export interface IProduct {
  name: string
  barcode: string
  thumbnail?: string
  createdAt: Date
  updatedAt: Date
}

export interface IProductDocument extends DocumentWithAttachment<IProduct>{
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
