import { Request, Response } from 'express'
import { makeRequestBodyValidationMiddlewareAndHandler } from '../../../../utilities/make-request-body-validation-middleware-and-handler'
import { RequestParamsWithId, handleResponseError } from '../../../../utilities'
import { CreateUserProductImageBody, createUserProductImageSchema } from './create-user-product-image.schema'
import { ResponseLocalsWithUserProduct } from '../../../../types/routes'


export const createUserProductImage = makeRequestBodyValidationMiddlewareAndHandler(
  createUserProductImageSchema,
  async function (
    req: Request<RequestParamsWithId, any, CreateUserProductImageBody>,
    res: Response<{}, ResponseLocalsWithUserProduct>
  ) {
    try {
      const {
        image
      } = req.body

      const { userProduct } = res.locals

      const buffer = Buffer.from(image, 'base64')

      const url = await userProduct.createAttachment(buffer)

      res.status(200).json({
        url
      }).end()
    } catch (error) {
      handleResponseError(res, 400, error)
    }
  }
)
