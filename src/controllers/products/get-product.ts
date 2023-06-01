import { Request, Response } from 'express'

import {
  type RequestParamsWithGTIN,
  type ResponseLocalsWithProduct
} from '../../types/routes'

export async function getProduct(
  _: Request<RequestParamsWithGTIN>,
  res: Response<{}, ResponseLocalsWithProduct>
) {
  const { product } = res.locals

  res.json(product).end()
}
