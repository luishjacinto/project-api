import { Request, Response } from 'express'

import { UserProduct } from '../../database/users-products'
import {
  type RequestParamsWithId,
  handleResponseError
} from '../../utilities'
import { type ResponseLocalsWithUserProduct } from '../../types/routes'

export async function getUserProducts(
  _: Request<RequestParamsWithId>,
  res: Response<{}, ResponseLocalsWithUserProduct>
) {
  try {
    const userId = res.locals.user.id

    const userProducts = await UserProduct.find({ userId })

    res.send(userProducts).end()
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
