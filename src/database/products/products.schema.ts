import { Schema } from "mongoose"

import { findByBarcode } from './products.statics'
import { defaultSchemaOptions } from '../../config/default-schema-options'

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  barcode: {
    type: String,
    required: true,
    unique: true
  },
  thumbnail: {
    type: String
  },
}, defaultSchemaOptions)

ProductSchema.statics.findByBarcode = findByBarcode

export default ProductSchema
