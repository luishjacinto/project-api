import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../utilities'

import { ResponseLocalsWithUser } from '../../types/routes'
import { Draft, IDraftData } from '../../database'

type CreateDraftBody = {
  data: Array<IDraftData>
}

export async function createDraft(
  req: Request<RequestParamsWithId, any, CreateDraftBody>,
  res: Response<{}, ResponseLocalsWithUser>
) {
  try {
    const { data } = req.body

    const draft = new Draft()

    draft.userId = res.locals.user.id

    draft.data = data

    await draft.save()

    const id = draft.id

    res.status(201).json({ id }).end()
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}