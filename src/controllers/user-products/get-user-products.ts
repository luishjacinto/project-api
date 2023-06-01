import { Request, Response } from 'express'
import { FilterQuery, type SortOrder } from 'mongoose'

import { type IUserProduct, UserProduct } from '../../database/users-products'
import {
  type RequestParamsWithId,
  handleResponseError
} from '../../utilities'
import { type ResponseLocalsWithUserProduct } from '../../types/routes'

type GetUserProductsQuery = {
  gtin?: string
  name?: string
  sort?: keyof IUserProduct
  sortOrder?: SortOrder
}

export async function getUserProducts(
  req: Request<RequestParamsWithId, any, any, GetUserProductsQuery>,
  res: Response<{}, ResponseLocalsWithUserProduct>
) {
  try {
    const userId = res.locals.user.id

    let {
      gtin,
      name,
      sort,
      sortOrder
    } = req.query

    if (!sort || !sortOrder) {
      sort = 'name'
      sortOrder = 'asc'
    }

    const userProducts =
      await UserProduct
        .find({
          userId,
          gtin: new RegExp(gtin || '', 'i'),
          name: new RegExp(name || '', 'i'),
        })
        .sort({ [sort]: sortOrder })

    res.send(userProducts).end()
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
