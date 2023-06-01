import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../utilities'
import { Product } from '../../database/products'

import { UserProduct } from '../../database/users-products'
import { ResponseLocalsWithUser } from '../../types/routes'

export type CreateUserProductBody = {
  name: string
  gtin: string
  quantity: number
  quantityUsed: number
  quantityDiscarded: number
  expiresAt: string | null
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
      quantityUsed,
      quantityDiscarded,
      expiresAt
    } = req.body

    const userProduct = new UserProduct()

    userProduct.userId = res.locals.user.id

    userProduct.name = name
    userProduct.gtin = gtin
    userProduct.quantity = quantity
    userProduct.quantityUsed = quantityUsed || 0
    userProduct.quantityDiscarded = quantityDiscarded || 0

    if (expiresAt) {
      if(Number.isNaN(Date.parse(expiresAt))) {
        throw new Error("Invalid format of expiresAt")
      }

      userProduct.expiresAt = new Date(expiresAt)
    }

    const product = await Product.findByGTIN(gtin)

    if (product) {
      userProduct.productId = product.id
    }

    await userProduct.save()

    const id = userProduct.id

    res.status(201).json({ id }).end()
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}