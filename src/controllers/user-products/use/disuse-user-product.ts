import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../../utilities'

import { type ResponseLocalsWithUserProduct } from '../../../types/routes'

export type DisuseUserProductBody = {
  quantity?: number
}

export async function disuseUserProduct(
  req: Request<RequestParamsWithId, any, DisuseUserProductBody>,
  res: Response<{}, ResponseLocalsWithUserProduct>
) {
  try {
    const {
      quantity
    } = req.body

    const { userProduct } = res.locals

    await userProduct.disuse(quantity || 1)

    res.status(204).end()
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
