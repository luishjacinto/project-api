import { model } from "mongoose";

import { IProductDocument, IProductModel } from "./products.types";

import ProductSchema from "./products.schema";

export const Product = model<IProductDocument, IProductModel>("products", ProductSchema);