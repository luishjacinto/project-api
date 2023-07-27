import { Document } from 'mongoose'
import { ObjectWithAttachment } from '../types/object-with-attachment'

export function createObjectWithAttachmentFromDocument<T extends Document>(object: T): ObjectWithAttachment<T> {
  return { ...object.toObject(), attachment: undefined }
}