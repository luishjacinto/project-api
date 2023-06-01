import { Request, Response } from 'express'

import {
  type RequestParamsWithGTIN,
  type ResponseLocalsWithProduct
} from '../../types/routes'

export async function getProduct(
  _: Request<RequestParamsWithGTIN>,
  res: Response<{}, ResponseLocalsWithProduct>
) {
  const product = res.locals.product

  const {
    id,
    name,
    gtin
  } = product

  res.json({
    id,
    name,
    gtin
  }).end()
}
