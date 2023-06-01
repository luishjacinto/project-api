import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../utilities'
import { type ResponseLocalsWithUserProduct } from '../../types/routes'

export type UpdateUserProductBody = {
  name: string
  quantity: number
  expiresAt: string | null
}

export async function updateUserProduct(
  req: Request<RequestParamsWithId, UpdateUserProductBody>,
  res: Response<{}, ResponseLocalsWithUserProduct>
) {
  try {
    const {
      name,
      quantity,
      expiresAt
    } = req.body

    const { userProduct } = res.locals

    userProduct.name = name
    userProduct.quantity = quantity

    if (expiresAt) {
      if(Number.isNaN(Date.parse(expiresAt))) {
        throw new Error("Invalid format of expiresAt")
      }

      userProduct.expiresAt = new Date(expiresAt)
    }

    await userProduct.save()

    res.status(204).end()
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
