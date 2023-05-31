import { User } from './users.model'
import { IUserDocument } from "./users.types";

export type FindOneOrCreateParams = {
  name: string,
  email: string,
  password: string
}

export async function findOneOrCreate({
  name,
  email,
  password
} : FindOneOrCreateParams): Promise<IUserDocument> {
  const record = await User.findOne({ email });
  if (record) {
    return record;
  } else {
    const user = await User.create({ name, email, password });

    return user
  }
}
