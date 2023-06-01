import { NextFunction, Request, Response } from 'express'

import { Product } from '../../database/products'

import { getProductFromCosmosApiByGTIN } from '../../services'
import { handleResponseError } from '../../utilities/handle-response-error'
import {
  type RequestParamsWithGTIN,
  type ResponseLocalsWithProduct
} from '../../types/routes'

export async function setProductOnResponseLocalsByGTINOrExternalApi(
  req: Request<RequestParamsWithGTIN>,
  res: Response<{}, ResponseLocalsWithProduct>,
  next: NextFunction
) {
  try {
    const { gtin } = req.params

    let product = await Product.findByGTIN(gtin)

    if (!product) {
      const productInfo = await getProductFromCosmosApiByGTIN(gtin)

      if (productInfo) {
        product = await Product.create({
          name: productInfo.description,
          gtin
        })
      }
    }

    if (product) {
      res.locals.product = product

      return next()
    } else {
      handleResponseError(res, 404, 'Product not found')
    }
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
