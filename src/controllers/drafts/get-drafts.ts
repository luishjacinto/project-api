import { Request, Response } from 'express'

import { Draft } from '../../database'
import {
  type RequestParamsWithId,
  handleResponseError
} from '../../utilities'
import { type ResponseLocalsWithUser } from '../../types/routes'

export async function getDrafts(
  _: Request<RequestParamsWithId>,
  res: Response<{}, ResponseLocalsWithUser>
) {
  try {
    const userId = res.locals.user.id

    const drafts = await Draft.find({ userId })

    res.send(drafts).end()
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
