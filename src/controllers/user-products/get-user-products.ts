import { Request, Response } from 'express'
import { type SortOrder } from 'mongoose'

import { type IUserProduct, UserProduct } from '../../database/users-products'
import {
  type RequestParamsWithId,
  handleResponseError
} from '../../utilities'
import { type ResponseLocalsWithUser } from '../../types/routes'

type GetUserProductsQuery = {
  search?: string
  sort?: keyof IUserProduct
  sortOrder?: SortOrder
  groupBy?: 'barcode'
  skip?: number
  limit?: number
}

export async function getUserProducts(
  req: Request<RequestParamsWithId, any, any, GetUserProductsQuery>,
  res: Response<{}, ResponseLocalsWithUser>
) {
  try {
    const userId = res.locals.user.id

    let {
      groupBy,
      search,
      sort,
      sortOrder,
      skip,
      limit
    } = req.query

    if (!sort || !sortOrder) {
      sort = 'name'
      sortOrder = 'asc'
    }

    if (!skip) {
      skip = 0
    }

    if (!limit) {
      limit = 50
    }

    const userProducts =
      await Promise.all(
        (await UserProduct
          .find({
            userId,
            $or: [
              { barcode: new RegExp(search || '', 'i') },
              { name: new RegExp(search || '', 'i') }
            ]
          })
          .sort({ [sort]: sortOrder })
          .skip(skip)
          .limit(limit)
        ).map(async userProduct => await userProduct.loadFirstImage())
      )

    if (!!groupBy) {
      const groups = userProducts.map(userProduct => userProduct[groupBy as 'barcode'])
      const uniqueGroups = [...new Set(groups)]

      res.send(uniqueGroups.map(group => {
        return {
          group,
          products: userProducts.filter(userProduct => userProduct[groupBy as 'barcode'] === group)
        }
      })).end()
    } else {
      res.send(userProducts).end()
    }

  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
