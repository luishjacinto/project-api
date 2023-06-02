import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../utilities'
import { ResponseLocalsWithUserProduct } from '../../types/routes'

export async function deleteUserProduct(
  _: Request<RequestParamsWithId>,
  res: Response<{}, ResponseLocalsWithUserProduct>
) {
  try {
    await res.locals.userProduct.deleteOne()

    res.end()
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
