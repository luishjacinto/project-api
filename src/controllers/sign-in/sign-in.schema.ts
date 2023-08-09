import { JSONSchemaType } from '../../types/json-types'

export type SignInRequestBody = {
  email: string,
  password: string
}

export const signInRequestSchema: JSONSchemaType<SignInRequestBody> = {
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

export type SignInResponseBody = {
  email: string,
  name: string
  token: string
}

export const signInResponseSchema: JSONSchemaType<SignInResponseBody> = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    token: {
      type: 'string'
    }
  },
  required: [
    'email',
    'name',
    'token'
  ]
}
