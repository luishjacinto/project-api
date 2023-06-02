import { NextFunction, Request, Response } from 'express'

import { handleResponseError } from '../../utilities/handle-response-error'
import { type RequestParamsWithId } from '../../utilities/types'

import { type ResponseLocalsWithDraft } from '../../types/routes'
import { Draft } from '../../database'

export async function setDraftOnResponseLocalsById(
  req: Request<RequestParamsWithId>,
  res: Response<{}, ResponseLocalsWithDraft>,
  next: NextFunction
) {
  try {
    const { id: _id } = req.params

    const userId = res.locals.user.id

    const draft = await Draft.findOne({ _id, userId })
    if (draft) {
      res.locals.draft = draft

      return next()
    } else {
      handleResponseError(res, 404, 'Draft not found')
    }
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
