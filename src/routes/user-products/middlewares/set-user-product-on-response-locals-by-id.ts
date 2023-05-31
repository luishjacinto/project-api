import { NextFunction, Request, Response } from 'express'

import { UserProduct } from '../../../database/users-products'
import { handleResponseError } from '../../../utilities/handle-response-error'
import { type RequestParamsWithId } from '../../../utilities/types'

export async function setUserProductOnResponseLocalsById(
  req: Request<RequestParamsWithId>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params

    const product = await UserProduct.findById(id)

    if (product) {
      res.locals.product = product

      return next()
    } else {
      handleResponseError(res, 404, 'Product not found')
    }
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
