import { model } from "mongoose";

import { IUserProductDocument, IUserProductModel } from "./users-products.types";

import UserProductSchema from "./users-products.schema";

export const UserProduct = model<IUserProductDocument, IUserProductModel>("users_products", UserProductSchema);
