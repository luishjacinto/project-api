import { NextFunction, Request, Response } from 'express'

import { User } from '../../../database/users'
import { jwtVerify, handleResponseError } from '../../../utilities'

export async function setUserOnResponseLocalsByJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers?.authorization;

  try {
    if (token) {
      const payload = jwtVerify(token.replace("Bearer ", ""))

      const user = await User.findById(payload.id);

      if (user) {
        res.locals.user = user

        return next()
      }

      throw new Error("User not found");
    } else {
      throw new Error("JWT not found in authorization header")
    }
  } catch (error) {
      handleResponseError(res, 403, error)
  }
}
