import { JSONSchemaType } from '../../types/json-types'

export type SignInBody = {
  email: string,
  password: string
}

export const signInSchema: JSONSchemaType<SignInBody> = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: [
    'email',
    'password'
  ]
}
