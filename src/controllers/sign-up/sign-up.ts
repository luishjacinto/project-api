import { Request, Response } from 'express'
import bcrypt from "bcrypt";

import { User } from '../../database/users'
import { jwtSign, handleResponseError } from '../../utilities'
import { SignUpBody, signUpSchema } from './sign-up.schema'
import { makeRequestBodyValidationMiddlewareAndHandler } from '../../utilities/make-request-body-validation-middleware-and-handler'

export const signUp = makeRequestBodyValidationMiddlewareAndHandler(
  signUpSchema,
  async function (
    req: Request<{}, any, SignUpBody>,
    res: Response
  ) {
    try {
      const { name, email, password } = req.body

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const user = await User.findOneOrCreate({
        name,
        email,
        password: hash
      })

      const token = jwtSign({ id: user.id })

      res.json({
        name: user.name,
        email: user.email,
        token
      })

    } catch (error) {
      handleResponseError(res, 400, error)
    }
  }
)