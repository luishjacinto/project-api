import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../../utilities'
import { type ResponseLocalsWithUserProduct } from '..'

export async function getUserProduct(
  _: Request<RequestParamsWithId>,
  res: Response<{}, ResponseLocalsWithUserProduct>
) {
  try {
    const product = res.locals.product

    res.json(product).end()
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
