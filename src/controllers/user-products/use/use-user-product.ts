import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../../utilities'

import { type ResponseLocalsWithUserProduct } from '../../../types/routes'

export type UseUserProductBody = {
  quantity?: number
}

export async function useUserProduct(
  req: Request<RequestParamsWithId, any, UseUserProductBody>,
  res: Response<{}, ResponseLocalsWithUserProduct>
) {
  try {
    const {
      quantity
    } = req.body

    const { userProduct } = res.locals

    await userProduct.use(quantity || 1)

    res.status(201).end()
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
