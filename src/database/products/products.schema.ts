import { Schema } from "mongoose"

import { findByBarcode } from './products.statics'
import { load } from './products.methods'
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

ProductSchema.methods.load = load

export default ProductSchema
