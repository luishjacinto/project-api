import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../utilities'
import { type ResponseLocalsWithDraft } from '../../types/routes'

export async function getDraft(
  _: Request<RequestParamsWithId>,
  res: Response<{}, ResponseLocalsWithDraft>
) {
  try {
    const { draft } = res.locals

    res.json(draft).end()
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
