import { Model } from "mongoose";

import { FindOneOrCreateParams } from './products.statics';
import { DocumentWithLoadAttachments } from '../../types/document-with-load-attachments'

export interface IProduct {
  name: string
  barcode: string
  thumbnail?: string
  createdAt: Date
  updatedAt: Date
}

export interface IProductDocument extends DocumentWithLoadAttachments<IProduct>{
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
