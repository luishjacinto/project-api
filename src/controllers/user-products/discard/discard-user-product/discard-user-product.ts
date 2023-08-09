import { Request, Response } from 'express'

import { makeRequestBodyValidationMiddlewareAndHandler } from '../../../../utilities/make-request-body-validation-middleware-and-handler'
import { DiscardUserProductBody, discardUserProductSchema } from './discard-user-product.schema'
import { RequestParamsWithId, handleResponseError } from '../../../../utilities'
import { ResponseLocalsWithUserProduct } from '../../../../types/routes'

export const discardUserProduct = makeRequestBodyValidationMiddlewareAndHandler(
  discardUserProductSchema,
  async function discardUserProduct(
    req: Request<RequestParamsWithId, any, DiscardUserProductBody>,
    res: Response<{}, ResponseLocalsWithUserProduct>
  ) {
    try {
      const {
        quantity
      } = req.body

      const { userProduct } = res.locals

      await userProduct.discard(quantity || 1)

      res.status(204).end()
    } catch (error) {
      handleResponseError(res, 400, error)
    }
  }
)
