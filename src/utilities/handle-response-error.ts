import { Response } from 'express'
import { HttpStatusCode } from 'axios'

export function handleResponseError(response: Response, status: HttpStatusCode, error: unknown) {
  response.status(status)

  if (typeof error === 'string') {
    response.json({ message: error })
  } else if (error instanceof Error) {
    response.json({ message: error.message })
  }

  response.end()
}