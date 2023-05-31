import { Request, Response } from 'express'
import bcrypt from "bcrypt";

import { User } from '../../../database/users'
import { jwtSign, handleResponseError } from '../../../utilities'

export type SignInRequestBody = {
  email: string,
  password: string
}

export async function signIn(
  req: Request<{}, any, SignInRequestBody>,
  res: Response
) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        await user.updateOne({ id: user.id });
        const token = await jwtSign({ id: user.id })

        return res.json({
          name: user.name,
          email: user.email,
          token
        })
      }

      throw new Error('Invalid password')
    }

    handleResponseError(res, 404, 'User not found')
  } catch (error) {
    console.log(error)
    handleResponseError(res, 400, error)
  }
}
