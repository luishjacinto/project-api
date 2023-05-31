import { Schema } from "mongoose"

import { findByGTIN } from './users-products.statics'
import { setLastUpdated } from './users-products.methods'

import ProductSchema from '../products/products.schema'

const UserProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gtin: {
    type: String,
    required: true
  },
  product: {
    type: ProductSchema
  },
  quantity: {
    type: Number,
    required: true
  },
  addedAt: {
    type: Date,
    required: true
  },
  expiresAt: {
    type: Date
  },
  lastUpdated: {
    type: Date,
    default: new Date()
  }
})

UserProductSchema.statics.findByGTIN = findByGTIN

UserProductSchema.methods.setLastUpdated = setLastUpdated

export default UserProductSchema
