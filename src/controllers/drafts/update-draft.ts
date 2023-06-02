import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../utilities'
import { type ResponseLocalsWithDraft } from '../../types/routes'
import { IDraftData } from '../../database'

type UpdateDraftBody = {
  data: Array<IDraftData>
}

export async function updateDraft(
  req: Request<RequestParamsWithId, UpdateDraftBody>,
  res: Response<{}, ResponseLocalsWithDraft>
) {
  try {
    const { data } = req.body

    const { draft } = res.locals

    draft.data = data

    await draft.save()

    res.status(204).end()
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
