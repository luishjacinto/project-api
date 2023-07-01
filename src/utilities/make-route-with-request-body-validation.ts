import { Request, Response } from 'express'

import { handleResponseError } from '.'
import { JSONSchemaType } from '../types/json-types'
import { validateJson } from './validate-json'
import { InvalidRequestBodyError } from './errors'

export function makeRouteWithRequestBodyValidation<T, K extends Request<any, any, T>, J extends Response>(
  schema: JSONSchemaType<T>,
  next: (
    req: K,
    res: J
  ) => Promise<void>
) {
  const validateRequestBody = async (
    req: K,
    res: J,
  ) => {
    try {

      try {
        validateJson<T>(schema, (req.body as Object))
      } catch (error) {
        const messageReplacingInstanceWithBody = (error as Error).message.split('instance').join('body')
        throw new InvalidRequestBodyError(messageReplacingInstanceWithBody)
      }

      return await next(req, res)
    } catch (error) {
       handleResponseError(res, 401, error)
    }
  }

  return validateRequestBody
}


