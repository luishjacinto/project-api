import { Schema } from "mongoose"

import { defaultSchemaOptions } from '../../config/default-schema-options'
import { user, product, howManyLeft, discard, disuse, reiterate, use } from './users-products.methods'

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
    type: Schema.Types.ObjectId,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      message: 'The sum of used and discarded cannot be greater than quantity',
      validator: function (quantity: number) {
        const context = (this as any)
        return quantity >= (context.quantityUsed + context.quantityDiscarded);
      },
    },
  },
  quantityUsed: {
    type: Number,
    default: 0,
    min: 0,
    validate: {
      message: 'Quantity of used cannot be greater than quantity',
      validator: function (quantityUsed: number) {
        const context = (this as any)
        return quantityUsed <= context.quantity;
      },
    },
  },
  quantityDiscarded: {
    type: Number,
    default: 0,
    min: 0,
    validate: {
      message: 'Quantity of discarded cannot be greater than quantity',
      validator: function (quantityDiscarded: number) {
        const context = (this as any)
        return quantityDiscarded <= context.quantity;
      },
    },
  },
  expiresAt: {
    type: Date
  }
}, defaultSchemaOptions)

UserProductSchema.methods.user = user
UserProductSchema.methods.product = product
UserProductSchema.methods.howManyLeft = howManyLeft

UserProductSchema.methods.use = use
UserProductSchema.methods.disuse = disuse

UserProductSchema.methods.discard = discard
UserProductSchema.methods.reiterate = reiterate

export default UserProductSchema
