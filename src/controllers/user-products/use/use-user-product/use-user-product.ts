import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../../../utilities'

import { type ResponseLocalsWithUserProduct } from '../../../../types/routes'
import { UseUserProductBody, useUserProductSchema } from './use-user-product.schema'
import { makeRequestBodyValidationMiddlewareAndHandler } from '../../../../utilities/make-request-body-validation-middleware-and-handler'

export const useUserProduct = makeRequestBodyValidationMiddlewareAndHandler(
  useUserProductSchema,
  async function (
    req: Request<RequestParamsWithId, any, UseUserProductBody>,
    res: Response<{}, ResponseLocalsWithUserProduct>
  ) {
    try {
      const {
        quantity
      } = req.body

      const { userProduct } = res.locals

      await userProduct.use(quantity || 1)

      res.status(204).end()
    } catch (error) {
      handleResponseError(res, 400, error)
    }
  }
)
