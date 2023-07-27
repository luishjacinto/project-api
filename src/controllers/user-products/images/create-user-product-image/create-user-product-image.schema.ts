import { JSONSchemaType } from '../../../../types/json-types'

export type CreateUserProductImageBody = {
  image: string
}

export const createUserProductImageSchema: JSONSchemaType<CreateUserProductImageBody> = {
  type: 'object',
  properties: {
    image: {
      type: 'string',
    }
  },
  required: [
    'image'
  ]
}
