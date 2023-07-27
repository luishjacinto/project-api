import { NextFunction, Request, RequestHandler, Response } from 'express'

import { handleResponseError } from '.'
import { JSONSchemaType } from '../types/json-types'
import { validateJson } from './validate-json'
import { InvalidRequestBodyError } from './errors'

export function makeRequestBodyValidationMiddlewareAndHandler<T, K extends Request<any, any, T>, J extends Response>(
  schema: JSONSchemaType<T>,
  nextHandler: (
    req: K,
    res: J
  ) => Promise<void>
): [middleware: RequestHandler, handler: RequestHandler] {

  const validateRequestBodyMiddleware = async (
    req: K,
    res: J,
    next: NextFunction
  ) => {
    try {
      validateJson<T>(schema, (req.body as Object))

      return next()
    } catch (error) {
      const messageReplacingInstanceWithBody = (error as Error).message.split('instance').join('body')
      handleResponseError(res, 401, new InvalidRequestBodyError(messageReplacingInstanceWithBody))
    }
  }

  return [validateRequestBodyMiddleware as unknown as RequestHandler, nextHandler as unknown as RequestHandler]
}


