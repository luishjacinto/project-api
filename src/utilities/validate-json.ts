import { Schema, Validator } from 'jsonschema'
import { JSONSchemaType } from '../types/json-types'

export function validateJson<T>(schema: JSONSchemaType<T>, json: Object){

  const validator = new Validator()

  // TODO Find another lib to validate a JSON Schema who has Typescript suport
  const result = validator.validate(json, (schema as Schema))

  if (result.valid) {
    return
  }

  throw new Error(`${result.errors.map(error => error.stack.split("\"").join("'")).join('; ')};`)
}