export class InvalidRequestBodyError extends Error {
  constructor(message: string){
    super(`Invalid request body: ${message}`)
  }
}