import { Request, Response } from 'express'
import { UpdateConfigBody, updateConfigSchema } from './update-config.schema'
import { ResponseLocalsWithUser } from '../../../../types/routes'
import { handleResponseError } from '../../../../utilities'
import { makeRequestBodyValidationMiddlewareAndHandler } from '../../../../utilities/make-request-body-validation-middleware-and-handler'

export const updateConfig = makeRequestBodyValidationMiddlewareAndHandler(
  updateConfigSchema,
  async function(
    req: Request<any, any, UpdateConfigBody>,
    res: Response<{}, ResponseLocalsWithUser>
  ) {
    try {
      if (!res.locals.user.admin) {
        return handleResponseError(res, 403)
      }

      const newConfig = req.body
      const actualConfig = req.app.get('config')

      req.app.set('config', { ...actualConfig, ...newConfig })

      res.status(200).end()
    } catch (error) {
      handleResponseError(res, 400, error)
    }
  }
)