import { IDraftDocument } from './drafts.types'
import { IUserDocument, User } from '../users'

export async function user(this: IDraftDocument): Promise<IUserDocument | null> {
  return await User.findById(this.userId)
}