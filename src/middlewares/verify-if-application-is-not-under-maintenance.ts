import { NextFunction, Request, Response } from 'express'

import { handleResponseError } from '../utilities'
import { ifApplicationIsUnderMaintenanceThrowError } from '../utilities/if-application-is-under-maintenance-throw-error'

export async function verifyIfApplicationIsNotUnderMaintenance(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    ifApplicationIsUnderMaintenanceThrowError(req)
    return next()
  } catch (error) {
    handleResponseError(res, 503, error)
  }
}
