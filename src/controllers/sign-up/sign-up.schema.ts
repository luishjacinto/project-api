import { JSONSchemaType } from '../../types/json-types'

export type SignUpBody = {
  name: string,
  email: string,
  password: string
}

export const signUpSchema: JSONSchemaType<SignUpBody> = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: [
    'name',
    'email',
    'password'
  ]
}
