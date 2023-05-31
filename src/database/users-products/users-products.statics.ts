import { UserProduct } from './users-products.model'
import { IUserProductDocument } from "./users-products.types";

export async function findByGTIN(
  gtin: string
) : Promise<IUserProductDocument | null> {
  return UserProduct.findOne({ gtin });
}
