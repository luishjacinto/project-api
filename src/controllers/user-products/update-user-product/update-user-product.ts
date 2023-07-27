import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../../utilities'
import { type ResponseLocalsWithUserProduct } from '../../../types/routes'
import { UpdateUserProductBody, updateUserProductSchema } from './update-user-product.schema'
import { makeRequestBodyValidationMiddlewareAndHandler } from '../../../utilities/make-request-body-validation-middleware-and-handler'

export const updateUserProduct = makeRequestBodyValidationMiddlewareAndHandler(
  updateUserProductSchema,
  async function (
    req: Request<RequestParamsWithId, any, UpdateUserProductBody>,
    res: Response<{}, ResponseLocalsWithUserProduct>
  ) {
    try {
      const {
        name,
        quantity,
        quantityUsed,
        quantityDiscarded,
        observation,
        expiresAt,
        images
      } = req.body

      const { userProduct } = res.locals

      userProduct.name = name
      userProduct.quantity = quantity
      userProduct.quantityUsed = quantityUsed
      userProduct.quantityDiscarded = quantityDiscarded

      if (observation) {
        userProduct.observation = observation
      }

      if (expiresAt) {
        userProduct.expiresAt = new Date(expiresAt)
      }

      await userProduct.save()

      const imageBuffers = images ? images.map(image => Buffer.from(image, 'base64')) : []

      await userProduct.createAttachments(imageBuffers)

      res.status(204).end()
    } catch (error) {
      handleResponseError(res, 400, error)
    }
  }
)
