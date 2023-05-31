import { Schema } from "mongoose"

import { findByGTIN } from './users-products.statics'

import { defaultSchemaOptions } from '../../utilities'

const UserProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gtin: {
    type: String,
    required: true
  },
  productId: {
    type: Schema.Types.ObjectId
  },
  userId: {
    type: Schema.Types.ObjectId
  },
  quantity: {
    type: Number,
    required: true
  },
  expiresAt: {
    type: Date
  }
}, defaultSchemaOptions)

UserProductSchema.statics.findByGTIN = findByGTIN

export default UserProductSchema
