import { Schema } from "mongoose"

import { findByGTIN } from './products.statics'
import { defaultSchemaOptions } from '../../utilities'

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gtin: {
    type: String,
    required: true
  }
}, defaultSchemaOptions)

ProductSchema.statics.findByGTIN = findByGTIN

export default ProductSchema
