import { Schema } from "mongoose"

import { findByGTIN } from './products.statics'
import { defaultSchemaOptions } from '../../config/default-schema-options'

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gtin: {
    type: String,
    required: true,
    unique: true
  }
}, defaultSchemaOptions)

ProductSchema.statics.findByGTIN = findByGTIN

export default ProductSchema
