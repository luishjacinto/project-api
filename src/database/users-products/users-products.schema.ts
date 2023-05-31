import { Schema } from "mongoose"

import { findByGTIN } from './users-products.statics'

import ProductSchema from '../products/products.schema'
import UserSchema from '../users/users.schema'

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
  user: {
    type: UserSchema
  },
  quantity: {
    type: Number,
    required: true
  },
  expiresAt: {
    type: Date
  }
}, {
  timestamps: true
})

UserProductSchema.statics.findByGTIN = findByGTIN

export default UserProductSchema
