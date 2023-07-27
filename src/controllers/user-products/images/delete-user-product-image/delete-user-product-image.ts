import { Request, Response } from 'express'
import { makeRequestBodyValidationMiddlewareAndHandler } from '../../../../utilities/make-request-body-validation-middleware-and-handler'
import { RequestParamsWithId, handleResponseError } from '../../../../utilities'
import { DeleteUserProductImageBody, deleteUserProductImageSchema } from './delete-user-product-image.schema'
import { ResponseLocalsWithUserProduct } from '../../../../types/routes'


export const deleteUserProductImage = makeRequestBodyValidationMiddlewareAndHandler(
  deleteUserProductImageSchema,
  async function (
    req: Request<RequestParamsWithId, any, DeleteUserProductImageBody>,
    res: Response<{}, ResponseLocalsWithUserProduct>
  ) {
    try {
      const {
        url
      } = req.body

      const { userProduct } = res.locals

      await userProduct.deleteAttachment(url)

      res.status(200).end()
    } catch (error) {
      handleResponseError(res, 400, error)
    }
  }
)
