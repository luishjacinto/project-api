import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../../utilities'
import { type ResponseLocalsWithUserProduct } from '../../../types/routes'

type DiscardUserProductBody = {
  quantity?: number
}

export async function discardUserProduct(
  req: Request<RequestParamsWithId, any, DiscardUserProductBody>,
  res: Response<{}, ResponseLocalsWithUserProduct>
) {
  try {
    const {
      quantity
    } = req.body

    const { userProduct } = res.locals

    await userProduct.discard(quantity || 1)

    res.status(204).end()
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
