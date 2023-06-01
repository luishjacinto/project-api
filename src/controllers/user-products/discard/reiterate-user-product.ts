import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../../utilities'

import { type ResponseLocalsWithUserProduct } from '../../../types/routes'

export type ReiterateUserProductBody = {
  quantity?: number
}

export async function reiterateUserProduct(
  req: Request<RequestParamsWithId, any, ReiterateUserProductBody>,
  res: Response<{}, ResponseLocalsWithUserProduct>
) {
  try {
    const {
      quantity
    } = req.body

    const { userProduct } = res.locals

    await userProduct.reiterate(quantity || 1)

    res.status(204).end()
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
