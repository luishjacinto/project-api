import { NextFunction, Request, Response } from 'express'

import { UserProduct } from '../../../database/users-products'
import { handleResponseError } from '../../../utilities/handle-response-error'
import { type RequestParamsWithId } from '../../../utilities/types'

import { ResponseLocalsWithUserProduct } from '../user-products.types'

export async function setUserProductOnResponseLocalsById(
  req: Request<RequestParamsWithId>,
  res: Response<{}, ResponseLocalsWithUserProduct>,
  next: NextFunction
) {
  try {
    const { id: _id } = req.params

    const userId = res.locals.user.id

    const userProduct = await UserProduct.findOne({ _id, userId })
    if (userProduct) {
      res.locals.userProduct = userProduct

      return next()
    } else {
      handleResponseError(res, 404, 'Product not found')
    }
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
