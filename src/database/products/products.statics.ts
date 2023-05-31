import { Product } from './products.model'
import { IProductDocument } from "./products.types";

export type FindOneOrCreateParams = {
  name: string,
  gtin: string
}

export async function findOneOrCreate({
  name,
  gtin
} : FindOneOrCreateParams): Promise<IProductDocument> {
  const record = await Product.findByGTIN(gtin);

  if (record) {
    return record;
  } else {
    return Product.create({ name, gtin });
  }
}

export async function findByGTIN(
  gtin: string
) : Promise<IProductDocument | null> {
  return await Product.findOne({ gtin })
}
