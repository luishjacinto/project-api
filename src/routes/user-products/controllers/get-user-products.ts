import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../../utilities'


export async function getUserProducts(
  _: Request<RequestParamsWithId>,
  res: Response
) {
  try {

  } catch (error) {
    handleResponseError(res, 400, error)
  }
}