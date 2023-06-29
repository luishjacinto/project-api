import { Document } from 'mongoose'
import { ObjectWithAttachments } from '../types/object-with-attachments'

export function createObjectWithAttachmentsFromDocument<T extends Document>(object: T): ObjectWithAttachments<T> {
  return { ...object.toObject(), attachments: [] }
}