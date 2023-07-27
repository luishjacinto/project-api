import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../../utilities'

import { Product, UserProduct } from '../../../database'
import { ResponseLocalsWithUser } from '../../../types/routes'
import { CreateUserProductBody, createUserProductSchema } from './create-user-product.schema'
import { makeRequestBodyValidationMiddlewareAndHandler } from '../../../utilities/make-request-body-validation-middleware-and-handler'

export const createUserProduct = makeRequestBodyValidationMiddlewareAndHandler(
  createUserProductSchema,
  async function (
    req: Request<RequestParamsWithId, any, CreateUserProductBody>,
    res: Response<{}, ResponseLocalsWithUser>
  ) {
    try {
      const {
        name,
        barcode,
        quantity,
        quantityUsed,
        quantityDiscarded,
        observation,
        expiresAt,
        setProductThumbnailIfExists
      } = req.body

      const userProduct = new UserProduct()

      const { user } = res.locals

      userProduct.userId = user.id

      userProduct.name = name
      userProduct.barcode = barcode
      userProduct.quantity = quantity
      userProduct.quantityUsed = quantityUsed || 0
      userProduct.quantityDiscarded = quantityDiscarded || 0

      if (observation) {
        userProduct.observation = observation
      }

      if (expiresAt) {
        userProduct.expiresAt = new Date(expiresAt)
      }

      const product = await Product.findByBarcode(barcode)

      if (product) {
        userProduct.productId = product.id

        if (product.thumbnail && setProductThumbnailIfExists) {
          userProduct.images = [product.thumbnail]
        }
      }

      await userProduct.save()

      const id = userProduct.id

      res.status(201).json({ id }).end()
    } catch (error) {
      handleResponseError(res, 400, error)
    }
  }
)
