import { Document, Model } from "mongoose";

export interface IUser {
  name: string
  email: string
  password: string
  lastUpdated?: Date
}

export interface IUserDocument extends Document{
  name: string
  email: string
  password: string
  lastUpdated?: Date
  setLastUpdated: () => Promise<void>
}

export interface IUserModel extends Model<IUserDocument> {
  findOneOrCreate: (
    {
      name,
      email,
      password,
    }: { name: string; email: string, password: string }
  ) => Promise<IUserDocument>
}
