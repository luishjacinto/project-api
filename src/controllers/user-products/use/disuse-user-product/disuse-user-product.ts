import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../../../utilities'

import { type ResponseLocalsWithUserProduct } from '../../../../types/routes'
import { makeRequestBodyValidationMiddlewareAndHandler } from '../../../../utilities/make-request-body-validation-middleware-and-handler'
import { DisuseUserProductBody, disuseUserProductSchema } from './disuse-user-product.schema'

export const disuseUserProduct = makeRequestBodyValidationMiddlewareAndHandler(
  disuseUserProductSchema,
  async function(
    req: Request<RequestParamsWithId, any, DisuseUserProductBody>,
    res: Response<{}, ResponseLocalsWithUserProduct>
  ) {
    try {
      const {
        quantity
      } = req.body

      const { userProduct } = res.locals

      await userProduct.disuse(quantity || 1)

      res.status(204).end()
    } catch (error) {
      handleResponseError(res, 400, error)
    }
  }
)
