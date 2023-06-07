import { Request } from 'express'

export function ifApplicationIsUnderMaintenanceThrowError(req: Request) {
  const { underMaintenance } = req.app.get('config')

  if (underMaintenance) {
    throw new Error("Server is under maintenance")
  }
}