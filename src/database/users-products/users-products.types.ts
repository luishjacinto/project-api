import { DocumentWithAttachments } from '../../types/document-with-attachments';
import { Model, ObjectId } from "mongoose"
import { IProductDocument } from '../products'
import { IUserDocument } from '../users/users.types'
import { ObjectWithAttachments } from '../../types/object-with-attachments'

export interface IUserProduct {
  name: string
  barcode: string
  productId?: ObjectId
  userId: ObjectId
  quantity: number
  quantityUsed: number
  quantityDiscarded: number
  observation?: string
  expiresAt?: Date
  createdAt: Date
  updatedAt: Date
  images?: string[]
}

export interface IUserProductDocument extends DocumentWithAttachments<IUserProduct> {
  name: string
  barcode: string
  productId?: ObjectId
  userId: ObjectId
  quantity: number
  quantityUsed: number
  quantityDiscarded: number
  observation?: string
  expiresAt?: Date
  createdAt: Date
  updatedAt: Date
  images?: string[]
  user: () => Promise<IUserDocument>
  product: () => Promise<IProductDocument | null>
  howManyLeft: () => number
  use: (quantity?: number) => Promise<void>
  disuse: (quantity?: number) => Promise<void>
  discard: (quantity?: number) => Promise<void>
  reiterate: (quantity?: number) => Promise<void>

  /**
   * Create attachments for user product. If buffers array is empty and the product base exists and has a thumbnail, the thumbnail will be used.
  */
  createAttachments: (buffers: Buffer[]) => Promise<void>
  loadFirstImage: () => Promise<ObjectWithAttachments<IUserProduct>>
  deleteImage: (image: string) => Promise<void>
}

export interface IUserProductModel extends Model<IUserProductDocument> {}
