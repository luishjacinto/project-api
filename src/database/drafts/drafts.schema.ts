import { defaultSchemaOptions } from './../../config/default-schema-options';
import { Schema } from "mongoose"

import { user } from './drafts.methods'
import UserProductSchema from '../users-products/users-products.schema'

const DraftDataSchema = UserProductSchema.pick(['name', 'gtin', 'quantity', 'quantityUsed', 'quantityDiscarded', 'expiresAt'], {
  ...defaultSchemaOptions,
  timestamps: false
})

const DraftSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  data: {
    type: [DraftDataSchema],
    required: true
  }
}, defaultSchemaOptions)

DraftSchema.methods.user = user

export default DraftSchema
