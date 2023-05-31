import { model } from "mongoose";

import { IUserDocument, IUserModel } from "./users.types";

import UserSchema from "./users.schema";

export const User = model<IUserDocument, IUserModel>("users", UserSchema);
