import { Schema } from "mongoose"
import { findByBarcode } from './products.statics'
import {
  createAttachments,
  deleteAttachments,
  loadAttachments
} from './products.methods'
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

ProductSchema.methods.createAttachments = createAttachments
ProductSchema.methods.loadAttachments = loadAttachments
ProductSchema.methods.deleteAttachments = deleteAttachments

export default ProductSchema
