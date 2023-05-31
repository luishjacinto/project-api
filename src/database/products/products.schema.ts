import { Schema } from "mongoose"

import { findByGTIN } from './products.statics'
import { setLastUpdated } from './products.methods'

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gtin: {
    type: String,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: new Date()
  }
})

ProductSchema.statics.findByGTIN = findByGTIN

ProductSchema.methods.setLastUpdated = setLastUpdated

export default ProductSchema
