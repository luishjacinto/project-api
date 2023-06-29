import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../utilities'
import { type ResponseLocalsWithUserProduct } from '../../types/routes'

export async function getUserProduct(
  _: Request<RequestParamsWithId>,
  res: Response<{}, ResponseLocalsWithUserProduct>
) {
  try {
    const { userProduct } = res.locals

    res.json(await userProduct.loadAttachments()).end()
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
