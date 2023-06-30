import { Model } from "mongoose";

import { FindOneOrCreateParams } from './products.statics';
import { DocumentWithAttachments } from '../../types/document-with-attachments'

export interface IProduct {
  name: string
  barcode: string
  thumbnail?: string
  createdAt: Date
  updatedAt: Date
}

export interface IProductDocument extends DocumentWithAttachments<IProduct>{
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
