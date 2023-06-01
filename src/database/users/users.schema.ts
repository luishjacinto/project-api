import { Schema } from "mongoose"

import { findOneOrCreate } from './users.statics'
import { defaultSchemaOptions } from '../../config/default-schema-options'

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  }
}, defaultSchemaOptions)

UserSchema.statics.findOneOrCreate = findOneOrCreate


export default UserSchema
