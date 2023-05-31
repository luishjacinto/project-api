import { Schema } from "mongoose"

import { findOneOrCreate } from './users.statics'
import { setLastUpdated } from './users.methods'

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
})

UserSchema.statics.findOneOrCreate = findOneOrCreate

UserSchema.methods.setLastUpdated = setLastUpdated

export default UserSchema
