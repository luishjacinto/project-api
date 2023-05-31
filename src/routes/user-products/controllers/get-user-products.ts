import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../../utilities'
import { ResponseLocalsWithUserProduct } from '../user-products.types'

import { UserProduct } from '../../../database/users-products'

export async function getUserProducts(
  _: Request<RequestParamsWithId>,
  res: Response<{}, ResponseLocalsWithUserProduct>
) {
  try {
    const userId = res.locals.user.id

    const products = await UserProduct.find({ userId })

    res.send(products).end()
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}