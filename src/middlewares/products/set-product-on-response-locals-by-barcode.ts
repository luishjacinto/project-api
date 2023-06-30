import { NextFunction, Request, Response } from 'express'

import { Product } from '../../database/products'

import { getProductFromCosmosApiByBarcode } from '../../services'
import { handleResponseError } from '../../utilities/handle-response-error'
import {
  type RequestParamsWithBarcode,
  type ResponseLocalsWithProduct
} from '../../types/routes'
import { urlToBuffer } from '../../utilities/url-to-buffer'

export async function setProductOnResponseLocalsByBarcode(
  req: Request<RequestParamsWithBarcode>,
  res: Response<{}, ResponseLocalsWithProduct>,
  next: NextFunction
) {
  try {
    const { barcode } = req.params

    let product = await Product.findByBarcode(barcode)

    if (!product) {
      const productInfo = await getProductFromCosmosApiByBarcode(barcode)

      if (productInfo) {
        product = await Product.create({
          name: productInfo.description,
          barcode
        })

        if (productInfo.thumbnail) {
          const buffer = await urlToBuffer(productInfo.thumbnail)

          product.createAttachments([buffer])
        }
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
