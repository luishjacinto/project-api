import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../utilities'
import { ResponseLocalsWithDraft } from '../../types/routes'

export async function deleteDraft(
  _: Request<RequestParamsWithId>,
  res: Response<{}, ResponseLocalsWithDraft>
) {
  try {
    await res.locals.draft.deleteOne()

    res.end()
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
