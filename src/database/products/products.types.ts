import { Document, Model } from "mongoose";

import { FindOneOrCreateParams } from './products.statics';

export interface IProduct {
  name: string
  gtin: string
  lastUpdated?: Date
}

export interface IProductDocument extends Document{
  name: string
  gtin: string
  lastUpdated?: Date,
  setLastUpdated: () => Promise<void>
}

export interface IProductModel extends Model<IProductDocument> {
  findOneOrCreate: (
    {
      name,
      gtin,
    }: FindOneOrCreateParams
  ) => Promise<IProductDocument>,
  findByGTIN: ( gtin: string ) => Promise<IProductDocument | null>;
}
