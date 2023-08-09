import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../../../utilities'

import { type ResponseLocalsWithUserProduct } from '../../../../types/routes'
import { makeRequestBodyValidationMiddlewareAndHandler } from '../../../../utilities/make-request-body-validation-middleware-and-handler'
import { ReiterateUserProductBody, reiterateUserProductSchema } from './reiterate-user-product.schema'

export const reiterateUserProduct = makeRequestBodyValidationMiddlewareAndHandler(
  reiterateUserProductSchema,
  async function (
    req: Request<RequestParamsWithId, any, ReiterateUserProductBody>,
    res: Response<{}, ResponseLocalsWithUserProduct>
  ) {
    try {
      const {
        quantity
      } = req.body

      const { userProduct } = res.locals

      await userProduct.reiterate(quantity || 1)

      res.status(204).end()
    } catch (error) {
      handleResponseError(res, 400, error)
    }
  }
)
