import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../../utilities'
import { Product } from '../../../database/products'
import { ResponseLocalsWithUser } from '../../users'

import { UserProduct } from '../../../database/users-products'

export type CreateUserProductBody = {
  name: string,
  gtin: string,
  quantity: number,
  expiresAt: number | null
}

export async function createUserProduct(
  req: Request<RequestParamsWithId, any, CreateUserProductBody>,
  res: Response<{}, ResponseLocalsWithUser>
) {
  try {
    const {
      name,
      gtin,
      quantity,
      expiresAt
    } = req.body

    const userProduct = new UserProduct()
    userProduct.user = res.locals.user
    userProduct.name = name
    userProduct.gtin = gtin
    userProduct.quantity = quantity
    if (expiresAt) {
      userProduct.expiresAt = new Date(expiresAt)
    }

    const product = await Product.findByGTIN(gtin)

    if (product) {
      userProduct.product = product
    }

    await userProduct.save()

    const id = userProduct.id

    res.json({ id })
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}