import { Document, Model, ObjectId } from "mongoose"
import { IUser } from '../users/users.types'
import { IUserProduct } from '../users-products'

export type IDraftData = Omit<IUserProduct, 'userId' | 'productId' | 'createdAt' | 'updatedAt'>

export interface IDraft {
  userId: ObjectId
  data: Array<IDraftData>
  createdAt: Date
  updatedAt: Date
}

export interface IDraftDocument extends Document{
  userId: ObjectId
  data: Array<IDraftData>
  createdAt: Date
  updatedAt: Date
  user: () => Promise<IUser | null>
}

export interface IDraftModel extends Model<IDraftDocument> {}
