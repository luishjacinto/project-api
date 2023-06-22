import { Product } from './products.model'
import { IProductDocument } from "./products.types";

export type FindOneOrCreateParams = {
  name: string,
  barcode: string
}

export async function findOneOrCreate({
  name,
  barcode
} : FindOneOrCreateParams): Promise<IProductDocument> {
  const record = await Product.findByBarcode(barcode);

  if (record) {
    return record;
  } else {
    return Product.create({ name, barcode });
  }
}

export async function findByBarcode(
  barcode: string
) : Promise<IProductDocument | null> {
  return await Product.findOne({ barcode })
}
