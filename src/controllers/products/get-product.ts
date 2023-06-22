import { Request, Response } from 'express'

import {
  type RequestParamsWithBarcode,
  type ResponseLocalsWithProduct
} from '../../types/routes'

export async function getProduct(
  _: Request<RequestParamsWithBarcode>,
  res: Response<{}, ResponseLocalsWithProduct>
) {
  const { product } = res.locals

  res.json(product).end()
}
