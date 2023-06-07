import { Request, Response } from 'express'

import { handleResponseError } from '../../../utilities'

import { ResponseLocalsWithUser } from '../../../types/routes'

type UpdateConfigBody = {
  underMaintenance: boolean
}

export async function updateConfig(
  req: Request<any, any, UpdateConfigBody>,
  res: Response<{}, ResponseLocalsWithUser>
) {
  try {
    if (!res.locals.user.admin) {
      return handleResponseError(res, 403)
    }

    const config = req.body

    req.app.set('config', config)

    res.status(200).end()
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}