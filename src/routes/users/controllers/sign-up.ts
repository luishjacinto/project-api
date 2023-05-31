import { Request, Response } from 'express'
import bcrypt from "bcrypt";

import { User } from '../../../database/users'
import { jwtSign, handleResponseError } from '../../../utilities'

export type SignUpRequestBody = {
  name: string,
  email: string,
  password: string
}

export async function signUp(
  req: Request<{}, any, SignUpRequestBody>,
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