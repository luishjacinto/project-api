import { Request, Response } from 'express'

import { User } from '../database/users'
import { handleResponseError, jwtVerify } from '../utilities'
import { RequestParamsWithToken } from '../types/routes'

export type SignInRequestBody = {
  email: string,
  password: string
}

export async function verifyUser(
  req: Request<RequestParamsWithToken>,
  res: Response
) {
  try {
    const { token } = req.params

    const payload = jwtVerify(token, {
      ignoreExpiration: true
    })

    const user = await User.findById(payload.id);

    if (user) {
      user.verified = true

      await user.save()

      return res.end()
    }

    handleResponseError(res, 404, 'User not found')
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
