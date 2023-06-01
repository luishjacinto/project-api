import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../utilities'
import { ResponseLocalsWithUserProduct } from '../../types/routes'

export async function deleteProduct(
  _: Request<RequestParamsWithId>,
  res: Response<{}, ResponseLocalsWithUserProduct>
) {
  try {
    await res.locals.userProduct.deleteOne()

    res.status(200).end()
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
